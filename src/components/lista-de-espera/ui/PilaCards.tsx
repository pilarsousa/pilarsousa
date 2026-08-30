"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import { LineaGlow } from "@/components/lista-de-espera/ui/LineaGlow";
import { cn } from "@/lib/cn";

/* Todo en vw, porque la columna mide un porcentaje del ancho de la ventana. */
/*
  Franja que asoma de cada card ya tapada, en vw. HAY DOS, y no es capricho:

  · En ESCRITORIO la card es apaisada y su texto va arriba a la izquierda, así
    que una franja del 28% de su alto enseña la línea de neón y el primer
    renglón del título. Se ven las cinco apiladas.

  · En MÓVIL la card es vertical y su texto va ABAJO, sobre la ilustración. Una
    franja superior no enseñaría más que artwork, así que el paso es cero y
    cada card tapa entera a la anterior.

  Cambiar el de escritorio es cambiar un número: el relleno, el margen y el
  calzo final se derivan de él.
*/
const PASO_ESC = 4.37;
/* En móvil la card es vertical y su texto va ABAJO, así que la franja que asoma
   enseña ilustración y la línea de neón, nunca el título. Aun así se deja
   franja: sin ella no se lee como pila —se ve la card siguiente subiendo por
   debajo, una detrás de otra— y el efecto no existe. Con 3vw asoma un canto de
   unos 12 px por card, lo justo para que se lea como baraja. */
const PASO_MOV = 3;
/* EL HUECO VA EN PÍXELES Y NO EN vw, al revés que todo lo demás de esta pantalla.
   A propósito: en vw se encogía al bajar la resolución —25 px a 1920 se quedaban
   en 19 a 1440— y una separación entre cards no es una medida del diseño que
   deba escalar, es aire para que se distingan. Se mezcla con el paso en vw
   dentro de un calc, que CSS resuelve sin problema. */
const HUECO = "30px";

/* Aire entre la última card y el botón, en vw. Entra en la cuenta del calzo
   final, así que se cambia aquí y no con un margen suelto.

   ⚠️ HAY DOS, Y EN MÓVIL ES MUCHO MAYOR. No es una preferencia: con el valor de
   escritorio, en móvil el botón SE PEGABA a la última card al terminar de
   scrollear la pila.

   La cuenta lo explica. El calzo mide n·paso + aire − hueco, y en móvil el paso
   es 3: 5·3 + 1,5 − 30px = 16,5vw − 30px, que en un teléfono de 390 son 64 − 30
   = 34 px de separación REAL bajo la última card. Y las cards están clavadas con
   `sticky top-[12vh]`, así que al completarse la pila el botón sube hasta
   quedarse a esos 34 px — que a esa distancia se leen como pegado.

   En escritorio el problema no existe porque el botón tiene su propia pista
   sticky de 28vw que lo retiene abajo; en móvil no hay pista, el botón va en el
   flujo y lo único que lo separa es este número.

   Con 14 la cuenta da 29vw − 30px, unos 83 px a 390: el botón se lee como una
   pieza aparte y no como el pie de la última card. */
const AIRE_ESC = 1.5;
const AIRE_MOV = 14;
const FIN_TITULO = 5.07; // dónde acaba un título de dos renglones, desde el canto

type Item = { title: string; text: string };

