import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { WriteVlogForm } from "@/components/write-vlog-form";

export const metadata: Metadata = {
  title: "Write a vlog",
  description:
    "Write a Nuvyntra Labs vlog with the same fields as the DEV editor. Submit saves an unpublished draft for review. No DEV API key is required.",
  alternates: { canonical: "/vlogs/write/" },
  openGraph: {
    title: "Write a vlog",
    description: "Save a DEV draft with title, description, cover, tags, series, and markdown. No DEV API key is required.",
    url: "/vlogs/write/",
  },
};

export default function WriteVlogPage() {
  return (
    <main>
      <PageHero
        eyebrow="Vlogs"
        title="Write a vlog"
        description="The same article fields as DEV: title, description, cover, story, tags, series, and canonical URL. Submit saves an unpublished draft for review. You do not need a DEV API key."
      />
      <section className="container py-16 sm:py-20">
        <WriteVlogForm />
      </section>
    </main>
  );
}
