---
title: "Geofence 1.1.0: Enter, Exit, and Dwell Inside Twenty Circular Regions"
published: false
description: "Plugin.Maui.Geofence 1.1.0 watches up to 20 circular regions on Android and iOS. Enter, exit, and dwell survive process death. A current GPS fix stays on GeoLocator."
tags: dotnet, maui, geofence, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A depot app does not need a new GPS fix every few seconds. It needs to know when the device crosses a circle drawn around the yard.

**Plugin.Maui.Geofence** is that monitor. Version **1.1.0** is on nuget.org. You register named circular regions. The operating system reports enter, exit, and dwell. The list is written to app-private storage and registered again after the process dies.

This post is the walkthrough: how to register the plugin, add a region, read a transition, and which permissions the host still has to request.

## What Geofence is

Geofence is a circular-region monitor for **.NET MAUI** on Android and iOS. MIT licensed. It targets `net10.0`, `net10.0-android` (API 21+), and `net10.0-ios` (15+). Mac Catalyst and Windows are not primary targets.

It does one job: answer when the user enters, exits, or dwells in up to 20 named regions.

| | |
| --- | --- |
| Package | [`Plugin.Maui.Geofence`](https://www.nuget.org/packages/Plugin.Maui.Geofence) 1.1.0 |
| Registration | `UseGeofence` |
| Client | `IGeofence`, or `Geofence.Current` |
| Platforms | Android `GeofencingClient`, iOS `CLCircularRegion` |
| Source | [github.com/nuvyntralabs/Plugin.Maui.Geofence](https://github.com/nuvyntralabs/Plugin.Maui.Geofence) |
| Docs | [nuvyntralabs.github.io/packages/plugin-maui-geofence/](https://nuvyntralabs.github.io/packages/plugin-maui-geofence/) |

A current position, a tracking session, and reverse geocoding stay on [Plugin.Maui.GeoLocator](https://nuvyntralabs.github.io/packages/plugin-maui-geolocator/). Geofence does not draw a map.

## Install and register

```bash
dotnet add package Plugin.Maui.Geofence --version 1.1.0
```

```csharp
using Plugin.Maui.Geofence;

builder
    .UseMauiApp<App>()
    .UseGeofence(options =>
    {
        options.MaxRegions = 20;
        options.MinimumRadiusMeters = 50;
    });
```

`UseGeofence` loads `plugin.maui.geofence.regions.tsv` from app data and re-registers those regions with the OS. Resolve `IGeofence` from dependency injection, or use `Geofence.Current` after registration. Calling `Current` before `UseGeofence` throws.

A radius of zero is replaced with `DefaultRadiusMeters` (100). A radius below `MinimumRadiusMeters` is rejected. Replacing a region that already has the same id does not consume another slot.

## Add a region

```csharp
var result = await Geofence.Current.AddAsync(new GeofenceRegion
{
    Id = "depot",
    Latitude = 12.97,
    Longitude = 77.59,
    RadiusMeters = 150,
    NotifyOnEntry = true,
    NotifyOnExit = true,
    NotifyOnDwell = true,
    Dwell = TimeSpan.FromMinutes(5)
});

if (!result.Succeeded)
{
    // result.Status: Denied, LimitReached, InvalidRadius, InvalidId, NotSupported
}
```

`AddAsync` returns a typed result. A missing location permission is `Denied`. Missing Play services is `NotSupported`. The 21st distinct id is `LimitReached`. An empty id is `InvalidId`. The call does not throw because the user said no.

## Read a transition

```csharp
Geofence.Current.Transition += (_, args) =>
{
    // args.RegionId, args.Kind: Enter, Exit, or Dwell
};
```

OS events queue until something subscribes to `Transition`. Attach the handler before you expect the first crossing, including crossings that happened while the process was down.

Android dwell uses `GEOFENCE_TRANSITION_DWELL` and a loitering delay of at least 60 seconds. iOS has no loitering delay. After enter, the plugin starts a timer and cancels it on exit.

Samples and tests can fire the same event without moving the device:

```csharp
Geofence.Current.Raise(GeofenceTransitionKind.Enter, "depot");
```

`GetMonitoredAsync` lists the regions still stored. `RemoveAsync` and `RemoveAllAsync` drop them from the store and from the OS.

## Permissions the host still requests

The plugin does not prompt. Declare the usage strings, then request location yourself.

Android, in `Platforms/Android/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
```

`AddAsync` needs fine location while the app is in use. Background transitions on Android 10+ also need `ACCESS_BACKGROUND_LOCATION` and the Play disclosure your listing already requires.

iOS, in `Platforms/iOS/Info.plist`:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app monitors geofences while you use it.</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>This app monitors geofences when the app is in the background.</string>
<key>UIBackgroundModes</key>
<array>
    <string>location</string>
</array>
```

Background enter and exit on `CLCircularRegion` need Always authorization. Denied or Restricted comes back as `Denied`.

## When something looks wrong

| What you see | What to do |
| --- | --- |
| `InvalidId` | `Id` is blank. Every region needs a stable name. |
| `InvalidRadius` | Radius is below `MinimumRadiusMeters` (50 by default). |
| `LimitReached` | Twenty distinct ids are already monitored. Replace an id or remove one. |
| `Denied` | Location permission is missing, or iOS authorization is Denied or Restricted. |
| `NotSupported` | Play services are missing on Android. |
| No event after a crossing | Nothing is subscribed to `Transition` yet, or background location was never granted. |
| Regions vanish after a kill | `UseGeofence` was not called on the next launch, so the TSV was never re-registered. |

## Where Geofence sits next to the other tools

| Need | Tool |
| --- | --- |
| Enter, exit, and dwell for up to 20 circles | **Geofence** — `Plugin.Maui.Geofence` |
| A current fix, a tracking session, reverse geocoding | [Plugin.Maui.GeoLocator](https://nuvyntralabs.github.io/packages/plugin-maui-geolocator/) |
| A measured offline trip against a vehicle meter | [GPSSensorTrackingService](https://nuvyntralabs.github.io/research/gps-sensor-tracking-service/) |

Play `GeofencingClient`, `CLCircularRegion`, and [Shiny](https://github.com/shinyorg/shiny) are the usual native and community choices when the app already speaks one of those APIs. Geofence is the client when the same `IGeofence` has to run on Android and iOS, cap the list at 20, and reload it after process death.

## Try it

```bash
dotnet add package Plugin.Maui.Geofence --version 1.1.0
```

Register `UseGeofence`, add one region with a radius of at least 50 meters, and subscribe to `Transition` before you leave the yard. `samples/Plugin.Maui.Geofence.Sample` requests location, adds a region, lists the persisted set, and simulates enter, exit, and dwell with `Raise()`.

- NuGet: [Plugin.Maui.Geofence](https://www.nuget.org/packages/Plugin.Maui.Geofence)
- Repository: [github.com/nuvyntralabs/Plugin.Maui.Geofence](https://github.com/nuvyntralabs/Plugin.Maui.Geofence)
- Sample: [Plugin.Maui.Geofence.Sample](https://github.com/nuvyntralabs/Plugin.Maui.Geofence/tree/main/samples/Plugin.Maui.Geofence.Sample)
- Package page: [nuvyntralabs.github.io/packages/plugin-maui-geofence/](https://nuvyntralabs.github.io/packages/plugin-maui-geofence/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
