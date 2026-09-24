---
title: "SmartUpload 1.0.7: Resume a File Upload After the Process Dies"
published: false
description: "Plugin.Maui.SmartUpload 1.0.7 uploads MAUI files in chunks and resumes from the last acknowledged byte after a crash. Content-Range and tus are built in. Endpoints must be https."
tags: dotnet, maui, upload, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A field photo that dies halfway through one POST has to start again from byte zero. The next launch has no record of what the server already accepted.

**Plugin.Maui.SmartUpload** keeps that record. Version **1.0.7** is on nuget.org. The file is sent in slices. Each acknowledged offset is written to disk. After a crash, pause, or retry, the next attempt continues from that offset.

This post is the walkthrough: how to register the client, enqueue a file, which wire protocol to pick, and what still belongs to the host when the transfer has to keep running after the UI is gone.

## What SmartUpload is

SmartUpload is the chunked upload client for **.NET MAUI** on Android, iOS, Mac Catalyst, and Windows. MIT licensed. It targets `net10.0`, `net10.0-android` (API 21+), `net10.0-ios` and `net10.0-maccatalyst` (15+), and `net10.0-windows` (10.0.17763+). 1.0.7 adds the Mac Catalyst and Windows target frameworks for the shared implementation.

It does one job: move a file in resumable chunks and remember how far the server got.

