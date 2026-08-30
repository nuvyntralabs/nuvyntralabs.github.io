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
      <div className="overflow-hidden rounded-3xl bg-gradient-ink px-6 py-10 text-white sm:px-10 sm:py-12">
        <p className="eyebrow-on-dark">{eyebrow}</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight">{title}</h2>
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
    </section>
  );
}
