import Link from "next/link";
import { Beaker, FlaskConical, Package, Wrench } from "lucide-react";
import { workPath, type WorkItem } from "@/content/works";
import type { PackageDoc } from "@/content/packages";
import { toolkitPath, type ToolkitDoc } from "@/content/toolkits";

type CardKind = "research" | "poc" | "package" | "toolkit";

const icons = {
  research: Beaker,
  poc: FlaskConical,
  package: Package,
  toolkit: Wrench,
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
    <Link
      href={href}
      className="glass-card focusable group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-lavender-200 hover:shadow-lift dark:hover:border-white/20"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="icon-well h-10 w-10 transition group-hover:bg-gradient-primary group-hover:text-white">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="chip">{eyebrow}</span>
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {tags.slice(0, 3).map((tag) => (
          <li
            key={tag}
            className="chip-tag"
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

export function ToolkitCard({ item }: { item: ToolkitDoc }) {
  return (
    <WorkCard
      href={toolkitPath(item)}
      kind="toolkit"
      eyebrow="Toolkit"
      title={item.name}
      subtitle={item.subtitle}
      tags={item.tags}
    />
  );
}
