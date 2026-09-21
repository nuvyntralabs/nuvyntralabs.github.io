import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fetchOpenReposSnapshot } from "../lib/open-repos";

const outDir = join(process.cwd(), "public/data");
const outFile = join(outDir, "open-repos.json");

async function main() {
  try {
    const snapshot = await fetchOpenReposSnapshot(process.env.GITHUB_TOKEN);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(outFile, `${JSON.stringify(snapshot, null, 2)}\n`);
    const open = snapshot.repos.filter(
      (repo) => repo.issues.length > 0 || repo.discussions.length > 0,
    ).length;
    console.log(`Wrote ${snapshot.repos.length} repos (${open} with open threads) to ${outFile}`);
  } catch (cause) {
    console.warn(
      "open-repos snapshot skipped:",
      cause instanceof Error ? cause.message : cause,
    );
  }
}

void main();
