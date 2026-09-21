import {
  ArrowRight,
  Cpu,
  Factory,
  Landmark,
  RadioTower,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Eyebrow } from "@/components/sections/SectionIntro";
import { IndustryOrbit } from "@/components/sections/IndustryOrbit";

/**
 * "Industries We Support", exactly as it stood on the home page.
 *
 * Moved out of app/page.tsx on 2026-09-21 with its markup and styling
 * unchanged. It was off the home page for a short while and is back, in the
 * same place, between How We Deliver and Supporting Organizations as They
 * Scale. The client's request to make it more prominent (point 7 of
 * docs/content/homepage-clientsuggestion.md) is still open.
 */

/** Unsplash stock photography, sized at source so the optimiser starts small. */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

/**
 * The stages every engagement moves through, mirrored from the delivery model
 * set out on the service pages. The industries board draws mandates against
 * these.
 */
const deliveryStages = [
  "Requirement",
  "Sourcing",
  "Screening",
  "Selection",
  "Onboarding",
];

/**
 * One representative mandate per industry we support — the shape of the work,
 * not a live feed of client vacancies.
 */
const boardMandates = [
  {
    role: "Cloud & DevOps engineers",
    industry: "Technology & IT",
    stage: 3,
    icon: Cpu,
    image: unsplash("1461749280684-dccba630e2f6"),
  },
  {
    role: "Risk & compliance analysts",
    industry: "Banking & Financial Services",
    stage: 2,
    icon: Landmark,
    image: unsplash("1611974789855-9c2a0a7236a3"),
  },
  {
    role: "Network operations teams",
    industry: "Telecom",
    stage: 4,
    icon: RadioTower,
    image: unsplash("1544197150-b99a580bb7a8"),
  },
  {
    role: "Plant & process engineers",
    industry: "Engineering & Manufacturing",
    stage: 1,
    icon: Factory,
    image: unsplash("1581091226825-a6a2a5aee158"),
  },
  {
    role: "Category & fulfilment managers",
    industry: "E-commerce & Consumer",
    stage: 2,
    icon: ShoppingBag,
    image: unsplash("1556742049-0cfed4f6a45d"),
  },
  {
    role: "Supply chain planners",
    industry: "Logistics & Transportation",
    stage: 3,
    icon: Truck,
    image: unsplash("1586528116311-ad8dd3c8310d"),
  },
];

export function IndustriesSection() {
  return (
    <section className="overflow-hidden bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
        <div>
          <Eyebrow>Industries We Support</Eyebrow>
          <h2 className="text-section-lg text-ink">
            Talent Solutions Across Growing Industries
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-subtle">
            Our recruitment and workforce solutions can support organizations
            across multiple industries and business environments.
          </p>
          <p className="mt-3 max-w-md text-subtle">
            Six sectors, each with its own talent market. Here is what we are
            asked for most.
          </p>

          {/* The key to the rail in the centre card. */}
          <p className="mt-10 text-eyebrow text-ink">How a mandate moves</p>
          <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2.5 text-sm text-subtle">
            {deliveryStages.map((stage, index) => (
              <li key={stage} className="flex items-center gap-2">
                <span className="rounded-full border border-line bg-muted px-3 py-1">
                  <span className="mr-1.5 font-semibold text-accent">{index + 1}</span>
                  {stage}
                </span>
                {index < deliveryStages.length - 1 && (
                  <ArrowRight className="size-3.5 text-line" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>

          <p className="mt-8 text-xs text-subtle">
            Representative engagements &middot; not a live vacancy feed
          </p>
        </div>

        <IndustryOrbit stages={deliveryStages} mandates={boardMandates} />
      </div>
    </section>
  );
}

export default IndustriesSection;
