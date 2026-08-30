import Link from "next/link";

export function SectionIntro({
  eyebrow,
  title,
  description,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground">{title}</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
      </div>
      {href && cta ? (
        <Link
          href={href}
          className="focusable btn-secondary shrink-0"
        >
          {cta}
        </Link>
      ) : null}
    </div>
  );
}
