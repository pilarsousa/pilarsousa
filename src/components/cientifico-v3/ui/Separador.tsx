import { cn } from "@/lib/cn";

/**
 * Línea separadora con el lenguaje de la barra superior: una línea Violeta
 * Alma → Salvia que se desvanece en las puntas y, en el centro, una muesca
 * en ángulo (la misma forma de la barra, en chico) con un destello ✦ en
 * Arena Dorada.
 *
 * Tres piezas para que la muesca no se deforme con el ancho: tramo izquierdo
 * (flex-1), muesca (SVG de ancho fijo) y tramo derecho (flex-1).
 */
export function Separador({
  className,
  id = "cv3-separador",
}: {
  className?: string;
  /** Id del degradado: tiene que ser único si hay varios en la misma página. */
  id?: string;
}) {
  return (
    <div aria-hidden className={cn("flex w-full items-start", className)}>
      <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,#a391b8_70%)]" />
      <svg viewBox="0 0 132 26" className="h-[26px] w-[132px] shrink-0 overflow-visible">
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#a391b8" />
            <stop offset="1" stopColor="#7da89a" />
          </linearGradient>
        </defs>
        <path
          d="M0 0.5 H22 L40 18.5 H92 L110 0.5 H132"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={1}
        />
        {/* ✦ dentro de la muesca */}
        <path
          className="cv3-separador__destello"
          d="M66 2 C66.9 6.6 68.4 8.1 73 9 C68.4 9.9 66.9 11.4 66 16 C65.1 11.4 63.6 9.9 59 9 C63.6 8.1 65.1 6.6 66 2 Z"
          fill="#d9c7a7"
        />
      </svg>
      <span className="h-px flex-1 bg-[linear-gradient(90deg,#7da89a_30%,transparent)]" />
    </div>
  );
}
