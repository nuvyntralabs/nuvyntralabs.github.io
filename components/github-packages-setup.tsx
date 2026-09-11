import type { ReactNode } from "react";
import Link from "next/link";
import {
  githubPackagesAddSourceCommand,
  githubPackagesFeed,
  githubPackagesPackageReferenceExample,
  githubPackagesSetupPath,
  nugetConfigXml,
} from "@/lib/github-packages";

export function GithubPackagesSetup({
  showIntro = true,
  headingLevel = "page",
}: {
  showIntro?: boolean;
  headingLevel?: "page" | "section";
}) {
  const TitleTag = headingLevel === "page" ? "h2" : "h3";
  const titleClass =
    headingLevel === "page"
      ? "font-display text-2xl font-semibold"
      : "font-display text-xl font-semibold";

  return (
    <div className="space-y-10">
      {showIntro ? (
        <p className="text-sm leading-relaxed text-muted-foreground">
          A project needs two feeds. <code className="code-inline">Plugin.Maui.*</code>{" "}
          comes from GitHub Packages. Everything else (Microsoft.*, MAUI, and other public packages)
          comes from nuget.org. GitHub Packages requires a token even when the packages are public.
        </p>
      ) : null}

      <section>
        <TitleTag className={titleClass}>1. Create a classic PAT</TitleTag>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Create a classic personal access token with <strong>read:packages</strong> only. Do not
          grant write or delete scopes for restore.
        </p>
      </section>

      <section>
        <TitleTag className={titleClass}>2. Add nuget.config next to the .sln or .csproj</TitleTag>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Do not put the PAT in this file. Commit the config so every clone uses the same mapping.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-[13px] leading-relaxed text-lavender-50">
          <code>{nugetConfigXml}</code>
        </pre>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          NuGet uses the most specific mapping:
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-muted text-foreground">
              <tr>
                <th className="px-3 py-2.5 font-semibold">Package ID</th>
                <th className="px-3 py-2.5 font-semibold">Source</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border align-top">
                <td className="px-3 py-2.5 font-medium text-foreground">
                  <code>Plugin.Maui.*</code>
                </td>
                <td className="px-3 py-2.5 text-muted-foreground">GitHub Packages only</td>
              </tr>
              <tr className="border-t border-border align-top">
                <td className="px-3 py-2.5 font-medium text-foreground">everything else</td>
                <td className="px-3 py-2.5 text-muted-foreground">nuget.org only</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          There is no nuget.org fallback for <code className="code-inline">Plugin.Maui.*</code>.
          If that version is not on the org feed, restore fails.
        </p>
      </section>

      <section>
        <TitleTag className={titleClass}>3. Store the token on the machine</TitleTag>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Add the source in the user-level NuGet config, not the repo:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-[13px] leading-relaxed text-lavender-50">
          <code>{githubPackagesAddSourceCommand}</code>
        </pre>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Feed URL:{" "}
          <code className="code-inline break-all">
            {githubPackagesFeed}
          </code>
        </p>
      </section>

      <section>
        <TitleTag className={titleClass}>4. Reference a package and restore</TitleTag>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-[13px] leading-relaxed text-lavender-50">
          <code>{`${githubPackagesPackageReferenceExample}
dotnet restore`}</code>
        </pre>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          CI: use <code className="code-inline">GITHUB_TOKEN</code>{" "}
          as the password when that workflow can read the package.
        </p>
      </section>
    </div>
  );
}

export function GithubPackagesSetupLink({
  children = "Use nuvyntralabs GitHub Packages from a C# project",
}: {
  children?: ReactNode;
}) {
  return (
    <Link
      href={githubPackagesSetupPath}
      className="text-link"
    >
      {children}
    </Link>
  );
}
