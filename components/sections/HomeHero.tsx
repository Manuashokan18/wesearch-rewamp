import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { LogoMarquee } from "@/components/sections/LogoMarquee";

type HomeHeroFeature = { icon: LucideIcon; label: string };

/** The announcement pill above the headline. Links somewhere that backs it up. */
type HomeHeroBadge = { label: string; href: string; icon: LucideIcon };
type HomeHeroCta = { label: string; href: string; icon?: LucideIcon };
type HomeHeroLogo = { src: string; alt: string; width: number; height: number };

type HomeHeroProps = {
  badge: HomeHeroBadge;
  /** Small label above the headline. */
  eyebrow?: string;
  title: string;
  /** Trailing words of the title to set in the accent colour. */
  highlight?: string;
  subtitle: string;
  /** Companies hiring. Rendered as the solid button. */
  primaryCta: HomeHeroCta;
  /** The other doors — services to explore, roles to apply for. Rendered as soft buttons. */
  secondaryCtas: HomeHeroCta[];
  features: HomeHeroFeature[];
  logos: HomeHeroLogo[];
  /** The photographs that take turns behind the headline. */
  backdrop: string[];
};

/**
 * The homepage hero.
 *
 * Distinct from the shared `Hero`, which stays a page-title banner for the
 * interior pages. A statement, its supporting paragraph, then the doors a
 * staffing business needs — hiring on one side, exploring and applying on the
 * other — with a band of client logos closing the section.
 *
 * `HeroBackdrop` supplies the moving photographic background. It is CSS only,
 * so the whole hero is server-rendered.
 */
export function HomeHero({
  badge,
  eyebrow,
  title,
  highlight,
  subtitle,
  primaryCta,
  secondaryCtas,
  features,
  logos,
  backdrop,
}: HomeHeroProps) {
  const split = highlight && title.endsWith(highlight) ? title.length - highlight.length : -1;

  const copy = (
    <div className="mx-auto w-full max-w-5xl px-6 py-20 text-center sm:py-24">
      <Link
        href={badge.href}
        className="hero-rise inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 py-1.5 pl-4 pr-1.5 text-sm text-white/80 backdrop-blur transition-colors hover:bg-white/15 hover:text-white"
      >
        <span className="flex items-center gap-2">
          <badge.icon className="h-4 w-4 text-accent-soft" aria-hidden="true" />
          {badge.label}
        </span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </Link>

      {eyebrow && (
        <p className="hero-rise mt-8 flex items-center justify-center gap-3 text-eyebrow text-accent-soft">
          <span className="h-px w-8 bg-accent-soft" aria-hidden="true" />
          {eyebrow}
          <span className="h-px w-8 bg-accent-soft" aria-hidden="true" />
        </p>
      )}

      <h1
        className={`hero-rise mx-auto max-w-[22ch] text-hero text-balance ${eyebrow ? "mt-4" : "mt-8"}`}
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
        className="hero-rise mx-auto mt-7 max-w-[62ch] text-lg leading-relaxed text-white/70"
        style={{ animationDelay: "90ms" }}
      >
        {subtitle}
      </p>

      <div
        className="hero-rise mt-10 flex flex-wrap items-center justify-center gap-3"
        style={{ animationDelay: "200ms" }}
      >
        <Button href={primaryCta.href} variant="solidLight">
          {primaryCta.icon && (
            <primaryCta.icon className="h-4 w-4" aria-hidden="true" />
          )}
          {primaryCta.label}
        </Button>

        {secondaryCtas.map((cta) => (
          <Button key={cta.href} href={cta.href} variant="softInverse">
            {cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ))}
      </div>

      <ul
        className="hero-rise mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3"
        style={{ animationDelay: "290ms" }}
      >
        {features.map((feature) => (
          <li
            key={feature.label}
            className="flex items-center gap-2 text-sm text-white/55"
          >
            <feature.icon
              className="h-4 w-4 shrink-0 text-accent-soft"
              aria-hidden="true"
            />
            {feature.label}
          </li>
        ))}
      </ul>
    </div>
  );

  // Pulled up under the sticky header so the imagery runs behind it.
  return (
    <section className="-mt-20 text-white">
      <div className="relative isolate flex min-h-[calc(78vh+5rem)] items-center overflow-hidden pt-20">
        <HeroBackdrop slides={backdrop} />
        {copy}
      </div>

      {/*
       * The logo band sits below a rule on a flat ground, clear of the moving
       * photographs, so the marquee reads as its own strip rather than more motion.
       */}
      <div className="border-t border-white/10 bg-navy">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <LogoMarquee logos={logos} />
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
