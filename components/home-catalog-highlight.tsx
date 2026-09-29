"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDownloads, loadNugetStats, type NugetPackageStats } from "@/lib/nuget-stats";

const catalogHref = "/packages/";

export function HomeCatalogHighlight() {
  const [stats, setStats] = React.useState<NugetPackageStats[]>([]);
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">("loading");
  const abortRef = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    void loadNugetStats({
      signal: controller.signal,
      includePublishedDates: false,
      onPackages: (next) => {
        setStats(next);
        setStatus("ready");
      },
    }).catch((cause) => {
      if (cause instanceof DOMException && cause.name === "AbortError") return;
      setStatus((current) => (current === "ready" ? current : "error"));
    });

    return () => controller.abort();
  }, []);

  const totalDownloads = stats.reduce((sum, item) => sum + item.totalDownloads, 0);
  const topPackages = [...stats]
    .sort((left, right) => right.totalDownloads - left.totalDownloads || left.id.localeCompare(right.id))
    .slice(0, 3);
  const ready = stats.length > 0;

  return (
    <div className="rounded-[1.75rem] border border-white/80 bg-white/70 p-5 shadow-lift backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lavender-700 dark:text-lavender-300">
        Published packages
      </p>

      {ready ? (
        <dl className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-lavender-100 bg-white/90 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
            <dt className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">Total packages</dt>
            <dd className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground">
              {formatDownloads(stats.length)}
            </dd>
          </div>
          <div className="rounded-2xl border border-lavender-100 bg-white/90 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
            <dt className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">Total downloads</dt>
            <dd className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground">
              {formatDownloads(totalDownloads)}
            </dd>
          </div>
        </dl>
      ) : status === "error" ? (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          nuget.org package totals are unavailable right now.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3" aria-busy="true" aria-live="polite">
          <div className="h-[4.5rem] animate-pulse rounded-2xl bg-lavender-100/80 dark:bg-white/10" />
          <div className="h-[4.5rem] animate-pulse rounded-2xl bg-lavender-100/80 dark:bg-white/10" />
        </div>
      )}

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-lavender-700 dark:text-lavender-300">
        Most downloaded
      </p>
      {ready ? (
        <ol className="mt-3 space-y-2">
          {topPackages.map((item, index) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="focusable flex items-center gap-3 rounded-2xl border border-lavender-100 bg-white/90 px-3 py-2.5 transition hover:border-lavender-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20"
              >
                <span className="text-xs font-semibold text-lavender-500">{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{item.id}</span>
                <span className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
                  {formatDownloads(item.totalDownloads)}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      ) : status === "error" ? null : (
        <div className="mt-3 space-y-2" aria-hidden="true">
          <div className="h-11 animate-pulse rounded-2xl bg-lavender-100/80 dark:bg-white/10" />
          <div className="h-11 animate-pulse rounded-2xl bg-lavender-100/80 dark:bg-white/10" />
          <div className="h-11 animate-pulse rounded-2xl bg-lavender-100/80 dark:bg-white/10" />
        </div>
      )}

      <Link href={catalogHref} className="focusable mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-link">
        Explore entire Product Catalog
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
