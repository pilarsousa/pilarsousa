import Link from "next/link";
import { cn } from "@/lib/cn";

/*
  El botón del diagnóstico.

  UNA SOLA PIEZA PARA LOS TRES SITIOS donde hay que pulsar: el CTA de la
  landing, el "continuar" del formulario y el enlace a WhatsApp del resultado.
  En la landing de lista de espera esto se aprendió por las malas — había dos
  botones distintos en el mismo recorrido y el último, el que cerraba la
  conversión, era el raro.

  ── <button> O <a>, SEGÚN LO QUE HAGA ──

  Con `href` renderiza un enlace; sin él, un botón. No es cosmético: un enlace
  promete una navegación y el navegador ofrece "abrir en pestaña nueva"; un
  botón anuncia una acción en la misma página. Confundirlos rompe el menú
  contextual y lo que anuncia un lector de pantalla.

  ── EL TAMAÑO SALE DEL font-size ──

  El relleno, el radio y el mínimo táctil van en `em`, así que cambiar el
  tamaño del texto escala la pieza entera sin descuadrar sus proporciones.

  min-h-[3em] no es decoración: es el objetivo táctil. Por debajo de unos 44 px
  de alto, en un teléfono se falla el toque, y este botón aparece once veces
  seguidas en el recorrido.
*/

type Props = {
  children: React.ReactNode;
  className?: string;
  /* Presente → enlace. Ausente → botón. */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  /* El secundario es el "atrás": mismo tamaño, sin peso visual, para que no
     compita con la acción que de verdad hace avanzar. */
  variante?: "principal" | "secundario";
  /*
    ── EL ANCHO ES UN PROP Y NO UNA CLASE QUE SE PASA POR FUERA ──

    Antes el ancho venía cosido a BASE (`w-full sm:w-auto`) y quien necesitaba
    otra cosa lo peleaba desde className. Eso NO FUNCIONA de forma fiable en
    Tailwind: `w-full` y `w-auto` son la misma propiedad, y cuál gana lo decide
    el ORDEN EN LA HOJA GENERADA, no el orden en que se escriben las clases. El
    resultado es un botón que a veces mide lo que se le pidió y a veces no,
    dependiendo de qué utilidades haya usado el resto del proyecto.

    Como prop, sólo se emite una de las tres opciones y no hay conflicto.

      adaptable  ancho completo en móvil, al contenido desde sm. Es lo normal.
      completo   ancho completo siempre — botones dentro de un formulario.
      propio     ninguna clase de ancho: lo dimensiona quien lo coloca. Para el
                 botón cuadrado de "atrás", que va en una fila junto a otro.
  */
  ancho?: "adaptable" | "completo" | "propio";
  /* Para un botón que sólo contiene un icono: sin esto es un control sin
     nombre y un lector de pantalla lo anuncia como "botón" a secas. */
  ariaLabel?: string;
  /* Quita el relleno horizontal para poder hacerlo cuadrado. */
  sinRelleno?: boolean;
};

const BASE =
  "inline-flex min-h-[3em] items-center justify-center gap-2 rounded-full text-center text-[0.95rem] font-semibold leading-tight transition-[background-color,border-color,color,opacity,transform] duration-200 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-45 sm:text-base";

/* El relleno va aparte del BASE porque el botón de icono lo anula: con
   px-[1.6em] no puede ser cuadrado. */
const RELLENO = "px-[1.6em] py-[0.85em]";

const ANCHOS = {
  adaptable: "w-full sm:w-auto",
  completo: "w-full",
  propio: "",
} as const;

const VARIANTES = {
  principal:
    "bg-[var(--dg-acento)] text-[#0b1204] shadow-[0_1px_0_0_rgba(255,255,255,0.28)_inset,0_10px_28px_-12px_rgba(163,202,35,0.8)] hover:bg-[var(--dg-acento-vivo)]",
  secundario:
    "border border-[var(--dg-borde)] bg-transparent text-[var(--dg-texto-suave)] hover:border-[var(--dg-borde-vivo)] hover:text-[var(--dg-texto)]",
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

  if (href && !disabled) {
    /* Los enlaces externos (WhatsApp) salen en pestaña nueva y con rel; los
       internos van por <Link> para que Next precargue la ruta siguiente. */
    const esExterno = /^https?:\/\//.test(href);
    if (esExterno) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={clases}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className={clases}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={clases}
    >
      {children}
    </button>
  );
}
