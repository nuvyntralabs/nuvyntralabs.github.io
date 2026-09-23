const articlesUrl = "https://dev.to/api/articles";
const series = "NuvyntraLabs";
const maxTitle = 128;
const maxTags = 4;
const maxTagLength = 30;
const maxBody = 80_000;

function allowedOrigin(origin) {
  if (!origin) return "*";
  if (origin === "https://nuvyntralabs.github.io") return origin;
  try {
    const url = new URL(origin);
    if (
      url.protocol === "http:" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1")
    ) {
      return origin;
    }
  } catch {
    return "";
  }
  return "";
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": allowedOrigin(origin) || "null",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
    },
  });
}

function devTag(name) {
  return String(name).trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function draftArticle(input) {
  if (!input || typeof input !== "object") {
    return { error: "Draft body must be JSON." };
  }
  const title = String(input.title ?? "").trim();
  const body = String(input.body_markdown ?? "").trim();
  if (!title || !body) {
    return { error: "A DEV article needs a title and a markdown body." };
  }
  if (title.length > maxTitle) {
    return { error: `DEV allows titles up to ${maxTitle} characters.` };
  }
  if (body.length > maxBody) {
    return { error: "The story is too long." };
  }

  const article = {
    title,
    body_markdown: body,
    published: false,
    series,
  };

  const description = String(input.description ?? "").trim();
  if (description) article.description = description.slice(0, 500);

  const cover = String(input.main_image ?? "").trim();
  if (cover) {
    if (!isHttpUrl(cover)) return { error: "Cover image must start with http:// or https://." };
    article.main_image = cover;
  }

  const canonical = String(input.canonical_url ?? "").trim();
  if (canonical) {
    if (!isHttpUrl(canonical)) return { error: "Canonical URL must start with http:// or https://." };
    article.canonical_url = canonical;
  }

  if (Array.isArray(input.tags) && input.tags.length > 0) {
    if (input.tags.length > maxTags) return { error: `DEV allows up to ${maxTags} tags.` };
    const tags = [];
    for (const tag of input.tags) {
      const normalized = devTag(tag);
      if (!normalized) return { error: "Each tag needs at least one letter or number." };
      if (normalized.length > maxTagLength) {
        return { error: `Each tag can be at most ${maxTagLength} characters.` };
      }
      tags.push(normalized);
    }
    article.tags = tags;
  }

  return { article };
}

function devError(payload, status) {
  if (typeof payload?.error === "string" && payload.error.trim()) return payload.error;
  if (payload?.error && typeof payload.error === "object") return JSON.stringify(payload.error);
  if (payload?.message) return payload.message;
  return `DEV returned ${status}.`;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") ?? "";
    if (origin && !allowedOrigin(origin)) {
      return json({ error: "This site cannot save a blog." }, 403, origin);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    const pathname = new URL(request.url).pathname;
    if (request.method === "GET" && pathname === "/health") {
      return json({ ok: Boolean(env.DEVTO_API_KEY?.trim()) }, 200, origin);
    }

    if (request.method !== "POST" || pathname !== "/draft") {
      return json({ error: "Not found." }, 404, origin);
    }

    const apiKey = env.DEVTO_API_KEY?.trim() ?? "";
    if (!apiKey) {
      return json({ error: "The draft service is not configured." }, 500, origin);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ error: "Draft body must be JSON." }, 400, origin);
    }

    const draft = draftArticle(payload?.article);
    if (draft.error) return json({ error: draft.error }, 400, origin);

    let response;
    try {
      response = await fetch(articlesUrl, {
        method: "POST",
        headers: {
          Accept: "application/vnd.forem.api-v1+json",
          "Content-Type": "application/json",
          "User-Agent": "NuvyntraLabs (https://nuvyntralabs.github.io)",
          "api-key": apiKey,
        },
        body: JSON.stringify({ article: draft.article }),
      });
    } catch {
      return json({ error: "The draft service could not reach DEV." }, 502, origin);
    }

    const saved = await response.json().catch(() => null);
    if (!response.ok || !saved) {
      return json({ error: devError(saved, response.status) }, 502, origin);
    }

    return json(
      { id: saved.id, url: saved.url, published: false },
      200,
      origin,
    );
  },
};
