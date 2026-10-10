import { apiLens, apiLensHref } from "@/content/apilens";
import { desktopMvvmFamilies } from "@/content/desktop-mvvmexpress";
import { packageFamily } from "@/content/mvvmexpress";
import { nuvexaDb } from "@/content/nuvexadb";
import { packages } from "@/content/packages";
import { toolkitPath, toolkits } from "@/content/toolkits";
import { uiKit, uiKitHref } from "@/content/uikit";
import { wpfPackageFamily } from "@/content/wpf-mvvmexpress";
import {
  applyPackageFloor,
  bundledNugetDownloadFloor,
  floorFromPackageStats,
  mergeDownloadFloors,
  readClientDownloadFloor,
  writeClientDownloadFloor,
  type NugetDownloadFloor,
} from "@/lib/nuget-download-floor";

export const nugetStatsPath = "/stats/";
export const dotnetNugetGroup = ".NET Essentials";
export const dotnetNugetStatsAnchor = "nuget-stats";

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

// Owner search matches the nuget.org profile. Author search is fuzzy and pulls
// unrelated MauiEssentials hits, then first-wins can keep a stale replica count.
const ownerQueries = [`owners:${nugetOwnerId}`];

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

  for (const item of apiLens.packages) {
    add(item.id, apiLensHref, dotnetNugetGroup, item.id);
  }

  return [...byId.values()].sort((left, right) => left.id.localeCompare(right.id));
}

export function catalogNugetMap(): Map<string, TrackedNugetPackage> {
  return new Map(listedNugetPackages().map((item) => [item.id.toLowerCase(), item]));
}

// Page total = sum(package.totalDownloads).
// Each package total = max(
//   nuget.org gallery high-water mark (build-time floor + localStorage),
//   SearchQueryService.totalDownloads from every live replica,
//   sum of that replica's version downloads
// ).
// nuget.org search shards lag the owner profile; they must not pull a count backward.
export async function loadNugetStats(options: {
  onPackages: (packages: NugetPackageStats[]) => void;
  onPackage?: (pkg: NugetPackageStats) => void;
  onDatesProgress?: (done: number, total: number) => void;
  signal?: AbortSignal;
  packageIds?: readonly string[];
  includePublishedDates?: boolean;
}): Promise<void> {
  const catalog = catalogNugetMap();
  const hits = new Map<string, SearchHit>();
  const floor = mergeDownloadFloors(bundledNugetDownloadFloor(), readClientDownloadFloor());

  const publish = () => {
    throwIfAborted(options.signal);
    const listed = listedStats(hits, catalog, floor);
    writeClientDownloadFloor(floorFromPackageStats(listed, "client-watermark"));
    options.onPackages(listed);
  };

  const scopedIds = options.packageIds?.map((id) => id.trim()).filter(Boolean);
  if (scopedIds?.length) {
    for (const id of scopedIds) {
      throwIfAborted(options.signal);
      const hit = await queryExactPackage(id, options.signal);
      if (hit?.id) {
        rememberHit(hits, hit);
        publish();
      }
    }
    if (hits.size === 0) publish();
    await hydrateListedDates(hits, catalog, floor, options);
    return;
  }

  for (const query of ownerQueries) {
    throwIfAborted(options.signal);
    const batch = await queryWithFallback(query, options.signal);
    let changed = 0;
    for (const hit of batch) {
      if (!isOwnedPackage(hit)) continue;
      if (rememberHit(hits, hit)) changed += 1;
    }
    if (changed > 0) publish();
  }

  const missing = [...catalog.values()].filter((item) => !hits.has(item.id.toLowerCase()));
  for (const pkg of missing) {
    throwIfAborted(options.signal);
    const hit = await queryExactPackage(pkg.id, options.signal);
    if (hit?.id) {
      rememberHit(hits, hit);
      publish();
    }
  }

  if (hits.size === 0) publish();

  await hydrateListedDates(hits, catalog, floor, options);
}

