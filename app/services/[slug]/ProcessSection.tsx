import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/sections/SectionIntro";
import {
  ProcessPillars,
  ProcessRoadmap,
  ProcessTimeline,
} from "@/components/sections/ProcessFlow";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { ImageCards } from "@/components/ui/cards";
import type { ServiceDetailPage } from "@/lib/data/services";
import { Highlighted, SectionHeading } from "./parts";

type Process = NonNullable<ServiceDetailPage["process"]>;

/**
 * The process as a card per step, each with its own photograph. With more than
 * five steps it also gets the stage key — the whole process at a glance, in the
 * style of the home page's industries section — since the cards run to a second
 * row; five sit in one row and read at a glance already.
 */
function PhotoProcess({ process, fallback }: { process: Process; fallback: string }) {
  const cards = process.steps.map((step) => ({
    tag: `Step ${step.number}`,
    icon: step.icon,
    title: step.title,
    description: step.description,
    image: step.image ?? fallback,
  }));
  const oneRow = process.steps.length <= 5;

  return (
    <section id="process" className="scroll-mt-20 border-t border-line bg-muted">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <SectionHeading
          eyebrow={process.eyebrow}
          title={process.title}
          highlight={process.highlight}
          subtitle={process.subtitle}
        />

        {!oneRow && (
          // The cards below carry the same steps in full, so the key is hidden from assistive tech.
          <ol
            aria-hidden="true"
            className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-2.5 text-sm text-subtle"
          >
            {process.steps.map((step, index) => (
              <li key={step.number} className="flex items-center gap-2">
                <span className="rounded-full border border-line bg-surface px-3 py-1">
                  <span className="mr-1.5 font-semibold text-accent">{index + 1}</span>
                  {step.title}
                </span>
                {index < process.steps.length - 1 && (
                  <ArrowRight className="size-3.5 text-subtle/50" />
                )}
              </li>
            ))}
          </ol>
        )}

        <ImageCards
          items={cards}
          ordered
          animated
          className={oneRow ? "mt-14 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6" : "mt-12"}
        />
      </div>
    </section>
  );
}

/** The process as rising pillars, one a little taller than the last, under a centred header. */
function PillarsProcess({ process }: { process: Process }) {
  return (
    <section id="process" className="scroll-mt-20 border-t border-line bg-muted">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <SectionHeading
          eyebrow={process.eyebrow}
          title={process.title}
          highlight={process.highlight}
          subtitle={process.subtitle}
        />
        <ProcessPillars steps={process.steps} className="mt-16" />
      </div>
    </section>
  );
}

/** The process as a roadmap — pins on a line, cards alternating above and below — under a centred header. */
function RoadmapProcess({ process }: { process: Process }) {
  return (
    <section id="process" className="scroll-mt-20 border-t border-line bg-muted">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <SectionHeading
          eyebrow={process.eyebrow}
          title={process.title}
          highlight={process.highlight}
          subtitle={process.subtitle}
        />
        <ProcessRoadmap steps={process.steps} className="mt-14 lg:mt-10" />
      </div>
    </section>
  );
}

/** The process as a vertical timeline beside a pinned heading. */
function TimelineProcess({ process }: { process: Process }) {
  return (
    <section id="process" className="scroll-mt-20 border-t border-line bg-muted">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-24">
        {/* Content-only wrap: the sticky div itself stays untransformed so its pin isn't disturbed. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <AnimatedContainer direction="left">
            <Eyebrow>{process.eyebrow}</Eyebrow>
            <h2 className="text-section-lg text-ink">
              <Highlighted text={process.title} highlight={process.highlight} />
            </h2>
            <p className="mt-4 max-w-[40ch] text-subtle">{process.subtitle}</p>
          </AnimatedContainer>
        </div>

        <ProcessTimeline steps={process.steps} />
      </div>
    </section>
  );
}

/** The process section, in whichever of the four presentations the page picks. */
export function ProcessSection({ page }: { page: ServiceDetailPage }) {
  const { process, hero } = page;
  if (!process) return null;

  switch (process.style) {
    case "photos":
      return <PhotoProcess process={process} fallback={hero.image.src} />;
    case "pillars":
      return <PillarsProcess process={process} />;
    case "roadmap":
      return <RoadmapProcess process={process} />;
    case "timeline":
      return <TimelineProcess process={process} />;
  }
}
