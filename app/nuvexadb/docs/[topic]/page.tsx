import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NuvexaGuide } from "@/components/nuvexadb-guide";
import { getNuvexaDocTopic, nuvexaDocTopicSlugs } from "@/content/nuvexadb-guide";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ topic: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return nuvexaDocTopicSlugs().map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const page = getNuvexaDocTopic(topic);
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

export default async function NuvexaDocTopicPage({ params }: PageProps) {
  const { topic } = await params;
  const page = getNuvexaDocTopic(topic);
  if (!page) notFound();
  return <NuvexaGuide page={page} kind="docs" />;
}
