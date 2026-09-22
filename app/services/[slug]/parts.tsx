import { Eyebrow } from "@/components/sections/SectionIntro";
import { AnimatedContainer } from "@/components/ui/animated-container";

export const pad = (n: number) => String(n).padStart(2, "0");

/** An accent dot grid, as in the corners of the home page's service stack. */
export const dots =
  "pointer-events-none absolute bg-[radial-gradient(var(--color-accent)_1.2px,transparent_1.6px)] [background-size:14px_14px] opacity-35";

/** Sets the trailing `highlight` of a heading in the accent colour. */
export function Highlighted({
  text,
  highlight,
  className = "text-accent",
}: {
  text: string;
  highlight?: string;
  className?: string;
}) {
  if (!highlight || !text.endsWith(highlight)) return text;
  const split = text.length - highlight.length;
  return (
    <>
      {text.slice(0, split)}
      <span className={className}>{highlight}</span>
    </>
  );
}

/** The centred section header used down the page: bracketed eyebrow, heading, supporting line. */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle: string;
}) {
  return (
    <AnimatedContainer className="mx-auto max-w-2xl text-center">
      <Eyebrow center bracketed>
        {eyebrow}
      </Eyebrow>
      <h2 className="text-section-lg text-ink">
        <Highlighted text={title} highlight={highlight} />
      </h2>
      <p className="mx-auto mt-4 text-subtle">{subtitle}</p>
    </AnimatedContainer>
  );
}
