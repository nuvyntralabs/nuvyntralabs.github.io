import type { Metadata } from "next";
import { toolkits } from "@/content/toolkits";
import { ToolkitCard } from "@/components/work-card";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Toolkits",
  description:
    "Nuvyntra Labs developer toolkits for .NET MAUI: maui-dev doctor CLI and the MauiDev VS Code / Cursor extension.",
  alternates: { canonical: "/toolkits/" },
  openGraph: {
    title: "Nuvyntra Labs toolkits",
    description:
      "Project-aware maui-dev doctor CLI and VS Code / Cursor extension for .NET MAUI teams.",
    url: "/toolkits/",
  },
};

export default function ToolkitsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Toolkits"
        title="Diagnose the machine and the project"
        description="Developer productivity tools sit next to the NuGet catalog — not inside it. MauiDev is a maui-dev CLI plus a VS Code / Cursor extension. It does not replace runtime plugins."
      />
      <div className="container py-16 sm:py-20">
        <p className="text-sm text-muted-foreground">
          {toolkits.length} toolkit{toolkits.length === 1 ? "" : "s"}
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {toolkits.map((item) => (
            <li key={item.slug}>
              <ToolkitCard item={item} />
            </li>
          ))}
        </ul>
      </div>
      <CtaBand
        title="Need a runtime plugin instead?"
        description="MauiDev diagnoses SDK, project, and resource issues. Leaks, traces, crashes, and device health live in the NuGet catalog."
      />
    </main>
  );
}
