import type { CSSProperties } from "react";
import Image from "next/image";

/** Where each slide's slow zoom grows from, so the photographs don't all drift the same way. */
const ZOOM_ORIGINS = ["50% 40%", "30% 60%", "70% 50%", "45% 70%", "60% 30%"];

/**
 * A moving photographic backdrop for the home hero: the photographs take turns
 * (the `hero-slide` animation in globals.css), each drifting through a slow
 * zoom, under a navy scrim that keeps the headline readable.
 *
 * Pure CSS — no client script, so the hero stays server-rendered. The first
 * photograph is preloaded as the page's largest paint; the rest load at low
 * priority. The keyframes are timed for exactly five slides. Place it as the
 * first child of a `relative isolate overflow-hidden` section: it fills the
 * section and sits behind everything else in it.
 */
export function HeroBackdrop({ slides }: { slides: string[] }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-navy-deep">
      {slides.map((src, index) => (
        <div
          key={src}
          className="hero-slide absolute inset-0"
          style={
            {
              "--slide": index,
              transformOrigin: ZOOM_ORIGINS[index % ZOOM_ORIGINS.length],
            } as CSSProperties
          }
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            preload={index === 0}
            fetchPriority={index === 0 ? "high" : "low"}
            className="object-cover"
          />
        </div>
      ))}

      {/* Navy scrim: even across the frame, heavier at the edges and foot. */}
      <div className="absolute inset-0 bg-navy-deep/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,color-mix(in_oklch,var(--color-navy-deep)_75%,transparent)_100%)]" />
      {/* Deepened under the transparent header so the nav reads over a bright frame, and into the logo band below. */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-navy-deep/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/80 to-transparent" />
    </div>
  );
}

export default HeroBackdrop;
