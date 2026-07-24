"use client";

import { useEffect, useState } from "react";

/*
  País del visitante para preseleccionar el prefijo telefónico.

  Se pide a /api/geo al montar el formulario, no al cargar la página: así las
  landings siguen siendo estáticas y sólo quien abre el formulario genera la
  petición. Hasta que llega la respuesta se usa el fallback, de modo que el
  campo es utilizable desde el primer render.

  La respuesta se guarda en sessionStorage: si el visitante abre y cierra el
  modal varias veces, o pasa por los dos formularios, se pide una sola vez.
*/

const FALLBACK = "ES";
const CACHE_KEY = "visitor_country";

export function useVisitorCountry(): string {
  const [country, setCountry] = useState(FALLBACK);

  useEffect(() => {
    let cancelled = false;

    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        setCountry(cached);
        return;
      }
    } catch {
      /* sessionStorage puede lanzar en modo privado — se sigue sin caché. */
    }

    fetch("/api/geo")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data?.country) return;
        setCountry(data.country);
        try {
          sessionStorage.setItem(CACHE_KEY, data.country);
        } catch {
          /* idem: la caché es best-effort. */
        }
      })
      .catch(() => {
        /* Sin geolocalización el formulario funciona igual, con el fallback. */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return country;
}
