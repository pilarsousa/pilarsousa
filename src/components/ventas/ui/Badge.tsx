import type { LucideIcon } from "lucide-react";

/*
  Badge/pill que abre cada sección. Estilo simple y unificado (mismo color en
  todas las secciones): pill de borde tenue sobre fondo translúcido, texto en
  mayúsculas con tracking, e icono opcional a la izquierda.
*/
export function Badge({
  icon: Icon,
  children,
}: {
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/80">
      {Icon && <Icon size={13} aria-hidden className="text-cyan" />}
      {children}
    </span>
  );
}
