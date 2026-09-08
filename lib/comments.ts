import { commentRepos, type CommentRepo } from "@/lib/comment-repos";

export type DiscussionTarget = {
  title: string;
  github: string;
};

export const commentsAppearance = {
  term: "Website comments",
  giscus: {
    theme: "noborder_light",
    lang: "en",
  },
  utterances: {
    theme: "github-light",
  },
} as const;

export function parseGithubRepo(url: string): string | null {
  const match = url.match(/^https?:\/\/github\.com\/([^/?#]+)\/([^/?#]+)/i);
  if (!match) return null;
  return `${match[1]}/${match[2].replace(/\.git$/i, "")}`;
}

export function getCommentRepo(githubUrl: string): CommentRepo | null {
  const repo = parseGithubRepo(githubUrl);
  if (!repo) return null;
  return commentRepos[repo] ?? null;
}

export function isGiscusConfigured(repo: CommentRepo | null): boolean {
  return Boolean(repo?.giscus?.categoryId);
}

export function commentsRepoUrl(
  githubUrl: string,
  path: "discussions" | "issues" = "discussions",
): string {
  const repo = parseGithubRepo(githubUrl) ?? githubUrl.replace(/^https?:\/\/github\.com\//i, "");
  return `https://github.com/${repo}/${path}`;
}
