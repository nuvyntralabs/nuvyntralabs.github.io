"use client";

import * as React from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import { packages, packageGroups, type PackageGroup } from "@/content/packages";
import { cn } from "@/lib/utils";

type Filter = "all" | PackageGroup;

export function Catalog() {
  const [query, setQuery] = React.useState("");
  const [group, setGroup] = React.useState<Filter>("all");

  const visible = packages.filter((item) => {
    const matchesGroup = group === "all" || item.group === group;
    const haystack = `${item.name} ${item.subtitle} ${item.tags.join(" ")}`.toLowerCase();
    const matchesQuery = haystack.includes(query.trim().toLowerCase());
    return matchesGroup && matchesQuery;
  });

  return (
    <div>
      <div className="mx-auto max-w-xl">
        <label htmlFor="package-search" className="sr-only">
          Search packages
        </label>
        <input
          id="package-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search GeoLocator, offline sync, VoIP…"
          className="focusable w-full rounded-full border border-lavender-200 bg-white px-5 py-3 text-sm shadow-soft"
        />
      </div>

      <div
        className="mt-6 flex flex-wrap items-center justify-center gap-2"
        role="group"
        aria-label="Filter by group"
      >
        {(["all", ...packageGroups] as Filter[]).map((id) => {
          const active = group === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setGroup(id)}
              className={cn(
                "focusable rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm",
                active
                  ? "bg-gradient-primary text-white shadow-glow"
                  : "border border-lavender-200 bg-white text-lavender-800 hover:bg-lavender-50",
              )}
            >
              {id === "all" ? "All" : id}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {visible.length} package{visible.length === 1 ? "" : "s"}
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {visible.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/packages/${item.slug}/`}
              className="glass-card focusable flex h-full flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-lavender-100 text-lavender-700">
                  <Package className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="rounded-full bg-lavender-50 px-2.5 py-1 text-xs font-medium text-lavender-800">
                  {item.group}
                </span>
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold text-foreground">{item.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.subtitle}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.slice(0, 3).map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-lavender-100 bg-white px-2 py-0.5 text-[11px] font-medium text-lavender-700"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>

      {visible.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No packages match that search. Try a capability such as GPS, NFC, or queue.
        </p>
      ) : null}
    </div>
  );
}
