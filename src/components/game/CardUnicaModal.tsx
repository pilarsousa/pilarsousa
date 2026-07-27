"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import cardUnica from "@/../public/game/seccions/section-2/card-unica/card-unica-sf.png";
import botonAtras from "@/../public/game/seccions/section-2/card-unica/boton-atras.png";
import descarga from "@/../public/game/seccions/section-2/card-unica/descarga.png";
import previewModal from "@/../public/game/seccions/section-2/card-unica/prevew-modal.png";
import gema1 from "@/../public/game/seccions/section-2/card-unica/img-gema-1.png";
import gema2 from "@/../public/game/seccions/section-2/card-unica/img-gema-2.png";
import { PRINCIPIOS_PDF } from "@/components/game/game-config";

/*
  Modal de la 1ª card de /game/home.

  Es la card ornamental card-unica-sf.png con dos botones "encastrados" en sus
  sockets (huecos), cuyas posiciones se midieron sobre el alpha del PNG:
    - boton-atras.png  → socket superior izquierdo  (centro 17.7%, 20.8%) → cierra
    - descarga.png     → socket inferior derecho    (centro 81.2%, 88.2%) → descarga

  El ancho de cada botón es 18% del ancho de la card: su círculo visible (67% del
  PNG) queda ~12%, que es el diámetro del hueco.

  Cierra con el botón atrás, con Escape o clickeando el fondo.

  NOTA: "descarga" apunta por ahora a CONTENT_PDF (game-config.ts). Cambiá esa
  ruta cuando tengas el archivo real.
*/
export function CardUnicaModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-[2.5vh] bg-black/80 p-4 animate-[fadeIn_0.2s_ease-out]"
    >
      {/* Texto superior, con la tipografía de /game (Press Start 2P) */}
      <p className="max-w-[92vw] text-center font-[family-name:var(--font-press-start)] text-[clamp(10px,1.55vh,16px)] leading-relaxed text-white md:max-w-[680px]">
        Descargá el PDF para recordar tu poder y comenzar tu salto.
      </p>

      {/* La card. stopPropagation: clickear dentro no cierra. */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative aspect-[1086/1448] w-[86vw] md:h-[82vh] md:w-auto"
      >
        {/* Preview del PDF de fondo, en la ventana central (detrás del marco).
            El marco recorta los bordes con la forma de la ventana. */}
        <div className="pointer-events-none absolute left-[20.4%] right-[19.8%] top-[21.8%] bottom-[10.9%] overflow-hidden">
          <Image
            src={previewModal}
            alt=""
            aria-hidden
            fill
            priority
            sizes="50vh"
            className="object-cover object-top"
          />
        </div>

        {/* Gemas que rellenan los huecos vacíos. Van DETRÁS del marco: el propio
            hueco (hexágono / círculo) las recorta con su forma. Posiciones
            medidas sobre el alpha del marco; tamaños calibrados para que la gema
            llene el hueco sin dejar negro. */}
        <Image
          src={gema1}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-[18%] top-[33.1%] w-[12%] -translate-x-1/2 -translate-y-1/2"
        />
        <Image
          src={gema1}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-[18%] top-[42.2%] w-[12%] -translate-x-1/2 -translate-y-1/2"
        />
        <Image
          src={gema2}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-[18.9%] top-[88.2%] w-[15%] -translate-x-1/2 -translate-y-1/2"
        />

        <Image
          src={cardUnica}
          alt=""
          aria-hidden
          fill
          priority
          sizes="70vh"
          className="pointer-events-none select-none object-contain"
        />

        {/* boton-atras — socket superior izquierdo → cierra */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Volver"
          className="absolute left-[17.7%] top-[20.8%] w-[18%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out hover:scale-105 active:scale-95 focus-visible:outline-none"
        >
          <Image src={botonAtras} alt="" className="h-auto w-full" />
        </button>

        {/* descarga — socket inferior derecho → descarga el PDF.
            El botón y su halo comparten contenedor (anclado al socket) para que
            el halo se posicione respecto del BOTÓN y no de la card. El PNG es
            cuadrado, así que los % de acá adentro son fracciones del botón:
            su círculo visible ocupa el 67.9% y está centrado en (49.2%, 47.7%),
            medido sobre el alpha del archivo. */}
        <div className="absolute left-[81.2%] top-[88.2%] w-[18%] -translate-x-1/2 -translate-y-1/2">
          {/* Halo pulsante que asoma por debajo del botón, para señalar dónde
              tocar. En el pico su radio (45%) supera al del círculo del botón
              (33.9%) por todos lados, así que la onda se ve como un aro
              completo alrededor del botón, apenas descolgado hacia abajo
              (centro 53% vs 47.7% del círculo). */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-[49.24%] top-[53%] size-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/70 animate-halo-ping"
          />

          {/* Aro de energía eléctrica girando alrededor del círculo del botón.
              Se ancla al círculo visible (no al PNG cuadrado): centro
              (49.2%, 47.7%), diámetro 67.9% del botón, medido sobre el alpha. */}
          <span
            aria-hidden
            className="energy-ring pointer-events-none absolute left-[49.24%] top-[47.7%] size-[67.9%] -translate-x-1/2 -translate-y-1/2"
          />

          {/* electric-download: glow que late en el contorno del botón, para que
              se lea claramente como el punto de acción. */}
          <a
            href={PRINCIPIOS_PDF}
            download="33 Principios Cuánticos - Volver al Origen.pdf"
            aria-label="Descargar"
            className="electric-download relative block transition-transform duration-200 ease-out hover:scale-110 active:scale-95 focus-visible:outline-none"
          >
            <Image src={descarga} alt="" className="h-auto w-full" />
          </a>
        </div>
      </div>

      {/* Indicación de la acción, que además descarga: señala el botón de la
          card, pero si alguien toca el texto en vez del botón igual se lleva el
          PDF. stopPropagation para que descargar no cierre la modal (el fondo
          cierra al click), igual que el botón de la card. */}
      <a
        href={PRINCIPIOS_PDF}
        download="33 Principios Cuánticos - Volver al Origen.pdf"
        onClick={(e) => e.stopPropagation()}
        className="group flex items-center justify-center gap-2 px-4 text-center font-[family-name:var(--font-pixelify)] text-[clamp(12px,1.9vh,18px)] font-bold uppercase tracking-[0.06em] transition-transform duration-200 ease-out hover:scale-105 active:scale-95 focus-visible:outline-none"
      >
        {/* El icono queda en rojo sólido para acompañar el degradado del texto
            (no se le puede aplicar bg-clip como al span). */}
        <Download size={20} aria-hidden className="shrink-0 animate-bounce text-[#ff1a1a]" />
        {/* text-download-pulse: degradado rojo↔blanco desplazándose en bucle. */}
        <span className="text-download-pulse">
          Toca el botón de descarga de arriba para obtener el PDF
        </span>
      </a>
    </div>
  );
}
