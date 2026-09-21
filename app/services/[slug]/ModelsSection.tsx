import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ServiceDetailPage } from "@/lib/data/services";
import { cn } from "@/lib/utils";
import { SectionHeading, dots, pad } from "./parts";

type Comparison = NonNullable<ServiceDetailPage["comparison"]>;

/** "Contract-to-Hire" → "contract-to-hire", so a solution card can link to its panel. */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * One workforce model: its flow drawn as a numbered rail, then who it suits.
 * The rail fills as it scrolls into view (`board-rail`, from the home page's
 * delivery board) and ends on the outcome, picked out in the accent colour.
 */
function ModelPanel({
  column,
  index,
  dark,
}: {
  column: Comparison["columns"][number];
  index: number;
  dark: boolean;
}) {
  const steps = column.flow.split("→").map((step) => step.trim());

  return (
    <article
      id={slugify(column.title)}
      className={cn(
        "relative scroll-mt-28 p-8 sm:p-10 lg:p-12",
        dark
          ? "rounded-b-3xl bg-navy text-white lg:rounded-bl-none lg:rounded-r-3xl"
          : "rounded-t-3xl bg-tint/70 text-ink lg:rounded-tr-none lg:rounded-l-3xl"
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
        {dark ? (
          <div className="absolute -right-24 -top-24 size-80 rounded-full bg-accent/25 blur-3xl" />
        ) : (
          <div className={`${dots} -right-3 -top-3 h-24 w-36 opacity-25`} />
        )}
      </div>

      {dark && (
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-surface bg-accent text-sm font-bold tracking-wide text-white shadow-lg shadow-accent/30 lg:left-0 lg:top-1/2"
        >
          VS
        </span>
      )}

      <div className="relative">
        <div className="flex items-center gap-4">
          <span
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-2xl",
              dark
                ? "bg-white/10 text-accent-soft ring-1 ring-inset ring-white/15"
                : "bg-surface text-accent shadow-sm shadow-navy/5"
            )}
          >
            <column.icon className="size-6" aria-hidden="true" />
          </span>
          <div>
            <p className={cn("text-xs font-semibold uppercase tracking-wider", dark ? "text-white/50" : "text-subtle")}>
              Model {pad(index + 1)}
            </p>
            <h3 className="text-subsection">{column.title}</h3>
          </div>
        </div>

        <ol className="mt-10 flex">
          {steps.map((step, stepIndex) => {
            const isLast = stepIndex === steps.length - 1;
            return (
              <li key={step} className="relative flex flex-1 flex-col items-center text-center">
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-1/2 top-5 h-0.5 w-full -translate-y-1/2 overflow-hidden rounded-full",
                      dark ? "bg-white/15" : "bg-accent/15"
                    )}
                  >
                    <span className={cn("board-rail block h-full", dark ? "bg-accent-soft" : "bg-accent")} />
                  </span>
                )}
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative flex size-10 items-center justify-center rounded-full text-sm font-semibold",
                    isLast
                      ? "bg-accent text-white shadow-lg shadow-accent/30"
                      : dark
                        ? "bg-navy text-white ring-2 ring-inset ring-white/25"
                        : "bg-surface text-accent ring-2 ring-inset ring-accent/25"
                  )}
                >
                  {stepIndex + 1}
                </span>
                <span className={cn("mt-3 text-sm font-medium", isLast && (dark ? "text-accent-soft" : "text-accent"))}>
                  {step}
                </span>
              </li>
            );
          })}
        </ol>

        <ul className={cn("mt-10 space-y-3.5 border-t pt-8", dark ? "border-white/10" : "border-accent/10")}>
          {column.bullets.map((bullet) => (
            <li
              key={bullet}
              className={cn("flex items-start gap-3 leading-relaxed", dark ? "text-white/80" : "text-ink/80")}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                  dark ? "bg-accent-soft/20 text-accent-soft" : "bg-accent/10 text-accent"
                )}
              >
                <Check className="size-3" strokeWidth={3} aria-hidden="true" />
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** The two workforce models side by side, under a centred header. Contract Staffing only. */
export function ModelsSection({ page }: { page: ServiceDetailPage }) {
  const { hero, comparison } = page;
  if (!comparison) return null;

  return (
    <section id="models" className="scroll-mt-20 bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <SectionHeading
          eyebrow={comparison.eyebrow}
          title={comparison.title}
          highlight={comparison.highlight}
          subtitle={comparison.subtitle}
        />

        <div className="mt-14 grid rounded-3xl shadow-2xl shadow-navy/10 lg:grid-cols-2">
          {comparison.columns.map((column, index) => (
            <ModelPanel key={column.title} column={column} index={index} dark={index % 2 === 1} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-6">
          <p className="text-subtle">Not sure which model fits? We&apos;ll help you choose.</p>
          <Button href="/contact" variant="outline">
            {hero.primaryCtaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
