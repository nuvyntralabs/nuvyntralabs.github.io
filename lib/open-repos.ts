import { nuvexaDb } from "@/content/nuvexadb";
import { packages } from "@/content/packages";
import { playground, playgroundHref } from "@/content/playground";
import { toolkitPath, toolkits } from "@/content/toolkits";
import { uiKit, uiKitHref } from "@/content/uikit";
import { workPath, works } from "@/content/works";

export const openReposPath = "/repos/";
export const githubOrgLogin = "nuvyntralabs";

export const openRepoSources = {
  org: `https://github.com/${githubOrgLogin}`,
  orgApi: `https://api.github.com/orgs/${githubOrgLogin}/repos`,
  graphql: "https://api.github.com/graphql",
  issuesSearch: `https://github.com/search?q=org%3A${githubOrgLogin}+is%3Aissue+is%3Aopen&type=issues`,
  discussionsSearch: `https://github.com/search?q=org%3A${githubOrgLogin}+is%3Aopen&type=discussions`,
} as const;

export type OpenThread = {
  number: number;
  title: string;
  url: string;
  updatedAt: string;
  author: string;
  category?: string;
};

export type OpenRepo = {
  name: string;
  fullName: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
  archived: boolean;
  fork: boolean;
  hasIssues: boolean;
  hasDiscussions: boolean;
  issues: OpenThread[];
  discussions: OpenThread[];
  discussionsLoaded: boolean;
  href?: string;
  group?: string;
};

export type OpenReposSnapshot = {
  fetchedAt: string;
  repos: OpenRepo[];
};

type CatalogPage = {
  href: string;
  title: string;
  group: string;
};

type GitHubRepo = {
  name?: string;
  full_name?: string;
  html_url?: string;
  description?: string | null;
  language?: string | null;
  stargazers_count?: number;
  pushed_at?: string;
  archived?: boolean;
  fork?: boolean;
  has_issues?: boolean;
  has_discussions?: boolean;
};

type GitHubIssue = {
  number?: number;
  title?: string;
  html_url?: string;
  updated_at?: string;
  state?: string;
  user?: { login?: string };
  repository_url?: string;
};

type GitHubDiscussion = {
  number?: number;
  title?: string;
  html_url?: string;
  updated_at?: string;
  state?: string;
  user?: { login?: string };
  category?: { name?: string };
};

type SearchResponse = {
  total_count?: number;
  incomplete_results?: boolean;
  items?: GitHubIssue[];
  message?: string;
};

type GraphQLRepoConnection = {
  pageInfo?: { hasNextPage?: boolean; endCursor?: string | null };
  nodes?: GraphQLRepo[];
};

type GraphQLSnapshot = {
  data?: {
    organization?: {
      repositories?: GraphQLRepoConnection;
    };
  };
  errors?: { message?: string }[];
};

type GraphQLRepo = {
  name?: string;
  nameWithOwner?: string;
  url?: string;
  description?: string | null;
  isArchived?: boolean;
  isFork?: boolean;
  hasIssuesEnabled?: boolean;
  hasDiscussionsEnabled?: boolean;
  stargazerCount?: number;
  pushedAt?: string;
  primaryLanguage?: { name?: string } | null;
  issues?: { totalCount?: number; nodes?: GraphQLThread[] };
  discussions?: { totalCount?: number; nodes?: GraphQLDiscussion[] };
};

type GraphQLThread = {
  number?: number;
  title?: string;
  url?: string;
  updatedAt?: string;
  author?: { login?: string } | null;
};

type GraphQLDiscussion = GraphQLThread & {
  category?: { name?: string } | null;
};

const githubHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
} as const;

const discussionPageSize = 50;
const scanConcurrency = 4;

