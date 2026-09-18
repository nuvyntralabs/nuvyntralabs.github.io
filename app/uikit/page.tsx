import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Github, Package } from "lucide-react";
import { ComponentDiscussion } from "@/components/component-discussion";
import { JsonLd } from "@/components/json-ld";
import { UiKitCatalogHighlight } from "@/components/uikit-guide";
import { uiKitDocsBase } from "@/content/uikit-guide";
import {
  uiKit,
  uiKitComposeWith,
  uiKitHref,
  uiKitLayers,
  uiKitPlatforms,
  uiKitRecipes,
} from "@/content/uikit";
import { uiKitJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: uiKit.name,
  description: uiKit.description,
  keywords: [...uiKit.tags, "Nuvyntra Labs", uiKit.packageId],
  alternates: { canonical: uiKitHref },
  openGraph: {
    title: `${uiKit.name} · ${siteConfig.shortName}`,
    description: uiKit.description,
    url: uiKitHref,
  },
};

export default function UiKitPage() {
  return (
    <main className="container max-w-3xl py-12 sm:py-16">
      <JsonLd data={uiKitJsonLd()} />

      <p className="eyebrow">Lumina UI library</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">{uiKit.name}</h1>
      <p className="mt-3 text-lg text-lavender-700 dark:text-lavender-300">{uiKit.subtitle}</p>
      <p className="chip mt-4 inline-flex px-3 font-semibold">
        {uiKit.packageId} · {uiKit.version}
      </p>
      <UiKitCatalogHighlight className="mt-6" />
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{uiKit.description}</p>

      <aside className="callout mt-6 px-4 py-3">
        <p className="text-sm font-semibold text-foreground">1.5.1 — type scale, RTL, contrast</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Additive. Hosts that pin 1.5.0 keep compiling. Opt in with{" "}
          <code className="code-inline">NVTheme.Current.SetTypeScale</code> and{" "}
          <code className="code-inline">SetFlowDirection</code>. Overlay pages can call{" "}
          <code className="code-inline">TryHandleKey(&quot;Escape&quot;)</code> /{" "}
          <code className="code-inline">NVCommandPalette.TryHandleShortcut(&quot;Control+K&quot;)</code>.
        </p>
      </aside>

      <aside className="callout mt-6 px-4 py-3">
        <p className="text-sm font-semibold text-foreground">UI library, not a runtime plugin</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          MauiEssentials plugins stay in the{" "}
          <Link href="/packages/" className="text-link">
            NuGet catalog
          </Link>
          . This kit paints screens. Compose{" "}
          {uiKitComposeWith.map((item, index) => (
            <span key={item.href}>
              {index > 0 ? (index === uiKitComposeWith.length - 1 ? ", and " : ", ") : null}
              <Link href={item.href} className="text-link">
                {item.name}
              </Link>
            </span>
          ))}{" "}
          at the host — {uiKit.packageId} does not PackageReference them.
        </p>
      </aside>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={uiKit.github}
          target="_blank"
          rel="noopener noreferrer"
          className="focusable inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-glow hover:brightness-110"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <a href={uiKit.nuget} target="_blank" rel="noopener noreferrer" className="focusable btn-secondary">
          <Package className="h-4 w-4" aria-hidden="true" />
          NuGet
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <Link href={`${uiKitDocsBase}/`} className="focusable btn-secondary">
          Component docs
        </Link>
        <a href={uiKit.sample} target="_blank" rel="noopener noreferrer" className="focusable btn-secondary">
          Sample gallery
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Install</h2>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-sm text-lavender-50">
          <code>{`dotnet add package ${uiKit.packageId}

builder
    .UseMauiApp<App>()
    .${uiKit.register}`}</code>
        </pre>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          nuget.org publish is pipeline-owned — never{" "}
          <code className="code-inline">dotnet nuget push</code> from a local clone. XAML prefix{" "}
          <code className="code-inline">nv</code> maps to{" "}
          <code className="code-inline">{uiKit.xmlns}</code>.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Quick start</h2>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-[13px] leading-relaxed text-lavender-50">
          <code>{`xmlns:nv="${uiKit.xmlns}"

NVTheme.Current.SetTypeScale(1);
NVTheme.Current.SetFlowDirection(FlowDirection.MatchParent);

<nv:NVCheckBox Text="Accept terms" IsChecked="{Binding Accept}" />
<nv:NVRadioButton GroupName="Plan" Text="Monthly" />
<nv:NVInputField Label="Email" Text="{Binding Email}" />
<nv:NVButton Text="Continue" Variant="Filled" Command="{Binding Submit}" />
<nv:NVCommandPalette Query="{Binding Query}" />
<nv:NVSignInView />
<nv:NVInvoiceView />`}</code>
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Overview</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{uiKit.abstract}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Capabilities</h2>
        <ul className="mt-4 space-y-3">
          {uiKit.capabilities.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-500" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">
          {uiKit.controlCount} controls + {uiKit.recipeCount} page recipes
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Each control has a details page with XAML (every attribute) and an explanation of that attribute. Start at the{" "}
          <Link href={`${uiKitDocsBase}/`} className="text-link">
            component reference
          </Link>
          . Source list:{" "}
          <a href={uiKit.reference} target="_blank" rel="noopener noreferrer" className="text-link">
            UIKitLib.md
          </a>
          .
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-muted text-foreground">
              <tr>
                <th className="px-3 py-2.5 font-semibold">Layer</th>
                <th className="px-3 py-2.5 font-semibold">Types</th>
                <th className="px-3 py-2.5 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody>
              {uiKitLayers.map((layer) => (
                <tr key={layer.name} className="border-t border-border align-top">
                  <td className="px-3 py-2.5 font-medium text-foreground">{layer.name}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{layer.types}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{layer.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Page recipes</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Content compositions over the controls above. They do not add new bindable names.
        </p>
        <ul className="mt-4 grid gap-3">
          {uiKitRecipes.map((recipe) => (
            <li key={recipe.group} className="glass-card p-5">
              <p className="font-semibold text-foreground">{recipe.group}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{recipe.types}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Compose at the host</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {uiKitComposeWith.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="glass-card focusable block h-full p-5 hover:shadow-glow">
                <p className="font-semibold text-foreground">{item.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Platforms</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {uiKitPlatforms.map((platform) => (
            <li key={platform.name} className="glass-card p-5">
              <p className="font-semibold text-foreground">{platform.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{platform.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Out of scope</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          PDF / Word / Excel engines, camera barcode scan, paid map tiles, and real biometrics stay on host
          plugins (Printing, MediaPipeline, GeoLocator, Biometric). The sample{" "}
          <a href={uiKit.sample} target="_blank" rel="noopener noreferrer" className="text-link">
            NuvyntraLabs.UIKit.Sample
          </a>{" "}
          is a MAUI Shell flyout: Theme through Media, plus Basics, Advanced, Next (1.2), and every page recipe.
        </p>
      </section>

      <ul className="mt-8 flex flex-wrap gap-2">
        {uiKit.tags.map((tag) => (
          <li key={tag} className="chip border border-border px-3">
            {tag}
          </li>
        ))}
      </ul>

      <ComponentDiscussion target={{ title: uiKit.name, github: uiKit.github }} />
    </main>
  );
}
