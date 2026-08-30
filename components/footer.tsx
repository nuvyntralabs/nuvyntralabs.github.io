import Link from "next/link";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site";

const company = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
  { href: siteConfig.authorUrl, label: "Founder", external: true },
];

const work = [
  { href: "/packages/", label: "Products" },
  { href: "/research/", label: "Research" },
  { href: "/pocs/", label: "Proofs of concept" },
];

const resources = [
  { href: "/getting-started/", label: "Getting started" },
  { href: siteConfig.githubOrg, label: "GitHub organization", external: true },
  { href: siteConfig.githubSponsors, label: "GitHub Sponsors", external: true },
  { href: siteConfig.buyMeACoffee, label: "Buy Me a Coffee", external: true },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0c0618] text-lavender-100">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-1">
          <Logo onDark />
          <p className="max-w-xs text-sm leading-relaxed text-lavender-100/70">
            Independent applied R&D company for mobile infrastructure. Research, public proofs, and
            production .NET MAUI packages.
          </p>
        </div>
        <FooterColumn title="Company" links={company} />
        <FooterColumn title="Work" links={work} />
        <FooterColumn title="Resources" links={resources} />
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-5 text-xs text-lavender-100/55 sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Independently operated by {siteConfig.author}.
          </p>
          <p>{siteConfig.url.replace("https://", "")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                className="focusable text-sm text-lavender-100/75 hover:text-white"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="focusable text-sm text-lavender-100/75 hover:text-white">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
