import { cn } from "@/lib/cn";
import styles from "./TactileCtaButton.module.css";

type TactileCtaButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Full-width on its container. */
  block?: boolean;
  /** Opens in a new tab with safe rel — use for external checkout links. */
  external?: boolean;
};

/**
 * CTA "de pieza física": un aro exterior con una cara interior hundida, que se
 * inclina hacia el lado por donde entra el cursor y se aplasta al pulsarlo.
 *
 * Por ahora sólo lo usa el hero, como prueba frente al CtaButton de siempre.
 *
 * ── LAS ZONAS DE INCLINACIÓN VAN DENTRO DEL ENLACE ──
 *
 * En el diseño de referencia las dos zonas invisibles eran hermanas del botón
 * y quedaban por ENCIMA de él, tapando el 80% de su superficie: un click en
 * los costados caía en un div vacío y no hacía nada. Aquí son hijas del <a>,
 * así que cualquier punto del botón sigue siendo el enlace.
 *
 * ── EL ANCHO LO DA EL TEXTO ──
 *
 * La cara es absoluta —tiene que poder inclinarse sin mover lo de alrededor—
 * y por eso no empuja el tamaño del enlace. El .sizer es una copia invisible
 * de la etiqueta, en el flujo, que sí lo hace: el botón crece con su texto
 * (una etiqueta larga no cabe en un ancho fijo) y nunca baja del
 * mínimo. Va aria-hidden para que el lector de pantalla no lo lea dos veces.
 */
export function TactileCtaButton({
  href,
  children,
  className,
  block,
  external,
}: TactileCtaButtonProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(styles.cta, block && styles.block, className)}
    >
      <span aria-hidden className={cn(styles.label, styles.sizer)}>
        {children}
      </span>
      <span aria-hidden className={cn(styles.zone, styles.zoneLeft)} />
      <span aria-hidden className={cn(styles.zone, styles.zoneRight)} />
      <span className={styles.face}>
        <span className={styles.label}>{children}</span>
      </span>
    </a>
  );
}
