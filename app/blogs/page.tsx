import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { BlogList } from "@/components/blog-list";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Published Nuvyntra Labs blogs.",
  alternates: { canonical: "/blogs/" },
  openGraph: {
    title: "Blogs",
    description: "Published Nuvyntra Labs blogs.",
    url: "/blogs/",
  },
};

export default function BlogsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Blogs"
        title="Published blogs"
        description="Walkthroughs, lab notes, and product updates published in the NuvyntraLabs series on DEV."
        action={
          <Link href="/blogs/write/" className="focusable btn-primary">
            Write a blog
          </Link>
        }
      />
      <section className="container py-8 sm:py-10">
        <BlogList />
      </section>
    </main>
  );
}
