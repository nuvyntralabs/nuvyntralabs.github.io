import type { Metadata } from "next";
import { Catalog } from "@/components/catalog";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { nugetPackages, packages } from "@/content/packages";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Nuvyntra Labs product catalog: location, connectivity, offline sync, security, VoIP, and observability plugins for .NET MAUI.",
  alternates: { canonical: "/packages/" },
  openGraph: {
    title: "Nuvyntra Labs NuGet catalog",
    description:
      "Focused .NET MAUI plugins for location, connectivity, offline sync, security, VoIP, and observability.",
    url: "/packages/",
  },
};

export default function PackagesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Products"
        title="NuGet catalog"
        description={`${nugetPackages.length} packages on nuget.org, ${packages.length} entries in the catalog including MauiEssentials. Each plugin versions independently — there is no mega-package dependency.`}
      />
      <div className="container py-16 sm:py-20">
        <Catalog />
      </div>
      <CtaBand
        title="Need help choosing a plugin?"
        description="Start with the getting-started guide, or contact the lab if you want a recommended set for a field or enterprise app."
      />
    </main>
  );
}
