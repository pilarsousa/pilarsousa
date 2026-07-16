import Image from "next/image";
import { CalendarDays, Radio, Zap, Tag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FactBadge } from "@/components/ui/FactBadge";
import { NeonText } from "@/components/ui/NeonText";
import { ReservaForm } from "@/components/ui/ReservaForm";

const FACTS = [
  { label: "Fecha por confirmar", icon: <CalendarDays size={15} /> },
  { label: "Online en vivo", icon: <Radio size={15} /> },
  { label: "3 días intensivos", icon: <Zap size={15} /> },
  { label: "Inversión por revelar", icon: <Tag size={15} /> },
];

/*
  Foto del Hero. Cuando exista el archivo en /public con este nombre, se muestra
  sobre el fondo neon. Mientras no exista, el bloque queda con la atmósfera
  cyberpunk como fallback y no se renderiza un <Image> roto (evita el 404).
*/
const HERO_IMAGE_SRC = "";

/**
 * Section 1 — Hero / Offer.
 *
 * Layout (según wireframe):
 *  - Columna IZQUIERDA: eyebrow → logo "Misión Origen" → promesa → descripción →
 *    badges de detalles → formulario → CTA principal. Todo apilado en orden de lectura.
 *  - Columna DERECHA: bloque visual con la foto (next/image) sobre una atmósfera
 *    neon que sirve de fallback cuando aún no hay imagen.
 *
 * Responsive: una columna en mobile/tablet (copy → imagen → form → CTA), dos
 * columnas en desktop. La promesa y el CTA quedan above the fold.
 * DOM = orden de lectura; el acomodo visual se hace con CSS.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-background"
    >
      {/* ── Neon atmosphere (fondo global de la sección) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 10% 50%, rgba(135,36,120,0.32) 0%, transparent 60%),
            radial-gradient(ellipse 55% 70% at 88% 35%, rgba(73,92,196,0.28) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 50% 100%, rgba(40,191,241,0.12) 0%, transparent 50%),
            #000000
          `,
        }}
      />

      {/* Cyberpunk grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(174,240,254,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(174,240,254,1) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Bottom vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 -z-10 bg-gradient-to-t from-background to-transparent"
      />

      <Container className="py-12 lg:py-16">
        {/*
          Desktop: 2 columnas — contenido a la izquierda, imagen a la derecha.
          Mobile: una columna, orden DOM natural (copy → imagen → form → CTA).
        */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">

          {/* ══════════ Columna izquierda — todo el contenido ══════════ */}
          <div className="flex flex-col [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">

            {/* Eyebrow — presentación */}
            <Reveal>
              <span className="font-sans text-xs font-medium uppercase tracking-[0.35em] text-cyan/75">
                Pilar Sousa presenta
              </span>
            </Reveal>

            {/* Logo / nombre del programa — jerarquía máxima, aureola neon que recorre la frase */}
            <Reveal delay={0.05}>
              <p className="mt-2 whitespace-nowrap font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl filter-[drop-shadow(0_0_28px_rgba(249,2,129,0.35))]">
                <NeonText variant="multi">Misión Origen</NeonText>
              </p>
            </Reveal>

            {/* Promesa — headline (h1 para SEO/accesibilidad) */}
            <Reveal delay={0.15}>
              <h1
                id="hero-title"
                className="mt-4 font-display text-base leading-snug tracking-tight text-white/90 sm:text-lg lg:text-xl"
              >
                La versión que eres ahora{" "}
                <NeonText variant="cyan">no es la versión</NeonText>{" "}
                que fuiste enviada a ser.
              </h1>
            </Reveal>

            {/* Descripción */}
            <Reveal delay={0.25}>
              <p className="mt-4 max-w-xl font-sans text-xs font-light leading-relaxed text-white/65 sm:text-sm">
                Un programa de 3 días para reprogramar tu identidad, activar tu
                misión y alinearte con la versión de ti que ya existe — solo está
                esperando ser desbloqueada.
              </p>
            </Reveal>

            {/* Badges de detalles — ARRIBA del formulario */}
            <Reveal delay={0.35}>
              <ul
                className="mt-5 grid max-w-md grid-cols-2 gap-2.5"
                aria-label="Detalles del programa"
              >
                {FACTS.map((fact) => (
                  <li key={fact.label}>
                    <FactBadge icon={fact.icon}>{fact.label}</FactBadge>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Formulario de reserva — estilo HUD / videojuego */}
            <Reveal delay={0.45} className="mt-6 w-full max-w-md">
              <div
                id="inscripcion"
                className="group/form relative overflow-hidden rounded-md border border-cyan/30 bg-black/75 p-6 backdrop-blur-md shadow-[0_0_0_1px_rgba(40,191,241,0.08),0_0_40px_rgba(135,36,120,0.25),inset_0_1px_0_rgba(174,240,254,0.08)]"
              >
                {/* Glow ambiental interior — pulso suave tipo panel activo */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-px -z-0 animate-scan-pulse"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(40,191,241,0.14) 0%, transparent 70%)",
                  }}
                />

                {/* Scan-line horizontal que barre el panel (HUD) */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent animate-scan-pulse"
                />

                {/* Neon corner accents — más marcados */}
                <span aria-hidden className="absolute left-0 top-0 h-12 w-0.5 bg-gradient-to-b from-cyan to-transparent" />
                <span aria-hidden className="absolute left-0 top-0 h-0.5 w-12 bg-gradient-to-r from-cyan to-transparent" />
                <span aria-hidden className="absolute bottom-0 right-0 h-12 w-0.5 bg-gradient-to-t from-neon-pink to-transparent" />
                <span aria-hidden className="absolute bottom-0 right-0 h-0.5 w-12 bg-gradient-to-l from-neon-pink to-transparent" />

                <div className="relative z-10 flex flex-col gap-4">
                  {/* Cabecera del formulario */}
                  <div className="flex flex-col gap-2">
                    <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-cyan/80">
                      Reserva tu plaza
                    </p>
                    <h2 className="font-display leading-tight text-white">
                      <span className="block text-2xl sm:text-3xl">Plazas limitadas</span>
                      <NeonText
                        variant="violet"
                        className="mt-1 block text-lg font-light sm:text-xl"
                      >
                        asegura la tuya
                      </NeonText>
                    </h2>
                  </div>

                  {/* Formulario con validación real (client component) */}
                  <ReservaForm />
                </div>
              </div>
            </Reveal>

          </div>

          {/* ══════════ Columna derecha — bloque visual / imagen ══════════ */}
          <Reveal delay={0.2} className="w-full">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-violet/20 sm:aspect-[16/10] lg:aspect-auto lg:h-[28rem]">
              {/* Fallback neon — visible siempre; queda detrás de la imagen si existe */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(ellipse 70% 60% at 50% 30%, rgba(249,2,129,0.28) 0%, transparent 65%),
                    radial-gradient(ellipse 60% 70% at 40% 90%, rgba(40,191,241,0.22) 0%, transparent 60%),
                    linear-gradient(160deg, #212646 0%, #000000 100%)
                  `,
                }}
              />
              {/* Grid sutil sobre el fallback */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(174,240,254,1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(174,240,254,1) 1px, transparent 1px)
                  `,
                  backgroundSize: "48px 48px",
                }}
              />

              {/* Foto real — sólo cuando exista el archivo (evita 404) */}
              {HERO_IMAGE_SRC && (
                <Image
                  src={HERO_IMAGE_SRC}
                  alt="Pilar Sousa — Misión Origen"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              )}

              {/* Neon corner accents del bloque de imagen */}
              <span aria-hidden className="absolute left-0 top-0 h-14 w-px bg-gradient-to-b from-cyan/60 to-transparent" />
              <span aria-hidden className="absolute left-0 top-0 h-px w-14 bg-gradient-to-r from-cyan/60 to-transparent" />
              <span aria-hidden className="absolute bottom-0 right-0 h-14 w-px bg-gradient-to-t from-neon-pink/50 to-transparent" />
              <span aria-hidden className="absolute bottom-0 right-0 h-px w-14 bg-gradient-to-l from-neon-pink/50 to-transparent" />
            </div>
          </Reveal>

        </div>
      </Container>
    </section>
  );
}
