import { cn } from "@/lib/cn";

const VUELTAS = 4;

/*
  Estrella de cuatro puntas en Arena Dorada (el "○" de la referencia): la
  misma ✦ de la muesca del Separador, con su brillo y su latido
  (.cv3-marquee__estrella).
*/
function Estrella() {
  return (
    <svg viewBox="59 2 14 14" className="cv3-marquee__estrella h-[0.5em] w-[0.5em] shrink-0 overflow-visible">
      <path
        d="M66 2 C66.9 6.6 68.4 8.1 73 9 C68.4 9.9 66.9 11.4 66 16 C65.1 11.4 63.6 9.9 59 9 C63.6 8.1 65.1 6.6 66 2 Z"
        fill="#d9c7a7"
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
          <span className="font-medium tracking-[-0.035em] text-foreground">Volver al</span>
          <span className="cv3-grad-texto -ml-[0.12em] pb-[0.16em] font-extrabold tracking-[-0.035em]">Origen</span>
        </span>
      ))}
    </span>
  );
}

/**
 * "Volver al Origen" gigante y en loop (el "○ LeadsMastery" de la
 * referencia), separado por una estrella dorada. Dos tramos idénticos: la
 * pista se corre -50% y el corte no se ve. Es decorativo; el nombre ya está en
 * el resto de la página.
 */
export function Marquee({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("w-full overflow-hidden whitespace-nowrap leading-none", className)}>
      <div className="cv3-marquee__pista">
        <Tramo />
        <Tramo />
      </div>
    </div>
  );
}
