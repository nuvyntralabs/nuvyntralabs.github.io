import { buildSitemapTxt } from "@/lib/sitemap-xml";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildSitemapTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
