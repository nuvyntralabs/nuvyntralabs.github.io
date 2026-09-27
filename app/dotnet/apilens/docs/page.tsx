import type { Metadata } from "next";
import { ApiLensGuide } from "@/components/apilens-guide";
import { apiLensGettingStarted } from "@/content/apilens-guide";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${apiLensGettingStarted.title} · ApiLens`,
  description: apiLensGettingStarted.description,
  alternates: { canonical: apiLensGettingStarted.href },
  openGraph: {
    title: `${apiLensGettingStarted.title} · ApiLens · ${siteConfig.shortName}`,
    description: apiLensGettingStarted.description,
    url: apiLensGettingStarted.href,
  },
};

export default function ApiLensDocsIndexPage() {
  return <ApiLensGuide page={apiLensGettingStarted} />;
}
