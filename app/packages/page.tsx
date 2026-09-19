import type { Metadata } from "next";
import { Catalog } from "@/components/catalog";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { nugetPackages, packages } from "@/content/packages";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Nuvyntra Labs component library: location, connectivity, offline sync, security, TLS pin, video, VoIP, and observability plugins for .NET MAUI. Install one package — Nuvyn is optional.",
  alternates: { canonical: "/packages/" },
  openGraph: {
    title: "Nuvyntra Labs component library",
    description:
      "Focused .NET MAUI plugins. Use one NuGet in any host, or start a new app with Nuvyn.",
    url: "/packages/",
  },
};

export default function PackagesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Products"
        title="Component library"
        description={`${nugetPackages.length} packages on GitHub Packages, ${packages.length} entries in the catalog including MauiEssentials. Install one NuGet in any host. The whole ecosystem (nuvyn init) is optional and uses these same packages.`}
      />
      <div className="container py-16 sm:py-20">
        <Catalog />
      </div>
      <CtaBand
        title="Need help choosing a plugin?"
        description="This catalog is the component-library door. For a new host on the full stack, use Nuvyn. Or contact the lab for a recommended set."
      />
    </main>
  );
}
