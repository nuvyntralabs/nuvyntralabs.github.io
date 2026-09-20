import type { DocSection } from "@/content/mvvmexpress";
import { uiKit } from "@/content/uikit";

export const whitepaperHref = "/whitepaper/";

export const whitepaper = {
  title: "The Nuvyntra Labs .NET MAUI Development Ecosystem",
  subtitle: "Compose a production cross-platform app from independently versioned pieces",
  description:
    "White paper: how Nuvyntra Labs covers a .NET MAUI development stack — UIKit for rich UI, MVVMExpress for application architecture, HttpForge for typed REST, and a focused gallery for the rest of the app.",
  abstract:
    "Nuvyntra Labs is a .NET MAUI component library and a whole ecosystem on Android, iOS, Mac Catalyst, and Windows. Install one NuGet in any host, or start a new app with nuvyn init. Teams paint screens with NuvyntraLabs.UIKit, host the app with Plugin.Maui.MVVMExpress, talk to APIs with Plugin.Maui.HttpForge, then add only the gallery plugins the product needs — local store, offline sync, connectivity, security, media, and observability. There is no mega-SDK. Each product versions independently and fails closed when a sibling is missing. Neither start is a fallback.",
  version: "1.0",
  date: "15 September 2026",
  author: "Niladri Prasad Padhy / Nuvyntra Labs",
  license: "MIT products, independently versioned",
} as const;

export const whitepaperPillars = [
  {
    href: "/uikit/",
    name: "UIKit",
    product: "NuvyntraLabs.UIKit",
    version: uiKit.version,
    role: "Presentation",
    title: "Build a rich UI",
    body: `${uiKit.controlCount} NV* controls, Lumina tokens, and ${uiKit.recipeCount} page recipes. Register UseNuvyntraUIKit(), then use xmlns nv. The kit paints screens — it does not PackageReference Plugin.Maui.*.`,
  },
  {
    href: "/packages/plugin-maui-mvvmexpress/",
    name: "MVVMExpress",
    product: "Plugin.Maui.MVVMExpress",
    version: "1.3.0",
    role: "Application shell",
    title: "Host the architecture",
    body: "Observable models, async commands, bindable AsyncState, typed Shell or NavigationPage, dialogs, forms, modules, and source generators. Scaffold with dotnet new mvvmexpress.",
  },
  {
    href: "/packages/plugin-maui-httpforge/",
    name: "HttpForge",
    product: "Plugin.Maui.HttpForge",
    version: "1.1.1",
    role: "HTTP contract",
    title: "Call REST APIs",
    body: "Declare GET/POST/PUT/DELETE as a C# interface. A source generator emits the HttpClient implementation. Retry, cache, TLS pin, and token refresh stay on sibling plugins.",
  },
] as const;

