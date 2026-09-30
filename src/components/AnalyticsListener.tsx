"use client";

import { useEffect } from "react";
import { track, type TrackEventName } from "@/lib/analytics";

/**
 * One delegated click listener instead of wiring every link individually.
 * - Elements with data-track="<event>" send that event (+ data-track-location).
 * - tel: and mailto: links are tracked automatically as phone/email clicks.
 * Only the link's placement on the page is sent – never personal data.
 */
export function AnalyticsListener() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>("a, button");
      if (!el) return;
      const location = el.dataset.trackLocation;
      const explicit = el.dataset.track as TrackEventName | undefined;
      const href = el.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) track("phone_click", { location });
      else if (href.startsWith("mailto:")) track("email_click", { location });
      else if (explicit)
        track(explicit, { location, service: el.dataset.trackService });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
