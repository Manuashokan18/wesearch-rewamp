"use client";

import { useActionState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Field, fieldControlProps } from "@/components/ui/Field";
import { cn } from "@/lib/utils";
import { submitEnquiry, type ContactFormState } from "./actions";

// Defined here rather than in actions.ts: a "use server" module may only
// export async functions, so a plain object constant cannot live there.
const initialContactFormState: ContactFormState = { status: "idle", message: "" };

/**
 * The shared id/name/aria wiring from `fieldControlProps`, with this form's own
 * look on top: softly tinted inputs that turn white on focus, set on the white
 * form card. Kept local so the Careers form, which shares `Field`, is untouched.
 */
function controlProps(id: string, error?: string) {
  return {
    ...fieldControlProps(id, error),
    className: cn(
      "mt-2 w-full rounded-xl border border-line bg-muted/60 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-subtle/70 hover:border-ink/25 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15",
      error && "border-red-400 hover:border-red-400 focus:border-red-500 focus:ring-red-500/15"
    ),
  };
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    initialContactFormState
  );
  const errors = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="mt-5 flex items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
      >
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
        <div>
          <p className="font-semibold text-ink">Message sent</p>
          <p className="mt-1 text-sm text-subtle">{state.message}</p>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-5 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field htmlFor="firstName" label="First Name" required error={errors.firstName}>
          <input
            {...controlProps("firstName", errors.firstName)}
            type="text"
            required
            autoComplete="given-name"
            placeholder="First name"
          />
        </Field>
        <Field htmlFor="lastName" label="Last Name" required error={errors.lastName}>
          <input
            {...controlProps("lastName", errors.lastName)}
            type="text"
            required
            autoComplete="family-name"
            placeholder="Last name"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field htmlFor="email" label="Email" required error={errors.email}>
          <input
            {...controlProps("email", errors.email)}
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
          />
        </Field>
        <Field htmlFor="phone" label="Phone">
          <input
            {...controlProps("phone", undefined)}
            type="tel"
            autoComplete="tel"
            placeholder="Your phone number"
          />
        </Field>
      </div>

      <Field htmlFor="message" label="Message" required error={errors.message}>
        <textarea
          {...controlProps("message", errors.message)}
          rows={3}
          required
          placeholder="Tell us about your workforce needs"
        />
      </Field>

      {state.status === "error" && (
        <p
          role="alert"
          className={
            state.errors
              ? "text-sm text-red-600"
              : "rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
          }
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? "Sending…" : "Send Message"}
        {!pending && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </button>
    </form>
  );
}

export default ContactForm;
