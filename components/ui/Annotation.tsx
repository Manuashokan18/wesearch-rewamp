import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["600"] });

type AnnotationProps = {
  text: string;
  className?: string;
};

export function Annotation({ text, className = "" }: AnnotationProps) {
  return (
    <div className={`pointer-events-none select-none text-right ${className}`}>
      <p
        className={`${caveat.className} whitespace-pre-line text-2xl leading-[1.15] text-ink sm:text-3xl`}
      >
        {text}
      </p>
      <svg viewBox="0 0 160 20" className="ml-auto mt-1 h-4 w-32 text-accent" fill="none">
        <path
          d="M2 14C30 4 50 18 80 8C110 -2 130 14 158 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default Annotation;
