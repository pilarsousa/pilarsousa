"use client";

import type { ReactNode } from "react";
import {
  CardMagica,
  FocoBento,
  useEsMovil,
} from "@/components/lista-de-espera/ui/BentoMagico";

/*
  La rejilla de las tres cards de BONUS, con los efectos de cursor montados.

  ── POR QUÉ EXISTE ESTE ARCHIVO ──

  ListaEspera es un componente de SERVIDOR y los efectos necesitan hooks. Sin
  esta capa habría que marcar la sección entera como cliente, y con ella se
  irían al navegador el contenido, los imports de las imágenes y todo lo demás
  para no ganar nada.

  Aquí sólo cruza el límite lo que de verdad necesita el navegador: la rejilla y
  el comportamiento. Las cards siguen renderizándose en el servidor y llegan
  como `children` — un componente de cliente puede recibir árbol de servidor
  como hijo, y ese hijo NO se convierte en cliente al pasar por aquí.

  ── EN MÓVIL DEVUELVE LA REJILLA PELADA ──

  Ninguno de estos efectos existe sin cursor: un foco que sigue al ratón, una
  card que se inclina hacia él o que se imanta no tienen equivalente táctil.
  Montarlos sería añadir listeners que no se disparan nunca.

  useEsMovil arranca en `false` y se corrige tras el primer render — window no
  existe en el servidor. La consecuencia es que en móvil el envoltorio se monta
  un instante y se retira: no se ve nada porque los efectos son de cursor y en
  ese instante no hay ninguno.
*/
export function RejillaBonus({ children }: { children: ReactNode }) {
  const esMovil = useEsMovil();

  const rejilla = (
    <div className="relative z-10 mt-6 grid w-full max-w-[34rem] grid-cols-1 gap-4 md:mt-[5.7vw] md:w-[59.5%] md:max-w-none md:grid-cols-3 md:gap-[0.8vw]">
      {children}
    </div>
  );

  if (esMovil) return rejilla;

  /* EL ENVOLTORIO OCUPA TODO EL ANCHO Y CENTRA LA REJILLA ÉL MISMO.

     La sección apila su contenido con `items-center`, y ese centrado se aplica
     al hijo directo: al meter el envoltorio por el medio, pasó a centrarse ÉL
     —que se encogía a su contenido— y la rejilla quedó corrida dentro. De ahí
     que las tres cards se vieran descentradas.

     Con w-full el envoltorio ocupa el hueco que ocupaba la rejilla, y el
     `flex justify-center` reproduce el centrado que hacía el padre. La cadena
     queda igual que antes de envolver nada. */
  return (
    <FocoBento className="le-bento-zona flex w-full justify-center">
      {rejilla}
    </FocoBento>
  );
}

/*
  Envoltorio de UNA card. Se separa de RejillaBonus porque el contenido de cada
  card lo pinta el servidor y sólo su comportamiento necesita el navegador.

  EL className SE RECIBE Y NO SE FIJA AQUÍ: las medidas de la card —el radio, el
  padding del filete, el alto mínimo atado al banner— viven en la sección, que es
  donde se ven junto al resto de la maqueta.

  LO USAN DOS SECCIONES: los tres bonus de la 8 y las tres áreas de la 5. La
  pieza no sabe de ninguna de las dos —recibe clases y devuelve comportamiento—
  y por eso sirve para ambas sin ramas internas.

  `etiqueta` existe porque las áreas viven dentro de un <ul> y sus cards tienen
  que ser <li> para que la lista siga siendo una lista: un <div> intercalado
  entre el <ul> y sus elementos rompe la semántica y el lector de pantalla deja
  de anunciar "lista de 3 elementos". Los bonus no están en una lista, así que
  usan el <div> por defecto.
*/
export function CardBonus({
  children,
  className,
  etiqueta = "div",
}: {
  children: ReactNode;
  className?: string;
  etiqueta?: "div" | "li";
}) {
  const esMovil = useEsMovil();
  const Etiqueta = etiqueta;

  if (esMovil) return <Etiqueta className={className}>{children}</Etiqueta>;

  return (
    <CardMagica className={className} etiqueta={etiqueta} desactivar={esMovil}>
      {children}
    </CardMagica>
  );
}

/*
  La zona de foco para un grupo de cards que YA TIENE su propio contenedor —como
  la rejilla de las tres áreas, que es un <ul> con sus medidas.

  A diferencia de RejillaBonus, esto no dibuja rejilla: sólo delimita hasta dónde
  llega el foco que sigue al cursor. Se envuelve por fuera del <ul>.
*/
export function ZonaBento({ children }: { children: ReactNode }) {
  const esMovil = useEsMovil();

  if (esMovil) return <>{children}</>;

  /* w-full por el mismo motivo que en RejillaBonus: el envoltorio tiene que
     ocupar el hueco de lo que envuelve, o desplaza lo que había dentro. Aquí no
     hace falta centrar —el <ul> es una rejilla que ya llena su contenedor— pero
     sí ocupar el ancho entero. */
  return <FocoBento className="le-bento-zona w-full">{children}</FocoBento>;
}
