import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { DotnetCatalog } from "@/components/dotnet-catalog";
import { JsonLd } from "@/components/json-ld";
import { NugetStats } from "@/components/nuget-stats";
import { PageHero } from "@/components/page-hero";
import { apiLens } from "@/content/apilens";
import { dotnetHref, dotnetLibraries, dotnetTrack } from "@/content/dotnet";
import { dotnetTrackJsonLd } from "@/lib/json-ld";
import { dotnetNugetGroup, dotnetNugetStatsAnchor, nugetStatsPath } from "@/lib/nuget-stats";
import { siteConfig } from "@/lib/site";

const libraryCount = dotnetLibraries.length;
const apiLensPackageIds = apiLens.packages.map((item) => item.id);

export const metadata: Metadata = {
  title: dotnetTrack.title,
  description: dotnetTrack.description,
  keywords: [".NET", "ASP.NET Core", "NETEssentials", "ApiLens", "Nuvyntra Labs"],
  alternates: { canonical: dotnetHref },
  openGraph: {
    title: `${dotnetTrack.title} · ${siteConfig.shortName}`,
    description: dotnetTrack.description,
    url: dotnetHref,
  },
};

export default function DotnetLibrariesPage() {
  return (
    <main>
      <JsonLd data={dotnetTrackJsonLd()} />
      <PageHero
        eyebrow="Products"
        title={dotnetTrack.title}
        description={`${libraryCount} ${libraryCount === 1 ? "library" : "libraries"} in the server catalog. Install the package that matches the requirement. ASP.NET Core diagnostics and OpenTelemetry stay in place.`}
      />
      <div className="container py-8 sm:py-10">
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Version-wise nuget.org downloads for {dotnetNugetGroup} are in the{" "}
          <a href={`#${dotnetNugetStatsAnchor}`} className="text-link">
            NuGet stats
          </a>{" "}
          below. The hub is{" "}
          <a href={dotnetTrack.hub} target="_blank" rel="noopener noreferrer" className="text-link">
            NETEssentials
          </a>
          .
        </p>
        <DotnetCatalog />
      </div>
      <section id={dotnetNugetStatsAnchor} className="section-muted scroll-mt-24">
        <div className="container py-8 sm:py-10">
          <NugetStats
            packageIds={apiLensPackageIds}
            heading={dotnetNugetGroup}
            description={
              <>
                Live downloads for the NET Essentials packages, including every listed version. The full
                owner catalog is on the{" "}
                <Link href={nugetStatsPath} className="text-link">
                  NuGet stats
                </Link>{" "}
                page.
              </>
            }
          />
        </div>
      </section>
      <CtaBand
        title="Need the library for a request?"
        description="ApiLens explains why an ASP.NET Core request was slow or failed. Open the overview, or read the documentation."
        links={[
          { href: "/dotnet/apilens/", label: "Open ApiLens" },
          { href: "/dotnet/apilens/docs/", label: "Read the docs" },
          { href: "/contact/", label: "Contact the lab", tone: "dark" },
        ]}
      />
    </main>
  );
}
