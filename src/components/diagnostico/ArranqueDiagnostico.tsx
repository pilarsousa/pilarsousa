"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FormularioContacto } from "@/components/diagnostico/FormularioContacto";
import { enviarFormulario } from "@/components/diagnostico/enviar";
import type { DatosContacto } from "@/components/diagnostico/almacen";

/*
  El formulario tal como aparece EN LA LANDING.

  Es una envoltura fina a propósito: todo el comportamiento del formulario vive
  en FormularioContacto, y lo único que añade esta capa es qué pasa al
  terminarlo — mandar el contacto y llevar a las preguntas.

  Está separado para que la landing siga siendo un componente de SERVIDOR. Si
  el `useRouter` viviera en la página, la landing entera —titular, mockup,
  pie— tendría que ser de cliente y viajaría como JavaScript al navegador. Así
  sólo se hidrata esta caja.

  ── SE PRECARGA LA RUTA SIGUIENTE ──

  El <Link> de Next precarga solo, pero aquí no hay enlace: la navegación la
  dispara `router.push` al validar el último campo. `router.prefetch` en cuanto
  se monta consigue lo mismo — para cuando el visitante termine de escribir su
  teléfono, la página de las preguntas ya está descargada y el salto es
  inmediato.
*/
const DURACION_PUENTE_FORMULARIO = 620;

export function ArranqueDiagnostico({ className }: { className?: string }) {
  const router = useRouter();
  const [preparandoPreguntas, setPreparandoPreguntas] = useState(false);
  const temporizador = useRef<number | null>(null);

  useEffect(() => {
    router.prefetch("/diagnostico/encuesta");
  }, [router]);

  useEffect(() => {
    return () => {
      if (temporizador.current !== null) {
        window.clearTimeout(temporizador.current);
      }
    };
  }, []);

  const alCompletar = useCallback(
    (datos: DatosContacto) => {
      /* El contacto se manda ANTES de navegar, no al llegar a las preguntas:
         así queda registrado aunque el visitante cierre la pestaña en el
         salto. El envío no se espera (ver enviar.ts). */
      enviarFormulario(datos);
      setPreparandoPreguntas(true);

      if (temporizador.current !== null) {
        window.clearTimeout(temporizador.current);
      }

      temporizador.current = window.setTimeout(() => {
        router.push("/diagnostico/encuesta");
      }, DURACION_PUENTE_FORMULARIO);
    },
    [router],
  );

  return (
    <FormularioContacto
      onCompleto={alCompletar}
      className={className}
      transicionActiva={preparandoPreguntas}
    />
  );
}
