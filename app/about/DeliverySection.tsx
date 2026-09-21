import { ProcessPillars } from "@/components/sections/ProcessFlow";
import type { ProcessStep } from "@/components/sections/ProcessSteps";
import { dots, SectionHeading } from "./parts";

type DeliverySectionProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: ProcessStep[];
};

/**
 * How WeSearch delivers, as the six-step process rising like a staircase: each
 * step a little taller and more saturated than the last, so the row reads as
 * progress towards ongoing workforce management. It is the Services pages'
 * `ProcessPillars`, set to six columns; below `lg` the pillars lie down as
 * horizontal bars.
 */
export function DeliverySection({ eyebrow, title, subtitle, steps }: DeliverySectionProps) {
  return (
    <section
      id="delivery"
      className="relative scroll-mt-20 overflow-clip border-t border-line bg-muted"
    >
      <div className={`${dots} -right-6 top-16 hidden h-36 w-28 lg:block`} aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <ProcessPillars steps={steps} className="mt-16 lg:grid-cols-6" />
      </div>
    </section>
  );
}

export default DeliverySection;
