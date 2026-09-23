---
title: "The Nuvyntra Labs Roadmap: What Follows the Current Stack, and What Stays Out"
published: false
description: "Nuvyntra Labs stays a component library and a MAUI ecosystem. This post maps the documented follow-ons after UIKit 1.6, MVVMExpress 1.3, HttpForge 1.1, NuvexaDB 1.0.7, and Nuvyn 1.2 — and the work that is explicitly out."
tags: dotnet, maui, opensource, roadmap
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A catalog is not a launch calendar. The next useful piece of Nuvyntra Labs is still a focused package, a public proof, or a written gap — not a mega-SDK release.

This post is that map. It covers how the lab decides what to build, where the public stack sits today, the follow-ons already written into product docs, and the work that stays out. Nothing in the follow-on tables is shipped. Dates are not assigned. Breaking public API changes wait for **2.0**.

## How the roadmap works

Nuvyntra Labs is an independent applied R&D company for mobile infrastructure. The loop is the roadmap:

1. **Research** stays research. Field accuracy, VoIP stacks, and inspection products are documented as R&D. They are not flattened into a plugin list.
2. **A public proof** comes before a package. Short, public prototypes — Bluetooth recording, solar sales UX, CallKit, pinned forks — show the pattern before it is productized.
3. **A reusable pattern becomes one NuGet.** That package versions on its own. It does not pull the rest of the catalog.

Teams still start in one of two ways. Neither is a fallback.

