import bundledFloor from "@/content/nuget-download-floor.json";

export const nugetDownloadFloorStorageKey = "nuvyntra.nuget-download-floor.v1";

export type NugetPackageFloor = {
  id: string;
  totalDownloads: number;
  versions: Record<string, number>;
};

export type NugetDownloadFloor = {
  updatedAt: string;
  source: string;
  packageCount: number;
  totalDownloads: number;
  packages: Record<string, NugetPackageFloor>;
};

const emptyFloor = (): NugetDownloadFloor => ({
  updatedAt: new Date(0).toISOString(),
  source: "empty",
  packageCount: 0,
  totalDownloads: 0,
  packages: {},
});

export function bundledNugetDownloadFloor(): NugetDownloadFloor {
  return normalizeFloor(bundledFloor);
}

export function mergeDownloadFloors(...floors: Array<NugetDownloadFloor | null | undefined>): NugetDownloadFloor {
  const merged = emptyFloor();
  const sources: string[] = [];

  for (const floor of floors) {
    const normalized = normalizeFloor(floor);
    if (!normalized.packageCount && !Object.keys(normalized.packages).length) continue;
    if (normalized.source && !sources.includes(normalized.source)) sources.push(normalized.source);
    if (normalized.updatedAt > merged.updatedAt) merged.updatedAt = normalized.updatedAt;
    for (const [key, pkg] of Object.entries(normalized.packages)) {
      merged.packages[key] = mergePackageFloor(merged.packages[key], pkg);
    }
  }

  return finalizeFloor(merged, sources.join(" + ") || "empty");
}

export function floorFromPackageStats(
  packages: Array<{ id: string; totalDownloads: number; versions: Array<{ version: string; downloads: number }> }>,
  source: string,
): NugetDownloadFloor {
  const floor = emptyFloor();
  for (const pkg of packages) {
    const id = pkg.id.trim();
    if (!id) continue;
    const versions: Record<string, number> = {};
    for (const version of pkg.versions) {
      const name = version.version.trim();
      if (!name) continue;
      versions[normalizeVersionKey(name)] = Math.max(versions[normalizeVersionKey(name)] ?? 0, version.downloads);
    }
    floor.packages[id.toLowerCase()] = {
      id,
      totalDownloads: Math.max(pkg.totalDownloads, sumRecord(versions)),
      versions,
    };
  }
  return finalizeFloor(floor, source);
}

export function applyPackageFloor<T extends { id: string; totalDownloads: number; versions: Array<{ version: string; downloads: number }> }>(
  pkg: T,
  floor: NugetDownloadFloor,
): T {
  const known = floor.packages[pkg.id.toLowerCase()];
  if (!known) {
    const versionSum = pkg.versions.reduce((sum, version) => sum + version.downloads, 0);
    return { ...pkg, totalDownloads: Math.max(pkg.totalDownloads, versionSum) };
  }

  const versions = pkg.versions.map((version) => ({
    ...version,
    downloads: Math.max(version.downloads, known.versions[normalizeVersionKey(version.version)] ?? 0),
  }));
  const versionSum = versions.reduce((sum, version) => sum + version.downloads, 0);
  return {
    ...pkg,
    versions,
    totalDownloads: Math.max(pkg.totalDownloads, versionSum, known.totalDownloads),
  };
}

