import Link from "next/link";
import { ArrowRight, Beaker, FlaskConical, Package } from "lucide-react";
import { lab } from "@/content/lab";
import { whitepaperHref, whitepaperPillars } from "@/content/ecosystem-whitepaper";
import { nuvexaDb } from "@/content/nuvexadb";
import { uiKit } from "@/content/uikit";
import { nugetPackages, packages } from "@/content/packages";
import { nuvyn, nuvynDocsBase, nuvynGuideBase, nuvynHref } from "@/content/nuvyn";
import { homeToolkits } from "@/content/toolkits";
import { proofOfConcepts, researchProjects } from "@/content/works";
import { PackageCard, PocCard, ResearchCard, ToolkitCard } from "@/components/work-card";
import { SectionIntro } from "@/components/section-intro";
import { CommunityBand } from "@/components/community-band";
import { BlogSavedNotice } from "@/components/blog-saved-notice";
import { CtaBand } from "@/components/cta-band";
import { TwoStarts } from "@/components/two-starts";

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
    count: `${nugetPackages.length} on GitHub Packages`,
    body: "Focused .NET MAUI plugins. Install only the package that matches the requirement.",
  },
] as const;

export default function HomePage() {
  return (
    <main>
      <BlogSavedNotice />
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 animate-pulse-soft rounded-full bg-lavender-400/25 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-64 w-64 animate-pulse-soft rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="container relative grid items-center gap-12 pb-16 pt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:pb-24 lg:pt-20">
          <div className="animate-fade-up">
            <p className="eyebrow">{lab.tagline}</p>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-[4.1rem] lg:leading-[1.05]">
              A <span className="heading-gradient">component library</span>. A whole{" "}
              <span className="heading-gradient">ecosystem</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {lab.mission}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/packages/" className="focusable btn-primary">
                Browse components
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href={nuvynHref} className="focusable btn-primary">
                Start with Nuvyn
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/getting-started/" className="focusable btn-secondary">
                Getting started
              </Link>
              <Link href={whitepaperHref} className="focusable btn-secondary">
                Read the white paper
              </Link>
              <Link href="/playground/" className="focusable btn-secondary">
                Playground
              </Link>
              <Link href="#community" className="focusable btn-secondary">
                Join the community
              </Link>
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {lab.sponsorshipNote}
            </p>
            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6">
              <Stat value={String(researchProjects.length)} label="R&D projects" />
              <Stat value={String(proofOfConcepts.length)} label="POCs" />
              <Stat value={String(nugetPackages.length)} label="NuGet packages" />
            </dl>
          </div>
          <aside className="relative hidden lg:block">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-lavender-200/50 via-transparent to-cyan-200/30 blur-2xl" />
            <div className="relative rounded-[1.75rem] border border-white/80 bg-white/70 p-6 shadow-lift backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lavender-700 dark:text-lavender-300">
                Workstreams
              </p>
              <ul className="mt-5 space-y-3">
                {pillars.map((pillar) => (
                  <li
                    key={pillar.href}
                    className="rounded-2xl border border-lavender-100 bg-white/90 p-4 shadow-soft dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none"
                  >
                    <p className="text-xs font-semibold text-lavender-500">{pillar.step}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-foreground">{pillar.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-muted">
        <div className="container py-5">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Built for .NET MAUI teams on Android, iOS, Mac Catalyst, and Windows
          </p>
        </div>
      </section>

      <section className="container py-16 sm:py-20">
        <SectionIntro
          eyebrow="Two ways to start"
          title="You choose. Neither path is a fallback."
          description="Use Nuvyntra Labs as a component library in the app you already have, or as a whole ecosystem for a new MAUI host. The packages are the same either way."
          href="/getting-started/"
          cta="Getting started"
        />
        <TwoStarts className="mt-10 grid gap-4 md:grid-cols-2" />
      </section>

      <section className="section-muted">
        <div className="container py-16 sm:py-20">
        <SectionIntro
          eyebrow="Spec-driven CLI"
          title={nuvyn.name}
          description={nuvyn.subtitle}
          href={nuvynHref}
          cta="Nuvyn overview"
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <Link href={nuvynHref} className="glass-card focusable group p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">
              {nuvyn.packageId} · {nuvyn.version}
              <span className="ml-2 rounded-full bg-lavender-200/80 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-lavender-900 dark:bg-lavender-500/30 dark:text-lavender-100">
                New
              </span>
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-foreground">
              Spec-driven MAUI, locked to the Nuvyntra stack
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{nuvyn.abstract}</p>
            <pre className="mt-5 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
              <code>{nuvyn.install}</code>
            </pre>
          </Link>
          <div className="grid gap-4">
            <Link href={`${nuvynDocsBase}/`} className="glass-card focusable p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">Technical docs</p>
              <h2 className="mt-3 font-display text-xl font-semibold text-foreground">What SDD is, and why agents need it</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Spec-driven development, agentic coding, and how the PackAsTool CLI, payload host, and slash chain are built.
              </p>
            </Link>
            <Link href={`${nuvynGuideBase}/`} className="glass-card focusable p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">User guide</p>
              <h2 className="mt-3 font-display text-xl font-semibold text-foreground">Install, init, grow the app</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                New folder only. Pick a Spec Kit agent (Cursor, Copilot, Claude, Gemini, Codex, Windsurf, …). Then run constitution → specify → plan → implement.
              </p>
            </Link>
          </div>
        </div>
        </div>
      </section>

      <section className="container py-16 sm:py-20">
        <SectionIntro
          eyebrow="White paper"
          title="Three pillars, then the gallery"
          description="UIKit paints screens. MVVMExpress hosts the app. HttpForge talks to the API. The catalog fills in local data, network truth, security, and operations — adopt only what the product needs."
          href={whitepaperHref}
          cta="Read the white paper"
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {whitepaperPillars.map((pillar) => (
            <li key={pillar.href}>
              <Link
                href={pillar.href}
                className="glass-card focusable flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">{pillar.role}</p>
                <h2 className="mt-3 font-display text-xl font-semibold text-foreground">{pillar.name}</h2>
                <p className="mt-1 text-xs font-semibold text-lavender-800 dark:text-lavender-200">
                  {pillar.product} · {pillar.version}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-muted">
        <div className="container py-16 sm:py-20">
        <SectionIntro
          eyebrow="Embedded database"
          title={nuvexaDb.name}
          description={nuvexaDb.subtitle}
          href="/nuvexadb/"
          cta="NuvexaDB docs"
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <Link href="/nuvexadb/" className="glass-card focusable group p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">
              {nuvexaDb.packageId} · {nuvexaDb.version}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-foreground">One engine, one .nvx file</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{nuvexaDb.abstract}</p>
            <p className="mt-4 text-sm font-semibold text-lavender-800 dark:text-lavender-200">
              White paper, NQL, and integration guides for every supported host
            </p>
          </Link>
          <Link href="/nuvexadb/integration/" className="glass-card focusable p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">Getting started</p>
            <h2 className="mt-3 font-display text-xl font-semibold text-foreground">Ten platform guides</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              .NET / MAUI, Java, Kotlin, Android, Swift, Flutter, React Native, Python, Node.js, Go, and C++.
              Each guide names the Release zip, empty project, CRUD, and encryption password.
            </p>
          </Link>
        </div>
        <Link
          href="/packages/plugin-maui-local-store/"
          className="glass-card focusable mt-4 block p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">
            Plugin.Maui.LocalStore · 1.1.0
          </p>
          <h2 className="mt-3 font-display text-xl font-semibold text-foreground">
            Room-style MAUI local store
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Host picks SQLite, NuvexaDB, Realm, LiteDB, or another shipped engine. Application code stays on
            the same ILocalStore / IStoreCollection methods. 1.1 adds AutoMigrate, QueryAsync, and generated
            [StoreDao] interfaces.
          </p>
        </Link>
        <div className="mt-14">
        <SectionIntro
          eyebrow="Lumina UI library"
          title={uiKit.name}
          description={uiKit.subtitle}
          href="/uikit/"
          cta="UIKit(MAUI) docs"
        />
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <Link href="/uikit/" className="glass-card focusable group p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">
              {uiKit.packageId} · {uiKit.version}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-foreground">
              {uiKit.controlCount} NV* controls, {uiKit.recipeCount} page recipes
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{uiKit.abstract}</p>
            <p className="mt-4 text-sm font-semibold text-lavender-800 dark:text-lavender-200">
              Register with UseNuvyntraUIKit(), then use xmlns nv
            </p>
          </Link>
          <Link href="/packages/plugin-maui-mvvmexpress/" className="glass-card focusable p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">Host composition</p>
            <h2 className="mt-3 font-display text-xl font-semibold text-foreground">Paint with UIKit, host with MVVMExpress</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The kit does not PackageReference Plugin.Maui.*. Compose MVVMExpress, FormValidation, and
              KeyboardManager in the app.
            </p>
          </Link>
        </div>
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
                className="glass-card focusable group flex flex-col p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="icon-well h-11 w-11 transition group-hover:bg-gradient-primary group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500 dark:text-lavender-300">
                    {pillar.step}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-xl font-semibold text-foreground">{pillar.title}</h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-lavender-700 dark:text-lavender-300">
                  {pillar.count}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section-muted">
        <div className="container py-16 sm:py-20">
          <SectionIntro
            eyebrow="Component library"
            title="Infrastructure mobile apps actually need"
            description={lab.audience}
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lab.capabilities.map((capability, index) => (
              <li
                key={capability.title}
                className={`glass-card p-6 ${index === 0 ? "lg:col-span-2" : ""}`}
              >
                <h3 className="font-display text-lg font-semibold text-foreground">{capability.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{capability.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CommunityBand />

      <section id="packages" className="container py-16 sm:py-20">
        <SectionIntro
          eyebrow="Component library"
          title="Focused MAUI plugins"
          description={`${packages.length} catalog entries, ${nugetPackages.length} published on GitHub Packages. Install one package. Compose only what the app needs.`}
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

      <section id="toolkits" className="section-muted">
        <div className="container py-16 sm:py-20">
          <SectionIntro
            eyebrow="Whole ecosystem"
            title="Start the host, then diagnose"
            description="Nuvyn scaffolds a spec-driven MAUI app on the Nuvyntra stack. MauiDev 1.2.2 then doctors the machine and the project. NuvLoc 1.1.2 diffs sibling .resx files and lets your coding agent write the cultures. Plugins and UIKit stay installable without these tools."
            href="/toolkits/"
            cta="All toolkits"
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homeToolkits().map((item) => (
              <li key={item.slug}>
                <ToolkitCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="research" className="container py-16 sm:py-20">
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
      </section>

      <section id="pocs" className="section-muted">
        <div className="container py-16 sm:py-20">
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
        </div>
      </section>

      <CtaBand />
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{value}</dd>
    </div>
  );
}
