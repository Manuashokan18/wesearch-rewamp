"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props for the InteractiveTravelCard component.
 */
export interface InteractiveTravelCardProps {
  /** The main title for the card, e.g., "Sapa Valley" */
  title: string;
  /** A subtitle or supporting line under the title. */
  subtitle: string;
  /** The URL for the background image. Remote hosts must be allowed in next.config.ts. */
  imageUrl: string;
  /** Describes the photograph. Defaults to decorative, since the title carries the meaning. */
  imageAlt?: string;
  /**
   * Top-right link. Internal paths stay in the tab; absolute URLs open a new one.
   * Without it, the corner shows `icon` instead.
   */
  href?: string;
  /** Shown in the top-right badge when there is no `href`. Pass a rendered element. */
  icon?: React.ReactNode;
  /** Footer button text. The button renders only alongside `actionHref` or `onActionClick`. */
  actionText?: string;
  /** Makes the footer button a link. */
  actionHref?: string;
  /** Callback for the footer button. Client components only — a function cannot cross from the server. */
  onActionClick?: () => void;
  /** Optional additional class names for custom styling. */
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

const MotionLink = motion.create(Link);

const badgeClass =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm";

const actionClass =
  "w-full rounded-full bg-white/10 py-3 text-center text-sm font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur-md transition-colors hover:bg-white/20";

/**
 * A photo card that tilts towards the cursor, its copy floating in layers
 * above the image.
 *
 * Adapted from the 21st.dev component. Ported to `motion/react` (the renamed
 * framer-motion already in this project), `next/image` and `next/link`, and
 * recoloured onto the WeSearch palette. The link and the footer action are
 * optional so a Server Component can use it with plain data, and the tilt
 * stays still under reduced motion.
 *
 * The parent must set a perspective (e.g. `perspective-[1000px]`) for the tilt
 * to read as depth.
 */
export function InteractiveTravelCard({
  title,
  subtitle,
  imageUrl,
  imageAlt = "",
  href,
  icon,
  actionText,
  actionHref,
  onActionClick,
  className,
  ref,
}: InteractiveTravelCardProps) {
  const reduceMotion = useReducedMotion();

  // --- 3D Tilt Animation Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isExternal = href ? /^https?:\/\//.test(href) : false;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "relative h-[26rem] w-80 rounded-2xl border border-line bg-surface shadow-xl shadow-navy/10",
        className,
      )}
    >
      <div
        style={{ transform: "translateZ(50px)" }}
        className="absolute inset-4 grid grid-rows-[1fr_auto] rounded-xl shadow-lg shadow-navy/20 transform-3d"
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
          className="rounded-xl object-cover"
        />

        {/* Navy scrim, heaviest at the top where the title sits. */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-b from-navy-deep/95 from-20% via-navy-deep/40 via-55% to-navy-deep/55"
          aria-hidden="true"
        />

        <div className="relative flex flex-col justify-between gap-6 p-5 text-white transform-3d">
          <div className="flex items-start justify-between gap-4 transform-3d">
            <div className="transform-3d">
              <motion.h3 style={{ z: 50 }} className="text-subsection text-white">
                {title}
              </motion.h3>
              <motion.p style={{ z: 40 }} className="mt-1.5 text-sm leading-relaxed text-white/80">
                {subtitle}
              </motion.p>
            </div>

            {href ? (
              <MotionLink
                href={href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                whileHover={{ scale: 1.1, rotate: 2.5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Learn more about ${title}`}
                style={{ z: 60 }}
                className={cn(badgeClass, "transition-colors hover:bg-white/30")}
              >
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </MotionLink>
            ) : (
              icon && (
                <motion.span style={{ z: 60 }} className={badgeClass} aria-hidden="true">
                  {icon}
                </motion.span>
              )
            )}
          </div>

          {actionText && actionHref && (
            <MotionLink
              href={actionHref}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ z: 40 }}
              className={actionClass}
            >
              {actionText}
            </MotionLink>
          )}

          {actionText && !actionHref && onActionClick && (
            <motion.button
              type="button"
              onClick={onActionClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ z: 40 }}
              className={actionClass}
            >
              {actionText}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default InteractiveTravelCard;
