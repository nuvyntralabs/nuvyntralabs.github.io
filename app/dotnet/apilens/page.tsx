import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Github, Package } from "lucide-react";
import { ApiLensGuideTabs } from "@/components/apilens-guide";
import { ComponentDiscussion } from "@/components/component-discussion";
import { JsonLd } from "@/components/json-ld";
import { apiLens, apiLensDocsBase, apiLensHref } from "@/content/apilens";
import { dotnetHref } from "@/content/dotnet";
import { apiLensJsonLd } from "@/lib/json-ld";
import { nugetOrgUrl } from "@/lib/nuget-stats";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: apiLens.name,
  description: apiLens.description,
  keywords: [...apiLens.tags, "Nuvyntra Labs", apiLens.packageId],
  alternates: { canonical: apiLensHref },
  openGraph: {
    title: `${apiLens.name} · ${siteConfig.shortName}`,
    description: apiLens.description,
    url: apiLensHref,
  },
};

export default function ApiLensPage() {
  return (
    <main className="container max-w-3xl py-8 sm:py-10">
      <JsonLd data={apiLensJsonLd()} />
      <ApiLensGuideTabs active="overview" />

      <p className="eyebrow mt-5">ASP.NET Core diagnostics</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">{apiLens.title}</h1>
      <p className="mt-3 text-lg text-lavender-700 dark:text-lavender-300">{apiLens.subtitle}</p>
      <p className="chip mt-4 inline-flex px-3 font-semibold">
        {apiLens.packageId} · {apiLens.version}
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{apiLens.description}</p>

      <aside className="callout mt-6 px-4 py-3">
        <p className="text-sm font-semibold text-foreground">Above the framework, not a second pipeline</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          ApiLens reads <code className="code-inline">System.Diagnostics</code>. ASP.NET Core metrics and
          OpenTelemetry stay in place. The first product on the{" "}
          <Link href={dotnetHref} className="text-link">
            .NET libraries
          </Link>{" "}
          track.
        </p>
      </aside>

      <aside className="callout mt-6 px-4 py-3">
        <p className="text-sm font-semibold text-foreground">Development dashboard only</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          In Development, open <code className="code-inline">{apiLens.dashboardPath}</code>. The page is not
          served in any other environment. <code className="code-inline">EnableDashboard = false</code> turns
          it off in Development as well.
        </p>
      </aside>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={apiLens.github}
          target="_blank"
          rel="noopener noreferrer"
          className="focusable inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-glow hover:brightness-110"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <Link href={`${apiLensDocsBase}/`} className="focusable btn-secondary">
          Documentation
        </Link>
        <a
          href={nugetOrgUrl(apiLens.packageId)}
          target="_blank"
          rel="noopener noreferrer"
          className="focusable btn-secondary"
        >
          <Package className="h-4 w-4" aria-hidden="true" />
          nuget.org
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Install</h2>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
          <code>{apiLens.install}</code>
        </pre>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Version {apiLens.version} targets <code className="code-inline">{apiLens.target}</code> and is on
          nuget.org. Publishing is pipeline-only. Do not{" "}
          <code className="code-inline">dotnet nuget push</code> from a local clone. Downloads for the five
          packages are on the{" "}
          <Link href={`${dotnetHref}#nuget-stats`} className="text-link">
            .NET libraries NuGet stats
          </Link>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Register</h2>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
          <code>{apiLens.register}</code>
        </pre>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Call <code className="code-inline">UseApiLens()</code> before endpoints so the middleware wraps the
          request. Step-by-step:{" "}
          <Link href={`${apiLensDocsBase}/`} className="text-link">
            Getting started
          </Link>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">What a request shows</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{apiLens.abstract}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The time model and the N+1 rule are on the{" "}
          <Link href={`${apiLensDocsBase}/timeline/`} className="text-link">
            request timeline
          </Link>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Capture</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-muted text-foreground">
              <tr>
                <th className="px-3 py-2.5 font-semibold">Surface</th>
                <th className="px-3 py-2.5 font-semibold">Development</th>
                <th className="px-3 py-2.5 font-semibold">Production</th>
              </tr>
            </thead>
            <tbody>
              {apiLens.capture.map((row) => (
                <tr key={row.surface} className="border-t border-border align-top">
                  <td className="px-3 py-2.5 font-medium text-foreground">{row.surface}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{row.development}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{row.production}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Packages</h2>
        <ul className="mt-4 grid gap-3">
          {apiLens.packages.map((item) => (
            <li key={item.id} className="glass-card p-4">
              <p className="font-semibold text-foreground">
                <code className="code-inline">{item.id}</code>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Package boundaries:{" "}
          <Link href={`${apiLensDocsBase}/packages/`} className="text-link">
            Packages
          </Link>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Sample</h2>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
          <code>{apiLens.sample}</code>
        </pre>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          <code className="code-inline">GET /api/orders</code> runs a deliberate per-row query loop. The
          dashboard is at <code className="code-inline">{apiLens.dashboardPath}</code>.
        </p>
      </section>

      <ComponentDiscussion target={{ title: apiLens.name, github: apiLens.github }} />
    </main>
  );
}
