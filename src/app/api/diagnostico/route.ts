/*
  ═══════════════════════════════════════════════════════════════════════════
  /api/diagnostico — el puente entre el embudo y GoHighLevel
  ═══════════════════════════════════════════════════════════════════════════

  ── POR QUÉ UN WEBHOOK ENTRANTE Y NO LA API v2 DE GHL ──

  La API v2 usa OAuth con un token de refresco QUE ROTA en cada uso: hay que
  guardarlo en algún sitio y volver a escribirlo. El proyecto no tiene base de
  datos propia para eso (sección 4 del documento), así que ese camino obligaría
  a montar almacenamiento sólo para sostener un token.

  El webhook entrante no tiene nada de eso: para nosotros es una URL en una
  variable de entorno, y el mapeo de campos lo configura el técnico de GHL del
  lado del cliente — que es exactamente el reparto de trabajo que pide el
  documento. Es además el mismo mecanismo que ya usa /api/register para la
  otra landing, así que el cliente no tiene que aprender un procedimiento
  nuevo.

  ── EL ORDEN IMPORTA: PRIMERO RESPALDAR, DESPUÉS ENVIAR ──

  El lead se guarda en Supabase ANTES de intentar el envío a GHL. Si el proceso
  muere en mitad del fetch, o si GHL rechaza, el contacto ya está guardado. Es
  el mismo orden que /api/register, y es lo único que garantiza que no se
  pierda nadie el día del pico de tráfico.

  Si el respaldo tampoco estuviera disponible, queda el registro en los logs
  con el prefijo LEAD_FALLBACK, recuperable desde Vercel → Logs.

  ── SIEMPRE SE RESPONDE 200 ──

  Aunque GHL falle. El visitante ya rellenó el formulario y ya hizo el test: un
  error en pantalla sólo conseguiría que se fuera o que reintentara en bucle,
  y el fallo no es suyo. Se resuelve de nuestro lado, con los datos ya a salvo.

  ── DOS ETAPAS, UN SOLO CONTACTO ──

    · "formulario" — al completar nombre, email y teléfono, ANTES del test.
      Es lo que salva al que abandona en mitad de las preguntas.
    · "resultado"  — al terminar las 7 preguntas, con el diagnóstico.

  GHL tiene que unificarlas POR EMAIL, actualizando el contacto en vez de
  crear uno nuevo. Eso se configura del lado del cliente y está en las
  instrucciones para su técnico (docs/diagnostico-gohighlevel.md).
*/

import { saveLead, updateLeadStatus } from "@/lib/leads";
import { calcularDiagnostico, type Respuestas } from "@/components/diagnostico/puntaje";
import { FICHA_FRECUENCIA } from "@/components/diagnostico/contenido";

/* Mismas reglas que valida FlujoTest en el navegador. Se repiten aquí porque
   el cliente nunca es de fiar: una petición puede llegar sin pasar por la
   página. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TEL_RE = /^\+?[\d\s()-]{7,}$/;

/* Tope de respuestas aceptadas. Sin él, una petición con cien mil claves
   obligaría a recorrerlas todas. El cuestionario tiene 7. */
const MAX_RESPUESTAS = 50;

type Envio = {
  etapa: "formulario" | "resultado";
  nombre: string;
  email: string;
  telefono: string;
  respuestas: Respuestas;
  source: string;
};

function parsear(data: unknown): Envio | null {
  if (typeof data !== "object" || data === null) return null;
  const d = data as Record<string, unknown>;

  const etapa = d.etapa === "resultado" ? "resultado" : "formulario";
  const nombre = typeof d.nombre === "string" ? d.nombre.trim() : "";
  /* El email se normaliza a minúsculas: es la clave con la que GHL unifica los
     dos envíos, y "Ana@Gmail.com" y "ana@gmail.com" tienen que ser el mismo
     contacto. */
  const email = typeof d.email === "string" ? d.email.trim().toLowerCase() : "";
  const telefono = typeof d.telefono === "string" ? d.telefono.trim() : "";
  const source = typeof d.source === "string" ? d.source.trim() : "";

  if (nombre.length < 2) return null;
  if (!EMAIL_RE.test(email)) return null;
  if (!TEL_RE.test(telefono)) return null;

  const respuestas: Respuestas = {};
  if (typeof d.respuestas === "object" && d.respuestas !== null) {
    const bruto = Object.entries(d.respuestas as Record<string, unknown>);
    for (const [pregunta, opcion] of bruto.slice(0, MAX_RESPUESTAS)) {
      if (typeof opcion === "string" && opcion !== "") {
        respuestas[pregunta] = opcion;
      }
    }
  }

  /* Un "resultado" sin respuestas no es un resultado. Se rechaza en vez de
     guardar un contacto con el diagnóstico vacío, que después nadie sabría
     interpretar en el CRM. */
  if (etapa === "resultado" && Object.keys(respuestas).length === 0) {
    return null;
  }

  return {
    etapa,
    nombre,
    email,
    telefono,
    respuestas,
    source: source || "diagnostico",
  };
}

/* Red de emergencia: deja el lead en los logs con un prefijo fijo y grepeable.
   Se busca "LEAD_FALLBACK" en Vercel → Logs y se carga a mano en el CRM.

   No se escribe a disco a propósito: el sistema de archivos de Vercel es
   efímero y no se comparte entre invocaciones, así que un JSON se perdería sin
   avisar — peor que esto, porque daría una falsa sensación de respaldo. */
function registrarFallback(envio: Envio, motivo: string, extra?: object) {
  console.error(
    `LEAD_FALLBACK ${JSON.stringify({
      ...envio,
      ...extra,
      motivo,
      en: new Date().toISOString(),
    })}`,
  );
}

