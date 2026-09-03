"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BuyMeACoffeeIcon, GitHubSponsorsIcon } from "@/components/brand-icons";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const mvvmExpressHref = "/packages/plugin-maui-mvvmexpress/";

const links = [
  { href: "/", label: "Home" },
  { href: "/packages/", label: "Products" },
  { href: mvvmExpressHref, label: "MVVMExpress" },
  { href: "/research/", label: "Research" },
  { href: "/pocs/", label: "POCs" },
  { href: "/about/", label: "About" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  if (href === "/packages/") {
    return (
      (pathname === "/packages/" || pathname.startsWith("/packages/")) &&
      !pathname.startsWith(mvvmExpressHref)
    );
  }
  return pathname === href || pathname.startsWith(href);
}

function scrollHomeIfCurrent(pathname: string) {
  if (pathname === "/") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0c0618]/90 text-white backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo onDark />
        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => {
                  if (link.href === "/") scrollHomeIfCurrent(pathname);
                }}
                className={cn(
                  "focusable whitespace-nowrap rounded-full px-2 py-1.5 text-sm font-semibold xl:px-3",
                  active ? "bg-white/15 text-white" : "text-lavender-100 hover:bg-white/10",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="ml-1 flex items-center gap-1 xl:ml-2 xl:gap-1.5">
            <Link href="/contact/" className="focusable btn-primary !px-3 !py-1.5 xl:!px-4">
              Contact
            </Link>
            <SponsorButtons compact />
          </div>
        </nav>
        <button
          type="button"
          className="focusable inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 lg:hidden">
          <div className="container flex flex-col gap-1 py-3">
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => {
                    setOpen(false);
                    if (link.href === "/") scrollHomeIfCurrent(pathname);
                  }}
                  className={cn(
                    "focusable rounded-xl px-3 py-2.5 text-sm font-semibold",
                    active ? "bg-white/15 text-white" : "text-lavender-100 hover:bg-white/10",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact/"
              onClick={() => setOpen(false)}
              className="focusable btn-primary mt-1"
            >
              Contact
            </Link>
            <SponsorButtons className="mt-1" />
          </div>
        </nav>
      ) : null}
    </header>
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
        className={cn("focusable btn-on-dark", compact && "!px-2.5 !py-1.5 xl:!px-4")}
      >
        <GitHubSponsorsIcon className="h-5 w-5 shrink-0" />
        <span className={compact ? "hidden xl:inline" : undefined}>Sponsor</span>
      </a>
      <a
        href={siteConfig.buyMeACoffee}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buy Me a Coffee"
        className={cn("focusable btn-on-dark", compact && "!px-2.5 !py-1.5 xl:!px-4")}
      >
        <BuyMeACoffeeIcon className="h-5 w-5 shrink-0" />
        <span className={compact ? "hidden xl:inline" : undefined}>Coffee</span>
      </a>
    </div>
  );
}
