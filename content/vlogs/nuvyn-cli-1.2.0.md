---
title: "Nuvyn CLI 1.2.0: Spec-Driven .NET MAUI, From a New App or One You Already Have"
published: false
description: "Nuvyn 1.2.0 is a global dotnet tool that scaffolds a four-platform MAUI host on the Nuvyntra stack, or attaches the same slash workflow to an existing MAUI app."
tags: dotnet, maui, cli, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A coding agent will happily build a .NET MAUI app from a chat thread. The next session often builds a different one.

**Nuvyn** is the CLI that keeps that work on one stack and one written spec. Version **1.2.0** is on nuget.org as the global tool `NuvyntraLabs.Nuvyn.Cli`. The command is `nuvyn`.

This post is the walkthrough: what the tool is, how to install it, how to start a new app, how to attach it to an app you already have, and the slash commands the agent runs after that.

## What Nuvyn is

Nuvyn is a standalone `PackAsTool` CLI for **.NET 10**. It depends on `System.CommandLine` and `Spectre.Console`. It is MIT licensed.

It does two jobs:

1. **`nuvyn init`** creates a new four-platform MAUI host (Android, iOS, Mac Catalyst, Windows) and locks plan and implement to the Nuvyntra stack.
2. **`nuvyn adopt`** attaches the same slash chain to an existing MAUI app. It writes workflow files only. The host you already have stays as it is.

The product domain is yours: clinic, field, bank, civic, retail, or anything else. The skills stay domain-agnostic. On a new host they lock only the MAUI and Lumina stack.

Individual plugins and `NuvyntraLabs.UIKit` stay installable on their own. You do not need Nuvyn to use one package.

