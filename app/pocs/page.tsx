import type { Metadata } from "next";
import { proofOfConcepts } from "@/content/works";
import { PocCard } from "@/components/work-card";

export const metadata: Metadata = {
  title: "Proofs of concept",
  description:
    "Nuvyntra Labs POCs and maintained forks: solar sales UX, Bluetooth recording, CallKit, and pinned plugins.",
  alternates: { canonical: "/pocs/" },
};

export default function PocsPage() {
  return (
    <main className="container py-16 sm:py-20">
      <p className="eyebrow">Proofs of concept</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">POCs</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Public proofs and maintained forks. Short enough to evaluate, complete enough to reuse.
        When a pattern becomes a product plugin, it is published under NuGet packages.
      </p>
      <p className="mt-6 text-sm text-muted-foreground">{proofOfConcepts.length} prototypes</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {proofOfConcepts.map((work) => (
          <li key={work.slug}>
            <PocCard work={work} />
          </li>
        ))}
      </ul>
    </main>
  );
}
