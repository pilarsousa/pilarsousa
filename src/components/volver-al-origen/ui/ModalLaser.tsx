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
    import("@/components/volver-al-origen/ui/LaserFlow").then((m) => ({
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
      /* Positivo, y bastante: el offset se mide desde el CENTRO del canvas, y
         el botón no está en el centro del panel sino al final, después del
         logo, el título, el texto y tres campos. Con valores negativos el haz
         moría a la altura del formulario —justo el tramo que no debe tocar— en
         lugar de llegar al CTA. */
      verticalBeamOffset={0.34}
      color="#b4e236"
      /* Más contenido que en el hero: aquí el haz cruza por detrás de los
         campos del formulario, y con la intensidad del hero les restaba
         legibilidad en lugar de acompañarlos. */
      fogIntensity={0.3}
      wispIntensity={3.2}
      wispDensity={0.8}
      flowStrength={0.2}
      horizontalSizing={0.5}
      /* Alargado para que el haz recorra el panel entero sin apagarse antes de
         llegar al botón. */
      verticalSizing={40}
    />
  );
}
