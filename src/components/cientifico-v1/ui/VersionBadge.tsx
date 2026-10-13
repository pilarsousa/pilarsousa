/*
  Marca de trabajo: deja claro a simple vista que se está viendo /cientifico-v1
  (la variante en desarrollo) y no /mision-origen, que comparte diseño y copy.

  Fija abajo a la derecha (a la izquierda la tapa el indicador de Next en
  desarrollo), por encima de la AnnouncementBar (z-100) pero por
  debajo del modal de reserva (z-[200]) para no tapar el formulario.
  pointer-events-none: es sólo una etiqueta, nunca debe interceptar clics.

  ⚠️ Retirar antes de publicar la landing.
*/
export function VersionBadge() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-4 right-4 z-150 flex items-center gap-2 rounded-full border-2 border-black bg-[#facc15] px-4 py-2 font-sans text-xs font-bold uppercase tracking-[0.18em] text-black shadow-[0_6px_24px_rgba(0,0,0,0.6)] sm:text-sm"
    >
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-black opacity-60" />
        <span className="relative inline-flex size-2.5 rounded-full bg-black" />
      </span>
      Científico · V1
    </div>
  );
}
