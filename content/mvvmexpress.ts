export const mvvmExpressSlug = "plugin-maui-mvvmexpress";

export const mvvmExpressStatus = {
  version: "0.6.0-preview",
  note: "Device-safe preview: UI-thread marshal, no-throw ICommand.Execute, weak CanExecuteChanged, Window.AddOverlay toasts. Supported: Android + iOS. Mac Catalyst / Windows compile-only. Shipped public APIs are the 1.0 contract; 1.0.0 waits on design-review sign-off.",
} as const;

export type DocBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; code: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string };

export interface DocSection {
  id: string;
  title: string;
  blocks: DocBlock[];
}

export const packageFamily: { name: string; purpose: string; status: string; nuget: string | null }[] = [
  {
    name: "Plugin.Maui.MVVMExpress.Core",
    purpose: "Observable model, commands, ViewModel, navigator/cache/auth/connectivity abstractions, state, outcome, messaging",
    status: "Implemented + tests",
    nuget: "https://www.nuget.org/packages/Plugin.Maui.MVVMExpress.Core",
  },
  {
    name: "Plugin.Maui.MVVMExpress",
    purpose: "UseMvvmExpress, MauiMainThread, auto lifecycle, BusyOverlayBehavior, AsyncStateView",
    status: "Implemented",
    nuget: "https://www.nuget.org/packages/Plugin.Maui.MVVMExpress",
  },
  {
    name: "Plugin.Maui.MVVMExpress.Navigation",
    purpose: "MauiShellNavigator + MauiPageNavigator, UseShell, Map<TViewModel, TPage>",
    status: "Implemented + tests",
    nuget: "https://www.nuget.org/packages/Plugin.Maui.MVVMExpress.Navigation",
  },
  {
    name: "Plugin.Maui.MVVMExpress.Dialogs",
    purpose: "IDialogs + MauiDialogs + MauiNotifier (Window.AddOverlay toast)",
    status: "Implemented + tests",
    nuget: "https://www.nuget.org/packages/Plugin.Maui.MVVMExpress.Dialogs",
  },
  {
    name: "Plugin.Maui.MVVMExpress.Validation",
    purpose: "DataAnnotations + IValidator + MustMatch + ILLink trim roots",
    status: "Implemented + tests",
    nuget: "https://www.nuget.org/packages/Plugin.Maui.MVVMExpress.Validation",
  },
  {
    name: "Plugin.Maui.MVVMExpress.Pagination",
    purpose: "PagedCollection<T>, SearchQuery",
    status: "Implemented + tests",
    nuget: "https://www.nuget.org/packages/Plugin.Maui.MVVMExpress.Pagination",
  },
  {
    name: "Plugin.Maui.MVVMExpress.Testing",
    purpose: "LeakProbe, ScaleProfile, FakeDialogs, FakeNavigator, FakeMainThread, FakeConnectivity, FakeMessageHub, ScopedNavigator",
    status: "Implemented + tests",
    nuget: "https://www.nuget.org/packages/Plugin.Maui.MVVMExpress.Testing",
  },
  {
    name: "Plugin.Maui.MVVMExpress.Reactive",
    purpose: "IPropertyObservable / CombineLatest — no System.Reactive required",
    status: "Implemented + tests",
    nuget: "https://www.nuget.org/packages/Plugin.Maui.MVVMExpress.Reactive",
  },
  {
    name: "Plugin.Maui.MVVMExpress.SourceGenerators",
    purpose: "[Notify], commands, register, routes, persist, auth",
    status: "Implemented + snapshot tests",
    nuget: "https://www.nuget.org/packages/Plugin.Maui.MVVMExpress.SourceGenerators",
  },
  {
    name: "Plugin.Maui.MVVMExpress.Compatibility.CommunityToolkit",
    purpose: "CommunityToolkitMessageHub — IMessenger → IMessageHub",
    status: "Implemented + tests",
    nuget: "https://www.nuget.org/packages/Plugin.Maui.MVVMExpress.Compatibility.CommunityToolkit",
  },
];

