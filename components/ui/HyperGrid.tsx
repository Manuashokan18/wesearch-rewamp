"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
  type Variants,
  type MotionValue,
} from "motion/react";

/**
 * HyperGrid — an infinite 3D grid that drifts forward, tilts with the cursor
 * and lights up beneath it.
 *
 * Adapted from the 21st.dev component by @daiwiikharihar. Recoloured onto the
 * WeSearch palette (navy ground, accent highlights), stripped of its demo
 * content in favour of a `children` slot, and given reduced-motion handling.
 * It renders only the backdrop — whatever is passed as children sits above it
 * and stays server-rendered.
 */

const PHYSICS = {
  slow: { damping: 40, stiffness: 150, mass: 1.2 },
  cursor: { damping: 25, stiffness: 250, mass: 0.5 },
  warp: { damping: 15, stiffness: 300, mass: 0.2 },
};

/** Inline so the grain costs no network request. */
const NOISE_TEXTURE = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E`;

type HyperGridProps = {
  gridSize?: number;
  scrollSpeed?: number;
  maskRadius?: number;
  className?: string;
  children?: React.ReactNode;
};

export function HyperGrid({
  gridSize = 100,
  scrollSpeed = 0.4,
  maskRadius = 420,
  className = "",
  children,
}: HyperGridProps) {
  const [isWarping, setIsWarping] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const gridX = useMotionValue(0);
  const gridY = useMotionValue(0);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);

  const prevMouseX = useRef(0);
  const prevMouseY = useRef(0);

  const warpSignal = useSpring(0, PHYSICS.warp);

  const lagX = useSpring(mouseX, PHYSICS.cursor);
  const lagY = useSpring(mouseY, PHYSICS.cursor);

  const sprungVelX = useSpring(velocityX, PHYSICS.slow);
  const sprungVelY = useSpring(velocityY, PHYSICS.slow);

  const rotateXBase = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateYBase = useTransform(mouseX, [0, 1], [-8, 8]);

  const finalRotateX = useTransform(
    [rotateXBase, warpSignal],
    ([r, w]) => (r as number) * (1 + (w as number) * 2)
  );
  const finalRotateY = useTransform(
    [rotateYBase, warpSignal],
    ([r, w]) => (r as number) * (1 + (w as number) * 2)
  );

  const sprungRotateX = useSpring(finalRotateX, PHYSICS.slow);
  const sprungRotateY = useSpring(finalRotateY, PHYSICS.slow);

  const animatedGridSize = useTransform(
    warpSignal,
    [0, 1],
    [gridSize, gridSize * 0.8]
  );

  const contentScale = useTransform(warpSignal, [0, 1], [1, 0.94]);

  // Hoisted out of JSX so every hook runs in a stable order.
  const orbHue = useTransform(warpSignal, [0, 1], [0, 30]);
  const orbSaturate = useTransform(warpSignal, [0, 1], [1, 1.4]);
  const orbFilter = useMotionTemplate`hue-rotate(${orbHue}deg) saturate(${orbSaturate})`;
  const flashOpacity = useTransform(warpSignal, [0, 0.1, 1], [0, 0.18, 0]);
  const dodgeOpacity = useTransform(warpSignal, [0, 0.2, 0.8], [0, 0.2, 0]);
  // The accent plane sits under the cursor at rest and saturates on warp.
  const accentLayerOpacity = useTransform(warpSignal, [0, 1], [0.55, 1]);

  const maskIntensity = useTransform(warpSignal, [0, 1], [0, 200]);
  const currentMaskRadius = useTransform(
    warpSignal,
    [0, 1],
    [maskRadius, maskRadius * 1.5]
  );
  const lagXPercent = useTransform(lagX, (v) => v * 100);
  const lagYPercent = useTransform(lagY, (v) => v * 100);
  const maskImage = useMotionTemplate`radial-gradient(${currentMaskRadius}px circle at ${lagXPercent}% ${lagYPercent}%, rgb(${maskIntensity},${maskIntensity},${maskIntensity}), transparent)`;

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;

    const safeDelta = Math.min(delta, 100);

    const normalizedVX = Math.max(-2, Math.min(2, sprungVelX.get() / 100));
    const normalizedVY = Math.max(-2, Math.min(2, sprungVelY.get() / 100));

    const speedMultiplier = 1 + warpSignal.get() * 24;
    const baseForwardDrift = -0.3 * speedMultiplier;
    const cellSize = animatedGridSize.get();

    const moveX =
      normalizedVX * scrollSpeed * speedMultiplier * (safeDelta / 16);
    const moveY =
      (normalizedVY + baseForwardDrift) *
      scrollSpeed *
      speedMultiplier *
      (safeDelta / 16);

    gridX.set((gridX.get() + moveX) % cellSize);
    gridY.set((gridY.get() + moveY) % cellSize);
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;

    const { clientX, clientY } = event;
    velocityX.set(clientX - prevMouseX.current);
    velocityY.set(clientY - prevMouseY.current);
    mouseX.set((clientX - rect.left) / rect.width);
    mouseY.set((clientY - rect.top) / rect.height);
    prevMouseX.current = clientX;
    prevMouseY.current = clientY;
  };

  /** Clicking the backdrop kicks the grid forward. Content clicks are exempt. */
  const handleWarp = () => {
    if (isWarping || prefersReducedMotion) return;
    setIsWarping(true);
    warpSignal.set(1);
    window.setTimeout(() => {
      warpSignal.set(0);
      setIsWarping(false);
    }, 2000);
  };

  const gridIntroVariants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 1 }
      : { scale: 0.01, opacity: 0, rotateZ: 45 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateZ: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={handleWarp}
      initial="hidden"
      animate="visible"
      className={`perspective-distant relative isolate w-full overflow-hidden bg-navy-deep ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("${NOISE_TEXTURE}")`,
          backgroundRepeat: "repeat",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ filter: orbFilter }}
        aria-hidden="true"
      >
        <div className="absolute left-[-10%] top-[-20%] h-[70%] w-[70%] rounded-full bg-accent/20 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[70%] w-[70%] rounded-full bg-accent/10 blur-[150px]" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-10 will-change-transform"
        variants={gridIntroVariants}
        style={{
          rotateX: sprungRotateX,
          rotateY: sprungRotateY,
          transformOrigin: "center bottom",
        }}
        aria-hidden="true"
      >
        <GridLayer
          gridSize={animatedGridSize}
          x={gridX}
          y={gridY}
          strokeColor="rgba(255,255,255,0.04)"
        />

        <motion.div
          className="absolute inset-0"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          <GridLayer
            gridSize={animatedGridSize}
            x={gridX}
            y={gridY}
            strokeColor="rgba(255,255,255,0.42)"
            strokeWidth={1}
          />
          <motion.div style={{ opacity: accentLayerOpacity }}>
            <GridLayer
              gridSize={animatedGridSize}
              x={gridX}
              y={gridY}
              strokeColor="rgba(90,150,255,0.95)"
              strokeWidth={2}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-30 bg-white mix-blend-overlay"
        style={{ opacity: flashOpacity }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 bg-accent mix-blend-color-dodge"
        style={{ opacity: dodgeOpacity }}
        aria-hidden="true"
      />

      {children && (
        <motion.div
          className="relative z-40 w-full"
          style={{ scale: contentScale }}
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

type GridLayerProps = {
  gridSize: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  strokeColor: string;
  strokeWidth?: number;
};

const MotionPattern = motion.pattern;
const MotionPath = motion.path;

/** One tiled SVG grid plane. Motion values drive the pattern attributes. */
const GridLayer = React.memo(function GridLayer({
  gridSize,
  x,
  y,
  strokeColor,
  strokeWidth = 1,
}: GridLayerProps) {
  const patternId = React.useId();
  const pathD = useTransform(gridSize, (size) => `M ${size} 0 L 0 0 0 ${size}`);

  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full select-none">
      <svg className="h-full w-full bg-transparent">
        <defs>
          <MotionPattern
            id={patternId}
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <MotionPath
              d={pathD}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              shapeRendering="geometricPrecision"
            />
          </MotionPattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
});

export default HyperGrid;
