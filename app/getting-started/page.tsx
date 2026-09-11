import type { Metadata } from "next";
import Link from "next/link";
import { nugetPackages } from "@/content/packages";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { GithubPackagesSetupLink } from "@/components/github-packages-setup";
import { githubPackagesSetupPath } from "@/lib/github-packages";

export const metadata: Metadata = {
  title: "Getting started",
  description:
    "Add the nuvyntralabs GitHub Packages feed, then install focused .NET MAUI Plugin.Maui.* packages.",
  alternates: { canonical: "/getting-started/" },
  openGraph: {
    title: "Getting started with Nuvyntra Labs packages",
    description:
      "Configure the GitHub Packages feed, then install focused .NET MAUI Plugin.Maui.* packages.",
    url: "/getting-started/",
  },
};

export default function GettingStartedPage() {
  const featured = nugetPackages.slice(0, 4);

  return (
    <main>
      <PageHero
        eyebrow="Documentation"
        title="Getting started"
        description="Packages ship independently from GitHub Packages. Add only the plugins your app needs — there is no mega-package dependency. Most plugins target .NET MAUI on Android and iOS. MVVMExpress, HttpForge, and LeakAnalyser also target Mac Catalyst and Windows."
      />
      <div className="container max-w-3xl py-16 sm:py-20">
        <section>
          <h2 className="font-display text-2xl font-semibold">1. Create or open a MAUI app</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Use the stock MAUI template, or scaffold an MVVMExpress host with ViewModels, login
            replace-root, a list, a form, and tests already wired. Same scaffold from the{" "}
            <Link
              href="/packages/plugin-maui-mvvmexpress/docs/ide-extensions/"
              className="text-link"
            >
              VS Code and Visual Studio extensions
            </Link>{" "}
            — install the <strong>MVVMExpress</strong> Marketplace listings.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
            <code>{`dotnet new maui -n FieldApp

dotnet new install Plugin.Maui.MVVMExpress.Templates
dotnet new mvvmexpress -n MyApp`}</code>
          </pre>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Match the MAUI workload on the machine to an official tag. The live feed — sourced from{" "}
            <a
              href="https://github.com/dotnet/maui/releases"
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/dotnet/maui/releases
            </a>
            {" "}
            — is on the{" "}
            <Link href="/releases/" className="text-link">
              .NET MAUI release feed
            </Link>
            .
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">2. Add the GitHub Packages feed</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <code className="code-inline">Plugin.Maui.*</code>{" "}
            comes from GitHub Packages. Everything else (Microsoft.*, MAUI, and other public
            packages) comes from nuget.org. GitHub Packages requires a token even when the packages
            are public. Full steps:{" "}
            <GithubPackagesSetupLink />.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Create a classic PAT with <strong>read:packages</strong> only. Add a repo{" "}
            <code className="code-inline">nuget.config</code>{" "}
            that maps <code className="code-inline">Plugin.Maui.*</code>{" "}
            to the org feed. Store the token in the user-level NuGet config — never in the repo.
          </p>
          <p className="mt-3">
            <Link
              href={githubPackagesSetupPath}
              className="focusable btn-secondary"
            >
              GitHub Packages setup
            </Link>
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">3. Add a package</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            After the two feeds are configured, restore from GitHub Packages. Registration helpers
            live in each repository README.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
            <code>{`dotnet add package Plugin.Maui.GeoLocator
dotnet add package Plugin.Maui.NetworkMonitor
dotnet add package Plugin.Maui.JobQueue
dotnet add package Plugin.Maui.MVVMExpress.Core`}</code>
          </pre>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">4. Start with a focused plugin</h2>
          <ul className="mt-4 grid gap-3">
            {featured.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/packages/${item.slug}/`}
                  className="glass-card focusable flex flex-col p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span>
                    <span className="font-semibold text-foreground">{item.name}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{item.subtitle}</span>
                  </span>
                  <span className="mt-2 text-sm font-medium text-lavender-700 sm:mt-0">Docs →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">5. Application shell</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            For ViewModels, async state, Shell or page navigation, dialogs, and toast, start with{" "}
            <Link
              href="/packages/plugin-maui-mvvmexpress/"
              className="text-link"
            >
              MVVMExpress for MAUI
            </Link>
            {" "}
            1.3.0. Scaffold with{" "}
            <Link
              href="/packages/plugin-maui-mvvmexpress/docs/templates/"
              className="text-link"
            >
              dotnet new mvvmexpress
            </Link>{" "}
            or the{" "}
            <Link
              href="/packages/plugin-maui-mvvmexpress/docs/ide-extensions/"
              className="text-link"
            >
              IDE extensions
            </Link>
            . It hosts a single window on Android, iOS, Mac Catalyst, and Windows. Desktop hosts use
            the independent{" "}
            <Link
              href="/packages/plugin-wpf-mvvmexpress/"
              className="text-link"
            >
              WPF
            </Link>
            ,{" "}
            <Link
              href="/packages/plugin-avalonia-mvvmexpress/"
              className="text-link"
            >
              Avalonia
            </Link>
            ,{" "}
            <Link
              href="/packages/plugin-uno-mvvmexpress/"
              className="text-link"
            >
              Uno
            </Link>
            , and{" "}
            <Link
              href="/packages/plugin-winui-mvvmexpress/"
              className="text-link"
            >
              WinUI 3
            </Link>
            {" "}
            families (
            <code className="code-inline">dotnet new wpf-mvvmexpress</code>
            ,{" "}
            <code className="code-inline">avalonia-mvvmexpress</code>
            ,{" "}
            <code className="code-inline">uno-mvvmexpress</code>
            ,{" "}
            <code className="code-inline">winui-mvvmexpress</code>
            ). Technical internals and a step-by-step integration guide live next to each package.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">6. Upgrade hardened 1.x plugins</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Fourteen plugins shipped fail-closed and correctness fixes on 3 September 2026.
            DeepLinks, PushRouter, SmartUpload, and FeatureFlags changed defaults. Read the{" "}
            <Link
              href="/getting-started/hardening/"
              className="text-link"
            >
              hardened release upgrade map
            </Link>{" "}
            before bumping.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">7. Diagnose the machine and project</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Install the{" "}
            <Link href="/toolkits/maui-dev/" className="text-link">
              MauiDev
            </Link>{" "}
            global tool, then run <code className="code-inline">maui-dev doctor</code>.
            It checks SDK, workloads, Android SDK, JDK, Xcode, TFMs, permissions, duplicate resources, store
            identity, and leftover Xamarin / net8 TFMs.
            The VS Code / Cursor extension{" "}
            <code className="code-inline">nuvyntralabs.maui-dev</code>{" "}
            shells out to the same CLI. The package ID is{" "}
            <code className="code-inline">Plugin.Maui.MauiDev.Cli</code>
            {" "}
            — nuget.org reserved <code className="code-inline">MauiDev.Cli</code>.
            Do not add it as a PackageReference.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
            <code>{`dotnet tool install -g Plugin.Maui.MauiDev.Cli
maui-dev doctor
maui-dev permissions --fix --dry-run
maui-dev publish --validate
maui-dev analyze --ci`}</code>
          </pre>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">8. Browse the full catalog</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The suite map is{" "}
            <Link href="/packages/maui-essentials/" className="text-link">
              MauiEssentials
            </Link>
            . R&D projects and POCs that informed these plugins live in their own sections on this
            site.
          </p>
        </section>
      </div>
      <CtaBand />
    </main>
  );
}
