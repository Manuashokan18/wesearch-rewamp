"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Field, fieldControlProps } from "@/components/ui/Field";
import { submitEnquiry, type ContactFormState } from "./actions";

// Defined here rather than in actions.ts: a "use server" module may only
// export async functions, so a plain object constant cannot live there.
const initialContactFormState: ContactFormState = { status: "idle", message: "" };

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
        className="mt-8 flex items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
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
    <form action={formAction} className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field htmlFor="firstName" label="First Name" required error={errors.firstName}>
          <input
            {...fieldControlProps("firstName", errors.firstName)}
            type="text"
            required
            autoComplete="given-name"
            placeholder="First name"
          />
        </Field>
        <Field htmlFor="lastName" label="Last Name" required error={errors.lastName}>
          <input
            {...fieldControlProps("lastName", errors.lastName)}
            type="text"
            required
            autoComplete="family-name"
            placeholder="Last name"
          />
        </Field>
      </div>

      <Field htmlFor="email" label="Email" required error={errors.email}>
        <input
          {...fieldControlProps("email", errors.email)}
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
        />
      </Field>

      <Field htmlFor="phone" label="Phone">
        <input
          {...fieldControlProps("phone", undefined)}
          type="tel"
          autoComplete="tel"
          placeholder="Your phone number"
        />
      </Field>

      <Field htmlFor="message" label="Message" required error={errors.message}>
        <textarea
          {...fieldControlProps("message", errors.message)}
          rows={4}
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
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

export default ContactForm;
