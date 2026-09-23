import type { Metadata } from "next";
import { BlogPathRedirect } from "@/components/blog-path-redirect";

export const metadata: Metadata = {
  title: "Write a blog",
  robots: { index: false, follow: true },
  alternates: { canonical: "/blogs/write/" },
};

export default function WriteBlogRedirectPage() {
  return <BlogPathRedirect href="/blogs/write/" label="Write a blog" />;
}
