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
  const description = `Install 0.6.0-preview, call UseMvvmExpress(o => o.UseShell().UseDialogs()), and wire ${pkg.name} ViewModels, commands, navigation, dialogs, forms, generators, and MauiEssentials adapters.`;

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
      description="From NuGet install to a testable ViewModel: UseShell / UseDialogs, AsyncState, commands, AuthApp, forms, generators, Reactive, pagination, auth/offline adapters, and the sample map."
      sections={integrationSections}
      currentHref={integrationHref}
    />
  );
}
