import Link from "next/link";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/research/", label: "R&D projects" },
  { href: "/pocs/", label: "POCs" },
  { href: "/packages/", label: "NuGet packages" },
  { href: "/getting-started/", label: "Getting started" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-lavender-100 bg-lavender-50/50">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Open-source lab for R&D, proofs of concept, and production NuGet packages.
            Founded by{" "}
            <a
              href={siteConfig.authorUrl}
              className="focusable rounded-sm font-medium text-lavender-700 hover:text-lavender-900"
            >
              {siteConfig.author}
            </a>
            .
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-foreground">Workstreams</h2>
          <ul className="mt-3 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="focusable text-sm text-lavender-800 hover:text-lavender-950">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Connect</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={siteConfig.githubOrg} className="focusable text-lavender-800 hover:text-lavender-950">
                GitHub organization
              </a>
            </li>
            <li>
              <a href={siteConfig.authorGithub} className="focusable text-lavender-800 hover:text-lavender-950">
                Founder on GitHub
              </a>
            </li>
            <li>
              <a href={siteConfig.githubSponsors} className="focusable text-lavender-800 hover:text-lavender-950">
                Sponsor
              </a>
            </li>
            <li>
              <a href={siteConfig.buyMeACoffee} className="focusable text-lavender-800 hover:text-lavender-950">
                Buy a coffee
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-lavender-100">
        <div className="container flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Open source, independently maintained.
          </p>
          <p>Published on GitHub Pages · {siteConfig.url.replace("https://", "")}</p>
        </div>
      </div>
    </footer>
  );
}
