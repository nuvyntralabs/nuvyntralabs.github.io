import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { ComponentDiscussion } from "@/components/component-discussion";
import { JsonLd } from "@/components/json-ld";
import { NuvexaGuideTabs } from "@/components/nuvexadb-guide";
import { nuvexaDb, nuvexaDocsBase, nuvexaIntegrationHref, nuvexaLayers, nuvexaPlatforms } from "@/content/nuvexadb";
import { nuvexaJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: nuvexaDb.name,
  description: nuvexaDb.description,
  keywords: [...nuvexaDb.tags, "Nuvyntra Labs", "Nuventra"],
  alternates: { canonical: "/nuvexadb/" },
  openGraph: {
    title: `${nuvexaDb.name} · ${siteConfig.shortName}`,
    description: nuvexaDb.description,
    url: "/nuvexadb/",
  },
};

export default function NuvexaDbPage() {
  return (
    <main className="container max-w-3xl py-8 sm:py-10">
      <JsonLd data={nuvexaJsonLd()} />
      <NuvexaGuideTabs active="overview" />

      <p className="eyebrow mt-5">Embedded NoSQL</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">{nuvexaDb.title}</h1>
      <p className="mt-3 text-lg text-lavender-700 dark:text-lavender-300">{nuvexaDb.subtitle}</p>
      <p className="chip mt-4 inline-flex px-3 font-semibold">Engine {nuvexaDb.version}</p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{nuvexaDb.description}</p>

      <aside className="callout mt-6 px-4 py-3">
        <p className="text-sm font-semibold text-foreground">Component library door</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Add NuvexaDB to any host. You do not need{" "}
          <Link href="/toolkits/nuvyn/" className="text-link">
            Nuvyn
          </Link>
          . Nuvyn is the optional whole-ecosystem start for a <strong>new</strong> MAUI app.
        </p>
      </aside>

      <aside className="callout mt-6 px-4 py-3">
        <p className="text-sm font-semibold text-foreground">MAUI host layer</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          For Room-style insert / find / replace / delete that can host this engine or SQLite, use{" "}
          <Link href="/packages/plugin-maui-local-store/" className="text-link">
            Plugin.Maui.LocalStore
          </Link>
          . QueryAsync can run NQL when the backend is Nuvexa. Data Studio and NuvexaDatabase stay on this
          engine.
        </p>
      </aside>

      <aside className="callout mt-6 px-4 py-3">
        <p className="text-sm font-semibold text-foreground">Install from GitHub Releases</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          nuget.org, Maven, npm, and the other language feeds are not the install path yet. Download the zip
          that matches your host from the current published tag{" "}
          <a href={nuvexaDb.releaseTag} target="_blank" rel="noopener noreferrer" className="text-link">
            {nuvexaDb.publishedTag}
          </a>
          . Later tags keep the same zip names. Engine version in source is {nuvexaDb.version}.
        </p>
      </aside>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={nuvexaDb.github}
          target="_blank"
          rel="noopener noreferrer"
          className="focusable inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-glow hover:brightness-110"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <a
          href={nuvexaDb.releases}
          target="_blank"
          rel="noopener noreferrer"
          className="focusable btn-secondary"
        >
          Releases
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Install (.NET)</h2>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
          <code>{`dotnet add package ${nuvexaDb.packageId} --source /path/to/unzipped-nuget
dotnet tool install -g Nuventra.NuvexaDB.Cli --add-source /path/to/NuvexaDB-Cli`}</code>
        </pre>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Extract <code className="code-inline">NuvexaDB-NuGet.zip</code> for the engine and{" "}
          <code className="code-inline">NuvexaDB-Cli.zip</code> for the standalone{" "}
          <code className="code-inline">nuvexa</code> tool, then point{" "}
          <code className="code-inline">--source</code> / <code className="code-inline">--add-source</code> at
          those folders. Do not <code className="code-inline">dotnet add package</code> the CLI into an app.
          Other languages download a language zip plus the matching{" "}
          <code className="code-inline">NuvexaDB-Native-&lt;rid&gt;.zip</code>.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Overview</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{nuvexaDb.abstract}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Quick start</h2>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-[13px] leading-relaxed text-lavender-50">
          <code>{`using Nuventra.NuvexaDB;

await using var db = NuvexaDatabase.Create("app.nvx", new NuvexaCreateOptions
{
    EncryptionKey = "correct-horse"
});

var users = db.GetCollection("users");
await users.InsertAsync(NuvexaDocument.Parse("""{"name":"Ada","age":36}"""));
await users.EnsureIndexAsync("age");

var rows = await db.ExecuteAsync("""db.users.find({ age: { $gte: 21 } }).sort({ name: 1 }).limit(20)""");`}</code>
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Capabilities</h2>
        <ul className="mt-4 space-y-3">
          {nuvexaDb.capabilities.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-500" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Product layers</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-muted text-foreground">
              <tr>
                <th className="px-3 py-2.5 font-semibold">Layer</th>
                <th className="px-3 py-2.5 font-semibold">Project</th>
                <th className="px-3 py-2.5 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody>
              {nuvexaLayers.map((layer) => (
                <tr key={layer.name} className="border-t border-border align-top">
                  <td className="px-3 py-2.5 font-medium text-foreground">{layer.name}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{layer.project}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{layer.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Supported platforms</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Each guide names the exact release zip, an empty project, create/open/close, collection and document
          CRUD, and how to choose an encryption password.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {nuvexaPlatforms.map((platform) => (
            <li key={platform.slug}>
              <Link
                href={`${nuvexaIntegrationHref}${platform.slug}/`}
                className="glass-card focusable block h-full p-5 hover:shadow-glow"
              >
                <p className="font-semibold text-foreground">{platform.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{platform.summary}</p>
                <p className="mt-3 text-xs font-semibold text-lavender-700 dark:text-lavender-300">{platform.zip}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Nuvexa Data Studio</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Desktop workbench for one <code className="code-inline">.nvx</code> file: collection tree, typed
          browse grid, and NQL. Encrypted files prompt for the key and never store it.
        </p>
        <figure className="mt-4 overflow-hidden rounded-2xl border border-border bg-muted">
          <img
            src="/nuvexadb/data-studio/structure.png"
            alt="Nuvexa Data Studio Database Structure tab with collections, columns, and observed fields"
            className="h-auto w-full"
          />
          <figcaption className="border-t border-border px-3 py-2 text-xs leading-relaxed text-muted-foreground">
            Database Structure: collections, typed columns, and a shape report from existing documents.
          </figcaption>
        </figure>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          <Link href={`${nuvexaDocsBase}/explorer/`} className="text-link">
            Data Studio documentation
          </Link>{" "}
          covers Structure, Browse Data, NQL, and the Visual Studio / VS Code editors.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Documentation</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          <li>
            <Link href={`${nuvexaDocsBase}/`} className="glass-card focusable block h-full p-5 hover:shadow-glow">
              <p className="font-semibold text-foreground">White paper</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Engine, security, performance, how platform libraries are produced, IDEs, and roadmap.
              </p>
            </Link>
          </li>
          <li>
            <Link href={nuvexaIntegrationHref} className="glass-card focusable block h-full p-5 hover:shadow-glow">
              <p className="font-semibold text-foreground">Platform integration</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Per-host download, empty project, CRUD, and encryption password practice.
              </p>
            </Link>
          </li>
          <li>
            <Link href={`${nuvexaDocsBase}/architecture/`} className="glass-card focusable block h-full p-5 hover:shadow-glow">
              <p className="font-semibold text-foreground">Engine sharing</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Why Native AOT, the ABI contract, and the platform map.
              </p>
            </Link>
          </li>
          <li>
            <Link href={`${nuvexaDocsBase}/explorer/`} className="glass-card focusable block h-full p-5 hover:shadow-glow">
              <p className="font-semibold text-foreground">Nuvexa Data Studio</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Desktop workbench plus Visual Studio and VS Code / Cursor editors.
              </p>
            </Link>
          </li>
        </ul>
      </section>

      <ul className="mt-8 flex flex-wrap gap-2">
        {nuvexaDb.tags.map((tag) => (
          <li key={tag} className="chip border border-border px-3">
            {tag}
          </li>
        ))}
      </ul>

      <ComponentDiscussion target={{ title: nuvexaDb.name, github: nuvexaDb.github }} />
    </main>
  );
}
