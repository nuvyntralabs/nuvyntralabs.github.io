export const siteConfig = {
  name: "Nuvyntra Labs",
  shortName: "Nuvyntra Labs",
  title: "Nuvyntra Labs — .NET MAUI NuGet product portfolio",
  description:
    "Documentation hub for production .NET MAUI plugins: location, connectivity, offline sync, security, VoIP, printing, and observability. Published as independent NuGet packages.",
  url: "https://nuvyntralabs.github.io",
  githubOrg: "https://github.com/nuvyntralabs",
  author: "Niladri Prasad Padhy",
  authorUrl: "https://niladripadhy.vercel.app",
  authorGithub: "https://github.com/NiladriPadhy",
  whitePapers: "https://niladripadhy.vercel.app/opensource",
  locale: "en_US",
} as const;

export function paperUrl(slug: string): string {
  return `${siteConfig.whitePapers}/${slug}`;
}
