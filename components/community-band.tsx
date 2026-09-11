import { ArrowUpRight, Github } from "lucide-react";
import { DiscordIcon } from "@/components/brand-icons";
import { siteConfig } from "@/lib/site";

const channels = [
  {
    href: siteConfig.discord,
    title: "Discord Community",
    body: "Join the conversation, ask questions, share knowledge, and connect with other developers.",
    cta: "Join Discord",
    iconWrap: "bg-[#5865F2]/10 text-[#5865F2]",
    Icon: DiscordIcon,
  },
  {
    href: siteConfig.githubOrg,
    title: "GitHub",
    body: "Explore our open-source projects, contribute, report issues, and follow our development journey.",
    cta: "Visit GitHub",
    iconWrap: "bg-lavender-100 text-lavender-800",
    Icon: Github,
  },
] as const;

export function CommunityBand() {
  return (
    <section id="community" className="container py-16 sm:py-20">
      <div className="overflow-hidden rounded-3xl border border-lavender-100 bg-white shadow-card">
        <div className="bg-[#0B0F17] px-6 py-10 sm:px-12 sm:py-12">
          <img
            src="/brand/banner.svg"
            alt="Nuvyntra Labs — Applied R&D"
            width={600}
            height={160}
            className="mx-auto h-auto w-full max-w-xl"
          />
        </div>

        <div className="px-6 py-10 sm:px-12 sm:py-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Join our community</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground">
              Welcome to Nuvyntra Labs
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A developer-focused community dedicated to building, sharing, and supporting
              open-source tools, libraries, and solutions.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Connect with fellow developers, explore our open-source projects, share ideas, get
              technical help, and collaborate with the community.
            </p>
          </div>

          <ul className="mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-2">
            {channels.map((channel) => {
              const Icon = channel.Icon;
              return (
                <li key={channel.href}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focusable group flex h-full flex-col rounded-2xl border border-lavender-100 bg-lavender-50/50 p-6 text-left transition hover:-translate-y-0.5 hover:border-lavender-200 hover:bg-white hover:shadow-card"
                  >
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${channel.iconWrap}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                      {channel.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {channel.body}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-lavender-700">
                      {channel.cta}
                      <ArrowUpRight
                        className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="mt-10 text-center text-sm font-semibold tracking-wide text-lavender-700">
            Build. Share. Learn. Collaborate.
          </p>
        </div>
      </div>
    </section>
  );
}
