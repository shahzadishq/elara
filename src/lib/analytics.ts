/**
 * Minimal, privacy-conscious analytics hooks.
 *
 * - Every event is dispatched as a DOM CustomEvent ("elara:track") so any
 *   integration can listen without code changes.
 * - Events are pushed to window.dataLayer (Google Tag Manager) ONLY after the
 *   visitor has granted consent; GTM itself is only loaded after consent.
 * - Never pass names, phone numbers, e-mail addresses, messages or health
 *   information as parameters.
 */

export type TrackEventName =
  | "appointment_cta_click"
  | "phone_click"
  | "email_click"
  | "directions_click"
  | "enquiry_submit_success";

export type TrackParams = Record<string, string | number | boolean | undefined>;

const CONSENT_KEY = "elara-consent-v1";
export const CONSENT_EVENT = "elara:consent-change";
export const OPEN_CONSENT_EVENT = "elara:open-consent";

export type ConsentState = "granted" | "denied" | null;

export function readConsent(): ConsentState {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable – consent then only lasts for this page view */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: TrackEventName, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...params };
  window.dispatchEvent(new CustomEvent("elara:track", { detail: payload }));
  if (readConsent() === "granted") {
    (window.dataLayer ??= []).push(payload);
  }
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", payload);
  }
}
