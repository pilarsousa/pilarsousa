/*
  Endpoint del cuestionario de /game/form.

  Valida el payload (Gmail + respuestas) y lo guarda en Supabase, tabla
  `Respuestas_Game` (columnas: gmail text, respuesta_1 … respuesta_N text,
  created_at). Cada respuesta se mapea a su columna según el ORDEN de
  QUIZ_QUESTIONS: la 1ª pregunta → respuesta_1, la 2ª → respuesta_2, etc.

  La conexión usa el cliente server-side de src/lib/supabase.ts. En Vercel conviene
  configurar SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY; si sólo existe
  SUPABASE_ANON_KEY, requiere una policy de RLS que permita el insert anónimo.

  Payload esperado desde el cliente (GameFlow.tsx):
    { email: string, answers: { [questionId]: string } }
*/

import { getSupabase } from "@/lib/supabase";
import { QUIZ_QUESTIONS } from "@/components/game/game-config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type QuizSubmission = {
  email: string;
  answers: Record<string, string>;
};

function parseSubmission(data: unknown): QuizSubmission | null {
  if (typeof data !== "object" || data === null) return null;
  const d = data as Record<string, unknown>;

  const email = typeof d.email === "string" ? d.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email)) return null;

  if (typeof d.answers !== "object" || d.answers === null) return null;
  const answers: Record<string, string> = {};
  for (const [key, value] of Object.entries(d.answers as Record<string, unknown>)) {
    if (typeof value !== "string" || value.trim() === "") return null;
    answers[key] = value.trim();
  }
  if (Object.keys(answers).length === 0) return null;

  return { email, answers };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const submission = parseSubmission(body);
  if (!submission) {
    return Response.json(
      { error: "Datos incompletos o inválidos." },
      { status: 400 },
    );
  }

  const supabase = getSupabase();
  if (!supabase) {
    // Misconfiguración, no error del cliente: faltan env vars de Supabase.
    console.error(
      "Supabase no configurado — faltan SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY/SUPABASE_ANON_KEY.",
    );
    return Response.json(
      { error: "El cuestionario no está disponible en este momento." },
      { status: 500 },
    );
  }

  // Mapear cada respuesta a su columna respuesta_N según el orden de las
  // preguntas configuradas. Supabase debe tener esas columnas creadas
  // (hoy: respuesta_1 … respuesta_7); si una pregunta no fue respondida queda null.
  const row: Record<string, string | null> = { gmail: submission.email };
  QUIZ_QUESTIONS.forEach((q, i) => {
    row[`respuesta_${i + 1}`] = submission.answers[q.id] ?? null;
  });

  const { error } = await supabase.from("Respuestas_Game").insert(row);

  if (error) {
    console.error("Supabase insert falló:", error.message);
    return Response.json(
      { error: "No pudimos guardar tus respuestas. Probá de nuevo." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
