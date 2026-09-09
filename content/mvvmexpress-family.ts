export const mauiMvvmExpressSlug = "plugin-maui-mvvmexpress";
export const wpfMvvmExpressSlug = "plugin-wpf-mvvmexpress";
export const avaloniaMvvmExpressSlug = "plugin-avalonia-mvvmexpress";
export const unoMvvmExpressSlug = "plugin-uno-mvvmexpress";
export const winuiMvvmExpressSlug = "plugin-winui-mvvmexpress";

export const mvvmExpressPlatforms = [
  { id: "maui" as const, slug: mauiMvvmExpressSlug, label: "MAUI" },
  { id: "wpf" as const, slug: wpfMvvmExpressSlug, label: "WPF" },
  { id: "avalonia" as const, slug: avaloniaMvvmExpressSlug, label: "Avalonia" },
  { id: "uno" as const, slug: unoMvvmExpressSlug, label: "Uno" },
  { id: "winui" as const, slug: winuiMvvmExpressSlug, label: "WinUI" },
];

export type MvvmExpressPlatformId = (typeof mvvmExpressPlatforms)[number]["id"];

const desktopTopicAliases: Record<string, string> = {
  reactive: "/docs/roadmap/",
  generators: "/docs/roadmap/",
  adapters: "/docs/composition/",
};

const mvvmExpressPath =
  /^\/packages\/(plugin-(?:maui|wpf|avalonia|uno|winui)-mvvmexpress)(\/.*)?$/;

export function isMauiMvvmExpressSlug(slug: string): boolean {
  return slug === mauiMvvmExpressSlug;
}

export function isDesktopMvvmExpressSlug(slug: string): boolean {
  return (
    slug === wpfMvvmExpressSlug ||
    slug === avaloniaMvvmExpressSlug ||
    slug === unoMvvmExpressSlug ||
    slug === winuiMvvmExpressSlug
  );
}

export function isMvvmExpressSlug(slug: string): boolean {
  return isMauiMvvmExpressSlug(slug) || isDesktopMvvmExpressSlug(slug);
}

export function getMvvmExpressPlatform(slug: string): (typeof mvvmExpressPlatforms)[number] | undefined {
  return mvvmExpressPlatforms.find((item) => item.slug === slug);
}

export function mvvmExpressPlatformHref(slug: string, suffix = "/"): string {
  return `/packages/${slug}${suffix.startsWith("/") ? suffix : `/${suffix}`}`;
}

/** Map an MVVMExpress path onto another platform. Missing desktop topics fall back. */
export function mvvmExpressCounterpartHref(pathname: string, targetSlug: string): string {
  const match = pathname.match(mvvmExpressPath);
  if (!match) {
    return mvvmExpressPlatformHref(targetSlug);
  }

  const rest = match[2] ?? "/";
  if (isDesktopMvvmExpressSlug(targetSlug)) {
    const topic = rest.match(/^\/docs\/([^/]+)\//)?.[1];
    if (topic && desktopTopicAliases[topic]) {
      return `/packages/${targetSlug}${desktopTopicAliases[topic]}`;
    }
  }

  return `/packages/${targetSlug}${rest.endsWith("/") || rest === "" ? rest || "/" : `${rest}/`}`;
}
