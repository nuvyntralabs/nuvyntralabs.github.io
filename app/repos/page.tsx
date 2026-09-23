import type { Metadata } from "next";
import { ArrowUpRight, GitBranch, MessageSquareText } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { OpenRepos } from "@/components/open-repos";
import { PageHero } from "@/components/page-hero";
import { openReposJsonLd } from "@/lib/json-ld";
import { githubOrgLogin, openRepoSources, openReposPath } from "@/lib/open-repos";

export const metadata: Metadata = {
  title: "Open issues and discussions",
  description:
    "Every public Nuvyntra Labs GitHub repository, with live open issues and open discussions.",
  alternates: { canonical: openReposPath },
  openGraph: {
    title: "Nuvyntra Labs open issues and discussions",
    description:
      "Public nuvyntralabs repositories that currently have open GitHub issues or discussions.",
    url: openReposPath,
  },
};

const officialSources = [
  {
    href: openRepoSources.org,
    icon: GitBranch,
    title: "GitHub organization",
    body: "The public nuvyntralabs catalog — plugins, toolkits, R&D, and this website repo.",
    cta: "Open organization",
  },
  {
    href: openRepoSources.issuesSearch,
    icon: MessageSquareText,
    title: "Open issues",
    body: "GitHub search for every open issue across the organization. This page reads that same query live.",
    cta: "Search issues",
  },
  {
    href: openRepoSources.discussionsSearch,
    icon: MessageSquareText,
    title: "Open discussions",
    body: "GitHub search for open discussions. Expand a repo here to load that repo's open threads.",
    cta: "Search discussions",
  },
] as const;

export default function OpenReposPage() {
  return (
    <main>
      <JsonLd data={openReposJsonLd()} />
      <PageHero
        eyebrow={`github.com/${githubOrgLogin}`}
        title="Open issues and discussions"
        description="The live public catalog from github.com/nuvyntralabs. Every new public repo appears here automatically. Open issues and discussions rise to the top. Each row links to GitHub and, when we have docs, to the page on this site."
      />

      <section className="border-b border-border bg-card">
        <div className="container py-8 sm:py-10">
          <h2 className="font-display text-2xl font-semibold text-foreground">Where the list comes from</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The organization page is the catalog. GitHub search is the live issue list. Discussions
            are fetched per repository because GitHub does not expose a public org-wide discussions
            search API without authentication.
          </p>
          <ul className="mt-8 grid gap-4 lg:grid-cols-3">
            {officialSources.map((source) => {
              const Icon = source.icon;
              return (
                <li key={source.href} className="glass-card flex h-full flex-col p-6">
                  <span className="icon-well h-10 w-10 rounded-xl">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{source.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{source.body}</p>
                  <a
                    href={source.href}
                    className="focusable btn-secondary mt-5 self-start"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.cta}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section-muted">
        <div className="container py-16 sm:py-20">
          <OpenRepos />
        </div>
      </section>

      <CtaBand
        title="Found a thread that should be ours?"
        description="Open an issue or start a discussion on the component repo — not this website repo. Comments on package and research pages already land there."
      />
    </main>
  );
}
