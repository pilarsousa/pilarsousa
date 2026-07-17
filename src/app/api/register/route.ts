/*
  Lead registration endpoint, shared by any landing form (today: Misión
  Origen's ReservaForm). The browser posts here instead of talking to Go High
  Level directly, so the GHL webhook URL stays server-side and never ships in
  the client bundle — otherwise anyone could read it and spam the CRM.

  Flow: validate the payload again here (never trust the client), then forward
  it to the GHL inbound webhook. The webhook URL lives in the GHL_WEBHOOK_URL
  env var (set it in Vercel → Settings → Environment Variables, and in
  .env.local for local dev).
*/

// Kept in sync with the client-side checks in ReservaForm.tsx.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_VALID_RE = /^\+?[\d\s()-]{7,}$/;

type Lead = {
  nombre: string;
  email: string;
  telefono: string;
  source: string;
};

function parseLead(data: unknown): Lead | null {
  if (typeof data !== "object" || data === null) return null;
  const d = data as Record<string, unknown>;
  const nombre = typeof d.nombre === "string" ? d.nombre.trim() : "";
  const email = typeof d.email === "string" ? d.email.trim() : "";
  const telefono = typeof d.telefono === "string" ? d.telefono.trim() : "";
  const source = typeof d.source === "string" ? d.source.trim() : "";

  if (nombre.length < 2) return null;
  if (!EMAIL_RE.test(email)) return null;
  if (!PHONE_VALID_RE.test(telefono)) return null;

  return { nombre, email, telefono, source: source || "unknown" };
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    // Misconfiguration, not a client error: surface it in the server logs.
    console.error("GHL_WEBHOOK_URL is not set — cannot forward the lead.");
    return Response.json(
      { error: "El registro no está disponible en este momento." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const lead = parseLead(body);
  if (!lead) {
    return Response.json(
      { error: "Datos incompletos o inválidos." },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      console.error(`GHL webhook responded ${res.status}`);
      return Response.json(
        { error: "No pudimos registrar tu reserva. Probá de nuevo." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Failed to reach the GHL webhook:", err);
    return Response.json(
      { error: "No pudimos registrar tu reserva. Probá de nuevo." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
