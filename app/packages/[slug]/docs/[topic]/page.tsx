import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageGuide } from "@/components/package-guide";
import { documentedPackages, getPackageBySlug } from "@/content/packages";
import { docsBase, getGuideTopic, guideTopicSlugs } from "@/content/mvvmexpress-guide";
import { mvvmExpressSlug } from "@/content/mvvmexpress";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string; topic: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return documentedPackages.flatMap((item) =>
    item.slug === mvvmExpressSlug
      ? guideTopicSlugs().map((topic) => ({ slug: item.slug, topic }))
      : [],
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, topic: topicSlug } = await params;
  const pkg = getPackageBySlug(slug);
  const topic = getGuideTopic(topicSlug);
  if (!pkg?.guides || !topic) return {};

  const url = `${docsBase}/${topic.slug}/`;
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
  const topic = getGuideTopic(topicSlug);
  if (!pkg?.guides || pkg.slug !== mvvmExpressSlug || !topic || topic.slug === "introduction") {
    notFound();
  }

  return (
    <PackageGuide
      pkg={pkg}
      kind="docs"
      eyebrow="Documentation"
      title={topic.title}
      description={topic.description}
      sections={topic.sections}
      currentHref={`${docsBase}/${topic.slug}/`}
    />
  );
}
