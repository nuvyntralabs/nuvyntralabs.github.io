import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageGuide } from "@/components/package-guide";
import { documentedPackages, getPackageBySlug } from "@/content/packages";
import { mvvmExpressSlug, technicalSections } from "@/content/mvvmexpress";
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
  if (!pkg?.guides) return {};

  const title = `${pkg.title} technical documentation`;
  const description = `Architecture, package graph, core subsystems, navigation, memory contract, and comparison for ${pkg.name}.`;

  return {
    title,
    description,
    alternates: { canonical: pkg.guides.technical },
    openGraph: {
      title: `${title} · ${siteConfig.shortName}`,
      description,
      url: pkg.guides.technical,
    },
  };
}

export default async function PackageTechnicalDocsPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg?.guides || pkg.slug !== mvvmExpressSlug) notFound();

  return (
    <PackageGuide
      pkg={pkg}
      kind="docs"
      eyebrow="Technical documentation"
      title={`${pkg.title} internals`}
      description="How MVVMExpress is layered: Core without MAUI, optional host packages, the operation pipeline, typed Shell navigation, leak/scale contract, and what is deliberately not copied from CommunityToolkit.Mvvm, Prism.Maui, or ReactiveUI."
      sections={technicalSections}
    />
  );
}