/*
  La pila de cards de la sección 4.

  ── POR QUÉ TODAS SE CLAVAN A LA MISMA ALTURA ──

  El escalón entre cards NO lo da el `top` —todas se clavan al mismo— sino un
  relleno superior transparente que crece un paso por card. El resultado en
  pantalla es idéntico; lo que cambia es cuándo se suelta cada una.

  HOY EL PASO ES CERO, así que no hay escalón y sólo se ve una card a la vez.
  La maquinaria sigue montada porque el paso es un número: subirlo devuelve el
  canto asomando sin tocar nada más.

  ── POR QUÉ TODAS SE SUELTAN A LA VEZ ──

  Un elemento `sticky` se despega cuando el fondo de su contenedor lo alcanza, y
  ese instante NO es el mismo para todos: se suelta primero aquel cuyo
  `top + alto` es mayor, o sea EL ÚLTIMO. Dejado a su aire, al completarse la
  pila la card 5 se despegaba antes que la 4 y subía pisándola hasta dejarle una
  franja de nada: dos líneas de neón pegadas sin nada en medio.

  Y EL DATO QUE LO GOBIERNA TODO: `sticky` no constriñe la caja de borde, sino
  la CAJA DE MARGEN. Una card se suelta cuando `top + alto + margen` deja de
  caber en el contenedor. Con el escalón en el `top`, ese número crece con el
  índice y la última se suelta SIEMPRE la primera, suba pisando a la anterior.

  Un intento anterior lo igualaba con un relleno inferior de (n-1-i) pasos. Se
  veía bien hasta que hubo que emparejar los huecos con un margen negativo — y el
  margen deshace la igualación, porque entra en la misma caja. Hueco uniforme y
  soltado simultáneo son incompatibles mientras el escalón viva en el `top`.

  Con el escalón en el relleno superior, en cambio, `top` es constante y la caja
  de margen de cada card mide alto + hueco − paso, la misma para todas. Se
  sueltan a la vez y ninguna puede adelantar a otra. El hueco visible sigue
  siendo el mismo para las cinco.

  ── EL MARGEN NEGATIVO ──

  El relleno superior, a solas, separaría las cards sin apilar cada vez más. El
  margen de (hueco − (i+1)·paso) lo compensa: al sumarse relleno y margen, la
  parte en vw se cancela y lo que queda es el hueco, igual para todas y en la
  unidad que se le ponga. Por eso puede ir en píxeles aunque el paso vaya en vw.

  Los tres valores —relleno superior, margen y calzo final— son un solo cálculo.
  Tocar uno sin recalcular los otros rompe el apilado sin dar ningún error.

  ── EL SEGUNDO RENGLÓN DEL TÍTULO ──

  Los títulos de dos renglones quedaban cortados por la mitad de las letras al
  taparse la card, porque el recorte cae al 28% del alto y el segundo renglón
  vive a caballo de esa línea. Ahora el título se recorta a un renglón ANTES de
  que la card de arriba llegue a comérselo, así que nunca se ve media letra.

  ── CÓMO SE DETECTA, Y POR QUÉ ASÍ ──

  Con IntersectionObserver y una marca por card, NO escuchando el scroll. La
  marca es un elemento estático colocado en la posición de reposo de cada card;
  cuando cruza hacia arriba el punto donde esa card se clava, la de debajo está a
  punto de quedar tapada. No se puede observar la card misma: al estar clavada,
  su rectángulo se queda quieto y no cruza nunca nada.

  El disparo se adelanta hasta donde acaba el título en vez de esperar al punto
  de clavado, porque la card de arriba empieza a tapar ANTES de clavarse: si se
  espera, se llega a ver el renglón cortado durante ese tramo.

  El margen se lee de la posición ya calculada por CSS —`getComputedStyle`— en
  vez de repetir la fórmula aquí. Duplicarla significaría que cambiar el paso en
  un sitio y no en el otro descuadra la detección sin dar ningún error.
*/
export function PilaCards({
  items,
  fondos,
  fondosMovil,
}: {
  items: readonly Item[];
  fondos: readonly StaticImageData[];
  fondosMovil: readonly StaticImageData[];
}) {
  const n = items.length;
  const lis = useRef<(HTMLLIElement | null)[]>([]);
  const marcas = useRef<(HTMLSpanElement | null)[]>([]);
  const [tapadas, setTapadas] = useState<boolean[]>(() => items.map(() => false));

  useEffect(() => {
    const cajas = lis.current;
    const puntos = marcas.current;
    let observadores: IntersectionObserver[] = [];

    const montar = () => {
      observadores.forEach((o) => o.disconnect());
      observadores = [];

      for (let j = 1; j < n; j++) {
        const li = cajas[j];
        const marca = puntos[j];
        if (!li || !marca) continue;

        /* La marca se planta en la posición de reposo de la card j. offsetTop da
           la de maquetación, no la de clavado, que es justo lo que hace falta. */
        marca.style.top = `${li.offsetTop}px`;

        const clavado = Number.parseFloat(getComputedStyle(li).top);
        if (!Number.isFinite(clavado)) continue;
        /* Se adelanta con el paso de ESCRITORIO: el recorte del título sólo
           importa donde hay franja visible. */
        const adelanto = window.innerWidth * ((FIN_TITULO - PASO_ESC) / 100);

        const obs = new IntersectionObserver(
          ([entrada]) => {
            const tapada = !entrada.isIntersecting;
            setTapadas((previo) =>
              previo[j - 1] === tapada
                ? previo
                : previo.map((v, k) => (k === j - 1 ? tapada : v)),
            );
          },
          { rootMargin: `-${clavado + adelanto}px 0px 0px 0px` },
        );
        obs.observe(marca);
        observadores.push(obs);
      }
    };

    montar();
    window.addEventListener("resize", montar);
    return () => {
      observadores.forEach((o) => o.disconnect());
      window.removeEventListener("resize", montar);
    };
  }, [n]);

  return (
    <div className="relative mx-auto w-[87%] md:w-[39.27%]">
      {items.map((item, j) =>
        j === 0 ? null : (
          <span
            key={item.title}
            ref={(el) => {
              marcas.current[j] = el;
            }}
            aria-hidden
            className="pointer-events-none absolute left-0 h-px w-full"
          />
        ),
      )}

      <ol>
        {items.map((item, i) => (
          <li
            key={item.title}
            ref={(el) => {
              lis.current[i] = el;
            }}
            /* SE APILA IGUAL EN MÓVIL. Las medidas viajan como variables CSS
               —un `style` en línea no entiende de puntos de ruptura— pero con el
               paso a cero todas valen lo mismo en cualquier ancho: relleno 0 y
               margen de 30 px. Así que el apilado no necesita variante. */
            className="sticky top-[12vh] mb-[var(--le-abajo-mov)] pt-[var(--le-arriba-mov)] md:mb-[var(--le-abajo-esc)] md:pt-[var(--le-arriba-esc)]"
            style={
              {
                "--le-arriba-mov": `${i * PASO_MOV}vw`,
                "--le-abajo-mov": `calc(${HUECO} - ${(i + 1) * PASO_MOV}vw)`,
                "--le-arriba-esc": `${i * PASO_ESC}vw`,
                "--le-abajo-esc": `calc(${HUECO} - ${(i + 1) * PASO_ESC}vw)`,
              } as CSSProperties
            }
          >
            <article className="relative">
              <Image
                src={fondosMovil[i]}
                alt=""
                aria-hidden
                quality={90}
                sizes="87vw"
                className="h-auto w-full md:hidden"
              />
              <Image
                src={fondos[i]}
                alt=""
                aria-hidden
                quality={90}
                sizes="(min-width: 768px) 40vw, 87vw"
                className="hidden h-auto w-full md:block"
              />

              <LineaGlow className="absolute top-0 left-1/2 -translate-x-1/2" />

              {/* ── EL BLOQUE DE TEXTO ──

                  EN ESCRITORIO VA CENTRADO VERTICALMENTE EN EL PANEL, con el
                  título y el cuerpo fluyendo uno tras otro dentro de él.

                  ANTES ERAN DOS CAJAS ABSOLUTAS INDEPENDIENTES —el título en
                  top-[14%] y el cuerpo en top-[calc(14%+2.1em)]— y de ahí venía
                  el descuadre: esos 2,1em son el alto de un título de UN
                  renglón, así que en las cards cuyo título ocupa dos, el
                  segundo renglón caía justo encima del párrafo. Se veían
                  colapsados uno sobre otro, y no era el sticky ni el
                  IntersectionObserver: era la maquetación.

                  Ahora son una sola caja y el cuerpo fluye tras el título con
                  su propio margen, así que da igual cuántos renglones ocupe:
                  el hueco es siempre el mismo y el conjunto se mantiene
                  centrado respecto del panel.

                  EL TEXTO SIGUE ALINEADO A LA IZQUIERDA. Centrado es el bloque
                  —su posición en el eje vertical—, no la letra.

                  md:inset-y-0 + flex + justify-center es lo que lo centra: la
                  caja ocupa todo el alto de la card y su contenido se agrupa en
                  el medio. Con un top en porcentaje habría que recalcularlo
                  cada vez que cambia la longitud de un texto.

                  ⚠️ NO AÑADIR md:bottom-auto NI md:top-auto. Estuvieron aquí y
                  el texto se iba TODO ARRIBA: `inset-y-0` no es más que
                  `top:0; bottom:0`, así que una utilidad de `bottom` posterior
                  lo pisa, la caja se queda sin borde inferior y colapsa al alto
                  de su contenido. Sin alto que repartir, `justify-center` no
                  centra nada. Para anular el `bottom-0` del móvil ya basta con
                  `inset-y-0`; añadir un `auto` encima lo deshace. */}
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 px-[7%] pb-[7%]",
                  "md:inset-y-0 md:right-auto md:left-[10%] md:flex md:w-[36%] md:flex-col md:justify-center md:p-0",
                )}
              >
                <h3
                  className={cn(
                    "font-display text-[6vw] leading-[1.15] text-[#f4f1e4]",
                    "md:text-[clamp(0.7rem,1.2vw,1.55rem)] md:leading-[1.2]",
                    tapadas[i] && "line-clamp-1",
                  )}
                >
                  {item.title}
                </h3>

                <p className="mt-[2.5vw] font-sans text-[4vw] leading-[1.45] text-[#c9cec0] md:mt-[0.55vw] md:text-[clamp(0.45rem,0.8vw,1rem)] md:leading-[1.5]">
                  {item.text}
                </p>
              </div>
            </article>
          </li>
        ))}
        {/* CALZO FINAL: lo que falta para que el borde del contenedor caiga
            debajo de la última card y no encima. Su alto sale de la cuenta, no
            del ojo — n·paso + aire − hueco.

            EL MÍNIMO DE 1px NO ES UNA PRECAUCIÓN VAGA, EVITA UN COLAPSO DE
            MÁRGENES. Con paso cero la cuenta da negativo y el calzo se quedaba en
            cero — y un elemento de alto cero no detiene el margen inferior de la
            última card: esos 30 px se escapaban fuera del <ol>, que quedaba 30 px
            más corto de lo que supone el cálculo.

            Y eso se veía. Al empezar a empujar el borde inferior del contenedor,
            las cuatro primeras quedaban 30 px POR ENCIMA de la última; como
            todas suben luego al mismo ritmo, el desfase no se cerraba nunca y la
            penúltima se quedaba asomando para siempre. Un píxel de alto basta
            para que el margen no atraviese.

            Retener la pila más tiempo no es cuestión de subir este número: el
            calzo es a la vez espacio real bajo la card, así que alargarlo aleja
            el botón en la misma medida. Son la misma distancia vista de dos
            formas. */}
        <li
          aria-hidden
          className="md:hidden"
          style={{
            height: `max(1px, calc(${items.length * PASO_MOV + AIRE_MOV}vw - ${HUECO}))`,
          }}
        />
        {/* DOS CALZOS Y NO UNO CON CLASES POR PUNTO DE RUPTURA: su alto depende
            del paso, y una clase de Tailwind armada en tiempo de ejecución no
            existe — Tailwind rastrea el código fuente en busca de cadenas
            literales, así que nunca generaría esa regla. Con dos elementos, el
            alto va en estilo en línea, que sí admite valores calculados, y el
            punto de ruptura decide cuál de los dos está en el flujo. */}
        <li
          aria-hidden
          className="hidden md:block"
          style={{
            height: `max(1px, calc(${items.length * PASO_ESC + AIRE_ESC}vw - ${HUECO}))`,
          }}
        />
      </ol>
    </div>
  );
}
