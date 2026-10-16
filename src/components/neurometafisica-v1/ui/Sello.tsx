import { useId } from "react";
import { cn } from "@/lib/cn";
import { SELLO } from "@/components/neurometafisica-v1/content";

/**
 * Sello "Seminario oficial · Neurometafísica", el distintivo que pide el
 * brief (sin decir "doctorado": es la vibra, no un título). Anillo de texto
 * en Cinzel que gira despacio alrededor de un centro quieto con la ✦ y el
 * año en romanos, como el lacre de un programa académico.
 *
 * Decorativo: el nombre del seminario ya está en el texto de la página.
 */
export function Sello({ className, tono = "oscuro" }: { className?: string; tono?: "oscuro" | "claro" }) {
  const id = useId();
  const tinta = tono === "claro" ? "#12291f" : "#e9c46a";
  const fondo = tono === "claro" ? "rgb(18 41 31 / 0.06)" : "rgb(18 41 31 / 0.55)";

  return (
    <svg viewBox="0 0 120 120" aria-hidden className={cn("overflow-visible", className)}>
      <defs>
        <path id={`${id}-giro`} d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="57" fill={fondo} stroke={tinta} strokeWidth="1.2" />
      <circle cx="60" cy="60" r="52" fill="none" stroke={tinta} strokeWidth="0.6" strokeDasharray="1.5 2.5" />
      <circle cx="60" cy="60" r="33" fill="none" stroke={tinta} strokeWidth="0.8" />
      <g className="cv2-sello__anillo">
        <text
          fill={tinta}
          style={{ fontFamily: "var(--font-display)", fontSize: "8.6px", fontWeight: 700, letterSpacing: "0.18em" }}
        >
          <textPath href={`#${id}-giro`} textLength="270">
            {`${SELLO.toUpperCase()} · `}
          </textPath>
        </text>
      </g>
      <path
        d="M60 39 C60.9 45.6 62.4 47.1 69 48 C62.4 48.9 60.9 50.4 60 57 C59.1 50.4 57.6 48.9 51 48 C57.6 47.1 59.1 45.6 60 39 Z"
        fill={tinta}
      />
      <text
        x="60"
        y="73"
        textAnchor="middle"
        fill={tinta}
        style={{ fontFamily: "var(--font-display)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}
      >
        MMXXVI
      </text>
    </svg>
  );
}
