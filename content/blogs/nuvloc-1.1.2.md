---
title: "NuvLoc 1.1.2: The Agent Writes the Culture .resx. The CLI Checks It."
published: false
description: "NuvyntraLabs.NuvLoc.Cli 1.1.2 diffs an English .resx against BCP-47 culture files from i18n.json. /nuvloc.translate writes the files. There is no nuvloc translate command and no vendor API key."
tags: dotnet, maui, localization, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A translation vendor wants an API key. An IDE resource manager wants you to stay in that IDE. A MAUI app that already has an English `.resx` mostly needs to know which keys are missing in Spanish.

**NuvLoc** answers that question and hands the missing keys to the coding agent you already use. Version **1.1.2** of `NuvyntraLabs.NuvLoc.Cli` is on nuget.org. The agent writes `AppResources.es.resx`. The CLI never calls OpenAI, Azure, or any other translation API.

This post is the walkthrough: `i18n.json`, `nuvloc init`, the two slash commands, and the CI check that does not need an agent.

## What NuvLoc is

NuvLoc is a global `dotnet` tool for sibling `.resx` hosts: MAUI, WPF, WinUI, Avalonia, and Uno. MIT licensed. The command is `nuvloc`. It is not a `PackageReference`, and it does not bind strings into XAML.

| | |
| --- | --- |
| Package | [`NuvyntraLabs.NuvLoc.Cli`](https://www.nuget.org/packages/NuvyntraLabs.NuvLoc.Cli) 1.1.2 |
| Config | `i18n.json` at the project root |
| Translate | `/nuvloc.translate` — there is no `nuvloc translate` command |
| Check | `nuvloc check --ci` |
| Source | [github.com/nuvyntralabs/NuvLoc](https://github.com/nuvyntralabs/NuvLoc) |
| Docs | [nuvyntralabs.github.io/toolkits/nuvloc/](https://nuvyntralabs.github.io/toolkits/nuvloc/) |

Coverage and placeholder checks prove that every key is present and that `{0}` still matches. They do not prove the sentence is right. Review every culture file with a native speaker before you ship.

## Install and configure

```bash
dotnet tool install -g NuvyntraLabs.NuvLoc.Cli --source https://api.nuget.org/v3/index.json
nuvloc version
```

Put `i18n.json` next to the project. `init` checks this file. It does not create the host.

```json
{
  "platform": "maui",
  "source": "Resources/Strings/AppResources.resx",
  "languages": ["es", "fr"]
}
```

`platform` is `maui`, `wpf`, `winui`, `avalonia`, or `uno`. `source` is the English `.resx`. Culture files are siblings: `AppResources.es.resx` beside `AppResources.resx`. WinUI and Uno PRI `.resw` folders under `Strings/{lang}/` stay out of scope.

`languages` must be BCP-47. `es`, `pt-BR`, and `zh-Hans` are valid. Casing is canonicalized (`PT-br` becomes `pt-BR`). Underscores (`es_MX`), and English source tags (`en`, `en-US`, `en-GB`), are rejected. A bad code does not create a `.resx`. The CLI exits 2 and prints the reason.

These codes are tested: `es`, `fr`, `de`, `it`, `nl`, `ja`, `ko`, `zh-Hans`, `pt-BR`, `ar`, `hi`, `ru`. Other BCP-47 codes work the same way.

## Init, then the agent

```bash
nuvloc init --configfile i18n.json --agent cursor
```

`init` checks the JSON, confirms the source file exists, and writes `.nuvloc/` plus the agent skills. `--force` overwrites skill files. It does not overwrite a culture `.resx`. Omit `--agent` on an interactive terminal to pick from the same Spec Kit set Nuvyn uses (Cursor, GitHub Copilot, Claude Code, Gemini CLI, Codex, Windsurf, and others). `--ci` requires `--agent`.

In Cursor:

```text
/nuvloc.status
/nuvloc.translate
```

`/nuvloc.status` runs `nuvloc status` and explains the counts. `/nuvloc.translate` runs `nuvloc plan`, writes the sibling culture files, then runs `nuvloc check --write-cache`.

A plan with gaps looks like this:

```text
Source: Resources/Strings/AppResources.resx

es: 2 current, 1 missing, 0 stale, 0 placeholder, 0 extra
 missing ItemsLeft

fr: 0 current, 3 missing, 0 stale, 0 placeholder, 0 extra
 missing Save
 missing Cancel
 missing ItemsLeft
```

`current` means the key is present and the source hash still matches. `stale` means the English value changed after the culture file was written. `placeholder` means a format item does not match. `extra` means the culture file has a key the English source does not.

A second agent is `nuvloc agent add copilot`. `nuvloc update` refreshes skills and `.nuvloc/reference/dotnet-resx.md` and leaves `i18n.json` and the culture files alone.

## CI without an agent

```bash
nuvloc check --configfile i18n.json --ci
```

Exit `0` means the configured cultures are complete. Exit `1` means a key is missing, stale, or a placeholder is broken. Exit `2` is usage: missing `i18n.json`, an unknown agent, a language that is not BCP-47, or `--lang` that is not listed in `i18n.json`.

`--write-cache` records source hashes for keys that are present, so the next run can tell stale from current. `--ci` forces JSON.

On an interactive terminal `nuvloc` asks every 4 hours whether to update from nuget.org. The cache file is `~/.nuvyntra/cli-updates.json`, shared with `maui-dev`, `nuvyn`, `maui-perf`, and `maui-pulse`. Skip it with `--no-update-check` or `NUVYNTRA_NO_UPDATE_CHECK=1`. The CLI does not phone home.

## When something looks wrong

| What you see | What to do |
| --- | --- |
| Exit 2 on `es_MX` | Use a hyphen: `es-MX`. Underscores are rejected. |
| Exit 2 on `en-US` in `languages` | English is the `source` file. Do not list it as a target culture. |
| `/nuvloc.translate` is missing | Run `nuvloc init --agent cursor` in this repo. `init` installs the skill. |
| `nuvloc translate` fails | That command does not exist. Translation is the slash skill. |
| Check is green and the Spanish is wrong | Completeness passed. A native speaker still has to read the file. |
| You expected XAML to pick up the new culture | NuvLoc does not add a markup extension. The host binds `AppResources` the way it already does. |

## Where NuvLoc sits next to the other tools

| Need | Tool |
| --- | --- |
| Diff sibling `.resx` files and let the agent fill the gaps | **NuvLoc** |
| An IDE resource editor or a translation vendor | [ResXResourceManager](https://github.com/dotnet/ResXResourceManager), Crowdin, or Phrase |
| Doctor the MAUI project | [MauiDev](https://nuvyntralabs.github.io/toolkits/maui-dev/) |
| Scaffold a new MAUI host | [Nuvyn](https://nuvyntralabs.github.io/toolkits/nuvyn/) |

## Try it

```bash
dotnet tool install -g NuvyntraLabs.NuvLoc.Cli --source https://api.nuget.org/v3/index.json
nuvloc init --configfile i18n.json --agent cursor
nuvloc status --configfile i18n.json
```

Then run `/nuvloc.translate`, and have a native speaker read `AppResources.es.resx` before the check in CI is the only review it gets.

- NuGet: [NuvyntraLabs.NuvLoc.Cli](https://www.nuget.org/packages/NuvyntraLabs.NuvLoc.Cli)
- Repository: [github.com/nuvyntralabs/NuvLoc](https://github.com/nuvyntralabs/NuvLoc)
- Sample: [samples/NuvLocSample](https://github.com/nuvyntralabs/NuvLoc/tree/main/samples/NuvLocSample)
- Toolkit page: [nuvyntralabs.github.io/toolkits/nuvloc/](https://nuvyntralabs.github.io/toolkits/nuvloc/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
