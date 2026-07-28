import Image from "next/image";
import Link from "next/link";
import cardUnica from "@/../public/game/seccions/section-2/card-unica/card-unica-sf.png";
import botonAtras from "@/../public/game/seccions/section-2/card-unica/boton-atras.png";
import descarga from "@/../public/game/seccions/section-2/card-unica/descarga.png";
import gema1 from "@/../public/game/seccions/section-2/card-unica/img-gema-1.png";
import gema2 from "@/../public/game/seccions/section-2/card-unica/img-gema-2.png";
import { ARCHIVO_OCULTO_PDF } from "@/components/game/game-config";

/*
  Material de la 2ª card ("Archivo Oculto"), visible tras completar el registro
  (o al volver, si ya se registró antes — ver GameGate).

  Replica la card ornamental de la 1ª card (card-unica-sf.png con el PDF
  desbloqueado de fondo, gemas en los huecos y el botón de descarga encastrado en su
  socket), pero apuntando al PDF "El Archivo Oculto — Código 6 Desclasificado" y
  SIN el comportamiento de modal: aquí es contenido inline. El botón atrás vive
  dentro del socket superior izquierdo de la card, igual que en la 1ª card.

  Las posiciones (% sobre el alpha del PNG del marco) son las mismas que la 1ª
  card, porque es exactamente la misma pieza gráfica.
*/
export function GameMaterial() {
  return (
    <div className="flex flex-col items-center gap-[2.5vh]">
      {/* Texto superior, con la tipografía de /game */}
      <p className="max-w-[92vw] text-center font-[family-name:var(--font-press-start)] text-[clamp(10px,1.55vh,16px)] leading-relaxed text-white md:max-w-[680px]">
        Archivo Oculto desbloqueado. Descargá tu PDF.
      </p>

      {/* La card ornamental */}
      <div className="relative aspect-[1086/1448] w-[86vw] md:h-[82vh] md:w-auto">
        {/* PDF desbloqueado como fondo, recortado dentro de la ventana central. */}
        <div className="pointer-events-none absolute left-[20.4%] right-[19.8%] top-[21.8%] bottom-[10.9%] overflow-hidden bg-white">
          <object
            data={`${ARCHIVO_OCULTO_PDF}#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH`}
            type="application/pdf"
            aria-label="Vista previa del Archivo Oculto"
            className="h-full w-full border-0"
          >
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_20%,rgba(40,191,241,0.18),transparent_48%),#07070b] px-5 text-center font-[family-name:var(--font-pixelify)] text-[clamp(10px,1.5vh,14px)] font-bold uppercase leading-relaxed tracking-[0.06em] text-white">
              El Archivo Oculto — Código 6 Desclasificado
            </div>
          </object>
        </div>

        {/* Gemas que rellenan los huecos vacíos. */}
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

        {/* Marco ornamental */}
        <Image
          src={cardUnica}
          alt=""
          aria-hidden
          fill
          priority
          sizes="70vh"
          className="pointer-events-none select-none object-contain"
        />

        {/* boton-atras — socket superior izquierdo → vuelve al inicio del game. */}
        <Link
          href="/game/home"
          aria-label="Volver a inicio"
          className="absolute left-[17.7%] top-[20.8%] w-[18%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out hover:scale-105 active:scale-95 focus-visible:outline-none"
        >
          <Image src={botonAtras} alt="" className="h-auto w-full" />
        </Link>

        {/* Botón de descarga — socket inferior derecho → descarga el PDF. */}
        <div className="absolute left-[81.2%] top-[88.2%] w-[18%] -translate-x-1/2 -translate-y-1/2">
          {/* Halo pulsante que asoma por debajo del botón. */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-[49.24%] top-[53%] size-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/70 animate-halo-ping"
          />
          {/* Aro de energía eléctrica girando alrededor del botón. */}
          <span
            aria-hidden
            className="energy-ring pointer-events-none absolute left-[49.24%] top-[47.7%] size-[67.9%] -translate-x-1/2 -translate-y-1/2"
          />
          <a
            href={ARCHIVO_OCULTO_PDF}
            download="El Archivo Oculto - Codigo 6 Desclasificado.pdf"
            aria-label="Descargar"
            className="electric-download relative block transition-transform duration-200 ease-out hover:scale-110 active:scale-95 focus-visible:outline-none"
          >
            <Image src={descarga} alt="" className="h-auto w-full" />
          </a>
        </div>
      </div>

      {/* Indicación de la acción, que además descarga. */}
      <a
        href={ARCHIVO_OCULTO_PDF}
        download="El Archivo Oculto - Codigo 6 Desclasificado.pdf"
        className="group flex items-center justify-center gap-2 px-4 text-center font-[family-name:var(--font-pixelify)] text-[clamp(12px,1.9vh,18px)] font-bold uppercase tracking-[0.06em] transition-transform duration-200 ease-out hover:scale-105 active:scale-95 focus-visible:outline-none"
      >
        <span className="text-download-pulse">
          Toca el botón de descarga de arriba para obtener el PDF
        </span>
      </a>
    </div>
  );
}
