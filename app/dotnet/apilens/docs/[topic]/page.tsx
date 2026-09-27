import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiLensGuide } from "@/components/apilens-guide";
import { apiLensDocTopicSlugs, getApiLensDocTopic } from "@/content/apilens-guide";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ topic: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return apiLensDocTopicSlugs().map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const page = getApiLensDocTopic(topic);
  if (!page) return {};

  return {
    title: `${page.title} · ApiLens`,
    description: page.description,
    alternates: { canonical: page.href },
    openGraph: {
      title: `${page.title} · ApiLens · ${siteConfig.shortName}`,
      description: page.description,
      url: page.href,
    },
  };
}

export default async function ApiLensDocTopicPage({ params }: PageProps) {
  const { topic } = await params;
  const page = getApiLensDocTopic(topic);
  if (!page) notFound();
  return <ApiLensGuide page={page} />;
}
