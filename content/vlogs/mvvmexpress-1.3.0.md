---
title: "MVVMExpress 1.3.0: One Application Shell for .NET MAUI"
published: false
description: "Plugin.Maui.MVVMExpress 1.3.0 is the MAUI application shell: observable models, async commands, bindable AsyncState, and typed Shell or NavigationPage navigation. Phases 8–10 ship on the 1.0 SemVer lock."
tags: dotnet, maui, mvvm, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A field app needs properties, commands, a loading state, and a typed route to the next screen. Those pieces usually arrive as three frameworks that overlap.

**MVVMExpress** is the shell that keeps them on one registration path. Version **1.3.0** is on nuget.org. Core targets `net10.0` and does not reference `Microsoft.Maui.Controls`. The MAUI host calls `UseMvvmExpress`. Shared libraries and tests call `AddMvvmExpress`.

This post is the walkthrough: what 1.3.0 registers, a first ViewModel, navigation, and the pieces Phases 8–10 added on the 1.0 SemVer lock. Public 1.x APIs stay source-compatible. Breaking changes wait for 2.0.0.

## What MVVMExpress is

MVVMExpress is a modular MVVM framework for **.NET MAUI** on Android, iOS, Mac Catalyst, and Windows (single-window). MIT licensed. Manual `INotifyPropertyChanged` and hand-written commands are first-class. Generators are an accelerator.

The page owns `BindingContext`. The ViewModel never holds `Page`. ViewModels depend on `INavigator`, never on `Shell.Current`.

