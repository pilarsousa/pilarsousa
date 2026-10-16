import type { Atribucion } from "@/lib/sierra";

/*
  Atribución (ruta y UTM) que los formularios mandan en el cuerpo JSON con
  leerAtribucion() (components/sierra-tracking). Es la versión fetch/JSON de
  atribucionDe(formData) del kit, que sólo sirve para FormData.

  Viene del navegador, así que no se confía en ella: sólo strings, la ruta
  tiene que empezar con "/" y todo se recorta. Lo que no cumple queda en
  null, y el lead se avisa igual, sin atribución.

  Sólo la leen los route handlers para avisar al panel de Sierra; nunca se
  reenvía a GoHighLevel ni se guarda en Supabase.
*/

const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

function texto(valor: unknown, max: number): string | null {
  return typeof valor === "string" && valor.trim() !== "" ? valor.trim().slice(0, max) : null;
}

export function atribucionDeJson(cuerpo: unknown): Atribucion {
  const d = typeof cuerpo === "object" && cuerpo !== null ? (cuerpo as Record<string, unknown>) : {};
  const ruta = texto(d.path, 200);
  const utmBruto = typeof d.utm === "object" && d.utm !== null ? (d.utm as Record<string, unknown>) : {};

  const utm: NonNullable<Atribucion["utm"]> = {};
  for (const nombre of UTM) utm[nombre] = texto(utmBruto[nombre], 120);

  return { path: ruta?.startsWith("/") ? ruta : null, utm };
}