export function repoFullNameFromUrl(url: string | null | undefined): string | null {
  const match = url?.match(/github\.com\/([^/]+\/[^/#?]+)/i);
  return match ? match[1].replace(/\.git$/i, "") : null;
}

export function catalogRepoPages(): Map<string, CatalogPage> {
  const pages = new Map<string, CatalogPage>();

  const add = (github: string, href: string, title: string, group: string) => {
    const fullName = repoFullNameFromUrl(github);
    if (!fullName) return;
    const key = fullName.toLowerCase();
    if (pages.has(key)) return;
    pages.set(key, { href, title, group });
  };

  for (const pkg of packages) {
    add(pkg.github, `/packages/${pkg.slug}/`, pkg.name, pkg.group);
  }
  for (const toolkit of toolkits) {
    add(toolkit.github, toolkitPath(toolkit), toolkit.name, "Toolkits");
  }
  for (const work of works) {
    add(work.github, workPath(work), work.name, work.kind === "research" ? "Research" : "POCs");
  }
  add(uiKit.github, uiKitHref, uiKit.name, "UI kit");
  add(nuvexaDb.github, "/nuvexadb/", nuvexaDb.name, "Database");
  add(playground.github, playgroundHref, playground.title, "Playground");

  return pages;
}

export function attachCatalogPages(repos: OpenRepo[]): OpenRepo[] {
  const pages = catalogRepoPages();
  return repos.map((repo) => {
    const page = pages.get(repo.fullName.toLowerCase());
    return page ? { ...repo, href: page.href, group: page.group } : repo;
  });
}

export function isWebsiteComment(title: string): boolean {
  return title.trim().toLowerCase() === "website comments";
}

export function isOpenThread(thread: OpenThread): boolean {
  return !isWebsiteComment(thread.title);
}

export function hasOpenThreads(repo: OpenRepo): boolean {
  return repo.issues.length > 0 || repo.discussions.length > 0;
}

export function formatThreadDate(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function repoAnchor(fullName: string): string {
  return fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export async function fetchOpenReposSnapshot(token?: string): Promise<OpenReposSnapshot> {
  if (token) {
    try {
      return await fetchSnapshotViaGraphQL(token);
    } catch {
      // Public REST still works when the token cannot query the org.
    }
  }

  return fetchSnapshotViaRest(token);
}

export async function loadOpenRepos(options: {
  token?: string;
  signal?: AbortSignal;
  onRepos: (repos: OpenRepo[]) => void;
}): Promise<OpenReposSnapshot> {
  const snapshot = await fetchSnapshotViaRest(options.token, options.signal);
  const baked = await readBakedSnapshot(options.signal);
  const repos = attachCatalogPages(mergeDiscussionSnapshot(snapshot.repos, baked?.repos ?? [])).sort(
    compareRepos,
  );
  options.onRepos(repos);
  return { fetchedAt: new Date().toISOString(), repos };
}

export async function loadMissingDiscussions(options: {
  repos: OpenRepo[];
  token?: string;
  signal?: AbortSignal;
  onRepos: (repos: OpenRepo[]) => void;
  onProgress?: (done: number, total: number) => void;
}): Promise<OpenRepo[]> {
  return scanDiscussions(options.repos, {
    token: options.token,
    signal: options.signal,
    onRepos: (next) => options.onRepos(attachCatalogPages(next).sort(compareRepos)),
    onProgress: options.onProgress,
  });
}

export async function loadRepoDiscussions(
  repo: OpenRepo,
  options?: { token?: string; signal?: AbortSignal },
): Promise<OpenRepo> {
  if (!repo.hasDiscussions) {
    return { ...repo, discussions: [], discussionsLoaded: true };
  }

  const discussions = await fetchRepoDiscussions(repo.fullName, options?.token, options?.signal);
  return { ...repo, discussions, discussionsLoaded: true };
}

async function fetchSnapshotViaRest(token?: string, signal?: AbortSignal): Promise<OpenReposSnapshot> {
  const [repos, issues] = await Promise.all([
    fetchOrgRepos(token, signal),
    fetchOpenIssues(token, signal),
  ]);

  const issuesByRepo = groupThreads(issues);
  const listed = repos.map((repo) => ({
    ...repo,
    issues: issuesByRepo.get(repo.fullName.toLowerCase()) ?? [],
    discussions: repo.discussions,
    discussionsLoaded: repo.discussionsLoaded,
  }));

  for (const [key, threads] of issuesByRepo) {
    if (listed.some((repo) => repo.fullName.toLowerCase() === key)) continue;
    const [owner, name] = key.split("/");
    listed.push({
      name: name ?? key,
      fullName: `${owner}/${name}`,
      url: `https://github.com/${owner}/${name}`,
      description: null,
      language: null,
      stars: 0,
      pushedAt: threads[0]?.updatedAt ?? new Date().toISOString(),
      archived: false,
      fork: false,
      hasIssues: true,
      hasDiscussions: false,
      issues: threads,
      discussions: [],
      discussionsLoaded: true,
    });
  }

  return {
    fetchedAt: new Date().toISOString(),
    repos: attachCatalogPages(listed).sort(compareRepos),
  };
}

async function fetchSnapshotViaGraphQL(token: string): Promise<OpenReposSnapshot> {
  const repos: OpenRepo[] = [];
  let cursor: string | null = null;

  do {
    const payload: GraphQLSnapshot = await githubGraphql<GraphQLSnapshot>(
      `query ($cursor: String) {
        organization(login: "${githubOrgLogin}") {
          repositories(first: 100, after: $cursor, orderBy: { field: NAME, direction: ASC }) {
            pageInfo { hasNextPage endCursor }
            nodes {
              name
              nameWithOwner
              url
              description
              isArchived
              isFork
              hasIssuesEnabled
              hasDiscussionsEnabled
              stargazerCount
              pushedAt
              primaryLanguage { name }
              issues(states: OPEN, first: 50, orderBy: { field: UPDATED_AT, direction: DESC }) {
                nodes {
                  number
                  title
                  url
                  updatedAt
                  author { login }
                }
              }
              discussions(states: OPEN, first: 50, orderBy: { field: UPDATED_AT, direction: DESC }) {
                nodes {
                  number
                  title
                  url
                  updatedAt
                  author { login }
                  category { name }
                }
              }
            }
          }
        }
      }`,
      { cursor },
      token,
    );

    const page: GraphQLRepoConnection | undefined = payload.data?.organization?.repositories;
    if (payload.errors?.length || !page) {
      throw new Error(payload.errors?.[0]?.message ?? "GitHub GraphQL returned no repositories.");
    }

    for (const node of page.nodes ?? []) {
      const fullName = node.nameWithOwner?.trim();
      if (!fullName) continue;
      repos.push({
        name: node.name ?? fullName.split("/")[1] ?? fullName,
        fullName,
        url: node.url ?? `https://github.com/${fullName}`,
        description: node.description ?? null,
        language: node.primaryLanguage?.name ?? null,
        stars: node.stargazerCount ?? 0,
        pushedAt: node.pushedAt ?? "",
        archived: Boolean(node.isArchived),
        fork: Boolean(node.isFork),
        hasIssues: Boolean(node.hasIssuesEnabled),
        hasDiscussions: Boolean(node.hasDiscussionsEnabled),
        issues: (node.issues?.nodes ?? []).flatMap(mapGraphQLThread),
        discussions: (node.discussions?.nodes ?? []).flatMap(mapGraphQLDiscussion),
        discussionsLoaded: true,
      });
    }

    cursor = page.pageInfo?.hasNextPage ? page.pageInfo.endCursor ?? null : null;
  } while (cursor);

  return {
    fetchedAt: new Date().toISOString(),
    repos: attachCatalogPages(repos).sort(compareRepos),
  };
}

async function fetchOrgRepos(token?: string, signal?: AbortSignal): Promise<OpenRepo[]> {
  const repos: OpenRepo[] = [];

  for (let page = 1; page <= 10; page += 1) {
    const payload = await githubJson<GitHubRepo[]>(
      `${openRepoSources.orgApi}?per_page=100&page=${page}&sort=full_name`,
      token,
      signal,
    );
    for (const item of payload) {
      const fullName = item.full_name?.trim();
      if (!fullName) continue;
      repos.push({
        name: item.name ?? fullName.split("/")[1] ?? fullName,
        fullName,
        url: item.html_url ?? `https://github.com/${fullName}`,
        description: item.description ?? null,
        language: item.language ?? null,
        stars: item.stargazers_count ?? 0,
        pushedAt: item.pushed_at ?? "",
        archived: Boolean(item.archived),
        fork: Boolean(item.fork),
        hasIssues: Boolean(item.has_issues),
        hasDiscussions: Boolean(item.has_discussions),
        issues: [],
        discussions: [],
        discussionsLoaded: !item.has_discussions,
      });
    }
    if (payload.length < 100) break;
  }

  return repos;
}

type RepoIssue = OpenThread & { repo: string };

async function fetchOpenIssues(token?: string, signal?: AbortSignal): Promise<RepoIssue[]> {
  const threads: RepoIssue[] = [];

  for (let page = 1; page <= 10; page += 1) {
    const query = `org:${githubOrgLogin}+is:issue+is:open`;
    const payload = await githubJson<SearchResponse>(
      `https://api.github.com/search/issues?q=${query}&per_page=100&page=${page}&sort=updated`,
      token,
      signal,
    );
    if (payload.message) {
      throw new Error(payload.message);
    }
    for (const item of payload.items ?? []) {
      if (item.state && item.state.toLowerCase() !== "open") continue;
      const thread = mapIssue(item);
      if (!thread) continue;
      threads.push(thread);
    }
    if ((payload.items?.length ?? 0) < 100) break;
  }

  return threads;
}

async function fetchRepoDiscussions(
  fullName: string,
  token?: string,
  signal?: AbortSignal,
): Promise<OpenThread[]> {
  const threads: OpenThread[] = [];

  for (let page = 1; page <= 10; page += 1) {
    const payload = await githubJson<GitHubDiscussion[]>(
      `https://api.github.com/repos/${fullName}/discussions?state=open&per_page=${discussionPageSize}&page=${page}`,
      token,
      signal,
    );
    for (const item of payload) {
      if (item.state && item.state.toLowerCase() !== "open") continue;
      const thread = mapDiscussion(item);
      if (thread) threads.push(thread);
    }
    if (payload.length < discussionPageSize) break;
  }

  return threads;
}

async function scanDiscussions(
  repos: OpenRepo[],
  options: {
    token?: string;
    signal?: AbortSignal;
    onRepos: (repos: OpenRepo[]) => void;
    onProgress?: (done: number, total: number) => void;
  },
): Promise<OpenRepo[]> {
  const next = repos.map((repo) => ({ ...repo }));
  const pending = next
    .map((repo, index) => ({ repo, index }))
    .filter(({ repo }) => repo.hasDiscussions && !repo.discussionsLoaded)
    .sort((left, right) => right.repo.pushedAt.localeCompare(left.repo.pushedAt));

  let done = 0;
  let cursor = 0;
  options.onProgress?.(0, pending.length);

  async function worker() {
    while (cursor < pending.length) {
      throwIfAborted(options.signal);
      const current = cursor;
      cursor += 1;
      const { repo, index } = pending[current];
      try {
        next[index] = await loadRepoDiscussions(repo, options);
      } catch (cause) {
        if (isAbortError(cause)) throw cause;
        if (isRateLimit(cause)) {
          cursor = pending.length;
          return;
        }
        next[index] = { ...repo, discussionsLoaded: true };
      }
      done += 1;
      options.onProgress?.(done, pending.length);
      options.onRepos(next.map((item) => ({ ...item })));
    }
  }

  await Promise.all(Array.from({ length: Math.min(scanConcurrency, pending.length || 1) }, () => worker()));
  return next;
}

async function readBakedSnapshot(signal?: AbortSignal): Promise<OpenReposSnapshot | null> {
  if (typeof window === "undefined") return null;
  try {
    const response = await fetch("/data/open-repos.json", { signal });
    if (!response.ok) return null;
    const payload = (await response.json()) as OpenReposSnapshot;
    if (!Array.isArray(payload.repos)) return null;
    return payload;
  } catch (cause) {
    if (isAbortError(cause)) throw cause;
    return null;
  }
}

function mergeDiscussionSnapshot(live: OpenRepo[], baked: OpenRepo[]): OpenRepo[] {
  const byName = new Map(baked.map((repo) => [repo.fullName.toLowerCase(), repo]));
  return live.map((repo) => {
    const prior = byName.get(repo.fullName.toLowerCase());
    if (!prior?.discussionsLoaded) return repo;
    return {
      ...repo,
      discussions: prior.discussions.filter(isOpenThread),
      discussionsLoaded: true,
    };
  });
}

function groupThreads(threads: RepoIssue[]): Map<string, OpenThread[]> {
  const grouped = new Map<string, OpenThread[]>();
  for (const thread of threads) {
    const key = thread.repo.toLowerCase();
    const current = grouped.get(key) ?? [];
    current.push({
      number: thread.number,
      title: thread.title,
      url: thread.url,
      updatedAt: thread.updatedAt,
      author: thread.author,
      category: thread.category,
    });
    grouped.set(key, current);
  }
  return grouped;
}

function mapIssue(item: GitHubIssue): RepoIssue | null {
  const title = item.title?.trim();
  const url = item.html_url?.trim();
  const repo = item.repository_url?.replace("https://api.github.com/repos/", "");
  if (!title || !url || !repo || isWebsiteComment(title)) return null;
  return {
    repo,
    number: item.number ?? 0,
    title,
    url,
    updatedAt: item.updated_at ?? "",
    author: item.user?.login ?? "ghost",
  };
}

function mapDiscussion(item: GitHubDiscussion): OpenThread | null {
  const title = item.title?.trim();
  const url = item.html_url?.trim();
  if (!title || !url || isWebsiteComment(title)) return null;
  return {
    number: item.number ?? 0,
    title,
    url,
    updatedAt: item.updated_at ?? "",
    author: item.user?.login ?? "ghost",
    category: item.category?.name,
  };
}

function mapGraphQLThread(item: GraphQLThread): OpenThread[] {
  const title = item.title?.trim();
  const url = item.url?.trim();
  if (!title || !url || isWebsiteComment(title)) return [];
  return [
    {
      number: item.number ?? 0,
      title,
      url,
      updatedAt: item.updatedAt ?? "",
      author: item.author?.login ?? "ghost",
    },
  ];
}

function mapGraphQLDiscussion(item: GraphQLDiscussion): OpenThread[] {
  return mapGraphQLThread(item).map((thread) => ({
    ...thread,
    category: item.category?.name,
  }));
}

function compareRepos(left: OpenRepo, right: OpenRepo): number {
  const leftOpen = hasOpenThreads(left) ? 0 : 1;
  const rightOpen = hasOpenThreads(right) ? 0 : 1;
  if (leftOpen !== rightOpen) return leftOpen - rightOpen;
  const activity = right.pushedAt.localeCompare(left.pushedAt);
  if (activity !== 0) return activity;
  return left.fullName.localeCompare(right.fullName);
}

async function githubJson<T>(url: string, token?: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, {
    signal,
    headers: {
      ...githubHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status} for ${url}`);
  }
  return (await response.json()) as T;
}

async function githubGraphql<T>(query: string, variables: Record<string, unknown>, token: string): Promise<T> {
  const response = await fetch(openRepoSources.graphql, {
    method: "POST",
    headers: {
      ...githubHeaders,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) {
    throw new Error(`GitHub GraphQL returned ${response.status}`);
  }
  return (await response.json()) as T;
}

function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new DOMException("Aborted", "AbortError");
  }
}

function isAbortError(cause: unknown): boolean {
  return cause instanceof DOMException && cause.name === "AbortError";
}

function isRateLimit(cause: unknown): boolean {
  return cause instanceof Error && /403|rate limit/i.test(cause.message);
}
