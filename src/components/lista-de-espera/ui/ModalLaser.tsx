"use client";

import dynamic from "next/dynamic";

/*
  Haz de luz del modal de la lista de espera.

  Va aparte de HeroLaser y no reutiliza sus valores porque el encuadre es otro:
  allí el canvas cubre una sección de pantalla completa con la card abajo del
  todo; aquí cubre un panel de 520 px de ancho cuyo botón está al final del
  formulario. Los offsets que aciertan en uno no aciertan en el otro, y
  parametrizar un único componente con dos juegos de constantes habría dejado el
  origen de cada número más lejos de donde se ajusta.

  A diferencia del hero, este SÍ se monta en escritorio: el modal tapa la página
  y es el mismo panel en los dos tamaños, así que el haz cae igual de bien.

  El import dinámico es el mismo mecanismo que en el hero, y aquí rinde todavía
  más: el modal arranca cerrado, así que el chunk de three sólo se pide cuando
  el visitante abre el formulario.
*/

const LaserFlow = dynamic(
  () =>
    import("@/components/lista-de-espera/ui/LaserFlow").then((m) => ({
      default: m.LaserFlow,
    })),
  { ssr: false },
);

export function ModalLaser() {
  return (
    <LaserFlow
      /* Centrado: el panel es estrecho y el botón ocupa todo su ancho, así que
         desplazar el haz a un lado lo dejaría cayendo sobre el borde. */
      horizontalBeamOffset={0}
      /* El impacto cae sobre el CTA, que en el modal está al final del
         formulario —tras tres campos— y no a media altura como en el hero.

         Este valor es INDEPENDIENTE del de HeroLaser: son dos componentes
         separados justamente por esto, porque el encuadre de cada uno pide un
         número distinto y compartirlos obligaría a elegir cuál de los dos sale
         mal. */
      /* El haz entra por arriba del panel y baja hasta morir en el CTA.

         NEGATIVO BAJA EL PUNTO DE IMPACTO, y este número tiene dos límites:
         con -0.62 bajaba tanto que el cono se salía del canvas y sólo asomaba
         la línea del centro, cortada contra el borde inferior; con -0.34 el
         impacto caía a media altura del formulario, sobre los campos, y el
         botón quedaba fuera del haz.

         -0.46 es el punto en que el cono muere SOBRE EL BOTÓN sin salirse de la
         caja: el haz señala la acción, que es lo que tiene que hacer un haz de
         luz en una pantalla de conversión. */
      verticalBeamOffset={-0.46}
      color="#b4e236"
      /* Más contenido que en el hero: aquí el haz cruza por detrás de los
         campos del formulario, y con la intensidad del hero les restaba
         legibilidad en lugar de acompañarlos. */
      fogIntensity={0.3}
      wispIntensity={3.2}
      wispDensity={0.8}
      flowStrength={0.2}
      horizontalSizing={0.5}
      /* Estaba en 40 y era demasiado para un panel de esta altura: el haz se
         estiraba mucho más allá del canvas, así que dentro sólo se veía el tramo
         central —la línea— y nunca el cono. Este valor lo mantiene largo pero
         dentro de la caja. */
      verticalSizing={12}
    />
  );
}
