"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type DotGridBackgroundProps = {
  /** Distance between dots, in CSS pixels. */
  gap?: number;
  /** How far from the cursor dots begin to react, in CSS pixels. */
  radius?: number;
  /** How far a dot directly under the cursor is shoved, in CSS pixels. */
  repulsion?: number;
  className?: string;
};

// The spring the reference component exposes as "Spring K" and "Damping".
const SPRING = 0.07;
const DAMPING = 0.8;

const TAU = Math.PI * 2;
const DOT_COLOR = "#dbe7ff";
const REST_ALPHA = 0.3;
const REST_RADIUS = 1.3;
/** Below this speed (px per frame) a dot counts as settled. */
const SETTLED = 0.02;

type Dot = { x: number; y: number; ox: number; oy: number; vx: number; vy: number };

/**
 * A canvas of dots that back away from the cursor and spring home again.
 *
 * After nexus-ui's "Interactive Dot Grid Hero" on 21st.dev. Its source could not
 * be retrieved (free-tier quota spent), so this is rebuilt from the live
 * preview: the same spring and damping constants and 120px interaction radius,
 * with the multicolour dashes swapped for quiet monochrome dots so it sits on
 * the brand blue. Fill the nearest positioned ancestor; it listens for the
 * pointer on that ancestor so content layered above never blocks the effect.
 *
 * The animation loop only runs while dots are moving. Touch, coarse pointers
 * and reduced motion get the still grid.
 */
export function DotGridBackground({
  gap = 32,
  radius = 120,
  repulsion = 36,
  className,
}: DotGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reacts =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    const pointer = { active: false, clientX: 0, clientY: 0 };
    const lit: { x: number; y: number; k: number }[] = [];

    const draw = (px = -1e4, py = -1e4) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = DOT_COLOR;

      // Resting dots share one path and one fill; only the dots the cursor
      // has disturbed are drawn individually.
      lit.length = 0;
      ctx.globalAlpha = REST_ALPHA;
      ctx.beginPath();
      for (const d of dots) {
        const x = d.x + d.ox;
        const y = d.y + d.oy;
        const displaced = Math.hypot(d.ox, d.oy) / repulsion;
        const near = pointer.active ? 1 - Math.hypot(x - px, y - py) / (radius * 1.25) : 0;
        const k = Math.min(1, Math.max(displaced, near, 0));
        if (k < 0.02) {
          ctx.moveTo(x + REST_RADIUS, y);
          ctx.arc(x, y, REST_RADIUS, 0, TAU);
        } else {
          lit.push({ x, y, k });
        }
      }
      ctx.fill();

      for (const { x, y, k } of lit) {
        ctx.globalAlpha = REST_ALPHA + (1 - REST_ALPHA) * k * 0.9;
        ctx.beginPath();
        ctx.arc(x, y, REST_RADIUS + k * 1.8, 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      frame = 0;
      const rect = canvas.getBoundingClientRect();
      const px = pointer.clientX - rect.left;
      const py = pointer.clientY - rect.top;
      let moving = false;

      for (const d of dots) {
        let fx = 0;
        let fy = 0;
        if (pointer.active) {
          const dx = d.x - px;
          const dy = d.y - py;
          const dist = Math.hypot(dx, dy);
          if (dist < radius && dist > 0.5) {
            // Pushes a dot to rest `repulsion * falloff` px from where it started.
            const push = repulsion * SPRING * (1 - dist / radius);
            fx = (dx / dist) * push;
            fy = (dy / dist) * push;
          }
        }
        d.vx = (d.vx + fx - d.ox * SPRING) * DAMPING;
        d.vy = (d.vy + fy - d.oy * SPRING) * DAMPING;
        d.ox += d.vx;
        d.oy += d.vy;
        if (Math.abs(d.vx) > SETTLED || Math.abs(d.vy) > SETTLED) moving = true;
      }

      // With the pointer gone and nothing left moving, land every dot exactly
      // home rather than leaving it a fraction of a pixel short.
      if (!moving && !pointer.active) {
        for (const d of dots) {
          d.ox = 0;
          d.oy = 0;
          d.vx = 0;
          d.vy = 0;
        }
      }

      draw(px, py);
      if (moving) frame = requestAnimationFrame(step);
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.floor(width / gap) + 1;
      const rows = Math.floor(height / gap) + 1;
      const offsetX = (width - (cols - 1) * gap) / 2;
      const offsetY = (height - (rows - 1) * gap) / 2;
      dots = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({ x: offsetX + col * gap, y: offsetY + row * gap, ox: 0, oy: 0, vx: 0, vy: 0 });
        }
      }
      draw();
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.active = true;
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      wake();
    };
    const onLeave = () => {
      pointer.active = false;
      wake();
    };
    // A still pointer is not still relative to a scrolling page.
    const onScroll = () => {
      if (pointer.active) wake();
    };

    build();
    const observer = new ResizeObserver(build);
    observer.observe(canvas);

    if (reacts) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [gap, radius, repulsion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      // Softens the grid into the edges rather than cutting it off.
      style={{
        maskImage: "linear-gradient(to bottom, transparent, #000 10%, #000 88%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 10%, #000 88%, transparent)",
      }}
    />
  );
}

export default DotGridBackground;
