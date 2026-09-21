"use client";

import { useEffect, useMemo, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type CountUpProps = {
  /** The figure as written, e.g. "1,500+" or "15+". Any prefix and suffix are kept as they are. */
  value: string;
  /** Seconds the count takes. */
  duration?: number;
  className?: string;
};

/** Splits "1,500+" into its prefix, number and suffix; `null` if there is no number to count. */
function parseFigure(value: string) {
  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], target: Number(match[2].replace(/,/g, "")), suffix: match[3] };
}

const formatter = new Intl.NumberFormat("en-US");

/**
 * A figure that counts up to its value the first time it scrolls into view.
 *
 * After unlumen's "Count Up" on 21st.dev (a number that eases to its target on
 * entering the viewport, with thousands separators). The source could not be
 * retrieved (the free code quota was spent), so this is built to that behaviour
 * with the site's `motion` package: one eased tween rather than a per-digit
 * slide, which keeps the figure legible all the way up.
 *
 * The real value is always in the DOM for assistive tech and for browsers
 * without script; the counting digits are a visual layer over it. They are
 * written straight to their node rather than through state, so a count is one
 * effect and no re-renders, and the server-rendered figure is the finished one.
 * Under reduced motion nothing counts.
 */
export function CountUp({ value, duration = 1.8, className }: CountUpProps) {
  const figure = useMemo(() => parseFigure(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const digits = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = digits.current;
    if (!node || !figure) return;
    const show = (n: number) => {
      node.textContent = `${figure.prefix}${formatter.format(n)}${figure.suffix}`;
    };

    if (reduceMotion) {
      show(figure.target);
      return;
    }
    // Wait at zero until the figure is on screen, so the count starts where it can be seen.
    if (!inView) {
      show(0);
      return;
    }

    const controls = animate(0, figure.target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => show(Math.round(latest)),
    });
    return () => controls.stop();
  }, [figure, inView, reduceMotion, duration]);

  if (!figure) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      <span className="sr-only">{value}</span>
      <span ref={digits} aria-hidden="true">
        {value}
      </span>
    </span>
  );
}

export default CountUp;
