import type { DocSection } from "@/content/mvvmexpress";
import type { GuideNavGroup, GuideNavItem, GuideTopic } from "@/content/mvvmexpress-guide";
import {
  avaloniaMvvmExpressSlug,
  mauiMvvmExpressSlug,
  unoMvvmExpressSlug,
  winuiMvvmExpressSlug,
  wpfMvvmExpressSlug,
} from "@/content/mvvmexpress-family";

export type DesktopMvvmId = "avalonia" | "uno" | "winui";

export interface DesktopMvvmPlatform {
  id: DesktopMvvmId;
  slug: string;
  label: string;
  prefix: string;
  github: string;
  nuget: string;
  category: "avalonia-plugin" | "uno-plugin" | "winui-plugin";
  tags: string[];
  subtitle: string;
  description: string;
  abstract: string;
  capabilities: string[];
  releaseNotes: string[];
  useHost: string;
  addHost: string;
  mainThread: string;
  windowContext: string;
  navigator: string;
  dialogs: string;
  notifier: string;
  toastPresenter: string;
  formViewModel: string;
  templates: string;
  appTemplate: string;
  pageTemplate: string;
  vscodeItem: string;
  vscodeSearch: string;
  vsSearch: string;
  vscodeCommands: string;
  vsMenu: string;
  vsNewProject: string;
  vsNewItem: string;
  frameType: string;
  dialogSurface: string;
  toastSurface: string;
  toastSetup: string;
  hostTfms: string;
  hostPurpose: string;
  uiKit: string;
  os: string;
  registerUsings: string;
  registerSnippet: string;
  firstScreenXaml: string;
  comparisonPeers: string;
  comparisonNav: string;
  virtualize: string;
}

const avalonia: DesktopMvvmPlatform = {
  id: "avalonia",
  slug: avaloniaMvvmExpressSlug,
  label: "Avalonia",
  prefix: "Plugin.Avalonia.MVVMExpress",
  github: "https://github.com/nuvyntralabs/Plugin.Avalonia.MVVMExpress",
  nuget: "https://www.nuget.org/packages/Plugin.Avalonia.MVVMExpress",
  category: "avalonia-plugin",
  tags: ["Avalonia", "MVVM", "ViewModel", "C#", "Windows", "macOS", "Linux", "VS Code", "Visual Studio"],
  subtitle: "Modular MVVM for Avalonia — ViewModels, async state, Frame host, dialogs",
  description:
    "A modular MVVM framework for Avalonia on .NET 10: observable models, async commands, bindable AsyncState, lifecycle-aware cancellation, typed Frame navigation, dialogs, overlay toast, validation, pagination, forms, and a testing package. 1.0.0 is the first stable Avalonia family — independent of Plugin.Maui.MVVMExpress and Plugin.Wpf.MVVMExpress, with the same Core contract and no Shell host.",
  abstract:
    "Avalonia MVVMExpress is the application shell for production Avalonia apps on Windows, macOS, and Linux. CommunityToolkit.Mvvm covers properties and commands, and ReactiveUI covers observable pipelines. A desktop app often needs both plus bindable async state, lifecycle-aware cancellation, and typed Frame navigation — without taking overlapping frameworks. Core targets net10.0 and does not reference Avalonia or MAUI. Host / Navigation / Dialogs also target net10.0. Current NuGet is 1.0.0. Scaffold with Plugin.Avalonia.MVVMExpress.Templates (dotnet new avalonia-mvvmexpress / avalonia-mvvmexpress-page), or install the Avalonia MVVMExpress listings on the Visual Studio Code and Visual Studio Marketplaces. This is not Plugin.Maui.MVVMExpress or Plugin.Wpf.MVVMExpress: there is no PackageReference between the families. UseAvaloniaMvvmExpress registers AvaloniaDispatcherMainThread and AvaloniaWindowContext. UseFrameNavigation maps ViewModels onto Plugin.Avalonia.MVVMExpress.Controls.Frame named NavigationHost. UseAuth<TChallenge>() wraps GuardedNavigator. Toasts draw on an overlay — never Window.Content. Source generators, Reactive, Shell, UseDeepLinks, and UseSecureSessionAuth are out of 1.0.",
  capabilities: [
    "ObservableModel, ViewModel lifecycle, and ViewModelCancellationToken cancelled on dispose.",
    "Sync and async commands with UI-thread marshal, weak CanExecuteChanged, no-throw ICommand.Execute, timeout, retry, debounce, and throttle.",
    "UseAvaloniaMvvmExpress + AvaloniaDispatcherMainThread + AvaloniaWindowContext. Loaded / Unloaded lifecycle on navigated views.",
    "UseFrameNavigation + ResetAsync / ReplaceRootAsync on Plugin.Avalonia.MVVMExpress.Controls.Frame named NavigationHost. There is no Shell host.",
    "Navigators hop to IMainThread before constructing a view. Off-thread factories throw.",
    "Modal views open as owned Windows. One INavigator per Window — first-class multi-window.",
    "SectionHostView + SectionHostViewModel in-place tabs, SnapshotCollection load-once lists, MvvmSearch + SearchQuery.CommittedText.",
    "FormViewModel.Bind, AvaloniaFormViewModel (INotifyDataErrorInfo), dirty confirm, SubmitAsync, MustMatch, undo/redo.",
    "UseAuth<TChallenge>() / AddAuth<TChallenge>() wraps GuardedNavigator. Register IAuthState yourself.",
    "AvaloniaNotifier toast via overlay — never wraps Window.Content.",
    "IModule / AddModule<T>() for feature-team registration.",
    "CoalescingDispatcher for inbox / hub handlers. IMainThread is the only marshal API in ViewModels.",
    "Testing package: LeakProbe, ScaleProfile, FakeDialogs, FakeNavigator, ScopedNavigator.",
    "dotnet new avalonia-mvvmexpress and avalonia-mvvmexpress-page via Plugin.Avalonia.MVVMExpress.Templates.",
    "VS Code (Create New App / Add Page) and Visual Studio 2022+ (Tools → Avalonia MVVMExpress; File → New → Project) Marketplace wrappers.",
  ],
  releaseNotes: [
    "1.0.0. First stable Avalonia family. Frame host, modal Window dialogs, overlay toasts, validation, pagination, templates, and Visual Studio Code / Visual Studio wrappers.",
    "Templates and Marketplace IDE wrappers pin Plugin.Avalonia.MVVMExpress.Templates 1.0.0.",
    "Independent of Plugin.Maui.MVVMExpress and Plugin.Wpf.MVVMExpress. Core contract aligns with MAUI 1.3; a ViewModel ports with a namespace swap. Breaking changes wait for 2.0.0.",
  ],
  useHost: "UseAvaloniaMvvmExpress",
  addHost: "AddAvaloniaMvvmExpress",
  mainThread: "AvaloniaDispatcherMainThread",
  windowContext: "AvaloniaWindowContext",
  navigator: "AvaloniaFrameNavigator",
  dialogs: "AvaloniaDialogs",
  notifier: "AvaloniaNotifier",
  toastPresenter: "AvaloniaToastPresenter",
  formViewModel: "AvaloniaFormViewModel",
  templates: "Plugin.Avalonia.MVVMExpress.Templates",
  appTemplate: "avalonia-mvvmexpress",
  pageTemplate: "avalonia-mvvmexpress-page",
  vscodeItem: "nuvyntralabs.avalonia-mvvmexpress",
  vscodeSearch: "https://marketplace.visualstudio.com/items?itemName=nuvyntralabs.avalonia-mvvmexpress",
  vsSearch:
    "https://marketplace.visualstudio.com/items?itemName=nuvyntralabs.AvaloniaMVVMExpress",
  vscodeCommands: "Avalonia MVVMExpress: Create New App, Avalonia MVVMExpress: Add Page",
  vsMenu: "Tools → Avalonia MVVMExpress → Create New App…, Add Page…",
  vsNewProject: "MVVMExpress Avalonia App",
  vsNewItem: "MVVMExpress Avalonia Page",
  frameType: "Plugin.Avalonia.MVVMExpress.Controls.Frame named NavigationHost",
  dialogSurface: "owned Window",
  toastSurface: "overlay toast",
  toastSetup: "Do not replace Window.Content with a toast host.",
  hostTfms: "net10.0",
  hostPurpose: "UseAvaloniaMvvmExpress, AvaloniaDispatcherMainThread, AvaloniaWindowContext, Loaded/Unloaded lifecycle, SectionHostView, MvvmSearch, AvaloniaFormViewModel",
  uiKit: "Avalonia",
  os: "Windows, macOS, and Linux",
  registerUsings: `using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Plugin.Avalonia.MVVMExpress.Hosting;
using Plugin.Avalonia.MVVMExpress.Navigation;
using Plugin.Avalonia.MVVMExpress.Dialogs;`,
  registerSnippet: `public override void OnFrameworkInitializationCompleted()
{
    var builder = Host.CreateApplicationBuilder();
    builder.Services.AddSingleton<IAuthState, DemoAuthState>();
    builder.Services.AddTransient<LoginViewModel>();
    builder.Services.AddTransient<HomeViewModel>();
    builder.Services.AddTransient<LoginPage>();
    builder.Services.AddTransient<HomePage>();
    builder.Services.AddSingleton<MainWindow>();
    builder.Services.UseAvaloniaMvvmExpress(o => o
        .UseFrameNavigation((nav, _) => nav
            .Map<LoginViewModel, LoginPage>("login")
            .Map<HomeViewModel, HomePage>("home"))
        .UseDialogs()
        .UseAuth<LoginViewModel>());

    var host = builder.Build();
    if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
    {
        desktop.MainWindow = host.Services.GetRequiredService<MainWindow>();
    }

    _ = host.Services.GetRequiredService<INavigator>()
        .ResetAsync<LoginViewModel>();
    base.OnFrameworkInitializationCompleted();
}`,
  firstScreenXaml: `<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.Pages.HomePage">
  <StackPanel Margin="24">
    <TextBlock Text="{Binding Count}" />
    <Button Content="Increment" Command="{Binding IncrementCommand}" />
  </StackPanel>
</UserControl>`,
  comparisonPeers: "CommunityToolkit.Mvvm, Prism.Avalonia, and ReactiveUI",
  comparisonNav: "Frame replace-root, owned-window modal",
  virtualize: "VirtualizingStackPanel",
};

