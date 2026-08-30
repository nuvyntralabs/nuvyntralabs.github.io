import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { lab } from "@/content/lab";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nuvyntra Labs is an independent applied R&D company for mobile infrastructure, founded by Niladri Prasad Padhy.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="Company"
        title="An independent lab that ships infrastructure"
        description={lab.tagline}
      />

      <section className="container max-w-3xl py-16 sm:py-20">
        <h2 className="font-display text-2xl font-semibold">Who we are</h2>
        <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
          {lab.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{lab.audience}</p>
      </section>

      <section className="bg-lavender-50/60">
        <div className="container py-16 sm:py-20">
          <h2 className="font-display text-2xl font-semibold">How the company works</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {lab.principles.map((principle, index) => (
              <li key={principle.title} className="glass-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{principle.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container py-16 sm:py-20">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass-card p-8">
            <p className="eyebrow">Founder</p>
            <h2 className="mt-4 font-display text-2xl font-semibold">{siteConfig.author}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Nuvyntra Labs is founded and maintained by {siteConfig.author}. Professional experience
              and client work live on the personal site. Research, prototypes, and packages live here.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={siteConfig.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focusable btn-secondary"
              >
                Personal site
              </a>
              <a
                href={siteConfig.authorGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="focusable btn-secondary"
              >
                GitHub
              </a>
              <a
                href={siteConfig.githubSponsors}
                target="_blank"
                rel="noopener noreferrer"
                className="focusable btn-secondary"
              >
                GitHub Sponsors
              </a>
              <a
                href={siteConfig.buyMeACoffee}
                target="_blank"
                rel="noopener noreferrer"
                className="focusable btn-secondary"
              >
                Buy Me a Coffee
              </a>
            </div>
          </div>
          <div className="glass-card p-8">
            <p className="eyebrow">Open source</p>
            <h2 className="mt-4 font-display text-2xl font-semibold">Public by default</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Work is published under the{" "}
              <a href={siteConfig.githubOrg} className="font-medium text-lavender-700 hover:text-lavender-900">
                {siteConfig.name} GitHub organization
              </a>
              . Packages version independently on nuget.org. There is no mega-package dependency.
            </p>
            <Link href="/getting-started/" className="focusable btn-secondary mt-6">
              Getting started
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Work with us"
        title="Evaluate a plugin, or start a conversation"
        description="The catalog is public. If you want to compose a set of plugins or discuss research, contact the lab."
      />
    </main>
  );
}
