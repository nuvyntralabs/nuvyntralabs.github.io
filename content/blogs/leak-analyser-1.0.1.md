---
title: "LeakAnalyser 1.0.1: See Which MAUI View Survives After You Pop It"
published: false
description: "Plugin.Maui.LeakAnalyser 1.0.1 checks whether a finished MAUI page is still alive after forced GC. Detection stays in Debug. DisconnectHandlers can stay in Release. It does not draw a retain path."
tags: dotnet, maui, memory, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A page that leaves the navigation stack should become collectable. If a handler, a binding, or a static root still points at it, the next push pays for the last one.

**Plugin.Maui.LeakAnalyser** answers that one question. Version **1.0.1** is on nuget.org. After a view looks finished, it holds a `WeakReference`, forces GC, and reports whether the object is still alive. Detection stays in Debug. Teardown can stay in Release.

This post is the walkthrough: detect-only in Debug, disconnect handlers when you are ready, and which pages you must suppress because they are cached on purpose.

## What LeakAnalyser is

LeakAnalyser is a liveness test for **.NET MAUI** pages and views on Android, iOS, Mac Catalyst, and Windows. MIT licensed. It targets `net10.0`, `net10.0-android` (API 21+), `net10.0-ios` and `net10.0-maccatalyst` (15+), and `net10.0-windows` (10.0.17763+; the Windows TFM is included when the package is packed on Windows).

It does one job: report that a finished view is still rooted. A profiler tells you why.

