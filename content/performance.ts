import type { DocSection } from "@/content/mvvmexpress";

export const performanceSlug = "plugin-maui-performance";

export const performanceDocsHref = `/packages/${performanceSlug}/docs/`;
export const performanceIntegrationHref = `/packages/${performanceSlug}/integration/`;
export const performanceComparisonHref = `/packages/${performanceSlug}/comparison/`;

export const performanceTechnicalTitle = "How Performance works";
export const performanceTechnicalDescription =
  "An on-device MAUI scoreboard for startup, pages, APIs, images, SQLite, and memory, plus MauiProfile / maui-perf so maui profile can stop on first frame or a named scenario.";

export const performanceIntegrationTitle = "Get started with Performance";
export const performanceIntegrationDescription =
  "Install 1.0.7, register UseMauiPerformance, add named traces or PerformanceDelegatingHandler, then optionally install maui-perf to wrap maui profile startup.";

export const performanceComparisonTitle = "Performance vs APM, Diagnostics, and raw maui profile";
export const performanceComparisonDescription =
  "Compare Plugin.Maui.Performance 1.0.7 with Application Insights / Sentry, EventCounters, LeakAnalyser, Diagnostics, Observability, and the official maui profile CLI — and when to choose each.";

export const performanceTechnicalSections: DocSection[] = [
  {
    id: "what-it-is",
    title: "What it is",
    blocks: [
      {
        type: "p",
        text: "Plugin.Maui.Performance is a lightweight on-device profiler for .NET MAUI on Android and iOS. It records named timings and automatic hooks so a field build can print a scoreboard like App Startup 1.82 sec without attaching a full IDE profiler.",
      },
      {
        type: "code",
        code: `using var trace = MauiPerformance.Trace("LoadCustomer");
using var checkout = MauiProfile.Scenario("LoadCustomer");`,
      },
      {
        type: "callout",
        title: "Not a leak detector or an APM",
        text: "This answers how long something took. Use LeakAnalyser for WeakReference liveness after a page is popped. Use Diagnostics for crash / ANR breadcrumbs. Use Application Insights, Sentry performance, or App Center when you need a hosted APM.",
      },
    ],
  },
  {
    id: "automatic",
    title: "Automatic measurement",
    blocks: [
      {
        type: "p",
        text: "UseMauiPerformance() turns these hooks on by default. Set Enabled to false in production if you only want timings in debug builds.",
      },
      {
        type: "table",
        headers: ["Signal", "How"],
        rows: [
          ["Startup time", "Process start (or Start()) to the first content page. Recorded as App Startup."],
          ["Page startup", "Page appearing until Loaded. Named from the page title (Home → Home Page)."],
          ["Navigation time", "Previous page disappearing until the next appearing (Home Page → Customer Page)."],
          ["API latency", "PerformanceDelegatingHandler on HttpClient. Path /customer becomes Customer API."],
          ["Image loading", "Images on each page, aggregated as Image Loading."],
          ["UI rendering", "Next display frame after the page loads (UI Render). Android Choreographer, iOS CADisplayLink."],
          ["Memory", "Working set / managed heap plus free RAM on Android (ActivityManager) and iOS (os_proc_available_memory)."],
          ["Database", "Not hooked globally — wrap SQLite (or any store) with TraceDatabase / Measure."],
        ],
      },
    ],
  },
  {
    id: "named-traces",
    title: "Named traces",
    blocks: [
      {
        type: "p",
        text: "Dispose ends the timing and stores the metric. Cancel() ends it without recording. Resolve IMauiPerformance from dependency injection, or use MauiPerformance.Current.",
      },
      {
        type: "code",
        code: `using var load = MauiPerformance.Trace("LoadCustomer");
using var api = MauiPerformance.TraceApi("Customer API");
using var query = MauiPerformance.TraceDatabase("SQLite Query");
using var image = MauiPerformance.TraceImage("Image Loading");

await MauiPerformance.MeasureAsync("Customer API", () => client.GetStringAsync("/customer"), PerformanceCategory.Api);
MauiPerformance.Measure("SQLite Query", () => db.Query("SELECT * FROM customer"), PerformanceCategory.Database);
MauiPerformance.Record("Home Page", TimeSpan.FromMilliseconds(420), PerformanceCategory.Page);`,
      },
    ],
  },
  {
    id: "maui-profile",
    title: "MauiProfile and maui profile",
    blocks: [
      {
        type: "p",
        text: "1.0.7 adds MauiProfile as an in-app wrapper for maui profile / Microsoft.Maui.ProfilingHelper. The official CLI captures an EventPipe .nettrace from a Release Android device or iOS simulator. Remembering the stopping-event flags and calling MauiProfilingMarker.Complete() is the unintuitive part. This plugin wraps both sides.",
      },
      {
        type: "p",
        text: "UseMauiPerformance() stops a maui profile startup session on the first display frame (or a named scenario). You do not need a Microsoft.Maui.ProfilingHelper package reference — when maui profile injects the helper, MauiProfile calls Complete() for you.",
      },
      {
        type: "table",
        headers: ["API", "What it does"],
        rows: [
          ["MauiProfile.IsSession", "true when MAUI_PROFILING_HELPER is set or the official marker reports a session."],
          ["MauiProfile.StartupComplete()", "Emits StartupComplete and calls the official marker."],
          ["MauiProfile.Mark(\"CartReady\")", "Named point in the EventPipe trace."],
          ["MauiProfile.Scenario(\"Checkout\")", "Timing + ScenarioComplete; can stop startup."],
          ["MauiProfile.StartupCommand(\"android\")", "Prints the maui profile startup one-liner."],
          ["MauiProfile.ManualCommand(\"ios\")", "Prints maui profile manual for a screen or flow."],
        ],
      },
      {
        type: "table",
        headers: ["CliProfile.CompleteOn", "When the startup trace stops"],
        rows: [
          ["FirstFrame (default)", "After the first display frame following the first page load."],
          ["FirstPage", "When the first content page appears — the same moment as App Startup."],
          ["Manual", "Only when StartupComplete() runs or CompleteOnScenario finishes."],
          ["Injected", "Leave stop timing to the official helper (first page handler)."],
        ],
      },
      {
        type: "p",
        text: "Set CliProfile.CompleteOnScenario to wait for a named flow instead of first page / first frame. CliProfile.Enabled = false skips automatic first-page / first-frame stop; manual StartupComplete() and scenarios still work.",
      },
      {
        type: "callout",
        title: "CLI platforms",
        text: "maui profile supports Android and iOS simulator only. The in-app MauiPerformance report still works on both platforms without the CLI.",
      },
    ],
  },
  {
    id: "report",
    title: "The report",
    blocks: [
      {
        type: "code",
        code: `var report = MauiPerformance.GetReport();
Console.WriteLine(report.Format());

report.Metrics;      // latest timing per name
report.AllMetrics;   // full ring buffer
report.Memory.WorkingSetBytes;
report.Memory.AvailableBytes;
report.Memory.Pressure;`,
      },
      {
        type: "p",
        text: "Durations of one second or more print as 1.82 sec. Shorter work prints as 420 ms. MaxMetrics (default from MauiPerformanceDefaults) drops the oldest entries from the ring buffer.",
      },
    ],
  },
  {
    id: "when",
    title: "When to use it",
    blocks: [
      {
        type: "ul",
        items: [
          "How do I measure MAUI startup and page load time on a device?",
          "Trace API vs SQLite vs image load without Application Insights.",
          "How do I wrap maui profile / stop a startup .nettrace on first frame?",
        ],
      },
      {
        type: "p",
        text: "Do not use this package if you need a hosted APM, retain-path diagnosis (use a memory profiler), crash / ANR breadcrumbs (Diagnostics), or WeakReference liveness after navigation (LeakAnalyser).",
      },
    ],
  },
  {
    id: "platforms",
    title: "Platforms and version",
    blocks: [
      {
        type: "p",
        text: "Version 1.0.7. Target frameworks: net10.0, net10.0-android (API 21+), net10.0-ios (iOS 15+). Mac Catalyst and Windows are not primary targets. net10.0 without an OS TFM is for shared code and tests — native APIs typically throw FeatureNotSupported.",
      },
      {
        type: "table",
        headers: ["", "Android", "iOS", "net10.0"],
        rows: [
          ["Named traces / report", "Yes", "Yes", "Yes (tests)"],
          ["Startup / page / navigation", "Yes", "Yes", "Listener APIs"],
          ["HTTP handler", "Yes", "Yes", "Yes"],
          ["Image aggregation", "Yes", "Yes", "—"],
          ["Next-frame render", "Choreographer", "CADisplayLink", "Immediate"],
          ["Memory probes", "ActivityManager", "os_proc_available_memory", "GC + working set"],
          ["maui profile / maui-perf", "Device", "Simulator only", "—"],
        ],
      },
      {
        type: "link",
        href: "https://www.nuget.org/packages/Plugin.Maui.Performance",
        label: "Plugin.Maui.Performance on nuget.org",
        note: "Library 1.0.7. Restore from nuget.org or the nuvyntralabs GitHub Packages feed.",
      },
      {
        type: "link",
        href: "https://www.nuget.org/packages/Plugin.Maui.Performance.Cli",
        label: "Plugin.Maui.Performance.Cli on nuget.org",
        note: "dotnet tool maui-perf, packed at the same 1.0.7 version (PackAsTool, no snupkg).",
      },
      {
        type: "link",
        href: "https://github.com/nuvyntralabs/Plugin.Maui.Performance",
        label: "Source and sample on GitHub",
      },
    ],
  },
];

