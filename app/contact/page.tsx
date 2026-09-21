import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { contactEmail } from "@/lib/config/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with WeSearch. Please let us know if you have a question, or would like further information about our services and products.",
};

const offices = [
  {
    label: "Dubai, UAE",
    address:
      "WE SEARCH CONSULTANCY LLC, Office FF-21, Al Sayegh Building, Commercial, Plot No. 125-0, PO Box 33163, Port Saeed, Deira, Dubai — UAE",
  },
  {
    label: "Ernakulam, Kerala",
    address:
      "We Search Info Solutions Pvt Ltd, C-810-4(4), 2nd Floor, Architects Chamber, M G Road, Ravipuram, Ernakulam, Kerala, India — 682016",
  },
  {
    label: "Alappuzha, Kerala",
    address:
      "We Search Info Solutions Pvt Ltd, 10/128-J Hilwana Building, near SD College, Kalarcode, Sanathanapuram PO, Alappuzha 688003, Kerala, India",
  },
];

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Contact"
        title="Contact Information"
        subtitle="Please let us know if you have a question, or would like further information about our services and products."
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-subsection text-ink">Get in Touch</h2>
          <p className="mt-3 text-subtle">
            Share a few details and our team will get back to you.
          </p>
          <p className="mt-6 text-xs text-subtle">
            Fields marked <span className="text-red-500">*</span> are required.
          </p>

          <ContactForm />
        </div>

        <div>
          <h2 className="text-subsection text-ink">Reach Us Directly</h2>
          <dl className="mt-6 space-y-6 text-sm">
            <div>
              <dt className="font-medium text-ink">Email</dt>
              <dd className="mt-1 text-subtle">
                <a href={`mailto:${contactEmail}`} className="hover:text-accent">
                  {contactEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-ink">Phone</dt>
              <dd className="mt-1 text-subtle">+91 484 2952111</dd>
            </div>
          </dl>

          <h3 className="mt-10 text-sm font-semibold uppercase tracking-wide text-subtle">
            Our Offices
          </h3>
          <div className="mt-4 space-y-6">
            {offices.map((office) => (
              <div key={office.label}>
                <p className="font-medium text-ink">{office.label}</p>
                <p className="mt-1 text-sm text-subtle">{office.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
