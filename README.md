# Nuvyntra Labs

Company site for **open-source work**: R&D projects, proofs of concept, and NuGet
packages. Live at **[https://nuvyntralabs.github.io](https://nuvyntralabs.github.io)**.

Professional experience stays on
[niladri-padhy-website.vercel.app](https://niladri-padhy-website.vercel.app/).

## Sections

| Path | Content |
| --- | --- |
| `/research/` | R&D projects (inspection, VoIP, GPS, bindings) |
| `/pocs/` | Proofs of concept and maintained forks |
| `/packages/` | .NET MAUI NuGet catalog |
| `/toolkits/` | Developer toolkits (MauiDev CLI + VS Code / Cursor extension) |
| `/toolkits/maui-dev/` | MauiDev overview, install, commands, and CI |
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
- MVVMExpress docs: `content/mvvmexpress.ts` (MAUI), `content/wpf-mvvmexpress.ts` (WPF), and `content/desktop-mvvmexpress.ts` (Avalonia, Uno, WinUI)
- LeakAnalyser docs: `content/leak-analyser.ts`
- Performance docs: `content/performance.ts`
- HttpForge docs: `content/http-forge.ts`
- Lab copy: `content/lab.ts`
- Comment repo IDs: `lib/comment-repos.ts`
