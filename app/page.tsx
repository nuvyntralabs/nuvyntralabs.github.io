import Link from "next/link";
import { ArrowRight, Beaker, FlaskConical, Package } from "lucide-react";
import { lab } from "@/content/lab";
import { nugetPackages, packages } from "@/content/packages";
import { proofOfConcepts, researchProjects } from "@/content/works";
import { PackageCard, PocCard, ResearchCard } from "@/components/work-card";
import { SectionIntro } from "@/components/section-intro";
import { siteConfig } from "@/lib/site";

const pillars = [
  {
    href: "/research/",
    icon: Beaker,
    title: "R&D projects",
    count: `${researchProjects.length} studies`,
    body: "Longer research: inspection products, VoIP stacks, GPS accuracy, and platform bindings.",
  },
  {
    href: "/pocs/",
    icon: FlaskConical,
    title: "Proofs of concept",
    count: `${proofOfConcepts.length} prototypes`,
    body: "Public proofs and maintained forks — short enough to evaluate, complete enough to reuse.",
  },
  {
    href: "/packages/",
    icon: Package,
    title: "NuGet packages",
    count: `${nugetPackages.length} on NuGet`,
    body: "Focused .NET MAUI plugins. Install only the package that matches the requirement.",
  },
] as const;

export default function HomePage() {
  return (
    <main className="bg-grid">
      <section className="container pb-16 pt-16 sm:pb-20 sm:pt-24">
        <p className="eyebrow">Open-source laboratory</p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {lab.name}{" "}
          <span className="heading-gradient">researches, proves, and publishes</span> mobile infrastructure
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {lab.mission}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/packages/"
            className="focusable inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110"
          >
            Browse NuGet packages
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/research/"
            className="focusable inline-flex items-center gap-2 rounded-full border border-lavender-300 bg-white px-5 py-2.5 text-sm font-semibold text-lavender-800 hover:bg-lavender-50"
          >
            View R&D
          </Link>
        </div>
        <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
          <Stat value={String(researchProjects.length)} label="R&D projects" />
          <Stat value={String(proofOfConcepts.length)} label="POCs" />
          <Stat value={String(nugetPackages.length)} label="NuGet packages" />
        </dl>
      </section>

      <section className="container pb-16 sm:pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.href}
                href={pillar.href}
                className="glass-card focusable flex flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lavender-100 text-lavender-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold text-foreground">{pillar.title}</h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-lavender-700">
                  {pillar.count}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="research" className="container pb-16 sm:pb-20">
        <SectionIntro
          eyebrow="R&D projects"
          title="Research that becomes product"
          description="Inspection, calling, GPS accuracy, and Xamarin bindings — documented as research, not flattened into a plugin list."
          href="/research/"
          cta="All R&D"
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {researchProjects.slice(0, 6).map((work) => (
            <li key={work.slug}>
              <ResearchCard work={work} />
            </li>
          ))}
        </ul>
      </section>

      <section id="pocs" className="container pb-16 sm:pb-20">
        <SectionIntro
          eyebrow="Proofs of concept"
          title="Public proofs, then packages"
          description="Short prototypes and maintained forks. Evaluate the idea here; adopt the NuGet package when the pattern is reusable."
          href="/pocs/"
          cta="All POCs"
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proofOfConcepts.map((work) => (
            <li key={work.slug}>
              <PocCard work={work} />
            </li>
          ))}
        </ul>
      </section>

      <section id="packages" className="container pb-16 sm:pb-20">
        <SectionIntro
          eyebrow="NuGet packages"
          title="Focused MAUI plugins"
          description={`${packages.length} catalog entries, ${nugetPackages.length} published on nuget.org. Compose only what the app needs.`}
          href="/packages/"
          cta="Full catalog"
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packages.slice(0, 6).map((item) => (
            <li key={item.slug}>
              <PackageCard item={item} />
            </li>
          ))}
        </ul>
      </section>

      <section className="container pb-20 sm:pb-28">
        <div className="glass-card p-8 sm:p-10">
          <p className="eyebrow">The lab</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">Why Nuvyntra Labs exists</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            {lab.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {lab.principles.map((principle) => (
              <li key={principle.title} className="rounded-2xl border border-lavender-100 bg-white/80 p-5">
                <h3 className="font-display text-lg font-semibold text-foreground">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{principle.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            Professional experience and client work live on{" "}
            <a href={siteConfig.authorUrl} className="font-medium text-lavender-700 hover:text-lavender-900">
              {siteConfig.author}&apos;s site
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass-card px-3 py-4 text-center">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-display text-2xl font-bold text-lavender-800">{value}</dd>
    </div>
  );
}
