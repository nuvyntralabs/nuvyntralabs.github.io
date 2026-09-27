import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CtaLink = { href: string; label: string; tone?: "primary" | "dark" };

const defaultLinks: CtaLink[] = [
  { href: "/packages/", label: "Browse components", tone: "primary" },
  { href: "/toolkits/nuvyn/", label: "Start with Nuvyn", tone: "primary" },
  { href: "/contact/", label: "Contact the lab", tone: "dark" },
];

export function CtaBand({
  eyebrow = "Next step",
  title = "Build with Nuvyntra Labs",
  description = "Use the component library in an existing app, or start a new host with Nuvyn. Same packages either way.",
  links = defaultLinks,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  links?: CtaLink[];
}) {
  return (
    <section className="container pb-20 sm:pb-28">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-ink px-6 py-12 text-white sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-30" />
        <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-lavender-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="relative">
          <p className="eyebrow-on-dark">{eyebrow}</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-lavender-100/80">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={item.tone === "dark" ? "focusable btn-on-dark" : "focusable btn-primary"}
              >
                {item.label}
                {item.tone === "dark" ? null : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
