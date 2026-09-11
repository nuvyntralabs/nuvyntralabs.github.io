import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBand({
  eyebrow = "Next step",
  title = "Build with Nuvyntra Labs",
  description = "Browse production NuGet packages, or reach the lab if you want to evaluate research or compose a plugin set.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="container pb-20 sm:pb-28">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-ink px-6 py-12 text-white sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-30" />
        <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-lavender-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="relative">
          <p className="eyebrow-on-dark">{eyebrow}</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-lavender-100/80">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/packages/" className="focusable btn-primary">
              View products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/contact/" className="focusable btn-on-dark">
              Contact the lab
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