async function marcar(
  id: string | null,
  estado: "sent" | "failed",
  detalle?: string,
) {
  if (!id) return;
  try {
    await updateLeadStatus(id, estado, detalle);
  } catch (err) {
    console.error("updateLeadStatus falló inesperadamente:", err);
  }
}

export async function POST(request: Request) {
  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return Response.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const envio = parsear(cuerpo);
  if (!envio) {
    return Response.json(
      { error: "Datos incompletos o inválidos." },
      { status: 400 },
    );
  }

  /*
    EL DIAGNÓSTICO SE RECALCULA AQUÍ, no se acepta el que mande el navegador.

    Es lo que decide qué video recibe la persona, así que no puede depender de
    un valor que cualquiera puede editar en las herramientas de desarrollo. El
    cliente manda las respuestas crudas; el veredicto lo pone el servidor.
  */
  const diagnostico =
    envio.etapa === "resultado"
      ? calcularDiagnostico(envio.respuestas)
      : null;

  /*
    RESPALDO EN SUPABASE.

    La tabla tiene columnas fijas (nombre, email, teléfono, source) y no
    podemos añadirle una para la frecuencia. La solución sin migración es
    codificarla en `source`: "diagnostico:miedo". Sigue siendo un campo de
    texto libre usado para lo que es —de dónde viene el lead— y permite
    exportar y filtrar por resultado desde el panel de Supabase.
  */
  const source = diagnostico
    ? `${envio.source}:${diagnostico.dominante}`
    : envio.source;

  let leadId: string | null = null;
  try {
    leadId = await saveLead(
      {
        nombre: envio.nombre,
        email: envio.email,
        telefono: envio.telefono,
        source,
      },
      "pending",
    );
  } catch (err) {
    /* Blindado: el respaldo es un extra, nunca un motivo para perder el lead. */
    console.error("saveLead falló inesperadamente:", err);
  }

  /* Una variable propia para poder mandar el diagnóstico a un workflow
     distinto del de la lista de espera; si no está, se usa la general y ambos
     embudos entran por el mismo sitio (se distinguen por `source`). */
  const webhookUrl =
    process.env.GHL_DIAGNOSTICO_WEBHOOK_URL || process.env.GHL_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error(
      "Ni GHL_DIAGNOSTICO_WEBHOOK_URL ni GHL_WEBHOOK_URL están definidas — el lead no se puede reenviar.",
    );
    registrarFallback(envio, "sin_webhook", {
      frecuencia: diagnostico?.dominante,
    });
    await marcar(leadId, "failed", "sin_webhook");
    /* 200 a propósito: el dato está respaldado y el visitante no tiene por qué
       enterarse de que falta una variable de entorno. */
    return Response.json({ ok: true, encolado: true });
  }

  /*
    EL PAYLOAD VA PLANO, SIN OBJETOS ANIDADOS.

    El mapeador de campos de GHL asocia claves de primer nivel a campos
    personalizados; con un objeto anidado, el técnico del cliente no encuentra
    las claves en el desplegable y acaba mapeando mal.

    Por eso las respuestas viajan como UNA CADENA ("p1:p1d|p2:p2a|…") en vez de
    como objeto o array. Es fea de leer, pero cabe en un campo de texto de GHL,
    se exporta bien a CSV y conserva la información completa para poder
    recalcular el diagnóstico si algún día cambia el modelo de puntaje.
  */
  const carga: Record<string, unknown> = {
    etapa: envio.etapa,
    nombre: envio.nombre,
    email: envio.email,
    telefono: envio.telefono,
    source: envio.source,
    enviado_en: new Date().toISOString(),
  };

  if (diagnostico) {
    carga.frecuencia_dominante = diagnostico.dominante;
    carga.frecuencia_nombre = FICHA_FRECUENCIA[diagnostico.dominante].titulo;
    carga.pct_culpa = diagnostico.porcentajes.culpa;
    carga.pct_apatia = diagnostico.porcentajes.apatia;
    carga.pct_verguenza = diagnostico.porcentajes.verguenza;
    carga.pct_miedo = diagnostico.porcentajes.miedo;
    /* Se guarda si el resultado salió de un desempate para poder medir cuántos
       casos llegan por esa vía. Si son demasiados, el cuestionario necesita
       más preguntas o pesos — y sin este dato no habría forma de saberlo. */
    carga.hubo_empate = diagnostico.huboEmpate;
    carga.respuestas = Object.entries(envio.respuestas)
      .map(([pregunta, opcion]) => `${pregunta}:${opcion}`)
      .join("|");
  }

  try {
    const respuesta = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carga),
    });

    if (!respuesta.ok) {
      const detalle = await respuesta.text().catch(() => "");
      console.error(
        `El webhook de GHL respondió ${respuesta.status}: ${detalle.slice(0, 300)}`,
      );
      registrarFallback(envio, `ghl_${respuesta.status}`, {
        frecuencia: diagnostico?.dominante,
      });
      await marcar(
        leadId,
        "failed",
        `ghl_${respuesta.status}: ${detalle.slice(0, 300)}`,
      );
      return Response.json({ ok: true, encolado: true });
    }
  } catch (err) {
    console.error("No se pudo alcanzar el webhook de GHL:", err);
    registrarFallback(envio, "ghl_inalcanzable", {
      frecuencia: diagnostico?.dominante,
    });
    await marcar(leadId, "failed", "ghl_inalcanzable");
    return Response.json({ ok: true, encolado: true });
  }

  await marcar(leadId, "sent");
  return Response.json({
    ok: true,
    frecuencia: diagnostico?.dominante ?? null,
  });
}
