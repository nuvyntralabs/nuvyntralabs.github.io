/** Top-bar and Work menu. Pin at most two or three products; everything else lives in the menu. */

const mvvmExpressHrefs = [
  "/packages/plugin-maui-mvvmexpress/",
  "/packages/plugin-wpf-mvvmexpress/",
  "/packages/plugin-avalonia-mvvmexpress/",
  "/packages/plugin-uno-mvvmexpress/",
  "/packages/plugin-winui-mvvmexpress/",
];

export const mvvmExpressHref = mvvmExpressHrefs[0];

export type NavItem = {
  href: string;
  label: string;
  blurb?: string;
  badge?: string;
};

export type FeaturedNavItem = NavItem & {
  /** Show as a highlighted chip in the top bar. Keep this list short. */
  pin: boolean;
  prefixes: string[];
};

export const featuredProducts: FeaturedNavItem[] = [
  {
    href: "/toolkits/nuvyn/",
    label: "Nuvyn",
    blurb: "Whole ecosystem: spec-driven CLI for a new MAUI host",
    badge: "New",
    pin: true,
    prefixes: ["/toolkits/nuvyn/"],
  },
  {
    href: "/nuvexadb/",
    label: "NuvexaDB",
    blurb: "Embedded NoSQL — one .nvx file, many hosts",
    badge: "New",
    pin: true,
    prefixes: ["/nuvexadb/"],
  },
  {
    href: "/uikit/",
    label: "UIKit(MAUI)",
    blurb: "Component library: Lumina NV* controls and page recipes",
    badge: "New",
    pin: true,
    prefixes: ["/uikit/"],
  },
  {
    href: mvvmExpressHref,
    label: "MVVMExpress",
    blurb: "MVVM for MAUI, WPF, Avalonia, Uno, and WinUI",
    pin: false,
    prefixes: mvvmExpressHrefs,
  },
];

export const workCatalog: NavItem[] = [
  { href: "/whitepaper/", label: "White paper", blurb: "The MAUI development ecosystem" },
  { href: "/playground/", label: "Playground", blurb: "Real-time examples and community ideas" },
  { href: "/packages/", label: "All products", blurb: "Component library — focused NuGet catalog" },
  { href: "/toolkits/", label: "Toolkits", blurb: "Whole ecosystem — Nuvyn, MauiDev, NuvLoc, and Pulse" },
  { href: "/getting-started/", label: "Getting started", blurb: "Component library or whole ecosystem" },
];

export const labLinks: NavItem[] = [
  { href: "/research/", label: "Research", blurb: "Longer investigations" },
  { href: "/pocs/", label: "POCs", blurb: "Public proofs and forks" },
  { href: "/about/", label: "About", blurb: "How the lab works" },
];

export function itemIsActive(pathname: string, item: { href: string; prefixes?: string[] }) {
  if (item.prefixes?.length) {
    return item.prefixes.some((prefix) => pathname === prefix || pathname.startsWith(prefix));
  }
  if (item.href === "/") return pathname === "/";
  if (item.href === "/toolkits/") {
    return (
      (pathname === "/toolkits/" || pathname.startsWith("/toolkits/")) &&
      !pathname.startsWith("/toolkits/nuvyn/")
    );
  }
  if (item.href === "/packages/") {
    return (
      (pathname === "/packages/" || pathname.startsWith("/packages/")) &&
      !mvvmExpressHrefs.some((prefix) => pathname.startsWith(prefix))
    );
  }
  return pathname === item.href || pathname.startsWith(item.href);
}

export function workMenuIsActive(pathname: string) {
  return (
    workCatalog.some((item) => itemIsActive(pathname, item)) ||
    labLinks.some((item) => item.href !== "/about/" && itemIsActive(pathname, item))
  );
}

export function pinnedProducts() {
  return featuredProducts.filter((item) => item.pin);
}
