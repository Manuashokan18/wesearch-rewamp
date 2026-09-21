"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion } from "motion/react";

type AnimatedContainerProps = {
  /** Seconds to wait once in view, for staggering siblings. */
  delay?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Sharpens into place the first time it scrolls into view: a short drop from
 * a soft blur to full opacity.
 *
 * From efferd's "Footer Section" on 21st.dev. The source returned bare
 * children under reduced motion, which renders a different tree on the server
 * than on the client; this always renders the same element and lets
 * `MotionConfig` drop the movement, leaving only the fade.
 */
export function AnimatedContainer({ delay = 0.1, className, children }: AnimatedContainerProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ filter: "blur(4px)", y: -8, opacity: 0 }}
        whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8 }}
        className={className}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

export default AnimatedContainer;
