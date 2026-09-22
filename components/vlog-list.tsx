"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { VLOG_SERIES } from "@/lib/devto-draft";
import { siteConfig } from "@/lib/site";

type PublishedVlog = {
  id: number;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  tags: string[];
  readingTimeMinutes: number;
};

type DevArticle = {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string | null;
  tag_list: string[] | string;
  reading_time_minutes: number;
};

type LoadState =
  | { status: "loading" }
  | { status: "ready"; vlogs: PublishedVlog[] }
  | { status: "error" };

function formatPublishedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

async function findSeriesId(name: string): Promise<number | null> {
  const response = await fetch(`https://dev.to/${siteConfig.devtoUsername}/series`, { cache: "no-store" });
  if (!response.ok) return null;
  const html = await response.text();
  const document = new DOMParser().parseFromString(html, "text/html");
  const link = [...document.querySelectorAll("a")].find((anchor) => {
    const label = anchor.textContent?.trim().toLowerCase() ?? "";
    return label.startsWith(name.toLowerCase()) && /\/series\/\d+/.test(anchor.getAttribute("href") ?? "");
  });
  const id = link?.getAttribute("href")?.match(/\/series\/(\d+)/)?.[1];
  return id ? Number(id) : null;
}

async function fetchSeriesPage(seriesId: number, page: number): Promise<DevArticle[]> {
  const url = new URL("https://dev.to/api/articles");
  url.searchParams.set("collection_id", String(seriesId));
  url.searchParams.set("per_page", "30");
  url.searchParams.set("page", String(page));
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error("DEV did not return published vlogs.");
  const payload = (await response.json()) as DevArticle[];
  if (!Array.isArray(payload)) throw new Error("DEV did not return published vlogs.");
  return payload;
}

function toPublishedVlog(article: DevArticle): PublishedVlog | null {
  if (!article.published_at) return null;
  const tags = Array.isArray(article.tag_list)
    ? article.tag_list
    : article.tag_list.split(",").map((tag) => tag.trim()).filter(Boolean);
  return {
    id: article.id,
    title: article.title,
    description: article.description,
    url: article.url,
    publishedAt: article.published_at,
    tags,
    readingTimeMinutes: article.reading_time_minutes,
  };
}

async function loadPublishedVlogs(): Promise<PublishedVlog[]> {
  const seriesId = await findSeriesId(VLOG_SERIES);
  if (!seriesId) return [];
  const vlogs: PublishedVlog[] = [];
  const seen = new Set<number>();
  for (let page = 1; page <= 10; page += 1) {
    let payload = await fetchSeriesPage(seriesId, page);
    if (page === 1 && payload.length === 0) payload = await fetchSeriesPage(seriesId, 0);
    if (payload.length === 0) break;
    let added = 0;
    for (const article of payload) {
      if (seen.has(article.id)) continue;
      const vlog = toPublishedVlog(article);
      if (!vlog) continue;
      seen.add(article.id);
      vlogs.push(vlog);
      added += 1;
    }
    if (payload.length < 30 || added === 0) break;
  }
  return vlogs;
}

export function VlogList() {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    loadPublishedVlogs()
      .then((vlogs) => {
        if (!cancelled) setState({ status: "ready", vlogs });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return <p className="text-sm text-muted-foreground">Loading published vlogs…</p>;
  }

  if (state.status === "error") {
    return (
      <p role="alert" className="text-sm text-red-700 dark:text-red-300">
        Published vlogs could not be loaded.
      </p>
    );
  }

  if (state.vlogs.length === 0) {
    return <p className="text-sm text-muted-foreground">No published vlogs in the {VLOG_SERIES} series yet.</p>;
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {state.vlogs.length} published {state.vlogs.length === 1 ? "vlog" : "vlogs"} in {VLOG_SERIES}
      </p>
      <ul className="mt-8 grid gap-4">
        {state.vlogs.map((vlog) => (
          <li key={vlog.id}>
            <a
              href={vlog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="focusable glass-card group block p-6 transition hover:-translate-y-0.5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender-700 dark:text-lavender-300">
                {formatPublishedAt(vlog.publishedAt)}
                {vlog.readingTimeMinutes ? ` · ${vlog.readingTimeMinutes} min read` : ""}
              </p>
              <h2 className="mt-3 flex items-start justify-between gap-3 font-display text-2xl font-bold tracking-tight text-foreground">
                {vlog.title}
                <ArrowUpRight
                  className="mt-1 h-5 w-5 shrink-0 text-lavender-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </h2>
              {vlog.description ? (
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{vlog.description}</p>
              ) : null}
              {vlog.tags.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {vlog.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-lavender-200 bg-lavender-50 px-3 py-1 text-xs font-semibold text-lavender-800 dark:border-white/15 dark:bg-white/10 dark:text-lavender-100"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
