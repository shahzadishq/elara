/**
 * Shared validation for the appointment enquiry form.
 * Used on the client for instant feedback and on the server as the source of truth.
 */

export const PREFERENCES = ["", "vormittags", "nachmittags", "abends", "wochenende"] as const;
export const MESSAGE_MAX = 500;

export type ContactMethod = "email" | "phone";

export type EnquiryInput = {
  name: string;
  contactMethod: ContactMethod;
  email: string;
  phone: string;
  preference: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 ()/\-]{6,24}$/;

function str(v: unknown, max = 1000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function normalizeEnquiry(raw: Record<string, unknown>): EnquiryInput {
  const contactMethod = raw.contactMethod === "phone" ? "phone" : "email";
  return {
    name: str(raw.name, 120),
    contactMethod,
    email: contactMethod === "email" ? str(raw.email, 200) : "",
    phone: contactMethod === "phone" ? str(raw.phone, 40) : "",
    preference: str(raw.preference, 30),
    message: str(raw.message, MESSAGE_MAX + 50),
  };
}

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (input.name.length < 2) {
    errors.name = "Bitte geben Sie Ihren Namen ein.";
  } else if (input.name.length > 100) {
    errors.name = "Bitte kürzen Sie Ihren Namen auf höchstens 100 Zeichen.";
  }

  if (input.contactMethod === "email") {
    if (!input.email) errors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
    else if (!EMAIL_RE.test(input.email))
      errors.email = "Bitte prüfen Sie Ihre E-Mail-Adresse, z. B. name@beispiel.de.";
  } else {
    const digits = input.phone.replace(/\D/g, "");
    if (!input.phone) errors.phone = "Bitte geben Sie Ihre Telefonnummer ein.";
    else if (!PHONE_RE.test(input.phone) || digits.length < 6)
      errors.phone = "Bitte prüfen Sie Ihre Telefonnummer, z. B. 0821 123456.";
  }

  if (!(PREFERENCES as readonly string[]).includes(input.preference)) {
    errors.preference = "Bitte wählen Sie eine der angebotenen Optionen.";
  }

  if (input.message.length > MESSAGE_MAX) {
    errors.message = `Bitte fassen Sie Ihre Nachricht in höchstens ${MESSAGE_MAX} Zeichen zusammen.`;
  }

  return errors;
}
