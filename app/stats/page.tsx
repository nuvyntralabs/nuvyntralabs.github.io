import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { NugetStats } from "@/components/nuget-stats";
import { PageHero } from "@/components/page-hero";
import { nugetStatsJsonLd } from "@/lib/json-ld";
import { nugetOwnerId, nugetStatsPath } from "@/lib/nuget-stats";

export const metadata: Metadata = {
  title: "NuGet download statistics",
  description:
    "Live nuget.org published-package downloads for every released Nuvyntra Labs package, broken down by version.",
  alternates: { canonical: nugetStatsPath },
  openGraph: {
    title: "Nuvyntra Labs NuGet download statistics",
    description:
      "The nuget.org published-packages list: package ID, downloads, latest version, and version-wise counts.",
    url: nugetStatsPath,
  },
};

export default function NugetStatsPage() {
  return (
    <main>
      <JsonLd data={nugetStatsJsonLd()} />
      <PageHero
        eyebrow="nuget.org"
        title="NuGet download statistics"
        description={`Published packages for nuget.org owner ${nugetOwnerId}. The table matches the owner dashboard — package ID, downloads, and latest version — and expands to every listed version.`}
      />

      <section className="section-muted">
        <div className="container py-16 sm:py-20">
          <NugetStats />
        </div>
      </section>

      <CtaBand
        title="Want the package, not the count?"
        description="Open the catalog for install commands and docs. These numbers are nuget.org gallery stats, not GitHub Packages."
      />
    </main>
  );
}