export const whitepaperSections: DocSection[] = [
  {
    id: "abstract",
    title: "1. Abstract",
    blocks: [
      {
        type: "p",
        text: "A production .NET MAUI app is not one library. It is a UI, an application shell, a network contract, a local store, and a set of device and operations concerns. Most teams assemble those from overlapping community packages — CommunityToolkit for properties, Prism or Shell for navigation, Refit for HTTP, and a scatter of plugins for GPS, offline, and crash reporting. The seams are where field apps fail.",
      },
      {
        type: "p",
        text: "Nuvyntra Labs ships the stack as independently versioned products. [NuvyntraLabs.UIKit](/uikit/) is the Lumina presentation catalog. [Plugin.Maui.MVVMExpress](/packages/plugin-maui-mvvmexpress/) is the application shell. [Plugin.Maui.HttpForge](/packages/plugin-maui-httpforge/) is the typed REST contract. The [MauiEssentials gallery](/packages/) fills location, connectivity, persistence, security, media, and observability. Compose only what the app needs. There is no mega-package dependency.",
      },
      {
        type: "callout",
        title: "Two ways to start",
        text: "Nuvyntra Labs reaches teams as a component library and as a whole ecosystem. The component library is one NuGet in any host. The whole ecosystem is [nuvyn init](/toolkits/nuvyn/) assembling a new host from the same packages. Neither path is a fallback.",
      },
      {
        type: "callout",
        title: "Scope of this paper",
        text: "This paper is the ecosystem map for .NET MAUI app development. Product APIs, install recipes, and comparisons live on each package page. The NuvexaDB engine has its own white paper. Desktop MVVMExpress families (WPF, Avalonia, Uno, WinUI) share the Core contract and are noted only as adjacent hosts.",
      },
    ],
  },
  {
    id: "problem",
    title: "2. Why an ecosystem, not a mega-SDK",
    blocks: [
      {
        type: "p",
        text: "Cross-platform MAUI work collapses when one vendor SDK owns UI, navigation, HTTP, and storage. Teams cannot adopt a chart control without taking a session manager. They cannot pin TLS without taking a retry policy they did not ask for. They cannot upgrade a GPS plugin without a breaking change in the form engine.",
      },
      {
        type: "p",
        text: "The opposite failure is a pile of unrelated NuGets with no shared host story. CommunityToolkit.Mvvm covers properties and commands. Prism.Maui covers page navigation, not Shell. ReactiveUI covers observable pipelines. A field or enterprise app often needs all three, plus bindable async state, lifecycle-aware cancellation, and a typed REST client that can sit on the same HttpClient as retry, cache, and SPKI pin.",
      },
      {
        type: "ul",
        items: [
          "**Independently versioned.** UIKit 1.5, MVVMExpress 1.3, HttpForge 1.1, and each gallery plugin ship on their own SemVer lock.",
          "**Compose at the host.** The UI kit does not PackageReference Plugin.Maui.*. HttpForge does not retry, cache, or refresh tokens. Missing siblings fail closed instead of silently degrading.",
          "**Adopt only what the app needs.** A catalog app can take UIKit + MVVMExpress + HttpForge. A depot inspection app adds GeoLocator, OfflineSync, MediaPipeline, and FileVault.",
          "**Honest boundaries.** PDF viewers are viewers. NVBarcode generates; it does not scan. LocalStore is not OfflineSync. HttpForge is a MauiEssentials-shaped subset of Refit, not a drop-in replacement.",
        ],
      },
    ],
  },
  {
    id: "map",
    title: "3. Ecosystem map",
    blocks: [
      {
        type: "p",
        text: "A typical MAUI product maps onto six layers. The first three are the pillars this paper names. The rest come from the gallery and from [NuvexaDB](/nuvexadb/) when the host wants an embedded document file.",
      },
      {
        type: "table",
        headers: ["Layer", "Product", "Role"],
        rows: [
          [
            "Presentation",
            "[NuvyntraLabs.UIKit](/uikit/)",
            `NV* controls, Lumina tokens, ${uiKit.recipeCount} page recipes`,
          ],
          [
            "Application",
            "[Plugin.Maui.MVVMExpress](/packages/plugin-maui-mvvmexpress/)",
            "ViewModels, Shell or NavigationPage, dialogs, forms, modules",
          ],
          [
            "HTTP contract",
            "[Plugin.Maui.HttpForge](/packages/plugin-maui-httpforge/)",
            "Source-generated typed REST over HttpClient",
          ],
          [
            "HTTP runtime",
            "ApiResilience, ApiCache, TlsPin, SecureSession",
            "Retry, GET cache, SPKI pin, 401 refresh — chained on IHttpClientBuilder",
          ],
          [
            "Persistence",
            "LocalStore, OfflineSync, NuvexaDB",
            "Room-style CRUD, queued sync, one .nvx file",
          ],
          [
            "Field, security, operations",
            "MauiEssentials gallery + MauiDev",
            "Location, media, lock, crash, profile, doctor CLI",
          ],
        ],
      },
      {
        type: "p",
        text: "Registration stays at `MauiProgram`. The kit, the shell, and the REST client are three calls. Gallery plugins register the same way.",
      },
      {
        type: "code",
        code: `builder
    .UseMauiApp<App>()
    .UseNuvyntraUIKit()
    .UseMvvmExpress()
    .UseHttpForge();

builder.Services.AddHttpForgeClient<IFieldApi>(client =>
{
    client.BaseAddress = new Uri("https://api.example.com");
});`,
      },
      {
        type: "callout",
        title: "Platforms",
        text: "UIKit, MVVMExpress, HttpForge, LocalStore, LeakAnalyser, VideoPipeline, and TlsPin target Android, iOS, Mac Catalyst, and Windows (MVVMExpress is single-window on Windows). Most gallery plugins are Android + iOS. Sibling adapters on MVVMExpress stay Android + iOS.",
      },
    ],
  },
  {
    id: "uikit",
    title: "4. Pillar I — UIKit: build a rich UI",
    blocks: [
      {
        type: "p",
        text: `[NuvyntraLabs.UIKit](/uikit/) (${uiKit.version}) is the Lumina catalog for a typical MAUI app: foundation tokens, ${uiKit.controlCount} NV* controls from primitives through advanced and Next chrome, and ${uiKit.recipeCount} NV*View page recipes. Register with \`UseNuvyntraUIKit()\`, then use \`xmlns:nv=\"${uiKit.xmlns}\"\`. 1.5.1 adds type scale, RTL, and contrast-safe ink. Kit-level APIs stay a working Lumina surface — not Telerik or Syncfusion parity.`,
      },
      {
        type: "table",
        headers: ["Layer", "Examples", "Role"],
        rows: [
          ["Foundation", "NVTheme, NVTokens, NVTypography, NVIcons, NVMotion", "Static helpers. Not XAML views."],
          ["Primitives", "NVSurface, NVAvatar, NVBadge, NVSkeleton, NVOverlay", "Themed paper, glyphs, overlays."],
          ["Actions & inputs", "NVButton, NVTextField, NVPinPad, NVFormField", "Filled / tonal / outline / ghost; labeled fields."],
          ["Feedback & nav", "NVBanner, NVTabView, NVBottomSheet, NVAppScaffold", "Status, sheets, tabs, app chrome."],
          ["Data & viz", "NVDataGrid, NVChart, NVCalendar, NVKanban, NVGantt", "Grids, charts, planning surfaces. 1.4 adds filter, sort, frozen columns, and multi-day calendar."],
          ["Social & media", "NVChat, NVVideoPlayer, NVPdfViewer, NVWebView", "Chrome and viewers — not playback engines. Chat can stream and attach files."],
          ["Next", "NVCommandPalette, NVDiffView, NVCallBar, NVReviewPrompt", "1.2 / 1.3 app chrome. Host plugins stay out of this package."],
          ["Pages", "NVSignInView … NVAddressFormView", `${uiKit.recipeCount} recipes for auth, commerce, content, social, files, system, plus invoice / call / address.`],
        ],
      },
      {
        type: "p",
        text: "Recipes set titles and seed demo children so a team can stand up sign-in, catalog, checkout, inbox, or settings without inventing chrome. PDF, Docx, and Spreadsheet are viewers. NVBarcode generates; it does not scan. Real biometrics stay on [Plugin.Maui.BiometricPlus](/packages/plugin-maui-biometric/). Compose [FormValidation](/packages/plugin-maui-form-validation/) and [KeyboardManager](/packages/plugin-maui-keyboard-manager/) at the host — the kit does not take those dependencies.",
      },
      {
        type: "link",
        href: "/uikit/docs/",
        label: "UIKit component reference",
        note: "XAML and every kit attribute:",
      },
    ],
  },
  {
    id: "mvvmexpress",
    title: "5. Pillar II — MVVMExpress: application architecture",
    blocks: [
      {
        type: "p",
        text: "[Plugin.Maui.MVVMExpress](/packages/plugin-maui-mvvmexpress/) 1.3.0 is the application shell for production MAUI apps on Android, iOS, Mac Catalyst, and Windows (single-window). CommunityToolkit.Mvvm covers properties and commands. Prism.Maui covers page navigation, not Shell. ReactiveUI covers observable pipelines. A field app often needs all three plus bindable async state, lifecycle-aware cancellation, and typed navigation — without taking three overlapping frameworks. Core targets net10.0 and does not reference MAUI.",
      },
      {
        type: "ul",
        items: [
          "**ViewModels.** ObservableModel, ViewModel lifecycle, and `ViewModelCancellationToken` cancelled on dispose.",
          "**Commands.** Sync and async commands with UI-thread marshal, timeout, retry, debounce, and throttle. `ICommand.Execute` does not throw.",
          "**Hosts.** `UseNavigationPage` and `UseShell` are equal hosts. Navigators hop to `IMainThread` before `new Page()` or `Shell.GoToAsync`.",
          "**Forms & lists.** `FormViewModel.Bind`, dirty confirm, `SectionHostView` in-place tabs, `SnapshotCollection`, `MvvmSearch`.",
          "**Auth & deep links.** `UseAuth<TChallenge>()` wraps `GuardedNavigator`. `UseSecureSessionAuth()` and `UseDeepLinks()` fail closed if the sibling is missing.",
          "**Modules & generators.** `IModule` / `AddModule<T>()`, `[Notify]`, `[RegisterView]`, `[PersistState]`, `[RequiresAuth]`. Analyzers MVVME001–003 and MVVME010–013.",
          "**Scaffold.** `dotnet new mvvmexpress` / `mvvmexpress-page`, plus Visual Studio Code and Visual Studio Marketplace extensions pinned to 1.3.0.",
        ],
      },
      {
        type: "p",
        text: "1.0.0 remains the SemVer lock. Public 1.x APIs stay source-compatible. Capability work — captive portal, HTTP cache, offline sync, form XAML, flags, deep links — stays in focused gallery plugins. The testing package ships LeakProbe, FakeNavigator, FakeDialogs, and 1.0 contract tests.",
      },
      {
        type: "callout",
        title: "Same Core, other hosts",
        text: "WPF, Avalonia, Uno Platform, and WinUI 3 each have an independent MVVMExpress family with the same Core contract. A ViewModel ports with a namespace swap. They are not PackageReference-coupled to the MAUI pack. This paper stays on the MAUI host.",
      },
      {
        type: "link",
        href: "/packages/plugin-maui-mvvmexpress/docs/",
        label: "MVVMExpress documentation",
        note: "ViewModels, hosts, generators, templates:",
      },
    ],
  },
  {
    id: "httpforge",
    title: "6. Pillar III — HttpForge: typed REST",
    blocks: [
      {
        type: "p",
        text: "[Plugin.Maui.HttpForge](/packages/plugin-maui-httpforge/) 1.1.1 is the contract layer. Declare GET, POST, PUT, DELETE, PATCH, and HEAD as a C# interface. The source generator emits the HttpClient implementation at compile time — there is no runtime reflection request builder. It is a MauiEssentials-shaped subset of Refit for Android, iOS, Mac Catalyst, and Windows, not a drop-in Refit replacement.",
      },
      {
        type: "code",
        code: `public interface IFieldApi
{
    [Get("/sites/{id}")]
    Task<Site> GetSite(int id, CancellationToken cancellationToken = default);

    [Post("/inspections")]
    Task<Inspection> Submit([Body] InspectionDraft draft);
}

var site = await api.GetSite(42);`,
      },
      {
        type: "p",
        text: "1.1 adds the Refit-parity request surface: query objects, collection formats, naming presets, `[Timeout]` / `[Url]` / `[PathPrefix]`, optional segments, `[FormObject]`, `IAsyncEnumerable` streaming (JSON Lines / SSE), request compression, and `AuthorizationHeaderValueGetter`. Optional packages cover Testing, Newtonsoft.Json, and XML. Compile-time diagnostics are HFG001–HFG010.",
      },
      {
        type: "callout",
        title: "Not a networking suite",
        text: "HttpForge does not retry, cache, refresh tokens, pin certificates, or resume uploads. Those stay on Plugin.Maui.ApiResilience, Plugin.Maui.ApiCache, Plugin.Maui.SecureSession, Plugin.Maui.TlsPin, and Plugin.Maui.SmartUpload. AddHttpForgeClient returns IHttpClientBuilder so those handlers chain on the same client.",
      },
      {
        type: "link",
        href: "/packages/plugin-maui-httpforge/docs/",
        label: "HttpForge documentation",
        note: "Contract, analyzers, and sibling recipes:",
      },
    ],
  },
  {
    id: "gallery",
    title: "7. Gallery — libraries used in development",
    blocks: [
      {
        type: "p",
        text: "The three pillars stand up UI, architecture, and the API contract. A shipped app still needs local data, a truthful network, sessions, field capture, and a way to see why a session failed. The [product catalog](/packages/) is that gallery. The rows below are the libraries a development team actually reaches for — not the full index.",
      },
    ],
  },
  {
    id: "gallery-data",
    title: "7.1 Local data and offline",
    blocks: [
      {
        type: "table",
        headers: ["Library", "Use in development", "Page"],
        rows: [
          [
            "Plugin.Maui.LocalStore 1.1",
            "Room-style `ILocalStore` / `IStoreCollection<T>`. Host picks SQLite, NuvexaDB, Realm, LiteDB, or another engine. AutoMigrate, QueryAsync, `[StoreDao]`.",
            "[LocalStore](/packages/plugin-maui-local-store/)",
          ],
          [
            "Plugin.Maui.OfflineSync",
            "Offline-first local writes, queued sync, and conflict resolution. Not a CRUD API — pair with LocalStore.",
            "[OfflineSync](/packages/plugin-maui-offline-sync/)",
          ],
          [
            "NuvexaDB 1.0.6",
            "Embedded NoSQL: one `.nvx` file, NQL, optional AES-256-GCM. Standalone engine; LocalStore can host it.",
            "[NuvexaDB](/nuvexadb/)",
          ],
          [
            "Plugin.Maui.JobQueue",
            "Durable SQLite work queue with retry, backoff, and dead letter. Survives process death.",
            "[JobQueue](/packages/plugin-maui-job-queue/)",
          ],
          [
            "Plugin.Maui.RetryQueue",
            "Retry the call that already failed — telemetry, orders, payments. Longer default backoff than JobQueue.",
            "[RetryQueue](/packages/plugin-maui-retry-queue/)",
          ],
          [
            "Plugin.Maui.SmartUpload",
            "Chunked, resumable uploads with HTTPS by default. Continues after a kill instead of restarting at byte zero.",
            "[SmartUpload](/packages/plugin-maui-smart-upload/)",
          ],
        ],
      },
    ],
  },
  {
    id: "gallery-network",
    title: "7.2 Network truth and HTTP runtime",
    blocks: [
      {
        type: "p",
        text: "HttpForge is the contract. These plugins are the runtime the contract sits on — and the diagnostics when the OS says “connected” but the API is unreachable.",
      },
      {
        type: "table",
        headers: ["Library", "Use in development", "Page"],
        rows: [
          [
            "Plugin.Maui.NetworkMonitor",
            "Validated public internet, captive portals, Wi-Fi versus cellular. Answers a question MAUI Connectivity cannot.",
            "[NetworkMonitor](/packages/plugin-maui-network-monitor/)",
          ],
          [
            "Plugin.Maui.NetworkDiagnostics",
            "On-demand layered probe: internet, DNS, TLS, then the API. For support screens, not a monitor.",
            "[NetworkDiagnostics](/packages/plugin-maui-network-diagnostics/)",
          ],
          [
            "Plugin.Maui.ApiResilience",
            "Retry, circuit breaker, AES-256-GCM offline queue, token-refresh cooperation.",
            "[ApiResilience](/packages/plugin-maui-api-resilience/)",
          ],
          [
            "Plugin.Maui.ApiCache",
            "HTTP GET cache with CacheFirst, NetworkFirst, and stale-while-revalidate.",
            "[ApiCache](/packages/plugin-maui-api-cache/)",
          ],
          [
            "Plugin.Maui.TlsPin",
            "HttpClient SPKI / public-key pin. Empty or mismatched pins fail closed unless report-only staging is on.",
            "[TlsPin](/packages/plugin-maui-tls-pin/)",
          ],
        ],
      },
    ],
  },
  {
    id: "gallery-security",
    title: "7.3 Identity, session, and device security",
    blocks: [
      {
        type: "table",
        headers: ["Library", "Use in development", "Page"],
        rows: [
          [
            "Plugin.Maui.SecureSession",
            "Login, Bearer attach, single-flight 401 refresh, multi-device revoke, biometric unlock. Persistence is SecureStoragePlus.",
            "[SecureSession](/packages/plugin-maui-secure-session/)",
          ],
          [
            "Plugin.Maui.SecureStoragePlus",
            "AES-256-GCM envelope over MAUI SecureStorage, expiry, migration, typed JSON.",
            "[SecureStoragePlus](/packages/plugin-maui-secure-storage-plus/)",
          ],
          [
            "Plugin.Maui.AppLock",
            "Lock timer, privacy cover, and gate after background. Face ID / PIN are how the user unlocks — not the product.",
            "[AppLock](/packages/plugin-maui-app-lock/)",
          ],
          [
            "Plugin.Maui.BiometricPlus",
            "One-shot Face ID, fingerprint, or device PIN. Not an app-lock timer.",
            "[BiometricPlus](/packages/plugin-maui-biometric/)",
          ],
          [
            "Plugin.Maui.ScreenGuard",
            "FLAG_SECURE on Android; iOS capture overlay. Not AppLock and not FileVault.",
            "[ScreenGuard](/packages/plugin-maui-screen-guard/)",
          ],
          [
            "Plugin.Maui.PermissionFlow",
            "Named flows with rationale, one-at-a-time requests, denial cooldown, Settings fallback.",
            "[PermissionFlow](/packages/plugin-maui-permission-flow/)",
          ],
        ],
      },
    ],
  },
  {
    id: "gallery-field",
    title: "7.4 Field, media, and device UX",
    blocks: [
      {
        type: "p",
        text: "These are the libraries that show up once the app leaves the office — inspection, depot, POS, attendance, and always-connected field work.",
      },
      {
        type: "table",
        headers: ["Library", "Use in development", "Page"],
        rows: [
          [
            "Plugin.Maui.GeoLocator",
            "On-demand fix, tracking session, reverse geocoding.",
            "[GeoLocator](/packages/plugin-maui-geolocator/)",
          ],
          [
            "Plugin.Maui.Geofence",
            "Circular enter / exit / dwell (max 20). Not a GPS tracker.",
            "[Geofence](/packages/plugin-maui-geofence/)",
          ],
          [
            "Plugin.Maui.MediaPipeline",
            "Camera or gallery → resize, EXIF strip, watermark, redact, encrypt → FileVault or SmartUpload.",
            "[MediaPipeline](/packages/plugin-maui-media-pipeline/)",
          ],
          [
            "Plugin.Maui.VideoPipeline",
            "Camera or gallery video with duration / size gates, thumbnail, AES-256-GCM. No FFmpeg in 1.0.",
            "[VideoPipeline](/packages/plugin-maui-video-pipeline/)",
          ],
          [
            "Plugin.Maui.FileVault",
            "Encrypted on-device files with key protection and background lock.",
            "[FileVault](/packages/plugin-maui-file-vault/)",
          ],
          [
            "Plugin.Maui.FormValidation",
            "Fluent rules next to the model; `Validation.For` in XAML. Compose with UIKit fields.",
            "[FormValidation](/packages/plugin-maui-form-validation/)",
          ],
          [
            "Plugin.Maui.KeyboardManager",
            "Hide, show, dismiss-on-tap, resize / pan / safe-area. Compose with UIKit forms.",
            "[KeyboardManager](/packages/plugin-maui-keyboard-manager/)",
          ],
          [
            "Plugin.Maui.Printing",
            "PDF, image, AirPrint, Bluetooth ESC/POS thermal — invoices, receipts, inspection reports.",
            "[Printing](/packages/plugin-maui-printing/)",
          ],
          [
            "Plugin.Maui.BluetoothManager",
            "BLE connection lifecycle for printers, POS, and IoT — not another GATT wrapper.",
            "[BluetoothManager](/packages/plugin-maui-bluetooth-manager/)",
          ],
          [
            "Plugin.Maui.NfcPlus",
            "NDEF read/write, tag ID, attendance and inventory.",
            "[NfcPlus](/packages/plugin-maui-nfc-plus/)",
          ],
        ],
      },
    ],
  },
  {
    id: "gallery-ops",
    title: "7.5 App services, observability, and the doctor",
    blocks: [
      {
        type: "table",
        headers: ["Library", "Use in development", "Page"],
        rows: [
          [
            "Plugin.Maui.DeepLinks",
            "App Links, Universal Links, custom schemes, auth-restore. Fail-closed host allowlists.",
            "[DeepLinks](/packages/plugin-maui-deep-links/)",
          ],
          [
            "Plugin.Maui.PushRouter",
            "Route FCM / APNs payloads the host already received. Fail-closed unmapped routes.",
            "[PushRouter](/packages/plugin-maui-push-router/)",
          ],
          [
            "Plugin.Maui.FeatureFlags",
            "Mobile-first flags with HTTPS remote config and optional HMAC signature.",
            "[FeatureFlags](/packages/plugin-maui-feature-flags/)",
          ],
          [
            "Plugin.Maui.Diagnostics",
            "Crash, ANR, unhandled exceptions, breadcrumbs.",
            "[Diagnostics](/packages/plugin-maui-diagnostics/)",
          ],
          [
            "Plugin.Maui.Performance",
            "On-device scoreboard plus `maui-perf` wrapper for `maui profile`.",
            "[Performance](/packages/plugin-maui-performance/)",
          ],
          [
            "Plugin.Maui.LeakAnalyser",
            "WeakReference liveness after a page is popped. Detection Debug-only; teardown may stay in Release.",
            "[LeakAnalyser](/packages/plugin-maui-leak-analyser/)",
          ],
          [
            "Plugin.Maui.Observability",
            "Umbrella telemetry over health, network, API, upload, sync, and crash events.",
            "[Observability](/packages/plugin-maui-observability/)",
          ],
          [
            "MauiDev CLI 1.2.2",
            "`maui-dev` doctor, permissions, publish validate, migrate, JSON/SARIF for CI. Not a PackageReference.",
            "[MauiDev](/toolkits/maui-dev/)",
          ],
          [
            "Pulse CLI 1.0.1",
            "`UseMauiPulse()` plus `maui-pulse attach` for a live Plugin.Maui.* session view. Closed allow-list. Not a PackageReference for the CLI.",
            "[Pulse](/toolkits/maui-pulse/)",
          ],
        ],
      },
    ],
  },
  {
    id: "composition",
    title: "8. A typical composition",
    blocks: [
      {
        type: "p",
        text: "An inspection or field-commerce app is the composition this ecosystem was built for. The table is a recommended set, not a required install.",
      },
      {
        type: "table",
        headers: ["Concern", "Compose"],
        rows: [
          ["Screens", "UIKit recipes + NV* controls. FormValidation and KeyboardManager at the host."],
          ["Shell", "MVVMExpress: `UseMvvmExpress`, `UseShell` or `UseNavigationPage`, `UseAuth`, modules per feature team."],
          ["API", "HttpForge interface + `AddHttpForgeClient`. Chain ApiResilience, ApiCache, TlsPin, SecureSession."],
          ["Local + sync", "LocalStore (SQLite or NuvexaDB) for CRUD. OfflineSync for the queue. JobQueue / SmartUpload for durable work."],
          ["Field", "GeoLocator or Geofence. MediaPipeline → FileVault or SmartUpload. PermissionFlow before the first prompt."],
          ["Session", "SecureSession + SecureStoragePlus. AppLock after background. ScreenGuard on payment or PII screens."],
          ["Ship", "Diagnostics + LeakAnalyser in Debug. Performance scoreboard. MauiDev `doctor` and `publish --validate` in CI."],
        ],
      },
      {
        type: "p",
        text: "A catalog or internal tool can stop at UIKit + MVVMExpress + HttpForge. A kiosk or POS add KeepAwake, DeviceOrientationPlus, Printing, and BluetoothManager. A VoIP surface adds [VoipCore](/packages/plugin-maui-voip-core/). The catalog is opt-in by design.",
      },
    ],
  },
  {
    id: "boundaries",
    title: "9. Boundaries",
    blocks: [
      {
        type: "ul",
        items: [
          "**UIKit is a UI library**, not a MauiEssentials runtime plugin. It does not PackageReference Plugin.Maui.*.",
          "**MVVMExpress does not own HTTP, location, or storage.** Adapters compose siblings and throw if they are missing.",
          "**HttpForge is the contract**, not retry, cache, pin, or upload. Chain those on `IHttpClientBuilder`.",
          "**LocalStore is CRUD.** OfflineSync is the sync engine. JobQueue is planned work. RetryQueue is a failed call. FileVault is encrypted files. They do not replace each other.",
          "**NuvexaDB is a standalone engine** with its own [white paper](/nuvexadb/docs/). LocalStore can host it; Data Studio stays on the engine.",
          "**Most gallery plugins are Android + iOS.** Do not assume Mac Catalyst or Windows unless the package page says so.",
          "**Plugin.Maui.\\* restores from GitHub Packages**, not nuget.org. A project needs two feeds. GitHub Packages requires a token even when the packages are public.",
        ],
      },
    ],
  },
  {
    id: "start",
    title: "10. How to start",
    blocks: [
      {
        type: "ol",
        items: [
          "Scaffold the host: `dotnet new install Plugin.Maui.MVVMExpress.Templates` then `dotnet new mvvmexpress -n MyApp`. Or install the MVVMExpress Visual Studio Code / Visual Studio Marketplace listings.",
          "Add the [GitHub Packages feed](/getting-started/github-packages/) for Plugin.Maui.*. nuget.org remains the feed for Microsoft.*, UIKit, and public packages.",
          "Register `UseNuvyntraUIKit()` and paint the first screen from an [NV* recipe](/uikit/docs/) or a primitive.",
          "Declare the API as an HttpForge interface and `AddHttpForgeClient<T>()`. Add ApiResilience or TlsPin only when the environment needs them.",
          "Pull gallery plugins as the product requires them. Start with LocalStore if the app writes on-device; NetworkMonitor if the app must distinguish captive Wi-Fi from real internet.",
          "Run `maui-dev doctor` before a store build. The [getting-started guide](/getting-started/) is the install path; this paper is the map.",
        ],
      },
      {
        type: "link",
        href: "/packages/",
        label: "Full product catalog",
        note: "Every independently versioned plugin:",
      },
    ],
  },
  {
    id: "closing",
    title: "11. Closing",
    blocks: [
      {
        type: "p",
        text: "Nuvyntra Labs is the development ecosystem for teams who want to ship .NET MAUI apps without a mega-SDK and without an unmanaged pile of community packages. UIKit covers the rich UI. MVVMExpress covers the architecture. HttpForge covers the REST contract. The gallery covers the rest of development — local data, network truth, session, field capture, and operations — as focused plugins a team can name, version, and replace.",
      },
      {
        type: "p",
        text: "Research and public proofs still come first. When a pattern is reusable, it becomes a package. The catalog is the published form of that loop. Evaluate a pillar, compose a set, or [contact the lab](/contact/).",
      },
    ],
  },
];
