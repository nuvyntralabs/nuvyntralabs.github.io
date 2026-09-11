export const mauiReleaseSources = {
  githubReleases: "https://github.com/dotnet/maui/releases",
  githubAtom: "https://github.com/dotnet/maui/releases.atom",
  githubApi: "https://api.github.com/repos/dotnet/maui/releases",
  learnWhatsNew: "https://learn.microsoft.com/dotnet/maui/whats-new/",
  learnDotnet11: "https://learn.microsoft.com/dotnet/maui/whats-new/dotnet-11",
  learnDotnet10: "https://learn.microsoft.com/dotnet/maui/whats-new/dotnet-10",
  blog: "https://devblogs.microsoft.com/dotnet/category/maui/",
  supportPolicy: "https://dotnet.microsoft.com/platform/support/policy/maui",
} as const;

export const mauiReleasesPath = "/releases/";

export type MauiRelease = {
  id: number;
  tag: string;
  name: string;
  htmlUrl: string;
  publishedAt: string;
  prerelease: boolean;
  author: string;
  summary: string;
  installCommand: string | null;
  recommendedTools: string[];
  changeAreas: string[];
};

type GitHubRelease = {
  id: number;
  tag_name: string;
  name: string | null;
  html_url: string;
  published_at: string | null;
  created_at: string;
  draft: boolean;
  prerelease: boolean;
  body: string | null;
  author?: { login?: string };
};

const PAGE_SIZE = 15;

export async function fetchMauiReleases(page: number): Promise<{
  releases: MauiRelease[];
  hasMore: boolean;
}> {
  const url = `${mauiReleaseSources.githubApi}?per_page=${PAGE_SIZE}&page=${page}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub releases returned ${response.status}`);
  }

  const payload = (await response.json()) as GitHubRelease[];
  const releases = payload
    .filter((item) => !item.draft)
    .map(mapRelease);

  return {
    releases,
    hasMore: payload.length === PAGE_SIZE,
  };
}

function mapRelease(item: GitHubRelease): MauiRelease {
  const body = item.body ?? "";
  return {
    id: item.id,
    tag: item.tag_name,
    name: item.name?.trim() || item.tag_name,
    htmlUrl: item.html_url,
    publishedAt: item.published_at ?? item.created_at,
    prerelease: item.prerelease,
    author: item.author?.login ?? "dotnet",
    summary: extractSummary(body, item.name?.trim() || item.tag_name),
    installCommand: extractInstallCommand(body),
    recommendedTools: extractRecommendedTools(body),
    changeAreas: extractChangeAreas(body),
  };
}

export function extractSummary(body: string, fallback: string): string {
  const withoutCode = body.replace(/```[\s\S]*?```/g, "\n");
  const lines = withoutCode.split(/\r?\n/).map((line) => line.trim());

  for (const line of lines) {
    if (!line || line.startsWith("#") || line.startsWith("|") || line.startsWith("-") || line.startsWith("*") || line.startsWith(">")) {
      continue;
    }
    const plain = stripMarkdown(line);
    if (plain.length > 40) {
      return plain;
    }
  }

  return `Official .NET MAUI ${fallback} notes from the dotnet/maui GitHub releases feed.`;
}

export function extractInstallCommand(body: string): string | null {
  const fenced = body.match(/```(?:bash|sh|pwsh|powershell)?\s*([\s\S]*?)```/i);
  if (fenced) {
    const command = fenced[1]
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line.startsWith("dotnet workload"));
    if (command) return command;
  }

  const loose = body.match(/dotnet workload (?:update|install)[^\n]+/);
  return loose ? loose[0].trim() : null;
}

export function extractRecommendedTools(body: string): string[] {
  const match = body.match(/Recommended Tools:?\s*((?:\r?\n\s*[-*].+)+)/i);
  if (!match) return [];

  return match[1]
    .split(/\r?\n/)
    .map((line) => stripMarkdown(line.replace(/^\s*[-*]\s*/, "")))
    .filter(Boolean)
    .slice(0, 6);
}

export function extractChangeAreas(body: string): string[] {
  const skipped = new Set([
    "workloads",
    "installation",
    "recommended tools",
    "recommended tools:",
    "workload versions",
    "maui nuget packages",
    "native tool & sdk compatibility",
    "contributors",
    "what's changed",
    "additional changes",
  ]);

  const seen = new Set<string>();
  const areas: string[] = [];

  for (const match of body.matchAll(/^#{2,3}\s+(.+)$/gm)) {
    const title = stripMarkdown(match[1]).replace(/^[^\w]+/, "").trim();
    const key = title.toLowerCase();
    if (!title || skipped.has(key) || seen.has(key) || key.startsWith("changes since") || key.startsWith("new in")) {
      continue;
    }
    seen.add(key);
    areas.push(title);
    if (areas.length >= 10) break;
  }

  return areas;
}

export function formatReleaseDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function channelLabel(release: MauiRelease, latestStableId?: number): "Latest" | "Preview" | "Stable" {
  if (release.prerelease) return "Preview";
  if (latestStableId === release.id) return "Latest";
  return "Stable";
}

function stripMarkdown(value: string): string {
  return value
    .replace(/!\[[^\]]*]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/`+/g, "")
    .replace(/\*\*|__/g, "")
    .replace(/[_*]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
