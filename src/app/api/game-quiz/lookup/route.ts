/*
  Búsqueda de respuestas previas por Gmail, para /game/form.

  Cuando el usuario ingresa su Gmail en el login, el cliente consulta acá: si ese
  correo ya tiene respuestas cargadas en `Respuestas_Game`, se las devolvemos para
  mostrárselas (en vez de volver a hacer el cuestionario).

  La lectura intenta primero consultar la tabla directo desde el servidor. Con
  SUPABASE_SERVICE_ROLE_KEY configurada en Vercel, esto no depende de policies ni
  de funciones RPC creadas a mano. Si el proyecto sólo tiene anon key, mantenemos
  un fallback a la RPC `get_respuestas_by_gmail`.

  Payload: { email: string }
  Respuesta: { found: false } | { found: true, row: { respuesta_1..6, created_at } }
*/

import { getSupabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RESPONSE_COLUMNS =
  "respuesta_1,respuesta_2,respuesta_3,respuesta_4,respuesta_5,respuesta_6,created_at";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const email =
    typeof (body as { email?: unknown })?.email === "string"
      ? (body as { email: string }).email.trim().toLowerCase()
      : "";
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Correo inválido." }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.error(
      "Supabase no configurado — faltan SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY/SUPABASE_ANON_KEY.",
    );
    return Response.json({ found: false, lookupUnavailable: true });
  }

  const { data: directData, error: directError } = await supabase
    .from("Respuestas_Game")
    .select(RESPONSE_COLUMNS)
    .ilike("gmail", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!directError) {
    if (!directData) return Response.json({ found: false });
    return Response.json({ found: true, row: directData });
  }

  console.error("Supabase lookup directo falló:", directError.message);

  const { data: rpcData, error: rpcError } = await supabase.rpc(
    "get_respuestas_by_gmail",
    {
      p_gmail: email,
    },
  );

  if (rpcError) {
    console.error("Supabase RPC get_respuestas_by_gmail falló:", rpcError.message);
    return Response.json({ found: false, lookupUnavailable: true });
  }

  const row = Array.isArray(rpcData) ? rpcData[0] : rpcData;
  if (!row) return Response.json({ found: false });

  return Response.json({ found: true, row });
}
