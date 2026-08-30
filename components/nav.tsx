import Link from "next/link";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/", label: "Packages" },
  { href: "/getting-started/", label: "Getting started" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-lavender-100/80 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="focusable rounded-full font-display text-base font-semibold text-foreground">
          <span className="heading-gradient">{siteConfig.name}</span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focusable rounded-full px-3 py-1.5 text-sm font-medium text-lavender-800 hover:bg-lavender-50"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={siteConfig.githubOrg}
            target="_blank"
            rel="noopener noreferrer"
            className="focusable hidden rounded-full px-3 py-1.5 text-sm font-medium text-lavender-800 hover:bg-lavender-50 sm:inline"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
