import { cn } from "@/lib/cn";
import type { PAISES } from "@/components/cientifico-v2/content";

type Pais = (typeof PAISES)[number]["pais"];

/*
  Banderas 3:2 de los países del público, en SVG: los emojis de bandera no se
  ven en Windows (salen las letras "ES", "MX"…). Dibujos de country-flag-icons
  (MIT), copiados acá para no depender de un paquete que sólo llega como
  dependencia de react-phone-number-input.
*/
const BANDERAS: Record<Pais, { viewBox: string; dibujo: React.ReactNode }> = {
  España: {
    viewBox: "0 0 22.5 15",
    dibujo: (
      <>
        <path fill="#D03433" d="M0 0h22.5v4H0V0zm0 11h22.5v4H0v-4z" />
        <path fill="#FBCA46" d="M0 4h22.5v7H0V4z" />
        <path fill="#FFF" d="M7.8 7h1v.5h-1V7z" />
        <path
          fill="#A41517"
          d="M7.2 8.5c0 .3.3.5.6.5s.6-.2.6-.5L8.5 7H7.1l.1 1.5zM6.6 7c0-.3.2-.5.4-.5h1.5c.3 0 .5.2.5.4V7l-.1 1.5c-.1.6-.5 1-1.1 1-.6 0-1-.4-1.1-1L6.6 7z"
        />
        <path
          fill="#A41517"
          d="M6.8 7.5h2V8h-.5l-.5 1-.5-1h-.5v-.5zM5.3 6h1v3.5h-1V6zm4 0h1v3.5h-1V6zm-2.5-.5c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v.2c0 .2-.1.3-.3.3H7c-.1 0-.2-.1-.2-.2v-.3z"
        />
      </>
    ),
  },
  México: {
    viewBox: "0 0 513 342",
    dibujo: (
      <>
        <path fill="#dc2339" d="M342 0H0v341.3h513V0z" />
        <path fill="#11865d" d="M0 0h171v342H0z" />
        <path fill="#FFF" d="M171 0h171v342H171z" />
        <path
          fill="#8C9157"
          d="M195.8 171.2c0 21.6 11.5 41.7 30.3 52.5 5.8 3.4 13.2 1.4 16.6-4.4 3.4-5.8 1.4-13.2-4.4-16.6-11.3-6.5-18.2-18.5-18.2-31.5 0-6.7-5.4-12.1-12.1-12.1-6.7 0-12.2 5.4-12.2 12.1zm93.4 51.1c17.5-11.1 28-30.4 28-51.1 0-6.7-5.4-12.1-12.1-12.1s-12.1 5.4-12.1 12.1c0 12.4-6.3 24-16.8 30.7-5.7 3.5-7.5 10.9-4.1 16.7s10.9 7.5 16.7 4.1c0-.2.2-.3.4-.4z"
        />
        <ellipse fill="#C59262" cx="256.5" cy="159.1" rx="24.3" ry="36.4" />
      </>
    ),
  },
  Argentina: {
    viewBox: "0 0 513 342",
    dibujo: (
      <>
        <path fill="#FFF" d="M0 0h513v342H0z" />
        <path fill="#338AF3" d="M0 0h513v114H0zM0 228h513v114H0z" />
        <circle fill="#FFDA44" stroke="#d6ab00" strokeWidth="5" cx="256.5" cy="171" r="40" />
      </>
    ),
  },
  Colombia: {
    viewBox: "0 0 513 342",
    dibujo: (
      <>
        <path fill="#FFDA44" d="M0 0h513v342H0z" />
        <path fill="#D80027" d="M0 256.5h513V342H0z" />
        <path fill="#0052B4" d="M0 171h513v85.5H0z" />
      </>
    ),
  },
  Chile: {
    viewBox: "0 0 513 342",
    dibujo: (
      <>
        <path fill="#D80027" d="M0 0h513v342H0z" />
        <path fill="#FFF" d="M196 0h317v171H196z" />
        <path fill="#0037A1" d="M0 0h196v171H0z" />
        <path fill="#FFF" d="M98 24.5 113.1 71H162l-39.6 28.7 15.2 46.5L98 117.5l-39.6 28.7 15.2-46.5L34 71h48.9z" />
      </>
    ),
  },
};

/** Decorativa: el nombre del país va siempre al lado, en texto. */
export function Bandera({ pais, className }: { pais: Pais; className?: string }) {
  const { viewBox, dibujo } = BANDERAS[pais];
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden
      className={cn("aspect-[3/2] shrink-0 rounded-[3px] ring-1 ring-white/15", className)}
    >
      {dibujo}
    </svg>
  );
}
