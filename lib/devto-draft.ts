/** Fields that match DEV’s article editor and `POST /api/articles`. */

export const DEVTO_MAX_TAGS = 4;
export const DEVTO_MAX_TAG_LENGTH = 30;
export const DEVTO_MAX_TITLE = 128;
export const VLOG_SERIES = "NuvyntraLabs";

export const VLOG_SAVED_NOTICE_KEY = "nuvyntra-vlog-saved";

const DEFAULT_VLOG_DRAFT_URL = "https://nuvyntra-vlog-draft.niladri-1437.workers.dev/draft";

/** Cloudflare Worker that saves the unpublished DEV draft. */
export const VLOG_DRAFT_URL = process.env.NEXT_PUBLIC_VLOG_DRAFT_URL?.trim() || DEFAULT_VLOG_DRAFT_URL;

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

async function postDraft(body: string): Promise<SavedVlog> {
  const response = await fetch(VLOG_DRAFT_URL, {
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

export async function submitVlogDraft(fields: VlogDraftFields): Promise<SavedVlog> {
  const error = validateVlogDraft(fields);
  if (error) throw new Error(error);
  try {
    return await postDraft(JSON.stringify(buildArticleBody(fields)));
  } catch (submitError) {
    if (submitError instanceof TypeError) {
      throw new Error("The draft service could not be reached.");
    }
    throw submitError;
  }
}
