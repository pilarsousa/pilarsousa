import { FECHA_EVENTO, PAISES, ZONA_HORARIA } from "@/components/neurometafisica-v1/content";

/*
  El instante del seminario y su hora en cada país.

  FECHA_EVENTO está en hora de Madrid. Se lee qué hora muestra Madrid en ese
  instante en vez de fijar el desfase, así el cambio de horario de octubre no
  lo rompe; y la hora de cada país se pide a Intl con su zona, que ya sabe si
  ese día tiene horario de verano.

  Corre igual en el servidor (la tabla sale en el HTML estático) y en el
  navegador (la cuenta atrás).
*/

/** Desfase (ms) de una zona en un instante UTC: hora de la zona − UTC. */
function desfaseZona(fechaUtc: Date, zona: string): number {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: zona,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(fechaUtc);
  const valor = (t: string) => Number(partes.find((p) => p.type === t)?.value);
  const comoUtc = Date.UTC(
    valor("year"),
    valor("month") - 1,
    valor("day"),
    valor("hour") === 24 ? 0 : valor("hour"),
    valor("minute"),
    valor("second"),
  );
  return comoUtc - fechaUtc.getTime();
}

/** Instante (ms UTC) en que empieza el seminario. */
export function instanteEvento(): number {
  const { year, month, day, hour, minute } = FECHA_EVENTO;
  const ingenuo = Date.UTC(year, month - 1, day, hour, minute, 0);
  return ingenuo - desfaseZona(new Date(ingenuo), ZONA_HORARIA);
}

/** "19:00 h" en la zona dada. */
export function horaEn(zona: string): string {
  const hora = new Intl.DateTimeFormat("es-ES", {
    timeZone: zona,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(instanteEvento()));
  return `${hora} h`;
}

/** "sáb 17 oct." en la zona dada: en América puede caer otro día. */
export function diaEn(zona: string): string {
  return new Intl.DateTimeFormat("es-ES", {
    timeZone: zona,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(instanteEvento()));
}

/** Hora del seminario en cada país del público, en el orden de PAISES. */
export function horarios() {
  return PAISES.map(({ pais, zona }) => ({ pais, hora: horaEn(zona), dia: diaEn(zona) }));
}
