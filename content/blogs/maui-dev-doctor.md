---
title: "MauiDev 1.2.2: What maui-dev doctor Checks, and What --fix Will Touch"
published: false
description: "Plugin.Maui.MauiDev.Cli 1.2.2 is a global dotnet tool. maui-dev doctor reads the machine and the MAUI project. --fix only inserts UseMaui and deduplicates identical resource items."
tags: dotnet, maui, cli, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A MAUI app that fails to build is often a machine problem and a project problem at the same time. The SDK is present. `<UseMaui>` is missing. Three splash entries point at the same file.

**maui-dev doctor** reads both. Version **1.2.2** of `Plugin.Maui.MauiDev.Cli` is on nuget.org. It is a global `dotnet` tool. It is not a `PackageReference` in the app.

This post is the walkthrough: install the tool, run doctor, and which two edits `--fix` is allowed to make.

## What doctor is

MauiDev is project-aware. [maui-check](https://github.com/Redth/dotnet-maui-check) stops at the environment. `dotnet workload` and the Microsoft `maui` CLI install or list SDKs. Doctor also opens the csproj, the manifests, and the MAUI resource items.

| | |
| --- | --- |
| Package | [`Plugin.Maui.MauiDev.Cli`](https://www.nuget.org/packages/Plugin.Maui.MauiDev.Cli) 1.2.2 |
| Command | `maui-dev doctor` |
| Extension | [`nuvyntralabs.maui-dev`](https://marketplace.visualstudio.com/items?itemName=nuvyntralabs.maui-dev) (VS Code / Cursor 1.90+) |
| Source | [github.com/nuvyntralabs/MauiDev](https://github.com/nuvyntralabs/MauiDev) |
| Docs | [nuvyntralabs.github.io/toolkits/maui-dev/](https://nuvyntralabs.github.io/toolkits/maui-dev/) |

nuget.org reserved the id `MauiDev.Cli`. The package id is `Plugin.Maui.MauiDev.Cli`. The command stays `maui-dev`.

## Install

```bash
dotnet tool install -g Plugin.Maui.MauiDev.Cli --source https://api.nuget.org/v3/index.json
maui-dev doctor
```

Do not run `dotnet add package Plugin.Maui.MauiDev.Cli` in the app. The VS Code / Cursor extension shells out to the same command and offers to install the tool when it is missing.

On an interactive terminal the CLI asks every 4 hours whether to update from nuget.org (`[y/N]`, default no). The answer is cached in `~/.nuvyntra/cli-updates.json`. Skip the prompt with `--no-update-check`, `NUVYNTRA_NO_UPDATE_CHECK=1`, or any `--ci` / JSON / SARIF run. `--no-update-check` shipped in 1.2.2. The CLI does not phone home.

## What the report covers

Point `--path` at the app when the repo root is not the csproj.

```bash
maui-dev doctor --path ./src/App
```

The machine section covers the .NET SDK, the MAUI workload, the Android SDK, the JDK, Xcode, and CocoaPods. A check that does not apply on the current OS is skipped.

The project section covers target frameworks, Android min SDK, permissions, duplicate resources, `<UseMaui>`, and signing.

```text
.NET MAUI Developer Doctor
────────────────────────────────────

Machine
────────────────────────────────────

✓ .NET SDK               10.0.102
✓ MAUI workload          maui 10.0.0
✓ Android SDK            ANDROID_HOME set
✓ JDK                    17.0.12
· Xcode                  skipped (Linux)
· CocoaPods              skipped (Linux)

Project
────────────────────────────────────

✗ UseMaui                missing <UseMaui>true</UseMaui>
✗ Duplicate resources    3 detected
⚠ Android min SDK        21 (recommend 24+)
```

Exit `0` is pass or skip. Exit `1` is a failure, or a warning when `--warn-as-error` or `--ci` is set. Exit `2` is a usage error.

## The two edits --fix may make

`--fix` on doctor does two things:

- Insert `<UseMaui>true</UseMaui>` when the project already looks like MAUI.
- Deduplicate identical `MauiSplashScreen`, `MauiImage`, `MauiIcon`, and `MauiFont` items.

Run the dry run first.

```bash
maui-dev doctor --fix --dry-run
maui-dev doctor --fix
```

Doctor will not bump the min SDK, remove a permission, write a keystore password, install a workload, rewrite a TFM, or push a package. A missing workload is reported. The install command is `dotnet workload install maui`, and doctor does not run it. `maui-dev workload` prints that command. It does not install either.

## CI

`--ci` emits JSON and treats warnings as errors.

```yaml
- script: maui-dev doctor --ci
```

A failing resource check looks like this:

```json
{
  "id": "maui-resources",
  "title": "Duplicate resources",
  "category": "project",
  "status": "fail",
  "detail": "3 detected",
  "recommendation": "Remove duplicate MauiSplashScreen entries.",
  "canFix": true,
  "diagnostics": [
    {
      "id": "MD030",
      "message": "Duplicate MauiSplashScreen 'Resources/Splash/splash.svg'",
      "file": "App.csproj",
      "line": 12,
      "severity": "fail"
    }
  ]
}
```

`--format sarif` feeds the IDE Problems panel. `.maui-dev.json` can ignore a diagnostic id such as `MD020` or a check id.

## When something looks wrong

| What you see | What to do |
| --- | --- |
| `maui-dev: command not found` | The global tool is not on `PATH`. Reinstall `Plugin.Maui.MauiDev.Cli`. |
| `--no-update-check` is an unknown option | The installed tool is 1.2.1 or older. Update to 1.2.2. |
| `--fix` left the min SDK at 21 | That warning is a recommendation. Doctor does not rewrite min SDK. |
| Duplicate permissions are still there | Doctor does not dedupe permissions. `maui-dev permissions --fix` dedupes identical Android `UsesPermission` nodes and never removes one. |
| The app still crashes on device | Doctor reads the project. Leaks, traces, and crashes stay on the runtime plugins below. |

## Where doctor sits next to the other tools

| Need | Tool |
| --- | --- |
| Machine and project checks, with a two-item fix list | **maui-dev doctor** |
| Event handlers, `new HttpClient()`, fire-and-forget | `maui-dev analyze` (heuristic, not a Roslyn analyzer) |
| Store ids and the iOS privacy manifest | `maui-dev publish --validate` (never pushes) |
| A page still alive after you pop it | [Plugin.Maui.LeakAnalyser](https://nuvyntralabs.github.io/packages/plugin-maui-leak-analyser/) |
| Live plugin lanes during a Debug session | [Pulse](https://nuvyntralabs.github.io/toolkits/maui-pulse/) |

## Try it

```bash
dotnet tool install -g Plugin.Maui.MauiDev.Cli --source https://api.nuget.org/v3/index.json
maui-dev doctor --path ./src/App --fix --dry-run
```

Read the dry run before you let `--fix` insert `<UseMaui>` or drop a duplicate splash item.

- NuGet: [Plugin.Maui.MauiDev.Cli](https://www.nuget.org/packages/Plugin.Maui.MauiDev.Cli)
- Repository: [github.com/nuvyntralabs/MauiDev](https://github.com/nuvyntralabs/MauiDev)
- Toolkit page: [nuvyntralabs.github.io/toolkits/maui-dev/](https://nuvyntralabs.github.io/toolkits/maui-dev/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
