import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { lab } from "@/content/lab";

export function TwoStarts({
  showInstall = true,
  className,
}: {
  showInstall?: boolean;
  className?: string;
}) {
  return (
    <ul className={className ?? "grid gap-4 md:grid-cols-2"}>
      {lab.starts.map((start) => (
        <li key={start.id}>
          <Link
            href={start.href}
            className="glass-card focusable flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">
              Choose a start
            </p>
            <h2 className="mt-3 font-display text-xl font-semibold text-foreground">{start.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{start.when}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{start.detail}</p>
            {showInstall ? (
              <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-xs text-lavender-50">
                <code>{start.install}</code>
              </pre>
            ) : null}
            <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-lavender-800 dark:text-lavender-200">
              {start.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
