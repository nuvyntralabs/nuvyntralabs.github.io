import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { DocSection } from "@/content/mvvmexpress";
import type { GuideNavGroup, GuideTopic } from "@/content/mvvmexpress-guide";
import { nuvexaMqDocsBase, nuvexaMqHref } from "@/content/nuvexamq";
import { markdownToSections } from "@/lib/markdown-docs";

const sourceRoot = join(process.cwd(), "content/nuvexamq/source");

function prepareNuvexaMqMarkdown(markdown: string): string {
  return markdown
    .replace(/^#### /gm, "### ")
    .replace(/\]\(images\//g, "](/nuvexamq/console/")
    .replace(/\]\(technical-reference\.md/g, "](/nuvexamq/docs/")
    .replace(/\]\(admin-manual\.md/g, "](/nuvexamq/docs/admin/")
    .replace(/\]\(client-integration\.md/g, "](/nuvexamq/docs/clients/")
    .replace(/\]\(benchmark\.md/g, "](/nuvexamq/docs/benchmark/")
    .replace(/\]\(samples\/clients\/README\.md/g, "](/nuvexamq/docs/samples/")
    .replace(/`samples\/clients\/README\.md`/g, "[client samples](/nuvexamq/docs/samples/)");
}

function loadDoc(relativePath: string): DocSection[] {
  const markdown = prepareNuvexaMqMarkdown(readFileSync(join(sourceRoot, relativePath), "utf8"));
  const sections = markdownToSections(markdown);
  const overviewCount = sections.filter((section) => section.title === "Overview").length;
  if (overviewCount > 1 && sections[0]?.title === "Overview") {
    sections[0] = { ...sections[0], id: "introduction", title: "Introduction" };
    const consoleOverview = sections.find((section) => section.title === "Overview");
    if (consoleOverview) consoleOverview.id = "overview";
  }
  return sections;
}

export interface NuvexaMqGuidePage {
  slug: string;
  title: string;
  description: string;
  href: string;
  source: string;
  sections: DocSection[];
}

const docPages: Omit<NuvexaMqGuidePage, "sections">[] = [
  {
    slug: "reference",
    title: "Technical reference",
    description:
      "Service model, listeners, process configuration, streams, consumers, exchanges, on-disk layout, wire protocol, management HTTP API, and the limits of 0.1.1.",
    href: `${nuvexaMqDocsBase}/`,
    source: "technical-reference.md",
  },
  {
    slug: "admin",
    title: "Admin panel",
    description:
      "Operator guide for the management console: sign-in, overview, connections, exchanges, queues, streams, users, permissions, virtual hosts, and policies.",
    href: `${nuvexaMqDocsBase}/admin/`,
    source: "admin-manual.md",
  },
  {
    slug: "clients",
    title: "Client integration",
    description:
      "How an application opens the data port, publishes, fetches, acks, and calls the management API. Frame behavior and the error codes the client should surface.",
    href: `${nuvexaMqDocsBase}/clients/`,
    source: "client-integration.md",
  },
  {
    slug: "samples",
    title: "Client samples",
    description:
      "Commands for every language sample. Each program opens the data port and runs demo, ping, stream, consume, exchange, or admin.",
    href: `${nuvexaMqDocsBase}/samples/`,
    source: "client-samples.md",
  },
  {
    slug: "benchmark",
    title: "Benchmark",
    description:
      "Localhost publish and consume comparison of NuvexaMQ 0.1.0 and RabbitMQ 4.3.6 on one Mac, and how to repeat the NuvexaMQ run.",
    href: `${nuvexaMqDocsBase}/benchmark/`,
    source: "benchmark.md",
  },
];

const pages: NuvexaMqGuidePage[] = docPages.map((page) => ({
  ...page,
  sections: loadDoc(page.source),
}));

const bySlug = new Map(pages.map((page) => [page.slug, page]));

export const nuvexaMqManuals = docPages.map((page) => ({
  title: page.title,
  description: page.description,
  href: page.href,
}));

export const nuvexaMqGuideNav: GuideNavGroup[] = [
  {
    id: "start",
    title: "Start here",
    items: [
      { title: "Overview", href: nuvexaMqHref },
      { title: "Technical reference", href: `${nuvexaMqDocsBase}/` },
    ],
  },
  {
    id: "operate",
    title: "Operate",
    items: [{ title: "Admin panel", href: `${nuvexaMqDocsBase}/admin/` }],
  },
  {
    id: "integrate",
    title: "Integrate",
    items: [
      { title: "Client integration", href: `${nuvexaMqDocsBase}/clients/` },
      { title: "Client samples", href: `${nuvexaMqDocsBase}/samples/` },
    ],
  },
  {
    id: "measure",
    title: "Measure",
    items: [{ title: "Benchmark", href: `${nuvexaMqDocsBase}/benchmark/` }],
  },
];

export function getNuvexaMqDocTopic(topic: string): NuvexaMqGuidePage | undefined {
  return pages.find((page) => page.slug === topic);
}

export function nuvexaMqDocTopicSlugs(): string[] {
  return pages.filter((page) => page.slug !== "reference").map((page) => page.slug);
}

export function allNuvexaMqHrefs(): string[] {
  return [nuvexaMqHref, ...pages.map((page) => page.href)];
}

export function adjacentNuvexaMqPages(href: string): {
  previous?: GuideTopic;
  next?: GuideTopic;
} {
  const sequence = nuvexaMqGuideNav.flatMap((group) => group.items);
  const index = sequence.findIndex((item) => item.href === href);
  if (index < 0) return {};
  const previous = sequence[index - 1];
  const next = sequence[index + 1];
  return {
    previous: previous ? { slug: previous.href, title: previous.title, description: "", sections: [] } : undefined,
    next: next ? { slug: next.href, title: next.title, description: "", sections: [] } : undefined,
  };
}

export const nuvexaMqReference = bySlug.get("reference")!;
