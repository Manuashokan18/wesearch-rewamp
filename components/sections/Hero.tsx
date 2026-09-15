import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Annotation } from "@/components/ui/Annotation";

type HeroCta = { label: string; href: string };
type HeroFeature = { icon: LucideIcon; label: string };
type HeroBadge = { icon: LucideIcon; title: string };
type HeroBadgeItem = { icon: LucideIcon; label: string };
type HeroImage = { src: string; alt: string };

type HeroProps = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  features?: HeroFeature[];
  badge?: HeroBadge;
  badgeItems?: HeroBadgeItem[];
  annotation?: string;
  image?: HeroImage;
  showDecoration?: boolean;
};

function renderTitle(title: string, highlight?: string) {
  if (!highlight) return title;
  const index = title.lastIndexOf(highlight);
  if (index === -1) return title;
  return (
    <>
      {title.slice(0, index)}
      <span className="text-accent">{highlight}</span>
      {title.slice(index + highlight.length)}
    </>
  );
}

export function Hero({
  eyebrow,
  title,
  highlight,
  subtitle,
  primaryCta,
  secondaryCta,
  features,
  badge,
  badgeItems,
  annotation,
  image,
  showDecoration = false,
}: HeroProps) {
  return (
    <section className="overflow-hidden bg-navy text-white">
      <div
        className={`mx-auto max-w-6xl px-6 py-16 sm:py-20 ${
          showDecoration ? "grid items-stretch gap-10 lg:grid-cols-[1fr_1.05fr] lg:py-10" : ""
        }`}
      >
        <div className={showDecoration ? "flex flex-col justify-center py-4" : ""}>
          {eyebrow && (
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-accent">
              <span className="h-px w-8 bg-accent" />
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl">
            {renderTitle(title, highlight)}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-lg text-lg text-white/70">{subtitle}</p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-10 flex flex-wrap gap-4">
              {primaryCta && (
                <Button href={primaryCta.href}>{primaryCta.label}</Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="outlineInverse">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
          {features && features.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              {features.map((feature, index) => (
                <div key={feature.label} className="flex items-center gap-4">
                  {index > 0 && <span className="hidden h-4 w-px bg-white/20 sm:block" />}
                  <span className="flex items-center gap-2 text-sm text-white/70">
                    <feature.icon className="h-4 w-4 text-accent" />
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {showDecoration && (
          <div className="relative h-full">
            {image ? (
              <div className="relative h-full min-h-[340px] overflow-hidden sm:min-h-[420px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[85%_center]"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #0b1638 0%, rgba(11,22,56,0.7) 12%, rgba(11,22,56,0) 32%)",
                  }}
                />
              </div>
            ) : (
              <>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-accent/30 via-navy to-navy-deep">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                </div>
                {badge && (
                  <div className="absolute bottom-6 right-6 flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent">
                      <badge.icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium leading-tight text-white">
                      {badge.title}
                    </span>
                  </div>
                )}
              </>
            )}

            {annotation && (
              <div className="absolute right-4 top-4 max-w-[9rem] rotate-[-4deg] sm:right-8 sm:top-8 sm:max-w-[10rem]">
                <Annotation text={annotation} />
              </div>
            )}

            {badgeItems && badgeItems.length > 0 && (
              <div className="absolute bottom-6 right-6 w-60 rounded-2xl bg-white p-5 shadow-xl">
                <ul className="space-y-3">
                  {badgeItems.map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tint text-accent">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium leading-tight text-ink">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
