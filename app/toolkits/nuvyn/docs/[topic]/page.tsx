import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NuvynGuide } from "@/components/nuvyn-guide";
import { getNuvynDocTopic, nuvynDocTopicSlugs } from "@/content/nuvyn-guide";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ topic: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return nuvynDocTopicSlugs().map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const page = getNuvynDocTopic(topic);
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

export default async function NuvynDocTopicPage({ params }: PageProps) {
  const { topic } = await params;
  const page = getNuvynDocTopic(topic);
  if (!page) notFound();
  return <NuvynGuide page={page} kind="docs" />;
}
