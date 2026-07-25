import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/*
  Cliente de Supabase para uso SERVIDOR (route handlers).

  Lee SUPABASE_URL y una key server-side de las env vars. Si existe
  SUPABASE_SERVICE_ROLE_KEY, la preferimos para que las rutas API del servidor
  puedan leer/escribir aun con RLS activo. Si no, cae a SUPABASE_ANON_KEY.

  Ninguna key lleva NEXT_PUBLIC_ a propósito: sólo las usa el backend.

  getSupabase() devuelve null si faltan las variables, así el endpoint puede
  responder un error claro de "no configurado" en vez de romper.
*/

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  try {
    cached = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch (err) {
    console.error("Supabase createClient failed:", err);
    return null;
  }
  return cached;
}
