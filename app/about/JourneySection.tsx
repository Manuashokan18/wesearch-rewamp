import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/sections/SectionIntro";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { cn } from "@/lib/utils";
import { dots } from "./parts";

export type Milestone = { year: string; milestone: string; icon: LucideIcon };

type JourneySectionProps = {
  eyebrow: string;
  title: string;
  milestones: Milestone[];
  image: { src: string; alt: string; position?: string };
};

/**
 * The company's milestones as a timeline beside a photograph and the heading.
 *
 * After the vertical timelines in the 21st.dev catalogue ("Timeline-02",
 * "Vertical How It Works Timeline": a rail, a node per entry, a date set large)
 * with the source unretrievable (free quota spent), so it is built natively: an
 * icon node per milestone joined by rail segments that fill as they scroll into
 * view (the `board-rail-y` reveal the Services timelines use), the year set large
 * and the sentence beneath, separated by hairlines rather than boxed in cards.
 * The most recent milestone's node is filled. The heading and photograph stay
 * pinned on a laptop-sized screen while the entries pass.
 */
export function JourneySection({ eyebrow, title, milestones, image }: JourneySectionProps) {
  return (
    <section
      id="journey"
      // `overflow-clip`, not `overflow-hidden`, so the pinned column can still stick.
      className="relative scroll-mt-20 overflow-clip bg-gradient-to-b from-muted to-tint/50"
    >
      <div
        className="pointer-events-none absolute -right-48 -top-48 h-[560px] w-[560px] rounded-full bg-tint blur-3xl"
        aria-hidden="true"
      />
      <div className={`${dots} -left-6 bottom-24 hidden h-36 w-28 lg:block`} aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-section-lg text-ink">{title}</h2>

          <AnimatedContainer className="relative isolate mt-8 lg:mt-10">
            <div className={`${dots} -bottom-5 -right-5 -z-10 hidden size-28 sm:block`} aria-hidden="true" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-navy-deep shadow-xl shadow-navy/15 lg:aspect-[5/4]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 460px, 100vw"
                className={cn("object-cover", image.position)}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy-deep/45 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </AnimatedContainer>
        </div>

        <ol>
          {milestones.map((entry, index) => {
            const latest = index === milestones.length - 1;

            return (
              <li key={entry.year} className="group relative pb-10 pl-16 last:pb-0 sm:pl-20">
                {/* The rail from this node to the next, filling as it scrolls into view; the last node ends it. */}
                {!latest && (
                  <span
                    aria-hidden="true"
                    className="absolute left-6 top-7 h-full w-px -translate-x-1/2 overflow-hidden bg-accent/15"
                  >
                    <span className="board-rail-y block h-full w-full bg-accent" />
                  </span>
                )}

                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-1 z-10 flex size-12 items-center justify-center rounded-full ring-4 ring-muted transition-colors duration-300 motion-reduce:transition-none",
                    latest
                      ? "bg-accent text-white shadow-md shadow-accent/30"
                      : "bg-tint text-accent group-hover:bg-accent group-hover:text-white"
                  )}
                >
                  <entry.icon className="size-5" />
                </span>

                <div className="border-b border-line pb-8 group-last:border-b-0 group-last:pb-0">
                  <h3
                    className={cn(
                      "text-5xl font-bold leading-none tracking-tight tabular-nums transition-colors duration-300 motion-reduce:transition-none sm:text-6xl",
                      latest ? "text-accent" : "text-ink group-hover:text-accent"
                    )}
                  >
                    {entry.year}
                  </h3>
                  <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-subtle">
                    {entry.milestone}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default JourneySection;
