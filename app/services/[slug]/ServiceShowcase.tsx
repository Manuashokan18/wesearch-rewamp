import { CTASection } from "@/components/sections/CTASection";
import type { ServiceDetailPage } from "@/lib/data/services";
import { FocusSection, CapabilitiesSection, EcosystemSection } from "./FeatureSections";
import { ModelsSection } from "./ModelsSection";
import { ProcessSection } from "./ProcessSection";
import { SolutionsSection } from "./SolutionsSection";
import { WhySection } from "./WhySection";

/** The closing illustration, shared with the home page, for pages that don't supply their own. */
const defaultCtaImage = {
  src: "/build-your-workforce.png",
  alt: "Talent connected across a growing workforce network",
  width: 1774,
  height: 887,
};

/**
 * Everything on a service page below the hero, in the order the client's copy
 * documents set out: solutions, then whichever of the models comparison,
 * capabilities, ecosystem, process and focus areas the service has, the reasons
 * to choose WeSearch, and the closing call to action.
 *
 * Every service is built from these same parts, so the pages read as one site;
 * each page's data picks the presentation of its solutions, process and why-us
 * sections (see `SolutionsStyle`, `ProcessStyle` and `WhyStyle`) to suit what
 * the section says. A section a service doesn't define is simply left out.
 */
export function ServiceShowcase({ page }: { page: ServiceDetailPage }) {
  const { finalCta } = page;

  return (
    <>
      <SolutionsSection page={page} />
      <ModelsSection page={page} />
      <CapabilitiesSection page={page} />
      <EcosystemSection page={page} />
      <ProcessSection page={page} />
      <FocusSection page={page} />
      <WhySection page={page} />

      <CTASection
        eyebrow={finalCta.eyebrow}
        title={finalCta.title}
        description={finalCta.description}
        primaryCta={{ label: finalCta.primaryLabel, href: "/contact" }}
        secondaryCta={{ label: finalCta.secondaryLabel, href: finalCta.secondaryHref ?? "/services" }}
        image={finalCta.image ?? defaultCtaImage}
        highlights={finalCta.assurances}
        showDecoration
      />
    </>
  );
}

export default ServiceShowcase;
