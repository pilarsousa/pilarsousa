import type { Metadata } from "next";
import { AcidSquaresFondo } from "@/components/diagnostico/ui/AcidSquaresFondo";
import { FlujoTest } from "@/components/diagnostico/FlujoTest";

/*
  /diagnostico/encuesta — el formulario y las 7 preguntas.

  La página es de servidor y sólo coloca la cabecera; todo el estado vive en
  FlujoTest, que es el único componente de cliente del embudo.

  LA CABECERA ES SÓLO EL LOGO. Aquí sí hace falta una —a diferencia de la
  landing, donde el logo va superpuesto sobre la imagen del hero— porque esta
  pantalla es un formulario y no hay ninguna imagen sobre la que apoyarlo.
  Nada más que el logo: el visitante ya dijo que sí, y lo único que necesita
  mientras rellena es saber de quién es la página.

  noindex: es una pantalla intermedia del embudo. Indexarla mandaría gente
  directamente al formulario, sin haber leído la promesa que lo justifica.
*/

export const metadata: Metadata = {
  title: "Tu diagnóstico de frecuencia | Volver al Origen",
  robots: { index: false, follow: false },
};

export default function TestPage() {
  return (
    /* MISMA PALETA QUE LA LANDING, Y FONDO PROPIO.

       Esta pantalla corría con la paleta anterior —lima sobre casi negro—. Eso
       se retiró al pedir que la landing fuera la referencia de estilo: el
       recorrido pasaba por tres pantallas con tres aspectos, y el cambio de
       paleta a mitad de camino se leía como haber saltado a otro sitio.

       EL FONDO ANIMADO SE QUEDA, repintado con los colores de la marca. Es lo
       que separa esta pantalla de un formulario cualquiera, y en la landing
       hace el mismo papel la animación de anillos del hero: las dos pantallas
       tienen atmósfera, sólo que distinta.

       `isolate` y el z-10 del <main> son lo que deja el contenido por encima
       del lienzo: sin ellos, el canvas —que es un absoluto— se pintaría encima
       de las preguntas. */
    <div className="relative isolate flex min-h-svh flex-col">
      <AcidSquaresFondo />
      <main className="relative z-10 flex-1">
        <FlujoTest />
      </main>
    </div>
  );
}
