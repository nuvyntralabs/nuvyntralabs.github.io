import type { Metadata } from "next";
import Link from "next/link";
import { nugetPackages } from "@/content/packages";

export const metadata: Metadata = {
  title: "Getting started",
  description: "Install Nuvyntra Labs .NET MAUI NuGet packages and compose only the plugins you need.",
  alternates: { canonical: "/getting-started/" },
};

export default function GettingStartedPage() {
  const featured = nugetPackages.slice(0, 4);

  return (
    <main className="container max-w-3xl py-16 sm:py-20">
      <p className="eyebrow">Docs</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">Getting started</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Packages ship independently. Add only the plugins your app needs — there is no mega-package
        dependency. Each plugin targets .NET MAUI on Android and iOS.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">1. Create or open a MAUI app</h2>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-lavender-950 p-4 text-sm text-lavender-50">
          <code>dotnet new maui -n FieldApp</code>
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">2. Add a package</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Install from nuget.org. Registration helpers live in each repository README.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-lavender-950 p-4 text-sm text-lavender-50">
          <code>{`dotnet add package Plugin.Maui.GeoLocator
dotnet add package Plugin.Maui.NetworkMonitor
dotnet add package Plugin.Maui.JobQueue`}</code>
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">3. Start with a focused plugin</h2>
        <ul className="mt-4 grid gap-3">
          {featured.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/packages/${item.slug}/`}
                className="glass-card focusable flex flex-col p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <span>
                  <span className="font-semibold text-foreground">{item.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{item.subtitle}</span>
                </span>
                <span className="mt-2 text-sm font-medium text-lavender-700 sm:mt-0">Docs →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">4. Browse the full catalog</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The suite map is{" "}
          <Link href="/packages/maui-essentials/" className="font-medium text-lavender-700 hover:text-lavender-900">
            MauiEssentials
          </Link>
          . R&D projects and POCs that informed these plugins live in their own sections on this
          site.
        </p>
      </section>
    </main>
  );
}
