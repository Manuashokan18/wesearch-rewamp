import type { ReactNode } from "react";

type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  /**
   * `section` is the default for in-page sections. `page` bumps the heading a
   * step for the primary section on a page. `inverse` recolours for dark ground.
   */
  size?: "section" | "page";
  inverse?: boolean;
  children?: ReactNode;
};

/**
 * The single section header used across the site: accent rule + eyebrow,
 * heading, supporting line. Every page uses this so the type scale and
 * rhythm stay identical from Home through to Careers.
 */
export function SectionIntro({
  eyebrow,
  title,
  subtitle,
  center = false,
  size = "section",
  inverse = false,
  children,
}: SectionIntroProps) {
  const headingClass = size === "page" ? "text-section-lg" : "text-section";

  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : ""}>
      {eyebrow && (
        <Eyebrow center={center}>{eyebrow}</Eyebrow>
      )}
      <h2 className={`${headingClass} ${inverse ? "text-white" : "text-ink"}`}>{title}</h2>
      {subtitle && (
        <p
          className={`mt-4 ${inverse ? "text-white/70" : "text-subtle"} ${
            center ? "" : "max-w-2xl"
          }`}
        >
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}

/** Accent rule + uppercase label. Used standalone by the Hero and CTA sections. */
export function Eyebrow({
  children,
  center = false,
  bracketed = false,
}: {
  children: ReactNode;
  center?: boolean;
  bracketed?: boolean;
}) {
  return (
    <p
      className={`mb-4 flex items-center gap-3 text-eyebrow text-accent ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="h-px w-8 bg-accent" />
      {children}
      {bracketed && <span className="h-px w-8 bg-accent" />}
    </p>
  );
}

export default SectionIntro;
