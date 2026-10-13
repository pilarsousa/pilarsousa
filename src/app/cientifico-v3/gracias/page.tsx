import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, CircleAlert, Play, Radio } from "lucide-react";
import { Contenedor } from "@/components/cientifico-v3/ui/Contenedor";
import { BarraSuperior } from "@/components/cientifico-v3/ui/BarraSuperior";
import { Wordmark } from "@/components/cientifico-v3/ui/Wordmark";
import { Destacado } from "@/components/cientifico-v3/ui/Destacado";
import { Entrada } from "@/components/cientifico-v3/ui/Entrada";
import { Firma } from "@/components/cientifico-v3/ui/Firma";
import { Reveal } from "@/components/cientifico-v3/ui/Reveal";
import { FECHA_CORTA, GRACIAS, VIDEO_URL } from "@/components/cientifico-v3/content";
import { MO_WHATSAPP_COMMUNITY_URL } from "@/lib/links";
import poster from "@/../public/volver-origen/public/img/landing/pilarsousa-pc.jpg";

export const metadata: Metadata = {
  title: "[V3 Científico] ¡Gracias por registrarte! — Volver al Origen",
  description: "Tu entrada a la masterclass gratuita de Pilar Sousa está reservada.",
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
 * Marco del video con la pestaña arriba y la barra de progreso de la
 * referencia. Mientras VIDEO_URL esté vacío muestra un póster temporal.
 */
function Video() {
  return (
    <div className="cv3-pestana relative bg-[#1d1a26] p-2 pt-[26px] sm:p-3 sm:pt-[30px]">
      <div className="relative aspect-video overflow-hidden rounded-[10px] bg-black">
        {VIDEO_URL ? (
          <iframe
            src={VIDEO_URL}
            title="Últimas instrucciones antes del evento"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <>
            <Image src={poster} alt="" fill sizes="(min-width: 1024px) 945px, 100vw" className="object-cover object-[35%_30%] brightness-[0.6]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="flex size-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm sm:size-20">
                <Play aria-hidden className="ml-1 size-7 fill-foreground text-foreground sm:size-9" />
              </span>
              <span className="rounded-full bg-black/45 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-foreground/85">
                Video temporal
              </span>
            </div>
            {/* Barra de progreso de la referencia (decorativa). */}
            <div aria-hidden className="absolute inset-x-5 bottom-4 h-2 overflow-hidden rounded-full bg-white/25 sm:inset-x-7 sm:bottom-5">
              <div className="h-full w-[70%] rounded-full bg-[linear-gradient(90deg,#a391b8,#7da89a)]" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function GraciasV3() {
  return (
    <main className="relative isolate overflow-hidden">
      {/* Resplandor salvia a la derecha y Cosmos a la izquierda. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_35%_45%_at_100%_25%,rgba(46,74,67,0.55),transparent_70%),radial-gradient(ellipse_30%_40%_at_0%_70%,rgba(75,58,107,0.35),transparent_70%)]"
      />

      <BarraSuperior alineacion="centro">
        <div className="flex items-center gap-3 px-2 py-2 sm:gap-10 sm:px-12">
          <span className="hidden items-center gap-2 text-[0.95rem] font-bold text-foreground/90 sm:flex">
            <CalendarDays aria-hidden size={18} className="text-(--cv3-violeta)" />
            {FECHA_CORTA}
          </span>
          <Wordmark className="text-[1.6rem] sm:text-[2.4rem]" />
          <span className="hidden items-center gap-2 text-[0.95rem] font-bold text-foreground/90 sm:flex">
            <Radio aria-hidden size={18} className="text-(--cv3-violeta)" />
            En vivo online
          </span>
        </div>
      </BarraSuperior>

      <Contenedor className="flex flex-col items-center pb-24 pt-10 text-center sm:pt-14">
        <Reveal>
          <h1 className="cv3-grad-texto text-[2.4rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-[3.5rem]">
            {GRACIAS.titulo}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 text-base text-(--cv3-gris) sm:text-[1.0625rem]">{GRACIAS.intro}</p>
          <p className="mx-auto mt-3 max-w-[840px] text-xl font-bold leading-snug text-foreground sm:text-2xl">
            <Destacado texto={GRACIAS.promesa} claseDestacado="cv3-grad-texto" />
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="cv3-pastilla mt-7 flex items-center gap-3 px-5 py-3 text-left text-base text-foreground/85 sm:text-lg">
            <CircleAlert aria-hidden size={22} className="shrink-0 fill-foreground/75 text-[#0c0a12]" />
            {GRACIAS.aviso}
          </p>
        </Reveal>

        <div className="relative mt-8 w-full max-w-[945px]">
          <Entrada sizes="240px" className="absolute -left-[150px] -top-14 z-10 hidden w-[240px] -rotate-[16deg] lg:flex" />
          <Reveal>
            <Video />
          </Reveal>
          <Entrada sizes="330px" className="absolute -bottom-[170px] -right-[250px] z-10 hidden w-[330px] -rotate-[50deg] xl:flex" />
        </div>

        <Reveal className="mt-10">
          <h2 className="text-xl font-medium text-foreground sm:text-[1.6rem]">{GRACIAS.whatsappTitulo}</h2>
          <p className="mx-auto mt-3 max-w-[540px] text-base text-(--cv3-gris) sm:text-lg">{GRACIAS.whatsappTexto}</p>
          <div className="mt-6 flex flex-col items-center">
            <a href={MO_WHATSAPP_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="cv3-boton-wa">
              {GRACIAS.whatsappCta}
            </a>
            <WhatsAppIcon className="-mt-3 size-9 rounded-full bg-[#0c0a12] p-1 text-white" />
          </div>
        </Reveal>

        <Reveal className="mt-14 w-full max-w-[742px]">
          <h2 className="cv3-grad-texto text-xl font-bold sm:text-2xl">{GRACIAS.recomendacionesTitulo}</h2>
          <ul className="mt-7 grid gap-7 text-left sm:grid-cols-[1.3fr_1fr] sm:gap-6">
            {GRACIAS.recomendaciones.map((texto, i) => (
              <li key={texto} className="cv3-card relative rounded-[8px] px-6 pb-6 pt-8 text-[1.0625rem] leading-[1.45] text-(--cv3-gris) sm:text-lg">
                <span aria-hidden className={i === 0 ? "cv3-barrita" : "cv3-barrita cv3-barrita--violeta"} />
                <Destacado texto={texto} />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-8 flex flex-col items-center">
          <p className="text-2xl font-bold text-foreground">{GRACIAS.despedida}</p>
          <Firma className="-mt-1 ml-40 text-[2.2rem]" />
        </Reveal>

        <Wordmark className="mt-16 text-[2rem] sm:text-[2.25rem]" />
      </Contenedor>
    </main>
  );
}
