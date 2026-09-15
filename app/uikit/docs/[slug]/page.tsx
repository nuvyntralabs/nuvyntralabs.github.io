import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UiKitGuide } from "@/components/uikit-guide";
import { getUiKitGuidePage, uiKitDocSlugs } from "@/content/uikit-guide";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return uiKitDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getUiKitGuidePage(slug);
  if (!page) return {};

  return {
    title: `${page.title} · UIKit(MAUI)`,
    description: page.description,
    alternates: { canonical: page.href },
    openGraph: {
      title: `${page.title} · UIKit(MAUI) · ${siteConfig.shortName}`,
      description: page.description,
      url: page.href,
    },
  };
}

export default async function UiKitComponentDocPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getUiKitGuidePage(slug);
  if (!page || page.kind === "index") notFound();
  return <UiKitGuide page={page} />;
}
