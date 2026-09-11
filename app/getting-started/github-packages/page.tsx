import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { GithubPackagesSetup } from "@/components/github-packages-setup";
import { PageHero } from "@/components/page-hero";
import { githubPackagesFeed, githubPackagesSetupPath } from "@/lib/github-packages";

export const metadata: Metadata = {
  title: "GitHub Packages",
  description:
    "Use nuvyntralabs GitHub Packages from a C# project. Plugin.Maui.* comes from the org feed; everything else comes from nuget.org.",
  alternates: { canonical: githubPackagesSetupPath },
  openGraph: {
    title: "Use nuvyntralabs GitHub Packages from a C# project",
    description:
      "Two feeds: Plugin.Maui.* from GitHub Packages, Microsoft.* and other public packages from nuget.org. A token is required even for public packages.",
    url: githubPackagesSetupPath,
  },
};

export default function GithubPackagesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Documentation"
        title="Use nuvyntralabs GitHub Packages from a C# project"
        description="Plugin.Maui.* is published on the nuvyntralabs GitHub Packages feed. nuget.org stays the source for Microsoft.*, MAUI, and other public packages."
      />
      <div className="container max-w-3xl py-16 sm:py-20">
        <GithubPackagesSetup />
        <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
          Org feed:{" "}
          <code className="code-inline break-all">
            {githubPackagesFeed}
          </code>
          . Browse a package page from the{" "}
          <Link href="/packages/" className="text-link">
            catalog
          </Link>{" "}
          or return to{" "}
          <Link href="/getting-started/" className="text-link">
            getting started
          </Link>
          .
        </p>
      </div>
      <CtaBand />
    </main>
  );
}
