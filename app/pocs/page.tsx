import type { Metadata } from "next";
import { proofOfConcepts } from "@/content/works";
import { PocCard } from "@/components/work-card";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Proofs of concept",
  description:
    "Nuvyntra Labs POCs and maintained forks: solar sales UX, Bluetooth recording, CallKit, and pinned plugins.",
  alternates: { canonical: "/pocs/" },
  openGraph: {
    title: "Nuvyntra Labs proofs of concept",
    description:
      "Public prototypes and maintained forks: solar sales UX, Bluetooth recording, CallKit, and pinned plugins.",
    url: "/pocs/",
  },
};

export default function PocsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Proofs of concept"
        title="Public proofs, then packages"
        description="Short prototypes and maintained forks. Evaluate the idea here; adopt the NuGet package when the pattern is reusable."
      />
      <div className="container py-16 sm:py-20">
        <p className="text-sm text-muted-foreground">{proofOfConcepts.length} prototypes</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proofOfConcepts.map((work) => (
            <li key={work.slug}>
              <PocCard work={work} />
            </li>
          ))}
        </ul>
      </div>
      <CtaBand />
    </main>
  );
}
