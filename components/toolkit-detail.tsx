import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Package } from "lucide-react";
import { ComponentDiscussion } from "@/components/component-discussion";
import { JsonLd } from "@/components/json-ld";
import { toolkitCommandGroups, type ToolkitDoc } from "@/content/toolkits";
import { toolkitJsonLd } from "@/lib/json-ld";

export function ToolkitDetail({ toolkit }: { toolkit: ToolkitDoc }) {
  return (
    <main className="container max-w-3xl py-12 sm:py-16">
      <JsonLd data={toolkitJsonLd(toolkit)} />
      <Link
        href="/toolkits/"
        className="focusable inline-flex items-center gap-2 rounded-full text-sm font-medium text-lavender-700 hover:text-lavender-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All toolkits
      </Link>

      <p className="eyebrow mt-8">Toolkit</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">{toolkit.title}</h1>
      <p className="mt-3 text-lg text-lavender-700">{toolkit.subtitle}</p>
      {toolkit.version ? (
        <p className="mt-4 inline-flex rounded-full bg-lavender-50 px-3 py-1 text-xs font-semibold text-lavender-900">
          Current {toolkit.version}
        </p>
      ) : null}
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{toolkit.description}</p>

      {toolkit.notice ? (
        <aside className="mt-6 rounded-2xl border border-lavender-200 bg-lavender-50 px-4 py-3">
          <p className="text-sm font-semibold text-lavender-900">{toolkit.notice.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-lavender-800">{toolkit.notice.text}</p>
        </aside>
      ) : null}

      <aside className="mt-6 rounded-2xl border border-lavender-200 bg-lavender-50 px-4 py-3">
        <p className="text-sm font-semibold text-lavender-900">Not a runtime plugin</p>
        <p className="mt-1 text-sm leading-relaxed text-lavender-800">
          MauiDev diagnoses the machine and the project. Use the focused{" "}
          <Link href="/packages/" className="font-medium underline decoration-lavender-300 underline-offset-2">
            Plugin.Maui.*
          </Link>{" "}
          packages for leaks, traces, crashes, and device health.
        </p>
      </aside>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={toolkit.github}
          target="_blank"
          rel="noopener noreferrer"
          className="focusable inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-glow hover:brightness-110"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        {toolkit.nuget ? (
          <a
            href={toolkit.nuget}
            target="_blank"
            rel="noopener noreferrer"
            className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-4 py-2 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
          >
            <Package className="h-4 w-4" aria-hidden="true" />
            nuget.org
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
        {toolkit.vscodeMarketplace ? (
          <a
            href={toolkit.vscodeMarketplace}
            target="_blank"
            rel="noopener noreferrer"
            className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-4 py-2 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
          >
            VS Code / Cursor
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Abstract</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{toolkit.abstract}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Install</h2>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-lavender-950 p-4 text-sm text-lavender-50">
          <code>{toolkit.install}</code>
        </pre>
        {toolkit.packageId ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Package ID:{" "}
            <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">{toolkit.packageId}</code>
          </p>
        ) : null}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{toolkit.installNote}</p>
        {toolkit.vscodeMarketplace ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            VS Code / Cursor: install the <strong>MauiDev</strong> extension (
            <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">nuvyntralabs.maui-dev</code>
            ) from the{" "}
            <a
              href={toolkit.vscodeMarketplace}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-lavender-700 hover:text-lavender-900"
            >
              Marketplace
            </a>
            . The extension shells out to <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">maui-dev</code>{" "}
            and offers to install the tool if it is missing.
          </p>
        ) : null}
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">
          Commands{toolkit.version ? ` (${toolkit.version.replace(/\.0$/, "")})` : ""}
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-lavender-100">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-lavender-50 text-lavender-900">
              <tr>
                <th className="px-3 py-2.5 font-semibold">Command</th>
                <th className="px-3 py-2.5 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {toolkit.commands.map((command) => (
                <tr key={command.name} className="border-t border-lavender-100 align-top">
                  <td className="px-3 py-2.5 font-medium text-foreground">
                    <a href={`#${commandAnchor(command.name)}`} className="hover:text-lavender-800">
                      <code>{command.name}</code>
                    </a>
                  </td>
                  <td className="px-3 py-2.5 text-muted-foreground">{command.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Global options:{" "}
          {toolkit.globalOptions.map((option, index) => (
            <span key={option}>
              {index > 0 ? ", " : ""}
              <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">{option}</code>
            </span>
          ))}
          .
        </p>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-lavender-950 p-4 text-sm text-lavender-50">
          <code>{toolkit.examples}</code>
        </pre>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Exit codes: <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">0</code> pass/skip,{" "}
          <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">1</code> fail (or warning with{" "}
          <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">--warn-as-error</code> /{" "}
          <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">--ci</code>),{" "}
          <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">2</code> usage error.
        </p>
      </section>

      {toolkit.ciJsonSample ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">CI JSON</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">--ci</code> (or{" "}
            <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">--format json</code>) prints this
            schema. The VS Code / Cursor extension maps{" "}
            <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">diagnostics</code> into the Problems
            panel. <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">--format sarif</code> is the
            same findings for GitHub code scanning.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-lavender-950 p-4 text-sm text-lavender-50">
            <code>{toolkit.ciJsonSample}</code>
          </pre>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Usage and sample results</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Each sample is a typical human report from a project with problems. A healthy tree prints green checks and
          exits 0. Run with <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">--dry-run</code>{" "}
          before <code className="rounded bg-lavender-50 px-1.5 py-0.5 text-lavender-800">--fix</code>.
        </p>
        {toolkitCommandGroups(toolkit).map((group) => (
          <div key={group.name} className="mt-8">
            <h3 className="font-display text-lg font-semibold text-lavender-900">{group.name}</h3>
            <div className="mt-4 space-y-6">
              {group.commands.map((command) => (
                <article
                  key={command.name}
                  id={commandAnchor(command.name)}
                  className="scroll-mt-24 rounded-2xl border border-lavender-100 bg-white p-5"
                >
                  <h4 className="font-display text-base font-semibold text-foreground">
                    <code>{command.name}</code>
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{command.purpose}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-lavender-600">Usage</p>
                  <pre className="mt-2 overflow-x-auto rounded-xl bg-lavender-950 p-3 text-sm text-lavender-50">
                    <code>{command.usage}</code>
                  </pre>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-lavender-600">
                    Sample result
                  </p>
                  <pre className="mt-2 overflow-x-auto rounded-xl bg-lavender-950 p-3 text-sm text-lavender-50">
                    <code>{command.sample}</code>
                  </pre>
                  {command.notes ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{command.notes}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold">--fix allow-list</h2>
          <ul className="mt-3 space-y-2">
            {toolkit.fixAllowList.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold">It never</h2>
          <ul className="mt-3 space-y-2">
            {toolkit.neverDoes.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">CI</h2>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-lavender-950 p-4 text-sm text-lavender-50">
          <code>{toolkit.ci}</code>
        </pre>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{toolkit.alternatives}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Use a plugin instead when</h2>
        <ul className="mt-4 grid gap-3">
          {toolkit.notFor.map((item) => (
            <li key={item.use}>
              <Link
                href={item.href}
                className="glass-card focusable flex flex-col p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <span>
                  <span className="font-semibold text-foreground">{item.use}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{item.need}</span>
                </span>
                <span className="mt-2 text-sm font-medium text-lavender-700 sm:mt-0">Docs →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {toolkit.later.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Later</h2>
          <ul className="mt-4 space-y-3">
            {toolkit.later.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {toolkit.releaseNotes?.length ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Release notes</h2>
          <ul className="mt-4 space-y-3">
            {toolkit.releaseNotes.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <ul className="mt-8 flex flex-wrap gap-2">
        {toolkit.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-lavender-200 bg-lavender-50 px-3 py-1 text-xs font-medium text-lavender-800"
          >
            {tag}
          </li>
        ))}
      </ul>

      <ComponentDiscussion target={{ title: toolkit.title, github: toolkit.github }} />
    </main>
  );
}

function commandAnchor(name: string): string {
  return name.replaceAll(" ", "-");
}
