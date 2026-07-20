"use client";

import { useEffect } from "react";

/**
 * Fires the Meta Pixel "Lead" conversion on the thank-you page, but only when
 * the visitor actually completed the registration form (ReservaForm sets a
 * one-shot `mo_lead_pending` flag right before redirecting here).
 *
 * The flag is consumed immediately, so a page refresh, a direct visit to the
 * URL or a back-navigation never fires a duplicate conversion.
 */
export function LeadPixelEvent() {
  useEffect(() => {
    let pending = false;
    try {
      pending = sessionStorage.getItem("mo_lead_pending") === "1";
      if (pending) sessionStorage.removeItem("mo_lead_pending");
    } catch {
      // sessionStorage can throw in private mode — tracking is best-effort.
    }
    // Optional-chained: the pixel may be blocked by an ad blocker.
    if (pending) window.fbq?.("track", "Lead");
  }, []);

  return null;
}
