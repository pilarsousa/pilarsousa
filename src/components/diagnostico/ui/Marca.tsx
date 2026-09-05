import Image from "next/image";
import { LANDING } from "@/components/diagnostico/contenido";

/*
  La cabecera de /diagnostico/encuesta y /diagnostico/resultado: el logo y nada más.

  ── EN LA LANDING NO SE USA ──

  Allí el logo va SUPERPUESTO sobre la imagen del hero (ver page.tsx), no en una
  cabecera propia. Aquí no hay imagen sobre la que apoyarlo —son un formulario y
  una pantalla de resultado— así que necesita su propia franja.

  ── SIN MENÚ Y SIN ENLACE ──

  Es una decisión del documento, no un olvido: en una página de captación cada
  enlace es una salida del embudo. El logo tampoco enlaza a la home, que es lo
  que uno espera de un logo y justo por eso sería la fuga más usada.

  ── VA CENTRADO ──

  Cuando llevaba la frase al lado tenía sentido alinearlo a la izquierda: eran
  dos piezas en fila y necesitaban un eje. Solo, centrado se lee como la marca
  de la página; a la izquierda parecería el resto de una barra de navegación a
  la que le faltan los enlaces.

  ── EL LOGO ES REDONDO, Y ESO CAMBIA EL MONTAJE ──

  Va cuadrado (`size-*`, no `h-* w-auto`) porque un `w-auto` sobre una imagen
  cuadrada da el mismo resultado sólo por casualidad, y deja de darlo en cuanto
  llegue una versión con otra proporción.

  El disco es verde muy oscuro —rgb(1,49,3)— sobre un fondo casi negro. Se
  distingue por el nombre en blanco que lleva dentro, no por el contorno del
  disco, y así está diseñada la marca: no se le añade borde ni resplandor para
  "despegarla" del fondo, que es la tentación evidente y le cambiaría el
  aspecto a un logotipo que no es nuestro.

  `priority` porque es lo primero que se ve y está por encima del pliegue.
*/
export function Marca() {
  return (
    <header className="flex justify-center px-5 pt-6 sm:pt-8">
      <Image
        src={LANDING.logo}
        alt="Volver al Origen"
        width={1254}
        height={1254}
        priority
        quality={90}
        sizes="64px"
        className="size-14 shrink-0 sm:size-16"
      />
    </header>
  );
}