async function hydrateListedDates(
  hits: Map<string, SearchHit>,
  catalog: Map<string, TrackedNugetPackage>,
  floor: NugetDownloadFloor,
  options: {
    onPackage?: (pkg: NugetPackageStats) => void;
    onDatesProgress?: (done: number, total: number) => void;
    signal?: AbortSignal;
    includePublishedDates?: boolean;
  },
): Promise<void> {
  if (options.includePublishedDates === false) return;
  await hydratePublishedDates(listedStats(hits, catalog, floor), options);
}

function listedStats(
  hits: Map<string, SearchHit>,
  catalog: Map<string, TrackedNugetPackage>,
  floor: NugetDownloadFloor,
): NugetPackageStats[] {
  return [...hits.values()]
    .map((hit) => applyPackageFloor(toPackageStats(hit, catalog), floor))
    .sort((left, right) => left.id.localeCompare(right.id));
}

function rememberHit(hits: Map<string, SearchHit>, hit: SearchHit): boolean {
  const id = hit.id?.trim();
  if (!id) return false;
  const key = id.toLowerCase();
  const existing = hits.get(key);
  const next = existing ? fresherSearchHit(existing, hit) : hit;
  hits.set(key, next);
  return !existing || next !== existing;
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
    totalDownloads: Math.max(
      typeof hit.totalDownloads === "number" ? hit.totalDownloads : 0,
      versions.reduce((sum, version) => sum + version.downloads, 0),
    ),
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
  if (packageId.startsWith("NuvyntraLabs.NET.ApiLens")) return "/dotnet/apilens/";
  if (packageId === "NuvyntraLabs.NET.Guard") return "/packages/nuvyntralabs-net-guard/";
  if (packageId === "NuvyntraLabs.NET.DataMask") return "/packages/nuvyntralabs-net-datamask/";
  if (packageId === "NuvyntraLabs.NET.TimeKit") return "/packages/nuvyntralabs-net-timekit/";
  if (packageId === "NuvyntraLabs.NET.Identifiers") return "/packages/nuvyntralabs-net-identifiers/";
  if (packageId === "NuvyntraLabs.NET.Result") return "/packages/nuvyntralabs-net-result/";
  if (packageId === "NuvyntraLabs.NET.ObjectKit") return "/packages/nuvyntralabs-net-objectkit/";
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
  if (
    packageId === "NuvyntraLabs.NET.Guard" ||
    packageId === "NuvyntraLabs.NET.DataMask" ||
    packageId === "NuvyntraLabs.NET.TimeKit" ||
    packageId === "NuvyntraLabs.NET.Identifiers" ||
    packageId === "NuvyntraLabs.NET.Result" ||
    packageId === "NuvyntraLabs.NET.ObjectKit"
  ) {
    return "Shared libraries";
  }
  if (packageId.startsWith("NuvyntraLabs.NET.")) return dotnetNugetGroup;
  if (packageId.includes("Cli") || packageId.includes("Pulse") || packageId.includes("MauiDev") || packageId.includes("Nuvyn")) {
    return "Toolkits";
  }
  return "Catalog";
}

function isOwnedPackage(hit: SearchHit): boolean {
  const owners = asStringList(hit.owners).map((item) => item.toLowerCase());
  return owners.includes(nugetOwnerId.toLowerCase());
}

function asStringList(value: string[] | string | undefined): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item));
  if (typeof value === "string" && value.trim()) return [value];
  return [];
}

const nugetSearchEndpoints = [nugetSearchSources.primary, nugetSearchSources.fallback];

async function queryNugetSearchPage(
  endpoint: string,
  query: string,
  signal?: AbortSignal,
  skip = 0,
): Promise<SearchResponse> {
  const url = `${endpoint}?q=${encodeURIComponent(query)}&prerelease=true&take=250&skip=${skip}&semVerLevel=2.0.0`;
  const response = await fetch(url, { signal, cache: "no-store" });
  if (!response.ok) {
    throw new Error(`nuget.org search returned ${response.status}`);
  }
  return (await response.json()) as SearchResponse;
}

