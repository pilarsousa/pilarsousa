/*
  Logo de Volver al Origen, dibujado en SVG a partir de la guía de marca: aro
  con un destello de cuatro puntas arriba, chispas menores a los lados,
  wordmark en Cinzel y la figura humana encendida bajo el texto.

  Es una reconstrucción, no el archivo original — cuando llegue el definitivo se
  sustituye este componente. En SVG y no en PNG porque así se ve nítido a
  cualquier tamaño, toma el verde del tema y pesa una fracción de una imagen.

  Sin <defs> ni gradientes con id a propósito: los ids de SVG son globales al
  documento y el logo se monta más de una vez por página, así que dos instancias
  se pisarían. El resplandor se resuelve con círculos desenfocados por CSS.
*/

type LogoVaoProps = {
  className?: string;
};

/* Destello de cuatro puntas. Se repite en tres tamaños, así que va como
   subcomponente en lugar de tres paths copiados. */
function Sparkle({ cx, cy, r, opacity = 1 }: { cx: number; cy: number; r: number; opacity?: number }) {
  const thin = r * 0.16;
  return (
    <path
      d={`M${cx} ${cy - r} Q${cx + thin} ${cy - thin} ${cx + r} ${cy} Q${cx + thin} ${cy + thin} ${cx} ${cy + r} Q${cx - thin} ${cy + thin} ${cx - r} ${cy} Q${cx - thin} ${cy - thin} ${cx} ${cy - r} Z`}
      fill="currentColor"
      opacity={opacity}
    />
  );
}

export function LogoVao({ className }: LogoVaoProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      role="img"
      aria-label="Volver al Origen"
      className={className}
    >
      {/* Resplandor general tras el aro */}
      <circle
        cx="120"
        cy="120"
        r="86"
        fill="currentColor"
        opacity="0.07"
        style={{ filter: "blur(16px)" }}
      />

      {/* Aro */}
      <circle
        cx="120"
        cy="120"
        r="92"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Destellos: grande arriba sobre el aro, menores a izquierda y derecha */}
      <Sparkle cx={120} cy={28} r={26} />
      <Sparkle cx={28} cy={120} r={13} opacity={0.85} />
      <Sparkle cx={212} cy={120} r={13} opacity={0.85} />

      {/* Wordmark */}
      <text
        x="120"
        y="92"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-cinzel), serif"
        fontSize="16"
        letterSpacing="4"
      >
        VOLVER AL
      </text>
      <text
        x="120"
        y="128"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-cinzel), serif"
        fontSize="31"
        letterSpacing="1.5"
      >
        ORIGEN
      </text>

      {/* Halo tras la figura */}
      <circle
        cx="120"
        cy="172"
        r="26"
        fill="currentColor"
        opacity="0.35"
        style={{ filter: "blur(11px)" }}
      />

      {/* Figura humana */}
      <circle cx="120" cy="152" r="6.4" fill="currentColor" />
      <path
        d="M120 161c-5.2 0-9.6 3.7-10.3 8.6l-2.7 16.2h4.9l1.4 12.6h13.4l1.4-12.6h4.9l-2.7-16.2c-.7-4.9-5.1-8.6-10.3-8.6z"
        fill="currentColor"
      />
    </svg>
  );
}
