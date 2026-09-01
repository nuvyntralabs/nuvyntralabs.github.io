import type { DocBlock, DocSection } from "@/content/mvvmexpress";

export function DocsArticle({ sections }: { sections: DocSection[] }) {
  return (
    <article className="min-w-0">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24 border-b border-lavender-100 py-10 last:border-b-0 last:pb-0 first:pt-0">
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
      return <p className="text-base leading-relaxed text-muted-foreground">{block.text}</p>;
    case "ul":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-muted-foreground">
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              {item}
            </li>
          ))}
        </ol>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-2xl bg-[#160d2c] p-4 text-[13px] leading-relaxed text-lavender-50">
          <code>{block.code}</code>
        </pre>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-lavender-100">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-lavender-50 text-lavender-900">
              <tr>
                {block.headers.map((header) => (
                  <th key={header} className="px-3 py-2.5 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="border-t border-lavender-100 align-top">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${cell}-${cellIndex}`}
                      className="px-3 py-2.5 text-muted-foreground first:font-medium first:text-foreground"
                    >
                      {cell}
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
        <aside className="rounded-2xl border border-lavender-200 bg-lavender-50 px-4 py-3">
          <p className="text-sm font-semibold text-lavender-900">{block.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-lavender-800">{block.text}</p>
        </aside>
      );
    case "link":
      return (
        <p className="text-base leading-relaxed text-muted-foreground">
          {block.note ? `${block.note} ` : null}
          <a
            href={block.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-lavender-700 hover:text-lavender-900"
          >
            {block.label}
          </a>
        </p>
      );
    default:
      return null;
  }
}
