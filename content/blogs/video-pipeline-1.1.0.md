---
title: "VideoPipeline 1.1.0: Cap the Clip, Transcode on the OS, Then Encrypt"
published: false
description: "Plugin.Maui.VideoPipeline 1.1.0 picks a camera or gallery video, applies duration, resolution, and size limits, writes a JPEG thumbnail, and transcodes with the OS encoder. There is no FFmpeg. Encrypt writes an AES-256-GCM .vault file."
tags: dotnet, maui, video, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A 40-second 4K clip should not leave the device at full size. The app needs a duration cap, a smaller frame, a thumbnail, and a file it can encrypt before upload.

**Plugin.Maui.VideoPipeline** is that path. Version **1.1.0** is on nuget.org. `FromCamera` and `FromGallery` pick the clip. `MaxDuration`, `MaxResolution`, and `MaxBytes` are the gates. Over budget, the plugin asks the OS encoder to shrink it. If the device cannot encode, the result is `CannotTranscode`. There is no FFmpeg binary in the package.

This post is the walkthrough: how to register the defaults, run the builder, and what each platform actually transcodes.

## What VideoPipeline is

VideoPipeline is the video counterpart to MediaPipeline for **.NET MAUI** on Android, iOS, Mac Catalyst, and Windows. MIT licensed. It targets `net10.0`, `net10.0-android` (API 21+), `net10.0-ios`, `net10.0-maccatalyst`, and `net10.0-windows10.0.17763.0`.

It does one job: pick a video, enforce the budget, thumbnail it, and optionally encrypt it.

