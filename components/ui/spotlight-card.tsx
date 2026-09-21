"use client";

import type { ComponentProps, PointerEvent } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = ComponentProps<"div"> & {
  /** `dark` is for cards sitting on a navy band. */
  tone?: "light" | "dark";
};

/**
 * A card with a soft radial spotlight that follows the pointer.
 *
 * Adapted from Hirael's "Feature 8" (Feature Grid Spotlight Cards) on 21st.dev.
 * The source's pointer tracking is kept as is: the handler only writes
 * `--mx` / `--my` on the element, so there is no React state and no re-render
 * per move. Its square hairline cards and corner crosshairs are dropped for the
 * site's `rounded-2xl` surfaces, and the warm glow becomes the accent blue.
 *
 * Only this thin wrapper is a Client Component: the card's contents are passed
 * in as `children`, so the icons and copy inside stay server-rendered.
 */
export function SpotlightCard({
  tone = "light",
  className,
  children,
  ...props
}: SpotlightCardProps) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-colors duration-300 [--mx:50%] [--my:0%]",
        tone === "light"
          ? "border-line bg-surface hover:border-accent/40"
          : "border-white/10 bg-white/[0.04] hover:border-white/25",
        className
      )}
      {...props}
    >
      {/* Spotlight: fades in on hover, centred on the pointer. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none",
          tone === "light"
            ? "bg-[radial-gradient(circle_240px_at_var(--mx)_var(--my),color-mix(in_oklch,var(--color-accent)_13%,transparent),transparent_70%)]"
            : "bg-[radial-gradient(circle_240px_at_var(--mx)_var(--my),color-mix(in_oklch,var(--color-accent-soft)_24%,transparent),transparent_70%)]"
        )}
      />
      {children}
    </div>
  );
}

export default SpotlightCard;
