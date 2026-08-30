"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/research/", label: "R&D" },
  { href: "/pocs/", label: "POCs" },
  { href: "/packages/", label: "NuGet" },
  { href: "/getting-started/", label: "Getting started" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-lavender-100/80 bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Primary" className="flex items-center gap-0.5 sm:gap-1">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focusable rounded-full px-2.5 py-1.5 text-xs font-semibold sm:px-3 sm:text-sm",
                  active
                    ? "bg-lavender-100 text-lavender-900"
                    : "text-lavender-800 hover:bg-lavender-50",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={siteConfig.githubOrg}
            target="_blank"
            rel="noopener noreferrer"
            className="focusable hidden rounded-full px-3 py-1.5 text-sm font-semibold text-lavender-800 hover:bg-lavender-50 md:inline"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
