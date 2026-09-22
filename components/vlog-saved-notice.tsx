"use client";

import { useEffect, useState } from "react";
import { VLOG_SAVED_NOTICE_KEY } from "@/lib/devto-draft";

export function VlogSavedNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(VLOG_SAVED_NOTICE_KEY) !== "1") return;
    sessionStorage.removeItem(VLOG_SAVED_NOTICE_KEY);
    setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="container pt-6" role="status">
      <p className="rounded-2xl border border-lavender-200 bg-lavender-50 px-5 py-4 text-sm font-semibold text-lavender-900 dark:border-white/15 dark:bg-white/10 dark:text-lavender-100">
        Vlog saved as a draft.
      </p>
    </div>
  );
}
