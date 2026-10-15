"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowLeft, ArrowRight, Hand } from "lucide-react";
import { cn } from "@/lib/cn";
import { QUE_ESPERAR } from "@/components/cientifico-v2/content";
import { Wordmark } from "@/components/cientifico-v2/ui/Wordmark";
import fotoRealidad from "@/../public/cientifico-v2/carpetas/vao_1.jpg";
import fotoIdentidad from "@/../public/cientifico-v2/carpetas/vao_2.jpg";
import fotoPasos from "@/../public/cientifico-v2/carpetas/vao_3.jpg";
import fotoLaboratorio from "@/../public/cientifico-v2/carpetas/vao_5.jpg";

/* Fotos verticales de Pilar: `encuadre` mantiene su rostro en la parte
   visible, por encima del texto. El duotono las unifica. */
const CARDS: Array<{ foto: StaticImageData; encuadre: string; titulo: string; texto: string }> = [
  {
    foto: fotoRealidad,
    encuadre: "object-[50%_20%]",
    titulo: "Descubrirás cómo funciona realmente la realidad",
    texto: "y por qué saber más no significa manifestar más. Empezamos por el principio que ordena todo lo demás.",
  },
  {
    foto: fotoIdentidad,
    encuadre: "object-[50%_25%]",
    titulo: "Domina el arte de reprogramar tu identidad",
    texto: "para que tus resultados dejen de repetir el mismo patrón, aunque cambies de estrategia.",
  },
  {
    foto: fotoPasos,
    encuadre: "object-[50%_20%]",
    titulo: "Aprende los 3 pasos de mi Sistema Práctico de Manifestación",
    texto: "con el que doy un salto cuántico cada 90 días, aunque hoy sientas que estás estancada.",
  },
  {
    foto: fotoLaboratorio,
    encuadre: "object-[50%_25%]",
    titulo: "Convierte tu vida en tu propio laboratorio",
    texto: "con un experimento sencillo que puedes empezar esa misma noche y comprobar por ti misma.",
  },
];

/* Px por segundo del avance continuo. */
const VELOCIDAD = 36;
/* Separación entre cards (gap-5). */
const SEPARACION = 20;
/* Tras una flecha o un arrastre, cuánto espera antes de seguir solo (ms). */
const ESPERA = 1800;
/* Copias de la tira: con dos, en pantallas muy anchas asomaba el final. */
const COPIAS = 3;

type Estado = {
  x: number;
  /** Ancho de una copia de la tira (de la 1.ª card de una copia a la siguiente). */
  ancho: number;
  /** Hasta cuándo (performance.now) queda quieto. */
  pausaHasta: number;
  hover: boolean;
  visible: boolean;
  moviendo: boolean;
  arrastre: { desde: number; x0: number } | null;
};

/**
 * Carrusel constante: la tira avanza sola hacia la izquierda y da la vuelta
 * sin corte (la tira está copiada y la posición vuelve una copia atrás al
 * pasarse). Se pausa con el mouse encima y fuera de pantalla.
 * Desktop: flechas que la corren una card. Mobile: sin flechas, se arrastra
 * con el dedo (touch-action pan-y deja el scroll vertical al navegador).
 */
function useCarrusel() {
  const ventanaRef = useRef<HTMLDivElement>(null);
  const pistaRef = useRef<HTMLOListElement>(null);
  const estado = useRef<Estado>({
    x: 0,
    ancho: 0,
    pausaHasta: 0,
    hover: false,
    visible: true,
    moviendo: false,
    arrastre: null,
  });

  useEffect(() => {
    const pista = pistaRef.current;
    const ventana = ventanaRef.current;
    if (!pista || !ventana) return;
    const s = estado.current;

    const medir = () => {
      const primera = pista.children[0] as HTMLElement | undefined;
      const copia = pista.children[CARDS.length] as HTMLElement | undefined;
      if (primera && copia) s.ancho = copia.offsetLeft - primera.offsetLeft;
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(pista);

    const io = new IntersectionObserver(([entrada]) => {
      s.visible = entrada.isIntersecting;
    });
    io.observe(ventana);

    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let anterior = performance.now();
    let cuadro = 0;

    const tick = (ahora: number) => {
      const dt = Math.min(0.05, (ahora - anterior) / 1000);
      anterior = ahora;
      const avanza =
        !sinMovimiento && s.visible && !s.hover && !s.arrastre && !s.moviendo && ahora > s.pausaHasta;
      if (avanza) s.x -= VELOCIDAD * dt;
      if (s.ancho > 0) {
        while (s.x <= -s.ancho) s.x += s.ancho;
        while (s.x > 0) s.x -= s.ancho;
      }
      pista.style.transform = `translate3d(${s.x}px, 0, 0)`;
      cuadro = requestAnimationFrame(tick);
    };
    cuadro = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(cuadro);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  /** Corre la tira una card (flechas). Anima un delta, así el loop puede
   *  dar la vuelta en medio sin pelearse con la animación. */
  const mover = (sentido: 1 | -1) => {
    const s = estado.current;
    const card = pistaRef.current?.querySelector("li");
    if (!card || s.moviendo) return;
    const paso = card.getBoundingClientRect().width + SEPARACION;
    const delta = { v: 0 };
    let previo = 0;
    s.moviendo = true;
    gsap.to(delta, {
      v: -sentido * paso,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        s.x += delta.v - previo;
        previo = delta.v;
      },
      onComplete: () => {
        s.moviendo = false;
        s.pausaHasta = performance.now() + ESPERA;
      },
    });
  };

  const arrastre = {
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
      estado.current.arrastre = { desde: e.clientX, x0: estado.current.x };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
      const a = estado.current.arrastre;
      if (a) estado.current.x = a.x0 + (e.clientX - a.desde);
    },
    onPointerUp: () => {
      estado.current.arrastre = null;
      estado.current.pausaHasta = performance.now() + ESPERA;
    },
    onPointerCancel: () => {
      estado.current.arrastre = null;
      estado.current.pausaHasta = performance.now() + ESPERA;
    },
    onPointerEnter: (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "mouse") estado.current.hover = true;
    },
    onPointerLeave: (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "mouse") estado.current.hover = false;
    },
  };

  return { ventanaRef, pistaRef, mover, arrastre };
}

