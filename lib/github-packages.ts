import type { PackageDoc } from "@/content/packages";

export const githubPackagesOrg = "nuvyntralabs";

export const githubPackagesFeed = `https://nuget.pkg.github.com/${githubPackagesOrg}/index.json`;

export const nugetOrgFeed = "https://api.nuget.org/v3/index.json";

export const githubPackagesSetupPath = "/getting-started/github-packages/";

export const nugetConfigXml = `<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="nuget.org" value="${nugetOrgFeed}" />
    <add key="github" value="${githubPackagesFeed}" />
  </packageSources>
  <packageSourceMapping>
    <packageSource key="nuget.org">
      <package pattern="*" />
    </packageSource>
    <packageSource key="github">
      <package pattern="Plugin.Maui.*" />
    </packageSource>
  </packageSourceMapping>
</configuration>`;

export const githubPackagesAddSourceCommand = `dotnet nuget add source ${githubPackagesFeed} \\
  --name github \\
  --username YOUR_GITHUB_USERNAME \\
  --password YOUR_GITHUB_PAT \\
  --store-password-in-clear-text`;

export const githubPackagesPackageReferenceExample =
  '<PackageReference Include="Plugin.Maui.GeoLocator" Version="1.0.8" />';

export function githubPackagesPageUrl(repoUrl: string, packageId: string): string {
  return `${repoUrl.replace(/\/$/, "")}/pkgs/nuget/${packageId}`;
}

export function packageGithubPackagesUrl(pkg: PackageDoc): string | null {
  if (!pkg.nuget) return null;
  return githubPackagesPageUrl(pkg.github, pkg.name);
}
