import { cn } from "@/lib/utils";
import type { Credential } from "@/lib/data/company";

/**
 * How many times the row is laid end to end. The loop shifts by exactly one
 * copy (`-100 / COPIES` percent, see `credential-scroll` in globals.css), so
 * these two numbers must move together. Four copies keep the track wider than
 * the screen at any size, so no gap opens at the end of a cycle.
 */
const COPIES = 4;

/**
 * An endlessly scrolling row of credential cards, for a navy band.
 *
 * After serafimcloud's "Testimonials with Marquee" on 21st.dev (itself after
 * Launch UI): one row of soft cards on a slow linear loop, each with a round
 * chip and a name at the top and its content below, a hairline along the top
 * edge over a faint vertical gradient fill, wide fades at both ends, and a
 * pause while the pointer is over it. The source could not be retrieved (the
 * free code quota was spent), so this is built to the measurements of its live
 * preview — 320px cards, a 16px gap, a 40s linear cycle — rather than from its
 * code. The chip carries each credential's icon where the source has an
 * avatar, the label sits where the name does, and the figure takes the place
 * of the quote, set very large since the numbers are the point.
 *
 * Like `LogoMarquee` it is a plain CSS loop (`credential-ticker` in
 * globals.css), so it stays a Server Component. Every copy after the first is
 * hidden from assistive tech so the figures are not read out more than once,
 * and each card is DOM-ordered figure then label, so it reads as "250+
 * Clients". Under reduced motion nothing scrolls: the extra copies go, the
 * edge fade goes, and the cards wrap into a static, centred row.
 */
export function CredentialTicker({
  credentials,
  className,
}: {
  credentials: Credential[];
  className?: string;
}) {
  return (
    // `credential-fade` softens both ends: narrow on a phone, wide from a laptop up, as in the source.
    <div className={cn("credential-fade overflow-hidden py-2 motion-reduce:overflow-visible", className)}>
      <div className="credential-ticker flex w-max motion-reduce:w-full motion-reduce:justify-center">
        {Array.from({ length: COPIES }, (_, copy) => (
          <ul
            key={copy}
            aria-hidden={copy > 0}
            className={cn(
              "flex shrink-0 gap-4 pr-4",
              // Static: the one visible copy may shrink to the screen and wrap its cards.
              "motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-6",
              copy > 0 && "motion-reduce:hidden"
            )}
          >
            {credentials.map((credential) => (
              <li key={credential.label} className="w-72 shrink-0 sm:w-80">
                <div className="group flex h-full flex-col-reverse rounded-2xl border border-white/[0.06] border-t-white/25 bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-5 transition-colors duration-300 hover:from-white/[0.14] hover:to-white/[0.04] motion-reduce:transition-none">
                  {/* Shown below the header; first in the DOM so it reads "250+ Clients". */}
                  <p className="mt-4 bg-gradient-to-b from-white to-accent-soft bg-clip-text text-5xl font-bold leading-none tracking-tight text-transparent sm:text-6xl">
                    {credential.value}
                  </p>

                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-soft text-white shadow-lg shadow-accent/30 ring-1 ring-inset ring-white/25 transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    >
                      <credential.icon className="size-5" />
                    </span>
                    <p className="text-lg font-semibold text-white">{credential.label}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default CredentialTicker;
