import Image from "next/image";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Annotation } from "@/components/ui/Annotation";

type ScrollCardItem = {
  /** Full name, shown as the label above the heading. */
  label: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  /** Background photograph. Decorative — the heading carries the meaning. */
  image: string;
  icon: LucideIcon;
};

type CardsParallaxProps = {
  items: ScrollCardItem[];
  /** Handwritten line in the corner of every card. */
  annotation?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A stack of cards that pin as the page scrolls, each sliding over the last.
 *
 * Adapted from the 21st.dev scroll-cards component. The source used the legacy
 * `layout="fill"` Image API, removed back in Next 13; this uses `fill` with an
 * explicit `sizes`. A navy scrim rises from the foot of the photograph so the
 * copy keeps its contrast whatever the image behind it is doing.
 *
 * The effect is pure CSS `position: sticky` — no hooks, no state — so unlike
 * the source this is a Server Component. Cards pin just below the sticky
 * header rather than under it. Below `md` they unpin and read as an ordinary
 * list, since six pinned screens is a long scroll on a phone.
 */
export function CardsParallax({ items, annotation }: CardsParallaxProps) {
  return (
    <div>
      {items.map((item, index) => (
        <div
          key={item.title}
          className="py-3 md:sticky md:top-28 md:h-[62vh] md:min-h-[480px] md:py-0"
        >
          <article className="relative flex min-h-[460px] w-full items-end overflow-hidden rounded-2xl bg-navy-deep shadow-2xl shadow-navy/25 md:h-full md:min-h-0">
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 660px, (min-width: 768px) 720px, 100vw"
              className="object-cover"
            />

            {/* Scrim: navy from the foot and the left edge, where the copy sits. */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy-deep from-10% via-navy-deep/70 via-45% to-transparent to-80%"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-navy-deep/50 to-transparent to-60%"
              aria-hidden="true"
            />

            <div className="relative w-full p-7 sm:p-10">
              <p className="flex items-center gap-4 text-eyebrow text-white/85">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20 backdrop-blur">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                {item.label}
              </p>

              <h3 className="mt-5 max-w-[20ch] text-section-lg text-white">{item.title}</h3>

              {/* Held narrow enough to clear the annotation in the corner. */}
              <p className="mt-4 max-w-[40ch] leading-relaxed text-white/80">
                {item.description}
              </p>

              <Button href={item.href} variant="outlineInverse" className="mt-8 border-white/50">
                {item.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            {annotation && (
              <Annotation
                text={annotation}
                tone="inverse"
                className="absolute bottom-12 right-10 hidden -rotate-12 md:block"
              />
            )}

            {/*
             * Orientation, not decoration: in a pinned stack it is otherwise
             * hard to tell how far through the set you are.
             */}
            <p className="absolute right-5 top-5 rounded-full bg-white/85 px-3.5 py-1.5 text-xs tabular-nums text-subtle backdrop-blur sm:right-7 sm:top-7">
              <span className="font-semibold text-ink">{pad(index + 1)}</span> / {pad(items.length)}
            </p>
          </article>
        </div>
      ))}
    </div>
  );
}

export { type ScrollCardItem };
export default CardsParallax;
