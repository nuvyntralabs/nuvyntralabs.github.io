import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { getRelatedWorks, workPath, type WorkItem } from "@/content/works";
import { workJsonLd } from "@/lib/json-ld";

export function WorkDetail({ work }: { work: WorkItem }) {
  const related = getRelatedWorks(work);
  const indexHref = work.kind === "research" ? "/research/" : "/pocs/";
  const indexLabel = work.kind === "research" ? "All R&D projects" : "All POCs";
  const kindLabel = work.kind === "research" ? "R&D project" : "Proof of concept";

  return (
    <main className="container max-w-3xl py-12 sm:py-16">
      <JsonLd data={workJsonLd(work)} />
      <Link
        href={indexHref}
        className="focusable inline-flex items-center gap-2 rounded-full text-sm font-medium text-lavender-700 hover:text-lavender-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {indexLabel}
      </Link>

      <p className="eyebrow mt-8">{kindLabel}</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">{work.title}</h1>
      <p className="mt-3 text-lg text-lavender-700">{work.subtitle}</p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{work.description}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="rounded-full bg-lavender-50 px-3 py-1 font-medium text-lavender-800">
          {work.language ?? "Multi-language"}
        </span>
        {work.fork ? (
          <span className="rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-800">Public fork</span>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={work.github}
          target="_blank"
          rel="noopener noreferrer"
          className="focusable inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-glow hover:brightness-110"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        {work.homepage ? (
          <a
            href={work.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-4 py-2 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
          >
            Live preview
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Abstract</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{work.paper.abstract}</p>
      </section>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold">Problem</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{work.paper.problem}</p>
        </section>
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold">Solution</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{work.paper.solution}</p>
        </section>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Architecture</h2>
        <ul className="mt-4 space-y-3">
          {work.paper.architecture.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-500" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Capabilities</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {work.paper.capabilities.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-lavender-100 bg-white px-4 py-3 text-sm leading-relaxed text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Audience</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{work.paper.audience}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Outcomes</h2>
        <ul className="mt-4 space-y-3">
          {work.paper.outcomes.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-500" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <ul className="mt-8 flex flex-wrap gap-2">
        {work.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-lavender-200 bg-lavender-50 px-3 py-1 text-xs font-medium text-lavender-800"
          >
            {tag}
          </li>
        ))}
      </ul>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="font-display text-xl font-semibold">Related {kindLabel.toLowerCase()}s</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={workPath(item)} className="glass-card focusable block h-full p-4 hover:shadow-glow">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.subtitle}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
