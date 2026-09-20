# Nuvyntra Labs

Company site for **open-source work**: R&D projects, proofs of concept, and NuGet
packages. Nuvyntra Labs reaches developers as a **component library** (one NuGet)
and as a **whole ecosystem** (`nuvyn init`). Live at
**[https://nuvyntralabs.github.io](https://nuvyntralabs.github.io)**.

Professional experience stays on
[niladri-padhy-website.vercel.app](https://niladri-padhy-website.vercel.app/).

## Sections

| Path | Content |
| --- | --- |
| `/whitepaper/` | MAUI development ecosystem white paper (UIKit, MVVMExpress, HttpForge, gallery) |
| `/playground/` | Lumina Playground — five UI prototypes (Bank, Clinic, Civic, Field, Market) |
| `/research/` | R&D projects (inspection, VoIP, GPS, bindings) |
| `/pocs/` | Proofs of concept and maintained forks |
| `/nuvexadb/` | NuvexaDB embedded NoSQL database (white paper + platform integration) |
| `/uikit/` | UIKit(MAUI) — Lumina NV* controls and page recipes |
| `/uikit/docs/` | UIKit(MAUI) component reference (XAML + attributes) |
| `/nuvexadb/docs/` | NuvexaDB white paper and engine docs |
| `/nuvexadb/integration/` | NuvexaDB getting started for every supported host |
| `/packages/` | .NET MAUI NuGet catalog |
| `/toolkits/` | Developer toolkits (Nuvyn spec CLI, MauiDev doctor, Pulse session viewer) |
| `/toolkits/nuvyn/` | Nuvyn 1.1.0 overview — spec-driven MAUI host on the Nuvyntra stack |
| `/toolkits/nuvyn/docs/` | Nuvyn technical docs (SDD, agentic coding, implementation) |
| `/toolkits/nuvyn/guide/` | Nuvyn user guide (install, init, update, slash workflow) |
| `/toolkits/maui-dev/` | MauiDev 1.2.2 overview, command usage, sample results, and CI |
| `/toolkits/maui-pulse/` | Pulse 1.0.1 — UseMauiPulse() host sink and maui-pulse CLI |
| `/packages/plugin-maui-mvvmexpress/docs/` | MAUI MVVMExpress documentation (expander topics + roadmap) |
| `/packages/plugin-maui-mvvmexpress/docs/templates/` | MAUI MVVMExpress `dotnet new` project template |
| `/packages/plugin-maui-mvvmexpress/docs/ide-extensions/` | MAUI MVVMExpress Visual Studio Code and Visual Studio extensions |
| `/packages/plugin-maui-mvvmexpress/integration/` | MAUI MVVMExpress getting started |
| `/packages/plugin-wpf-mvvmexpress/` | WPF MVVMExpress overview |
| `/packages/plugin-wpf-mvvmexpress/docs/` | WPF MVVMExpress documentation |
| `/packages/plugin-wpf-mvvmexpress/integration/` | WPF MVVMExpress getting started |
| `/packages/plugin-avalonia-mvvmexpress/` | Avalonia MVVMExpress overview |
| `/packages/plugin-avalonia-mvvmexpress/docs/` | Avalonia MVVMExpress documentation |
| `/packages/plugin-avalonia-mvvmexpress/integration/` | Avalonia MVVMExpress getting started |
| `/packages/plugin-uno-mvvmexpress/` | Uno Platform MVVMExpress overview |
| `/packages/plugin-uno-mvvmexpress/docs/` | Uno Platform MVVMExpress documentation |
| `/packages/plugin-uno-mvvmexpress/integration/` | Uno Platform MVVMExpress getting started |
| `/packages/plugin-winui-mvvmexpress/` | WinUI 3 MVVMExpress overview |
| `/packages/plugin-winui-mvvmexpress/docs/` | WinUI 3 MVVMExpress documentation |
| `/packages/plugin-winui-mvvmexpress/integration/` | WinUI 3 MVVMExpress getting started |
| `/packages/plugin-maui-leak-analyser/` | LeakAnalyser overview |
| `/packages/plugin-maui-leak-analyser/docs/` | LeakAnalyser technical documentation |
| `/packages/plugin-maui-leak-analyser/integration/` | LeakAnalyser getting started |
| `/packages/plugin-maui-performance/` | Performance overview |
| `/packages/plugin-maui-performance/docs/` | Performance technical documentation |
| `/packages/plugin-maui-performance/integration/` | Performance getting started |
| `/packages/plugin-maui-performance/comparison/` | Performance vs APM, Diagnostics, and maui profile |
| `/packages/plugin-maui-httpforge/` | HttpForge overview |
| `/packages/plugin-maui-httpforge/docs/` | HttpForge technical documentation |
| `/packages/plugin-maui-httpforge/integration/` | HttpForge getting started |
| `/packages/plugin-maui-httpforge/comparison/` | HttpForge vs Refit and sibling HTTP plugins |
| `/packages/plugin-maui-local-store/` | LocalStore overview |
| `/packages/plugin-maui-local-store/docs/` | LocalStore technical documentation |
| `/packages/plugin-maui-local-store/integration/` | LocalStore getting started |
| `/packages/plugin-maui-local-store/comparison/` | LocalStore vs SQLite, NuvexaDB, Room, and sibling plugins |
| `/packages/plugin-maui-community-toolkit-plus/` | CommunityToolkitPlus overview |
| `/packages/plugin-maui-geofence/` | Geofence overview |
| `/packages/plugin-maui-local-notifications/` | LocalNotifications overview |
| `/packages/plugin-maui-tls-pin/` | TlsPin overview |
| `/packages/plugin-maui-video-pipeline/` | VideoPipeline overview |
| `/packages/plugin-maui-app-review/` | AppReview overview |
| `/packages/plugin-maui-bluetooth-serial/` | BluetoothSerial overview |
| `/packages/plugin-maui-biometric/` | BiometricPlus overview |
| `/packages/plugin-maui-screen-guard/` | ScreenGuard overview |
| `/packages/plugin-maui-keep-awake/` | KeepAwake overview |
| `/releases/` | Live .NET MAUI release feed from official GitHub + Learn links |
| `/getting-started/` | Install + compose plugins |
| `/getting-started/github-packages/` | Two-feed setup: GitHub Packages for Plugin.Maui.*, nuget.org for everything else |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) if port 3000 is already in use.

## Deploy

Pushes to `main` build a static Next.js export and publish it with GitHub Pages
(`.github/workflows/pages.yml`).

In the repo: **Settings → Pages → Source: GitHub Actions**.

## Comments (Giscus + Utterances)

Each package, R&D project, and POC page has a discussion section. Comments go to
**that component's GitHub repo**, not this website repo. Giscus uses Discussions;
Utterances uses Issues. Docs pages share the same `Website comments` thread as
the component overview.

Install the [giscus](https://github.com/apps/giscus) and
[utterances](https://github.com/apps/utterances) GitHub Apps on the
**nuvyntralabs** org (or on each component repo). Most plugin/R&D repos already
have Discussions. A few older POCs still need Issues or Discussions enabled.

## Content

- R&D and POCs: `content/works.ts`
- NuGet catalog: `content/packages.ts`
- Toolkits: `content/toolkits.ts`
- Nuvyn docs: `content/nuvyn.ts`, `content/nuvyn-guide.ts`
- MVVMExpress docs: `content/mvvmexpress.ts` (MAUI), `content/wpf-mvvmexpress.ts` (WPF), and `content/desktop-mvvmexpress.ts` (Avalonia, Uno, WinUI)
- LeakAnalyser docs: `content/leak-analyser.ts`
- Performance docs: `content/performance.ts`
- HttpForge docs: `content/http-forge.ts`
- LocalStore docs: `content/local-store.ts`
- NuvexaDB docs: `content/nuvexadb.ts`, `content/nuvexadb-guide.ts`, official markdown in `content/nuvexadb/source/`
- UIKit(MAUI): `content/uikit.ts`, `content/uikit-guide.ts`, official control reference in `content/uikit/source/UIKitLib.md`
- Lab copy: `content/lab.ts`
- Comment repo IDs: `lib/comment-repos.ts`
