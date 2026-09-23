import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { DocsArticle } from "@/components/docs-article";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { whitepaper, whitepaperHref, whitepaperPillars, whitepaperSections } from "@/content/ecosystem-whitepaper";
import { ecosystemWhitepaperJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "White paper",
  description: whitepaper.description,
  keywords: [
    "Nuvyntra Labs",
    ".NET MAUI",
    "development ecosystem",
    "UIKit",
    "MVVMExpress",
    "HttpForge",
    "white paper",
  ],
  alternates: { canonical: whitepaperHref },
  openGraph: {
    title: `${whitepaper.title} · ${siteConfig.shortName}`,
    description: whitepaper.description,
    url: whitepaperHref,
  },
};

export default function WhitepaperPage() {
  return (
    <main>
      <JsonLd data={ecosystemWhitepaperJsonLd()} />
      <PageHero eyebrow="White paper" title={whitepaper.title} description={whitepaper.subtitle} />

      <div className="container py-8 sm:py-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
          <nav aria-label="Paper sections" className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-700 dark:text-lavender-300">
              Contents
            </p>
            <ol className="mt-4 space-y-2 border-l border-border">
              {whitepaperSections
                .filter((section) => /^\d+\./.test(section.title) && !section.id.startsWith("gallery-"))
                .map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="focusable block py-1 pl-3 text-sm leading-snug text-muted-foreground transition hover:text-foreground"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
            </ol>
          </nav>

          <div className="min-w-0">
            <dl className="overflow-hidden rounded-2xl border border-border text-sm">
              <MetaRow term="Product" definition="Nuvyntra Labs MAUI ecosystem" />
              <MetaRow term="Version" definition={whitepaper.version} />
              <MetaRow term="Author" definition={whitepaper.author} />
              <MetaRow term="Date" definition={whitepaper.date} />
              <MetaRow term="License" definition={whitepaper.license} />
            </dl>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {whitepaperPillars.map((pillar) => (
                <li key={pillar.href}>
                  <Link
                    href={pillar.href}
                    className="glass-card focusable flex h-full flex-col p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">
                      {pillar.role}
                    </p>
                    <h2 className="mt-2 font-display text-lg font-semibold text-foreground">{pillar.name}</h2>
                    <p className="mt-1 text-xs font-semibold text-lavender-800 dark:text-lavender-200">
                      {pillar.product} · {pillar.version}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <DocsArticle sections={whitepaperSections} />
            </div>
          </div>
        </div>
      </div>

      <CtaBand
        eyebrow="Next step"
        title="Compose a set, or evaluate a pillar"
        description="Start from the getting-started guide, open a pillar page, or browse the full gallery."
      />
    </main>
  );
}

function MetaRow({ term, definition }: { term: string; definition: string }) {
  return (
    <div className="grid grid-cols-[8rem_minmax(0,1fr)] border-t border-border first:border-t-0">
      <dt className="bg-muted px-3 py-2.5 font-semibold text-foreground">{term}</dt>
      <dd className="px-3 py-2.5 text-muted-foreground">{definition}</dd>
    </div>
  );
}
