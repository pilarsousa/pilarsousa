"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Lock, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import { LANDING } from "@/components/diagnostico/contenido";

/*
  ═══════════════════════════════════════════════════════════════════════════
  LA VISTA PREVIA DEL VIDEO — parece un reproductor, y no lo es
  ═══════════════════════════════════════════════════════════════════════════

  Un fotograma del video de Pilar con un botón de reproducir en el centro. Al
  pulsarlo no se reproduce nada: la imagen se apaga y aparece un candado, igual
  que las cards bloqueadas de /game.

  ── ES EL MISMO RECURSO QUE /game/home ──

  Allí, la card del "Archivo Oculto" se bloquea con tres cosas a la vez
  (src/app/game/home/page.tsx): la ilustración en `grayscale brightness-[0.4]`,
  un candado grande con resplandor encima, y la palabra "BLOQUEADO" debajo. Se
  copian las tres, porque ninguna funciona sola — el candado sobre la imagen a
  todo color se lee como un adorno, y la imagen apagada sin candado se lee como
  un fallo de carga.

  Lo único que cambia es el color del resplandor: allí es cian, que es la
  paleta de /game. Aquí es el verde de acento de esta ruta. Un halo cian en
  esta página se vería como una pieza pegada de otro sitio.

  ── VUELVE SOLO ──

  El bloqueo se deshace a los 2,2 s. Si se quedara puesto, la sección terminaría
  con una imagen gris y muerta para el resto de la visita — y quien lo pulsó por
  curiosidad no tendría forma de recuperar el fotograma. Volviendo, el gesto se
  lee como lo que es: una respuesta, no un estado final.

  ── NO HAY <button> DENTRO DE OTRO <button> ──

  El póster entero es un único botón y el candado es contenido suyo, no un
  control aparte. Anidar botones es HTML inválido y el navegador rompe el árbol
  de formas difíciles de reproducir.
*/

/* Cuánto dura el bloqueo antes de devolver el fotograma.

   Estuvo en 2,2 s —lo justo para leer "bloqueado"— y se sube a 7. Con dos
   segundos el candado se iba antes de que diera tiempo a entender qué había
   pasado, y quedaba como un parpadeo; con siete se sostiene lo suficiente para
   que se lea como un estado y no como un fallo, y sigue volviendo solo sin que
   haya que hacer nada.

   El tope está en que a partir de unos diez segundos deja de parecer una
   respuesta y empieza a parecer que la página se colgó. */
const DURACION_BLOQUEO = 7000;

export function VistaPreviaVideo() {
  const [bloqueado, setBloqueado] = useState(false);
  const temporizador = useRef<number | null>(null);

  /* Un temporizador pendiente al desmontar intentaría escribir estado sobre un
     árbol que ya no existe. */
  useEffect(() => {
    return () => {
      if (temporizador.current !== null) {
        window.clearTimeout(temporizador.current);
      }
    };
  }, []);

  function alPulsar() {
    setBloqueado(true);
    if (temporizador.current !== null) {
      window.clearTimeout(temporizador.current);
    }
    temporizador.current = window.setTimeout(
      () => setBloqueado(false),
      DURACION_BLOQUEO,
    );
  }

  return (
    <button
      type="button"
      onClick={alPulsar}
      className="group relative block w-full overflow-hidden rounded-2xl border border-[var(--dg-borde)]"
    >
      {/* EL FOTOGRAMA. `aspect-video` y no la altura natural: es 1672x941, que
          es 16:9 con un píxel de diferencia, y fijar la proporción evita que la
          caja cambie de alto entre la carga y el pintado.

          quality 90 y no el 75 por defecto: es un retrato con piel y pelo,
          donde el bloque de compresión se ve enseguida. next.config sólo admite
          75 y 90 — cualquier otro valor se ignora en silencio y sirve 75. */}
      <Image
        src={LANDING.regaloImagen}
        alt={LANDING.regaloImagenAlt}
        width={1672}
        height={941}
        quality={90}
        sizes="(min-width: 640px) 24rem, 90vw"
        className={cn(
          "aspect-video w-full object-cover transition-[filter] duration-500",
          bloqueado && "brightness-[0.4] grayscale",
        )}
      />

      {/* EL VELO. La foto está tomada en una habitación clara y el resto de la
          página es casi negra: sin atenuarla, el recuadro es un rectángulo
          blanco que le grita al ojo por encima de todo lo demás. Atenuada, se
          integra y además le da contraste al botón.

          Se retira mientras dura el bloqueo: ahí ya oscurece el propio filtro
          de la imagen, y sumar los dos dejaría el fotograma casi negro y el
          candado flotando sobre nada. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-[rgba(4,8,2,0.34)] transition-opacity duration-500",
          bloqueado && "opacity-0",
        )}
      />

      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        {bloqueado ? (
          <>
            {/* EL CANDADO, con el resplandor del acento de esta ruta. El
                drop-shadow es lo que lo despega de la imagen gris: sin él, un
                icono blanco sobre un fotograma desaturado se pierde entre los
                grises claros de la pared del fondo. */}
            <Lock
              aria-hidden
              className="dg-entra size-12 text-white [filter:drop-shadow(0_0_14px_rgba(163,202,35,0.8))] sm:size-14"
              strokeWidth={1.6}
            />
            {/* aria-live: el estado cambia sin que cambie el foco, así que sin
                esto quien usa un lector de pantalla pulsa el botón y no se
                entera de que ha pasado nada. */}
            <span
              aria-live="polite"
              className="dg-entra text-[0.72rem] font-semibold tracking-[0.18em] text-white/85 uppercase"
            >
              {LANDING.regaloBloqueadoRotulo}
            </span>
          </>
        ) : (
          <>
            {/* El disco de reproducir. En el color de acento y no en blanco
                translúcido: sobre una foto clara, el blanco translúcido
                desaparece — y este disco es lo único que dice que el recuadro
                se puede pulsar. */}
            <span
              aria-hidden
              className="flex size-16 items-center justify-center rounded-full bg-[var(--dg-acento)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] transition-transform duration-200 group-hover:scale-110 sm:size-[4.5rem]"
            >
              {/* El triángulo se desplaza un pelo a la derecha: centrado
                  geométricamente, se ve descentrado hacia la izquierda porque
                  su masa está en ese lado. */}
              <Play
                className="ml-[3px] size-7 fill-[#0b1204] text-[#0b1204] sm:size-8"
                strokeWidth={1.5}
              />
            </span>
          </>
        )}
      </span>

      {/* El rótulo accesible del botón: para un lector de pantalla, un control
          que sólo contiene iconos decorativos es un botón sin nombre. */}
      <span className="sr-only">{LANDING.regaloPlayRotulo}</span>
    </button>
  );
}
