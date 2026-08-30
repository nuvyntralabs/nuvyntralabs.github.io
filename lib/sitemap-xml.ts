import { packages } from "@/content/packages";
import { proofOfConcepts, researchProjects } from "@/content/works";
import { siteConfig } from "@/lib/site";

export function buildSitemapXml(): string {
  const lastmod = new Date().toISOString().slice(0, 10);
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

  const urls = paths
    .map((path) => {
      const loc = path === "/" ? `${siteConfig.url}/` : `${siteConfig.url}${path}`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
