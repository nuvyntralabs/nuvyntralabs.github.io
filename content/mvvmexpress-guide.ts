import type { DocSection } from "@/content/mvvmexpress";
import { comparisonHref } from "@/content/mvvmexpress-comparison";
import { integrationSections, mvvmExpressSlug, technicalSections } from "@/content/mvvmexpress";

export const docsBase = `/packages/${mvvmExpressSlug}/docs`;
export const integrationHref = `/packages/${mvvmExpressSlug}/integration/`;
export { comparisonHref };

function section(id: string, from: DocSection[] = technicalSections): DocSection {
  const match = from.find((item) => item.id === id);
  if (!match) {
    throw new Error(`Missing MVVMExpress doc section: ${id}`);
  }
  return match;
}

export interface GuideNavItem {
  title: string;
  href: string;
  topic?: string;
}

export interface GuideNavGroup {
  id: string;
  title: string;
  items: GuideNavItem[];
}

export interface GuideTopic {
  slug: string;
  title: string;
  description: string;
  sections: DocSection[];
}

export const guideNav: GuideNavGroup[] = [
  {
    id: "start",
    title: "Start here",
    items: [
      { title: "Introduction", href: `${docsBase}/` },
      { title: "Getting started", href: integrationHref },
      { title: "Comparison", href: comparisonHref },
    ],
  },
  {
    id: "model",
    title: "Application model",
    items: [
      { title: "ViewModels", href: `${docsBase}/viewmodels/`, topic: "viewmodels" },
      { title: "Commands", href: `${docsBase}/commands/`, topic: "commands" },
      { title: "Dependency injection", href: `${docsBase}/dependency-injection/`, topic: "dependency-injection" },
      { title: "Messaging", href: `${docsBase}/messaging/`, topic: "messaging" },
      { title: "Reactive", href: `${docsBase}/reactive/`, topic: "reactive" },
    ],
  },
  {
    id: "shell",
    title: "Application shell",
    items: [
      { title: "Navigation", href: `${docsBase}/navigation/`, topic: "navigation" },
      { title: "Chat host", href: `${docsBase}/chat-host/`, topic: "chat-host" },
      { title: "Dialogs", href: `${docsBase}/dialogs/`, topic: "dialogs" },
      { title: "Validation", href: `${docsBase}/validation/`, topic: "validation" },
      { title: "Forms", href: `${docsBase}/forms/`, topic: "forms" },
      { title: "Lists and search", href: `${docsBase}/lists/`, topic: "lists" },
    ],
  },
  {
    id: "compose",
    title: "Composition",
    items: [
      { title: "Packages", href: `${docsBase}/packages/`, topic: "packages" },
      { title: "Adapters", href: `${docsBase}/adapters/`, topic: "adapters" },
      { title: "Platforms", href: `${docsBase}/platforms/`, topic: "platforms" },
    ],
  },
  {
    id: "internals",
    title: "Internals",
    items: [
      { title: "Operation pipeline", href: `${docsBase}/pipeline/`, topic: "pipeline" },
      { title: "Testing", href: `${docsBase}/testing/`, topic: "testing" },
      { title: "Memory and scale", href: `${docsBase}/memory/`, topic: "memory" },
    ],
  },
  {
    id: "release",
    title: "Release",
    items: [
      { title: "Source generators", href: `${docsBase}/generators/`, topic: "generators" },
      { title: "Roadmap", href: `${docsBase}/roadmap/`, topic: "roadmap" },
    ],
  },
];

const introSections: DocSection[] = [
  section("status"),
  {
    id: "license",
    title: "License",
    blocks: [
      {
        type: "p",
        text: "MVVMExpress is MIT licensed. There is no community-versus-commercial split and no revenue threshold. You may use the packages in commercial apps without a paid framework license. The SPDX identifier is MIT; LICENSE lives at the repository root and is packed with each nupkg.",
      },
      {
        type: "p",
        text: "That is a product choice, not a jab at other frameworks. If you already pay for a commercial MVVM stack, keep it. MVVMExpress exists so a MAUI team can take ViewModels, async state, and Shell or page navigation without a second license conversation.",
      },
    ],
  },
  section("why"),
  section("principles"),
  {
    id: "how-to-read",
    title: "How to read these docs",
    blocks: [
      {
        type: "p",
        text: "The left nav follows the surfaces a production MAUI app actually touches. Start here for the contract. Getting started is the install-and-wire path. Comparison evaluates CommunityToolkit.Mvvm, Prism.Maui, and ReactiveUI. Application model covers ViewModels, commands, DI, messaging, and Reactive. Application shell covers navigation, chat host, dialogs, validation, forms, and lists. Composition and internals explain packages, adapters, platforms, the operation pipeline, tests, and scale. Release covers generators and the shipped roadmap.",
      },
      {
        type: "ul",
        items: [
          "Shipped in 1.0.0 means types exist and tests exist. Phases 1–7 plus UseAuth, the host-safe navigator, NavigationPage replace-root, and chat-host APIs are complete.",
          "1.0.0 is the SemVer lock. Known limitations are accepted 1.0 scope, not remaining product work. Next work is Phase 8 (1.1.0).",
          "Type names stay unique so CommunityToolkit.Mvvm or Prism can sit in the same app if you need them.",
        ],
      },
    ],
  },
  section("naming"),
  section("comparison"),
];

