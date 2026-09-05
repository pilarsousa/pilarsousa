import { Hero } from "@/components/volver-al-origen/sections/Hero";
import { Beneficios } from "@/components/volver-al-origen/sections/Beneficios";
import { Testimonios } from "@/components/volver-al-origen/sections/Testimonios";
import { Origen } from "@/components/volver-al-origen/sections/Origen";
import { Pilar } from "@/components/volver-al-origen/sections/Pilar";
import { Footer } from "@/components/volver-al-origen/sections/Footer";

/*
  Landing de lista de espera — /volver-al-origen.

  Las secciones, en su orden:
    1. Hero — promesa + CTA que abre el formulario, visible sin hacer scroll
    2. Qué te llevarás por entrar en la lista (motivo para dejar el dato)
    3. Lo que dicen quienes ya dieron el paso (prueba social)
    4. Qué es Volver al Origen — la historia y el porqué (Origen)
    5. Quién es Pilar (autoridad)

  El orden responde a las preguntas del visitante según van apareciendo: por qué
  darte mi dato, quién más lo hizo, de dónde sale esto y quién lo dirige.

  ⚠️ LA HISTORIA VA DESPUÉS DE LOS TESTIMONIOS Y NO ANTES. Son 450 palabras: es
  la lectura más larga de la página, y sólo se la concede quien ya ha visto que
  a otros les funcionó. Delante de la prueba social se salta entera.

  ⚠️ NO CONFUNDIR `Origen` CON `QueEs`, que son dos secciones distintas y las
  dos responden a "¿qué es Volver al Origen?":

    · Origen (montada) — el relato en primera persona: por qué existe, de dónde
      salen los 13 Códigos y qué lo diferencia.
    · QueEs (OCULTA)   — la ficha del programa: las 6 semanas, las 13 mentorías,
      el acompañamiento. Iba entre Beneficios y Testimonios y se retiró A
      PEDIDO, no por un problema técnico. El componente, su copy en content.ts
      y sus estilos siguen intactos; reponerla es descomentar el import y la
      etiqueta de abajo.

  Si algún día se repone, hay que revisar los dos títulos: dos secciones
  seguidas preguntando lo mismo se leen como un error de montaje.

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
        <Origen />
        <Pilar />
      </main>
      <Footer />
    </>
  );
}
