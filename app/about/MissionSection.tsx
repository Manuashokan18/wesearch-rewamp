import { Eyebrow } from "@/components/sections/SectionIntro";
import { VideoCard } from "@/components/sections/VideoCard";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { dots } from "./parts";

type MissionSectionProps = {
  eyebrow: string;
  title: string;
  /** The mission's first sentence, set large as the statement. */
  lead: string;
  /** The rest of the paragraph. */
  rest: string;
  video: { src: string; caption: string };
};

/**
 * The mission beside the handshake video, on a white ground with the corner dot
 * grids the Services and Products pages use. The paragraph is one paragraph:
 * its first sentence is set large as the statement and the rest sits beneath
 * it, so nothing is cut or reworded.
 */
export function MissionSection({ eyebrow, title, lead, rest, video }: MissionSectionProps) {
  return (
    <section id="mission" className="relative scroll-mt-20 overflow-hidden bg-surface">
      <div className={`${dots} -right-6 top-10 hidden h-40 w-56 lg:block`} aria-hidden="true" />
      <div className={`${dots} -bottom-6 -left-6 hidden h-32 w-44 lg:block`} aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20 lg:py-28">
        <AnimatedContainer>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-balance text-section-lg text-ink">{title}</h2>
          <p className="mt-6">
            <span className="block text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-[1.7rem]">
              {lead}
            </span>{" "}
            <span className="mt-5 block max-w-[54ch] text-lg leading-relaxed text-subtle">{rest}</span>
          </p>
        </AnimatedContainer>

        <AnimatedContainer delay={0.25}>
          {/* `isolate` keeps the tinted panel behind the video without dropping behind the section. */}
          <div className="relative isolate">
            <div
              className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-tint via-tint/50 to-transparent"
              aria-hidden="true"
            />
            <div className={`${dots} -right-6 -top-6 -z-10 hidden size-28 sm:block`} aria-hidden="true" />
            <VideoCard
              src={video.src}
              caption={video.caption}
              className="shadow-[0_1px_2px_rgba(11,22,56,0.04),0_28px_56px_-24px_rgba(11,22,56,0.4)]"
            />
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}

export default MissionSection;
