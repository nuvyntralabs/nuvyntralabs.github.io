import { desktopMvvmFamilies } from "@/content/desktop-mvvmexpress";
import { packageFamily } from "@/content/mvvmexpress";
import { nuvexaDb } from "@/content/nuvexadb";
import { packages } from "@/content/packages";
import { toolkitPath, toolkits } from "@/content/toolkits";
import { uiKit, uiKitHref } from "@/content/uikit";
import { wpfPackageFamily } from "@/content/wpf-mvvmexpress";

export const nugetStatsPath = "/stats/";

export const nugetSearchSources = {
  primary: "https://azuresearch-usnc.nuget.org/query",
  fallback: "https://azuresearch-ussc.nuget.org/query",
  gallery: "https://www.nuget.org/packages/",
  profile: "https://www.nuget.org/profiles/niladri.1437",
} as const;

export const nugetOwnerId = "niladri.1437";

export type TrackedNugetPackage = {
  id: string;
  title: string;
  href: string;
  nugetUrl: string;
  group: string;
};

export type NugetVersionStats = {
  version: string;
  downloads: number;
  prerelease: boolean;
  publishedAt: string | null;
};

export type NugetPackageStats = TrackedNugetPackage & {
  currentVersion: string | null;
  totalDownloads: number;
  versions: NugetVersionStats[];
  published: boolean;
  owners: string[];
};

type SearchVersion = {
  version?: string;
  downloads?: number;
};

type SearchHit = {
  id?: string;
  version?: string;
  totalDownloads?: number;
  authors?: string[] | string;
  owners?: string[] | string;
  versions?: SearchVersion[];
};

type SearchResponse = {
  totalHits?: number;
  data?: SearchHit[];
};

const ownerQueries = ["authors:Niladri", 'authors:"Niladri Prasad Padhy"', "authors:MauiEssentials"];

const companionPackageIds: Record<string, string[]> = {
  "plugin-maui-performance": ["Plugin.Maui.Performance.Cli"],
};

export function nugetOrgUrl(packageId: string): string {
  return `${nugetSearchSources.gallery}${packageId}`;
}

