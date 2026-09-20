"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, RefreshCw } from "lucide-react";
import {
  formatDownloads,
  formatReleaseDate,
  loadNugetStats,
  nugetOrgUrl,
  nugetOwnerId,
  nugetPackageAnchor,
  nugetSearchSources,
  type NugetPackageStats,
  type NugetVersionStats,
} from "@/lib/nuget-stats";
import { cn } from "@/lib/utils";

type SortId = "name" | "downloads" | "version";
type Channel = "released" | "all";

export function NugetStats() {
  const [stats, setStats] = React.useState<NugetPackageStats[]>([]);
  const [loaded, setLoaded] = React.useState(0);
  const [expected, setExpected] = React.useState(0);
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">("loading");
  const [datesStatus, setDatesStatus] = React.useState<"idle" | "loading" | "ready">("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = React.useState<Date | null>(null);
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortId>("name");
  const [channel, setChannel] = React.useState<Channel>("released");
  const [openId, setOpenId] = React.useState<string | null>(null);
  const abortRef = React.useRef<AbortController | null>(null);

  const load = React.useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("loading");
    setDatesStatus("idle");
    setError(null);
    setLoaded(0);
    setExpected(0);
    setStats([]);

    try {
      await loadNugetStats({
        signal: controller.signal,
        onPackages: (next) => {
          setStats(next);
          setStatus("ready");
          setDatesStatus("loading");
          setUpdatedAt(new Date());
        },
        onPackage: (pkg) => {
          setStats((current) => current.map((item) => (item.id === pkg.id ? pkg : item)));
        },
        onDatesProgress: (done, total) => {
          setLoaded(done);
          setExpected(total);
        },
      });
      if (!controller.signal.aborted) setDatesStatus("ready");
    } catch (cause) {
      if (cause instanceof DOMException && cause.name === "AbortError") return;
      setError(cause instanceof Error ? cause.message : "Could not load nuget.org statistics.");
      setStatus((current) => (current === "ready" ? current : "error"));
      setDatesStatus("idle");
    }
  }, []);

  React.useEffect(() => {
    void load();
    return () => abortRef.current?.abort();
  }, [load]);

  React.useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) setOpenId(hash);
  }, []);

  React.useEffect(() => {
    if (status !== "ready" || !openId) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const node = document.getElementById(mobile ? `${openId}-mobile` : openId);
    node?.scrollIntoView({ block: "start" });
  }, [openId, status]);

  const totalDownloads = stats.reduce((sum, item) => sum + item.totalDownloads, 0);

  const visible = stats
    .filter((item) => {
      const haystack = `${item.id} ${item.currentVersion ?? ""}`.toLowerCase();
      return haystack.includes(query.trim().toLowerCase());
    })
    .sort((left, right) => {
      if (sort === "downloads") return right.totalDownloads - left.totalDownloads || left.id.localeCompare(right.id);
      if (sort === "version") return (right.currentVersion ?? "").localeCompare(left.currentVersion ?? "", undefined, { numeric: true });
      return left.id.localeCompare(right.id);
    });

  function toggle(packageId: string) {
    const anchor = nugetPackageAnchor(packageId);
    const next = openId === anchor ? null : anchor;
    setOpenId(next);
    window.history.replaceState(null, "", next ? `${window.location.pathname}#${next}` : window.location.pathname);
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">nuget.org published packages</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground">
            Published packages
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            The same released IDs as the nuget.org owner dashboard for{" "}
            <a
              href={nugetSearchSources.profile}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {nugetOwnerId}
            </a>
            . Totals, listed versions, and each version&apos;s nuget.org release date are fetched
            live. Expand a row for version-wise downloads.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="focusable btn-secondary self-start"
          disabled={status === "loading" && stats.length === 0}
        >
          <RefreshCw className={cn("h-4 w-4", status === "loading" && stats.length === 0 && "animate-spin")} aria-hidden="true" />
          Refresh
        </button>
      </div>

      {updatedAt ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Last checked {updatedAt.toLocaleTimeString()} · Source{" "}
          <a
            href={nugetSearchSources.profile}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            nuget.org/profiles/{nugetOwnerId}
          </a>
        </p>
      ) : null}

      {status === "loading" && stats.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Loading published packages…
        </p>
      ) : null}

      {status === "error" ? (
        <div className="glass-card mt-10 p-6 text-center">
          <p className="font-display text-lg font-semibold text-foreground">nuget.org is unavailable</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{error}</p>
          <a
            href={nugetSearchSources.profile}
            className="focusable btn-primary mt-5"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open nuget.org profile
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      ) : null}

      {stats.length > 0 ? (
        <div className="glass-card mt-8 overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-display text-lg font-semibold text-foreground">Published packages</h3>
            <p className="text-sm text-muted-foreground">
              {formatDownloads(stats.length)} packages / {formatDownloads(totalDownloads)} downloads
              {datesStatus === "loading"
                ? ` · loading release dates ${loaded} / ${expected || stats.length}`
                : ""}
            </p>
          </div>

          <div className="border-b border-border px-5 py-4">
            <label htmlFor="nuget-stats-search" className="sr-only">
              Search packages
            </label>
            <input
              id="nuget-stats-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter by package ID or version…"
              className="focusable input-search"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {([
                ["name", "Package ID"],
                ["downloads", "Downloads"],
                ["version", "Latest version"],
              ] as const).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSort(id)}
                  className={cn(
                    "focusable rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm",
                    sort === id ? "bg-gradient-primary text-white shadow-glow" : "filter-idle",
                  )}
                >
                  {label}
                </button>
              ))}
              {([
                ["released", "Released versions"],
                ["all", "Include prerelease"],
              ] as const).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setChannel(id)}
                  className={cn(
                    "focusable rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm",
                    channel === id ? "bg-gradient-primary text-white shadow-glow" : "filter-idle",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <p className="px-5 pt-4 text-sm text-muted-foreground">
            {visible.length} package{visible.length === 1 ? "" : "s"}
            {query.trim() ? " matching this filter" : ""}
          </p>

          <div className="mt-2 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[48rem] text-left text-sm">
              <caption className="sr-only">Published NuGet packages and downloads</caption>
              <thead>
                <tr className="border-y border-border bg-muted/60 text-xs font-semibold uppercase tracking-[0.12em] text-lavender-600 dark:text-lavender-300">
                  <th className="px-5 py-3 font-semibold">Package ID</th>
                  <th className="px-5 py-3 font-semibold">Owner</th>
                  <th className="px-5 py-3 text-right font-semibold">Downloads</th>
                  <th className="px-5 py-3 font-semibold">Latest version</th>
                  <th className="px-5 py-3 text-right font-semibold">Versions</th>
                  <th className="px-5 py-3 font-semibold"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {visible.map((item) => {
                  const open = openId === nugetPackageAnchor(item.id);
                  const versions = versionsForChannel(item.versions, channel);
                  return (
                    <React.Fragment key={item.id}>
                      <tr id={nugetPackageAnchor(item.id)} className="border-t border-border/70">
                        <td className="px-5 py-3 align-middle">
                          <a
                            href={item.nugetUrl}
                            className="break-all font-medium text-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.id}
                          </a>
                        </td>
                        <td className="px-5 py-3 align-middle text-muted-foreground">
                          {item.owners[0] ?? nugetOwnerId}
                        </td>
                        <td className="px-5 py-3 text-right align-middle font-semibold tabular-nums text-foreground">
                          {formatDownloads(item.totalDownloads)}
                        </td>
                        <td className="px-5 py-3 align-middle">
                          {item.currentVersion ? (
                            <div>
                              <code className="font-mono text-xs text-foreground">{item.currentVersion}</code>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {formatReleaseDate(latestPublishedAt(item))}
                              </p>
                            </div>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="px-5 py-3 text-right align-middle tabular-nums text-muted-foreground">
                          {item.versions.length}
                        </td>
                        <td className="px-5 py-3 align-middle">
                          <div className="flex justify-end gap-2">
                            <Link href={item.href} className="text-link text-xs font-semibold">
                              Docs
                            </Link>
                            <button
                              type="button"
                              className="focusable inline-flex items-center gap-1 text-xs font-semibold text-lavender-800 dark:text-lavender-200"
                              aria-expanded={open}
                              onClick={() => toggle(item.id)}
                            >
                              Versions
                              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {open ? (
                        <tr className="border-t border-border/70 bg-muted/40">
                          <td colSpan={6} className="px-5 py-4">
                            <VersionBreakdown item={item} versions={versions} />
                          </td>
                        </tr>
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <ul className="divide-y divide-border md:hidden">
            {visible.map((item) => {
              const open = openId === nugetPackageAnchor(item.id);
              const versions = versionsForChannel(item.versions, channel);
              return (
                <li key={item.id} id={`${nugetPackageAnchor(item.id)}-mobile`} className="px-5 py-4">
                  <a
                    href={item.nugetUrl}
                    className="break-all font-medium text-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.id}
                  </a>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{formatDownloads(item.totalDownloads)}</span>
                    {" "}downloads · {item.currentVersion ?? "unlisted"}
                    {latestPublishedAt(item) ? ` · ${formatReleaseDate(latestPublishedAt(item))}` : ""}
                    {" · "}{item.owners[0] ?? nugetOwnerId}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <Link href={item.href} className="text-link text-xs font-semibold">
                      Docs
                    </Link>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-lavender-800 dark:text-lavender-200"
                      aria-expanded={open}
                      onClick={() => toggle(item.id)}
                    >
                      {open ? "Hide versions" : `${item.versions.length} versions`}
                      <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
                    </button>
                  </div>
                  {open ? (
                    <div className="mt-4">
                      <VersionBreakdown item={item} versions={versions} />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>

          {visible.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">
              No published packages match that filter.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function VersionBreakdown({
  item,
  versions,
}: {
  item: NugetPackageStats;
  versions: NugetVersionStats[];
}) {
  const totalDownloads = versions.reduce((sum, version) => sum + version.downloads, 0);
  const maxDownloads = Math.max(...versions.map((version) => version.downloads), 1);

  if (versions.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No released versions are listed. Switch to include prerelease.
      </p>
    );
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender-500">
        Downloads by version
      </p>
      <ul className="mt-3 space-y-3 sm:hidden">
        {versions.map((version) => {
          const bar = Math.round((version.downloads / maxDownloads) * 100);
          const share = totalDownloads > 0 ? Math.round((version.downloads / totalDownloads) * 100) : 0;
          return (
            <li key={version.version} className="rounded-xl bg-card px-3 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <VersionLabel packageId={item.id} version={version} latest={item.currentVersion} />
                <p className="text-sm font-semibold text-foreground">
                  {formatDownloads(version.downloads)}
                  <span className="ml-1 text-xs font-medium text-muted-foreground">({share}%)</span>
                </p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Released {formatReleaseDate(version.publishedAt)}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${bar}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-3 hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead>
            <tr className="text-xs font-semibold uppercase tracking-[0.12em] text-lavender-500">
              <th className="pb-2 pr-4 font-semibold">Version</th>
              <th className="pb-2 pr-4 font-semibold">Released</th>
              <th className="pb-2 pr-4 text-right font-semibold">Downloads</th>
              <th className="pb-2 font-semibold">Share</th>
            </tr>
          </thead>
          <tbody>
            {versions.map((version) => {
              const bar = Math.round((version.downloads / maxDownloads) * 100);
              const share = totalDownloads > 0 ? Math.round((version.downloads / totalDownloads) * 100) : 0;
              return (
                <tr key={version.version} className="border-t border-border/70">
                  <td className="py-2.5 pr-4">
                    <VersionLabel packageId={item.id} version={version} latest={item.currentVersion} />
                  </td>
                  <td className="py-2.5 pr-4 text-muted-foreground">
                    {formatReleaseDate(version.publishedAt)}
                  </td>
                  <td className="py-2.5 pr-4 text-right font-semibold tabular-nums">
                    {formatDownloads(version.downloads)}
                  </td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 min-w-[6rem] flex-1 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-gradient-primary" style={{ width: `${bar}%` }} />
                      </div>
                      <span className="w-10 text-right text-xs text-muted-foreground">{share}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function VersionLabel({
  packageId,
  version,
  latest,
}: {
  packageId: string;
  version: NugetVersionStats;
  latest: string | null;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={`${nugetOrgUrl(packageId)}/${version.version}`}
        className="font-mono text-xs text-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {version.version}
      </a>
      {version.version === latest ? (
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200">
          Latest
        </span>
      ) : null}
      {version.prerelease ? <span className="chip">Prerelease</span> : null}
    </div>
  );
}

function versionsForChannel(versions: NugetVersionStats[], channel: Channel): NugetVersionStats[] {
  if (channel === "all") return versions;
  const released = versions.filter((item) => !item.prerelease);
  return released.length > 0 ? released : versions;
}

function latestPublishedAt(item: NugetPackageStats): string | null {
  return item.versions.find((version) => version.version === item.currentVersion)?.publishedAt ?? null;
}
