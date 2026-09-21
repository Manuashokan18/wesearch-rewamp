import Image from "next/image";
import { Send, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Annotation } from "@/components/ui/Annotation";
import { Eyebrow } from "@/components/sections/SectionIntro";

type Cta = { label: string; href: string };
type CTAImage = { src: string; alt: string; width: number; height: number };
type CTAHighlight = { icon: LucideIcon; label: string };

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  showDecoration?: boolean;
  image?: CTAImage;
  annotation?: string;
  /** Short assurances in a row beneath the buttons. */
  highlights?: CTAHighlight[];
};

export function CTASection({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  showDecoration = false,
  image,
  annotation,
  highlights,
}: CTASectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div
        className={`rounded-3xl bg-tint p-10 sm:p-14 ${
          showDecoration ? "grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]" : ""
        }`}
      >
        <div>
          {eyebrow && (
            <Eyebrow>{eyebrow}</Eyebrow>
          )}
          <h2 className="max-w-lg text-section-lg text-ink">{title}</h2>
          {description && <p className="mt-4 max-w-md text-subtle">{description}</p>}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="outline">
                {secondaryCta.label}
              </Button>
            )}
          </div>

          {highlights && highlights.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-accent/15 pt-6">
              {highlights.map((highlight) => (
                <li key={highlight.label} className="flex items-center gap-2 text-sm text-ink/75">
                  <highlight.icon className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  {highlight.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {showDecoration && (
          <div className="relative hidden items-center justify-center lg:flex">
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="28rem"
                className="h-auto w-full max-w-md"
              />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-lg">
                <Send className="h-7 w-7" />
              </span>
            )}

            {annotation && (
              <div className="absolute -top-6 right-0 max-w-[9rem] rotate-2">
                <Annotation text={annotation} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default CTASection;
