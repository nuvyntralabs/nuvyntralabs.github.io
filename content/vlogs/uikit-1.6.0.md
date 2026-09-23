---
title: "UIKit 1.6.0: Lumina Controls and Page Recipes for .NET MAUI"
published: false
description: "NuvyntraLabs.UIKit 1.6.0 is the Lumina UI library: 201 NV* controls, 66 page recipes, and a look refresh with lifted fills, hairline strokes, and NVChrome paint. Register with UseNuvyntraUIKit()."
tags: dotnet, maui, xaml, opensource
series: NuvyntraLabs
cover_image: https://nuvyntralabs.github.io/brand/banner.png
---

A MAUI screen can be a stack of stock entries and buttons, or it can share one type scale, one field chrome, and one sign-in recipe with the rest of the app.

**NuvyntraLabs.UIKit** is that library. Version **1.6.0** is on nuget.org. It is the Lumina catalog: foundation tokens, **201** `NV*` controls, and **66** `NV*View` page recipes. Register it with `UseNuvyntraUIKit()`. XAML uses `xmlns:nv="http://nuvyntralabs.com/uikit"`.

This post is the walkthrough: what 1.6.0 paints, how to register it, a first screen, and where the kit hands work to MVVMExpress, FormValidation, and KeyboardManager.

## What UIKit is

UIKit is a Lumina-themed UI library for **.NET MAUI** on Android, iOS, Mac Catalyst, and Windows. MIT licensed. The font is Outfit (OFL). It targets `net10.0`, Android API 21+, iOS 15+, Mac Catalyst 15+, and Windows 10.0.17763+.

