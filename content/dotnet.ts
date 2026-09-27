import { apiLens, apiLensDocsBase, apiLensHref } from "@/content/apilens";

export const dotnetHref = "/dotnet/";

export const dotnetGroups = ["Diagnostics"] as const;

export type DotnetGroup = (typeof dotnetGroups)[number];

export interface DotnetLibrary {
  slug: string;
  name: string;
  href: string;
  docs: string;
  packageId: string;
  version: string;
  subtitle: string;
  description: string;
  group: DotnetGroup;
  tags: string[];
}

export const dotnetTrack = {
  name: ".NET libraries",
  title: ".NET libraries",
  subtitle: "Server packages for ASP.NET Core and backend .NET",
  description:
    "Open-source .NET libraries for server and backend applications. Each product is its own repository and NuGet line. This track is the server-side sibling of the MAUI component library.",
  hub: "https://github.com/nuvyntralabs/NETEssentials",
  author: "Niladri Prasad Padhy",
  license: "MIT",
} as const;

export const dotnetLibraries: DotnetLibrary[] = [
  {
    slug: "apilens",
    name: apiLens.name,
    href: apiLensHref,
    docs: `${apiLensDocsBase}/`,
    packageId: apiLens.packageId,
    version: apiLens.version,
    subtitle: apiLens.subtitle,
    description: apiLens.description,
    group: "Diagnostics",
    tags: [...apiLens.tags],
  },
];
