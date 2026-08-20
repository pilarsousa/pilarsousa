import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { SectionTitle } from "@/components/volver-al-origen/ui/SectionTitle";
import { SectionTexture } from "@/components/volver-al-origen/ui/SectionTexture";
import { BenefitCard } from "@/components/volver-al-origen/ui/BenefitCard";
import { WaitlistForm } from "@/components/volver-al-origen/ui/WaitlistForm";
import { LISTA, HERO } from "@/components/volver-al-origen/content";

/*
  Sección 8 — Entrá ahora a la lista de espera.

  Es el cierre de la página y la única que trae el FORMULARIO A LA VISTA, sin
  pasar por el modal. Los CTA de las secciones anteriores lo abren en una capa
  porque interrumpen una lectura en curso; aquí no hay lectura que interrumpir:
  el visitante ha llegado al final y lo que toca es el campo de nombre.

  Los tres bonos van ANTES del formulario, no después: son el motivo para
  rellenarlo, y leídos después ya no cambian ninguna decisión.

  Reutiliza BenefitCard, la misma caja de las ventajas, con sus tres iconos
  (clock, tag, gift). El componente del formulario es el mismo que monta el
  modal — sin onSuccess, porque aquí no hay capa que cerrar: navega a la página
  de gracias por sí solo.

  Fondo texturado claro: alterna con el oscuro de la sección de Pilar que tiene
  encima y con el de las preguntas frecuentes que viene debajo.
*/
export function ListaEspera() {
  return (
    <section
      id="lista-espera"
      aria-labelledby="lista-title"
      className="relative isolate py-[clamp(5rem,3rem+8vh,10rem)] text-foreground"
    >
      <SectionTexture variant="claro" />

      <VoContainer>
        <ScrollIn>
          <SectionTitle id="lista-title" accent={LISTA.titleAccent}>
            {LISTA.title}
          </SectionTitle>
        </ScrollIn>

        <ScrollIn delay={0.05}>
          <div className="mx-auto mt-4 max-w-2xl space-y-2 text-center font-sans text-base leading-relaxed text-foreground/80 sm:text-lg">
            {LISTA.intro.map((linea) => (
              <p key={linea}>{linea}</p>
            ))}
          </div>
        </ScrollIn>

        {/* ── Los tres bonos ── */}
        <ScrollIn delay={0.05}>
          <h3 className="mt-14 text-center font-display text-lg uppercase tracking-[0.08em] text-accent sm:text-xl">
            {LISTA.bonosTitle}
          </h3>
        </ScrollIn>

        {/* items-stretch por defecto, así que el h-full de BenefitCard iguala
            las tres alturas aunque sus textos no midan lo mismo. */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {LISTA.bonos.map((bono, i) => (
            <ScrollIn key={bono.icon} delay={i * 0.1} className="h-full">
              <BenefitCard
                icon={bono.icon}
                title={bono.title}
                text={bono.text}
              />
            </ScrollIn>
          ))}
        </div>

        {/* ── El cierre y el formulario ── */}
        <ScrollIn delay={0.05}>
          <p className="mx-auto mt-14 max-w-2xl text-center font-display text-lg uppercase leading-snug tracking-[0.03em] text-foreground sm:text-xl">
            {LISTA.cierre}
          </p>
        </ScrollIn>

        {/* El formulario en su propio panel de cristal, con halo.

            No es decoración: es lo único de la página donde hay que escribir, y
            necesita leerse como una pieza aparte del texto que lo rodea para
            que se entienda dónde empieza la acción.

            max-w-[34rem] — un formulario de tres campos a 1140 px de ancho
            resulta incómodo de rellenar y parece un pie de página. */}
        <ScrollIn delay={0.1}>
          <div className="relative mx-auto mt-10 max-w-[34rem]">
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(60%_60%_at_50%_50%,rgba(180,226,54,0.16),transparent_70%)] blur-xl"
            />
            <div className="rounded-2xl border border-accent/25 bg-vo-forest/45 p-6 backdrop-blur-sm sm:p-8">
              <WaitlistForm />

              {/* El aviso de privacidad se toma de HERO y no se duplica aquí:
                  es el mismo texto y dos copias acabarían desincronizadas. */}
              <p className="mt-4 text-center font-sans text-xs leading-relaxed text-foreground/55">
                {HERO.privacy}
              </p>
            </div>
          </div>
        </ScrollIn>
      </VoContainer>
    </section>
  );
}
