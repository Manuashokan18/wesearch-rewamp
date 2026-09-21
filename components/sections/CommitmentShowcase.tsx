import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/sections/SectionIntro";
import { cn } from "@/lib/utils";

export type CommitmentItem = {
  /** Who the promise is for, e.g. "For Clients". */
  tag: string;
  /** The promise itself. */
  title: string;
  icon: LucideIcon;
  /** Photograph behind the card. Decorative — the copy carries the meaning. */
  image: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "Our Commitment" as a dark, layered band rather than a row of captioned
 * photographs: the heading and lead-in centred over a navy-to-blue gradient
 * with a glow and a dot grid, then one tall photo card per promise. Each card
 * sits under a blue gradient wash with the audience tag on top, the promise
 * set large at the foot, and a ring of light that travels its edge on hover.
 * The middle card stands a step higher, so the row has a rhythm instead of a
 * flat line.
 *
 * The saturated panels, imagery and depth follow the treatment the client
 * pointed to on the JoulesToWatts site, in WeSearch's own navy and blue. A
 * Server Component: all of the motion is CSS.
 */
export function CommitmentShowcase({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: CommitmentItem[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {/* Ground: the gradient, two glows and a fine dot grid, all behind the content. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep via-navy to-[#0f2c6b]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 -z-10 size-[32rem] rounded-full bg-accent/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 -z-10 size-[34rem] rounded-full bg-accent-soft/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:22px_22px] opacity-[0.12]"
      />

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 lg:pb-32 lg:pt-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow center bracketed>
            {eyebrow}
          </Eyebrow>
          <h2 className="text-section-lg">{title}</h2>
          <p className="mx-auto mt-4 text-white/70">{description}</p>
        </div>

        {/* One column up to laptop widths — three cards across are too narrow for the tag and figure below that. */}
        <ul className="mx-auto mt-16 grid max-w-xl gap-6 lg:mt-20 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {items.map((item, index) => (
            <li key={item.tag} className={cn(index === 1 && "lg:-translate-y-12")}>
              <article className="beam-card group relative isolate flex h-[24rem] flex-col justify-between overflow-hidden rounded-3xl bg-navy-deep p-7 shadow-2xl shadow-black/30 ring-1 ring-white/10 sm:h-[28rem] lg:h-[32rem]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep from-8% via-navy/75 via-50% to-accent/35"
                />

                <div className="flex items-start justify-between">
                  <p className="inline-flex items-center gap-2 rounded-full bg-white/15 py-1.5 pl-2 pr-4 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/25 backdrop-blur">
                    <span className="flex size-6 items-center justify-center rounded-full bg-accent">
                      <item.icon className="size-3.5" aria-hidden="true" />
                    </span>
                    {item.tag}
                  </p>
                  <span
                    aria-hidden="true"
                    className="select-none text-5xl font-bold leading-none text-white/25"
                  >
                    {pad(index + 1)}
                  </span>
                </div>

                <div>
                  <h3 className="max-w-[16ch] text-section text-white">{item.title}</h3>
                  <span
                    aria-hidden="true"
                    className="mt-6 block h-1 w-12 rounded-full bg-accent-soft transition-all duration-500 group-hover:w-28 motion-reduce:transition-none"
                  />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default CommitmentShowcase;
