import type React from "react";
import { cn } from "@/lib/cn";
import { ShinyButton } from "@/components/ui/shiny-button";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variante?: "principal" | "secundario";
  ancho?: "adaptable" | "completo" | "propio";
  ariaLabel?: string;
  sinRelleno?: boolean;
};

const BASE =
  "inline-flex min-h-[3em] cursor-pointer items-center justify-center gap-2 rounded-full text-center text-[0.95rem] font-semibold leading-tight disabled:pointer-events-none disabled:opacity-45 sm:text-base";

const RELLENO = "px-[1.6em] py-[0.85em]";

const ANCHOS = {
  adaptable: "w-full sm:w-auto",
  completo: "w-full",
  propio: "",
} as const;

const VARIANTES = {
  principal: "dg-boton-shiny--principal",
  secundario: "dg-boton-shiny--secundario",
} as const;

export function BotonDg({
  children,
  className,
  href,
  onClick,
  type = "button",
  disabled = false,
  variante = "principal",
  ancho = "adaptable",
  ariaLabel,
  sinRelleno = false,
}: Props) {
  const clases = cn(
    BASE,
    !sinRelleno && RELLENO,
    ANCHOS[ancho],
    VARIANTES[variante],
    className,
  );

  return (
    <ShinyButton
      href={href}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={clases}
    >
      {children}
    </ShinyButton>
  );
}
