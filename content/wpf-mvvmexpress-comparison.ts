import type { DocSection } from "@/content/mvvmexpress";
import { wpfMvvmExpressSlug } from "@/content/mvvmexpress-family";

export const wpfComparisonHref = `/packages/${wpfMvvmExpressSlug}/comparison/`;

export const wpfComparisonSections: DocSection[] = [
  {
    id: "scope",
    title: "Scope",
    blocks: [
      {
        type: "callout",
        title: "Architectural comparison",
        text: "This page evaluates WPF MVVMExpress against CommunityToolkit.Mvvm, Prism (WPF), Caliburn.Micro, and ReactiveUI. Scores are an architectural reading of shipped surfaces, not BenchmarkDotNet or process RSS. This page does not claim MVVMExpress is faster than the others.",
      },
      {
        type: "p",
        text: "CommunityToolkit.Mvvm is a ViewModel micro-toolkit. Prism is a convention and module framework with regions and URI navigation. Caliburn.Micro is a convention-based screen and conductor stack. ReactiveUI is a reactive functional stack that expects System.Reactive. WPF MVVMExpress is a modular application shell: ViewModels, async state, Frame navigation, dialogs, auth, forms, and a testing package. It is not Plugin.Maui.MVVMExpress.",
      },
    ],
  },
  {
    id: "features",
    title: "Feature breakdown",
    blocks: [
      {
        type: "table",
        headers: ["Dimension", "MVVMExpress", "CommunityToolkit.Mvvm", "Prism", "ReactiveUI"],
        rows: [
          ["Core philosophy", "Modular app shell", "Minimal toolkit", "Convention + modules", "Reactive (Rx)"],
          ["Source generators", "Out of 1.0 — hand-written SetProperty", "Roslyn generators", "Partial / community", "ReactiveUI.Fody / Roslyn"],
          ["Navigation", "Frame replace-root, owned-window modal", "Manual / Frame", "Regions + URI", "ViewModel-first RoutingState"],
          ["Async state and forms", "AsyncState, FormViewModel / WpfFormViewModel", "App-owned", "App-owned", "OAPH / Rx extensions"],
          ["Auth", "UseAuth<T>, GuardedNavigator", "None", "Parameters / interceptors", "App-owned Rx"],
          ["Multi-window", "IWindowContext per Window", "App-owned", "Yes", "Partial"],
          ["Modules", "IModule / AddModule<T>()", "None", "Yes", "Partial"],
          ["Testing", "LeakProbe, FakeNavigator", "Usual unit-test stack", "Navigation mocks", "TestScheduler"],
        ],
      },
    ],
  },
  {
    id: "syntax",
    title: "Syntax map",
    blocks: [
      {
        type: "p",
        text: "If you already know CommunityToolkit.Mvvm or Prism, write the MVVMExpress name. Type names stay unique so CommunityToolkit can sit in the same app. This is not a drop-in rename — navigation, dialogs, auth, and AsyncState have no Toolkit equivalent.",
      },
      {
        type: "table",
        headers: ["Surface", "CommunityToolkit / Prism", "MVVMExpress"],
        rows: [
          ["Property", "[ObservableProperty] / SetProperty", "SetProperty / NotifyDependsOn"],
          ["Sync command", "[RelayCommand] / DelegateCommand", "ModelCommand"],
          ["Async command", "AsyncRelayCommand", "AsyncModelCommand"],
          ["Base type", "ObservableObject / BindableBase / Screen", "ViewModel / PageViewModel"],
          ["Messenger", "IMessenger / IEventAggregator", "IMessageHub"],
          ["Navigation", "INavigationService / IWindowManager", "INavigator (Frame)"],
          ["Dialogs", "IDialogService / MessageBox", "IDialogs"],
          ["Nav args", "INavigationParameters", "typed records + IAcceptNavArgs<T>"],
          ["Result", "App-owned", "Outcome / Outcome<T>"],
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
        text: "Memory. MVVMExpress Core targets net10.0 without WPF and ships LeakProbe for subscription leaks (9.5/10). CommunityToolkit.Mvvm is the usual efficiency baseline — generators, no reflection (10/10). Prism carries container and region-tracking cost (7.5/10). ReactiveUI is efficient when IDisposable subscriptions are owned; unmanaged pipelines leak (6.5/10).",
      },
      {
        type: "p",
        text: "Startup. MVVMExpress hops to IMainThread and uses handwritten Map instead of a broad scan (9/10). CommunityToolkit.Mvvm compiles to ordinary properties and commands (10/10). Prism region resolution adds delay on a cold start (7/10). ReactiveUI cost follows Rx processing and GC under high event frequency (8/10).",
      },
      {
        type: "p",
        text: "Docs. MVVMExpress has architecture, testing, and package-split docs; third-party posts and videos are still sparse (8/10). CommunityToolkit.Mvvm has Microsoft Learn snippets (9/10). Prism is comprehensive (8/10). ReactiveUI assumes System.Reactive fluency (6.5/10).",
      },
    ],
  },
  {
    id: "pros-cons",
    title: "Pros and cons",
    blocks: [
      {
        type: "p",
        text: "MVVMExpress. Pros: modular packages, UseAuth, Frame replace-root, multi-window IWindowContext, LeakProbe, forms and dialogs in one shell, same Core contract as the MAUI family. Cons: smaller community, no source generators in 1.0, more packages to learn than a single toolkit.",
      },
      {
        type: "p",
        text: "CommunityToolkit.Mvvm. Pros: small, fast, official Microsoft docs, easy to adopt. Cons: navigation, dialogs, and async UI state stay app-owned.",
      },
      {
        type: "p",
        text: "Prism. Pros: mature regions, URI navigation, and module patterns. Cons: heavier composition; some teams use the commercial Prism stack.",
      },
      {
        type: "p",
        text: "Caliburn.Micro. Pros: convention-based screens and conductors. Cons: magic naming; less explicit than an interface-at-the-boundary shell.",
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
          "CommunityToolkit.Mvvm is the usual first package on a new WPF app.",
          "Prism is common on enterprise desktops that already use regions.",
          "Caliburn.Micro remains on older convention-first codebases.",
          "ReactiveUI is chosen when the app is already Rx-first.",
          "WPF MVVMExpress is for teams that otherwise compose Frame navigation, auth, dialogs, and leak tests from separate libraries — or that already use the MAUI family and want the same ViewModel contract on desktop.",
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
        headers: ["Surface", "MVVMExpress", "CommunityToolkit.Mvvm", "Prism", "ReactiveUI"],
        rows: [
          ["Commands and properties", "8.5", "10.0", "8.5", "8.0"],
          ["Navigation", "9.0", "4.0", "9.5", "7.5"],
          ["Dialogs and toast", "9.0", "N/A", "8.5", "6.0"],
          ["State and async", "9.5", "6.0", "7.0", "9.0"],
          ["Authentication", "9.0", "N/A", "5.0", "N/A"],
          ["Form validation", "9.0", "7.0", "6.5", "7.0"],
          ["Multi-window", "9.5", "4.0", "8.5", "6.5"],
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
          "Choose CommunityToolkit.Mvvm when you want a small ViewModel layer and will write Frame navigation and dialogs yourself.",
          "Choose Prism when you already use regions and URI navigation.",
          "Choose Caliburn.Micro when the app is already convention-first.",
          "Choose ReactiveUI when application logic is driven by Rx streams.",
          "Choose WPF MVVMExpress when you want one shell for Frame navigation, UseAuth, dialogs, forms, and LeakProbe — or when a MAUI app using Plugin.Maui.MVVMExpress needs the same ViewModel contract on desktop. Do not reference both families in one project.",
        ],
      },
    ],
  },
];
