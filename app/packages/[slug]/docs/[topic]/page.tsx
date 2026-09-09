import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageGuide } from "@/components/package-guide";
import { documentedPackages, getPackageBySlug } from "@/content/packages";
import {
  desktopGuideTopicSlugs,
  getDesktopGuideTopic,
  getDesktopMvvmFamily,
} from "@/content/desktop-mvvmexpress";
import { docsBase, getGuideTopic, guideTopicSlugs } from "@/content/mvvmexpress-guide";
import { isMauiMvvmExpressSlug, mauiMvvmExpressSlug, wpfMvvmExpressSlug } from "@/content/mvvmexpress-family";
import { getWpfGuideTopic, wpfDocsBase, wpfGuideTopicSlugs } from "@/content/wpf-mvvmexpress-guide";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string; topic: string }>;
}

export const dynamicParams = false;

function resolveTopic(slug: string, topicSlug: string) {
  if (slug === wpfMvvmExpressSlug) return getWpfGuideTopic(topicSlug);
  const desktop = getDesktopGuideTopic(slug, topicSlug);
  if (desktop) return desktop;
  return getGuideTopic(topicSlug);
}

function resolveDocsBase(slug: string) {
  if (slug === wpfMvvmExpressSlug) return wpfDocsBase;
  const desktop = getDesktopMvvmFamily(slug);
  if (desktop) return desktop.docsBase;
  return docsBase;
}

export function generateStaticParams() {
  return documentedPackages.flatMap((item) => {
    if (item.slug === mauiMvvmExpressSlug) {
      return guideTopicSlugs().map((topic) => ({ slug: item.slug, topic }));
    }
    if (item.slug === wpfMvvmExpressSlug) {
      return wpfGuideTopicSlugs().map((topic) => ({ slug: item.slug, topic }));
    }
    return desktopGuideTopicSlugs(item.slug).map((topic) => ({ slug: item.slug, topic }));
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, topic: topicSlug } = await params;
  const pkg = getPackageBySlug(slug);
  const topic = resolveTopic(slug, topicSlug);
  if (!pkg?.guides || !topic) return {};

  const base = resolveDocsBase(slug);
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
  const topic = resolveTopic(slug, topicSlug);
  const bookSlug = isMauiMvvmExpressSlug(slug) || slug === wpfMvvmExpressSlug || Boolean(getDesktopMvvmFamily(slug));
  if (!pkg?.guides || !bookSlug || !topic || topic.slug === "introduction") {
    notFound();
  }

  const base = resolveDocsBase(slug);
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
