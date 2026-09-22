"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion } from "motion/react";
import { cn } from "@/lib/utils";

type AnimatedContainerProps = {
  /** Seconds to wait once in view, for staggering siblings. */
  delay?: number;
  className?: string;
  children: ReactNode;
  /** Which edge it enters from. Defaults to a short rise from below. */
  direction?: "bottom" | "left" | "right";
  /** How far it travels into place, in pixels. Kept small — this is a hint, not a slide show. */
  distance?: number;
};

const offset = (direction: "bottom" | "left" | "right", distance: number) =>
  direction === "left"
    ? { x: -distance, y: 0 }
    : direction === "right"
      ? { x: distance, y: 0 }
      : { x: 0, y: distance };

/**
 * Fades and eases into place the first time it scrolls into view — from
 * below by default, or from a side — then stays; it never replays on a
 * second pass. Triggers as soon as any part of it is visible rather than
 * waiting for the whole section to clear the fold, so the reveal is already
 * under way well before it's fully in view. (A positive `margin` can push
 * that trigger even earlier, but on this site content often sits close
 * enough to the fold that doing so fires before any scrolling happens at
 * all — indistinguishable from the "loads immediately" bug this exists to
 * avoid — so it's deliberately left at the default.)
 *
 * `data-reveal` is a hook for the `<noscript>` rule in the root layout: with
 * scripting unavailable, `whileInView` never fires, so without that rule
 * this content — server-rendered at its `initial` (invisible) state for a
 * clean first paint — would stay hidden forever instead of just skipping the
 * animation.
 *
 * From efferd's "Footer Section" on 21st.dev. The source returned bare
 * children under reduced motion, which renders a different tree on the server
 * than on the client; this always renders the same element and lets
 * `MotionConfig` drop the movement, leaving only the fade.
 */
export function AnimatedContainer({
  delay = 0.1,
  className,
  children,
  direction = "bottom",
  distance = 24,
}: AnimatedContainerProps) {
  const { x, y } = offset(direction, distance);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        data-reveal
        initial={{ x, y, opacity: 0 }}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

export default AnimatedContainer;
