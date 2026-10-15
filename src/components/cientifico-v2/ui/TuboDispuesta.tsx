"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";
import { DISPUESTA_ITEMS } from "@/components/cientifico-v2/content";
import { Destacado } from "@/components/cientifico-v2/ui/Destacado";
import tubo from "@/../public/cientifico-v2/tubo-cientifico-recorte.png";

gsap.registerPlugin(ScrollTrigger);

/*
  El tubo de ensayo en el lugar del celular de la referencia, con las cuatro
  cards flotando alrededor. El líquido sube con el scroll y cada card se
  enciende cuando el nivel llega a su marca.

  Dos composiciones con el mismo DOM:
  - Desktop (lg): tubo fijo al centro y cards en zigzag. Cada card está a la
    altura exacta de su marca (NIVELES_LG), así el líquido la "toca" cuando
    la enciende. El nivel avanza mientras el tubo cruza la pantalla.
  - Mobile: el layout flotante no entra en 375px. El tubo va en una columna
    fija a la izquierda (sticky) y las cards se apilan; cada una se enciende
    cuando su centro cruza la línea de lectura, como en v1.

  Medidas de la cavidad sobre el alto del tubo (ver .cv2-tubo__cavidad): el
  fondo interior está al 4,81% desde abajo y el nivel máximo ocupa el 84,32%.
*/
const FONDO = 4.81;
const ALTO_UTIL = 84.32;

/* Desktop: nivel de cada card, de abajo hacia arriba. Las posiciones `top`
   de POSICIONES_LG salen de estos números con el tubo de 560px a 20px del
   borde: top = 20 + 560 × (1 − (FONDO + nivel × ALTO_UTIL) / 100).
   ⚠️ Si cambia uno, recalcular el otro. */
const NIVELES_LG = [0.18, 0.4, 0.62, 0.84];

/* Static class strings so Tailwind includes them. Lado de la card y de su
   marca: alternan para formar el zigzag de la referencia. */
const POSICIONES_LG = [
  { card: "lg:right-[calc(50%+132px)] lg:top-[468px] lg:w-[min(370px,calc(50%-142px))]", lado: "izq" },
  { card: "lg:left-[calc(50%+132px)] lg:top-[364px] lg:w-[min(370px,calc(50%-142px))]", lado: "der" },
  { card: "lg:right-[calc(50%+172px)] lg:top-[260px] lg:w-[min(400px,calc(50%-182px))]", lado: "izq" },
  { card: "lg:left-[calc(50%+152px)] lg:top-[156px] lg:w-[min(390px,calc(50%-162px))]", lado: "der" },
] as const;

const BURBUJAS = [
  { x: "18%", t: 5, d: 4.2, retraso: 0, deriva: 3 },
  { x: "42%", t: 3, d: 3.4, retraso: 1.1, deriva: -2 },
  { x: "64%", t: 6, d: 5.1, retraso: 0.6, deriva: 4 },
  { x: "30%", t: 4, d: 4.6, retraso: 2.2, deriva: -3 },
  { x: "74%", t: 3, d: 3.8, retraso: 1.7, deriva: -4 },
];

const n = DISPUESTA_ITEMS.length;
/* Mobile: cada card ocupa un tramo de la lista y se enciende en su mitad. */
const NIVELES_MOBILE = DISPUESTA_ITEMS.map((_, i) => (i + 0.5) / n);

const alto = (nivel: number) => `${FONDO + nivel * ALTO_UTIL}%`;

