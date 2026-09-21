import { Eyebrow } from "@/components/sections/SectionIntro";
import { cn } from "@/lib/utils";

export const pad = (n: number) => String(n).padStart(2, "0");

/** An accent dot grid, as in the corners of the Services and Products pages. */
export const dots =
  "pointer-events-none absolute bg-[radial-gradient(var(--color-accent)_1.2px,transparent_1.6px)] [background-size:14px_14px] opacity-35";

/** The Unsplash photograph `id`, sized at source so the optimiser starts small. */
export const unsplash = (id: string, width = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

/** The centred section header used down the Services pages: bracketed eyebrow, heading, supporting line. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  inverse?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {inverse ? (
        <p className="mb-4 flex items-center justify-center gap-3 text-eyebrow text-accent-soft">
          <span className="h-px w-8 bg-accent-soft" aria-hidden="true" />
          {eyebrow}
          <span className="h-px w-8 bg-accent-soft" aria-hidden="true" />
        </p>
      ) : (
        <Eyebrow center bracketed>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className={cn("text-section-lg", inverse ? "text-white" : "text-ink")}>{title}</h2>
      {subtitle && (
        <p className={cn("mx-auto mt-4", inverse ? "text-white/70" : "text-subtle")}>{subtitle}</p>
      )}
    </div>
  );
}
