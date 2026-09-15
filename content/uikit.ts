export const uiKitHref = "/uikit/";

export const uiKit = {
  name: "UIKit(MAUI)",
  title: "NuvyntraLabs.UIKit",
  packageId: "NuvyntraLabs.UIKit",
  version: "1.0.0",
  license: "MIT",
  github: "https://github.com/nuvyntralabs/NuvyntraLabs.UIKit",
  nuget: "https://www.nuget.org/packages/NuvyntraLabs.UIKit",
  sample: "https://github.com/nuvyntralabs/NuvyntraLabs.UIKit/tree/main/samples/NuvyntraLabs.UIKit.Sample",
  reference: "https://github.com/nuvyntralabs/NuvyntraLabs.UIKit/blob/main/UIKitLib.md",
  xmlns: "http://nuvyntralabs.com/uikit",
  register: "UseNuvyntraUIKit()",
  controlCount: 177,
  recipeCount: 57,
  subtitle: "Lumina UI kit — NV* controls and page recipes for .NET MAUI",
  description:
    "Lumina-themed UI library for .NET MAUI on Android, iOS, Mac Catalyst, and Windows. One package: NV* controls, design tokens, and page recipes. This is a UI library, not a MauiEssentials runtime plugin.",
  abstract:
    "NuvyntraLabs.UIKit is the Lumina catalog for a typical MAUI app: foundation tokens, 177 NV* controls from primitives through advanced surfaces, and 57 NV*View page recipes. Register with UseNuvyntraUIKit(), then use xmlns nv. Kit-level 1.0 is a working Lumina API — not Telerik or Syncfusion parity. PDF, Docx, and Spreadsheet are viewers. NVBarcode generates; it does not scan. Compose FormValidation, KeyboardManager, and MVVMExpress at the host. This library does not PackageReference Plugin.Maui.*.",
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
    "177 controls plus helpers NVRadioGroup and NVFormField — basics through advanced.",
    "57 NV*View page recipes for auth, commerce, content, social, files, and system screens.",
    "Targets net10.0, Android API 21+, iOS 15+, Mac Catalyst 15+, and Windows 10.0.19041.",
    "MIT. Font is Outfit (OFL). Look is original Lumina — not a Syncfusion or Telerik theme.",
  ],
} as const;

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
    name: "Pages",
    types: "NVSignInView … NVOrderSummaryView",
    role: "57 content recipes. They set titles and seed demo children.",
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
  { name: "Windows", note: "10.0.19041.0" },
] as const;
