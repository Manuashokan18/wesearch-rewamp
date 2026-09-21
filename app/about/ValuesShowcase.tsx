"use client";

import { useState, type PointerEvent, type ReactNode } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/sections/SectionIntro";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { cn } from "@/lib/utils";
import { dots, pad } from "./parts";

export type ValueItem = {
  name: string;
  /** A rendered icon element: a Server Component can't hand this client component an icon *component*. */
  icon: ReactNode;
  image: string;
  /** `object-position` for the photograph's crop. */
  position?: string;
};

type ValuesShowcaseProps = {
  eyebrow: string;
  title: string;
  values: ValueItem[];
};

/**
 * Where each value's photograph sits in the mosaic: two down the left, two down
 * the right and the last one tall in the middle. Five values fill the
 * three-column, two-row grid with no gaps. The tall frame is the last value's,
 * so give that one the photograph that crops well to a narrow portrait.
 */
const placements = [
  "col-start-1 row-start-1",
  "col-start-1 row-start-2",
  "col-start-3 row-start-1",
  "col-start-3 row-start-2",
  "col-start-2 row-span-2 row-start-1",
] as const;

/**
 * The values as a large typographic list beside a mosaic of team photographs.
 * Hovering a value brings its photograph out of a cool duotone into colour, and
 * hovering a photograph lights its value, so the two read as one thing.
 *
 * After makviesainte's "Team Showcase" on 21st.dev (a staggered photo grid
 * paired with an interactive name list; photos grayscale until a photo or its
 * name is hovered). The source could not be retrieved (the free code quota was
 * spent), so this is built to the behaviour and measurements of its live
 * preview, with the site's tokens and a bento mosaic in place of its columns.
 *
 * The photographs are decorative and the list carries the meaning, so the
 * mosaic is hidden from assistive tech. On a touch screen a tap selects and the
 * choice stays; on a device that can't hover the photographs rest in colour.
 */
export function ValuesShowcase({ eyebrow, title, values }: ValuesShowcaseProps) {
  const [active, setActive] = useState<number | null>(null);

  const enter = (index: number) => () => setActive(index);
  // A finger lifting isn't "leaving": keep a tapped value selected until another is chosen.
  const leave = (event: PointerEvent) => {
    if (event.pointerType !== "touch") setActive(null);
  };

  return (
    <section id="values" className="relative scroll-mt-20 overflow-hidden bg-surface">
      <div className={`${dots} -left-6 top-12 hidden h-36 w-28 lg:block`} aria-hidden="true" />
      <div className={`${dots} -bottom-6 -right-6 hidden h-32 w-44 lg:block`} aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20 lg:py-28">
        <AnimatedContainer className="lg:col-start-2 lg:row-start-1">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-section-lg text-ink">{title}</h2>

          <ul className="mt-8 border-t border-line lg:mt-10">
            {values.map((value, index) => {
              const isActive = active === index;

              return (
                <li
                  key={value.name}
                  onPointerEnter={enter(index)}
                  onPointerLeave={leave}
                  className="relative border-b border-line"
                >
                  <div
                    className={cn(
                      "flex items-center gap-4 py-5 transition-transform duration-300 motion-reduce:transition-none sm:gap-5 sm:py-6",
                      isActive && "translate-x-1.5 motion-reduce:translate-x-0"
                    )}
                  >
                    <span className="w-6 shrink-0 text-sm font-semibold tabular-nums text-subtle">
                      {pad(index + 1)}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 motion-reduce:transition-none",
                        isActive ? "bg-accent text-white" : "bg-tint text-accent"
                      )}
                    >
                      {value.icon}
                    </span>
                    <span
                      className={cn(
                        "text-section transition-colors duration-300 motion-reduce:transition-none",
                        isActive ? "text-accent" : "text-ink"
                      )}
                    >
                      {value.name}
                    </span>
                  </div>

                  {/* The rule beneath a value fills in accent while it is the one selected. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-px left-0 h-px w-full origin-left bg-accent transition-transform duration-500 ease-out motion-reduce:transition-none",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </li>
              );
            })}
          </ul>
        </AnimatedContainer>

        <AnimatedContainer delay={0.2} className="lg:col-start-1 lg:row-start-1">
          <div
            aria-hidden="true"
            className="grid auto-rows-[9rem] grid-cols-3 gap-2.5 sm:auto-rows-[12rem] sm:gap-3 lg:auto-rows-[15rem]"
          >
            {values.map((value, index) => {
              const isActive = active === index;

              return (
                <div
                  key={value.name}
                  onPointerEnter={enter(index)}
                  onPointerLeave={leave}
                  className={cn(
                    "relative overflow-hidden rounded-2xl bg-navy-deep transition-shadow duration-500 motion-reduce:transition-none",
                    isActive && "shadow-xl shadow-navy/25",
                    placements[index]
                  )}
                >
                  <Image
                    src={value.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 200px, 33vw"
                    className={cn(
                      "object-cover transition duration-700 ease-out motion-reduce:transition-none",
                      value.position,
                      isActive ? "scale-105" : "[@media(hover:hover)]:grayscale"
                    )}
                  />
                  {/* The resting duotone: a navy wash over the grayscale, gone once the photograph is selected. */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-navy/20 mix-blend-multiply transition-opacity duration-500 motion-reduce:transition-none [@media(hover:none)]:opacity-0",
                      isActive ? "opacity-0" : "opacity-100"
                    )}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/60 to-transparent" />

                  <span
                    className={cn(
                      "absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur transition duration-300 motion-reduce:transition-none sm:bottom-3 sm:left-3",
                      isActive ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                    )}
                  >
                    <span className="text-accent [&>svg]:size-3.5">{value.icon}</span>
                    {value.name}
                  </span>
                </div>
              );
            })}
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}

export default ValuesShowcase;
