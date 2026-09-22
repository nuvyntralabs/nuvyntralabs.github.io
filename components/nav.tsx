"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { BuyMeACoffeeIcon, GitHubSponsorsIcon } from "@/components/brand-icons";
import { Logo } from "@/components/logo";
import {
  featuredProducts,
  itemIsActive,
  labLinks,
  pinnedProducts,
  workCatalog,
  workMenuIsActive,
  type FeaturedNavItem,
  type NavItem,
} from "@/content/site-nav";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function scrollHomeIfCurrent(pathname: string) {
  if (pathname === "/") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const workRef = useRef<HTMLDivElement>(null);
  const workButtonId = useId();
  const workPanelId = useId();

  useEffect(() => {
    setMobileOpen(false);
    setWorkOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!workOpen) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setWorkOpen(false);
    }
    function onPointer(event: MouseEvent) {
      if (workRef.current && !workRef.current.contains(event.target as Node)) {
        setWorkOpen(false);
      }
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [workOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-lavender-100/70 bg-white/72 text-foreground backdrop-blur-xl dark:border-white/10 dark:bg-ink/75">
      <div className="container flex h-[4.25rem] items-center justify-between gap-3">
        <Logo />
        <nav aria-label="Primary" className="hidden min-w-0 items-center gap-1 lg:flex">
          {pinnedProducts().map((item) => (
            <FeaturedChip key={item.href} item={item} pathname={pathname} />
          ))}
          <div ref={workRef} className="relative">
            <button
              type="button"
              id={workButtonId}
              aria-expanded={workOpen}
              aria-controls={workPanelId}
              onClick={() => setWorkOpen((value) => !value)}
              className={cn(
                "focusable inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold",
                workOpen || workMenuIsActive(pathname)
                  ? "bg-lavender-100 text-lavender-900 dark:bg-white/[0.12] dark:text-white"
                  : "text-muted-foreground hover:bg-lavender-50 hover:text-foreground dark:hover:bg-white/[0.08]",
              )}
            >
              Work
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", workOpen && "rotate-180")} aria-hidden="true" />
            </button>
            {workOpen ? (
              <div
                id={workPanelId}
                role="menu"
                aria-labelledby={workButtonId}
                className="absolute right-0 top-[calc(100%+0.65rem)] z-50 w-[min(40rem,calc(100vw-2rem))] rounded-2xl border border-lavender-100 bg-white/95 p-4 shadow-lift backdrop-blur-xl dark:border-white/10 dark:bg-ink/95"
              >
                <WorkMenu pathname={pathname} />
              </div>
            ) : null}
          </div>
          <Link
            href="/about/"
            aria-current={pathname.startsWith("/about/") ? "page" : undefined}
            className={cn(
              "focusable whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold",
              pathname.startsWith("/about/")
                ? "bg-lavender-100 text-lavender-900 dark:bg-white/[0.12] dark:text-white"
                : "text-muted-foreground hover:bg-lavender-50 hover:text-foreground dark:hover:bg-white/[0.08]",
            )}
          >
            About
          </Link>
        </nav>
        <div className="hidden items-center gap-1.5 lg:flex">
          <Link
            href="/vlogs/"
            aria-current={pathname.startsWith("/vlogs/") ? "page" : undefined}
            className="focusable btn-secondary !px-3.5 !py-1.5"
          >
            Vlogs
          </Link>
          <Link href="/contact/" className="focusable btn-primary !px-3.5 !py-1.5">
            Contact
          </Link>
          <SponsorButtons compact />
        </div>
        <button
          type="button"
          className="focusable inline-flex h-10 w-10 items-center justify-center rounded-full border border-lavender-200 bg-white dark:border-white/15 dark:bg-white/5 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      {mobileOpen ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-lavender-100 bg-white/95 dark:border-white/10 dark:bg-ink/95 lg:hidden">
          <div className="container flex flex-col gap-4 py-4">
            <MobileGroup title="Featured">
              {featuredProducts.map((item) => (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  blurb={item.blurb}
                  badge={item.badge}
                  active={itemIsActive(pathname, item)}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
            </MobileGroup>
            <MobileGroup title="Work">
              {workCatalog.map((item) => (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  blurb={item.blurb}
                  active={itemIsActive(pathname, item)}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
            </MobileGroup>
            <MobileGroup title="Lab">
              {labLinks.map((item) => (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  blurb={item.blurb}
                  active={itemIsActive(pathname, item)}
                  onClick={() => {
                    setMobileOpen(false);
                    if (item.href === "/") scrollHomeIfCurrent(pathname);
                  }}
                />
              ))}
            </MobileGroup>
            <Link href="/vlogs/" onClick={() => setMobileOpen(false)} className="focusable btn-secondary">
              Vlogs
            </Link>
            <Link href="/contact/" onClick={() => setMobileOpen(false)} className="focusable btn-primary">
              Contact
            </Link>
            <SponsorButtons />
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function FeaturedChip({ item, pathname }: { item: FeaturedNavItem; pathname: string }) {
  const active = itemIsActive(pathname, item);
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "focusable inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold",
        active
          ? "bg-gradient-primary text-white shadow-glow"
          : "border border-lavender-200 bg-lavender-50/80 text-lavender-900 hover:border-lavender-300 hover:bg-lavender-100 dark:border-white/15 dark:bg-white/[0.06] dark:text-lavender-100 dark:hover:bg-white/[0.1]",
      )}
    >
      {item.label}
      {item.badge ? (
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]",
            active ? "bg-white/20 text-white" : "bg-lavender-200/80 text-lavender-900 dark:bg-lavender-500/30 dark:text-lavender-100",
          )}
        >
          {item.badge}
        </span>
      ) : null}
    </Link>
  );
}

function WorkMenu({ pathname }: { pathname: string }) {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      <MenuColumn title="Featured">
        {featuredProducts.map((item) => (
          <MenuCard key={item.href} item={item} pathname={pathname} featured />
        ))}
      </MenuColumn>
      <MenuColumn title="Catalog">
        {workCatalog.map((item) => (
          <MenuCard key={item.href} item={item} pathname={pathname} />
        ))}
      </MenuColumn>
      <MenuColumn title="Lab">
        {labLinks.map((item) => (
          <MenuCard key={item.href} item={item} pathname={pathname} />
        ))}
      </MenuColumn>
    </div>
  );
}

function MenuColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-lavender-700 dark:text-lavender-300">
        {title}
      </p>
      <ul className="mt-2 space-y-1">{children}</ul>
    </div>
  );
}

