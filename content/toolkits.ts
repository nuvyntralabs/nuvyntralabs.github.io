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
}

export const toolkits: ToolkitDoc[] = [
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
    version: "1.2.0",
    notice: {
      title: "1.2.0 — permissions through benchmark",
      text: "1.1 added permissions, platform, signing, workload, version, dependencies, and icons. 1.2 adds publish --validate, migrate, telemetry (scan only), and benchmark (shells to maui-perf). PackageId stays Plugin.Maui.MauiDev.Cli — nuget.org reserved MauiDev.Cli. The command stays maui-dev.",
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

Install:  dotnet tool install -g Plugin.Maui.Performance.Cli
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
    ],
    install: `dotnet tool install -g Plugin.Maui.MauiDev.Cli
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
    ],
    releaseNotes: [
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
];

export function toolkitPath(item: ToolkitDoc): string {
  return `/toolkits/${item.slug}/`;
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
