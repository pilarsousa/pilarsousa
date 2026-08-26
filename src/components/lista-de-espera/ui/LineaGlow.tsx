"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/cn";

/*
  La línea que corona cada card de la sección 4. Entra estrecha y se estira
  hasta su ancho definitivo cuando la card asoma en pantalla.

  SE ANIMA CON UNA TRANSICIÓN CSS DE `width`, NO CON `scaleX`. La tentación es
  escalar —es lo barato— pero `transform` escala TAMBIÉN la sombra: el resplandor
  entraría comprimido y se iría estirando a lo ancho hasta quedar borroso justo
  al final, que es cuando más se mira. Animando el ancho, el halo conserva su
  radio durante todo el recorrido. CSS interpola sin problema entre `100px` y un
  porcentaje, así que no hace falta resolver las unidades a mano.

  EL RESPLANDOR SON DOS SOMBRAS Y NO UNA: una corta y saturada que hace de
  filamento, y otra ancha y diluida que es la luz derramada. Con una sola hay que
  elegir entre un borde duro o una mancha sin centro, y ninguna de las dos parece
  luz.

  `once: true` — la línea se estira una vez. Rehacerlo en cada pasada convierte
  un detalle en un tic, y al volver hacia arriba se ve la animación al revés.

  El margen negativo del disparador la lanza cuando la card ya entró de verdad, y
  no en cuanto asoma su primer píxel por el borde inferior.
*/
export function LineaGlow({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const enVista = useInView(ref, { once: true, margin: "0px 0px -18% 0px" });

  return (
    <div
      ref={ref}
      className={cn(
        "h-[max(0.15vw,2px)] rounded-full bg-[#b8ea3c]",
        "shadow-[0_0_0.35vw_0.02vw_rgba(184,234,60,0.95),0_0_1.5vw_0.18vw_rgba(138,205,40,0.5)]",
        "transition-[width] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        enVista ? "w-[76%]" : "w-[100px]",
        className,
      )}
    />
  );
}
