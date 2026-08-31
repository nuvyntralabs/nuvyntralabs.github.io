import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { packages } from "../content/packages";
import { proofOfConcepts, researchProjects } from "../content/works";
import { siteConfig } from "./site";

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
    ...packages.flatMap((item) =>
      item.guides ? [item.guides.technical, item.guides.integration] : [],
    ),
  ];

  return paths.map((path) =>
    path === "/" ? `${siteConfig.url}/` : `${siteConfig.url}${path}`,
  );
}

export function buildSitemapXml(): string {
  const urls = sitemapUrls()
    .map(
      (loc) => `  <url>
    <loc>${loc}</loc>
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

export function writePublicSitemaps(publicDir = join(process.cwd(), "public")) {
  writeFileSync(join(publicDir, "sitemap.xml"), buildSitemapXml());
  writeFileSync(join(publicDir, "sitemap-pages.xml"), buildSitemapXml());
  writeFileSync(join(publicDir, "sitemap.txt"), buildSitemapTxt());
}
