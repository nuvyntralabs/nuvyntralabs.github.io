"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { VLOG_SERIES } from "@/lib/devto-draft";
import { siteConfig } from "@/lib/site";

const PAGE_SIZE = 5;

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
  collection_id?: number | null;
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

async function fetchAuthorArticles(): Promise<DevArticle[]> {
  const articles: DevArticle[] = [];
  for (let page = 1; page <= 10; page += 1) {
    const url = new URL("https://dev.to/api/articles");
    url.searchParams.set("username", siteConfig.devtoUsername);
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) break;
    const payload = (await response.json()) as DevArticle[];
    if (!Array.isArray(payload) || payload.length === 0) break;
    articles.push(...payload);
    if (payload.length < 100) break;
  }
  return articles;
}

async function fetchArticle(id: number): Promise<DevArticle | null> {
  const response = await fetch(`https://dev.to/api/articles/${id}`, { cache: "no-store" });
  if (!response.ok) return null;
  const payload = (await response.json()) as DevArticle;
  return payload && typeof payload.id === "number" ? payload : null;
}

function parseSeriesStories(html: string): PublishedVlog[] {
  const document = new DOMParser().parseFromString(html, "text/html");
  const vlogs: PublishedVlog[] = [];
  const seen = new Set<number>();
  for (const card of document.querySelectorAll("[data-feed-content-id]")) {
    const id = Number(card.getAttribute("data-feed-content-id"));
    if (!id || seen.has(id)) continue;
    const titleLink = card.querySelector("h2 a") ?? card.querySelector("a.crayons-story__hidden-navigation-link");
    const title = titleLink?.textContent?.replace(/\s+/g, " ").trim() ?? "";
    const url = titleLink?.getAttribute("href") ?? "";
    if (!title || !url) continue;
    const tags = [...card.querySelectorAll(".crayons-story__tags a")].flatMap((anchor) => {
      const tag = anchor.textContent?.replace(/\s+/g, "").replace(/^#/, "") ?? "";
      return tag ? [tag] : [];
    });
    const readingLabel = card.querySelector(".crayons-story__save")?.textContent ?? "";
    seen.add(id);
    vlogs.push({
      id,
      title,
      description: "",
      url,
      publishedAt: card.querySelector("time")?.getAttribute("datetime") ?? "",
      tags,
      readingTimeMinutes: Number(readingLabel.match(/(\d+)\s*min/i)?.[1] ?? 0),
    });
  }
  return vlogs;
}

// The articles API list is edge-cached for about two days, so a collection query
// keeps returning however many vlogs existed the first time that URL was cached.
// The series page itself revalidates and includes posts published since then.
async function fetchSeriesStories(seriesId: number): Promise<PublishedVlog[]> {
  const stories: PublishedVlog[] = [];
  const seen = new Set<number>();
  for (let page = 1; page <= 10; page += 1) {
    const url = new URL(`https://dev.to/${siteConfig.devtoUsername}/series/${seriesId}`);
    if (page > 1) url.searchParams.set("page", String(page));
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) break;
    const html = await response.text();
    let added = 0;
    for (const story of parseSeriesStories(html)) {
      if (seen.has(story.id)) continue;
      seen.add(story.id);
      stories.push(story);
      added += 1;
    }
    if (added === 0 || !html.includes(`page=${page + 1}`)) break;
  }
  return stories;
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

  const [authorArticles, seriesStories] = await Promise.all([
    fetchAuthorArticles(),
    fetchSeriesStories(seriesId),
  ]);

  const byId = new Map<number, PublishedVlog>();
  for (const article of authorArticles) {
    if (article.collection_id !== seriesId) continue;
    const vlog = toPublishedVlog(article);
    if (vlog) byId.set(vlog.id, vlog);
  }

  const missing = seriesStories.filter((story) => !byId.has(story.id));
  const details = await Promise.all(missing.map((story) => fetchArticle(story.id)));
  missing.forEach((story, index) => {
    const article = details[index];
    const vlog = article ? toPublishedVlog(article) : null;
    byId.set(story.id, vlog ?? story);
  });

  return [...byId.values()].sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
}

function pageItems(current: number, count: number): Array<number | "gap"> {
  if (count <= 7) return Array.from({ length: count }, (_, index) => index + 1);
  const wanted = [1, count, current - 1, current, current + 1].filter((page) => page >= 1 && page <= count);
  const pages = [...new Set(wanted)].sort((left, right) => left - right);
  const items: Array<number | "gap"> = [];
  for (const page of pages) {
    const previous = items[items.length - 1];
    if (typeof previous === "number" && page - previous > 1) items.push("gap");
    items.push(page);
  }
  return items;
}

export function VlogList() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLUListElement>(null);
  const skipScroll = useRef(true);

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

  useEffect(() => {
    if (skipScroll.current) {
      skipScroll.current = false;
      return;
    }
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

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

  const pageCount = Math.ceil(state.vlogs.length / PAGE_SIZE);
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = state.vlogs.slice(start, start + PAGE_SIZE);
  const pages = pageItems(currentPage, pageCount);

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {state.vlogs.length} published {state.vlogs.length === 1 ? "vlog" : "vlogs"} in {VLOG_SERIES}, newest first
      </p>
      <ul ref={listRef} className="mt-8 grid scroll-mt-24 gap-4">
        {visible.map((vlog) => (
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
      {pageCount > 1 ? (
        <nav aria-label="Vlog pages" className="mt-8 flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="focusable btn-secondary px-4 py-2 disabled:pointer-events-none disabled:opacity-40"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Previous
          </button>
          {pages.map((item, index) =>
            item === "gap" ? (
              <span key={`gap-${index}`} className="px-1 text-sm text-muted-foreground" aria-hidden="true">
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                className={
                  item === currentPage
                    ? "focusable btn-primary min-w-10 px-3 py-2"
                    : "focusable btn-secondary min-w-10 px-3 py-2"
                }
                aria-current={item === currentPage ? "page" : undefined}
                aria-label={`Page ${item}`}
                onClick={() => setPage(item)}
              >
                {item}
              </button>
            ),
          )}
          <button
            type="button"
            className="focusable btn-secondary px-4 py-2 disabled:pointer-events-none disabled:opacity-40"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            Next
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </nav>
      ) : null}
    </div>
  );
}
