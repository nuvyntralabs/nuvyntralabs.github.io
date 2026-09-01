"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { GuideNavGroup } from "@/content/mvvmexpress-guide";
import { cn } from "@/lib/utils";

export function DocsSidebar({
  groups,
  currentHref,
}: {
  groups: GuideNavGroup[];
  currentHref: string;
}) {
  const currentGroupId = useMemo(
    () => groups.find((group) => group.items.some((item) => item.href === currentHref))?.id ?? groups[0]?.id,
    [groups, currentHref],
  );
  const [openIds, setOpenIds] = useState<string[]>(() => groups.map((group) => group.id));

  useEffect(() => {
    if (currentGroupId) {
      setOpenIds((current) => (current.includes(currentGroupId) ? current : [...current, currentGroupId]));
    }
  }, [currentGroupId]);

  function toggle(id: string) {
    setOpenIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <nav
      aria-label="Documentation"
      className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto"
    >
      <ul className="space-y-5">
        {groups.map((group) => {
          const open = openIds.includes(group.id);
          return (
            <li key={group.id}>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => toggle(group.id)}
                className="focusable flex w-full items-center justify-between gap-2 py-0.5 text-left text-xs font-semibold uppercase tracking-[0.14em] text-lavender-700"
              >
                {group.title}
                <ChevronDown
                  className={cn("h-3.5 w-3.5 shrink-0 transition-transform", open && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
              {open ? (
                <ul className="mt-1.5 border-l border-lavender-100">
                  {group.items.map((item) => {
                    const selected = item.href === currentHref;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={selected ? "page" : undefined}
                          className={cn(
                            "focusable -ml-px block border-l py-1.5 pl-3 text-sm",
                            selected
                              ? "border-lavender-600 font-semibold text-lavender-950"
                              : "border-transparent text-muted-foreground hover:border-lavender-300 hover:text-lavender-900",
                          )}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
