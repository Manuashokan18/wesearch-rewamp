import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

export type ProcessStep = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
      {steps.map((step, index) => (
        <div key={step.number} className="flex flex-1 items-stretch gap-4">
          <div className="flex flex-1 flex-col rounded-2xl border border-line bg-surface p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-tint text-sm font-semibold text-accent">
              {step.number}
            </span>
            <step.icon className="mt-4 h-6 w-6 text-accent" />
            <h3 className="mt-4 font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm text-subtle">{step.description}</p>
          </div>
          {index < steps.length - 1 && (
            <ArrowRight className="hidden h-5 w-5 shrink-0 self-center text-line sm:block" />
          )}
        </div>
      ))}
    </div>
  );
}

export default ProcessSteps;
