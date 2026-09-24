---
title: "OfflineSync 1.0.10: Write on the Device, Sync When the Network Is Real"
published: false
description: "Plugin.Maui.OfflineSync 1.0.10 stores MAUI writes in SQLite, queues a change log, and pushes when connectivity returns. Conflicts use last-write-wins, server-wins, client-wins, or your own resolver."
tags: dotnet, maui, sync, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A field note written in a dead zone has to land on the device first. The server can catch up when the radio comes back.

**Plugin.Maui.OfflineSync** is that queue. Version **1.0.10** is on nuget.org. `InsertAsync`, `UpdateAsync`, and `DeleteAsync` finish locally. A change log records the mutation. `SyncAsync` pushes the log and pulls remote updates. A failed automatic push is isolated so it does not take the process down.

This post is the walkthrough: how to register the engine, write a `SyncableEntity`, pick a conflict strategy, and what the HTTP remote expects.

## What OfflineSync is

OfflineSync is an offline-first sync engine for **.NET MAUI** on Android and iOS. MIT licensed. It targets `net10.0`, `net10.0-android` (API 21+), and `net10.0-ios` (15+). The local file is SQLite (`offlinesync.db3` under app data) unless you pass `DatabasePath` or `UseInMemoryStore`.

It does one job: keep the write on the device, then ship the change log when the network is real.