const uno: DesktopMvvmPlatform = {
  id: "uno",
  slug: unoMvvmExpressSlug,
  label: "Uno Platform",
  prefix: "Plugin.Uno.MVVMExpress",
  github: "https://github.com/nuvyntralabs/Plugin.Uno.MVVMExpress",
  nuget: "https://www.nuget.org/packages/Plugin.Uno.MVVMExpress",
  category: "uno-plugin",
  tags: ["Uno Platform", "WinUI", "MVVM", "ViewModel", "C#", "Windows", "VS Code", "Visual Studio"],
  subtitle: "Modular MVVM for Uno Platform — ViewModels, async state, Frame navigation, dialogs",
  description:
    "A modular MVVM framework for Uno Platform on .NET 10: observable models, async commands, bindable AsyncState, lifecycle-aware cancellation, typed Frame navigation, ContentDialog, overlay toast, validation, pagination, forms, and a testing package. 1.0.0 is the first stable Uno family — independent of Plugin.Maui.MVVMExpress and Plugin.Wpf.MVVMExpress, with the same Core contract and no Shell host.",
  abstract:
    "Uno Platform MVVMExpress is the application shell for production Uno apps. CommunityToolkit.Mvvm covers properties and commands, Prism covers regions, and ReactiveUI covers observable pipelines. An Uno app often needs all three plus bindable async state, lifecycle-aware cancellation, and typed Frame navigation — without taking three overlapping frameworks. Core targets net10.0 and does not reference Uno or MAUI. Host / Navigation / Dialogs target net10.0 and net10.0-desktop. Current NuGet is 1.0.0. Scaffold with Plugin.Uno.MVVMExpress.Templates (dotnet new uno-mvvmexpress / uno-mvvmexpress-page), or install the Uno MVVMExpress listings on the Visual Studio Code and Visual Studio Marketplaces. This is not Plugin.Maui.MVVMExpress or Plugin.Wpf.MVVMExpress: there is no PackageReference between the families. UseUnoMvvmExpress registers UnoDispatcherMainThread and UnoWindowContext. UseFrameNavigation maps ViewModels onto a Frame named NavigationHost. UseAuth<TChallenge>() wraps GuardedNavigator. Dialogs use ContentDialog. Toasts draw on an overlay — never Window.Content. Source generators, Reactive, Shell, UseDeepLinks, and UseSecureSessionAuth are out of 1.0.",
  capabilities: [
    "ObservableModel, ViewModel lifecycle, and ViewModelCancellationToken cancelled on dispose.",
    "Sync and async commands with UI-thread marshal, weak CanExecuteChanged, no-throw ICommand.Execute, timeout, retry, debounce, and throttle.",
    "UseUnoMvvmExpress + UnoDispatcherMainThread + UnoWindowContext. Loaded / Unloaded lifecycle on navigated views.",
    "UseFrameNavigation + ResetAsync / ReplaceRootAsync on a Frame named NavigationHost. There is no Shell host.",
    "Navigators hop to IMainThread before constructing a Page. Off-thread factories throw.",
    "Modal views open as ContentDialog. One INavigator per Window — first-class multi-window.",
    "SectionHostView + SectionHostViewModel in-place tabs, SnapshotCollection load-once lists, MvvmSearch + SearchQuery.CommittedText.",
    "FormViewModel.Bind, UnoFormViewModel (INotifyDataErrorInfo), dirty confirm, SubmitAsync, MustMatch, undo/redo.",
    "UseAuth<TChallenge>() / AddAuth<TChallenge>() wraps GuardedNavigator. Register IAuthState yourself.",
    "UnoNotifier toast via overlay — never wraps Window.Content.",
    "IModule / AddModule<T>() for feature-team registration.",
    "CoalescingDispatcher for inbox / hub handlers. IMainThread is the only marshal API in ViewModels.",
    "Testing package: LeakProbe, ScaleProfile, FakeDialogs, FakeNavigator, ScopedNavigator.",
    "dotnet new uno-mvvmexpress and uno-mvvmexpress-page via Plugin.Uno.MVVMExpress.Templates.",
    "VS Code (Create New App / Add Page) and Visual Studio 2022+ (Tools → Uno MVVMExpress; File → New → Project) Marketplace wrappers.",
  ],
  releaseNotes: [
    "1.0.0. First stable Uno Platform family. Frame navigation, ContentDialog, overlay toasts, validation, pagination, templates, and Visual Studio Code / Visual Studio wrappers.",
    "Templates and Marketplace IDE wrappers pin Plugin.Uno.MVVMExpress.Templates 1.0.0.",
    "Independent of Plugin.Maui.MVVMExpress and Plugin.Wpf.MVVMExpress. Core contract aligns with MAUI 1.3; a ViewModel ports with a namespace swap. Breaking changes wait for 2.0.0.",
  ],
  useHost: "UseUnoMvvmExpress",
  addHost: "AddUnoMvvmExpress",
  mainThread: "UnoDispatcherMainThread",
  windowContext: "UnoWindowContext",
  navigator: "UnoFrameNavigator",
  dialogs: "UnoDialogs",
  notifier: "UnoNotifier",
  toastPresenter: "UnoToastPresenter",
  formViewModel: "UnoFormViewModel",
  templates: "Plugin.Uno.MVVMExpress.Templates",
  appTemplate: "uno-mvvmexpress",
  pageTemplate: "uno-mvvmexpress-page",
  vscodeItem: "nuvyntralabs.plugin-uno-mvvmexpress",
  vscodeSearch: "https://marketplace.visualstudio.com/items?itemName=nuvyntralabs.plugin-uno-mvvmexpress",
  vsSearch:
    "https://marketplace.visualstudio.com/items?itemName=nuvyntralabs.UnoMVVMExpress",
  vscodeCommands: "Uno MVVMExpress: Create New App, Uno MVVMExpress: Add Page",
  vsMenu: "Tools → Uno MVVMExpress → Create New App…, Add Page…",
  vsNewProject: "MVVMExpress Uno App",
  vsNewItem: "MVVMExpress Uno Page",
  frameType: "Frame named NavigationHost",
  dialogSurface: "ContentDialog",
  toastSurface: "overlay toast",
  toastSetup: "Do not replace Window.Content with a toast host.",
  hostTfms: "net10.0; net10.0-desktop",
  hostPurpose: "UseUnoMvvmExpress, UnoDispatcherMainThread, UnoWindowContext, Loaded/Unloaded lifecycle, SectionHostView, MvvmSearch, UnoFormViewModel",
  uiKit: "Uno Platform",
  os: "Windows and Uno desktop hosts",
  registerUsings: `using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.UI.Xaml;
using Plugin.Uno.MVVMExpress.Hosting;
using Plugin.Uno.MVVMExpress.Navigation;
using Plugin.Uno.MVVMExpress.Dialogs;`,
  registerSnippet: `protected override void OnLaunched(LaunchActivatedEventArgs args)
{
    var builder = Host.CreateApplicationBuilder();
    builder.Services.AddSingleton<IAuthState, DemoAuthState>();
    builder.Services.AddTransient<LoginViewModel>();
    builder.Services.AddTransient<HomeViewModel>();
    builder.Services.AddTransient<LoginPage>();
    builder.Services.AddTransient<HomePage>();
    builder.Services.AddSingleton<MainWindow>();
    builder.Services.UseUnoMvvmExpress(o => o
        .UseFrameNavigation((nav, _) => nav
            .Map<LoginViewModel, LoginPage>("login")
            .Map<HomeViewModel, HomePage>("home"))
        .UseDialogs()
        .UseAuth<LoginViewModel>());

    _host = builder.Build();
    var window = _host.Services.GetRequiredService<MainWindow>();
    window.Activate();
    _ = _host.Services.GetRequiredService<INavigator>()
        .ResetAsync<LoginViewModel>();
}`,
  firstScreenXaml: `<Page x:Class="MyApp.Pages.HomePage"
      xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
      xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
  <StackPanel Margin="24">
    <TextBlock Text="{Binding Count}" />
    <Button Content="Increment" Command="{Binding IncrementCommand}" />
  </StackPanel>
</Page>`,
  comparisonPeers: "CommunityToolkit.Mvvm, Prism, ReactiveUI, and Chinook.DynamicMvvm",
  comparisonNav: "Frame replace-root, ContentDialog modal",
  virtualize: "ItemsRepeater / ListView virtualization",
};