export const technicalSections: DocSection[] = [
  {
    id: "status",
    title: "Status",
    blocks: [
      {
        type: "callout",
        title: "0.6.0-preview",
        text: "Device-safe preview on top of phases 1–5. Command, dialog, and property notifications marshal to IMainThread. ICommand.Execute never throws (failures go to IErrorSink / IDialogs; ExecuteAsync still rethrows). CanExecuteChanged is a weak event. Toasts use Window.AddOverlay and never wrap Page.Content. Host registration is UseMvvmExpress(o => o.UseShell().UseDialogs()). Supported: Android + iOS. Mac Catalyst / Windows compile-only. 1.0.0 waits on design-review sign-off.",
      },
      {
        type: "p",
        text: "Product name is MVVMExpress (MVVM + Express). Package prefix is Plugin.Maui.MVVMExpress. Core targets net10.0 and does not reference Microsoft.Maui.Controls. Manual INotifyPropertyChanged and hand-written commands are first-class; generators are an accelerator, not a requirement.",
      },
    ],
  },
  {
    id: "why",
    title: "Why this exists",
    blocks: [
      {
        type: "p",
        text: "A production MAUI app needs more than INotifyPropertyChanged and ICommand: ViewModel lifecycle bound to page lifetime, async work with cancellation, timeout, retry, and busy state, strongly typed navigation, UI state richer than a boolean IsBusy, and testable ViewModels with no static MAUI calls.",
      },
      {
        type: "ul",
        items: [
          "CommunityToolkit.Mvvm covers properties, commands, and messaging.",
          "Prism.Maui covers page navigation and dialogs. It does not support Shell.",
          "ReactiveUI covers observable pipelines and activation, and requires System.Reactive.",
        ],
      },
      {
        type: "p",
        text: "None of those, alone, is a MAUI-first operation + state + scope framework. Combining all three creates package, namespace, and mental-model collisions. MVVMExpress is that shell. It is not a fork of those libraries. Capability work — captive portal, HTTP cache, offline sync, form XAML, flags, deep links — stays in focused MauiEssentials plugins.",
      },
    ],
  },
  {
    id: "principles",
    title: "Design principles",
    blocks: [
      {
        type: "ol",
        items: [
          "Core is UI-framework-free. Plugin.Maui.MVVMExpress.Core must not reference Microsoft.Maui.Controls.",
          "Optional means optional. Navigation, dialogs, validation, reactive, pagination, and generators are separate packages.",
          "Interfaces at the ViewModel boundary. ViewModels depend on INavigator, IDialogs, IMainThread, IConnectivityProbe — never on Shell, Page.DisplayAlert, or MainThread statics.",
          "Async-first, cancellation-first. Every public async API accepts CancellationToken.",
          "No hidden global state. No static service locator in Core.",
          "Compose MauiEssentials. Connectivity, cache, offline, permissions, flags, deep links, and secure session are adapter surfaces, not new engines.",
          "Source generators are an accelerator, not a requirement.",
          "AOT and trimming are default constraints. Reflection-based registration is a debug fallback.",
          "Do not silently swallow exceptions. Every catch transforms to Outcome, calls IErrorSink, logs and rethrows, or maps OperationCanceledException to Cancelled.",
          "One window is not the app. Navigation, dialogs, and scopes are keyed by window context, not Application.Current.MainPage.",
        ],
      },
    ],
  },
  {
    id: "packages",
    title: "Package architecture",
    blocks: [
      {
        type: "code",
        code: `                    Application (MAUI host)
                    UseMvvmExpress / AddMvvmExpress
                    AddGeneratedViewModels
                               │
     ┌────────────┬────────────┼────────────┬────────────┐
     ▼            ▼            ▼            ▼            ▼
 Navigation    Dialogs    Validation   Pagination    Reactive
 Shell + page  alerts +     IValidator   PagedColl.   CombineLatest
 URI stack     toast
     │            │            │            │            │
     └────────────┴──────┬─────┴────────────┴────────────┘
                         ▼
                   Host package
              (lifecycle, DI, dispatcher,
               MauiWindowContext)
                         │
                         ▼
                        Core
         (forms, pipeline, scopes, cache;
          no MAUI, no Rx, no FluentValidation)
                         │
         optional adapters ──── sibling plugins
         NetworkMonitor · ApiCache · OfflineSync
         SecureSession · FormValidation · FeatureFlags
         DeepLinks · PermissionFlow

Plugin.Maui.MVVMExpress.SourceGenerators     [Notify], register, routes
Plugin.Maui.MVVMExpress.Compatibility.CommunityToolkit
Plugin.Maui.MVVMExpress.Testing              net10.0 fakes`,
      },
      {
        type: "p",
        text: "Sibling plugins are never PackageReferences of MVVMExpress packages. The app wires NetworkMonitor, ApiCache, OfflineSync, SecureSession, FormValidation, FeatureFlags, DeepLinks, and PermissionFlow through the Core abstractions.",
      },
      {
        type: "table",
        headers: ["Layer", "Owns", "Must not own"],
        rows: [
          ["View (Page / Shell)", "BindingContext, lifecycle behavior", "Business work, alerts, navigation"],
          ["ViewModel", "Commands, AsyncState, Outcome", "Page, Shell.Current, DisplayAlert"],
          ["Application services", "Repositories, catalogs, auth", "UI types"],
          ["Adapters", "MauiEssentials / MAUI / backends", "ViewModel logic"],
        ],
      },
    ],
  },
  {
    id: "core",
    title: "Core subsystems",
    blocks: [
      {
        type: "p",
        text: "ObservableModel implements INotifyPropertyChanged and INotifyPropertyChanging. SetProperty skips notify when the value is unchanged. Event args are cached by property name. NotifyDependsOn raises dependent properties without a PropertyChanged(null) blast.",
      },
      {
        type: "p",
        text: "ViewModel adds Status, IsBusy, ViewModelCancellationToken, InitializeAsync / OnAppearingAsync / OnDisappearingAsync, and ExecuteAsync. Dispose cancels the token. The token stays readable after dispose (IsCancellationRequested is true). PageViewModel adds INavigable and optional INavigator / IDialogs. Typed args are applied via IAcceptNavArgs<T>.Accept / IAcceptNavQuery.Accept before initialize.",
      },
      {
        type: "code",
        code: `Construct (DI)
  → Accept(args) / Accept(query)    when IAcceptNavArgs / IAcceptNavQuery
  → InitializeAsync(token)          once
  → OnNavigatedToAsync(token)
  → OnAppearingAsync(token)
  → OnDisappearingAsync(token)
  → OnNavigatedFromAsync(token)
  → Dispose  (cancels ViewModelCancellationToken)`,
      },
      {
        type: "p",
        text: "ModelCommand / AsyncModelCommand (and generic variants) sit on IOperationExecutor: CanExecute → concurrency gate → timeout → retry → execute → IsRunning → error sink → Outcome. ConcurrencyMode values are Prevent, CancelPrevious, Queue, Allow, and Replace. Timeout, retry, Debounce, and Throttle ship on AsyncCommandOptions. CanExecuteChanged, IsRunning, and State raise on IMainThread. CanExecuteChanged is a weak event so a Button on a popped page does not pin the command. ICommand.Execute never throws — failures go to IErrorSink / IDialogs. ExecuteAsync still rethrows.",
      },
      {
        type: "p",
        text: "AsyncState<T> is the bindable UI status object: Status, Data, Error, Exception, Timestamp, plus IsLoading / IsRefreshing / IsEmpty / HasError / IsSuccess. ViewModelStatus values are Idle, Loading, Refreshing, Saving, Success, Empty, Error, Offline, Unauthorized, and Cancelled. LoadAsync and RefreshAsync return Outcome<T>.",
      },
      {
        type: "p",
        text: "Outcome / Outcome<T> is the library result type — success or failure with code, message, exception, validation, and metadata. It is named Outcome so it does not fight FluentResults, LanguageExt, or app-level Result<T> types.",
      },
      {
        type: "p",
        text: "IMessageHub defaults to weak subscribe. The handler signature is Action<TRecipient, TMessage> so the delegate does not capture the ViewModel. Strong subscribe is explicit. ObservableRangeCollection.AddRange / ReplaceRange raise one CollectionChanged Reset — required for mid and large lists.",
      },
    ],
  },
  {
    id: "navigation",
    title: "Navigation model",
    blocks: [
      {
        type: "p",
        text: "INavigator is host-agnostic. MauiShellNavigator maps a ViewModel type to a Shell route. MauiPageNavigator / IPageNavigator maps a ViewModel type to a Page on INavigation. Prism.Maui does not support Shell and uses URI + dictionary parameters. MVVMExpress prefers NavigateToAsync<TViewModel, TArgs>(TArgs args) with record parameters and IAcceptNavArgs<T>, and also ships NavigateToAsync(route, query) with IAcceptNavQuery.",
      },
      {
        type: "ul",
        items: [
          "URI stack on every host: Current, Stack, ModalStack, CanGoBack, History, GoBackAsync, PopToRootAsync, ReplaceAsync, ResetAsync.",
          "Guards run CanNavigateAwayAsync → host navigate → OnNavigatedFrom / OnNavigatedTo.",
          "GuardedNavigator wraps IAuthState. GuardedNavigatorOptions.ChallengeViewModel opens login on E_AUTH and resumes the original route after IAuthState.Changed. ForwardFailures sends failed outcomes to IErrorSink / IDialogs.",
          "IWindowContext + WindowNavigatorRegistry key one navigator per window. MauiWindowContext / MauiVisualTree resolve the current Page.",
          "ViewModels never call Shell.Current. The page owns BindingContext; the navigator creates the page and resolves the ViewModel from the current IServiceScope.",
        ],
      },
    ],
  },
  {
    id: "naming",
    title: "Naming — no collisions",
    blocks: [
      {
        type: "p",
        text: "Core type names must not collide with CommunityToolkit.Mvvm or Prism when both are referenced.",
      },
      {
        type: "table",
        headers: ["Concept", "MVVMExpress", "Avoid copying"],
        rows: [
          ["Observable base", "ObservableModel", "ObservableObject"],
          ["ViewModel base", "ViewModel / PageViewModel", "Prism BindableBase"],
          ["Sync command", "ModelCommand", "RelayCommand, DelegateCommand"],
          ["Async command", "AsyncModelCommand", "AsyncRelayCommand, ReactiveCommand"],
          ["Notify attribute", "[Notify] / [NotifyAlso]", "[ObservableProperty]"],
          ["Messenger", "IMessageHub", "IMessenger, IEventAggregator"],
          ["Navigation", "INavigator", "INavigationService"],
          ["Dialogs", "IDialogs", "IDialogService"],
          ["Parameters", "typed records / IAcceptNavArgs<T> / IAcceptNavQuery", "INavigationParameters"],
          ["Result", "Outcome / Outcome<T>", "competing Result<T> packages"],
        ],
      },
    ],
  },
  {
    id: "comparison",
    title: "Feature comparison",
    blocks: [
      {
        type: "p",
        text: "Designed product surface, validated 2026-09-01 against CommunityToolkit.Mvvm 8.4, Prism.Maui 9, and ReactiveUI. This table does not claim MVVMExpress is faster than the others. Shipping versus designed is tracked in the repository FEATURE-MATRIX.md.",
      },
      {
        type: "table",
        headers: ["Feature", "MVVMExpress", "CommunityToolkit.Mvvm", "Prism.Maui", "ReactiveUI"],
        rows: [
          ["Observable properties", "Yes", "Yes", "Yes", "Yes"],
          ["Commands / async commands", "Yes", "Yes", "Yes / Partial", "Yes"],
          ["Source generators", "Yes ([Notify], commands, register, routes)", "Yes", "No", "Yes"],
          ["Navigation (Shell or page)", "Yes (Shell + page)", "No", "Yes (page only)", "Yes"],
          ["Lifecycle + cancellation", "Yes", "No", "Yes", "Yes"],
          ["Dialogs / toast", "Yes", "Separate", "Yes", "Extensions"],
          ["Validation", "Yes", "Yes", "Extensions", "Yes"],
          ["Reactive derived state", "Yes (CombineLatest; Rx optional)", "No", "No", "Yes (Rx required)"],
          ["Pagination + refresh + search", "Yes", "No", "Extensions", "Extensions"],
          ["Offline / cache abstractions", "Yes (adapters)", "No", "No", "Extensions"],
          ["Unified AsyncState<T>", "Yes", "No", "No", "Extensions"],
          ["Typed navigation record args", "Yes", "No", "No (dictionary / URI)", "Partial"],
          ["Memory-leak GC tests", "Yes (VM, command, Button pop, messenger)", "Partial", "Partial", "Partial"],
          ["Small / mid / large list batching", "Yes (AddRange)", "App code", "App code", "App / Rx"],
          ["Testing package", "Yes", "Partial", "Yes", "Yes"],
        ],
      },
    ],
  },
  {
    id: "memory",
    title: "Memory, leaks, and scale",
    blocks: [
      {
        type: "table",
        headers: ["Scale", "List size", "Guarantee"],
        rows: [
          ["Small", "200", "Cheap notify; per-item Add is acceptable"],
          ["Mid", "5,000", "AddRange → one Reset"],
          ["Large", "50,000", "Same batching; UI must virtualize"],
        ],
      },
      {
        type: "p",
        text: "App data is not framework overhead. A 50,000-row product list occupies whatever the Product objects occupy. The framework is responsible for PropertyChanged allocations, CollectionChanged fan-out, whether popped ViewModels are collectable, and whether messengers and commands pin graphs.",
      },
      {
        type: "ul",
        items: [
          "ViewModel never holds Page. Lifecycle is a host behavior that unsubscribes on Unloaded.",
          "MessageHub default subscribe is weak. The handler must use the recipient argument.",
          "Commands are instance fields of the ViewModel and die with it. CanExecuteChanged is a weak event so a popped Button does not stay pinned.",
          "Dispose cancels in-flight AsyncModelCommand work.",
          "SetProperty equality-exits without allocating a new PropertyChangedEventArgs. PropertyChanged hops to IMainThread when a dispatcher is present.",
        ],
      },
      {
        type: "p",
        text: "Host-process measurements (2026-08-31, .NET 10 on macOS, not device RSS): unchanged SetProperty ≈ 5 ns; changed SetProperty ≈ 19 ns with cached EventArgs; AddRange of 50,000 items raises one CollectionChanged and about 525 KB for the int list backing store, not 50,000 EventArgs. Device RSS budgets are not measured yet.",
      },
      {
        type: "code",
        code: `dotnet test tests/Plugin.Maui.MVVMExpress.Core.Tests
dotnet run --project benchmarks/Plugin.Maui.MVVMExpress.Benchmarks -c Release -- --quick`,
      },
    ],
  },
  {
    id: "constraints",
    title: "Threading, AOT, and security",
    blocks: [
      {
        type: "ul",
        items: [
          "ObservableModel.SetProperty is not thread-safe. On 0.6.0, property and command notifications hop to IMainThread when MarshalNotifications is true (default).",
          "Bind Button.Command to AsyncModelCommand only on 0.6.0-preview+. 0.5.0 raised CanExecuteChanged off the UI thread after ConfigureAwait(false).",
          "ICommand.Execute (async void) never throws. Failures go to IErrorSink / IDialogs. ExecuteAsync still rethrows.",
          "AsyncState updates are compare-exchange; PropertyChanged is marshalled when a dispatcher is present.",
          "INavigator is serialized per window. Concurrent navigations queue or fail as Outcome.",
          "Library pipeline code uses ConfigureAwait(false) except where the next step must run on the UI context.",
          "Typed NavigateToAsync<TViewModel>() is the AOT path. UseMvvmExpress applies generated [Route] / [RequiresAuth] via a ModuleInitializer. Convention scan of *Page / *ViewModel is opt-in and annotated.",
          "Call InitializeComponent() on App before resolving AppShell / pages (App(IServiceProvider) + CreateWindow).",
          "ViewModels do not store secrets. Tokens belong in Plugin.Maui.SecureSession / SecureStoragePlus.",
          "Authorization attributes only consult IAuthState supplied by the app.",
        ],
      },
    ],
  },
  {
    id: "not-public",
    title: "Explicitly not public",
    blocks: [
      {
        type: "ul",
        items: [
          "Prism INavigationService, IDialogService, INavigationParameters.",
          "CommunityToolkit ObservableObject, RelayCommand, [ObservableProperty], IMessenger (use Compatibility CommunityToolkitMessageHub to adapt).",
          "ReactiveUI ReactiveObject, ReactiveCommand, WhenAnyValue.",
          "A static MVVMExpress.Current in Core.",
          "Types that reference Page or Shell inside Core.",
        ],
      },
    ],
  },
  {
    id: "compose",
    title: "Compose MauiEssentials",
    blocks: [
      {
        type: "p",
        text: "Default host implementations may wrap MAUI Essentials. Production apps should swap the abstractions. These are Niladri Padhy / MauiEssentials / Nuvyntra Labs packages. Usual alternatives: MAUI Connectivity, CommunityToolkit.Maui, Polly, SecureStorage.",
      },
      {
        type: "table",
        headers: ["Abstraction", "Suggested adapter", "Usual alternative"],
        rows: [
          ["IConnectivityProbe", "Plugin.Maui.NetworkMonitor", "MAUI Connectivity"],
          ["ICache", "Plugin.Maui.ApiCache", "Memory / HttpClient cache"],
          ["Offline writes", "Plugin.Maui.OfflineSync", "App-owned SQLite"],
          ["IAuthState", "Plugin.Maui.SecureSession", "MAUI SecureStorage"],
          ["IFeatureSwitch", "Plugin.Maui.FeatureFlags", "Remote config SDK"],
          ["IPermissionGate", "Plugin.Maui.PermissionFlow", "MAUI Permissions"],
          ["ICachedFetcher", "Plugin.Maui.ApiCache", "HttpClient + MemoryCache"],
          ["Deep-link mapping", "Plugin.Maui.DeepLinks", "MAUI App Links"],
          ["XAML Validation.For", "Plugin.Maui.FormValidation", "Behaviors / Toolkit"],
        ],
      },
    ],
  },
];