export const performanceIntegrationSections: DocSection[] = [
  {
    id: "install",
    title: "Install",
    blocks: [
      {
        type: "code",
        code: `dotnet add package Plugin.Maui.Performance
dotnet tool install -g Plugin.Maui.Performance.Cli`,
      },
      {
        type: "p",
        text: "Package ID: Plugin.Maui.Performance. Current NuGet is 1.0.7. The CLI tool is optional — install it only when you want maui-perf aliases over raw maui profile flags. Both PackageIds publish from the same repo CI.",
      },
      {
        type: "link",
        note: "Restore Plugin.Maui.* from GitHub Packages:",
        label: "Use nuvyntralabs GitHub Packages from a C# project",
        href: "/getting-started/github-packages/",
      },
    ],
  },
  {
    id: "register",
    title: "Register",
    blocks: [
      {
        type: "code",
        code: `using Plugin.Maui.Performance;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .UseMauiPerformance();

        return builder.Build();
    }
}`,
      },
      {
        type: "p",
        text: "Registration starts automatic startup, page, navigation, image, and render measurement. On Android it also hooks OnResume; on iOS it hooks OnActivated.",
      },
    ],
  },
  {
    id: "traces",
    title: "Named traces and the report",
    blocks: [
      {
        type: "code",
        code: `using var trace = MauiPerformance.Trace("LoadCustomer");

await MauiPerformance.MeasureAsync("Customer API", () => client.GetStringAsync("/customer"), PerformanceCategory.Api);
MauiPerformance.Measure("SQLite Query", () => db.Query("SELECT * FROM customer"), PerformanceCategory.Database);

Console.WriteLine(MauiPerformance.FormatReport());`,
      },
    ],
  },
  {
    id: "http",
    title: "Automatic API tracking",
    blocks: [
      {
        type: "code",
        code: `builder.Services.AddHttpClient("shop", client =>
{
    client.BaseAddress = new Uri("https://api.shop");
}).AddHttpMessageHandler(() => new PerformanceDelegatingHandler());`,
      },
      {
        type: "p",
        text: "Override the metric name per request. Query strings are stripped from stored URLs.",
      },
      {
        type: "code",
        code: `var request = new HttpRequestMessage(HttpMethod.Get, "/customer");
request.Options.Set(PerformanceHttp.NameKey, "Customer API");`,
      },
      {
        type: "p",
        text: "Android HTTP tracking needs INTERNET and ACCESS_NETWORK_STATE. iOS needs no extra Info.plist keys.",
      },
    ],
  },
  {
    id: "maui-profile-app",
    title: "Stop maui profile from the app",
    blocks: [
      {
        type: "code",
        code: `builder.UseMauiPerformance(options =>
{
    options.CliProfile.CompleteOn = CliProfileCompleteOn.FirstFrame;
    // options.CliProfile.CompleteOnScenario = "Checkout";
});

using var checkout = MauiProfile.Scenario("Checkout");
MauiProfile.Mark("CartReady");
// dispose / Complete() records a metric and can stop the CLI session`,
      },
      {
        type: "p",
        text: "FirstFrame is the default. Use FirstPage for the App Startup moment, Manual to call StartupComplete() yourself, or CompleteOnScenario to wait for a named flow.",
      },
    ],
  },
  {
    id: "maui-perf",
    title: "maui-perf at the command line",
    blocks: [
      {
        type: "p",
        text: "Install the companion tool, then use short aliases instead of the long official flags. startup always passes Microsoft.Maui.ProfilingHelper / StartupComplete so the trace ends when first frame (or your scenario) fires. screen wraps maui profile manual (press Enter to attach, Enter again to stop).",
      },
      {
        type: "code",
        code: `dotnet tool install -g Plugin.Maui.Performance.Cli

maui-perf startup -f android
maui-perf screen -f ios --speedscope --duration 30s
maui-perf command startup -f android`,
      },
      {
        type: "p",
        text: "From a clone of this repo without installing the tool:",
      },
      {
        type: "code",
        code: "dotnet run --project src/Plugin.Maui.Performance.Cli -- startup -f android",
      },
      {
        type: "table",
        headers: ["Option", "Meaning"],
        rows: [
          ["-f android | ios", "Framework alias for net10.0-android / net10.0-ios."],
          ["--duration 30s | 2m | 1h", "Parsed duration for screen / manual."],
          ["--speedscope", "Shortcut for --format speedscope (also nettrace, mibc)."],
          ["--no-stop-marker", "Do not pass StartupComplete stopping events."],
          ["--dry-run / command", "Print the maui profile command without running it."],
        ],
      },
      {
        type: "link",
        href: "https://learn.microsoft.com/en-us/dotnet/maui/developer-tools/cli/profile?view=net-maui-10.0",
        label: "Official maui profile documentation",
        note: "maui-perf is a shorter wrapper. Install the MAUI CLI so the maui command is on PATH.",
      },
    ],
  },
  {
    id: "options",
    title: "Options",
    blocks: [
      {
        type: "code",
        code: `builder.UseMauiPerformance(options =>
{
    options.AutoMeasureStartup = true;
    options.AutoMeasurePages = true;
    options.AutoMeasureNavigation = true;
    options.AutoMeasureImages = true;
    options.AutoMeasureRendering = true;
    options.SampleMemory = true;
    options.Enabled = true;
});`,
      },
      {
        type: "callout",
        title: "Keep production quiet",
        text: "Set Enabled to false in Release if the scoreboard is only for debug and dogfood builds. Traces become no-ops and automatic hooks do not record.",
      },
    ],
  },
  {
    id: "without-host",
    title: "Without the generic host",
    blocks: [
      {
        type: "code",
        code: `var performance = MauiPerformance.Create(new MauiPerformanceOptions
{
    AutoMeasureStartup = true
});

performance.Start();`,
      },
    ],
  },
  {
    id: "siblings",
    title: "Compose with siblings",
    blocks: [
      {
        type: "p",
        text: "Performance does not reference Diagnostics, LeakAnalyser, or Observability. Wire them yourself when the host already uses those plugins. Treat a slow page as a metric, not a crash.",
      },
      {
        type: "code",
        code: `builder
    .UseMauiApp<App>()
    .UseMauiPerformance()
    .UseMauiDiagnostics();

MauiPerformance.Current.MetricRecorded += (_, e) =>
{
    if (e.Metric.Duration >= TimeSpan.FromSeconds(2))
        MauiDiagnostics.TrackEvent($"Slow:{e.Metric.Name}");
};`,
      },
      {
        type: "callout",
        title: "Do not add Observability only to see timings",
        text: "Install Performance. Export the report yourself if you already have a telemetry path.",
      },
    ],
  },
  {
    id: "do-not-wire",
    title: "What not to wire",
    blocks: [
      {
        type: "table",
        headers: ["Temptation", "Why not"],
        rows: [
          ["This package as a leak detector", "Use LeakAnalyser for WeakReference liveness after pop."],
          ["This package as crash / ANR capture", "Use Diagnostics."],
          ["Microsoft.Maui.ProfilingHelper package reference", "maui profile injects the helper; MauiProfile calls Complete() for you."],
          ["maui-perf on Windows / Mac Catalyst", "maui profile supports Android and iOS simulator only."],
          ["A hosted APM just to print a scoreboard", "Use FormatReport() on device."],
          ["Package reference Performance → Diagnostics", "Keeps the profiler usable without the telemetry suite."],
        ],
      },
    ],
  },
];