async function queryNugetSearchAll(
  endpoint: string,
  query: string,
  signal?: AbortSignal,
): Promise<SearchHit[]> {
  const hits: SearchHit[] = [];
  let skip = 0;
  const take = 250;
  while (skip <= 3000) {
    const payload = await queryNugetSearchPage(endpoint, query, signal, skip);
    const page = payload.data ?? [];
    hits.push(...page);
    if (page.length < take || hits.length >= (payload.totalHits ?? page.length)) break;
    skip += take;
  }
  return hits;
}

let cachedSearchEndpoints: string[] | null = null;

async function resolveSearchEndpoints(signal?: AbortSignal): Promise<string[]> {
  if (cachedSearchEndpoints) return cachedSearchEndpoints;
  try {
    const index = await fetchJson<{ resources?: Array<{ "@id"?: string; "@type"?: string }> }>(
      "https://api.nuget.org/v3/index.json",
      signal,
    );
    const found = [...new Set(
      (index.resources ?? [])
        .filter((resource) => resource["@type"]?.includes("SearchQueryService") && resource["@id"])
        .map((resource) => resource["@id"] as string),
    )];
    if (found.length > 0) {
      cachedSearchEndpoints = found;
      return found;
    }
  } catch (cause) {
    if (isAbortError(cause)) throw cause;
  }
  return nugetSearchEndpoints;
}

async function queryWithFallback(query: string, signal?: AbortSignal): Promise<SearchHit[]> {
  const endpoints = await resolveSearchEndpoints(signal);
  const settled = await Promise.all(
    endpoints.map(async (endpoint) => {
      try {
        return { ok: true as const, hits: await queryNugetSearchAll(endpoint, query, signal) };
      } catch (cause) {
        if (isAbortError(cause)) throw cause;
        return { ok: false as const, hits: [] as SearchHit[] };
      }
    }),
  );

  if (settled.every((result) => !result.ok)) {
    throw new Error("nuget.org search is unavailable");
  }

  // Search replicas and the nuget.org gallery update download counts on different
  // schedules. Keep the higher count so a stale replica cannot pull the total down.
  return mergeSearchHits(settled.map((result) => result.hits));
}

function mergeSearchHits(batches: SearchHit[][]): SearchHit[] {
  const byId = new Map<string, SearchHit>();
  for (const batch of batches) {
    for (const hit of batch) {
      const id = hit.id?.trim().toLowerCase();
      if (!id) continue;
      const existing = byId.get(id);
      byId.set(id, existing ? fresherSearchHit(existing, hit) : hit);
    }
  }
  return [...byId.values()];
}

function fresherSearchHit(left: SearchHit, right: SearchHit): SearchHit {
  const leftDownloads = left.totalDownloads ?? 0;
  const rightDownloads = right.totalDownloads ?? 0;
  const base = rightDownloads > leftDownloads ? right : left;
  return {
    ...base,
    totalDownloads: Math.max(leftDownloads, rightDownloads),
    versions: mergeSearchVersions(left.versions, right.versions),
  };
}

function mergeSearchVersions(
  left: SearchVersion[] | undefined,
  right: SearchVersion[] | undefined,
): SearchVersion[] {
  const byVersion = new Map<string, SearchVersion>();
  for (const item of [...(left ?? []), ...(right ?? [])]) {
    const version = item.version?.trim();
    if (!version) continue;
    const key = version.toLowerCase();
    const existing = byVersion.get(key);
    if (!existing || (item.downloads ?? 0) > (existing.downloads ?? 0)) {
      byVersion.set(key, item);
    }
  }
  return [...byVersion.values()];
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
