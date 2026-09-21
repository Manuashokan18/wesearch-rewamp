"use server";

import { contactEmail } from "@/lib/config/site";
import { sendMail } from "@/lib/email";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitEnquiry(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const firstName = text(formData, "firstName");
  const lastName = text(formData, "lastName");
  const email = text(formData, "email");
  const phone = text(formData, "phone");
  const message = text(formData, "message");

  const errors: Record<string, string> = {};

  if (!firstName) errors.firstName = "First name is required.";
  if (!lastName) errors.lastName = "Last name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";
  if (!message) errors.message = "Please tell us how we can help.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      errors,
    };
  }

  const body = [
    `Name:    ${firstName} ${lastName}`,
    `Email:   ${email}`,
    `Phone:   ${phone || "-"}`,
    "",
    "Message:",
    message,
    "",
    "---",
    `Submitted from the WeSearch website on ${new Date().toISOString()}.`,
  ].join("\n");

  const result = await sendMail({
    to: contactEmail,
    subject: `Website enquiry — ${firstName} ${lastName}`,
    text: body,
    replyTo: email,
  });

  if (!result.ok) {
    return {
      status: "error",
      message: `We could not send your message right now. ${result.reason} Please email us directly at ${contactEmail}.`,
    };
  }

  return {
    status: "success",
    message: "Thank you for getting in touch. Our team will get back to you shortly.",
  };
}
