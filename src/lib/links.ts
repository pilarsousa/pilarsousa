/**
 * External links used across the landing. Centralized so a URL change only
 * happens in one place.
 */

// Stripe checkout for the bootcamp enrollment.
export const CHECKOUT_URL = "https://link.fastpaydirect.com/payment-link/6a429e26a655fa0b802a1cde";

// Checkout de la landing de ventas raíz (/).
// Two sales plans: one-time payment and 2 installments.
export const VENTAS_CHECKOUT_UNICO = "https://link.fastpaydirect.com/payment-link/6a53c878a655fa0b802a3e06"; // one-time payment
export const VENTAS_CHECKOUT_CUOTAS = "https://link.fastpaydirect.com/payment-link/6a53c8e2a655fa0b802a3e07"; // 2 installments

// Prices for each sales plan.
export const VENTAS_PRECIO_UNICO = "597 €";
export const VENTAS_PRECIO_CUOTAS = "297 €";

// Alias legacy: el CTA por defecto (flotante, hero) apunta al pago único.
export const VENTAS_CHECKOUT_URL = VENTAS_CHECKOUT_UNICO;

// Private WhatsApp group (thank-you page).
export const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/GO8DZzC2o5bJotgoAZ98Uu";

// Direct WhatsApp support line (thank-you page).
export const WHATSAPP_SUPPORT_URL = "https://wa.link/i8qdol";

// Ventas — direct WhatsApp support line with a program-specific prefilled message.
export const VENTAS_WHATSAPP_SUPPORT_URL =
  "https://api.whatsapp.com/send?phone=34633327481&text=Hola%2C%20tengo%20dudas%20sobre%20el%20programa%20Volver%20al%20Origen.%20%C2%BFMe%20pueden%20ayudar%3F";

// Volver al Origen — WhatsApp community (post-registration thank-you page).
export const MO_WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/FBFK1l0bsHW4pmbqVi2Z6u";

// Bootcamp start — the countdown target. July 10, 2026, 19:00 Spain time
// (CEST = UTC+2), used as the reference time for Spanish-speaking audiences.
export const BOOTCAMP_START = "2026-07-10T19:00:00+02:00";
