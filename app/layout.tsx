import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

/**
 * Red Hat Display is the single typeface across the site — headings, body copy
 * and interface alike — so every section reads as one family. The headings take
 * its heavier weights through the type-scale utilities in globals.css. The one
 * deliberate exception is the handwritten Caveat note in `Annotation`.
 */
const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WeSearch | Workforce & Recruitment Solutions",
    template: "%s | WeSearch",
  },
  description:
    "WeSearch helps organizations build, scale and manage their workforce through structured recruitment, staffing and workforce solutions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${redHatDisplay.variable} h-full antialiased`}
    >
      <head>
        {/*
         * `AnimatedContainer` server-renders its scroll-reveal sections at
         * their pre-animation (invisible) state and relies on client-side JS
         * to reveal them. Without scripting that reveal never runs, so this
         * forces every `data-reveal` element to its final, visible state
         * instead of leaving real content permanently hidden.
         */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-surface text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
