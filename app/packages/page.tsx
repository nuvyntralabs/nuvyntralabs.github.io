import type { Metadata } from "next";
import { Catalog } from "@/components/catalog";
import { nugetPackages, packages } from "@/content/packages";

export const metadata: Metadata = {
  title: "NuGet packages",
  description:
    "Nuvyntra Labs .NET MAUI NuGet catalog: location, connectivity, offline sync, security, VoIP, and observability.",
  alternates: { canonical: "/packages/" },
};

export default function PackagesPage() {
  return (
    <main className="container py-16 sm:py-20">
      <p className="eyebrow">NuGet packages</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">Package catalog</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {nugetPackages.length} packages on nuget.org, {packages.length} entries in the catalog including
        MauiEssentials. Each plugin versions independently — there is no mega-package dependency.
      </p>
      <div className="mt-10">
        <Catalog />
      </div>
    </main>
  );
}
