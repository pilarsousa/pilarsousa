"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Atom, FlaskConical, Gift, Microscope, type LucideIcon } from "lucide-react";
import tubo from "@/../public/cientifico-v1/tubo-cientifico-recorte.png";

gsap.registerPlugin(ScrollTrigger);

/* ⚠️ COPY TEMPORAL — reemplazar cuando llegue el definitivo.
   Los datos viven acá (y no en la sección) porque los íconos son componentes:
   no se pueden pasar de un server component a uno de cliente. */
const HALLAZGOS: Array<{ icon: LucideIcon; titulo: string; texto: string }> = [
  {
    icon: FlaskConical,
    titulo: "Título temporal del primer hallazgo",
    texto:
      "Texto temporal. Describe en una o dos frases el primer aprendizaje concreto que se lleva la persona.",
  },
  {
    icon: Atom,
    titulo: "Título temporal del segundo hallazgo",
    texto:
      "Texto temporal. Describe el segundo aprendizaje: qué va a poder hacer distinto después del evento.",
  },
  {
    icon: Microscope,
    titulo: "Título temporal del tercer hallazgo",
    texto:
      "Texto temporal. Describe el tercer aprendizaje y cómo se aplica en el día a día.",
  },
  {
    icon: Gift,
    titulo: "Título temporal del regalo",
    texto:
      "Texto temporal. Describe el regalo o certificado que reciben quienes participan en vivo.",
  },
];

/** Altura de la pantalla a la que se "lee": cuando el centro de una card
 *  cruza esta línea, el líquido llega a su marca. Igual que registro-v3. */
const LINEA_DE_LECTURA = "62%";

/* Burbujas: posición dentro de la cavidad, tamaño, duración, retraso y
   deriva lateral. Tiempos distintos para que nunca suban en bloque. */
const BURBUJAS = [
  { x: "18%", t: 5, d: 4.2, retraso: 0, deriva: 3 },
  { x: "42%", t: 3, d: 3.4, retraso: 1.1, deriva: -2 },
  { x: "64%", t: 6, d: 5.1, retraso: 0.6, deriva: 4 },
  { x: "30%", t: 4, d: 4.6, retraso: 2.2, deriva: -3 },
  { x: "74%", t: 3, d: 3.8, retraso: 1.7, deriva: -4 },
];

/* Medidas de la cavidad sobre la altura del tubo (ver cientifico-v1.css):
   el fondo interior está al 4,81% desde abajo y el nivel máximo ocupa el
   84,32% del alto. Las marcas se ubican con esto. */
const FONDO = 4.81;
const ALTO_UTIL = 84.32;

/**
 * Tubo que se llena con el scroll. Cada card es un tramo del tubo: el nivel
 * sube un 1/n mientras la lectura avanza del borde de arriba de la lista al
 * centro de la primera card, otro 1/n hasta el centro de la segunda, y así.
 * Cuando el nivel llega a la marca de una card, la card se enciende. Al subir,
 * el líquido baja y las cards se apagan.
 *
 * Las posiciones se miden (el alto de cada card depende de sus renglones).
 * Hasta medir, las cards se ven encendidas y el tubo vacío: la clase
 * is-listo habilita el estado apagado recién cuando el tubo puede dibujarse.
 */
