import type { DocSection } from "@/content/mvvmexpress";

export const leakAnalyserSlug = "plugin-maui-leak-analyser";

export const leakAnalyserDocsHref = `/packages/${leakAnalyserSlug}/docs/`;
export const leakAnalyserIntegrationHref = `/packages/${leakAnalyserSlug}/integration/`;
export const leakAnalyserComparisonHref = `/packages/${leakAnalyserSlug}/comparison/`;

export const leakAnalyserTechnicalTitle = "How LeakAnalyser works";
export const leakAnalyserTechnicalDescription =
  "A liveness test (WeakReference + forced GC), not a profiler. Detect in Debug; optionally disconnect handlers or compartmentalize when a view is finished.";

export const leakAnalyserIntegrationTitle = "Get started with LeakAnalyser";
export const leakAnalyserIntegrationDescription =
  "Install the 0.1.0-preview package, register UseLeakAnalyser in Debug, attach LeakMonitor / TearDown, and optionally forward OnLeaked into Diagnostics.";

export const leakAnalyserComparisonTitle = "LeakAnalyser vs MemoryToolkit, profilers, and siblings";
export const leakAnalyserComparisonDescription =
  "Compare LeakAnalyser with AdamE.MemoryToolkit.Maui, a memory profiler, Diagnostics, Performance, and MVVMExpress LeakProbe — and when to choose each.";

