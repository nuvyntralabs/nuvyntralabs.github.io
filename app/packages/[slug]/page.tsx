import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Package } from "lucide-react";
import { getPackageBySlug, getRelatedPackages, packages } from "@/content/packages";
import { packageFamily, relatedAdapters } from "@/content/mvvmexpress";
import { JsonLd } from "@/components/json-ld";
import { packageJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";
import { GuideTabs } from "@/components/package-guide";
import { installCommands } from "@/lib/utils";
import { mvvmExpressSlug } from "@/content/mvvmexpress";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return packages.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return {};

  const url = `${siteConfig.url}/packages/${pkg.slug}/`;
  const title = `${pkg.name} · ${siteConfig.shortName}`;

  return {
    title: pkg.name,
    description: pkg.description,
    keywords: [pkg.name, ...pkg.tags, "Nuvyntra Labs", ".NET MAUI", "NuGet"],
    alternates: { canonical: `/packages/${pkg.slug}/` },
    openGraph: {
      title,
      description: pkg.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: pkg.description,
    },
  };
}

export default async function PackagePage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const related = getRelatedPackages(pkg);
  const installNames = pkg.installPackages ?? (pkg.nuget ? [pkg.name] : []);
  const install = installNames.length ? installCommands(installNames, { prerelease: pkg.prerelease }) : null;

  return (
    <main className="container max-w-3xl py-12 sm:py-16">
      <JsonLd data={packageJsonLd(pkg)} />
      {pkg.slug !== mvvmExpressSlug ? (
        <Link
          href="/packages/"
          className="focusable inline-flex items-center gap-2 rounded-full text-sm font-medium text-lavender-700 hover:text-lavender-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All packages
        </Link>
      ) : null}

      <p className={pkg.slug === mvvmExpressSlug ? "eyebrow" : "eyebrow mt-8"}>{pkg.group}</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">{pkg.title}</h1>
      <p className="mt-3 text-lg text-lavender-700">{pkg.subtitle}</p>
      {pkg.prerelease ? (
        <p className="mt-4 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
          Public preview — APIs may change
        </p>
      ) : null}
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{pkg.description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={pkg.github}
          target="_blank"
          rel="noopener noreferrer"
          className="focusable inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-glow hover:brightness-110"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        {pkg.nuget ? (
          <a
            href={pkg.nuget}
            target="_blank"
            rel="noopener noreferrer"
            className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-4 py-2 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
          >
            <Package className="h-4 w-4" aria-hidden="true" />
            NuGet
          </a>
        ) : null}
      </div>

      {pkg.guides ? (
        <div className="mt-10">
          <GuideTabs
            slug={pkg.slug}
            active="overview"
            technical={pkg.guides.technical}
            integration={pkg.guides.integration}
          />
        </div>
      ) : null}

      {install ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Install</h2>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-lavender-950 p-4 text-sm text-lavender-50">
            <code>{install}</code>
          </pre>
          <p className="mt-3 text-sm text-muted-foreground">
            {pkg.prerelease ? "Preview packages need --prerelease. " : ""}
            Package ID{installNames.length > 1 ? "s" : ""}:{" "}
            {installNames.map((name) => (
              <code key={name} className="mr-1.5 rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">
                {name}
              </code>
            ))}
          </p>
        </section>
      ) : (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Catalog</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            MauiEssentials is the suite index. Clone it with submodules to browse every plugin in one
            workspace; apps still reference individual NuGet packages.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-lavender-950 p-4 text-sm text-lavender-50">
            <code>{`git clone --recurse-submodules ${pkg.github}.git`}</code>
          </pre>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Overview</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{pkg.abstract}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Capabilities</h2>
        <ul className="mt-4 space-y-3">
          {pkg.capabilities.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-500" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {pkg.guides ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Documentation</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            <li>
              <Link href={pkg.guides.technical} className="glass-card focusable block h-full p-5 hover:shadow-glow">
                <p className="font-semibold text-foreground">Documentation</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  ViewModels, commands, DI, messaging, NavigationPage or Shell, chat host, forms,
                  generators, operation pipeline, and the shipped roadmap.
                </p>
              </Link>
            </li>
            <li>
              <Link href={pkg.guides.integration} className="glass-card focusable block h-full p-5 hover:shadow-glow">
                <p className="font-semibold text-foreground">Getting started</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Install 1.0.0, UseNavigationPage / UseDialogs / UseAuth, first ViewModel,
                  commands, navigation, forms, generators, pagination, adapters, and tests.
                </p>
              </Link>
            </li>
          </ul>
        </section>
      ) : null}

      {pkg.slug === "plugin-maui-mvvmexpress" ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Package family</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-lavender-100">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-lavender-50 text-lavender-900">
                <tr>
                  <th className="px-3 py-2.5 font-semibold">Package</th>
                  <th className="px-3 py-2.5 font-semibold">Purpose</th>
                  <th className="px-3 py-2.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {packageFamily.map((item) => (
                  <tr key={item.name} className="border-t border-lavender-100 align-top">
                    <td className="px-3 py-2.5 font-medium text-foreground">
                      {item.nuget ? (
                        <a
                          href={item.nuget}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lavender-800 hover:text-lavender-900"
                        >
                          {item.name}
                        </a>
                      ) : (
                        item.name
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-muted-foreground">{item.purpose}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="mt-8 font-display text-lg font-semibold">Compose with</h3>
          <ul className="mt-3 grid gap-3">
            {relatedAdapters.map((item) => (
              <li key={item.slug}>
                <Link href={`/packages/${item.slug}/`} className="glass-card focusable block p-4 hover:shadow-glow">
                  <span className="font-semibold text-foreground">{item.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{item.why}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <ul className="mt-8 flex flex-wrap gap-2">
        {pkg.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-lavender-200 bg-lavender-50 px-3 py-1 text-xs font-medium text-lavender-800"
          >
            {tag}
          </li>
        ))}
      </ul>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold">Related in {pkg.group}</h2>
          <ul className="mt-4 grid gap-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/packages/${item.slug}/`}
                  className="glass-card focusable block p-4 hover:shadow-glow"
                >
                  <span className="font-semibold text-foreground">{item.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{item.subtitle}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
