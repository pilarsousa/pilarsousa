import { Hero } from "@/components/volver-al-origen/sections/Hero";
import { Beneficios } from "@/components/volver-al-origen/sections/Beneficios";
import { QueEs } from "@/components/volver-al-origen/sections/QueEs";
import { Testimonios } from "@/components/volver-al-origen/sections/Testimonios";
import { Pilar } from "@/components/volver-al-origen/sections/Pilar";
import { Footer } from "@/components/volver-al-origen/sections/Footer";

/*
  Landing de lista de espera — /volver-al-origen.

  Las secciones, en su orden:
    1. Hero — promesa + CTA que abre el formulario, visible sin hacer scroll
    2. Qué te llevarás por entrar en la lista (motivo para dejar el dato)
    3. Qué es Volver al Origen (qué es aquello a lo que se apunta)
    4. Lo que dicen quienes ya dieron el paso (prueba social)
    5. Quién es Pilar (autoridad)

  El orden responde a las preguntas del visitante según van apareciendo: por qué
  darte mi dato, qué es esto exactamente, quién más lo hizo y quién lo dirige.

  Los fondos alternan oscuro y tinte verde —Beneficios oscuro, Qué es con tinte,
  Testimonios con tinte, Pilar oscuro— y cada tinte entra y sale difuminado por
  sus bordes, así que el cambio se lee como respiración y no como bloques
  pegados.

  Todos los CTA abren el mismo modal de registro.
*/
export default function VolverAlOrigenPage() {
  return (
    <>
      <main>
        <Hero />
        <Beneficios />
        <QueEs />
        <Testimonios />
        <Pilar />
      </main>
      <Footer />
    </>
  );
}
