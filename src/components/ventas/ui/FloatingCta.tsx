"use client";

import { useEffect, useState } from "react";
import { VENTAS_CHECKOUT_URL, WHATSAPP_SUPPORT_URL } from "@/lib/links";

/*
  CTA + WhatsApp anclados abajo a la derecha — adaptado de la landing de
  referencia. El botón de acceso lleva el halo neón (misma clase .neon-btn que
  el resto) y el de WhatsApp su glow verde. Aparecen tras scrollear un poco
  (para no tapar el hero) y quedan fijos.
*/

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.748-.983v.376zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Aparece tras pasar el primer viewport, para no competir con el hero.
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-90 flex items-center gap-3 transition-all duration-500 sm:bottom-6 sm:right-6 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      {/* WhatsApp — algo más chico en mobile */}
      <a
        href={WHATSAPP_SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consultar por WhatsApp"
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#25D366_0%,#128C7E_100%)] text-white shadow-[0_8px_24px_-4px_rgba(37,211,102,0.7)] transition-transform duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:size-14"
      >
        <WhatsAppIcon className="size-6 sm:size-7" />
      </a>

      {/* Acceder — en mobile más compacto (menos padding y texto) para no
          desbordar junto al botón de WhatsApp. */}
      <a
        href={VENTAS_CHECKOUT_URL || undefined}
        className="neon-btn cursor-pointer flex h-12 items-center justify-center whitespace-nowrap rounded-full px-4 font-sans text-xs font-bold uppercase tracking-[0.04em] text-white transition-all duration-300 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:h-14 sm:px-6 sm:text-sm sm:tracking-[0.06em]"
      >
        Acceder
        <span className="hidden sm:inline">&nbsp;ahora</span>
      </a>
    </div>
  );
}
