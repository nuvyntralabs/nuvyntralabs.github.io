import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";

const articlesUrl = "https://dev.to/api/articles";
const meUrl = "https://dev.to/api/users/me";

function readEnvFile() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return {};
  return Object.fromEntries(
    readFileSync(envPath, "utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        return [line.slice(0, index), line.slice(index + 1)];
      }),
  );
}

function readDesktopToken() {
  const tokenPath = join(homedir(), "Desktop", "token.rtf");
  if (!existsSync(tokenPath)) return "";
  try {
    const text = execFileSync("textutil", ["-convert", "txt", "-stdout", tokenPath], {
      encoding: "utf8",
    });
    return text.trim().split(/\s+/).find((part) => /^[A-Za-z0-9]{20,}$/.test(part)) ?? "";
  } catch {
    return "";
  }
}

const env = readEnvFile();
const token = (process.env.DEVTO_API_KEY || env.DEVTO_API_KEY || readDesktopToken()).trim();
let profile = null;

function send(res, status, body) {
  res.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(body));
}

function errorText(payload, status) {
  if (typeof payload?.error === "string" && payload.error.trim()) return payload.error;
  if (payload?.error && typeof payload.error === "object") return JSON.stringify(payload.error);
  return `DEV returned ${status}.`;
}

async function devto(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/vnd.forem.api-v1+json",
      "Content-Type": "application/json",
      "User-Agent": "NuvyntraLabs (https://nuvyntralabs.github.io)",
      "api-key": token,
      ...options.headers,
    },
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload) {
    throw new Error(errorText(payload, response.status));
  }
  return payload;
}

function failureMessage(error) {
  if (error instanceof Error && error.message === "fetch failed") {
    return "The draft server could not reach DEV. Check the network and try again.";
  }
  return error instanceof Error ? error.message : "DEV did not accept the API key.";
}

async function loadProfile() {
  if (profile) return profile;
  const me = await devto(meUrl);
  if (!me.username) throw new Error("DEV did not accept the API key.");
  profile = { username: me.username, name: me.name || me.username };
  return profile;
}

const server = createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    send(res, 204, {});
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    if (!token) {
      send(res, 200, { ok: false, error: "No DEV API key in .env.local." });
      return;
    }
    try {
      const me = await loadProfile();
      send(res, 200, { ok: true, username: me.username, name: me.name });
    } catch (error) {
      send(res, 200, { ok: false, error: failureMessage(error) });
    }
    return;
  }

  if (req.method !== "POST" || req.url !== "/draft") {
    send(res, 404, { error: "Not found." });
    return;
  }

  if (!token) {
    send(res, 500, { error: "No DEV API key in .env.local." });
    return;
  }

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  let article;
  try {
    article = JSON.parse(Buffer.concat(chunks).toString("utf8")).article;
  } catch {
    send(res, 400, { error: "Draft body must be JSON." });
    return;
  }

  if (!article?.title || !article?.body_markdown) {
    send(res, 400, { error: "A DEV article needs a title and a markdown body." });
    return;
  }

  try {
    const saved = await devto(articlesUrl, {
      method: "POST",
      body: JSON.stringify({ article: { ...article, published: false, series: "NuvyntraLabs" } }),
    });
    send(res, 200, { id: saved.id, url: saved.url, published: Boolean(saved.published) });
  } catch (error) {
    send(res, 502, { error: failureMessage(error) });
  }
});

server.listen(8787, "127.0.0.1", () => {
  console.log("DEV draft server listening on http://127.0.0.1:8787");
});
