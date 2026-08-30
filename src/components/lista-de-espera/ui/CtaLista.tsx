"use client";

import { BotonVo } from "@/components/lista-de-espera/ui/BotonVo";
import { useWaitlistModal } from "@/components/lista-de-espera/ui/WaitlistModal";

/*
  El botón que abre el formulario de la lista de espera.

  Es sólo el COMPORTAMIENTO: todo su aspecto vive en BotonVo. Se separaron
  porque el formulario del modal necesita el mismo botón haciendo otra cosa
  —enviar en vez de abrir—, y un `type="submit"` no puede salir de un componente
  con el onClick fijado a "abrir modal".

  ES UN <button> Y NO UN <a>, y la diferencia importa: lo que hace es abrir un
  diálogo en la misma página. Un enlace prometería una navegación que no ocurre
  —el navegador ofrecería "abrir en pestaña nueva", el lector de pantalla lo
  anunciaría como enlace— y ninguna de las dos cosas sería cierta.
*/
export function CtaLista({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useWaitlistModal();

  return (
    <BotonVo onClick={open} className={className}>
      {children}
    </BotonVo>
  );
}
