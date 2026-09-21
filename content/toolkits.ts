export interface ToolkitCommand {
  name: string;
  purpose: string;
  group: string;
  usage: string;
  sample: string;
  notes?: string;
}

export interface ToolkitSubstitute {
  need: string;
  use: string;
  href: string;
}

export interface ToolkitDoc {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  github: string;
  nuget: string | null;
  packageId?: string;
  vscodeMarketplace: string | null;
  language: string | null;
  version?: string;
  notice?: { title: string; text: string };
  tags: string[];
  abstract: string;
  capabilities: string[];
  commands: ToolkitCommand[];
  globalOptions: string[];
  install: string;
  installNote: string;
  examples: string;
  ciJsonSample?: string;
  fixAllowList: string[];
  neverDoes: string[];
  ci: string;
  later: string[];
  alternatives: string;
  notFor: ToolkitSubstitute[];
  releaseNotes?: string[];
  /** When false, listed on /toolkits/ only — not the home toolkit grid. */
  home?: boolean;
  aside?: { title: string; text: string };
  usageNote?: string;
  exitNote?: string;
  hostPackageId?: string;
  hostNuget?: string;
}

export const toolkits: ToolkitDoc[] = [
  {
    slug: "nuvyn",
    name: "Nuvyn",
    title: "Nuvyn",
    subtitle: "Spec-driven CLI for .NET MAUI apps on the Nuvyntra stack",
    description:
      "Creates a new four-platform MAUI host locked to MVVMExpress, Lumina UIKit, and the smallest Plugin.Maui.* set. nuvyn adopt attaches the same slash chain to an existing MAUI app without rewriting its host. The product is whatever you specify — any domain.",
    github: "https://github.com/nuvyntralabs/Nuvyn",
    nuget: "https://www.nuget.org/packages/NuvyntraLabs.Nuvyn.Cli",
    packageId: "NuvyntraLabs.Nuvyn.Cli",
    vscodeMarketplace: null,
    language: "C#",
    version: "1.2.0",
    notice: {
      title: "1.2.0 — nuvyn adopt",
      text: "nuvyn adopt attaches the slash chain to an existing MAUI app. It writes .nuvyn/, skills, and adopt-report.md only. It does not change host architecture, UI kit, or HTTP. nuvyn check skips greenfield HostProof when mode is adopt. init / adopt / check still compose maui-dev doctor --path when MauiDev is on PATH (1.2.0+). They do not pass --no-update-check. On an interactive terminal nuvyn asks every 4 hours whether to update from nuget.org ([y/N], default no). Skip with --no-update-check or NUVYNTRA_NO_UPDATE_CHECK=1. Cache: ~/.nuvyntra/cli-updates.json, shared with maui-dev and maui-perf.",
    },
    tags: [".NET MAUI", "CLI", "spec-driven", "agentic", "MVVMExpress", "UIKit"],
    abstract:
      "Nuvyn is a standalone PackAsTool CLI (System.CommandLine + Spectre.Console). It copies an embedded three-project host, adds default Nuvyntra packages from nuget.org, writes .nuvyn/ standing law, and installs slash commands for the Spec Kit coding-agent set (Cursor, Copilot, Claude, Gemini, Codex, Windsurf, and 30+ more). It is not a Spec Kit clone. Use another spec CLI when the stack is not Nuvyntra.",
    capabilities: [
      "nuvyn init <folder> — new three-project MAUI host (no overlay).",
      "nuvyn adopt — attach the slash chain to an existing MAUI app (workflow files only; no host rewrite).",
      "Default packages on init: MVVMExpress, UIKit, HttpForge, FormValidation, KeyboardManager (latest nuget.org).",
      "Slash chain: constitution → specify → clarify → plan → checklist → task → analysis → implement → converge.",
      "nuvyn update — refresh templates, reference, and slash files on an existing Nuvyn app (no host overlay).",
      "nuvyn check — dotnet + payload; greenfield HostProof; adopt prints inventory and skips HostProof.",
      "init / adopt / check compose maui-dev doctor --path when MauiDev is on PATH (warning if missing; Nuvyn still exits 0).",
      "Interactive 4-hour nuget.org update check ([y/N], default no). Skip with --no-update-check or NUVYNTRA_NO_UPDATE_CHECK=1.",
      "Agents: Spec Kit set — Cursor, GitHub Copilot, Claude Code, Gemini CLI, Codex, Windsurf, Goose, generic, and 30+ more.",
      "Standing law in .nuvyn/reference/constraints.md — sleek Lumina, catalog first, API data until asked to persist.",
    ],
    commands: [
      {
        name: "nuvyn init",
        group: "Create",
        purpose: "Create a new Nuvyntra MAUI app and install the spec-driven agent workflow",
        usage: `nuvyn init ClinicApp
nuvyn init ClinicApp --agent cursor
nuvyn init ClinicApp --agent windsurf`,
        sample: `Nuvyn
────────────────────────────────────

[1] Project: ./ClinicApp
[2] Agent: Cursor
[3] Scaffolding MVVMExpress host with UIKit pages…
✓ Host: uikit
[4] Installing .nuvyn templates…
✓ .nuvyn/constitution.md
[5] Writing Cursor commands…
✓ .cursor/skills/nuvyn-constitution/SKILL.md

Next
  cd ClinicApp
  Open this folder in Cursor and run:
  /nuvyn.constitution`,
        notes: "Refuses if the folder already exists (exit 1). No --here / --force. Omit --agent for a searchable Spec Kit picker. For an existing MAUI app use nuvyn adopt.",
      },
      {
        name: "nuvyn adopt",
        group: "Create",
        purpose: "Attach the slash chain to an existing MAUI app without rewriting the host",
        usage: `nuvyn adopt
nuvyn adopt --agent cursor
nuvyn adopt --path ../FieldApp --agent copilot`,
        sample: `Nuvyn
────────────────────────────────────

[1] App: ./FieldApp
[2] Agent: Cursor
[3] Inventory written to .nuvyn/adopt-report.md
✓ .nuvyn/constitution.md
[4] Writing Cursor commands…
✓ .cursor/skills/nuvyn-constitution/SKILL.md

Next
  Open this folder in Cursor and run:
  /nuvyn.constitution
  Read .nuvyn/adopt-report.md before /nuvyn.plan`,
        notes: "Refuses if the folder is not MAUI (UseMaui csproj) or already has .nuvyn/. Does not add MVVMExpress, UIKit, or HttpForge. Does not edit MauiProgram, pages, or HttpClient.",
      },
      {
        name: "nuvyn version",
        group: "Create",
        purpose: "Print the installed CLI version",
        usage: "nuvyn version",
        sample: "NuvyntraLabs.Nuvyn.Cli 1.2.0",
      },
      {
        name: "nuvyn update",
        group: "Create",
        purpose: "Refresh .nuvyn templates, reference, and slash files on an existing Nuvyn app",
        usage: `nuvyn update
nuvyn update --agent cursor`,
        sample: `Nuvyn
────────────────────────────────────

[1] App: ./ClinicApp
[2] Agent: Cursor
[3] Refreshing .nuvyn templates…
✓ .nuvyn/reference/constraints.md
[4] Writing Cursor commands…
✓ .cursor/skills/nuvyn-constitution/SKILL.md`,
        notes: "Leaves host code, specs/, .nuvyn/constitution.md, and .nuvyn/adopt-report.md alone. Does not change PackageReference versions. Run from the app folder. --vertical is not in 1.2.",
      },
      {
        name: "nuvyn check",
        group: "Create",
        purpose: "Confirm dotnet and the payload; inside a greenfield app prove the host package set; inside an adopted app print inventory and skip HostProof; then compose maui-dev doctor",
        usage: "nuvyn check",
        sample: `✓ dotnet is on PATH
✓ Payload: /…/payload
✓ Host: MVVMExpress + UIKit + HttpForge + FormValidation + KeyboardManager
· maui-dev doctor     printed when Plugin.Maui.MauiDev.Cli is on PATH`,
        notes: "Calls maui-dev doctor --path <app> without --no-update-check. Missing MauiDev is a warning. Doctor exit 1 still prints the report; Nuvyn exits 0. Adopted apps (mode: adopt) skip greenfield HostProof.",
      },
    ],
    globalOptions: [
      "--agent cursor|copilot|claude|gemini|codex|windsurf|… (Spec Kit set)",
      "--no-update-check",
      "--help",
    ],
    install: `dotnet tool install -g NuvyntraLabs.Nuvyn.Cli --source https://api.nuget.org/v3/index.json
nuvyn init ClinicApp --agent cursor`,
    installNote:
      "NuvyntraLabs.Nuvyn.Cli is a global dotnet tool (net10.0). Do not run dotnet add package NuvyntraLabs.Nuvyn.Cli in an app. Publishing is pipeline-only on the Nuvyn repository.",
    examples: `nuvyn init HarborDesk --agent cursor
nuvyn adopt --agent cursor
nuvyn update
nuvyn version
nuvyn check
nuvyn --no-update-check version`,
    fixAllowList: [
      "init creates a new folder only. It never overlays, merges, or writes into an existing app.",
      "adopt writes .nuvyn/, skills, and adopt-report.md only. It never rewrites the host.",
    ],
    neverDoes: [
      "Never overlays an existing repo with init (no --here / --force).",
      "Never rewrites host architecture, UI kit, or HTTP on adopt.",
      "Never adds LocalStore, NuvexaDB, or other catalog packages until the spec asks.",
      "Never replaces maui-dev doctor — init / adopt / check compose it when the tool is on PATH.",
      "Never publishes or pushes NuGet packages from a local clone.",
    ],
    ci: `# Publishing is pipeline-only on nuvyntralabs/Nuvyn
# Order: version alignment → tests → prove nuvyn init host → pack (PackAsTool) → nuget.org + GitHub Packages`,
    later: ["--vertical (after a Lumina Playground head regenerates without hand-edits)", "GitHub issue export"],
    alternatives:
      "GitHub Spec Kit covers any stack. MauiDev diagnoses an existing MAUI tree. Stock dotnet new maui scaffolds pages without the Nuvyntra lock or slash chain.",
    notFor: [
      {
        need: "Diagnose an existing MAUI tree",
        use: "MauiDev (maui-dev doctor)",
        href: "/toolkits/maui-dev/",
      },
      {
        need: "Any-stack spec workflow",
        use: "GitHub Spec Kit",
        href: "https://github.com/github/spec-kit",
      },
      {
        need: "One runtime plugin",
        use: "The matching Plugin.Maui.*",
        href: "/packages/",
      },
      {
        need: "Live Plugin.Maui.* session view",
        use: "Pulse (maui-pulse attach)",
        href: "/toolkits/maui-pulse/",
      },
    ],
    releaseNotes: [
      "1.2.0. nuvyn adopt attaches the slash chain to an existing MAUI app. Writes .nuvyn/, skills, and adopt-report.md only. check skips HostProof when mode is adopt.",
      "1.1.1. When maui-dev doctor returns findings (exit 1), say it found issues. Do not phrase a successful run as exited 1.",
      "1.1.0. nuvyn init / nuvyn check compose maui-dev doctor --path when MauiDev is on PATH (no --no-update-check forwarded).",
      "1.1.0. Interactive 4-hour nuget.org update check ([y/N], default no). Skip with --no-update-check or NUVYNTRA_NO_UPDATE_CHECK=1.",
      "1.0.0. nuvyn update refreshes templates, reference, and slash files without overlaying host code.",
      "1.0.0. nuvyn check proves the initiated host still uses the smallest Nuvyntra package set.",
      "1.0.0. CI proves nuvyn init (smallest packages + Core/Tests + Android TFM) before pack.",
      "0.2.0. --agent picker matches Spec Kit (Cursor, Copilot, Claude, Gemini, Codex, Windsurf, Goose, generic, and 30+ more).",
      "0.2.0. Slash commands install into each agent's usual project folder (skills, markdown, TOML, Goose YAML).",
      "0.1.0. nuvyn init scaffolds the embedded UIKit host and installs Cursor, Copilot, Claude, and Gemini slash commands.",
    ],
  },
  {
    slug: "maui-dev",
    name: "MauiDev",
    title: "MauiDev",
    subtitle: "Project-aware maui-dev CLI and VS Code / Cursor extension",
    description:
      "Developer productivity toolkit for .NET MAUI: a maui-dev dotnet tool plus a VS Code / Cursor extension. It reads csproj, manifests, and MAUI resource items, can apply a small allow-list of fixes, and emits JSON/SARIF for CI and the IDE Problems panel.",
    github: "https://github.com/nuvyntralabs/MauiDev",
    nuget: "https://www.nuget.org/packages/Plugin.Maui.MauiDev.Cli",
    packageId: "Plugin.Maui.MauiDev.Cli",
    vscodeMarketplace: "https://marketplace.visualstudio.com/items?itemName=nuvyntralabs.maui-dev",
    language: "C#",
    version: "1.2.2",
    notice: {
      title: "1.2.2 — 4-hour nuget.org update check",
      text: "On an interactive terminal the CLI asks every 4 hours whether to update from nuget.org ([y/N], default no). Cache: ~/.nuvyntra/cli-updates.json. Skip with --no-update-check, NUVYNTRA_NO_UPDATE_CHECK=1, or any --ci / JSON / SARIF run. --no-update-check shipped in 1.2.2; 1.2.1 treats it as an unknown option. Nuvyn therefore calls maui-dev doctor --path without that flag. The CLI does not phone home.",
    },
    tags: [".NET MAUI", "CLI", "dotnet tool", "VS Code", "Cursor", "CI", "SARIF"],
    abstract:
      "Usual alternatives — maui-check (environment only), dotnet workload, Visual Studio’s MAUI installer, and the Microsoft maui CLI — stop at the machine. MauiDev is project-aware: it checks SDK, workloads, Android SDK, JDK, Xcode, CocoaPods, TFMs, min SDK, permissions, duplicate resources, UseMaui, signing, store identity, and leftover Xamarin / net8 TFMs. Install Plugin.Maui.MauiDev.Cli as a global tool. Do not add it as a PackageReference in the app. The VS Code / Cursor extension (nuvyntralabs.maui-dev) shells out to maui-dev and offers to install the tool if it is missing.",
    capabilities: [
      "maui-dev doctor — SDK, workloads, Android SDK, JDK, Xcode, CocoaPods, TFMs, min SDK, permissions, duplicate resources, UseMaui, signing.",
      "maui-dev analyze — cheap C# heuristics: event retention, HttpClient, fire-and-forget, MainThread hops, platform guards.",
      "maui-dev resources — duplicate, missing, or unused MauiImage, splash, and font items.",
      "maui-dev permissions — Android unused/duplicate permissions, iOS usage strings, Android 13+ media/notification.",
      "maui-dev platform — TFM ↔ Platforms/ folders, shared-code guards, Windows/Catalyst note, min OS.",
      "maui-dev signing — keystore / entitlements checklist. Never writes secrets.",
      "maui-dev workload — diagnose the MAUI workload and print the install command. Never installs.",
      "maui-dev version — align packable Version values (--align) or --bump patch|minor|major.",
      "maui-dev dependencies — PackageReference duplicates, Maui.Controls drift, CPM clash, tool-as-library.",
      "maui-dev icons — MauiIcon / splash presence, adaptive background, iOS 1024 marketing size.",
      "maui-dev publish — validate store ApplicationId / CFBundleIdentifier, iOS privacy manifest, pack metadata. Never pushes.",
      "maui-dev migrate — flag net8/net9 TFMs, Xamarin.Forms / Essentials, Forms.Init / LoadApplication. No rewrite.",
      "maui-dev telemetry — scan the app for crash / analytics SDKs. The CLI collects nothing.",
      "maui-dev benchmark — shell to maui-perf (Plugin.Maui.Performance.Cli). Android / iOS simulator only.",
      "maui-dev clean — delete bin / obj; optional NuGet HTTP cache and workload temp behind flags.",
      "maui-dev package — validate pack metadata (--validate, default). --pack runs dotnet pack locally and never pushes.",
      "Human, JSON, and SARIF reporters for terminals, CI, and the IDE Problems panel.",
      "Interactive 4-hour nuget.org update check ([y/N], default no). Skip with --no-update-check, NUVYNTRA_NO_UPDATE_CHECK=1, or --ci / JSON / SARIF.",
      "VS Code / Cursor extension nuvyntralabs.maui-dev (requires VS Code / Cursor 1.90+).",
    ],
    commands: [
      {
        name: "maui-dev doctor",
        group: "Diagnose",
        purpose:
          "SDK, workloads, Android SDK, JDK, Xcode, CocoaPods, TFMs, min SDK, permissions, duplicate resources, UseMaui, signing",
        usage: `maui-dev doctor
maui-dev doctor --path ./src/App
maui-dev doctor --fix --dry-run`,
        sample: `.NET MAUI Developer Doctor
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

Recommendations
────────────────────────────────────

[1] Add <UseMaui>true</UseMaui> — the project already looks like MAUI.
[2] Remove duplicate MauiSplashScreen entries.

Fixes
────────────────────────────────────

Would insert <UseMaui>true</UseMaui> in App.csproj
Would keep one MauiSplashScreen Include and drop the extras
  App.csproj`,
        notes: "--fix only inserts UseMaui and deduplicates identical MauiSplashScreen / MauiImage / MauiIcon / MauiFont items. Pass --dry-run first.",
      },
      {
        name: "maui-dev analyze",
        group: "Diagnose",
        purpose:
          "Cheap C# heuristics (event retention, HttpClient, fire-and-forget, MainThread hops, platform guards)",
        usage: `maui-dev analyze
maui-dev analyze --ci`,
        sample: `.NET MAUI Developer Doctor
────────────────────────────────────

Project
────────────────────────────────────

⚠ Analyze                5 findings

Recommendations
────────────────────────────────────

[1] MD100 MainPage.xaml.cs:12  event handler retained after the page is gone
[2] MD101 MainPage.xaml.cs:14  new HttpClient() inside a method — prefer IHttpClientFactory
[3] MD102 MainPage.xaml.cs:14  fire-and-forget Task.Run without observation
[4] MD103 MainPage.xaml.cs:15  repeated MainThread hops in one constructor
[5] MD105 MainPage.xaml.cs:18  Android API used without a platform guard`,
        notes: "Heuristic, not a Roslyn analyzer. --ci emits JSON for the IDE Problems panel.",
      },
      {
        name: "maui-dev resources",
        group: "Diagnose",
        purpose: "Duplicate / missing / unused MauiImage, splash, font",
        usage: `maui-dev resources
maui-dev resources --path ./src/App`,
        sample: `.NET MAUI Developer Doctor
────────────────────────────────────

Resources
────────────────────────────────────

✗ Resources              missing MauiImage + unused splash

Recommendations
────────────────────────────────────

[1] MD201 App.csproj:18  MauiImage Include 'logo.png' has no file on disk
[2] MD202 Resources/Splash/splash.svg is never referenced`,
      },
      {
        name: "maui-dev permissions",
        group: "Project",
        purpose:
          "Android unused/duplicate permissions, iOS usage strings, Android 13+ media/notification",
        usage: `maui-dev permissions
maui-dev permissions --fix --dry-run`,
        sample: `.NET MAUI Developer Doctor
────────────────────────────────────

Project
────────────────────────────────────

✗ Permissions            duplicate CAMERA + missing NSCameraUsageDescription

Recommendations
────────────────────────────────────

[1] Deduplicate identical Android UsesPermission nodes.
[2] Add an iOS usage string for the camera permission you declared.

Fixes
────────────────────────────────────

Would keep one android.permission.CAMERA and drop the duplicate
  Platforms/Android/AndroidManifest.xml`,
        notes: "--fix only deduplicates identical Android UsesPermission / manifest nodes. It never removes a permission.",
      },
      {
        name: "maui-dev platform",
        group: "Project",
        purpose: "TFM ↔ Platforms/ folders, shared-code guards, Windows/Catalyst note, min OS",
        usage: `maui-dev platform
maui-dev platform --ci`,
        sample: `.NET MAUI Developer Doctor
────────────────────────────────────

Project
────────────────────────────────────

⚠ Target frameworks      net10.0-android; net10.0-ios
⚠ Platforms              no Platforms/Windows folder for a Windows TFM
✓ Compile guards         shared code is platform-neutral`,
      },
      {
        name: "maui-dev signing",
        group: "Project",
        purpose: "Keystore / entitlements checklist. Never writes secrets",
        usage: `maui-dev signing
maui-dev signing --ci`,
        sample: `.NET MAUI Developer Doctor
────────────────────────────────────

Project
────────────────────────────────────

⚠ Signing                AndroidKeyStore not set for Release
⚠ Entitlements           no Entitlements.plist on the iOS TFM

Recommendations
────────────────────────────────────

[1] Point Release at a keystore from CI secrets — do not commit the file.
[2] Add Platforms/iOS/Entitlements.plist when the app uses push or iCloud.`,
        notes: "Checklist only. maui-dev never writes keystore passwords, provisioning profiles, or signing secrets.",
      },
      {
        name: "maui-dev workload",
        group: "Project",
        purpose: "Diagnose the MAUI workload and print the install command. Never installs",
        usage: `maui-dev workload`,
        sample: `.NET MAUI Developer Doctor
────────────────────────────────────

Machine
────────────────────────────────────

✗ MAUI workload          maui workload is not installed

Recommendations
────────────────────────────────────

[1] Run: dotnet workload install maui`,
        notes: "Prints the install command. It never runs dotnet workload install.",
      },
      {
        name: "maui-dev version",
        group: "Project",
        purpose: "Align packable Version values (--align) or --bump patch|minor|major",
        usage: `maui-dev version --align --dry-run
maui-dev version --bump patch --dry-run
maui-dev version --bump minor`,
        sample: `.NET MAUI Developer Doctor
────────────────────────────────────

Packaging
────────────────────────────────────

⚠ Version                Lib 1.0.0 and Cli 1.0.1 are not aligned

Fixes
────────────────────────────────────

Would set Version and PackageVersion to 1.0.1
  src/Lib/Lib.csproj
Would leave Cli at 1.0.1
  src/Cli/Cli.csproj
Would set extension/vscode/package.json version to 1.0.1`,
        notes: "--align writes every packable Version to the highest existing value. --bump implies --align. Both honor --dry-run. Invalid --bump values exit 2.",
      },
      {
        name: "maui-dev dependencies",
        group: "Project",
        purpose: "PackageReference duplicates, Maui.Controls drift, CPM clash, tool-as-library",
        usage: `maui-dev dependencies
maui-dev dependencies --ci`,
        sample: `.NET MAUI Developer Doctor
────────────────────────────────────

Packaging
────────────────────────────────────

✗ Dependencies           duplicate PackageReference + Maui.Controls drift

Recommendations
────────────────────────────────────

[1] App.csproj references Plugin.Maui.GeoLocator twice with different versions.
[2] Microsoft.Maui.Controls 10.0.10 drifts from the workload 10.0.0 pin.
[3] Do not PackageReference a PackAsTool project (Plugin.Maui.MauiDev.Cli).`,
      },
      {
        name: "maui-dev icons",
        group: "Project",
        purpose: "MauiIcon / splash presence, adaptive background, iOS 1024 marketing size",
        usage: `maui-dev icons`,
        sample: `.NET MAUI Developer Doctor
────────────────────────────────────

Resources
────────────────────────────────────

⚠ Icons                  MauiIcon present; iOS marketing size is 512

Recommendations
────────────────────────────────────

[1] Supply a 1024×1024 iOS marketing / App Store icon.
[2] Set an adaptive icon background color for Android.`,
      },
      {
        name: "maui-dev publish",
        group: "Release",
        purpose:
          "Validate store ApplicationId / CFBundleIdentifier, iOS privacy manifest, pack metadata. Never pushes",
        usage: `maui-dev publish --validate
maui-dev publish --validate --ci`,
        sample: `.NET MAUI Developer Doctor
────────────────────────────────────

Packaging
────────────────────────────────────

✗ ApplicationId          missing ApplicationId / CFBundleIdentifier
⚠ Privacy manifest       no PrivacyInfo.xcprivacy on the iOS TFM
✓ Pack metadata          README, icon, and license are present

Recommendations
────────────────────────────────────

[1] Set ApplicationId (Android) and CFBundleIdentifier (iOS) before store upload.
[2] Add Platforms/iOS/PrivacyInfo.xcprivacy for iOS 17+ required-reason APIs.`,
        notes: "--validate is the default. --push is rejected (exit 2). Publishing NuGet packages is pipeline-only.",
      },
      {
        name: "maui-dev migrate",
        group: "Release",
        purpose: "Flag net8/net9 TFMs, Xamarin.Forms / Essentials, Forms.Init / LoadApplication",
        usage: `maui-dev migrate
maui-dev migrate --ci`,
        sample: `.NET MAUI Developer Doctor
────────────────────────────────────

Project
────────────────────────────────────

⚠ Migrate                net8 TFM + Xamarin leftovers

Recommendations
────────────────────────────────────

[1] TargetFrameworks still includes net8.0-android — move to net10.0-*.
[2] Xamarin.Forms / Xamarin.Essentials PackageReference found.
[3] Forms.Init / LoadApplication remain in App.xaml.cs — MAUI uses MauiProgram.`,
        notes: "Flags only. It never rewrites TFMs or source.",
      },
      {
        name: "maui-dev telemetry",
        group: "Release",
        purpose: "Scan the app for crash / analytics SDKs. The CLI collects nothing",
        usage: `maui-dev telemetry`,
        sample: `.NET MAUI Developer Doctor
────────────────────────────────────

Project
────────────────────────────────────

⚠ Telemetry              AppCenter + Firebase Analytics referenced

Recommendations
────────────────────────────────────

[1] Plugin.Maui.Diagnostics is the lab crash / ANR package if you want that surface.
[2] The CLI itself collects nothing — this command only scans the app.`,
        notes: "Scan only. MauiDev does not send telemetry.",
      },
      {
        name: "maui-dev benchmark",
        group: "Release",
        purpose: "Shell to maui-perf (Plugin.Maui.Performance.Cli). Android / iOS simulator only",
        usage: `maui-dev benchmark
maui-dev benchmark startup`,
        sample: `maui-perf is not on PATH.

Install:  dotnet tool install -g Plugin.Maui.Performance.Cli --source https://api.nuget.org/v3/index.json
Then:     maui-dev benchmark startup

MD900  benchmark requires maui-perf (Plugin.Maui.Performance.Cli).`,
        notes: "Does not reimplement maui profile. Extra args are forwarded to maui-perf. Android / iOS simulator only.",
      },
      {
        name: "maui-dev clean",
        group: "Release",
        purpose: "Delete bin / obj (optional NuGet HTTP cache and workload temp behind flags)",
        usage: `maui-dev clean
maui-dev clean --dry-run
maui-dev clean --nuget-http-cache --yes`,
        sample: `.NET MAUI Developer Doctor
────────────────────────────────────

Project
────────────────────────────────────

✓ Clean                  deleted src/bin and src/obj

Fixes
────────────────────────────────────

Deleted src/bin
Deleted src/obj`,
        notes: "--nuget-http-cache and --workload-temp require --yes. --nuget-global also requires --force.",
      },
      {
        name: "maui-dev package",
        group: "Release",
        purpose:
          "Validate pack metadata (--validate, default). --pack runs dotnet pack locally and never pushes",
        usage: `maui-dev package --validate
maui-dev package --validate --ci
maui-dev package --pack`,
        sample: `.NET MAUI Developer Doctor
────────────────────────────────────

Packaging
────────────────────────────────────

✗ Package                Version mismatch across packable projects

Recommendations
────────────────────────────────────

[1] MD401 Lib is 1.0.0 and Cli is 1.0.1 — align with maui-dev version --align.`,
        notes: "--pack runs dotnet pack locally. It never pushes to nuget.org.",
      },
    ],
    globalOptions: [
      "--path",
      "--format human|json|sarif",
      "--ci (JSON + warn-as-error)",
      "--fix",
      "--dry-run",
      "--warn-as-error",
      "--timeout",
      "--no-update-check",
    ],
    install: `dotnet tool install -g Plugin.Maui.MauiDev.Cli --source https://api.nuget.org/v3/index.json
maui-dev doctor`,
    installNote:
      "Plugin.Maui.MauiDev.Cli is a global dotnet tool (net10.0). The command stays maui-dev. Do not run dotnet add package Plugin.Maui.MauiDev.Cli in an app. nuget.org reserved the ID MauiDev.Cli. Publishing is pipeline-only on the MauiDev repository.",
    examples: `maui-dev doctor --fix --dry-run
maui-dev permissions --fix --dry-run
maui-dev version --align --dry-run
maui-dev publish --validate --ci
maui-dev migrate
maui-dev telemetry
maui-dev benchmark
maui-dev analyze --ci
maui-dev package --validate`,
    ciJsonSample: `{
  "command": "doctor",
  "exitCode": 1,
  "results": [
    {
      "id": "dotnet-sdk",
      "title": ".NET SDK",
      "category": "machine",
      "status": "pass",
      "detail": "10.0.102",
      "canFix": false,
      "diagnostics": []
    },
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
  ]
}`,
    fixAllowList: [
      "doctor: deduplicates identical MauiSplashScreen / MauiImage / MauiIcon / MauiFont items; inserts <UseMaui>true</UseMaui> when the project already looks like MAUI.",
      "permissions: deduplicates identical Android UsesPermission / manifest nodes.",
      "version --align / --bump: writes Version / PackageVersion and extension/vscode/package.json.",
    ],
    neverDoes: [
      "Never bumps min SDK.",
      "Never removes permissions.",
      "Never writes signing secrets.",
      "Never installs workloads.",
      "Never rewrites TFMs or Xamarin leftovers.",
      "Never publishes or pushes NuGet packages.",
    ],
    ci: `- script: maui-dev doctor --ci
- script: maui-dev analyze --ci
- script: maui-dev permissions --ci
- script: maui-dev platform --ci
- script: maui-dev publish --validate --ci
- script: maui-dev migrate --ci
- script: maui-dev package --validate --ci`,
    later: ["MauiDev.Analyzers", "MauiDev.Templates"],
    aside: {
      title: "Not a runtime plugin",
      text: "MauiDev diagnoses the machine and the project. Use the focused Plugin.Maui.* packages for leaks, traces, crashes, and device health.",
    },
    alternatives:
      "maui-check covers the environment only. dotnet workload, Visual Studio’s MAUI installer, and the Microsoft maui CLI install or list SDKs. MauiDev reads the project and can apply a small allow-list of fixes.",
    notFor: [
      {
        need: "Runtime leak detection",
        use: "Plugin.Maui.LeakAnalyser",
        href: "/packages/plugin-maui-leak-analyser/",
      },
      {
        need: "Startup and page traces",
        use: "Plugin.Maui.Performance / maui-perf",
        href: "/packages/plugin-maui-performance/",
      },
      {
        need: "Crash / ANR reporting",
        use: "Plugin.Maui.Diagnostics",
        href: "/packages/plugin-maui-diagnostics/",
      },
      {
        need: "Device health (battery, thermal)",
        use: "Plugin.Maui.AppHealth",
        href: "/packages/plugin-maui-app-health/",
      },
      {
        need: "Live Plugin.Maui.* session view",
        use: "Pulse (maui-pulse attach)",
        href: "/toolkits/maui-pulse/",
      },
    ],
    releaseNotes: [
      "1.2.2. Interactive 4-hour nuget.org update check. --no-update-check skips it; 1.2.1 treated that flag as unknown.",
      "1.2.1. PackageProjectUrl and docs links point at https://nuvyntralabs.github.io/toolkits/maui-dev/.",
      "1.2.0. publish --validate (store ApplicationId / CFBundleIdentifier, iOS privacy manifest). --push is rejected.",
      "1.2.0. migrate flags net8/net9 TFMs and Xamarin leftovers without rewriting.",
      "1.2.0. telemetry scans the app for crash / analytics SDKs. The CLI collects nothing.",
      "1.2.0. benchmark shells to maui-perf (Plugin.Maui.Performance.Cli); MD900 if the tool is missing.",
      "1.1.0. permissions, platform, signing, workload, version, dependencies, icons.",
      "1.1.0. permissions --fix deduplicates identical Android permission nodes.",
      "1.1.0. version --align / --bump patch|minor|major write packable Version values (honors --dry-run).",
      "1.1.0. .maui-dev.json ignore accepts diagnostic ids (MD020) as well as check ids.",
      "1.0.1. PackageId is Plugin.Maui.MauiDev.Cli. nuget.org reserved MauiDev.Cli. Command stays maui-dev.",
      "1.0.0. maui-dev doctor with machine and project checks, --ci, allow-listed --fix / --dry-run.",
    ],
  },
  {
    slug: "maui-pulse",
    name: "Pulse",
    title: "Pulse",
    subtitle: "Live Plugin.Maui.* session viewer — UseMauiPulse() plus maui-pulse CLI",
    description:
      "During-the-session viewer for allow-listed Nuvyntra plugins only. The host package forwards events the app already raises; maui-pulse attach draws a nine-lane table. It does not scrape logcat, Charles, Firebase, Sentry, or MAUI Connectivity.",
    github: "https://github.com/nuvyntralabs/MauiPulse",
    nuget: "https://www.nuget.org/packages/Plugin.Maui.Pulse.Cli",
    packageId: "Plugin.Maui.Pulse.Cli",
    hostPackageId: "Plugin.Maui.Pulse",
    hostNuget: "https://www.nuget.org/packages/Plugin.Maui.Pulse",
    vscodeMarketplace: null,
    language: "C#",
    version: "1.0.1",
    home: false,
    notice: {
      title: "1.0.1 — host symbols + version align",
      text: "Host and CLI ship at the same 1.0.1. The host now packs snupkg. The CLI still omits it. On an interactive terminal maui-pulse asks every 4 hours whether to update from nuget.org ([y/N], default no). Cache: ~/.nuvyntra/cli-updates.json, shared with maui-dev, nuvyn, and maui-perf. Skip with --no-update-check or NUVYNTRA_NO_UPDATE_CHECK=1. CI, --format json, and piped output skip the prompt. The CLI does not phone home.",
    },
    aside: {
      title: "CLI is the tool; the host is a Debug sink",
      text: "Install Plugin.Maui.Pulse.Cli as a global tool. Do not add it as a PackageReference. The app adds Plugin.Maui.Pulse and builder.UseMauiPulse(), then still registers the plugins it already uses. Pulse only listens.",
    },
    tags: [".NET MAUI", "CLI", "dotnet tool", "observability", "Debug sink"],
    abstract:
      "Two packages, one job: show what allow-listed Plugin.Maui.* plugins are doing right now. Plugin.Maui.Pulse is a Debug sink — UseMauiPulse() scans DI and loaded assemblies, stays subscribed, and POSTs JSON to http://127.0.0.1:7878/ (10.0.2.2 on an emulator). Plugin.Maui.Pulse.Cli is the maui-pulse tool that listens and draws NETWORK, API, QUEUE, SYNC, PERMS, HEALTH, LEAK, CRASH, and SESSION. A missing plugin skips that lane (not_installed). Release is off unless Enabled = true. Pulse does not replace MauiDev, maui-perf, or Observability.",
    capabilities: [
      "UseMauiPulse() — one host line. No per-event HttpClient.PostAsync in app code.",
      "maui-pulse attach — live nine-lane table on port 7878 (default).",
      "maui-pulse listen — HTTP sink or --stdin JSON for agents and tests. No table.",
      "maui-pulse pull / queues / sync / incident — copy and inspect JobQueue, RetryQueue, OfflineSync, and Diagnostics files.",
      "Closed allow-list: NetworkMonitor, NetworkDiagnostics, JobQueue, RetryQueue, OfflineSync, PermissionFlow, AppHealth, LeakAnalyser, Diagnostics, DeviceSession.",
      "Unknown sources (logcat, Firebase, Sentry, MAUI Connectivity) are dropped.",
      "Every session command requires --package. listen / attach also require --android or --ios.",
      "Interactive 4-hour nuget.org update check ([y/N], default no). Skip with --no-update-check or NUVYNTRA_NO_UPDATE_CHECK=1.",
    ],
    commands: [
      {
        name: "maui-pulse attach",
        group: "Live",
        purpose: "HTTP sink plus the nine-lane table. This is the live command",
        usage: `maui-pulse attach --package com.test.androidapp --android --port 7878
maui-pulse attach --package com.test.ios --ios --port 7878 --no-update-check
adb reverse tcp:7878 tcp:7878   # USB Android, then attach`,
        sample: `maui-pulse 1.0.1  attach  com.test.androidapp  android  :7878
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
SESSION   Plugin.Maui.DeviceSession       session 8f2a`,
        notes:
          "A quiet row (—) means Pulse is subscribed and waiting. — not installed means the assembly is missing. — not registered means the package is referenced but UseX() / AddX() is missing. Two apps need two Pulse windows.",
      },
      {
        name: "maui-pulse listen",
        group: "Live",
        purpose: "HTTP sink on --port or --stdin JSON. No table. Agents, tests, Observability",
        usage: `maui-pulse listen --package com.test.androidapp --android --port 7878
maui-pulse listen --package com.test.androidapp --android --stdin --once --format json`,
        sample: `{
  "ok": true,
  "tool": "maui-pulse"
}

{
  "package": "com.test.androidapp",
  "source": "Plugin.Maui.NetworkMonitor",
  "lane": "network",
  "signal": "StatusChanged",
  "summary": "captive portal",
  "state": "running",
  "at": "2026-09-19T16:00:00Z"
}`,
        notes: "GET / returns health. POST / ingests presence, signal, or batch JSON. Unknown source / id values are dropped.",
      },
      {
        name: "maui-pulse pull",
        group: "Files",
        purpose: "Copy known plugin files from --from. --adb only prints how to copy",
        usage: `maui-pulse pull --package com.test.androidapp --from ./device-files --out ./pulled
maui-pulse pull --package com.test.androidapp --from ./device-files --adb`,
        sample: `maui-pulse 1.0.1  pull  com.test.androidapp

Copied
  plugin.maui.jobqueue.db3
  offlinesync.db3
  maui-diagnostics/

Skipped
  plugin.maui.retryqueue.db3  (missing)`,
        notes: "Known names: plugin.maui.jobqueue.db3, plugin.maui.retryqueue.db3, offlinesync.db3, maui-diagnostics/. logcat.txt in the same folder is ignored.",
      },
      {
        name: "maui-pulse queues",
        group: "Files",
        purpose: "Read-only JobQueue / RetryQueue *.db3 inspector. Does not drain",
        usage: "maui-pulse queues --package com.test.androidapp --from ./pulled",
        sample: `maui-pulse 1.0.1  queues  com.test.androidapp

JobQueue  plugin.maui.jobqueue.db3
  pending  2
  failed   visits#184  last error: timeout
RetryQueue  — file missing`,
        notes: "Read-only. It never dequeues or retries work.",
      },
      {
        name: "maui-pulse sync",
        group: "Files",
        purpose: "Read-only OfflineSync offlinesync.db3 inspector",
        usage: "maui-pulse sync --package com.test.androidapp --from ./pulled",
        sample: `maui-pulse 1.0.1  sync  com.test.androidapp

OfflineSync  offlinesync.db3
  pending   3
  conflict  Visit/184  two devices edited the same row`,
      },
      {
        name: "maui-pulse incident",
        group: "Files",
        purpose: "Zip allow-listed files plus manifest.json",
        usage: "maui-pulse incident --package com.test.androidapp --from ./pulled --out incident.zip",
        sample: `maui-pulse 1.0.1  incident  com.test.androidapp

Wrote incident.zip
  plugin.maui.jobqueue.db3
  offlinesync.db3
  maui-diagnostics/
  manifest.json`,
      },
      {
        name: "maui-pulse version",
        group: "Files",
        purpose: "Print the installed CLI version",
        usage: "maui-pulse version",
        sample: "Plugin.Maui.Pulse.Cli 1.0.1",
        notes: "No --package required.",
      },
    ],
    globalOptions: [
      "--package (required on session commands)",
      "--android | --ios (required on listen / attach)",
      "--port (default 7878)",
      "--format human|json",
      "--lanes network,sync,queue (hides rows; does not widen the allow-list)",
      "--stdin",
      "--once",
      "--from",
      "--out",
      "--adb",
      "--no-update-check",
    ],
    install: `dotnet tool install -g Plugin.Maui.Pulse.Cli --source https://api.nuget.org/v3/index.json
dotnet add package Plugin.Maui.Pulse
adb reverse tcp:7878 tcp:7878   # USB Android
maui-pulse attach --package com.myapp.android --android --port 7878`,
    installNote:
      "Plugin.Maui.Pulse.Cli is a global dotnet tool (net10.0). The command stays maui-pulse. Do not run dotnet add package Plugin.Maui.Pulse.Cli in an app. The host package is Plugin.Maui.Pulse — call builder.UseMauiPulse() and still register the plugins the product already uses. Publishing is pipeline-only on the MauiPulse repository.",
    examples: `maui-pulse attach --package com.test.androidapp --android --port 7878 --no-update-check
maui-pulse attach --package com.test.ios --ios --port 7878
maui-pulse listen --package com.test.androidapp --android --stdin --once --format json
maui-pulse pull --package com.test.androidapp --from ./device-files --out ./pulled
maui-pulse queues --package com.test.androidapp --from ./pulled
maui-pulse sync --package com.test.androidapp --from ./pulled
maui-pulse incident --package com.test.androidapp --from ./pulled --out incident.zip
maui-pulse version`,
    ciJsonSample: `{
  "package": "com.test.androidapp",
  "source": "Plugin.Maui.NetworkMonitor",
  "lane": "network",
  "signal": "StatusChanged",
  "summary": "captive portal",
  "state": "running",
  "at": "2026-09-19T16:00:00Z"
}`,
    fixAllowList: [],
    neverDoes: [
      "Never scrapes logcat, Charles, Firebase, Sentry, or MAUI Connectivity.",
      "Never starts or registers plugins for you.",
      "Never invents a substitute from the OS when a plugin is missing.",
      "Never phones home.",
      "Never installs workloads.",
      "Never drains JobQueue or RetryQueue.",
      "Never adds Plugin.Maui.Pulse.Cli as a PackageReference.",
    ],
    ci: `maui-pulse listen --package com.test.androidapp --android --stdin --once --format json`,
    later: [],
    usageNote:
      "Each sample is a typical attach or inspector view. A quiet row (—) is waiting, not a failure. USB Android needs adb reverse tcp:7878 tcp:7878 after unplug. Release is off unless options.Enabled = true.",
    exitNote:
      "Exit codes: 0 success (including skipped lanes / missing queue files), 1 no allow-listed evidence or bind failed, 2 usage (missing --package, missing platform, unknown command).",
    alternatives:
      "adb logcat, Charles / Proxyman, Firebase Performance, and Sentry are raw logs, HTTP only, or cloud-after-the-fact. Observability can push; Pulse listens. MauiDev doctors the project. maui-perf wraps maui profile.",
    notFor: [
      {
        need: "Diagnose an existing MAUI tree",
        use: "MauiDev (maui-dev doctor)",
        href: "/toolkits/maui-dev/",
      },
      {
        need: "New spec-driven MAUI host",
        use: "Nuvyn",
        href: "/toolkits/nuvyn/",
      },
      {
        need: "Startup and page traces",
        use: "Plugin.Maui.Performance / maui-perf",
        href: "/packages/plugin-maui-performance/",
      },
      {
        need: "In-app telemetry exporter",
        use: "Plugin.Maui.Observability",
        href: "/packages/plugin-maui-observability/",
      },
    ],
    releaseNotes: [
      "1.0.1. Host and CLI aligned. Host packs snupkg so nuget.org matches other Plugin.Maui.* libraries. CLI still omits snupkg.",
      "1.0.0. UseMauiPulse() Debug sink plus maui-pulse attach, listen, pull, queues, sync, incident, and version.",
      "1.0.0. Nine closed lanes. Unknown sources dropped. Interactive 4-hour nuget.org update check shared with maui-dev, nuvyn, and maui-perf.",
    ],
  },
];

export function toolkitPath(item: ToolkitDoc): string {
  return `/toolkits/${item.slug}/`;
}

export function homeToolkits(): ToolkitDoc[] {
  return toolkits.filter((item) => item.home !== false);
}

export function getToolkitBySlug(slug: string): ToolkitDoc | undefined {
  return toolkits.find((item) => item.slug === slug);
}

export function toolkitCommandGroups(toolkit: ToolkitDoc): { name: string; commands: ToolkitCommand[] }[] {
  const groups: { name: string; commands: ToolkitCommand[] }[] = [];
  for (const command of toolkit.commands) {
    const existing = groups.find((group) => group.name === command.group);
    if (existing) {
      existing.commands.push(command);
    } else {
      groups.push({ name: command.group, commands: [command] });
    }
  }
  return groups;
}
