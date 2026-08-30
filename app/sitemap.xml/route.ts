import { buildSitemapXml } from "@/lib/sitemap-xml";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildSitemapXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
