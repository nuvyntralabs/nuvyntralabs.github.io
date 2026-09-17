import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NuvynGuide } from "@/components/nuvyn-guide";
import { getNuvynUserGuideTopic, nuvynUserGuideTopicSlugs } from "@/content/nuvyn-guide";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ topic: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return nuvynUserGuideTopicSlugs().map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const page = getNuvynUserGuideTopic(topic);
  if (!page) return {};

  return {
    title: `${page.title} · Nuvyn`,
    description: page.description,
    alternates: { canonical: page.href },
    openGraph: {
      title: `${page.title} · Nuvyn · ${siteConfig.shortName}`,
      description: page.description,
      url: page.href,
    },
  };
}

export default async function NuvynGuideTopicPage({ params }: PageProps) {
  const { topic } = await params;
  const page = getNuvynUserGuideTopic(topic);
  if (!page) notFound();
  return <NuvynGuide page={page} kind="guide" />;
}
