/*
  Búsqueda de respuestas previas por Gmail, para /game/form.

  Cuando el usuario ingresa su Gmail en el login, el cliente consulta acá: si ese
  correo ya tiene respuestas cargadas en `Respuestas_Game`, se las devolvemos para
  mostrárselas (en vez de volver a hacer el cuestionario).

  La lectura se hace vía la función RPC `get_respuestas_by_gmail` (SECURITY
  DEFINER en Supabase), que devuelve ÚNICAMENTE la fila del correo consultado.
  Así la anon key sigue sin poder leer toda la tabla — sólo ejecutar esa función.
  Ver el SQL de la función en la conversación.

  Payload: { email: string }
  Respuesta: { found: false } | { found: true, row: { respuesta_1..6, created_at } }
*/

import { getSupabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const email =
    typeof (body as { email?: unknown })?.email === "string"
      ? (body as { email: string }).email.trim()
      : "";
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Correo inválido." }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.error("Supabase no configurado — faltan SUPABASE_URL/ANON_KEY.");
    return Response.json(
      { error: "El cuestionario no está disponible en este momento." },
      { status: 500 },
    );
  }

  const { data, error } = await supabase.rpc("get_respuestas_by_gmail", {
    p_gmail: email,
  });

  if (error) {
    console.error("Supabase RPC get_respuestas_by_gmail falló:", error.message);
    return Response.json(
      { error: "No pudimos verificar tu correo. Probá de nuevo." },
      { status: 502 },
    );
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return Response.json({ found: false });

  return Response.json({ found: true, row });
}
