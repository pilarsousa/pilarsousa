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

        {/* ══ EL TRAMO CLARO ══

            Las ventajas de la lista y los testimonios comparten un panel crema
            con la retícula del embudo del diagnóstico. Es el tramo informativo
            del recorrido —qué te llevas y quién lo avala—, y sacarlo del negro
            lo separa del hero y de la historia que viene después sin necesidad
            de filetes ni separadores.

            EL ENVOLTORIO ES QUIEN LO PINTA, no cada sección: el fondo tiene que
            ser CONTINUO entre las dos. Puesto en cada una por separado, la
            imagen se repetiría desde el principio en la segunda y aparecería
            una segunda retícula a media página.

            ⚠️ Y ES TAMBIÉN QUIEN DA LA VUELTA A LA TINTA. Las dos secciones
            están escritas contra `text-foreground` y `text-accent`, que aquí
            son colores para fondo oscuro; .vo-panel-claro redefine esos tokens
            y todo lo de dentro se invierte solo. Ver globals.css. */}
        <div className="vo-panel-claro">
          <Beneficios />
          {/* <QueEs /> — ver la nota de arriba */}
          <Testimonios />
        </div>

        <Origen />
        <Pilar />
      </main>
      <Footer />
    </>
  );
}