const winui: DesktopMvvmPlatform = {
  id: "winui",
  slug: winuiMvvmExpressSlug,
  label: "WinUI 3",
  prefix: "Plugin.WinUI.MVVMExpress",
  github: "https://github.com/nuvyntralabs/Plugin.WinUI.MVVMExpress",
  nuget: "https://www.nuget.org/packages/Plugin.WinUI.MVVMExpress",
  category: "winui-plugin",
  tags: ["WinUI", "WinUI 3", "Windows App SDK", "MVVM", "ViewModel", "C#", "Windows", "VS Code", "Visual Studio"],
  subtitle: "Modular MVVM for WinUI 3 — ViewModels, async state, Frame navigation, dialogs",
  description:
    "A modular MVVM framework for native WinUI 3 on .NET 10: observable models, async commands, bindable AsyncState, lifecycle-aware cancellation, typed Frame navigation, ContentDialog, overlay toast, validation, pagination, forms, and a testing package. 1.0.0 is the first stable WinUI family — independent of Plugin.Maui.MVVMExpress and Plugin.Wpf.MVVMExpress, with the same Core contract and no Shell host.",
  abstract:
    "WinUI 3 MVVMExpress is the application shell for production native WinUI apps on Windows. CommunityToolkit.Mvvm covers properties and commands, Prism covers regions, and ReactiveUI covers observable pipelines. A desktop app often needs all three plus bindable async state, lifecycle-aware cancellation, and typed Frame navigation — without taking three overlapping frameworks. Core targets net10.0 and does not reference WinUI or MAUI. Host / Navigation / Dialogs target net10.0-windows10.0.19041.0. Current NuGet is 1.0.0. Scaffold with Plugin.WinUI.MVVMExpress.Templates (dotnet new winui-mvvmexpress / winui-mvvmexpress-page), or install the WinUI 3 MVVMExpress listings on the Visual Studio Code and Visual Studio Marketplaces. This is not Plugin.Maui.MVVMExpress or Plugin.Wpf.MVVMExpress: there is no PackageReference between the families. UseWinUIMvvmExpress registers DispatcherQueueMainThread and WinUIWindowContext. UseFrameNavigation maps ViewModels onto a Frame named NavigationHost. UseAuth<TChallenge>() wraps GuardedNavigator. Dialogs use ContentDialog. Toasts draw on an overlay — never Window.Content. Source generators, Reactive, Shell, UseDeepLinks, and UseSecureSessionAuth are out of 1.0.",
  capabilities: [
    "ObservableModel, ViewModel lifecycle, and ViewModelCancellationToken cancelled on dispose.",
    "Sync and async commands with UI-thread marshal, weak CanExecuteChanged, no-throw ICommand.Execute, timeout, retry, debounce, and throttle.",
    "UseWinUIMvvmExpress + DispatcherQueueMainThread + WinUIWindowContext. Loaded / Unloaded lifecycle on navigated views.",
    "UseFrameNavigation + ResetAsync / ReplaceRootAsync on a Frame named NavigationHost. There is no Shell host.",
    "Navigators hop to IMainThread before constructing a Page. Off-thread factories throw.",
    "Modal views open as ContentDialog. One INavigator per Window — first-class multi-window.",
    "SectionHostView + SectionHostViewModel in-place tabs, SnapshotCollection load-once lists, MvvmSearch + SearchQuery.CommittedText.",
    "FormViewModel.Bind, WinUIFormViewModel (INotifyDataErrorInfo), dirty confirm, SubmitAsync, MustMatch, undo/redo.",
    "UseAuth<TChallenge>() / AddAuth<TChallenge>() wraps GuardedNavigator. Register IAuthState yourself.",
    "WinUINotifier toast via overlay — never wraps Window.Content.",
    "IModule / AddModule<T>() for feature-team registration.",
    "CoalescingDispatcher for inbox / hub handlers. IMainThread is the only marshal API in ViewModels.",
    "Testing package: LeakProbe, ScaleProfile, FakeDialogs, FakeNavigator, ScopedNavigator.",
    "dotnet new winui-mvvmexpress and winui-mvvmexpress-page via Plugin.WinUI.MVVMExpress.Templates.",
    "VS Code (Create New App / Add Page) and Visual Studio 2022+ (Tools → WinUI MVVMExpress; File → New → Project) Marketplace wrappers.",
  ],
  releaseNotes: [
    "1.0.0. First stable WinUI 3 family. Frame navigation, ContentDialog, overlay toasts, validation, pagination, templates, and Visual Studio Code / Visual Studio wrappers.",
    "Templates and Marketplace IDE wrappers pin Plugin.WinUI.MVVMExpress.Templates 1.0.0.",
    "Independent of Plugin.Maui.MVVMExpress and Plugin.Wpf.MVVMExpress. Core contract aligns with MAUI 1.3; a ViewModel ports with a namespace swap. Breaking changes wait for 2.0.0.",
  ],
  useHost: "UseWinUIMvvmExpress",
  addHost: "AddWinUIMvvmExpress",
  mainThread: "DispatcherQueueMainThread",
  windowContext: "WinUIWindowContext",
  navigator: "WinUIFrameNavigator",
  dialogs: "WinUIDialogs",
  notifier: "WinUINotifier",
  toastPresenter: "WinUIToastPresenter",
  formViewModel: "WinUIFormViewModel",
  templates: "Plugin.WinUI.MVVMExpress.Templates",
  appTemplate: "winui-mvvmexpress",
  pageTemplate: "winui-mvvmexpress-page",
  vscodeItem: "nuvyntralabs.winui-mvvmexpress",
  vscodeSearch: "https://marketplace.visualstudio.com/items?itemName=nuvyntralabs.winui-mvvmexpress",
  vsSearch:
    "https://marketplace.visualstudio.com/items?itemName=nuvyntralabs.WinUIMVVMExpress",
  vscodeCommands: "WinUI MVVMExpress: Create New App, WinUI MVVMExpress: Add Page",
  vsMenu: "Tools → WinUI MVVMExpress → Create New App…, Add Page…",
  vsNewProject: "MVVMExpress WinUI App",
  vsNewItem: "MVVMExpress WinUI Page",
  frameType: "Frame named NavigationHost",
  dialogSurface: "ContentDialog",
  toastSurface: "overlay toast",
  toastSetup: "Do not replace Window.Content with a toast host.",
  hostTfms: "net10.0-windows10.0.19041.0",
  hostPurpose: "UseWinUIMvvmExpress, DispatcherQueueMainThread, WinUIWindowContext, Loaded/Unloaded lifecycle, SectionHostView, MvvmSearch, WinUIFormViewModel",
  uiKit: "WinUI 3",
  os: "Windows",
  registerUsings: `using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.UI.Xaml;
using Plugin.WinUI.MVVMExpress.Hosting;
using Plugin.WinUI.MVVMExpress.Navigation;
using Plugin.WinUI.MVVMExpress.Dialogs;`,
  registerSnippet: `protected override void OnLaunched(LaunchActivatedEventArgs args)
{
    var builder = Host.CreateApplicationBuilder();
    builder.Services.AddSingleton<IAuthState, DemoAuthState>();
    builder.Services.AddTransient<LoginViewModel>();
    builder.Services.AddTransient<HomeViewModel>();
    builder.Services.AddTransient<LoginPage>();
    builder.Services.AddTransient<HomePage>();
    builder.Services.AddSingleton<MainWindow>();
    builder.Services.UseWinUIMvvmExpress(o => o
        .UseFrameNavigation((nav, _) => nav
            .Map<LoginViewModel, LoginPage>("login")
            .Map<HomeViewModel, HomePage>("home"))
        .UseDialogs()
        .UseAuth<LoginViewModel>());

    _host = builder.Build();
    var window = _host.Services.GetRequiredService<MainWindow>();
    window.Activate();
    _ = _host.Services.GetRequiredService<INavigator>()
        .ResetAsync<LoginViewModel>();
}`,
  firstScreenXaml: `<Page x:Class="MyApp.Pages.HomePage"
      xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
      xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
  <StackPanel Margin="24">
    <TextBlock Text="{Binding Count}" />
    <Button Content="Increment" Command="{Binding IncrementCommand}" />
  </StackPanel>
</Page>`,
  comparisonPeers: "CommunityToolkit.Mvvm, Prism, and ReactiveUI",
  comparisonNav: "Frame replace-root, ContentDialog modal",
  virtualize: "ItemsRepeater / ListView virtualization",
};

