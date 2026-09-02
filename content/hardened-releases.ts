export interface HardenedPlugin {
  name: string;
  slug: string;
  version: string;
  tests: number;
  kind: "Breaking default" | "Default change" | "Additive" | "Behavior" | "Packaging" | "Metadata";
  summary: string;
}

export const hardenedReleaseDate = "3 September 2026";
export const hardenedTestCount = 351;

export const hardenedPlugins: HardenedPlugin[] = [
  {
    name: "Plugin.Maui.DeepLinks",
    slug: "plugin-maui-deep-links",
    version: "1.0.6",
    tests: 43,
    kind: "Breaking default",
    summary:
      "Empty Hosts / CustomSchemes reject incoming links. http:// needs AllowInsecureHttp. PermissiveMode restores the old open behavior.",
  },
  {
    name: "Plugin.Maui.PushRouter",
    slug: "plugin-maui-push-router",
    version: "1.0.6",
    tests: 24,
    kind: "Breaking default",
    summary:
      "Navigation uses registered Map keys or DefaultRoute only. Set AllowUnmappedPayloadRoutes to accept raw payload Shell paths.",
  },
  {
    name: "Plugin.Maui.SmartUpload",
    slug: "plugin-maui-smart-upload",
    version: "1.0.6",
    tests: 24,
    kind: "Breaking default",
    summary: "Upload endpoints must be https. Set RequireHttps = false only for local development.",
  },
  {
    name: "Plugin.Maui.FeatureFlags",
    slug: "plugin-maui-feature-flags",
    version: "1.0.7",
    tests: 45,
    kind: "Breaking default",
    summary:
      "RemoteUri must be https. Optional SignatureKey verifies X-FeatureFlags-Signature as HMAC-SHA256 hex.",
  },
  {
    name: "Plugin.Maui.ApiResilience",
    slug: "plugin-maui-api-resilience",
    version: "1.0.8",
    tests: 13,
    kind: "Default change",
    summary:
      "Offline queue file is AES-256-GCM. PersistRequestBodies = false stores a redacted placeholder.",
  },
  {
    name: "Plugin.Maui.FileVault",
    slug: "plugin-maui-file-vault",
    version: "1.0.8",
    tests: 31,
    kind: "Behavior",
    summary:
      "Background lock always clears the in-memory key. Prefer GetStatisticsAsync. RootDirectory stays inside the host folder.",
  },
  {
    name: "Plugin.Maui.SecureSession",
    slug: "plugin-maui-secure-session",
    version: "1.0.6",
    tests: 26,
    kind: "Additive",
    summary:
      "LoginAsync(TokenBundle) stays host-trusted. AcceptUnvalidatedTokens = false requires IAuthGateway.",
  },
  {
    name: "Plugin.Maui.DeviceSession",
    slug: "plugin-maui-device-session",
    version: "1.0.6",
    tests: 21,
    kind: "Additive",
    summary: "IDs stay in Preferences. UseSecureStorage = true for a higher-assurance store.",
  },
  {
    name: "Plugin.Maui.AppLock",
    slug: "plugin-maui-app-lock",
    version: "1.0.5",
    tests: 20,
    kind: "Additive",
    summary: "Auto-prompt failures raise AuthenticationCompleted so the cover stays locked.",
  },
  {
    name: "Plugin.Maui.BackgroundTasks",
    slug: "plugin-maui-background-tasks",
    version: "1.0.6",
    tests: 10,
    kind: "Behavior",
    summary: "Android logs handler exceptions. OperationCanceledException is not retried.",
  },
  {
    name: "Plugin.Maui.OfflineSync",
    slug: "plugin-maui-offline-sync",
    version: "1.0.9",
    tests: 13,
    kind: "Behavior",
    summary: "Auto-sync isolates failures. Subscribe to SyncCompleted when the UI must surface errors.",
  },
  {
    name: "Plugin.Maui.Observability",
    slug: "plugin-maui-observability",
    version: "1.0.7",
    tests: 23,
    kind: "Packaging",
    summary:
      "Hub clones use sibling ProjectReferences. Standalone clones use pinned PackageReferences.",
  },
  {
    name: "Plugin.Maui.NetworkMonitor",
    slug: "plugin-maui-network-monitor",
    version: "1.0.7",
    tests: 28,
    kind: "Metadata",
    summary: "Authors and MIT license metadata. No API change.",
  },
  {
    name: "Plugin.Maui.AppUpdate",
    slug: "plugin-maui-app-update",
    version: "1.0.6",
    tests: 30,
    kind: "Packaging",
    summary: "Adds a Visual Studio solution. No API change.",
  },
];
