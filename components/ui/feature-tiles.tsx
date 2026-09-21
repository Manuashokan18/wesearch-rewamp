import type { LucideIcon } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

export type FeatureTileItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Where each of six tiles sits: the first and last run two columns wide, the
 * rest one, so a four-column grid fills two rows with no gaps
 * (wide, 1, 1 / 1, 1, wide). On a two-column grid the same tiles fall into
 * wide / 1 1 / 1 1 / wide. With any other count the extra tiles are one wide.
 */
const span = ["sm:col-span-2 lg:col-span-2", "", "", "", "", "sm:col-span-2 lg:col-span-2"];

/** Faint requisition rows, drawn in CSS: decoration for the lead tile. */
function RequisitionRows() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-7 top-1/2 hidden w-56 -translate-y-1/2 space-y-3 xl:block"
    >
      {[100, 84, 66].map((width, row) => (
        <div
          key={width}
          className="flex items-center gap-3 rounded-full bg-white/[0.07] py-3 pl-4 pr-6 ring-1 ring-white/10"
          style={{ width: `${width}%`, opacity: 1 - row * 0.24 }}
        >
          <span className="size-2.5 shrink-0 rounded-full bg-accent-soft" />
          <span className="h-1.5 flex-1 rounded-full bg-white/25" />
        </div>
      ))}
    </div>
  );
}

/** A rising line, drawn in SVG: decoration for the closing tile. */
function RisingLine() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 260 120"
      fill="none"
      className="pointer-events-none absolute bottom-0 right-0 hidden h-32 w-64 xl:block"
    >
      <defs>
        <linearGradient id="tile-rise" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 104 L48 88 L92 96 L140 60 L188 66 L260 14 V120 H0 Z" fill="url(#tile-rise)" />
      <path
        d="M0 104 L48 88 L92 96 L140 60 L188 66 L260 14"
        stroke="#fff"
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="260" cy="14" r="4" fill="#fff" />
    </svg>
  );
}

/**
 * A bento of icon tiles — six items, mixed widths, mixed grounds. The first
 * tile is navy, the last is the accent blue, and the four between are light
 * with a pointer spotlight.
 *
 * After the "Feature Bento" and "Feature Overview Bento" blocks in the 21st.dev
 * catalogue (a hero tile among smaller ones on a shared grid), built natively:
 * those ship with hard-coded product copy, so this takes its tiles as data and
 * draws the two decorations itself. Copy stays in server-rendered markup; only
 * the spotlight wrapper is a Client Component.
 */
export function FeatureTiles({
  items,
  className,
}: {
  items: FeatureTileItem[];
  className?: string;
}) {
  const last = items.length - 1;

  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:auto-rows-[15.5rem] lg:grid-cols-4", className)}>
      {items.map((item, index) => {
        const lead = index === 0;
        const closing = index === last && items.length > 1;
        const wide = span[index]?.length > 0;
        const filled = lead || closing;

        return (
          <li key={item.title} className={cn("min-h-[14rem]", span[index] ?? "")}>
            <SpotlightCard
              tone={filled ? "dark" : "light"}
              className={cn(
                "flex h-full flex-col p-7",
                lead && "border-navy bg-navy shadow-xl shadow-navy/20 hover:border-accent-soft/50",
                closing &&
                  "border-accent bg-gradient-to-br from-accent to-[#1f4fc0] shadow-xl shadow-accent/25 hover:border-white/40",
                !filled &&
                  "bg-gradient-to-br from-surface via-surface to-tint/70 shadow-sm shadow-navy/5 hover:shadow-lg hover:shadow-navy/10"
              )}
            >
              {lead && (
                <>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-16 -top-24 size-72 rounded-full bg-accent/30 blur-3xl"
                  />
                  <RequisitionRows />
                </>
              )}
              {closing && (
                <>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-20 size-64 rounded-full bg-white/15 blur-3xl"
                  />
                  <RisingLine />
                </>
              )}
              <div className="relative flex items-start justify-between">
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-xl transition-colors duration-300 motion-reduce:transition-none",
                    filled
                      ? "bg-white/15 text-white ring-1 ring-inset ring-white/20"
                      : "bg-tint text-accent group-hover:bg-accent group-hover:text-white"
                  )}
                >
                  <item.icon className="size-6" aria-hidden="true" />
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "select-none text-3xl font-bold leading-none",
                    filled ? "text-white/25" : "text-ink/10"
                  )}
                >
                  {pad(index + 1)}
                </span>
              </div>

              <div className="relative mt-auto pt-8">
                <h3 className={cn(wide ? "text-subsection" : "text-card", filled ? "text-white" : "text-ink")}>
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm leading-relaxed",
                    wide ? "max-w-[34ch]" : "max-w-[30ch]",
                    filled ? "text-white/75" : "text-subtle"
                  )}
                >
                  {item.description}
                </p>
              </div>
            </SpotlightCard>
          </li>
        );
      })}
    </ul>
  );
}

export default FeatureTiles;
