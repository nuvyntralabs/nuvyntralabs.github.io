import type { MetadataRoute } from "next";
import { packages } from "@/content/packages";
import { proofOfConcepts, researchProjects } from "@/content/works";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteConfig.url, lastModified: now },
    { url: `${siteConfig.url}/research/`, lastModified: now },
    { url: `${siteConfig.url}/pocs/`, lastModified: now },
    { url: `${siteConfig.url}/packages/`, lastModified: now },
    { url: `${siteConfig.url}/getting-started/`, lastModified: now },
    ...researchProjects.map((item) => ({
      url: `${siteConfig.url}/research/${item.slug}/`,
      lastModified: now,
    })),
    ...proofOfConcepts.map((item) => ({
      url: `${siteConfig.url}/pocs/${item.slug}/`,
      lastModified: now,
    })),
    ...packages.map((item) => ({
      url: `${siteConfig.url}/packages/${item.slug}/`,
      lastModified: now,
    })),
  ];
}
