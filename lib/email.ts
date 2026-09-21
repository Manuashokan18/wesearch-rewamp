import { mailFrom } from "@/lib/config/site";

/**
 * Minimal transactional email client.
 *
 * Talks to the Resend REST API over `fetch` so the site needs no mail
 * dependency. When `RESEND_API_KEY` is unset the message is logged instead of
 * sent — that keeps local development working without credentials, but is
 * treated as a failure in production so a misconfigured deploy is visible
 * rather than silently dropping submissions.
 */

export type MailAttachment = {
  filename: string;
  /** Raw file bytes; encoded to base64 before transport. */
  content: Buffer;
};

export type MailMessage = {
  to: string;
  subject: string;
  /** Plain-text body. Rendered as preformatted text in the email. */
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

export type MailResult = { ok: true } | { ok: false; reason: string };

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export async function sendMail(message: MailMessage): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("[email] RESEND_API_KEY is not set — submission was not delivered");
      return { ok: false, reason: "Email delivery is not configured." };
    }

    console.info(
      `[email] RESEND_API_KEY unset; logging instead of sending.\n` +
        `To: ${message.to}\nSubject: ${message.subject}\nReply-To: ${message.replyTo ?? "-"}\n` +
        `Attachments: ${message.attachments?.map((a) => a.filename).join(", ") || "none"}\n\n` +
        message.text
    );
    return { ok: true };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: mailFrom,
        to: [message.to],
        subject: message.subject,
        text: message.text,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
        ...(message.attachments?.length
          ? {
              attachments: message.attachments.map((attachment) => ({
                filename: attachment.filename,
                content: attachment.content.toString("base64"),
              })),
            }
          : {}),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`[email] Provider returned ${response.status}: ${detail}`);
      return { ok: false, reason: "The email provider rejected the message." };
    }

    return { ok: true };
  } catch (error) {
    console.error("[email] Request failed", error);
    return { ok: false, reason: "Could not reach the email provider." };
  }
}
