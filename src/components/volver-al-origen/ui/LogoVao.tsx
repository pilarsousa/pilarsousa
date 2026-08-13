import Image from "next/image";
import { cn } from "@/lib/cn";
import logoVao from "@/../public/volver-origen/public/img/Logo-volveralorigen.webp";

/*
  Logo de Volver al Origen — el archivo definitivo de marca.

  Sustituye a la reconstrucción en SVG que ocupaba este sitio antes. Aquella
  tomaba el verde del tema con currentColor; ésta no, y es lo correcto: el
  original es una ilustración a todo color (aro dorado-verde, paisaje y figura)
  que no se puede recolorear desde CSS ni tendría sentido hacerlo.

  La API se mantiene —el mismo `className` con las utilidades de tamaño— para
  que el hero, el modal y la página de gracias no cambien.

  El archivo es cuadrado (300x300), así que width y height van con ese valor:
  Next los usa para reservar el hueco antes de cargarla y evitar el salto de
  maquetación. El tamaño real en pantalla lo sigue mandando el className.
*/

type LogoVaoProps = {
  className?: string;
  /* Para pasar variables CSS. El hero y el modal declaran en --logo su tamaño y
     derivan de ahí el margen negativo que lo deja a caballo del borde, de modo
     que ambos valores no puedan desincronizarse. */
  style?: React.CSSProperties;
};

export function LogoVao({ className, style }: LogoVaoProps) {
  return (
    <Image
      src={logoVao}
      alt="Volver al Origen"
      width={300}
      height={300}
      style={style}
      /* El logo aparece dentro del hero, en lo alto de la página, así que se
         pide con prioridad: es parte de la primera impresión y no debe entrar
         tarde. */
      priority
      /* h-auto acompaña al ancho que fije el className: sin él, el width/height
         del atributo gana y la imagen se deforma cuando el tamaño lo marca una
         utilidad de Tailwind. */
      className={cn("h-auto object-contain", className)}
    />
  );
}
