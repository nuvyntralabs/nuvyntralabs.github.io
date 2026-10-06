import type { Metadata } from "next";
import { NuvexaMqGuide } from "@/components/nuvexamq-guide";
import { nuvexaMqReference } from "@/content/nuvexamq-guide";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "NuvexaMQ technical reference",
  description: nuvexaMqReference.description,
  alternates: { canonical: nuvexaMqReference.href },
  openGraph: {
    title: `NuvexaMQ technical reference · ${siteConfig.shortName}`,
    description: nuvexaMqReference.description,
    url: nuvexaMqReference.href,
  },
};

export default function NuvexaMqReferencePage() {
  return <NuvexaMqGuide page={nuvexaMqReference} />;
}