export function packageIdFromNugetUrl(url: string): string | null {
  const match = url.match(/nuget\.org\/packages\/([^/?#]+)/i);
  return match ? decodeURIComponent(match[1]) : null;
}

export function isPrereleaseVersion(version: string): boolean {
  return version.includes("-");
}

export function nugetPackageAnchor(packageId: string): string {
  return packageId.toLowerCase();
}

export function formatDownloads(value: number): string {
  return value.toLocaleString("en-US");
}

export function formatReleaseDate(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime()) || date.getUTCFullYear() <= 1900) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function compareNugetVersions(left: string, right: string): number {
  const a = parseNugetVersion(left);
  const b = parseNugetVersion(right);
  const length = Math.max(a.core.length, b.core.length);
  for (let index = 0; index < length; index += 1) {
    const diff = (a.core[index] ?? 0) - (b.core[index] ?? 0);
    if (diff !== 0) return diff;
  }
  if (!a.pre && b.pre) return 1;
  if (a.pre && !b.pre) return -1;
  return a.pre.localeCompare(b.pre);
}

export function listedNugetPackages(): TrackedNugetPackage[] {
  const byId = new Map<string, TrackedNugetPackage>();

  const add = (id: string | null | undefined, href: string, group: string, title?: string) => {
    const packageId = id?.trim();
    if (!packageId) return;
    const key = packageId.toLowerCase();
    if (byId.has(key)) return;
    byId.set(key, {
      id: packageId,
      title: title ?? packageId,
      href,
      nugetUrl: nugetOrgUrl(packageId),
      group,
    });
  };

  for (const pkg of packages) {
    if (!pkg.nuget) continue;
    const href = `/packages/${pkg.slug}/`;
    add(packageIdFromNugetUrl(pkg.nuget) ?? pkg.name, href, pkg.group);
    for (const id of pkg.installPackages ?? []) {
      add(id, href, pkg.group);
    }
    for (const id of companionPackageIds[pkg.slug] ?? []) {
      add(id, href, pkg.group);
    }
  }

  for (const item of packageFamily) {
    add(item.name, "/packages/plugin-maui-mvvmexpress/", "Application framework");
  }
  for (const item of wpfPackageFamily) {
    add(item.name, "/packages/plugin-wpf-mvvmexpress/", "Application framework");
  }
  for (const family of desktopMvvmFamilies) {
    const href = `/packages/${family.platform.slug}/`;
    for (const item of family.packageFamily) {
      add(item.name, href, "Application framework");
    }
  }

  for (const toolkit of toolkits) {
    const href = toolkitPath(toolkit);
    add(toolkit.packageId, href, "Toolkits", toolkit.packageId);
    add(toolkit.hostPackageId, href, "Toolkits", toolkit.hostPackageId);
  }

  add(uiKit.packageId, uiKitHref, "UI kit");
  add(nuvexaDb.packageId, "/nuvexadb/", "Database");

  return [...byId.values()].sort((left, right) => left.id.localeCompare(right.id));
}

export function catalogNugetMap(): Map<string, TrackedNugetPackage> {
  return new Map(listedNugetPackages().map((item) => [item.id.toLowerCase(), item]));
}

export async function loadNugetStats(options: {
  onPackages: (packages: NugetPackageStats[]) => void;
  onPackage?: (pkg: NugetPackageStats) => void;
  onDatesProgress?: (done: number, total: number) => void;
  signal?: AbortSignal;
}): Promise<void> {
  const catalog = catalogNugetMap();
  const hits = new Map<string, SearchHit>();

  const publish = () => {
    throwIfAborted(options.signal);
    options.onPackages(
      [...hits.values()]
        .map((hit) => toPackageStats(hit, catalog))
        .sort((left, right) => left.id.localeCompare(right.id)),
    );
  };

  for (const query of ownerQueries) {
    throwIfAborted(options.signal);
    const batch = await queryWithFallback(query, options.signal);
    let added = 0;
    for (const hit of batch) {
      if (!isOwnedPackage(hit)) continue;
      const id = hit.id?.trim();
      if (!id || hits.has(id.toLowerCase())) continue;
      hits.set(id.toLowerCase(), hit);
      added += 1;
    }
    if (added > 0) publish();
  }

  const missing = [...catalog.values()].filter((item) => !hits.has(item.id.toLowerCase()));
  for (const pkg of missing) {
    throwIfAborted(options.signal);
    const hit = await queryExactPackage(pkg.id, options.signal);
    if (hit?.id) {
      hits.set(hit.id.toLowerCase(), hit);
      publish();
    }
  }

  if (hits.size === 0) publish();

  const listed = [...hits.values()]
    .map((hit) => toPackageStats(hit, catalog))
    .sort((left, right) => left.id.localeCompare(right.id));
  await hydratePublishedDates(listed, options);
}

function toPackageStats(hit: SearchHit, catalog: Map<string, TrackedNugetPackage>): NugetPackageStats {
  const id = hit.id?.trim() || "Unknown";
  const known = catalog.get(id.toLowerCase());
  const versions = (hit.versions ?? [])
    .flatMap((item): NugetVersionStats[] => {
      const version = item.version?.trim();
      if (!version) return [];
      return [
        {
          version,
          downloads: typeof item.downloads === "number" ? item.downloads : 0,
          prerelease: isPrereleaseVersion(version),
          publishedAt: null,
        },
      ];
    })
    .sort((left, right) => compareNugetVersions(right.version, left.version));

  return {
    id,
    title: known?.title ?? id,
    href: known?.href ?? inferHref(id),
    nugetUrl: nugetOrgUrl(id),
    group: known?.group ?? inferGroup(id),
    currentVersion: hit.version ?? versions[0]?.version ?? null,
    totalDownloads: typeof hit.totalDownloads === "number" ? hit.totalDownloads : 0,
    versions,
    published: true,
    owners: asStringList(hit.owners),
  };
}

function inferHref(packageId: string): string {
  if (packageId.startsWith("Plugin.Maui.HttpForge")) return "/packages/plugin-maui-httpforge/";
  if (packageId.startsWith("Plugin.Maui.MVVMExpress")) return "/packages/plugin-maui-mvvmexpress/";
  if (packageId.startsWith("Plugin.Wpf.MVVMExpress")) return "/packages/plugin-wpf-mvvmexpress/";
  if (packageId.startsWith("Plugin.Avalonia.MVVMExpress")) return "/packages/plugin-avalonia-mvvmexpress/";
  if (packageId.startsWith("Plugin.Uno.MVVMExpress")) return "/packages/plugin-uno-mvvmexpress/";
  if (packageId.startsWith("Plugin.WinUI.MVVMExpress")) return "/packages/plugin-winui-mvvmexpress/";
  if (packageId.startsWith("NuvyntraLabs.UIKit")) return uiKitHref;
  if (packageId.startsWith("Nuventra.NuvexaDB")) return "/nuvexadb/";
  if (packageId.includes("Nuvyn")) return "/toolkits/nuvyn/";
  if (packageId.includes("MauiDev")) return "/toolkits/maui-dev/";
  if (packageId.includes("Pulse")) return "/toolkits/maui-pulse/";
  if (packageId.startsWith("Plugin.Maui.")) {
    const leaf = packageId.replace(/^Plugin\.Maui\./, "").split(".")[0];
    const slug = leaf.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    return `/packages/plugin-maui-${slug}/`;
  }
  return "/packages/";
}

function inferGroup(packageId: string): string {
  if (packageId.includes("MVVMExpress")) return "Application framework";
  if (packageId.includes("UIKit")) return "UI kit";
  if (packageId.includes("NuvexaDB")) return "Database";
  if (packageId.includes("Cli") || packageId.includes("Pulse") || packageId.includes("MauiDev") || packageId.includes("Nuvyn")) {
    return "Toolkits";
  }
  return "Catalog";
}

function isOwnedPackage(hit: SearchHit): boolean {
  const owners = asStringList(hit.owners).join(" ").toLowerCase();
  const authors = asStringList(hit.authors).join(" ").toLowerCase();
  if (owners.includes("niladri")) return true;
  if (authors.includes("niladri")) return true;
  return false;
}

function asStringList(value: string[] | string | undefined): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item));
  if (typeof value === "string" && value.trim()) return [value];
  return [];
}

