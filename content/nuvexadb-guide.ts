import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { DocSection } from "@/content/mvvmexpress";
import type { GuideNavGroup, GuideTopic } from "@/content/mvvmexpress-guide";
import { nuvexaDocsBase, nuvexaIntegrationHref, nuvexaPlatforms } from "@/content/nuvexadb";
import { markdownToSections } from "@/lib/markdown-docs";

const sourceRoot = join(process.cwd(), "content/nuvexadb/source");

function loadDoc(relativePath: string): DocSection[] {
  return markdownToSections(readFileSync(join(sourceRoot, relativePath), "utf8"));
}

export interface NuvexaGuidePage {
  slug: string;
  title: string;
  description: string;
  href: string;
  kind: "docs" | "integration";
  source: string;
  sections: DocSection[];
}

const docPages: Omit<NuvexaGuidePage, "sections">[] = [
  {
    slug: "whitepaper",
    title: "White paper",
    description:
      "Engine architecture, security, performance, platform libraries, IDEs, and the 1.x roadmap.",
    href: `${nuvexaDocsBase}/`,
    kind: "docs",
    source: "whitepaper.md",
  },
  {
    slug: "architecture",
    title: "Engine sharing",
    description: "One engine, one C ABI, thin SDKs. How every host opens the same .nvx file.",
    href: `${nuvexaDocsBase}/architecture/`,
    kind: "docs",
    source: "architecture.md",
  },
  {
    slug: "format",
    title: "File format",
    description: "Format v2 layout: superblock, pages, BSON documents, index keys, and WAL.",
    href: `${nuvexaDocsBase}/format/`,
    kind: "docs",
    source: "format.md",
  },
  {
    slug: "encryption",
    title: "Encryption",
    description: "Argon2id KEK, AES-256-GCM DEK, fail-closed open, and page integrity.",
    href: `${nuvexaDocsBase}/encryption/`,
    kind: "docs",
    source: "encryption.md",
  },
  {
    slug: "query",
    title: "NQL",
    description: "Nuvexa Query Language: find, update, delete, aggregation, and .NET LINQ.",
    href: `${nuvexaDocsBase}/query/`,
    kind: "docs",
    source: "query.md",
  },
  {
    slug: "bindings",
    title: "Language bindings",
    description: "C ABI v2 surface and SDK snippets for every supported language.",
    href: `${nuvexaDocsBase}/bindings/`,
    kind: "docs",
    source: "bindings.md",
  },
  {
    slug: "explorer",
    title: "Data Studio",
    description: "Desktop IDE, Visual Studio, and VS Code / Cursor capability inventory.",
    href: `${nuvexaDocsBase}/explorer/`,
    kind: "docs",
    source: "explorer.md",
  },
  {
    slug: "benchmarks",
    title: "Benchmarks",
    description: "Frozen CI SLOs versus SQLite and LiteDB, plus local crore-scale runs.",
    href: `${nuvexaDocsBase}/benchmarks/`,
    kind: "docs",
    source: "benchmarks.md",
  },
  {
    slug: "changelog",
    title: "Change log",
    description: "Unreleased engine, Explorer, binding, and CI notes.",
    href: `${nuvexaDocsBase}/changelog/`,
    kind: "docs",
    source: "changelog.md",
  },
];

const integrationMeta: Record<string, { title: string; description: string; source: string }> = {
  index: {
    title: "Platform integration",
    description:
      "Download the exact Release zip, create an empty project, then create / open / close, collections, documents, and an encryption password.",
    source: "Integration/README.md",
  },
  dotnet: {
    title: ".NET and .NET MAUI",
    description: "Add Nuventra.NuvexaDB from NuvexaDB-NuGet.zip. No native library for C# apps.",
    source: "Integration/dotnet.md",
  },
  "java-kotlin": {
    title: "Java and Kotlin (desktop)",
    description: "JNA wrapper: JVM jar plus the native library that matches the machine RID.",
    source: "Integration/java-kotlin.md",
  },
  android: {
    title: "Android",
    description: "AAR with embedded libnuvexa.so for arm64-v8a. Same Kotlin API as desktop.",
    source: "Integration/android.md",
  },
  swift: {
    title: "Swift (macOS and iOS)",
    description: "Swift package over the C ABI. dylib on macOS, Nuvexa.xcframework on iOS.",
    source: "Integration/swift.md",
  },
  flutter: {
    title: "Flutter / Dart",
    description: "dart:ffi wrapper. Pair the Dart package with the host native library.",
    source: "Integration/flutter.md",
  },
  "react-native": {
    title: "React Native",
    description: "Async JavaScript API plus Android AAR and iOS xcframework packs.",
    source: "Integration/react-native.md",
  },
  python: {
    title: "Python",
    description: "ctypes wheel. Set NUVEXA_NATIVE_LIB to the published shared library.",
    source: "Integration/python.md",
  },
  nodejs: {
    title: "Node.js",
    description: "@nuventra/nuvexadb-node (koffi). NUVEXA_NATIVE_LIB is required.",
    source: "Integration/nodejs.md",
  },
  go: {
    title: "Go",
    description: "cgo wrapper. Linux is the supported interop path for the native library.",
    source: "Integration/go.md",
  },
  cpp: {
    title: "C++",
    description: "nuvexa.hpp plus nuvexa.h. Link the RID-matched shared library.",
    source: "Integration/cpp.md",
  },
};

