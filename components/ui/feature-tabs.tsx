"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type FeatureTabItem = {
  /** Photograph shown when the tab is open. Decorative — the copy carries the meaning. */
  image: string;
  title: string;
  /** Short accent label above the title. */
  label?: string;
  description: string;
  /**
   * A rendered icon, e.g. `<Users className="size-5" />`. It has to arrive as
   * an element: a Server Component cannot pass an icon component across to
   * this Client Component.
   */
  icon: ReactNode;
  /** Adds a link under the copy when both are given. */
  href?: string;
  cta?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A tab list beside one large photograph: pick a topic on the left and the
 * picture, heading and copy on the right change to match. On phones the list
 * becomes a row of pills that scrolls sideways above the photograph.
 *
 * Follows the "Feature Tab Switcher" and "Feature Showcase" blocks in the
 * 21st.dev catalogue — a vertical list driving a media panel — built natively
 * on the site's tokens rather than from one source: the panel here crossfades
 * real photographs and carries a link, which those demos don't.
 *
 * It is a real tablist: arrow keys, Home and End move between tabs, only the
 * selected tab is in the tab order, and a closed panel is `inert` so its link
 * can't be reached. A mouse pointer resting on a tab selects it, as the site's
 * photo accordion does; touch and keyboard select on tap and focus.
 */
export function FeatureTabs({
  items,
  className,
}: {
  items: FeatureTabItem[];
  className?: string;
}) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number, focus = false) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key], true);
    }
  };

  return (
    <div
      className={cn(
        "grid gap-4 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-6",
        className
      )}
    >
      <div
        role="tablist"
        aria-orientation="vertical"
        className="-mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:grid lg:auto-rows-fr lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {items.map((item, index) => {
          const isActive = index === active;

          return (
            <button
              key={item.title}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              id={`${uid}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${uid}-panel-${index}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(index)}
              onFocus={() => setActive(index)}
              onPointerEnter={(event) => event.pointerType === "mouse" && select(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "group relative flex shrink-0 snap-start items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors duration-300 motion-reduce:transition-none lg:gap-4 lg:px-5 lg:py-4",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                isActive
                  ? "border-accent/30 bg-tint/70 shadow-sm shadow-navy/5"
                  : "border-line bg-surface/60 hover:border-accent/30 hover:bg-surface"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 motion-reduce:transition-none lg:size-11",
                  isActive ? "bg-accent text-white" : "bg-tint text-accent"
                )}
              >
                {item.icon}
              </span>

              <span className="min-w-0">
                {item.label && (
                  <span className="hidden text-xs font-semibold uppercase tracking-wider text-accent lg:block">
                    {item.label}
                  </span>
                )}
                <span
                  className={cn(
                    "block whitespace-nowrap text-sm font-semibold transition-colors lg:whitespace-normal lg:text-card",
                    isActive ? "text-ink" : "text-ink/70 group-hover:text-ink"
                  )}
                >
                  {item.title}
                </span>
              </span>

              <ChevronRight
                aria-hidden="true"
                className={cn(
                  "ml-auto hidden size-4 shrink-0 text-accent transition-all duration-300 motion-reduce:transition-none lg:block",
                  isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="relative h-[30rem] overflow-hidden rounded-2xl bg-navy-deep shadow-xl shadow-navy/15 sm:h-[32rem] lg:h-auto lg:min-h-[32rem]">
        {items.map((item, index) => {
          const isActive = index === active;

          return (
            <div
              key={item.title}
              id={`${uid}-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${index}`}
              inert={!isActive}
              className={cn(
                "absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none",
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 720px, 100vw"
                className={cn(
                  "object-cover transition-transform duration-[1400ms] ease-out motion-reduce:transition-none",
                  isActive ? "scale-100" : "scale-105"
                )}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-deep from-5% via-navy-deep/65 via-45% to-navy-deep/5"
              />

              <p
                aria-hidden="true"
                className="absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-xs tabular-nums text-subtle backdrop-blur"
              >
                <span className="font-semibold text-ink">{pad(index + 1)}</span> / {pad(items.length)}
              </p>

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="flex items-center gap-3 text-eyebrow text-white/85">
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20 backdrop-blur"
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </p>
                <h3 className="mt-4 max-w-[22ch] text-section text-white">{item.title}</h3>
                <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-white/80 sm:text-base">
                  {item.description}
                </p>
                {item.href && item.cta && (
                  <Link
                    href={item.href}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/50 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    {item.cta}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeatureTabs;
