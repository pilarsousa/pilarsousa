import { Hero } from "@/components/volver-al-origen/sections/Hero";
import { Beneficios } from "@/components/volver-al-origen/sections/Beneficios";
import { Testimonios } from "@/components/volver-al-origen/sections/Testimonios";
import { Pilar } from "@/components/volver-al-origen/sections/Pilar";
import { Footer } from "@/components/volver-al-origen/sections/Footer";

/*
  Landing de lista de espera — /volver-al-origen.

  Las secciones, en su orden:
    1. Hero — promesa + CTA que abre el formulario, visible sin hacer scroll
    2. Qué te llevarás por entrar en la lista (motivo para dejar el dato)
    3. Lo que dicen quienes ya dieron el paso (prueba social)
    4. Quién es Pilar (autoridad)

  El orden responde a las preguntas del visitante según van apareciendo: por qué
  darte mi dato, quién más lo hizo y quién lo dirige.

  OCULTA: "¿Qué es Volver al Origen?" (QueEs), que iba entre Beneficios y
  Testimonios y detallaba lo que incluye el programa. Se retira a pedido, no por
  un problema técnico: el componente, su copy en content.ts y sus estilos siguen
  en el repo intactos. Para reponerla basta con descomentar el import y la
  etiqueta de abajo.

  Los fondos alternan oscuro y tinte verde —Beneficios oscuro, Testimonios con
  tinte, Pilar oscuro— y cada tinte entra y sale difuminado por sus bordes, así
  que el cambio se lee como respiración y no como bloques pegados.

  Todos los CTA abren el mismo modal de registro.
*/
export default function VolverAlOrigenPage() {
  return (
    <>
      <main>
        <Hero />
        <Beneficios />
        {/* <QueEs /> — ver la nota de arriba */}
        <Testimonios />
        <Pilar />
      </main>
      <Footer />
    </>
  );
}
