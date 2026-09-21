"use server";

import {
  acceptedResumeExtensions,
  acceptedResumeTypes,
  careersEmail,
  maxResumeBytes,
} from "@/lib/config/site";
import { sendMail } from "@/lib/email";

export type ProfileFormState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level errors keyed by input name. */
  errors?: Record<string, string>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function hasAcceptedExtension(filename: string): boolean {
  const lower = filename.toLowerCase();
  return acceptedResumeExtensions.some((extension) => lower.endsWith(extension));
}

export async function submitProfile(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const firstName = text(formData, "firstName");
  const lastName = text(formData, "lastName");
  const email = text(formData, "email");
  const phone = text(formData, "phone");
  const role = text(formData, "role");
  const resumeLink = text(formData, "resumeLink");
  const message = text(formData, "message");
  // Set by the Apply button on an open position; blank for a general submission.
  const positionId = text(formData, "positionId");
  const positionTitle = text(formData, "positionTitle");

  const errors: Record<string, string> = {};

  if (!firstName) errors.firstName = "First name is required.";
  if (!lastName) errors.lastName = "Last name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";
  if (!phone) errors.phone = "Phone number is required.";
  if (!role) errors.role = "Tell us the role or area you are interested in.";

  const resume = formData.get("resumeFile");
  const hasResume = resume instanceof File && resume.size > 0;

  if (!hasResume) {
    errors.resumeFile = "Attach your resume as a PDF or Word document.";
  } else {
    if (resume.size > maxResumeBytes) {
      errors.resumeFile = `Your resume is larger than ${Math.round(
        maxResumeBytes / (1024 * 1024)
      )}MB. Please upload a smaller file.`;
    }
    // Browsers are inconsistent about the MIME type they report for .doc/.docx,
    // so accept the file when either the type or the extension matches.
    const typeOk = (acceptedResumeTypes as readonly string[]).includes(resume.type);
    if (!typeOk && !hasAcceptedExtension(resume.name)) {
      errors.resumeFile = "Upload a PDF, DOC or DOCX file.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      errors,
    };
  }

  const resumeFile = resume as File;
  const attachment = {
    filename: resumeFile.name || `${firstName}-${lastName}-resume`,
    content: Buffer.from(await resumeFile.arrayBuffer()),
  };

  const appliedFor = positionTitle
    ? `${positionTitle}${positionId ? ` (${positionId})` : ""}`
    : "General profile submission";

  const subject = positionTitle
    ? `Application — ${positionTitle}${positionId ? ` [${positionId}]` : ""} — ${firstName} ${lastName}`
    : `Profile submission — ${firstName} ${lastName}`;

  const body = [
    `Applied for:      ${appliedFor}`,
    `Name:             ${firstName} ${lastName}`,
    `Email:            ${email}`,
    `Phone:            ${phone}`,
    `Role of interest: ${role}`,
    `Resume link:      ${resumeLink || "-"}`,
    "",
    "Message:",
    message || "-",
    "",
    "---",
    `Submitted from the WeSearch website on ${new Date().toISOString()}.`,
    "The candidate's resume is attached.",
  ].join("\n");

  const result = await sendMail({
    to: careersEmail,
    subject,
    text: body,
    replyTo: email,
    attachments: [attachment],
  });

  if (!result.ok) {
    return {
      status: "error",
      message: `We could not submit your profile right now. ${result.reason} Please email us directly at ${careersEmail}.`,
    };
  }

  return {
    status: "success",
    message: positionTitle
      ? `Thank you — your application for ${positionTitle} has been received. Our recruitment team will be in touch.`
      : "Thank you — your profile has been received. Our recruitment team will be in touch about relevant opportunities.",
  };
}
