"use client";

import { useEffect, useId, useRef, useState } from "react";
import { GitBranch, MessagesSquare } from "lucide-react";
import {
  commentsAppearance,
  commentsRepoUrl,
  getCommentRepo,
  isGiscusConfigured,
  type DiscussionTarget,
} from "@/lib/comments";
import { cn } from "@/lib/utils";

type Engine = "giscus" | "utterances";

const engines: { id: Engine; label: string; hint: string }[] = [
  { id: "giscus", label: "Giscus", hint: "GitHub Discussions" },
  { id: "utterances", label: "Utterances", hint: "GitHub Issues" },
];

export function ComponentDiscussion({
  target,
  className,
}: {
  target: DiscussionTarget;
  className?: string;
}) {
  const repo = getCommentRepo(target.github);
  const giscusReady = isGiscusConfigured(repo);
  const utterancesReady = Boolean(repo?.hasIssues);
  const [engine, setEngine] = useState<Engine>(giscusReady ? "giscus" : "utterances");
  const hostRef = useRef<HTMLDivElement>(null);
  const tablistId = useId();
  const paused =
    !repo ||
    (engine === "giscus" && !giscusReady) ||
    (engine === "utterances" && !utterancesReady);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !repo || paused) return;

    let cancelled = false;
    let timeout = 0;

    const inject = () => {
      if (cancelled || !host.isConnected) return;

      const script = document.createElement("script");
      script.async = true;
      script.crossOrigin = "anonymous";

      if (engine === "giscus" && repo.giscus) {
        script.src = "https://giscus.app/client.js";
        script.setAttribute("data-repo", repo.repo);
        script.setAttribute("data-repo-id", repo.repoId);
        script.setAttribute("data-category", repo.giscus.category);
        script.setAttribute("data-category-id", repo.giscus.categoryId);
        script.setAttribute("data-mapping", "specific");
        script.setAttribute("data-term", commentsAppearance.term);
        script.setAttribute("data-strict", "1");
        script.setAttribute("data-reactions-enabled", "1");
        script.setAttribute("data-emit-metadata", "0");
        script.setAttribute("data-input-position", "top");
        script.setAttribute("data-theme", commentsAppearance.giscus.theme);
        script.setAttribute("data-lang", commentsAppearance.giscus.lang);
        script.setAttribute("data-loading", "lazy");
      } else {
        script.src = "https://utteranc.es/client.js";
        script.setAttribute("repo", repo.repo);
        script.setAttribute("issue-term", commentsAppearance.term);
        script.setAttribute("theme", commentsAppearance.utterances.theme);
      }

      host.appendChild(script);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        timeout = window.setTimeout(inject, 150);
      },
      { rootMargin: "200px" },
    );
    observer.observe(host);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(timeout);
      if (!host.isConnected) return;

      const script = host.querySelector("script");
      if (script && !host.querySelector("iframe")) {
        script.type = "text/plain";
        script.removeAttribute("src");
      }
      host.replaceChildren();
    };
  }, [engine, giscusReady, paused, repo, utterancesReady]);

  return (
    <section id="discussion" className={cn("mt-14 scroll-mt-24", className)}>
      <h2 className="font-display text-2xl font-semibold">Discussion</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Comment on {target.title}. The thread lives on this component&apos;s GitHub repository
        {repo ? (
          <>
            {" "}
            (
            <a
              href={`https://github.com/${repo.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-lavender-800 hover:text-lavender-950"
            >
              {repo.repo}
            </a>
            )
          </>
        ) : null}
        . Sign in with GitHub — Giscus uses Discussions, Utterances uses Issues.
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Comment engine">
        {engines.map((item) => {
          const selected = item.id === engine;
          const tabId = `${tablistId}-${item.id}`;
          return (
            <button
              key={item.id}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${tablistId}-panel`}
              onClick={() => setEngine(item.id)}
              className={cn(
                "focusable inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
                selected
                  ? "bg-gradient-primary text-white shadow-glow"
                  : "border border-lavender-200 bg-white text-lavender-800 hover:bg-lavender-50",
              )}
            >
              {item.id === "giscus" ? (
                <MessagesSquare className="h-4 w-4" aria-hidden="true" />
              ) : (
                <GitBranch className="h-4 w-4" aria-hidden="true" />
              )}
              {item.label}
              <span className={cn("text-xs font-medium", selected ? "text-white/80" : "text-lavender-600")}>
                {item.hint}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${tablistId}-panel`}
        role="tabpanel"
        aria-labelledby={`${tablistId}-${engine}`}
        className="mt-6"
      >
        {paused ? (
          <div className="rounded-2xl border border-lavender-100 bg-lavender-50 px-4 py-5 text-sm leading-relaxed text-lavender-900">
            <p className="font-semibold">
              {engine === "giscus" ? "Discussions are not enabled on this repository" : "Issues are not enabled on this repository"}
            </p>
            <p className="mt-2 text-lavender-800">
              Open the conversation on{" "}
              <a
                href={commentsRepoUrl(target.github, engine === "giscus" ? "discussions" : "issues")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline decoration-lavender-300 underline-offset-2 hover:text-lavender-950"
              >
                GitHub
              </a>
              {engine === "giscus" ? ", or use the Utterances tab if Issues are available." : ", or use the Giscus tab if Discussions are available."}
            </p>
          </div>
        ) : (
          <div ref={hostRef} className="min-h-[8rem]" />
        )}
      </div>
    </section>
  );
}
