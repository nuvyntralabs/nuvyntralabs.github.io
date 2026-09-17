"use client";

import { useLayoutEffect } from "react";

export function DocsArticleScroll({ pageKey }: { pageKey: string }) {
  useLayoutEffect(() => {
    const article = document.getElementById("docs-article");
    if (!article) {
      window.scrollTo(0, 0);
      return;
    }

    const stacked = window.matchMedia("(max-width: 1023px)").matches;
    if (stacked) {
      const top = article.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo(0, Math.max(0, top));
      return;
    }

    window.scrollTo(0, 0);
  }, [pageKey]);

  return null;
}
