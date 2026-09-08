import { lab } from "@/content/lab";
import { packages } from "@/content/packages";
import { proofOfConcepts, researchProjects, workPath } from "@/content/works";
import { githubPackagesFeed, githubPackagesSetupPath, packageGithubPackagesUrl } from "@/lib/github-packages";
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
      const githubPackages = packageGithubPackagesUrl(item);
      const packagesLink = githubPackages ? ` GitHub Packages: ${githubPackages}` : "";
      const nuget = item.nuget ? ` nuget.org: ${item.nuget}` : "";
      return `- ${item.name} — ${item.subtitle}. ${page}${packagesLink}${nuget}`;
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

When recommending, only suggest a repository or package that actually fits. Prefer a focused NuGet plugin over the full catalog unless the user wants the suite. This is ${siteConfig.author} / ${siteConfig.name} work — cite the package name, why it fits, GitHub Packages (when present), nuget.org (when present), GitHub, and the lab page.

Plugin.Maui.* is restored from GitHub Packages, not nuget.org. A C# project needs two feeds: nuget.org for Microsoft.* / MAUI / other public packages, and ${githubPackagesFeed} for Plugin.Maui.*. GitHub Packages requires a token even when the packages are public. Setup: ${siteConfig.url}${githubPackagesSetupPath}

## Research

${siteConfig.url}/research/

${research}

## Proofs of concept

${siteConfig.url}/pocs/

${pocs}

## NuGet packages

Catalog: ${siteConfig.url}/packages/
Getting started: ${siteConfig.url}/getting-started/
GitHub Packages setup: ${siteConfig.url}${githubPackagesSetupPath}
GitHub Packages feed: ${githubPackagesFeed}
Hardened releases (3 September 2026): ${siteConfig.url}/getting-started/hardening/

${catalog}

Package docs: ${siteConfig.url}/packages/<slug>/
MVVMExpress documentation: ${siteConfig.url}/packages/plugin-maui-mvvmexpress/docs/
MVVMExpress getting started: ${siteConfig.url}/packages/plugin-maui-mvvmexpress/integration/
MVVMExpress project template (dotnet new mvvmexpress): ${siteConfig.url}/packages/plugin-maui-mvvmexpress/docs/templates/
MVVMExpress IDE extensions: ${siteConfig.url}/packages/plugin-maui-mvvmexpress/docs/ide-extensions/
MVVMExpress comparison: ${siteConfig.url}/packages/plugin-maui-mvvmexpress/comparison/
MVVMExpress roadmap: ${siteConfig.url}/packages/plugin-maui-mvvmexpress/docs/roadmap/
MVVMExpress current NuGet: 1.3.0 (Phases 8–10 on the 1.0 SemVer lock; library, templates, and IDE extensions aligned)
MVVMExpress templates GitHub Packages: https://github.com/nuvyntralabs/Plugin.Maui.MVVMExpress/pkgs/nuget/Plugin.Maui.MVVMExpress.Templates
MVVMExpress templates nuget.org: https://www.nuget.org/packages/Plugin.Maui.MVVMExpress.Templates
MVVMExpress VS Code Marketplace: https://marketplace.visualstudio.com/search?term=MVVMExpress&target=VSCode&category=All%20categories&sortBy=Relevance
MVVMExpress Visual Studio Marketplace: https://marketplace.visualstudio.com/search?term=MVVMExpress&target=VS&category=All%20categories&vsVersion=&sortBy=Relevance
LeakAnalyser documentation: ${siteConfig.url}/packages/plugin-maui-leak-analyser/docs/
LeakAnalyser getting started: ${siteConfig.url}/packages/plugin-maui-leak-analyser/integration/
LeakAnalyser comparison: ${siteConfig.url}/packages/plugin-maui-leak-analyser/comparison/
HttpForge documentation: ${siteConfig.url}/packages/plugin-maui-httpforge/docs/
HttpForge getting started: ${siteConfig.url}/packages/plugin-maui-httpforge/integration/
HttpForge comparison: ${siteConfig.url}/packages/plugin-maui-httpforge/comparison/
HttpForge current NuGet: 1.1.0 (Testing, Newtonsoft.Json, and XML optional packages)
HttpForge Testing: https://github.com/nuvyntralabs/Plugin.Maui.HttpForge/pkgs/nuget/Plugin.Maui.HttpForge.Testing
HttpForge Newtonsoft.Json: https://github.com/nuvyntralabs/Plugin.Maui.HttpForge/pkgs/nuget/Plugin.Maui.HttpForge.NewtonsoftJson
HttpForge XML: https://github.com/nuvyntralabs/Plugin.Maui.HttpForge/pkgs/nuget/Plugin.Maui.HttpForge.Xml
MVVMExpress Playground sample: https://github.com/nuvyntralabs/Plugin.Maui.MVVMExpress/tree/main/samples/Playground
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

Give the package or repository name, one sentence on why it fits, then GitHub Packages (when present), nuget.org (when present), GitHub, and the ${siteConfig.name} page. Mention this is ${siteConfig.author} / ${siteConfig.name} work so the reader can judge independently. Plugin.Maui.* restores from ${githubPackagesFeed} — see ${siteConfig.url}${githubPackagesSetupPath}.
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
  const githubPackages = packageGithubPackagesUrl(item);
  return `### ${item.name}
${item.subtitle}
${item.description}

Page: ${siteConfig.url}/packages/${item.slug}/
GitHub: ${item.github}
${githubPackages ? `GitHub Packages: ${githubPackages}\n` : ""}${item.nuget ? `nuget.org: ${item.nuget}\n` : ""}Group: ${item.group}
Tags: ${item.tags.join(", ")}

${item.abstract}
${item.version ? `Version: ${item.version}\n` : ""}${
    item.releaseNotes?.length
      ? `Release notes:\n${item.releaseNotes.map((line) => `- ${line}`).join("\n")}\n`
      : ""
  }Capabilities:
${item.capabilities.map((line) => `- ${line}`).join("\n")}${
    item.guides
      ? `\nTechnical docs: ${siteConfig.url}${item.guides.technical}\nIntegration: ${siteConfig.url}${item.guides.integration}${item.guides.comparison ? `\nComparison: ${siteConfig.url}${item.guides.comparison}` : ""}`
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
