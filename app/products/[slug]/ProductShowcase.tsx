import { Plus, Sparkles } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { Product, ProductDetailPage } from "@/lib/data/products";
import { cn } from "@/lib/utils";

/** The closing illustration, shared with the home page and the Services pages. */
const closingImage = {
  src: "/build-your-workforce.png",
  alt: "Talent connected across a growing workforce network",
  width: 1774,
  height: 887,
};

const pad = (n: number) => String(n).padStart(2, "0");

/** An accent dot grid, as in the corners of the Services pages. */
const dots =
  "pointer-events-none absolute bg-[radial-gradient(var(--color-accent)_1.2px,transparent_1.6px)] [background-size:14px_14px] opacity-35";

/** A section's heading, centred under a short accent bar. The client's page has no label above its headings, so there is none here. */
function SectionHeading({ title, inverse = false }: { title: string; inverse?: boolean }) {
  return (
    <AnimatedContainer className="mx-auto max-w-2xl text-center">
      <span
        className={cn("mx-auto mb-5 block h-1 w-10 rounded-full", inverse ? "bg-accent-soft" : "bg-accent")}
        aria-hidden="true"
      />
      <h2 className={cn("text-section-lg", inverse ? "text-white" : "text-ink")}>{title}</h2>
    </AnimatedContainer>
  );
}

/** The key features as a grid of cards, each an icon, the feature's name and its paragraph, that light up under the pointer. */
function KeyFeatures({
  features,
  detailPage,
}: {
  features: Product["keyFeatures"];
  detailPage: ProductDetailPage;
}) {
  return (
    <section
      id="key-features"
      // `overflow-clip`, not `overflow-hidden`, as on the Services ground.
      className="relative scroll-mt-20 overflow-clip bg-gradient-to-b from-muted to-tint/50"
    >
      <div
        className="pointer-events-none absolute -right-48 -top-48 h-[560px] w-[560px] rounded-full bg-tint blur-3xl"
        aria-hidden="true"
      />
      <div className={`${dots} -left-6 top-24 hidden h-36 w-28 lg:block`} aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <SectionHeading title="Key Features" />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = detailPage.featureIcons[index] ?? Sparkles;

            return (
              <li key={feature.title}>
                <AnimatedContainer delay={Math.min(index * 0.1, 0.4)}>
                  <SpotlightCard
                    tone="light"
                    className="flex h-full flex-col p-7 shadow-sm shadow-navy/5 hover:shadow-lg hover:shadow-navy/10"
                  >
                    <span className="relative flex size-12 items-center justify-center rounded-xl bg-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white motion-reduce:transition-none">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>

                    <div className="relative mt-6">
                      <h3 className="text-card text-ink">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-subtle">{feature.description}</p>
                    </div>
                  </SpotlightCard>
                </AnimatedContainer>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/**
 * The benefits on a navy band as a numbered accordion, as on the client's page:
 * each is a row with its number and name, and opens to its paragraph. Built on
 * native `<details>`, so every paragraph is in the page for search and assistive
 * tech, and it works without script. Rows share one `name`, so opening one
 * closes the last (where the browser supports it). The first starts open.
 */
function Benefits({
  benefits,
  detailPage,
}: {
  benefits: Product["benefits"];
  detailPage: ProductDetailPage;
}) {
  return (
    <section id="benefits" className="relative scroll-mt-20 overflow-hidden bg-navy text-white">
      <div
        className="pointer-events-none absolute -left-40 -top-40 size-[34rem] rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:22px_22px] opacity-15"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <SectionHeading inverse title="Benefits" />

        <AnimatedContainer
          delay={0.15}
          className="mx-auto mt-14 max-w-3xl divide-y divide-white/15 border-y border-white/15"
        >
          {benefits.map((benefit, index) => {
            const Icon = detailPage.benefitIcons[index] ?? Sparkles;

            return (
              <details key={benefit.title} name="pint-benefits" open={index === 0} className="group">
                <summary className="flex cursor-pointer list-none items-center gap-4 py-5 transition-colors duration-300 hover:text-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft motion-reduce:transition-none sm:gap-5 sm:py-6 [&::-webkit-details-marker]:hidden">
                  <span className="w-6 shrink-0 text-sm font-semibold tabular-nums text-accent-soft">
                    {pad(index + 1)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-soft ring-1 ring-inset ring-white/15 transition-colors duration-300 group-open:bg-accent group-open:text-white motion-reduce:transition-none sm:flex"
                  >
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-subsection">{benefit.title}</h3>
                  <Plus
                    aria-hidden="true"
                    className="ml-auto size-5 shrink-0 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                  />
                </summary>

                <p className="max-w-[62ch] pb-7 leading-relaxed text-white/70 sm:pl-[4.75rem]">
                  {benefit.description}
                </p>
              </details>
            );
          })}
        </AnimatedContainer>
      </div>
    </section>
  );
}

/**
 * Everything on a product page below the hero: the key features, the benefits
 * and the closing call to action, on the same grounds the Services pages use
 * (a dotted light section, a navy band, the shared closing block) so the
 * product reads as part of the same site. It holds only what the client's own
 * page holds; there are no labels, chips or extra buttons of ours.
 */
export function ProductShowcase({
  product,
  detailPage,
}: {
  product: Product;
  detailPage: ProductDetailPage;
}) {
  return (
    <>
      <KeyFeatures features={product.keyFeatures} detailPage={detailPage} />
      <Benefits benefits={product.benefits} detailPage={detailPage} />

      <CTASection
        title={product.closing.statement}
        primaryCta={{ label: product.closing.ctaLabel, href: "/contact" }}
        image={closingImage}
        showDecoration
      />
    </>
  );
}

export default ProductShowcase;
