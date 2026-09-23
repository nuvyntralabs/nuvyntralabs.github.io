import { readFileSync } from "node:fs";

const marker = "nuvyntra-vlog-draft";
const series = "NuvyntraLabs";
const articlesUrl = "https://dev.to/api/articles";

function fail(message) {
  const error = new Error(message);
  error.vlogFailure = true;
  throw error;
}

function readIssue() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath) fail("GITHUB_EVENT_PATH is missing.");
  const event = JSON.parse(readFileSync(eventPath, "utf8"));
  const issue = event.issue;
  if (!issue?.body || !issue.number) fail("This event has no issue body.");
  return issue;
}

function readPayload(body) {
  const start = `<!-- ${marker}:start -->`;
  const end = `<!-- ${marker}:end -->`;
  const startAt = body.indexOf(start);
  const endAt = body.indexOf(end);
  if (startAt < 0 || endAt < startAt) fail("The issue has no vlog payload.");
  const raw = body.slice(startAt + start.length, endAt).trim();
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    fail("The vlog payload is not valid JSON.");
  }
  const article = parsed?.article;
  if (!article || typeof article !== "object") fail("The vlog payload has no article.");
  return article;
}

function draftArticle(article) {
  const title = String(article.title ?? "").trim();
  const body = String(article.body_markdown ?? "").trim();
  if (!title) fail("The vlog needs a title.");
  if (!body) fail("The vlog needs a story.");
  if (title.length > 128) fail("DEV allows titles up to 128 characters.");

  const draft = {
    title,
    body_markdown: body,
    published: false,
    series,
  };
  const description = String(article.description ?? "").trim();
  if (description) draft.description = description;
  const cover = String(article.main_image ?? "").trim();
  if (cover) draft.main_image = cover;
  const canonical = String(article.canonical_url ?? "").trim();
  if (canonical) draft.canonical_url = canonical;
  if (Array.isArray(article.tags)) {
    const tags = article.tags.map((tag) => String(tag).trim().toLowerCase()).filter(Boolean).slice(0, 4);
    if (tags.length > 0) draft.tags = tags;
  }
  return draft;
}

async function github(path, options = {}) {
  const repository = process.env.GITHUB_REPOSITORY;
  const token = process.env.GITHUB_TOKEN;
  if (!repository || !token) fail("GitHub issue comment credentials are missing.");
  const response = await fetch(`https://api.github.com/repos/${repository}${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "NuvyntraLabs",
      ...options.headers,
    },
  });
  if (!response.ok) {
    const text = await response.text();
    fail(`GitHub returned ${response.status}: ${text.slice(0, 300)}`);
  }
}

async function comment(issueNumber, body) {
  await github(`/issues/${issueNumber}/comments`, {
    method: "POST",
    body: JSON.stringify({ body }),
  });
}

function readProjectToken() {
  const sourcePath = new URL("../lib/devto-api-key.ts", import.meta.url);
  const match = readFileSync(sourcePath, "utf8").match(/DEVTO_API_KEY = "([^"]*)"/);
  return match?.[1]?.trim() ?? "";
}

async function saveDraft(article) {
  const apiKey = readProjectToken();
  if (!apiKey) fail("Add the DEV API key in lib/devto-api-key.ts.");
  const response = await fetch(articlesUrl, {
    method: "POST",
    headers: {
      Accept: "application/vnd.forem.api-v1+json",
      "Content-Type": "application/json",
      "User-Agent": "NuvyntraLabs (https://nuvyntralabs.github.io)",
      "api-key": apiKey,
    },
    body: JSON.stringify({ article }),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload) {
    const detail =
      typeof payload?.error === "string"
        ? payload.error
        : payload?.error
          ? JSON.stringify(payload.error)
          : `DEV returned ${response.status}.`;
    fail(detail);
  }
  return payload;
}

const issue = readIssue();
if (!issue.body.includes(marker)) {
  console.log("Not a vlog issue.");
  process.exit(0);
}

try {
  const saved = await saveDraft(draftArticle(readPayload(issue.body)));
  const link = saved.url ? `\n\n${saved.url}` : "";
  await comment(
    issue.number,
    `Saved as an unpublished draft in the ${series} series.${link}\n\nPublishing still happens in the DEV dashboard after review.`,
  );
  await github(`/issues/${issue.number}`, {
    method: "PATCH",
    body: JSON.stringify({ state: "closed" }),
  });
} catch (error) {
  const message = error instanceof Error ? error.message : "The vlog was not saved.";
  await comment(issue.number, `The vlog was not saved.\n\n${message}`).catch(() => {});
  console.error(message);
  process.exit(1);
}
