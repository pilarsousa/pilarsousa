import type { Metadata } from "next";
import { AcidSquaresFondo } from "@/components/diagnostico/ui/AcidSquaresFondo";
import { VistaResultado } from "@/components/diagnostico/VistaResultado";

/*
  /analisis/resultado — la página de gracias.

  El resultado se resuelve en el navegador (sessionStorage, o el parámetro `f`
  como red), así que esta página no recibe searchParams ni necesita ser
  dinámica: se sirve estática y VistaResultado la completa al hidratar.

  noindex, y aquí importa más que en las otras dos rutas: es una página de
  post-conversión con un enlace al grupo de WhatsApp. Si Google la indexa, se
  puede llegar al grupo sin pasar por el test — que es exactamente lo que el
  embudo intenta evitar.
*/

export const metadata: Metadata = {
  title: "Tu frecuencia dominante | Volver al Origen",
  robots: { index: false, follow: false },
};

export default function ResultadoPage() {
  return (
    /* Mismo fondo animado que /encuesta, con los colores de la marca. Ver la
       nota de encuesta/page.tsx. */
    <div className="relative isolate flex min-h-svh flex-col">
      <AcidSquaresFondo />
      <main className="relative z-10 flex-1">
        <VistaResultado />
      </main>
    </div>
  );
}
