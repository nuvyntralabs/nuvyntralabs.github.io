"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { GuideNavGroup } from "@/content/mvvmexpress-guide";
import { cn } from "@/lib/utils";

function normalizePath(href: string): string {
  const path = href.split("#")[0]?.split("?")[0] ?? href;
  if (!path) return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

function sidebarScope(groups: GuideNavGroup[]): string {
  const href = groups.flatMap((group) => group.items).find((item) => item.href)?.href ?? groups[0]?.id ?? "docs";
  if (href.startsWith("/uikit/")) return "uikit";
  if (href.startsWith("/nuvexadb/")) return "nuvexadb";
  if (href.startsWith("/toolkits/nuvyn/")) return "nuvyn";
  const pack = href.match(/^\/packages\/([^/]+)/);
  return pack ? `pkg:${pack[1]}` : groups[0]?.id ?? "docs";
}

function scrollKey(scope: string): string {
  return `docs-sidebar-scroll:${scope}`;
}

function readScroll(scope: string): number {
  try {
    const value = Number(sessionStorage.getItem(scrollKey(scope)));
    return Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
}

function writeScroll(scope: string, top: number) {
  try {
    sessionStorage.setItem(scrollKey(scope), String(top));
  } catch {
    // Ignore quota / private-mode failures.
  }
}

export function DocsSidebar({
  groups,
  currentHref,
}: {
  groups: GuideNavGroup[];
  currentHref?: string;
}) {
  const pathname = usePathname();
  const activeHref = normalizePath(pathname || currentHref || "");
  const scope = useMemo(() => sidebarScope(groups), [groups]);
  const navRef = useRef<HTMLElement>(null);
  const currentGroupId = useMemo(
    () => groups.find((group) => group.items.some((item) => normalizePath(item.href) === activeHref))?.id ?? groups[0]?.id,
    [groups, activeHref],
  );
  const [openIds, setOpenIds] = useState<string[]>(() => groups.map((group) => group.id));

  useEffect(() => {
    if (currentGroupId) {
      setOpenIds((current) => (current.includes(currentGroupId) ? current : [...current, currentGroupId]));
    }
  }, [currentGroupId]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    nav.scrollTop = readScroll(scope);
  }, [scope]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const save = () => writeScroll(scope, nav.scrollTop);
    nav.addEventListener("scroll", save, { passive: true });
    return () => nav.removeEventListener("scroll", save);
  }, [scope]);

  function toggle(id: string) {
    setOpenIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function rememberScroll() {
    if (navRef.current) writeScroll(scope, navRef.current.scrollTop);
  }

  return (
    <nav
      ref={navRef}
      aria-label="Documentation"
      className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto"
    >
      <ul className="space-y-5">
        {groups.map((group, index) => {
          const open = openIds.includes(group.id);
          const section = group.section;
          const showSection = Boolean(section && section !== groups[index - 1]?.section);
          return (
            <li key={group.id}>
              {showSection ? (
                <p className="mb-2 border-t border-border pt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground">
                  {section}
                </p>
              ) : null}
              <button
                type="button"
                aria-expanded={open}
                onClick={() => toggle(group.id)}
                className="focusable flex w-full items-center justify-between gap-2 py-0.5 text-left text-xs font-semibold uppercase tracking-[0.14em] text-lavender-700 dark:text-lavender-300"
              >
                {group.title}
                <ChevronDown
                  className={cn("h-3.5 w-3.5 shrink-0 transition-transform", open && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
              {open ? (
                <ul className="mt-1.5 border-l border-border">
                  {group.items.map((item) => {
                    const selected = normalizePath(item.href) === activeHref;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          scroll={false}
                          onClick={rememberScroll}
                          aria-current={selected ? "page" : undefined}
                          className={cn(
                            "focusable -ml-px block border-l py-1.5 pl-3 text-sm",
                            selected
                              ? "border-lavender-600 font-semibold text-lavender-950 dark:border-lavender-400 dark:text-lavender-100"
                              : "border-transparent text-muted-foreground hover:border-lavender-300 hover:text-lavender-900 dark:hover:border-lavender-400 dark:hover:text-lavender-100",
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
