import { cn } from "@/lib/cn";

const VUELTAS = 4;

/*
  Estrella de cuatro puntas en Arena Dorada (el "○" de la referencia): la
  misma ✦ de la muesca del Separador, con su brillo y su latido
  (.cv2-marquee__estrella).
*/
function Estrella() {
  return (
    <svg viewBox="59 2 14 14" className="cv2-marquee__estrella h-[0.5em] w-[0.5em] shrink-0 overflow-visible">
      <path
        d="M66 2 C66.9 6.6 68.4 8.1 73 9 C68.4 9.9 66.9 11.4 66 16 C65.1 11.4 63.6 9.9 59 9 C63.6 8.1 65.1 6.6 66 2 Z"
        fill="#e9c46a"
      />
    </svg>
  );
}

function Tramo() {
  return (
    <span className="flex shrink-0 items-center">
      {Array.from({ length: VUELTAS }, (_, i) => (
        <span key={i} className="flex items-center gap-[0.32em] pr-[0.55em]">
          <Estrella />
          <span className="cv2-grad-texto pb-[0.08em] font-display font-bold tracking-[0.04em] opacity-30">Neurometafísica</span>
        </span>
      ))}
    </span>
  );
}

/**
 * "Neurometafísica" gigante y en loop detrás de la pócima, en Cinzel y oro
 * apagado, separado por una estrella dorada. Dos tramos idénticos: la
 * pista se corre -50% y el corte no se ve. Es decorativo; el nombre ya está en
 * el resto de la página.
 */
export function Marquee({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("w-full overflow-hidden whitespace-nowrap leading-none", className)}>
      <div className="cv2-marquee__pista">
        <Tramo />
        <Tramo />
      </div>
    </div>
  );
}
