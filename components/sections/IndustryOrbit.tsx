import type { LucideIcon } from "lucide-react";
import { OrbitCarousel } from "@/components/ui/orbit-carousel";

/**
 * One industry and the mandate we are most asked for in it. `stage` is a
 * zero-based index into `stages` — the furthest stage this kind of engagement
 * has reached.
 */
type IndustryMandate = {
  industry: string;
  role: string;
  stage: number;
  icon: LucideIcon;
  image: string;
};

type IndustryOrbitProps = {
  /** The delivery stages, in order. Drawn as the rail in the centre card. */
  stages: string[];
  mandates: IndustryMandate[];
};

/**
 * The industries we staff, circling a card that shows the one at the top: the
 * sector, the role we are asked for most, and how far a typical mandate has
 * moved through delivery.
 *
 * Server-rendered wrapper: the icons and stage rails are built here and handed
 * to the client carousel as elements, since a component function cannot cross
 * that boundary. The rail segments reuse the hero's `hero-rail` fill, which
 * replays each time the card changes because the card remounts.
 */
export function IndustryOrbit({ stages, mandates }: IndustryOrbitProps) {
  const items = mandates.map((mandate) => ({
    id: mandate.industry,
    title: mandate.industry,
    subtitle: mandate.role,
    image: mandate.image,
    icon: <mandate.icon className="size-3 sm:size-3.5" />,
    detail: (
      <div>
        {/*
         * The rail repeats what the stage label below already states, so it
         * is hidden from assistive tech rather than read out twice.
         */}
        <div className="flex gap-1" aria-hidden="true">
          {stages.map((stage, stageIndex) => (
            <span key={stage} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
              {stageIndex <= mandate.stage && (
                <span
                  className="hero-rail block h-full rounded-full bg-accent"
                  style={{ animationDelay: `${200 + stageIndex * 90}ms` }}
                />
              )}
            </span>
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-subtle sm:text-xs">
          Stage {mandate.stage + 1} of {stages.length} &middot;{" "}
          <span className="font-medium text-ink">{stages[mandate.stage]}</span>
        </p>
      </div>
    ),
  }));

  return (
    <>
      {/*
       * The carousel shows one industry at a time. This list carries all six
       * in the page at once, so assistive tech and crawlers get every sector
       * and role without having to step through the ring.
       */}
      <ul className="sr-only">
        {mandates.map((mandate) => (
          <li key={mandate.industry}>
            {mandate.industry}: {mandate.role}. Stage {mandate.stage + 1} of {stages.length},{" "}
            {stages[mandate.stage]}.
          </li>
        ))}
      </ul>
      <OrbitCarousel
        items={items}
        label="Industries we support"
        cta={{ label: "Request Talent", href: "/contact" }}
      />
    </>
  );
}

export default IndustryOrbit;
