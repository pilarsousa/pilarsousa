"use client";

import { useSyncExternalStore } from "react";

/*
  La hora de inicio en la zona horaria de quien visita.

  ── LA CUENTA ATRÁS NO NECESITA ESTO; EL TEXTO SÍ ──

  BOOTCAMP_START es un instante absoluto (lleva su desfase, +02:00), así que el
  contador marca lo mismo en Madrid que en Buenos Aires: cuánto falta. Lo que
  confunde es leer "18:00 · España" sin saber qué hora es eso en tu país. Esto
  lo traduce con el reloj del navegador y lo devuelve SÓLO si es distinto de la
  hora española: a quien está en España no se le repite lo mismo.

  Si el día también cambia (Asia, Oceanía), se incluye la fecha: "10 oct,
  01:00" y no un "01:00" que haría creer que es el mismo día.

  ── POR QUÉ useSyncExternalStore ──

  En el servidor no se conoce la zona del visitante. getServerSnapshot devuelve
  null, el HTML sale sin la pista, y el cliente la añade al hidratar sin
  desajuste. La zona horaria no cambia durante la visita, así que no hay nada a
  lo que suscribirse.
*/

const MADRID = "Europe/Madrid";
const noop = () => () => {};

function localHint(target: string): string | null {
  const date = new Date(target);
  const time: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };
  const day: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };

  const madridTime = date.toLocaleString("es-ES", { ...time, timeZone: MADRID });
  const localTime = date.toLocaleString("es-ES", time);
  const madridDay = date.toLocaleString("es-ES", { ...day, timeZone: MADRID });
  const localDay = date.toLocaleString("es-ES", day);

  if (madridTime === localTime && madridDay === localDay) return null;
  return madridDay === localDay ? localTime : `${localDay}, ${localTime}`;
}

/** "13:00" / "10 oct, 01:00" in the visitor's zone, or null if it matches Spain. */
export function useLocalStartTime(target: string): string | null {
  return useSyncExternalStore(
    noop,
    () => localHint(target),
    () => null,
  );
}

/** Inline "· 13:00 en tu hora" hint; renders nothing in Spain or on the server. */
export function LocalStartTime({
  target,
  className,
  prefix = "",
  suffix = "",
}: {
  target: string;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const hint = useLocalStartTime(target);
  if (!hint) return null;
  return (
    <span className={className}>
      {prefix}
      {hint} en tu hora
      {suffix}
    </span>
  );
}
