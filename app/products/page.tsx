import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { productSummary, products } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Products",
  description: productSummary(products[0]),
};

/**
 * The products page. PINT is the only product, so it is shown as one wide
 * feature rather than a lone card in a grid. Every word about it — the name,
 * headline, opening paragraph, feature names and closing statement — is the
 * client's own PINT copy from `lib/data/products.ts`; the page adds none.
 */
export default function ProductsPage() {
  const [product] = products;

  return (
    <>
      <Hero title="Products" />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <article className="grid gap-10 rounded-3xl border border-line bg-white p-8 shadow-[0_1px_2px_rgba(11,22,56,0.04),0_24px_48px_-24px_rgba(11,22,56,0.18)] sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:p-12">
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-section-lg text-ink">{product.title}</h2>
            <p className="mt-3 text-lg font-medium text-accent">{product.headline}</p>
            <p className="mt-5 text-subtle">{product.intro}</p>
            <Button href={`/products/${product.slug}`} className="mt-8">
              Explore {product.title} →
            </Button>
          </div>

          <div className="rounded-2xl bg-tint p-6 sm:p-8">
            <p className="text-eyebrow text-accent">Key Features</p>
            <ul className="mt-5 space-y-3.5">
              {product.keyFeatures.map((feature) => (
                <li key={feature.title} className="flex items-start gap-3 text-sm text-ink/80">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {feature.title}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <CTASection
        title={product.closing.statement}
        primaryCta={{ label: product.closing.ctaLabel, href: "/contact" }}
      />
    </>
  );
}
