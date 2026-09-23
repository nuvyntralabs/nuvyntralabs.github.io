import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { WriteBlogForm } from "@/components/write-blog-form";

export const metadata: Metadata = {
  title: "Write a blog",
  description:
    "Write a Nuvyntra Labs blog with the same fields as the DEV editor. Submit saves an unpublished draft for review. No DEV API key is required.",
  alternates: { canonical: "/blogs/write/" },
  openGraph: {
    title: "Write a blog",
    description: "Save a DEV draft with title, description, cover, tags, series, and markdown. No DEV API key is required.",
    url: "/blogs/write/",
  },
};

export default function WriteBlogPage() {
  return (
    <main>
      <PageHero
        eyebrow="Blogs"
        title="Write a blog"
        description="The same article fields as DEV: title, description, cover, story, tags, series, and canonical URL. Submit saves an unpublished draft for review. You do not need a DEV API key."
      />
      <section className="container py-8 sm:py-10">
        <WriteBlogForm />
      </section>
    </main>
  );
}
