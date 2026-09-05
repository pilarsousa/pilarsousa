"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { BadgeCheck, Lock, MailCheck, Play, Sparkles, Target } from "lucide-react";
import { cn } from "@/lib/cn";
import { LANDING } from "@/components/diagnostico/contenido";
import { AvisoFlotante } from "@/components/diagnostico/ui/AvisoFlotante";

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
  paleta de /game. Aquí es el crema de acento de esta ruta. Un halo cian en
  esta página se vería como una pieza pegada de otro sitio.

  ── VUELVE SOLO ──

  El bloqueo se deshace a los 7 s. Si se quedara puesto, la sección terminaría
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
const ICONOS_REGALO = [Target, BadgeCheck, MailCheck] as const;

export function VistaPreviaVideo() {
  const [bloqueado, setBloqueado] = useState(false);
  /* ── EL AVISO VA EN SU PROPIO ESTADO, NO ATADO A `bloqueado` ──

     Los dos empiezan a la vez, pero no duran lo mismo: el aviso se va a los 3 s
     —cuando lleva al formulario— y el candado se queda 7. Con una sola bandera,
     o el candado se iría antes de tiempo o el aviso se quedaría flotando sobre
     el formulario mientras se escribe en él. */
  const [avisoVisible, setAvisoVisible] = useState(false);
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

  /* useCallback porque se pasa como prop al aviso, que lo tiene en las
     dependencias de su efecto: una función nueva en cada render reiniciaría su
     temporizador en cada render y el salto no llegaría nunca. */
  const cerrarAviso = useCallback(() => setAvisoVisible(false), []);

  function alPulsar() {
    if (bloqueado) {
      return;
    }

    setBloqueado(true);
    setAvisoVisible(true);
    if (temporizador.current !== null) {
      window.clearTimeout(temporizador.current);
    }
    temporizador.current = window.setTimeout(
      () => setBloqueado(false),
      DURACION_BLOQUEO,
    );
  }

  return (
    <section
      aria-labelledby="regalo-titulo"
      aria-busy={bloqueado}
      className="dg-borde-giro relative mt-14 w-full rounded-[calc(1.5rem+1px)] p-px sm:mt-16"
    >
      <div className="dg-relieve relative overflow-hidden rounded-3xl bg-[var(--dg-fondo-alto)] p-5 sm:p-7 lg:p-8">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,var(--dg-brillo-suave)_0%,transparent_28%,transparent_68%,var(--dg-brillo-suave)_100%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--dg-acento),transparent)]"
        />

        <div className="relative grid gap-6 lg:grid-cols-[0.85fr_1.25fr] lg:items-center lg:gap-8">
          <div className="min-w-0 text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--dg-borde-vivo)] bg-[var(--dg-superficie)] px-3 py-1 text-[0.7rem] font-semibold tracking-[0.14em] text-[var(--dg-acento)] uppercase">
              <Sparkles className="size-3.5" aria-hidden strokeWidth={1.8} />
              Tu recurso personalizado
            </p>

            <h2
              id="regalo-titulo"
              className="dg-titulo mt-4 text-2xl leading-tight text-balance text-[var(--dg-texto)] sm:text-3xl"
            >
              {LANDING.regaloTitulo}
            </h2>

            <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-[var(--dg-texto-suave)]">
              {LANDING.regaloTexto}
            </p>

            <ul className="mt-6 grid gap-3">
              {LANDING.regaloPuntos.map((punto, indice) => {
                const Icono = ICONOS_REGALO[indice] ?? BadgeCheck;

                return (
                  /* ── DE VIDRIO ESMERILADO A LÁMINA SÓLIDA ──

                     Era un blanco al 10% con el fondo desenfocado por detrás.
                     Ahora es crema opaco con el relieve de las tarjetas claras:
                     luz arriba, sombra abajo. Ver .dg-claro y .dg-relieve-claro
                     en diagnostico.css.

                     El translúcido dependía de que hubiera algo interesante
                     detrás, y detrás sólo hay el verde plano de la tarjeta: el
                     desenfoque no desenfocaba nada y lo único que quedaba era un
                     gris lavado. En sólido, las tres píldoras son la pieza más
                     clara de la sección y se leen antes que el texto de arriba
                     — que es lo que tiene que pasar con la lista de lo que se
                     recibe.

                     .dg-claro les da la vuelta a los tokens, así que el disco
                     del icono se invierte solo: pasa a verde con el símbolo en
                     crema, sin tocar sus clases.

                     ── `items-center` Y NO `items-start` ──

                     Con el texto arriba, un punto de una sola línea dejaba el
                     icono y la frase pegados al canto superior y un hueco debajo:
                     la píldora se veía descolgada. Centrados, los dos comparten
                     eje sea cual sea el número de renglones — y por eso también
                     se va el `mt-0.5` del disco, que existía para compensar a
                     ojo la primera línea del texto. */
                  <li
                    key={punto}
                    className="dg-claro dg-relieve-claro flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm leading-snug text-[var(--dg-texto)]"
                  >
                    <span
                      aria-hidden
                      className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--dg-acento)] text-[var(--dg-acento-oscuro)]"
                    >
                      <Icono className="size-3.5" strokeWidth={1.9} />
                    </span>
                    <span>{punto}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="min-w-0">
            <button
              type="button"
              onClick={alPulsar}
              disabled={bloqueado}
              className={cn(
                "dg-video-preview group relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-[var(--dg-borde-vivo)] bg-black text-left shadow-[0_22px_70px_-38px_rgba(0,0,0,0.95)] transition-[border-color,box-shadow,transform] duration-300 hover:border-[var(--dg-acento)] hover:shadow-[0_28px_80px_-42px_var(--dg-brillo-fuerte)] focus-visible:translate-y-0 disabled:cursor-wait",
                bloqueado && "border-[var(--dg-acento)]",
              )}
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
                /* El bloque vuelve a vivir dentro de una card ancha: en
                   escritorio el fotograma ocupa la columna protagonista, y en
                   móvil la tarjeta completa. */
                sizes="(min-width: 1024px) 36rem, (min-width: 640px) 44rem, 90vw"
                className={cn(
                  "aspect-video w-full object-cover transition-[filter,transform] duration-500 group-hover:scale-[1.015]",
                  bloqueado && "brightness-[0.4] grayscale group-hover:scale-100",
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
                  "pointer-events-none absolute inset-0 bg-[var(--dg-velo-leve)] transition-opacity duration-500",
                  bloqueado && "opacity-0",
                )}
              />

              <span
                aria-hidden
                className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-white/85 uppercase backdrop-blur-sm"
              >
                Vista previa
              </span>

              <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                {bloqueado ? (
                  <>
                    {/* ══ EL CANDADO, RECORTADO EN UN DISCO DE CREMA ══

                        ── POR QUÉ NO VA SUELTO SOBRE LA FOTO ──

                        Estuvo suelto, blanco y con un resplandor crema alrededor, y ese
                        resplandor era lo único que lo despegaba del fotograma gris.
                        Pedido el candado EN EL COLOR DEL FONDO DE LA SECCIÓN, suelto no
                        se vería: verde oscuro sobre el fotograma atenuado son 1,5:1 —
                        un trazo de 1,6 px a esa distancia desaparece, y no hay
                        resplandor que arregle un icono que ya es del color de la
                        sombra.

                        Sobre el disco de crema se lee como un agujero recortado en la
                        luz hasta el fondo de la sección, que es
                        exactamente lo que se pidió: el color del fondo de la sección.

                        ── Y ADEMÁS EMPAREJA LOS DOS ESTADOS ──

                        Es el mismo disco que el de reproducir, en el mismo sitio y del
                        mismo tamaño. Los dos estados del recuadro pasan a ser el mismo
                        objeto cambiando de símbolo, en vez de un disco y un icono
                        suelto que no se parecen en nada.

                        Sin `group-hover:scale-110`, al revés que el de reproducir: aquí
                        ya se ha pulsado y no hay nada que invitar.

                        ⚠️ El triángulo de reproducir y el candado usan el mismo fondo
                        de sección para que los dos discos respondan al mismo sistema. */}
                    <span
                      aria-hidden
                      className="dg-entra flex size-16 items-center justify-center rounded-full bg-[var(--dg-acento)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] sm:size-[4.5rem]"
                    >
                      <Lock
                        className="size-7 text-[var(--dg-fondo)] sm:size-8"
                        strokeWidth={1.8}
                      />
                    </span>
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
                        className="ml-[3px] size-7 fill-[var(--dg-acento-oscuro)] text-[var(--dg-acento-oscuro)] sm:size-8"
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
          </div>
        </div>

        {bloqueado && (
          <span
            aria-hidden
            className="absolute inset-0 z-30 cursor-wait rounded-3xl"
          />
        )}
      </div>

      {/* ── EL AVISO QUE SUBE Y LLEVA AL FORMULARIO ──

          El candado explica que el video está bloqueado, pero no dice qué hacer
          para desbloquearlo — y quien acaba de pulsar "reproducir" es
          exactamente quien más cerca está de hacerlo.

          El aviso lo dice y, a los 3 segundos, lo hace: sube a la tarjeta del
          formulario. Ver AvisoFlotante para el detalle del temporizador y de la
          salida.

          `#empezar` es el id de la sección del formulario, puesto en page.tsx.
          Va sin la almohadilla porque el componente resuelve con
          getElementById, no con un selector. */}
      {avisoVisible && (
        <AvisoFlotante
          texto={LANDING.regaloAvisoTexto}
          destino="empezar"
          alCerrar={cerrarAviso}
        />
      )}
    </section>
  );
}
