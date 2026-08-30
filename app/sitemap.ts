import type { MetadataRoute } from "next";
import { packages } from "@/content/packages";
import { proofOfConcepts, researchProjects } from "@/content/works";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    entry("/", 1, "weekly", now),
    entry("/packages/", 0.9, "weekly", now),
    entry("/getting-started/", 0.9, "monthly", now),
    entry("/research/", 0.8, "weekly", now),
    entry("/pocs/", 0.8, "weekly", now),
    entry("/about/", 0.7, "monthly", now),
    entry("/contact/", 0.6, "yearly", now),
    ...researchProjects.map((item) => entry(`/research/${item.slug}/`, 0.7, "monthly", now)),
    ...proofOfConcepts.map((item) => entry(`/pocs/${item.slug}/`, 0.6, "monthly", now)),
    ...packages.map((item) => entry(`/packages/${item.slug}/`, 0.8, "weekly", now)),
  ];
}

function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  lastModified: Date,
): MetadataRoute.Sitemap[number] {
  return {
    url: path === "/" ? `${siteConfig.url}/` : `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}
