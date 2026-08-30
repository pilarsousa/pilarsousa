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

  return (
    <FocoBento>
      <div className="le-bento-zona contents">{rejilla}</div>
    </FocoBento>
  );
}

/*
  Envoltorio de UNA card. Se separa de RejillaBonus porque el contenido de cada
  card lo pinta el servidor y sólo su comportamiento necesita el navegador.

  EL className SE RECIBE Y NO SE FIJA AQUÍ: las medidas de la card —el radio, el
  padding del filete, el alto mínimo atado al banner— viven en la sección, que es
  donde se ven junto al resto de la maqueta.
*/
export function CardBonus({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const esMovil = useEsMovil();

  if (esMovil) return <div className={className}>{children}</div>;

  return (
    <CardMagica className={className} desactivar={esMovil}>
      {children}
    </CardMagica>
  );
}
