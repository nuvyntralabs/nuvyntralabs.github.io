import type { Metadata } from "next";
import { ArrowUpRight, BookOpen, Newspaper, Rss } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { MauiReleaseFeed } from "@/components/maui-release-feed";
import { PageHero } from "@/components/page-hero";
import { mauiReleaseSources, mauiReleasesPath } from "@/lib/maui-releases";

export const metadata: Metadata = {
  title: ".NET MAUI release feed",
  description:
    "Live .NET MAUI releases from the official GitHub feed, plus Microsoft Learn what's-new notes. Every card links back to the original source.",
  alternates: { canonical: mauiReleasesPath },
  openGraph: {
    title: ".NET MAUI release feed",
    description:
      "Live list of official .NET MAUI GitHub releases, with original links and Microsoft Learn what's-new pages.",
    url: mauiReleasesPath,
  },
};

const officialSources = [
  {
    href: mauiReleaseSources.learnWhatsNew,
    icon: BookOpen,
    title: "Microsoft Learn — What's new",
    body: "Official docs for each major MAUI wave (.NET 10, .NET 11). Feature-focused, not every service release.",
    cta: "Open Learn",
  },
  {
    href: mauiReleaseSources.githubReleases,
    icon: Rss,
    title: "GitHub Releases — live feed",
    body: "Canonical list of every published tag: stables, service releases, and previews. This page reads that feed.",
    cta: "Open GitHub",
  },
  {
    href: mauiReleaseSources.blog,
    icon: Newspaper,
    title: ".NET Blog — MAUI",
    body: "Product announcements and runtime notes. Complements the per-tag GitHub changelog.",
    cta: "Open blog",
  },
] as const;

export default function MauiReleasesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Official sources"
        title=".NET MAUI release feed"
        description="Microsoft Learn publishes what's-new notes per major version. There is no separate Microsoft RSS of every MAUI service release — those land on github.com/dotnet/maui/releases. This page mirrors that feed live and keeps the original link on every card."
      />

      <section className="border-b border-lavender-100 bg-white">
        <div className="container py-16 sm:py-20">
          <h2 className="font-display text-2xl font-semibold text-foreground">Where Microsoft publishes notes</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Use Learn for the story of a major version. Use GitHub for the exact tag, workload
            command, and bug-fix list. Subscribe to the official Atom feed if you want the same
            updates in a reader.
          </p>
          <ul className="mt-8 grid gap-4 lg:grid-cols-3">
            {officialSources.map((source) => {
              const Icon = source.icon;
              return (
                <li key={source.href} className="glass-card flex h-full flex-col p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lavender-100 text-lavender-700">
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
                  <p className="mt-3 break-all text-xs leading-relaxed text-lavender-700">{source.href}</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a
              href={mauiReleaseSources.learnDotnet11}
              className="font-medium text-lavender-700 hover:text-lavender-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              What&apos;s new in .NET 11
            </a>
            <a
              href={mauiReleaseSources.learnDotnet10}
              className="font-medium text-lavender-700 hover:text-lavender-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              What&apos;s new in .NET 10
            </a>
            <a
              href={mauiReleaseSources.supportPolicy}
              className="font-medium text-lavender-700 hover:text-lavender-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              MAUI support policy
            </a>
            <a
              href={mauiReleaseSources.githubAtom}
              className="font-medium text-lavender-700 hover:text-lavender-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Atom feed
            </a>
          </div>
        </div>
      </section>

      <section className="bg-lavender-50/60">
        <div className="container py-16 sm:py-20">
          <MauiReleaseFeed />
        </div>
      </section>

      <CtaBand
        title="Building against a new MAUI tag?"
        description="Nuvyntra Labs plugins target current MAUI stables. Check the official release notes first, then compose only the Plugin.Maui.* packages the app needs."
      />
    </main>
  );
}
