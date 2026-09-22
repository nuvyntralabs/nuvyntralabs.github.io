/** Fields that match DEV’s article editor and `POST /api/articles`. */

export const DEVTO_MAX_TAGS = 4;
export const DEVTO_MAX_TAG_LENGTH = 30;
export const DEVTO_MAX_TITLE = 128;
export const VLOG_SERIES = "NuvyntraLabs";

export const DEVTO_ARTICLES_URL = "https://dev.to/api/articles";
export const DEVTO_ME_URL = "https://dev.to/api/users/me";
export const DEVTO_DASHBOARD_URL = "https://dev.to/dashboard";
export const DEVTO_SESSION_KEY = "nuvyntra-devto-draft";
export const VLOG_SAVED_NOTICE_KEY = "nuvyntra-vlog-saved";
export const LOCAL_DRAFT_URL = "http://127.0.0.1:8787/draft";
export const VLOG_ISSUE_MARKER = "nuvyntra-vlog-draft";
export const VLOG_ISSUE_REPO = "nuvyntralabs/nuvyntralabs.github.io";

export type VlogDraftFields = {
  title: string;
  developerName: string;
  professionalProfile: string;
  description: string;
  contentMarkdown: string;
  coverImageURL: string;
  tags: string[];
  canonicalUrl: string;
};

export const emptyVlogDraft: VlogDraftFields = {
  title: "",
  developerName: "",
  professionalProfile: "",
  description: "",
  contentMarkdown: "",
  coverImageURL: "",
  tags: [],
  canonicalUrl: "",
};

export type DevtoProfile = {
  username: string;
  name: string;
};

export type DevtoSession = DevtoProfile & {
  apiKey: string;
};

export type SavedVlog = {
  id?: number;
  url?: string;
  published: boolean;
};

function optionalText(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** DEV tags are lowercase letters and numbers, with no spaces or punctuation. */
export function devTag(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function validateVlogDraft(fields: VlogDraftFields): string | null {
  const title = fields.title.trim();
  if (!title) return "Add a title.";
  if (title.length > DEVTO_MAX_TITLE) {
    return `DEV allows titles up to ${DEVTO_MAX_TITLE} characters.`;
  }
  if (!fields.developerName.trim()) return "Add the contributor name.";
  if (!fields.contentMarkdown.trim()) return "Tell the story before saving the vlog.";
  if (fields.tags.length > DEVTO_MAX_TAGS) {
    return `DEV allows up to ${DEVTO_MAX_TAGS} tags.`;
  }
  for (const tag of fields.tags) {
    const normalized = devTag(tag);
    if (!normalized) return "Each tag needs at least one letter or number.";
    if (normalized.length > DEVTO_MAX_TAG_LENGTH) {
      return `Each tag can be at most ${DEVTO_MAX_TAG_LENGTH} characters.`;
    }
  }

  const urls: Array<[string, string]> = [
    ["Cover image", fields.coverImageURL],
    ["Canonical URL", fields.canonicalUrl],
  ];
  const profile = fields.professionalProfile.trim();
  if (profile.includes("://") || profile.startsWith("www.")) {
    urls.push(["Professional profile", profile.startsWith("www.") ? `https://${profile}` : profile]);
  }
  for (const [label, value] of urls) {
    const trimmed = value.trim();
    if (trimmed && !isHttpUrl(trimmed)) {
      return `${label} must start with http:// or https://.`;
    }
  }

  return null;
}

function authorCredit(fields: VlogDraftFields) {
  const name = fields.developerName.trim();
  const profile = fields.professionalProfile.trim();
  const profileUrl = profile.startsWith("www.") ? `https://${profile}` : profile;
  if (isHttpUrl(profileUrl)) return `By [${name}](${profileUrl})`;
  if (profile) return `By **${name}**\n\n${profile}`;
  return `By **${name}**`;
}

/** JSON body for `POST /api/articles`, without the API key. */
export function buildArticleBody(fields: VlogDraftFields): { article: Record<string, unknown> } {
  const article: Record<string, unknown> = {
    title: fields.title.trim(),
    body_markdown: `${fields.contentMarkdown.trim()}\n\n---\n\n${authorCredit(fields)}\n`,
    published: false,
  };

  const description = optionalText(fields.description);
  if (description) article.description = description;

  const cover = optionalText(fields.coverImageURL);
  if (cover) article.main_image = cover;

  const canonical = optionalText(fields.canonicalUrl);
  if (canonical) article.canonical_url = canonical;

  article.series = VLOG_SERIES;

  if (fields.tags.length > 0) {
    article.tags = fields.tags.map((tag) => devTag(tag));
  }

  return { article };
}

export function vlogIssueToken() {
  return process.env.NEXT_PUBLIC_VLOG_ISSUE_TOKEN?.trim() ?? "";
}

function buildVlogIssueBody(fields: VlogDraftFields) {
  return [
    "Submitted from the write-vlog form.",
    "",
    `Contributor: ${fields.developerName.trim()}`,
    "",
    `<!-- ${VLOG_ISSUE_MARKER}:start -->`,
    JSON.stringify(buildArticleBody(fields)),
    `<!-- ${VLOG_ISSUE_MARKER}:end -->`,
  ].join("\n");
}

/** Creates the issue the Actions workflow turns into an unpublished DEV draft. */
export async function createVlogIssue(fields: VlogDraftFields): Promise<void> {
  const token = vlogIssueToken();
  if (!token) throw new Error("The vlog draft service is not configured.");
  const response = await fetch(`https://api.github.com/repos/${VLOG_ISSUE_REPO}/issues`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      title: fields.title.trim(),
      body: buildVlogIssueBody(fields),
    }),
  });
  if (!response.ok) throw new Error("The vlog was not saved.");
}

