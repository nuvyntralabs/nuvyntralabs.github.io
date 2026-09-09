import type { DocSection } from "@/content/mvvmexpress";

export const wpfVscodeMarketplaceSearch =
  "https://marketplace.visualstudio.com/items?itemName=nuvyntralabs.wpf-mvvmexpress";

export const wpfVisualStudioMarketplaceSearch =
  "https://marketplace.visualstudio.com/items?itemName=nuvyntralabs.Wpf-MVVMExpres-Visual-Studio";

export const wpfMvvmExpressStatus = {
  version: "1.0.0",
  note: "Current NuGet is 1.0.0: first stable WPF family. Frame navigation, dialogs, validation, pagination, templates, and Visual Studio Code / Visual Studio wrappers. Core targets net10.0 and does not reference WPF or MAUI. Host / Navigation / Dialogs target net10.0-windows10.0.17763.0 with UseWPF. This is not Plugin.Maui.MVVMExpress — there is no PackageReference between the families. Source generators, Reactive, Shell, UseDeepLinks, and UseSecureSessionAuth are out of 1.0.",
} as const;

export const wpfPackageFamily: { name: string; purpose: string; status: string; nuget: string | null }[] = [
  {
    name: "Plugin.Wpf.MVVMExpress.Core",
    purpose: "Observable model, commands, ViewModel, SectionHost, IModule, navigator/cache/auth abstractions, state, outcome, messaging",
    status: "Implemented + tests",
    nuget: "https://www.nuget.org/packages/Plugin.Wpf.MVVMExpress.Core",
  },
  {
    name: "Plugin.Wpf.MVVMExpress",
    purpose: "UseWpfMvvmExpress, DispatcherMainThread, WpfWindowContext, Loaded/Unloaded lifecycle, SectionHostView, MvvmSearch, WpfFormViewModel",
    status: "Implemented",
    nuget: "https://www.nuget.org/packages/Plugin.Wpf.MVVMExpress",
  },
  {
    name: "Plugin.Wpf.MVVMExpress.Navigation",
    purpose: "WpfFrameNavigator, UseFrameNavigation, replace-root, owned-window modal stack",
    status: "Implemented + tests",
    nuget: "https://www.nuget.org/packages/Plugin.Wpf.MVVMExpress.Navigation",
  },
  {
    name: "Plugin.Wpf.MVVMExpress.Dialogs",
    purpose: "IDialogs + WpfDialogs (MessageBox) + WpfNotifier (AdornerLayer toast)",
    status: "Implemented + tests",
    nuget: "https://www.nuget.org/packages/Plugin.Wpf.MVVMExpress.Dialogs",
  },
  {
    name: "Plugin.Wpf.MVVMExpress.Validation",
    purpose: "DataAnnotations + IValidator + MustMatch + ILLink trim roots",
    status: "Implemented + tests",
    nuget: "https://www.nuget.org/packages/Plugin.Wpf.MVVMExpress.Validation",
  },
  {
    name: "Plugin.Wpf.MVVMExpress.Pagination",
    purpose: "PagedCollection<T>, SnapshotCollection<T>, SearchQuery.CommittedText",
    status: "Implemented + tests",
    nuget: "https://www.nuget.org/packages/Plugin.Wpf.MVVMExpress.Pagination",
  },
  {
    name: "Plugin.Wpf.MVVMExpress.Testing",
    purpose: "LeakProbe, ScaleProfile, FakeDialogs, FakeNavigator, FakeMainThread, FakeConnectivity, FakeMessageHub, ScopedNavigator",
    status: "Implemented + tests",
    nuget: "https://www.nuget.org/packages/Plugin.Wpf.MVVMExpress.Testing",
  },
  {
    name: "Plugin.Wpf.MVVMExpress.Templates",
    purpose: "dotnet new wpf-mvvmexpress (app) and wpf-mvvmexpress-page (XAML + ViewModel + service)",
    status: "Implemented",
    nuget: "https://www.nuget.org/packages/Plugin.Wpf.MVVMExpress.Templates",
  },
];

export const wpfComposeWith = [
  {
    name: "Plugin.Maui.MVVMExpress",
    slug: "plugin-maui-mvvmexpress",
    why: "The MAUI family — same Core contract, different host. Do not add both PackageReferences to one project.",
  },
  {
    name: "Plugin.Maui.HttpForge",
    slug: "plugin-maui-httpforge",
    why: "Source-generated typed REST client. Core is net10.0 — a WPF ViewModel can consume the same client library.",
  },
  {
    name: "CommunityToolkit.Mvvm",
    slug: null as string | null,
    href: "https://www.nuget.org/packages/CommunityToolkit.Mvvm",
    why: "Usual WPF alternative when you only need properties and commands. Type names stay unique if both are referenced.",
  },
] as const;

