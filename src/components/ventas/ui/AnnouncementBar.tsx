/*
  Barra de anuncio de la landing de ventas: una frase que se desplaza en loop
  infinito (marquee), fija arriba. Más simple que la de registro — sin
  countdown, solo el mensaje de urgencia repitiéndose.

  El track lleva varias copias idénticas separadas por ✦; al desplazarse -50%
  (animate-marquee) el corte es invisible porque la segunda mitad es idéntica a
  la primera. Texto accesible aparte con sr-only.
*/

const MESSAGE = "Oferta disponible solo hasta agotarse las plazas";

/* Una "mitad" del track: repetimos la frase para llenar el ancho antes de que
   el loop reinicie, así nunca se ve un hueco vacío en pantallas anchas. */
function Half() {
  return (
    <div aria-hidden className="flex shrink-0">
      {Array.from({ length: 4 }).map((_, i) => (
        <span
          key={i}
          className="flex items-center whitespace-nowrap px-4 font-sans text-[0.72rem] font-semibold uppercase tracking-wide text-white sm:text-sm"
        >
          {MESSAGE}
          <span aria-hidden className="px-4 text-white/60">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <div
      role="region"
      aria-label="Anuncio de la oferta"
      className="fixed inset-x-0 top-0 z-100"
    >
      <div className="relative overflow-hidden border-b border-white/10 bg-[#28BFF1]/38 backdrop-blur-md">
        {/* Viñeteado lateral */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-black/55 to-transparent sm:w-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-black/55 to-transparent sm:w-24"
        />

        {/* Shimmer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 -skew-x-12 animate-bar-shimmer bg-gradient-to-r from-transparent via-white/35 to-transparent"
        />

        <div className="py-2">
          <div className="flex w-max animate-marquee-slow will-change-transform">
            <Half />
            <Half />
          </div>
          <span className="sr-only">{MESSAGE}</span>
        </div>
      </div>
    </div>
  );
}
