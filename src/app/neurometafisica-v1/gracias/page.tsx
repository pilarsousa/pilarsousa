import type { Metadata } from "next";
import { CalendarDays, Radio } from "lucide-react";
import { Contenedor } from "@/components/neurometafisica-v1/ui/Contenedor";
import { BarraSuperior } from "@/components/neurometafisica-v1/ui/BarraSuperior";
import { Wordmark } from "@/components/neurometafisica-v1/ui/Wordmark";
import { Destacado } from "@/components/neurometafisica-v1/ui/Destacado";
import { Anotacion } from "@/components/neurometafisica-v1/ui/Anotacion";
import { Firma } from "@/components/neurometafisica-v1/ui/Firma";
import { Reveal } from "@/components/neurometafisica-v1/ui/Reveal";
import { Footer } from "@/components/neurometafisica-v1/sections/Footer";
import { FECHA_CORTA, GRACIAS } from "@/components/neurometafisica-v1/content";
import { NEUROMETAFISICA_WHATSAPP_GROUP_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "[Neurometafísica v1] ¡Tu plaza está reservada! — Seminario de Neurometafísica",
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

/** Numeral de lección (01, 02, 03), el mismo de "La revelación" en la landing. */
function Numeral({ n }: { n: number }) {
  return (
    <span aria-hidden className="cv2-titulo text-[2.5rem] font-bold leading-none sm:text-[3.5rem]">
      {String(n).padStart(2, "0")}
    </span>
  );
}

/**
 * Gracias de /registro (neurometafisica-v1), en el aula, como la landing:
 *
 * 1. El titular escrito con tiza en la pizarra de marco de madera: se
 *    descubre como si se escribiera en el momento y una tiza amarilla lo
 *    subraya y vuelve a la repisa (la misma pieza que la frase de "La
 *    revelación").
 * 2. La promesa del seminario, debajo de la pizarra.
 * 3. "Tu tarea antes de la clase": tres pasos numerados como una lección. El
 *    01 es el grupo de WhatsApp —la acción que confirma la plaza, con su
 *    botón—; el 02 y el 03 son las recomendaciones.
 *
 * Fondo de cuadrícula de pizarra, como el temario. La pizarra repite los
 * márgenes de la de la landing (pb-12 / sm:pb-16): de eso depende que la
 * tiza caiga justo en la repisa (--caida de .cv2-tiza-barra).
 */
export default function GraciasNeurometafisica() {
  const pasos = [
    {
      titulo: GRACIAS.whatsappTitulo,
      texto: GRACIAS.whatsappTexto,
      boton: true,
    },
    ...GRACIAS.recomendaciones.map((texto) => ({ titulo: null, texto, boton: false })),
  ];

  return (
    <main className="cv2-cuadricula relative isolate overflow-hidden">
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

      <Contenedor className="pb-20 pt-10 sm:pt-14 lg:pt-16">
        {/* ── El titular, con tiza en la pizarra ── */}
        <Reveal className="flex flex-col items-center">
          <p className="cv2-antetitulo cv2-antetitulo--centro">{GRACIAS.antetitulo}</p>
        </Reveal>

        <Reveal className="mt-8">
          <div className="cv2-pizarra mx-auto max-w-[920px] px-6 pb-12 pt-10 sm:px-14 sm:pb-16 sm:pt-12">
            <Anotacion umbral={0.4}>
              <h1 className="cv2-tiza cv2-trazo-texto text-balance text-center text-[2.4rem] leading-[1.1] [--dur:1.8s] [--retraso:0.3s] sm:text-[3.6rem] lg:text-[4.2rem]">
                {GRACIAS.titulo}
              </h1>
              {/* El subrayado y la tiza que lo escribe: descansa en la repisa,
                  sube, subraya a la par del trazo y vuelve (.cv2-tiza-barra). */}
              <div className="relative mx-auto mt-4 h-4 w-[60%]">
                <svg viewBox="0 0 400 20" preserveAspectRatio="none" className="size-full overflow-visible" aria-hidden>
                  {/* Sin non-scaling-stroke: con él, Chrome deja el trazo a
                      medias cuando el SVG mide más que su viewBox. */}
                  <path
                    pathLength={1}
                    className="cv2-trazo cv2-trazo--brillo [--dur:0.8s] [--retraso:2.3s]"
                    stroke="#e9c46a"
                    strokeWidth={3}
                    d="M6 12 C110 5 230 15 394 8"
                  />
                </svg>
                <span aria-hidden className="cv2-tiza-barra" />
              </div>
            </Anotacion>
          </div>
        </Reveal>

        {/* ── La promesa ── */}
        <Reveal className="mx-auto mt-14 max-w-[760px] text-center sm:mt-16">
          <p className="text-lg text-(--cv2-gris) sm:text-xl">{GRACIAS.intro}</p>
          <p className="mt-3 text-balance text-xl font-bold leading-snug text-foreground sm:text-2xl">
            <Destacado texto={GRACIAS.promesa} claseDestacado="cv2-grad-texto" />
          </p>
        </Reveal>

        {/* ── Tu tarea antes de la clase ── */}
        <section aria-labelledby="tarea-titulo" className="mx-auto mt-16 max-w-[920px] sm:mt-20">
          <Reveal>
            <p className="cv2-antetitulo">{GRACIAS.tareaAntetitulo}</p>
            <h2 id="tarea-titulo" className="cv2-titulo mt-4 text-[1.85rem] sm:text-[2.5rem]">
              {GRACIAS.tareaTitulo}
            </h2>
          </Reveal>

          <ol className="mt-10 divide-y divide-(--cv2-oro)/25 border-y border-(--cv2-oro)/25">
            {pasos.map((paso, i) => (
              <li key={paso.texto}>
                <Reveal delay={0.06 * i} className="grid grid-cols-[3.25rem_1fr] gap-x-4 py-8 sm:grid-cols-[5rem_1fr] sm:gap-x-8">
                  <Numeral n={i + 1} />
                  <div>
                    {paso.titulo && (
                      <h3 className="text-xl font-bold leading-snug text-foreground sm:text-[1.5rem]">{paso.titulo}</h3>
                    )}
                    <p
                      className={
                        paso.titulo
                          ? "mt-3 text-lg leading-relaxed text-(--cv2-gris)"
                          : "text-lg leading-relaxed text-(--cv2-gris) sm:text-xl"
                      }
                    >
                      <Destacado texto={paso.texto} />
                    </p>
                    {paso.boton && (
                      <a
                        href={NEUROMETAFISICA_WHATSAPP_GROUP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cv2-boton-wa mt-6 gap-3"
                      >
                        <WhatsAppIcon className="size-6 shrink-0" />
                        {GRACIAS.whatsappCta}
                      </a>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>
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
