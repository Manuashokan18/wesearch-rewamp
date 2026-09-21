"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type WhyShowcaseItem = {
  /** Photograph shown beside the list when the reason is selected. Decorative. */
  image: string;
  title: string;
  description: string;
  /** A rendered icon element — see `FeatureTabItem.icon` for why it can't be a component. */
  icon: ReactNode;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The reasons to choose us as a numbered list on a dark band, with one large
 * photograph beside it that follows the selection. The list carries every
 * reason's full copy, so nothing depends on the picture.
 *
 * The same tablist pattern as `FeatureTabs`, turned to suit a navy ground: the
 * photograph sits on the left, the list is set as quiet glass rows, and the
 * selected row gains an accent rule and a brighter surface. Keyboard support
 * (arrows, Home, End, roving tab index) and the mouse-rest selection are the
 * same; a phone stacks the photograph over the list.
 */
export function WhyShowcase({
  items,
  className,
}: {
  items: WhyShowcaseItem[];
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
        "grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-6",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="relative h-72 overflow-hidden rounded-2xl bg-navy-deep ring-1 ring-white/10 sm:h-96 lg:h-auto lg:min-h-[26rem]"
      >
        {items.map((item, index) => {
          const isActive = index === active;

          return (
            <div
              key={item.title}
              className={cn(
                "absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none",
                isActive ? "opacity-100" : "opacity-0"
              )}
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 620px, 100vw"
                className={cn(
                  "object-cover transition-transform duration-[1400ms] ease-out motion-reduce:transition-none",
                  isActive ? "scale-100" : "scale-105"
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/15 to-navy-deep/20" />

              <span className="absolute right-5 top-4 select-none text-6xl font-bold leading-none text-white/25">
                {pad(index + 1)}
              </span>

              <p className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full bg-white/15 py-2 pl-2 pr-5 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur-md">
                <span className="flex size-9 items-center justify-center rounded-full bg-accent text-white">
                  {item.icon}
                </span>
                {item.title}
              </p>
            </div>
          );
        })}
      </div>

      <div
        role="tablist"
        aria-orientation="vertical"
        className="grid gap-3 lg:auto-rows-fr"
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
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(index)}
              onFocus={() => setActive(index)}
              onPointerEnter={(event) => event.pointerType === "mouse" && select(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "group relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-4 overflow-hidden rounded-2xl border px-5 py-5 text-left transition-colors duration-300 motion-reduce:transition-none sm:px-6",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft",
                isActive
                  ? "border-white/25 bg-white/[0.09]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-4 left-0 w-0.5 rounded-full bg-accent-soft transition-opacity duration-300 motion-reduce:transition-none",
                  isActive ? "opacity-100" : "opacity-0"
                )}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "pt-0.5 text-sm font-semibold tabular-nums transition-colors duration-300 motion-reduce:transition-none",
                  isActive ? "text-accent-soft" : "text-white/40"
                )}
              >
                {pad(index + 1)}
              </span>
              <span className="min-w-0">
                <span
                  className={cn(
                    "block text-card transition-colors duration-300 motion-reduce:transition-none",
                    isActive ? "text-white" : "text-white/75 group-hover:text-white"
                  )}
                >
                  {item.title}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-sm leading-relaxed transition-colors duration-300 motion-reduce:transition-none",
                    isActive ? "text-white/75" : "text-white/50"
                  )}
                >
                  {item.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default WhyShowcase;