export const integrationSections: DocSection[] = [
  {
    id: "install",
    title: "Install",
    blocks: [
      {
        type: "callout",
        title: "Preview packages",
        text: "Every packed package is 0.6.0-preview. Add --prerelease. Core is enough for net10.0 tests and shared ViewModels. A MAUI host also needs Plugin.Maui.MVVMExpress.",
      },
      {
        type: "code",
        code: `dotnet add package Plugin.Maui.MVVMExpress.Core --prerelease
dotnet add package Plugin.Maui.MVVMExpress --prerelease`,
      },
      {
        type: "p",
        text: "Add Navigation, Dialogs, Validation, Pagination, Reactive, SourceGenerators, Compatibility, and Testing only when the app uses those surfaces.",
      },
      {
        type: "code",
        code: `dotnet add package Plugin.Maui.MVVMExpress.Navigation --prerelease
dotnet add package Plugin.Maui.MVVMExpress.Dialogs --prerelease
dotnet add package Plugin.Maui.MVVMExpress.Validation --prerelease
dotnet add package Plugin.Maui.MVVMExpress.Pagination --prerelease
dotnet add package Plugin.Maui.MVVMExpress.Reactive --prerelease
dotnet add package Plugin.Maui.MVVMExpress.SourceGenerators --prerelease
dotnet add package Plugin.Maui.MVVMExpress.Testing --prerelease`,
      },
    ],
  },
  {
    id: "register",
    title: "Register the host",
    blocks: [
      {
        type: "p",
        text: "Shared libraries and tests call AddMvvmExpress. A MAUI app calls UseMvvmExpress, which registers Core services, replaces IMainThread with MauiMainThread, marshals command/property notifications, and auto-attaches ViewModelLifecycleBehavior.",
      },
      {
        type: "code",
        code: `using Plugin.Maui.MVVMExpress.Hosting;
using Plugin.Maui.MVVMExpress.Navigation;
using Plugin.Maui.MVVMExpress.Dialogs;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .UseMvvmExpress(o => o.UseShell().UseDialogs());

        return builder.Build();
    }
}`,
      },
      {
        type: "code",
        code: `// net10.0 tests / shared ViewModel projects
services.AddMvvmExpress();`,
      },
      {
        type: "p",
        text: "UseShell and UseDialogs live in the Navigation and Dialogs packages. They replace InMemoryNavigator / NullDialogs with MauiShellNavigator, MauiDialogs, and MauiNotifier. Generated [Route] / [RequiresAuth] apply from UseMvvmExpress via a ModuleInitializer (ApplyGeneratedRegistrations defaults to true). Call InitializeComponent() on App before resolving AppShell.",
      },
    ],
  },
  {
    id: "viewmodel",
    title: "First ViewModel",
    blocks: [
      {
        type: "p",
        text: "Inherit ViewModel. Bind AsyncState to the page — or use AsyncStateView / BusyOverlayBehavior in the host package. Put work on AsyncModelCommand so IsRunning, Cancel, and the ViewModel token stay aligned. Bind Button.Command to AsyncModelCommand on 0.6.0+ (UI-thread marshal + weak CanExecuteChanged). Do not call Page.DisplayAlert or Shell.Current from the ViewModel.",
      },
      {
        type: "code",
        code: `using Plugin.Maui.MVVMExpress.ComponentModel;
using Plugin.Maui.MVVMExpress.Input;
using Plugin.Maui.MVVMExpress.State;

public sealed class HomeViewModel : ViewModel
{
    public AsyncState<IReadOnlyList<Product>> Products { get; } = new();

    public AsyncModelCommand RefreshCommand { get; }

    public HomeViewModel(ICatalog catalog)
    {
        RefreshCommand = new AsyncModelCommand(
            ct => Products.LoadAsync(token => catalog.ListAsync(token), ct));
    }

    protected override void Dispose(bool disposing)
    {
        if (disposing)
        {
            RefreshCommand.Cancel();
        }

        base.Dispose(disposing);
    }
}`,
      },
      {
        type: "p",
        text: "Dispose cancels ViewModelCancellationToken. The token remains readable after dispose. Page XAML binds ItemsSource to Products.Data and IsRefreshing to Products.IsRefreshing (or RefreshCommand.IsRunning).",
      },
    ],
  },
  {
    id: "commands",
    title: "Commands",
    blocks: [
      {
        type: "ul",
        items: [
          "ModelCommand / ModelCommand<T> — sync; weak CanExecuteChanged.",
          "AsyncModelCommand / AsyncModelCommand<T> — async, IsRunning, Cancel, ExecuteAsync; weak CanExecuteChanged.",
          "ICommand.Execute never throws. Failures go to IErrorSink / IDialogs. ExecuteAsync still rethrows.",
          "AsyncCommandOptions: timeout, retry, Debounce, Throttle, ConcurrencyMode (Prevent, CancelPrevious, Queue, Allow, Replace).",
        ],
      },
      {
        type: "code",
        code: `SaveCommand = new AsyncModelCommand(
    SaveAsync,
    () => CanSave,
    new AsyncCommandOptions
    {
        Concurrency = ConcurrencyMode.Prevent,
        Timeout = TimeSpan.FromSeconds(15),
        RetryCount = 2,
        RetryDelay = TimeSpan.FromSeconds(1),
    });`,
      },
    ],
  },
  {
    id: "collections",
    title: "Collections (mid and large lists)",
    blocks: [
      {
        type: "p",
        text: "Do not Add in a loop for mid or large lists. AddRange raises one CollectionChanged Reset. Large lists must also virtualize in CollectionView — the framework will not pretend 100,000 realized cells are fine.",
      },
      {
        type: "code",
        code: `var items = new ObservableRangeCollection<Product>();
items.AddRange(page);      // one CollectionChanged Reset
items.ReplaceRange(next);`,
      },
    ],
  },
  {
    id: "messaging",
    title: "Messaging",
    blocks: [
      {
        type: "p",
        text: "The handler must use the recipient argument so a weak subscribe does not pin the ViewModel. Do not write (msg) => this.Refresh() — that captures this and defeats the weak table.",
      },
      {
        type: "code",
        code: `hub.Subscribe<HomeViewModel, CartChanged>(
    this,
    static (vm, _) => vm.Refresh(),
    weak: true);`,
      },
    ],
  },
  {
    id: "navigation",
    title: "Shell and page navigation",
    blocks: [
      {
        type: "p",
        text: "Add Plugin.Maui.MVVMExpress.Navigation and call UseShell() on UseMvvmExpress. MauiShellNavigator maps a ViewModel type to a Shell route and accepts Map<TViewModel, TPage> plus CreateContent. MauiPageNavigator maps a ViewModel type to a Page. Typed args use a record and IAcceptNavArgs<T>.Accept on the destination. URI / dictionary args use IAcceptNavQuery.",
      },
      {
        type: "code",
        code: `public sealed record ProductDetailsArgs(int ProductId);

public sealed class ProductDetailsViewModel : PageViewModel,
    IAcceptNavArgs<ProductDetailsArgs>, IAcceptNavQuery
{
    private int _productId;

    public void Accept(ProductDetailsArgs args) => _productId = args.ProductId;

    public void Accept(IReadOnlyDictionary<string, object> query)
    {
        if (query.TryGetValue(nameof(ProductDetailsArgs.ProductId), out var raw)
            && int.TryParse(Convert.ToString(raw), out var id))
        {
            _productId = id;
        }
    }
}

// typed
await Navigator.NavigateToAsync<ProductDetailsViewModel, ProductDetailsArgs>(
    new ProductDetailsArgs(product.Id), ct);

// URI + dictionary query
await Navigator.NavigateToAsync(
    "details",
    new Dictionary<string, object> { ["ProductId"] = product.Id },
    cancellationToken: ct);`,
      },
      {
        type: "p",
        text: "Page-stack host (INavigation / NavigationPage) uses IPageNavigator. Register one navigator per IWindowContext with WindowNavigatorRegistry.",
      },
      {
        type: "code",
        code: `IPageNavigator pages = new MauiPageNavigator(new WindowContext("main"), services)
    .Map<PageStackViewModel, PageStackPage>("stack")
    .Map<PageStackItemViewModel, PageStackItemPage>("stack-item");

await pages.NavigateToAsync(
    "stack-item",
    new Dictionary<string, object> { ["Title"] = "Latte" });
if (pages.CanGoBack)
    await pages.GoBackAsync();
await pages.PopToRootAsync();
await pages.ReplaceAsync<PageStackViewModel>();
await pages.ResetAsync<PageStackViewModel>();`,
      },
    ],
  },
  {
    id: "dialogs",
    title: "Dialogs",
    blocks: [
      {
        type: "p",
        text: "Add Plugin.Maui.MVVMExpress.Dialogs and call UseDialogs() on UseMvvmExpress. Inject IDialogs for alerts/confirm and INotifier for toast. MauiDialogs hops to IMainThread like MauiNotifier. MauiToastPresenter draws on Window.AddOverlay — it never wraps or replaces Page.Content, so ResetAsync cannot restore a stale tree. Tests use FakeDialogs (it implements both). Inject IToastPresenter to record toasts without a window.",
      },
      {
        type: "code",
        code: `public sealed class ProductEditViewModel : PageViewModel
{
    public ProductEditViewModel(IDialogs dialogs, INotifier notifier)
    {
        /* store dialogs + notifier */
    }

    public async Task DeleteAsync(CancellationToken cancellationToken)
    {
        var ok = await Dialogs!.ConfirmAsync(
            "Delete product",
            "This cannot be undone.",
            accept: "Delete",
            cancel: "Cancel",
            cancellationToken);

        if (!ok)
        {
            return;
        }

        await _catalog.DeleteAsync(_productId, cancellationToken);
        await Notifier.ToastAsync("Deleted", cancellationToken: cancellationToken);
    }
}`,
      },
    ],
  },
  {
    id: "validation",
    title: "Validation",
    blocks: [
      {
        type: "p",
        text: "Plugin.Maui.MVVMExpress.Validation ships DataAnnotations plus IValidator and MustMatchAttribute. The package includes ILLink.Descriptors.xml that roots Required, MinLength, MaxLength, StringLength, Range, RegularExpression, EmailAddress, Compare, and MustMatch. Custom attributes need an app-level descriptor. FluentValidation is an adapter the app may add. XAML Validation.For remains Plugin.Maui.FormValidation.",
      },
      {
        type: "code",
        code: `public sealed class ProductDraft
{
    [Required, StringLength(80)]
    public string Name { get; set; } = "";

    [Range(0.01, 1_000_000)]
    public decimal Price { get; set; }
}

var summary = await validator.ValidateAsync(draft, cancellationToken);
if (!summary.IsValid)
{
    return Outcome.Failure("validation", summary.Messages[0].Message);
}`,
      },
    ],
  },
  {
    id: "forms",
    title: "Forms, dirty guard, undo",
    blocks: [
      {
        type: "p",
        text: "FormViewModel lives in Core and does not reference MAUI. Field(name, value) creates a FormField<T>. Bind FormField.Error / HasError. When IDialogs is registered, leaving a dirty form confirms “Discard changes?”. Tests set DirtyNavigation = DirtyNavigationMode.SilentBlock. SubmitAsync(work) calls MarkClean() on success. Use [MustMatch(nameof(Password))] or MustMatch(password, confirm). UndoCommand, RedoCommand, and ResetCommand are on the base type. XAML field highlighting stays Plugin.Maui.FormValidation.",
      },
      {
        type: "code",
        code: `public sealed class ProductEditViewModel : FormViewModel
{
    private readonly FormField<string> _name;

    public ProductEditViewModel()
    {
        _name = Field("Name", "");
        DirtyNavigation = DirtyNavigationMode.Confirm;
    }

    public string Name
    {
        get => _name.Value ?? "";
        set => _name.Value = value;
    }

    private Task<Outcome> SaveAsync(CancellationToken ct) =>
        SubmitAsync(token => _catalog.SaveAsync(Name, token), cancellationToken: ct);
}`,
      },
    ],
  },
  {
    id: "reactive",
    title: "Reactive derived state",
    blocks: [
      {
        type: "p",
        text: "Plugin.Maui.MVVMExpress.Reactive does not take System.Reactive. Core stays Rx-free. CombineLatest derives a value from two properties; dispose the observable with the ViewModel. Search debounce remains SearchQuery in Pagination.",
      },
      {
        type: "code",
        code: `using Plugin.Maui.MVVMExpress.Reactive;

_fullName = PropertyObservable.CombineLatest(
    PropertyObservable.Observe(this, nameof(First), () => First ?? ""),
    PropertyObservable.Observe(this, nameof(Last), () => Last ?? ""),
    static (first, last) => $"{first} {last}".Trim());

_fullName.Subscribe(_ => Notify(nameof(FullName)));`,
      },
    ],
  },
  {
    id: "generators",
    title: "Source generators",
    blocks: [
      {
        type: "p",
        text: "Add Plugin.Maui.MVVMExpress.SourceGenerators with PrivateAssets=all. Attributes live in Core. Types must be partial. UseMvvmExpress applies generated [Route] / [RequiresAuth] via a ModuleInitializer. You can still call services.AddGeneratedViewModels() explicitly. Hand-written SetProperty and Map<TViewModel> remain valid.",
      },
      {
        type: "code",
        code: `[RegisterViewModel]
[Route("generated")]
[RequiresAuth]
public partial class GeneratedCatalogViewModel : ViewModel
{
    [Notify]
    [NotifyAlso(nameof(Label))]
    private string _query = "";

    [Notify]
    [PersistState]
    private string _draft = "";

    public string Label => $"Q: {Query}";

    [ModelCommand]
    private void Clear() => Query = "";
}

services.AddGeneratedViewModels();`,
      },
    ],
  },
  {
    id: "pagination",
    title: "Pagination and search",
    blocks: [
      {
        type: "p",
        text: "PagedCollection<T> / DelegatePagedCollection<T> own load-more, refresh, and retry. SearchQuery debounces text (default 300 ms, minimum length 2) and cancels the previous query.",
      },
      {
        type: "code",
        code: `public sealed class PagedProductViewModel : ViewModel
{
    public DelegatePagedCollection<Product> Products { get; }

    public PagedProductViewModel(ICatalog catalog)
    {
        Products = new DelegatePagedCollection<Product>(
            (page, ct) => catalog.ListPageAsync(page, ct));
    }
}

// pull-to-refresh / infinite scroll
await Products.RefreshAsync(ct);
await Products.LoadMoreAsync(ct);`,
      },
    ],
  },
  {
    id: "auth-offline",
    title: "Auth and offline adapters",
    blocks: [
      {
        type: "p",
        text: "In-memory IAuthState, IAccountService, ICache, ICachedFetcher, and IConnectivityProbe exist for samples and tests. IAuthState exposes Email, DisplayName, and Changed. Production apps adapt sibling plugins instead of shipping those types.",
      },
      {
        type: "code",
        code: `// Auth — adapt Plugin.Maui.SecureSession
services.AddSingleton<IAuthState>(sp => new SecureSessionAuthState(sp.GetRequiredService<ISecureSession>()));
services.AddSingleton<INavigator>(sp => new GuardedNavigator(
    sp.GetRequiredService<INavigator>(),
    sp.GetRequiredService<IAuthState>(),
    policy: MvvmExpressGeneratedRegistrations.AuthPolicy,
    options: new GuardedNavigatorOptions
    {
        ChallengeViewModel = typeof(AuthLoginViewModel),
        ForwardFailures = true,
    }));

await Navigator.ResetAsync<AuthHomeViewModel>();  // after sign-in (root ShellContent)
await Navigator.ResetAsync<AuthLoginViewModel>(); // after sign-out

// Cache-first catalog — adapt Plugin.Maui.ApiCache
var cached = await cache.GetAsync<IReadOnlyList<Product>>("catalog", ct);
if (cached is not null && !probe.IsOnline)
{
    return Outcome<IReadOnlyList<Product>>.Success(cached);
}`,
      },
      {
        type: "p",
        text: "IConnectivityProbe should wrap Plugin.Maui.NetworkMonitor when the app must distinguish validated internet from a captive portal. Do not treat MAUI Connectivity.NetworkAccess as “online enough to sync.”",
      },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    blocks: [
      {
        type: "p",
        text: "Plugin.Maui.MVVMExpress.Testing is net10.0. ViewModels in the sample host live in a shared net10.0 project so they can be tested without MAUI.",
      },
      {
        type: "code",
        code: `var dialogs = new FakeDialogs();
var navigator = new FakeNavigator();
var vm = new ProductEditViewModel(dialogs, navigator, catalog);

await vm.InitializeAsync();
Assert.True(LeakProbe.IsCollected(() =>
{
    var probe = new HomeViewModel(catalog);
    probe.Dispose();
    return probe;
}));`,
      },
      {
        type: "code",
        code: `dotnet test tests/Plugin.Maui.MVVMExpress.Core.Tests
dotnet test tests/Plugin.Maui.MVVMExpress.Samples.Tests`,
      },
    ],
  },
  {
    id: "samples",
    title: "Sample map",
    blocks: [
      {
        type: "p",
        text: "First run is AuthApp: sign in → home, plus register and forgot password (demo@mvvmexpress.dev / secret). It uses UseMvvmExpress(o => o.UseShell().UseDialogs()), ResetAsync replace-root, GuardedNavigator + [RequiresAuth], and FormViewModel dirty confirm. The flyout catalog still lives in Plugin.Maui.MVVMExpress.Sample.",
      },
      {
        type: "table",
        headers: ["Sample", "ViewModels", "What it integrates"],
        rows: [
          ["Basic", "CounterViewModel", "ViewModel, SetProperty, NotifyDependsOn, ModelCommand"],
          ["CRUD", "ProductList / ProductEdit", "FormViewModel dirty / undo / redo, AsyncState, IValidator"],
          ["Navigation", "Home / ProductDetails / ScopedCatalog", "PageViewModel, INavigator, IAcceptNavArgs<T>, IAcceptNavQuery, INotifier toast, IViewModelScopeFactory"],
          ["Page stack", "PageStack / PageStackItem", "IPageNavigator, URI query, Stack / CanGoBack / PopToRoot / Replace / Reset"],
          ["Auth (flyout)", "Login / SecureHome", "IAuthState, GuardedNavigator — push secure; adapt SecureSession"],
          ["AuthApp", "AuthLogin / AuthHome / Register / Forgot", "First-run replace-root, IAccountService, MustMatch, dirty confirm"],
          ["Offline", "OfflineCatalogViewModel", "ICachedFetcher + FetchPolicy — adapt ApiCache / OfflineSync"],
          ["Pagination", "PagedProductViewModel", "DelegatePagedCollection load-more + refresh"],
          ["Reactive", "SearchViewModel", "SearchQuery debounce + PropertyObservable.CombineLatest"],
          ["Enterprise", "EnterpriseShell / CatalogStatus", "Child composition, IFeatureSwitch, hub, busy, probe, auth gate"],
          ["Generated", "GeneratedCatalogViewModel", "[Notify], [ModelCommand], [PersistState], [RegisterViewModel], [Route], [RequiresAuth]"],
        ],
      },
    ],
  },
  {
    id: "pitfalls",
    title: "Pitfalls",
    blocks: [
      {
        type: "ul",
        items: [
          "Do not call Page.DisplayAlert or Shell.Current from a ViewModel. Use IDialogs and INavigator.",
          "Do not Add in a loop for mid or large lists. Use AddRange / ReplaceRange.",
          "Do not capture this in a MessageHub handler. Use the recipient argument.",
          "Do not bind a non-virtualized StackLayout to thousands of rows. Pagination + CollectionView virtualization are required at mid/large scale.",
          "Do not store tokens on the ViewModel. Use Plugin.Maui.SecureSession.",
          "Do not treat MAUI Connectivity as validated internet. Adapt Plugin.Maui.NetworkMonitor.",
          "Do not enable convention View/ViewModel scanning as the only AOT registration path. UseMvvmExpress applies generated [Route] / [RequiresAuth] via a ModuleInitializer.",
          "Do not inject AppShell into App before InitializeComponent(). Resolve the shell in CreateWindow from IServiceProvider.",
          "Do not bind Button.Command to AsyncModelCommand on 0.5.0-preview. Use 0.6.0+ for UI-thread marshal and weak CanExecuteChanged.",
          "Hand-written SetProperty and Map<TViewModel> remain valid. Generators are an accelerator.",
        ],
      },
    ],
  },
];

export const relatedAdapters = [
  {
    name: "Plugin.Maui.NetworkMonitor",
    slug: "plugin-maui-network-monitor",
    why: "Validated internet versus captive portal for IConnectivityProbe.",
  },
  {
    name: "Plugin.Maui.ApiCache",
    slug: "plugin-maui-api-cache",
    why: "HTTP GET CacheFirst / SWR behind ICache.",
  },
  {
    name: "Plugin.Maui.OfflineSync",
    slug: "plugin-maui-offline-sync",
    why: "Local writes and queued sync — not a database inside MVVMExpress.",
  },
  {
    name: "Plugin.Maui.SecureSession",
    slug: "plugin-maui-secure-session",
    why: "Tokens and 401 refresh for IAuthState / GuardedNavigator.",
  },
  {
    name: "Plugin.Maui.FormValidation",
    slug: "plugin-maui-form-validation",
    why: "XAML Validation.For next to IValidator.",
  },
  {
    name: "Plugin.Maui.FeatureFlags",
    slug: "plugin-maui-feature-flags",
    why: "IFeatureSwitch adapter for rollouts.",
  },
  {
    name: "Plugin.Maui.DeepLinks",
    slug: "plugin-maui-deep-links",
    why: "App Links / Universal Links into INavigator route + query.",
  },
  {
    name: "Plugin.Maui.PermissionFlow",
    slug: "plugin-maui-permission-flow",
    why: "IPermissionGate adapter for permission UX.",
  },
] as const;
