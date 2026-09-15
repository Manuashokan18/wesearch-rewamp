import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Kickstart your career with WeSearch. Submit your profile and our team will reach out about relevant opportunities.",
};

function RequiredLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
      {children}{" "}
      <span aria-hidden="true" className="text-red-500">
        *
      </span>
    </label>
  );
}

export default function CareersPage() {
  return (
    <>
      <Hero
        eyebrow="Careers"
        title="Kickstart Your Career With Us"
        subtitle="We help organizations identify, nurture and retain the right people — submit your profile and our team will reach out when a relevant opportunity comes up."
      />

      <section className="mx-auto max-w-2xl px-6 py-20">
        <h2 className="text-xl font-semibold text-ink">Submit Your Profile</h2>
        <p className="mt-3 text-subtle">
          Share your details below and our recruitment team will get in touch
          about roles matching your background.
        </p>

        <p className="mt-6 text-xs text-subtle">
          Fields marked <span className="text-red-500">*</span> are required.
        </p>

        <form className="mt-4 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <RequiredLabel htmlFor="firstName">First Name</RequiredLabel>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
                placeholder="First name"
              />
            </div>
            <div>
              <RequiredLabel htmlFor="lastName">Last Name</RequiredLabel>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <RequiredLabel htmlFor="email">Email</RequiredLabel>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <RequiredLabel htmlFor="phone">Phone</RequiredLabel>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
              placeholder="Your phone number"
            />
          </div>

          <div>
            <RequiredLabel htmlFor="role">Role / Area of Interest</RequiredLabel>
            <input
              id="role"
              name="role"
              type="text"
              required
              className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
              placeholder="e.g. Backend Engineer, Recruitment, Operations"
            />
          </div>

          <div>
            <RequiredLabel htmlFor="resumeFile">Resume</RequiredLabel>
            <input
              id="resumeLink"
              name="resumeLink"
              type="url"
              aria-label="Resume or LinkedIn link (optional)"
              className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
              placeholder="Link to your resume or LinkedIn profile (optional)"
            />
            <input
              id="resumeFile"
              name="resumeFile"
              type="file"
              accept=".pdf,.doc,.docx"
              required
              className="mt-3 w-full cursor-pointer rounded-xl border border-line px-4 py-3 text-sm text-subtle outline-none focus:border-accent file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-tint file:px-4 file:py-2 file:text-sm file:font-medium file:text-accent hover:file:bg-accent/10"
            />
            <p className="mt-2 text-xs text-subtle">
              Upload a PDF or Word document. Adding a link above is optional.
            </p>
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium text-ink">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
              placeholder="Tell us a bit about yourself"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:bg-accent/90"
          >
            Submit Profile
          </button>
        </form>
      </section>
    </>
  );
}
