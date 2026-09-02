import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import {
  hardenedPlugins,
  hardenedReleaseDate,
  hardenedTestCount,
} from "@/content/hardened-releases";

export const metadata: Metadata = {
  title: "Hardened plugin releases",
  description:
    "Upgrade map for the 14 MauiEssentials NuGet packages that shipped fail-closed defaults and correctness fixes on 3 September 2026.",
  alternates: { canonical: "/getting-started/hardening/" },
  openGraph: {
    title: "Hardened plugin releases · Nuvyntra Labs",
    description:
      "Fourteen .NET MAUI plugins shipped hardened 1.x NuGet versions. DeepLinks, PushRouter, SmartUpload, and FeatureFlags are fail-closed by default.",
    url: "/getting-started/hardening/",
  },
};

export default function HardeningPage() {
  return (
    <main>
      <PageHero
        eyebrow="Documentation"
        title="Hardened plugin releases"
        description={`${hardenedReleaseDate}. ${hardenedPlugins.length} NuGet packages, ${hardenedTestCount} passing tests. Public type names did not change. Several defaults did.`}
      />
      <div className="container max-w-3xl py-16 sm:py-20">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Plugin READMEs remain the code-level source of truth. This page is the upgrade map for
          host apps already on 1.x. Hub write-up:{" "}
          <a
            href="https://github.com/nuvyntralabs/MauiEssentials/blob/main/docs/hardened-releases.md"
            className="font-medium text-lavender-700 hover:text-lavender-900"
          >
            docs/hardened-releases.md
          </a>
          .
        </p>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Shipped versions</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-lavender-100">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-lavender-50 text-lavender-900">
                <tr>
                  <th className="px-3 py-2.5 font-semibold">Package</th>
                  <th className="px-3 py-2.5 font-semibold">Version</th>
                  <th className="px-3 py-2.5 font-semibold">Tests</th>
                  <th className="px-3 py-2.5 font-semibold">Kind</th>
                </tr>
              </thead>
              <tbody>
                {hardenedPlugins.map((item) => (
                  <tr key={item.slug} className="border-t border-lavender-100 align-top">
                    <td className="px-3 py-2.5 font-medium text-foreground">
                      <Link
                        href={`/packages/${item.slug}/`}
                        className="text-lavender-800 hover:text-lavender-900"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-3 py-2.5 text-muted-foreground">{item.version}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{item.tests}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{item.kind}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Breaking defaults</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Hosts that relied on “empty means allow everything” or cleartext HTTP must opt back in.
          </p>
          <ul className="mt-4 space-y-4">
            {hardenedPlugins
              .filter((item) => item.kind === "Breaking default" || item.kind === "Default change")
              .map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/packages/${item.slug}/`}
                    className="font-semibold text-foreground hover:text-lavender-800"
                  >
                    {item.name} {item.version}
                  </Link>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                </li>
              ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Suggested upgrade order</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>DeepLinks and PushRouter — inbound URI / push navigation can stop if allowlists are empty.</li>
            <li>SmartUpload and FeatureFlags — cleartext http:// endpoints fail closed.</li>
            <li>ApiResilience — confirm the encrypted queue still drains after the first run.</li>
            <li>FileVault — switch UI stats to GetStatisticsAsync.</li>
            <li>SecureSession / DeviceSession — opt into the stricter flags if the threat model needs them.</li>
            <li>AppLock, BackgroundTasks, OfflineSync, Observability — take the behavior fixes; no host config required.</li>
            <li>NetworkMonitor, AppUpdate — bump for metadata / packaging only.</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Install</h2>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-lavender-950 p-4 text-sm text-lavender-50">
            <code>{`dotnet add package Plugin.Maui.DeepLinks --version 1.0.6
dotnet add package Plugin.Maui.PushRouter --version 1.0.6
dotnet add package Plugin.Maui.SmartUpload --version 1.0.6
dotnet add package Plugin.Maui.FeatureFlags --version 1.0.7
dotnet add package Plugin.Maui.ApiResilience --version 1.0.8`}</code>
          </pre>
        </section>

        <p className="mt-10 text-sm text-muted-foreground">
          Back to{" "}
          <Link href="/getting-started/" className="font-medium text-lavender-700 hover:text-lavender-900">
            getting started
          </Link>{" "}
          or the{" "}
          <Link href="/packages/" className="font-medium text-lavender-700 hover:text-lavender-900">
            package catalog
          </Link>
          .
        </p>
      </div>
      <CtaBand />
    </main>
  );
}
