import type { DocSection } from "@/content/mvvmexpress";
import { mvvmExpressSlug } from "@/content/mvvmexpress";

export const comparisonHref = `/packages/${mvvmExpressSlug}/comparison/`;

export const comparisonSections: DocSection[] = [
  {
    id: "scope",
    title: "Scope",
    blocks: [
      {
        type: "callout",
        title: "Architectural comparison",
        text: "This page evaluates MVVMExpress against CommunityToolkit.Mvvm, Prism.Maui, and ReactiveUI. Scores are an architectural reading of shipped surfaces, not host-process BenchmarkDotNet or device RSS. Measured Core numbers live on Memory and scale. This page does not claim MVVMExpress is faster than the others.",
      },
      {
        type: "p",
        text: "CommunityToolkit.Mvvm is a ViewModel micro-toolkit. Prism.Maui is a convention and module framework with page navigation (not Shell). ReactiveUI is a reactive functional stack that expects System.Reactive. MVVMExpress is a modular application shell: ViewModels, async state, Shell or NavigationPage, dialogs, auth, forms, and a testing package.",
      },
    ],
  },
  {
    id: "features",
    title: "Feature breakdown",
    blocks: [
      {
        type: "table",
        headers: ["Dimension", "MVVMExpress", "CommunityToolkit.Mvvm", "Prism.Maui", "ReactiveUI"],
        rows: [
          ["Core philosophy", "Modular app shell", "Minimal toolkit", "Convention + modules", "Reactive (Rx)"],
          ["Source generators", "[Notify], commands, routes, auth", "Roslyn generators", "Partial / community", "ReactiveUI.Fody / Roslyn"],
          ["Navigation", "NavigationPage replace-root and Shell", "Manual / Shell", "URI navigation (no Shell)", "ViewModel-first RoutingState"],
          ["Async state and forms", "AsyncState, FormViewModel.Bind", "App-owned", "App-owned", "OAPH / Rx extensions"],
          ["Auth", "UseAuth<T>, GuardedNavigator", "None", "Parameters / interceptors", "App-owned Rx"],
          ["Testing", "LeakProbe, FakeNavigator", "Usual unit-test stack", "Navigation mocks", "TestScheduler"],
        ],
      },
    ],
  },
  {
    id: "criteria",
    title: "Memory, startup, and docs",
    blocks: [
      {
        type: "p",
        text: "Memory. MVVMExpress Core targets net10.0 without MAUI and ships LeakProbe for subscription leaks (9.5/10). CommunityToolkit.Mvvm is the usual efficiency baseline — generators, no reflection (10/10). Prism.Maui carries container and page-tracking cost (7.5/10). ReactiveUI is efficient when IDisposable subscriptions are owned; unmanaged pipelines leak (6.5/10).",
      },
      {
        type: "p",
        text: "Startup. MVVMExpress hops to IMainThread and uses compile-time generators instead of a broad scan (9/10). CommunityToolkit.Mvvm compiles to ordinary properties and commands (10/10). Prism.Maui page resolution adds delay on a cold start (7/10). ReactiveUI cost follows Rx processing and GC under high event frequency (8/10).",
      },
      {
        type: "p",
        text: "Docs. MVVMExpress has architecture, testing, and package-split docs; third-party posts and videos are still sparse (8.5/10). CommunityToolkit.Mvvm has Microsoft Learn snippets (9/10). Prism.Maui is comprehensive, with some Xamarin-era pages (8/10). ReactiveUI assumes System.Reactive fluency (6.5/10).",
      },
    ],
  },
  {
    id: "pros-cons",
    title: "Pros and cons",
    blocks: [
      {
        type: "p",
        text: "MVVMExpress. Pros: modular packages, UseAuth, LeakProbe, forms and dialogs in one shell. Cons: smaller community, more packages to learn than a single toolkit.",
      },
      {
        type: "p",
        text: "CommunityToolkit.Mvvm. Pros: small, fast, official Microsoft docs, easy to adopt. Cons: navigation, dialogs, and async UI state stay app-owned.",
      },
      {
        type: "p",
        text: "Prism.Maui. Pros: mature URI navigation and module patterns. Cons: no Shell; some teams use the commercial Prism stack. Community Prism.Maui is MIT.",
      },
      {
        type: "p",
        text: "ReactiveUI. Pros: declarative pipelines for high-frequency UI events. Cons: steep Rx learning curve; leaks if subscriptions are not disposed.",
      },
    ],
  },
  {
    id: "adoption",
    title: "Where teams start",
    blocks: [
      {
        type: "ul",
        items: [
          "CommunityToolkit.Mvvm is the usual first package on a new MAUI app.",
          "Prism.Maui is common on Xamarin.Forms enterprise migrations that already use URI navigation.",
          "ReactiveUI is chosen when the app is already Rx-first.",
          "MVVMExpress is early. It is for teams that otherwise compose navigation, auth, dialogs, and leak tests from separate libraries.",
        ],
      },
    ],
  },
  {
    id: "ratings",
    title: "Feature ratings (out of 10)",
    blocks: [
      {
        type: "p",
        text: "These scores are an architectural evaluation of shipped surfaces. N/A means the product does not own that surface.",
      },
      {
        type: "table",
        headers: ["Surface", "MVVMExpress", "CommunityToolkit.Mvvm", "Prism.Maui", "ReactiveUI"],
        rows: [
          ["Commands and properties", "9.0", "10.0", "8.5", "8.0"],
          ["Navigation", "9.5", "4.0", "9.5", "7.5"],
          ["Dialogs and toast", "9.0", "N/A", "8.5", "6.0"],
          ["State and async", "9.5", "6.0", "7.0", "9.0"],
          ["Authentication", "9.5", "N/A", "5.0", "N/A"],
          ["Form validation", "9.0", "7.0", "6.5", "7.0"],
          ["Leak and test infrastructure", "10.0", "6.0", "7.5", "8.5"],
        ],
      },
    ],
  },
  {
    id: "verdict",
    title: "When to choose which",
    blocks: [
      {
        type: "ul",
        items: [
          "Choose CommunityToolkit.Mvvm when you want a small ViewModel layer and will write navigation and dialogs yourself.",
          "Choose Prism.Maui when you already use Prism URI navigation and do not need Shell.",
          "Choose ReactiveUI when application logic is driven by Rx streams.",
          "Choose MVVMExpress when you want one shell for NavigationPage or Shell, UseAuth, dialogs, forms, and LeakProbe — without taking three overlapping frameworks.",
        ],
      },
    ],
  },
];
