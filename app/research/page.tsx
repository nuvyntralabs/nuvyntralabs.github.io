import type { Metadata } from "next";
import { researchProjects } from "@/content/works";
import { ResearchCard } from "@/components/work-card";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Nuvyntra Labs research: inspection products, VoIP stacks, GPS accuracy studies, and Xamarin bindings.",
  alternates: { canonical: "/research/" },
};

export default function ResearchPage() {
  return (
    <main>
      <PageHero
        eyebrow="Research"
        title="Investigations that become products"
        description="Longer studies that produce reusable knowledge — products, accuracy work, calling stacks, and platform bindings. POCs and NuGet packages live in their own sections."
      />
      <div className="container py-16 sm:py-20">
        <p className="text-sm text-muted-foreground">{researchProjects.length} projects</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {researchProjects.map((work) => (
            <li key={work.slug}>
              <ResearchCard work={work} />
            </li>
          ))}
        </ul>
      </div>
      <CtaBand />
    </main>
  );
}
