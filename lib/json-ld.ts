import type { PackageDoc } from "@/content/packages";
import { workPath, type WorkItem } from "@/content/works";
import { siteConfig } from "@/lib/site";

export function siteGraph() {
  const organizationId = `${siteConfig.url}/#organization`;
  const websiteId = `${siteConfig.url}/#website`;
  const founderId = `${siteConfig.url}/#founder`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${siteConfig.url}/`,
        name: siteConfig.name,
        alternateName: ["Nuvyntra", "Nuvyntra Labs GitHub"],
        description: siteConfig.description,
        inLanguage: "en",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/favicon.svg`,
        image: `${siteConfig.url}/opengraph-image.png`,
        description: siteConfig.description,
        founder: { "@id": founderId },
        sameAs: [
          siteConfig.githubOrg,
          siteConfig.authorGithub,
          siteConfig.authorUrl,
          siteConfig.githubSponsors,
          siteConfig.buyMeACoffee,
        ],
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: siteConfig.author,
        url: siteConfig.authorUrl,
        jobTitle: "Founder",
        worksFor: { "@id": organizationId },
        sameAs: [siteConfig.authorGithub, siteConfig.githubSponsors, siteConfig.buyMeACoffee],
      },
    ],
  };
}

export function packageJsonLd(pkg: PackageDoc) {
  const page = `${siteConfig.url}/packages/${pkg.slug}/`;
  return [
    {
      "@context": "https://schema.org",
      "@type": ["SoftwareApplication", "SoftwareSourceCode"],
      name: pkg.name,
      alternateName: pkg.title,
      description: pkg.description,
      url: page,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Android, iOS",
      programmingLanguage: pkg.language ?? "C#",
      codeRepository: pkg.github,
      downloadUrl: pkg.nuget ?? pkg.github,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      keywords: pkg.tags.join(", "),
    },
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Products", path: "/packages/" },
      { name: pkg.name, path: `/packages/${pkg.slug}/` },
    ]),
  ];
}

export function packageGuideJsonLd(
  pkg: PackageDoc,
  kind: "docs" | "integration" | "comparison",
  title: string,
  description: string,
  articlePath?: string,
) {
  const path =
    articlePath ??
    (kind === "docs"
      ? pkg.guides?.technical
      : kind === "comparison"
        ? pkg.guides?.comparison
        : pkg.guides?.integration);
  const pagePath = path ?? `/packages/${pkg.slug}/${kind}/`;
  const label = kind === "docs" ? "Documentation" : kind === "comparison" ? "Comparison" : "Getting started";

  return [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: title,
      description,
      url: `${siteConfig.url}${pagePath}`,
      author: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      about: {
        "@type": "SoftwareApplication",
        name: pkg.name,
        url: `${siteConfig.url}/packages/${pkg.slug}/`,
      },
    },
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Products", path: "/packages/" },
      { name: pkg.name, path: `/packages/${pkg.slug}/` },
      { name: label, path: pagePath },
    ]),
  ];
}

export function workJsonLd(work: WorkItem) {
  const path = workPath(work);
  const index =
    work.kind === "research"
      ? { name: "Research", path: "/research/" }
      : { name: "Proofs of concept", path: "/pocs/" };

  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: work.name,
      alternateName: work.title,
      description: work.description,
      url: `${siteConfig.url}${path}`,
      codeRepository: work.github,
      programmingLanguage: work.language ?? undefined,
      author: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      keywords: work.tags.join(", "),
    },
    breadcrumbList([
      { name: "Home", path: "/" },
      index,
      { name: work.title, path },
    ]),
  ];
}

function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