export const desktopMvvmPlatforms: DesktopMvvmPlatform[] = [avalonia, uno, winui];

function nuget(name: string) {
  return `https://www.nuget.org/packages/${name}`;
}

function docsBase(slug: string) {
  return `/packages/${slug}/docs`;
}

function integrationHref(slug: string) {
  return `/packages/${slug}/integration/`;
}

function comparisonHref(slug: string) {
  return `/packages/${slug}/comparison/`;
}

function section(id: string, from: DocSection[]): DocSection {
  const match = from.find((item) => item.id === id);
  if (!match) {
    throw new Error(`Missing desktop MVVMExpress doc section: ${id}`);
  }
  return match;
}

function buildPackageFamily(platform: DesktopMvvmPlatform) {
  const { prefix } = platform;
  return [
    {
      name: `${prefix}.Core`,
      purpose: "Observable model, commands, ViewModel, SectionHost, IModule, navigator/cache/auth abstractions, state, outcome, messaging",
      status: "Implemented + tests",
      nuget: nuget(`${prefix}.Core`),
    },
    {
      name: prefix,
      purpose: platform.hostPurpose,
      status: "Implemented",
      nuget: nuget(prefix),
    },
    {
      name: `${prefix}.Navigation`,
      purpose: `${platform.navigator}, UseFrameNavigation, replace-root, ${platform.dialogSurface} modal stack`,
      status: "Implemented + tests",
      nuget: nuget(`${prefix}.Navigation`),
    },
    {
      name: `${prefix}.Dialogs`,
      purpose: `IDialogs + ${platform.dialogs} (${platform.dialogSurface}) + ${platform.notifier} (${platform.toastSurface})`,
      status: "Implemented + tests",
      nuget: nuget(`${prefix}.Dialogs`),
    },
    {
      name: `${prefix}.Validation`,
      purpose: "DataAnnotations + IValidator + MustMatch + ILLink trim roots",
      status: "Implemented + tests",
      nuget: nuget(`${prefix}.Validation`),
    },
    {
      name: `${prefix}.Pagination`,
      purpose: "PagedCollection<T>, SnapshotCollection<T>, SearchQuery.CommittedText",
      status: "Implemented + tests",
      nuget: nuget(`${prefix}.Pagination`),
    },
    {
      name: `${prefix}.Testing`,
      purpose: "LeakProbe, ScaleProfile, FakeDialogs, FakeNavigator, FakeMainThread, FakeConnectivity, FakeMessageHub, ScopedNavigator",
      status: "Implemented + tests",
      nuget: nuget(`${prefix}.Testing`),
    },
    {
      name: platform.templates,
      purpose: `dotnet new ${platform.appTemplate} (app) and ${platform.pageTemplate} (XAML + ViewModel + service)`,
      status: "Implemented",
      nuget: nuget(platform.templates),
    },
  ];
}

function buildComposeWith() {
  return [
    {
      name: "Plugin.Maui.MVVMExpress",
      slug: mauiMvvmExpressSlug,
      why: "The MAUI family — same Core contract, different host. Do not add both PackageReferences to one project.",
    },
    {
      name: "Plugin.Wpf.MVVMExpress",
      slug: wpfMvvmExpressSlug,
      why: "The WPF family — same Core contract, different host. A ViewModel ports with a namespace swap.",
    },
    {
      name: "Plugin.Maui.HttpForge",
      slug: "plugin-maui-httpforge",
      why: "Source-generated typed REST client. Core is net10.0 — a desktop ViewModel can consume the same client library.",
    },
    {
      name: "CommunityToolkit.Mvvm",
      slug: null as string | null,
      href: "https://www.nuget.org/packages/CommunityToolkit.Mvvm",
      why: "Usual alternative when you only need properties and commands. Type names stay unique if both are referenced.",
    },
  ];
}

