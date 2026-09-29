---
title: "Pulse 1.0.1: Nine Lanes for the Plugins the App Already Registered"
published: false
description: "Plugin.Maui.Pulse 1.0.1 is a Debug sink. maui-pulse attach draws NETWORK, API, QUEUE, SYNC, PERMS, HEALTH, LEAK, CRASH, and SESSION. It does not scrape logcat, and it does not start plugins for you."
tags: dotnet, maui, observability, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A field app fails in the yard and the log is a wall of framework noise. The useful line is the one the app already raised: captive portal, a failed job, a sync conflict.

**Pulse** shows those lines in a nine-lane table while the session is still running. Version **1.0.1** ships as two packages at the same version. The host listens. The CLI draws.

This post is the walkthrough: `UseMauiPulse()`, `maui-pulse attach`, and how to read a quiet row.

## What Pulse is

`Plugin.Maui.Pulse` is a Debug sink inside the MAUI app. `UseMauiPulse()` finds allow-listed plugins that are already in dependency injection, stays subscribed to their events, and POSTs JSON to the development machine.

`Plugin.Maui.Pulse.Cli` is the global tool. `maui-pulse attach` listens on port 7878 and draws the table. The person using the app does not tap anything for Pulse.

| | |
| --- | --- |
| Host | [`Plugin.Maui.Pulse`](https://www.nuget.org/packages/Plugin.Maui.Pulse) 1.0.1 |
| CLI | [`Plugin.Maui.Pulse.Cli`](https://www.nuget.org/packages/Plugin.Maui.Pulse.Cli) 1.0.1 |
| Command | `maui-pulse attach` |
| Endpoint | `http://127.0.0.1:7878/` (emulator: `10.0.2.2`) |
| Source | [github.com/nuvyntralabs/MauiPulse](https://github.com/nuvyntralabs/MauiPulse) |
| Docs | [nuvyntralabs.github.io/toolkits/maui-pulse/](https://nuvyntralabs.github.io/toolkits/maui-pulse/) |

Pulse does not scrape logcat, Charles, Firebase, Sentry, or MAUI Connectivity. Unknown sources are dropped. It does not start a plugin, and it does not invent a row from the operating system when a package is missing.

## Register the host

Add the host package to the app. Install the CLI on the machine. Do not add `Plugin.Maui.Pulse.Cli` as a `PackageReference`.

```bash
dotnet add package Plugin.Maui.Pulse --version 1.0.1
dotnet tool install -g Plugin.Maui.Pulse.Cli --source https://api.nuget.org/v3/index.json
```

```csharp
builder
    .UseMauiApp<App>()
    .UseMauiPulse();
```

`UseMauiPulse()` only registers services. After `Build()`, the initializer resolves the package name (`AppInfo.PackageName` unless you set `Package`), opens the sink, walks the allow-list, and subscribes to instances already in DI. A plugin registered after that pass is missed.

Release builds set `Enabled` to false before your callback. Set `options.Enabled = true` only when you intend the sink to run in Release. A closed CLI does not crash the host: the POST times out in 3 seconds and the error is swallowed.

The app still registers the plugins it already uses. Pulse only listens.

## Attach

USB Android needs a reverse before the phone can reach the CLI:

```bash
adb reverse tcp:7878 tcp:7878
maui-pulse attach --package com.myapp.android --android --port 7878
```

iOS:

```bash
maui-pulse attach --package com.myapp.ios --ios --port 7878
```

Every session command requires `--package` (one Android application id or one iOS bundle id). `attach` and `listen` also require `--android` or `--ios`. JSON for a different package is dropped. Two apps need two Pulse windows.

```text
maui-pulse 1.0.1  attach  com.myapp.android  android  :7878
session 8f2a

NETWORK   Plugin.Maui.NetworkMonitor      captive portal
API       Plugin.Maui.NetworkDiagnostics  —
QUEUE     Plugin.Maui.JobQueue            visits#184
          Plugin.Maui.RetryQueue          — not installed
SYNC      Plugin.Maui.OfflineSync         conflict on Visit
PERMS     Plugin.Maui.PermissionFlow      —
HEALTH    Plugin.Maui.AppHealth           battery 18%
LEAK      Plugin.Maui.LeakAnalyser        —
CRASH     Plugin.Maui.Diagnostics         —
SESSION   Plugin.Maui.DeviceSession       session 8f2a
```

| Row | Meaning |
| --- | --- |
| A headline (`captive portal`, `visits#184`) | At least one allow-listed event arrived |
| `—` | Subscribed, waiting. This is not a failure |
| `— not installed` | The assembly is not loaded |
| `— not registered` | The package is referenced and `UseX()` / `AddX()` was not called |

`--lanes network,sync,queue` hides rows. It does not add plugins to the allow-list. GeoLocator, PushRouter, SmartUpload, and every other package are never a lane.

The nine lanes, and the registration Pulse looks for:

| Lane | Package | Register |
| --- | --- | --- |
| NETWORK | NetworkMonitor | `AddNetworkMonitor` |
| API | NetworkDiagnostics | `UseNetworkDiagnostics` |
| QUEUE | JobQueue, and RetryQueue on its own row | `UseMauiJobQueue`, `UseMauiRetryQueue` |
| SYNC | OfflineSync | `UseOfflineSync` |
| PERMS | PermissionFlow | `UsePermissionFlow` |
| HEALTH | AppHealth | `UseAppHealth` |
| LEAK | LeakAnalyser | `UseLeakAnalyser` |
| CRASH | Diagnostics | `UseMauiDiagnostics` |
| SESSION | DeviceSession | `UseDeviceSession` |

QUEUE is two plugins. JobQueue alone is a valid session. RetryQueue then shows `— not installed`.

## After the session

`maui-pulse listen` is the same HTTP sink with no table. `GET /` returns `{ "ok": true, "tool": "maui-pulse" }`. `--stdin` accepts one JSON payload for a test or an agent.

Live events are optional for the file lanes. Copy the known files off the device, then inspect them. `pull` copies from a folder you already have. `--adb` only prints how to copy. It does not scrape logcat, and `logcat.txt` in that folder is ignored.

```bash
maui-pulse pull --package com.myapp.android --from ./device-files --out ./pulled
maui-pulse queues --package com.myapp.android --from ./pulled
maui-pulse sync --package com.myapp.android --from ./pulled
maui-pulse incident --package com.myapp.android --from ./pulled --out incident.zip
```

Known names: `plugin.maui.jobqueue.db3`, `plugin.maui.retryqueue.db3`, `offlinesync.db3`, and `maui-diagnostics/`. `queues` and `sync` are read-only. They do not drain a queue or retry a row. `incident` zips the allow-listed files plus `manifest.json`.

Exit `0` includes skipped lanes and missing queue files. Exit `1` means no allow-listed evidence or the port bind failed. Exit `2` is usage.

On an interactive terminal the CLI asks every 4 hours whether to update from nuget.org. Skip it with `--no-update-check` or `NUVYNTRA_NO_UPDATE_CHECK=1`. CI, `--format json`, and piped output skip the prompt. The CLI does not phone home.

## When something looks wrong

| What you see | What to do |
| --- | --- |
| Every lane is `— not installed` | Those packages are not in this app. Pulse will not fill the lane from the OS. |
| `— not registered` | The assembly loaded. Call the plugin's `UseX()` before the app finishes starting. |
| The table stays empty and the phone is on USB | Run `adb reverse tcp:7878 tcp:7878` again after unplug. |
| A plugin you added at runtime never appears | Bind runs once at startup. Register it in `MauiProgram`. |
| Release is silent | `Enabled` is false unless you set `options.Enabled = true`. |
| Sentry or logcat lines never show up | They are dropped. Pulse renders the nine lanes only. |

[Plugin.Maui.Observability](https://nuvyntralabs.github.io/packages/plugin-maui-observability/) can POST at the same port. It is a pipe, not a tenth lane. Domains other than Network, Health, Sync, and Session are dropped.

## Where Pulse sits next to the other tools

| Need | Tool |
| --- | --- |
| What the allow-listed plugins are doing in this Debug session | **Pulse** |
| SDK, workloads, and the csproj | [maui-dev doctor](https://nuvyntralabs.github.io/toolkits/maui-dev/) |
| Startup and page traces | [Plugin.Maui.Performance](https://nuvyntralabs.github.io/packages/plugin-maui-performance/) / `maui-perf` |
| An exporter the app owns | [Plugin.Maui.Observability](https://nuvyntralabs.github.io/packages/plugin-maui-observability/) |

`adb logcat`, Charles, Firebase Performance, and Sentry remain the tools for raw logs, HTTP, and a report that arrives after the session. Pulse is the table for the plugins you already registered.

## Try it

```bash
dotnet add package Plugin.Maui.Pulse --version 1.0.1
dotnet tool install -g Plugin.Maui.Pulse.Cli --source https://api.nuget.org/v3/index.json
adb reverse tcp:7878 tcp:7878
maui-pulse attach --package com.myapp.android --android --port 7878
```

Call `UseMauiPulse()`, keep the `UseX()` lines you already have, and read a `—` as waiting.

- Host: [Plugin.Maui.Pulse](https://www.nuget.org/packages/Plugin.Maui.Pulse)
- CLI: [Plugin.Maui.Pulse.Cli](https://www.nuget.org/packages/Plugin.Maui.Pulse.Cli)
- Repository: [github.com/nuvyntralabs/MauiPulse](https://github.com/nuvyntralabs/MauiPulse)
- Toolkit page: [nuvyntralabs.github.io/toolkits/maui-pulse/](https://nuvyntralabs.github.io/toolkits/maui-pulse/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
