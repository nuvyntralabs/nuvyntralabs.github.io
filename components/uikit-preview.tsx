"use client";

import Link from "next/link";
import { useState } from "react";
import { uiKit } from "@/content/uikit";
import { cn } from "@/lib/utils";

export interface UiKitPreviewItem {
  name: string;
  href: string;
  kind: string;
  layer: string;
  src: string | null;
}

export function UiKitPreview({
  name,
  src,
  kind,
  compact = false,
}: {
  name: string;
  src: string | null;
  kind: string;
  compact?: boolean;
}) {
  const [missing, setMissing] = useState(!src);
  const phone = kind === "recipe";

  return (
    <section id="preview" className={cn("scroll-mt-24", compact ? "" : "border-b border-border pb-10")}>
      {!compact ? (
        <div className="mb-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Preview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Captured from{" "}
            <a href={uiKit.sample} target="_blank" rel="noopener noreferrer" className="text-link">
              NuvyntraLabs.UIKit.Sample
            </a>{" "}
            on a phone. This is the control as Lumina paints it.
          </p>
        </div>
      ) : null}
      {missing || !src ? (
        <p className="rounded-2xl border border-border px-4 py-6 text-sm text-muted-foreground">
          No phone capture for {name} yet.
        </p>
      ) : (
        <figure
          className={cn(
            "overflow-hidden rounded-2xl border border-border bg-[#F6F1E8]",
            phone && !compact ? "flex justify-center px-4 py-6" : "",
          )}
        >
          <img
            src={src}
            alt={`${name} captured from the UIKit sample on a phone`}
            className={cn("mx-auto h-auto w-full bg-[#F6F1E8]", phone && !compact ? "max-w-[420px]" : "max-w-xl")}
            onError={() => setMissing(true)}
          />
        </figure>
      )}
    </section>
  );
}

export function UiKitPreviewGallery({ groups }: { groups: { layer: string; items: UiKitPreviewItem[] }[] }) {
  return (
    <section id="preview" className="scroll-mt-24 border-b border-border pb-10">
      <div className="mb-4">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Sample gallery</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Every control and page recipe, captured from the sample app on a phone.
        </p>
      </div>
      <div className="space-y-10">
        {groups.map((group) => (
          <div key={group.layer}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender-700 dark:text-lavender-300">
              {group.layer}
            </h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {group.items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="focusable block overflow-hidden rounded-2xl border border-border hover:shadow-glow"
                  >
                    <div className="flex min-h-[120px] items-center justify-center bg-[#F6F1E8] p-3">
                      {item.src ? (
                        <img src={item.src} alt="" className="max-h-40 w-auto max-w-full object-contain" />
                      ) : (
                        <span className="text-xs text-muted-foreground">No capture</span>
                      )}
                    </div>
                    <p className="border-t border-border px-3 py-2 text-sm font-semibold text-foreground">{item.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
