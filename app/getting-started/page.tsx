import type { Metadata } from "next";
import Link from "next/link";
import { nugetPackages } from "@/content/packages";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { GithubPackagesSetupLink } from "@/components/github-packages-setup";
import { TwoStarts } from "@/components/two-starts";
import { githubPackagesSetupPath } from "@/lib/github-packages";

export const metadata: Metadata = {
  title: "Getting started",
  description:
    "Start Nuvyntra Labs as a component library (one NuGet) or as a whole ecosystem (nuvyn init). Neither path is a fallback.",
  alternates: { canonical: "/getting-started/" },
  openGraph: {
    title: "Getting started with Nuvyntra Labs",
    description:
      "Choose a start: one component in an existing app, or nuvyn init for a new MAUI host on the Nuvyntra stack.",
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
        description="Nuvyntra Labs reaches you as a component library (one NuGet) or as a whole ecosystem (nuvyn init). You choose. Neither path is a fallback. Packages ship independently — there is no mega-package dependency."
      />
      <div className="container max-w-3xl py-16 sm:py-20">
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold">1. Choose a start</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Existing apps can stay on the component path, or attach the slash chain with{" "}
            <code className="code-inline">nuvyn adopt</code> (workflow files only — no host rewrite).{" "}
            <code className="code-inline">nuvyn update</code> refreshes skills only — do not re-run{" "}
            <code className="code-inline">nuvyn init</code> on a tree that already exists. The{" "}
            <Link href="/whitepaper/" className="text-link">
              ecosystem white paper
            </Link>{" "}
            maps how UIKit, MVVMExpress, HttpForge, and the gallery compose after you pick a door.
          </p>
          <TwoStarts className="mt-6 grid gap-4" />
        </section>
        <aside className="callout mb-12 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Looking for the embedded database?</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            NuvexaDB is a separate product — one .nvx file, NQL, and native SDKs. Start at the{" "}
            <Link href="/nuvexadb/" className="text-link">
              NuvexaDB
            </Link>{" "}
            tab or the{" "}
            <Link href="/nuvexadb/integration/" className="text-link">
              platform integration guides
            </Link>
            . For Room-style MAUI CRUD that can host NuvexaDB or SQLite, use{" "}
            <Link href="/packages/plugin-maui-local-store/" className="text-link">
              Plugin.Maui.LocalStore
            </Link>
            . For Lumina NV* screens, start at the{" "}
            <Link href="/uikit/" className="text-link">
              UIKit(MAUI)
            </Link>{" "}
            tab.
          </p>
        </aside>
        <section>
          <h2 className="font-display text-2xl font-semibold">2. Create or open a MAUI app</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Whole ecosystem:{" "}
            <Link href="/toolkits/nuvyn/" className="text-link">
              <code className="code-inline">nuvyn init</code>
            </Link>{" "}
            for a new Nuvyntra host plus the spec slash chain, or{" "}
            <code className="code-inline">nuvyn adopt</code> to attach that chain to an existing MAUI
            app. Component library: use the stock MAUI
            template, or scaffold an MVVMExpress host with ViewModels, login replace-root, a list, a
            form, and tests already wired. Same MVVMExpress scaffold from the{" "}
            <Link
              href="/packages/plugin-maui-mvvmexpress/docs/ide-extensions/"
              className="text-link"
            >
              VS Code and Visual Studio extensions
            </Link>{" "}
            — install the <strong>MVVMExpress</strong> Marketplace listings.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
            <code>{`dotnet tool install -g NuvyntraLabs.Nuvyn.Cli --source https://api.nuget.org/v3/index.json
nuvyn init FieldApp --agent cursor
nuvyn adopt --agent cursor

dotnet new maui -n FieldApp

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
          <h2 className="font-display text-2xl font-semibold">3. Add the GitHub Packages feed</h2>
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
          <h2 className="font-display text-2xl font-semibold">4. Add a component</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            After the two feeds are configured, restore from GitHub Packages. Registration helpers
            live in each repository README.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
            <code>{`dotnet add package Plugin.Maui.GeoLocator
dotnet add package Plugin.Maui.NetworkMonitor
dotnet add package Plugin.Maui.LocalStore
dotnet add package Plugin.Maui.JobQueue
dotnet add package Plugin.Maui.MVVMExpress.Core`}</code>
          </pre>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">5. Start with a focused plugin</h2>
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
          <h2 className="font-display text-2xl font-semibold">6. Application shell</h2>
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
          <h2 className="font-display text-2xl font-semibold">7. Upgrade hardened 1.x plugins</h2>
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
          <h2 className="font-display text-2xl font-semibold">8. Diagnose the machine and project</h2>
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
            Do not add it as a PackageReference. On an interactive terminal, 1.2.2 asks every 4 hours
            whether to update from nuget.org — skip with{" "}
            <code className="code-inline">--no-update-check</code>,{" "}
            <code className="code-inline">NUVYNTRA_NO_UPDATE_CHECK=1</code>, or any{" "}
            <code className="code-inline">--ci</code> / JSON / SARIF run.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
            <code>{`dotnet tool install -g Plugin.Maui.MauiDev.Cli --source https://api.nuget.org/v3/index.json
maui-dev doctor
maui-dev permissions --fix --dry-run
maui-dev publish --validate
maui-dev analyze --ci`}</code>
          </pre>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">9. Watch a live plugin session</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Install{" "}
            <Link href="/toolkits/maui-pulse/" className="text-link">
              Pulse
            </Link>{" "}
            when you want a nine-lane view of allow-listed Plugin.Maui.* events. Add{" "}
            <code className="code-inline">Plugin.Maui.Pulse</code> and{" "}
            <code className="code-inline">builder.UseMauiPulse()</code> in the app, then run{" "}
            <code className="code-inline">maui-pulse attach</code> on the development machine. Do not add the
            CLI as a PackageReference. Pulse does not scrape logcat, Firebase, or Sentry.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
            <code>{`dotnet tool install -g Plugin.Maui.Pulse.Cli --source https://api.nuget.org/v3/index.json
dotnet add package Plugin.Maui.Pulse
adb reverse tcp:7878 tcp:7878
maui-pulse attach --package com.myapp.android --android --port 7878`}</code>
          </pre>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">10. Localize sibling .resx files</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Install{" "}
            <Link href="/toolkits/nuvloc/" className="text-link">
              NuvLoc
            </Link>{" "}
            when the host already has an English sibling <code className="code-inline">.resx</code>{" "}
            (MAUI, WPF, WinUI, Avalonia, or Uno) and a language list. Put{" "}
            <code className="code-inline">i18n.json</code> at the project root, then{" "}
            <code className="code-inline">nuvloc init --configfile i18n.json --agent cursor</code>.
            The coding agent translates via <code className="code-inline">/nuvloc.translate</code>.
            There is no <code className="code-inline">nuvloc translate</code> CLI command and no
            vendor API key. CI is <code className="code-inline">nuvloc check --ci</code>. WinUI /
            Uno PRI <code className="code-inline">.resw</code> folders are out of scope. Coverage
            proves completeness, not correctness — review with a native speaker before you ship.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
            <code>{`dotnet tool install -g NuvyntraLabs.NuvLoc.Cli --source https://api.nuget.org/v3/index.json
nuvloc init --configfile i18n.json --agent cursor
nuvloc status --configfile i18n.json
nuvloc check --configfile i18n.json --ci`}</code>
          </pre>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">11. Browse the full catalog</h2>
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
