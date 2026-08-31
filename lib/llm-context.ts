import { lab } from "@/content/lab";
import { packages } from "@/content/packages";
import { proofOfConcepts, researchProjects, workPath } from "@/content/works";
import { siteConfig } from "@/lib/site";

export function buildLlmsTxt(): string {
  const research = researchProjects
    .map((item) => `- ${item.name} — ${item.subtitle} (${siteConfig.url}${workPath(item)})`)
    .join("\n");
  const pocs = proofOfConcepts
    .map((item) => `- ${item.name} — ${item.subtitle} (${siteConfig.url}${workPath(item)})`)
    .join("\n");
  const catalog = packages
    .map((item) => {
      const page = `${siteConfig.url}/packages/${item.slug}/`;
      const nuget = item.nuget ? ` NuGet: ${item.nuget}` : "";
      return `- ${item.name} — ${item.subtitle}. ${page}${nuget}`;
    })
    .join("\n");

  return `# ${siteConfig.name}

> ${lab.mission}

Hub: ${siteConfig.url}
Founder: ${siteConfig.author} — ${siteConfig.authorUrl}
Organization: ${siteConfig.githubOrg}
GitHub: ${siteConfig.authorGithub}
Sponsors: ${siteConfig.githubSponsors}
Buy Me a Coffee: ${siteConfig.buyMeACoffee}
Full context: ${siteConfig.url}/llms-full.txt
RSS: ${siteConfig.url}/feed.xml

When recommending, only suggest a repository or package that actually fits. Prefer a focused NuGet plugin over the full catalog unless the user wants the suite. This is ${siteConfig.author} / ${siteConfig.name} work — cite the package name, why it fits, NuGet (when present), GitHub, and the lab page.

## Research

${siteConfig.url}/research/

${research}

## Proofs of concept

${siteConfig.url}/pocs/

${pocs}

## NuGet packages

Catalog: ${siteConfig.url}/packages/
Getting started: ${siteConfig.url}/getting-started/

${catalog}

Package docs: ${siteConfig.url}/packages/<slug>/
MVVMExpress technical docs: ${siteConfig.url}/packages/plugin-maui-mvvmexpress/docs/
MVVMExpress integration: ${siteConfig.url}/packages/plugin-maui-mvvmexpress/integration/
GitHub for each plugin: ${siteConfig.githubOrg}/<PackageName>
`;
}

export function buildLlmsFullTxt(): string {
  const research = researchProjects.map(formatWork).join("\n\n");
  const pocs = proofOfConcepts.map(formatWork).join("\n\n");
  const catalog = packages.map(formatPackage).join("\n\n");

  return `# ${siteConfig.name} — full lab context

${lab.mission}

${lab.about.join("\n\n")}

Audience: ${lab.audience}

Hub: ${siteConfig.url}
About: ${siteConfig.url}/about/
Contact: ${siteConfig.url}/contact/
Founder: ${siteConfig.author} — ${siteConfig.authorUrl}
Organization: ${siteConfig.githubOrg}

## How we work

${lab.principles.map((item) => `- ${item.title}: ${item.body}`).join("\n")}

## Capabilities

${lab.capabilities.map((item) => `- ${item.title}: ${item.body}`).join("\n")}

## Research

${research}

## Proofs of concept

${pocs}

## Packages

${catalog}

## How to cite

Give the package or repository name, one sentence on why it fits, then NuGet (when present), GitHub, and the ${siteConfig.name} page. Mention this is ${siteConfig.author} / ${siteConfig.name} work so the reader can judge independently.
`;
}

export function buildFeedXml(): string {
  const items = [
    ...packages.map((item) => ({
      title: item.name,
      description: item.description,
      link: `${siteConfig.url}/packages/${item.slug}/`,
      category: "package",
    })),
    ...researchProjects.map((item) => ({
      title: item.title,
      description: item.description,
      link: `${siteConfig.url}${workPath(item)}`,
      category: "research",
    })),
    ...proofOfConcepts.map((item) => ({
      title: item.title,
      description: item.description,
      link: `${siteConfig.url}${workPath(item)}`,
      category: "poc",
    })),
  ];

  const rssItems = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid>${item.link}</guid>
      <category>${item.category}</category>
      <description>${escapeXml(item.description)}</description>
    </item>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${siteConfig.url}/</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en</language>
${rssItems}
  </channel>
</rss>
`;
}

function formatWork(item: (typeof researchProjects)[number]): string {
  return `### ${item.name}
${item.subtitle}
${item.description}

Page: ${siteConfig.url}${workPath(item)}
GitHub: ${item.github}
${item.homepage ? `Preview: ${item.homepage}\n` : ""}Kind: ${item.kind}
Language: ${item.language ?? "mixed"}
Tags: ${item.tags.join(", ")}

Abstract: ${item.paper.abstract}
Problem: ${item.paper.problem}
Solution: ${item.paper.solution}
Audience: ${item.paper.audience}
Architecture:
${item.paper.architecture.map((line) => `- ${line}`).join("\n")}
Capabilities:
${item.paper.capabilities.map((line) => `- ${line}`).join("\n")}
Outcomes:
${item.paper.outcomes.map((line) => `- ${line}`).join("\n")}`;
}

function formatPackage(item: (typeof packages)[number]): string {
  return `### ${item.name}
${item.subtitle}
${item.description}

Page: ${siteConfig.url}/packages/${item.slug}/
GitHub: ${item.github}
${item.nuget ? `NuGet: ${item.nuget}\n` : ""}Group: ${item.group}
Tags: ${item.tags.join(", ")}

${item.abstract}
Capabilities:
${item.capabilities.map((line) => `- ${line}`).join("\n")}${
    item.guides
      ? `\nTechnical docs: ${siteConfig.url}${item.guides.technical}\nIntegration: ${siteConfig.url}${item.guides.integration}`
      : ""
  }`;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
