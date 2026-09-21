import type { ReactNode } from "react";

const controlClasses =
  "mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none transition-colors focus:border-accent";

type FieldProps = {
  htmlFor: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
};

/** Label + control + error wrapper shared by every form on the site. */
export function Field({
  htmlFor,
  label,
  required = false,
  error,
  hint,
  children,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {required && (
          <>
            {" "}
            <span aria-hidden="true" className="text-red-500">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      {children}
      {hint && !error && <p className="mt-2 text-xs text-subtle">{hint}</p>}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/** Shared input styling. Adds the error ring and wires up aria-describedby. */
export function fieldControlProps(id: string, error?: string) {
  return {
    id,
    name: id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: `${controlClasses} ${error ? "border-red-400" : ""}`,
  };
}

export { controlClasses };