/**
 * "¿Qué puedes esperar de este evento?": título (y flechas en desktop) a la
 * izquierda, carrusel constante de cards con forma de carpeta a la derecha,
 * que sangra hasta el borde de la pantalla.
 */
export function CarruselEsperar() {
  const { ventanaRef, pistaRef, mover, arrastre } = useCarrusel();

  const flecha =
    "flex size-11 items-center justify-center rounded-full text-[#94c7b6] transition-opacity duration-300 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-[#7da89a]";

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
      <div className="flex flex-col gap-4">
        <h2 className="cv2-grad-texto max-w-[320px] text-[1.75rem] font-extrabold leading-[1.2] sm:text-[1.9rem]">
          {QUE_ESPERAR.titulo}
        </h2>
        <p className="max-w-[320px] text-[1.0625rem] leading-relaxed text-(--cv2-gris)">{QUE_ESPERAR.bajada}</p>
        <p
          id="carpetas-deslizar"
          className="inline-flex max-w-full items-center gap-2 self-start rounded-full border border-[#94c7b6]/25 bg-[#7da89a]/10 px-3.5 py-2 text-xs font-semibold text-(--cv2-destacado) lg:hidden"
        >
          <Hand aria-hidden="true" size={16} strokeWidth={1.6} className="shrink-0" />
          <span>{QUE_ESPERAR.indicacionMobile}</span>
        </p>
        {/* Flechas sólo en desktop: en mobile se arrastra con el dedo. */}
        <div className="-ml-3 hidden gap-2 lg:flex">
          <button type="button" aria-label="Anterior" onClick={() => mover(-1)} className={flecha}>
            <ArrowLeft size={30} strokeWidth={1.4} />
          </button>
          <button type="button" aria-label="Siguiente" onClick={() => mover(1)} className={flecha}>
            <ArrowRight size={30} strokeWidth={1.4} />
          </button>
        </div>
      </div>

      {/* Ventana: en mobile sangra a los dos bordes; en desktop, hasta el
          derecho, y se funde a la izquierda para que las cards no se corten
          en seco contra el título. */}
      <div
        ref={ventanaRef}
        {...arrastre}
        aria-describedby="carpetas-deslizar"
        className="-mx-5 cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing sm:-mx-8 lg:mx-0 lg:w-[calc(100%+max(32px,(100vw-1140px)/2))] lg:[mask-image:linear-gradient(to_right,transparent,#000_56px)]"
      >
        <ol ref={pistaRef} className="flex w-max gap-5 px-5 pb-2 will-change-transform sm:px-8 lg:px-0">
          {Array.from({ length: COPIAS }, (_, copia) =>
            CARDS.map((card) => (
              <li
                key={`${copia}-${card.titulo}`}
                aria-hidden={copia > 0 || undefined}
                className="cv2-carpeta relative h-[420px] w-[78vw] max-w-[340px] shrink-0 overflow-hidden bg-[#17141f] sm:h-[432px] sm:w-[366px] sm:max-w-none"
              >
                <Image
                  src={card.foto}
                  alt=""
                  fill
                  sizes="(max-width: 435px) 78vw, (max-width: 639px) 340px, 366px"
                  draggable={false}
                  className={cn("object-cover grayscale-[0.85] brightness-[0.75] contrast-[1.05]", card.encuadre)}
                />
                {/* Duotono: tiñe la foto ya desaturada (blend color) y la
                    funde al fondo de la card hacia abajo. */}
                <div className="absolute inset-0 bg-[linear-gradient(160deg,#7da89a_0%,#4b3a6b_100%)] opacity-70 mix-blend-color" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(23,20,31,0.15)_0%,rgba(23,20,31,0.45)_38%,#17141f_70%)]" />

                <div className="relative flex h-full flex-col px-7 pb-7 pt-8">
                  <Wordmark className="text-lg" />
                  <div className="mt-auto flex flex-col gap-2">
                    <h3 className="text-[1.375rem] font-semibold leading-snug text-foreground">{card.titulo}</h3>
                    <p className="text-[0.9375rem] leading-snug text-(--cv2-gris)">{card.texto}</p>
                  </div>
                  <span aria-hidden className="cv2-codigo mt-6 block h-6 w-full" />
                </div>
              </li>
            )),
          )}
        </ol>
      </div>
    </div>
  );
}