function buildTechnicalSections(platform: DesktopMvvmPlatform): DocSection[] {
  const { prefix, label, useHost, uiKit } = platform;
  return [
    {
      id: "status",
      title: "Status",
      blocks: [
        {
          type: "callout",
          title: "1.0.0",
          text: `Current packages are 1.0.0 (2026-09-09). First stable ${label} family. Public APIs match the Core contract documented in API-DESIGN.md: ObservableModel, ViewModel, commands, AsyncState, Outcome, INavigator, UseAuth<TChallenge>(), Frame navigation, dialogs, validation, pagination, templates, and Marketplace IDE wrappers. Host / Navigation / Dialogs target ${platform.hostTfms}. Core, Validation, Pagination, and Testing stay net10.0. This is not a type-forward of Plugin.Maui.MVVMExpress.* or Plugin.Wpf.MVVMExpress.* — namespaces start with ${prefix}. Source generators, Reactive, Shell, UseDeepLinks, and UseSecureSessionAuth wait for a later release.`,
        },
        {
          type: "p",
          text: `Product name is MVVMExpress (${label} family). Package prefix is ${prefix}. Core does not reference ${uiKit} or Microsoft.Maui.Controls. Manual INotifyPropertyChanged and hand-written commands are first-class. There is no Shell host — put a ${platform.frameType} in the window.`,
        },
      ],
    },
    {
      id: "why",
      title: "Why this exists",
      blocks: [
        {
          type: "p",
          text: `A production ${label} app needs more than INotifyPropertyChanged and ICommand: ViewModel lifecycle bound to Loaded / Unloaded, async work with cancellation, timeout, retry, and busy state, strongly typed Frame navigation, UI state richer than a boolean IsBusy, and testable ViewModels with no static dialog or Frame calls.`,
        },
        {
          type: "ul",
          items: [
            "CommunityToolkit.Mvvm covers properties, commands, and messaging.",
            "Prism covers region and URI navigation. It is a different composition model.",
            "ReactiveUI covers observable pipelines and activation, and requires System.Reactive.",
          ],
        },
        {
          type: "p",
          text: `None of those, alone, is a ${label}-first operation + state + Frame-journal framework with the same Core contract as the MAUI family. MVVMExpress is that shell. It is not a fork of those libraries and it is not a MAUI or WPF package wearing a ${uiKit} TFM.`,
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
            `Core is UI-framework-free. ${prefix}.Core must not reference ${uiKit} or Microsoft.Maui.Controls.`,
            "Optional means optional. Navigation, dialogs, validation, pagination, and testing are separate packages.",
            "Interfaces at the ViewModel boundary. ViewModels depend on INavigator, IDialogs, IMainThread — never on dialog or Frame statics.",
            "Async-first, cancellation-first. Every public async API accepts CancellationToken.",
            "No hidden global state. No static service locator in Core.",
            "One navigator per Window. IWindowContext / WindowNavigatorRegistry key navigation, dialogs, and scopes by window.",
            "No Shell. Frame + SectionHostViewModel cover stack navigation and in-place tabs.",
            "Do not silently swallow exceptions. Every catch transforms to Outcome, calls IErrorSink, logs and rethrows, or maps OperationCanceledException to Cancelled.",
            "No PackageReference to sibling MVVMExpress families. A ViewModel ports with a namespace swap, not a shared assembly.",
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
          code: `                    Application (${label} host)
                    ${useHost} / ${platform.addHost}
                    AddMvvmExpress
                               │
     ┌────────────┬────────────┼────────────┐
     ▼            ▼            ▼            ▼
 Navigation    Dialogs    Validation   Pagination
 Frame +       ${platform.dialogSurface}  IValidator   Paged +
 modal         + overlay                Snapshot
     │            │            │            │
     └────────────┴──────┬─────┴────────────┘
                         ▼
                   Host package
              (lifecycle, DI, dispatcher,
               ${platform.windowContext})
                         │
                         ▼
                        Core
         (forms, pipeline, scopes, cache,
          SectionHost; no ${uiKit}, no MAUI)

${prefix}.Testing              net10.0 fakes
${platform.templates}            dotnet new ${platform.appTemplate}`,
        },
        {
          type: "p",
          text: "There is no SourceGenerators, Reactive, or CommunityToolkit compatibility package in 1.0. Hand-written SetProperty and Map<TViewModel, TView> are the registration path. Sibling MauiEssentials plugins are never PackageReferences of these packages — a shared net10.0 library may still compose HttpForge or a custom IAuthState.",
        },
        {
          type: "table",
          headers: ["Layer", "Owns", "Must not own"],
          rows: [
            ["View (Page / UserControl / Window)", "DataContext, Loaded / Unloaded", "Business work, dialogs, Frame.Navigate"],
            ["ViewModel", "Commands, AsyncState, Outcome", "Window, Frame, dispatcher statics"],
            ["Application services", "Repositories, catalogs, auth", "UI types"],
            ["Adapters", `${uiKit} / backends`, "ViewModel logic"],
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
          text: `INavigator is host-agnostic. UseFrameNavigation is the only ${label} host: login → replace-root → push on a ${platform.frameType}. ${platform.navigator} hops to IMainThread before constructing a view. There is no UseShell.`,
        },
        {
          type: "ul",
          items: [
            "URI stack on the Frame host: Current, Stack, ModalStack, CanGoBack, History, GoBackAsync, PopToRootAsync, ReplaceAsync, ResetAsync / ReplaceRootAsync, PushModalAsync / PopModalAsync.",
            "ResetAsync clears the Frame journal so Back cannot return to login. It does not keep the old journal and Push a new root.",
            `Modal views open as ${platform.dialogSurface} instances — not a second Frame overlay.`,
            "UseAuth<TChallenge>() wraps GuardedNavigator. Register IAuthState yourself (Playground uses DemoAuthState). There is no UseSecureSessionAuth() host helper in 1.0.",
            "One INavigator per IWindowContext. A second Window gets its own navigator.",
            "ViewModels never call Frame.Navigate or show a dialog statically. IMainThread is the only marshal API.",
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
            ["Dialogs", "IDialogs", "IDialogService, MessageBox.Show, ContentDialog statics"],
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
          text: `Designed product surface against ${platform.comparisonPeers}. This table does not claim MVVMExpress is faster than the others. Shipping versus designed is tracked in the repository API-PARITY.md.`,
        },
        {
          type: "table",
          headers: ["Feature", "MVVMExpress", "CommunityToolkit.Mvvm", "Prism", "ReactiveUI"],
          rows: [
            ["Observable properties", "Yes (hand-written in 1.0)", "Yes", "Yes", "Yes"],
            ["Commands / async commands", "Yes", "Yes", "Yes / Partial", "Yes"],
            ["Source generators", "Out of 1.0", "Yes", "No", "Yes"],
            ["Navigation (Frame)", `Yes (${platform.comparisonNav})`, "No", "Yes (regions / URI)", "Yes"],
            ["Lifecycle + cancellation", "Yes", "No", "Yes", "Yes"],
            ["Dialogs / toast", `Yes (${platform.dialogSurface} + overlay)`, "Separate", "Yes", "Extensions"],
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
            ["Large", "50,000", `Same batching; UI must virtualize (${platform.virtualize})`],
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
          code: `dotnet test tests/${prefix}.Core.Tests`,
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
            "Do not ConfigureAwait(false) then construct a view or call Frame.Navigate. Navigators hop first.",
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
            `Types that reference Window or Frame inside Core.`,
            "UseShell, UseDeepLinks, UseSecureSessionAuth, and source-generator attributes.",
          ],
        },
      ],
    },
  ];
}

function buildIntegrationSections(platform: DesktopMvvmPlatform): DocSection[] {
  const { prefix, label, useHost, uiKit } = platform;
  return [
    {
      id: "scaffold",
      title: "Scaffold an app",
      blocks: [
        {
          type: "callout",
          title: "1.0.0 project template",
          text: `Current packages are 1.0.0. Install without --prerelease. Scaffold with ${platform.templates}, the Visual Studio Code or Visual Studio Marketplace listing, or add packages to an existing ${label} app. There is no Shell — the template puts a ${platform.frameType} in the main window. ${platform.toastSetup}`,
        },
        {
          type: "link",
          note: "Visual Studio Code:",
          label: `${label} MVVMExpress on the Marketplace`,
          href: platform.vscodeSearch,
        },
        {
          type: "link",
          note: "Visual Studio 2022+:",
          label: `${label} MVVMExpress on the Marketplace`,
          href: platform.vsSearch,
        },
        {
          type: "code",
          code: `dotnet new install ${platform.templates}
dotnet new ${platform.appTemplate} -n MyApp
cd MyApp
dotnet test MyApp.Tests`,
        },
        {
          type: "p",
          text: "The template is a Frame host that starts on LoginPage, then ResetAsync to HomeViewModel after sign-in, plus details, a form, and a net10.0 test project. Demo sign-in: demo@mvvmexpress.dev / secret. Register your own IAuthState for production tokens.",
        },
        {
          type: "code",
          code: `dotnet new ${platform.pageTemplate} -n Catalog --namespace MyApp`,
        },
        {
          type: "p",
          text: "Then map the route and call services.AddCatalog() in App startup. Move the ViewModel and service into MyApp.Core if you keep that split.",
        },
        {
          type: "link",
          note: "Template pack on nuget.org:",
          label: platform.templates,
          href: nuget(platform.templates),
        },
        {
          type: "link",
          note: "Template pack on GitHub Packages:",
          label: platform.templates,
          href: `${platform.github}/pkgs/nuget/${platform.templates}`,
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
          href: `${platform.github}/tree/main/samples/Playground`,
        },
        {
          type: "code",
          code: `git clone ${platform.github}.git`,
        },
        {
          type: "code",
          code: `dotnet add package ${prefix}.Core
dotnet add package ${prefix}
dotnet add package ${prefix}.Navigation
dotnet add package ${prefix}.Dialogs`,
        },
        {
          type: "p",
          text: `${prefix}.* restores from nuget.org. CI also publishes GitHub Packages. Add Validation, Pagination, and Testing only when the app uses those surfaces.`,
        },
        {
          type: "code",
          code: `dotnet add package ${prefix}.Validation
dotnet add package ${prefix}.Pagination
dotnet add package ${prefix}.Testing`,
        },
      ],
    },
    {
      id: "register",
      title: "Register the host",
      blocks: [
        {
          type: "p",
          text: `Shared libraries and tests call AddMvvmExpress. A ${label} app calls ${useHost} (or ${platform.addHost} on IServiceCollection), which registers Core services, replaces IMainThread with ${platform.mainThread}, maps IWindowContext to ${platform.windowContext}, and auto-attaches Loaded / Unloaded lifecycle.`,
        },
        {
          type: "code",
          code: `${platform.registerUsings}

${platform.registerSnippet}`,
        },
        {
          type: "code",
          code: `// net10.0 tests / shared ViewModel projects
services.AddMvvmExpress();
services.AddAuth<LoginViewModel>();`,
        },
        {
          type: "p",
          text: `UseFrameNavigation registers ${platform.navigator} as INavigator / IPageNavigator. UseDialogs replaces NullDialogs with ${platform.dialogs} and ${platform.notifier}. UseAuth<TChallenge>() wraps GuardedNavigator — call it after UseFrameNavigation. Do not reconstruct the guard. Put a ${platform.frameType} in the window. ${platform.toastSetup}`,
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
          text: `dotnet new ${platform.appTemplate} already ships this first screen. After ${useHost} above, a first page is a ViewModel, SetProperty, AsyncModelCommand, and a XAML bind. The command token is the ViewModel token — Dispose cancels ViewModelCancellationToken. Playground remains the cloneable 15-minute path in the product repo.`,
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
          code: platform.firstScreenXaml,
        },
      ],
    },
    {
      id: "viewmodel",
      title: "First ViewModel",
      blocks: [
        {
          type: "p",
          text: "Inherit ViewModel. Bind AsyncState to the page. Put work on AsyncModelCommand so IsRunning, Cancel, and the ViewModel token stay aligned. Do not show a dialog or call Frame.Navigate from the ViewModel.",
        },
        {
          type: "code",
          code: `using ${prefix}.ComponentModel;
using ${prefix}.Input;
using ${prefix}.State;

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
          text: `Do not Add in a loop for mid or large lists. AddRange raises one CollectionChanged Reset. Large lists must also virtualize — ${platform.virtualize}. The framework will not pretend 100,000 realized rows are fine.`,
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
          text: `Add ${prefix}.Navigation and call UseFrameNavigation(). Typed args use a record and IAcceptNavArgs<T>.Accept. URI / dictionary args use IAcceptNavQuery.`,
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
          code: `builder.Services.${useHost}(o => o
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
          text: `Add ${prefix}.Dialogs and call UseDialogs() on ${useHost}. Inject IDialogs for alerts/confirm and INotifier for toast. ${platform.dialogs} hops to IMainThread like ${platform.notifier}. ${platform.toastPresenter} draws an overlay — it never wraps or replaces Window.Content, so ResetAsync cannot restore a stale tree. ${platform.toastSetup} Tests use FakeDialogs.`,
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
          text: `${prefix}.Validation ships DataAnnotations plus IValidator and MustMatchAttribute. The package includes ILLink.Descriptors.xml that roots Required, MinLength, MaxLength, StringLength, Range, RegularExpression, EmailAddress, Compare, and MustMatch. Custom attributes need an app-level descriptor. FluentValidation is an adapter the app may add. ${label} bindings use ${platform.formViewModel} (INotifyDataErrorInfo).`,
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
          text: `FormViewModel lives in Core and does not reference ${uiKit}. ${platform.formViewModel} adds INotifyDataErrorInfo. Field(name, value) creates a FormField<T>. Bind(field, propertyName, notifyCanExecute) wires the public property and CanExecute. When IDialogs is registered, leaving a dirty form confirms “Discard changes?”. Tests set DirtyNavigation = DirtyNavigationMode.SilentBlock. SubmitAsync(work) calls MarkClean() on success.`,
        },
        {
          type: "code",
          code: `public sealed class ProductEditViewModel : ${platform.formViewModel}
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
          code: `builder.Services.${useHost}(o => o
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
builder.Services.${useHost}(o => o
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
          text: `${prefix}.Testing is net10.0. ViewModels in the template live in a shared net10.0 project so they can be tested without ${uiKit}. FakeNavigator is InMemoryNavigator — assert Current, Stack, and CanGoBack. LeakProbe.Track returns a WeakReference; IsCollected takes that reference. Drop the strong reference before the assert. AppearAsync / DisappearAsync drive lifecycle without a page. ScopedNavigator covers page-scope push/pop GC.`,
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
          text: `There is no separate ${label} SampleApp repository. New apps start with dotnet new ${platform.appTemplate}. The 15-minute path is Playground (command, navigation, dialog, form, auth, list, second window).`,
        },
        {
          type: "link",
          note: "Clone and run:",
          label: "samples/Playground",
          href: `${platform.github}/tree/main/samples/Playground`,
        },
        {
          type: "table",
          headers: ["Sample", "ViewModels", "What it integrates"],
          rows: [
            [`dotnet new ${platform.appTemplate}`, "Login / Home / Details / Edit", "Scaffolded host: Frame, replace-root, form, tests"],
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
            "Do not show a dialog or call Frame.Navigate from a ViewModel. Use IDialogs and INavigator.",
            "Do not Add in a loop for mid or large lists. Use AddRange / ReplaceRange.",
            "Do not capture this in a MessageHub handler. Use the recipient argument.",
            "Do not bind a non-virtualized panel to thousands of rows.",
            "Do not store tokens on the ViewModel. Register an IAuthState adapter.",
            "Do not invent a Shell host. Use Frame + SectionHostView.",
            "Do not reconstruct GuardedNavigator after UseFrameNavigation. Call UseAuth<TChallenge>().",
            "Do not ConfigureAwait(false) then construct a view or call Frame.Navigate. Navigators hop to IMainThread first.",
            platform.toastSetup,
            "Do not name the Frame something other than NavigationHost unless you pass a custom frame accessor.",
            "Do not add a PackageReference to Plugin.Maui.MVVMExpress.* or Plugin.Wpf.MVVMExpress.*. This is an independent family.",
            "Do not mix dispatcher statics in ViewModels. IMainThread is the only marshal API.",
            "Hand-written SetProperty and Map<TViewModel, TView> are the 1.0 path. Generators are out of 1.0.",
          ],
        },
      ],
    },
  ];
}

function buildGuideNav(platform: DesktopMvvmPlatform): GuideNavGroup[] {
  const base = docsBase(platform.slug);
  const integration = integrationHref(platform.slug);
  const comparison = comparisonHref(platform.slug);
  return [
    {
      id: "start",
      title: "Start here",
      items: [
        { title: "Introduction", href: `${base}/` },
        { title: "Getting started", href: integration },
        { title: "Project template", href: `${base}/templates/`, topic: "templates" },
        { title: "IDE extensions", href: `${base}/ide-extensions/`, topic: "ide-extensions" },
        { title: "Comparison", href: comparison },
      ],
    },
    {
      id: "model",
      title: "Application model",
      items: [
        { title: "ViewModels", href: `${base}/viewmodels/`, topic: "viewmodels" },
        { title: "Commands", href: `${base}/commands/`, topic: "commands" },
        { title: "Dependency injection", href: `${base}/dependency-injection/`, topic: "dependency-injection" },
        { title: "Messaging", href: `${base}/messaging/`, topic: "messaging" },
      ],
    },
    {
      id: "shell",
      title: "Application shell",
      items: [
        { title: "Navigation", href: `${base}/navigation/`, topic: "navigation" },
        { title: "Chat host", href: `${base}/chat-host/`, topic: "chat-host" },
        { title: "Dialogs", href: `${base}/dialogs/`, topic: "dialogs" },
        { title: "Validation", href: `${base}/validation/`, topic: "validation" },
        { title: "Forms", href: `${base}/forms/`, topic: "forms" },
        { title: "Lists and search", href: `${base}/lists/`, topic: "lists" },
      ],
    },
    {
      id: "compose",
      title: "Composition",
      items: [
        { title: "Packages", href: `${base}/packages/`, topic: "packages" },
        { title: "Composition", href: `${base}/composition/`, topic: "composition" },
        { title: "Platforms", href: `${base}/platforms/`, topic: "platforms" },
      ],
    },
    {
      id: "internals",
      title: "Internals",
      items: [
        { title: "Operation pipeline", href: `${base}/pipeline/`, topic: "pipeline" },
        { title: "Testing", href: `${base}/testing/`, topic: "testing" },
        { title: "Memory and scale", href: `${base}/memory/`, topic: "memory" },
      ],
    },
    {
      id: "release",
      title: "Release",
      items: [
        { title: "Roadmap", href: `${base}/roadmap/`, topic: "roadmap" },
      ],
    },
  ];
}

function buildGuideTopics(platform: DesktopMvvmPlatform, technical: DocSection[], integration: DocSection[]): GuideTopic[] {
  const base = docsBase(platform.slug);
  const { prefix, label, useHost, uiKit } = platform;
  const tech = (id: string) => section(id, technical);
  const how = (id: string) => section(id, integration);

  return [
    {
      slug: "introduction",
      title: "Introduction",
      description: `What ${label} MVVMExpress is, why it exists, the MIT license, design principles, and how these docs are organized.`,
      sections: [
        tech("status"),
        {
          id: "license",
          title: "License",
          blocks: [
            {
              type: "p",
              text: `${label} MVVMExpress is MIT licensed. There is no community-versus-commercial split and no revenue threshold. You may use the packages in commercial apps without a paid framework license. The SPDX identifier is MIT; LICENSE lives at the repository root and is packed with each nupkg.`,
            },
            {
              type: "p",
              text: `That is a product choice, not a jab at other frameworks. If you already pay for a commercial MVVM stack, keep it. This family exists so a ${label} team can take ViewModels, async state, and Frame navigation without a second license conversation — and so a MAUI team already on Plugin.Maui.MVVMExpress can keep the same Core contract on ${label}.`,
            },
          ],
        },
        tech("why"),
        tech("principles"),
        {
          id: "how-to-read",
          title: "How to read these docs",
          blocks: [
            {
              type: "p",
              text: `The left nav follows the surfaces a production ${label} app actually touches. Start here for the contract. Getting started is the scaffold-or-install path, including dotnet new ${platform.appTemplate}, the first screen, and the Playground clone. Project template documents the packed templates. IDE extensions covers the Visual Studio Code and Visual Studio Marketplace wrappers. Comparison evaluates ${platform.comparisonPeers}. Application model covers ViewModels, commands, DI, and messaging. Application shell covers Frame navigation, chat host, dialogs, validation, forms, and lists. Composition and internals explain packages, windows, the operation pipeline, tests, and scale. Release covers the shipped 1.0.0 roadmap and what waits for a later version.`,
            },
            {
              type: "ul",
              items: [
                "Shipped in 1.0.0 means types exist and tests exist. Frame navigation, dialogs, validation, pagination, templates, and IDE wrappers are complete.",
                `This is not Plugin.Maui.MVVMExpress or Plugin.Wpf.MVVMExpress. Do not add a PackageReference to those families. A ViewModel ports with a namespace swap.`,
                "Source generators, Reactive, Shell, UseDeepLinks, and UseSecureSessionAuth are out of 1.0 — see the roadmap.",
                "Type names stay unique so CommunityToolkit.Mvvm or Prism can sit in the same app if you need them.",
              ],
            },
          ],
        },
        tech("naming"),
        tech("comparison"),
      ],
    },
    {
      slug: "templates",
      title: "Project template",
      description: `Scaffold a ${label} app with dotnet new ${platform.appTemplate}, then add screens with ${platform.pageTemplate}.`,
      sections: [
        {
          id: "install-template",
          title: "Install the template pack",
          blocks: [
            {
              type: "callout",
              title: "1.0.0",
              text: `${platform.templates} ships with 1.0.0. It is a dotnet new pack, not a PackageReference. The generated app pins the 1.0.0 runtime packages and maps pages in App startup. This is not Plugin.Maui.MVVMExpress.Templates.`,
            },
            {
              type: "code",
              code: `dotnet new install ${platform.templates}
dotnet new ${platform.appTemplate} -n MyApp
cd MyApp
dotnet test MyApp.Tests`,
            },
            {
              type: "link",
              note: "nuget.org:",
              label: `${platform.templates} 1.0.0`,
              href: nuget(platform.templates),
            },
            {
              type: "link",
              note: "GitHub Packages:",
              label: `${platform.templates} 1.0.0`,
              href: `${platform.github}/pkgs/nuget/${platform.templates}`,
            },
            {
              type: "p",
              text: `From the product repo, without installing the nupkg: dotnet new install templates/ and then dotnet new ${platform.appTemplate} -n MyApp.`,
            },
            {
              type: "p",
              text: "Same commands from the IDE: install the Visual Studio Code or Visual Studio Marketplace listing. The wrappers install the pack and run dotnet new — they do not copy the scaffold.",
            },
          ],
        },
        {
          id: "app-template",
          title: `${platform.appTemplate} app`,
          blocks: [
            {
              type: "p",
              text: `Short name: ${platform.appTemplate}. Creates a ${label} Frame host. There is no Shell.`,
            },
            {
              type: "table",
              headers: ["Included", "What you get"],
              rows: [
                ["Main window", `Frame named NavigationHost. ${platform.toastSetup}`],
                ["Login", "ResetAsync to Home after sign-in"],
                ["Home list + details", "SnapshotCollection and typed NavigateToAsync"],
                ["Form", `${platform.formViewModel} screen`],
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
          title: `${platform.pageTemplate} item`,
          blocks: [
            {
              type: "code",
              code: `cd MyApp
dotnet new ${platform.pageTemplate} -n Catalog --namespace MyApp`,
            },
            {
              type: "p",
              text: "Creates a XAML page, ViewModel, service, AddCatalog(), and {Binding} / Command. Map the route in App startup:",
            },
            {
              type: "code",
              code: `builder.Services.${useHost}(o => o
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
              href: integrationHref(platform.slug),
            },
            {
              type: "link",
              note: "IDE wrappers:",
              label: "VS Code and Visual Studio extensions",
              href: `${base}/ide-extensions/`,
            },
          ],
        },
      ],
    },
    {
      slug: "ide-extensions",
      title: "IDE extensions",
      description: `Thin Visual Studio Code and Visual Studio wrappers that install ${platform.templates} and run dotnet new.`,
      sections: [
        {
          id: "what-they-are",
          title: "What they are",
          blocks: [
            {
              type: "callout",
              title: "Marketplace listings",
              text: `The extensions do not copy the scaffold. They install ${platform.templates} and run the same dotnet new commands as the CLI. Extension version is 1.0.0, matching the template pack. Requires the .NET SDK on PATH. This is not the MAUI MVVMExpress extension.`,
            },
            {
              type: "table",
              headers: ["Host", "Commands"],
              rows: [
                ["Visual Studio Code", platform.vscodeCommands],
                ["Visual Studio 2022+", platform.vsMenu],
              ],
            },
            {
              type: "p",
              text: `After the template pack is installed, Visual Studio File → New → Project lists ${platform.vsNewProject}. Add → New Item lists ${platform.vsNewItem}.`,
            },
          ],
        },
        {
          id: "install-marketplace",
          title: "Install from Marketplace",
          blocks: [
            {
              type: "p",
              text: `Install the ${label} listings:`,
            },
            {
              type: "link",
              note: "Visual Studio Code:",
              label: `${label} MVVMExpress on the Marketplace`,
              href: platform.vscodeSearch,
            },
            {
              type: "link",
              note: "Visual Studio 2022+:",
              label: `${label} MVVMExpress on the Marketplace`,
              href: platform.vsSearch,
            },
            {
              type: "p",
              text: `In the editor: Extensions → search ${label} MVVMExpress → Install. Then ${platform.vscodeCommands.split(",")[0]} / Add Page (VS Code) or ${platform.vsMenu.split("→")[0].trim()} → ${label} MVVMExpress (Visual Studio).`,
            },
          ],
        },
        {
          id: "cli-no-extension",
          title: "CLI (no extension)",
          blocks: [
            {
              type: "code",
              code: `dotnet new install ${platform.templates}
dotnet new ${platform.appTemplate} -n MyApp
dotnet new ${platform.pageTemplate} -n Catalog --namespace MyApp`,
            },
            {
              type: "link",
              note: "Packed templates:",
              label: "Project template",
              href: `${base}/templates/`,
            },
            {
              type: "link",
              note: "Product-repo details:",
              label: "extensions/README.md",
              href: `${platform.github}/blob/main/extensions/README.md`,
            },
          ],
        },
      ],
    },
    {
      slug: "viewmodels",
      title: "ViewModels",
      description: "ObservableModel, ViewModel lifecycle, PageViewModel, AsyncState, and Outcome — the bindable unit of work.",
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
        tech("core"),
      ],
    },
    {
      slug: "commands",
      title: "Commands",
      description:
        "ModelCommand and AsyncModelCommand: CanExecute, concurrency, timeout, retry, and how they sit on the operation pipeline.",
      sections: [how("commands")],
    },
    {
      slug: "dependency-injection",
      title: "Dependency injection",
      description: `AddMvvmExpress and ${useHost}, what the host registers, and how the app replaces navigators and dialogs.`,
      sections: [
        {
          id: "host",
          title: "Host registration",
          blocks: [
            {
              type: "p",
              text: `MVVMExpress uses Microsoft.Extensions.DependencyInjection only. There is no DryIoc, Unity, or Grace package. Shared libraries and tests call AddMvvmExpress. A ${label} app calls ${useHost}, which registers Core services, replaces IMainThread with ${platform.mainThread}, maps IWindowContext to ${platform.windowContext}, marshals command/property notifications, and auto-attaches Loaded / Unloaded lifecycle.`,
            },
            {
              type: "code",
              code: `builder.Services.${useHost}(o => o
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
                ["IWindowContext", "WindowContext.Default", `${platform.windowContext}.Current / For(Window)`],
                ["IWindowNavigatorRegistry", "WindowNavigatorRegistry", "Keep; register per window"],
                ["INavigator / IPageNavigator", "InMemoryNavigator", "UseFrameNavigation()"],
                ["IMainThread", "ImmediateMainThread", `${platform.mainThread} (host)`],
                ["IDialogs / INotifier", "NullDialogs", `UseDialogs() → ${platform.dialogs} / ${platform.notifier}`],
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
      sections: [how("messaging")],
    },
    {
      slug: "navigation",
      title: "Navigation",
      description:
        "UseFrameNavigation, UI-thread view construction, typed records, URI query, replace-root, modals, and guards.",
      sections: [tech("navigation"), how("navigation-howto")],
    },
    {
      slug: "chat-host",
      title: "Chat host",
      description: "In-place tabs with SectionHostView, a load-once inbox, and a thread on the Frame stack.",
      sections: [how("chat-host")],
    },
    {
      slug: "dialogs",
      title: "Dialogs",
      description: `IDialogs via ${platform.dialogSurface} and INotifier toast on an overlay — never wrapping Window.Content.`,
      sections: [how("dialogs")],
    },
    {
      slug: "validation",
      title: "Validation",
      description: `DataAnnotations, IValidator, MustMatch, and INotifyDataErrorInfo on ${platform.formViewModel}.`,
      sections: [how("validation")],
    },
    {
      slug: "forms",
      title: "Forms",
      description: `FormViewModel in Core, ${platform.formViewModel} for ${label} bindings, dirty confirm, SubmitAsync, undo/redo.`,
      sections: [how("forms")],
    },
    {
      slug: "lists",
      title: "Lists and search",
      description: "ObservableRangeCollection batching, SnapshotCollection, PagedCollection, and SearchQuery.CommittedText.",
      sections: [how("collections"), how("pagination")],
    },
    {
      slug: "packages",
      title: "Packages",
      description: `How the ${label} family splits Core, host, Navigation, Dialogs, Validation, Pagination, Testing, and Templates.`,
      sections: [tech("packages")],
    },
    {
      slug: "composition",
      title: "Composition",
      description: `What ${label} MVVMExpress owns, what stays in the app, and how it relates to the MAUI and WPF families.`,
      sections: [
        {
          id: "own",
          title: "What this family owns",
          blocks: [
            {
              type: "p",
              text: `${label} MVVMExpress owns ViewModels, commands, async state, Frame navigation, dialogs, toast, validation, pagination, forms, and tests. It does not own HTTP, offline sync, secure storage, or feature flags. Core abstractions (ICache, IAuthState, IConnectivityProbe, IDeepLinkBridge) exist so the app can adapt a shared net10.0 library. AddDeepLinks and AddSecureSessionAuth fail closed unless you supply a bridge or factory — there is no silent no-op and no UseDeepLinks / UseSecureSessionAuth host helper in 1.0.`,
            },
            {
              type: "ul",
              items: [
                "Do not add a PackageReference to Plugin.Maui.MVVMExpress.* or Plugin.Wpf.MVVMExpress.*.",
                `A ViewModel ports with a namespace swap from Plugin.Maui.MVVMExpress or Plugin.Wpf.MVVMExpress to ${prefix}.`,
                "HttpForge Core is net10.0 — a desktop ViewModel can consume the same typed client.",
                "Usual alternative for properties and commands only: CommunityToolkit.Mvvm.",
              ],
            },
          ],
        },
      ],
    },
    {
      slug: "platforms",
      title: "Platforms",
      description: `${label} on ${platform.os}, TFMs, one navigator per window, and how multi-window differs from the MAUI host.`,
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
                ["Host, Navigation, Dialogs", platform.hostTfms],
              ],
            },
            {
              type: "p",
              text: `Supported host is ${uiKit} on ${platform.os}. MAUI apps use Plugin.Maui.MVVMExpress. WPF apps use Plugin.Wpf.MVVMExpress.`,
            },
          ],
        },
        {
          id: "windows",
          title: "One navigator per window",
          blocks: [
            {
              type: "p",
              text: `IWindowContext / WindowNavigatorRegistry key navigation, dialogs, and scopes by window. ${platform.windowContext}.For(Window) and ${platform.windowContext}.Current are the host adapters. Playground’s SecondaryWindow shows a second window without sharing the main Frame.`,
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
      description: `FakeNavigator, LeakProbe, AppearAsync, and net10.0 tests without a ${label} visual tree.`,
      sections: [how("testing")],
    },
    {
      slug: "memory",
      title: "Memory and scale",
      description: "Why popped ViewModels must collect, weak events, and list batching at mid and large scale.",
      sections: [tech("memory")],
    },
    {
      slug: "roadmap",
      title: "Roadmap",
      description: `What 1.0.0 shipped, what is explicitly out of 1.0, and how the family stays aligned with MAUI Core.`,
      sections: [
        {
          id: "shipped",
          title: "Shipped in 1.0.0",
          blocks: [
            {
              type: "ul",
              items: [
                "Core contract aligned with MAUI 1.3: ObservableModel, ViewModel, commands, AsyncState, Outcome, INavigator, GuardedNavigator, forms, SectionHost.",
                `${useHost}, ${platform.mainThread}, ${platform.windowContext}, Loaded / Unloaded lifecycle.`,
                `${platform.navigator}, UseFrameNavigation, ResetAsync replace-root, ${platform.dialogSurface} modals.`,
                `${platform.dialogs} and overlay toasts.`,
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
}

function buildComparisonSections(platform: DesktopMvvmPlatform): DocSection[] {
  return [
    {
      id: "scope",
      title: "Scope",
      blocks: [
        {
          type: "callout",
          title: "Architectural comparison",
          text: `This page evaluates ${platform.label} MVVMExpress against ${platform.comparisonPeers}. Scores are an architectural reading of shipped surfaces, not BenchmarkDotNet or process RSS. This page does not claim MVVMExpress is faster than the others.`,
        },
        {
          type: "p",
          text: `CommunityToolkit.Mvvm is a ViewModel micro-toolkit. Prism is a convention and module framework with regions and URI navigation. ReactiveUI is a reactive functional stack that expects System.Reactive. ${platform.label} MVVMExpress is a modular application shell: ViewModels, async state, Frame navigation, dialogs, auth, forms, and a testing package. It is not Plugin.Maui.MVVMExpress or Plugin.Wpf.MVVMExpress.`,
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
            ["Navigation", platform.comparisonNav, "Manual / Frame", "Regions + URI", "ViewModel-first RoutingState"],
            ["Async state and forms", `AsyncState, FormViewModel / ${platform.formViewModel}`, "App-owned", "App-owned", "OAPH / Rx extensions"],
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
            ["Dialogs", "IDialogService / MessageBox / ContentDialog", "IDialogs"],
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
          text: `Memory. MVVMExpress Core targets net10.0 without ${platform.uiKit} and ships LeakProbe for subscription leaks (9.5/10). CommunityToolkit.Mvvm is the usual efficiency baseline — generators, no reflection (10/10). Prism carries container and region-tracking cost (7.5/10). ReactiveUI is efficient when IDisposable subscriptions are owned; unmanaged pipelines leak (6.5/10).`,
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
          text: `MVVMExpress. Pros: modular packages, UseAuth, Frame replace-root, multi-window IWindowContext, LeakProbe, forms and dialogs in one shell, same Core contract as the MAUI family. Cons: smaller community, no source generators in 1.0, more packages to learn than a single toolkit.`,
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
            `CommunityToolkit.Mvvm is the usual first package on a new ${platform.label} app.`,
            "Prism is common on enterprise desktops that already use regions.",
            "ReactiveUI is chosen when the app is already Rx-first.",
            `${platform.label} MVVMExpress is for teams that otherwise compose Frame navigation, auth, dialogs, and leak tests from separate libraries — or that already use the MAUI family and want the same ViewModel contract on ${platform.label}.`,
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
            "Choose ReactiveUI when application logic is driven by Rx streams.",
            `Choose ${platform.label} MVVMExpress when you want one shell for Frame navigation, UseAuth, dialogs, forms, and LeakProbe — or when a MAUI app using Plugin.Maui.MVVMExpress needs the same ViewModel contract on ${platform.label}. Do not reference sibling families in one project.`,
          ],
        },
      ],
    },
  ];
}

export interface DesktopMvvmFamily {
  platform: DesktopMvvmPlatform;
  packageFamily: ReturnType<typeof buildPackageFamily>;
  composeWith: ReturnType<typeof buildComposeWith>;
  technicalSections: DocSection[];
  integrationSections: DocSection[];
  comparisonSections: DocSection[];
  guideNav: GuideNavGroup[];
  guideTopics: GuideTopic[];
  docsBase: string;
  integrationHref: string;
  comparisonHref: string;
}

function buildFamily(platform: DesktopMvvmPlatform): DesktopMvvmFamily {
  const technicalSections = buildTechnicalSections(platform);
  const integrationSections = buildIntegrationSections(platform);
  return {
    platform,
    packageFamily: buildPackageFamily(platform),
    composeWith: buildComposeWith(),
    technicalSections,
    integrationSections,
    comparisonSections: buildComparisonSections(platform),
    guideNav: buildGuideNav(platform),
    guideTopics: buildGuideTopics(platform, technicalSections, integrationSections),
    docsBase: docsBase(platform.slug),
    integrationHref: integrationHref(platform.slug),
    comparisonHref: comparisonHref(platform.slug),
  };
}

export const desktopMvvmFamilies: DesktopMvvmFamily[] = desktopMvvmPlatforms.map(buildFamily);

const familiesBySlug = new Map(desktopMvvmFamilies.map((item) => [item.platform.slug, item]));

export function getDesktopMvvmFamily(slug: string): DesktopMvvmFamily | undefined {
  return familiesBySlug.get(slug);
}

export function isGeneratedDesktopMvvmSlug(slug: string): boolean {
  return familiesBySlug.has(slug);
}

export function getDesktopGuideTopic(slug: string, topic: string): GuideTopic | undefined {
  return getDesktopMvvmFamily(slug)?.guideTopics.find((item) => item.slug === topic);
}

export function desktopGuideTopicSlugs(slug: string): string[] {
  return (
    getDesktopMvvmFamily(slug)
      ?.guideTopics.filter((topic) => topic.slug !== "introduction")
      .map((topic) => topic.slug) ?? []
  );
}

export function allDesktopGuideHrefs(): string[] {
  return [
    ...new Set(
      desktopMvvmFamilies.flatMap((family) => family.guideNav.flatMap((group) => group.items.map((item) => item.href))),
    ),
  ];
}

export function adjacentDesktopGuidePages(
  slug: string,
  currentHref: string,
): { previous: GuideNavItem | null; next: GuideNavItem | null } {
  const items = getDesktopMvvmFamily(slug)?.guideNav.flatMap((group) => group.items) ?? [];
  const index = items.findIndex((item) => item.href === currentHref);
  return {
    previous: index > 0 ? items[index - 1] : null,
    next: index >= 0 && index < items.length - 1 ? items[index + 1] : null,
  };
}

export function desktopPackageDoc(platform: DesktopMvvmPlatform) {
  return {
    slug: platform.slug,
    name: platform.prefix,
    title: "MVVMExpress",
    subtitle: platform.subtitle,
    description: platform.description,
    github: platform.github,
    nuget: platform.nuget,
    language: "C#",
    category: platform.category,
    group: "Application framework" as const,
    tags: platform.tags,
    abstract: platform.abstract,
    version: "1.0.0",
    releaseNotes: platform.releaseNotes,
    capabilities: platform.capabilities,
    prerelease: false,
    installPackages: [`${platform.prefix}.Core`, platform.prefix, `${platform.prefix}.Navigation`, `${platform.prefix}.Dialogs`],
    guides: {
      technical: `${docsBase(platform.slug)}/`,
      integration: integrationHref(platform.slug),
      comparison: comparisonHref(platform.slug),
      technicalSummary: `ViewModels, commands, DI, messaging, Frame navigation, modules, chat host, forms, project template, IDE extensions, and the shipped 1.0.0 roadmap.`,
      integrationSummary: `dotnet new ${platform.appTemplate}, VS Code or Visual Studio Marketplace extensions, install 1.0.0 into an existing app, first screen, UseFrameNavigation, Playground clone, FakeNavigator / LeakProbe, and forms.`,
    },
  };
}

export const desktopPackageDocs = desktopMvvmPlatforms.map(desktopPackageDoc);