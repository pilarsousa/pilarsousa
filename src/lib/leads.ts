import { createClient } from "@supabase/supabase-js";

/*
  Respaldo de leads en Supabase.

  Todo lead que entra por /api/register se guarda aquí ANTES de intentar el
  envío a Go High Level, y su estado se actualiza según cómo haya ido. Así, si
  GHL rechaza el envío (workflow despublicado, sin saldo, caído), el contacto
  no se pierde: queda en la tabla y se puede exportar desde el panel de
  Supabase.

  Las credenciales viven en variables de entorno de servidor. Se usa la service
  role key, no la anon key: esta tabla no debe ser legible ni escribible desde
  el navegador, sólo desde este endpoint.
*/

/* pending: guardado, envío a GHL todavía sin resolver.
   sent:    GHL lo aceptó.
   failed:  GHL lo rechazó o no respondió — hay que cargarlo a mano. */
export type LeadStatus = "pending" | "sent" | "failed";

export type LeadRecord = {
  nombre: string;
  email: string;
  telefono: string;
  source: string;
};

/* Cliente perezoso: si las variables no están cargadas no se rompe el import,
   sólo se desactiva el respaldo (y se avisa en los logs). Eso mantiene el
   formulario funcionando aunque Supabase todavía no esté configurado. */
function getClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  /* createClient valida la URL y lanza si no le gusta el formato (por ejemplo
     si viene con espacios, con comillas, o sin protocolo al copiarla del panel).
     Eso ocurriría FUERA del try de saveLead, así que se captura aquí: el
     respaldo puede quedar inactivo, pero nunca puede tumbar el registro. */
  try {
    return createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch (err) {
    console.error("Supabase createClient failed:", err);
    return null;
  }
}

/**
 * Guarda el lead y devuelve su id, o null si el respaldo no está disponible.
 * Nunca lanza: un fallo al respaldar no debe tumbar el registro.
 */
export async function saveLead(
  lead: LeadRecord,
  status: LeadStatus,
  detail?: string,
): Promise<string | null> {
  const supabase = getClient();
  if (!supabase) {
    console.error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY sin configurar — lead no respaldado.");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("leads")
      .insert({
        nombre: lead.nombre,
        email: lead.email,
        telefono: lead.telefono,
        source: lead.source,
        status,
        detail: detail ?? null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert failed:", error.message);
      return null;
    }
    return data?.id ?? null;
  } catch (err) {
    console.error("Supabase insert threw:", err);
    return null;
  }
}

/**
 * Marca un lead ya guardado con el resultado del envío a GHL.
 * Silencioso ante fallos por el mismo motivo que saveLead.
 */
export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  detail?: string,
): Promise<void> {
  const supabase = getClient();
  if (!supabase) return;

  try {
    const { error } = await supabase
      .from("leads")
      .update({ status, detail: detail ?? null })
      .eq("id", id);
    if (error) console.error("Supabase update failed:", error.message);
  } catch (err) {
    console.error("Supabase update threw:", err);
  }
}
