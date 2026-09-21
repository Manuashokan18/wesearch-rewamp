import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge reads any unknown `text-*` class as a colour, so without this
 * `cn("text-card text-white")` would silently drop `text-card`. Registering the
 * type-scale utilities from globals.css as font sizes keeps both.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["hero", "section-lg", "section", "subsection", "card", "eyebrow"] },
      ],
    },
  },
});

/** Joins class names, letting later Tailwind classes override earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
