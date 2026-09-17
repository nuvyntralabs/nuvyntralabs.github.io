import type { Metadata } from "next";
import { NuvynGuide } from "@/components/nuvyn-guide";
import { nuvynSpecDriven } from "@/content/nuvyn-guide";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${nuvynSpecDriven.title} · Nuvyn`,
  description: nuvynSpecDriven.description,
  alternates: { canonical: nuvynSpecDriven.href },
  openGraph: {
    title: `${nuvynSpecDriven.title} · Nuvyn · ${siteConfig.shortName}`,
    description: nuvynSpecDriven.description,
    url: nuvynSpecDriven.href,
  },
};

export default function NuvynDocsIndexPage() {
  return <NuvynGuide page={nuvynSpecDriven} kind="docs" />;
}