| Start | When | What you install |
| --- | --- | --- |
| Component library | You already have a host | One NuGet: UIKit, a `Plugin.Maui.*`, MVVMExpress, or NuvexaDB |
| Whole ecosystem | You want a new app on this stack, or the slash chain on an app you already have | [`nuvyn init`](https://nuvyntralabs.github.io/toolkits/nuvyn/) or [`nuvyn adopt`](https://nuvyntralabs.github.io/toolkits/nuvyn/guide/adopt/) |

The [development ecosystem white paper](https://nuvyntralabs.github.io/whitepaper/) is the map of the stack. This post is what sits after the versions named there.

## Where the public stack sits

These are the current public versions. Later sections do not replace them.

| Layer | Product | Now |
| --- | --- | --- |
| Presentation | [NuvyntraLabs.UIKit](https://nuvyntralabs.github.io/uikit/) | 1.6.0 — 201 `NV*` controls, 66 page recipes, Lumina chrome |
| Application shell | [Plugin.Maui.MVVMExpress](https://nuvyntralabs.github.io/packages/plugin-maui-mvvmexpress/) | 1.3.0 — phases 1–10 shipped; 1.0.0 is the SemVer lock |
| HTTP contract | [Plugin.Maui.HttpForge](https://nuvyntralabs.github.io/packages/plugin-maui-httpforge/) | 1.1.1 — source-generated REST; 1.1 request surface unchanged |
| Local CRUD | [Plugin.Maui.LocalStore](https://nuvyntralabs.github.io/packages/plugin-maui-local-store/) | 1.1.0 — engine choice stays on the host |
| Embedded documents | [NuvexaDB](https://nuvyntralabs.github.io/nuvexadb/) | 1.0.7 — one `.nvx` file, one engine |
| Spec-driven host | [Nuvyn](https://nuvyntralabs.github.io/toolkits/nuvyn/) | 1.2.0 — `init` and `adopt` |
| Doctor | [MauiDev](https://nuvyntralabs.github.io/toolkits/maui-dev/) | 1.2.2 |
| Live session | [Pulse](https://nuvyntralabs.github.io/toolkits/maui-pulse/) | 1.0.1 |
| Localization | [NuvLoc](https://nuvyntralabs.github.io/toolkits/nuvloc/) | 1.1.2 |

Desktop shells sit beside MAUI. They share the Core contract. They are not `Plugin.Maui.MVVMExpress`.

| Family | Now | Navigation |
| --- | --- | --- |
| [WPF](https://nuvyntralabs.github.io/packages/plugin-wpf-mvvmexpress/) | 1.0.0 | Frame |
| [Avalonia](https://nuvyntralabs.github.io/packages/plugin-avalonia-mvvmexpress/) | 1.0.1 | Frame |
| [WinUI](https://nuvyntralabs.github.io/packages/plugin-winui-mvvmexpress/) | 1.0.1 | Frame |
| [Uno](https://nuvyntralabs.github.io/packages/plugin-uno-mvvmexpress/) | 1.0.1 | Frame |

Gallery plugins stay opt-in. A catalog app can stop at UIKit + MVVMExpress + HttpForge. A field app adds location, offline sync, media, and vault only when the product needs them. Most gallery plugins are Android and iOS. Mac Catalyst or Windows is in scope only when that package page says so.

## MAUI shell after 1.3.0

[MVVMExpress 1.3.0](https://nuvyntralabs.github.io/packages/plugin-maui-mvvmexpress/docs/roadmap/) closed phases 1–10. Public 1.x APIs stay source-compatible. New surfaces may land in later 1.x packs. Breaking changes wait for 2.0.0.

Work that remains is outside the 1.3 catalog gate:

| Follow-on | What it is |
| --- | --- |
| Hardware RSS and on-device scroll | Device measurements, not only host-process BenchmarkDotNet and `ScaleProfile` |
| Device-window detach | A real window detach run, not only the in-memory pop-GC test |
| Production post-mortem | A write-up you control, documented as a manual report |
| Multi-window on desktop as a default path | Mac Catalyst and Windows are single-window host targets today |
| Windows nupkg RID when packing on macOS | Packing the Windows TFM from a Mac still has a documented gap |

These stay deferred past 1.3. They are not the next minor:

- Prism-style regions
- ReactiveUI `IScreen` routing as a first-class host
- A built-in remote feature-flag or auth provider (use [FeatureFlags](https://nuvyntralabs.github.io/packages/plugin-maui-feature-flags/) and [SecureSession](https://nuvyntralabs.github.io/packages/plugin-maui-secure-session/))
- A bottom-sheet control library (Dialogs stays an abstraction; sheets live on UIKit)
- A Visual Studio binding debugger visualizer

## Desktop families

WPF, Avalonia, WinUI, and Uno shipped a 1.0 shell: ViewModels, commands, Frame navigation, dialogs, validation, pagination, templates, and IDE wrappers. Multi-window is already first-class there through `IWindowContext`.

Parity with the MAUI family is the documented gap, recorded as **out of 1.0**. That list is not a promised 1.1 changelog. It is the surface a later desktop version would have to add if the families are to match MAUI:

| Surface | 1.0 status |
| --- | --- |
| Source generators (`[Notify]`, `[RegisterView]`, analyzers) | Handwritten `SetProperty` and `Map` |
| Reactive / `CombineLatest` | Skipped |
| CommunityToolkit compatibility pack | Skipped |
| `UseShell` | Frame only |
| `UseDeepLinks` host helper | Core `AddDeepLinks` fails closed |
| `UseSecureSessionAuth` host helper | Register `IAuthState` yourself |
| `NavigateForResultAsync` | Skipped |

There is still no `PackageReference` between the MAUI package and a desktop family.

## UIKit and HttpForge

UIKit 1.6.0 is a Lumina look refresh on the same 201 controls: lifted fills, hairline strokes, glow, recessed fields, and `NVChrome` paint. Hosts that pin 1.5.x keep compiling.

The kit stays a **working Lumina surface**. The roadmap does not chase Telerik or Syncfusion parity. PDF, Docx, and Spreadsheet stay viewers. `NVBarcode` generates a code; scanning stays on a host plugin. UIKit does not take a `PackageReference` on `Plugin.Maui.*`. Form validation, the keyboard, and the application shell stay composed at the host.

HttpForge 1.1.1 keeps the 1.1 request surface. Unsupported shapes fail at compile time (`HFG001`–`HFG010`). A reflection fallback package is **not planned**. Retry, cache, TLS pin, token refresh, and resumable upload stay on sibling plugins chained onto the same `IHttpClientBuilder`. Do not expect `[Retry]` or cache attributes on the HttpForge interface.

## NuvexaDB

Engine **1.0.7** is the current file format and ABI. Format v2 already shipped. The [white paper](https://nuvyntralabs.github.io/nuvexadb/docs/) lists 1.x follow-ons and says not to treat them as shipped.

These items are written as **future, not planned yet**:

| Item | Why it is still open |
| --- | --- |
| Signed / notarized macOS Data Studio | The `.pkg` is unsigned. Gatekeeper warns. |
| OS keychain for the last Data Studio passphrase | Every encrypted open prompts. The passphrase is never stored. |
| Multi-host package feeds | nuget.org, GitHub Packages, and later Maven, npm, pub.dev, PyPI, and Swift Package — one version number already exists; the feeds stay commented until that decision is made |

In-format candidates, with the page size staying 8192:

- More aggregate stages
- Richer GridFS (byte buffers in the ABI)
- Streaming improvements
- Tighter `$lookup` planning

LINQ stays .NET-only.

These stay **out** unless the product definition changes:

- A network server or a multi-process writer
- A second engine in Kotlin, Swift, Dart, or C++
- `IQueryable` or a LINQ provider that breaks Native AOT
- Automatic repair of a corrupt `.nvx`

LocalStore can host NuvexaDB. Data Studio, the `nuvexa` CLI, and the Visual Studio / VS Code editors stay on the engine. NuvexaDB is not in the default `nuvyn init` package set. `/nuvyn.plan` adds it when the spec asks.

## CLIs

The tools are global `dotnet` tools. They are not `PackageReference`s.

| Tool | Written as later |
| --- | --- |
| [Nuvyn](https://nuvyntralabs.github.io/toolkits/nuvyn/) 1.2.0 | `--vertical`, after a Lumina Playground head regenerates without hand-edits. GitHub issue export. |
| [MauiDev](https://nuvyntralabs.github.io/toolkits/maui-dev/) 1.2.2 | `MauiDev.Analyzers` and `MauiDev.Templates` |

Nuvyn keeps doing two jobs: `nuvyn init` for a new four-platform host, and `nuvyn adopt` for workflow files on an app you already have. `adopt` does not rewrite host architecture, UI kit, or HTTP. GitHub Spec Kit remains the path when the stack is open.

MauiDev still diagnoses the machine and the project. It does not become a runtime plugin. Leaks, traces, crashes, and device health stay on `Plugin.Maui.LeakAnalyser`, Performance, Diagnostics, and AppHealth.

Pulse 1.0.1 and NuvLoc 1.1.2 have empty later lists in the toolkit docs. Pulse stays a closed allow-list listener. NuvLoc stays sibling `.resx` files plus an agent. Completeness is still not correctness: a native speaker reviews every culture file before you ship. WinUI / Uno PRI `.resw` folders under `Strings/{lang}/` stay out of NuvLoc’s scope.

## What the lab will not become

The boundaries are the other half of the roadmap.

- **No mega-SDK.** UIKit does not reference gallery plugins. HttpForge does not retry. MVVMExpress does not own HTTP, location, or storage. Missing siblings fail closed.
- **No second database product inside LocalStore.** LocalStore is CRUD. OfflineSync is the sync engine. JobQueue is a durable job you plan to run. RetryQueue is a call that already failed. FileVault is encrypted files.
- **No client/server NuvexaDB.** One process holds one path.
- **No reflection REST client.** Write the odd method against `HttpClient`.
- **No promise that every gallery plugin targets four platforms.** Read the package page.

Research that is not yet a package stays on the [research](https://nuvyntralabs.github.io/research/) and [proofs](https://nuvyntralabs.github.io/pocs/) indexes: inspection, certified dealer software, CallKit, and the other public proofs. When one of those patterns is reusable on MAUI, it becomes its own versioned NuGet. Until then it is not a line item in `nuvyn init`.

## How to read this

Use the current versions. Pin them. The follow-ons above are the written gaps, not a schedule.

| If you need | Start here |
| --- | --- |
| One control or one device capability | [Package catalog](https://nuvyntralabs.github.io/packages/) |
| A new MAUI host on this stack | [Nuvyn](https://nuvyntralabs.github.io/toolkits/nuvyn/) |
| The composition map | [White paper](https://nuvyntralabs.github.io/whitepaper/) |
| The `.nvx` engine and its 1.x gaps | [NuvexaDB white paper](https://nuvyntralabs.github.io/nuvexadb/docs/) |
| What MAUI MVVMExpress already shipped | [MVVMExpress roadmap](https://nuvyntralabs.github.io/packages/plugin-maui-mvvmexpress/docs/roadmap/) |

Sponsorship keeps the organization, the packages, and the research in order. It does not buy a place on this list.

- GitHub: [github.com/nuvyntralabs](https://github.com/nuvyntralabs)
- Sponsors: [github.com/sponsors/NiladriPadhy](https://github.com/sponsors/NiladriPadhy)
- Discord: [discord.gg/2rg8s7P8xE](https://discord.gg/2rg8s7P8xE)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
