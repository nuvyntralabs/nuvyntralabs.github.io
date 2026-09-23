import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Github, MessagesSquare } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { DiscordIcon, LinkedInIcon } from "@/components/brand-icons";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SectionIntro } from "@/components/section-intro";
import {
  playground,
  playgroundAdvantages,
  playgroundChannels,
  playgroundContribute,
  playgroundHref,
  playgroundPrototypes,
  playgroundRoadmap,
  playgroundSpace,
  playgroundWhat,
} from "@/content/playground";
import { whitepaperHref } from "@/content/ecosystem-whitepaper";
import { playgroundJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Playground",
  description: playground.description,
  keywords: [
    "Nuvyntra Labs",
    "Lumina Playground",
    ".NET MAUI",
    "UI prototypes",
    "Aether Bank",
    "Nuvexa Clinic",
    "Civic Pulse",
    "Harbor Field",
    "Lumina Market",
  ],
  alternates: { canonical: playgroundHref },
  openGraph: {
    title: `${playground.title} · ${siteConfig.shortName}`,
    description: playground.description,
    url: playgroundHref,
  },
};

export default function PlaygroundPage() {
  return (
    <main>
      <JsonLd data={playgroundJsonLd()} />
      <PageHero eyebrow="Playground" title={playground.title} description={playground.subtitle} />

      <section className="container py-8 sm:py-10">
        <SectionIntro
          eyebrow="The stack"
          title={playgroundWhat.title}
          description={playground.abstract}
        />
        <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
          {playgroundWhat.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={whitepaperHref} className="focusable btn-secondary">
            Read the white paper
          </Link>
          <a
            href={playground.github}
            target="_blank"
            rel="noopener noreferrer"
            className="focusable btn-secondary"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            Open the repo
          </a>
          <a
            href={playgroundContribute.paths[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="focusable btn-secondary"
          >
            Share an idea
          </a>
          <Link href="#contribute" className="focusable btn-secondary">
            How to contribute
          </Link>
        </div>
      </section>

      <section className="section-muted">
        <div className="container py-16 sm:py-20">
          <SectionIntro
            eyebrow="The repo space"
            title={playgroundSpace.title}
            description={playgroundSpace.description}
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {playgroundSpace.points.map((item, index) => (
              <li key={item.title} className="glass-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contribute" className="container scroll-mt-28 py-16 sm:py-20">
        <SectionIntro
          eyebrow="Open source"
          title={playgroundContribute.title}
          description={playgroundContribute.description}
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {playgroundContribute.paths.map((item) => (
            <li key={item.title}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card focusable group flex h-full flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-lavender-700 dark:text-lavender-300">
                  {item.label}
                  <ArrowUpRight
                    className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <p className="eyebrow">Share an idea</p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-foreground">Four steps to propose an example</h3>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {playgroundContribute.ideaSteps.map((step, index) => (
              <li key={step.title} className="glass-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h4 className="mt-3 font-display text-lg font-semibold text-foreground">{step.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="glass-card mt-14 p-8">
          <p className="eyebrow">{playgroundContribute.featured.title}</p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-foreground">
            Site, Discord, and the LinkedIn group
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {playgroundContribute.featured.body}
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {playgroundContribute.featured.channels.map((channel) => (
              <li key={channel.title}>
                {channel.external ? (
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focusable block rounded-2xl border border-lavender-100 bg-surface/80 p-5 transition hover:-translate-y-0.5 hover:shadow-card dark:border-white/10 dark:hover:bg-white/10"
                  >
                    <p className="font-display text-lg font-semibold text-foreground">{channel.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{channel.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-lavender-700 dark:text-lavender-300">
                      {channel.label}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </a>
                ) : (
                  <Link
                    href={channel.href}
                    className="focusable block rounded-2xl border border-lavender-100 bg-surface/80 p-5 transition hover:-translate-y-0.5 hover:shadow-card dark:border-white/10 dark:hover:bg-white/10"
                  >
                    <p className="font-display text-lg font-semibold text-foreground">{channel.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{channel.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-lavender-700 dark:text-lavender-300">
                      {channel.label}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <p className="eyebrow">Contribute code</p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-foreground">
            Fork, then open a pull request
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {playgroundContribute.codeNote}
          </p>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {playgroundContribute.codeSteps.map((step, index) => (
              <li key={step.title} className="glass-card p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">
                  {String(index + 1).padStart(2, "0")} · {step.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="glass-card mt-8 p-6 sm:p-8">
            <p className="eyebrow">{playgroundContribute.workflow.title}</p>
            <ol className="mt-6 space-y-0">
              {playgroundContribute.workflow.stages.map((stage, index) => (
                <li key={stage} className="relative pl-10">
                  {index < playgroundContribute.workflow.stages.length - 1 ? (
                    <span
                      className="absolute left-[11px] top-7 h-[calc(100%-0.5rem)] w-px bg-lavender-200 dark:bg-lavender-800"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="absolute left-0 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-lavender-100 text-[11px] font-semibold text-lavender-800 dark:bg-lavender-900/70 dark:text-lavender-200">
                    {index + 1}
                  </span>
                  <p
                    className={`text-sm font-semibold text-foreground ${
                      index < playgroundContribute.workflow.stages.length - 1 ? "pb-6" : ""
                    }`}
                  >
                    {stage}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-2 border-t border-lavender-100 pt-6 dark:border-white/10">
              <p className="text-sm font-semibold text-foreground">
                {playgroundContribute.workflow.review.title}
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {playgroundContribute.workflow.review.outcomes.map((outcome) => (
                  <li
                    key={outcome.title}
                    className="rounded-2xl border border-lavender-100 bg-surface/80 p-4 dark:border-white/10"
                  >
                    <p className="font-display text-base font-semibold text-foreground">{outcome.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{outcome.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-muted">
        <div className="container py-16 sm:py-20">
          <SectionIntro
            eyebrow="Advantages"
            title="Why teams start here"
            description="Compose only what the product needs. The playground is a living repo on that rule — not a theme pack."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {playgroundAdvantages.map((item, index) => (
              <li key={item.title} className="glass-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container py-16 sm:py-20">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass-card p-8">
            <p className="eyebrow">Open by default</p>
            <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
              Research, source, white paper, examples, and tests — free
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every product on this site is MIT. The white paper, package docs, sample apps, and test
              suites ship with the repos. Lumina Playground is a public repo space for examples, not a
              nupkg — clone it, run a head, share the next idea. There is no paid UI kit.
            </p>
          </div>
          <div className="glass-card p-8">
            <p className="eyebrow">A young ecosystem</p>
            <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
              Early on purpose — more heads are coming
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The catalog is young. That is the point: walk a prototype this week, then watch real-time
              examples and contributor ideas land in the same repo. Stay tuned for the next features.
            </p>
          </div>
        </div>
      </section>

      <section className="section-muted">
        <div className="container py-16 sm:py-20">
          <SectionIntro
            eyebrow="Future roadmap"
            title="What comes next"
            description="Real-time examples will keep landing in the repo. More heads, deeper plugin wiring, and sharper Lumina recipes — plus ideas from contributors."
          />
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {playgroundRoadmap.map((item, index) => (
              <li key={item.title} className="glass-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="prototypes" className="container py-16 sm:py-20">
        <SectionIntro
          eyebrow={`${playground.appCount} prototypes · ${playground.screenCount} screens`}
          title="Built with the development ecosystem"
          description="Same stack. Five different businesses already in the repo. Static seed — no live backends. If you have a use case, start from one of these heads or propose the next example."
        />
        <div className="mt-12 space-y-20">
          {playgroundPrototypes.map((prototype, index) => (
            <article key={prototype.slug} id={prototype.slug} className="scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">
                    {String(index + 1).padStart(2, "0")} · {prototype.screens} screens
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground">
                    {prototype.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold" style={{ color: prototype.accent }}>
                    {prototype.product}
                  </p>
                  <p className="mt-3 text-lg font-medium text-foreground">{prototype.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{prototype.body}</p>
                </div>
                <a
                  href={`${playground.github}/tree/main/${prototype.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focusable btn-secondary shrink-0"
                >
                  View source
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {prototype.highlights.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {prototype.shots.map((shot) => (
                  <li key={shot.src}>
                    <figure className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-soft">
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        className="mx-auto h-auto w-full bg-[#f6f1e8]"
                      />
                      <figcaption className="border-t border-border px-3 py-2 text-center text-xs font-semibold text-muted-foreground">
                        {shot.label}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-muted">
        <div className="container py-16 sm:py-20">
          <SectionIntro
            eyebrow="Your use case"
            title="Have a product in mind? Start from a prototype — or propose the next one"
            description="If you have a specific use case, use the ecosystem prototype that is closest — bank, clinic, civic, field, or market — then compose the plugins you need. Contributors can share a new idea with the community in the same repo."
          />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Open a Discussion with the flow you want to ship, or file an Issue for a gap. Lumina
            Playground stays a public repo space so real-time examples and community ideas land in
            the open.
          </p>
        </div>
      </section>

      <section id="community" className="container py-16 sm:py-20">
        <SectionIntro
          eyebrow="Stay close"
          title="Discussions, issues, LinkedIn, and Discord"
          description="Share ideas with the open-source community in the repo. Join LinkedIn and Discord for lab updates."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {playgroundChannels.map((channel) => (
            <li key={channel.href}>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card focusable group flex h-full flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-lavender-100 text-lavender-800 dark:bg-lavender-900/70 dark:text-lavender-200">
                  <ChannelIcon title={channel.title} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{channel.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{channel.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-lavender-700 dark:text-lavender-300">
                  {channel.label}
                  <ArrowUpRight
                    className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        eyebrow="Next step"
        title="Read the paper, or compose a set"
        description="The playground is the repo space. The white paper is the map. The catalog is what you install."
      />
    </main>
  );
}

function ChannelIcon({ title }: { title: string }) {
  if (title === "Discord") return <DiscordIcon className="h-5 w-5" />;
  if (title === "LinkedIn") return <LinkedInIcon className="h-5 w-5" />;
  if (title === "Issues") return <Github className="h-5 w-5" aria-hidden="true" />;
  return <MessagesSquare className="h-5 w-5" aria-hidden="true" />;
}
