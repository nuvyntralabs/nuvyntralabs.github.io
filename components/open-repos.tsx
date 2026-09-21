"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, MessageSquareText, RefreshCw } from "lucide-react";
import {
  formatThreadDate,
  githubOrgLogin,
  hasOpenThreads,
  loadMissingDiscussions,
  loadOpenRepos,
  loadRepoDiscussions,
  openRepoSources,
  repoAnchor,
  type OpenRepo,
  type OpenThread,
} from "@/lib/open-repos";
import { cn } from "@/lib/utils";

type FilterId = "open" | "all" | "issues" | "discussions";
type SortId = "attention" | "activity" | "name";

export function OpenRepos() {
  const [repos, setRepos] = React.useState<OpenRepo[]>([]);
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">("loading");
  const [scan, setScan] = React.useState({ done: 0, total: 0 });
  const [error, setError] = React.useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = React.useState<Date | null>(null);
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<FilterId>("all");
  const [sort, setSort] = React.useState<SortId>("attention");
  const [openId, setOpenId] = React.useState<string | null>(null);
  const abortRef = React.useRef<AbortController | null>(null);

  const load = React.useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("loading");
    setError(null);
    setScan({ done: 0, total: 0 });
    setRepos([]);

    try {
      await loadOpenRepos({
        signal: controller.signal,
        onRepos: (next) => {
          setRepos(next);
          setStatus("ready");
          setUpdatedAt(new Date());
        },
      });
    } catch (cause) {
      if (cause instanceof DOMException && cause.name === "AbortError") return;
      setError(cause instanceof Error ? cause.message : "Could not load GitHub repositories.");
      setStatus((current) => (current === "ready" ? current : "error"));
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

  const openIssueCount = repos.reduce((sum, repo) => sum + repo.issues.length, 0);
  const openDiscussionCount = repos.reduce((sum, repo) => sum + repo.discussions.length, 0);
  const attentionCount = repos.filter(hasOpenThreads).length;
  const pendingDiscussions = repos.filter((repo) => repo.hasDiscussions && !repo.discussionsLoaded).length;
  const scanning = scan.total > 0 && scan.done < scan.total;

  async function loadDiscussions() {
    if (scanning || pendingDiscussions === 0) return;
    setScan({ done: 0, total: pendingDiscussions });
    try {
      await loadMissingDiscussions({
        repos,
        onRepos: setRepos,
        onProgress: (done, total) => setScan({ done, total }),
      });
    } catch (cause) {
      if (cause instanceof DOMException && cause.name === "AbortError") return;
      setError(cause instanceof Error ? cause.message : "Could not load discussions.");
    }
  }

  const visible = repos
    .filter((repo) => {
      if (filter === "open" && !hasOpenThreads(repo)) return false;
      if (filter === "issues" && repo.issues.length === 0) return false;
      if (filter === "discussions" && repo.discussions.length === 0) return false;
      const haystack = `${repo.fullName} ${repo.description ?? ""} ${repo.language ?? ""} ${repo.group ?? ""}`.toLowerCase();
      return haystack.includes(query.trim().toLowerCase());
    })
    .sort((left, right) => {
      if (sort === "name") return left.fullName.localeCompare(right.fullName);
      if (sort === "activity") return right.pushedAt.localeCompare(left.pushedAt);
      const leftScore = left.issues.length + left.discussions.length;
      const rightScore = right.issues.length + right.discussions.length;
      if (rightScore !== leftScore) return rightScore - leftScore;
      return right.pushedAt.localeCompare(left.pushedAt);
    });

  async function toggle(repo: OpenRepo) {
    const anchor = repoAnchor(repo.fullName);
    const next = openId === anchor ? null : anchor;
    setOpenId(next);
    window.history.replaceState(null, "", next ? `${window.location.pathname}#${next}` : window.location.pathname);

    if (!next || repo.discussionsLoaded || !repo.hasDiscussions) return;
    try {
      const loaded = await loadRepoDiscussions(repo);
      setRepos((current) => current.map((item) => (item.fullName === loaded.fullName ? loaded : item)));
    } catch {
      setRepos((current) =>
        current.map((item) => (item.fullName === repo.fullName ? { ...item, discussionsLoaded: true } : item)),
      );
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Live from GitHub</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground">
            Public repositories
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Fetched live from{" "}
            <a href={openRepoSources.org} className="text-link" target="_blank" rel="noopener noreferrer">
              github.com/{githubOrgLogin}
            </a>
            . The count is not fixed — a new public repo on the org shows up on the next refresh.
            Open issues come from GitHub search. Open discussions load per repo (site comment
            threads titled Website comments are hidden).
          </p>
        </div>
        <div className="flex flex-wrap gap-2 self-start">
          {pendingDiscussions > 0 ? (
            <button
              type="button"
              onClick={() => void loadDiscussions()}
              className="focusable btn-secondary"
              disabled={scanning}
            >
              <MessageSquareText className={cn("h-4 w-4", scanning && "animate-pulse")} aria-hidden="true" />
              {scanning ? `Discussions ${scan.done}/${scan.total}` : "Load discussions"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => void load()}
            className="focusable btn-secondary"
            disabled={status === "loading" && repos.length === 0}
          >
            <RefreshCw className={cn("h-4 w-4", status === "loading" && repos.length === 0 && "animate-spin")} aria-hidden="true" />
            Refresh
          </button>
        </div>
      </div>

      {updatedAt ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Last checked {updatedAt.toLocaleTimeString()} ·{" "}
          <a href={openRepoSources.issuesSearch} className="text-link" target="_blank" rel="noopener noreferrer">
            Open issues on GitHub
          </a>
          {" · "}
          <a href={openRepoSources.discussionsSearch} className="text-link" target="_blank" rel="noopener noreferrer">
            Open discussions on GitHub
          </a>
        </p>
      ) : null}

      {status === "loading" && repos.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">Loading public repositories…</p>
      ) : null}

      {status === "error" && repos.length === 0 ? (
        <div className="glass-card mt-10 p-6 text-center">
          <p className="font-display text-lg font-semibold text-foreground">GitHub is unavailable</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{error}</p>
          <a
            href={openRepoSources.org}
            className="focusable btn-primary mt-5"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open the organization
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      ) : null}

      {repos.length > 0 ? (
        <div className="glass-card mt-8 overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-display text-lg font-semibold text-foreground">Repositories</h3>
            <p className="text-sm text-muted-foreground">
              {repos.length} public · {attentionCount} with open threads · {openIssueCount} issues ·{" "}
              {openDiscussionCount} discussions
              {scanning ? ` · checking discussions ${scan.done} / ${scan.total}` : ""}
            </p>
          </div>

          <div className="border-b border-border px-5 py-4">
            <label htmlFor="open-repos-search" className="sr-only">
              Search repositories
            </label>
            <input
              id="open-repos-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter by repository, language, or description…"
              className="focusable input-search"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {(
                [
                  ["open", "Needs attention"],
                  ["all", "All repos"],
                  ["issues", "Open issues"],
                  ["discussions", "Open discussions"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFilter(id)}
                  className={cn(
                    "focusable rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm",
                    filter === id ? "bg-gradient-primary text-white shadow-glow" : "filter-idle",
                  )}
                >
                  {label}
                </button>
              ))}
              {(
                [
                  ["attention", "Open count"],
                  ["activity", "Recent activity"],
                  ["name", "Name"],
                ] as const
              ).map(([id, label]) => (
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
            </div>
          </div>

          <p className="px-5 pt-4 text-sm text-muted-foreground">
            {visible.length} {visible.length === 1 ? "repository" : "repositories"}
            {query.trim() ? " matching this filter" : ""}
          </p>

          <div className="mt-2 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[52rem] text-left text-sm">
              <caption className="sr-only">Public repositories with open issues and discussions</caption>
              <thead>
                <tr className="border-y border-border bg-muted/60 text-xs font-semibold uppercase tracking-[0.12em] text-lavender-600 dark:text-lavender-300">
                  <th className="px-5 py-3 font-semibold">Repository</th>
                  <th className="px-5 py-3 text-right font-semibold">Issues</th>
                  <th className="px-5 py-3 text-right font-semibold">Discussions</th>
                  <th className="px-5 py-3 font-semibold">Updated</th>
                  <th className="px-5 py-3 font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((repo) => {
                  const open = openId === repoAnchor(repo.fullName);
                  return (
                    <React.Fragment key={repo.fullName}>
                      <tr id={repoAnchor(repo.fullName)} className="border-t border-border/70">
                        <td className="px-5 py-3 align-middle">
                          <RepoTitle repo={repo} />
                        </td>
                        <td className="px-5 py-3 text-right align-middle tabular-nums font-semibold text-foreground">
                          {repo.issues.length}
                        </td>
                        <td className="px-5 py-3 text-right align-middle tabular-nums font-semibold text-foreground">
                          {repo.discussionsLoaded || repo.discussions.length > 0 ? repo.discussions.length : "—"}
                        </td>
                        <td className="px-5 py-3 align-middle text-muted-foreground">
                          {formatThreadDate(repo.pushedAt)}
                        </td>
                        <td className="px-5 py-3 align-middle">
                          <div className="flex justify-end gap-3">
                            {repo.href ? (
                              <Link href={repo.href} className="text-link text-xs font-semibold">
                                Docs
                              </Link>
                            ) : null}
                            <button
                              type="button"
                              className="focusable inline-flex items-center gap-1 text-xs font-semibold text-lavender-800 dark:text-lavender-200"
                              aria-expanded={open}
                              onClick={() => void toggle(repo)}
                            >
                              Threads
                              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {open ? (
                        <tr className="border-t border-border/70 bg-muted/40">
                          <td colSpan={5} className="px-5 py-4">
                            <ThreadBreakdown repo={repo} />
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
            {visible.map((repo) => {
              const open = openId === repoAnchor(repo.fullName);
              return (
                <li key={repo.fullName} id={`${repoAnchor(repo.fullName)}-mobile`} className="px-5 py-4">
                  <RepoTitle repo={repo} />
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{repo.issues.length}</span> issues ·{" "}
                    <span className="font-semibold text-foreground">
                      {repo.discussionsLoaded || repo.discussions.length > 0 ? repo.discussions.length : "—"}
                    </span>{" "}
                    discussions · {formatThreadDate(repo.pushedAt)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {repo.href ? (
                      <Link href={repo.href} className="text-link text-xs font-semibold">
                        Docs
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-lavender-800 dark:text-lavender-200"
                      aria-expanded={open}
                      onClick={() => void toggle(repo)}
                    >
                      {open ? "Hide threads" : "Show threads"}
                      <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
                    </button>
                  </div>
                  {open ? (
                    <div className="mt-4">
                      <ThreadBreakdown repo={repo} />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>

          {visible.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">
              {filter === "open" && !query.trim()
                ? pendingDiscussions > 0
                  ? "No open issues yet. Load discussions to include repos that only have open discussion threads, or switch to All repos."
                  : "No public repo has an open issue or open discussion right now. Switch to All repos to browse the organization."
                : "No repositories match that filter."}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function RepoTitle({ repo }: { repo: OpenRepo }) {
  return (
    <div>
      <a
        href={repo.url}
        className="break-all font-medium text-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {repo.name}
      </a>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        {repo.group ? <span className="chip">{repo.group}</span> : null}
        {repo.fork ? <span className="chip">Fork</span> : null}
        {repo.archived ? <span className="chip">Archived</span> : null}
        {repo.language ? <span className="text-xs text-muted-foreground">{repo.language}</span> : null}
      </div>
      {repo.description ? (
        <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground">{repo.description}</p>
      ) : null}
    </div>
  );
}

function ThreadBreakdown({ repo }: { repo: OpenRepo }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ThreadList
        title="Open issues"
        empty="No open issues."
        threads={repo.issues}
        href={`${repo.url}/issues?q=is%3Aissue+is%3Aopen`}
      />
      <ThreadList
        title="Open discussions"
        empty={
          repo.hasDiscussions
            ? repo.discussionsLoaded
              ? "No open discussions."
              : "Loading discussions…"
            : "Discussions are not enabled."
        }
        threads={repo.discussions}
        href={`${repo.url}/discussions?discussions_q=is%3Aopen`}
      />
    </div>
  );
}

function ThreadList({
  title,
  empty,
  threads,
  href,
}: {
  title: string;
  empty: string;
  threads: OpenThread[];
  href: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender-500">
          {title}
        </p>
        <a href={href} className="text-link text-xs font-semibold" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
      {threads.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {threads.map((thread) => (
            <li key={`${thread.url}-${thread.number}`} className="rounded-xl bg-card px-3 py-3">
              <a
                href={thread.url}
                className="text-sm font-medium text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                #{thread.number} {thread.title}
              </a>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                <MessageSquareText className="h-3.5 w-3.5" aria-hidden="true" />
                {thread.author}
                {thread.category ? ` · ${thread.category}` : ""}
                {thread.updatedAt ? ` · ${formatThreadDate(thread.updatedAt)}` : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
