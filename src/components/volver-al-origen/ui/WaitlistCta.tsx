"use client";

import { VoCta } from "@/components/volver-al-origen/ui/VoCta";
import { useWaitlistModal } from "@/components/volver-al-origen/ui/WaitlistModal";

/*
  CTA que abre el modal de la lista de espera.

  Existe para que las secciones sigan siendo componentes de SERVIDOR: el
  onClick necesita cliente, y sin este envoltorio habría que marcar como
  "use client" secciones enteras que sólo tienen un botón interactivo. Aquí se
  hidrata únicamente el botón.
*/
export function WaitlistCta({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useWaitlistModal();

  return (
    <VoCta onClick={open} className={className}>
      {children}
    </VoCta>
  );
}
