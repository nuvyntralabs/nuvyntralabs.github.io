export const mauiMvvmExpressSlug = "plugin-maui-mvvmexpress";
export const wpfMvvmExpressSlug = "plugin-wpf-mvvmexpress";

export const mvvmExpressPlatforms = [
  { id: "maui" as const, slug: mauiMvvmExpressSlug, label: "MAUI" },
  { id: "wpf" as const, slug: wpfMvvmExpressSlug, label: "WPF" },
];

export type MvvmExpressPlatformId = (typeof mvvmExpressPlatforms)[number]["id"];

const wpfTopicAliases: Record<string, string> = {
  reactive: "/docs/roadmap/",
  generators: "/docs/roadmap/",
  adapters: "/docs/composition/",
};

export function isMvvmExpressSlug(slug: string): boolean {
  return slug === mauiMvvmExpressSlug || slug === wpfMvvmExpressSlug;
}

export function getMvvmExpressPlatform(slug: string): (typeof mvvmExpressPlatforms)[number] | undefined {
  return mvvmExpressPlatforms.find((item) => item.slug === slug);
}

export function mvvmExpressPlatformHref(slug: string, suffix = "/"): string {
  return `/packages/${slug}${suffix.startsWith("/") ? suffix : `/${suffix}`}`;
}

/** Map a MAUI or WPF MVVMExpress path onto the other platform. Missing WPF topics fall back. */
export function mvvmExpressCounterpartHref(pathname: string, targetSlug: string): string {
  const match = pathname.match(/^\/packages\/(plugin-(?:maui|wpf)-mvvmexpress)(\/.*)?$/);
  if (!match) {
    return mvvmExpressPlatformHref(targetSlug);
  }

  const rest = match[2] ?? "/";
  if (targetSlug === wpfMvvmExpressSlug) {
    const topic = rest.match(/^\/docs\/([^/]+)\//)?.[1];
    if (topic && wpfTopicAliases[topic]) {
      return `/packages/${targetSlug}${wpfTopicAliases[topic]}`;
    }
  }

  return `/packages/${targetSlug}${rest.endsWith("/") || rest === "" ? rest || "/" : `${rest}/`}`;
}