| | |
| --- | --- |
| Package | [`Plugin.Maui.OfflineSync`](https://www.nuget.org/packages/Plugin.Maui.OfflineSync) 1.0.10 |
| Registration | `UseOfflineSync` |
| Client | `IOfflineSyncEngine`, or `OfflineSync.Default` |
| Store | SQLite by default, or an in-memory store for tests |
| Source | [github.com/nuvyntralabs/Plugin.Maui.OfflineSync](https://github.com/nuvyntralabs/Plugin.Maui.OfflineSync) |
| Docs | [nuvyntralabs.github.io/packages/plugin-maui-offline-sync/](https://nuvyntralabs.github.io/packages/plugin-maui-offline-sync/) |

Room-style insert, find, replace, and delete across SQLite, NuvexaDB, Realm, or LiteDB stays on [Plugin.Maui.LocalStore](https://nuvyntralabs.github.io/packages/plugin-maui-local-store/). OfflineSync is the sync protocol, not a second CRUD API for every engine.

## Install and register

```bash
dotnet add package Plugin.Maui.OfflineSync --version 1.0.10
```

```csharp
using Plugin.Maui.OfflineSync;

builder
    .UseMauiApp<App>()
    .UseOfflineSync(options =>
    {
        options.RemoteBaseAddress = new Uri("https://api.example.com/sync/");
        options.ConflictStrategy = ConflictStrategy.LastWriteWins;
        options.AutoSync = true;
        options.AutoSyncInterval = TimeSpan.FromMinutes(5);
    });
```

`AutoSync` is on by default, on a five-minute timer. `SyncOnNetworkRestored` and `SyncOnResume` are also on. Timer and connectivity sync catch exceptions. Subscribe to `SyncCompleted` and `StatusChanged` when the UI has to show a failed push. 1.0.10 also finishes the Android job even when `JobFinished` arrives after the service instance is gone.

`LocalOnly` skips remote calls. `EnableBackgroundSync` registers Android `JobScheduler` or iOS `BGTaskScheduler`. That flag still needs the manifest entries below.

## Write locally

```csharp
public sealed class TodoItem : SyncableEntity
{
    public string Title { get; set; } = "";
    public bool IsDone { get; set; }
}

var todos = OfflineSync.Default.GetCollection<TodoItem>("todos");
await todos.InsertAsync(new TodoItem { Title = "Buy milk" });
await OfflineSync.Default.SyncAsync();
```

`SyncableEntity` carries `Id`, `Version`, `CreatedAtUtc`, `UpdatedAtUtc`, `IsDeleted`, and a local `SyncState`. An empty id is filled on insert. `SyncState` stays on the device. An edit after an insert stays one insert in the change log.

`InsertAsync`, `UpdateAsync`, and `DeleteAsync` complete against SQLite before any HTTP call. `GetAsync`, `GetAllAsync`, and `QueryAsync` read that local set. `GetPendingCountAsync` tells you how many changes are still waiting. `RequeueFailedAsync` puts a `Failed` change back on the queue after `MaxRetryAttempts` (8 by default).

## Conflicts

The default strategy is `ConflictStrategy.LastWriteWins`: the later `UpdatedAtUtc` is kept. `ServerWins` keeps the remote document. `ClientWins` keeps the local one. `Custom` requires `OfflineSyncOptions.CustomConflictResolver`.

```csharp
OfflineSync.Default.ConflictDetected += (_, args) =>
{
    // args.Collection, args.EntityId, args.Winner: Local, Remote, or Merged
};
```

`StatusChanged` reports `Idle`, `Syncing`, `Offline`, or `Failed`. `SyncCompleted` fires after a cycle finishes, including a skip or a failure. `CollectionChanged` fires for a local mutation and for a remote merge.

## What the HTTP remote looks like

`HttpRemoteSyncClient` is the default when you set `RemoteBaseAddress`. Pull is `GET {base}/{collection}?cursor={cursor}`. Push is `POST {base}/{collection}/changes` with `operation`, `baseVersion`, `updatedAtUtc`, and `payloadJson`. The response lists `accepted`, `conflicts`, and `rejected`. A conflict should include `serverVersion`, `serverUpdatedAtUtc`, and `serverPayloadJson` so the resolver can run.

Supply your own transport when the API is already shaped:

```csharp
builder.Services.AddSingleton<IRemoteSyncClient, MyApiClient>();
```

`RemoteAccessToken` or `RemoteAccessTokenProvider` attaches a bearer token to the built-in client. An in-memory remote exists for the sample and for tests.

## Background sync permissions

Leave `EnableBackgroundSync` false until the host declares the platform entries.

Android:

```xml
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

iOS, with the identifier `plugin.maui.offlinesync.refresh`:

```xml
<key>BGTaskSchedulerPermittedIdentifiers</key>
<array>
    <string>plugin.maui.offlinesync.refresh</string>
</array>
<key>UIBackgroundModes</key>
<array>
    <string>fetch</string>
    <string>processing</string>
</array>
```

## When something looks wrong

| What you see | What to do |
| --- | --- |
| `OfflineSync has not been initialized` | Call `UseOfflineSync` before `OfflineSync.Default`. |
| Writes succeed and nothing reaches the server | `LocalOnly` is true, `AutoSync` is false and nothing called `SyncAsync`, or the device is still offline. |
| Status stays `Failed` | Read `SyncCompleted`. After `MaxRetryAttempts`, call `RequeueFailedAsync`. |
| `ConflictStrategy.Custom` throws at startup | Set `CustomConflictResolver`. Custom without a resolver is rejected. |
| A failed auto-sync kills the app | That crash path is what 1.0.10 isolates. Surface the error from `SyncCompleted` instead. |
| Background sync never runs | `EnableBackgroundSync` is false, or the manifest / `Info.plist` entries are missing. |

## Where OfflineSync sits next to the other tools

| Need | Tool |
| --- | --- |
| Local writes, a change log, and a conflict on sync | **OfflineSync** — `Plugin.Maui.OfflineSync` |
| Room-style CRUD on the engine you pick | [Plugin.Maui.LocalStore](https://nuvyntralabs.github.io/packages/plugin-maui-local-store/) |
| Retry one HTTP call that already failed | [Plugin.Maui.RetryQueue](https://nuvyntralabs.github.io/packages/plugin-maui-retry-queue/) |
| Durable jobs with a dead-letter path | [Plugin.Maui.JobQueue](https://nuvyntralabs.github.io/packages/plugin-maui-job-queue/) |

Realm and Azure Mobile Apps are the usual choice when the organization already runs that sync fabric. OfflineSync is the engine when the host wants SQLite, a small HTTP protocol, and an explicit winner for each conflict.

## Try it

```bash
dotnet add package Plugin.Maui.OfflineSync --version 1.0.10
```

Register `UseOfflineSync` with an https base address. Insert one `SyncableEntity`, then call `SyncAsync` or wait for the five-minute auto-sync. `samples/Plugin.Maui.OfflineSync.Sample` is a todo app that writes to SQLite and syncs through an in-process remote.

- NuGet: [Plugin.Maui.OfflineSync](https://www.nuget.org/packages/Plugin.Maui.OfflineSync)
- Repository: [github.com/nuvyntralabs/Plugin.Maui.OfflineSync](https://github.com/nuvyntralabs/Plugin.Maui.OfflineSync)
- Sample: [Plugin.Maui.OfflineSync.Sample](https://github.com/nuvyntralabs/Plugin.Maui.OfflineSync/tree/main/samples/Plugin.Maui.OfflineSync.Sample)
- Package page: [nuvyntralabs.github.io/packages/plugin-maui-offline-sync/](https://nuvyntralabs.github.io/packages/plugin-maui-offline-sync/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
