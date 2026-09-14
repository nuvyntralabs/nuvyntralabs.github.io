import type { Metadata } from "next";
import { NuvexaGuide } from "@/components/nuvexadb-guide";
import { nuvexaWhitepaper } from "@/content/nuvexadb-guide";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "NuvexaDB white paper",
  description: nuvexaWhitepaper.description,
  alternates: { canonical: nuvexaWhitepaper.href },
  openGraph: {
    title: `NuvexaDB white paper · ${siteConfig.shortName}`,
    description: nuvexaWhitepaper.description,
    url: nuvexaWhitepaper.href,
  },
};

export default function NuvexaWhitepaperPage() {
  return <NuvexaGuide page={nuvexaWhitepaper} kind="docs" />;
}
