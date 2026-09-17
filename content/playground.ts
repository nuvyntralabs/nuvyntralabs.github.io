import { uiKit } from "@/content/uikit";
import { siteConfig } from "@/lib/site";

export const playgroundHref = "/playground/";

export const playground = {
  title: "Lumina Playground",
  subtitle: "A public repo space for real-time examples — and a place to share ideas",
  description:
    "Lumina Playground is the Nuvyntra Labs repo space where real-time .NET MAUI examples are created. Walk the five product heads already there, then share your own idea with the open-source community.",
  abstract:
    "Lumina Playground is a public GitHub repo space — not a frozen demo pack. Real-time examples are created here as the ecosystem grows. Five product heads are already on the stack: Aether Bank, Nuvexa Clinic, Civic Pulse, Harbor Field, and Lumina Market. Open-source contributors are invited to share ideas with the community in Discussions, Issues, Discord, and LinkedIn.",
  github: "https://github.com/nuvyntralabs/NuvyntraLabs.LuminaPlayground",
  screenCount: 130,
  appCount: 5,
  demoPassword: "secret",
} as const;

export const playgroundWhat = {
  title: "What is the Nuvyntra development ecosystem?",
  body: [
    "A production .NET MAUI app is not one library. It is a UI, an application shell, a network contract, a local store, and a set of device concerns. Nuvyntra Labs ships those as independently versioned products — not a mega-SDK.",
    "Teams paint screens with NuvyntraLabs.UIKit (Lumina NV* controls), host the app with Plugin.Maui.MVVMExpress, talk to APIs with Plugin.Maui.HttpForge, then add only the gallery plugins the product needs. LocalStore can host NuvexaDB in one portable .nvx file.",
    "Lumina Playground is the repo space for that stack. Real-time examples are created here as new recipes, heads, and plugin wiring land. Five complete product heads are already there to build, install, and walk. Demo password on every sign-in screen is secret.",
  ],
} as const;

export const playgroundSpace = {
  title: "A repo space for real-time examples",
  description:
    "NuvyntraLabs.LuminaPlayground is the public home for living examples — not a one-off sample zip. New screens and heads are added in the open as the ecosystem grows.",
  points: [
    {
      title: "Created in public",
      body: "Examples land in the repo as they are built. Clone today, pull tomorrow — the playground stays current.",
    },
    {
      title: "Same stack, new heads",
      body: "Every example stays on Lumina UI, MVVMExpress, HttpForge, and LocalStore / NuvexaDB. New verticals reuse the same paper.",
    },
    {
      title: "Walk what is already there",
      body: "Five product heads are the first wave: market, clinic, field, bank, and civic. Use them as a start, not a ceiling.",
    },
  ],
} as const;

export const playgroundContribute = {
  title: "Share your idea with the community",
  description:
    "Open-source contributors are welcome. Bring a use case, a missing screen, or a new product head — the playground is the place to propose it in public.",
  paths: [
    {
      title: "Propose an example",
      body: "Open a Discussion with the flow you want to see next. The community can shape it before a head is built.",
      href: `${playground.github}/discussions`,
      label: "Start a discussion",
    },
    {
      title: "Improve what exists",
      body: "File an Issue for a gap, or open a pull request on NuvyntraLabs.LuminaPlayground when you have a screen or recipe to add.",
      href: `${playground.github}/issues`,
      label: "Open an issue",
    },
  ],
} as const;

export const playgroundAdvantages = [
  {
    title: "One visual language",
    body: `${uiKit.controlCount} NV* controls and ${uiKit.recipeCount} page recipes. Five verticals, one Lumina paper — not a vendor UI kit.`,
  },
  {
    title: "Navigation you can finish",
    body: "MVVMExpress ViewModels, async state, NavigationPage maps, and dialogs. No Shell.Current from a ViewModel.",
  },
  {
    title: "Typed APIs without a backend",
    body: "HttpForge contracts backed by in-memory seed. Swap the implementation when a real host exists.",
  },
  {
    title: "Documents that travel",
    body: "LocalStore plus NuvexaDB — Room-style access over one portable .nvx file, shared across every head.",
  },
  {
    title: "Compose, do not replace",
    body: "Need GPS, NFC, offline jobs, TLS pin, or print later? Take the matching plugin. Field already sketches that path.",
  },
  {
    title: "Independently versioned",
    body: "Each product versions on its own. There is no mega-package dependency and no paid UI kit.",
  },
] as const;

