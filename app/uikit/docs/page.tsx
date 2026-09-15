import type { Metadata } from "next";
import { UiKitGuide } from "@/components/uikit-guide";
import { uiKitDocsIndex } from "@/content/uikit-guide";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${uiKitDocsIndex.title} · UIKit(MAUI)`,
  description: uiKitDocsIndex.description,
  alternates: { canonical: uiKitDocsIndex.href },
  openGraph: {
    title: `${uiKitDocsIndex.title} · UIKit(MAUI) · ${siteConfig.shortName}`,
    description: uiKitDocsIndex.description,
    url: uiKitDocsIndex.href,
  },
};

export default function UiKitDocsIndexPage() {
  return <UiKitGuide page={uiKitDocsIndex} />;
}
