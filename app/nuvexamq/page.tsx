import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { ComponentDiscussion } from "@/components/component-discussion";
import { JsonLd } from "@/components/json-ld";
import { NuvexaMqGuideTabs } from "@/components/nuvexamq-guide";
import { nuvexaMqManuals } from "@/content/nuvexamq-guide";
import { nuvexaMq, nuvexaMqDocsBase } from "@/content/nuvexamq";
import { nuvexaMqJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: nuvexaMq.name,
  description: nuvexaMq.description,
  keywords: [...nuvexaMq.tags, "Nuvyntra Labs", "Nuventra"],
  alternates: { canonical: "/nuvexamq/" },
  openGraph: {
    title: `${nuvexaMq.name} · ${siteConfig.shortName}`,
    description: nuvexaMq.description,
    url: "/nuvexamq/",
  },
};

export default function NuvexaMqPage() {
  return (
    <main className="container max-w-3xl py-8 sm:py-10">
      <JsonLd data={nuvexaMqJsonLd()} />
      <NuvexaMqGuideTabs active="overview" />

      <p className="eyebrow mt-5">Message broker</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">{nuvexaMq.title}</h1>
      <p className="mt-3 text-lg text-lavender-700 dark:text-lavender-300">{nuvexaMq.subtitle}</p>
      <p className="chip mt-4 inline-flex px-3 font-semibold">Broker {nuvexaMq.version}</p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{nuvexaMq.description}</p>

      <aside className="callout mt-6 px-4 py-3">
        <p className="text-sm font-semibold text-foreground">Install the server, then copy a client sample</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          The package is the product you ship. Programs under <code className="code-inline">samples/clients</code>{" "}
          are how an application talks to that broker. The server, engine, protocol, and command-line client are not
          NuGet packages. This version is one node. Clustering, federation, and the shovel plugin are later work.
        </p>
      </aside>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={nuvexaMq.github}
          target="_blank"
          rel="noopener noreferrer"
          className="focusable inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-glow hover:brightness-110"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <a href={nuvexaMq.releases} target="_blank" rel="noopener noreferrer" className="focusable btn-secondary">
          Releases
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <Link href={`${nuvexaMqDocsBase}/`} className="focusable btn-secondary">
          Technical reference
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Install</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Production does not use the <code className="code-inline">src</code> folder. Install the package for the
          machine. It installs the broker and the desktop app, puts <code className="code-inline">nuvexamq</code> on{" "}
          <code className="code-inline">PATH</code>, and starts the broker on boot. CI on{" "}
          <code className="code-inline">main</code> keeps the packages as workflow artifacts for 14 days. The tag{" "}
          <code className="code-inline">v{nuvexaMq.version}</code> publishes them on the GitHub Release.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-muted text-foreground">
              <tr>
                <th className="px-3 py-2.5 font-semibold">System</th>
                <th className="px-3 py-2.5 font-semibold">Package</th>
                <th className="px-3 py-2.5 font-semibold">Service</th>
                <th className="px-3 py-2.5 font-semibold">Data directory</th>
              </tr>
            </thead>
            <tbody>
              {nuvexaMq.packages.map((item) => (
                <tr key={item.system} className="border-t border-border align-top">
                  <td className="px-3 py-2.5 font-medium text-foreground">{item.system}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{item.package}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{item.service}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">
                    <code className="code-inline">{item.data}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
          <code>{`nuvexamq
nuvexamq -v
nuvexamq-desktop`}</code>
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Listeners</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          A package install and the desktop app both use these defaults. Sign in to the console as{" "}
          <code className="code-inline">guest</code> / <code className="code-inline">guest</code>. That account is
          accepted only from this machine. Open <code className="code-inline">http://127.0.0.1:5763/</code>.
        </p>
        <ul className="mt-4 space-y-3">
          {nuvexaMq.listeners.map((item) => (
            <li key={item.port} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-500" />
              <span>
                <strong className="text-foreground">{item.port}</strong> — {item.role}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Overview</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{nuvexaMq.abstract}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Publish and consume</h2>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-[13px] leading-relaxed text-lavender-50">
          <code>{`nuvexamq stream add --name orders --filter orders.>
nuvexamq pub --subject orders.created --body hello --key order-18
nuvexamq consume --stream orders --durable billing --count 1`}</code>
        </pre>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          <code className="code-inline">orders.&gt;</code> matches <code className="code-inline">orders.created</code>{" "}
          and <code className="code-inline">orders.created.eu</code>. <code className="code-inline">*</code> is one
          token. <code className="code-inline">&gt;</code> is the rest of the subject. A second durable consumer named{" "}
          <code className="code-inline">warehouse</code> on the same stream is fan-out. A second connection that uses
          the durable name <code className="code-inline">billing</code> is a competing consumer. Point an application
          at <code className="code-inline">NUVEXA_HOST</code> and <code className="code-inline">NUVEXA_PORT</code>{" "}
          (defaults <code className="code-inline">127.0.0.1</code> and <code className="code-inline">5761</code>).
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Capabilities</h2>
        <ul className="mt-4 space-y-3">
          {nuvexaMq.capabilities.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-500" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Documentation</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Version {nuvexaMq.version}. Author {nuvexaMq.author}. License {nuvexaMq.license}. These pages are the
          broker manuals: the technical reference, the admin panel, client integration, the language samples, and the
          benchmark.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {nuvexaMqManuals.map((manual) => (
            <li key={manual.href}>
              <Link href={manual.href} className="glass-card focusable block h-full p-5 hover:shadow-glow">
                <p className="font-semibold text-foreground">{manual.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{manual.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ul className="mt-8 flex flex-wrap gap-2">
        {nuvexaMq.tags.map((tag) => (
          <li key={tag} className="chip border border-border px-3">
            {tag}
          </li>
        ))}
      </ul>

      <ComponentDiscussion target={{ title: nuvexaMq.name, github: nuvexaMq.github }} />
    </main>
  );
}
