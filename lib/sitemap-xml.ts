import { packages } from "@/content/packages";
import { proofOfConcepts, researchProjects } from "@/content/works";
import { siteConfig } from "@/lib/site";

export function sitemapUrls(): string[] {
  const paths = [
    "/",
    "/packages/",
    "/getting-started/",
    "/research/",
    "/pocs/",
    "/about/",
    "/contact/",
    ...researchProjects.map((item) => `/research/${item.slug}/`),
    ...proofOfConcepts.map((item) => `/pocs/${item.slug}/`),
    ...packages.map((item) => `/packages/${item.slug}/`),
  ];

  return paths.map((path) =>
    path === "/" ? `${siteConfig.url}/` : `${siteConfig.url}${path}`,
  );
}

export function buildSitemapXml(): string {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = sitemapUrls()
    .map(
      (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function buildSitemapTxt(): string {
  return `${sitemapUrls().join("\n")}\n`;
}
