import { Fragment } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, type LucideIcon } from "lucide-react";
import { Annotation } from "@/components/ui/Annotation";
import { Eyebrow } from "@/components/sections/SectionIntro";

type ScaleStep = { icon: LucideIcon; value: string; label: string };

/** A photograph with a floating caption card, flanking the copy on wide screens. */
type ScaleFeature = {
  image: string;
  icon: LucideIcon;
  /** First line of the caption card, set in the heading colour. */
  lead: string;
  label: string;
};

type ScaleJourneyProps = {
  eyebrow: string;
  title: string;
  /** Second line of the heading, in the accent colour. */
  highlight: string;
  description: string;
  steps: ScaleStep[];
  left: ScaleFeature;
  right: ScaleFeature;
  annotation?: string;
  /** One line under the steps. */
  note?: string;
  tagline: string;
};

/** A dot grid in the accent colour, for the corners around the photographs. */
const dots =
  "pointer-events-none absolute bg-[radial-gradient(var(--color-accent)_1.2px,transparent_1.6px)] [background-size:16px_16px] opacity-30";

function CaptionCard({ feature, className }: { feature: ScaleFeature; className: string }) {
  return (
    <div
      className={`absolute z-10 flex items-center gap-4 rounded-2xl bg-surface px-6 py-5 shadow-xl shadow-navy/10 ${className}`}
    >
      <feature.icon className="size-8 shrink-0 text-accent" aria-hidden="true" />
      <p className="text-[15px] leading-snug">
        <span className="block font-medium text-ink">{feature.lead}</span>
        <span className="block text-ink/70">{feature.label}</span>
      </p>
    </div>
  );
}

function Photo({ src, className }: { src: string; className: string }) {
  return (
    <div className={`absolute overflow-hidden rounded-full shadow-2xl shadow-navy/10 ${className}`}>
      <Image src={src} alt="" fill sizes="288px" className="object-cover" />
    </div>
  );
}

/**
 * The scale section: one delivery model from a single requirement to a
 * thousand-person programme.
 *
 * Two layouts from the same content. From `xl` the copy is flanked by
 * photographs with floating caption cards, a handwritten line and dot grids;
 * below that there is no room beside the copy, so the photographs give way to
 * two thin arcs at the edges and the copy carries the section alone. The steps
 * run across with wave connectors from `sm`, and stack with down arrows on a
 * phone.
 */
export function ScaleJourney({
  eyebrow,
  title,
  highlight,
  description,
  steps,
  left,
  right,
  annotation,
  note,
  tagline,
}: ScaleJourneyProps) {
  return (
    <section className="relative overflow-hidden border-t border-line bg-gradient-to-b from-muted to-surface">
      {/* Narrow and medium screens: the arcs from the simpler layout. */}
      <svg
        viewBox="0 0 300 800"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-40 text-accent/25 md:block xl:hidden"
        aria-hidden="true"
      >
        <circle cx="-60" cy="380" r="280" className="fill-tint/60" />
        <path d="M0 200C160 260 260 520 280 800" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg
        viewBox="0 0 300 800"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-40 text-accent/25 md:block xl:hidden"
        aria-hidden="true"
      >
        <circle cx="360" cy="440" r="260" className="fill-tint/60" />
        <path d="M300 210C140 280 40 540 20 800" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Wide screens: the photograph clusters. */}
      <div
        className="pointer-events-none absolute top-1/2 hidden size-64 -translate-y-1/2 xl:block left-[max(1rem,calc(50%-43rem))] 2xl:left-[calc(50%-48rem)] 2xl:size-80"
        aria-hidden="true"
      >
        <div className="absolute -left-16 -top-20 size-[28rem] rounded-full bg-tint/70" />
        <div className={`${dots} -left-24 -top-10 h-24 w-32`} />
        <Photo src={left.image} className="inset-0" />
        <CaptionCard feature={left} className="-bottom-6 -left-4 w-64" />
        <div className={`${dots} -bottom-28 left-36 h-20 w-32`} />
      </div>

      <div
        className="pointer-events-none absolute top-1/2 hidden size-64 -translate-y-[40%] xl:block right-[max(-4rem,calc(50%-48rem))] 2xl:right-[calc(50%-50rem)] 2xl:size-80"
        aria-hidden="true"
      >
        <div className="absolute -bottom-24 -right-24 size-[30rem] rounded-full bg-tint/60" />
        <div className={`${dots} -left-40 top-10 h-20 w-36`} />
        {annotation && (
          <Annotation
            text={annotation}
            tone="accent"
            className="absolute -left-4 -top-52 -rotate-12 2xl:-top-56"
          />
        )}
        <Photo src={right.image} className="inset-0" />
        <CaptionCard feature={right} className="-left-16 bottom-8 w-60" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-20 text-center lg:py-24">
        <Eyebrow center bracketed>
          {eyebrow}
        </Eyebrow>
        <h2 className="text-hero text-ink">
          {title} <span className="block text-accent">{highlight}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[56ch] leading-relaxed text-subtle sm:text-lg">
          {description}
        </p>

        <ol className="mt-14 flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-center sm:gap-0">
          {steps.map((step, index) => (
            <Fragment key={step.value}>
              <li className="flex w-full max-w-60 flex-col items-center sm:w-32 lg:w-40">
                <span className="flex size-20 items-center justify-center rounded-full bg-gradient-to-b from-tint to-tint/30 text-accent ring-1 ring-accent/10 lg:size-24">
                  <step.icon className="size-8 stroke-[1.75] lg:size-9" aria-hidden="true" />
                </span>
                <p className="mt-5 text-4xl font-bold tracking-tight text-ink lg:text-[2.75rem]">
                  {step.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-ink/80 lg:text-base">{step.label}</p>
              </li>

              {index < steps.length - 1 && (
                <li aria-hidden="true" className="flex shrink-0 items-center justify-center">
                  <ArrowDown className="size-5 text-accent sm:hidden" />
                  {/*
                   * The wave dips from one icon to the next; the arrow badge
                   * sits in the trough, just below the icons' centre line.
                   */}
                  <span className="relative hidden h-20 w-20 items-center justify-center sm:flex lg:h-24 lg:w-28">
                    <svg
                      viewBox="0 0 112 40"
                      fill="none"
                      preserveAspectRatio="none"
                      className="absolute inset-x-0 top-1/2 h-10 w-full -translate-y-1/2 text-accent/35"
                    >
                      <path d="M0 12C28 12 36 28 56 28S84 12 112 12" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <span className="relative flex size-9 translate-y-2 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 lg:size-10">
                      <ArrowRight className="size-4 lg:size-5" />
                    </span>
                  </span>
                </li>
              )}
            </Fragment>
          ))}
        </ol>

        {note && <p className="mt-10 text-sm text-subtle sm:text-base">{note}</p>}

        <p className="mt-16 flex items-center justify-center gap-4 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.2em] text-subtle sm:gap-5 sm:text-sm sm:tracking-[0.25em]">
          <span className="h-px w-8 bg-subtle/40 sm:w-14" aria-hidden="true" />
          {tagline}
          <span className="h-px w-8 bg-subtle/40 sm:w-14" aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}

export default ScaleJourney;
