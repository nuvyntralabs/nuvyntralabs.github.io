import type { Metadata } from "next";
import { toolkits } from "@/content/toolkits";
import { ToolkitCard } from "@/components/work-card";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Toolkits",
  description:
    "Nuvyntra Labs developer toolkits: Nuvyn spec-driven CLI, MauiDev doctor, NuvLoc agent-driven localization, and Pulse live session viewer.",
  alternates: { canonical: "/toolkits/" },
  openGraph: {
    title: "Nuvyntra Labs toolkits",
    description:
      "Nuvyn scaffolds a spec-driven MAUI host. MauiDev diagnoses the machine and the project. NuvLoc diffs sibling .resx files. Pulse watches live Plugin.Maui.* sessions.",
    url: "/toolkits/",
  },
};

export default function ToolkitsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Toolkits"
        title="Scaffold the host, then diagnose"
        description="This is the whole-ecosystem door. Nuvyn creates a spec-driven MAUI app on the Nuvyntra stack. MauiDev doctors the machine and the project. NuvLoc diffs sibling .resx files and lets your coding agent write the cultures. Pulse watches live Plugin.Maui.* sessions. Individual plugins and UIKit stay installable without these tools."
      />
      <div className="container py-8 sm:py-10">
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
        description="That is the component-library door. Browse the NuGet catalog. Nuvyn starts a new host. MauiDev diagnoses SDK, project, and resource issues. NuvLoc localizes sibling .resx files. Pulse listens to plugins already in the app."
      />
    </main>
  );
}
