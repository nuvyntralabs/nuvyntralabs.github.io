import Link from "next/link";
import { ArrowRight, Beaker, FlaskConical, Package } from "lucide-react";
import { lab } from "@/content/lab";
import { nugetPackages, packages } from "@/content/packages";
import { proofOfConcepts, researchProjects } from "@/content/works";
import { PackageCard, PocCard, ResearchCard } from "@/components/work-card";
import { SectionIntro } from "@/components/section-intro";
import { CtaBand } from "@/components/cta-band";

const pillars = [
  {
    href: "/research/",
    icon: Beaker,
    step: "01",
    title: "Research",
    count: `${researchProjects.length} studies`,
    body: "Longer investigations: inspection products, VoIP stacks, GPS accuracy, and platform bindings.",
  },
  {
    href: "/pocs/",
    icon: FlaskConical,
    step: "02",
    title: "Prove",
    count: `${proofOfConcepts.length} prototypes`,
    body: "Public proofs and maintained forks — short enough to evaluate, complete enough to reuse.",
  },
  {
    href: "/packages/",
    icon: Package,
    step: "03",
    title: "Ship",
    count: `${nugetPackages.length} on NuGet`,
    body: "Focused .NET MAUI plugins. Install only the package that matches the requirement.",
  },
] as const;

export default function HomePage() {
  return (
    <main>
      <section className="bg-gradient-ink text-white">
        <div className="container grid items-center gap-12 pb-16 pt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:pb-24 lg:pt-24">
          <div>
            <p className="eyebrow-on-dark">{lab.tagline}</p>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Mobile infrastructure, <span className="heading-gradient">researched and shipped</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-lavender-100/80 sm:text-lg">
              {lab.mission}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/packages/" className="focusable btn-primary">
                View products
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/about/" className="focusable btn-on-dark">
                About the company
              </Link>
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-lavender-100/70">
              {lab.sponsorshipNote}
            </p>
            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-3">
              <Stat value={String(researchProjects.length)} label="R&D projects" />
              <Stat value={String(proofOfConcepts.length)} label="POCs" />
              <Stat value={String(nugetPackages.length)} label="NuGet packages" />
            </dl>
          </div>
          <aside className="hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-200/80">
              Workstreams
            </p>
            <ul className="mt-5 space-y-4">
              {pillars.map((pillar) => (
                <li key={pillar.href} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold text-lavender-200">{pillar.step}</p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">{pillar.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-lavender-100/70">{pillar.body}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="border-b border-lavender-100 bg-white">
        <div className="container py-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Built for .NET MAUI teams on Android and iOS
          </p>
        </div>
      </section>

      <section className="container py-16 sm:py-20">
        <SectionIntro
          eyebrow="How we work"
          title="Research, prove, then publish"
          description="Every product starts as a field problem. We document the research, prove the pattern in public, and ship only what is reusable."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.href}
                href={pillar.href}
                className="glass-card focusable flex flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lavender-100 text-lavender-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">
                    {pillar.step}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-xl font-semibold text-foreground">{pillar.title}</h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-lavender-700">
                  {pillar.count}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-lavender-50/60">
        <div className="container py-16 sm:py-20">
          <SectionIntro
            eyebrow="Capabilities"
            title="Infrastructure mobile apps actually need"
            description={lab.audience}
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lab.capabilities.map((capability) => (
              <li key={capability.title} className="glass-card p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">{capability.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{capability.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="packages" className="container py-16 sm:py-20">
        <SectionIntro
          eyebrow="Products"
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

      <section id="research" className="bg-lavender-50/60">
        <div className="container py-16 sm:py-20">
          <SectionIntro
            eyebrow="Research"
            title="Investigations that become products"
            description="Inspection, calling, GPS accuracy, and Xamarin bindings — documented as research, not flattened into a plugin list."
            href="/research/"
            cta="All research"
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {researchProjects.slice(0, 6).map((work) => (
              <li key={work.slug}>
                <ResearchCard work={work} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="pocs" className="container py-16 sm:py-20">
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

      <CtaBand />
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center">
      <dt className="text-xs font-medium text-lavender-100/70">{label}</dt>
      <dd className="mt-1 font-display text-2xl font-bold text-white">{value}</dd>
    </div>
  );
}
