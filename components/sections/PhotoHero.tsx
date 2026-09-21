import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowDown, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Annotation } from "@/components/ui/Annotation";
import { LogoMarquee } from "@/components/sections/LogoMarquee";

type PhotoHeroCta = { label: string; href: string };
type PhotoHeroItem = { icon: LucideIcon; label: string };
type PhotoHeroLogo = { src: string; alt: string; width: number; height: number };

type PhotoHeroProps = {
  eyebrow: string;
  title: string;
  /** Trailing words of the title to set in the accent colour. */
  highlight?: string;
  subtitle: string;
  primaryCta: PhotoHeroCta;
  /** An in-page `#anchor` gets a down arrow, since it scrolls rather than navigates. */
  secondaryCta: PhotoHeroCta;
  /** Short benefit labels under the buttons. */
  features: PhotoHeroItem[];
  /** Outcome labels in the glass bar at the foot of the copy. */
  badgeItems: PhotoHeroItem[];
  annotation?: string;
  image: { src: string; alt: string };
  /** Client logos in a band beneath the photograph, as on the home hero. */
  logos?: PhotoHeroLogo[];
};

/** Each block rises in turn, 0.3s in and 0.2s apart, as in the source. */
const rise = (step: number): CSSProperties => ({ animationDelay: `${300 + step * 200}ms` });

/**
 * A full-bleed photograph behind a centred headline, supporting line and two
 * calls to action.
 *
 * After ravikatiyar162's "Hero Section 4" on 21st.dev: the photograph fills
 * the section, the copy sits centred over it in a large bold headline, and
 * each block fades up in sequence. The source's 20% black wash is deepened to
 * a navy scrim here so the white copy keeps its contrast over a light office
 * photograph. The staggered entrance reuses the site's CSS `hero-rise`
 * (reduced motion shows the finished state) instead of a client-side motion
 * library, so the whole hero stays server-rendered.
 *
 * Like the home hero, it is pulled up under the sticky header so the
 * photograph runs behind the bar; the header starts transparent on these pages
 * (`overlayHeroPaths` in lib/nav). With logos, the band is sized to land on
 * the fold.
 */
export function PhotoHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  primaryCta,
  secondaryCta,
  features,
  badgeItems,
  annotation,
  image,
  logos,
}: PhotoHeroProps) {
  const split = highlight && title.endsWith(highlight) ? title.length - highlight.length : -1;
  const hasLogos = logos !== undefined && logos.length > 0;

  return (
    <section className="-mt-20 text-white">
      <div
        className={`relative isolate flex items-center justify-center overflow-hidden pt-20 ${
          hasLogos ? "min-h-[calc(100svh-6.5rem)]" : "min-h-svh"
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover object-[65%_30%]"
        />
        {/* Navy scrim: even across the frame, heavier at the edges and foot. */}
        <div className="absolute inset-0 -z-10 bg-navy-deep/65" aria-hidden="true" />
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,color-mix(in_oklch,var(--color-navy-deep)_70%,transparent)_100%)]"
          aria-hidden="true"
        />
        {/* Deepened under the transparent header so the nav reads over the bright wall. */}
        <div
          className="absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-navy-deep/75 to-transparent"
          aria-hidden="true"
        />

        <div className="mx-auto w-full max-w-5xl px-6 py-16 text-center tall:py-24">
          <p
            className="hero-rise flex items-center justify-center gap-3 text-eyebrow text-accent-soft"
            style={rise(0)}
          >
            <span className="h-px w-8 bg-accent-soft" aria-hidden="true" />
            {eyebrow}
            <span className="h-px w-8 bg-accent-soft" aria-hidden="true" />
          </p>

          <h1
            className="hero-rise mx-auto mt-5 max-w-[20ch] text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:tall:text-7xl"
            style={rise(1)}
          >
            {split > -1 ? (
              <>
                {title.slice(0, split)}
                <span className="text-accent-soft">{highlight}</span>
              </>
            ) : (
              title
            )}
          </h1>

          <p
            className="hero-rise mx-auto mt-6 max-w-[60ch] text-lg leading-relaxed text-white/85 sm:text-xl"
            style={rise(2)}
          >
            {subtitle}
          </p>

          <div
            className="hero-rise mt-10 flex flex-wrap items-center justify-center gap-4"
            style={rise(3)}
          >
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            <Button href={secondaryCta.href} variant="solidLight">
              {secondaryCta.label}
              {secondaryCta.href.startsWith("#") && (
                <ArrowDown className="size-4" aria-hidden="true" />
              )}
            </Button>
          </div>

          <ul
            className="hero-rise mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3"
            style={rise(4)}
          >
            {features.map((feature) => (
              <li key={feature.label} className="flex items-center gap-2 text-sm text-white/75">
                <feature.icon className="size-4 shrink-0 text-accent-soft" aria-hidden="true" />
                {feature.label}
              </li>
            ))}
          </ul>

          <ul
            className="hero-rise mx-auto mt-10 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-3xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-md sm:rounded-full"
            style={rise(5)}
          >
            {badgeItems.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5 text-sm font-medium">
                <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
                  <item.icon className="size-4 text-accent-soft" aria-hidden="true" />
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {annotation && (
          <Annotation
            text={annotation}
            tone="inverse"
            className="absolute bottom-10 right-10 hidden -rotate-6 lg:block"
          />
        )}
      </div>

      {hasLogos && (
        <div className="border-t border-white/10 bg-navy">
          <div className="mx-auto max-w-6xl px-6 py-6">
            <LogoMarquee logos={logos} />
          </div>
        </div>
      )}
    </section>
  );
}

export default PhotoHero;
