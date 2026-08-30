import type { Metadata } from "next";
import { researchProjects } from "@/content/works";
import { ResearchCard } from "@/components/work-card";

export const metadata: Metadata = {
  title: "R&D projects",
  description:
    "Nuvyntra Labs research: inspection products, VoIP stacks, GPS accuracy studies, and Xamarin bindings.",
  alternates: { canonical: "/research/" },
};

export default function ResearchPage() {
  return (
    <main className="container py-16 sm:py-20">
      <p className="eyebrow">R&D projects</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">Research</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Longer investigations that produce reusable knowledge — products, accuracy studies, calling
        stacks, and platform bindings. POCs and NuGet packages live in their own sections.
      </p>
      <p className="mt-6 text-sm text-muted-foreground">{researchProjects.length} projects</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {researchProjects.map((work) => (
          <li key={work.slug}>
            <ResearchCard work={work} />
          </li>
        ))}
      </ul>
    </main>
  );
}
