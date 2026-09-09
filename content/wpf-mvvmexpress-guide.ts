import type { DocSection } from "@/content/mvvmexpress";
import type { GuideNavGroup, GuideNavItem, GuideTopic } from "@/content/mvvmexpress-guide";
import { wpfMvvmExpressSlug } from "@/content/mvvmexpress-family";
import { wpfComparisonHref } from "@/content/wpf-mvvmexpress-comparison";
import {
  wpfIntegrationSection,
  wpfSection,
  wpfVisualStudioMarketplaceSearch,
  wpfVscodeMarketplaceSearch,
} from "@/content/wpf-mvvmexpress";

export const wpfDocsBase = `/packages/${wpfMvvmExpressSlug}/docs`;
export const wpfIntegrationHref = `/packages/${wpfMvvmExpressSlug}/integration/`;
export { wpfComparisonHref };

export const wpfGuideNav: GuideNavGroup[] = [
  {
    id: "start",
    title: "Start here",
    items: [
      { title: "Introduction", href: `${wpfDocsBase}/` },
      { title: "Getting started", href: wpfIntegrationHref },
      { title: "Project template", href: `${wpfDocsBase}/templates/`, topic: "templates" },
      { title: "IDE extensions", href: `${wpfDocsBase}/ide-extensions/`, topic: "ide-extensions" },
      { title: "Comparison", href: wpfComparisonHref },
    ],
  },
  {
    id: "model",
    title: "Application model",
    items: [
      { title: "ViewModels", href: `${wpfDocsBase}/viewmodels/`, topic: "viewmodels" },
      { title: "Commands", href: `${wpfDocsBase}/commands/`, topic: "commands" },
      { title: "Dependency injection", href: `${wpfDocsBase}/dependency-injection/`, topic: "dependency-injection" },
      { title: "Messaging", href: `${wpfDocsBase}/messaging/`, topic: "messaging" },
    ],
  },
  {
    id: "shell",
    title: "Application shell",
    items: [
      { title: "Navigation", href: `${wpfDocsBase}/navigation/`, topic: "navigation" },
      { title: "Chat host", href: `${wpfDocsBase}/chat-host/`, topic: "chat-host" },
      { title: "Dialogs", href: `${wpfDocsBase}/dialogs/`, topic: "dialogs" },
      { title: "Validation", href: `${wpfDocsBase}/validation/`, topic: "validation" },
      { title: "Forms", href: `${wpfDocsBase}/forms/`, topic: "forms" },
      { title: "Lists and search", href: `${wpfDocsBase}/lists/`, topic: "lists" },
    ],
  },
  {
    id: "compose",
    title: "Composition",
    items: [
      { title: "Packages", href: `${wpfDocsBase}/packages/`, topic: "packages" },
      { title: "Composition", href: `${wpfDocsBase}/composition/`, topic: "composition" },
      { title: "Platforms", href: `${wpfDocsBase}/platforms/`, topic: "platforms" },
    ],
  },
  {
    id: "internals",
    title: "Internals",
    items: [
      { title: "Operation pipeline", href: `${wpfDocsBase}/pipeline/`, topic: "pipeline" },
      { title: "Testing", href: `${wpfDocsBase}/testing/`, topic: "testing" },
      { title: "Memory and scale", href: `${wpfDocsBase}/memory/`, topic: "memory" },
    ],
  },
  {
    id: "release",
    title: "Release",
    items: [
      { title: "Roadmap", href: `${wpfDocsBase}/roadmap/`, topic: "roadmap" },
    ],
  },
];

