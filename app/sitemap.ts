import type { MetadataRoute } from "next";
import { packages } from "@/content/packages";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteConfig.url, lastModified: now },
    { url: `${siteConfig.url}/getting-started/`, lastModified: now },
    ...packages.map((item) => ({
      url: `${siteConfig.url}/packages/${item.slug}/`,
      lastModified: now,
    })),
  ];
}
