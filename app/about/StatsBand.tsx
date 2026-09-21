import { CountUp } from "@/components/ui/count-up";
import type { Credential } from "@/lib/data/company";

/**
 * The company's credentials on a navy band: the figures are the section, set
 * very large in a ledger of hairlines rather than in cards. Each counts up as
 * it scrolls into view, and its rule lengthens under the pointer.
 *
 * The figures are the client's approved set (`credentials` in
 * lib/data/company.ts), the same six the home page's Why Choose WeSearch ticker
 * runs, so the two never disagree. The band's label reuses that section's
 * eyebrow, since the home page's "Learn More" arrives here.
 *
 * Layout follows the About Bento on 21st.dev only in spirit (one section given
 * to the company's numbers); the source could not be retrieved.
 */
export function StatsBand({
  eyebrow,
  credentials,
}: {
  eyebrow: string;
  credentials: Credential[];
}) {
  return (
    <section id="credentials" className="relative scroll-mt-20 overflow-hidden bg-navy text-white">
      <div
        className="pointer-events-none absolute -left-40 -top-40 size-[34rem] rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 size-[34rem] rounded-full bg-accent-soft/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:22px_22px] opacity-15"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <h2 className="flex items-center justify-center gap-3 text-eyebrow text-accent-soft">
          <span className="h-px w-8 bg-accent-soft" aria-hidden="true" />
          {eyebrow}
          <span className="h-px w-8 bg-accent-soft" aria-hidden="true" />
        </h2>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10 lg:mt-16 lg:grid-cols-3 lg:gap-y-16">
          {credentials.map((credential, index) => (
            // Two credentials share a label, so the index keeps the keys unique.
            <div
              key={`${credential.label}-${index}`}
              // Column-reverse packs from the bottom; `justify-end` pins the figure to the top so a label that wraps can't push it out of line.
              className="group relative flex flex-col-reverse justify-end gap-4 border-t border-white/15 pt-6 sm:gap-5 sm:pt-8"
            >
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-14 bg-accent-soft transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none"
              />

              {/* Read as "250+ Clients", shown below its figure. */}
              <dt className="flex items-center gap-3 text-base font-semibold text-white sm:text-lg">
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent-soft ring-1 ring-inset ring-white/15 transition-colors duration-300 group-hover:bg-accent group-hover:text-white motion-reduce:transition-none"
                >
                  <credential.icon className="size-4" />
                </span>
                {credential.label}
              </dt>
              <dd className="bg-gradient-to-b from-white to-accent-soft bg-clip-text text-4xl font-bold leading-none tracking-tight text-transparent sm:text-6xl lg:text-7xl">
                <CountUp value={credential.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default StatsBand;
