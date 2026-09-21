import { Fragment } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type EcosystemLayer = { icon: LucideIcon; label: string; highlight?: boolean };

type EcosystemDiagramProps = {
  /** The stakeholders in flow order, top to bottom. One of them is the highlighted hub. */
  layers: EcosystemLayer[];
  /** Drawn around the highlighted layer, inside its frame. */
  pillars: string[];
  className?: string;
};

/**
 * The stakeholder flow as a diagram: business, the MSP hub, suppliers, talent,
 * joined by connectors with a bead of light running down each, and the
 * governance pillars gathered around the hub.
 *
 * Takes its cue from the Animated Beam on 21st.dev (dillionverma / Magic UI):
 * nodes on a dark dotted field with a travelling light along each link. That
 * component measures node positions in the browser to draw curved SVG beams;
 * this layout is a fixed vertical stack, so the beam is a CSS-animated
 * gradient on a plain line (`flow-dot` in globals.css) and the whole thing
 * stays a Server Component. Reduced motion leaves the static connectors.
 */
export function EcosystemDiagram({ layers, pillars, className }: EcosystemDiagramProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-3xl bg-navy p-6 text-white shadow-2xl shadow-navy/20 sm:p-10",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:22px_22px] opacity-15"
      />
      <div
        aria-hidden="true"
        className="absolute -top-28 left-1/2 -z-10 size-80 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl"
      />

      <ol className="mx-auto flex max-w-md flex-col items-stretch">
        {layers.map((layer, index) => (
          <Fragment key={layer.label}>
            {layer.highlight ? (
              <li className="rounded-2xl bg-accent p-5 shadow-xl shadow-accent/30 ring-1 ring-inset ring-white/25 sm:p-6">
                <div className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white ring-1 ring-inset ring-white/30">
                    <layer.icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="text-subsection text-white">{layer.label}</span>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2 border-t border-white/20 pt-5">
                  {pillars.map((pillar) => (
                    <li
                      key={pillar}
                      className="rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium text-white ring-1 ring-inset ring-white/20"
                    >
                      {pillar}
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-sm">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-soft ring-1 ring-inset ring-white/15">
                  <layer.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-semibold text-white">{layer.label}</span>
              </li>
            )}

            {index < layers.length - 1 && (
              <li aria-hidden="true" className="relative mx-auto flex h-14 w-px flex-col items-center">
                <span className="relative h-full w-px overflow-hidden bg-white/15">
                  <span className="flow-dot absolute left-0 top-0 h-5 w-px bg-gradient-to-b from-transparent via-accent-soft to-transparent" />
                </span>
                <ChevronDown className="absolute -bottom-1 size-4 text-white/40" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </div>
  );
}

export default EcosystemDiagram;
