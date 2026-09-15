import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How WeSearch collects, uses and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Hero eyebrow="Legal" title="Privacy Policy" />
      <section className="mx-auto max-w-3xl px-6 py-16 text-subtle">
        <p>
          This page is a placeholder. WeSearch&apos;s full privacy policy —
          covering what information we collect, how it is used, and how it is
          protected — will be published here.
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
