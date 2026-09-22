import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { VlogList } from "@/components/vlog-list";

export const metadata: Metadata = {
  title: "Vlogs",
  description: "Published Nuvyntra Labs vlogs.",
  alternates: { canonical: "/vlogs/" },
  openGraph: {
    title: "Vlogs",
    description: "Published Nuvyntra Labs vlogs.",
    url: "/vlogs/",
  },
};

export default function VlogsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Vlogs"
        title="Published vlogs"
        description="Walkthroughs, lab notes, and product updates published in the NuvyntraLabs series on DEV."
        action={
          <Link href="/vlogs/write/" className="focusable btn-primary">
            Write Vlogs
          </Link>
        }
      />
      <section className="container py-16 sm:py-20">
        <VlogList />
      </section>
    </main>
  );
}
