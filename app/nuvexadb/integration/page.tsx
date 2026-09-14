import type { Metadata } from "next";
import { NuvexaGuide } from "@/components/nuvexadb-guide";
import { nuvexaIntegrationIndex } from "@/content/nuvexadb-guide";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "NuvexaDB platform integration",
  description: nuvexaIntegrationIndex.description,
  alternates: { canonical: nuvexaIntegrationIndex.href },
  openGraph: {
    title: `NuvexaDB platform integration · ${siteConfig.shortName}`,
    description: nuvexaIntegrationIndex.description,
    url: nuvexaIntegrationIndex.href,
  },
};

export default function NuvexaIntegrationPage() {
  return <NuvexaGuide page={nuvexaIntegrationIndex} kind="integration" />;
}
