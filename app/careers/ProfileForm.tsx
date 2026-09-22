"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Link as LinkIcon, Loader2, UploadCloud } from "lucide-react";
import { controlClasses, Field, fieldControlProps } from "@/components/ui/Field";
import { acceptedResumeExtensions } from "@/lib/config/site";
import { submitProfile, type ProfileFormState } from "./actions";

// Defined here rather than in actions.ts: a "use server" module may only
// export async functions, so a plain object constant cannot live there.
const initialProfileFormState: ProfileFormState = { status: "idle", message: "" };

type ProfileFormProps = {
  /** Pre-fills the form when applying to a specific open position. */
  position?: { id: string; title: string };
  onSubmitted?: () => void;
};

export function ProfileForm({ position, onSubmitted }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    submitProfile,
    initialProfileFormState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const errors = state.errors ?? {};
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      onSubmitted?.();
    }
  }, [state.status, onSubmitted]);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
      >
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
        <div>
          <p className="font-semibold text-ink">Profile received</p>
          <p className="mt-1 text-sm text-subtle">{state.message}</p>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      {position && (
        <>
          <input type="hidden" name="positionId" value={position.id} />
          <input type="hidden" name="positionTitle" value={position.title} />
        </>
      )}

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
          placeholder="you@example.com"
        />
      </Field>

      <Field htmlFor="phone" label="Phone" required error={errors.phone}>
        <input
          {...fieldControlProps("phone", errors.phone)}
          type="tel"
          required
          autoComplete="tel"
          placeholder="Your phone number"
        />
      </Field>

      <Field
        htmlFor="role"
        label={position ? "Role Applied For" : "Role / Area of Interest"}
        required
        error={errors.role}
      >
        <input
          {...fieldControlProps("role", errors.role)}
          type="text"
          required
          defaultValue={position?.title}
          readOnly={Boolean(position)}
          placeholder="e.g. Backend Engineer, Recruitment, Operations"
        />
      </Field>

      <Field
        htmlFor="resumeFile"
        label="Resume"
        required
        error={errors.resumeFile}
        hint="PDF or Word document, up to 5MB. Adding a link above is optional."
      >
        <div className="relative">
          <LinkIcon
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle"
          />
          <input
            {...fieldControlProps("resumeLink", undefined)}
            type="url"
            aria-label="Resume or LinkedIn link (optional)"
            placeholder="Link to your resume or LinkedIn profile (optional)"
            className={`${controlClasses} pl-11`}
          />
        </div>

        <label
          htmlFor="resumeFile"
          className={`mt-3 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2 ${
            errors.resumeFile ? "border-red-400" : "border-line hover:border-accent/50 hover:bg-tint/40"
          }`}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tint text-accent">
            <UploadCloud className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-ink">
              {resumeFileName ?? "Click to upload your resume"}
            </span>
            <span className="block text-xs text-subtle">
              {resumeFileName ? "Selected — click to replace" : "PDF or Word, up to 5MB"}
            </span>
          </span>
          <input
            id="resumeFile"
            name="resumeFile"
            type="file"
            required
            accept={acceptedResumeExtensions.join(",")}
            aria-invalid={errors.resumeFile ? true : undefined}
            aria-describedby={errors.resumeFile ? "resumeFile-error" : undefined}
            onChange={(event) => setResumeFileName(event.target.files?.[0]?.name ?? null)}
            className="sr-only"
          />
        </label>
      </Field>

      <Field htmlFor="message" label="Message">
        <textarea
          {...fieldControlProps("message", undefined)}
          rows={4}
          placeholder="Tell us a bit about yourself"
        />
      </Field>

      {state.status === "error" && !state.errors && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}
      {state.status === "error" && state.errors && (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {pending ? "Submitting…" : position ? "Submit Application" : "Submit Profile"}
        {!pending && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </button>
    </form>
  );
}

export default ProfileForm;
