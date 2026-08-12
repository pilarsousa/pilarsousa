import { cn } from "@/lib/cn";

/*
  Título de sección: Cinzel en versalitas con un tramo en verde luminoso.

  El tramo resaltado se pasa como prop y no como <span> dentro de children para
  que content.ts pueda seguir siendo texto plano — el copy no debería contener
  JSX.

  El texto se escribe en minúsculas en content.ts y las versalitas las pone
  uppercase por CSS: así los lectores de pantalla lo leen como una frase y no
  deletrean cada letra.
*/

type SectionTitleProps = {
  children: React.ReactNode;
  /** Tramo resaltado en verde, al final del título. */
  accent?: string;
  /** Texto tras el tramo resaltado (p. ej. el "?" de "¿…lista de espera?"). */
  after?: string;
  /* Color del tramo resaltado. Por defecto el verde luminoso, que sólo se lee
     sobre fondo oscuro; las secciones de fondo claro pasan un verde más
     profundo para no perder contraste. */
  accentClassName?: string;
  id?: string;
  className?: string;
};

export function SectionTitle({
  children,
  accent,
  after,
  accentClassName = "text-accent",
  id,
  className,
}: SectionTitleProps) {
  return (
    <h2
      id={id}
      className={cn(
        "text-center font-display text-2xl uppercase leading-[1.3] tracking-[0.06em] sm:text-3xl md:text-[2.15rem]",
        className,
      )}
    >
      {children}
      {accent && <span className={accentClassName}> {accent}</span>}
      {after}
    </h2>
  );
}
