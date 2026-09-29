import { cn } from "@/lib/cn";

type GoldTextProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * "Lava" variant — añade un halo crema alrededor de las letras (con
   * drop-shadow, que sí funciona sobre texto recortado donde text-shadow no).
   * Use to make a title really stand out.
   */
  glow?: boolean;
};

/**
 * Inline text painted with a gradient that drifts slowly and continuously — a
 * premium shimmer. The gradient is clipped to the glyphs (bg-clip-text +
 * transparent text). Used to highlight key phrases.
 *
 * Respects prefers-reduced-motion via the global reduce rule.
 *
 * EL NOMBRE DICE "GOLD" Y EL COLOR ES CREMA. No es un descuido: la V2 hereda
 * el nombre del componente, el de la animación (animate-gold-drift) y el de la
 * clase global .moving-gold-title, y los tres viven en globals.css o en la V1,
 * que está publicada. Renombrarlos aquí obligaría a tocarla.
 *
 * LO QUE SE CONSERVA es el mecanismo: un degradado de cinco paradas con un
 * núcleo claro en el centro y dos extremos oscuros, recortado sobre el texto y
 * desplazándose. Lo único que cambia son las paradas, que pasan del oro al
 * crema de la paleta. El relieve se sigue leyendo porque lo que lo produce es
 * la DIFERENCIA de luminosidad entre el núcleo y los extremos, no el matiz.
 *
 * ── LAS DOS VARIANTES COMPARTEN EL DEGRADADO ──
 *
 * En la V1 se distinguían por el matiz: `glow` llevaba un oro más saturado y
 * arrancaba más abajo. Aquí no hay dos cremas que se diferencien así, y bajar
 * el extremo para imitar aquel recorrido dejaba el punto más apagado en 4,57:1
 * — que es justo donde se usa `glow`: el titular del hero, SOBRE UNA FOTO, que
 * es el peor fondo posible para el extremo débil de un degradado.
 *
 * Así que el suelo de las dos es --bc2-texto-suave (7,95:1) y lo que separa a
 * `glow` es el HALO, que era su otra mitad desde el principio.
 */
export function GoldText({ children, className, glow = false }: GoldTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-[length:200%_auto] animate-gold-drift",
        "bg-[linear-gradient(110deg,var(--bc2-texto-suave)_0%,var(--bc2-crema)_25%,#ffffff_50%,var(--bc2-crema)_75%,var(--bc2-texto-suave)_100%)]",
        glow && "drop-shadow-[0_0_10px_var(--bc2-brillo-medio)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