const introSections: DocSection[] = [
  wpfSection("status"),
  {
    id: "license",
    title: "License",
    blocks: [
      {
        type: "p",
        text: "WPF MVVMExpress is MIT licensed. There is no community-versus-commercial split and no revenue threshold. You may use the packages in commercial apps without a paid framework license. The SPDX identifier is MIT; LICENSE lives at the repository root and is packed with each nupkg.",
      },
      {
        type: "p",
        text: "That is a product choice, not a jab at other frameworks. If you already pay for a commercial MVVM stack, keep it. This family exists so a WPF team can take ViewModels, async state, and Frame navigation without a second license conversation — and so a MAUI team already on Plugin.Maui.MVVMExpress can keep the same Core contract on desktop.",
      },
    ],
  },
  wpfSection("why"),
  wpfSection("principles"),
  {
    id: "how-to-read",
    title: "How to read these docs",
    blocks: [
      {
        type: "p",
        text: "The left nav follows the surfaces a production WPF app actually touches. Start here for the contract. Getting started is the scaffold-or-install path, including dotnet new wpf-mvvmexpress, the first screen, and the Playground clone. Project template documents the packed templates. IDE extensions covers the Visual Studio Code and Visual Studio Marketplace wrappers. Comparison evaluates CommunityToolkit.Mvvm, Prism, Caliburn.Micro, and ReactiveUI. Application model covers ViewModels, commands, DI, and messaging. Application shell covers Frame navigation, chat host, dialogs, validation, forms, and lists. Composition and internals explain packages, windows, the operation pipeline, tests, and scale. Release covers the shipped 1.0.0 roadmap and what waits for a later version.",
      },
      {
        type: "ul",
        items: [
          "Shipped in 1.0.0 means types exist and tests exist. Frame navigation, dialogs, validation, pagination, templates, and IDE wrappers are complete.",
          "This is not Plugin.Maui.MVVMExpress. Do not add a PackageReference to Plugin.Maui.MVVMExpress.*. A ViewModel ports with a namespace swap.",
          "Source generators, Reactive, Shell, UseDeepLinks, and UseSecureSessionAuth are out of 1.0 — see the roadmap.",
          "Type names stay unique so CommunityToolkit.Mvvm or Prism can sit in the same app if you need them.",
        ],
      },
    ],
  },
  wpfSection("naming"),
  wpfSection("comparison"),
];

