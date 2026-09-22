"use client";

import { FormEvent, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import {
  DEVTO_MAX_TAGS,
  LOCAL_DRAFT_URL,
  VLOG_SAVED_NOTICE_KEY,
  VLOG_SERIES,
  buildVlogIssueUrl,
  devTag,
  emptyVlogDraft,
  submitVlogDraft,
  validateVlogDraft,
  type VlogDraftFields,
} from "@/lib/devto-draft";

const controlClass =
  "focusable w-full rounded-2xl border border-lavender-200 bg-white/90 px-4 py-3 text-sm text-foreground shadow-soft placeholder:text-muted-foreground dark:border-white/15 dark:bg-white/5 dark:shadow-none";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-foreground">
        {label}
        {required ? (
          <span className="text-red-600 dark:text-red-300" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </span>
      {hint ? (
        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{hint}</span>
      ) : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export function WriteVlogForm() {
  const router = useRouter();
  const [fields, setFields] = useState<VlogDraftFields>(emptyVlogDraft);
  const [tagQuery, setTagQuery] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [localProxy, setLocalProxy] = useState(false);
  const [proxyName, setProxyName] = useState<string | null>(null);
  const serverConnected = Boolean(process.env.NEXT_PUBLIC_VLOG_DRAFT_URL?.trim()) || localProxy;

  useEffect(() => {
    const host = window.location.hostname;
    if (host !== "localhost" && host !== "127.0.0.1") return;
    const healthUrl = LOCAL_DRAFT_URL.replace(/\/draft$/, "/health");
    fetch(healthUrl)
      .then((response) => (response.ok ? response.json() : null))
      .then((body: { ok?: boolean; username?: string; name?: string; error?: string } | null) => {
        setLocalProxy(Boolean(body?.ok));
        setProxyName(body?.name || body?.username || null);
        if (body && body.ok === false && body.error) setMessage(body.error);
      })
      .catch(() => setLocalProxy(false));
  }, []);

  function patch(partial: Partial<VlogDraftFields>) {
    setFields((current) => ({ ...current, ...partial }));
  }

  function addTag(raw: string) {
    const parts = raw
      .split(",")
      .map((part) => devTag(part))
      .filter(Boolean);
    if (parts.length === 0) return;

    const next = [...fields.tags];
    let overflow = false;
    for (const name of parts) {
      if (next.some((tag) => devTag(tag) === name)) continue;
      if (next.length >= DEVTO_MAX_TAGS) {
        overflow = true;
        break;
      }
      next.push(name);
    }
    setFields((current) => ({ ...current, tags: next }));
    setTagQuery("");
    setMessage(overflow ? `DEV allows up to ${DEVTO_MAX_TAGS} tags.` : null);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (honeypot) return;

    const pendingTag = devTag(tagQuery.replace(/,$/, ""));
    const draft =
      pendingTag && !fields.tags.some((tag) => devTag(tag) === pendingTag)
        ? { ...fields, tags: [...fields.tags, pendingTag] }
        : fields;
    const error = validateVlogDraft(draft);
    if (error) {
      setStatus("idle");
      setMessage(error);
      return;
    }

    setStatus("submitting");
    setMessage(null);
    if (!serverConnected) {
      const issueUrl = buildVlogIssueUrl(draft);
      if (issueUrl.length > 7500) {
        setStatus("idle");
        setMessage("This vlog is too long to submit in one step. Shorten the story and try again.");
        return;
      }
      window.location.assign(issueUrl);
      return;
    }
    try {
      await submitVlogDraft(draft, { useLocalProxy: true });
      sessionStorage.setItem(VLOG_SAVED_NOTICE_KEY, "1");
      router.push("/");
    } catch (submitError) {
      setStatus("idle");
      setMessage(submitError instanceof Error ? submitError.message : "The vlog was not saved.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]">
      <div className="glass-card space-y-6 p-6 sm:p-8">
        <Field label="Title" required>
          <input
            required
            aria-required="true"
            name="title"
            maxLength={128}
            value={fields.title}
            onChange={(event) => patch({ title: event.target.value })}
            placeholder="Article title"
            className={controlClass}
          />
        </Field>
        <Field label="Contributor name" required hint="Shown at the end of the published vlog.">
          <input
            required
            aria-required="true"
            name="developerName"
            value={fields.developerName}
            onChange={(event) => patch({ developerName: event.target.value })}
            placeholder="Name that appears on the vlog"
            className={controlClass}
          />
        </Field>
        <Field
          label="Professional profile"
          hint="Optional. A job title, or a link to a site, LinkedIn, or GitHub. A link is shown with the contributor name."
        >
          <input
            name="professionalProfile"
            value={fields.professionalProfile}
            onChange={(event) => patch({ professionalProfile: event.target.value })}
            placeholder="Software engineer, or https://"
            className={controlClass}
          />
        </Field>
        <Field label="Description" hint="Optional summary shown in the DEV feed and search results.">
          <textarea
            name="description"
            value={fields.description}
            onChange={(event) => patch({ description: event.target.value })}
            rows={3}
            placeholder="One or two sentences."
            className={`${controlClass} resize-y`}
          />
        </Field>
        <Field label="Cover image" hint="Public JPG or PNG URL. DEV uses it as the article cover.">
          <input
            name="coverImageURL"
            type="url"
            inputMode="url"
            value={fields.coverImageURL}
            onChange={(event) => patch({ coverImageURL: event.target.value })}
            placeholder="https://"
            className={controlClass}
          />
        </Field>
        <Field label="Tell your story" required hint="Markdown body stored on the DEV article.">
          <textarea
            required
            aria-required="true"
            name="contentMarkdown"
            value={fields.contentMarkdown}
            onChange={(event) => patch({ contentMarkdown: event.target.value })}
            rows={16}
            placeholder="Write the vlog in Markdown."
            className={`${controlClass} min-h-72 resize-y font-mono text-[13px] leading-relaxed`}
          />
        </Field>
      </div>

      <div className="space-y-6">
        <div className="glass-card space-y-5 p-6">
          <Field
            label="Tags"
            hint={`Up to ${DEVTO_MAX_TAGS}. Letters and numbers only. Press Enter to add a tag.`}
          >
            <input
              name="tag"
              value={tagQuery}
              onChange={(event) => setTagQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === ",") {
                  event.preventDefault();
                  addTag(tagQuery);
                }
              }}
              onBlur={() => addTag(tagQuery)}
              placeholder="dotnet, maui, walkthrough"
              className={controlClass}
            />
          </Field>
          {fields.tags.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {fields.tags.map((tag) => (
                <li key={devTag(tag)}>
                  <button
                    type="button"
                    onClick={() => {
                      patch({ tags: fields.tags.filter((item) => devTag(item) !== devTag(tag)) });
                      setMessage((current) => (current?.includes("tags") ? null : current));
                    }}
                    className="focusable inline-flex items-center gap-1.5 rounded-full border border-lavender-200 bg-lavender-50 px-3 py-1 text-xs font-semibold text-lavender-800 dark:border-white/15 dark:bg-white/10 dark:text-lavender-100"
                  >
                    {devTag(tag)}
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only">Remove {tag}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="glass-card space-y-5 p-6">
          <p className="text-sm font-semibold text-foreground">Post options</p>
          <Field label="Series" hint="Every vlog is saved in this DEV series.">
            <input
              name="series"
              value={VLOG_SERIES}
              disabled
              className={`${controlClass} cursor-not-allowed opacity-70`}
            />
          </Field>
          <Field
            label="Canonical URL"
            hint="The address search engines should treat as the original. Leave this blank when DEV is the first place the vlog is published. Paste an original address only if the same vlog already lives on this site or another blog."
          >
            <input
              name="canonicalUrl"
              type="url"
              inputMode="url"
              value={fields.canonicalUrl}
              onChange={(event) => patch({ canonicalUrl: event.target.value })}
              placeholder="https://"
              className={controlClass}
            />
          </Field>
        </div>

        <div className="glass-card space-y-4 p-6">
          <label className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            Website
            <input
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </label>
          {serverConnected ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {proxyName
                ? `Connected as ${proxyName}. Save adds an unpublished draft.`
                : "Save adds an unpublished draft on DEV."}
            </p>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              No DEV API key is required. Save opens a GitHub issue for you to confirm. The draft stays unpublished until it is reviewed.
            </p>
          )}
          <button type="submit" className="focusable btn-primary w-full" disabled={status === "submitting"}>
            {status === "submitting" ? "Saving draft…" : serverConnected ? "Save draft on DEV" : "Continue on GitHub"}
          </button>
          <p className="text-xs leading-relaxed text-muted-foreground">
            This saves an unpublished draft. Publishing still happens in the DEV dashboard after review.
          </p>
          {message ? (
            <p role="alert" className="text-sm leading-relaxed text-red-700 dark:text-red-300">
              {message}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