| | |
| --- | --- |
| Package | [`Plugin.Maui.SmartUpload`](https://www.nuget.org/packages/Plugin.Maui.SmartUpload) 1.0.7 |
| Registration | `UseSmartUpload` |
| Client | `ISmartUploadClient`, or `SmartUpload.Current` |
| Protocols | Content-Range (default), tus 1.0, or `IUploadProtocol` |
| Source | [github.com/nuvyntralabs/Plugin.Maui.SmartUpload](https://github.com/nuvyntralabs/Plugin.Maui.SmartUpload) |
| Docs | [nuvyntralabs.github.io/packages/plugin-maui-smart-upload/](https://nuvyntralabs.github.io/packages/plugin-maui-smart-upload/) |

The acknowledged offset survives process death. The operating system does not keep sending bytes after the process is gone. A transfer that must continue with the UI closed still needs a host foreground service on Android, or a host `NSURLSession` background configuration on iOS. SmartUpload is what those hosts resume from.

## Install and register

```bash
dotnet add package Plugin.Maui.SmartUpload --version 1.0.7
```

```csharp
builder
    .UseMauiApp<App>()
    .UseSmartUpload(options =>
    {
        options.EnableLogging = true;
        options.DefaultChunkSize = 512 * 1024;
        options.MaxConcurrentUploads = 2;
        options.ResumeInterruptedOnStart = true;
        options.RequireHttps = true;
        options.DefaultRetry = new RetryPolicy
        {
            MaxRetries = 5,
            InitialDelay = TimeSpan.FromSeconds(1),
            MaxDelay = TimeSpan.FromSeconds(30)
        };
    });
```

Resolve `ISmartUploadClient` from dependency injection, or call `SmartUpload.Current`.

`DefaultChunkSize` falls back to 1 MB when you leave it alone. The default is clamped between 64 KB and 32 MB. An explicit `UploadRequest.ChunkSize` must be positive and is capped at 32 MB. `MaxConcurrentUploads` defaults to 2; extra sessions stay `Queued` until a slot opens. `HttpTimeout` is 100 seconds per chunk.

`ResumeInterruptedOnStart` defaults to false. Set it, or call `ResumeInterruptedAsync()` yourself after launch. That call resumes sessions that were uploading when the process died, and any queued work that had `AutoStart`.

## Enqueue a file

```csharp
var client = SmartUpload.Current;

var session = await client.EnqueueAsync(new UploadRequest
{
    FilePath = photoPath,
    Endpoint = new Uri("https://uploads.example.com/files/"),
    Protocol = UploadProtocolKind.Tus,
    Headers =
    {
        ["Authorization"] = $"Bearer {accessToken}"
    },
    Metadata =
    {
        ["album"] = "field"
    }
});
```

`FilePath` is an absolute path. The file has to stay at that path, non-empty, until the session completes. `Endpoint` is required. For tus it is the creation URL; the client follows `Location`. For Content-Range it is the URL that receives each slice. `Method` defaults to `PUT` and applies only to Content-Range.

`Protocol` defaults to `UploadProtocolKind.ContentRange`. Omit it when the server speaks `Content-Range`. Set `Tus` for a tus 1.0 endpoint. `FileName` defaults to the file name. `ContentType` is inferred from the extension when omitted.

`AutoStart` defaults to true, so the session starts as soon as a concurrency slot is free. Set it false to persist the session and call `StartAsync` later.

`SessionId` is optional. When you supply one, it may contain only letters, digits, `-`, and `_`, and it cannot exceed 128 characters. Otherwise the client generates a GUID.

## Pause, resume, and the session states

```csharp
await client.PauseAsync(session.SessionId);
await client.ResumeAsync(session.SessionId);
await client.RetryAsync(session.SessionId);
await client.CancelAsync(session.SessionId);
await client.RemoveAsync(session.SessionId);

var all = await client.GetSessionsAsync();
```

`PauseAsync` stops after the current chunk is cancelled and keeps the offset. `ResumeAsync` continues a paused or interrupted session from the last acknowledged byte. `RetryAsync` starts a failed or cancelled session again from that same offset. `CancelAsync` leaves the record until `RemoveAsync`, which deletes it. `GetSessionsAsync` returns every persisted session, newest first.

| State | Meaning |
| --- | --- |
| `Queued` | Waiting for a concurrency slot, or for `StartAsync` |
| `Uploading` | A chunk is in flight |
| `Paused` | Caller stopped it; the offset is on disk |
| `Completed` | The server accepted every byte |
| `Failed` | A non-retryable error, or retries ran out |
| `Cancelled` | Caller cancelled; the record remains until `RemoveAsync` |

Progress is an immutable `UploadSession` plus `UploadProgress.Fraction` (`BytesUploaded / TotalBytes`, clamped to 0..1):

```csharp
client.ProgressChanged += (_, e) =>
    Debug.WriteLine($"{e.Session.FileName}: {e.Progress.Fraction:P0}");

client.SessionCompleted += (_, e) =>
    Debug.WriteLine($"Done {e.Session.SessionId}");

client.SessionFailed += (_, e) =>
    Debug.WriteLine($"{e.Error}: {e.Message}");
```

`SessionStateChanged` fires as the session moves through the table above.

## Two built-in protocols

| Protocol | What the client sends |
| --- | --- |
| `ContentRange` | `PUT` or `POST` each slice with `Content-Range: bytes start-end/total`, `X-Upload-Id`, `X-Chunk-Index`, and `X-Chunk-Count`. An optional `HEAD` can return `Range` or `X-Last-Byte` so the client can catch up. |
| `Tus` | tus 1.0: `POST` to create, `HEAD` for `Upload-Offset`, `PATCH` with `application/offset+octet-stream`. `Metadata` is sent as `Upload-Metadata`. |
| `Custom` | `UploadRequest.CustomProtocol`, or `SmartUploadOptions.CustomProtocol`, implementing `IUploadProtocol`. |

A Content-Range slice looks like this:

```text
PUT /upload HTTP/1.1
Content-Range: bytes 0-1048575/10485760
Content-Length: 1048576
X-Upload-Id: 2f1c9a0e...
X-Chunk-Index: 0
X-Chunk-Count: 10
```

`IUploadProtocol` is the extension point: `InitializeAsync`, `QueryRemoteProgressAsync`, `UploadChunkAsync`, `CompleteAsync`, and `AbortAsync`. `InitializeAsync` has to be idempotent. The chunk stream length equals that slice.

`DeleteRemoteOnCancel` defaults to false. When it is true, a tus cancel sends `DELETE` if the server advertised the termination extension.

## What is written to disk

Sessions are JSON files under `FileSystem.AppDataDirectory/Plugin.Maui.SmartUpload/`. Set `StorageDirectory` to move that folder, or set `Store` to replace the file store with your own `IUploadStore`.

Each record keeps the file path, size, last-write timestamp, endpoint, headers, protocol state (including the tus `Location`), and the acknowledged byte offset. On resume, a missing file fails with `UploadError.FileNotFound`. A different length or last-write time fails with `UploadError.FileChanged`. The client will not continue a session against a file that is no longer the one it started.

Headers are part of that JSON, including `Authorization`. A bearer token stored there is what the next request sends. Refresh it before resume when the token can expire while the app is dead.

## HTTPS is the default

`RequireHttps` defaults to true. An `http://` endpoint throws `SmartUploadException` with `UploadError.InvalidRequest` and the message `Endpoint must be an https URL. Set RequireHttps to false to allow http.`

That default shipped with the hardened 1.0.6 release and is still the 1.0.7 behavior. Set `RequireHttps = false` only for a local development server. On iOS, cleartext also needs an App Transport Security exception. The scheme has to be `http` or `https` either way.

The package declares `INTERNET` and `ACCESS_NETWORK_STATE`. Keep both if the host merges Android manifests by hand.

## Retry

`RetryPolicy.Default` retries five times. The first wait is 1 second, the multiplier is 2, and the wait is capped at 30 seconds. Jitter lands between 80% and 120% of that delay. Status codes 408, 429, 500, 502, 503, and 504 are retryable, along with `HttpRequestException`, `IOException`, `TimeoutException`, and `TaskCanceledException`. `OperationCanceledException` stops the loop. A `SmartUploadException` retries only when it is marked retryable.

`RetryPolicy.None` sets `MaxRetries` to 0. A per-request `UploadRequest.Retry` overrides `DefaultRetry`.

When retries are exhausted, the session lands in `Failed` with the offset still on disk. `RetryAsync` starts again from that offset.

## A client that does not touch `Current`

Tests can build an isolated client. `SmartUpload.Create` does not replace `SmartUpload.Current`.

```csharp
using var client = SmartUpload.Create(new SmartUploadOptions
{
    Store = new MyStore(),
    HttpClient = httpClient,
    DefaultChunkSize = 64 * 1024,
    DefaultRetry = RetryPolicy.None
});
```

A caller-supplied `HttpClient` is not disposed by the plugin. `samples/SmartUpload.Sample` creates a 1 MB file, or picks one, and exercises tus or Content-Range with pause, resume, retry, and cancel.

## When something looks wrong

| What you see | What to do |
| --- | --- |
| `InvalidRequest`: endpoint must be https | The URL is `http://` and `RequireHttps` is still true. Use https, or set `RequireHttps = false` for local development only. |
| `FileNotFound` at enqueue | `FilePath` is missing, blank, or the file length is 0. |
| `FileChanged` on resume | The file was rewritten or replaced. Length and last-write time are part of the session. Start a new session for the new bytes. |
| `FileNotFound` on resume | The source file was deleted. The session cannot continue. |
| Progress stuck in `Queued` | `MaxConcurrentUploads` slots are full, or `AutoStart` is false and nothing called `StartAsync`. |
| Upload starts over after a kill | `ResumeInterruptedOnStart` is false and nothing called `ResumeInterruptedAsync`. |
| Session stays `Failed` | Retries are exhausted. Call `RetryAsync`. The offset is still stored. |
| Custom protocol rejected | `Protocol` is `Custom` and both `UploadRequest.CustomProtocol` and `SmartUploadOptions.CustomProtocol` are null. |
| Transfer dies when the user leaves the app | The offset is on disk. Continuing while the process is suspended is a host foreground service (Android) or `NSURLSession` background session (iOS). |

## Where SmartUpload sits next to the other tools

| Need | Tool |
| --- | --- |
| Chunked file upload that resumes after process death | **SmartUpload** — `Plugin.Maui.SmartUpload` |
| JSON around the file: create the asset, confirm completion | [Plugin.Maui.HttpForge](https://nuvyntralabs.github.io/packages/plugin-maui-httpforge/) |
| Retry, circuit breaker, and an offline queue for ordinary HTTP calls | [Plugin.Maui.ApiResilience](https://nuvyntralabs.github.io/packages/plugin-maui-api-resilience/) |
| Durable jobs with backoff and a dead-letter path | [Plugin.Maui.JobQueue](https://nuvyntralabs.github.io/packages/plugin-maui-job-queue/) |
| Resize, strip EXIF, watermark, or encrypt before the file leaves the device | [Plugin.Maui.MediaPipeline](https://nuvyntralabs.github.io/packages/plugin-maui-media-pipeline/) |
| Encrypted files at rest on the device | [Plugin.Maui.FileVault](https://nuvyntralabs.github.io/packages/plugin-maui-file-vault/) |

HttpForge `[Multipart]` is one POST. Use it for the JSON that books the upload and confirms it. Use SmartUpload for the bytes when a kill has to be recoverable. A small JSON call stays on `HttpClient` or ApiResilience.

MediaPipeline can finish a photo and leave a file path. That path is what `EnqueueAsync` takes. FileVault keeps a file encrypted on the device; SmartUpload sends a file to an endpoint.

A general-purpose tus client is the usual choice when the app is not a MAUI host, or when the organization already standardized on one. SmartUpload is the client when the same session API has to run on Android, iOS, Mac Catalyst, and Windows, and the offset has to be on disk after the process dies.

## Try it

```bash
dotnet add package Plugin.Maui.SmartUpload --version 1.0.7
```

Register `UseSmartUpload` with `RequireHttps = true` and `ResumeInterruptedOnStart = true`. Enqueue one file with `UploadProtocolKind.Tus` or the default Content-Range protocol, then read `ProgressChanged` until `SessionCompleted`.

- NuGet: [Plugin.Maui.SmartUpload](https://www.nuget.org/packages/Plugin.Maui.SmartUpload)
- Repository: [github.com/nuvyntralabs/Plugin.Maui.SmartUpload](https://github.com/nuvyntralabs/Plugin.Maui.SmartUpload)
- Sample: [SmartUpload.Sample](https://github.com/nuvyntralabs/Plugin.Maui.SmartUpload/tree/main/samples/SmartUpload.Sample)
- Package page: [nuvyntralabs.github.io/packages/plugin-maui-smart-upload/](https://nuvyntralabs.github.io/packages/plugin-maui-smart-upload/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