function useTubo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raiz = ref.current;
    if (!raiz) return;

    const vaso = raiz.querySelector<HTMLElement>(".cv1-tubo");
    const cards = Array.from(raiz.querySelectorAll<HTMLElement>(".cv1-hallazgo"));
    const marcas = Array.from(raiz.querySelectorAll<HTMLElement>(".cv1-tubo__marca"));
    if (!vaso || cards.length === 0) return;

    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // avance: de 0 (lectura en el borde de arriba de la lista) a 1 (centro
    // de la última card)
    const estado = { avance: sinMovimiento ? 1 : 0 };
    // nudos[0] = borde superior de la primera card; nudos[i + 1] = centro de
    // la card i. Todos relativos a la raíz.
    let nudos: number[] = [];

    const pintar = () => {
      const y = nudos[0] + estado.avance * (nudos[nudos.length - 1] - nudos[0]);

      let nivel = 0;
      for (let i = 1; i < nudos.length; i++) {
        const desde = nudos[i - 1];
        const largo = nudos[i] - desde;
        const p = largo > 0 ? Math.min(1, Math.max(0, (y - desde) / largo)) : y >= nudos[i] ? 1 : 0;
        nivel += p / cards.length;
      }

      vaso.style.setProperty("--nivel", nivel.toFixed(4));
      vaso.classList.toggle("is-vacio", nivel <= 0.001);

      cards.forEach((card, i) => {
        card.classList.toggle("is-encendido", estado.avance > 0 && y >= nudos[i + 1] - 1);
      });
      marcas.forEach((marca, i) => {
        marca.classList.toggle("is-alcanzada", nivel >= (i + 1) / cards.length - 0.001);
      });
    };

    const medir = () => {
      const base = raiz.getBoundingClientRect();
      const primera = cards[0].getBoundingClientRect();
      nudos = [
        primera.top - base.top,
        ...cards.map((card) => {
          const r = card.getBoundingClientRect();
          return r.top - base.top + r.height / 2;
        }),
      ];
      pintar();
    };

    medir();
    raiz.classList.add("is-listo");

    if (sinMovimiento) {
      const ro = new ResizeObserver(medir);
      ro.observe(raiz);
      return () => ro.disconnect();
    }

    const disparador = ScrollTrigger.create({
      trigger: raiz,
      start: () => `top+=${nudos[0]} ${LINEA_DE_LECTURA}`,
      end: () => `top+=${nudos[nudos.length - 1]} ${LINEA_DE_LECTURA}`,
      onUpdate: ({ progress }) => {
        // Suaviza los saltos de la ruedita: el líquido llega deslizando
        gsap.to(estado, { avance: progress, duration: 0.6, ease: "power2.out", overwrite: true, onUpdate: pintar });
      },
    });

    // Si la página ya carga pasada esta sección, el tubo aparece lleno
    if (disparador.progress > 0) {
      estado.avance = disparador.progress;
      pintar();
    }

    // El texto puede cambiar de renglones (fuentes que cargan, otro ancho):
    // se vuelve a medir y a calcular dónde empieza y termina el recorrido.
    const ro = new ResizeObserver(() => {
      medir();
      disparador.refresh();
    });
    ro.observe(raiz);

    return () => {
      ro.disconnect();
      disparador.kill();
      gsap.killTweensOf(estado);
    };
  }, []);

  return ref;
}

/**
 * Lista de hallazgos con el tubo de ensayo al costado. El tubo es sticky:
 * acompaña la lectura mientras las cards pasan, y sus marcas (01–04) son las
 * de cada card, de abajo hacia arriba como en un tubo graduado.
 */
export function Hallazgos() {
  const ref = useTubo();
  const n = HALLAZGOS.length;

  return (
    <div
      ref={ref}
      className="cv1-hallazgos relative mx-auto grid w-full max-w-4xl grid-cols-[52px_minmax(0,1fr)] gap-4 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12"
    >
      {/* Columna del tubo. La celda mide lo mismo que la lista (grid estira
          por defecto), así el sticky tiene recorrido. */}
      <div className="relative">
        <div className="sticky top-[26vh] flex justify-center pr-3 sm:top-[22vh] sm:pr-6 lg:top-[16vh]">
          <div className="cv1-tubo is-vacio w-[34px] sm:w-[56px] lg:w-[100px]" aria-hidden>
            <Image
              src={tubo}
              alt=""
              sizes="(min-width: 1024px) 100px, 56px"
              className="cv1-tubo__vidrio"
            />
            <div className="cv1-tubo__cavidad">
              <div className="cv1-tubo__liquido">
                {BURBUJAS.map((b) => (
                  <span
                    key={b.x}
                    className="cv1-tubo__burbuja"
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

            {/* Graduación: una marca por card, a la altura del nivel que la
                enciende. El número sólo desde sm: en mobile no hay lugar. */}
            {HALLAZGOS.map((_, i) => (
              <span
                key={i}
                className="cv1-tubo__marca"
                style={{ bottom: `${FONDO + ((i + 1) / n) * ALTO_UTIL}%` }}
              >
                <span className="hidden sm:inline">{String(i + 1).padStart(2, "0")}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <ol className="flex flex-col gap-5 sm:gap-6">
        {HALLAZGOS.map(({ icon: Icon, titulo, texto }, i) => (
          <li
            key={titulo}
            className="cv1-hallazgo cv1-vidrio cv1-vidrio--reflejo flex gap-4 rounded-[22px] p-5 sm:gap-5 sm:p-7"
          >
            <span
              aria-hidden
              className="cv1-hallazgo__icono flex size-11 shrink-0 items-center justify-center rounded-full border border-white/80 text-[#f4eee4] [background:linear-gradient(150deg,#7da89a,#4e7a6c)] shadow-[0_0_0_5px_rgba(251,250,247,0.7),0_10px_18px_-10px_rgba(34,51,46,0.4)] sm:size-12"
            >
              <Icon size={20} strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Hallazgo {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1.5 font-display text-base leading-snug text-foreground sm:text-lg">
                {titulo}
              </h3>
              <p className="mt-2 font-sans text-[15px] leading-relaxed text-foreground/70 sm:text-base">
                {texto}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
