import type { ReactNode } from "react";

/**
 * Line illustrations for the three office cards — one landmark per city, drawn
 * in the navy-on-tint style of the contact reference. Everything strokes with
 * `currentColor`, so the card sets the ink; blue accents sit in a `text-accent`
 * group. Decorative only: the office name in the card carries the meaning.
 */
type IllustrationProps = { className?: string };

function Frame({ className, children }: IllustrationProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 160 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

/** A four-point cross, echoing the small sparkles around the reference's icons. */
function Sparkle({ x, y, size = 4 }: { x: number; y: number; size?: number }) {
  return <path d={`M${x} ${y - size}V${y + size}M${x - size} ${y}H${x + size}`} strokeWidth={2} />;
}

/** Dubai — the Burj Khalifa between two towers. */
export function DubaiIllustration({ className }: IllustrationProps) {
  return (
    <Frame className={className}>
      <circle cx="80" cy="52" r="30" fill="currentColor" stroke="none" className="text-accent/15" />

      <path d="M10 90H150" />

      {/* Flanking towers */}
      <path d="M30 90V60H56V90" fill="#fff" fillOpacity={0.6} />
      <path d="M104 90V52L130 43V90" fill="#fff" fillOpacity={0.6} />
      <g className="text-accent">
        <path d="M38 68H48M38 76H48M38 84H48" />
        <path d="M112 62H122M112 71H122M112 80H122" />
      </g>

      {/* Burj Khalifa: stepped setbacks up to a single spire */}
      <path
        d="M68 90V74H72V58H75V42H78V28H79V12L80 3L81 12V28H82V42H85V58H88V74H92V90Z"
        fill="currentColor"
      />
      <path d="M80 24V86" stroke="#fff" strokeOpacity={0.45} strokeWidth={1.5} />

      <Sparkle x={20} y={30} />
      <Sparkle x={138} y={24} size={3.5} />
      <circle cx="112" cy="16" r="1.6" fill="currentColor" stroke="none" />
    </Frame>
  );
}

/** Ernakulam — a Chinese fishing net, the cantilevered nets of the Kochi waterfront. */
export function ErnakulamIllustration({ className }: IllustrationProps) {
  return (
    <Frame className={className}>
      {/* Water */}
      <path
        className="text-accent"
        d="M8 88q7-5 14 0t14 0t14 0t14 0t14 0t14 0t14 0t14 0t14 0t14 0"
      />

      {/* Landing stage */}
      <rect x="14" y="74" width="64" height="7" rx="2" fill="currentColor" />
      <path d="M22 81V88M70 81V88" />

      {/* A-frame and boom */}
      <path d="M40 74L56 37L72 74" />
      <path d="M47 58H65" />
      <path d="M20 46L124 20" />

      {/* Counterweight */}
      <path d="M22 45.5V64" />
      <rect x="16" y="64" width="12" height="9" rx="3" fill="currentColor" />

      {/* The net, hung from the boom's tip */}
      <path d="M124 20L106 46M124 20L142 46" />
      <g className="text-accent">
        <path d="M106 46H142V72H106Z" fill="#fff" fillOpacity={0.55} />
        <path d="M106 46L142 72M142 46L106 72M124 46V72M106 59H142" strokeWidth={1.8} />
      </g>

      <Sparkle x={92} y={10} />
      <circle cx="30" cy="24" r="1.6" fill="currentColor" stroke="none" />
    </Frame>
  );
}

/** Alappuzha — a kettuvallam houseboat on the backwaters, with a palm on the bank. */
export function AlappuzhaIllustration({ className }: IllustrationProps) {
  return (
    <Frame className={className}>
      {/* Water */}
      <path className="text-accent" d="M6 89q7-5 14 0t14 0t14 0t14 0t14 0t14 0t14 0t14 0" />
      <path className="text-accent" d="M28 96q7-5 14 0t14 0t14 0t14 0" strokeOpacity={0.55} />

      {/* Hull */}
      <path d="M12 58L20 64H120L128 58Q124 80 100 80H40Q16 80 12 58Z" fill="currentColor" />

      {/* Cabin */}
      <rect x="28" y="46" width="84" height="18" rx="2" fill="#fff" fillOpacity={0.7} />
      <g className="text-accent" stroke="none" fill="currentColor">
        <rect x="35" y="52" width="10" height="8" rx="1.5" />
        <rect x="55" y="52" width="10" height="8" rx="1.5" />
        <rect x="75" y="52" width="10" height="8" rx="1.5" />
        <rect x="95" y="52" width="10" height="8" rx="1.5" />
      </g>

      {/* Thatched roof */}
      <path d="M22 46Q22 24 48 24H92Q118 24 118 46Z" fill="currentColor" />
      <path
        d="M42 30V44M56 28V44M70 28V44M84 28V44M98 30V44"
        stroke="#fff"
        strokeOpacity={0.35}
        strokeWidth={1.6}
      />

      {/* Pennant at the prow */}
      <path d="M18 60V34" />
      <path d="M18 34L5 39L18 44Z" className="text-accent" fill="currentColor" strokeWidth={1.5} />

      {/* Palm on the bank */}
      <path d="M130 84Q142 74 158 78V84Z" fill="currentColor" />
      <path d="M146 80Q148 60 142 40" />
      <path d="M142 40Q130 32 120 38M142 40Q134 26 122 26M142 40Q144 24 136 14M142 40Q154 28 152 18M142 40Q154 38 158 46" />

      <Sparkle x={70} y={12} size={3.5} />
    </Frame>
  );
}
