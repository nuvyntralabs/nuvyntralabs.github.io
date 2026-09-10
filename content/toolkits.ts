export interface ToolkitCommand {
  name: string;
  purpose: string;
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
    subtitle: "Project-aware maui-dev doctor CLI and VS Code / Cursor extension",
    description:
      "Developer productivity toolkit for .NET MAUI: a maui-dev dotnet tool plus a VS Code / Cursor extension. It reads csproj, manifests, and MAUI resource items, can apply a small allow-list of fixes, and emits JSON/SARIF for CI and the IDE Problems panel.",
    github: "https://github.com/nuvyntralabs/MauiDev",
    nuget: "https://www.nuget.org/packages/Plugin.Maui.MauiDev.Cli",
    packageId: "Plugin.Maui.MauiDev.Cli",
    vscodeMarketplace: "https://marketplace.visualstudio.com/items?itemName=nuvyntralabs.maui-dev",
    language: "C#",
    version: "1.0.1",
    notice: {
      title: "1.0.1 — PackageId is Plugin.Maui.MauiDev.Cli",
      text: "nuget.org reserved MauiDev.Cli (the gallery page 404s and uploads are rejected). The command stays maui-dev. Install with dotnet tool install -g Plugin.Maui.MauiDev.Cli. Do not add it as a PackageReference.",
    },
    tags: [".NET MAUI", "CLI", "dotnet tool", "VS Code", "Cursor", "CI", "SARIF"],
    abstract:
      "Usual alternatives — maui-check (environment only), dotnet workload, Visual Studio’s MAUI installer, and the Microsoft maui CLI — stop at the machine. MauiDev is project-aware: it checks SDK, workloads, Android SDK, JDK, Xcode, CocoaPods, TFMs, min SDK, permissions, duplicate resources, UseMaui, and signing. Install Plugin.Maui.MauiDev.Cli as a global tool. Do not add it as a PackageReference in the app. The VS Code / Cursor extension (nuvyntralabs.maui-dev) shells out to maui-dev and offers to install the tool if it is missing.",
    capabilities: [
      "maui-dev doctor — SDK, workloads, Android SDK, JDK, Xcode, CocoaPods, TFMs, min SDK, permissions, duplicate resources, UseMaui, signing.",
      "maui-dev analyze — cheap C# heuristics: event retention, HttpClient, fire-and-forget, MainThread hops, platform guards.",
      "maui-dev resources — duplicate, missing, or unused MauiImage, splash, and font items.",
      "maui-dev clean — delete bin / obj; optional NuGet HTTP cache and workload temp behind flags.",
      "maui-dev package — validate pack metadata (--validate, default). --pack runs dotnet pack locally and never pushes.",
      "Human, JSON, and SARIF reporters for terminals, CI, and the IDE Problems panel.",
      "Allow-listed doctor --fix: deduplicate identical MauiSplashScreen / MauiImage / MauiIcon / MauiFont items; insert UseMaui when the project already looks like MAUI.",
      "VS Code / Cursor extension nuvyntralabs.maui-dev (requires VS Code / Cursor 1.90+).",
    ],
    commands: [
      {
        name: "maui-dev doctor",
        purpose:
          "SDK, workloads, Android SDK, JDK, Xcode, CocoaPods, TFMs, min SDK, permissions, duplicate resources, UseMaui, signing",
      },
      {
        name: "maui-dev analyze",
        purpose:
          "Cheap C# heuristics (event retention, HttpClient, fire-and-forget, MainThread hops, platform guards)",
      },
      {
        name: "maui-dev resources",
        purpose: "Duplicate / missing / unused MauiImage, splash, font",
      },
      {
        name: "maui-dev clean",
        purpose: "Delete bin / obj (optional NuGet HTTP cache and workload temp behind flags)",
      },
      {
        name: "maui-dev package",
        purpose:
          "Validate pack metadata (--validate, default). --pack runs dotnet pack locally and never pushes",
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
maui-dev analyze --ci
maui-dev package --validate`,
    fixAllowList: [
      "Deduplicates identical MauiSplashScreen / MauiImage / MauiIcon / MauiFont items.",
      "Inserts <UseMaui>true</UseMaui> when the project already looks like MAUI.",
    ],
    neverDoes: [
      "Never bumps min SDK.",
      "Never removes permissions.",
      "Never writes signing secrets.",
      "Never installs workloads.",
      "Never publishes NuGet packages.",
    ],
    ci: `- script: maui-dev doctor --ci
- script: maui-dev analyze --ci
- script: maui-dev package --validate --ci`,
    later: [
      "permissions, platform, signing, publish, workload, version, dependencies, migrate, icons, telemetry",
      "benchmark (will shell to maui-perf)",
      "MauiDev.Analyzers and MauiDev.Templates",
    ],
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
      "1.0.1. PackageId is Plugin.Maui.MauiDev.Cli. nuget.org reserved MauiDev.Cli (gallery 404, upload rejected). Command stays maui-dev.",
      "1.0.0. maui-dev doctor with machine and project checks, --ci, allow-listed --fix / --dry-run.",
      "analyze, resources, clean, package --validate / --pack.",
      "JSON and SARIF reporters for CI and the IDE Problems panel.",
      "VS Code / Cursor extension nuvyntralabs.maui-dev.",
    ],
  },
];

export function toolkitPath(item: ToolkitDoc): string {
  return `/toolkits/${item.slug}/`;
}

export function getToolkitBySlug(slug: string): ToolkitDoc | undefined {
  return toolkits.find((item) => item.slug === slug);
}