| | |
| --- | --- |
| Package | [`NuvyntraLabs.Nuvyn.Cli`](https://www.nuget.org/packages/NuvyntraLabs.Nuvyn.Cli) 1.2.0 |
| Command | `nuvyn` |
| Source | [github.com/nuvyntralabs/Nuvyn](https://github.com/nuvyntralabs/Nuvyn) |
| Docs | [nuvyntralabs.github.io/toolkits/nuvyn/](https://nuvyntralabs.github.io/toolkits/nuvyn/) |
| Guide | [Install, init, adopt, slash workflow](https://nuvyntralabs.github.io/toolkits/nuvyn/guide/) |

Install it as a **global dotnet tool**. Do not add `NuvyntraLabs.Nuvyn.Cli` as a `PackageReference` in an app.

## Why a spec, when the agent can just code

Spec-driven development treats a checked-in specification as the source of truth. Code follows that spec. A chat thread is a prompt log: it disappears, it contradicts itself, and a teammate cannot review it.

Nuvyn writes the artifacts into the repo:

| Artifact | Role |
| --- | --- |
| Constitution | Standing principles: stack, platforms, privacy |
| Specification | This increment: users, journeys, edge cases |
| Plan | Smallest package set and one screen recipe per screen |
| Tasks | Dependency-ordered work (`T001 [P] [US1]`) |
| Analysis | Consistency check before production code |

That matters more once an agent writes the code. The same prompt can pick a different MVVM library on a different day. Long chats drop acceptance rules that were never written down. Agents add a login page, a second UI kit, or persistence nobody asked for, because a finished-looking app is an easy completion.

Nuvyn narrows that search space. Constitution locks the stack. Specify writes the product. Plan names packages and screens. Analysis fails the loop before implement invents a second architecture.

GitHub Spec Kit (`specify init`) remains the usual choice when the stack is open. Nuvyn is the door when the host should be Nuvyntra, or when an existing MAUI app should grow through the same slash chain.

## What you need

| Requirement | Why |
| --- | --- |
| .NET 10 SDK | The CLI is `net10.0`. Hosts target `net10.0-android`, `net10.0-ios`, `net10.0-maccatalyst`, and `net10.0-windows10.0.19041.0` |
| MAUI workload | So the host can build and run |
| A coding agent | Cursor, GitHub Copilot, Claude Code, Gemini CLI, Codex, Windsurf, or any other Spec Kit agent |
| nuget.org | `init` adds the default Nuvyntra packages at the latest stable versions |

Nuvyn targets those four platforms. It is the wrong tool for Tizen, Flutter, React Native, WPF, WinUI, Avalonia, or Uno.

## Install

```bash
dotnet tool install -g NuvyntraLabs.Nuvyn.Cli --source https://api.nuget.org/v3/index.json
nuvyn version
```

`nuvyn version` prints `NuvyntraLabs.Nuvyn.Cli 1.2.0`.

Already installed? Update the tool only. Existing apps keep the packages they already reference:

```bash
dotnet tool update -g NuvyntraLabs.Nuvyn.Cli --source https://api.nuget.org/v3/index.json
nuvyn version
```

On an interactive terminal, `nuvyn` asks every four hours whether to update from nuget.org (`[y/N]`, default no). Skip that prompt with `--no-update-check` or `NUVYNTRA_NO_UPDATE_CHECK=1`. The cache file is `~/.nuvyntra/cli-updates.json`, shared with `maui-dev` and `maui-perf`. The CLIs do not phone home.

## Create a new app

`nuvyn init <folder_name>` always creates a **new folder**. If that name already exists, init prints an error and exits `1`. The existing tree is left untouched.

```bash
nuvyn init HarborDesk --agent cursor
```

Omit `--agent` and the CLI shows a searchable picker (`cursor (Cursor)`, `agy (Antigravity)`, and the rest of the Spec Kit set). Non-interactive runs default to Cursor.

What init does:

1. Copies an embedded three-project host (MVVMExpress + Lumina UIKit).
2. Adds the default Nuvyntra packages from nuget.org, unpinned, at the latest stable versions.
3. Writes `.nuvyn/` (constitution, templates, reference, `init-options.json`).
4. Installs slash commands for the agent you picked.
5. Writes a project README with the slash chain.

The tree looks like this:

```text
HarborDesk/
├── HarborDesk.sln
├── HarborDesk/                      # MAUI app
│   ├── MauiProgram.cs
│   ├── Pages/MainPage.xaml
│   └── Resources/Images/nuvyntra.png
├── HarborDesk.Core/                 # ViewModels
├── HarborDesk.Tests/
├── .nuvyn/
│   ├── constitution.md
│   ├── init-options.json
│   ├── templates/
│   └── reference/
├── specs/                           # empty until /nuvyn.specify
├── .cursor/skills/nuvyn-*/          # when --agent cursor
└── README.md
```

`MainPage` is a Lumina screen: the Nuvyntra mark, an `NVHeading` counter, and Increase / Decrease `NVButton` controls. There is no stock `Entry` / `Button` / `Label` starter, and no seeded Login / Items / Edit pages. Screens come from the spec.

Build it the usual way:

```bash
cd HarborDesk
dotnet restore
dotnet build
dotnet build HarborDesk/HarborDesk.csproj -f net10.0-android
```

## Default packages on a new host

`init` adds these, and nothing else from the catalog, until the spec asks:

| Package | Role |
| --- | --- |
| [Plugin.Maui.MVVMExpress](https://nuvyntralabs.github.io/packages/plugin-maui-mvvmexpress/) | App shell, ViewModels, navigation |
| [NuvyntraLabs.UIKit](https://nuvyntralabs.github.io/uikit/) | Lumina `NV*` controls and page recipes |
| [Plugin.Maui.HttpForge](https://nuvyntralabs.github.io/packages/plugin-maui-httpforge/) | Typed REST client |
| [Plugin.Maui.FormValidation](https://nuvyntralabs.github.io/packages/plugin-maui-form-validation/) | Form rules on the host |
| [Plugin.Maui.KeyboardManager](https://nuvyntralabs.github.io/packages/plugin-maui-keyboard-manager/) | Soft keyboard hide, show, and resize |

The MAUI app gets MVVMExpress plus Dialogs and Navigation, UIKit, HttpForge, FormValidation, and KeyboardManager. Core gets `Plugin.Maui.MVVMExpress.Core` and the source generators. Tests get `Plugin.Maui.MVVMExpress.Testing`. Versions are never pinned: `dotnet add package` runs without `--version`.

The host wires up like this:

```csharp
builder
    .UseMauiApp<App>()
    .UseMvvmExpress(o => o
        .UseNavigationPage((nav, _) => nav
            .Map<MainPageViewModel, MainPage>("main"))
        .UseDialogs())
    .UseNuvyntraUIKit()
    .UseHttpForge()
    .UseMauiFormValidation()
    .UseKeyboardManager();

builder.Services.AddTransient<MainPageViewModel>();
builder.Services.AddTransient<MainPage>();
```

Register both the page and the view-model in `MauiProgram`. `[RegisterViewModel]` is a map for the generator, and it is not the DI registration. Chrome is `NavigationPage` unless the spec names Shell.

LocalStore, NuvexaDB, AppLock, and the rest of the catalog wait until you ask. `/nuvyn.plan` then picks the smallest fit. An outside library needs a **Catalog gap** row in `plan.md`.

## Adopt an existing MAUI app

**1.2.0** adds `nuvyn adopt`. This is the door for a tree that already exists.

```bash
cd FieldApp
nuvyn adopt --agent cursor
```

Or point at another folder:

```bash
nuvyn adopt --path ../FieldApp --agent copilot
```

Adopt:

- Refuses the folder when it is not a MAUI app (`UseMaui` in a csproj), or when `.nuvyn/` is already there.
- Scans MVVM, chrome, UI kit, and HTTP. The scan is read-only.
- Writes `.nuvyn/`, agent skills, an empty `specs/` folder, and `.nuvyn/adopt-report.md`.
- Sets `"mode": "adopt"` in `init-options.json`.
- Runs `maui-dev doctor` when MauiDev is on `PATH`.

It does **not** add MVVMExpress, Lumina UIKit, or HttpForge. It does **not** edit `MauiProgram`, pages, or `HttpClient` call sites. New work keeps the stack the app already uses. Lumina `NV*` is allowed on new screens only when UIKit is already referenced. `/nuvyn.plan` and `/nuvyn.implement` read `adopt-report.md` first.

## The slash chain

Open the **project folder** in the agent you selected. Run the commands in order. Extra text after a command is the prompt. An empty `/nuvyn.specify` asks you to describe the product.

```text
/nuvyn.constitution → /nuvyn.specify → /nuvyn.clarify → /nuvyn.plan
    → /nuvyn.checklist → /nuvyn.task → /nuvyn.analysis
    → /nuvyn.implement → /nuvyn.converge
```

In Cursor the skill folders are named `nuvyn-constitution` (a folder name cannot contain `.`). Type `/nuvyn-constitution` in Cursor. Type `/nuvyn.constitution` in Copilot, Claude, Gemini, and the other command-file agents.

| Step | You do | The agent writes |
| --- | --- | --- |
| `/nuvyn.constitution` | Optional product rules (PII, lock, offline) | Updates `.nuvyn/constitution.md`. The stack stays locked on a new host. |
| `/nuvyn.specify` | **Required:** what the app is for | `specs/NNN-short-name/spec.md`, `.nuvyn/feature.json`, `checklists/requirements.md` |
| `/nuvyn.clarify` | Answer at most five questions | Updates `spec.md` |
| `/nuvyn.plan` | Extra constraints, if any | `plan.md` + `research.md` — packages and one Lumina recipe per screen |
| `/nuvyn.checklist` | Optional quality review | `checklists/<domain>.md` |
| `/nuvyn.task` | — | `tasks.md` (`T001 [P] [US1] …`) |
| `/nuvyn.analysis` | — | A report only: spec, plan, and tasks agree |
| `/nuvyn.implement` | Optional scope, such as Foundation only | Host code |
| `/nuvyn.converge` | — | Appends remaining work to `tasks.md` |

A specify prompt can carry the product in one line:

```text
/nuvyn.specify Resident 311 desk: sign in, report a bin miss, see live bus times.
/nuvyn.implement Implement only Foundation
```

Standing law lives in `.nuvyn/reference/constraints.md`. Each slash command stays short and points at that file, so the agent spends the window on the domain instead of restating the catalog every turn.

UI on a new host is Lumina first. One recipe per screen. Bound fields go inside the recipe so they replace the demo seed. Prefer `NVInputField`, `NVPasswordField`, and `NVButton` when an `NV*` control exists. Control reference: [UIKit(MAUI) docs](https://nuvyntralabs.github.io/uikit/docs/).

## Which agent gets which folder

`nuvyn init` and `nuvyn adopt` write into the folder that agent already reads. The set matches Spec Kit, including more than thirty additional agents.

| Agent | `--agent` | On disk |
| --- | --- | --- |
| Cursor | `cursor` | `.cursor/skills/nuvyn-*/` |
| GitHub Copilot | `copilot` | `.github/skills/` |
| Claude Code | `claude` | `.claude/commands/` |
| Gemini CLI | `gemini` | `.gemini/commands/` |
| Codex CLI | `codex` | `.agents/skills/` |
| Goose | `goose` | `.goose/recipes/` |
| Windsurf | `windsurf` | `.windsurf/workflows/` |
| Generic | `generic` | `.agents/commands/` |

Pass `--agent cursor-agent` when that Spec Kit key is the one you already use.

## Refresh skills after a CLI update

Do not re-run `nuvyn init` on a tree that already exists. After the global tool updates, refresh slash files from inside the app:

```bash
cd HarborDesk
nuvyn update
nuvyn update --agent cursor
```

`nuvyn update` overwrites `.nuvyn/templates/`, `.nuvyn/reference/`, and the agent command files. It leaves host code, `specs/`, `.nuvyn/constitution.md`, and `.nuvyn/adopt-report.md` alone. It does not change `PackageReference` versions.

`nuvyn check` confirms `dotnet` and the payload. Inside a greenfield app it also proves the host still uses MVVMExpress, UIKit, HttpForge, FormValidation, and KeyboardManager. Inside an adopted app it prints the inventory and skips that proof.

When [MauiDev](https://nuvyntralabs.github.io/toolkits/maui-dev/) is on `PATH`, `init`, `adopt`, and `check` run `maui-dev doctor --path`. A missing doctor is a warning. Nuvyn still succeeds. Install it when you want the environment report:

```bash
dotnet tool install -g Plugin.Maui.MauiDev.Cli --source https://api.nuget.org/v3/index.json
maui-dev doctor
```

## When something looks wrong

| What you see | What to do |
| --- | --- |
| `HarborDesk already exists` | `init` is for a new folder. Pick another name, or delete a leftover failed scaffold and retry. For an existing MAUI app, `cd` in and run `nuvyn adopt`. |
| `is already a Nuvyn project` | Adopt or init already ran. Use `nuvyn update`. |
| `is not a MAUI app` | `adopt` needs a `UseMaui` csproj in that folder. |
| `Not a Nuvyn project` | `update` and `check` need a `.nuvyn/` folder from `init` or `adopt`. |
| Unable to resolve `MainPageViewModel` | Add `builder.Services.AddTransient<MainPageViewModel>()`. |
| `AddGeneratedViewModels` fails to build | Remove that call. Register the view-model with `AddTransient`. |
| The agent added LocalStore, Syncfusion, or Refit | You did not ask. Revert. Catalog first, UIKit first. |
| MAUI workload or TFM errors | Read the printed `maui-dev doctor` report. Do not re-run `nuvyn init`. |
| Update prompt every few hours | Expected. Answer `n`, or pass `--no-update-check`. |

## Where Nuvyn sits next to the other tools

| Need | Tool |
| --- | --- |
| New Nuvyntra MAUI host and the spec chain | **Nuvyn** — `nuvyn init`, then `nuvyn update` |
| Existing MAUI app, same spec chain, keep its stack | **Nuvyn** — `nuvyn adopt` |
| Diagnose an existing MAUI tree | [MauiDev](https://nuvyntralabs.github.io/toolkits/maui-dev/) — `maui-dev doctor` |
| Sibling `.resx` localization | [NuvLoc](https://nuvyntralabs.github.io/toolkits/nuvloc/) |
| Any stack, spec only | [GitHub Spec Kit](https://github.com/github/spec-kit) |
| One runtime plugin | The matching [`Plugin.Maui.*`](https://nuvyntralabs.github.io/packages/) package |

## Try it

```bash
dotnet tool install -g NuvyntraLabs.Nuvyn.Cli --source https://api.nuget.org/v3/index.json
nuvyn init HarborDesk --agent cursor
cd HarborDesk
```

Open that folder in your agent and run `/nuvyn.constitution`, then `/nuvyn.specify` with the product in one sentence.

If the app already exists:

```bash
cd YourMauiApp
nuvyn adopt --agent cursor
```

Then read `.nuvyn/adopt-report.md` before `/nuvyn.plan`.

- NuGet: [NuvyntraLabs.Nuvyn.Cli](https://www.nuget.org/packages/NuvyntraLabs.Nuvyn.Cli)
- Repository: [github.com/nuvyntralabs/Nuvyn](https://github.com/nuvyntralabs/Nuvyn)
- User guide: [nuvyntralabs.github.io/toolkits/nuvyn/guide/](https://nuvyntralabs.github.io/toolkits/nuvyn/guide/)
- Technical docs: [nuvyntralabs.github.io/toolkits/nuvyn/docs/](https://nuvyntralabs.github.io/toolkits/nuvyn/docs/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
