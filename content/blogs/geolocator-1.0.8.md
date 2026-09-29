---
title: "GeoLocator 1.0.8: One Fix, a Tracking Session, and a Reverse Geocode"
published: false
description: "Plugin.Maui.GeoLocator 1.0.8 gets a GPS fix, starts and stops a tracking session, and reverse geocodes on Android and iOS. Circular regions stay on Geofence. A measured trip stays on the Kotlin proof."
tags: dotnet, maui, gps, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A field form needs the yard the technician is standing in. A trip screen needs the next fix every few seconds. A label under the pin needs a street, not a pair of numbers.

**Plugin.Maui.GeoLocator** is those three calls. Version **1.0.8** is on nuget.org. Android and iOS share `IGeoLocator`. Mac Catalyst and Windows are not primary targets.

This post is the walkthrough: a single fix, a tracking session, reverse geocoding, and the permissions the host still declares.

## What GeoLocator is

GeoLocator is a location plugin for **.NET MAUI**. MIT licensed. It targets `net10.0`, `net10.0-android` (API 21+), and `net10.0-ios` (15+). On `net10.0` the location APIs throw `GeoLocatorException` with `FeatureNotSupported`, so shared projects can reference the package.

It does one job: return a position, stream positions until you stop, and turn a coordinate into an address.

| | |
| --- | --- |
| Package | [`Plugin.Maui.GeoLocator`](https://www.nuget.org/packages/Plugin.Maui.GeoLocator) 1.0.8 |
| Registration | `UseGeoLocator` |
| Client | `IGeoLocator`, or `GeoLocator.Current` |
| Source | [github.com/nuvyntralabs/Plugin.Maui.GeoLocator](https://github.com/nuvyntralabs/Plugin.Maui.GeoLocator) |
| Docs | [nuvyntralabs.github.io/packages/plugin-maui-geolocator/](https://nuvyntralabs.github.io/packages/plugin-maui-geolocator/) |

Enter, exit, and dwell for a circular region stay on [Plugin.Maui.Geofence](https://nuvyntralabs.github.io/packages/plugin-maui-geofence/). GeoLocator does not draw a map.

## Install and register

```bash
dotnet add package Plugin.Maui.GeoLocator --version 1.0.8
```

```csharp
builder
    .UseMauiApp<App>()
    .UseGeoLocator(options =>
    {
        options.EnableLogging = true;
    });
```

Resolve `IGeoLocator` from dependency injection, or use `GeoLocator.Current`. When `EnableLogging` is true and the host registered a logger (`builder.Logging.AddDebug()`), the plugin writes through `ILogger`. You can also call `EnableLogging(true)`, pass a `DebugGeoLocatorLogger`, or turn it off with `EnableLogging(false)`.

The plugin requests when-in-use location at runtime. Declare the usage strings yourself.

Android, in `Platforms/Android/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

iOS, in `Platforms/iOS/Info.plist`:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs your location to show where you are.</string>
```

## One fix

```csharp
var location = await GeoLocator.Current.GetCurrentLocationAsync(new LocationRequest
{
    Accuracy = LocationAccuracy.Best,
    Timeout = TimeSpan.FromSeconds(20)
});
```

The last cached fix, when the platform still has one:

```csharp
var last = await GeoLocator.Current.GetLastKnownLocationAsync();
```

`GetCurrentLocationAsync` waits for a new reading. `GetLastKnownLocationAsync` returns what the device already stored. A form that must open offline can show the cached fix first and replace it when the new one arrives.

## A tracking session

Tracking is a session you start and stop. It is built for the foreground.

```csharp
var locator = GeoLocator.Current;

locator.LocationChanged += (_, e) =>
{
    var position = e.Location;
};

locator.LocationError += (_, e) =>
{
    Console.WriteLine(e.Message);
};

await locator.StartTrackingAsync(new TrackingOptions
{
    Accuracy = LocationAccuracy.High,
    MinimumTime = TimeSpan.FromSeconds(2),
    MinimumDistanceMeters = 5
});

await locator.StopTrackingAsync();
```

`MinimumTime` and `MinimumDistanceMeters` drop fixes that arrive too soon or too close. Subscribe to `LocationChanged` and `LocationError` before `StartTrackingAsync`.

Background tracking is a host concern. On Android it needs a foreground service in the app. On iOS it needs `AllowBackgroundUpdates = true`, always-authorization text, and the `location` background mode. The plugin does not add that service for you.

## Reverse geocoding

```csharp
var addresses = await GeoLocator.Current.ReverseGeocodeAsync(
    latitude: 47.6062,
    longitude: -122.3321);

foreach (var address in addresses)
    Console.WriteLine(address.FormattedAddress);
```

Pass the latitude and longitude you already have. The call does not start a tracking session.

## When something looks wrong

| What you see | What to do |
| --- | --- |
| `GeoLocatorException` / `FeatureNotSupported` | The call ran on `net10.0` or a target that is not Android or iOS. |
| The prompt never appears | The manifest or `Info.plist` usage string is missing. The plugin requests when-in-use. It does not add the declaration. |
| `GetCurrentLocationAsync` times out | Accuracy is `Best` indoors, or location is off on the device. Try the last known fix, then a longer `Timeout`. |
| Fixes arrive after `StopTrackingAsync` | The handler is still attached. Unsubscribe when the page goes away. |
| The trace dies when the screen locks | Foreground tracking stopped with the process. Background needs the host service on Android, or `AllowBackgroundUpdates` plus the location background mode on iOS. |
| You wanted "entered the depot" | That is a region. Use Geofence. GeoLocator answers where the device is. |

## Where GeoLocator sits next to the other tools

| Need | Tool |
| --- | --- |
| A current fix, a tracking session, reverse geocoding | **GeoLocator** — `Plugin.Maui.GeoLocator` |
| Enter, exit, and dwell for up to 20 circles | [Plugin.Maui.Geofence](https://nuvyntralabs.github.io/packages/plugin-maui-geofence/) |
| A measured offline trip against a vehicle meter | [GPSSensorTrackingService](https://nuvyntralabs.github.io/research/gps-sensor-tracking-service/) |
| One fix and nothing else | .NET MAUI `Geolocation` already does that |

MAUI `Geolocation` and the older Xamarin.Essentials API cover an on-demand fix. GeoLocator is the client when the same type also has to start and stop a session and reverse geocode. A hosted map (Google Maps, Mapbox) is still a separate SDK.

## Try it

```bash
dotnet add package Plugin.Maui.GeoLocator --version 1.0.8
```

Register `UseGeoLocator`, declare when-in-use location, and call `GetCurrentLocationAsync` once before you start a session. `samples/GeoLocator.Sample` exercises the fix, the cache, tracking, and reverse geocoding.

- NuGet: [Plugin.Maui.GeoLocator](https://www.nuget.org/packages/Plugin.Maui.GeoLocator)
- Repository: [github.com/nuvyntralabs/Plugin.Maui.GeoLocator](https://github.com/nuvyntralabs/Plugin.Maui.GeoLocator)
- Sample: [GeoLocator.Sample](https://github.com/nuvyntralabs/Plugin.Maui.GeoLocator/tree/main/samples/GeoLocator.Sample)
- Package page: [nuvyntralabs.github.io/packages/plugin-maui-geolocator/](https://nuvyntralabs.github.io/packages/plugin-maui-geolocator/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
