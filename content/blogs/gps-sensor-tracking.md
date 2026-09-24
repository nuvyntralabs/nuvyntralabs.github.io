---
title: "Offline GPS Tracking and Haversine Distance"
published: false
description: "A Kotlin Android proof that sums filtered GPS fixes with the Haversine formula. No map and no Directions API. On a 2.00 km road route it measured 1.94 km."
tags: android, kotlin, gps, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A field app that bills by the kilometre has to know how far the phone actually moved. A directions API answers a different question: the shortest road between two points.

**GPSSensorTrackingService** is a Kotlin Android proof that stays with the first question. The fused location provider delivers GPS fixes. A filter drops the ones that are noise. The distance between accepted fixes is added with the Haversine formula and written to a local database. The map draws that trace. Distance is computed on the device from those fixes.

## What the proof is

The app is a field-survey tracker. A daily shift window starts and stops location capture. While the window is open, a foreground service records the route and a running total for that calendar day.

| | |
| --- | --- |
| App | Field Survey POC · `com.fieldsurvey.poc` |
| Platform | Android 8+ (API 26) · Kotlin · Jetpack Compose |
| Location | Fused Location Provider, high-accuracy GPS |
| Distance | Haversine on accepted fixes, Earth radius 6,371 km |
| Storage | Room, one day log and its points per `YYYY-MM-DD` |
| Map | Google Maps polyline of the saved trace |
| Source | [github.com/nuvyntralabs/GPSSensorTrackingService](https://github.com/nuvyntralabs/GPSSensorTrackingService) |
| Research | [nuvyntralabs.github.io/research/gps-sensor-tracking-service/](https://nuvyntralabs.github.io/research/gps-sensor-tracking-service/) |

## Why the sample interval decides the distance

Two GPS points give the straight line between them. The road between them can be longer. A fix every ten minutes hides the bends:

| Motion | Distance covered in 10 minutes |
| --- | --- |
| Walking, 5 km/h | 833 m |
| Bicycle, 15 km/h | 2.5 km |
| Car, 40 km/h | 6.7 km |
| Highway, 80 km/h | 13.3 km |

A left turn, a U-turn, or a loop inside that gap becomes one chord. The total comes out short. Sampling every few seconds while the device is moving keeps those corners in the trace. Sampling slows down when the device is still, so a phone on a desk does not burn a GPS fix every few seconds for nothing.

A directions call on each leg has the opposite failure. It returns a plausible road, including roads the surveyor never drove, and it needs a network at sample time. This proof keeps the polyline as the filtered GPS trace.

## Haversine, added as you go

Haversine is the great-circle distance on a sphere. For two latitudes and longitudes it is:

```kotlin
object Haversine {
    private const val EARTH_RADIUS_M = 6_371_000.0

    fun distanceMeters(
        lat1: Double, lon1: Double,
        lat2: Double, lon2: Double
    ): Double {
        val dLat = Math.toRadians(lat2 - lat1)
        val dLon = Math.toRadians(lon2 - lon1)
        val a = sin(dLat / 2).let { it * it } +
                cos(Math.toRadians(lat1)) * cos(Math.toRadians(lat2)) *
                sin(dLon / 2).let { it * it }
        return 2 * EARTH_RADIUS_M * asin(sqrt(a))
    }
}
```

Each accepted fix adds its metres to that day’s total in SQL, so a crash keeps the distance already counted:

```sql
UPDATE day_logs
   SET totalDistanceMeters = totalDistanceMeters + :deltaMeters,
       lastFixUtcMillis    = :timestampUtcMillis
 WHERE dateKey = :dateKey
```

The running total is kept incrementally. It is stored on the day row as each fix is accepted.

## Three filters, or a parked phone invents kilometres

Raw GPS wanders. A phone left on a table drifts by metres. A bad fix can jump across town. Sum those segments and the day total grows while nobody moved.

`GpsFilter` accepts a fix only after three checks.

**Accuracy.** Medium mode drops anything worse than 30 m. High mode uses 20 m. Low mode uses 55 m.

**Doppler speed.** Position drifts while the receiver is still. Reported speed does not. A trustworthy speed under 0.5 m/s is treated as stationary and contributes 0 m. That threshold sits above the stationary noise floor and below a slow walk, so walking still counts.

**Anchor.** When speed is missing, the filter holds the last still point. Fixes inside `max(20 m, accuracy × 1.5)` are rejected. A jump past that radius has to repeat on a second fix before it counts, unless speed already says the device is moving. The counted distance starts from the anchor, so the first real metres are kept. A single spike cannot walk the anchor down the street.

Implied speed above 60 m/s (about 216 km/h) is dropped as a teleport.

## The bug that straightened every corner

The first road test under-counted badly: about 1.87 km on a ride of about 4.8 km, with sharp turns and a U-turn.

The location callback kept `LocationResult.lastLocation`. The request also allowed the OS to batch fixes (`setMaxUpdateDelayMillis` at twice the interval). A batch arrived as one delivery, the callback kept the last point, and every turn inside that batch collapsed into a straight line.

The fix is both halves:

- Walk `result.locations` in time order and run the filter on each fix.
- Set `setMaxUpdateDelayMillis(0)` so fixes are delivered as they arrive.

Route vertices are saved on the first fix, on a heading change of 20° or more (the previous point is saved too, so the polyline bends at the corner), on stop and start, and at least every 60 seconds or 120 metres on a straight. After motion, fast sampling continues for 90 seconds, so a stop at a signal and the turn that follows are still in the trace.

## Accuracy modes

| Mode | Moving sample | Stationary sample | Max accuracy |
| --- | --- | --- | --- |
| High | 4 s | 20 s | 20 m |
| Medium (default) | 6 s | 30 s | 30 m |
| Low | 15 s | 60 s | 55 m |

Medium is the default for a vehicle survey. High spends more battery to hold tighter corners. On a 4,500 mAh phone, a 12-hour Medium shift plus the always-on process lands around 16–20% of the battery for the day. That figure is an engineering estimate, not a lab measurement.

## The road test

After the batching fix, the app was compared with a vehicle trip meter on a route that included left turns, right turns, and a U-turn.

| | |
| --- | --- |
| Vehicle trip meter | 2.00 km |
| App | 1.94 km |
| Points saved | 25 |
| Agreement | 97% |
| Gap | 60 m |

Sixty metres on two kilometres is the residue of GPS error, sample spacing, and road curvature. The app estimates the path from fixes. It does not read the odometer.

## What stays on the device

Shift start and stop are daily alarms. A second foreground service stays up so those alarms still fire after Doze, reboot, and an app update. OEM battery screens (Xiaomi, Oppo, vivo, Samsung, and others) are linked from inside the app, because a foreground service alone does not survive every vendor killer.

The published proof keeps data on the device, draws the raw filtered trace, and leaves polyline simplification for later. Those are product steps. The distance figure is already the filtered Haversine sum.

The same problem on .NET MAUI — an on-demand fix, a tracking session, and reverse geocoding — is [Plugin.Maui.GeoLocator](https://nuvyntralabs.github.io/packages/plugin-maui-geolocator/) ([NuGet](https://www.nuget.org/packages/Plugin.Maui.GeoLocator), [GitHub](https://github.com/NiladriPadhy/Plugin.Maui.GeoLocator)). This Android proof is the measurement study behind that kind of API: what to sample, what to reject, and what accuracy to expect against a trip meter.

- Repository: [github.com/nuvyntralabs/GPSSensorTrackingService](https://github.com/nuvyntralabs/GPSSensorTrackingService)
- Research page: [nuvyntralabs.github.io/research/gps-sensor-tracking-service/](https://nuvyntralabs.github.io/research/gps-sensor-tracking-service/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
