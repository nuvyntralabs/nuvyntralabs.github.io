import Link from "next/link";
import { BookOpen, Compass } from "lucide-react";
import { ComponentDiscussion } from "@/components/component-discussion";
import { DocsArticle } from "@/components/docs-article";
import { DocsSidebar } from "@/components/docs-sidebar";
import { JsonLd } from "@/components/json-ld";
import { adjacentNuvynPages, nuvynGuideNav, type NuvynGuidePage } from "@/content/nuvyn-guide";
import { nuvyn, nuvynDocsBase, nuvynGuideBase, nuvynHref } from "@/content/nuvyn";
import { nuvynGuideJsonLd } from "@/lib/json-ld";
import { cn } from "@/lib/utils";

export function NuvynGuide({
  page,
  kind,
}: {
  page: NuvynGuidePage;
  kind: "docs" | "guide";
}) {
  const { previous, next } = adjacentNuvynPages(page.href);

  return (
    <main className="bg-background">
      <JsonLd data={nuvynGuideJsonLd(page.title, page.description, page.href, kind)} />
      <div className="container max-w-7xl py-8 sm:py-10">
        <NuvynGuideTabs active={kind} />
        <div className="mt-8 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_180px]">
          <DocsSidebar groups={nuvynGuideNav} currentHref={page.href} />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender-700 dark:text-lavender-300">
              {kind === "docs" ? "Technical documentation" : "User guide"}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">{page.title}</h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{page.description}</p>
            <div className="mt-8">
              <DocsArticle sections={page.sections} />
            </div>
            <nav aria-label="Adjacent topics" className="mt-12 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
              {previous ? (
                <Link href={previous.slug} className="focusable rounded-xl border border-border p-4 hover:bg-muted">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender-700 dark:text-lavender-300">
                    Previous
                  </p>
                  <p className="mt-1 font-semibold text-foreground">{previous.title}</p>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={next.slug}
                  className="focusable rounded-xl border border-border p-4 text-right hover:bg-muted sm:justify-self-end"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender-700 dark:text-lavender-300">
                    Next
                  </p>
                  <p className="mt-1 font-semibold text-foreground">{next.title}</p>
                </Link>
              ) : null}
            </nav>
            <ComponentDiscussion target={{ title: nuvyn.name, github: nuvyn.github }} />
          </div>
          <div className="hidden xl:block">
            <OnThisPage sections={page.sections} />
          </div>
        </div>
      </div>
    </main>
  );
}

export function NuvynGuideTabs({ active }: { active: "overview" | "docs" | "guide" }) {
  const tabs = [
    { href: nuvynHref, id: "overview" as const, label: "Overview", icon: null },
    { href: `${nuvynDocsBase}/`, id: "docs" as const, label: "Technical docs", icon: BookOpen },
    { href: `${nuvynGuideBase}/`, id: "guide" as const, label: "User guide", icon: Compass },
  ];

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Nuvyn documentation">
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
              selected ? "bg-gradient-primary text-white shadow-glow" : "filter-idle",
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

function OnThisPage({ sections }: { sections: NuvynGuidePage["sections"] }) {
  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-20 lg:self-start">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender-700 dark:text-lavender-300">
        On this page
      </p>
      <ol className="mt-3 space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="focusable block py-1 text-sm text-muted-foreground hover:text-foreground">
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
