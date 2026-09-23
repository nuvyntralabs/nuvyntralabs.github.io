import type { Metadata } from "next";
import { BlogPathRedirect } from "@/components/blog-path-redirect";

export const metadata: Metadata = {
  title: "Blogs",
  robots: { index: false, follow: true },
  alternates: { canonical: "/blogs/" },
};

export default function BlogsRedirectPage() {
  return <BlogPathRedirect href="/blogs/" label="Blogs" />;
}
