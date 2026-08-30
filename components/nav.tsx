"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BuyMeACoffeeIcon, GitHubSponsorsIcon } from "@/components/brand-icons";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/packages/", label: "Products" },
  { href: "/research/", label: "Research" },
  { href: "/pocs/", label: "POCs" },
  { href: "/about/", label: "About" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
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
        <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
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
                  "focusable rounded-full px-3 py-1.5 text-sm font-semibold",
                  active ? "bg-white/15 text-white" : "text-lavender-100 hover:bg-white/10",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="ml-2 flex items-center gap-1.5">
            <Link href="/contact/" className="focusable btn-primary !px-4 !py-1.5">
              Contact
            </Link>
            <SponsorButtons compact />
          </div>
        </nav>
        <button
          type="button"
          className="focusable inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 xl:hidden">
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
        className={cn("focusable btn-on-dark", compact && "!px-4 !py-1.5")}
      >
        <GitHubSponsorsIcon className="h-5 w-5 shrink-0" />
        Sponsor
      </a>
      <a
        href={siteConfig.buyMeACoffee}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("focusable btn-on-dark", compact && "!px-4 !py-1.5")}
      >
        <BuyMeACoffeeIcon className="h-5 w-5 shrink-0" />
        Coffee
      </a>
    </div>
  );
}
