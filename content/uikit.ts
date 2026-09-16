export const uiKitHref = "/uikit/";

export const uiKit = {
  name: "UIKit(MAUI)",
  title: "NuvyntraLabs.UIKit",
  packageId: "NuvyntraLabs.UIKit",
  version: "1.4.0",
  license: "MIT",
  github: "https://github.com/nuvyntralabs/NuvyntraLabs.UIKit",
  nuget: "https://www.nuget.org/packages/NuvyntraLabs.UIKit",
  sample: "https://github.com/nuvyntralabs/NuvyntraLabs.UIKit/tree/main/samples/NuvyntraLabs.UIKit.Sample",
  reference: "https://github.com/nuvyntralabs/NuvyntraLabs.UIKit/blob/main/UIKitLib.md",
  xmlns: "http://nuvyntralabs.com/uikit",
  register: "UseNuvyntraUIKit()",
  controlCount: 201,
  recipeCount: 66,
  subtitle: "Lumina UI kit — NV* controls and page recipes for .NET MAUI",
  description:
    "Lumina-themed UI library for .NET MAUI on Android, iOS, Mac Catalyst, and Windows. One package: NV* controls, design tokens, and page recipes. This is a UI library, not a MauiEssentials runtime plugin.",
  abstract:
    "NuvyntraLabs.UIKit 1.4.0 is the Lumina catalog for a typical MAUI app: foundation tokens, 201 NV* controls from primitives through advanced and Next chrome, and 66 NV*View page recipes. Register with UseNuvyntraUIKit(), then use xmlns nv. 1.4 deepens lists, grids, charts, calendar, and media so catalog types look and behave like the control. Kit-level APIs stay a working Lumina surface — not Telerik or Syncfusion parity. PDF, Docx, and Spreadsheet are viewers. NVBarcode generates; it does not scan. Compose FormValidation, KeyboardManager, and MVVMExpress at the host. This library does not PackageReference Plugin.Maui.*.",
  tags: [
    ".NET MAUI",
    "UI kit",
    "Lumina",
    "NV*",
    "XAML",
    "Android",
    "iOS",
    "Mac Catalyst",
    "Windows",
  ],
  capabilities: [
    "One library: NV* controls, Lumina tokens, and page recipes. Prefix NV, xmlns http://nuvyntralabs.com/uikit.",
    "UseNuvyntraUIKit() registers fonts and the Lumina theme (NVTheme, NVTokens, Outfit).",
    "201 controls plus helpers NVRadioGroup and NVFormField — basics through advanced, plus 1.2 / 1.3 chrome.",
    "66 NV*View page recipes for auth, commerce, content, social, files, system, invoice, call, and address screens.",
    "1.4 deepens lists (selection, groups, swipe), grids (filter, sort, frozen columns, paging), charts, calendar, and media.",
    "Targets net10.0, Android API 21+, iOS 15+, Mac Catalyst 15+, and Windows 10.0.17763+ (packed on Windows).",
    "MIT. Font is Outfit (OFL). Look is original Lumina — not a Syncfusion or Telerik theme.",
  ],
} as const;

export const uiKitCatalogHighlight = `${uiKit.packageId} ships ${uiKit.controlCount} unique UI controls, plus ${uiKit.recipeCount} page recipes.`;

