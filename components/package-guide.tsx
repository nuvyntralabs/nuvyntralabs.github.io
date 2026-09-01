import Link from "next/link";
import { BookOpen, Puzzle } from "lucide-react";
import { DocsArticle } from "@/components/docs-article";
import { DocsSidebar } from "@/components/docs-sidebar";
import { JsonLd } from "@/components/json-ld";
import { packageGuideJsonLd } from "@/lib/json-ld";
import type { PackageDoc } from "@/content/packages";
import type { DocSection } from "@/content/mvvmexpress";
import { adjacentGuidePages, docsBase, guideNav, integrationHref } from "@/content/mvvmexpress-guide";
import { mvvmExpressSlug } from "@/content/mvvmexpress";
import { cn } from "@/lib/utils";

export type GuideKind = "docs" | "integration";

export function PackageGuide({
  pkg,
  kind,
  title,
  description,
  sections,
  currentHref,
}: {
  pkg: PackageDoc;
  kind: GuideKind;
  eyebrow?: string;
  title: string;
  description: string;
  sections: DocSection[];
  currentHref?: string;
}) {
  const guides = pkg.guides;
  if (!guides) return null;
  const book = pkg.slug === mvvmExpressSlug;
  const href = currentHref ?? (kind === "docs" ? `${docsBase}/` : integrationHref);

  if (!book) {
    return (
      <main>
        <JsonLd data={packageGuideJsonLd(pkg, kind, title, description, href)} />
        <div className="container max-w-6xl py-12 sm:py-16">
          <GuideTabs slug={pkg.slug} active={kind} technical={guides.technical} integration={guides.integration} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
            <OnThisPage sections={sections} />
            <DocsArticle sections={sections} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <JsonLd data={packageGuideJsonLd(pkg, kind, title, description, href)} />
      <div className="container max-w-7xl py-8 sm:py-10">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_180px]">
          <DocsSidebar groups={guideNav} currentHref={href} />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender-700">
              {kind === "docs" ? "Documentation" : "Getting started"}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
            <div className="mt-8">
              <DocsArticle sections={sections} />
            </div>
            <GuidePager currentHref={href} />
          </div>
          <div className="hidden xl:block">
            <OnThisPage sections={sections} />
          </div>
        </div>
      </div>
    </main>
  );
}

function GuidePager({ currentHref }: { currentHref: string }) {
  const { previous, next } = adjacentGuidePages(currentHref);
  if (!previous && !next) return null;

  return (
    <nav aria-label="Adjacent topics" className="mt-12 grid gap-3 border-t border-lavender-100 pt-8 sm:grid-cols-2">
      {previous ? (
        <Link href={previous.href} className="focusable rounded-xl border border-lavender-100 p-4 hover:bg-lavender-50">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender-700">Previous</p>
          <p className="mt-1 font-semibold text-foreground">{previous.title}</p>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="focusable rounded-xl border border-lavender-100 p-4 text-right hover:bg-lavender-50 sm:justify-self-end"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender-700">Next</p>
          <p className="mt-1 font-semibold text-foreground">{next.title}</p>
        </Link>
      ) : null}
    </nav>
  );
}

function OnThisPage({ sections }: { sections: DocSection[] }) {
  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-20 lg:self-start">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender-700">On this page</p>
      <ol className="mt-3 space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="focusable block py-1 text-sm text-muted-foreground hover:text-lavender-900"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function GuideTabs({
  slug,
  active,
  technical,
  integration,
}: {
  slug: string;
  active: "overview" | GuideKind;
  technical: string;
  integration: string;
}) {
  const tabs = [
    { href: `/packages/${slug}/`, id: "overview" as const, label: "Overview", icon: null },
    { href: technical, id: "docs" as const, label: "Documentation", icon: BookOpen },
    { href: integration, id: "integration" as const, label: "Getting started", icon: Puzzle },
  ];

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Package documentation">
      {tabs.map((tab) => {
        const selected = tab.id === active;
        const Icon = tab.icon;
        return (
          <Link
            key={tab.id}
            href={tab.href}
            role="tab"
            aria-selected={selected}
            className={cn(
              "focusable inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
              selected
                ? "bg-gradient-primary text-white shadow-glow"
                : "border border-lavender-200 bg-white text-lavender-800 hover:bg-lavender-50",
            )}
          >
            {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