export const leakAnalyserTechnicalSections: DocSection[] = [
  {
    id: "what-it-is",
    title: "What it is",
    blocks: [
      {
        type: "p",
        text: "LeakAnalyser answers one question: after this view looks finished, is it still alive? It snapshots the visual tree, waits for lifecycle inference, then runs WeakReference plus forced GC. If the object survives, OnLeaked fires. If it is collected, OnCollected fires.",
      },
      {
        type: "code",
        code: "Unloaded → “done with this view?” → Monitor (Debug) and/or TearDown",
      },
      {
        type: "callout",
        title: "Not a profiler",
        text: "This will not tell you why something is rooted. Use Instruments, dotMemory, or Visual Studio diagnostics for retain paths. Unsubscribe events and drop static roots yourself — the package reports and mitigates; it does not auto-fix leaks.",
      },
    ],
  },
  {
    id: "strategies",
    title: "Strategies",
    blocks: [
      {
        type: "table",
        headers: ["Strategy", "Effect"],
        rows: [
          ["DetectOnly", "No teardown. The graph stays intact so you can see a real leak."],
          [
            "DisconnectHandlers (default)",
            "Walk visual children and call DisconnectHandler() per view. Does not null BindingContext, Content, or Parent.",
          ],
          [
            "Compartmentalize",
            "Clear common managed references, invoke TearDown.OnTearDown, then disconnect that element's handler.",
          ],
        ],
      },
      {
        type: "p",
        text: "DisconnectHandlers is a safe tree walk: it honors HandlerDisconnectPolicy.Manual, TearDown.Suppress, nested Cascade islands, and try/catches each disconnect.",
      },
      {
        type: "callout",
        title: "Compartmentalize is invasive",
        text: "Early fire blanks cached pages, tabs, and some third-party hosts. Opt in per page or globally. Do not make it the silent default on a Shell flyout or a NavigationPage that still holds modals.",
      },
    ],
  },
  {
    id: "compartmentalize",
    title: "What compartmentalize clears",
    blocks: [
      {
        type: "p",
        text: "Each clear is isolated. A throwing setter is logged; teardown continues.",
      },
      {
        type: "ul",
        items: [
          "BindingContext, Parent, and logical children",
          "VisualElement.Behaviors and Resources",
          "View.GestureRecognizers",
          "Label.FormattedText and span gestures",
          "ItemsView / legacy ListView ItemsSource and ItemTemplate",
          "Content on ContentView, Border, ContentPage, and ScrollView",
        ],
      },
      {
        type: "p",
        text: "CommunityToolkit hooks stay intact because they are attached properties, not items in Behaviors. OnTearDown runs only for Compartmentalize, and only when the element still has a handler — use it to stop animations before disconnect.",
      },
    ],
  },
  {
    id: "lifecycle",
    title: "Lifecycle (“done with”)",
    blocks: [
      {
        type: "p",
        text: "Automatic behaviors do not tear down on every Unloaded. They wait until the view looks finished:",
      },
      {
        type: "ol",
        items: [
          "Host Page was popped from an active NavigationPage",
          "View unloaded and is not hosted in a Page (template swap / detached)",
          "Hosted in a NavigationPage that is itself unloaded and not suppressed",
          "Otherwise wait 100 ms; skip if still in NavigationStack / ModalStack, still hosted by Shell, or under a Tab",
        ],
      },
      {
        type: "p",
        text: "Skipped: the NavigationPage container itself, views under a nav that still has modals, suppressed views, and cached pages (you must Suppress). This is best-effort inference, not a Shell / popup / Hybrid navigation framework.",
      },
    ],
  },
  {
    id: "api",
    title: "XAML and C#",
    blocks: [
      {
        type: "p",
        text: "Put TearDown after LeakMonitor so teardown does not run before the monitor snapshots the tree.",
      },
      {
        type: "code",
        code: `<ContentPage xmlns:la="clr-namespace:Plugin.Maui.LeakAnalyser;assembly=Plugin.Maui.LeakAnalyser"
             la:LeakMonitor.Cascade="True"
             la:LeakMonitor.Name="OrdersPage"
             la:TearDown.Cascade="True"
             la:TearDown.Strategy="DisconnectHandlers">`,
      },
      {
        type: "p",
        text: "The same attached properties are available in C#:",
      },
      {
        type: "code",
        code: `LeakMonitor.SetCascade(page, true);
TearDown.SetCascade(page, true);
TearDown.SetStrategy(page, TearDownStrategy.DisconnectHandlers);

page.Monitor();
page.TearDown(TearDownStrategy.DisconnectHandlers);

var nav = LeakGraph.GetFirstSelfOrParentOfType<NavigationPage>(this);
LeakMonitor.SetSuppress(nav, true);
TearDown.SetSuppress(nav, true);`,
      },
      {
        type: "ul",
        items: [
          "Temporary unloads (Browser.OpenAsync) should suppress the host NavigationPage, then clear Suppress on Loaded.",
          "ControlTemplates: put Cascade on each template root, not only the host control.",
          "Cached pages and Shell tabs stay alive on purpose — Suppress them or they will look like leaks.",
        ],
      },
    ],
  },
  {
    id: "options",
    title: "Options",
    blocks: [
      {
        type: "table",
        headers: ["Option", "Default", "Role"],
        rows: [
          ["DefaultTearDownStrategy", "DisconnectHandlers", "Used when TearDown.Strategy is unset."],
          ["OnLeaked", "null", "Fired when a watched target is still alive after forced collections."],
          ["OnCollected", "null", "Fired when a watched target is collected."],
          ["MaxCollections", "10", "Forced GC passes before a still-alive target is reported as leaked."],
          ["MillisecondsBetweenCollections", "200", "Delay between collection passes."],
          ["CustomMonitor", "null", "Replace the default IGarbageCollectionMonitor."],
        ],
      },
      {
        type: "p",
        text: "CollectionTarget carries Name, ObjectType, Screen (host page at snapshot time), and a short WeakReference. Use Name in alerts and breadcrumbs.",
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
          "How do I detect MAUI page / view leaks after navigation?",
          "Why is BindingContext still alive after pop?",
          "How do I disconnect handlers when a view is finished?",
        ],
      },
      {
        type: "p",
        text: "Do not use this package if you need retain-path diagnosis (use a profiler), only crash / ANR breadcrumbs (Diagnostics), or only startup / page / API timings (Performance).",
      },
    ],
  },
  {
    id: "platforms",
    title: "Platforms and version",
    blocks: [
      {
        type: "p",
        text: "Version 0.1.0-preview. Target frameworks: net10.0, net10.0-android (API 21+), net10.0-ios (iOS 15+), net10.0-maccatalyst (15+), net10.0-windows (10.0.17763+; the Windows TFM is included when the package is packed on Windows).",
      },
      {
        type: "link",
        href: "https://www.nuget.org/packages/Plugin.Maui.LeakAnalyser",
        label: "Plugin.Maui.LeakAnalyser on NuGet",
        note: "Preview packages need --prerelease.",
      },
      {
        type: "link",
        href: "https://github.com/nuvyntralabs/Plugin.Maui.LeakAnalyser",
        label: "Source and sample on GitHub",
      },
    ],
  },
];

