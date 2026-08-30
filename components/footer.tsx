import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-lavender-100 bg-lavender-50/50">
      <div className="container flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm font-semibold text-foreground">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Product portfolio for .NET MAUI NuGet packages. Built by{" "}
            <a
              href={siteConfig.authorUrl}
              className="focusable rounded-sm font-medium text-lavender-700 hover:text-lavender-900"
            >
              {siteConfig.author}
            </a>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/" className="focusable text-lavender-800 hover:text-lavender-950">
            Packages
          </Link>
          <Link href="/getting-started/" className="focusable text-lavender-800 hover:text-lavender-950">
            Getting started
          </Link>
          <a href={siteConfig.whitePapers} className="focusable text-lavender-800 hover:text-lavender-950">
            White papers
          </a>
          <a href={siteConfig.githubOrg} className="focusable text-lavender-800 hover:text-lavender-950">
            Organization
          </a>
        </div>
      </div>
    </footer>
  );
}