function MenuCard({
  item,
  pathname,
  featured = false,
}: {
  item: NavItem;
  pathname: string;
  featured?: boolean;
}) {
  const active = itemIsActive(pathname, item);
  return (
    <li>
      <Link
        href={item.href}
        role="menuitem"
        aria-current={active ? "page" : undefined}
        className={cn(
          "focusable block rounded-xl px-2.5 py-2",
          featured && "border border-lavender-100 bg-lavender-50/70 dark:border-white/10 dark:bg-white/[0.04]",
          active
            ? "bg-lavender-100 text-lavender-950 dark:bg-white/[0.12] dark:text-white"
            : "text-foreground hover:bg-lavender-50 dark:hover:bg-white/[0.06]",
        )}
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          {item.label}
          {item.badge ? (
            <span className="rounded-full bg-lavender-200/80 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-lavender-900 dark:bg-lavender-500/30 dark:text-lavender-100">
              {item.badge}
            </span>
          ) : null}
        </span>
        {item.blurb ? <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{item.blurb}</span> : null}
      </Link>
    </li>
  );
}

function MobileGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-lavender-700 dark:text-lavender-300">
        {title}
      </p>
      <ul className="mt-1.5 space-y-1">{children}</ul>
    </div>
  );
}

function MobileLink({
  href,
  label,
  blurb,
  badge,
  active,
  onClick,
}: {
  href: string;
  label: string;
  blurb?: string;
  badge?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        onClick={onClick}
        className={cn(
          "focusable block rounded-xl px-3 py-2.5",
          active
            ? "bg-lavender-100 text-lavender-900 dark:bg-white/[0.12] dark:text-white"
            : "text-foreground hover:bg-lavender-50 dark:hover:bg-white/[0.08]",
        )}
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          {label}
          {badge ? (
            <span className="rounded-full bg-lavender-200/80 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-lavender-900 dark:bg-lavender-500/30 dark:text-lavender-100">
              {badge}
            </span>
          ) : null}
        </span>
        {blurb ? <span className="mt-0.5 block text-xs text-muted-foreground">{blurb}</span> : null}
      </Link>
    </li>
  );
}

function SponsorButtons({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(compact ? "flex items-center gap-1.5" : "grid grid-cols-2 gap-2", className)}>
      <a
        href={siteConfig.githubSponsors}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Sponsors"
        className={cn("focusable btn-secondary", compact && "!px-2.5 !py-1.5")}
      >
        <GitHubSponsorsIcon className="h-5 w-5 shrink-0" />
        <span className={compact ? "sr-only" : undefined}>Sponsor</span>
      </a>
      <a
        href={siteConfig.buyMeACoffee}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buy Me a Coffee"
        className={cn("focusable btn-secondary", compact && "!px-2.5 !py-1.5")}
      >
        <BuyMeACoffeeIcon className="h-5 w-5 shrink-0" />
        <span className={compact ? "sr-only" : undefined}>Coffee</span>
      </a>
    </div>
  );
}
