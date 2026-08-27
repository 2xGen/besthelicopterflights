"use client";

import { Analytics } from "@vercel/analytics/next";
import { useEffect, useState } from "react";
import {
  CONSENT_EVENT,
  CONSENT_STORAGE_KEY,
  readConsent,
  type CookieConsent,
} from "@/lib/consent";

/** Loads Vercel Analytics only after the visitor accepts analytics cookies. */
export function ConsentAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = (consent: CookieConsent | null) => {
      setAllowed(Boolean(consent?.analytics));
    };

    sync(readConsent());

    const onStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== CONSENT_STORAGE_KEY) return;
      sync(readConsent());
    };

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<CookieConsent | null>).detail;
      sync(detail ?? null);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CONSENT_EVENT, onConsent);
    };
  }, []);

  if (!allowed) return null;
  return <Analytics />;
}
