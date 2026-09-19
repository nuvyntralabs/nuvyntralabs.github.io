import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Github, Package } from "lucide-react";
import { ComponentDiscussion } from "@/components/component-discussion";
import { JsonLd } from "@/components/json-ld";
import { NuvynGuideTabs } from "@/components/nuvyn-guide";
import { nuvyn, nuvynDocsBase, nuvynGuideBase, nuvynHref } from "@/content/nuvyn";
import { nuvynJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: nuvyn.name,
  description: nuvyn.description,
  keywords: [...nuvyn.tags, "Nuvyntra Labs", nuvyn.packageId, "spec-driven development"],
  alternates: { canonical: nuvynHref },
  openGraph: {
    title: `${nuvyn.name} · ${siteConfig.shortName}`,
    description: nuvyn.description,
    url: nuvynHref,
  },
};

export default function NuvynPage() {
  return (
    <main className="container max-w-3xl py-12 sm:py-16">
      <JsonLd data={nuvynJsonLd()} />
      <NuvynGuideTabs active="overview" />

      <p className="eyebrow mt-8">Spec-driven CLI</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">{nuvyn.title}</h1>
      <p className="mt-3 text-lg text-lavender-700 dark:text-lavender-300">{nuvyn.subtitle}</p>
      <p className="chip mt-4 inline-flex px-3 font-semibold">
        {nuvyn.packageId} · {nuvyn.version}
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{nuvyn.description}</p>

      <aside className="callout mt-6 px-4 py-3">
        <p className="text-sm font-semibold text-foreground">New projects only</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          <code className="code-inline">nuvyn init</code> always creates a new folder. There is no{" "}
          <code className="code-inline">--here</code> / <code className="code-inline">--force</code>. Diagnose an
          existing tree with{" "}
          <Link href="/toolkits/maui-dev/" className="text-link">
            maui-dev doctor
          </Link>
          . <code className="code-inline">nuvyn init</code> and{" "}
          <code className="code-inline">nuvyn check</code> compose that doctor when the tool is on PATH.
        </p>
      </aside>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={nuvyn.github}
          target="_blank"
          rel="noopener noreferrer"
          className="focusable inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-glow hover:brightness-110"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <a href={nuvyn.nuget} target="_blank" rel="noopener noreferrer" className="focusable btn-secondary">
          <Package className="h-4 w-4" aria-hidden="true" />
          nuget.org
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <Link href={`${nuvynDocsBase}/`} className="focusable btn-secondary">
          Technical docs
        </Link>
        <Link href={`${nuvynGuideBase}/`} className="focusable btn-secondary">
          User guide
        </Link>
      </div>

      <aside className="callout mt-6 px-4 py-3">
        <p className="text-sm font-semibold text-foreground">1.1.0 — maui-dev doctor compose + update check</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          <code className="code-inline">nuvyn init</code> and <code className="code-inline">nuvyn check</code> run{" "}
          <code className="code-inline">maui-dev doctor --path</code> when MauiDev is installed. They do not
          forward <code className="code-inline">--no-update-check</code>. On an interactive terminal the CLI asks
          every 4 hours whether to update from nuget.org. Skip with{" "}
          <code className="code-inline">--no-update-check</code> or{" "}
          <code className="code-inline">NUVYNTRA_NO_UPDATE_CHECK=1</code>.
        </p>
      </aside>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Install</h2>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
          <code>{nuvyn.install}</code>
        </pre>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{nuvyn.abstract}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Refresh skills</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          After you update the global CLI, refresh templates and slash files in an existing app. Host code,{" "}
          <code className="code-inline">specs/</code>, and <code className="code-inline">.nuvyn/constitution.md</code>{" "}
          stay as they are. PackageReference versions are not changed.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
          <code>{nuvyn.refresh}</code>
        </pre>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Step-by-step:{" "}
          <Link href={`${nuvynGuideBase}/refresh/`} className="text-link">
            Refresh skills
          </Link>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Default host</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Five product packages on the MAUI app, plus MVVMExpress satellites on Core and Tests. Versions are the
          latest nuget.org stable — not pinned. Do not add anything else until the spec asks.
        </p>
        <ul className="mt-4 grid gap-3">
          {nuvyn.defaultPackages.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="glass-card focusable flex flex-col p-4 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  <span className="font-semibold text-foreground">{item.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{item.role}</span>
                </span>
                <span className="mt-2 text-sm font-medium text-lavender-700 dark:text-lavender-300 sm:mt-0">Docs →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Slash chain</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Open the project in the agent you selected at init. Run these in order. Domain comes from your spec.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-muted text-foreground">
              <tr>
                <th className="px-3 py-2.5 font-semibold">Command</th>
                <th className="px-3 py-2.5 font-semibold">Writes</th>
                <th className="px-3 py-2.5 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {nuvyn.slash.map((item) => (
                <tr key={item.command} className="border-t border-border align-top">
                  <td className="px-3 py-2.5 font-medium text-foreground">
                    <code>{item.command}</code>
                  </td>
                  <td className="px-3 py-2.5 text-muted-foreground">{item.writes}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{item.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Coding agents</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Omit <code className="code-inline">--agent</code> for a searchable Spec Kit picker. Pass a
          key to skip the prompt. Slash commands land in the folder that agent already reads.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-muted text-foreground">
              <tr>
                <th className="px-3 py-2.5 font-semibold">Agent</th>
                <th className="px-3 py-2.5 font-semibold">--agent</th>
                <th className="px-3 py-2.5 font-semibold">On disk</th>
              </tr>
            </thead>
            <tbody>
              {nuvyn.agents.map((item) => (
                <tr key={item.id} className="border-t border-border align-top">
                  <td className="px-3 py-2.5 font-medium text-foreground">{item.label}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">
                    <code>{item.id}</code>
                  </td>
                  <td className="px-3 py-2.5 text-muted-foreground">
                    <code>{item.folder}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Also: {nuvyn.moreAgents}.</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Read next</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          <li>
            <Link href={`${nuvynDocsBase}/`} className="glass-card focusable block p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender-500">Technical docs</p>
              <p className="mt-2 font-display text-lg font-semibold">What SDD is, and why agents need it</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Spec-driven development, agentic coding, and how the CLI is built.
              </p>
            </Link>
          </li>
          <li>
            <Link href={`${nuvynGuideBase}/`} className="glass-card focusable block p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender-500">User guide</p>
              <p className="mt-2 font-display text-lg font-semibold">Install, init, and grow the app</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Requirements, host tree, slash workflow, catalog rules, and troubleshooting.
              </p>
            </Link>
          </li>
        </ul>
      </section>

      <ul className="mt-8 flex flex-wrap gap-2">
        {nuvyn.tags.map((tag) => (
          <li key={tag} className="chip border border-border px-3">
            {tag}
          </li>
        ))}
      </ul>

      <ComponentDiscussion target={{ title: nuvyn.name, github: nuvyn.github }} />
    </main>
  );
}
