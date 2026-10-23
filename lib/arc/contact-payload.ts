// ---------------------------------------------------------------------------
// The inquiry payload, shared by the form and the API route.
//
// The prototype's form was mocked (`// MOCK: replace with POST /api/contact
// (extended payload). See handoff.`) and collected six fields the endpoint
// did not accept. This is that contract, in one place, so the client and the
// server cannot disagree about field names or caps.
// ---------------------------------------------------------------------------

/** Server-side caps. The client can be bypassed, so the route clamps again. */
export const INQUIRY_LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  role: 120,
  size: 60,
  budget: 60,
  timeline: 60,
  stage: 200,
  topic: 80,
  type: 40,
  message: 5000,
  technical: 3000,
} as const;

export type InquiryField = keyof typeof INQUIRY_LIMITS;

export type InquiryPayload = {
  type: string;
  name: string;
  email: string;
  company: string;
  role: string;
  size: string;
  budget: string;
  timeline: string;
  message: string;
  technical: string;
  /** Honeypot. The prototype already matched the existing field name. */
  company_website: string;
};

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

/**
 * Fields that become a single line of the notification email, including the
 * subject. A newline inside one of these would split the line, so control
 * characters are stripped rather than trimmed. `message` and `technical` are
 * the message body and keep their line breaks.
 */
const SINGLE_LINE: ReadonlySet<InquiryField> = new Set([
  "name",
  "email",
  "company",
  "role",
  "size",
  "budget",
  "timeline",
  "stage",
  "topic",
  "type",
]);

// Control characters, including CR and LF, but not ordinary whitespace.
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/g;

export function clampField(value: string | undefined, field: InquiryField): string {
  const raw = value ?? "";
  const cleaned = SINGLE_LINE.has(field)
    ? raw.replace(CONTROL_CHARS, " ")
    : // Keep newlines in the body, drop the rest.
      raw.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "");
  return cleaned.trim().slice(0, INQUIRY_LIMITS[field]);
}

/** The minimum message length the form asks for, mirrored on the server. */
export const MIN_MESSAGE_LENGTH = 20;

export type InquiryErrors = Partial<Record<keyof InquiryPayload, string>>;

/**
 * Validation for one step of the form. Exported so it can be unit-tested
 * without rendering anything.
 */
export function validateInquiryStep(step: number, data: InquiryPayload): InquiryErrors {
  const errors: InquiryErrors = {};

  if (step === 0 && !data.type) {
    errors.type = "Choose the closest match. “Something else” is fine.";
  }

  if (step === 1) {
    if (!data.name.trim()) errors.name = "Enter your name.";
    if (!data.email.trim()) errors.email = "Enter your work email.";
    else if (!isValidEmail(data.email))
      errors.email = "That email doesn’t look right. Check for typos.";
    if (!data.company.trim()) errors.company = "Enter your company name.";
  }

  if (step === 2) {
    if (!data.budget) errors.budget = "Choose a range, or “Not sure yet”.";
    if (!data.timeline) errors.timeline = "Choose a timeline.";
    if (data.message.trim().length < MIN_MESSAGE_LENGTH) {
      errors.message = `A sentence or two about what’s happening (${MIN_MESSAGE_LENGTH} characters minimum).`;
    }
  }

  return errors;
}

export const INQUIRY_STEPS = ["Project", "You and your company", "Scope"] as const;

export const LAST_STEP = INQUIRY_STEPS.length - 1;