function useTubo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raiz = ref.current;
    if (!raiz) return;

    const vaso = raiz.querySelector<HTMLElement>(".cv2-tubo");
    const lista = raiz.querySelector<HTMLElement>(".cv2-dispuesta__lista");
    const cards = Array.from(raiz.querySelectorAll<HTMLElement>(".cv2-dispuesta__card"));
    const marcas = Array.from(raiz.querySelectorAll<HTMLElement>(".cv2-tubo__marca"));
    if (!vaso || !lista || cards.length === 0) return;

    const estado = { nivel: 0 };
    let umbrales = NIVELES_MOBILE;

    const pintar = () => {
      vaso.style.setProperty("--nivel", estado.nivel.toFixed(4));
      vaso.classList.toggle("is-vacio", estado.nivel <= 0.001);
      cards.forEach((card, i) => card.classList.toggle("is-encendida", estado.nivel >= umbrales[i] - 0.001));
      marcas.forEach((marca, i) => marca.classList.toggle("is-alcanzada", estado.nivel >= umbrales[i] - 0.001));
    };

    raiz.classList.add("is-listo");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      estado.nivel = 1;
      pintar();
      return () => raiz.classList.remove("is-listo");
    }

    const mm = gsap.matchMedia();
    mm.add({ lg: "(min-width: 1024px)", chico: "(max-width: 1023.98px)" }, (contexto) => {
      const { lg } = contexto.conditions as { lg: boolean };
      umbrales = lg ? NIVELES_LG : NIVELES_MOBILE;

      const disparador = ScrollTrigger.create({
        trigger: lg ? vaso : lista,
        // Desktop: se llena mientras el tubo cruza la pantalla.
        // Mobile: mientras la lista pasa por la línea de lectura.
        start: lg ? "top 80%" : "top 62%",
        end: lg ? "bottom 55%" : "bottom 62%",
        onUpdate: ({ progress }) => {
          // Suaviza los saltos de la ruedita: el líquido llega deslizando.
          gsap.to(estado, { nivel: progress, duration: 0.6, ease: "power2.out", overwrite: true, onUpdate: pintar });
        },
      });

      // Si la página carga pasada la sección, el tubo aparece lleno.
      estado.nivel = disparador.progress;
      pintar();

      return () => gsap.killTweensOf(estado);
    });

    return () => {
      mm.revert();
      raiz.classList.remove("is-listo");
    };
  }, []);

  return ref;
}

export function TuboDispuesta() {
  const ref = useTubo();

  return (
    <div
      ref={ref}
      className="cv2-dispuesta relative grid grid-cols-[52px_minmax(0,1fr)] gap-5 sm:grid-cols-[84px_minmax(0,1fr)] sm:gap-8 lg:block lg:h-[600px]"
    >
      {/* Columna del tubo. Mobile: la celda mide lo mismo que la lista, así
          el sticky tiene recorrido. Desktop: tubo centrado. */}
      <div className="relative lg:absolute lg:inset-x-0 lg:top-[20px] lg:z-10 lg:flex lg:justify-center">
        <div className="sticky top-[28vh] flex justify-start lg:static">
          <div className="cv2-tubo is-vacio w-[44px] sm:w-[56px] lg:w-[136px]" aria-hidden>
            <div className="cv2-tubo__resplandor" />
            <div className="cv2-tubo__cavidad">
              <div className="cv2-tubo__liquido">
                {BURBUJAS.map((b) => (
                  <span
                    key={b.x}
                    className="cv2-tubo__burbuja"
                    style={
                      {
                        left: b.x,
                        "--t": `${b.t}px`,
                        "--d": `${b.d}s`,
                        "--retraso": `${b.retraso}s`,
                        "--deriva": `${b.deriva}px`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            </div>
            <Image src={tubo} alt="" sizes="(min-width: 1024px) 136px, 56px" className="cv2-tubo__vidrio" />

            {/* Graduación: una marca por card, a la altura de su nivel. En
                desktop la marca va del lado de su card; en mobile, todas a la
                derecha y sin número (no hay lugar). */}
            {POSICIONES_LG.map((p, i) => (
              <span
                key={i}
                className={cn(
                  "cv2-tubo__marca bottom-(--m) left-full ml-2 lg:bottom-(--m-lg)",
                  p.lado === "izq" && "lg:left-auto lg:right-full lg:ml-0 lg:mr-2 lg:flex-row-reverse",
                )}
                style={{ "--m": alto(NIVELES_MOBILE[i]), "--m-lg": alto(NIVELES_LG[i]) } as React.CSSProperties}
              >
                <span className="hidden lg:inline">{String(i + 1).padStart(2, "0")}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <ol className="cv2-dispuesta__lista flex flex-col gap-5 lg:static lg:block">
        {DISPUESTA_ITEMS.map((texto, i) => (
          <li
            key={texto}
            className={cn(
              "cv2-dispuesta__card rounded-[14px] border border-white/15 bg-[#17141f]/80 px-6 py-5 text-[1.0625rem] leading-relaxed text-foreground backdrop-blur-md",
              "lg:absolute lg:z-20 lg:-translate-y-1/2",
              POSICIONES_LG[i].card,
            )}
          >
            <Destacado texto={texto} />
          </li>
        ))}
      </ol>
    </div>
  );
}
