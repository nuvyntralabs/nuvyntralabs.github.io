import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="focusable inline-flex items-center gap-2.5 rounded-full">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-sm font-extrabold text-white shadow-glow">
        NL
      </span>
      {compact ? null : (
        <span className="font-display text-base font-semibold tracking-tight text-foreground">
          {siteConfig.shortName}
        </span>
      )}
    </Link>
  );
}