export const playgroundRoadmap = [
  {
    title: "Real-time examples in the repo",
    body: "New heads and screens are created in NuvyntraLabs.LuminaPlayground as the ecosystem grows — pull the repo, do not wait for a release zip.",
  },
  {
    title: "Deeper plugin wiring",
    body: "GPS, NFC, offline jobs, TLS pin, and print — compose the gallery plugins the field already sketches.",
  },
  {
    title: "Sharper Lumina recipes",
    body: "Richer NV* page recipes so a weekend prototype looks like a shipped product.",
  },
  {
    title: "Live hosts when you are ready",
    body: "HttpForge stays a C# interface. Swap the in-memory seed for a real API without rewriting screens.",
  },
] as const;

export type PlaygroundShot = {
  src: string;
  label: string;
  alt: string;
};

export type PlaygroundPrototype = {
  slug: string;
  name: string;
  product: string;
  path: string;
  screens: number;
  accent: string;
  tagline: string;
  body: string;
  highlights: string[];
  shots: PlaygroundShot[];
};

export const playgroundPrototypes: PlaygroundPrototype[] = [
  {
    slug: "market",
    name: "Lumina Market",
    product: "Harbour Market",
    path: "src/NuvyntraLabs.Lumina.Market",
    screens: 32,
    accent: "#2563eb",
    tagline: "Groceries, home, and dinner in one bag",
    body: "Retail, grocery, and food on warm paper with an aurora accent. Walk a store from walkthrough to receipt: aisles, catalog, compare, same-day slots, kitchen tab, and courier tracking. Built to prove a commerce surface can stay on Lumina tokens instead of a vendor UI kit.",
    highlights: [
      "Catalog and filters",
      "Checkout and saved cards",
      "Order tracking",
      "Same-day Harbour Studio slots",
    ],
    shots: [
      { src: "/playground/market/welcome.png", label: "Welcome", alt: "Harbour Market welcome — groceries, home, and dinner in one bag" },
      { src: "/playground/market/login.png", label: "Sign in", alt: "Harbour Market sign-in for staff and members" },
      { src: "/playground/market/home.png", label: "Home", alt: "Harbour Market home with aisles, same-day drop, and deals" },
      { src: "/playground/market/shop.png", label: "Shop", alt: "Harbour Market shop grid with filters and free delivery" },
      { src: "/playground/market/cart.png", label: "Cart", alt: "Harbour Market cart with price details and place order" },
      { src: "/playground/market/orders.png", label: "Orders", alt: "Harbour Market orders with packing and delivered states" },
      { src: "/playground/market/account.png", label: "Account", alt: "Harbour Market account, wishlist, and saved cards" },
    ],
  },
  {
    slug: "clinic",
    name: "Nuvexa Clinic",
    product: "Harbour Clinic",
    path: "src/NuvyntraLabs.Lumina.Clinic",
    screens: 27,
    accent: "#0f766e",
    tagline: "Doctors, labs, and a quiet care record",
    body: "A Harbour clinic day: find a cardiologist, book Dr. Iyer, read a lipid panel, and sit in a video room. Care records, scripts, and invoices live in one file — the same LocalStore / NuvexaDB seed every other head uses.",
    highlights: [
      "Clinician directory and booking",
      "Upcoming and past visits",
      "Lab reports and vitals",
      "Pharmacy and medications",
    ],
    shots: [
      { src: "/playground/clinic/home.png", label: "Home", alt: "Harbour Clinic home with video consult, doctors, medicines, and labs" },
      { src: "/playground/clinic/doctors.png", label: "Doctors", alt: "Harbour Clinic doctor directory with ratings and consult fees" },
      { src: "/playground/clinic/appointments.png", label: "Visits", alt: "Harbour Clinic upcoming and past appointments" },
      { src: "/playground/clinic/records.png", label: "Records", alt: "Harbour Clinic records with vitals, labs, and health files" },
      { src: "/playground/clinic/account.png", label: "You", alt: "Harbour Clinic account, insurance, and care profile" },
    ],
  },
  {
    slug: "field",
    name: "Harbor Field",
    product: "Harbour Fields",
    path: "src/NuvyntraLabs.Lumina.Field",
    screens: 24,
    accent: "#ea580c",
    tagline: "Jobs, NFC assets, and an offline queue",
    body: "A van-tablet day in the Harbour district. Inspect a storm pump, write an NFC tag, queue photos until the radio comes back, print a Zebra receipt, and resolve a local-vs-desk conflict. This is the head that shows field work without a live sync server.",
    highlights: [
      "Job board and SLA",
      "NFC asset register",
      "Offline photo and write queue",
      "Safety, timesheet, and print",
    ],
    shots: [
      { src: "/playground/field/login.png", label: "Crew gate", alt: "Harbour Fields crew gate sign-in on the van tablet" },
      { src: "/playground/field/today.png", label: "Today", alt: "Harbour Fields today board with open jobs and van tools" },
      { src: "/playground/field/jobs.png", label: "Jobs", alt: "Harbour Fields job list with en route and on site states" },
      { src: "/playground/field/assets.png", label: "Assets", alt: "Harbour Fields asset register for pumps, generators, and radios" },
      { src: "/playground/field/queue.png", label: "Queue", alt: "Harbour Fields offline queue waiting for radio" },
      { src: "/playground/field/you.png", label: "You", alt: "Harbour Fields crew profile, timesheet, and safety" },
    ],
  },
  {
    slug: "bank",
    name: "Aether Bank",
    product: "Aether Bank",
    path: "src/NuvyntraLabs.Lumina.Bank",
    screens: 24,
    accent: "#7f1d1d",
    tagline: "Sterling books, cards, and a gated dashboard",
    body: "Retail banking on burgundy and gold. Ada’s current, savings, and USD travel books, an aurora debit, a frozen travel metal, and a PIN that gates the dashboard. Wealth sleeves and KYC sit next to bills and international payees — a serious-looking bank on the same MVVMExpress maps as Market.",
    highlights: [
      "Accounts and monthly spend",
      "Send, bills, SWIFT / IBAN, QR",
      "Debit and travel metal cards",
      "App lock / Face ID chrome",
    ],
    shots: [
      { src: "/playground/bank/login.png", label: "Sign in", alt: "Aether Bank welcome-back sign-in with PIN unlock" },
      { src: "/playground/bank/home.png", label: "Home", alt: "Aether Bank home with available balance and sterling books" },
      { src: "/playground/bank/accounts.png", label: "Accounts", alt: "Aether Bank current, savings, and USD travel accounts" },
      { src: "/playground/bank/pay.png", label: "Pay", alt: "Aether Bank pay hub for send, bills, international, and scan" },
      { src: "/playground/bank/cards.png", label: "Cards", alt: "Aether Bank debit and frozen travel metal cards" },
      { src: "/playground/bank/more.png", label: "More", alt: "Aether Bank more menu for money and growth" },
    ],
  },
  {
    slug: "civic",
    name: "Civic Pulse",
    product: "Harbour Borough",
    path: "src/NuvyntraLabs.Lumina.Civic",
    screens: 23,
    accent: "#1e3a8a",
    tagline: "Bins, buses, permits, and a resident pass",
    body: "Harbour borough today: bin day, Bus 12, a night market, a missed-waste request, and a day-rover QR in the wallet. Councils, libraries, and permits share one resident pass. Built to show a civic desk can live on the same Lumina tokens as a bank or a clinic.",
    highlights: [
      "311-style open requests",
      "Live-looking transit board",
      "Civic wallet and rover",
      "Events, news, and permits",
    ],
    shots: [
      { src: "/playground/civic/login.png", label: "Sign in", alt: "Civic Pulse resident pass sign-in for Harbour borough" },
      { src: "/playground/civic/home.png", label: "Home", alt: "Civic Pulse home with bin day, Bus 12, and borough services" },
      { src: "/playground/civic/services.png", label: "Services", alt: "Civic Pulse services desk with open bins and pothole tickets" },
      { src: "/playground/civic/transit.png", label: "Transit", alt: "Civic Pulse live transit board at Harbour Walk" },
      { src: "/playground/civic/wallet.png", label: "Wallet", alt: "Civic Pulse resident pass, rover, and points wallet" },
      { src: "/playground/civic/you.png", label: "You", alt: "Civic Pulse resident profile, offices, and alerts" },
    ],
  },
];

export const playgroundChannels = [
  {
    title: "Discussions",
    body: "Share an idea, a use case, or a new example with the open-source community. This is the first place contributors talk.",
    href: `${playground.github}/discussions`,
    label: "Share an idea",
  },
  {
    title: "Issues",
    body: "Found a bug or a missing screen? File it on the Lumina Playground repo so the next real-time example can land.",
    href: `${playground.github}/issues`,
    label: "Open an issue",
  },
  {
    title: "LinkedIn",
    body: "Join the LinkedIn group for lab updates, new heads, and release notes.",
    href: siteConfig.linkedin,
    label: "Join LinkedIn",
  },
  {
    title: "Discord",
    body: "Join the Discord channel for walkthroughs, questions, and community help.",
    href: siteConfig.discord,
    label: "Join Discord",
  },
] as const;
