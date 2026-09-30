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

// Private WhatsApp group of the current Bootcamp edition (/bootcamp thank-you
// page). Separate from WHATSAPP_GROUP_URL, which /bootcamp-v1/gracias still
// uses: changing that one would move the previous edition's buyers too.
export const BOOTCAMP_WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/LDf3th7gTN1AuuQCAnqwi1";

// Direct WhatsApp support line (thank-you page).
export const WHATSAPP_SUPPORT_URL = "https://wa.link/i8qdol";

// Ventas — direct WhatsApp support line with a program-specific prefilled message.
export const VENTAS_WHATSAPP_SUPPORT_URL =
  "https://api.whatsapp.com/send?phone=34633327481&text=Hola%2C%20tengo%20dudas%20sobre%20el%20programa%20Volver%20al%20Origen.%20%C2%BFMe%20pueden%20ayudar%3F";

// Ventas — WhatsApp del equipo para la sección de dudas previa al FAQ.
export const VENTAS_WHATSAPP_EQUIPO_URL = "https://wa.link/90avqa";

// Volver al Origen — WhatsApp community (post-registration thank-you page).
export const MO_WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/FBFK1l0bsHW4pmbqVi2Z6u";

/* Bootcamp start — the countdown target. 10 de octubre de 2026, 19:00 hora de
   España, que es la referencia que se le da al público hispanohablante.

   ⚠️ TIENE QUE CUADRAR CON LA FECHA ESCRITA en la pastilla del hero y en la
   tarjeta de horario ("10, 11 y 12 de octubre"). Si sólo se cambia una de las
   dos, el contador acaba diciendo "el bootcamp ha comenzado" debajo de un
   texto que anuncia una fecha futura.

   +02:00 es CEST y es correcto para esta fecha: el horario de verano en España
   no termina hasta el último domingo de octubre. Una fecha de noviembre en
   adelante iría en +01:00. */
export const BOOTCAMP_START = "2026-10-10T19:00:00+02:00";
