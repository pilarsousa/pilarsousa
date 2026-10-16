import type { Metadata } from "next";
import { CalendarDays, Radio } from "lucide-react";
import { Contenedor } from "@/components/cientifico-v2/ui/Contenedor";
import { BarraSuperior } from "@/components/cientifico-v2/ui/BarraSuperior";
import { Wordmark } from "@/components/cientifico-v2/ui/Wordmark";
import { Destacado } from "@/components/cientifico-v2/ui/Destacado";
import { Firma } from "@/components/cientifico-v2/ui/Firma";
import { RedNeuronal } from "@/components/cientifico-v2/ui/RedNeuronal";
import { Separador } from "@/components/cientifico-v2/ui/Separador";
import { Reveal } from "@/components/cientifico-v2/ui/Reveal";
import { Footer } from "@/components/cientifico-v2/sections/Footer";
import { FECHA_CORTA, GRACIAS } from "@/components/cientifico-v2/content";
import { MO_WHATSAPP_COMMUNITY_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "[V2] ¡Tu plaza está reservada! — Seminario de Neurometafísica",
  description: "Tu plaza en el Seminario de Neurometafísica con Pilar Sousa está reservada.",
  robots: { index: false },
};

// Logo oficial de WhatsApp (lucide no trae marcas). Hereda currentColor.
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.748-.983v.376zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

/**
 * Gracias de /cientifico-v2: confirmación de la plaza, recomendaciones,
 * confirmarla en el grupo de WhatsApp y despedida. Sin video. De fondo, la
 * red neuronal con impulsos que viajan.
 */
export default function GraciasV2() {
  return (
    <main className="relative isolate overflow-hidden">
      {/* Luz de tarde: verde medio a la derecha y oro tenue a la izquierda. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_35%_45%_at_100%_25%,rgba(30,59,46,0.8),transparent_70%),radial-gradient(ellipse_30%_40%_at_0%_70%,rgba(233,196,106,0.12),transparent_70%)]"
      />
      {/* Impulsos nerviosos: la red de la landing, fija detrás de todo, con
          destellos que viajan por sus dendritas. Más tenue en el centro,
          donde va el texto. */}
      <RedNeuronal
        variante="apaisada"
        impulsos
        className="fixed inset-0 -z-10 size-full opacity-70 [mask-image:radial-gradient(ellipse_at_center,rgb(0_0_0/0.3),#000_75%)]"
      />

      <BarraSuperior alineacion="centro">
        <div className="flex items-center gap-3 px-2 py-2 sm:gap-10 sm:px-12">
          <span className="hidden items-center gap-2 text-[0.95rem] font-bold text-foreground/90 sm:flex">
            <CalendarDays aria-hidden size={18} className="text-(--cv2-oro-claro)" />
            {FECHA_CORTA}
          </span>
          <Wordmark className="text-[1.6rem] sm:text-[2.4rem]" />
          <span className="hidden items-center gap-2 text-[0.95rem] font-bold text-foreground/90 sm:flex">
            <Radio aria-hidden size={18} className="text-(--cv2-oro-claro)" />
            En directo
          </span>
        </div>
      </BarraSuperior>

      {/*
        Mobile, una columna en el orden del DOM: confirmación, separador,
        WhatsApp (la acción: no puede quedar al fondo) y recomendaciones.
        PC, una grilla: confirmación | división | recomendaciones arriba, y
        abajo, aparte y centrado, el bloque de WhatsApp con su separador.
      */}
      <Contenedor className="grid grid-cols-1 gap-12 pb-12 pt-10 text-center sm:pt-14 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:items-center lg:gap-x-16 lg:gap-y-14 lg:pt-20 lg:text-left">
        <Reveal className="lg:col-start-1 lg:row-start-1">
          <h1 className="cv2-titulo cv2-grad-texto text-[2.2rem] font-bold leading-tight sm:text-[3.25rem]">
            {GRACIAS.titulo}
          </h1>
          <p className="mt-4 text-base text-(--cv2-gris) sm:text-[1.0625rem]">{GRACIAS.intro}</p>
          <p className="mx-auto mt-3 max-w-[840px] text-xl font-bold leading-snug text-foreground sm:text-2xl lg:mx-0">
            <Destacado texto={GRACIAS.promesa} claseDestacado="cv2-grad-texto" />
          </p>
        </Reveal>

        {/* La división entre las dos columnas (sólo PC). */}
        <span
          aria-hidden
          className="hidden h-full min-h-[260px] w-px bg-linear-to-b from-transparent via-(--cv2-oro)/55 to-transparent lg:col-start-2 lg:row-start-1 lg:block"
        />

        <Separador id="cv2-separador-gracias" className="mx-auto max-w-[420px] lg:col-span-3 lg:row-start-2 lg:max-w-[560px]" />

        {/* Bloque de WhatsApp: el paso que confirma la plaza. */}
        <Reveal className="lg:col-span-3 lg:row-start-3">
          <div className="cv2-wa-panel mx-auto max-w-[680px] px-4 py-9 text-center sm:px-12">
            <h2 className="text-balance text-xl font-semibold text-foreground sm:text-[1.6rem]">{GRACIAS.whatsappTitulo}</h2>
            <p className="mx-auto mt-3 max-w-[540px] text-base text-(--cv2-gris) sm:text-lg">{GRACIAS.whatsappTexto}</p>
            <a href={MO_WHATSAPP_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="cv2-boton-wa mt-7 gap-3">
              <WhatsAppIcon className="size-6 shrink-0" />
              {GRACIAS.whatsappCta}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto w-full max-w-[742px] lg:col-start-3 lg:row-start-1 lg:mx-0">
          <h2 className="cv2-grad-texto text-xl font-bold sm:text-2xl">{GRACIAS.recomendacionesTitulo}</h2>
          <ul className="mt-7 grid gap-7 text-left sm:grid-cols-[1.3fr_1fr] sm:gap-6 lg:grid-cols-1">
            {GRACIAS.recomendaciones.map((texto, i) => (
              <li key={texto} className="cv2-card relative rounded-[8px] px-6 pb-6 pt-8 text-[1.0625rem] leading-[1.45] text-(--cv2-gris) sm:text-lg">
                <span aria-hidden className={i === 0 ? "cv2-barrita" : "cv2-barrita cv2-barrita--clara"} />
                <Destacado texto={texto} />
              </li>
            ))}
          </ul>
        </Reveal>
      </Contenedor>

      {/* La despedida va en el footer: columna derecha en PC, primera en
          mobile. La firma debajo, corrida a la derecha, sin pisar el texto. */}
      <Footer
        despedida={
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold text-foreground">{GRACIAS.despedida}</p>
            <Firma className="ml-24 mt-2 text-[2.4rem]" />
          </div>
        }
      />
    </main>
  );
}
