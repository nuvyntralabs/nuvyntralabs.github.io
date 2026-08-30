export type WorkKind = "research" | "poc";

export interface WorkPaper {
  abstract: string;
  problem: string;
  solution: string;
  architecture: string[];
  capabilities: string[];
  audience: string;
  outcomes: string[];
}

export interface WorkItem {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  github: string;
  homepage: string | null;
  language: string | null;
  fork: boolean;
  tags: string[];
  kind: WorkKind;
  paper: WorkPaper;
}

export const works: WorkItem[] = [
  {
    slug: "assure-cars",
    name: "AssureCars",
    title: "AssureCars",
    subtitle: "Premium certified used-car reseller platform",
    description:
      "A self-hosted, single-tenant platform for SMB dealers: branded website and apps, 200-point inspection reports, leads, and concurrent-slot test-drive booking. Not a marketplace.",
    github: "https://github.com/nuvyntralabs/AssureCars",
    homepage: "https://assurecars-marketing.vercel.app/",
    language: "Kotlin",
    fork: false,
    tags: ["Kotlin", "Automotive", "SMB", "Inspection"],
    kind: "research",
    paper: {
      abstract:
        "AssureCars is enabling technology for small-to-medium used-car dealers. Each dealer gets an isolated, self-hosted deployment — own website, mobile apps, catalog, leads, and test-drive operations. It is not a marketplace: inventory and data are never shared across tenants. Trust is anchored by a mandatory 200-point inspection report on every listed car.",
      problem:
        "SMB dealers are forced into marketplaces that own the customer relationship, or into generic website templates that cannot express certified inventory, inspection PDFs, or hub/doorstep test drives.",
      solution:
        "A licensed, single-tenant product: buyer app/web, employee app, and admin portal, with inspection ingestion from the Kotlin inspection app and an inventory publish gate that requires the report.",
      architecture: [
        "Single-tenant isolation: own database, storage, domain, and branding per dealer.",
        "Surfaces: buyer app/web, dealer staff app, admin portal.",
        "Inspection app is system of record; AssureCars ingests via webhook/push.",
        "Inventory publish gated on the 200-point report.",
        "Concurrent-slot test-drive booking with OTP check-in.",
      ],
      capabilities: [
        "Certified catalog with inspection PDF/JSON on every listing.",
        "Leads from buyer interest.",
        "Concurrent test-drive slots.",
        "Hub or doorstep test drives with OTP check-in.",
        "Sell requests and PDI request flows.",
      ],
      audience:
        "SMB certified used-car dealers who want their own branded digital storefront, not a listing on someone else's marketplace.",
      outcomes: [
        "A productized dealer OS rather than a custom build per lot.",
        "Inspection-backed trust as a publish requirement.",
      ],
    },
  },
  {
    slug: "vehicle-inspection-kotlin",
    name: "Vehicle-Inspection-Kotlin",
    title: "Vehicle Inspection (Kotlin)",
    subtitle: "Offline-first inspection with AI damage marking and branded PDF/JSON reports",
    description:
      "Kotlin + Jetpack Compose Android app: configurable checklist, VIN OCR, Gemini/manual damage marking, and branded PDF + JSON reports. Offline-first; Firebase and AI are optional.",
    github: "https://github.com/nuvyntralabs/Vehicle-Inspection-Kotlin",
    homepage: null,
    language: "Kotlin",
    fork: false,
    tags: ["Kotlin", "Jetpack Compose", "Gemini", "Firebase"],
    kind: "research",
    paper: {
      abstract:
        "Vehicle Inspection is an offline-first Android app, built with Kotlin, Jetpack Compose, and Clean Architecture. It guides inspectors through a configurable checklist, captures per-item photos with Gemini Vision and manual damage marking, and produces a branded report (JSON + PDF).",
      problem:
        "Certified resale without a structured, versioned inspection is marketing copy. Paper checklists and chat photos cannot gate inventory or survive questionnaire edits offline.",
      solution:
        "A checklist-first capture product: identify the vehicle, inspect against a vendor questionnaire, grade each item, mark damage, then export an in-app report plus offline-rendered PDF and structured JSON.",
      architecture: [
        "Kotlin, Jetpack Compose, Clean Architecture.",
        "Room + encrypted file storage as the source of truth; WorkManager syncs to Firebase when online.",
        "Questionnaire snapshot pinned on each inspection.",
        "PDF rendered offline from an HTML/CSS template via WebView.",
      ],
      capabilities: [
        "Configurable checklist filtered by New vs Old vehicle applicability.",
        "VIN entry or on-device OCR, decode, and classification.",
        "Gemini Vision damage boxes plus manual annotations.",
        "Branded multi-section PDF and JSON export.",
      ],
      audience: "Inspectors and dealer ops who need a decision-ready report — including AssureCars publish gates.",
      outcomes: [
        "Inspection is a versioned product, not a sidecar spreadsheet.",
        "Works fully offline; cloud and AI are additive, not required.",
      ],
    },
  },
  {
    slug: "online-conference",
    name: "Online_Conference",
    title: "Online Conference",
    subtitle: "1:1 real-time video calling with Flutter + Amazon Chime",
    description:
      "A Flutter, Android-first 1:1 video app: host creates a meeting, guest joins with an invite code. Built with GitHub Spec Kit. Signed APK and demo video included.",
    github: "https://github.com/nuvyntralabs/Online_Conference",
    homepage: null,
    language: "Dart",
    fork: false,
    tags: ["Flutter", "Amazon Chime", "WebRTC", "Spec Kit"],
    kind: "research",
    paper: {
      abstract:
        "Online_Conference is a Flutter, Android-first 1:1 real-time video calling app on Amazon Chime SDK. A host creates a meeting; a guest joins with a shared invite code. The entire delivery used GitHub Spec Kit.",
      problem:
        "1:1 calling samples are either vendor UI kits or incomplete WebRTC demos. Teams need a spec-driven reference that includes invite codes, connection state, and a releasable APK.",
      solution:
        "A focused host/guest flow on Chime, specified and implemented through Spec Kit, with a signed release APK and a two-device demo video.",
      architecture: [
        "Flutter client, Android-first.",
        "Amazon Chime SDK for media and meeting control.",
        "Host creates meeting; guest joins via invite code.",
        "Spec Kit artifacts under specs/001-video-calling.",
      ],
      capabilities: [
        "Create meeting as host; join as guest with invite code.",
        "Local + remote video and two-way audio.",
        "Mic/camera toggle, camera switch, leave.",
        "Signed APK and end-to-end demo video.",
      ],
      audience:
        "Teams evaluating Chime for agent/client calling, and anyone studying Spec-Driven Development on a real media app.",
      outcomes: [
        "A runnable Android artifact, not only source.",
        "A complete Spec Kit trail from constitution to implementation.",
      ],
    },
  },
  {
    slug: "vobiz-voip-call",
    name: "VOBIZ-VOIP-Call",
    title: "VOBIZ VoIP Call",
    subtitle: "Native Kotlin SIP/WebRTC dialer for Vobiz PSTN",
    description:
      "Android 12+ Jetpack Compose softphone for inbound and outbound PSTN via Vobiz: SIP over secure WebSocket, WebRTC audio, recents/keypad UI, and a TypeScript Answer URL / FCM backend.",
    github: "https://github.com/nuvyntralabs/VOBIZ-VOIP-Call",
    homepage: null,
    language: "Kotlin",
    fork: false,
    tags: ["Kotlin", "SIP", "WebRTC", "Vobiz"],
    kind: "research",
    paper: {
      abstract:
        "Vobiz VoIP Dialer is a native Kotlin Android 12+ Jetpack Compose softphone for inbound and outbound PSTN through Vobiz. Signaling is SIP over a secure WebSocket; media is WebRTC.",
      problem:
        "Embedding PSTN calling needs a real dialer — recents, keypad, number normalization, and app-to-app intents — not a vendor sample.",
      solution:
        "A native-phone-style dialer with SIM/default-country number normalization, its own call history, and documented intents so other apps can place a call.",
      architecture: [
        "Android 12+ Jetpack Compose softphone.",
        "TypeScript Answer URL, call-state, and FCM service.",
        "SIP over secure WebSocket; WebRTC audio.",
      ],
      capabilities: [
        "Inbound and outbound PSTN via Vobiz.",
        "Recents, keypad, device-contact search, and Settings.",
        "ACTION_DIAL and explicit CALL intents for other apps.",
      ],
      audience: "Teams embedding Vobiz PSTN in Android products, and anyone needing a native counterpart to MAUI VoipCore.",
      outcomes: [
        "A documented calling stack with UI, backend, and webhook contracts.",
        "App-to-app dialing without relying on the system call log.",
      ],
    },
  },
  {
    slug: "gps-sensor-tracking-service",
    name: "GPSSensorTrackingService",
    title: "GPS Sensor Tracking Service",
    subtitle: "Offline GPS distance tracking at 97% trip-meter accuracy",
    description:
      "A Kotlin Android study that computes distance travelled from filtered GPS fixes and the Haversine formula — no map or Directions API. Road-tested at 97% versus a vehicle trip meter.",
    github: "https://github.com/nuvyntralabs/GPSSensorTrackingService",
    homepage: null,
    language: "Kotlin",
    fork: false,
    tags: ["Kotlin", "GPS", "Offline", "Haversine"],
    kind: "research",
    paper: {
      abstract:
        "GPSSensorTrackingService measures distance travelled using only the device GPS in offline mode. Fixes are filtered and summed with the Haversine formula. On a 2.00 km road route the app measured 1.94 km — 97% of the vehicle trip meter.",
      problem:
        "Field-survey and mileage apps that depend on routing APIs fail offline and often disagree with the dashboard.",
      solution:
        "A speed-aware tracking service that samples GPS, filters low-quality fixes, and accumulates Haversine segments. The repository publishes the road-test numbers and residual-error analysis.",
      architecture: [
        "Kotlin tracking service bound to the GPS sensor.",
        "Speed-aware sampling and accuracy filtering.",
        "Haversine accumulation; no external routing.",
      ],
      capabilities: [
        "Offline distance calculation.",
        "Road-test methodology versus vehicle trip meter.",
        "Transparent accuracy reporting (97% on the published route).",
      ],
      audience: "Field-survey, logistics, and insurance mileage products that must work without a map vendor.",
      outcomes: [
        "An evidence-backed accuracy study, not a marketing claim.",
        "Design input for Plugin.Maui.GeoLocator and OfflineSync field stacks.",
      ],
    },
  },
  {
    slug: "location-tracking-jobscheduler",
    name: "LocatinTrackingJobScheduler-XamarinAndroid",
    title: "Location Tracking JobScheduler",
    subtitle: "Xamarin.Android location tracking via JobScheduler",
    description:
      "A Xamarin.Android project that uses JobScheduler for periodic location tracking — an earlier native-Android approach to the same field-tracking problem later explored in Kotlin and MAUI.",
    github: "https://github.com/nuvyntralabs/LocatinTrackingJobScheduler-XamarinAndroid",
    homepage: null,
    language: "C#",
    fork: false,
    tags: ["Xamarin", "Android", "JobScheduler", "Location"],
    kind: "research",
    paper: {
      abstract:
        "This Xamarin.Android experiment schedules location work through Android JobScheduler. It is an earlier chapter of the same story as GPSSensorTrackingService and Plugin.Maui.BackgroundTasks.",
      problem:
        "Continuous location with a sticky service is battery-hostile and increasingly restricted.",
      solution:
        "Express location tracking as scheduled jobs on Xamarin.Android so the OS can batch, defer, and constrain work.",
      architecture: [
        "Xamarin.Android JobScheduler integration.",
        "Periodic location capture as job work.",
        "Predecessor thinking to MAUI BackgroundTasks + GeoLocator.",
      ],
      capabilities: [
        "Scheduled location jobs on Android.",
        "Xamarin.Android reference for enterprise field apps.",
      ],
      audience: "Teams maintaining Xamarin.Android field apps or migrating them to MAUI.",
      outcomes: [
        "A public reference for JobScheduler-based tracking.",
        "Continuity with later MAUI background-work plugins.",
      ],
    },
  },
  {
    slug: "twilio-voice-android-xamarin-binding",
    name: "Twilio.Voice.Android.XamarinBinding",
    title: "Twilio Voice Android Binding",
    subtitle: "Xamarin binding for Twilio Voice on Android",
    description:
      "A Xamarin Android binding library for the Twilio Voice SDK, used to bring programmable voice into Xamarin and early cross-platform calling apps.",
    github: "https://github.com/nuvyntralabs/Twilio.Voice.Android.XamarinBinding",
    homepage: null,
    language: "C#",
    fork: false,
    tags: ["Xamarin", "Twilio", "VoIP", "Android"],
    kind: "research",
    paper: {
      abstract:
        "This binding exposes the Twilio Voice Android SDK to Xamarin/C#. It is the Android half of a pair that powered programmable voice in Xamarin apps before MAUI VoipCore abstracted the session model.",
      problem:
        "Twilio ships first-class Android and iOS SDKs. Xamarin apps cannot consume them without binding projects that map Java APIs into C#.",
      solution:
        "A dedicated Android binding repository so Xamarin solutions can add Twilio Voice without each product reinventing the transform.",
      architecture: [
        "Xamarin Android binding over Twilio Voice.",
        "Paired with the iOS binding repository.",
      ],
      capabilities: [
        "C# access to Twilio Voice on Android.",
        "A reusable binding instead of a per-app AAR hack.",
      ],
      audience: "Xamarin teams integrating Twilio programmable voice on Android.",
      outcomes: [
        "Unblocked VoIP features in Xamarin Android apps.",
        "A public binding others can fork and retarget.",
      ],
    },
  },
  {
    slug: "twilio-voice-ios-xamarin-binding",
    name: "Twilio.Voice.iOS.XamarinBinding",
    title: "Twilio Voice iOS Binding",
    subtitle: "Xamarin binding for Twilio Voice on iOS",
    description:
      "A Xamarin iOS binding library for the Twilio Voice SDK, complementary to the Android binding and CallKit sample work.",
    github: "https://github.com/nuvyntralabs/Twilio.Voice.iOS.XamarinBinding",
    homepage: null,
    language: "C#",
    fork: false,
    tags: ["Xamarin", "Twilio", "VoIP", "iOS"],
    kind: "research",
    paper: {
      abstract:
        "This binding exposes the Twilio Voice iOS SDK to Xamarin/C#. Together with the Android binding and the CallKit sample, it formed a cross-platform voice stack for Xamarin.",
      problem:
        "iOS voice apps must integrate CallKit, PushKit, and the vendor SDK. Xamarin needs a binding before any of that is callable from C#.",
      solution:
        "A focused iOS binding project that product apps can reference alongside CallKit integration.",
      architecture: [
        "Xamarin iOS binding over Twilio Voice.",
        "Designed to sit next to PushKit/CallKit samples.",
      ],
      capabilities: [
        "C# access to Twilio Voice on iOS.",
        "Shared API shape with the Android binding for cross-platform call code.",
      ],
      audience: "Xamarin iOS teams shipping Twilio Voice with system call UI.",
      outcomes: [
        "Parity with the Android Twilio binding.",
        "A foundation for later MAUI VoipCore design.",
      ],
    },
  },
  {
    slug: "solar-sales-automation",
    name: "solar-sales-automation",
    title: "Solar Sales Automation",
    subtitle: "Interactive prototype for Surya Sai Solar's live sales workflow",
    description:
      "Static HTML prototype of a connected manager portal, quotation/BOQ module, and sales-rep mobile app — assignment, SLAs, site surveys, proposals, and conversion. Live on Netlify.",
    github: "https://github.com/nuvyntralabs/solar-sales-automation",
    homepage: "https://solar-sales-automation-prototype.netlify.app",
    language: "HTML",
    fork: false,
    tags: ["HTML", "Prototype", "Solar", "SLA"],
    kind: "poc",
    paper: {
      abstract:
        "An interactive product prototype for a real-time solar sales workflow: lead events, assignment, SLA monitoring, site surveys, proposals, financing, and conversion across a manager portal and a sales-rep mobile experience.",
      problem:
        "Solar sales cadence does not fit a generic CRM demo. Stakeholders need a connected manager + mobile walkthrough before a production build.",
      solution:
        "A no-build prototype: open portal and mobile UIs in separate tabs, share simulated workspace events, and evaluate assignment and survey check-ins as one scenario.",
      architecture: [
        "Static HTML, CSS, and JavaScript.",
        "Manager portal and mobile surfaces share simulated events across browser tabs.",
        "Dialer, WhatsApp, auth, APIs, and sync are simulated.",
      ],
      capabilities: [
        "Manager portal: live events, SLA intervention, capacity-aware assignment.",
        "Quotation module: lead-linked solar BOQs, GST, versioned revisions, WhatsApp sharing.",
        "Rep mobile app: timed assignment acknowledgement, structured outcomes, site visits.",
      ],
      audience: "Solar operators and product stakeholders evaluating a vertical sales OS before backend investment.",
      outcomes: [
        "A clickable, connected manager + mobile story on Netlify.",
        "Clear boundary: prototype UX now; production integrations later.",
      ],
    },
  },
  {
    slug: "bluetooth-mic-recording",
    name: "BluetoothMICRecording",
    title: "Bluetooth MIC Recording",
    subtitle: "Long-running Bluetooth headset recording on Android",
    description:
      "A .NET MAUI proof of concept: multi-hour microphone recording from a Bluetooth headset, kept alive by a foreground service, notification actions, and a battery-optimization exemption.",
    github: "https://github.com/nuvyntralabs/BluetoothMICRecording",
    homepage: null,
    language: "C#",
    fork: false,
    tags: [".NET MAUI", "Android", "Bluetooth", "Foreground Service"],
    kind: "poc",
    paper: {
      abstract:
        "BtRecorderPoc is a MAUI Android proof of concept for long-running headset-mic recording. Recording is controlled from a notification action. A foreground service, wake lock, and battery-optimization exemption keep the pipeline alive for multi-hour sessions.",
      problem:
        "Android will kill background recording. Bluetooth SCO routing, notification dismissal, and battery savers make 'press record and walk away' unreliable.",
      solution:
        "Start a microphone foreground service at process launch. Show a silent keep-alive notification always, and a control notification only while a BT device is connected.",
      architecture: [
        "MainApplication.OnCreate starts BtRecorderService.",
        "BluetoothStateReceiver shows/hides the control notification on ACL connect/disconnect.",
        "Notification-only Start/Stop; UI has no record button.",
      ],
      capabilities: [
        "Notification-only Start/Stop.",
        "Auto-stop on Bluetooth disconnect.",
        "Battery-optimization exemption prompt.",
        "In-app playback with seek.",
      ],
      audience: "MAUI/Android engineers who need headset capture that outlives the activity.",
      outcomes: [
        "A documented pattern for microphone foreground services on modern Android.",
        "Separation of keep-alive versus user control notifications.",
      ],
    },
  },
  {
    slug: "file-processor-test",
    name: "FileProcessorTest",
    title: "File Processor Test",
    subtitle: "C# file-processing test harness",
    description:
      "A public C# harness for exercising file-processing pipelines — a sandbox for batch, transform, and validation logic before it lands in product code.",
    github: "https://github.com/nuvyntralabs/FileProcessorTest",
    homepage: null,
    language: "C#",
    fork: false,
    tags: ["C#", "Files", "Testing"],
    kind: "poc",
    paper: {
      abstract:
        "A C# test and experimentation repository for file-processing pipelines, so transform, validation, and batch behaviors can be proven in isolation.",
      problem:
        "File pipelines are usually first written inside a product repo, where they are hard to unit-test and easy to couple to UI or HTTP.",
      solution:
        "A small public harness that can host processors and tests without the weight of a full application.",
      architecture: [
        "Standalone C# project.",
        "Intended as a sandbox for processors and automated tests.",
      ],
      capabilities: [
        "Isolated file-processing experiments.",
        "A place to attach tests before product integration.",
      ],
      audience: "Developers hardening batch or document pipelines in .NET.",
      outcomes: [
        "Faster iteration on file logic.",
        "Separation of pipeline tests from app bootstrapping.",
      ],
    },
  },
  {
    slug: "callkit-sample",
    name: "callkitsample",
    title: "CallKit Sample (fork)",
    subtitle: "CallKit + PushKit + Twilio VoIP in Xamarin",
    description:
      "A public fork of a Xamarin CallKit sample wired with PushKit and Twilio VoIP — system call UI for incoming voice on iOS.",
    github: "https://github.com/nuvyntralabs/callkitsample",
    homepage: null,
    language: "C#",
    fork: true,
    tags: ["Xamarin", "CallKit", "PushKit", "Twilio"],
    kind: "poc",
    paper: {
      abstract:
        "A public fork of a Xamarin CallKit sample integrated with PushKit and Twilio VoIP. Incoming voice presents through the iOS system call UI rather than an in-app banner.",
      problem:
        "VoIP apps that skip CallKit feel unofficial, miss lock-screen answer, and fail App Review expectations for calling.",
      solution:
        "Study and extend a known CallKit + PushKit sample, bound to Twilio, so Xamarin iOS calling can use native incoming-call UX.",
      architecture: [
        "Forked Xamarin CallKit sample.",
        "PushKit for VoIP pushes.",
        "Twilio Voice as the media/signaling provider.",
      ],
      capabilities: [
        "System incoming-call UI via CallKit.",
        "PushKit wake-up for VoIP.",
        "Twilio-backed voice path.",
      ],
      audience: "Xamarin iOS developers implementing official-feeling voice calls.",
      outcomes: [
        "A working reference beside the Twilio iOS binding.",
        "Lessons later absorbed into VoipCore's session model.",
      ],
    },
  },
  {
    slug: "html-label-plugin",
    name: "HtmlLabelPlugin",
    title: "HtmlLabelPlugin (fork)",
    subtitle: "Render HTML inside a Xamarin.Forms label",
    description:
      "A fork of the Xamarin.Forms HtmlLabel plugin — display HTML content in a label when a full WebView is too heavy.",
    github: "https://github.com/nuvyntralabs/HtmlLabelPlugin",
    homepage: null,
    language: "C#",
    fork: true,
    tags: ["Xamarin.Forms", "HTML", "UI"],
    kind: "poc",
    paper: {
      abstract:
        "A fork of a Xamarin.Forms plugin that renders HTML into a label when help text or lightweight rich content should not pay for a WebView.",
      problem:
        "Xamarin.Forms Label does not parse HTML. Teams either strip markup or embed WebViews that hurt scroll performance.",
      solution:
        "Adopt and maintain a community plugin that maps a subset of HTML to native formatted text.",
      architecture: [
        "Xamarin.Forms plugin with platform renderers.",
        "HTML subset mapped to native attributed text.",
      ],
      capabilities: [
        "HTML in a label control.",
        "Lighter than a WebView for static rich text.",
      ],
      audience: "Xamarin.Forms apps that show CMS or help HTML inline.",
      outcomes: [
        "A maintained fork when upstream cadence does not match a product.",
        "Continuity for apps not yet on MAUI.",
      ],
    },
  },
  {
    slug: "plugin-firebase-analytics",
    name: "Plugin.FirebaseAnalytics",
    title: "Plugin.FirebaseAnalytics (fork)",
    subtitle: "Firebase Analytics for Xamarin / MAUI-era apps",
    description:
      "A public fork of Plugin.FirebaseAnalytics for wiring Firebase Analytics events from Xamarin and related .NET mobile apps.",
    github: "https://github.com/nuvyntralabs/Plugin.FirebaseAnalytics",
    homepage: null,
    language: null,
    fork: true,
    tags: ["Firebase", "Analytics", "Xamarin"],
    kind: "poc",
    paper: {
      abstract:
        "A fork of the community Firebase Analytics plugin for .NET mobile so event logging can be pinned and patched independently of upstream release timing.",
      problem:
        "Analytics plugins lag Firebase SDK and linker changes. Products cannot always wait for upstream.",
      solution:
        "Fork, pin, and patch the plugin for the app's TFM and Firebase version, while remaining compatible with the original API shape.",
      architecture: [
        "Community plugin fork.",
        "Firebase Analytics event and property API.",
      ],
      capabilities: [
        "Log events and user properties to Firebase Analytics.",
        "A pin-able fork for production apps.",
      ],
      audience: "Xamarin/.NET mobile teams that need a stable Analytics plugin.",
      outcomes: [
        "Control over a critical analytics dependency.",
        "A public trail of the fork for others on the same stack.",
      ],
    },
  },
];

export const researchProjects = works.filter((item) => item.kind === "research");
export const proofOfConcepts = works.filter((item) => item.kind === "poc");

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return works.find((item) => item.slug === slug);
}

export function getRelatedWorks(work: WorkItem, limit = 3): WorkItem[] {
  return works
    .filter((item) => item.slug !== work.slug && item.kind === work.kind)
    .slice(0, limit);
}

export function workPath(work: Pick<WorkItem, "kind" | "slug">): string {
  return work.kind === "research" ? `/research/${work.slug}/` : `/pocs/${work.slug}/`;
}