export const leakAnalyserIntegrationSections: DocSection[] = [
  {
    id: "install",
    title: "Install",
    blocks: [
      {
        type: "code",
        code: "dotnet add package Plugin.Maui.LeakAnalyser --prerelease",
      },
      {
        type: "p",
        text: "Package ID: Plugin.Maui.LeakAnalyser. Registration is required for leak callbacks and global teardown defaults.",
      },
    ],
  },
  {
    id: "debug-detect",
    title: "Debug: detect only",
    blocks: [
      {
        type: "code",
        code: `using Plugin.Maui.LeakAnalyser;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder.UseMauiApp<App>();

#if DEBUG
        builder.Logging.AddDebug();
        builder.UseLeakAnalyser(options =>
        {
            options.OnLeaked = target => { /* alert / counter */ };
            options.DefaultTearDownStrategy = TearDownStrategy.DetectOnly;
        });
#endif

        return builder.Build();
    }
}`,
      },
      {
        type: "code",
        code: `<ContentPage xmlns:la="clr-namespace:Plugin.Maui.LeakAnalyser;assembly=Plugin.Maui.LeakAnalyser"
             la:LeakMonitor.Cascade="True"
             la:LeakMonitor.Name="OrdersPage">`,
      },
      {
        type: "callout",
        title: "Keep detection in Debug",
        text: "Do not call UseLeakAnalyser or set LeakMonitor.Cascade in Release. Forced GC is a probe, not a production metric.",
      },
    ],
  },
  {
    id: "debug-disconnect",
    title: "Debug: detect + disconnect handlers",
    blocks: [
      {
        type: "code",
        code: `la:LeakMonitor.Cascade="True"
la:TearDown.Cascade="True"
la:TearDown.Strategy="DisconnectHandlers"`,
      },
      {
        type: "p",
        text: "Put TearDown after LeakMonitor. DisconnectHandlers is the default DefaultTearDownStrategy when you omit Strategy.",
      },
    ],
  },
  {
    id: "release",
    title: "Production: teardown without detection",
    blocks: [
      {
        type: "p",
        text: "Detection forces GC and is not for Release. Teardown can stay on:",
      },
      {
        type: "code",
        code: `la:TearDown.Cascade="True"`,
      },
      {
        type: "p",
        text: "Do not call UseLeakAnalyser or set LeakMonitor.Cascade in Release. Cached pages and tabs still need Suppress.",
      },
    ],
  },
  {
    id: "knobs",
    title: "GC knobs",
    blocks: [
      {
        type: "code",
        code: `builder.UseLeakAnalyser(options =>
{
    options.DefaultTearDownStrategy = TearDownStrategy.DisconnectHandlers;
    options.MaxCollections = 10;
    options.MillisecondsBetweenCollections = 200;
});`,
      },
      {
        type: "p",
        text: "Opt into Compartmentalize per page when DisconnectHandlers is not enough:",
      },
      {
        type: "code",
        code: `la:TearDown.Strategy="Compartmentalize"`,
      },
    ],
  },
  {
    id: "diagnostics",
    title: "Compose with Diagnostics",
    blocks: [
      {
        type: "p",
        text: "LeakAnalyser is standalone. It does not reference Diagnostics or Observability. Wire callbacks yourself when the host already uses those plugins. Treat a leaked view as a breadcrumb, not a crash.",
      },
      {
        type: "code",
        code: `using Plugin.Maui.Diagnostics;
using Plugin.Maui.LeakAnalyser;

#if DEBUG
builder.Logging.AddDebug();
builder.UseMauiDiagnostics();
builder.UseLeakAnalyser(options =>
{
    options.OnLeaked = target =>
    {
        MauiDiagnostics.TrackEvent($"Leak:{target.Name}");
        MauiDiagnostics.TrackException(
            new InvalidOperationException($"{target.Name} survived forced GC."));
    };

    options.OnCollected = target =>
        MauiDiagnostics.TrackEvent($"Collected:{target.Name}");
});
#endif`,
      },
      {
        type: "p",
        text: "Register Diagnostics first if you want its logger and timeline ready before the first leak callback. Do not call TrackException for every collected target — collection is success. Use OnLeaked only for errors.",
      },
    ],
  },
  {
    id: "observability",
    title: "Compose with Observability",
    blocks: [
      {
        type: "p",
        text: "Observability does not import leak events automatically. If the host already calls UseMauiObservability, keep LeakAnalyser registered beside it and forward OnLeaked into Diagnostics. Observability will pick up those breadcrumbs on the next report export if Diagnostics is part of that pipeline.",
      },
      {
        type: "code",
        code: `builder
    .UseMauiApp<App>()
    .UseMauiObservability();

#if DEBUG
builder.UseLeakAnalyser(options =>
{
    options.OnLeaked = target =>
        MauiDiagnostics.TrackEvent($"Leak:{target.Name}");
});
#endif`,
      },
      {
        type: "callout",
        title: "Do not add Observability only to see leaks",
        text: "Install LeakAnalyser, and optionally Diagnostics. Forced GC counts are not a health signal.",
      },
    ],
  },
  {
    id: "do-not-wire",
    title: "What not to wire",
    blocks: [
      {
        type: "table",
        headers: ["Signal", "Why not"],
        rows: [
          ["Forced GC counts as health", "GC.Collect is a Debug probe, not a production metric."],
          ["Every OnCollected as an error", "Collection is the healthy outcome."],
          ["Release LeakMonitor.Cascade", "Expensive, and can hide real leaks behind GC noise."],
          ["Package reference LeakAnalyser → Diagnostics", "Keeps this plugin usable without the telemetry suite."],
        ],
      },
    ],
  },
];

