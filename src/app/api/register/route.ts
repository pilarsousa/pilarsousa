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

import { saveLead, updateLeadStatus } from "@/lib/leads";

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

/*
  Último recurso cuando GHL no acepta el lead. Lo deja en los logs del servidor
  con un prefijo fijo y grepeable, de modo que se pueda recuperar a mano desde
  Vercel → Logs (buscar "LEAD_FALLBACK") y cargarlo en el CRM.

  No se escribe a disco a propósito: el filesystem de Vercel es efímero y no
  está compartido entre invocaciones, así que un archivo JSON se perdería sin
  aviso — sería peor que esto, porque además daría una falsa sensación de
  respaldo.
*/
function logLeadFallback(lead: Lead, reason: string) {
  console.error(
    `LEAD_FALLBACK ${JSON.stringify({ ...lead, reason, at: new Date().toISOString() })}`,
  );
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

  /*
    El lead se respalda en Supabase ANTES de intentar el envío a GHL. Ese orden
    es lo que garantiza que nada se pierda: si el proceso muere en mitad del
    fetch, o si GHL rechaza, el contacto ya está guardado y sólo queda pendiente
    de sincronizar.
  */
  const leadId = await saveLead(lead, "pending");

  /*
    Si GHL rechaza o no responde, el lead NO se descarta: queda en Supabase (y
    en los logs como red de emergencia) y la respuesta sigue siendo 200. Es
    deliberado — el visitante completó el formulario y su dato está guardado,
    así que mostrarle un error lo empujaría a irse o a reintentar en loop. El
    fallo es nuestro y se resuelve de nuestro lado.
  */
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
      const detail = await res.text().catch(() => "");
      console.error(`GHL webhook responded ${res.status}: ${detail.slice(0, 300)}`);
      logLeadFallback(lead, `ghl_${res.status}`);
      if (leadId) {
        await updateLeadStatus(leadId, "failed", `ghl_${res.status}: ${detail.slice(0, 300)}`);
      }
      return Response.json({ ok: true, queued: true });
    }
  } catch (err) {
    console.error("Failed to reach the GHL webhook:", err);
    logLeadFallback(lead, "ghl_unreachable");
    if (leadId) await updateLeadStatus(leadId, "failed", "ghl_unreachable");
    return Response.json({ ok: true, queued: true });
  }

  if (leadId) await updateLeadStatus(leadId, "sent");
  return Response.json({ ok: true });
}
