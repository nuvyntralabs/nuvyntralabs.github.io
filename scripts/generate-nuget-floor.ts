import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  fetchGalleryOwnerTotals,
  floorFromPackageStats,
  mergeDownloadFloors,
  type NugetDownloadFloor,
} from "../lib/nuget-download-floor";
import { loadNugetStats, nugetOwnerId } from "../lib/nuget-stats";

const outFile = join(process.cwd(), "content/nuget-download-floor.json");

async function main() {
  try {
    const existing = readExistingFloor();
    const galleryFloor = await loadGalleryFloor();
    const searchFloor = await loadSearchFloor();
    const next = mergeDownloadFloors(existing, galleryFloor, searchFloor);
    if (next.packageCount === 0) {
      throw new Error("nuget.org returned no owner package totals");
    }

    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, `${JSON.stringify(next, null, 2)}\n`);
    console.log(
      `Wrote ${next.packageCount} packages / ${next.totalDownloads.toLocaleString("en-US")} downloads to ${outFile}`,
    );
  } catch (cause) {
    console.warn(
      "nuget download floor skipped:",
      cause instanceof Error ? cause.message : cause,
    );
  }
}

async function loadGalleryFloor() {
  try {
    const packages = await fetchGalleryOwnerTotals(nugetOwnerId);
    return {
      updatedAt: new Date().toISOString(),
      source: `nuget.org/profiles/${nugetOwnerId}`,
      packageCount: Object.keys(packages).length,
      totalDownloads: Object.values(packages).reduce((sum, pkg) => sum + pkg.totalDownloads, 0),
      packages,
    };
  } catch (cause) {
    console.warn(
      "nuget.org gallery floor unavailable:",
      cause instanceof Error ? cause.message : cause,
    );
    return null;
  }
}

async function loadSearchFloor() {
  try {
    let packages: Array<{
      id: string;
      totalDownloads: number;
      versions: Array<{ version: string; downloads: number }>;
    }> = [];
    await loadNugetStats({
      includePublishedDates: false,
      onPackages: (next) => {
        packages = next;
      },
    });
    return floorFromPackageStats(packages, "nuget.org SearchQueryService");
  } catch (cause) {
    console.warn(
      "nuget.org search floor unavailable:",
      cause instanceof Error ? cause.message : cause,
    );
    return null;
  }
}

function readExistingFloor(): NugetDownloadFloor | null {
  try {
    return JSON.parse(readFileSync(outFile, "utf8")) as NugetDownloadFloor;
  } catch {
    return null;
  }
}

void main();
