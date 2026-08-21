"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/*
  Carga diferida del haz de luz del hero.

  three pesa del orden de 600 KB minificado y el haz es puramente decorativo:
  cargarlo en el bundle inicial retrasaría el contenido que sí importa —el
  título, el CTA— por un adorno de fondo. Con dynamic + ssr:false el chunk se
  pide después de la hidratación y la página es útil antes de que llegue.

  ssr:false además es necesario, no sólo conveniente: el componente crea un
  contexto WebGL contra el DOM real y no puede renderizarse en el servidor.

  Sin `loading`: cualquier placeholder sería un rectángulo por detrás del panel
  que nadie va a ver, y en su lugar no hay nada hasta que el haz aparece con su
  propio fundido de entrada.

  Efecto secundario del corte por tamaño de más abajo: como el import sólo se
  ejecuta cuando el componente llega a renderizarse, en escritorio el chunk de
  three ni siquiera se descarga.
*/

const LaserFlow = dynamic(
  () =>
    import("@/components/lista-de-espera/ui/LaserFlow").then((m) => ({
      default: m.LaserFlow,
    })),
  { ssr: false },
);

/*
  El haz es SÓLO de móvil.

  En escritorio la card queda centrada en una sección de 800 px y el haz tenía
  que cruzar la foto entera para llegar a ella: competía con el retrato de Pilar
  y con la luz que ya recorre el borde del panel, en vez de acompañarlos. Ahí la
  composición ya funciona sin él.

  En móvil sí suma: la card está abajo, el espacio de arriba es foto y el haz lo
  aprovecha para conducir la mirada desde el tope de la pantalla hasta el CTA.

  No renderizarlo en escritorio además evita el contexto WebGL y su bucle de
  render en el tamaño donde no aportaba nada.
*/
const BEAM = {
  /* Centrado. En móvil la card ocupa todo el ancho, así que desplazarlo a un
     lado dejaba el haz cayendo sobre el borde en lugar de sobre el botón. */
  horizontal: 0,
  /* Punto de impacto a la altura del CTA, en el pie de la card.

     El offset se mide desde el centro del canvas, así que SUBIR este número
     BAJA el impacto: -0.46 lo dejaba en el borde superior del panel y -0.3 se
     quedaba a media card, todavía por encima del botón.

     Se hace más negativo al subir la card con el margen negativo de Hero.tsx:
     el botón se movió hacia arriba y el haz tiene que acompañarlo. Los dos
     valores van atados. */
  vertical: -0.38,
};

export function HeroLaser() {
  /* Arranca en null para no decidir antes de poder medir: con `false` el haz se
     montaría un instante en escritorio y luego se retiraría. El componente ya
     viene por dynamic con ssr:false, así que no hay HTML de servidor con el que
     este estado inicial pudiera discrepar. */
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (!isMobile) return null;

  return (
    <LaserFlow
      horizontalBeamOffset={BEAM.horizontal}
      verticalBeamOffset={BEAM.vertical}
      color="#b4e236"
      /* Por encima de los valores de fábrica. El haz se mezcla con
         mix-blend-screen, que sólo SUMA luz: sobre la foto del hero, ya
         iluminada, un haz tenue no se distingue del fondo. */
      fogIntensity={0.42}
      wispIntensity={4.5}
      wispDensity={1}
      flowStrength={0.25}
      horizontalSizing={0.5}
      /* Alargado: el haz tiene que recorrer toda la altura de la sección sin
         apagarse a medio camino. */
      verticalSizing={50}
    />
  );
}