It does one job: paint screens. MauiEssentials plugins stay in the [catalog](https://nuvyntralabs.github.io/packages/). This package does not take a `PackageReference` on `Plugin.Maui.*`.

| | |
| --- | --- |
| Package | [`NuvyntraLabs.UIKit`](https://www.nuget.org/packages/NuvyntraLabs.UIKit) 1.6.0 |
| Registration | `UseNuvyntraUIKit()` |
| XAML | `xmlns:nv="http://nuvyntralabs.com/uikit"` |
| Source | [github.com/nuvyntralabs/NuvyntraLabs.UIKit](https://github.com/nuvyntralabs/NuvyntraLabs.UIKit) |
| Product | [nuvyntralabs.github.io/uikit/](https://nuvyntralabs.github.io/uikit/) |
| Reference | [Component docs](https://nuvyntralabs.github.io/uikit/docs/) |

Add the kit to any MAUI host. [Nuvyn](https://nuvyntralabs.github.io/toolkits/nuvyn/) is the optional start for a new app that already includes UIKit. An existing host does not need that CLI.

Kit-level APIs are a working Lumina surface. They are a separate catalog from Telerik or Syncfusion. PDF, Docx, and Spreadsheet controls are viewers. `NVBarcode` generates a code. Scanning stays on a host plugin.

## What 1.6.0 changes

1.6.0 is a Lumina look refresh on the same 201 controls. Hosts that pin 1.5.x keep compiling. Moving to 1.6.0 picks up the richer chrome.

| Piece | What you get |
| --- | --- |
| Surfaces | Lifted fills, hairline strokes, accent glow, recessed fields |
| Chrome | Richer chips, cards, and overlays |
| `NVChrome` | `Lift`, `Soft`, `Shadow`, `Glow`, `PaintCard`, `PaintField` |
| Tokens | `SurfaceRaised`, `SurfaceSunken`, `AccentSoft`, `AccentDeep`, `AccentLift`, `Hairline`, `Highlight`, `Scrim`, and `Mix()` |

1.5.1 stays in this pack: `NVTheme.Current.SetTypeScale` (0.8–2), `SetFlowDirection`, contrast-safe `OnAccent` / `On(fill)` when white fails 4.5:1, `OverlayHost.TryHandleKey("Escape")`, and `NVCommandPalette.TryHandleShortcut` for Ctrl+K or Cmd+K. A blocking paywall ignores Escape. RTL flips start padding, carousel swipe, and chevrons.

1.5.0 renamed `NVEmailField` to `NVInputField`. New XAML uses `NVInputField`.

## Register

```bash
dotnet add package NuvyntraLabs.UIKit
```

nuget.org publish is pipeline-owned. Install from nuget.org. Leave a local `dotnet nuget push` out of the workflow.

```csharp
builder
    .UseMauiApp<App>()
    .UseNuvyntraUIKit();
```

`UseNuvyntraUIKit()` registers the Outfit font and the Lumina theme: `NVTheme`, `NVTokens`, `NVChrome`.

On the page:

```xml
xmlns:nv="http://nuvyntralabs.com/uikit"
```

```csharp
NVTheme.Current.SetTypeScale(1);
NVTheme.Current.SetFlowDirection(FlowDirection.MatchParent);
```

## A first screen

```xml
<nv:NVCheckBox Text="Accept terms" IsChecked="{Binding Accept}" />
<nv:NVRadioButton GroupName="Plan" Text="Monthly" />
<nv:NVInputField Label="Email" Text="{Binding Email}" />
<nv:NVButton Text="Continue" Variant="Filled" Command="{Binding Submit}" />
```

`NVButton` variants are Filled, tonal, outline, ghost, and danger. `NVInputField` is the labeled field with helper and error chrome. Bind `Command` the same way you bind a MAUI `Button`.

A page recipe drops in as one element. Recipes set titles and seed demo children. They do not add new bindable names of their own.

```xml
<nv:NVSignInView />
<nv:NVInvoiceView />
```

Replace the seeded children when the screen is yours. The recipe is the layout, not the product data.

## The catalog

Foundation types (`NVTheme`, `NVTokens`, `NVChrome`, `NVTypography`, `NVIcons`, `NVMotion`) are helpers. They are not XAML views. Everything a page hosts is an `NV*` view or an `NV*View` recipe.

| Layer | Examples |
| --- | --- |
| Primitives | `NVSurface`, `NVIcon`, `NVAvatar`, `NVBadge`, `NVSkeleton`, `NVOverlay` |
| Actions | `NVButton`, `NVCheckBox`, `NVRadioButton`, `NVRadioGroup`, `NVIconButton` |
| Inputs | `NVTextField`, `NVInputField`, `NVPasswordStrength`, `NVPinPad`, `NVDateRangePicker`, `NVFormField` |
| Feedback and nav | `NVBanner`, `NVEmptyView`, `NVTabView`, `NVBottomSheet`, `NVAppScaffold` |
| Data | `NVDataGrid`, `NVChart`, `NVCalendar`, `NVKanban`, `NVGantt` |
| Social and media | `NVChat`, `NVComposer`, `NVVideoPlayer`, `NVWebView`, `NVPdfViewer` |
| Advanced | `NVMasterDetail`, `NVLockPad`, `NVBiometricGate`, `NVWizard` |
| Next chrome | `NVCommandPalette`, `NVHeatCalendar`, `NVSpeedDial`, `NVDiffView`, `NVCallBar` |

1.4 deepened lists (selection, groups, swipe), grids (filter, sort, frozen columns, paging), charts, calendar, and media. Each control has a docs page with every kit attribute, its type, its default, and whether the name is Lumina-specific or a familiar MAUI name. Start at the [component reference](https://nuvyntralabs.github.io/uikit/docs/). The source list is [UIKitLib.md](https://github.com/nuvyntralabs/NuvyntraLabs.UIKit/blob/main/UIKitLib.md).

## Page recipes

The 66 recipes cover the screens a typical app repeats. Drop one in, then bind your own content.

| Group | Recipes |
| --- | --- |
| Auth | `NVSignInView`, `NVSignUpView`, `NVForgotPasswordView`, `NVResetPasswordView`, `NVWalkthroughView` |
| Commerce | `NVCatalogView`, `NVProductDetailView`, `NVCartView`, `NVCheckoutView`, `NVOrdersView` |
| Content | `NVArticleFeedView`, `NVArticleDetailView`, `NVFaqView`, `NVContactView` |
| Social | `NVInboxView`, `NVConversationView`, `NVSocialProfileView` |
| Files | `NVFileExplorerView`, `NVDocumentsView`, `NVMediaLibraryView` |
| System | `NVSettingsView`, `NVNotificationsView`, `NVDashboardView`, `NVBookingView` |
| 1.2 / 1.3 | `NVInvoiceView`, `NVReceiptView`, `NVSubscriptionView`, `NVCallView`, `NVAddressFormView` |

## Compose at the host

The kit paints. Navigation, validation rules, and the soft keyboard stay on their own packages. Wire them in `MauiProgram`. UIKit does not pull them in.

| Need | Package |
| --- | --- |
| ViewModels, Shell or `NavigationPage`, dialogs, toast | [MVVMExpress](https://nuvyntralabs.github.io/packages/plugin-maui-mvvmexpress/) |
| `Validation.For` rules | [FormValidation](https://nuvyntralabs.github.io/packages/plugin-maui-form-validation/) |
| Hide, show, and safe-area resize for the soft keyboard | [KeyboardManager](https://nuvyntralabs.github.io/packages/plugin-maui-keyboard-manager/) |
| Typed REST | [HttpForge](https://nuvyntralabs.github.io/packages/plugin-maui-httpforge/) |
| A new MAUI host that already includes this kit | [Nuvyn](https://nuvyntralabs.github.io/toolkits/nuvyn/) |

`NVBiometricGate` is the screen chrome. Face ID and the device PIN stay on [BiometricPlus](https://nuvyntralabs.github.io/packages/plugin-maui-biometric/). `NVVideoPlayer`, `NVPdfViewer`, and the document viewers display content. Playback engines and editors stay outside this package.

## When something looks wrong

| What you see | What to do |
| --- | --- |
| `nv` is an unknown prefix | Declare `xmlns:nv="http://nuvyntralabs.com/uikit"` on the page or in `App.xaml`. |
| Controls render unthemed | Call `UseNuvyntraUIKit()` on the MAUI builder so fonts and `NVTheme` load. |
| `NVEmailField` does not resolve | 1.5.0 renamed it to `NVInputField`. |
| Type scale or RTL does nothing | Set `NVTheme.Current.SetTypeScale` and `SetFlowDirection` after the kit is registered. |
| Escape closes a paywall | A blocking paywall ignores `OverlayHost.TryHandleKey("Escape")`. That is the 1.5.1 rule. |
| The kit did not pull in FormValidation | Expected. Add `Plugin.Maui.FormValidation` yourself and call `Validation.For` from the host. |
| A barcode control does not scan | `NVBarcode` generates. Scanning is a host plugin. |

## Where UIKit sits next to the other tools

| Need | Tool |
| --- | --- |
| Lumina controls, tokens, and page recipes | **UIKit** — `NuvyntraLabs.UIKit` |
| Application shell: state, commands, typed navigation | [MVVMExpress](https://nuvyntralabs.github.io/packages/plugin-maui-mvvmexpress/) |
| Generated REST client | [HttpForge](https://nuvyntralabs.github.io/packages/plugin-maui-httpforge/) |
| Local rows, host picks the engine | [LocalStore](https://nuvyntralabs.github.io/packages/plugin-maui-local-store/) |
| One NuGet in an app you already have | This package, on its own |
| A new four-platform host on the Nuvyntra stack | [Nuvyn](https://nuvyntralabs.github.io/toolkits/nuvyn/) — `nuvyn init` |

## Try it

```bash
dotnet add package NuvyntraLabs.UIKit
```

Call `UseNuvyntraUIKit()`, add the `nv` namespace, and place one `NVButton` and one `NVInputField` on `MainPage`. To walk the full catalog, clone the [sample gallery](https://github.com/nuvyntralabs/NuvyntraLabs.UIKit/tree/main/samples/NuvyntraLabs.UIKit.Sample).

- NuGet: [NuvyntraLabs.UIKit](https://www.nuget.org/packages/NuvyntraLabs.UIKit)
- Repository: [github.com/nuvyntralabs/NuvyntraLabs.UIKit](https://github.com/nuvyntralabs/NuvyntraLabs.UIKit)
- Product page: [nuvyntralabs.github.io/uikit/](https://nuvyntralabs.github.io/uikit/)
- Component docs: [nuvyntralabs.github.io/uikit/docs/](https://nuvyntralabs.github.io/uikit/docs/)

---

By [Admin](https://www.linkedin.com/in/niladri-padhy-7ab41626/)