| | |
| --- | --- |
| Package | [`Plugin.Maui.VideoPipeline`](https://www.nuget.org/packages/Plugin.Maui.VideoPipeline) 1.1.0 |
| Registration | `UseVideoPipeline` |
| Entry | `VideoPipeline.FromCamera`, `FromGallery`, `FromFile` |
| Encrypt | `Encrypt(key)` writes AES-256-GCM `.vault` |
| Source | [github.com/nuvyntralabs/Plugin.Maui.VideoPipeline](https://github.com/nuvyntralabs/Plugin.Maui.VideoPipeline) |
| Docs | [nuvyntralabs.github.io/packages/plugin-maui-video-pipeline/](https://nuvyntralabs.github.io/packages/plugin-maui-video-pipeline/) |

Images stay on [Plugin.Maui.MediaPipeline](https://nuvyntralabs.github.io/packages/plugin-maui-media-pipeline/). There is no `Current` singleton. Tests inject a processor with `UseProcessor`.

## Install and register

```bash
dotnet add package Plugin.Maui.VideoPipeline --version 1.1.0
```

```csharp
using Plugin.Maui.VideoPipeline;

builder
    .UseMauiApp<App>()
    .UseVideoPipeline(options =>
    {
        options.DefaultMaxDuration = TimeSpan.FromSeconds(30);
    });
```

`DefaultMaxDuration` applies when the builder does not call `MaxDuration`. The options default is already 30 seconds.

## Pick, limit, thumbnail, encrypt

```csharp
var result = await VideoPipeline.FromGallery()
    .MaxDuration(TimeSpan.FromSeconds(30))
    .MaxResolution(1280, 720)
    .MaxBytes(12 * 1024 * 1024)
    .ThumbnailAt(TimeSpan.FromSeconds(1))
    .Encrypt(key)
    .SaveAsync();

if (!result.Succeeded)
{
    // result.Status: Cancelled, TooLarge, TooLong, CannotTranscode, Unsupported
}
```

`FromCamera()` records. `FromFile(path)` and `FromSource` skip the picker. `SaveAsync` returns `VideoPipelineResult`. `Succeeded` is true only for `VideoPipelineStatus.Ok`. The artifact then carries `ThumbnailPath` when a frame could be decoded, and `Encrypted` when `Encrypt` ran.

`Encrypt` takes an AES key and writes a `.vault` file. `DecryptFileAsync` reverses that file. `UploadWith` accepts an `IMediaUploader`. `StoreIn` accepts an `IMediaVault`. Chunked upload that must resume after process death stays on SmartUpload once you have a path.

1.1.0 is the release that thumbnails and asks the OS to transcode when the clip is over budget. Android transcode honors cancel and times out.

## What each platform encodes

| Platform | Probe and thumbnail | Transcode |
| --- | --- | --- |
| Android | `MediaMetadataRetriever` | `MediaCodec` and `MediaMuxer`. Many devices return `CannotTranscode`. |
| iOS and Mac Catalyst | `AVAsset` and `AVAssetImageGenerator` | `AVAssetExportSession` at 640×480 or 1280×720, with an optional duration trim. |
| Windows | File size | `CannotTranscode`, plus a copy and thumbnail floor. |
| `net10.0` tests | File size | `CannotTranscode` unless a test injects `UseProcessor`. |

`CannotTranscode` is a typed result. The call does not throw, and the package does not fall back to a bundled encoder. If every Android device must shrink the file, an FFmpeg binding is the tool that makes that guarantee. VideoPipeline is the path when the OS encoder is enough and a failed encode must stay a status.

## Permissions the host still requests

Android, in `Platforms/Android/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
```

Camera capture needs `CAMERA` and usually `RECORD_AUDIO`. Gallery pick on API 33+ uses `READ_MEDIA_VIDEO`.

iOS, in `Platforms/iOS/Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>This app records video.</string>
<key>NSMicrophoneUsageDescription</key>
<string>This app records audio with video.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app reads videos from your library.</string>
```

Mac Catalyst and Windows use the camera and photo capabilities the MAUI host already declares.

## When something looks wrong

| What you see | What to do |
| --- | --- |
| `Cancelled` | The picker was dismissed. |
| `TooLong` or `TooLarge` after transcode | The OS encode still missed `MaxDuration` or `MaxBytes`. Lower the capture budget or reject the clip. |
| `CannotTranscode` on Android | That device's `MediaCodec` path could not encode. Show the status. Do not expect FFmpeg behavior. |
| `CannotTranscode` on Windows | Windows transcode is the typed result. Probe is file size. |
| No `ThumbnailPath` | The platform could not decode a frame at `ThumbnailAt`. |
| `Encrypted` is false | `Encrypt(key)` was not on the builder. |
| The upload restarts after a kill | VideoPipeline hands off a file. Resume belongs to SmartUpload. |

## Where VideoPipeline sits next to the other tools

| Need | Tool |
| --- | --- |
| Camera or gallery video, limits, thumbnail, OS transcode, encrypt | **VideoPipeline** — `Plugin.Maui.VideoPipeline` |
| Camera-to-upload images | [Plugin.Maui.MediaPipeline](https://nuvyntralabs.github.io/packages/plugin-maui-media-pipeline/) |
| Resumable upload of the file you just wrote | [Plugin.Maui.SmartUpload](https://nuvyntralabs.github.io/packages/plugin-maui-smart-upload/) |
| A guaranteed encode on every Android device | An FFmpeg binding |

MAUI `MediaPicker` is enough when you only need the original file. VideoPipeline is the pipeline when the budget, the thumbnail, and the `.vault` file are part of the same call.

## Try it

```bash
dotnet add package Plugin.Maui.VideoPipeline --version 1.1.0
```

Register `UseVideoPipeline`, call `FromGallery` with a 30-second cap and a 12 MB ceiling, and branch on `result.Status`. `samples/Plugin.Maui.VideoPipeline.Sample` covers camera, gallery, encrypt, thumbnail, and a `CannotTranscode` result that does not crash.

- NuGet: [Plugin.Maui.VideoPipeline](https://www.nuget.org/packages/Plugin.Maui.VideoPipeline)
- Repository: [github.com/nuvyntralabs/Plugin.Maui.VideoPipeline](https://github.com/nuvyntralabs/Plugin.Maui.VideoPipeline)
- Sample: [Plugin.Maui.VideoPipeline.Sample](https://github.com/nuvyntralabs/Plugin.Maui.VideoPipeline/tree/main/samples/Plugin.Maui.VideoPipeline.Sample)
- Package page: [nuvyntralabs.github.io/packages/plugin-maui-video-pipeline/](https://nuvyntralabs.github.io/packages/plugin-maui-video-pipeline/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