export const uiKitLayers = [
  {
    name: "Foundation",
    types: "NVTheme, NVTokens, NVTypography, NVIcons, NVMotion, NVDensity, NVVisualState, NVAccessibility",
    role: "Static / singleton helpers. Not XAML views.",
  },
  {
    name: "Primitives",
    types: "NVSurface, NVDivider, NVIcon, NVAvatar, NVBadge, NVSkeleton, NVOverlay, NVInteractiveViewer",
    role: "Themed paper, glyphs, overlays, and zoom/pan.",
  },
  {
    name: "Actions",
    types: "NVButton, NVCheckBox, NVRadioButton, NVRadioGroup, NVIconButton",
    role: "Filled / tonal / outline / ghost / danger buttons and selection.",
  },
  {
    name: "Inputs",
    types: "NVTextField, NVEmailField, NVPasswordStrength, NVPinPad, NVDateRangePicker, NVFormField",
    role: "Labeled fields with helper / error chrome.",
  },
  {
    name: "Feedback / nav",
    types: "NVBanner, NVEmptyView, NVTabView, NVBottomSheet, NVNavigationView, NVAppScaffold",
    role: "Status, sheets, tabs, and app chrome.",
  },
  {
    name: "Data / viz",
    types: "NVDataGrid, NVChart, NVCalendar, NVKanban, NVGantt",
    role: "Grids, charts, calendar, and planning surfaces.",
  },
  {
    name: "Social / media",
    types: "NVChat, NVComposer, NVVideoPlayer, NVWebView, NVPdfViewer",
    role: "Chat chrome plus media viewers — not playback or document engines.",
  },
  {
    name: "Advanced",
    types: "NVMasterDetail, NVLockPad, NVBiometricGate, NVWizard, NVTicket",
    role: "Compositions. Real biometrics stay on the host plugin.",
  },
  {
    name: "Next (1.2 / 1.3)",
    types: "NVCommandPalette, NVHeatCalendar, NVSpeedDial, NVDiffView, NVCallBar, NVReviewPrompt",
    role: "App chrome added after 1.0 — palette, paywall, pivot, diff, call, review.",
  },
  {
    name: "Pages",
    types: "NVSignInView … NVAddressFormView",
    role: "66 content recipes. They set titles and seed demo children.",
  },
] as const;

export const uiKitRecipes = [
  {
    group: "Auth",
    types: "NVSignInView, NVSignUpView, NVForgotPasswordView, NVResetPasswordView, NVSocialSignInView, NVTabbedAuthView, NVProfileSetupView, NVWalkthroughView",
  },
  {
    group: "Commerce",
    types: "NVCategoryView, NVCatalogView, NVProductHomeView, NVProductDetailView, NVCartView, NVWishlistView, NVCheckoutView, NVCardPaymentView, NVSavedCardsView, NVPaymentResultView, NVOrdersView, NVOrderHistoryView",
  },
  {
    group: "Content",
    types: "NVArticleFeedView, NVArticleDetailView, NVMyArticlesView, NVReviewView, NVContactView, NVAboutView, NVFaqView, NVBookmarksView",
  },
  {
    group: "Social",
    types: "NVInboxView, NVConversationView, NVSocialProfileView, NVPeopleListView, NVAuthorProfileView, NVHealthProfileView, NVChatProfileView",
  },
  {
    group: "Files",
    types: "NVNavigationHubView, NVMediaLibraryView, NVPlaylistView, NVFileExplorerView, NVDocumentsView, NVSuggestionsView",
  },
  {
    group: "System",
    types: "NVStatusView, NVSettingsView, NVHelpView, NVNotificationsView, NVDeliveryTrackView, NVAddressBookView, NVBookingView, NVDashboardView",
  },
  {
    group: "Extras",
    types: "NVPinLockView, NVForceUpdateView, NVSearchResultsView, NVFilterSheetView, NVMediaPlayerView, NVSplitInboxView, NVOnboardingPermissionsView, NVOrderSummaryView",
  },
  {
    group: "Next (1.2)",
    types: "NVInvoiceView, NVReceiptView, NVCompareView, NVStoreLocatorView, NVSubscriptionView, NVWhatsNewView",
  },
  {
    group: "Next (1.3)",
    types: "NVConflictResolveView, NVCallView, NVAddressFormView",
  },
] as const;

export const uiKitComposeWith = [
  {
    href: "/packages/plugin-maui-mvvmexpress/",
    name: "MVVMExpress",
    body: "ViewModels, navigation, dialogs, and toast at the host.",
  },
  {
    href: "/packages/plugin-maui-form-validation/",
    name: "FormValidation",
    body: "Validation.For rules. The kit does not PackageReference it.",
  },
  {
    href: "/packages/plugin-maui-keyboard-manager/",
    name: "KeyboardManager",
    body: "Soft keyboard hide, show, and safe-area resize.",
  },
] as const;

export const uiKitPlatforms = [
  { name: "net10.0", note: "Shared library TFM" },
  { name: "Android", note: "API 21+" },
  { name: "iOS", note: "15+" },
  { name: "Mac Catalyst", note: "15+" },
  { name: "Windows", note: "10.0.17763+ (TFM 10.0.19041.0; packed on Windows)" },
] as const;
