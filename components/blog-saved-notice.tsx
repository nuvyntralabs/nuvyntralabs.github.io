"use client";

import { useEffect, useState } from "react";
import { BLOG_SAVED_NOTICE_KEY } from "@/lib/devto-draft";

export function BlogSavedNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(BLOG_SAVED_NOTICE_KEY) !== "1") return;
    sessionStorage.removeItem(BLOG_SAVED_NOTICE_KEY);
    setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="container pt-6" role="status">
      <p className="rounded-2xl border border-lavender-200 bg-lavender-50 px-5 py-4 text-sm font-semibold text-lavender-900 dark:border-white/15 dark:bg-white/10 dark:text-lavender-100">
        Blog saved as a draft.
      </p>
    </div>
  );
}
