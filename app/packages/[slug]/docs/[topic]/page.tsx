import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageGuide } from "@/components/package-guide";
import { documentedPackages, getPackageBySlug } from "@/content/packages";
import { docsBase, getGuideTopic, guideTopicSlugs } from "@/content/mvvmexpress-guide";
import { mauiMvvmExpressSlug, wpfMvvmExpressSlug } from "@/content/mvvmexpress-family";
import { getWpfGuideTopic, wpfDocsBase, wpfGuideTopicSlugs } from "@/content/wpf-mvvmexpress-guide";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string; topic: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return documentedPackages.flatMap((item) => {
    if (item.slug === mauiMvvmExpressSlug) {
      return guideTopicSlugs().map((topic) => ({ slug: item.slug, topic }));
    }
    if (item.slug === wpfMvvmExpressSlug) {
      return wpfGuideTopicSlugs().map((topic) => ({ slug: item.slug, topic }));
    }
    return [];
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, topic: topicSlug } = await params;
  const pkg = getPackageBySlug(slug);
  const topic = slug === wpfMvvmExpressSlug ? getWpfGuideTopic(topicSlug) : getGuideTopic(topicSlug);
  if (!pkg?.guides || !topic) return {};

  const base = slug === wpfMvvmExpressSlug ? wpfDocsBase : docsBase;
  const url = `${base}/${topic.slug}/`;
  const title = `${topic.title} · ${pkg.title}`;

  return {
    title,
    description: topic.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${siteConfig.shortName}`,
      description: topic.description,
      url,
    },
  };
}

export default async function PackageDocTopicPage({ params }: PageProps) {
  const { slug, topic: topicSlug } = await params;
  const pkg = getPackageBySlug(slug);
  const topic = slug === wpfMvvmExpressSlug ? getWpfGuideTopic(topicSlug) : getGuideTopic(topicSlug);
  const bookSlug = slug === wpfMvvmExpressSlug || slug === mauiMvvmExpressSlug;
  if (!pkg?.guides || !bookSlug || !topic || topic.slug === "introduction") {
    notFound();
  }

  const base = slug === wpfMvvmExpressSlug ? wpfDocsBase : docsBase;
  return (
    <PackageGuide
      pkg={pkg}
      kind="docs"
      eyebrow="Documentation"
      title={topic.title}
      description={topic.description}
      sections={topic.sections}
      currentHref={`${base}/${topic.slug}/`}
    />
  );
}