export const wpfGuideTopics: GuideTopic[] = [
  {
    slug: "introduction",
    title: "Introduction",
    description:
      "What WPF MVVMExpress is, why it exists, the MIT license, design principles, and how these docs are organized.",
    sections: introSections,
  },
  {
    slug: "templates",
    title: "Project template",
    description:
      "Scaffold a WPF app with dotnet new wpf-mvvmexpress, then add screens with wpf-mvvmexpress-page.",
    sections: [
      {
        id: "install-template",
        title: "Install the template pack",
        blocks: [
          {
            type: "callout",
            title: "1.0.0",
            text: "Plugin.Wpf.MVVMExpress.Templates ships with 1.0.0. It is a dotnet new pack, not a PackageReference. The generated app pins the 1.0.0 runtime packages and maps pages in App startup. This is not Plugin.Maui.MVVMExpress.Templates.",
          },
          {
            type: "code",
            code: `dotnet new install Plugin.Wpf.MVVMExpress.Templates
dotnet new wpf-mvvmexpress -n MyApp
cd MyApp
dotnet test MyApp.Tests`,
          },
          {
            type: "link",
            note: "nuget.org:",
            label: "Plugin.Wpf.MVVMExpress.Templates 1.0.0",
            href: "https://www.nuget.org/packages/Plugin.Wpf.MVVMExpress.Templates",
          },
          {
            type: "link",
            note: "GitHub Packages:",
            label: "Plugin.Wpf.MVVMExpress.Templates 1.0.0",
            href: "https://github.com/nuvyntralabs/Plugin.Wpf.MVVMExpress/pkgs/nuget/Plugin.Wpf.MVVMExpress.Templates",
          },
          {
            type: "p",
            text: "From the product repo, without installing the nupkg: dotnet new install templates/wpf-app and templates/page, then dotnet new wpf-mvvmexpress -n MyApp.",
          },
          {
            type: "p",
            text: "Same commands from the IDE: install the Visual Studio Code or Visual Studio Marketplace listing. The wrappers install the pack and run dotnet new — they do not copy the scaffold.",
          },
        ],
      },
      {
        id: "app-template",
        title: "wpf-mvvmexpress app",
        blocks: [
          {
            type: "p",
            text: "Short name: wpf-mvvmexpress. Creates a WPF Frame host on net10.0-windows. There is no Shell.",
          },
          {
            type: "table",
            headers: ["Included", "What you get"],
            rows: [
              ["MainWindow", "Frame named NavigationHost, wrapped in AdornerDecorator"],
              ["Login", "ResetAsync to Home after sign-in"],
              ["Home list + details", "SnapshotCollection and typed NavigateToAsync"],
              ["Form", "WpfFormViewModel screen"],
              ["MyApp.Core + MyApp.Tests", "net10.0 ViewModels and tests"],
            ],
          },
          {
            type: "p",
            text: "Demo sign-in is demo@mvvmexpress.dev / secret. Production tokens stay on an IAuthState adapter — do not store them on the ViewModel.",
          },
        ],
      },
      {
        id: "page-template",
        title: "wpf-mvvmexpress-page item",
        blocks: [
          {
            type: "code",
            code: `cd MyApp
dotnet new wpf-mvvmexpress-page -n Catalog --namespace MyApp`,
          },
          {
            type: "p",
            text: "Creates a XAML page, ViewModel, service, AddCatalog(), and {Binding} / Command. Map the route in App startup:",
          },
          {
            type: "code",
            code: `builder.Services.UseWpfMvvmExpress(o => o
    .UseFrameNavigation((nav, _) => nav
        .Map<LoginViewModel, LoginPage>("login")
        .Map<HomeViewModel, HomePage>("home")
        .Map<CatalogViewModel, CatalogPage>("catalog"))
    .UseDialogs()
    .UseAuth<LoginViewModel>());

builder.Services.AddCatalog();`,
          },
        ],
      },
      {
        id: "after-scaffold",
        title: "After you scaffold",
        blocks: [
          {
            type: "ul",
            items: [
              "Do not reconstruct GuardedNavigator — UseAuth<TChallenge>() already wraps it.",
              "Register an IAuthState adapter. The template uses an in-memory demo.",
              "Add Validation, Pagination, or Testing only when the screen needs them — the template already references the host set.",
              "Playground remains the cloneable 15-minute path if you want the in-repo sample instead of a new project.",
            ],
          },
          {
            type: "link",
            note: "Getting started walkthrough:",
            label: "Install and first screen",
            href: wpfIntegrationHref,
          },
          {
            type: "link",
            note: "IDE wrappers:",
            label: "VS Code and Visual Studio extensions",
            href: `${wpfDocsBase}/ide-extensions/`,
          },
        ],
      },
    ],
  },
  {
    slug: "ide-extensions",
    title: "IDE extensions",
    description:
      "Thin Visual Studio Code and Visual Studio wrappers that install Plugin.Wpf.MVVMExpress.Templates and run dotnet new.",
    sections: [
      {
        id: "what-they-are",
        title: "What they are",
        blocks: [
          {
            type: "callout",
            title: "Marketplace listings",
            text: "The extensions do not copy the scaffold. They install Plugin.Wpf.MVVMExpress.Templates and run the same dotnet new commands as the CLI. Extension version is 1.0.0, matching the template pack. Requires the .NET SDK on PATH. This is not the MAUI MVVMExpress extension.",
          },
          {
            type: "table",
            headers: ["Host", "Commands"],
            rows: [
              ["Visual Studio Code", "WPF MVVMExpress: Create New App, WPF MVVMExpress: Add Page"],
              ["Visual Studio 2022+", "Tools → WPF MVVMExpress → Create New App…, Add Page…"],
            ],
          },
          {
            type: "p",
            text: "After the template pack is installed, Visual Studio File → New → Project lists MVVMExpress WPF App. Add → New Item lists MVVMExpress WPF Page.",
          },
        ],
      },
      {
        id: "install-marketplace",
        title: "Install from Marketplace",
        blocks: [
          {
            type: "p",
            text: "Install the WPF listings:",
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
            type: "p",
            text: "In the editor: Extensions → search WPF MVVMExpress → Install. Then WPF MVVMExpress: Create New App / Add Page (VS Code) or Tools → WPF MVVMExpress (Visual Studio).",
          },
        ],
      },
      {
        id: "cli-no-extension",
        title: "CLI (no extension)",
        blocks: [
          {
            type: "code",
            code: `dotnet new install Plugin.Wpf.MVVMExpress.Templates
dotnet new wpf-mvvmexpress -n MyApp
dotnet new wpf-mvvmexpress-page -n Catalog --namespace MyApp`,
          },
          {
            type: "link",
            note: "Packed templates:",
            label: "Project template",
            href: `${wpfDocsBase}/templates/`,
          },
          {
            type: "link",
            note: "Product-repo details:",
            label: "extensions/README.md",
            href: "https://github.com/nuvyntralabs/Plugin.Wpf.MVVMExpress/blob/main/extensions/README.md",
          },
        ],
      },
    ],
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
            text: "NotifyDependsOn raises a named set of dependents. Prefer that over PropertyChanged(null), which forces every binding to refresh. 1.0 is hand-written fields and properties — there is no [Notify] generator in this family yet.",
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
      wpfSection("core"),
    ],
  },
  {
    slug: "commands",
    title: "Commands",
    description:
      "ModelCommand and AsyncModelCommand: CanExecute, concurrency, timeout, retry, and how they sit on the operation pipeline.",
    sections: [wpfIntegrationSection("commands")],
  },
  {
    slug: "dependency-injection",
    title: "Dependency injection",
    description:
      "AddMvvmExpress and UseWpfMvvmExpress, what the host registers, and how the app replaces navigators and dialogs.",
    sections: [
      {
        id: "host",
        title: "Host registration",
        blocks: [
          {
            type: "p",
            text: "MVVMExpress uses Microsoft.Extensions.DependencyInjection only. There is no DryIoc, Unity, or Grace package. Shared libraries and tests call AddMvvmExpress. A WPF app calls UseWpfMvvmExpress, which registers Core services, replaces IMainThread with DispatcherMainThread, maps IWindowContext to WpfWindowContext, marshals command/property notifications, and auto-attaches Loaded / Unloaded lifecycle.",
          },
          {
            type: "code",
            code: `builder.Services.UseWpfMvvmExpress(o => o
    .UseFrameNavigation((nav, _) => nav
        .Map<LoginViewModel, LoginPage>("login")
        .Map<HomeViewModel, HomePage>("home"))
    .UseDialogs()
    .UseAuth<LoginViewModel>());

// net10.0 tests / shared ViewModel projects
services.AddMvvmExpress();
services.AddAuth<LoginViewModel>();`,
          },
          {
            type: "p",
            text: "UseFrameNavigation is the login → replace-root → push host. There is no UseShell. UseDialogs lives in the Dialogs package. AddModule<T>() registers a feature assembly. MvvmExpressOptions also has CancelOperationsOnDisappear, EnableDiagnostics, MarshalNotifications (default true), AutoAttachLifecycle, ConfirmDirtyNavigation, and ForwardNavigationFailures.",
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
              ["ICache / ICachedFetcher", "MemoryCache / CachedFetcher", "App HTTP cache"],
              ["IConnectivityProbe", "InMemoryConnectivityProbe", "App probe"],
              ["IOperationExecutor", "OperationExecutor", "Keep"],
              ["IViewModelScopeFactory", "ServiceViewModelScopeFactory", "Keep"],
              ["IFeatureSwitch", "MemoryFeatureSwitch", "App flags"],
              ["IStateStore", "MemoryStateStore", "App persist store"],
              ["IWindowContext", "WindowContext.Default", "WpfWindowContext.Current / For(Window)"],
              ["IWindowNavigatorRegistry", "WindowNavigatorRegistry", "Keep; register per window"],
              ["INavigator / IPageNavigator", "InMemoryNavigator", "UseFrameNavigation()"],
              ["IMainThread", "ImmediateMainThread", "DispatcherMainThread (host)"],
              ["IDialogs / INotifier", "NullDialogs", "UseDialogs() → WpfDialogs / WpfNotifier"],
              ["IAuthState", "not registered", "UseAuth + app IAuthState"],
            ],
          },
        ],
      },
      {
        id: "modules",
        title: "Feature modules",
        blocks: [
          {
            type: "p",
            text: "IModule / AddModule<T>() is a thin composition boundary. A feature assembly registers its own routes, ViewModels, and services. It is not a Prism region catalog.",
          },
          {
            type: "code",
            code: `public sealed class CatalogModule : IModule
{
    public void Configure(IServiceCollection services)
    {
        services.AddSingleton<ICatalog, Catalog>();
    }
}

builder.Services.AddModule<CatalogModule>();`,
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
    sections: [wpfIntegrationSection("messaging")],
  },
  {
    slug: "navigation",
    title: "Navigation",
    description:
      "UseFrameNavigation, UI-thread view construction, typed records, URI query, replace-root, owned-window modals, and guards.",
    sections: [wpfSection("navigation"), wpfIntegrationSection("navigation-howto")],
  },
  {
    slug: "chat-host",
    title: "Chat host",
    description:
      "In-place tabs with SectionHostView, a load-once inbox, and a thread on the Frame stack.",
    sections: [wpfIntegrationSection("chat-host")],
  },
  {
    slug: "dialogs",
    title: "Dialogs",
    description:
      "IDialogs via MessageBox and INotifier toast on AdornerLayer — never wrapping Window.Content.",
    sections: [wpfIntegrationSection("dialogs")],
  },
  {
    slug: "validation",
    title: "Validation",
    description:
      "DataAnnotations, IValidator, MustMatch, and INotifyDataErrorInfo on WpfFormViewModel.",
    sections: [wpfIntegrationSection("validation")],
  },
  {
    slug: "forms",
    title: "Forms",
    description:
      "FormViewModel in Core, WpfFormViewModel for WPF bindings, dirty confirm, SubmitAsync, undo/redo.",
    sections: [wpfIntegrationSection("forms")],
  },
  {
    slug: "lists",
    title: "Lists and search",
    description:
      "ObservableRangeCollection batching, SnapshotCollection, PagedCollection, and SearchQuery.CommittedText.",
    sections: [wpfIntegrationSection("collections"), wpfIntegrationSection("pagination")],
  },
  {
    slug: "packages",
    title: "Packages",
    description:
      "How the WPF family splits Core, host, Navigation, Dialogs, Validation, Pagination, Testing, and Templates.",
    sections: [wpfSection("packages")],
  },
  {
    slug: "composition",
    title: "Composition",
    description:
      "What WPF MVVMExpress owns, what stays in the app, and how it relates to the MAUI family.",
    sections: [
      {
        id: "own",
        title: "What this family owns",
        blocks: [
          {
            type: "p",
            text: "WPF MVVMExpress owns ViewModels, commands, async state, Frame navigation, dialogs, toast, validation, pagination, forms, and tests. It does not own HTTP, offline sync, secure storage, or feature flags. Core abstractions (ICache, IAuthState, IConnectivityProbe, IDeepLinkBridge) exist so the app can adapt a shared net10.0 library. AddDeepLinks and AddSecureSessionAuth fail closed unless you supply a bridge or factory — there is no silent no-op and no UseDeepLinks / UseSecureSessionAuth host helper in 1.0.",
          },
          {
            type: "ul",
            items: [
              "Do not add a PackageReference to Plugin.Maui.MVVMExpress.*.",
              "A ViewModel ports with a namespace swap from Plugin.Maui.MVVMExpress to Plugin.Wpf.MVVMExpress.",
              "HttpForge Core is net10.0 — a WPF ViewModel can consume the same typed client.",
              "Usual WPF alternative for properties and commands only: CommunityToolkit.Mvvm.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "platforms",
    title: "Platforms",
    description:
      "WPF on Windows, TFMs, one navigator per window, and how multi-window differs from the MAUI host.",
    sections: [
      {
        id: "tfms",
        title: "Target frameworks",
        blocks: [
          {
            type: "table",
            headers: ["Package", "TFM"],
            rows: [
              ["Core, Validation, Pagination, Testing", "net10.0"],
              ["Host, Navigation, Dialogs", "net10.0-windows10.0.17763.0 + UseWPF"],
            ],
          },
          {
            type: "p",
            text: "Supported host is WPF on Windows. There is no WinUI, Avalonia, or MAUI TFM in this family. MAUI apps use Plugin.Maui.MVVMExpress.",
          },
        ],
      },
      {
        id: "windows",
        title: "One navigator per window",
        blocks: [
          {
            type: "p",
            text: "IWindowContext / WindowNavigatorRegistry key navigation, dialogs, and scopes by window. WpfWindowContext.For(Window) and WpfWindowContext.Current are the host adapters. Playground’s SecondaryWindow shows a second window without sharing MainWindow’s Frame. Do not treat Application.Current.MainWindow as the app.",
          },
        ],
      },
    ],
  },
  {
    slug: "pipeline",
    title: "Operation pipeline",
    description:
      "How AsyncModelCommand runs through IOperationExecutor: CanExecute, concurrency, timeout, retry, debounce.",
    sections: [
      {
        id: "steps",
        title: "Pipeline steps",
        blocks: [
          {
            type: "p",
            text: "Every AsyncModelCommand execute goes through IOperationExecutor. The order is CanExecute, concurrency gate, optional timeout, optional retry, optional debounce / throttle, then the delegate. Failures become Outcome and go to IErrorSink / IDialogs. ICommand.Execute never throws. ExecuteAsync still rethrows.",
          },
          {
            type: "p",
            text: "ConcurrencyMode values are Prevent, CancelPrevious, Queue, Allow, and Replace. Timeout, retry, Debounce, and Throttle ship on AsyncCommandOptions. CanExecuteChanged, IsRunning, and State raise on IMainThread. CanExecuteChanged is a weak event so a Button on a popped page does not pin the command.",
          },
        ],
      },
    ],
  },
  {
    slug: "testing",
    title: "Testing",
    description:
      "FakeNavigator, LeakProbe, AppearAsync, and net10.0 tests without a WPF visual tree.",
    sections: [wpfIntegrationSection("testing")],
  },
  {
    slug: "memory",
    title: "Memory and scale",
    description:
      "Why popped ViewModels must collect, weak events, and list batching at mid and large scale.",
    sections: [wpfSection("memory")],
  },
  {
    slug: "roadmap",
    title: "Roadmap",
    description:
      "What 1.0.0 shipped, what is explicitly out of 1.0, and how the family stays aligned with MAUI Core.",
    sections: [
      {
        id: "shipped",
        title: "Shipped in 1.0.0",
        blocks: [
          {
            type: "ul",
            items: [
              "Core contract aligned with MAUI 1.3: ObservableModel, ViewModel, commands, AsyncState, Outcome, INavigator, GuardedNavigator, forms, SectionHost.",
              "UseWpfMvvmExpress, DispatcherMainThread, WpfWindowContext, Loaded / Unloaded lifecycle.",
              "WpfFrameNavigator, UseFrameNavigation, ResetAsync replace-root, owned-window modals.",
              "WpfDialogs (MessageBox) and AdornerLayer toasts.",
              "Validation, Pagination, Testing, Templates, VS Code and Visual Studio wrappers.",
              "First-class multi-window via IWindowContext per Window.",
            ],
          },
        ],
      },
      {
        id: "out",
        title: "Out of 1.0",
        blocks: [
          {
            type: "table",
            headers: ["Surface", "Status"],
            rows: [
              ["Source generators ([Notify], [RegisterView], analyzers)", "Skip — handwritten SetProperty and Map"],
              ["Reactive / CombineLatest", "Skip"],
              ["CommunityToolkit compatibility pack", "Skip"],
              ["UseShell", "Skip — Frame only"],
              ["UseDeepLinks host helper", "Skip — Core AddDeepLinks fails closed"],
              ["UseSecureSessionAuth host helper", "Skip — register IAuthState yourself"],
              ["NavigateForResultAsync", "Skip"],
            ],
          },
          {
            type: "p",
            text: "Parity with the MAUI family is documented in API-PARITY.md. Breaking public API changes wait for 2.0.0.",
          },
        ],
      },
    ],
  },
];

export function getWpfGuideTopic(slug: string): GuideTopic | undefined {
  return wpfGuideTopics.find((topic) => topic.slug === slug);
}

export function wpfGuideTopicSlugs(): string[] {
  return wpfGuideTopics.filter((topic) => topic.slug !== "introduction").map((topic) => topic.slug);
}

export function allWpfGuideHrefs(): string[] {
  return [...new Set(wpfGuideNav.flatMap((group) => group.items.map((item) => item.href)))];
}

export function adjacentWpfGuidePages(currentHref: string): {
  previous: GuideNavItem | null;
  next: GuideNavItem | null;
} {
  const items = wpfGuideNav.flatMap((group) => group.items);
  const index = items.findIndex((item) => item.href === currentHref);
  return {
    previous: index > 0 ? items[index - 1] : null,
    next: index >= 0 && index < items.length - 1 ? items[index + 1] : null,
  };
}
