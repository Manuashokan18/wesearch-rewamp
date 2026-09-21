"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type OrbitItem = {
  id: string;
  title: string;
  subtitle: string;
  /** Photograph for the orbit bubble and the card avatar. Decorative. */
  image: string;
  /** Small badge on the orbit bubble. Pass a rendered element. */
  icon?: React.ReactNode;
  /** Extra content at the foot of the centre card. Pass a rendered element. */
  detail?: React.ReactNode;
};

type OrbitCarouselProps = {
  items: OrbitItem[];
  /** The centre card's call to action. */
  cta?: { label: string; href: string };
  /** Accessible name for the carousel region. */
  label: string;
  /** Milliseconds between automatic steps. */
  interval?: number;
  className?: string;
};

const spring = { type: "spring", stiffness: 150, damping: 20 } as const;

/**
 * Items orbit a centre card that shows whichever one sits at the top. It steps
 * on its own, and the arrows, dots or a click on any bubble move it by hand.
 *
 * Adapted from the 21st.dev "Orbiting Carousel with Animated Icons" by
 * olovajs. Changes from the source:
 *
 * - Sizing is CSS, not a resize listener: each bubble rides a full-size arm
 *   that rotates about the centre, so the radius follows the container's
 *   breakpoint classes and the server render already matches the client.
 * - Position is a running step count rather than a wrapped index, so going
 *   from the last item to the first turns one notch instead of spinning the
 *   whole ring back around.
 * - Arrow keys are scoped to the carousel instead of the whole window.
 * - Auto-rotation waits while the pointer or focus is inside, while the
 *   carousel is off screen, and entirely under reduced motion.
 */
export function OrbitCarousel({
  items,
  cta,
  label,
  interval = 5000,
  className,
}: OrbitCarouselProps) {
  const count = items.length;
  const step = 360 / count;

  // A running count, never wrapped — see the note above.
  const [position, setPosition] = React.useState(0);
  const active = ((position % count) + count) % count;

  const [hovering, setHovering] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const autoplay = inView && !hovering && !focused && !reduceMotion;

  const next = React.useCallback(() => setPosition((p) => p + 1), []);
  const prev = React.useCallback(() => setPosition((p) => p - 1), []);

  /** Moves to `index` by the shortest way round the ring. */
  const goTo = (index: number) => {
    let delta = (index - active) % count;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    setPosition((p) => p + delta);
  };

  React.useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(next, interval);
    return () => window.clearInterval(id);
  }, [autoplay, interval, next]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") prev();
    if (event.key === "ArrowRight") next();
  };

  const current = items[active];

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={rootRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
        }}
        className={cn("flex flex-col items-center", className)}
      >
        <div className="relative size-[340px] sm:size-[440px] lg:size-[500px]">
          {/* The track the bubbles ride, inset to run through their centres. */}
          <div
            className="pointer-events-none absolute inset-6 rounded-full border border-dashed border-accent/25 sm:inset-8 lg:inset-[38px]"
            aria-hidden="true"
          />

          {/* Centre card. Announced only when a person moved it, not on autoplay. */}
          <div
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            aria-live={autoplay ? "off" : "polite"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="pointer-events-auto w-[188px] rounded-2xl border border-line bg-surface p-3 text-center shadow-xl shadow-navy/10 sm:w-56 sm:p-4 lg:w-60"
              >
                <div className="relative mx-auto hidden size-14 overflow-hidden rounded-full border-4 border-surface shadow-md sm:-mt-11 sm:block lg:-mt-12 lg:size-16">
                  <Image src={current.image} alt="" fill sizes="64px" className="object-cover" />
                </div>

                <h3 className="text-sm font-semibold leading-snug text-ink sm:mt-2 sm:text-base lg:text-lg">
                  {current.title}
                </h3>
                <p className="mt-1 flex items-start justify-center gap-1 text-xs text-subtle sm:text-sm">
                  <Briefcase className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
                  {current.subtitle}
                </p>

                {current.detail && <div className="mt-2.5 sm:mt-3">{current.detail}</div>}

                <div className="mt-3 flex items-center justify-center gap-1 sm:gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous"
                    className="shrink-0 rounded-full bg-muted p-1 text-ink transition-colors hover:bg-tint sm:p-1.5"
                  >
                    <ChevronLeft className="size-3.5 sm:size-4" aria-hidden="true" />
                  </button>
                  {cta && (
                    <Link
                      href={cta.href}
                      className="whitespace-nowrap rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/90 sm:px-3.5 lg:text-sm"
                    >
                      {cta.label}
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next"
                    className="shrink-0 rounded-full bg-muted p-1 text-ink transition-colors hover:bg-tint sm:p-1.5"
                  >
                    <ChevronRight className="size-3.5 sm:size-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/*
           * Each bubble sits at the top of an arm the size of the whole
           * carousel. Rotating the arm about its centre carries the bubble
           * round the ring; the bubble turns back by the same angle so its
           * photograph stays upright.
           */}
          {items.map((item, i) => {
            const rotation = (i - position) * step;
            const isActive = i === active;

            return (
              <motion.div
                key={item.id}
                className="pointer-events-none absolute inset-0"
                initial={false}
                animate={{ rotate: rotation }}
                transition={{ ...spring, delay: isActive ? 0 : Math.abs(i - active) * 0.05 }}
                style={{ zIndex: isActive ? 20 : 5 }}
              >
                <motion.div
                  className="pointer-events-auto absolute left-1/2 top-0 size-12 -translate-x-1/2 sm:size-16 lg:size-[76px]"
                  initial={false}
                  animate={{ rotate: -rotation }}
                  transition={spring}
                >
                  <motion.button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show ${item.title}`}
                    aria-current={isActive ? "true" : undefined}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative block size-full rounded-full bg-tint shadow-md transition-[box-shadow] duration-300",
                      isActive
                        ? "ring-4 ring-accent ring-offset-2 ring-offset-surface"
                        : "ring-2 ring-line hover:ring-accent/60",
                    )}
                  >
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <Image src={item.image} alt="" fill sizes="76px" className="object-cover" />
                    </span>
                    {item.icon && (
                      <span
                        className={cn(
                          "absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full border-2 border-surface shadow-sm transition-colors sm:size-7",
                          isActive ? "bg-accent text-white" : "bg-surface text-accent",
                        )}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                    )}
                  </motion.button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress indicator. */}
        <div className="mt-6 flex justify-center gap-2">
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${item.title}`}
              aria-current={index === active ? "true" : undefined}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "size-2 rounded-full transition-colors",
                index === active ? "bg-accent" : "bg-line hover:bg-accent/50",
              )}
            />
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}

export default OrbitCarousel;
