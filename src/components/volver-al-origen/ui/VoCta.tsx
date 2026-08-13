"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { MovingBorder } from "@/components/volver-al-origen/ui/MovingBorder";

/*
  CTA de la landing. Dos capas:

  · la cáscara (.vo-cta-shell) recorta y aloja la luz que gira por el borde;
  · la cara (.vo-cta) lleva el relleno verde, el borde y el glow fijo.

  Hacen falta las dos porque la luz vive DETRÁS de la cara y sólo asoma por el
  píxel de separación entre ambas. Si fuese una sola caja, la luz pasaría por
  encima del texto.

  El componente es "use client" porque la animación necesita rAF. Las secciones
  que lo usan siguen siendo de servidor: sólo este árbol se hidrata.
*/

type VoCtaProps = {
  children: React.ReactNode;
  /** Presente → <Link>. Ausente → <button>. */
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  /** Sólo aplica a la variante <button>; con href el componente navega. */
  onClick?: () => void;
};

/* El alto y el cuerpo escalan con el ancho en móvil: el botón es lo último del
   panel del hero y cada píxel que ahorra aquí es un píxel que ayuda a que se
   vea sin scrollear en una pantalla baja. Desde sm vuelve a medida fija. */
const FACE =
  "vo-cta w-full px-[clamp(1rem,4vw,1.5rem)] py-[clamp(0.85rem,3.4vw,1.125rem)] text-center font-display text-[clamp(0.72rem,3.1vw,0.875rem)] uppercase leading-tight tracking-[0.14em] sm:px-10 sm:py-4.5 sm:text-base";

/*
  La luz que recorre el borde. Lo que la hace leerse como neón y no como una
  mancha verde son tres cosas juntas:

  · núcleo BLANCO. Un tubo de neón satura el sensor en el centro y sólo tiñe en
    los bordes; un degradado que empieza ya en verde parece pintura, no luz.
  · caída larga hasta transparente, para que el halo se funda en vez de
    recortarse en un círculo.
  · drop-shadow del mismo verde, que derrama el resplandor fuera del div y es
    lo que hace que la luz "moje" el borde del botón al pasar.
*/
function Luz() {
  return (
    <span
      /* vo-cta-orb: la CSS la agranda y la sube a opacidad plena al pasar el
         puntero, para que la luz giratoria acompañe al resto del efecto en vez
         de quedarse igual mientras todo lo demás se enciende. */
      className="vo-cta-orb block size-32 rounded-full blur-[2px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #ffffff 0%, var(--color-vo-lumen) 26%, rgba(180,226,54,0.45) 48%, transparent 70%)",
        filter: "drop-shadow(0 0 16px var(--color-vo-lumen))",
      }}
    />
  );
}

function Inner({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Capa de la luz. rx/ry a 6px para que el recorrido siga las esquinas
          redondeadas del botón en lugar de cortar en ángulo recto.

          motion-reduce:hidden la retira para quien pida menos movimiento; el
          botón se queda con su glow fijo, que ya es suficiente señal visual. */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-[7px] motion-reduce:hidden"
      >
        <MovingBorder duration={3000} rx="7px" ry="7px">
          <Luz />
        </MovingBorder>
        {/* Segunda luz a media vuelta: con una sola, medio botón está siempre
            apagado y el efecto se pierde en los CTA anchos. */}
        <MovingBorder duration={3000} rx="7px" ry="7px" offset={0.5}>
          <Luz />
        </MovingBorder>
      </span>

      <span className={FACE}>{children}</span>
    </>
  );
}

export function VoCta({
  children,
  href,
  type = "button",
  disabled,
  className,
  onClick,
}: VoCtaProps) {
  /* Los enlaces externos salen como <a> normal y en pestaña nueva. next/link
     está pensado para navegación interna: en un destino de otro dominio no
     aporta nada y además se llevaría al visitante fuera de la landing.
     rel="noopener noreferrer" evita que la pestaña destino pueda manipular la
     de origen. */
  if (href?.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("vo-cta-shell cursor-pointer", className)}
      >
        <Inner>{children}</Inner>
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={cn("vo-cta-shell cursor-pointer", className)}>
        <Inner>{children}</Inner>
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      /* cursor-pointer explícito: Tailwind v4 dejó de aplicarlo a los <button>
         por defecto, así que sin esto el CTA no señala que es clicable. */
      className={cn(
        "vo-cta-shell",
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
        className,
      )}
    >
      <Inner>{children}</Inner>
    </button>
  );
}
