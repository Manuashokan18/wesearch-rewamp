/**
 * Centralised contact configuration.
 *
 * The careers and contact inboxes are set per-environment so the addresses can
 * change without a code change. `info@wesearchinc.com` is the documented
 * fallback — it is the address already published on the Contact page and in the
 * footer — and stays in place until the centralised IDs are supplied.
 */

const FALLBACK_INBOX = "info@wesearchinc.com";

/** Inbox that receives career profile submissions and role applications. */
export const careersEmail = process.env.CAREERS_EMAIL || FALLBACK_INBOX;

/** Inbox that receives general enquiries from the contact form. */
export const contactEmail = process.env.CONTACT_EMAIL || FALLBACK_INBOX;

/** Address submissions are sent from. Must be on a domain verified with the mail provider. */
export const mailFrom = process.env.MAIL_FROM || "WeSearch Website <noreply@wesearchinc.com>";

/** Public-facing address shown on the site. */
export const publicEmail = FALLBACK_INBOX;

/** Largest resume accepted, in bytes. Keep in sync with `serverActions.bodySizeLimit`. */
export const maxResumeBytes = 5 * 1024 * 1024;

/** Resume file types accepted by the profile upload. */
export const acceptedResumeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const acceptedResumeExtensions = [".pdf", ".doc", ".docx"] as const;
