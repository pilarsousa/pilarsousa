import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/*
  Cliente de Supabase para uso SERVIDOR (route handlers).

  Lee SUPABASE_URL y SUPABASE_ANON_KEY de las env vars — sin el prefijo
  NEXT_PUBLIC_ a propósito, para que ni siquiera la anon key viaje en el bundle
  del navegador: sólo la usa el backend.

  getSupabase() devuelve null si faltan las variables, así el endpoint puede
  responder un error claro de "no configurado" en vez de romper (mismo criterio
  que /api/register con GHL_WEBHOOK_URL).
*/

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