export const wpfTechnicalSections: DocSection[] = [
  {
    id: "status",
    title: "Status",
    blocks: [
      {
        type: "callout",
        title: "1.0.0",
        text: "Current packages are 1.0.0 (2026-09-09). First stable WPF family. Public APIs match the Core contract documented in API-DESIGN.md: ObservableModel, ViewModel, commands, AsyncState, Outcome, INavigator, UseAuth<TChallenge>(), Frame navigation, dialogs, validation, pagination, templates, and Marketplace IDE wrappers. Host / Navigation / Dialogs target net10.0-windows10.0.17763.0 with UseWPF. Core, Validation, Pagination, and Testing stay net10.0. This is not a type-forward of Plugin.Maui.MVVMExpress.* — namespaces start with Plugin.Wpf.MVVMExpress. Source generators, Reactive, Shell, UseDeepLinks, and UseSecureSessionAuth wait for a later release.",
      },
      {
        type: "p",
        text: "Product name is MVVMExpress (WPF family). Package prefix is Plugin.Wpf.MVVMExpress. Core does not reference System.Windows or Microsoft.Maui.Controls. Manual INotifyPropertyChanged and hand-written commands are first-class. There is no Shell host — put a Frame named NavigationHost in the window.",
      },
    ],
  },
  {
    id: "why",
    title: "Why this exists",
    blocks: [
      {
        type: "p",
        text: "A production WPF app needs more than INotifyPropertyChanged and ICommand: ViewModel lifecycle bound to Loaded / Unloaded, async work with cancellation, timeout, retry, and busy state, strongly typed Frame navigation, UI state richer than a boolean IsBusy, and testable ViewModels with no static MessageBox or Frame calls.",
      },
      {
        type: "ul",
        items: [
          "CommunityToolkit.Mvvm covers properties, commands, and messaging.",
          "Prism covers region and URI navigation. It is a different composition model.",
          "Caliburn.Micro covers convention-based screens and conductors.",
          "ReactiveUI covers observable pipelines and activation, and requires System.Reactive.",
        ],
      },
      {
        type: "p",
        text: "None of those, alone, is a WPF-first operation + state + Frame-journal framework with the same Core contract as the MAUI family. MVVMExpress is that shell for desktop. It is not a fork of those libraries and it is not a MAUI package wearing a WPF TFM.",
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
          "Core is UI-framework-free. Plugin.Wpf.MVVMExpress.Core must not reference System.Windows or Microsoft.Maui.Controls.",
          "Optional means optional. Navigation, dialogs, validation, pagination, and testing are separate packages.",
          "Interfaces at the ViewModel boundary. ViewModels depend on INavigator, IDialogs, IMainThread — never on MessageBox, Frame, or Dispatcher.CurrentDispatcher statics.",
          "Async-first, cancellation-first. Every public async API accepts CancellationToken.",
          "No hidden global state. No static service locator in Core.",
          "One navigator per Window. IWindowContext / WindowNavigatorRegistry key navigation, dialogs, and scopes by window — not Application.Current.MainWindow.",
          "No Shell. Frame + SectionHostViewModel cover stack navigation and in-place tabs.",
          "Do not silently swallow exceptions. Every catch transforms to Outcome, calls IErrorSink, logs and rethrows, or maps OperationCanceledException to Cancelled.",
          "No PackageReference to Plugin.Maui.MVVMExpress.*. A ViewModel ports with a namespace swap, not a shared assembly.",
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
        code: `                    Application (WPF host)
                    UseWpfMvvmExpress / AddWpfMvvmExpress
                    AddMvvmExpress
                               │
     ┌────────────┬────────────┼────────────┐
     ▼            ▼            ▼            ▼
 Navigation    Dialogs    Validation   Pagination
 Frame +       MessageBox  IValidator   Paged +
 owned Window  + Adorner                Snapshot
     │            │            │            │
     └────────────┴──────┬─────┴────────────┘
                         ▼
                   Host package
              (lifecycle, DI, dispatcher,
               WpfWindowContext)
                         │
                         ▼
                        Core
         (forms, pipeline, scopes, cache,
          SectionHost; no WPF, no MAUI)

Plugin.Wpf.MVVMExpress.Testing              net10.0 fakes
Plugin.Wpf.MVVMExpress.Templates            dotnet new wpf-mvvmexpress`,
      },
      {
        type: "p",
        text: "There is no SourceGenerators, Reactive, or CommunityToolkit compatibility package in 1.0. Hand-written SetProperty and Map<TViewModel, TView> are the registration path. Sibling MauiEssentials plugins are never PackageReferences of WPF packages — a shared net10.0 library may still compose HttpForge or a custom IAuthState.",
      },
      {
        type: "table",
        headers: ["Layer", "Owns", "Must not own"],
        rows: [
          ["View (Page / UserControl / Window)", "DataContext, Loaded / Unloaded", "Business work, MessageBox, Frame.Navigate"],
          ["ViewModel", "Commands, AsyncState, Outcome", "Window, Frame, Dispatcher statics"],
          ["Application services", "Repositories, catalogs, auth", "UI types"],
          ["Adapters", "WPF / backends", "ViewModel logic"],
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
        text: "ObservableModel implements INotifyPropertyChanged and INotifyPropertyChanging. SetProperty skips notify when the value is unchanged. Event args are cached by property name. NotifyDependsOn raises dependent properties without a PropertyChanged(null) blast. Hand-written SetProperty is the 1.0 path — there is no [Notify] generator in this family yet.",
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
        text: "AsyncState<T> is the bindable UI status object: Status, Data, Error, Exception, Timestamp, plus IsLoading / IsRefreshing / IsEmpty / HasError / IsSuccess. ViewModelStatus values are Idle, Loading, Refreshing, Saving, Success, Empty, Error, Offline, Unauthorized, and Cancelled. LoadAsync and RefreshAsync return Outcome<T>. Outcome / Outcome<T> is the library result type — named Outcome so it does not fight FluentResults, LanguageExt, or app-level Result<T> types.",
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
        text: "INavigator is host-agnostic. UseFrameNavigation is the only WPF host: login → replace-root → push on a Frame named NavigationHost. WpfFrameNavigator hops to IMainThread before constructing a Page or UserControl. There is no UseShell.",
      },
      {
        type: "ul",
        items: [
          "URI stack on the Frame host: Current, Stack, ModalStack, CanGoBack, History, GoBackAsync, PopToRootAsync, ReplaceAsync, ResetAsync / ReplaceRootAsync, PushModalAsync / PopModalAsync.",
          "ResetAsync clears the Frame journal so Back cannot return to login. It does not keep the old journal and Push a new root.",
          "Modal views open as owned Window instances — not a second Frame overlay.",
          "UseAuth<TChallenge>() wraps GuardedNavigator. Register IAuthState yourself (Playground uses DemoAuthState). There is no UseSecureSessionAuth() host helper in 1.0.",
          "One INavigator per IWindowContext. A second Window gets its own navigator — Playground’s SecondaryWindow is the sample.",
          "ViewModels never call Frame.Navigate or MessageBox.Show. IMainThread is the only marshal API.",
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
          ["ViewModel base", "ViewModel / PageViewModel", "Prism BindableBase / Screen"],
          ["Sync command", "ModelCommand", "RelayCommand, DelegateCommand"],
          ["Async command", "AsyncModelCommand", "AsyncRelayCommand, ReactiveCommand"],
          ["Messenger", "IMessageHub", "IMessenger, IEventAggregator"],
          ["Navigation", "INavigator", "INavigationService, IWindowManager"],
          ["Dialogs", "IDialogs", "IDialogService, MessageBox.Show"],
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
        text: "Designed product surface against CommunityToolkit.Mvvm, Prism (WPF), Caliburn.Micro, and ReactiveUI. This table does not claim MVVMExpress is faster than the others. Shipping versus designed is tracked in the repository API-PARITY.md.",
      },
      {
        type: "table",
        headers: ["Feature", "MVVMExpress", "CommunityToolkit.Mvvm", "Prism", "ReactiveUI"],
        rows: [
          ["Observable properties", "Yes (hand-written in 1.0)", "Yes", "Yes", "Yes"],
          ["Commands / async commands", "Yes", "Yes", "Yes / Partial", "Yes"],
          ["Source generators", "Out of 1.0", "Yes", "No", "Yes"],
          ["Navigation (Frame)", "Yes (Frame + owned-window modal)", "No", "Yes (regions / URI)", "Yes"],
          ["Lifecycle + cancellation", "Yes", "No", "Yes", "Yes"],
          ["Dialogs / toast", "Yes (MessageBox + AdornerLayer)", "Separate", "Yes", "Extensions"],
          ["Validation", "Yes", "Yes", "Extensions", "Yes"],
          ["Reactive derived state", "Out of 1.0", "No", "No", "Yes (Rx required)"],
          ["Pagination + search", "Yes", "No", "Extensions", "Extensions"],
          ["Unified AsyncState<T>", "Yes", "No", "No", "Extensions"],
          ["Typed navigation record args", "Yes", "No", "No (dictionary / URI)", "Partial"],
          ["Multi-window", "Yes (IWindowContext per Window)", "App-owned", "Yes", "Partial"],
          ["Memory-leak GC tests", "Yes (VM, command, pop, messenger)", "Partial", "Partial", "Partial"],
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
          ["Large", "50,000", "Same batching; UI must virtualize (VirtualizingStackPanel)"],
        ],
      },
      {
        type: "p",
        text: "App data is not framework overhead. A 50,000-row product list occupies whatever the Product objects occupy. The framework is responsible for PropertyChanged allocations, CollectionChanged fan-out, whether popped ViewModels are collectable, and whether messengers and commands pin graphs.",
      },
      {
        type: "ul",
        items: [
          "ViewModel never holds Window or Frame. Lifecycle is a Loaded / Unloaded attached property that unsubscribes on Unloaded.",
          "MessageHub default subscribe is weak. The handler must use the recipient argument.",
          "Commands are instance fields of the ViewModel and die with it. CanExecuteChanged is a weak event so a popped Button does not stay pinned.",
          "Dispose cancels in-flight AsyncModelCommand work.",
          "SetProperty equality-exits without allocating a new PropertyChangedEventArgs. PropertyChanged hops to IMainThread when a dispatcher is present.",
        ],
      },
      {
        type: "code",
        code: `dotnet test tests/Plugin.Wpf.MVVMExpress.Core.Tests`,
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
          "ObservableModel.SetProperty is not thread-safe. Property, command, and navigation notifications hop to IMainThread when MarshalNotifications is true (default).",
          "Do not ConfigureAwait(false) then new Page() or Frame.Navigate. Navigators hop first.",
          "ICommand.Execute (async void) never throws. Failures go to IErrorSink / IDialogs. ExecuteAsync still rethrows.",
          "INavigator is serialized per window. Concurrent navigations queue or fail as Outcome.",
          "Typed NavigateToAsync<TViewModel>() is the AOT path. 1.0 registration is handwritten Map — there is no [RegisterView] generator yet.",
          "ViewModels do not store secrets. Tokens belong in an app IAuthState adapter.",
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
          "CommunityToolkit ObservableObject, RelayCommand, [ObservableProperty], IMessenger.",
          "ReactiveUI ReactiveObject, ReactiveCommand, WhenAnyValue.",
          "A static MVVMExpress.Current in Core.",
          "Types that reference Window or Frame inside Core.",
          "UseShell, UseDeepLinks, UseSecureSessionAuth, and source-generator attributes.",
        ],
      },
    ],
  },
];

export const wpfIntegrationSections: DocSection[] = [
  {
    id: "scaffold",
    title: "Scaffold an app",
    blocks: [
      {
        type: "callout",
        title: "1.0.0 project template",
        text: "Current packages are 1.0.0. Install without --prerelease. Scaffold with Plugin.Wpf.MVVMExpress.Templates, the Visual Studio Code or Visual Studio Marketplace listing, or add packages to an existing WPF app. There is no Shell — the template puts a Frame named NavigationHost in MainWindow and wraps the tree in AdornerDecorator for toasts.",
      },
      {
        type: "link",
        note: "Visual Studio Code:",
        label: "WPF MVVMExpress on the Marketplace",
        href: wpfVscodeMarketplaceSearch,
      },
      {
        type: "link",
        note: "Visual Studio 2022+:",
        label: "WPF MVVMExpress on the Marketplace",
        href: wpfVisualStudioMarketplaceSearch,
      },
      {
        type: "code",
        code: `dotnet new install Plugin.Wpf.MVVMExpress.Templates
dotnet new wpf-mvvmexpress -n MyApp
cd MyApp
dotnet test MyApp.Tests`,
      },
      {
        type: "p",
        text: "The template is a Frame host that starts on LoginPage, then ResetAsync to HomeViewModel after sign-in, plus details, a form, and a net10.0 test project. Demo sign-in: demo@mvvmexpress.dev / secret. Register your own IAuthState for production tokens.",
      },
      {
        type: "code",
        code: `dotnet new wpf-mvvmexpress-page -n Catalog --namespace MyApp`,
      },
      {
        type: "p",
        text: "Then map the route and call services.AddCatalog() in App startup. Move the ViewModel and service into MyApp.Core if you keep that split.",
      },
      {
        type: "link",
        note: "Template pack on nuget.org:",
        label: "Plugin.Wpf.MVVMExpress.Templates",
        href: "https://www.nuget.org/packages/Plugin.Wpf.MVVMExpress.Templates",
      },
      {
        type: "link",
        note: "Template pack on GitHub Packages:",
        label: "Plugin.Wpf.MVVMExpress.Templates",
        href: "https://github.com/nuvyntralabs/Plugin.Wpf.MVVMExpress/pkgs/nuget/Plugin.Wpf.MVVMExpress.Templates",
      },
    ],
  },
  {
    id: "install",
    title: "Install into an existing app",
    blocks: [
      {
        type: "link",
        note: "Clone the 15-minute path:",
        label: "samples/Playground",
        href: "https://github.com/nuvyntralabs/Plugin.Wpf.MVVMExpress/tree/main/samples/Playground",
      },
      {
        type: "code",
        code: `git clone https://github.com/nuvyntralabs/Plugin.Wpf.MVVMExpress.git`,
      },
      {
        type: "code",
        code: `dotnet add package Plugin.Wpf.MVVMExpress.Core
dotnet add package Plugin.Wpf.MVVMExpress
dotnet add package Plugin.Wpf.MVVMExpress.Navigation
dotnet add package Plugin.Wpf.MVVMExpress.Dialogs`,
      },
      {
        type: "p",
        text: "Plugin.Wpf.* restores from nuget.org. CI also publishes GitHub Packages. Add Validation, Pagination, and Testing only when the app uses those surfaces.",
      },
      {
        type: "code",
        code: `dotnet add package Plugin.Wpf.MVVMExpress.Validation
dotnet add package Plugin.Wpf.MVVMExpress.Pagination
dotnet add package Plugin.Wpf.MVVMExpress.Testing`,
      },
    ],
  },
  {
    id: "register",
    title: "Register the host",
    blocks: [
      {
        type: "p",
        text: "Shared libraries and tests call AddMvvmExpress. A WPF app calls UseWpfMvvmExpress (or AddWpfMvvmExpress on IServiceCollection), which registers Core services, replaces IMainThread with DispatcherMainThread, maps IWindowContext to WpfWindowContext, and auto-attaches Loaded / Unloaded lifecycle.",
      },
      {
        type: "code",
        code: `using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Plugin.Wpf.MVVMExpress.Hosting;
using Plugin.Wpf.MVVMExpress.Navigation;
using Plugin.Wpf.MVVMExpress.Dialogs;

public partial class App : Application
{
    private IHost? _host;

    private async void OnStartup(object sender, StartupEventArgs e)
    {
        var builder = Host.CreateApplicationBuilder();
        builder.Services.AddSingleton<IAuthState, DemoAuthState>();
        builder.Services.AddTransient<LoginViewModel>();
        builder.Services.AddTransient<HomeViewModel>();
        builder.Services.AddTransient<LoginPage>();
        builder.Services.AddTransient<HomePage>();
        builder.Services.AddSingleton<MainWindow>();
        builder.Services.UseWpfMvvmExpress(o => o
            .UseFrameNavigation((nav, _) => nav
                .Map<LoginViewModel, LoginPage>("login")
                .Map<HomeViewModel, HomePage>("home"))
            .UseDialogs()
            .UseAuth<LoginViewModel>());

        _host = builder.Build();
        await _host.StartAsync();
        _host.Services.GetRequiredService<MainWindow>().Show();
        await _host.Services.GetRequiredService<INavigator>()
            .ResetAsync<LoginViewModel>();
    }
}`,
      },
      {
        type: "code",
        code: `// net10.0 tests / shared ViewModel projects
services.AddMvvmExpress();
services.AddAuth<LoginViewModel>();`,
      },
      {
        type: "p",
        text: "UseFrameNavigation registers WpfFrameNavigator as INavigator / IPageNavigator. UseDialogs replaces NullDialogs with WpfDialogs and WpfNotifier. UseAuth<TChallenge>() wraps GuardedNavigator — call it after UseFrameNavigation. Do not reconstruct the guard. Put a Frame named NavigationHost in the window and wrap the tree in AdornerDecorator so toasts can draw without replacing Content.",
      },
      {
        type: "table",
        headers: ["Choose", "When"],
        rows: [
          [
            "UseFrameNavigation + ResetAsync / ReplaceRootAsync",
            "Login → home, or any app that must drop the Frame journal so Back cannot return to login.",
          ],
          [
            "Second Window + IWindowContext",
            "A tool or inspector window. Register the window, resolve a navigator for that context — do not share one Frame across windows.",
          ],
          [
            "Do not invent Shell",
            "There is no UseShell. In-place tabs are SectionHostViewModel + SectionHostView.",
          ],
        ],
      },
    ],
  },
  {
    id: "first-screen",
    title: "First screen",
    blocks: [
      {
        type: "p",
        text: "dotnet new wpf-mvvmexpress already ships this first screen. After UseWpfMvvmExpress above, a first page is a ViewModel, SetProperty, AsyncModelCommand, and a XAML bind. The command token is the ViewModel token — Dispose cancels ViewModelCancellationToken. Playground remains the cloneable 15-minute path in the product repo.",
      },
      {
        type: "code",
        code: `public sealed class HomeViewModel : PageViewModel
{
    private int _count;

    public HomeViewModel(INavigator navigator)
        : base(navigator)
    {
        IncrementCommand = new AsyncModelCommand(IncrementAsync);
    }

    public int Count
    {
        get => _count;
        private set => SetProperty(ref _count, value);
    }

    public AsyncModelCommand IncrementCommand { get; }

    private async Task IncrementAsync(CancellationToken cancellationToken)
    {
        await Task.Delay(80, cancellationToken);
        Count++;
    }
}`,
      },
      {
        type: "code",
        code: `<Page x:Class="MyApp.Pages.HomePage"
      xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
      xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
  <StackPanel Margin="24">
    <TextBlock Text="{Binding Count}" />
    <Button Content="Increment" Command="{Binding IncrementCommand}" />
  </StackPanel>
</Page>`,
      },
    ],
  },
  {
    id: "viewmodel",
    title: "First ViewModel",
    blocks: [
      {
        type: "p",
        text: "Inherit ViewModel. Bind AsyncState to the page. Put work on AsyncModelCommand so IsRunning, Cancel, and the ViewModel token stay aligned. Do not call MessageBox.Show or Frame.Navigate from the ViewModel.",
      },
      {
        type: "code",
        code: `using Plugin.Wpf.MVVMExpress.ComponentModel;
using Plugin.Wpf.MVVMExpress.Input;
using Plugin.Wpf.MVVMExpress.State;

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
        text: "Do not Add in a loop for mid or large lists. AddRange raises one CollectionChanged Reset. Large lists must also virtualize — VirtualizingStackPanel / VirtualizingPanel.IsVirtualizing. The framework will not pretend 100,000 realized rows are fine.",
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
    id: "navigation-howto",
    title: "Frame navigation",
    blocks: [
      {
        type: "p",
        text: "Add Plugin.Wpf.MVVMExpress.Navigation and call UseFrameNavigation(). Typed args use a record and IAcceptNavArgs<T>.Accept. URI / dictionary args use IAcceptNavQuery.",
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

await Navigator.NavigateToAsync<ProductDetailsViewModel, ProductDetailsArgs>(
    new ProductDetailsArgs(product.Id), ct);

await Navigator.NavigateToAsync(
    "details",
    new Dictionary<string, object> { ["ProductId"] = product.Id },
    cancellationToken: ct);`,
      },
      {
        type: "code",
        code: `builder.Services.UseWpfMvvmExpress(o => o
    .UseFrameNavigation((nav, _) => nav
        .Map<LoginViewModel, LoginPage>("login")
        .Map<HomeViewModel, HomePage>("home")
        .Map<DetailsViewModel, DetailsPage>("details"))
    .UseDialogs()
    .UseAuth<LoginViewModel>());

await Navigator.ResetAsync<HomeViewModel>(); // replace-root after login
await Navigator.NavigateToAsync<DetailsViewModel, DetailsArgs>(new(id));

if (pages.CanGoBack)
    await pages.GoBackAsync();
await pages.PopToRootAsync();
await pages.ReplaceRootAsync<HomeViewModel>();`,
      },
    ],
  },
  {
    id: "dialogs",
    title: "Dialogs",
    blocks: [
      {
        type: "p",
        text: "Add Plugin.Wpf.MVVMExpress.Dialogs and call UseDialogs() on UseWpfMvvmExpress. Inject IDialogs for alerts/confirm and INotifier for toast. WpfDialogs hops to IMainThread like WpfNotifier. WpfToastPresenter draws on AdornerLayer — it never wraps or replaces Window.Content, so ResetAsync cannot restore a stale tree. Wrap MainWindow content in AdornerDecorator. Tests use FakeDialogs.",
      },
      {
        type: "code",
        code: `public sealed class ProductEditViewModel : PageViewModel
{
    public ProductEditViewModel(IDialogs dialogs, INotifier notifier)
        : base(navigator: null, dialogs)
    {
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
        text: "Plugin.Wpf.MVVMExpress.Validation ships DataAnnotations plus IValidator and MustMatchAttribute. The package includes ILLink.Descriptors.xml that roots Required, MinLength, MaxLength, StringLength, Range, RegularExpression, EmailAddress, Compare, and MustMatch. Custom attributes need an app-level descriptor. FluentValidation is an adapter the app may add. WPF bindings use WpfFormViewModel (INotifyDataErrorInfo) with ValidatesOnNotifyDataErrors=True.",
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
        text: "FormViewModel lives in Core and does not reference WPF. WpfFormViewModel adds INotifyDataErrorInfo. Field(name, value) creates a FormField<T>. Bind(field, propertyName, notifyCanExecute) wires the public property and CanExecute. When IDialogs is registered, leaving a dirty form confirms “Discard changes?”. Tests set DirtyNavigation = DirtyNavigationMode.SilentBlock. SubmitAsync(work) calls MarkClean() on success.",
      },
      {
        type: "code",
        code: `public sealed class ProductEditViewModel : WpfFormViewModel
{
    private readonly FormField<string> _name;

    public ProductEditViewModel()
    {
        _name = Field("Name", "");
        Bind(_name, nameof(Name), () => SaveCommand.NotifyCanExecuteChanged());
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
    id: "pagination",
    title: "Pagination and search",
    blocks: [
      {
        type: "p",
        text: "PagedCollection<T> / DelegatePagedCollection<T> own load-more, refresh, and retry — not a live inbox. SnapshotCollection<T> loads once in InitializeAsync; later LoadAsync calls are no-ops unless force is true. SearchQuery.Text binds to a TextBox or MvvmSearch; filter from CommittedText after debounce.",
      },
      {
        type: "code",
        code: `public sealed class InboxViewModel : ViewModel
{
    public SnapshotCollection<Conversation> Inbox { get; }
    public SearchQuery Search { get; } = new();

    public InboxViewModel(IInbox catalog)
    {
        Inbox = new SnapshotCollection<Conversation>(
            ct => catalog.ListAsync(Search.CommittedText, ct));
    }

    protected override Task InitializeAsync(CancellationToken cancellationToken) =>
        Inbox.LoadAsync(cancellationToken: cancellationToken);
}

await Products.RefreshAsync(ct);
await Products.LoadMoreAsync(ct);`,
      },
    ],
  },
  {
    id: "chat-host",
    title: "Chat-style host",
    blocks: [
      {
        type: "p",
        text: "A desktop messenger is one persistent window, in-place tabs, a filterable inbox, and a thread on the Frame stack. Bind SectionHostView to the host ViewModel — do not write visibility flippers in code-behind. Auth and forms stay on FormViewModel / IAuthState / UseAuth.",
      },
      {
        type: "code",
        code: `builder.Services.UseWpfMvvmExpress(o => o
    .UseFrameNavigation((nav, _) => nav
        .Map<LoginViewModel, LoginPage>("login")
        .Map<ChatHostViewModel, ChatHostPage>("chats")
        .Map<ChatThreadViewModel, ChatThreadPage>("thread"))
    .UseDialogs()
    .UseAuth<LoginViewModel>());

await Navigator.ResetAsync<ChatHostViewModel>();
await Navigator.NavigateToAsync<ChatThreadViewModel, ChatNavArgs>(new(id));`,
      },
      {
        type: "code",
        code: `public sealed class ChatHostViewModel : SectionHostViewModel
{
    public ChatHostViewModel()
    {
        Inbox = Add("chats", new ChatInboxViewModel(seed));
        Add("updates", new ChatInboxViewModel([]));
    }

    public ChatInboxViewModel Inbox { get; }
}

// Bind SectionHostView. DataContext is the host; Current is the visible child.`,
      },
    ],
  },
  {
    id: "auth-offline",
    title: "Auth adapters",
    blocks: [
      {
        type: "p",
        text: "In-memory IAuthState exists for samples and tests. Production apps register their own IAuthState. AddSecureSessionAuth() in Core fails closed unless you supply a factory — there is no UseSecureSessionAuth() host helper and no Plugin.Maui.SecureSession PackageReference. GuardedNavigator remains the implementation; UseAuth is the getting-started API.",
      },
      {
        type: "code",
        code: `builder.Services.AddSingleton<IAuthState, DemoAuthState>();
builder.Services.UseWpfMvvmExpress(o => o
    .UseFrameNavigation()
    .UseDialogs()
    .UseAuth<LoginViewModel>());

await Navigator.ResetAsync<HomeViewModel>();  // after sign-in
await Navigator.ResetAsync<LoginViewModel>(); // after sign-out`,
      },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    blocks: [
      {
        type: "p",
        text: "Plugin.Wpf.MVVMExpress.Testing is net10.0. ViewModels in the template live in a shared net10.0 project so they can be tested without WPF. FakeNavigator is InMemoryNavigator — assert Current, Stack, and CanGoBack. LeakProbe.Track returns a WeakReference; IsCollected takes that reference. Drop the strong reference before the assert. AppearAsync / DisappearAsync drive lifecycle without a page. ScopedNavigator covers page-scope push/pop GC.",
      },
      {
        type: "code",
        code: `[Fact]
public async Task OpenDetails_pushes_details()
{
    var navigator = new FakeNavigator()
        .Map<ProductDetailsViewModel>("details");
    var vm = new ProductListViewModel(navigator);

    await vm.AppearAsync();
    await vm.OpenDetailsAsync(42);

    Assert.Equal(typeof(ProductDetailsViewModel), navigator.Current);
    Assert.True(navigator.CanGoBack);
}

[Fact]
public void Dispose_makes_the_viewmodel_collectable()
{
    Assert.True(LeakProbe.IsCollected(CreateAndDispose()));
}

static WeakReference CreateAndDispose()
{
    var vm = new HomeViewModel();
    var leak = LeakProbe.Track(vm);
    vm.Dispose();
    return leak;
}`,
      },
    ],
  },
  {
    id: "samples",
    title: "Sample map",
    blocks: [
      {
        type: "p",
        text: "There is no separate WPF SampleApp repository. New apps start with dotnet new wpf-mvvmexpress. The 15-minute path is Playground (command, navigation, dialog, form, auth, list, second window).",
      },
      {
        type: "link",
        note: "Clone and run:",
        label: "samples/Playground",
        href: "https://github.com/nuvyntralabs/Plugin.Wpf.MVVMExpress/tree/main/samples/Playground",
      },
      {
        type: "table",
        headers: ["Sample", "ViewModels", "What it integrates"],
        rows: [
          ["dotnet new wpf-mvvmexpress", "Login / Home / Details / Edit", "Scaffolded host: Frame, replace-root, form, tests"],
          ["Playground", "Login / Home / Details / Edit", "15-minute path: UseAuth, command, nav, dialog, form, list, second window"],
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
          "Do not call MessageBox.Show or Frame.Navigate from a ViewModel. Use IDialogs and INavigator.",
          "Do not Add in a loop for mid or large lists. Use AddRange / ReplaceRange.",
          "Do not capture this in a MessageHub handler. Use the recipient argument.",
          "Do not bind a non-virtualized panel to thousands of rows.",
          "Do not store tokens on the ViewModel. Register an IAuthState adapter.",
          "Do not invent a Shell host. Use Frame + SectionHostView.",
          "Do not reconstruct GuardedNavigator after UseFrameNavigation. Call UseAuth<TChallenge>().",
          "Do not ConfigureAwait(false) then new Page() or Frame.Navigate. Navigators hop to IMainThread first.",
          "Do not omit AdornerDecorator — toasts have nowhere to draw.",
          "Do not name the Frame something other than NavigationHost unless you pass a custom frame accessor.",
          "Do not add a PackageReference to Plugin.Maui.MVVMExpress.*. This is an independent family.",
          "Do not mix Dispatcher.CurrentDispatcher statics in ViewModels. IMainThread is the only marshal API.",
          "Hand-written SetProperty and Map<TViewModel, TView> are the 1.0 path. Generators are out of 1.0.",
        ],
      },
    ],
  },
];

export function wpfSection(id: string, from: DocSection[] = wpfTechnicalSections): DocSection {
  const match = from.find((item) => item.id === id);
  if (!match) {
    throw new Error(`Missing WPF MVVMExpress doc section: ${id}`);
  }
  return match;
}

export function wpfIntegrationSection(id: string): DocSection {
  return wpfSection(id, wpfIntegrationSections);
}
