import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Logo({
  compact = false,
  onDark = false,
}: {
  compact?: boolean;
  onDark?: boolean;
}) {
  return (
    <Link href="/" className="focusable inline-flex items-center gap-2.5 rounded-full">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-[13px] font-extrabold tracking-tight text-white shadow-glow">
        NL
      </span>
      {compact ? null : (
        <span
          className={
            onDark
              ? "font-display text-base font-semibold tracking-tight text-white"
              : "font-display text-base font-semibold tracking-tight text-foreground"
          }
        >
          {siteConfig.shortName}
        </span>
      )}
    </Link>
  );
}
