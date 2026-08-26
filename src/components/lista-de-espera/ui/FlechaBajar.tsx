"use client";

import Image from "next/image";
import separador from "@/../public/volver-origen/public/Recursos/generales/flecha-separadora.svg";

/*
  El disco con la flecha que marca la juntura entre el hero y la sección 2.

  ES UN BOTÓN DE VERDAD, no un adorno: baja a la sección siguiente. Un disco con
  una flecha hacia abajo en mitad de la página promete esa acción aunque no la
  tenga, así que o la cumple o no debería tener forma de flecha.

  Va con `scrollIntoView` y no con un `<a href="#...">` porque un ancla deja la
  URL con el hash pegado, y esto no es un destino al que se enlace desde fuera:
  es un gesto de la página consigo misma.

  Respeta `prefers-reduced-motion`: quien pidió no ver animaciones llega igual,
  pero de golpe. Un desplazamiento suave de una pantalla entera es justo lo que
  provoca mareo a quien activó ese ajuste.
*/
export function FlechaBajar({
  destino,
  className,
}: {
  destino: string;
  className?: string;
}) {
  const bajar = () => {
    const el = document.getElementById(destino);
    if (!el) return;
    const sinMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({
      behavior: sinMovimiento ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <button
      type="button"
      onClick={bajar}
      aria-label="Ir a la sección siguiente"
      className={className}
    >
      <Image
        src={separador}
        alt=""
        aria-hidden
        className="w-full transition-transform duration-200 hover:translate-y-[0.1em]"
      />
    </button>
  );
}