export const guideTopics: GuideTopic[] = [
  {
    slug: "introduction",
    title: "Introduction",
    description:
      "What MVVMExpress is, why it exists, the MIT license, design principles, and how these docs are organized.",
    sections: introSections,
  },
  {
    slug: "viewmodels",
    title: "ViewModels",
    description:
      "ObservableModel, ViewModel lifecycle, PageViewModel, AsyncState, and Outcome — the bindable unit of work.",
    sections: [
      {
        id: "observable",
        title: "ObservableModel",
        blocks: [
          {
            type: "p",
            text: "ObservableModel is the INPC / INPChanging base. SetProperty compares with EqualityComparer<T>.Default and exits without raising events when the value is unchanged. PropertyChangedEventArgs are cached by property name so a hot bind path does not allocate a new args object on every raise.",
          },
          {
            type: "p",
            text: "NotifyDependsOn raises a named set of dependents. Prefer that over PropertyChanged(null), which forces every binding to refresh. Hand-write the field and the property, or mark a partial class with [Notify] / [NotifyAlso] from the SourceGenerators package.",
          },
          {
            type: "code",
            code: `public sealed class CounterViewModel : ViewModel
{
    private int _count;

    public int Count
    {
        get => _count;
        set
        {
            if (SetProperty(ref _count, value))
            {
                NotifyDependsOn(nameof(Count), nameof(Label));
            }
        }
    }

    public string Label => $"Count {Count}";
}`,
          },
        ],
      },
      {
        id: "lifecycle",
        title: "ViewModel lifecycle",
        blocks: [
          {
            type: "p",
            text: "ViewModel adds Status, IsBusy, ViewModelCancellationToken, InitializeAsync, OnAppearingAsync, OnDisappearingAsync, and ExecuteAsync. The token is created in the constructor and cancelled on Dispose. After dispose the token stays readable — IsCancellationRequested is true — so late continuations can still observe cancel.",
          },
          {
            type: "code",
            code: `Construct (DI)
  → Accept(args) / Accept(query)    IAcceptNavArgs / IAcceptNavQuery
  → InitializeAsync(token)          once
  → OnNavigatedToAsync(token)
  → OnAppearingAsync(token)
  → OnDisappearingAsync(token)
  → OnNavigatedFromAsync(token)
  → Dispose                         cancels ViewModelCancellationToken`,
          },
          {
            type: "p",
            text: "PageViewModel implements INavigable and optionally holds INavigator and IDialogs. The page owns BindingContext. The ViewModel never holds Page. ViewModelLifecycleBehavior in the host package calls appear / disappear and unsubscribes on Unloaded.",
          },
          {
            type: "callout",
            title: "Lifecycle attachment",
            text: "AutoAttachLifecycle (default true) attaches ViewModelLifecycleBehavior to pages. CancelOperationsOnDisappear is stored; the current behavior calls OnDisappearingAsync and does not cancel the token on disappear. Dispose is the guaranteed cancel path. Host also ships BusyOverlayBehavior and AsyncStateView.",
          },
        ],
      },
      {
        id: "state",
        title: "AsyncState and Outcome",
        blocks: [
          {
            type: "p",
            text: "AsyncState<T> is the bindable UI status object: Status, Data, Error, Exception, Timestamp, plus IsLoading, IsRefreshing, IsEmpty, HasError, and IsSuccess. ViewModelStatus values are Idle, Loading, Refreshing, Saving, Success, Empty, Error, Offline, Unauthorized, and Cancelled. LoadAsync and RefreshAsync return Outcome<T>. The host package ships AsyncStateView to swap loading / empty / error / success templates.",
          },
          {
            type: "p",
            text: "Outcome / Outcome<T> is the library result type — success or failure with code, message, exception, validation, and metadata. The name is Outcome so it does not collide with FluentResults, LanguageExt, or an app-level Result<T>.",
          },
          {
            type: "code",
            code: `public AsyncState<IReadOnlyList<Product>> Products { get; } = new();

await Products.LoadAsync(token => catalog.ListAsync(token), ct);
// bind ItemsSource to Products.Data
// bind IsRefreshing to Products.IsRefreshing`,
          },
        ],
      },
    ],
  },
  {
    slug: "commands",
    title: "Commands",
    description:
      "ModelCommand and AsyncModelCommand: CanExecute, concurrency, timeout, retry, and how they sit on the operation pipeline.",
    sections: [
      {
        id: "why",
        title: "Why commands live on the ViewModel",
        blocks: [
          {
            type: "p",
            text: "A command is the ViewModel-facing handle for a user action. The page binds Button.Command; the ViewModel owns the work, CanExecute, and cancellation. That keeps code-behind empty and lets tests call ExecuteAsync without a visual tree.",
          },
          {
            type: "ul",
            items: [
              "ModelCommand / ModelCommand<T> — synchronous ICommand; weak CanExecuteChanged.",
              "AsyncModelCommand / AsyncModelCommand<T> — async, IsRunning, Cancel, ExecuteAsync; weak CanExecuteChanged.",
              "ICommand.Execute never throws. Failures go to IErrorSink / IDialogs. ExecuteAsync still rethrows.",
              "CanExecuteChanged, IsRunning, and State raise on IMainThread (0.6.0+). Bind Button.Command only on 0.6.0+.",
            ],
          },
        ],
      },
      {
        id: "async",
        title: "AsyncModelCommand",
        blocks: [
          {
            type: "p",
            text: "AsyncModelCommand runs through IOperationExecutor: CanExecute, a concurrency gate, optional timeout, optional retry, optional debounce / throttle, then the delegate. IsRunning is atomic. Cancel and ViewModel.Dispose cancel in-flight work. ConcurrencyMode values are Prevent, CancelPrevious, Queue, Allow, and Replace.",
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
          {
            type: "callout",
            title: "Search vs command debounce",
            text: "AsyncCommandOptions.Debounce and Throttle apply to the command itself. SearchQuery still owns text-search debounce (default 300 ms, minimum length 2) and cancels the previous query.",
          },
        ],
      },
      {
        id: "binding",
        title: "Binding and CanExecute",
        blocks: [
          {
            type: "p",
            text: "Call NotifyCanExecuteChanged when the condition changes (a property setter, a navigation stack change, an auth flip). CanExecuteChanged is a weak event so a Button on a popped page does not pin the command. Do not allocate a new command per execute. Do not store a static command on a long-lived service — that pins the ViewModel graph.",
          },
        ],
      },
    ],
  },
  {
    slug: "dependency-injection",
    title: "Dependency injection",
    description:
      "AddMvvmExpress and UseMvvmExpress, what the host registers, and how the app replaces navigators and dialogs.",
    sections: [
      {
        id: "host",
        title: "Host registration",
        blocks: [
          {
            type: "p",
            text: "MVVMExpress uses Microsoft.Extensions.DependencyInjection only. There is no DryIoc, Unity, or Grace package. Shared libraries and tests call AddMvvmExpress. A MAUI app calls UseMvvmExpress, which registers Core services, replaces IMainThread with MauiMainThread, marshals command/property notifications, and auto-attaches ViewModelLifecycleBehavior.",
          },
          {
            type: "code",
            code: `builder
    .UseMauiApp<App>()
    .UseMvvmExpress(o => o
        .UseNavigationPage()
        .UseDialogs()
        .UseAuth<LoginViewModel>());
// optional catalog path:
// .UseMvvmExpress(o => o.UseShell().UseDialogs().UseAuth<LoginViewModel>());

// net10.0 tests / shared ViewModel projects
services.AddMvvmExpress();
services.AddAuth<LoginViewModel>();`,
          },
          {
            type: "p",
            text: "UseNavigationPage is the login → replace-root → push host. UseShell is optional. UseDialogs lives in the Dialogs package. MvvmExpressOptions also has CancelOperationsOnDisappear, EnableDiagnostics, MarshalNotifications (default true), AutoAttachLifecycle, ConfirmDirtyNavigation, ForwardNavigationFailures, and ApplyGeneratedRegistrations. Call InitializeComponent() on App before resolving pages. Do not mix MAUI MainThread statics in ViewModels.",
          },
        ],
      },
      {
        id: "defaults",
        title: "What AddMvvmExpress registers",
        blocks: [
          {
            type: "table",
            headers: ["Abstraction", "Default", "Typical app replacement"],
            rows: [
              ["IMessageHub", "MessageHub", "Keep"],
              ["IBusyGate", "BusyGate", "Keep"],
              ["IErrorSink", "NullErrorSink", "App logger sink"],
              ["ICache / ICachedFetcher", "MemoryCache / CachedFetcher", "Plugin.Maui.ApiCache adapter"],
              ["IConnectivityProbe", "InMemoryConnectivityProbe", "Plugin.Maui.NetworkMonitor adapter"],
              ["IOperationExecutor", "OperationExecutor", "Keep"],
              ["IViewModelScopeFactory", "ServiceViewModelScopeFactory", "Keep"],
              ["IFeatureSwitch", "MemoryFeatureSwitch", "Plugin.Maui.FeatureFlags adapter"],
              ["IStateStore", "MemoryStateStore", "App persist store"],
              ["IWindowContext", "WindowContext.Default", "MauiWindowContext.Current"],
              ["IWindowNavigatorRegistry", "WindowNavigatorRegistry", "Keep; register per window"],
              ["INavigator / IPageNavigator", "InMemoryNavigator", "UseNavigationPage() / UseShell()"],
              ["IMainThread", "ImmediateMainThread", "MauiMainThread (host)"],
              ["IDialogs / INotifier", "NullDialogs", "UseDialogs() → MauiDialogs / MauiNotifier"],
              ["IAuthState", "not registered", "UseAuth + Plugin.Maui.SecureSession adapter"],
              ["IAccountService", "not registered", "App register / reset adapter"],
            ],
          },
        ],
      },
      {
        id: "replace",
        title: "Replace defaults in the MAUI host",
        blocks: [
          {
            type: "p",
            text: "UseNavigationPage / UseDialogs replace the in-memory defaults. UseAuth<TChallenge>() wraps GuardedNavigator when screens require a session — do not RemoveAll and reconstruct the guard. Do not register UseShell and UseNavigationPage together unless you really have two hosts.",
          },
          {
            type: "code",
            code: `builder.UseMvvmExpress(o => o
    .UseNavigationPage((nav, _) => nav
        .Map<LoginViewModel, LoginPage>("login")
        .Map<ChatHostViewModel, ChatHostPage>("chats"))
    .UseDialogs()
    .UseAuth<AuthLoginViewModel>());

services.AddSingleton<IAuthState>(sp =>
    new SecureSessionAuthState(sp.GetRequiredService<ISecureSession>()));

services.RemoveAll<IPageNavigator>();
services.AddSingleton<IPageNavigator>(sp =>
    new MauiPageNavigator(MauiWindowContext.Current, sp)
        .Map<PageStackViewModel, PageStackPage>("stack"));`,
          },
        ],
      },
    ],
  },
  {
    slug: "messaging",
    title: "Messaging",
    description:
      "IMessageHub: weak subscribe by default, recipient-first handlers, and when to use a command or a service instead.",
    sections: [
      {
        id: "hub",
        title: "IMessageHub",
        blocks: [
          {
            type: "p",
            text: "IMessageHub is the in-process pub/sub for ViewModels that should not hold each other. Default subscribe is weak. The handler signature is Action<TRecipient, TMessage> so the delegate receives the subscriber as an argument and does not capture this. Strong subscribe is explicit and you own Unsubscribe / Dispose.",
          },
          {
            type: "code",
            code: `hub.Subscribe<HomeViewModel, CartChanged>(
    this,
    static (vm, _) => vm.Refresh(),
    weak: true);

hub.Publish(new CartChanged(productId));`,
          },
          {
            type: "callout",
            title: "Do not capture this",
            text: "A handler written as (msg) => this.Refresh() pins the ViewModel and defeats the weak table. Use the recipient argument. Static lambdas make that rule visible to the compiler.",
          },
        ],
      },
      {
        id: "when",
        title: "When not to use the hub",
        blocks: [
          {
            type: "ul",
            items: [
              "Parent → child work that has a clear owner: inject a service or call a method.",
              "Navigation: use INavigator, not a “please open details” message.",
              "Auth gates: GuardedNavigator + IAuthState, not a login broadcast as the only lock.",
              "High-frequency sensor ticks: a typed service or AsyncState, not a message per sample.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "reactive",
    title: "Reactive",
    description:
      "IPropertyObservable and CombineLatest without System.Reactive. Core stays Rx-free.",
    sections: [section("reactive", integrationSections)],
  },
  {
    slug: "navigation",
    title: "Navigation",
    description:
      "UseNavigationPage or optional UseShell, UI-thread page construction, typed records, URI query, replace-root, and guards.",
    sections: [
      {
        id: "contract",
        title: "INavigator",
        blocks: [
          {
            type: "p",
            text: "INavigator is host-agnostic. ViewModels depend on the interface, never on Shell.Current or INavigation. Every public method returns Outcome and accepts CancellationToken. Current is Type? (the last ViewModel type), not an object instance.",
          },
          {
            type: "ul",
            items: [
              "NavigateToAsync<TViewModel>() — AOT-friendly typed go.",
              "NavigateToAsync<TViewModel, TArgs>(TArgs) — record args; destination implements IAcceptNavArgs<T>.",
              "NavigateToAsync(route, query, options) — URI path + dictionary; destination implements IAcceptNavQuery.",
              "GoBackAsync, PopToRootAsync, ReplaceAsync<T>, ResetAsync<T> / ReplaceRootAsync<T>.",
              "Stack, ModalStack, CanGoBack, History.",
            ],
          },
        ],
      },
      {
        id: "hosts",
        title: "Shell and page hosts",
        blocks: [
          {
            type: "p",
            text: "UseNavigationPage registers MauiPageNavigator as INavigator / IPageNavigator and hops to IMainThread before new Page(). ResetAsync / ReplaceRootAsync replace window.Page with a NavigationPage. UseShell is optional. MauiVisualTree unwraps NavigationPage.CurrentPage so guards see the visible BindingContext. Register one navigator per IWindowContext.",
          },
          {
            type: "code",
            code: `var shell = new MauiShellNavigator()
    .Map<ProductListViewModel>("//products")
    .Map<ProductDetailsViewModel>("details");

await shell.NavigateToAsync<ProductDetailsViewModel, ProductDetailsArgs>(new(42));
await shell.NavigateToAsync("details", new Dictionary<string, object> { ["ProductId"] = 42 });

IPageNavigator pages = new MauiPageNavigator(new WindowContext("main"), services)
    .Map<PageStackViewModel, PageStackPage>("stack")
    .Map<PageStackItemViewModel, PageStackItemPage>("stack-item");

await pages.NavigateToAsync("stack-item", new Dictionary<string, object> { ["Title"] = "Latte" });
if (pages.CanGoBack)
    await pages.GoBackAsync();
await pages.PopToRootAsync();`,
          },
        ],
      },
      {
        id: "args",
        title: "Typed args and URI query",
        blocks: [
          {
            type: "p",
            text: "Accept runs before InitializeAsync / OnNavigatedToAsync. Typed records are the default. URI / dictionary exists for deep links and interop — NavigationRouteTable.FormatQuery / ParseQuery / Split. There is no INavigationParameters type.",
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
}`,
          },
        ],
      },
      {
        id: "guards",
        title: "Guards and auth",
        blocks: [
          {
            type: "p",
            text: "Dirty forms confirm “Discard changes?” via IDialogs when DirtyNavigation is Confirm (default). Tests set DirtyNavigationMode.SilentBlock. UseAuth<TChallenge>() opens the challenge ViewModel on E_AUTH and resumes the original route after IAuthState.Changed. [RequiresAuth] / [RequiresRole] feed INavigationAuthPolicy via the generated ModuleInitializer.",
          },
          {
            type: "p",
            text: "Apps that must not leak a back-stack use ResetAsync / ReplaceRootAsync. On UseNavigationPage that replaces window.Page with a NavigationPage. On Shell, ResetAsync only works when //home is a root ShellContent (see AuthApp). Child ViewModels attach through IViewModelComposer.Attach. Deep-link mapping is a sample DeepLinkRouteMap — compose Plugin.Maui.DeepLinks in production. MVVMExpress does not ship Prism-style regions.",
          },
        ],
      },
    ],
  },
  {
    slug: "chat-host",
    title: "Chat host",
    description:
      "NavigationPage replace-root, SectionHostViewModel tabs, SnapshotCollection, and SearchQuery.CommittedText.",
    sections: [section("chat-host", integrationSections)],
  },
  {
    slug: "dialogs",
    title: "Dialogs",
    description:
      "IDialogs for alert / confirm / error, INotifier toast, Maui implementations, and test fakes.",
    sections: [
      {
        id: "surface",
        title: "Shipped surface",
        blocks: [
          {
            type: "p",
            text: "ViewModels depend on IDialogs and INotifier, never on Page.DisplayAlert. UseDialogs() registers MauiDialogs and MauiNotifier. Both hop to IMainThread. MauiToastPresenter draws on Window.AddOverlay and never wraps or replaces Page.Content.",
          },
          {
            type: "table",
            headers: ["API", "Status"],
            rows: [
              ["AlertAsync, ConfirmAsync, ErrorAsync", "Shipped — marshalled to IMainThread"],
              ["ToastAsync (INotifier)", "Shipped — Window.AddOverlay"],
              ["IToastPresenter", "Shipped — test seam"],
              ["Prompt, action sheet, loading overlay, snackbar, banner", "Not shipped"],
            ],
          },
          {
            type: "code",
            code: `var ok = await dialogs.ConfirmAsync(
    "Delete product",
    "This cannot be undone.",
    accept: "Delete",
    cancel: "Cancel",
    cancellationToken);

if (ok)
{
    await catalog.DeleteAsync(id, cancellationToken);
    await notifier.ToastAsync("Deleted", cancellationToken: cancellationToken);
}`,
          },
        ],
      },
      {
        id: "tests",
        title: "Tests",
        blocks: [
          {
            type: "p",
            text: "NullDialogs implements both interfaces as no-ops. FakeDialogs records alerts and lets the test set ConfirmResult. There is no FakeNotifier type — FakeDialogs is INotifier. Inject IToastPresenter to record toasts without a window.",
          },
        ],
      },
    ],
  },
  {
    slug: "validation",
    title: "Validation",
    description:
      "IValidator and DataAnnotations in the Validation package; FluentValidation and XAML Validation.For stay optional.",
    sections: [
      {
        id: "engine",
        title: "IValidator",
        blocks: [
          {
            type: "p",
            text: "Plugin.Maui.MVVMExpress.Validation targets net10.0 and depends on Core only. DataAnnotationsValidator is the default. FluentValidation is an adapter the app may add — it is not a PackageReference of the Validation package.",
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
          {
            type: "p",
            text: "XAML Validation.For remains Plugin.Maui.FormValidation. FormViewModel, FormField, dirty state, and undo/redo ship in Core — see Forms.",
          },
        ],
      },
    ],
  },
  {
    slug: "forms",
    title: "Forms",
    description:
      "FormViewModel, FormField, dirty navigation guard, and undo / redo — Core types, no MAUI.",
    sections: [section("forms", integrationSections)],
  },
  {
    slug: "lists",
    title: "Lists and search",
    description:
      "ObservableRangeCollection, SnapshotCollection for live inboxes, PagedCollection for catalogs, and SearchQuery.CommittedText.",
    sections: [
      {
        id: "range",
        title: "ObservableRangeCollection",
        blocks: [
          {
            type: "p",
            text: "AddRange and ReplaceRange raise one CollectionChanged Reset. Do not Add in a loop for mid or large lists. Large lists must also virtualize in CollectionView. After a page is visible, prefer Add / Insert over ReplaceRange on Android BindableLayout.",
          },
          {
            type: "code",
            code: `var items = new ObservableRangeCollection<Product>();
items.AddRange(page);
items.ReplaceRange(next);`,
          },
        ],
      },
      {
        id: "paging",
        title: "Pagination, snapshots, and search",
        blocks: section("pagination", integrationSections).blocks,
      },
    ],
  },
  {
    slug: "packages",
    title: "Packages",
    description:
      "How the family is split, what is packed in 1.0.0, and why optional packages stay optional.",
    sections: [
      section("packages"),
      {
        id: "optional",
        title: "Optional means optional",
        blocks: [
          {
            type: "p",
            text: "A shared ViewModel library can reference Core only. A MAUI host adds Plugin.Maui.MVVMExpress. Navigation, Dialogs, Validation, Pagination, Reactive, SourceGenerators, Compatibility, and Testing are separate nupkgs.",
          },
          {
            type: "p",
            text: "There is no IModule catalog, no module loader, and no region manager. Feature slices of the app are ordinary class libraries that register services on IServiceCollection. UseMvvmExpress applies generated [Route] / [RequiresAuth] via a ModuleInitializer; AddGeneratedViewModels remains an explicit AOT path.",
          },
        ],
      },
    ],
  },
  {
    slug: "adapters",
    title: "Adapters",
    description:
      "Compose MauiEssentials plugins through Core abstractions. Sibling packages are never PackageReferences of MVVMExpress.",
    sections: [
      section("compose"),
      {
        id: "why-adapt",
        title: "Why adapters, not engines",
        blocks: [
          {
            type: "p",
            text: "Captive-portal detection, HTTP cache, offline sync, secure tokens, and feature flags are already solved in focused plugins. MVVMExpress owns the ViewModel contract (IConnectivityProbe, ICache, IAuthState) and lets the app plug the engine. In-memory implementations exist for samples and tests only.",
          },
          {
            type: "p",
            text: "These are Niladri Padhy / MauiEssentials / Nuvyntra Labs packages. Usual alternatives: MAUI Connectivity, CommunityToolkit.Maui, Polly, SecureStorage, a remote-config SDK.",
          },
        ],
      },
    ],
  },
  {
    slug: "platforms",
    title: "Platforms",
    description:
      "net10.0 Core, Android and iOS as catalog-primary hosts, threading, AOT, and security boundaries.",
    sections: [
      {
        id: "tfms",
        title: "Target frameworks",
        blocks: [
          {
            type: "table",
            headers: ["Package", "TFMs", "MAUI?"],
            rows: [
              ["Core, Validation, Pagination, Testing, Reactive, Compatibility", "net10.0", "No"],
              ["Host, Navigation, Dialogs", "net10.0, net10.0-android (API 21+), net10.0-ios (iOS 15+); Mac Catalyst / Windows compile-only", "Yes"],
              ["SourceGenerators", "Roslyn analyzer / generator", "—"],
            ],
          },
          {
            type: "p",
            text: "Catalog-primary is Android and iOS. Mac Catalyst and Windows compile TFMs exist on Host / Navigation / Dialogs and are compile-only. Host APIs that need a window throw FeatureNotSupportedException on the net10.0 TFM.",
          },
        ],
      },
      section("constraints"),
      section("not-public"),
    ],
  },
  {
    slug: "pipeline",
    title: "Operation pipeline",
    description:
      "IOperationExecutor: busy, cancel, timeout, retry, debounce, throttle, queue, and Outcome on one entry.",
    sections: [
      {
        id: "today",
        title: "IOperationExecutor",
        blocks: [
          {
            type: "p",
            text: "AddMvvmExpress registers OperationExecutor. AsyncModelCommand, ExecuteBusyAsync, and app services can share one pipeline: busy + cancellation + timeout + retry + debounce / throttle + concurrency + Outcome. That is not a Polly clone and not a ReactiveCommand clone. HTTP resilience still belongs in Plugin.Maui.ApiResilience.",
          },
          {
            type: "code",
            code: `CanExecute
  → concurrency (Prevent | CancelPrevious | Queue | Allow | Replace)
  → debounce / throttle
  → timeout
  → retry
  → execute
  → IsRunning / error sink / Outcome

await executor.RunAsync(ct => catalog.ListAsync(ct), new OperationOptions
{
    Timeout = TimeSpan.FromSeconds(15),
    RetryCount = 2,
    Concurrency = ConcurrencyMode.Prevent,
}, ct);`,
          },
        ],
      },
    ],
  },
  {
    slug: "testing",
    title: "Testing",
    description:
      "net10.0 ViewModels, FakeNavigator, FakeDialogs, LeakProbe, and the sample test map.",
    sections: [
      {
        id: "package",
        title: "Testing package",
        blocks: [
          {
            type: "p",
            text: "Plugin.Maui.MVVMExpress.Testing is net10.0 and depends on Core. Put ViewModels in a shared net10.0 project so they run without MAUI. InMemoryNavigator implements IPageNavigator for tests. Also: FakeMainThread, FakeConnectivity, FakeMessageHub, AppearAsync / DisappearAsync, and ScopedNavigator for page-scope push/pop GC.",
          },
          {
            type: "code",
            code: `var dialogs = new FakeDialogs { ConfirmResult = true };
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
        ],
      },
      {
        id: "samples",
        title: "Sample map",
        blocks: section("samples", integrationSections).blocks,
      },
    ],
  },
  {
    slug: "memory",
    title: "Memory and scale",
    description:
      "Leak rules, Small / Mid / Large list guarantees, and host-process measurements.",
    sections: [section("memory"), section("constraints")],
  },
  {
    slug: "generators",
    title: "Source generators",
    description:
      "[Notify], command attributes, register, routes, persist, and auth. UseMvvmExpress applies generated routes via a ModuleInitializer.",
    sections: [
      {
        id: "status",
        title: "Shipped",
        blocks: [
          {
            type: "callout",
            title: "1.0.0",
            text: "Plugin.Maui.MVVMExpress.SourceGenerators is packed. Attributes live in Core. Types must be partial. UseMvvmExpress applies generated [Route] / [RequiresAuth] via a ModuleInitializer (ApplyGeneratedRegistrations defaults to true). You can still call services.AddGeneratedViewModels() explicitly.",
          },
          {
            type: "table",
            headers: ["Attribute", "Generates"],
            rows: [
              ["[Notify] / [NotifyAlso]", "Property + changing/changed + dependents"],
              ["[ModelCommand] / [AsyncModelCommand]", "Command property + CanExecute hookup"],
              ["[RegisterViewModel] / [RegisterView]", "IServiceCollection extension"],
              ["[Route]", "Route table for Shell / navigator"],
              ["[PersistState]", "Save/restore members via IStateStore"],
              ["[RequiresAuth] / [RequiresRole]", "Guard metadata for INavigationAuthPolicy"],
            ],
          },
          {
            type: "code",
            code: `<PackageReference Include="Plugin.Maui.MVVMExpress.SourceGenerators" Version="1.0.0" PrivateAssets="all" />

builder.UseMvvmExpress(o => o
    .UseNavigationPage()
    .UseDialogs()
    .UseAuth<LoginViewModel>());
// generated [Route] / [RequiresAuth] apply from UseMvvmExpress

services.AddGeneratedViewModels(); // optional explicit call`,
          },
          {
            type: "p",
            text: "Convention scan of *Page / *ViewModel is a debug fallback, not the AOT path. Typed NavigateToAsync<TViewModel>() and generated registrations are the supported story.",
          },
        ],
      },
    ],
  },
  {
    slug: "roadmap",
    title: "Roadmap",
    description:
      "Phases 1–7 are shipped. 1.0.0 is the SemVer lock (UseAuth, 15-minute path, Playground). Next is Phase 8 / 1.1.0.",
    sections: [
      {
        id: "versions",
        title: "Versions",
        blocks: [
          {
            type: "p",
            text: "1.0.0 is the SemVer lock. A breaking API change requires a major version. Current public packages are 1.0.0. Shipped 0.6.1 APIs plus UseAuth<TChallenge>() are the contract. From 0.6.1-preview, install without --prerelease and replace GuardedNavigator reconstruction with UseAuth.",
          },
          {
            type: "table",
            headers: ["Version", "Meaning"],
            rows: [
              ["0.1.0-design", "Documents + solution skeleton"],
              ["0.1.0-preview", "Phase 1 — Core + host + Shell navigator + dialogs + validation + pagination"],
              ["0.3.0-preview", "Phase 2 — page host, URI stack, toast, multi-window"],
              ["0.4.0-preview", "Phase 3 — forms, Reactive, cache policies, pipeline, scopes"],
              ["0.5.0-preview", "Phases 4–5 — generators, persist/auth, productization"],
              ["0.6.0-preview", "Device-safe marshal, weak CanExecuteChanged, overlay toasts, host/auth/forms UX"],
              ["0.6.1-preview", "Host-safe navigator, UseNavigationPage + replace-root, SectionHost, SnapshotCollection"],
              ["1.0.0", "Phases 6–7 — 15-minute path, Playground, UseAuth, SemVer lock (current)"],
              ["1.1.0", "Phase 8 — one path (generators, registration, forms, nav-args), analyzers, dotnet new"],
              ["1.2.0", "Phase 9 — Shell parity, modules, modal stack, sibling host adapters"],
              ["1.3.0", "Phase 10 — device numbers, trim, zero-reflection policy, production post-mortem"],
            ],
          },
        ],
      },
      {
        id: "shipped",
        title: "Shipped (1.0.0)",
        blocks: [
          {
            type: "ul",
            items: [
              "Phase 1: ObservableModel, commands, ViewModel lifecycle, AsyncState, Outcome, MessageHub, AddMvvmExpress / UseMvvmExpress, leak and scale tests.",
              "Phase 2: INavigator, MauiShellNavigator, MauiPageNavigator, URI stack, dictionary/URI args, IWindowContext, GuardedNavigator, IDialogs, MauiNotifier toast, IValidator, PagedCollection, SearchQuery.",
              "Phase 3: FormViewModel, IPropertyObservable / CombineLatest, ICachedFetcher, IOperationExecutor, command debounce / throttle / queue, child composition, IViewModelScopeFactory, IFeatureSwitch / IPermissionGate / IFileStore / IMediaPicker.",
              "Phase 4: [Notify], command / register / route / persist / auth attributes, AddGeneratedViewModels, DeepLinkRouteMap sample, CommunityToolkitMessageHub, IStateStore, IMvvmExpressDiagnostics.",
              "Phase 5: migration guides, AOT/trim notes, BenchmarkDotNet, Testing fakes, ScopedNavigator pop-GC, NuGet SourceLink / snupkg / tags.",
              "0.6.0: UI-thread marshal, no-throw ICommand.Execute, weak CanExecuteChanged, Window.AddOverlay toasts, UseShell / UseDialogs, dirty confirm, GuardedNavigatorOptions, IAccountService, ModuleInitializer routes, AuthApp, Validation trim roots.",
              "0.6.1: Navigators hop before new Page(), UseNavigationPage + ResetAsync replace-root, SectionHostViewModel, SnapshotCollection, SearchQuery.CommittedText, FormViewModel.Bind, CoalescingDispatcher, ChatHost sample.",
              "1.0.0: UseAuth<TChallenge>() / AddAuth<TChallenge>(), 15-minute getting started, cheat sheet, cookbook, Playground, design-review sign-off, SemVer lock.",
            ],
          },
        ],
      },
      {
        id: "contract",
        title: "SemVer contract",
        blocks: [
          {
            type: "p",
            text: "Design-review sign-off is recorded (2026-09-02). Accepted 1.0 scope: host-process BenchmarkDotNet and ScaleProfile rather than device RSS; in-memory pop-GC rather than a device-window detach run; Windows / Mac Catalyst compile TFMs exist and are compile-only — catalog-primary remains Android + iOS. Phases 8–10 may deprecate, not break, 1.0 types.",
          },
        ],
      },
      {
        id: "next",
        title: "Next",
        blocks: [
          {
            type: "p",
            text: "Phase 8 (1.1.0) is one vocabulary for generators, registration, forms, and nav-args, plus CommunityToolkit interop, three analyzers, and dotnet new. Phase 9 (1.2.0) is Shell parity, modules, and modal stack. Phase 10 (1.3.0) is device numbers, trim, and a production post-mortem.",
          },
        ],
      },
      {
        id: "deferred",
        title: "Explicitly deferred past 1.0",
        blocks: [
          {
            type: "ul",
            items: [
              "Prism-style regions.",
              "ReactiveUI IScreen routing as a first-class host.",
              "A built-in remote feature-flag or auth provider (use FeatureFlags / SecureSession).",
              "First-class Windows / Mac Catalyst support claims.",
              "A bottom-sheet control library (Dialogs stays an abstraction).",
              "A Visual Studio binding debugger visualizer.",
            ],
          },
        ],
      },
    ],
  },
];

export function getGuideTopic(slug: string): GuideTopic | undefined {
  return guideTopics.find((topic) => topic.slug === slug);
}

export function guideTopicSlugs(): string[] {
  return guideTopics.filter((topic) => topic.slug !== "introduction").map((topic) => topic.slug);
}

export function allGuideHrefs(): string[] {
  return [...new Set(guideNav.flatMap((group) => group.items.map((item) => item.href)))];
}

export function adjacentGuidePages(currentHref: string): {
  previous: GuideNavItem | null;
  next: GuideNavItem | null;
} {
  const items = guideNav.flatMap((group) => group.items);
  const index = items.findIndex((item) => item.href === currentHref);
  return {
    previous: index > 0 ? items[index - 1] : null,
    next: index >= 0 && index < items.length - 1 ? items[index + 1] : null,
  };
}