async function queryNugetSearchPage(
  endpoint: string,
  query: string,
  signal?: AbortSignal,
): Promise<SearchHit[]> {
  const url = `${endpoint}?q=${encodeURIComponent(query)}&prerelease=true&take=250&semVerLevel=2.0.0`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`nuget.org search returned ${response.status}`);
  }
  const payload = (await response.json()) as SearchResponse;
  return payload.data ?? [];
}

async function queryWithFallback(query: string, signal?: AbortSignal): Promise<SearchHit[]> {
  try {
    return await queryNugetSearchPage(nugetSearchSources.primary, query, signal);
  } catch (cause) {
    if (isAbortError(cause)) throw cause;
    return queryNugetSearchPage(nugetSearchSources.fallback, query, signal);
  }
}

async function queryExactPackage(packageId: string, signal?: AbortSignal): Promise<SearchHit | null> {
  const hits = await queryWithFallback(`packageid:${packageId}`, signal);
  const expected = packageId.toLowerCase();
  return hits.find((item) => item.id?.toLowerCase() === expected) ?? null;
}

type RegistrationLeaf = {
  catalogEntry?: {
    version?: string;
    published?: string;
  };
};

type RegistrationPage = {
  "@id"?: string;
  items?: RegistrationLeaf[];
};

type RegistrationIndex = {
  items?: RegistrationPage[];
};

async function hydratePublishedDates(
  listed: NugetPackageStats[],
  options: {
    onPackage?: (pkg: NugetPackageStats) => void;
    onDatesProgress?: (done: number, total: number) => void;
    signal?: AbortSignal;
  },
): Promise<void> {
  const total = listed.length;
  let done = 0;
  let cursor = 0;
  const concurrency = Math.min(8, total || 1);
  options.onDatesProgress?.(0, total);

  async function worker() {
    while (cursor < listed.length) {
      throwIfAborted(options.signal);
      const current = cursor;
      cursor += 1;
      const dates = await fetchVersionPublishedDates(listed[current].id, options.signal);
      const updated = {
        ...listed[current],
        versions: listed[current].versions.map((version) => ({
          ...version,
          publishedAt: dates.get(normalizeVersionKey(version.version)) ?? version.publishedAt,
        })),
      };
      done += 1;
      options.onPackage?.(updated);
      options.onDatesProgress?.(done, total);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
}

async function fetchVersionPublishedDates(
  packageId: string,
  signal?: AbortSignal,
): Promise<Map<string, string>> {
  const dates = new Map<string, string>();
  try {
    const index = await fetchJson<RegistrationIndex>(
      `https://api.nuget.org/v3/registration5-semver1/${encodeURIComponent(packageId.toLowerCase())}/index.json`,
      signal,
    );
    for (const page of index.items ?? []) {
      throwIfAborted(signal);
      const leaves = page.items ?? (page["@id"] ? (await fetchJson<RegistrationPage>(page["@id"], signal)).items : []);
      for (const leaf of leaves ?? []) {
        const version = leaf.catalogEntry?.version?.trim();
        const publishedAt = publishedTimestamp(leaf.catalogEntry?.published);
        if (version && publishedAt) dates.set(normalizeVersionKey(version), publishedAt);
      }
    }
  } catch (cause) {
    if (isAbortError(cause)) throw cause;
    return dates;
  }
  return dates;
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`nuget.org registration returned ${response.status}`);
  }
  return (await response.json()) as T;
}

function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new DOMException("Aborted", "AbortError");
  }
}

function isAbortError(cause: unknown): boolean {
  return cause instanceof DOMException && cause.name === "AbortError";
}

function publishedTimestamp(value: string | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime()) || date.getUTCFullYear() <= 1900) return null;
  return date.toISOString();
}

function normalizeVersionKey(version: string): string {
  return version.trim().split("+")[0].toLowerCase();
}

function parseNugetVersion(version: string): { core: number[]; pre: string } {
  const [core, ...preParts] = version.split("-");
  return {
    core: core.split(".").map((part) => Number.parseInt(part, 10) || 0),
    pre: preParts.join("-"),
  };
}
