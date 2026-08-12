import { cn } from "@/lib/cn";

/*
  Contenedor de contenido de esta landing: 1140 px, el ancho de referencia del
  diseño.

  No reutiliza el Container compartido porque aquel fija max-w-6xl (1152 px) y
  cn() es un simple unificador de strings, no un merge de Tailwind: pasarle otro
  max-w dejaría las dos clases puestas y ganaría la que el CSS declare después,
  no la que se pase aquí. Un contenedor propio evita esa ambigüedad y además
  deja libre el ancho de las otras landings, que siguen con el suyo.
*/

type VoContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function VoContainer({ children, className }: VoContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1140px] px-6 sm:px-8", className)}>
      {children}
    </div>
  );
}
