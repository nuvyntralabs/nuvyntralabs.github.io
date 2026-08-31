export type PackageGroup =
  | "Catalog"
  | "Location & network"
  | "Background & sync"
  | "HTTP & APIs"
  | "Security & identity"
  | "Device & UX"
  | "App services"
  | "Observability"
  | "Voice";

export interface PackageDoc {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  github: string;
  nuget: string | null;
  language: string | null;
  category: "suite" | "maui-plugin";
  group: PackageGroup;
  tags: string[];
  abstract: string;
  capabilities: string[];
}

export const packageGroups: PackageGroup[] = [
  "Catalog",
  "Location & network",
  "Background & sync",
  "HTTP & APIs",
  "Security & identity",
  "Device & UX",
  "App services",
  "Observability",
  "Voice",
];

export const packages: PackageDoc[] = [
  {
    "slug": "maui-essentials",
    "name": "MauiEssentials",
    "title": "MauiEssentials (NugetWorld)",
    "subtitle": "Catalog of production .NET MAUI plugins",
    "description": "A curated catalog of Android/iOS .NET MAUI plugins — each in its own repository, referenced as git submodules — covering location, networking, sync, security, BLE, NFC, printing, VoIP, and observability.",
    "github": "https://github.com/nuvyntralabs/MauiEssentials",
    "nuget": null,
    "language": null,
    "category": "suite",
    "group": "Catalog",
    "tags": [
      ".NET MAUI",
      "NuGet",
      "Catalog",
      "Android",
      "iOS"
    ],
    "abstract": "MauiEssentials (published as NugetWorld) is the public index for a family of .NET MAUI plugins aimed at field, enterprise, and always-connected mobile apps. Instead of a single mega-package, each capability lives in its own repository and NuGet package, then is composed here as git submodules so teams can adopt only what they need.",
    "capabilities": [
      "Location, tracking, and reverse geocoding (GeoLocator).",
      "Real internet, captive portals, and layered connectivity diagnostics.",
      "Background jobs, durable queues, failed-call retry, chunked uploads, and offline-first sync.",
      "Device identity, fingerprint, NFC, BLE peripherals, permissions, feature flags, and deep links.",
      "Secure storage, sessions, app lock, file vault, and media pipelines.",
      "Share, clipboard, keyboard, printing, form validation, and orientation lock.",
      "VoIP session model, app updates, diagnostics, performance, and telemetry."
    ]
  },
  {
    "slug": "plugin-maui-geolocator",
    "name": "Plugin.Maui.GeoLocator",
    "title": "Plugin.Maui.GeoLocator",
    "subtitle": "On-demand location, tracking, and reverse geocoding",
    "description": "A .NET MAUI location plugin for Android and iOS covering single fixes, continuous tracking, and reverse geocoding for field and mapping apps.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.GeoLocator",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.GeoLocator",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Location & network",
    "tags": [
      ".NET MAUI",
      "GPS",
      "Geocoding",
      "C#"
    ],
    "abstract": "Plugin.Maui.GeoLocator gives MAUI apps a single API for on-demand location, continuous tracking, and reverse geocoding on Android and iOS. It is designed for field operations where a reliable last-known position and a clean tracking session matter more than a thin wrapper around the platform location manager.",
    "capabilities": [
      "Single location request with accuracy intent.",
      "Continuous tracking suitable for trip and survey routes.",
      "Reverse geocoding of captured coordinates.",
      "Android and iOS targets for .NET MAUI."
    ]
  },
  {
    "slug": "plugin-maui-network-monitor",
    "name": "Plugin.Maui.NetworkMonitor",
    "title": "Plugin.Maui.NetworkMonitor",
    "subtitle": "Real internet availability, not just 'connected'",
    "description": "Reports validated public internet, captive portals, offline and local-only states, and Wi-Fi versus cellular transitions on Android and iOS.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.NetworkMonitor",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.NetworkMonitor",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Location & network",
    "tags": [
      ".NET MAUI",
      "Connectivity",
      "Captive Portal",
      "C#"
    ],
    "abstract": "Plugin.Maui.NetworkMonitor answers a question MAUI Connectivity cannot: does this device actually have public internet? It watches native path changes, classifies Wi-Fi versus cellular, and uses HTTP probes plus Android captive-portal signals to distinguish validated internet, hotel/airport sign-in pages, local-only networks, and true offline.",
    "capabilities": [
      "Validated public internet versus OS 'connected' flags.",
      "Captive-portal detection for guest and venue Wi-Fi.",
      "Wi-Fi ↔ mobile transport transition events.",
      "Manual refresh for pull-to-retry and diagnostics screens."
    ]
  },
  {
    "slug": "plugin-maui-background-tasks",
    "name": "Plugin.Maui.BackgroundTasks",
    "title": "Plugin.Maui.BackgroundTasks",
    "subtitle": "One-time and periodic work on JobScheduler / BGTaskScheduler",
    "description": "Schedules one-time and periodic background work on Android JobScheduler and iOS BGTaskScheduler from a shared MAUI API.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.BackgroundTasks",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.BackgroundTasks",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Background & sync",
    "tags": [
      ".NET MAUI",
      "Background",
      "JobScheduler",
      "C#"
    ],
    "abstract": "Plugin.Maui.BackgroundTasks wraps Android JobScheduler and iOS BGTaskScheduler behind one MAUI registration so apps can schedule one-time and periodic work without owning two platform schedulers. It is the OS-facing counterpart to Plugin.Maui.JobQueue, which owns durable in-app work items.",
    "capabilities": [
      "One-time deferred work.",
      "Periodic background work.",
      "Android and iOS native schedulers from one registration."
    ]
  },
  {
    "slug": "plugin-maui-job-queue",
    "name": "Plugin.Maui.JobQueue",
    "title": "Plugin.Maui.JobQueue",
    "subtitle": "Durable SQLite task queue with retry and dead letter",
    "description": "A durable in-app job queue backed by SQLite, with named queues, retry/backoff, network constraints, and a dead-letter path.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.JobQueue",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.JobQueue",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Background & sync",
    "tags": [
      ".NET MAUI",
      "SQLite",
      "Queue",
      "C#"
    ],
    "abstract": "Plugin.Maui.JobQueue is a durable SQLite-backed task queue for MAUI. Jobs are registered by type, can require network, retry with backoff, and land in a dead-letter path when they exhaust attempts — so photo uploads and sync units survive app kills.",
    "capabilities": [
      "Durable jobs across process death.",
      "Retry with backoff and dead-letter isolation.",
      "Named queues (for example uploads versus analytics).",
      "Network-required jobs that wait for a real connection."
    ]
  },
  {
    "slug": "plugin-maui-smart-upload",
    "name": "Plugin.Maui.SmartUpload",
    "title": "Plugin.Maui.SmartUpload",
    "subtitle": "Chunked, resumable uploads with process-death recovery",
    "description": "Chunked, resumable file uploads for MAUI with retry and recovery after the process is killed mid-transfer.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.SmartUpload",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.SmartUpload",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Background & sync",
    "tags": [
      ".NET MAUI",
      "Upload",
      "Resumable",
      "C#"
    ],
    "abstract": "Plugin.Maui.SmartUpload implements chunked, resumable uploads for MAUI so large field photos and documents can survive flaky networks and process death. Progress is persisted; the next attempt continues instead of restarting from byte zero.",
    "capabilities": [
      "Chunked uploads.",
      "Resume after crash or kill.",
      "Retry on transient failures.",
      "Integration point for processed media pipelines."
    ]
  },
  {
    "slug": "plugin-maui-device-session",
    "name": "Plugin.Maui.DeviceSession",
    "title": "Plugin.Maui.DeviceSession",
    "subtitle": "Device, installation, and analytics session identity",
    "description": "Stable device, installation, and analytics session identifiers for MAUI apps — the identity layer other plugins can attach to telemetry.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.DeviceSession",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.DeviceSession",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Security & identity",
    "tags": [
      ".NET MAUI",
      "Identity",
      "Analytics",
      "C#"
    ],
    "abstract": "Plugin.Maui.DeviceSession provides device, installation, and analytics session identity for MAUI. Crash reports, sync batches, and API traces need a stable subject that is not the user's account and is not a raw advertising ID.",
    "capabilities": [
      "Stable installation identity.",
      "Analytics session grouping.",
      "A shared subject for health, crash, and sync events."
    ]
  },
  {
    "slug": "plugin-maui-offline-sync",
    "name": "Plugin.Maui.OfflineSync",
    "title": "Plugin.Maui.OfflineSync",
    "subtitle": "Offline-first local writes with queued sync and conflicts",
    "description": "Offline-first local writes, a queued sync engine, and conflict resolution for MAUI apps that must work without a network.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.OfflineSync",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.OfflineSync",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Background & sync",
    "tags": [
      ".NET MAUI",
      "Offline-First",
      "Sync",
      "C#"
    ],
    "abstract": "Plugin.Maui.OfflineSync is an offline-first sync layer for MAUI: writes land locally, a queue ships them when the network is real, and conflicts are resolved instead of last-write-wins by accident. It is built for field apps that cannot block the user on connectivity.",
    "capabilities": [
      "Offline-first local persistence.",
      "Queued synchronization when connectivity is validated.",
      "Conflict resolution rather than silent overwrite."
    ]
  },
  {
    "slug": "plugin-maui-push-router",
    "name": "Plugin.Maui.PushRouter",
    "title": "Plugin.Maui.PushRouter",
    "subtitle": "Route FCM / APNs payloads to handlers and Shell screens",
    "description": "Parses FCM and APNs payloads and routes them to handlers or Shell pages, including cold-start taps and duplicate-message dedupe.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.PushRouter",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.PushRouter",
    "language": "C#",
    "category": "maui-plugin",
    "group": "App services",
    "tags": [
      ".NET MAUI",
      "Push",
      "FCM",
      "APNs"
    ],
    "abstract": "Plugin.Maui.PushRouter does not replace Firebase or APNs registration. It takes the payload your app already received and routes it: parse FCM data / Android extras / APNs userInfo, dispatch by route or type, invoke a handler or open a Shell page, queue cold-start taps until Shell is ready, and dedupe the same message_id.",
    "capabilities": [
      "FCM and APNs payload parsing.",
      "Handler dispatch or Shell navigation.",
      "Cold-start tap handling.",
      "Duplicate delivery suppression."
    ]
  },
  {
    "slug": "plugin-maui-permission-flow",
    "name": "Plugin.Maui.PermissionFlow",
    "title": "Plugin.Maui.PermissionFlow",
    "subtitle": "Named permission flows with rationale and Settings fallback",
    "description": "Declares named permission flows with in-app rationale, one-at-a-time requests, denial cooldown, and Settings fallback when the OS will not prompt again.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.PermissionFlow",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.PermissionFlow",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Security & identity",
    "tags": [
      ".NET MAUI",
      "Permissions",
      "UX",
      "C#"
    ],
    "abstract": "Plugin.Maui.PermissionFlow replaces scattered Permissions.RequestAsync calls with named flows. The orchestrator shows rationale first, requests permissions one at a time (expanding LocationAlways to when-in-use first), honors denial cooldown, detects Android “Don't ask again” and iOS permanent denials, and offers Settings when the OS will not prompt again.",
    "capabilities": [
      "In-app rationale before the system dialog.",
      "One-at-a-time permission requests.",
      "Cooldown so users are not re-prompted immediately.",
      "Settings fallback after permanent denial."
    ]
  },
  {
    "slug": "plugin-maui-app-health",
    "name": "Plugin.Maui.AppHealth",
    "title": "Plugin.Maui.AppHealth",
    "subtitle": "App, device, and environment health reports",
    "description": "Collects app, device, and environment health signals so support and observability layers can see why a session failed.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.AppHealth",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.AppHealth",
    "language": "C#",
    "category": "maui-plugin",
    "group": "App services",
    "tags": [
      ".NET MAUI",
      "Health",
      "Diagnostics",
      "C#"
    ],
    "abstract": "Plugin.Maui.AppHealth produces structured health reports for the app, device, and environment. It is the snapshot layer Observability and support tools can attach to a crash, a failed sync, or a customer ticket.",
    "capabilities": [
      "Point-in-time health snapshots.",
      "Device and environment context for support.",
      "Shared contract for telemetry export."
    ]
  },
  {
    "slug": "plugin-maui-secure-storage-plus",
    "name": "Plugin.Maui.SecureStoragePlus",
    "title": "Plugin.Maui.SecureStoragePlus",
    "subtitle": "AES-256-GCM secure storage with expiry and migration",
    "description": "An extra AES-256-GCM layer over MAUI SecureStorage, with integrity tags, expiry, key listing, typed JSON, and migration from legacy stores.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.SecureStoragePlus",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.SecureStoragePlus",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Security & identity",
    "tags": [
      ".NET MAUI",
      "Security",
      "AES-256-GCM",
      "C#"
    ],
    "abstract": "Plugin.Maui.SecureStoragePlus sits on top of MAUI SecureStorage (Keychain / EncryptedSharedPreferences) and adds an AES-256-GCM envelope, GCM integrity bound to the key name, expiry with automatic purge, migration from SecureStorage or a custom ILegacyStorageSource, key listing, metadata, and typed JSON get/set.",
    "capabilities": [
      "Encrypted get/set with integrity.",
      "Automatic expiry.",
      "Legacy migration.",
      "Typed JSON helpers and DI registration."
    ]
  },
  {
    "slug": "plugin-maui-secure-session",
    "name": "Plugin.Maui.SecureSession",
    "title": "Plugin.Maui.SecureSession",
    "subtitle": "Access/refresh tokens, 401 retry, biometrics, multi-device",
    "description": "Session ownership for MAUI: login, refresh, expiry, logout, multi-device revoke, and biometric unlock — tokens persist in SecureStoragePlus.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.SecureSession",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.SecureSession",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Security & identity",
    "tags": [
      ".NET MAUI",
      "Auth",
      "Tokens",
      "Biometrics"
    ],
    "abstract": "Plugin.Maui.SecureSession owns the authentication session: login, Bearer attachment, single-flight refresh on 401 or near-expiry, rotating refresh tokens, idle and absolute timeouts, this-device or all-device logout, multi-device list/revoke, and biometric unlock after lock or process death. Persistence is delegated to SecureStoragePlus.",
    "capabilities": [
      "Login and GetAccessTokenAsync.",
      "Automatic 401 refresh and retry.",
      "Logout this device or every device.",
      "Multi-device session list and revoke.",
      "Face ID / fingerprint unlock."
    ]
  },
  {
    "slug": "plugin-maui-api-resilience",
    "name": "Plugin.Maui.ApiResilience",
    "title": "Plugin.Maui.ApiResilience",
    "subtitle": "HttpClient retry, circuit breaker, offline queue, token refresh",
    "description": "Resilient HttpClient policies for MAUI: retry, circuit breaker, offline queue, and cooperation with token refresh.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.ApiResilience",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.ApiResilience",
    "language": "C#",
    "category": "maui-plugin",
    "group": "HTTP & APIs",
    "tags": [
      ".NET MAUI",
      "HttpClient",
      "Resilience",
      "C#"
    ],
    "abstract": "Plugin.Maui.ApiResilience wraps MAUI HttpClient usage with retry, circuit breaking, an offline queue, and token-refresh cooperation so transient mobile networks do not surface as raw HttpRequestExceptions in the UI.",
    "capabilities": [
      "Retry with sensible mobile defaults.",
      "Circuit breaker for failing hosts.",
      "Offline request queue.",
      "Auth-aware refresh instead of stampeding 401s."
    ]
  },
  {
    "slug": "plugin-maui-file-vault",
    "name": "Plugin.Maui.FileVault",
    "title": "Plugin.Maui.FileVault",
    "subtitle": "Encrypted local files with key protection and lifecycle",
    "description": "Encrypted on-device file storage with key protection and lifecycle controls — the vault target for MediaPipeline and sensitive documents.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.FileVault",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.FileVault",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Security & identity",
    "tags": [
      ".NET MAUI",
      "Encryption",
      "Files",
      "C#"
    ],
    "abstract": "Plugin.Maui.FileVault stores files encrypted at rest on the device, with key protection and lifecycle controls. MediaPipeline can hand processed images to IMediaVault instead of writing plaintext JPEGs into app storage.",
    "capabilities": [
      "Encrypted local file storage.",
      "Key protection aligned with device security.",
      "Lifecycle APIs for sensitive artifacts."
    ]
  },
  {
    "slug": "plugin-maui-media-pipeline",
    "name": "Plugin.Maui.MediaPipeline",
    "title": "Plugin.Maui.MediaPipeline",
    "subtitle": "Camera-to-upload image pipeline",
    "description": "A fluent pipeline: camera or gallery → resize, compress, strip EXIF, correct orientation, watermark, blur/redact, encrypt → FileVault or SmartUpload.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.MediaPipeline",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.MediaPipeline",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Device & UX",
    "tags": [
      ".NET MAUI",
      "Media",
      "Privacy",
      "C#"
    ],
    "abstract": "Plugin.Maui.MediaPipeline is a fluent media processing chain for MAUI. Capture from camera or gallery, then resize, compress, strip EXIF/GPS, bake orientation, watermark, blur or redact regions, encrypt with AES-256-GCM, and hand off to FileVault or SmartUpload. It is built for field photos that leave the device.",
    "capabilities": [
      "Camera and gallery capture.",
      "Longest-side or box resize; JPEG quality and MaxBytes.",
      "EXIF/GPS strip and orientation bake-in.",
      "Text/image watermark and region blur or solid redact.",
      "AES-256-GCM envelope with decrypt helper."
    ]
  },
  {
    "slug": "plugin-maui-voip-core",
    "name": "Plugin.Maui.VoipCore",
    "title": "Plugin.Maui.VoipCore",
    "subtitle": "SIP/VoIP session model with pluggable signaling",
    "description": "A SIP/VoIP session model for MAUI with a pluggable signaling stack — the shared core for call state, not a single vendor SDK wrapper.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.VoipCore",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.VoipCore",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Voice",
    "tags": [
      ".NET MAUI",
      "VoIP",
      "SIP",
      "C#"
    ],
    "abstract": "Plugin.Maui.VoipCore models SIP/VoIP sessions for MAUI and keeps signaling pluggable. Call state, hold, mute, and session lifetime live in one core so apps are not locked to a single CPaaS SDK at the architecture layer.",
    "capabilities": [
      "VoIP session lifecycle.",
      "Pluggable signaling.",
      "A core that UI and notification layers can observe."
    ]
  },
  {
    "slug": "plugin-maui-feature-flags",
    "name": "Plugin.Maui.FeatureFlags",
    "title": "Plugin.Maui.FeatureFlags",
    "subtitle": "Mobile-first feature flags with MAUI targeting",
    "description": "Feature flags for MAUI with mobile targeting and remote config, so rollouts and experiments are not hardcoded builds.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.FeatureFlags",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.FeatureFlags",
    "language": "C#",
    "category": "maui-plugin",
    "group": "App services",
    "tags": [
      ".NET MAUI",
      "Feature Flags",
      "Remote Config",
      "C#"
    ],
    "abstract": "Plugin.Maui.FeatureFlags brings mobile-first feature flags and remote configuration to MAUI. Flags can target platform, version, and audience so a kill-switch or gradual rollout does not require a store resubmission for every experiment.",
    "capabilities": [
      "Boolean and configured feature flags.",
      "Remote updates without a full store release.",
      "MAUI-oriented targeting."
    ]
  },
  {
    "slug": "plugin-maui-deep-links",
    "name": "Plugin.Maui.DeepLinks",
    "title": "Plugin.Maui.DeepLinks",
    "subtitle": "App Links, Universal Links, custom schemes, auth-restore",
    "description": "Handles Android App Links, iOS Universal Links, custom URL schemes, and auth-restore flows in one MAUI plugin.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.DeepLinks",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.DeepLinks",
    "language": "C#",
    "category": "maui-plugin",
    "group": "App services",
    "tags": [
      ".NET MAUI",
      "Deep Links",
      "App Links",
      "C#"
    ],
    "abstract": "Plugin.Maui.DeepLinks unifies Android App Links, iOS Universal Links, custom schemes, and auth-restore so a single registration owns inbound URLs — including the return trip from a browser or identity provider.",
    "capabilities": [
      "HTTPS app/universal links.",
      "Custom URL schemes.",
      "Post-auth restore into the originating screen."
    ]
  },
  {
    "slug": "plugin-maui-performance",
    "name": "Plugin.Maui.Performance",
    "title": "Plugin.Maui.Performance",
    "subtitle": "Lightweight profiler for startup, pages, APIs, and memory",
    "description": "A lightweight MAUI profiler that times startup, page loads, API calls, image loading, SQLite, and memory so regressions are visible on device.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.Performance",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.Performance",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Observability",
    "tags": [
      ".NET MAUI",
      "Performance",
      "Profiling",
      "C#"
    ],
    "abstract": "Plugin.Maui.Performance is a lightweight on-device profiler for MAUI. It measures app startup, page timing, API latency, image loading, database operations, UI rendering, and memory so teams can see a scoreboard like 'App Startup 1.82 sec' without attaching a full IDE profiler in the field.",
    "capabilities": [
      "Startup and page timing.",
      "API and image-load measurement.",
      "SQLite and memory snapshots."
    ]
  },
  {
    "slug": "plugin-maui-diagnostics",
    "name": "Plugin.Maui.Diagnostics",
    "title": "Plugin.Maui.Diagnostics",
    "subtitle": "Crash, ANR, unhandled exceptions, and breadcrumbs",
    "description": "Captures crashes, ANRs, unhandled exceptions, and pre-crash breadcrumbs so mobile failures are diagnosable after the fact.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.Diagnostics",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.Diagnostics",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Observability",
    "tags": [
      ".NET MAUI",
      "Crash",
      "ANR",
      "C#"
    ],
    "abstract": "Plugin.Maui.Diagnostics captures crashes, ANRs, unhandled exceptions, and breadcrumbs written just before failure. It is the crash pipeline Observability can export, complementary to AppHealth snapshots.",
    "capabilities": [
      "Crash and ANR capture.",
      "Unhandled exception logging.",
      "Breadcrumbs for reproduction."
    ]
  },
  {
    "slug": "plugin-maui-observability",
    "name": "Plugin.Maui.Observability",
    "title": "Plugin.Maui.Observability",
    "subtitle": "Umbrella telemetry over the NugetWorld plugins",
    "description": "One registration fans health, network, API, upload, sync, background, device, and crash events into a single export path.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.Observability",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.Observability",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Observability",
    "tags": [
      ".NET MAUI",
      "Telemetry",
      "Observability",
      "C#"
    ],
    "abstract": "Plugin.Maui.Observability is the umbrella telemetry layer for the NugetWorld MAUI plugins. UseMauiObservability() registers the pipeline and the seven plugins underneath it, then fans AppHealth, NetworkMonitor, ApiResilience, SmartUpload, OfflineSync, BackgroundTasks, DeviceSession, and crash events into one export path — any backend.",
    "capabilities": [
      "One-call suite wiring.",
      "Correlated events via DeviceSession.",
      "Backend-agnostic export."
    ]
  },
  {
    "slug": "plugin-maui-app-update",
    "name": "Plugin.Maui.AppUpdate",
    "title": "Plugin.Maui.AppUpdate",
    "subtitle": "Play In-App Updates, App Store checks, mandatory prompts",
    "description": "Google Play In-App Updates, App Store version checks, mandatory or recommended prompts, and maintenance-mode messaging.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.AppUpdate",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.AppUpdate",
    "language": "C#",
    "category": "maui-plugin",
    "group": "App services",
    "tags": [
      ".NET MAUI",
      "Updates",
      "Play Store",
      "C#"
    ],
    "abstract": "Plugin.Maui.AppUpdate handles store-aware update UX: Google Play In-App Updates, App Store version checks, mandatory versus recommended prompts, and maintenance messaging so a broken API can be fenced without waiting for every user to notice.",
    "capabilities": [
      "In-app update flow on Play.",
      "Store version checks on iOS.",
      "Mandatory upgrade and maintenance messaging."
    ]
  },
  {
    "slug": "plugin-maui-network-diagnostics",
    "name": "Plugin.Maui.NetworkDiagnostics",
    "title": "Plugin.Maui.NetworkDiagnostics",
    "subtitle": "Layered check: internet, DNS, TLS, then the API",
    "description": "On-demand connectivity diagnostics for MAUI. NetworkMonitor watches the path; this plugin runs a layered probe so support can see where production connectivity broke.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.NetworkDiagnostics",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.NetworkDiagnostics",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Location & network",
    "tags": [
      ".NET MAUI",
      "Diagnostics",
      "DNS",
      "TLS",
      "C#"
    ],
    "abstract": "Plugin.Maui.NetworkDiagnostics is an on-demand layered connectivity check for MAUI on Android and iOS. It is not a network monitor. NetworkMonitor watches the path (captive portal, Wi-Fi versus cellular). This plugin runs internet, DNS, gateway, TCP, TLS, HTTPS, API, and latency probes so a support screen can say 'internet is fine, the API is unreachable' instead of 'no connection'.",
    "capabilities": [
      "One-shot layered connectivity report.",
      "Configurable API health endpoint and timeout.",
      "Per-hop success, failure, and latency.",
      "A human-readable summary for support and in-app alerts."
    ]
  },
  {
    "slug": "plugin-maui-retry-queue",
    "name": "Plugin.Maui.RetryQueue",
    "title": "Plugin.Maui.RetryQueue",
    "subtitle": "Retry the call that already failed",
    "description": "A failed-operation retry queue for MAUI — telemetry, orders, forms, and payments that must keep trying after a 503, timeout, or process death. Not JobQueue.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.RetryQueue",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.RetryQueue",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Background & sync",
    "tags": [
      ".NET MAUI",
      "Retry",
      "Queue",
      "C#"
    ],
    "abstract": "Plugin.Maui.RetryQueue retries an operation that already failed — or might fail — so telemetry, analytics, orders, forms, payments, and sync calls are not lost after a 503, a timeout, or process death. It is not JobQueue. JobQueue is a typed work queue for jobs you plan to run. RetryQueue is a name plus a lambda (or registered handler) with a longer default backoff: 30 seconds, 2 minutes, 10 minutes.",
    "capabilities": [
      "Named failed-operation enqueue with a lambda or registered handler.",
      "Backoff suited to telemetry, orders, and payments.",
      "Survives process death.",
      "Typed payload handlers (for example OrderDraft)."
    ]
  },
  {
    "slug": "plugin-maui-api-cache",
    "name": "Plugin.Maui.ApiCache",
    "title": "Plugin.Maui.ApiCache",
    "subtitle": "HTTP GET cache with CacheFirst and SWR",
    "description": "Lightweight HTTP/API response cache for MAUI. ApiResilience retries; this package remembers GET responses so screens stay fast offline and on flaky networks.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.ApiCache",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.ApiCache",
    "language": "C#",
    "category": "maui-plugin",
    "group": "HTTP & APIs",
    "tags": [
      ".NET MAUI",
      "Cache",
      "HTTP",
      "C#"
    ],
    "abstract": "Plugin.Maui.ApiCache is a lightweight HTTP GET response cache for MAUI on Android and iOS. Resilience is not caching. ApiResilience retries and queues requests. This package remembers GET responses so list and detail screens stay fast offline and on flaky networks, with CacheFirst, NetworkFirst, StaleWhileRevalidate, NetworkOnly, and CacheOnly policies.",
    "capabilities": [
      "GET response cache with typed deserialization.",
      "CacheFirst with stale fallback on network failure.",
      "Stale-while-revalidate for instant screens plus a background refresh.",
      "CacheOnly for forced offline reads."
    ]
  },
  {
    "slug": "plugin-maui-bluetooth-manager",
    "name": "Plugin.Maui.BluetoothManager",
    "title": "Plugin.Maui.BluetoothManager",
    "subtitle": "BLE connection lifecycle for printers, POS, and IoT",
    "description": "A high-level BLE device connection manager for MAUI — permissions, scan, connect, retry, RSSI, notify, and reconnect. Not another low-level GATT library.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.BluetoothManager",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.BluetoothManager",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Device & UX",
    "tags": [
      ".NET MAUI",
      "BLE",
      "IoT",
      "C#"
    ],
    "abstract": "Plugin.Maui.BluetoothManager is a high-level BLE connection manager for MAUI on Android and iOS. It is not another low-level GATT wrapper. The plugin owns connection lifecycle — permissions, adapter state, scan filters, connect timeout, retry, RSSI, notify, unexpected disconnect, and automatic reconnect — for printers, POS, medical devices, IoT sensors, vehicle diagnostics, attendance devices, and industrial equipment.",
    "capabilities": [
      "Scan, connect, read, write, and notify against a real peripheral.",
      "Automatic reconnect with a configurable attempt cap.",
      "Permission and adapter-state handling in the lifecycle, not the page.",
      "Filters for printers and named devices."
    ]
  },
  {
    "slug": "plugin-maui-share-plus",
    "name": "Plugin.Maui.SharePlus",
    "title": "Plugin.Maui.SharePlus",
    "subtitle": "Share to WhatsApp, Email, AirDrop — FileProvider-safe",
    "description": "Share for MAUI that goes beyond the generic sheet: title, subject, MIME, preview, target app, and temporary-file handling for WhatsApp, Email, Messages, Files, Nearby Share, and AirDrop.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.SharePlus",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.SharePlus",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Device & UX",
    "tags": [
      ".NET MAUI",
      "Share",
      "WhatsApp",
      "C#"
    ],
    "abstract": "Plugin.Maui.SharePlus is a production share API for MAUI on Android and iOS. MAUI Share is a generic sheet, and file-share customization plus FileProvider setup still have open framework issues. SharePlus adds Title, Subject, MimeType, Preview, TargetApp, and TemporaryFileHandling, plus first-class targets for WhatsApp, Email, Messages, Files, Nearby Share, and AirDrop.",
    "capabilities": [
      "Text, single-file, and multi-file share.",
      "First-class WhatsApp and Email targets.",
      "Title, subject, MIME, and preview metadata.",
      "Temporary-file handling for cache-safe shares."
    ]
  },
  {
    "slug": "plugin-maui-clipboard-plus",
    "name": "Plugin.Maui.ClipboardPlus",
    "title": "Plugin.Maui.ClipboardPlus",
    "subtitle": "Sensitive clips, expiry, and content-changed events",
    "description": "Clipboard for MAUI that is more useful than MAUI Clipboard: sensitive text, automatic expiry, presence flags, and ContentChanged — including keeping secrets off Universal Clipboard on iOS.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.ClipboardPlus",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.ClipboardPlus",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Device & UX",
    "tags": [
      ".NET MAUI",
      "Clipboard",
      "Security",
      "C#"
    ],
    "abstract": "Plugin.Maui.ClipboardPlus is a clipboard API for MAUI on Android and iOS that is significantly more useful than MAUI Clipboard. It supports ordinary text plus sensitive clips that are marked sensitive on the OS where that exists, stay off Universal Clipboard on iOS, and are cleared automatically when they expire. Apps also get HasText / HasImage / HasUri and a ContentChanged event with Self, External, or Cleared source.",
    "capabilities": [
      "Ordinary and sensitive text copy.",
      "Automatic expiry of secrets.",
      "Clear sensitive clips when the app backgrounds.",
      "Presence flags and change events for text, URI, image, and files."
    ]
  },
  {
    "slug": "plugin-maui-device-info-plus",
    "name": "Plugin.Maui.DeviceInfoPlus",
    "title": "Plugin.Maui.DeviceInfoPlus",
    "subtitle": "Fingerprint plus NFC, camera, biometric, GPS, flash",
    "description": "Application and device fingerprint plus hardware capabilities for MAUI — screen, RAM, NFC, Bluetooth, camera, biometric, GPS, and flash — for telemetry, support tickets, and feature targeting.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.DeviceInfoPlus",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.DeviceInfoPlus",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Device & UX",
    "tags": [
      ".NET MAUI",
      "Device Info",
      "Fingerprint",
      "C#"
    ],
    "abstract": "Plugin.Maui.DeviceInfoPlus is an application and device fingerprint plus hardware-capability snapshot for MAUI on Android and iOS. It is not a wrapper for MAUI DeviceInfo. One GetAsync() returns manufacturer, model, OS, screen, density, architecture, RAM, battery, tablet, and probes for NFC, Bluetooth, camera, biometric, GPS, and flash — the fields telemetry, diagnostics, feature targeting, and support tickets actually need.",
    "capabilities": [
      "Manufacturer, model, OS, screen, density, architecture, RAM, battery.",
      "Hardware capability flags for NFC, Bluetooth, camera, biometric, GPS, flash.",
      "Tablet versus phone hint.",
      "One snapshot for telemetry and support."
    ]
  },
  {
    "slug": "plugin-maui-nfc-plus",
    "name": "Plugin.Maui.NfcPlus",
    "title": "Plugin.Maui.NfcPlus",
    "subtitle": "NDEF read/write, tag ID, attendance and inventory",
    "description": "Session-based NFC for MAUI: NDEF, tag IDs, read/write, foreground dispatch / reader sessions, and availability — for retail, attendance, assets, and vehicle apps.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.NfcPlus",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.NfcPlus",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Device & UX",
    "tags": [
      ".NET MAUI",
      "NFC",
      "NDEF",
      "C#"
    ],
    "abstract": "Plugin.Maui.NfcPlus is session-based NFC for MAUI on Android and iOS — not another 'scan a tag' wrapper. It exposes NDEF, tag IDs, read/write, foreground dispatch / reader sessions, and availability. A tag model carries IdHex, Text, Uri, Mime, IsWritable, and Technologies so retail, attendance, asset, and vehicle apps can look up a SKU or navigate a deep link from one read.",
    "capabilities": [
      "NDEF read and write.",
      "Stable tag ID for attendance and assets.",
      "Availability including Disabled with OpenSettingsAsync.",
      "Text, URI, and MIME payloads from one scan."
    ]
  },
  {
    "slug": "plugin-maui-app-lock",
    "name": "Plugin.Maui.AppLock",
    "title": "Plugin.Maui.AppLock",
    "subtitle": "Lock the app after background — Face ID, PIN, timer",
    "description": "Application-security workflow for MAUI: lock timer, lifecycle, and gate. Face ID, Touch ID, fingerprint, and device PIN are how the user unlocks — they are not the product.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.AppLock",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.AppLock",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Security & identity",
    "tags": [
      ".NET MAUI",
      "App Lock",
      "Biometrics",
      "C#"
    ],
    "abstract": "Plugin.Maui.AppLock is an application-security workflow for MAUI on Android and iOS. It is not another biometric API. Biometric plugins prove who the user is. AppLock owns the lock timer, lifecycle, and gate: app enters background, lock timer elapses, app returns, authentication, unlock. Face ID, Touch ID, fingerprint, and the device PIN are how the user unlocks.",
    "capabilities": [
      "Configurable lock timer after background.",
      "Biometric and device-PIN unlock.",
      "RequireAuthenticationAsync gate for sensitive screens.",
      "Privacy cover while the app is locked."
    ]
  },
  {
    "slug": "plugin-maui-printing",
    "name": "Plugin.Maui.Printing",
    "title": "Plugin.Maui.Printing",
    "subtitle": "PDF, image, receipt, and Bluetooth thermal print",
    "description": "Print for MAUI: PDF, images, text, system / AirPrint, Bluetooth, and ESC/POS thermal printers — invoices, receipts, labels, tickets, and inspection reports.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.Printing",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.Printing",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Device & UX",
    "tags": [
      ".NET MAUI",
      "Print",
      "ESC/POS",
      "C#"
    ],
    "abstract": "Plugin.Maui.Printing is a print API for MAUI on Android and iOS. .NET MAUI has no first-class print API. Production apps still need invoices, receipts, labels, tickets, delivery challans, and vehicle inspection reports — often on a cheap Bluetooth thermal printer. The plugin abstracts PDF, images, text, system / AirPrint, Bluetooth, and ESC/POS thermal printers behind Printer.PrintAsync.",
    "capabilities": [
      "PDF, image, and text jobs.",
      "System and AirPrint printers.",
      "Bluetooth and ESC/POS thermal printers.",
      "Receipt builder with columns, QR, and cut."
    ]
  },
  {
    "slug": "plugin-maui-device-orientation-plus",
    "name": "Plugin.Maui.DeviceOrientationPlus",
    "title": "Plugin.Maui.DeviceOrientationPlus",
    "subtitle": "Lock and unlock landscape or portrait, per page",
    "description": "Lock, unlock, and listen for screen orientation in MAUI. DeviceDisplay orientation is read-only; this package is the missing write path for video, scanning, POS, and inspection.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.DeviceOrientationPlus",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.DeviceOrientationPlus",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Device & UX",
    "tags": [
      ".NET MAUI",
      "Orientation",
      "Landscape",
      "C#"
    ],
    "abstract": "Plugin.Maui.DeviceOrientationPlus locks, unlocks, and listens for screen orientation in MAUI on Android and iOS. DeviceDisplay.MainDisplayInfo.Orientation is read-only. This package is the missing write path: Orientation.Lock(Portrait), Unlock, SetAsync(Landscape), Changed, and a stack so a video page can lock landscape on top of a portrait lock and restore on disappear.",
    "capabilities": [
      "Lock portrait or landscape.",
      "Per-page lock in OnAppearing / OnDisappearing.",
      "Changed with previous, current, and locked state.",
      "Scoped locks that restore automatically."
    ]
  },
  {
    "slug": "plugin-maui-keyboard-manager",
    "name": "Plugin.Maui.KeyboardManager",
    "title": "Plugin.Maui.KeyboardManager",
    "subtitle": "Hide, show, dismiss, resize, and safe-area keyboard",
    "description": "Soft-keyboard control for MAUI: hide, show, dismiss-on-tap, resize/pan/safe-area avoidance, visibility, height, and focus — without platform #if on every page.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.KeyboardManager",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.KeyboardManager",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Device & UX",
    "tags": [
      ".NET MAUI",
      "Keyboard",
      "IME",
      "C#"
    ],
    "abstract": "Plugin.Maui.KeyboardManager is soft-keyboard control for MAUI on Android and iOS. Hide, show, dismiss on tap outside, resize/pan/safe-area avoidance, visibility, height, and focus — without platform #if in every page. UseKeyboardManager is optional; Hide() works without it. Register when you want IME listeners, avoidance, and tap-outside wired at startup.",
    "capabilities": [
      "Hide and show the IME, including Show(entry).",
      "Dismiss on tap outside a field.",
      "Resize, pan, and safe-area avoidance.",
      "Visibility, height, insets, and focus events."
    ]
  },
  {
    "slug": "plugin-maui-form-validation",
    "name": "Plugin.Maui.FormValidation",
    "title": "Plugin.Maui.FormValidation",
    "subtitle": "Rules next to the model, Validation.For in XAML",
    "description": "Mobile-first validation for MAUI: fluent rules on the view-model (required, email, phone, URL, min/max) and a XAML Validation.For attached property.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.FormValidation",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.FormValidation",
    "language": "C#",
    "category": "maui-plugin",
    "group": "Device & UX",
    "tags": [
      ".NET MAUI",
      "Validation",
      "XAML",
      "C#"
    ],
    "abstract": "Plugin.Maui.FormValidation is a mobile-first validation library for MAUI on Android and iOS. Rules live next to the model. XAML stays a property name.",
    "capabilities": [
      "Required, email, phone, URL, numeric, min/max, min length, equal-to.",
      "Conditional rules.",
      "Lost-focus or submit-style triggers.",
      "XAML that names the property, not the error label."
    ]
  },
  {
    "slug": "plugin-maui-community-toolkit-plus",
    "name": "Plugin.Maui.CommunityToolkitPlus",
    "title": "Plugin.Maui.CommunityToolkitPlus",
    "subtitle": "Opt-in production extras on top of CommunityToolkit.Maui",
    "description": "Unofficial, opt-in production extensions built on CommunityToolkit.Maui for .NET MAUI on Android and iOS — accessibility auditing, state restoration, upgrade guard, trusted time, app integrity, wallet passes, and privacy consent.",
    "github": "https://github.com/nuvyntralabs/Plugin.Maui.CommunityToolkitPlus",
    "nuget": "https://www.nuget.org/packages/Plugin.Maui.CommunityToolkitPlus",
    "language": "C#",
    "category": "maui-plugin",
    "group": "App services",
    "tags": [
      ".NET MAUI",
      "CommunityToolkit",
      "Accessibility",
      "C#"
    ],
    "abstract": "Plugin.Maui.CommunityToolkitPlus is an unofficial, opt-in layer of production extensions that sit above CommunityToolkit.Maui. All seven modules ship in one assembly and every module is disabled until explicitly enabled: accessibility visual-tree auditing with SARIF export, Shell state restoration after process death, journaled upgrade migrations with safe mode, tamper-aware trusted time from HTTP sources, App Attest / Play Integrity challenge-and-proof, Apple Wallet and Google Wallet pass handoff, and a versioned privacy-consent ledger with SDK activation gates.",
    "capabilities": [
      "Accessibility audit — visual tree scan for missing labels, small targets, contrast, and clipped text with JSON and SARIF export.",
      "State restoration — Shell route and contributor checkpoints that survive process death.",
      "Upgrade guard — idempotent journaled migrations and startup-loop safe mode.",
      "Trusted time — HTTPS / HTTP Date sources with outlier rejection and wall-clock jump detection.",
      "App integrity — App Attest (iOS) and Play Integrity (Android) challenge-and-proof for backend verification.",
      "Wallet passes — .pkpass handoff on iOS and Google Wallet save URL on Android.",
      "Privacy consent — versioned purpose ledger with revocation, expiry, and SDK activation gates."
    ]
  }
];

export const nugetPackages = packages.filter((item) => item.nuget);

export function getPackageBySlug(slug: string): PackageDoc | undefined {
  return packages.find((item) => item.slug === slug);
}

export function getRelatedPackages(pkg: PackageDoc, limit = 3): PackageDoc[] {
  return packages
    .filter((item) => item.slug !== pkg.slug && item.group === pkg.group)
    .slice(0, limit);
}
