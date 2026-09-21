import type { DocBlock, DocSection } from "@/content/mvvmexpress";

const GITHUB_BLOB = "https://github.com/nuvyntralabs/NuvexaDB/blob/main";
const GITHUB_TREE = "https://github.com/nuvyntralabs/NuvexaDB/tree/main";

const DOC_PAGES: Record<string, string> = {
  "whitepaper.md": "/nuvexadb/docs/",
  "architecture.md": "/nuvexadb/docs/architecture/",
  "format.md": "/nuvexadb/docs/format/",
  "encryption.md": "/nuvexadb/docs/encryption/",
  "query.md": "/nuvexadb/docs/query/",
  "bindings.md": "/nuvexadb/docs/bindings/",
  "explorer.md": "/nuvexadb/docs/explorer/",
  "benchmarks.md": "/nuvexadb/docs/benchmarks/",
  "changelog.md": "/nuvexadb/docs/changelog/",
};

const INTEGRATION_PAGES: Record<string, string> = {
  "README.md": "/nuvexadb/integration/",
  "dotnet.md": "/nuvexadb/integration/dotnet/",
  "java-kotlin.md": "/nuvexadb/integration/java-kotlin/",
  "android.md": "/nuvexadb/integration/android/",
  "swift.md": "/nuvexadb/integration/swift/",
  "flutter.md": "/nuvexadb/integration/flutter/",
  "react-native.md": "/nuvexadb/integration/react-native/",
  "python.md": "/nuvexadb/integration/python/",
  "nodejs.md": "/nuvexadb/integration/nodejs/",
  "go.md": "/nuvexadb/integration/go/",
  "cpp.md": "/nuvexadb/integration/cpp/",
};

export function slugifyHeading(title: string): string {
  return title
    .toLowerCase()
    .replace(/[`*_]/g, "")
    .replace(/[—–]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{3,}/g, "--")
    .replace(/^-+|-+$/g, "");
}

export function rewriteNuvexaHref(href: string): string {
  if (!href || /^(https?:|mailto:|#|\/)/i.test(href)) {
    return href;
  }

  const hashIndex = href.indexOf("#");
  const pathPart = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const normalized = pathPart.replace(/\\/g, "/");

  if (normalized === "../README.md") {
    return `/nuvexadb/${hash}`;
  }

  const fileName = normalized.split("/").pop() ?? normalized;
  if (normalized.includes("Integration/") || normalized.startsWith("Integration/")) {
    const inner = normalized.replace(/^(?:\.\.\/)*docs\/Integration\//, "").replace(/^Integration\//, "");
    const mapped = INTEGRATION_PAGES[inner] ?? INTEGRATION_PAGES[fileName];
    if (mapped) return `${mapped}${hash}`;
  }

  if (DOC_PAGES[fileName]) {
    return `${DOC_PAGES[fileName]}${hash}`;
  }
  if (INTEGRATION_PAGES[fileName]) {
    return `${INTEGRATION_PAGES[fileName]}${hash}`;
  }

  const repoPath = normalized.replace(/^(?:\.\.\/)+/, "");
  if (!repoPath || repoPath === normalized && !normalized.includes("/")) {
    return href;
  }
  const isFile = /\.[a-z0-9]+$/i.test(repoPath);
  return `${isFile ? GITHUB_BLOB : GITHUB_TREE}/${repoPath}${hash}`;
}

export function rewriteNuvexaLinks(markdown: string): string {
  return markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, href: string) => {
    return `[${label}](${rewriteNuvexaHref(href)})`;
  });
}

export function markdownToSections(markdown: string): DocSection[] {
  const rewritten = rewriteNuvexaLinks(markdown.replace(/\r\n/g, "\n"));
  const lines = rewritten.split("\n");
  const sections: DocSection[] = [];
  let current: DocSection | null = null;
  const usedIds = new Set<string>();
  let i = 0;
  let skippedTitle = false;

  const ensureSection = (title: string) => {
    let id = slugifyHeading(title) || "section";
    if (usedIds.has(id)) {
      let n = 2;
      while (usedIds.has(`${id}-${n}`)) n += 1;
      id = `${id}-${n}`;
    }
    usedIds.add(id);
    current = { id, title, blocks: [] };
    sections.push(current);
    return current;
  };

  const push = (block: DocBlock) => {
    if (!current) {
      ensureSection("Overview");
    }
    current!.blocks.push(block);
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const fence = line.slice(3).trim();
      const body: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith("```")) {
        body.push(lines[i]);
        i += 1;
      }
      i += 1;
      push({ type: "code", code: body.join("\n") });
      if (fence === "mermaid") {
        push({
          type: "callout",
          title: "Architecture diagram",
          text: "The mermaid source above is the official one-engine map: host SDKs talk to nuvexa.h, which loads the Native AOT library and the same managed engine that writes the .nvx file.",
        });
      }
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const depth = heading[1].length;
      const title = heading[2].replace(/\s+#+\s*$/, "").trim();
      if (depth === 1 && !skippedTitle) {
        skippedTitle = true;
        i += 1;
        continue;
      }
      ensureSection(title);
      i += 1;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      i += 1;
      continue;
    }

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    if (isTableStart(lines, i)) {
      const table = readTable(lines, i);
      i = table.nextIndex;
      push({ type: "table", headers: table.headers, rows: table.rows });
      continue;
    }

    const image = parseStandaloneImage(line);
    if (image) {
      push({ type: "img", src: image.src, alt: image.alt });
      i += 1;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, "").trim());
        i += 1;
      }
      push({ type: "ul", items });
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, "").trim());
        i += 1;
      }
      push({ type: "ol", items });
      continue;
    }

    const paragraph: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("```") &&
      !/^---+$/.test(lines[i].trim()) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !parseStandaloneImage(lines[i]) &&
      !isTableStart(lines, i)
    ) {
      paragraph.push(lines[i]);
      i += 1;
    }
    push({ type: "p", text: paragraph.join(" ").replace(/\s+/g, " ").trim() });
  }

  return sections.filter((section) => section.blocks.length > 0);
}

function parseStandaloneImage(line: string): { alt: string; src: string } | null {
  const match = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (!match) return null;
  return { alt: match[1].trim(), src: match[2].trim() };
}

function isTableStart(lines: string[], index: number): boolean {
  const line = lines[index];
  const next = lines[index + 1];
  return Boolean(line?.includes("|") && next && /^\s*\|?\s*:?-{3,}/.test(next));
}

function readTable(lines: string[], index: number): { headers: string[]; rows: string[][]; nextIndex: number } {
  const headers = splitRow(lines[index]);
  let i = index + 2;
  const rows: string[][] = [];
  while (i < lines.length && lines[i].includes("|") && !/^---+$/.test(lines[i].trim())) {
    rows.push(splitRow(lines[i]));
    i += 1;
  }
  return { headers: headers.map((cell) => cell || " "), rows, nextIndex: i };
}

function splitRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\||\|$/g, "");
  return trimmed.split("|").map((cell) => cell.trim());
}
