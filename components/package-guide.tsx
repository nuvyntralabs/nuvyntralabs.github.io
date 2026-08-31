import Link from "next/link";
import { ArrowLeft, BookOpen, Puzzle } from "lucide-react";
import { DocsArticle } from "@/components/docs-article";
import { JsonLd } from "@/components/json-ld";
import { packageGuideJsonLd } from "@/lib/json-ld";
import type { PackageDoc } from "@/content/packages";
import type { DocSection } from "@/content/mvvmexpress";
import { cn } from "@/lib/utils";

export type GuideKind = "docs" | "integration";

export function PackageGuide({
  pkg,
  kind,
  eyebrow,
  title,
  description,
  sections,
}: {
  pkg: PackageDoc;
  kind: GuideKind;
  eyebrow: string;
  title: string;
  description: string;
  sections: DocSection[];
}) {
  const guides = pkg.guides;
  if (!guides) return null;

  return (
    <main>
      <JsonLd data={packageGuideJsonLd(pkg, kind, title, description)} />
      <section className="bg-gradient-ink text-white">
        <div className="container py-14 sm:py-16">
          <Link
            href={`/packages/${pkg.slug}/`}
            className="focusable inline-flex items-center gap-2 rounded-full text-sm font-medium text-lavender-100 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {pkg.title}
          </Link>
          <p className="eyebrow-on-dark mt-8">{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-lavender-100/80 sm:text-lg">{description}</p>
        </div>
      </section>

      <div className="container max-w-6xl py-12 sm:py-16">
        <GuideTabs slug={pkg.slug} active={kind} technical={guides.technical} integration={guides.integration} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-700">On this page</p>
            <ol className="mt-3 space-y-1.5">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="focusable block rounded-lg px-2 py-1 text-sm text-muted-foreground hover:bg-lavender-50 hover:text-lavender-900"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <DocsArticle sections={sections} />
        </div>
      </div>
    </main>
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
    { href: technical, id: "docs" as const, label: "Technical docs", icon: BookOpen },
    { href: integration, id: "integration" as const, label: "Integration", icon: Puzzle },
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
