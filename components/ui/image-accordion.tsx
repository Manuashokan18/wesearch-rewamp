"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ImageAccordionItem = {
  /** Photograph. Decorative — the heading carries the meaning. Remote hosts must be allowed in next.config.ts. */
  image: string;
  title: string;
  /** Short accent label beside the icon, above the heading. */
  label?: string;
  description: string;
  /** The panel's link. Shown only when both `href` and `cta` are given. */
  href?: string;
  cta?: string;
  /**
   * A rendered icon, e.g. `<Users className="size-5" />`. It has to arrive as
   * an element: a Server Component cannot pass an icon component across to
   * this Client Component.
   */
  icon: ReactNode;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A row of photo panels where one is open and the rest fold to slim rails; the
 * open one shows its label, heading, copy and a link. On phones and tablets the
 * same list runs as a vertical accordion.
 *
 * Adapted from "Elastic Gallery" by daiwiikharihar on 21st.dev. The expand
 * mechanic is the source's: `flex-[4]` against `flex-[1]` with a slow
 * ease-out, the picture settling from a slight zoom, and the copy rising in
 * once the panel has opened. Changes for this site:
 *
 * - The source hid everything on a folded panel. Here every panel keeps its
 *   heading and description in the DOM (only faded), so all the copy stays
 *   readable to assistive tech, and the collapsed rail shows a decorative
 *   duplicate of the title (`aria-hidden`) instead.
 * - Each heading is a real button with `aria-expanded`, and focusing it opens
 *   the panel, so the row works from the keyboard as well as by hover and tap.
 *   The link only takes focus once its panel is open.
 * - Copy, palette and radius come from the site tokens; `next/image` replaces
 *   the raw `<img>`; motion is dropped under `prefers-reduced-motion`.
 */
export function ImageAccordion({
  items,
  className,
}: {
  items: ImageAccordionItem[];
  className?: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <ul
      className={cn(
        "flex h-[44rem] flex-col gap-2 sm:h-[40rem] lg:h-[34rem] lg:flex-row lg:gap-3",
        className
      )}
    >
      {items.map((item, index) => {
        const isActive = index === active;

        return (
          <li
            key={item.title}
            onMouseEnter={() => setActive(index)}
            onClick={() => setActive(index)}
            className={cn(
              "group relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-2xl bg-navy-deep",
              "transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none",
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
              isActive ? "flex-[4]" : "flex-[1]"
            )}
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 660px, 100vw"
              className={cn(
                "object-cover transition-transform duration-1000 motion-reduce:transition-none",
                isActive ? "scale-100" : "scale-110"
              )}
            />

            {/* Folded panels take an even navy wash; the open one a scrim from the foot, where its copy sits. */}
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0 bg-navy-deep/55 transition-opacity duration-500 motion-reduce:transition-none",
                isActive ? "opacity-0" : "opacity-100 group-hover:opacity-80"
              )}
            />
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-navy-deep from-8% via-navy-deep/65 via-45% to-navy-deep/5 transition-opacity duration-500 motion-reduce:transition-none",
                isActive ? "opacity-100" : "opacity-0"
              )}
            />

            {/* Folded state: an icon and the title on the rail. Decorative — the heading below is the real one. */}
            <div
              aria-hidden="true"
              className={cn(
                "absolute flex items-center gap-3 transition-all duration-500 motion-reduce:transition-none",
                "inset-x-5 top-1/2 -translate-y-1/2 lg:inset-x-0 lg:bottom-8 lg:top-auto lg:translate-y-0 lg:flex-col lg:justify-end lg:gap-5",
                isActive ? "scale-95 opacity-0" : "opacity-100 delay-300"
              )}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm">
                {item.icon}
              </span>
              <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-white lg:text-base lg:[writing-mode:vertical-rl]">
                {item.title}
              </span>
            </div>

            {/* Open state. */}
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 p-6 transition-all duration-500 sm:p-8 motion-reduce:transition-none",
                isActive ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-8 opacity-0"
              )}
            >
              <p className="flex items-center gap-3 text-eyebrow text-white/85">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20 backdrop-blur">
                  {item.icon}
                </span>
                {item.label}
              </p>

              <h3 className="mt-4 max-w-[20ch] text-section text-white">
                <button
                  type="button"
                  aria-expanded={isActive}
                  onFocus={() => setActive(index)}
                  className="text-left focus:outline-none"
                >
                  {item.title}
                </button>
              </h3>

              <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-white/80 sm:text-base">
                {item.description}
              </p>

              {item.href && item.cta && (
                <Link
                  href={item.href}
                  tabIndex={isActive ? 0 : -1}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/50 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  {item.cta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}
            </div>

            <p
              aria-hidden="true"
              className={cn(
                "absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-xs tabular-nums text-subtle backdrop-blur transition-opacity duration-500 motion-reduce:transition-none",
                isActive ? "opacity-100 delay-200" : "opacity-0"
              )}
            >
              <span className="font-semibold text-ink">{pad(index + 1)}</span> / {pad(items.length)}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

export default ImageAccordion;
