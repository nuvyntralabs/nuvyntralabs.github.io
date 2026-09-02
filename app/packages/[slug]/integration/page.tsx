import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageGuide } from "@/components/package-guide";
import { documentedPackages, getPackageBySlug } from "@/content/packages";
import { integrationSections, mvvmExpressSlug } from "@/content/mvvmexpress";
import { integrationHref } from "@/content/mvvmexpress-guide";
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

  const title = `${pkg.title} getting started`;
  const description = `Install 1.0.0 (SemVer lock — breaking changes wait for 2.0.0), clone Playground, and wire ${pkg.name} with UseNavigationPage or UseShell, first screen, FakeNavigator, and LeakProbe.`;

  return {
    title,
    description,
    alternates: { canonical: pkg.guides.integration },
    openGraph: {
      title: `${title} · ${siteConfig.shortName}`,
      description,
      url: pkg.guides.integration,
    },
  };
}

export default async function PackageIntegrationPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg?.guides || pkg.slug !== mvvmExpressSlug) notFound();

  return (
    <PackageGuide
      pkg={pkg}
      kind="integration"
      eyebrow="Getting started"
      title={`Get started with ${pkg.title}`}
      description="From NuGet install to a testable ViewModel: 1.0.0 SemVer lock, first screen, UseNavigationPage vs UseShell, Playground clone, FakeNavigator / LeakProbe, forms, generators, and the in-repo sample map."
      sections={integrationSections}
      currentHref={integrationHref}
    />
  );
}
