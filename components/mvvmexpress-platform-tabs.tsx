"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getMvvmExpressPlatform,
  isMvvmExpressSlug,
  mvvmExpressCounterpartHref,
  mvvmExpressPlatforms,
} from "@/content/mvvmexpress-family";
import { cn } from "@/lib/utils";

export function MvvmExpressPlatformTabs({ slug }: { slug: string }) {
  const pathname = usePathname();
  if (!isMvvmExpressSlug(slug)) return null;
  const current = getMvvmExpressPlatform(slug);
  if (!current) return null;

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="MVVMExpress platform">
      {mvvmExpressPlatforms.map((platform) => {
        const selected = platform.slug === current.slug;
        return (
          <Link
            key={platform.id}
            href={mvvmExpressCounterpartHref(pathname || `/packages/${slug}/`, platform.slug)}
            role="tab"
            aria-selected={selected}
            className={cn(
              "focusable inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
              selected
                ? "bg-gradient-primary text-white shadow-glow"
                : "filter-idle",
            )}
          >
            {platform.label}
          </Link>
        );
      })}
    </div>
  );
}
