import Image from "next/image";

type MarqueeLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type LogoMarqueeProps = {
  logos: MarqueeLogo[];
  /** Knock the logos back to white silhouettes for use on the navy ground. */
  invert?: boolean;
};

/** Fades the row out at both edges rather than cutting it off mid-logo. */
const EDGE_FADE =
  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";

/**
 * An endlessly scrolling row of client logos.
 *
 * Adapted from the marquee on the Streben site. Driven by a CSS keyframe
 * rather than an animation library, so it stays a Server Component and costs
 * no client JavaScript. The row is rendered twice — the second copy is hidden
 * from assistive tech so the names are not announced twice.
 */
export function LogoMarquee({ logos, invert = true }: LogoMarqueeProps) {
  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
    >
      <div className="logo-marquee flex w-max">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-16 pr-16 sm:gap-24 sm:pr-24"
          >
            {logos.map((logo) => (
              <li key={logo.alt} className="flex items-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`h-10 w-auto object-contain opacity-70 transition-opacity hover:opacity-100 sm:h-14 ${
                    invert ? "brightness-0 invert" : ""
                  }`}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default LogoMarquee;
