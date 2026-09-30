"use client";

import { useRef, useState, type FormEvent } from "react";
import { contact, integrations, legal, practice } from "@/content/site";
import { track } from "@/lib/analytics";
import {
  MESSAGE_MAX,
  normalizeEnquiry,
  validateEnquiry,
  type ContactMethod,
  type EnquiryErrors,
} from "@/lib/enquiry";
import { AlertIcon, CheckIcon } from "./Icons";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink shadow-[inset_0_1px_2px_rgb(16_63_114/0.04)] transition-colors placeholder:text-muted/60 hover:border-navy-800/40 focus:border-navy-800 focus:outline-none focus-visible:outline-3 focus-visible:outline-teal-500/60 focus-visible:outline-offset-0";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [method, setMethod] = useState<ContactMethod>("email");
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");
  const [messageLength, setMessageLength] = useState(0);

  function currentValues() {
    const fd = new FormData(formRef.current!);
    return normalizeEnquiry(Object.fromEntries(fd.entries()));
  }

  function validateField(name: keyof EnquiryErrors) {
    setTouched((t) => ({ ...t, [name]: true }));
    const next = validateEnquiry(currentValues());
    setErrors((prev) => ({ ...prev, [name]: next[name] }));
  }

  // On blur only check fields that contain something ("required" errors appear on submit),
  // so messages don't pop in and shift the layout while someone moves through the form.
  function onFieldBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (e.target.value.trim()) validateField(e.target.name as keyof EnquiryErrors);
  }

  // Once a field shows an error, re-check it while typing so the message clears immediately.
  function onFieldInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name as keyof EnquiryErrors;
    if (errors[name]) validateField(name);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const fd = new FormData(e.currentTarget);
    const values = normalizeEnquiry(Object.fromEntries(fd.entries()));
    const found = validateEnquiry(values);
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, message: true });

    if (Object.keys(found).length > 0) {
      const firstField = (["name", "email", "phone", "preference", "message"] as const).find(
        (k) => found[k],
      );
      formRef.current?.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch(integrations.enquiryEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, website: fd.get("website") ?? "" }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        errors?: EnquiryErrors;
      };

      if (res.ok && data.ok) {
        setStatus("success");
        // Conversion is counted only after the server confirmed delivery. No personal data.
        track("enquiry_submit_success", { form: "terminanfrage" });
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }

      if (data.error === "validation" && data.errors) setErrors(data.errors);
      setServerError(
        data.error === "rate_limited"
          ? "Sie haben in kurzer Zeit mehrere Anfragen gesendet. Bitte versuchen Sie es später erneut oder rufen Sie uns an."
          : data.error === "validation"
            ? "Bitte prüfen Sie Ihre Angaben."
            : "Ihre Anfrage konnte leider nicht übermittelt werden. Bitte versuchen Sie es später erneut oder rufen Sie uns direkt an.",
      );
      setStatus("error");
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setServerError(
        "Die Verbindung ist fehlgeschlagen. Bitte prüfen Sie Ihre Internetverbindung oder rufen Sie uns direkt an.",
      );
      setStatus("error");
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start rounded-[1.5rem] bg-white p-7 sm:p-10"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/15 text-teal-700">
          <CheckIcon className="h-6 w-6" strokeWidth={2.2} />
        </span>
        <h3 className="mt-5 font-serif text-3xl text-navy-900">Vielen Dank für Ihre Anfrage.</h3>
        <p className="mt-3 leading-relaxed text-muted">
          Ihre Nachricht ist bei uns eingegangen. Wir melden uns bei Ihnen, um einen Termin
          abzustimmen. Bitte beachten Sie: Ihr Termin ist erst verbindlich, wenn wir ihn Ihnen
          bestätigt haben.
        </p>
        <p className="mt-3 leading-relaxed text-muted">
          Bei dringenden Beschwerden rufen Sie uns bitte direkt an:{" "}
          <a
            href={practice.phone.href}
            data-track-location="form-success"
            className="font-semibold text-navy-800 link-underline"
          >
            {practice.phone.display}
          </a>
        </p>
      </div>
    );
  }

  const err = (k: keyof EnquiryErrors) => (touched[k] || status === "error" ? errors[k] : undefined);
  const fieldClass = (k: keyof EnquiryErrors) =>
    `${inputBase} ${err(k) ? "border-red-700 bg-red-50/40" : "border-line"}`;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="form-title"
      aria-busy={status === "submitting"}
      className="rounded-[1.5rem] bg-white p-6 sm:p-9"
    >
      <h3 id="form-title" className="font-serif text-[1.75rem] leading-tight text-navy-900">
        Terminanfrage senden
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Felder mit <span aria-hidden="true">*</span>
        <span className="sr-only">Stern</span> sind Pflichtfelder. Die Anfrage ist unverbindlich.
      </p>

      <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="outline-none">
        {status === "error" && serverError && (
          <p className="mt-5 flex gap-3 rounded-xl border border-red-700/30 bg-red-50 p-4 text-sm leading-relaxed text-red-900">
            <AlertIcon className="mt-0.5 h-5 w-5 shrink-0" />
            <span>
              {serverError}{" "}
              <a href={practice.phone.href} data-track-location="form-error" className="font-semibold underline">
                {practice.phone.display}
              </a>
            </span>
          </p>
        )}
      </div>

      <div className="mt-6 grid gap-5">
        <Field id="f-name" label="Name" required error={err("name")}>
          <input
            id="f-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            aria-invalid={Boolean(err("name"))}
            aria-describedby={err("name") ? "f-name-error" : undefined}
            onBlur={onFieldBlur}
            onChange={onFieldInput}
            className={fieldClass("name")}
          />
        </Field>

        <fieldset>
          <legend className="text-[0.93rem] font-semibold text-navy-900">
            Wie dürfen wir Sie erreichen? <span aria-hidden="true" className="text-teal-700">*</span>
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl bg-sand p-1">
            {(
              [
                ["email", "Per E-Mail"],
                ["phone", "Per Telefon"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className={`relative flex min-h-11 cursor-pointer items-center justify-center rounded-lg text-sm font-semibold transition has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-teal-500 ${
                  method === value ? "bg-white text-navy-900 shadow-soft" : "text-muted hover:text-navy-900"
                }`}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={value}
                  checked={method === value}
                  onChange={() => {
                    setMethod(value);
                    setErrors((p) => ({ ...p, email: undefined, phone: undefined }));
                  }}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        {method === "email" ? (
          <Field id="f-email" label="E-Mail-Adresse" required error={err("email")}>
            <input
              id="f-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              aria-invalid={Boolean(err("email"))}
              aria-describedby={err("email") ? "f-email-error" : undefined}
              onBlur={onFieldBlur}
            onChange={onFieldInput}
              className={fieldClass("email")}
            />
          </Field>
        ) : (
          <Field id="f-phone" label="Telefonnummer" required error={err("phone")}>
            <input
              id="f-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              aria-invalid={Boolean(err("phone"))}
              aria-describedby={err("phone") ? "f-phone-error" : undefined}
              onBlur={onFieldBlur}
            onChange={onFieldInput}
              className={fieldClass("phone")}
            />
          </Field>
        )}

        <Field id="f-pref" label="Wann passt es Ihnen am besten?" optional error={err("preference")}>
          <select
            id="f-pref"
            name="preference"
            defaultValue=""
            aria-invalid={Boolean(err("preference"))}
            aria-describedby={err("preference") ? "f-pref-error" : undefined}
            className={`${fieldClass("preference")} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23103f72%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            {contact.preferences.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="f-message"
          label="Kurze Nachricht"
          optional
          error={err("message")}
          hint="Bitte geben Sie hier keine vertraulichen Gesundheitsinformationen ein – Details besprechen wir gern persönlich."
        >
          <textarea
            id="f-message"
            name="message"
            rows={4}
            maxLength={MESSAGE_MAX}
            aria-invalid={Boolean(err("message"))}
            aria-describedby={`f-message-hint f-message-count${err("message") ? " f-message-error" : ""}`}
            onChange={(e) => {
              setMessageLength(e.target.value.length);
              onFieldInput(e);
            }}
            onBlur={onFieldBlur}
            placeholder="z. B. Neupatient/in, Wunsch nach einem Beratungstermin"
            className={`${fieldClass("message")} resize-y`}
          />
          <p id="f-message-count" className="mt-1.5 text-right text-xs text-muted">
            {messageLength}/{MESSAGE_MAX} Zeichen
          </p>
        </Field>

        {/* Honeypot for bots – hidden from people and assistive technology */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="f-website">Website</label>
          <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <p className="text-xs leading-relaxed text-muted">
          Wir verwenden Ihre Angaben ausschließlich, um Ihre Anfrage zu bearbeiten und Sie zur
          Terminabstimmung zu kontaktieren. Weitere Informationen finden Sie in unserer{" "}
          <a href={legal.datenschutzHref} className="font-semibold text-navy-800 link-underline">
            Datenschutzerklärung
          </a>
          .
        </p>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:justify-self-start sm:px-8"
        >
          {status === "submitting" ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              />
              Wird gesendet …
            </>
          ) : (
            "Terminanfrage senden"
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[0.93rem] font-semibold text-navy-900">
        {label}
        {required && (
          <span aria-hidden="true" className="text-teal-700">
            {" "}
            *
          </span>
        )}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm leading-relaxed text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-800">
          <AlertIcon className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
