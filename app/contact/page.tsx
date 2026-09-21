import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ArrowUpRight, Asterisk, Mail, Phone } from "lucide-react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { DotGridBackground } from "@/components/ui/dot-grid-background";
import { contactEmail } from "@/lib/config/site";
import { ContactForm } from "./ContactForm";
import {
  AlappuzhaIllustration,
  DubaiIllustration,
  ErnakulamIllustration,
} from "./OfficeIllustrations";

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
    Illustration: DubaiIllustration,
    tile: "bg-[#e3edff]",
  },
  {
    label: "Ernakulam, Kerala",
    address:
      "We Search Info Solutions Pvt Ltd, C-810-4(4), 2nd Floor, Architects Chamber, M G Road, Ravipuram, Ernakulam, Kerala, India — 682016",
    Illustration: ErnakulamIllustration,
    tile: "bg-[#ebe9ff]",
  },
  {
    label: "Alappuzha, Kerala",
    address:
      "We Search Info Solutions Pvt Ltd, 10/128-J Hilwana Building, near SD College, Kalarcode, Sanathanapuram PO, Alappuzha 688003, Kerala, India",
    Illustration: AlappuzhaIllustration,
    tile: "bg-[#dcf0fd]",
  },
];

/**
 * The blue glow behind the Interactive Dot Grid Hero preview on 21st.dev: one
 * broad royal-blue radial with two lighter sky-blue lobes either side, glowing
 * up out of the dark. The colour stops are theirs; the base is re-set on the
 * brand navy and the radii are stretched to suit a taller section.
 */
const glowBackground: CSSProperties = {
  backgroundColor: "#0a1230",
  backgroundImage: [
    "radial-gradient(60% 55% at 50% 62%, oklch(0.55 0.24 264 / 0.5), transparent 78%)",
    "radial-gradient(38% 44% at 62% 54%, oklch(0.75 0.12 230 / 0.3), transparent 76%)",
    "radial-gradient(34% 40% at 38% 54%, oklch(0.7 0.15 245 / 0.26), transparent 76%)",
  ].join(", "),
};

/** Opens the address in Google Maps' search, which resolves a free-text address. */
function mapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

/** Staggers the load-in of the first screen; the `hero-rise` keyframes are in globals.css. */
function rise(step: number) {
  return { animationDelay: `${step * 80}ms` };
}

export default function ContactPage() {
  return (
    <>
      {/*
        One blue, dotted backdrop behind the enquiry form and the offices
        heading, so the first screen is the form itself. The office cards
        (below) straddle this region's lower edge: the row is pulled up by the
        height of a card's picture plus its padding (h-32 + p-5 = 9.25rem), so
        the blue ends level with the pictures.
      */}
      <div className="relative isolate overflow-hidden text-white" style={glowBackground}>
        <DotGridBackground />

        <section className="relative">
          {/*
            On large screens the intro and contact details sit in the two middle
            rows and the form spans all four, so the left column is centred
            against the card instead of leaving a void beneath it. In the source
            order (intro, form, details) a phone reads them in that sequence.
          */}
          <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-8 px-6 pb-8 pt-8 lg:grid-cols-[5fr_7fr] lg:grid-rows-[1fr_auto_auto_1fr]">
            <div className="lg:col-start-1 lg:row-start-2">
              <span
                className="hero-rise inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white"
                style={rise(0)}
              >
                <Asterisk className="size-3.5 text-accent-soft" aria-hidden="true" />
                Contact
              </span>

              <h1 className="hero-rise mt-5 text-section-lg" style={rise(1)}>
                Contact Information
              </h1>
              <p className="hero-rise mt-4 max-w-md text-white/75" style={rise(2)}>
                Please let us know if you have a question, or would like further information about
                our services and products.
              </p>
            </div>

            <div
              className="hero-rise rounded-3xl bg-white p-6 text-ink shadow-[0_30px_60px_-30px_rgba(3,8,30,0.75)] sm:p-7 lg:col-start-2 lg:row-span-4 lg:row-start-1"
              style={rise(3)}
            >
              {/* From `sm` up the required-fields note shares the heading's line. */}
              <div className="grid sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-4">
                <h2 className="text-section text-ink">Get in Touch</h2>
                <p className="mt-1.5 text-subtle sm:col-span-2 sm:row-start-2">
                  Share a few details and our team will get back to you.
                </p>
                <p className="mt-2 text-xs text-subtle sm:col-start-2 sm:row-start-1 sm:mt-0">
                  Fields marked <span className="text-red-500">*</span> are required.
                </p>
              </div>

              <ContactForm />
            </div>

            <div className="lg:col-start-1 lg:row-start-3">
              <h2 className="text-subsection">Reach Us Directly</h2>
              <dl className="mt-4 max-w-md divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4 p-4">
                  <dt className="flex items-center gap-3 text-sm font-medium text-white">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-soft">
                      <Mail className="size-5" aria-hidden="true" />
                    </span>
                    Email
                  </dt>
                  <dd className="min-w-0 break-words text-right text-sm text-white/75">
                    <a href={`mailto:${contactEmail}`} className="hover:text-white">
                      {contactEmail}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 p-4">
                  <dt className="flex items-center gap-3 text-sm font-medium text-white">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-soft">
                      <Phone className="size-5" aria-hidden="true" />
                    </span>
                    Phone
                  </dt>
                  <dd className="text-right text-sm text-white/75">+91 484 2952111</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <div className="relative pb-44 pt-5">
          <h2 id="offices-heading" className="px-6 text-center text-section">
            Our Offices
          </h2>
        </div>
      </div>

      {/* White underneath: the footer's rounded top corners show the page colour. */}
      <section className="flow-root bg-white pb-12 sm:pb-14">
        <ul
          aria-labelledby="offices-heading"
          className="relative mx-auto -mt-[9.25rem] grid max-w-6xl gap-6 px-6 md:grid-cols-3"
        >
          {offices.map((office, index) => (
            <li key={office.label}>
              <AnimatedContainer delay={index * 0.12} className="h-full">
                <article className="group flex h-full flex-col rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(11,22,56,0.05),0_20px_40px_-20px_rgba(11,22,56,0.25)] ring-1 ring-line/80 transition duration-300 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(11,22,56,0.05),0_28px_48px_-20px_rgba(11,22,56,0.32)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <div
                    className={`flex h-32 items-center justify-center overflow-hidden rounded-xl ${office.tile}`}
                    aria-hidden="true"
                  >
                    <office.Illustration className="h-24 w-auto text-ink transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                  </div>

                  <h3 className="mt-5 text-card text-ink">{office.label}</h3>

                  <div className="mt-4 flex-1 border-t border-line pt-4">
                    <address className="text-sm not-italic leading-relaxed text-subtle">
                      {office.address}
                    </address>
                  </div>

                  <a
                    href={mapsUrl(office.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl border border-ink px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-transparent hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    View Location
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                    <span className="sr-only">
                      {" "}
                      for {office.label} on Google Maps (opens in a new tab)
                    </span>
                  </a>
                </article>
              </AnimatedContainer>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
