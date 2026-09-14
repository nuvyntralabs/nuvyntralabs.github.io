import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NuvexaGuide } from "@/components/nuvexadb-guide";
import { getNuvexaGuidePage, nuvexaIntegrationSlugs } from "@/content/nuvexadb-guide";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ platform: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return nuvexaIntegrationSlugs().map((platform) => ({ platform }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { platform } = await params;
  const page = getNuvexaGuidePage(platform);
  if (!page) return {};

  return {
    title: `${page.title} · NuvexaDB`,
    description: page.description,
    alternates: { canonical: page.href },
    openGraph: {
      title: `${page.title} · NuvexaDB · ${siteConfig.shortName}`,
      description: page.description,
      url: page.href,
    },
  };
}

export default async function NuvexaPlatformPage({ params }: PageProps) {
  const { platform } = await params;
  const page = getNuvexaGuidePage(platform);
  if (!page) notFound();
  return <NuvexaGuide page={page} kind="integration" />;
}
