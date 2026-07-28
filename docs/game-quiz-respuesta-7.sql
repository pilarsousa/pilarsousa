-- /game/form — add support for the 7th quiz question.
--
-- Run this in Supabase SQL Editor before deploying the code that sends
-- `respuesta_7`, otherwise inserts into public."Respuestas_Game" will fail.

alter table public."Respuestas_Game"
  add column if not exists respuesta_7 text;

-- If the project still uses the fallback RPC `get_respuestas_by_gmail`, update
-- that function in Supabase so it also returns `respuesta_7`.