export function readClientDownloadFloor(): NugetDownloadFloor | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(nugetDownloadFloorStorageKey);
    if (!raw) return null;
    return normalizeFloor(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function writeClientDownloadFloor(floor: NugetDownloadFloor): void {
  if (typeof window === "undefined") return;
  try {
    const next = mergeDownloadFloors(readClientDownloadFloor(), floor);
    window.localStorage.setItem(nugetDownloadFloorStorageKey, JSON.stringify(next));
  } catch {
    // Private mode or a full store should not break live counts.
  }
}

export async function fetchGalleryOwnerTotals(
  ownerId = "niladri.1437",
  signal?: AbortSignal,
): Promise<Record<string, NugetPackageFloor>> {
  const packages: Record<string, NugetPackageFloor> = {};
  const profile = `https://www.nuget.org/profiles/${ownerId}`;

  for (let page = 1; page <= 20; page += 1) {
    throwIfAborted(signal);
    const url = page === 1 ? profile : `${profile}?page=${page}`;
    const html = await fetchText(url, signal);
    const rows = parseGalleryProfilePage(html);
    if (rows.length === 0) break;
    for (const row of rows) {
      const key = row.id.toLowerCase();
      const existing = packages[key];
      packages[key] = {
        id: row.id,
        totalDownloads: Math.max(existing?.totalDownloads ?? 0, row.totalDownloads),
        versions: existing?.versions ?? {},
      };
    }
    if (rows.length < 20) break;
  }

  if (Object.keys(packages).length === 0) {
    throw new Error(`nuget.org profile for ${ownerId} returned no package totals`);
  }
  return packages;
}

export function parseGalleryProfilePage(html: string): Array<{ id: string; totalDownloads: number }> {
  const rows: Array<{ id: string; totalDownloads: number }> = [];
  const pattern = /href="\/packages\/([^"/\s]+)"[\s\S]*?([\d,]+)\s+total downloads/gi;
  for (const match of html.matchAll(pattern)) {
    const id = decodeURIComponent(match[1] ?? "").trim();
    const totalDownloads = Number.parseInt((match[2] ?? "").replace(/,/g, ""), 10);
    if (!id || id === "manage" || !Number.isFinite(totalDownloads)) continue;
    rows.push({ id, totalDownloads });
  }
  return rows;
}

function normalizeFloor(value: unknown): NugetDownloadFloor {
  const floor = emptyFloor();
  if (!value || typeof value !== "object") return floor;
  const raw = value as Partial<NugetDownloadFloor>;
  if (typeof raw.updatedAt === "string" && !Number.isNaN(Date.parse(raw.updatedAt))) {
    floor.updatedAt = new Date(raw.updatedAt).toISOString();
  }
  if (typeof raw.source === "string") floor.source = raw.source;
  const packages = raw.packages && typeof raw.packages === "object" ? raw.packages : {};
  for (const [key, pkg] of Object.entries(packages)) {
    if (!pkg || typeof pkg !== "object") continue;
    const id = typeof pkg.id === "string" && pkg.id.trim() ? pkg.id.trim() : key;
    const versions: Record<string, number> = {};
    for (const [version, downloads] of Object.entries(pkg.versions ?? {})) {
      if (typeof downloads !== "number" || downloads < 0) continue;
      versions[normalizeVersionKey(version)] = Math.max(versions[normalizeVersionKey(version)] ?? 0, downloads);
    }
    floor.packages[id.toLowerCase()] = {
      id,
      totalDownloads: Math.max(typeof pkg.totalDownloads === "number" ? pkg.totalDownloads : 0, sumRecord(versions)),
      versions,
    };
  }
  return finalizeFloor(floor, floor.source);
}

function mergePackageFloor(left: NugetPackageFloor | undefined, right: NugetPackageFloor): NugetPackageFloor {
  if (!left) return right;
  const versions = { ...left.versions };
  for (const [version, downloads] of Object.entries(right.versions)) {
    versions[version] = Math.max(versions[version] ?? 0, downloads);
  }
  return {
    id: right.id || left.id,
    totalDownloads: Math.max(left.totalDownloads, right.totalDownloads, sumRecord(versions)),
    versions,
  };
}

function finalizeFloor(floor: NugetDownloadFloor, source: string): NugetDownloadFloor {
  const packages = Object.fromEntries(
    Object.entries(floor.packages).sort(([left], [right]) => left.localeCompare(right)),
  );
  return {
    updatedAt: floor.updatedAt === new Date(0).toISOString() ? new Date().toISOString() : floor.updatedAt,
    source,
    packageCount: Object.keys(packages).length,
    totalDownloads: Object.values(packages).reduce((sum, pkg) => sum + pkg.totalDownloads, 0),
    packages,
  };
}

function sumRecord(values: Record<string, number>): number {
  return Object.values(values).reduce((sum, value) => sum + value, 0);
}

function normalizeVersionKey(version: string): string {
  return version.trim().split("+")[0].toLowerCase();
}

async function fetchText(url: string, signal?: AbortSignal): Promise<string> {
  const response = await fetch(url, {
    signal,
    cache: "no-store",
    headers: { Accept: "text/html", "User-Agent": "nuvyntralabs.github.io nuget-download-floor" },
  });
  if (!response.ok) {
    throw new Error(`nuget.org profile returned ${response.status}`);
  }
  return response.text();
}

function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new DOMException("Aborted", "AbortError");
  }
}
