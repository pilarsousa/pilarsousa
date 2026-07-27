/**
 * External links used across the landing. Centralized so a URL change only
 * happens in one place.
 */

// Stripe checkout for the bootcamp enrollment.
export const CHECKOUT_URL = "https://link.fastpaydirect.com/payment-link/6a429e26a655fa0b802a1cde";

// Checkout de la landing de ventas (/ventas).
// Dos planes: pago único y en cuotas. Cuando tengas los links reales de cada
// uno, pegalos acá — mientras estén vacíos el CTA no navega a ningún lado.
export const VENTAS_CHECKOUT_UNICO = ""; // pago único (1 cuota)
export const VENTAS_CHECKOUT_CUOTAS = ""; // pago en 2 cuotas

// Precios de cada plan — PLACEHOLDER, cambialos por los reales.
export const VENTAS_PRECIO_UNICO = "XXX €";
export const VENTAS_PRECIO_CUOTAS = "2 × XX €";

// Alias legacy: el CTA por defecto (flotante, hero) apunta al pago único.
export const VENTAS_CHECKOUT_URL = VENTAS_CHECKOUT_UNICO;

// Private WhatsApp group (thank-you page).
export const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/GO8DZzC2o5bJotgoAZ98Uu";

// Direct WhatsApp support line (thank-you page).
export const WHATSAPP_SUPPORT_URL = "https://wa.link/i8qdol";

// Misión Origen — WhatsApp community (post-registration thank-you page).
export const MO_WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/FBFK1l0bsHW4pmbqVi2Z6u";

// Bootcamp start — the countdown target. July 10, 2026, 19:00 Spain time
// (CEST = UTC+2), used as the reference time for Spanish-speaking audiences.
export const BOOTCAMP_START = "2026-07-10T19:00:00+02:00";