export const performanceComparisonSections: DocSection[] = [
  {
    id: "versus-apm",
    title: "Versus APM and EventCounters",
    blocks: [
      {
        type: "p",
        text: "Application Insights, Sentry performance, and App Center are hosted APMs. EventCounters are a .NET runtime surface. Performance is an on-device scoreboard plus a maui profile wrapper. It is not a drop-in APM replacement.",
      },
      {
        type: "table",
        headers: ["Requirement", "Performance", "EventCounters", "Application Insights / Sentry"],
        rows: [
          ["Named traces in app code", "Yes", "Manual", "Yes"],
          ["Lightweight / no SaaS", "Yes", "Yes", "No"],
          ["MAUI page / startup helpers", "Yes", "No", "Partial"],
          ["Stop maui profile on first frame", "MauiProfile / maui-perf", "No", "No"],
          ["Retain-path / CPU flame graph", "No (use a profiler)", "Partial", "Partial"],
        ],
      },
      {
        type: "callout",
        title: "Not a superiority table",
        text: "Prefer the .NET MAUI framework, EventCounters, or an existing org APM when that already solves the requirement. Prefer this package when you want a compact on-device report or an intuitive maui profile stop.",
      },
    ],
  },
  {
    id: "versus-cli",
    title: "Versus raw maui profile",
    blocks: [
      {
        type: "p",
        text: "maui profile is the official EventPipe CLI. MauiProfile and maui-perf do not replace it — they hide the stopping-event flags and call Complete() at first frame or a named scenario.",
      },
      {
        type: "table",
        headers: ["Need", "Start with"],
        rows: [
          ["Official flags and docs", "maui profile"],
          ["Shorter android / ios aliases and 30s durations", "maui-perf (Plugin.Maui.Performance.Cli)"],
          ["Stop startup on first frame or Checkout", "MauiProfile + UseMauiPerformance"],
          ["On-device scoreboard without a .nettrace", "MauiPerformance.FormatReport()"],
        ],
      },
    ],
  },
  {
    id: "siblings",
    title: "Versus Diagnostics, LeakAnalyser, and Observability",
    blocks: [
      {
        type: "table",
        headers: ["Need", "Package"],
        rows: [
          ["Startup / page / API timings and memory scoreboard", "Plugin.Maui.Performance"],
          ["Wrap maui profile / stop a .nettrace on first frame", "Plugin.Maui.Performance (MauiProfile + maui-perf)"],
          ["Page / view still alive after pop", "Plugin.Maui.LeakAnalyser"],
          ["Crash, ANR, pre-crash breadcrumbs", "Plugin.Maui.Diagnostics"],
          ["Umbrella export of sibling events", "Plugin.Maui.Observability"],
        ],
      },
      {
        type: "p",
        text: "Choose LeakAnalyser when the question is whether a view is still rooted. Choose Diagnostics when the failure is a crash or ANR. Choose Performance when the question is how long something took, or when you want maui profile to stop without memorizing stopping-event flags.",
      },
    ],
  },
  {
    id: "choose",
    title: "When to choose Performance",
    blocks: [
      {
        type: "ul",
        items: [
          "You need startup, page, navigation, API, image, render, and memory timings on Android or iOS.",
          "You want a compact on-device report without a SaaS APM.",
          "You want maui profile startup to stop on first frame or a named scenario.",
          "You want maui-perf aliases (android / ios, 30s, speedscope) over the long official flags.",
        ],
      },
      {
        type: "p",
        text: "Stay on Application Insights or Sentry when the org already standardized on a hosted APM. Use a memory profiler for retain paths. Use LeakAnalyser for visual-tree leaks. Use Diagnostics for crashes.",
      },
    ],
  },
];
