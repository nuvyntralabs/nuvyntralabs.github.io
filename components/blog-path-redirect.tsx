"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function BlogPathRedirect({ href, label }: { href: string; label: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(href);
  }, [href, router]);

  return (
    <main className="container py-16">
      <p className="text-sm text-muted-foreground">
        This page moved to{" "}
        <a href={href} className="font-semibold text-lavender-700 underline dark:text-lavender-300">
          {label}
        </a>
        .
      </p>
    </main>
  );
}