const pages: NuvexaGuidePage[] = [
  ...docPages.map((page) => ({ ...page, sections: loadDoc(page.source) })),
  {
    slug: "integration",
    title: integrationMeta.index.title,
    description: integrationMeta.index.description,
    href: nuvexaIntegrationHref,
    kind: "integration",
    source: integrationMeta.index.source,
    sections: loadDoc(integrationMeta.index.source),
  },
  ...nuvexaPlatforms.map((platform) => {
    const meta = integrationMeta[platform.slug];
    return {
      slug: platform.slug,
      title: meta.title,
      description: meta.description,
      href: `${nuvexaIntegrationHref}${platform.slug}/`,
      kind: "integration" as const,
      source: meta.source,
      sections: loadDoc(meta.source),
    };
  }),
];

const bySlug = new Map(pages.map((page) => [page.slug, page]));
const byHref = new Map(pages.map((page) => [page.href, page]));

export const nuvexaGuideNav: GuideNavGroup[] = [
  {
    id: "start",
    title: "Start here",
    items: [
      { title: "Overview", href: "/nuvexadb/" },
      { title: "White paper", href: `${nuvexaDocsBase}/` },
      { title: "Platform integration", href: nuvexaIntegrationHref },
    ],
  },
  {
    id: "engine",
    title: "Engine",
    items: [
      { title: "Engine sharing", href: `${nuvexaDocsBase}/architecture/` },
      { title: "File format", href: `${nuvexaDocsBase}/format/` },
      { title: "Encryption", href: `${nuvexaDocsBase}/encryption/` },
      { title: "NQL", href: `${nuvexaDocsBase}/query/` },
    ],
  },
  {
    id: "platforms",
    title: "Platforms",
    items: [
      { title: "Language bindings", href: `${nuvexaDocsBase}/bindings/` },
      ...nuvexaPlatforms.map((platform) => ({
        title: platform.title,
        href: `${nuvexaIntegrationHref}${platform.slug}/`,
      })),
    ],
  },
  {
    id: "tools",
    title: "Tools",
    items: [
      { title: "Data Studio", href: `${nuvexaDocsBase}/explorer/` },
      { title: "Benchmarks", href: `${nuvexaDocsBase}/benchmarks/` },
      { title: "Change log", href: `${nuvexaDocsBase}/changelog/` },
    ],
  },
];

export function getNuvexaGuidePage(slug: string): NuvexaGuidePage | undefined {
  return bySlug.get(slug);
}

export function getNuvexaDocTopic(topic: string): NuvexaGuidePage | undefined {
  return pages.find((page) => page.kind === "docs" && page.slug === topic);
}

export function nuvexaDocTopicSlugs(): string[] {
  return pages.filter((page) => page.kind === "docs" && page.slug !== "whitepaper").map((page) => page.slug);
}

export function nuvexaIntegrationSlugs(): string[] {
  return nuvexaPlatforms.map((platform) => platform.slug);
}

export function allNuvexaHrefs(): string[] {
  return ["/nuvexadb/", ...pages.map((page) => page.href)];
}

export function adjacentNuvexaPages(href: string): {
  previous?: GuideTopic;
  next?: GuideTopic;
} {
  const sequence = nuvexaGuideNav.flatMap((group) => group.items);
  const index = sequence.findIndex((item) => item.href === href);
  if (index < 0) return {};
  const previous = sequence[index - 1];
  const next = sequence[index + 1];
  return {
    previous: previous ? { slug: previous.href, title: previous.title, description: "", sections: [] } : undefined,
    next: next ? { slug: next.href, title: next.title, description: "", sections: [] } : undefined,
  };
}

export function getNuvexaPageByHref(href: string): NuvexaGuidePage | undefined {
  return byHref.get(href);
}

export const nuvexaWhitepaper = bySlug.get("whitepaper")!;
export const nuvexaIntegrationIndex = bySlug.get("integration")!;
