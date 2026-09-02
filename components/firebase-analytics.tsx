"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logClick, logScreenView } from "@/lib/firebase";

function isTrackableTarget(element: Element | null): element is HTMLElement {
  return element instanceof HTMLElement && Boolean(element.closest("a, button, [role='button']"));
}

export function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    void logScreenView(pathname);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !isTrackableTarget(target)) {
        return;
      }

      const element = target.closest("a, button, [role='button']");
      if (!(element instanceof HTMLElement)) {
        return;
      }

      void logClick(element, pathname);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
