import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NuvexaMqGuide } from "@/components/nuvexamq-guide";
import { getNuvexaMqDocTopic, nuvexaMqDocTopicSlugs } from "@/content/nuvexamq-guide";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ topic: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return nuvexaMqDocTopicSlugs().map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const page = getNuvexaMqDocTopic(topic);
  if (!page) return {};

  return {
    title: `${page.title} · NuvexaMQ`,
    description: page.description,
    alternates: { canonical: page.href },
    openGraph: {
      title: `${page.title} · NuvexaMQ · ${siteConfig.shortName}`,
      description: page.description,
      url: page.href,
    },
  };
}

export default async function NuvexaMqDocTopicPage({ params }: PageProps) {
  const { topic } = await params;
  const page = getNuvexaMqDocTopic(topic);
  if (!page) notFound();
  return <NuvexaMqGuide page={page} />;
}
