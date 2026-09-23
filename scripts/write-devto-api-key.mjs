import { writeFileSync } from "node:fs";

const key = process.env.DEVTO_API_KEY?.trim() ?? "";
if (!key) {
  console.error("DEVTO_API_KEY is not set.");
  process.exit(1);
}

const source = `/** Replaced from the DEVTO_API_KEY Actions secret when the workflow runs. */\nexport const DEVTO_API_KEY = ${JSON.stringify(key)};\n`;
writeFileSync(new URL("../lib/devto-api-key.ts", import.meta.url), source);
console.log("Updated lib/devto-api-key.ts.");
