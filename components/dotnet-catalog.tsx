"use client";

import * as React from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import { dotnetGroups, dotnetLibraries, type DotnetGroup } from "@/content/dotnet";
import { cn } from "@/lib/utils";

type Filter = "all" | DotnetGroup;

export function DotnetCatalog() {
  const [query, setQuery] = React.useState("");
  const [group, setGroup] = React.useState<Filter>("all");

  const visible = dotnetLibraries.filter((item) => {
    const matchesGroup = group === "all" || item.group === group;
    const haystack = `${item.name} ${item.subtitle} ${item.packageId} ${item.tags.join(" ")}`.toLowerCase();
    const matchesQuery = haystack.includes(query.trim().toLowerCase());
    return matchesGroup && matchesQuery;
  });

  return (
    <div>
      <div className="mx-auto max-w-xl">
        <label htmlFor="dotnet-search" className="sr-only">
          Search .NET libraries
        </label>
        <input
          id="dotnet-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search ApiLens, diagnostics, EF Core…"
          className="focusable input-search"
        />
      </div>

      <div
        className="mt-6 flex flex-wrap items-center justify-center gap-2"
        role="group"
        aria-label="Filter by group"
      >
        {(["all", ...dotnetGroups] as Filter[]).map((id) => {
          const active = group === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setGroup(id)}
              className={cn(
                "focusable rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm",
                active ? "bg-gradient-primary text-white shadow-glow" : "filter-idle",
              )}
            >
              {id === "all" ? "All" : id}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {visible.length === 1 ? "1 library" : `${visible.length} libraries`}
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {visible.map((item) => (
          <li key={item.slug}>
            <Link
              href={item.href}
              className="glass-card focusable flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-lavender-200 hover:shadow-lift dark:hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="icon-well h-9 w-9 rounded-xl">
                  <Package className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="chip">{item.group}</span>
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold text-foreground">{item.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.subtitle}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.slice(0, 3).map((tag) => (
                  <li key={tag} className="chip-tag">
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
          No libraries match that search. Try diagnostics, EF Core, or ASP.NET Core.
        </p>
      ) : null}
    </div>
  );
}
