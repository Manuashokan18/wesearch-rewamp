import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/components/sections/ProcessSteps";

/**
 * A five-step process drawn as rising pillars: each step is a bar a little
 * taller and a little more saturated than the last, so the whole row reads as
 * progress towards the outcome at the far end. Titles and copy sit above their
 * bars, and because the bars share a baseline the copy climbs the same
 * staircase.
 *
 * After "Process Pillars" in the 21st.dev catalogue — a segmented progress bar
 * with a partial fill per phase — built natively: here the pillar's height and
 * tint carry the progress, and the bars reveal from their foot as they scroll
 * into view (`pillar-bar`, a CSS scroll-driven clip). Below `lg` the pillars
 * lie down: each step gets a horizontal bar whose length is its share of the
 * way through. A Server Component; nothing needs script.
 */
export function ProcessPillars({ steps, className }: { steps: ProcessStep[]; className?: string }) {
  return (
    <ol className={cn("grid gap-x-4 gap-y-9 lg:grid-cols-5 lg:items-end", className)}>
      {steps.map((step, index) => {
        const progress = (index + 1) / steps.length;
        // Tint climbs from a pale wash to the full accent; type flips to white once the bar is strong enough.
        const strength = Math.round(20 + progress * 80);
        const strong = progress > 0.5;

        return (
          <li
            key={step.number}
            className="group flex flex-col"
            style={
              {
                "--bar-w": `${Math.round(progress * 100)}%`,
                "--bar-h": `${(4.5 + index * 2.75).toFixed(2)}rem`,
              } as CSSProperties
            }
          >
            <div className="pb-3 lg:min-h-[10.5rem] lg:pb-5">
              <span className="mb-3 flex size-9 items-center justify-center rounded-xl bg-tint text-accent lg:hidden">
                <step.icon className="size-[18px]" aria-hidden="true" />
              </span>
              <h3 className="text-card text-ink transition-colors duration-300 group-hover:text-accent motion-reduce:transition-none">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-subtle">
                {step.description}
              </p>
            </div>

            <div
              className="pillar-bar relative h-14 w-[var(--bar-w)] overflow-hidden rounded-xl transition-[filter,transform] duration-300 group-hover:brightness-105 motion-reduce:transition-none lg:h-[var(--bar-h)] lg:w-full lg:rounded-2xl lg:group-hover:-translate-y-1 lg:motion-reduce:group-hover:translate-y-0"
              style={{
                background: `color-mix(in oklab, var(--color-accent) ${strength}%, var(--color-tint))`,
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/5 to-transparent"
              />
              <div
                className={cn(
                  "relative flex h-full items-start justify-between p-3.5 lg:p-4",
                  strong ? "text-white" : "text-accent"
                )}
              >
                <span className="text-2xl font-bold leading-none tabular-nums lg:text-3xl">
                  <span className="sr-only">Step </span>
                  {step.number}
                </span>
                <span
                  className={cn(
                    "hidden size-10 items-center justify-center rounded-xl lg:flex",
                    strong ? "bg-white/20 ring-1 ring-inset ring-white/25" : "bg-white/70"
                  )}
                >
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * The steps as a roadmap: a line runs the width of the section with a numbered
 * pin per step, and the step cards sit alternately above and below it on short
 * stems. The line fills as the section scrolls into view (the `board-rail`
 * reveal the home page's delivery board uses).
 *
 * Below `lg` the same list runs down a vertical rail with the cards to one
 * side. A Server Component; the fill is CSS, and browsers without scroll-driven
 * animation show the finished line.
 */
export function ProcessRoadmap({ steps, className }: { steps: ProcessStep[]; className?: string }) {
  return (
    <ol className={cn("relative lg:grid lg:h-[35rem] lg:grid-cols-5 lg:gap-5", className)}>
      {/* Side by side: the line through every pin. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 overflow-hidden bg-accent/20 lg:block"
      >
        <span className="board-rail block h-full w-full bg-accent" />
      </span>
      {/* Stacked: the rail down the left edge, pin to pin. */}
      <span
        aria-hidden="true"
        className="absolute bottom-8 left-5 top-8 w-px -translate-x-1/2 overflow-hidden bg-accent/20 lg:hidden"
      >
        <span className="board-rail-y block h-full w-full bg-accent" />
      </span>

      {steps.map((step, index) => {
        const above = index % 2 === 0;

        return (
          <li key={step.number} className="relative pb-5 pl-14 last:pb-0 lg:p-0">
            <span className="absolute left-0 top-1 z-10 flex size-10 items-center justify-center rounded-full bg-accent text-sm font-semibold tabular-nums text-white shadow-md shadow-accent/30 ring-4 ring-muted lg:left-1/2 lg:top-1/2 lg:size-12 lg:-translate-x-1/2 lg:-translate-y-1/2">
              {step.number}
            </span>

            {/* The stem from a pin to its card, on desktop. */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-1/2 hidden h-6 w-px -translate-x-1/2 bg-accent/35 lg:block",
                above ? "bottom-1/2 mb-6" : "top-1/2 mt-6"
              )}
            />

            <div
              className={cn(
                "group rounded-2xl border border-line bg-surface p-5 shadow-sm shadow-navy/5 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-navy/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                "lg:absolute lg:inset-x-0",
                above ? "lg:bottom-1/2 lg:mb-12" : "lg:top-1/2 lg:mt-12"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white motion-reduce:transition-none">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-card text-ink">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-subtle">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * The same steps as a vertical timeline of cards down a single rail, which
 * fills as it scrolls into view. Meant to sit beside a pinned heading, so it
 * suits the pages where the process is the section's second column rather than
 * a full-width row.
 *
 * After the 21st.dev "Vertical How It Works Timeline": a rail, an icon node
 * per step, and a card for the copy, with the step number set large and faint
 * in the corner as the site's process cards do.
 */
export function ProcessTimeline({ steps, className }: { steps: ProcessStep[]; className?: string }) {
  return (
    <ol className={cn("relative space-y-5", className)}>
      <span
        aria-hidden="true"
        className="absolute bottom-8 left-6 top-8 w-px -translate-x-1/2 overflow-hidden bg-accent/15"
      >
        <span className="board-rail-y block h-full w-full bg-accent" />
      </span>

      {steps.map((step) => (
        <li key={step.number} className="relative pl-16">
          <span className="absolute left-0 top-5 z-10 flex size-12 items-center justify-center rounded-full bg-tint text-accent ring-4 ring-muted">
            <step.icon className="size-5" aria-hidden="true" />
          </span>

          <div className="group rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-navy/5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tabular-nums tracking-wider text-accent">
                  STEP {step.number}
                </p>
                <h3 className="mt-1 text-card text-ink">{step.title}</h3>
              </div>
              <span
                aria-hidden="true"
                className="select-none text-4xl font-bold leading-none text-ink/10 transition-colors duration-300 group-hover:text-accent/25"
              >
                {step.number}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-subtle">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
