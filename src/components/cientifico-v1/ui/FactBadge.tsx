type FactBadgeProps = {
  children: React.ReactNode;
  /** Optional leading icon (e.g. a Lucide icon element). */
  icon?: React.ReactNode;
};

/**
 * Pastilla de vidrio con un dato del evento (fecha, formato, acceso). El
 * contenido define el ancho y el texto puede partirse: mostrar el dato
 * completo importa más que tener cajas iguales.
 */
export function FactBadge({ children, icon }: FactBadgeProps) {
  return (
    <span className="cv1-vidrio flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm tracking-wide text-foreground/85 lg:text-base">
      {icon && <span className="shrink-0 text-accent">{icon}</span>}
      <span className="font-sans">{children}</span>
    </span>
  );
}
