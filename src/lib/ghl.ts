/*
  ═══════════════════════════════════════════════════════════════════════════
  GoHighLevel por API (v2) — guarda el contacto y le pone su etiqueta
  ═══════════════════════════════════════════════════════════════════════════

  Para las landings que tienen su propia integración en GHL (hoy, /registro:
  el Seminario de Neurometafísica). Las demás siguen por el webhook entrante
  (GHL_WEBHOOK_URL), sin cambios.

  ── CREDENCIALES (sólo servidor) ──

  GHL_API_KEY      Private Integration Token de la subcuenta de Pilar
                   (Configuración → Integraciones privadas). Permiso mínimo:
                   "Edit Contacts" (contacts.write). Se ve una sola vez al
                   crearlo y no caduca solo; GHL recomienda rotarlo cada 90
                   días (al rotar, el viejo sigue valiendo 7 días).
  GHL_LOCATION_ID  ID de la subcuenta (Configuración → Perfil de la empresa).

  ── DOS LLAMADAS Y NO UNA, A PROPÓSITO ──

  1. POST /contacts/upsert SIN etiquetas: crea el contacto o actualiza el que
     ya existe (según el ajuste "Allow Duplicate Contact" de la subcuenta).
  2. POST /contacts/{id}/tags con la etiqueta de la landing.

  El upsert acepta `tags`, pero la documentación oficial avisa que ese campo
  REEMPLAZA todas las etiquetas del contacto: alguien que ya estaba en otra
  campaña de Pilar perdería las suyas. El endpoint de etiquetas las suma.

  La etiqueta es el "grupo" de la landing en el CRM: con ella se filtra una
  lista inteligente y es el disparador del workflow que manda el email de
  registro. Si el contacto se guarda pero la etiqueta falla, se informa como
  fallo: sin etiqueta no sale el email y hay que verlo.

  ── VERSIÓN ──

  GHL convive con dos versiones: la de fecha 2021-07-28 (soportada, sin fecha
  de retiro anunciada) y v3. Se usa 2021-07-28, la de todos los ejemplos
  oficiales de Private Integrations. Si se retira, se cambia aquí.
*/

const API = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";
const TIMEOUT_MS = 8000;

/* Landings que se guardan por API, con su etiqueta y el texto de "Fuente"
   que se ve en la ficha del contacto en GHL. La clave es el `source` que
   manda el formulario de cada landing (su content.ts). */
const LANDINGS_POR_API: Record<string, { etiquetas: string[]; fuente: string }> = {
  "neurometafisica-v1": {
    etiquetas: ["registro-neurometafisica"],
    fuente: "Landing /registro · Seminario de Neurometafísica",
  },
};

export type ContactoGhl = {
  nombre: string;
  email: string;
  telefono: string;
  source: string;
};

export type ResultadoGhl = { ok: true; contactId: string } | { ok: false; motivo: string };

/** La landing se guarda por API si tiene entrada arriba y las credenciales están cargadas. */
export function usaApiGhl(source: string): boolean {
  return Boolean(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID && LANDINGS_POR_API[source]);
}

function cabeceras(): HeadersInit {
  return {
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    Version: VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

async function detalle(res: Response): Promise<string> {
  return (await res.text().catch(() => "")).slice(0, 300);
}

/** Separa "Nombre Apellido Apellido" en nombre y apellidos para la ficha de GHL. */
function partirNombre(nombre: string): { firstName: string; lastName: string } {
  const [firstName = "", ...resto] = nombre.trim().split(/\s+/);
  return { firstName, lastName: resto.join(" ") };
}

/**
 * Crea o actualiza el contacto y le suma la etiqueta de su landing. Nunca
 * lanza: devuelve ok o el motivo del fallo para que el endpoint lo registre.
 */
export async function guardarContactoGhl(contacto: ContactoGhl): Promise<ResultadoGhl> {
  const landing = LANDINGS_POR_API[contacto.source];
  if (!landing) return { ok: false, motivo: "landing_sin_api" };

  let contactId: string;
  try {
    const res = await fetch(`${API}/contacts/upsert`, {
      method: "POST",
      headers: cabeceras(),
      body: JSON.stringify({
        locationId: process.env.GHL_LOCATION_ID,
        ...partirNombre(contacto.nombre),
        name: contacto.nombre,
        email: contacto.email,
        phone: contacto.telefono,
        source: landing.fuente,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return { ok: false, motivo: `ghl_api_upsert_${res.status}: ${await detalle(res)}` };
    const data = (await res.json().catch(() => null)) as { contact?: { id?: string } } | null;
    if (!data?.contact?.id) return { ok: false, motivo: "ghl_api_upsert_sin_id" };
    contactId = data.contact.id;
  } catch (err) {
    return { ok: false, motivo: `ghl_api_upsert_inalcanzable: ${String(err).slice(0, 200)}` };
  }

  try {
    const res = await fetch(`${API}/contacts/${encodeURIComponent(contactId)}/tags`, {
      method: "POST",
      headers: cabeceras(),
      body: JSON.stringify({ tags: landing.etiquetas }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return { ok: false, motivo: `ghl_api_tags_${res.status} (contacto ${contactId}): ${await detalle(res)}` };
  } catch (err) {
    return { ok: false, motivo: `ghl_api_tags_inalcanzable (contacto ${contactId}): ${String(err).slice(0, 200)}` };
  }

  return { ok: true, contactId };
}
