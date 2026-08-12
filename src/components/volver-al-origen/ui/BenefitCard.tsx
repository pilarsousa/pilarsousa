import { Clock, Gift, Tag, type LucideIcon } from "lucide-react";

/*
  Una de las tres ventajas de apuntarse a la lista.

  El icono llega como string desde content.ts y se traduce aquí: así el archivo
  de copy sigue siendo data serializable, sin importar componentes de React.
  El mapa es cerrado a propósito — si alguien escribe un nombre que no existe,
  TypeScript lo marca en content.ts en lugar de fallar en tiempo de ejecución.
*/

const ICONS = {
  clock: Clock,
  tag: Tag,
  gift: Gift,
} satisfies Record<string, LucideIcon>;

export type BenefitIcon = keyof typeof ICONS;

type BenefitCardProps = {
  icon: BenefitIcon;
  title: string;
  text: string;
};

export function BenefitCard({ icon, title, text }: BenefitCardProps) {
  const Icon = ICONS[icon];

  return (
    <div className="flex flex-col items-center px-2 text-center">
      {/* Círculo del icono: borde verde tenue y halo luminoso, el mismo recurso
          de "luz encendida" que usan los CTA y el logo. */}
      <span className="mb-6 flex size-[86px] items-center justify-center rounded-full border border-accent/35 bg-vo-forest/40 shadow-[0_0_26px_-8px_var(--vo-glow-strong)]">
        <Icon size={38} strokeWidth={1.2} className="text-accent" aria-hidden />
      </span>

      <h3 className="font-display text-lg uppercase leading-snug tracking-[0.1em] text-foreground sm:text-xl">
        {title}
      </h3>

      {/* Peso normal y opacidad 85%, no light al 60%: este es el texto más
          pequeño de la sección y sobre fondo oscuro esa combinación quedaba por
          debajo del umbral cómodo de lectura. */}
      <p className="mt-4 max-w-[32ch] font-sans text-base leading-relaxed text-foreground/85 sm:text-[1.05rem]">
        {text}
      </p>
    </div>
  );
}
