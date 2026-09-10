import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolkitBySlug, toolkits } from "@/content/toolkits";
import { ToolkitDetail } from "@/components/toolkit-detail";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return toolkits.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const toolkit = getToolkitBySlug(slug);
  if (!toolkit) return {};

  const url = `${siteConfig.url}/toolkits/${toolkit.slug}/`;
  const title = `${toolkit.name} · ${siteConfig.shortName}`;

  return {
    title: toolkit.name,
    description: toolkit.description,
    keywords: [
      toolkit.name,
      toolkit.packageId ?? "Plugin.Maui.MauiDev.Cli",
      "MauiDev.Cli",
      "maui-dev",
      ...toolkit.tags,
      "Nuvyntra Labs",
    ],
    alternates: { canonical: `/toolkits/${toolkit.slug}/` },
    openGraph: {
      title,
      description: toolkit.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: toolkit.description,
    },
  };
}

export default async function ToolkitPage({ params }: PageProps) {
  const { slug } = await params;
  const toolkit = getToolkitBySlug(slug);
  if (!toolkit) notFound();

  return <ToolkitDetail toolkit={toolkit} />;
}
