import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";

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
          <h2 className="text-xl font-semibold text-ink">Get in Touch</h2>
          <p className="mt-3 text-subtle">
            Share a few details and our team will get back to you.
          </p>

          <form className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="text-sm font-medium text-ink">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
                  placeholder="First name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="text-sm font-medium text-ink">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium text-ink">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
                placeholder="Your phone number"
              />
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
                placeholder="Tell us about your workforce needs"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:bg-accent/90"
            >
              Send Message
            </button>
            <p className="text-xs text-subtle">
              This form is a placeholder — submissions are not yet connected to a backend.
            </p>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-ink">Reach Us Directly</h2>
          <dl className="mt-6 space-y-6 text-sm">
            <div>
              <dt className="font-medium text-ink">Email</dt>
              <dd className="mt-1 text-subtle">info@wesearchinc.com</dd>
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
