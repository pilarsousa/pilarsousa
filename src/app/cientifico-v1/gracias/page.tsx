import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/cientifico-v1/ui/Reveal";
import { NeonText } from "@/components/cientifico-v1/ui/NeonText";
import { Radar } from "@/components/cientifico-v1/ui/Radar";
import { Footer } from "@/components/cientifico-v1/sections/Footer";
import { MO_WHATSAPP_COMMUNITY_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "[V1 Científico] ¡Bienvenido a bordo! — Volver al Origen",
  description: "Tu lugar en Volver al Origen está confirmado.",
  robots: { index: false }, // post-purchase page shouldn't be indexed
};

// Official WhatsApp glyph (lucide ships no brand logos). Inherits currentColor.
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.748-.983v.376zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

/**
 * Gracias de Científico V1 (duplicada de /gracias-mision-origen). Pantalla
 * única de "misión activada": sello con check, confirmación y CTA a la
 * comunidad de WhatsApp. Vive bajo /cientifico-v1, así hereda su layout
 * (.cv1-scope: paleta Verde Origen + fuentes). El botón conserva el verde de
 * WhatsApp a propósito: es lo que la gente reconoce.
 */
export default function GraciasPage() {
  return (
    <main>
      {/* items-start en mobile: con items-center el bloque quedaba centrado en
          el alto de pantalla y el sello caía demasiado abajo. Desde sm vuelve a
          centrarse, que es donde hay aire de sobra. */}
      <section className="relative isolate flex min-h-[calc(100svh-var(--footer-h))] items-start justify-center overflow-hidden bg-background [--footer-h:16rem] sm:items-center cv1-fondo-bruma">
        {/* Radar de fondo — mismo efecto que el CTA de cierre de la landing.
            Va por debajo de la aurora y del velo de legibilidad. */}
        <Radar
          className="absolute inset-0 -z-20 h-full w-full"
          color="#7da89a"
          backgroundColor="#fbfaf7"
          scale={0.62}
          ringCount={9}
          spokeCount={12}
          ringThickness={0.035}
          spokeThickness={0.008}
          speed={0.5}
          sweepSpeed={0.7}
          sweepWidth={3.0}
          falloff={2.4}
          brightness={1.25}
          enableMouseInteraction={false}
        />

        {/* Velo radial: despeja el centro para que el copy se lea, dejando que
            el radar respire hacia los bordes. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_65%_60%_at_50%_50%,rgb(var(--cv1-velo)/0.92)_0%,rgb(var(--cv1-velo)/0.7)_45%,rgb(var(--cv1-velo)/0.25)_75%,transparent_100%)]"
        />

        {/* Aurora — three blurred blobs (Violeta Alma / Salvia / Arena Dorada)
            drifting slowly at different tempos. Gives the frame ambient life
            without pulling focus from the message. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2 h-144 w-144 -translate-x-1/2 -translate-y-1/2 animate-aurora-1 rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(163,145,184,0.26) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute left-[30%] top-[35%] h-120 w-120 -translate-x-1/2 -translate-y-1/2 animate-aurora-2 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(125,168,154,0.26) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute left-[68%] top-[62%] h-120 w-120 -translate-x-1/2 -translate-y-1/2 animate-aurora-3 rounded-full opacity-55 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(217,199,167,0.18) 0%, transparent 70%)",
            }}
          />
        </div>
        {/* Top/bottom vignette so the radar fades into the frame edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-linear-to-b from-background to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t from-background to-transparent"
        />

        {/* pt corto en mobile para que el sello arranque cerca del top; desde
            sm el centrado vertical se encarga y el padding se iguala. */}
        <Container className="pb-12 pt-10 text-center sm:py-12">
          {/* ── Sello de activación — anillo giratorio + check ── */}
          <Reveal>
            <div className="relative mx-auto grid size-28 place-items-center sm:size-32">
              {/* Anillo exterior con un haz que recorre el borde */}
              <span
                aria-hidden
                className="absolute inset-0 animate-border-spin rounded-full"
                style={{
                  background:
                    "conic-gradient(from var(--border-angle), transparent 0deg, #7da89a 90deg, #a391b8 180deg, transparent 300deg)",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
                  WebkitMask:
                    "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
                }}
              />
              {/* Halo pulsante */}
              <span
                aria-hidden
                className="absolute inset-2 animate-pulse-ring rounded-full"
              />
              {/* Disco interior */}
              <span
                aria-hidden
                className="cv1-vidrio absolute inset-2 rounded-full"
              />
              {/* Check */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="relative size-12 text-accent filter-[drop-shadow(0_2px_6px_rgba(78,122,108,0.35))] sm:size-14"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </Reveal>

          {/* Antetítulo en el color de acento y cuerpo contenido: acompaña al
              titular sin competir con él. */}
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-2xl font-display text-sm font-semibold uppercase leading-snug tracking-[0.14em] text-accent sm:text-base">
              Es hora de dar tu salto cuántico
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Tu lugar está{" "}
              <NeonText variant="multi">confirmado</NeonText>
            </h1>
          </Reveal>

          {/* ── Paso pendiente — card con el último paso ──
              El copy antes era un párrafo suelto y la gente no registraba que
              todavía tenía algo que hacer. Ahora va en una card con etiqueta de
              paso, borde en verde WhatsApp y el CTA dentro del mismo bloque,
              para que la acción se lea como parte del paso y no como un extra. */}
          <Reveal delay={0.26}>
            <div className="cv1-vidrio mx-auto mt-10 max-w-xl rounded-[24px] p-6 sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/45 bg-[#25D366]/12 px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#15803d]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#25D366] opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#25D366]" />
                </span>
                Paso 1 · Pendiente
              </span>

              <h2 className="mt-5 font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                Te falta el último paso: entrar al grupo de WhatsApp
              </h2>

              <p className="mx-auto mt-3 font-sans text-base leading-relaxed text-foreground/75">
                Todo se comunica ahí dentro: los accesos, las fechas y el enlace
                del evento en vivo. Si no entras al grupo,{" "}
                <span className="font-medium text-foreground">
                  no vas a recibir la información
                </span>
                .
              </p>

              <a
                href={MO_WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                /* Texto pequeño y tracking corto en mobile: es lo que permite
                   que "Unirme a la comunidad" entre en una línea sin recurrir a
                   whitespace-nowrap, que desbordaba el botón en pantallas
                   angostas en vez de resolver el ajuste. */
                className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(135deg,#25D366_0%,#128C7E_100%)] px-4 py-4 font-display text-xs font-semibold uppercase tracking-[0.04em] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_14px_40px_-8px_rgba(37,211,102,0.8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:gap-3 sm:px-10 sm:text-sm sm:tracking-[0.1em]"
              >
                <WhatsAppIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:scale-110 sm:size-5" />
                Unirme a la comunidad
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
