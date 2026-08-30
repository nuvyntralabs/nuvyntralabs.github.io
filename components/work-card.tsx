import Link from "next/link";
import { Beaker, FlaskConical, Package } from "lucide-react";
import { workPath, type WorkItem } from "@/content/works";
import type { PackageDoc } from "@/content/packages";

type CardKind = "research" | "poc" | "package";

const icons = {
  research: Beaker,
  poc: FlaskConical,
  package: Package,
} as const;

export function WorkCard({
  href,
  kind,
  eyebrow,
  title,
  subtitle,
  tags,
}: {
  href: string;
  kind: CardKind;
  eyebrow: string;
  title: string;
  subtitle: string;
  tags: string[];
}) {
  const Icon = icons[kind];

  return (
    <Link href={href} className="glass-card focusable flex h-full flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-lavender-100 text-lavender-700">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="rounded-full bg-lavender-50 px-2.5 py-1 text-xs font-medium text-lavender-800">
          {eyebrow}
        </span>
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {tags.slice(0, 3).map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-lavender-100 bg-white px-2 py-0.5 text-[11px] font-medium text-lavender-700"
          >
            {tag}
          </li>
        ))}
      </ul>
    </Link>
  );
}

export function ResearchCard({ work }: { work: WorkItem }) {
  return (
    <WorkCard
      href={workPath(work)}
      kind="research"
      eyebrow={work.language ?? "R&D"}
      title={work.title}
      subtitle={work.subtitle}
      tags={work.tags}
    />
  );
}

export function PocCard({ work }: { work: WorkItem }) {
  return (
    <WorkCard
      href={workPath(work)}
      kind="poc"
      eyebrow={work.fork ? "Fork" : (work.language ?? "POC")}
      title={work.title}
      subtitle={work.subtitle}
      tags={work.tags}
    />
  );
}

export function PackageCard({ item }: { item: PackageDoc }) {
  return (
    <WorkCard
      href={`/packages/${item.slug}/`}
      kind="package"
      eyebrow={item.group}
      title={item.name}
      subtitle={item.subtitle}
      tags={item.tags}
    />
  );
}
