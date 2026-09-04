import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageGuide } from "@/components/package-guide";
import { documentedPackages, getPackageBySlug } from "@/content/packages";
import { getPackageGuidePage } from "@/content/package-guides";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return documentedPackages.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  const guide = getPackageGuidePage(slug, "comparison");
  if (!pkg?.guides?.comparison || !guide) return {};

  return {
    title: `${pkg.title} comparison`,
    description: guide.description,
    alternates: { canonical: pkg.guides.comparison },
    openGraph: {
      title: `${pkg.title} comparison · ${siteConfig.shortName}`,
      description: guide.description,
      url: pkg.guides.comparison,
    },
  };
}

export default async function PackageComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  const guide = getPackageGuidePage(slug, "comparison");
  if (!pkg?.guides?.comparison || !guide) notFound();

  return (
    <PackageGuide
      pkg={pkg}
      kind="comparison"
      eyebrow="Comparison"
      title={guide.title}
      description={guide.description}
      sections={guide.sections}
      currentHref={guide.currentHref}
    />
  );
}