| | |
| --- | --- |
| Host package | [`Plugin.Maui.MVVMExpress`](https://www.nuget.org/packages/Plugin.Maui.MVVMExpress) 1.3.0 |
| Core | [`Plugin.Maui.MVVMExpress.Core`](https://www.nuget.org/packages/Plugin.Maui.MVVMExpress.Core) |
| Registration | `UseMvvmExpress` |
| Source | [github.com/nuvyntralabs/Plugin.Maui.MVVMExpress](https://github.com/nuvyntralabs/Plugin.Maui.MVVMExpress) |
| Docs | [nuvyntralabs.github.io/packages/plugin-maui-mvvmexpress/](https://nuvyntralabs.github.io/packages/plugin-maui-mvvmexpress/) |
| Guides | [Get started](https://nuvyntralabs.github.io/packages/plugin-maui-mvvmexpress/integration/) · [How it works](https://nuvyntralabs.github.io/packages/plugin-maui-mvvmexpress/docs/) |

Install the packages the screen needs. The host package pulls the MAUI registration. Core stays UI-free so a `net10.0` test project can construct the same ViewModel.

| Package | What it adds |
| --- | --- |
| `.Core` | `ObservableModel`, `ViewModel`, commands, `AsyncState`, `Outcome`, `IMessageHub`, `IModule` |
| `.Navigation` | `UseNavigationPage`, `UseShell`, replace-root, modal stack |
| `.Dialogs` | `IDialogs`, toast on `Window.AddOverlay` |
| `.Validation` | DataAnnotations, `MustMatch` |
| `.Pagination` | `SnapshotCollection`, `PagedCollection`, `SearchQuery` |
| `.Reactive` | `CombineLatest` without `System.Reactive` |
| `.SourceGenerators` | `[Notify]`, `[NotifyDependsOn]`, `[RegisterView]`, `[Route]`, analyzers `MVVME001`–`013` |
| `.Testing` | `FakeNavigator`, `FakeDialogs`, `LeakProbe` |
| `.Templates` | `dotnet new mvvmexpress` and `mvvmexpress-page` |

Sibling plugins (NetworkMonitor, ApiCache, SecureSession, FormValidation, FeatureFlags, DeepLinks) are wired by the app through Core abstractions. MVVMExpress does not take a `PackageReference` on them.

## Register

DI is `Microsoft.Extensions.DependencyInjection`. There is no container package to swap in.

```csharp
builder
    .UseMauiApp<App>()
    .UseMvvmExpress(o => o
        .UseNavigationPage()
        .UseDialogs()
        .UseAuth<LoginViewModel>());
```

`UseNavigationPage` is the login → replace-root → push host. `UseShell` is an equal host for flyout, tabs, and `//` routes. Register one of them per window. `UseAuth<TChallenge>()` wraps `GuardedNavigator`. Leave that wrapper in place. `UseSecureSessionAuth()` and `UseDeepLinks()` fail closed when the sibling package is missing.

Call `InitializeComponent()` on `App` before resolving pages. ViewModels talk to `IMainThread`. Leave `MainThread` statics out of the ViewModel.

Generated `[RegisterView]` and `[Route]` apply from `UseMvvmExpress` through a module initializer. An explicit `Map` callback stays optional. A feature assembly registers itself with `AddModule<T>()`:

```csharp
public sealed class CatalogModule : IModule
{
    public void Configure(IServiceCollection services)
    {
        services.AddSingleton<ICatalog, Catalog>();
    }
}

builder.Services.AddModule<CatalogModule>();
```

A convention scan of `*Page` / `*ViewModel` is outside the 1.3 path. `MVVME010` reports that in DEBUG.

## A ViewModel

`ObservableModel.SetProperty` compares with `EqualityComparer<T>.Default` and skips the event when the value is unchanged. `NotifyDependsOn` raises a named set of dependents. Prefer that over `PropertyChanged(null)`, which refreshes every binding.

```csharp
public partial class NameViewModel : ViewModel
{
    [Notify] private string _first = "";
    [Notify] private string _last = "";

    [NotifyDependsOn(nameof(First), nameof(Last))]
    public string FullName => $"{First} {Last}".Trim();
}
```

Types that use `[Notify]` or `[AsyncModelCommand]` stay `partial`. `[NotifyDependsOn]` does not need the Reactive package. Hand-written `SetProperty` remains valid.

Lifecycle on `ViewModel`:

```text
Construct (DI)
  → Accept(args) / Accept(query)
  → InitializeAsync(token)          once
  → OnNavigatedToAsync(token)
  → OnAppearingAsync(token)
  → OnDisappearingAsync(token)
  → OnNavigatedFromAsync(token)
  → Dispose                         cancels ViewModelCancellationToken
```

The token is created in the constructor and cancelled on `Dispose`. After dispose it stays readable, with `IsCancellationRequested` true, so a late continuation can still observe cancel. `AutoAttachLifecycle` (default true) attaches appear and disappear. Dispose is the guaranteed cancel.

`AsyncState<T>` is the bindable status object: `Status`, `Data`, `Error`, plus `IsLoading`, `IsRefreshing`, `IsEmpty`, `HasError`, and `IsSuccess`. `LoadAsync` returns `Outcome<T>`. The name is `Outcome` so it does not collide with an app-level `Result<T>`.

```csharp
public AsyncState<IReadOnlyList<Product>> Products { get; } = new();

await Products.LoadAsync(token => catalog.ListAsync(token), ct);
```

Bind `ItemsSource` to `Products.Data` and `IsRefreshing` to `Products.IsRefreshing`. The host package ships `AsyncStateView` for loading, empty, error, and success templates.

## Commands

The page binds `Button.Command`. The ViewModel owns the work, `CanExecute`, and cancellation. Tests call `ExecuteAsync` without a visual tree.

`AsyncModelCommand` runs through `IOperationExecutor`: `CanExecute`, a concurrency gate, optional timeout, optional retry, optional debounce or throttle, then the delegate. `ICommand.Execute` does not throw. Failures go to `IErrorSink` or `IDialogs`. `ExecuteAsync` still rethrows.

```csharp
SaveCommand = new AsyncModelCommand(
    SaveAsync,
    () => CanSave,
    new AsyncCommandOptions
    {
        Concurrency = ConcurrencyMode.Prevent,
        Timeout = TimeSpan.FromSeconds(15),
        RetryCount = 2,
        RetryDelay = TimeSpan.FromSeconds(1),
    });
```

`ConcurrencyMode` is `Prevent`, `CancelPrevious`, `Queue`, `Allow`, or `Replace`. Call `NotifyCanExecuteChanged` when the condition changes. `CanExecuteChanged` is a weak event, so a button on a popped page does not pin the command. Allocate the command once.

Search text debounce stays on `SearchQuery` (default 300 ms, minimum length 2). Command debounce is a separate option on `AsyncCommandOptions`.

## Navigation

`INavigator` is host-agnostic. Every public method returns `Outcome` and accepts `CancellationToken`. Navigators hop to `IMainThread` before `new Page()` or `Shell.GoToAsync`. An off-thread factory throws.

| Host | When |
| --- | --- |
| `UseNavigationPage` | Login, then `ResetAsync` / `ReplaceRootAsync` so Back cannot return to login. Replaces `window.Page` with a `NavigationPage`. |
| `UseShell` | Flyout, tabs, or an existing Shell. `ResetAsync` works when the destination is a root `ShellContent`. |
| One host per window | A second call is for a second window. |

Typed records are the default argument. The destination implements `IAcceptNavArgs<T>`. `Accept` runs before `InitializeAsync`. A dictionary query exists for deep links through `IAcceptNavQuery`.

```csharp
public sealed record ProductDetailsArgs(int ProductId);

await navigator.NavigateToAsync<ProductDetailsViewModel, ProductDetailsArgs>(new(42));
```

`PushModalAsync` / `PopModalAsync` live on `IPageNavigator`. Toast is an overlay, drawn with `Window.AddOverlay`. It does not wrap `Page.Content`, so a later `ResetAsync` cannot restore a stale tree.

`[RequiresAuth]` on a ViewModel sends an anonymous session to the challenge type from `UseAuth<TChallenge>()`. Production tokens stay on [Plugin.Maui.SecureSession](https://nuvyntralabs.github.io/packages/plugin-maui-secure-session/). The template’s demo sign-in is `demo@mvvmexpress.dev` / `secret`.

## What 1.3.0 adds

Phases 8–10 sit on the 1.0 lock. Existing `UseAuth`, `UseNavigationPage`, and `Map<TViewModel, TPage>` calls keep compiling.

| Phase | What landed |
| --- | --- |
| 8 | One registration path. Generated `[RegisterView]` / `[Route]` apply without a required `Map`. `[NotifyDependsOn]`. CommunityToolkit `ObservableObject` interop. Analyzers `MVVME001`–`003`. |
| 9 | `IModule` / `AddModule<T>()`. Modal stack. `UseDeepLinks` / `UseSecureSessionAuth` (fail closed). `SectionHostView` for in-place tabs. `MvvmSearch`. |
| 10 | Analyzers `MVVME010`–`013`. ILLink roots for Core forms, Navigation, Dialogs, and Pagination. 1.0 contract tests. |

Templates and the Marketplace wrappers pin the same 1.3.0 pack. The extensions install `Plugin.Maui.MVVMExpress.Templates` and run `dotnet new`. They do not copy a private scaffold.

## Scaffold

```bash
dotnet new install Plugin.Maui.MVVMExpress.Templates
dotnet new mvvmexpress -n MyApp
cd MyApp
dotnet new mvvmexpress-page -n Catalog --namespace MyApp
dotnet test MyApp.Tests
```

The app template is a `NavigationPage` host: a counter page, a login that replace-roots back to home, one snapshot list, one `FormViewModel` screen, and a `net10.0` test project. After `mvvmexpress-page`, call `services.AddCatalog()` from `MauiProgram`.

The same commands are in the IDE: [MVVMExpress on the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=nuvyntralabs.mvvmexpress) and [MVVMExpress for Visual Studio 2022+](https://marketplace.visualstudio.com/items?itemName=nuvyntralabs.MVVMExpres-Visual-Studio). After the pack is installed, File → New → Project lists **MVVMExpress MAUI App**.

## When something looks wrong

| What you see | What to do |
| --- | --- |
| `MVVME010` | Stop scanning `*Page` / `*ViewModel`. Use `[RegisterView]` / `[Route]`, or an explicit `Map`. |
| Page factory throws off the UI thread | Let the navigator construct the page. It hops to `IMainThread` first. |
| Back returns to login | Call `ResetAsync` or `ReplaceRootAsync` after sign-in on `UseNavigationPage`. |
| `UseShell` and `UseNavigationPage` both registered | Keep one host per window. |
| Auth guard reconstructed by hand | `UseAuth<TChallenge>()` already wraps `GuardedNavigator`. Register `IAuthState`. |
| `UseDeepLinks` or `UseSecureSessionAuth` throws at startup | The sibling package is missing. These adapters fail closed. |
| A popped page stays in memory | The message handler captured `this`. Subscribe with the recipient argument: `static (vm, _) => vm.Refresh()`. |
| `AddGeneratedViewModels` is redundant | 1.3 applies generated maps from `UseMvvmExpress`. `Map` stays an escape hatch. |
| Windows opens a second window | The MAUI host is single-window. Sibling adapters stay Android and iOS. |

## Where MVVMExpress sits next to the other tools

| Need | Tool |
| --- | --- |
| MAUI application shell: state, commands, typed navigation, dialogs | **MVVMExpress** |
| Source-generated properties and commands beside an existing toolkit | [CommunityToolkit.Mvvm](https://learn.microsoft.com/dotnet/communitytoolkit/mvvm/) — interop package ships with 1.3.0 |
| Observable pipelines | [ReactiveUI](https://www.reactiveui.net/), or `Plugin.Maui.MVVMExpress.Reactive` when you want `CombineLatest` without `System.Reactive` |
| Typed REST on the same host | [Plugin.Maui.HttpForge](https://nuvyntralabs.github.io/packages/plugin-maui-httpforge/) |
| Lumina `NV*` controls | [NuvyntraLabs.UIKit](https://nuvyntralabs.github.io/toolkits/nuvyntralabs-uikit/) |
| A new MAUI app locked to this shell | [Nuvyn](https://nuvyntralabs.github.io/toolkits/nuvyn/) — `nuvyn init` |

CommunityToolkit.Mvvm covers properties and commands. Prism.Maui covers page navigation. ReactiveUI covers observable pipelines. MVVMExpress is the pack when the app needs those three plus bindable async state and a Shell or `NavigationPage` host.

## Try it

```bash
dotnet new install Plugin.Maui.MVVMExpress.Templates
dotnet new mvvmexpress -n HarborDesk
cd HarborDesk
dotnet test HarborDesk.Tests
```

Run the app, sign in with the template demo account, and confirm Back does not return to login. To walk command, dialog, form, auth, and list in one sample, clone [Playground](https://github.com/nuvyntralabs/Plugin.Maui.MVVMExpress/tree/main/samples/Playground).

- NuGet: [Plugin.Maui.MVVMExpress](https://www.nuget.org/packages/Plugin.Maui.MVVMExpress)
- Templates: [Plugin.Maui.MVVMExpress.Templates](https://www.nuget.org/packages/Plugin.Maui.MVVMExpress.Templates)
- Repository: [github.com/nuvyntralabs/Plugin.Maui.MVVMExpress](https://github.com/nuvyntralabs/Plugin.Maui.MVVMExpress)
- Get started: [nuvyntralabs.github.io/packages/plugin-maui-mvvmexpress/integration/](https://nuvyntralabs.github.io/packages/plugin-maui-mvvmexpress/integration/)
- Comparison: [nuvyntralabs.github.io/packages/plugin-maui-mvvmexpress/comparison/](https://nuvyntralabs.github.io/packages/plugin-maui-mvvmexpress/comparison/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
