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
      <img
        src="/brand/logo.svg"
        alt={compact ? siteConfig.shortName : ""}
        width={36}
        height={36}
        className="h-9 w-9 rounded-[10px]"
      />
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
