import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageGuide } from "@/components/package-guide";
import { documentedPackages, getPackageBySlug } from "@/content/packages";
import { comparisonHref, comparisonSections } from "@/content/mvvmexpress-comparison";
import { mvvmExpressSlug } from "@/content/mvvmexpress";
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
  if (!pkg?.guides?.comparison) return {};

  const title = `${pkg.title} comparison`;
  const description = `Compare ${pkg.name} with CommunityToolkit.Mvvm, Prism.Maui, and ReactiveUI — navigation, auth, forms, testing, and when to choose each.`;

  return {
    title,
    description,
    alternates: { canonical: pkg.guides.comparison },
    openGraph: {
      title: `${title} · ${siteConfig.shortName}`,
      description,
      url: pkg.guides.comparison,
    },
  };
}

export default async function PackageComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg?.guides?.comparison || pkg.slug !== mvvmExpressSlug) notFound();

  return (
    <PackageGuide
      pkg={pkg}
      kind="comparison"
      eyebrow="Comparison"
      title={`${pkg.title} vs CommunityToolkit, Prism, and ReactiveUI`}
      description="An architectural comparison of shipped surfaces. Scores are not BenchmarkDotNet or device RSS. Choose the stack that matches the app — CommunityToolkit for a small ViewModel layer, Prism for URI navigation without Shell, ReactiveUI for Rx-first apps, or MVVMExpress for one application shell."
      sections={comparisonSections}
      currentHref={comparisonHref}
    />
  );
}
