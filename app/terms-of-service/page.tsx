import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the WeSearch website and services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <Hero eyebrow="Legal" title="Terms of Service" />
      <section className="mx-auto max-w-3xl px-6 py-16 text-subtle">
        <p>
          This page is a placeholder. WeSearch&apos;s full terms of service —
          covering use of this website and our recruitment and staffing
          services — will be published here.
        </p>
        <p className="mt-4">
          For questions in the meantime, contact us at{" "}
          <a href="mailto:info@wesearchinc.com" className="text-accent hover:underline">
            info@wesearchinc.com
          </a>
          .
        </p>
      </section>
    </>
  );
}
