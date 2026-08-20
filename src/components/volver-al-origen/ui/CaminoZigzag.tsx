"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/cn";

/*
  Tramo del camino punteado que enlaza dos cards del zigzag de "…es para vos si",
  trazándose al entrar en pantalla.

  SUSTITUYE A LAS FLECHAS que había aquí, y no es sólo un cambio de dibujo. Una
  flecha significa "y entonces": implica secuencia, y estos seis puntos son
  condiciones independientes — con reconocerse en una basta. El camino une sin
  ordenar, que es exactamente la relación que hay entre ellos. De paso hermana
  esta sección con la de la reflexión, que ya lleva un camino igual.

  EL TRAZO SE DIBUJA CON strokeDasharray Y SE DESCUBRE CON clip-path, dos cosas
  distintas que conviene no confundir: el dasharray hace que sea punteado, y el
  recorte es lo que lo va revelando de un extremo al otro. Con el PNG anterior el
  recorte era el único recurso posible; aquí podría haberse animado el propio
  dashoffset, pero eso obliga a conocer el largo del path en píxeles y a
  recalcularlo cuando cambia el ancho. El recorte no necesita medir nada.

  vector-effect="non-scaling-stroke" es obligatorio: la caja es cuadrada pero su
  tamaño depende del ancho de la pantalla, y sin esto el grosor del trazo y la
  longitud de los guiones crecerían con ella. Con la propiedad puesta, el trazo
  se dibuja en píxeles de pantalla y sólo se estira el recorrido.

  SON DOS ELEMENTOS Y NO UNO. La referencia del observador va en el de fuera,
  que nunca se recorta; el clip-path va en el de dentro. Estuvo todo junto y las
  flechas no aparecían nunca: mientras espera su turno el elemento está
  recortado a cero, y un elemento sin área visible no se detecta como que ha
  entrado en pantalla, así que el observador no disparaba jamás y el recorte no
  se abría. Un círculo cerrado.

  El recorte y el volteado van en el MISMO elemento: clip-path se aplica en el
  sistema de coordenadas propio y el transform después, así que en los tramos
  volteados el recorte se voltea con él y el mismo valor descubre desde el lado
  correcto.

  useInView con once: se traza una vez y se queda. Repetirlo en cada pasada
  convertiría un detalle en un tic.
*/
export function CaminoZigzag({
  espejo,
  className,
}: {
  espejo: boolean;
  className?: string;
}) {
  const caja = useRef<HTMLDivElement>(null);
  const enPantalla = useInView(caja, { once: true, amount: 0.3 });

  return (
    <div ref={caja} aria-hidden className={className}>
      <div
        className={cn(
          "h-full w-full transition-[clip-path] duration-[900ms] ease-out",
          espejo && "-scale-x-100",
        )}
        style={{
          clipPath: enPantalla ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
          className="h-full w-full text-accent"
        >
          {/* Sale casi horizontal del costado de la card y llega casi vertical
              a la de abajo: ese cambio de dirección es lo que hace que se lea
              como un recorrido y no como una diagonal. */}
          <path
            d="M2 12 C 40 12, 84 20, 88 92"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeDasharray="4 9"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.5"
          />
          {/* Punto de llegada, donde el camino toca la card siguiente. Cierra el
              tramo: sin él, el punteado se corta a medias y parece inacabado. */}
          <circle cx="88" cy="94" r="2.4" fill="currentColor" opacity="0.75" />
        </svg>
      </div>
    </div>
  );
}
