import { NextResponse } from "next/server";
import { normalizeEnquiry, validateEnquiry, type EnquiryInput } from "@/lib/enquiry";
import { contact, practice } from "@/content/site";

/**
 * Appointment enquiry endpoint.
 *
 * Delivery is configured via environment variables (see .env.example):
 *   - Resend e-mail:  RESEND_API_KEY + CONTACT_TO_EMAIL + CONTACT_FROM_EMAIL
 *   - or a webhook:   CONTACT_WEBHOOK_URL (receives the enquiry as JSON)
 * Without either, the endpoint responds with 503 – it never reports success
 * for an enquiry that was not delivered.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function formatText(e: EnquiryInput) {
  const pref = contact.preferences.find((p) => p.value === e.preference)?.label ?? "Keine Präferenz";
  return [
    `Neue Terminanfrage über die Website von ${practice.name}`,
    "",
    `Name: ${e.name}`,
    `Bevorzugter Kontaktweg: ${e.contactMethod === "email" ? "E-Mail" : "Telefon"}`,
    e.contactMethod === "email" ? `E-Mail: ${e.email}` : `Telefon: ${e.phone}`,
    `Terminwunsch: ${pref}`,
    "",
    "Nachricht:",
    e.message || "–",
    "",
    "Hinweis: Die Anfrage ist unverbindlich. Bitte Termin mit der Person abstimmen und bestätigen.",
  ].join("\n");
}

async function deliver(e: EnquiryInput): Promise<"ok" | "not_configured" | "failed"> {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_WEBHOOK_URL } = process.env;

  if (RESEND_API_KEY && CONTACT_TO_EMAIL && CONTACT_FROM_EMAIL) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: e.contactMethod === "email" ? e.email : undefined,
        subject: `Terminanfrage: ${e.name}`,
        text: formatText(e),
      }),
      signal: AbortSignal.timeout(10_000),
    }).catch(() => null);
    return res?.ok ? "ok" : "failed";
  }

  if (CONTACT_WEBHOOK_URL) {
    const res = await fetch(CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...e, receivedAt: new Date().toISOString(), text: formatText(e) }),
      signal: AbortSignal.timeout(10_000),
    }).catch(() => null);
    return res?.ok ? "ok" : "failed";
  }

  return "not_configured";
}

export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Reject without a success signal.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const input = normalizeEnquiry(raw);
  const errors = validateEnquiry(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", errors }, { status: 422 });
  }

  const result = await deliver(input);
  if (result === "not_configured") {
    console.error("[anfrage] No delivery configured (RESEND_* or CONTACT_WEBHOOK_URL missing).");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }
  if (result === "failed") {
    console.error("[anfrage] Delivery failed.");
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