export const leakAnalyserComparisonSections: DocSection[] = [
  {
    id: "memory-toolkit",
    title: "Versus AdamE.MemoryToolkit.Maui",
    blocks: [
      {
        type: "p",
        text: "Inspired by AdamE.MemoryToolkit.Maui (MIT). This package is a separate API — UseLeakAnalyser, LeakMonitor, TearDown, LeakGraph — not a drop-in fork.",
      },
      {
        type: "table",
        headers: ["Requirement", "LeakAnalyser", "AdamE.MemoryToolkit.Maui", "Profiler"],
        rows: [
          ["WeakRef + forced GC on unload", "Yes", "Yes", "No"],
          ["Handler disconnect / compartmentalize", "Yes", "Yes", "No"],
          ["Android + Windows TFMs", "Yes", "Shared net10.0 only", "—"],
          ["GC knobs on options", "Yes", "Custom monitor", "—"],
          ["Host ILogger after Build()", "Yes", "Temp service provider", "—"],
          ["Retain-path diagnosis", "No", "No", "Yes"],
        ],
      },
      {
        type: "link",
        href: "https://github.com/AdamEssenmacher/MemoryToolkit.Maui",
        label: "AdamE.MemoryToolkit.Maui",
        note: "MIT. Use it if you already adopted that API and do not need Android / Windows TFMs or host ILogger after Build().",
      },
    ],
  },
  {
    id: "siblings",
    title: "Versus Diagnostics, Performance, and LeakProbe",
    blocks: [
      {
        type: "table",
        headers: ["Need", "Package"],
        rows: [
          ["Page / view still alive after pop", "Plugin.Maui.LeakAnalyser"],
          ["Crash, ANR, pre-crash breadcrumbs", "Plugin.Maui.Diagnostics"],
          ["Startup / page / API timings and memory scoreboard", "Plugin.Maui.Performance"],
          ["Umbrella export of sibling events", "Plugin.Maui.Observability"],
          ["Unit-test WeakReference for ViewModels", "Plugin.Maui.MVVMExpress.Testing LeakProbe"],
        ],
      },
      {
        type: "p",
        text: "LeakProbe is a test helper: Track returns a WeakReference and IsCollected asserts a ViewModel was collected. LeakAnalyser is a runtime visual-tree probe in the app. Use both — LeakProbe in CI for subscription leaks, LeakAnalyser on device after navigation.",
      },
    ],
  },
  {
    id: "choose",
    title: "When to choose LeakAnalyser",
    blocks: [
      {
        type: "ul",
        items: [
          "You need Android and Windows TFMs, not only a shared net10.0 assembly.",
          "You want GC knobs (MaxCollections, MillisecondsBetweenCollections) on UseLeakAnalyser options.",
          "You want the host ILogger after Build(), not a temporary service provider.",
          "You already ship Diagnostics or Observability and only need an OnLeaked callback — no extra package reference from this plugin.",
        ],
      },
      {
        type: "p",
        text: "Choose a profiler when you already know something is leaked and need the retain path. Choose Diagnostics when the failure is a crash or ANR. Choose Performance when the question is how long something took.",
      },
    ],
  },
];
