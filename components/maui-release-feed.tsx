"use client";

import * as React from "react";
import { ArrowUpRight, Copy, Check, RefreshCw, Rss } from "lucide-react";
import {
  channelLabel,
  fetchMauiReleases,
  formatReleaseDate,
  mauiReleaseSources,
  type MauiRelease,
} from "@/lib/maui-releases";
import { cn } from "@/lib/utils";

type Filter = "all" | "stable" | "preview";

export function MauiReleaseFeed() {
  const [releases, setReleases] = React.useState<MauiRelease[]>([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(false);
  const [filter, setFilter] = React.useState<Filter>("all");
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">("loading");
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = React.useState<Date | null>(null);

  const load = React.useCallback(async (nextPage: number, replace: boolean) => {
    if (replace) {
      setStatus("loading");
      setError(null);
    } else {
      setLoadingMore(true);
    }

    try {
      const result = await fetchMauiReleases(nextPage);
      setReleases((current) => (replace ? result.releases : [...current, ...result.releases]));
      setHasMore(result.hasMore);
      setPage(nextPage);
      setUpdatedAt(new Date());
      setStatus("ready");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load GitHub releases.");
      if (replace) setStatus("error");
    } finally {
      setLoadingMore(false);
    }
  }, []);

  React.useEffect(() => {
    void load(1, true);
  }, [load]);

  const latestStableId = releases.find((item) => !item.prerelease)?.id;
  const latestPreview = releases.find((item) => item.prerelease);

  const visible = releases.filter((item) => {
    if (filter === "stable" && item.prerelease) return false;
    if (filter === "preview" && !item.prerelease) return false;
    const haystack = `${item.name} ${item.tag} ${item.summary} ${item.changeAreas.join(" ")}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Live from GitHub</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground">
            Release feed
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            This list is fetched from the official{" "}
            <a
              href={mauiReleaseSources.githubReleases}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/dotnet/maui/releases
            </a>{" "}
            API when you open the page. New tags appear here without a site rebuild.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={mauiReleaseSources.githubAtom}
            className="focusable btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Rss className="h-4 w-4" aria-hidden="true" />
            Official Atom
          </a>
          <button
            type="button"
            onClick={() => void load(1, true)}
            className="focusable btn-secondary"
            disabled={status === "loading"}
          >
            <RefreshCw className={cn("h-4 w-4", status === "loading" && "animate-spin")} aria-hidden="true" />
            Refresh
          </button>
        </div>
      </div>

      {updatedAt ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Last checked {updatedAt.toLocaleTimeString()} · Source{" "}
          <a
            href={mauiReleaseSources.githubReleases}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {mauiReleaseSources.githubReleases}
          </a>
        </p>
      ) : null}

      {status === "ready" && (latestStableId || latestPreview) ? (
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {releases
            .filter((item) => item.id === latestStableId || item.id === latestPreview?.id)
            .map((item) => (
              <HighlightCard key={item.id} release={item} latestStableId={latestStableId} />
            ))}
        </div>
      ) : null}

      <div className="mt-10 mx-auto max-w-xl">
        <label htmlFor="release-search" className="sr-only">
          Search releases
        </label>
        <input
          id="release-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search 10.0.101, CollectionView, workload…"
          className="focusable input-search"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter releases">
        {(["all", "stable", "preview"] as Filter[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={cn(
              "focusable rounded-full px-3 py-1.5 text-xs font-semibold capitalize sm:text-sm",
              filter === id
                ? "bg-gradient-primary text-white shadow-glow"
                : "filter-idle",
            )}
          >
            {id}
          </button>
        ))}
      </div>

      {status === "loading" ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">Loading official GitHub releases…</p>
      ) : null}

      {status === "error" ? (
        <div className="glass-card mt-10 p-6 text-center">
          <p className="font-display text-lg font-semibold text-foreground">GitHub feed is unavailable</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {error} Open the original Microsoft list instead.
          </p>
          <a
            href={mauiReleaseSources.githubReleases}
            className="focusable btn-primary mt-5"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open GitHub releases
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      ) : null}

      {status === "ready" ? (
        <>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {visible.length} release{visible.length === 1 ? "" : "s"} shown
          </p>
          <ul className="mt-8 space-y-4">
            {visible.map((release) => (
              <li key={release.id}>
                <ReleaseCard release={release} latestStableId={latestStableId} />
              </li>
            ))}
          </ul>
          {visible.length === 0 ? (
            <p className="mt-8 text-center text-sm text-muted-foreground">No releases match that filter.</p>
          ) : null}
          {hasMore ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => void load(page + 1, false)}
                className="focusable btn-secondary"
                disabled={loadingMore}
              >
                {loadingMore ? "Loading…" : "Load older releases"}
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

function HighlightCard({
  release,
  latestStableId,
}: {
  release: MauiRelease;
  latestStableId?: number;
}) {
  const channel = channelLabel(release, latestStableId);
  return (
    <article className="glass-card p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="eyebrow">{channel === "Preview" ? "Newest preview" : "Newest stable"}</span>
        <ChannelBadge channel={channel} />
      </div>
      <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">{release.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{formatReleaseDate(release.publishedAt)}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{release.summary}</p>
      <OriginalLink href={release.htmlUrl} />
    </article>
  );
}

function ReleaseCard({
  release,
  latestStableId,
}: {
  release: MauiRelease;
  latestStableId?: number;
}) {
  const [open, setOpen] = React.useState(false);
  const channel = channelLabel(release, latestStableId);

  return (
    <article className="glass-card p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <ChannelBadge channel={channel} />
            <p className="text-sm text-muted-foreground">{formatReleaseDate(release.publishedAt)}</p>
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold text-foreground">{release.name}</h3>
          <p className="mt-1 font-mono text-xs text-lavender-700 dark:text-lavender-300">{release.tag}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{release.summary}</p>
          {release.changeAreas.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {release.changeAreas.map((area) => (
                <li
                  key={area}
                  className="chip"
                >
                  {area}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
          <a
            href={release.htmlUrl}
            className="focusable btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Official notes
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <button type="button" className="focusable btn-secondary" onClick={() => setOpen((value) => !value)}>
            {open ? "Hide details" : "Workload details"}
          </button>
        </div>
      </div>

      <OriginalLink href={release.htmlUrl} />

      {open ? (
        <div className="mt-5 space-y-4 border-t border-border pt-5">
          {release.recommendedTools.length > 0 ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">
                Recommended tools
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {release.recommendedTools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {release.installCommand ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lavender-500">
                Workload command
              </p>
              <pre className="mt-2 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
                <code>{release.installCommand}</code>
              </pre>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Full install steps stay on the official GitHub notes for this tag.
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            Published by @{release.author}. Changelog, NuGet tables, and contributors are on the original page.
          </p>
        </div>
      ) : null}
    </article>
  );
}

function ChannelBadge({ channel }: { channel: "Latest" | "Preview" | "Stable" }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-xs font-semibold",
        channel === "Latest" && "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200",
        channel === "Preview" && "bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200",
        channel === "Stable" && "chip",
      )}
    >
      {channel}
    </span>
  );
}

function OriginalLink({ href }: { href: string }) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-2 rounded-xl bg-muted px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
      <p className="min-w-0 text-xs leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">Original: </span>
        <a href={href} className="break-all hover:text-foreground" target="_blank" rel="noopener noreferrer">
          {href}
        </a>
      </p>
      <button
        type="button"
        onClick={() => void copy()}
        className="focusable btn-secondary !px-2.5 !py-1 text-xs"
      >
        {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
