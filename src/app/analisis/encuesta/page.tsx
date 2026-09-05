import type { Metadata } from "next";
import { FlujoTest } from "@/components/diagnostico/FlujoTest";
import { AcidSquaresFondo } from "@/components/diagnostico/ui/AcidSquaresFondo";

/*
  /analisis/encuesta — el formulario y las 7 preguntas.

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
    <div className="dg-encuesta-tema-anterior relative isolate flex min-h-svh flex-col">
      <AcidSquaresFondo />
      <main className="relative z-10 flex-1">
        <FlujoTest />
      </main>
    </div>
  );
}
