import type { Metadata } from "next";
import { toolkits } from "@/content/toolkits";
import { ToolkitCard } from "@/components/work-card";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Toolkits",
  description:
    "Nuvyntra Labs developer toolkits for .NET MAUI: Nuvyn spec-driven CLI and MauiDev doctor plus VS Code / Cursor extension.",
  alternates: { canonical: "/toolkits/" },
  openGraph: {
    title: "Nuvyntra Labs toolkits",
    description:
      "Nuvyn scaffolds a spec-driven MAUI host. MauiDev diagnoses the machine and the project.",
    url: "/toolkits/",
  },
};

export default function ToolkitsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Toolkits"
        title="Scaffold the host, then diagnose"
        description="This is the whole-ecosystem door. Nuvyn creates a spec-driven MAUI app on the Nuvyntra stack. MauiDev doctors the machine and the project. Individual plugins and UIKit stay installable without these tools."
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
        description="That is the component-library door. Browse the NuGet catalog. Nuvyn starts a new host. MauiDev diagnoses SDK, project, and resource issues."
      />
    </main>
  );
}
