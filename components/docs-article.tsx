import Link from "next/link";
import type { DocBlock, DocSection } from "@/content/mvvmexpress";

export function DocsArticle({ sections }: { sections: DocSection[] }) {
  return (
    <article className="min-w-0">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24 border-b border-border py-10 last:border-b-0 last:pb-0 first:pt-0">
          <h2 className="font-display text-2xl font-semibold tracking-tight">{section.title}</h2>
          <div className="mt-4 space-y-4">
            {section.blocks.map((block, index) => (
              <DocBlockView key={`${section.id}-${index}`} block={block} />
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}

function DocBlockView({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-base leading-relaxed text-muted-foreground">
          <RichText text={block.text} />
        </p>
      );
    case "ul":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-500" />
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-muted-foreground">
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              <RichText text={item} />
            </li>
          ))}
        </ol>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-2xl bg-ink p-4 text-[13px] leading-relaxed text-lavender-50">
          <code>{block.code}</code>
        </pre>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-muted text-foreground">
              <tr>
                {block.headers.map((header) => (
                  <th key={header} className="px-3 py-2.5 font-semibold">
                    <RichText text={header} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="border-t border-border align-top">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${cell}-${cellIndex}`}
                      className="px-3 py-2.5 text-muted-foreground first:font-medium first:text-foreground"
                    >
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <aside className="callout px-4 py-3">
          <p className="text-sm font-semibold text-foreground">{block.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{block.text}</p>
        </aside>
      );
    case "link":
      return (
        <p className="text-base leading-relaxed text-muted-foreground">
          {block.note ? `${block.note} ` : null}
          {block.href.startsWith("/") ? (
            <Link href={block.href} className="text-link">
              {block.label}
            </Link>
          ) : (
            <a
              href={block.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              {block.label}
            </a>
          )}
        </p>
      );
    case "img":
      return (
        <figure className="overflow-hidden rounded-2xl border border-border bg-muted">
          <img src={block.src} alt={block.alt} className="h-auto w-full" />
          {block.alt ? (
            <figcaption className="border-t border-border px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              {block.alt}
            </figcaption>
          ) : null}
        </figure>
      );
    default:
      return null;
  }
}

function RichText({ text }: { text: string }) {
  const tokens = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return (
    <>
      {tokens.map((token, index) => {
        const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          if (href.startsWith("/")) {
            return (
              <Link key={`${href}-${index}`} href={href} className="text-link">
                {label}
              </Link>
            );
          }
          return (
            <a
              key={`${href}-${index}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              {label}
            </a>
          );
        }
        const bold = token.match(/^\*\*([^*]+)\*\*$/);
        if (bold) {
          return <strong key={`${bold[1]}-${index}`}>{bold[1]}</strong>;
        }
        const code = token.match(/^`([^`]+)`$/);
        if (code) {
          return (
            <code key={`${code[1]}-${index}`} className="code-inline">
              {code[1]}
            </code>
          );
        }
        return <span key={`${token}-${index}`}>{token}</span>;
      })}
    </>
  );
}
