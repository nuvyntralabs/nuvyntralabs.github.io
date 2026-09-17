import type { Metadata } from "next";
import { NuvynGuide } from "@/components/nuvyn-guide";
import { nuvynInstallGuide } from "@/content/nuvyn-guide";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `User guide · Nuvyn`,
  description: nuvynInstallGuide.description,
  alternates: { canonical: nuvynInstallGuide.href },
  openGraph: {
    title: `Nuvyn user guide · ${siteConfig.shortName}`,
    description: nuvynInstallGuide.description,
    url: nuvynInstallGuide.href,
  },
};

export default function NuvynGuideIndexPage() {
  return <NuvynGuide page={nuvynInstallGuide} kind="guide" />;
}
