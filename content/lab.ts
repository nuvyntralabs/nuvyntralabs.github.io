export const lab = {
  name: "Nuvyntra Labs",
  legalName: "Nuvyntra Labs",
  tagline: "A component library, and a whole ecosystem, for .NET MAUI",
  mission:
    "We research hard mobile problems, prove them in public, and ship the reusable pieces as independently versioned .NET MAUI products. Use one NuGet in an existing host, or start a new app on the full Nuvyntra stack. Neither path is a fallback.",
  starts: [
    {
      id: "components",
      title: "Component library",
      when: "You already have a host and need one control, one capability, or one shell.",
      detail:
        "Install one NuGet: NuvyntraLabs.UIKit (NV* controls), any Plugin.Maui.*, Plugin.Maui.MVVMExpress, or Nuventra.NuvexaDB. Your host stays yours.",
      href: "/packages/",
      cta: "Browse components",
      install: `dotnet add package Plugin.Maui.GeoLocator
dotnet add package NuvyntraLabs.UIKit`,
    },
    {
      id: "ecosystem",
      title: "Whole ecosystem",
      when: "You want a new MAUI app on this stack.",
      detail:
        "nuvyn init assembles MVVMExpress + UIKit + the smallest plugin set and composes maui-dev doctor. Existing apps stay on the component path.",
      href: "/toolkits/nuvyn/",
      cta: "Start with Nuvyn",
      install: `dotnet tool install -g NuvyntraLabs.Nuvyn.Cli --source https://api.nuget.org/v3/index.json
nuvyn init ClinicApp`,
    },
  ],
  about: [
    "Nuvyntra Labs is an independent applied R&D company. It reaches .NET MAUI teams two ways: as a component library (one control or plugin in any host) and as a whole ecosystem (nuvyn init for a new app on MVVMExpress + UIKit + the smallest plugin set). Neither path is a fallback.",
    "Teams paint screens with UIKit, host the app with MVVMExpress, talk to APIs with HttpForge, then add only the gallery plugins the product needs — location, connectivity, offline sync, voice, and device security. Research, public proofs of concept, production NuGet packages, and developer toolkits each have their own home here. There is no mega-SDK. Client delivery and professional experience stay on the founder's site.",
  ],
  audience:
    "Product teams who want one focused NuGet in an existing MAUI app, and teams who want a new host on the Nuvyntra stack — plus people evaluating longer research in inspection, VoIP, and field accuracy.",
  sponsorshipNote:
    "Nuvyntra Labs is independently maintained. Sponsorship helps keep the organization, packages, and research in good order — thank you for considering it.",
  principles: [
    {
      title: "Research first",
      body: "Field accuracy, VoIP stacks, and inspection products are documented as R&D — not flattened into a plugin list.",
    },
    {
      title: "Prove it in public",
      body: "Short, public proofs come first: Bluetooth recording, solar sales UX, CallKit, and pinned forks.",
    },
    {
      title: "Ship a package",
      body: "When a pattern is reusable, it becomes an independently versioned NuGet plugin for .NET MAUI.",
    },
  ],
  capabilities: [
    {
      title: "Location & field",
      body: "On-demand fixes, tracking sessions, reverse geocoding, circular geofences, and trip-meter accuracy research.",
    },
    {
      title: "Connectivity",
      body: "Real internet checks, captive portals, layered diagnostics, and HttpClient TLS / SPKI pinning.",
    },
    {
      title: "Offline & sync",
      body: "Background jobs, durable queues, retries, chunked uploads, and offline-first pipelines.",
    },
    {
      title: "Voice",
      body: "VoIP session models, CallKit research, SIP/WebRTC stacks, and platform bindings.",
    },
    {
      title: "Security & identity",
      body: "Secure storage, sessions, app lock, one-shot biometric, screenshot guard, device identity, and permission-aware device APIs.",
    },
    {
      title: "Device & UX",
      body: "NFC, BLE, classic Bluetooth serial, printing, clipboard, video pipeline, keep-awake, deep links, feature flags, and form validation.",
    },
  ],
} as const;