| | |
| --- | --- |
| Package | [`Plugin.Maui.LeakAnalyser`](https://www.nuget.org/packages/Plugin.Maui.LeakAnalyser) 1.0.1 |
| Registration | `UseLeakAnalyser` |
| Monitor | `LeakMonitor.Cascade` |
| Teardown | `TearDown.Cascade` with `DisconnectHandlers` or `Compartmentalize` |
| Source | [github.com/nuvyntralabs/Plugin.Maui.LeakAnalyser](https://github.com/nuvyntralabs/Plugin.Maui.LeakAnalyser) |
| Docs | [nuvyntralabs.github.io/packages/plugin-maui-leak-analyser/](https://nuvyntralabs.github.io/packages/plugin-maui-leak-analyser/) |
| Guides | [Get started](https://nuvyntralabs.github.io/packages/plugin-maui-leak-analyser/integration/) · [How it works](https://nuvyntralabs.github.io/packages/plugin-maui-leak-analyser/docs/) |

The API is `UseLeakAnalyser`, `LeakMonitor`, `TearDown`, and `LeakGraph`. It is inspired by AdamE.MemoryToolkit.Maui. It is not a drop-in fork of that toolkit. 1.0.1 does not change the API.

## Debug: detect only

Forced GC is a probe. Keep `UseLeakAnalyser` and `LeakMonitor.Cascade` inside `DEBUG`.

```csharp
using Plugin.Maui.LeakAnalyser;

#if DEBUG
builder.Logging.AddDebug();
builder.UseLeakAnalyser(options =>
{
    options.OnLeaked = target => { /* alert, using target.Name */ };
    options.DefaultTearDownStrategy = TearDownStrategy.DetectOnly;
});
#endif
```

```xml
<ContentPage xmlns:la="clr-namespace:Plugin.Maui.LeakAnalyser;assembly=Plugin.Maui.LeakAnalyser"
             la:LeakMonitor.Cascade="True"
             la:LeakMonitor.Name="OrdersPage">
```

`OnLeaked` fires when the target is still alive after the collection passes. `OnCollected` fires when it is collected. Collection is the healthy outcome. `CollectionTarget` carries `Name`, `ObjectType`, and `Screen`. Defaults are 10 collections, 200 milliseconds apart.

The monitor waits until the view looks finished: a page popped from an active `NavigationPage`, a detached template, or a short wait that skips anything still on the navigation stack, still hosted by Shell, or still under a tab. Cached pages and tabs stay alive on purpose. Suppress those, or they look like leaks.

## Disconnect handlers

`DisconnectHandlers` is the default when you omit `Strategy`. It walks children and calls `DisconnectHandler()`. It leaves `BindingContext`, `Content`, and `Parent` in place. It honors `HandlerDisconnectPolicy.Manual` and `TearDown.Suppress`.

Put `TearDown` after `LeakMonitor` so teardown does not run before the snapshot.

```xml
la:LeakMonitor.Cascade="True"
la:TearDown.Cascade="True"
la:TearDown.Strategy="DisconnectHandlers"
```

The same attached properties exist in C#: `LeakMonitor.SetCascade`, `TearDown.SetCascade`, `page.Monitor()`, and `page.TearDown(TearDownStrategy.DisconnectHandlers)`.

In Release, teardown can stay on without detection:

```xml
la:TearDown.Cascade="True"
```

Do not call `UseLeakAnalyser` or set `LeakMonitor.Cascade` in Release.

## Compartmentalize

`Compartmentalize` clears common managed references, runs `TearDown.OnTearDown` while the element still has a handler, then disconnects. Each clear is isolated. A throwing setter is logged and teardown continues.

It clears `BindingContext`, `Parent`, logical children, behaviors, resources, gesture recognizers, formatted text, item sources, and `Content` on content views, borders, pages, and scroll views. CommunityToolkit hooks stay, because they are attached properties.

Opt into it per page. A Shell flyout or a `NavigationPage` that still holds modals will blank if this runs too early.

```xml
la:TearDown.Strategy="Compartmentalize"
```

## A breadcrumb, not a crash

LeakAnalyser does not reference Diagnostics or Observability. Forward `OnLeaked` yourself when the host already has those plugins. Register Diagnostics first if you want its logger ready before the first callback.

```csharp
#if DEBUG
builder.UseMauiDiagnostics();
builder.UseLeakAnalyser(options =>
{
    options.OnLeaked = target =>
    {
        MauiDiagnostics.TrackEvent($"Leak:{target.Name}");
        MauiDiagnostics.TrackException(
            new InvalidOperationException($"{target.Name} survived forced GC."));
    };
});
#endif
```

Track `OnLeaked` only. A collected target is success. Forced GC counts are not an app-health signal.

## When something looks wrong

| What you see | What to do |
| --- | --- |
| Every Shell tab reports a leak | Cached pages stay alive on purpose. `LeakMonitor.SetSuppress` and `TearDown.SetSuppress` on that host. |
| A leak appears while the browser sheet is open | Temporary unloads such as `Browser.OpenAsync` should suppress the host `NavigationPage`, then clear Suppress on `Loaded`. |
| A template root leaks and the page does not | Put `Cascade` on each `ControlTemplate` root, not only on the host control. |
| `OnLeaked` names the page and you still do not know the root | Open Instruments, dotMemory, or Visual Studio diagnostics. This package reports liveness. |
| Release builds feel slower after navigation | `LeakMonitor.Cascade` or `UseLeakAnalyser` is still compiled into Release. Detection forces GC. |

## Where LeakAnalyser sits next to the other tools

| Need | Tool |
| --- | --- |
| Is this finished view still alive? | **LeakAnalyser** — `Plugin.Maui.LeakAnalyser` |
| The retain path | Instruments, dotMemory, or Visual Studio diagnostics |
| Crash, ANR, and breadcrumbs | [Plugin.Maui.Diagnostics](https://nuvyntralabs.github.io/packages/plugin-maui-diagnostics/) |
| Startup, page, and API timings | [Plugin.Maui.Performance](https://nuvyntralabs.github.io/packages/plugin-maui-performance/) |

[AdamE.MemoryToolkit.Maui](https://github.com/adameste/AdamE.MemoryToolkit.Maui) is the usual community toolkit for the same class of problem. LeakAnalyser is the package when you want `LeakMonitor` plus an optional `DisconnectHandlers` or `Compartmentalize` pass, and you already accept that the retain path lives in a profiler.

## Try it

```bash
dotnet add package Plugin.Maui.LeakAnalyser --version 1.0.1
```

In Debug, call `UseLeakAnalyser` with `TearDownStrategy.DetectOnly`, set `LeakMonitor.Cascade` and `LeakMonitor.Name` on one page, pop it, and read `OnLeaked` or `OnCollected`.

- NuGet: [Plugin.Maui.LeakAnalyser](https://www.nuget.org/packages/Plugin.Maui.LeakAnalyser)
- Repository: [github.com/nuvyntralabs/Plugin.Maui.LeakAnalyser](https://github.com/nuvyntralabs/Plugin.Maui.LeakAnalyser)
- Package page: [nuvyntralabs.github.io/packages/plugin-maui-leak-analyser/](https://nuvyntralabs.github.io/packages/plugin-maui-leak-analyser/)
- How it works: [nuvyntralabs.github.io/packages/plugin-maui-leak-analyser/docs/](https://nuvyntralabs.github.io/packages/plugin-maui-leak-analyser/docs/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
