import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { lab } from "@/content/lab";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Nuvyntra Labs for product evaluation, research questions, or open-source collaboration.",
  alternates: { canonical: "/contact/" },
};

const channels = [
  {
    title: "GitHub organization",
    body: "Issues, repositories, and public workstreams for research, POCs, and packages.",
    href: siteConfig.githubOrg,
    label: "github.com/nuvyntralabs",
  },
  {
    title: "Founder",
    body: "Professional inquiries and client work go through Niladri Prasad Padhy's personal site.",
    href: siteConfig.authorUrl,
    label: "niladri-padhy-website.vercel.app",
  },
  {
    title: "GitHub Sponsors",
    body: "If a package or study is useful in production, sponsorship keeps the catalog maintained.",
    href: siteConfig.githubSponsors,
    label: "github.com/sponsors/NiladriPadhy",
  },
  {
    title: "Buy Me a Coffee",
    body: "A one-time or monthly thanks that helps keep research, POCs, and NuGet packages maintained.",
    href: siteConfig.buyMeACoffee,
    label: "buymeacoffee.com/npadhy",
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Talk to Nuvyntra Labs"
        description="Open a conversation about products, research, or collaboration. We are independent and respond through the public channels below."
      />

      <section className="container py-16 sm:py-20">
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {lab.sponsorshipNote}
        </p>
        <ul className="grid gap-4 sm:grid-cols-2">
          {channels.map((channel) => (
            <li key={channel.title}>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card focusable flex h-full flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <h2 className="font-display text-xl font-semibold text-foreground">{channel.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{channel.body}</p>
                <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-lavender-700">
                  {channel.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </p>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Prefer to start from a package? Browse the{" "}
          <Link href="/packages/" className="font-medium text-lavender-700 hover:text-lavender-900">
            product catalog
          </Link>{" "}
          or follow the{" "}
          <Link href="/getting-started/" className="font-medium text-lavender-700 hover:text-lavender-900">
            getting started
          </Link>{" "}
          guide.
        </p>
      </section>
    </main>
  );
}
