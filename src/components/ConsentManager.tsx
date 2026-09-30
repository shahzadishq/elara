"use client";

import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import { integrations, legal } from "@/content/site";
import {
  CONSENT_EVENT,
  OPEN_CONSENT_EVENT,
  readConsent,
  writeConsent,
  type ConsentState,
} from "@/lib/analytics";

function subscribe(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/**
 * Consent gate for Google Tag Manager.
 * Renders nothing unless NEXT_PUBLIC_GTM_ID is configured. GTM is injected only
 * after the visitor clicks "Akzeptieren"; declining loads nothing.
 */
export function ConsentManager() {
  const gtmId = integrations.gtmId;
  const consent = useSyncExternalStore<ConsentState | "unknown">(
    subscribe,
    readConsent,
    () => "unknown",
  );
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  if (!gtmId) return null;

  const showBanner = consent === null || reopened;

  function choose(value: "granted" | "denied") {
    writeConsent(value);
    setReopened(false);
    // Withdrawing consent after GTM loaded requires a reload to unload it.
    if (value === "denied" && window.dataLayer) window.location.reload();
  }

  return (
    <>
      {consent === "granted" && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`}
        </Script>
      )}
      {showBanner && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-title"
          className="fixed inset-x-3 bottom-[5.5rem] z-[60] mx-auto max-w-xl rounded-2xl border border-line bg-white p-5 shadow-lift sm:bottom-6 lg:inset-x-auto lg:right-6"
        >
          <h2 id="consent-title" className="font-semibold text-navy-900">
            Datenschutz-Einstellungen
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Mit Ihrer Zustimmung nutzen wir Google Tag Manager, um die Wirksamkeit unserer
            Anzeigen zu messen (z. B. Klicks auf „Termin vereinbaren“). Ohne Zustimmung werden
            keine entsprechenden Dienste geladen. Sie können Ihre Auswahl jederzeit über
            „Cookie-Einstellungen“ im Seitenfuß ändern. Mehr in der{" "}
            <a href={legal.datenschutzHref} className="link-underline text-navy-800">
              Datenschutzerklärung
            </a>
            .
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => choose("granted")} className="btn-primary flex-1">
              Akzeptieren
            </button>
            <button type="button" onClick={() => choose("denied")} className="btn-outline flex-1">
              Ablehnen
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function ConsentSettingsButton({ className }: { className?: string }) {
  if (!integrations.gtmId) return null;
  return (
    <li>
      <button
        type="button"
        className={className}
        onClick={() => window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT))}
      >
        Cookie-Einstellungen
      </button>
    </li>
  );
}
