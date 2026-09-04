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
  const guide = getPackageGuidePage(slug, "docs");
  if (!pkg?.guides || !guide) return {};

  return {
    title: `${pkg.title} documentation`,
    description: guide.description,
    alternates: { canonical: pkg.guides.technical },
    openGraph: {
      title: `${pkg.title} documentation · ${siteConfig.shortName}`,
      description: guide.description,
      url: pkg.guides.technical,
    },
  };
}

export default async function PackageTechnicalDocsPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  const guide = getPackageGuidePage(slug, "docs");
  if (!pkg?.guides || !guide) notFound();

  return (
    <PackageGuide
      pkg={pkg}
      kind="docs"
      eyebrow="Documentation"
      title={guide.title}
      description={guide.description}
      sections={guide.sections}
      currentHref={guide.currentHref}
    />
  );
}