type DevtoErrorBody = {
  id?: number;
  url?: string;
  published?: boolean;
  error?: string | Record<string, unknown>;
  message?: string;
};

function devtoError(payload: DevtoErrorBody | null, status: number) {
  if (typeof payload?.error === "string" && payload.error.trim()) return payload.error;
  if (payload?.error && typeof payload.error === "object") return JSON.stringify(payload.error);
  if (payload?.message) return payload.message;
  return `DEV returned ${status}.`;
}

async function readDevto<T>(response: Response): Promise<T> {
  const payload = (await response.json().catch(() => null)) as (T & DevtoErrorBody) | null;
  if (!response.ok || !payload) {
    throw new Error(devtoError(payload, response.status));
  }
  return payload;
}

export async function connectDevto(apiKey: string): Promise<DevtoProfile> {
  const trimmed = apiKey.trim();
  if (!trimmed) throw new Error("Add a DEV API key.");

  const response = await fetch(DEVTO_ME_URL, {
    headers: {
      Accept: "application/vnd.forem.api-v1+json",
      "api-key": trimmed,
    },
  });
  const profile = await readDevto<{ username?: string; name?: string }>(response);
  if (!profile.username) {
    throw new Error("That API key was not accepted. Generate a new one in DEV extensions settings.");
  }
  return { username: profile.username, name: profile.name?.trim() || profile.username };
}

export function readDevtoSession(): DevtoSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(DEVTO_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DevtoSession;
    if (!parsed.apiKey || !parsed.username) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeDevtoSession(session: DevtoSession | null) {
  if (typeof window === "undefined") return;
  if (session) sessionStorage.setItem(DEVTO_SESSION_KEY, JSON.stringify(session));
  else sessionStorage.removeItem(DEVTO_SESSION_KEY);
}

export async function submitVlogDraft(
  fields: VlogDraftFields,
  options: { apiKey?: string; useLocalProxy?: boolean },
): Promise<SavedVlog> {
  const error = validateVlogDraft(fields);
  if (error) throw new Error(error);

  const endpoint =
    process.env.NEXT_PUBLIC_VLOG_DRAFT_URL?.trim() ||
    (options.useLocalProxy ? LOCAL_DRAFT_URL : "");
  const body = JSON.stringify(buildArticleBody(fields));

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    const payload = await readDevto<DevtoErrorBody>(response);
    return {
      id: payload.id,
      url: payload.url,
      published: false,
    };
  }

  const apiKey = options.apiKey?.trim();
  if (!apiKey) {
    throw new Error("Connect DEV with an API key, or start the local draft server that reads DEVTO_API_KEY from .env.local.");
  }

  const response = await fetch(DEVTO_ARTICLES_URL, {
    method: "POST",
    headers: {
      Accept: "application/vnd.forem.api-v1+json",
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body,
  });
  const payload = await readDevto<DevtoErrorBody>(response);
  return {
    id: payload.id,
    url: payload.url,
    published: false,
  };
}
