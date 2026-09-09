import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Package } from "lucide-react";
import { getPackageBySlug, getRelatedPackages, packages } from "@/content/packages";
import {
  packageFamily,
  relatedAdapters,
  visualStudioMarketplaceSearch,
  vscodeMarketplaceSearch,
} from "@/content/mvvmexpress";
import { mauiMvvmExpressSlug, wpfMvvmExpressSlug, isMvvmExpressSlug } from "@/content/mvvmexpress-family";
import {
  wpfComposeWith,
  wpfPackageFamily,
  wpfVisualStudioMarketplaceSearch,
  wpfVscodeMarketplaceSearch,
} from "@/content/wpf-mvvmexpress";
import { ComponentDiscussion } from "@/components/component-discussion";
import { MvvmExpressPlatformTabs } from "@/components/mvvmexpress-platform-tabs";
import { JsonLd } from "@/components/json-ld";
import { packageJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";
import { GuideTabs } from "@/components/package-guide";
import { installCommands } from "@/lib/utils";
import { githubPackagesPageUrl, githubPackagesSetupPath, packageGithubPackagesUrl } from "@/lib/github-packages";

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
    keywords: [pkg.name, ...pkg.tags, "Nuvyntra Labs", pkg.category === "wpf-plugin" ? "WPF" : ".NET MAUI", "NuGet"],
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
  const githubPackages = packageGithubPackagesUrl(pkg);
  const isMvvm = isMvvmExpressSlug(pkg.slug);
  const isMauiMvvm = pkg.slug === mauiMvvmExpressSlug;
  const isWpfMvvm = pkg.slug === wpfMvvmExpressSlug;

  return (
    <main className="container max-w-3xl py-12 sm:py-16">
      <JsonLd data={packageJsonLd(pkg)} />
      {isMvvm ? <MvvmExpressPlatformTabs slug={pkg.slug} /> : null}
      {!isMvvm ? (
        <Link
          href="/packages/"
          className="focusable inline-flex items-center gap-2 rounded-full text-sm font-medium text-lavender-700 hover:text-lavender-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All packages
        </Link>
      ) : null}

      <p className={isMvvm ? "eyebrow mt-8" : "eyebrow mt-8"}>{pkg.group}</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">{pkg.title}</h1>
      <p className="mt-3 text-lg text-lavender-700">{pkg.subtitle}</p>
      {pkg.prerelease ? (
        <p className="mt-4 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
          Public preview — APIs may change
        </p>
      ) : null}
      {pkg.version ? (
        <p className="mt-4 inline-flex rounded-full bg-lavender-50 px-3 py-1 text-xs font-semibold text-lavender-900">
          Current NuGet {pkg.version}
        </p>
      ) : null}
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{pkg.description}</p>
      {isMauiMvvm ? (
        <aside className="mt-6 rounded-2xl border border-lavender-200 bg-lavender-50 px-4 py-3">
          <p className="text-sm font-semibold text-lavender-900">1.3.0 — Phases 8–10 on the 1.0 SemVer lock</p>
          <p className="mt-1 text-sm leading-relaxed text-lavender-800">
            Scaffold with <code>dotnet new mvvmexpress</code>, or install the{" "}
            <strong>MVVMExpress</strong> listings on the Visual Studio Code and Visual Studio Marketplaces.
            One registration path, analyzers, modules, modal stack, and sibling host adapters are
            shipped. The SemVer lock stays 1.0.0: public 1.x APIs stay source-compatible. Breaking
            changes wait for 2.0.0.
          </p>
        </aside>
      ) : null}
      {isWpfMvvm ? (
        <aside className="mt-6 rounded-2xl border border-lavender-200 bg-lavender-50 px-4 py-3">
          <p className="text-sm font-semibold text-lavender-900">1.0.0 — first stable WPF family</p>
          <p className="mt-1 text-sm leading-relaxed text-lavender-800">
            Scaffold with <code>dotnet new wpf-mvvmexpress</code>, or install the{" "}
            <strong>WPF MVVMExpress</strong> listings on the Visual Studio Code and Visual Studio Marketplaces.
            Frame navigation, dialogs, validation, pagination, and IDE wrappers are shipped. This is
            not Plugin.Maui.MVVMExpress — there is no PackageReference between the families. Public
            APIs stay source-compatible in 1.x. Breaking changes wait for 2.0.0.
          </p>
        </aside>
      ) : null}

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
        {githubPackages ? (
          <a
            href={githubPackages}
            target="_blank"
            rel="noopener noreferrer"
            className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-4 py-2 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
          >
            <Package className="h-4 w-4" aria-hidden="true" />
            GitHub Packages
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
        {pkg.nuget ? (
          <a
            href={pkg.nuget}
            target="_blank"
            rel="noopener noreferrer"
            className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-4 py-2 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
          >
            <Package className="h-4 w-4" aria-hidden="true" />
            nuget.org
          </a>
        ) : null}
        {isMauiMvvm ? (
          <>
            <a
              href={githubPackagesPageUrl(
                "https://github.com/nuvyntralabs/Plugin.Maui.MVVMExpress",
                "Plugin.Maui.MVVMExpress.Templates",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-4 py-2 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
            >
              <Package className="h-4 w-4" aria-hidden="true" />
              Templates · GitHub Packages
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href="https://www.nuget.org/packages/Plugin.Maui.MVVMExpress.Templates"
              target="_blank"
              rel="noopener noreferrer"
              className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-4 py-2 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
            >
              <Package className="h-4 w-4" aria-hidden="true" />
              Templates · nuget.org
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={vscodeMarketplaceSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-4 py-2 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
            >
              VS Code
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={visualStudioMarketplaceSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-4 py-2 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
            >
              Visual Studio
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/nuvyntralabs/Plugin.Maui.MVVMExpress/tree/main/samples/Playground"
              target="_blank"
              rel="noopener noreferrer"
              className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-4 py-2 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Playground sample
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </>
        ) : null}
        {isWpfMvvm ? (
          <>
            <a
              href={githubPackagesPageUrl(
                "https://github.com/nuvyntralabs/Plugin.Wpf.MVVMExpress",
                "Plugin.Wpf.MVVMExpress.Templates",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-4 py-2 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
            >
              <Package className="h-4 w-4" aria-hidden="true" />
              Templates · GitHub Packages
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href="https://www.nuget.org/packages/Plugin.Wpf.MVVMExpress.Templates"
              target="_blank"
              rel="noopener noreferrer"
              className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-4 py-2 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
            >
              <Package className="h-4 w-4" aria-hidden="true" />
              Templates · nuget.org
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={wpfVscodeMarketplaceSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-4 py-2 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
            >
              VS Code
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={wpfVisualStudioMarketplaceSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-4 py-2 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
            >
              Visual Studio
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/nuvyntralabs/Plugin.Wpf.MVVMExpress/tree/main/samples/Playground"
              target="_blank"
              rel="noopener noreferrer"
              className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-4 py-2 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Playground sample
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </>
        ) : null}
      </div>

      {pkg.guides ? (
        <div className="mt-10">
          <GuideTabs
            slug={pkg.slug}
            active="overview"
            technical={pkg.guides.technical}
            integration={pkg.guides.integration}
            comparison={pkg.guides.comparison}
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
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {isWpfMvvm ? (
              <>
                <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">Plugin.Wpf.*</code>{" "}
                restores from nuget.org. CI also publishes GitHub Packages — see{" "}
                <Link href={githubPackagesSetupPath} className="font-medium text-lavender-700 hover:text-lavender-900">
                  Use nuvyntralabs GitHub Packages from a C# project
                </Link>
                .
              </>
            ) : (
              <>
                <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">Plugin.Maui.*</code>{" "}
                restores from GitHub Packages. Add the org feed first — see{" "}
                <Link href={githubPackagesSetupPath} className="font-medium text-lavender-700 hover:text-lavender-900">
                  Use nuvyntralabs GitHub Packages from a C# project
                </Link>
                .
              </>
            )}
          </p>
          {isMauiMvvm ? (
            <>
              <p className="mt-6 text-sm font-semibold text-foreground">Or scaffold an app</p>
              <pre className="mt-3 overflow-x-auto rounded-2xl bg-lavender-950 p-4 text-sm text-lavender-50">
                <code>{`dotnet new install Plugin.Maui.MVVMExpress.Templates
dotnet new mvvmexpress -n MyApp`}</code>
              </pre>
              <p className="mt-3 text-sm text-muted-foreground">
                Adds MainPage + MainPageViewModel, login replace-root, a list, a form, and tests.
                Then{" "}
                <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">
                  dotnet new mvvmexpress-page -n Catalog --namespace MyApp
                </code>
                . Same commands from the{" "}
                <Link
                  href="/packages/plugin-maui-mvvmexpress/docs/ide-extensions/"
                  className="font-medium text-lavender-700 hover:text-lavender-900"
                >
                  VS Code and Visual Studio extensions
                </Link>
                .
              </p>
            </>
          ) : null}
          {isWpfMvvm ? (
            <>
              <p className="mt-6 text-sm font-semibold text-foreground">Or scaffold an app</p>
              <pre className="mt-3 overflow-x-auto rounded-2xl bg-lavender-950 p-4 text-sm text-lavender-50">
                <code>{`dotnet new install Plugin.Wpf.MVVMExpress.Templates
dotnet new wpf-mvvmexpress -n MyApp`}</code>
              </pre>
              <p className="mt-3 text-sm text-muted-foreground">
                Adds MainWindow with a Frame named NavigationHost, login replace-root, a list, a
                form, and tests. Then{" "}
                <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">
                  dotnet new wpf-mvvmexpress-page -n Catalog --namespace MyApp
                </code>
                . Same commands from the{" "}
                <Link
                  href="/packages/plugin-wpf-mvvmexpress/docs/ide-extensions/"
                  className="font-medium text-lavender-700 hover:text-lavender-900"
                >
                  VS Code and Visual Studio extensions
                </Link>
                .
              </p>
            </>
          ) : null}
        </section>
      ) : (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Catalog</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            MauiEssentials is the suite index. Clone it with submodules to browse every plugin in one
            workspace; apps still reference individual NuGet packages. Fourteen plugins shipped
            hardened 1.x releases on 3 September 2026 — see the{" "}
            <Link
              href="/getting-started/hardening/"
              className="font-medium text-lavender-700 hover:text-lavender-900"
            >
              upgrade map
            </Link>
            .
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

      {pkg.releaseNotes?.length ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Current release</h2>
          <ul className="mt-4 space-y-3">
            {pkg.releaseNotes.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-500" />
                {item}
              </li>
            ))}
          </ul>
          {!isMvvm ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Full upgrade map for the 3 September 2026 hardening wave:{" "}
              <Link
                href="/getting-started/hardening/"
                className="font-medium text-lavender-700 hover:text-lavender-900"
              >
                Hardened plugin releases
              </Link>
              .
            </p>
          ) : null}
        </section>
      ) : null}

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
                  {pkg.guides.technicalSummary ??
                    "ViewModels, commands, DI, messaging, NavigationPage or Shell, chat host, forms, generators, operation pipeline, and the shipped roadmap."}
                </p>
              </Link>
            </li>
            <li>
              <Link href={pkg.guides.integration} className="glass-card focusable block h-full p-5 hover:shadow-glow">
                <p className="font-semibold text-foreground">Getting started</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pkg.guides.integrationSummary ??
                    "dotnet new mvvmexpress, install 1.3.0, first screen, UseNavigationPage vs UseShell, Playground clone, FakeNavigator / LeakProbe, forms, generators, and adapters."}
                </p>
              </Link>
            </li>
            {pkg.guides.comparison ? (
              <li>
                <Link href={pkg.guides.comparison} className="glass-card focusable block h-full p-5 hover:shadow-glow">
                  <p className="font-semibold text-foreground">Comparison</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pkg.guides.comparisonSummary ??
                      "Surfaces, syntax map ([Notify] vs [ObservableProperty], INavigator vs INavigationService), trade-offs, and when to choose each."}
                  </p>
                </Link>
              </li>
            ) : null}
            {isMauiMvvm ? (
              <>
                <li>
                  <Link
                    href="/packages/plugin-maui-mvvmexpress/docs/ide-extensions/"
                    className="glass-card focusable block h-full p-5 hover:shadow-glow"
                  >
                    <p className="font-semibold text-foreground">IDE extensions</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Install the MVVMExpress listings on the Visual Studio Code and Visual Studio Marketplaces.
                      Thin wrappers that install the template pack and run dotnet new.
                    </p>
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/nuvyntralabs/Plugin.Maui.MVVMExpress/tree/main/samples/Playground"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card focusable block h-full p-5 hover:shadow-glow"
                  >
                    <p className="font-semibold text-foreground">Playground sample</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Cloneable 15-minute path in the product repo — command, navigation, dialog,
                      form, auth, and list. Not a separate SampleApp repository.
                    </p>
                  </a>
                </li>
              </>
            ) : null}
            {isWpfMvvm ? (
              <>
                <li>
                  <Link
                    href="/packages/plugin-wpf-mvvmexpress/docs/ide-extensions/"
                    className="glass-card focusable block h-full p-5 hover:shadow-glow"
                  >
                    <p className="font-semibold text-foreground">IDE extensions</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Install the WPF MVVMExpress listings on the Visual Studio Code and Visual
                      Studio Marketplaces. Thin wrappers that install the template pack and run
                      dotnet new.
                    </p>
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/nuvyntralabs/Plugin.Wpf.MVVMExpress/tree/main/samples/Playground"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card focusable block h-full p-5 hover:shadow-glow"
                  >
                    <p className="font-semibold text-foreground">Playground sample</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Cloneable 15-minute path in the product repo — command, Frame navigation,
                      dialog, form, auth, list, and a second window. Not a separate SampleApp
                      repository.
                    </p>
                  </a>
                </li>
              </>
            ) : null}
          </ul>
        </section>
      ) : null}

      {isMauiMvvm || isWpfMvvm ? (
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
                {(isWpfMvvm ? wpfPackageFamily : packageFamily).map((item) => (
                  <tr key={item.name} className="border-t border-lavender-100 align-top">
                    <td className="px-3 py-2.5 font-medium text-foreground">
                      <span className="flex flex-col gap-1.5">
                        <span>{item.name}</span>
                        {item.nuget ? (
                          <span className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold">
                            <a
                              href={githubPackagesPageUrl(pkg.github, item.name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-lavender-800 hover:text-lavender-900"
                            >
                              GitHub Packages
                            </a>
                            <a
                              href={item.nuget}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-lavender-800 hover:text-lavender-900"
                            >
                              nuget.org
                            </a>
                          </span>
                        ) : null}
                      </span>
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
            {isWpfMvvm
              ? wpfComposeWith.map((item) => (
                  <li key={item.name}>
                    {item.slug ? (
                      <Link href={`/packages/${item.slug}/`} className="glass-card focusable block p-4 hover:shadow-glow">
                        <span className="font-semibold text-foreground">{item.name}</span>
                        <span className="mt-1 block text-sm text-muted-foreground">{item.why}</span>
                      </Link>
                    ) : (
                      <a
                        href={"href" in item ? item.href : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card focusable block p-4 hover:shadow-glow"
                      >
                        <span className="font-semibold text-foreground">{item.name}</span>
                        <span className="mt-1 block text-sm text-muted-foreground">{item.why}</span>
                      </a>
                    )}
                  </li>
                ))
              : relatedAdapters.map((item) => (
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

      <ComponentDiscussion target={{ title: pkg.name, github: pkg.github }} />

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
