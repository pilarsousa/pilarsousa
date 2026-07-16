import Image from "next/image";
import { CalendarDays, Radio, Footprints, Gift } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FactBadge } from "@/components/ui/FactBadge";
import { NeonText } from "@/components/ui/NeonText";
import { ReservaForm } from "@/components/ui/ReservaForm";
import heroDesktop from "@/../public/mision-origen/fondo-hero.jpg";
import heroMobile from "@/../public/mision-origen/fondo-hero-movil.jpg";

/* La fecha debe coincidir con el countdown de AnnouncementBar (TARGET) y el
   precio con la barra: si cambia uno, actualizar el otro. */
const FACTS = [
  { label: "23 de julio · 19:00", icon: <CalendarDays size={15} /> },
  { label: "Online en vivo", icon: <Radio size={15} /> },
  { label: "3 pasos aplicables", icon: <Footprints size={15} /> },
  { label: "Acceso gratuito", icon: <Gift size={15} /> },
];

/**
 * Section 1 — Hero / Offer.
 *
 * La foto de Pilar va a sangre como fondo de la sección: está compuesta con el
 * sujeto a la derecha y espacio negativo a la izquierda, así que el contenido
 * (eyebrow → wordmark → promesa → descripción → badges → formulario) se apila
 * sobre ese hueco y nadie tapa a nadie. En mobile el recorte deja de dar ancho
 * libre, así que el contenido pasa a ancho completo sobre la foto oscurecida.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-start overflow-hidden bg-background lg:items-center"
    >
      {/* ── Foto de fondo a sangre ──
          Dos encuadres distintos, no el mismo recortado: el panorámico deja a
          Pilar a la derecha con hueco a la izquierda para el contenido; el
          vertical la pone arriba y deja libre el tercio inferior. <picture>
          resuelve cuál baja el navegador, así que solo se descarga una.
          quality 90 (el default es 75) porque en desktop la foto se escala por
          encima de su tamaño real y no sobra margen para recomprimir. */}
      {/* Mobile: la foto ocupa el 72% superior y el contenido cae debajo, sobre
          negro — no compiten por el mismo espacio. Desktop: pasa a cubrir toda
          la sección, porque ahí el hueco para el texto es lateral. */}
      <picture aria-hidden className="absolute inset-x-0 top-0 -z-10 block h-[72svh] lg:h-full">
        <source
          media="(min-width: 1024px)"
          srcSet={heroDesktop.src}
          width={heroDesktop.width}
          height={heroDesktop.height}
        />
        <Image
          src={heroMobile}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-top lg:object-right"
        />
      </picture>

      {/* ── Capa de legibilidad ──
          Mobile: funde el pie de la foto con el negro de abajo, para que el
          corte no se vea como una línea. Ocupa sólo la franja de la foto.
          Desktop: cubre la sección entera, fuerte a la izquierda y desvaneciendo
          antes de Pilar. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[72svh] bg-[linear-gradient(to_top,#000000_0%,rgba(0,0,0,0.55)_12%,transparent_32%)] lg:inset-0 lg:h-full lg:bg-[linear-gradient(to_right,#000000_0%,rgba(0,0,0,0.85)_30%,rgba(0,0,0,0.45)_55%,transparent_80%)]"
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

      {/* pt-[68svh] arranca el contenido justo antes de que termine la foto
          (72svh), así el copy pisa sólo la franja ya fundida a negro. */}
      <Container className="pb-12 pt-[68svh] lg:py-16 lg:pt-16">
        {/* El contenido ocupa la mitad izquierda en desktop: es el hueco que la
            foto de fondo deja libre. En mobile pasa a ancho completo. */}
        <div className="lg:max-w-[52%]">

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
                Te revelo los 3 pasos de mi{" "}
                <NeonText variant="cyan">Sistema Práctico de Manifestación</NeonText>{" "}
                para dar un nuevo Salto Cuántico cada 90 días.
              </h1>
            </Reveal>

            {/* Descripción */}
            <Reveal delay={0.25}>
              <p className="mt-4 max-w-xl font-sans text-xs font-light leading-relaxed text-white/65 sm:text-sm">
                Ya no necesitas más información o teoría. Necesitas un sistema
                práctico que te permita sostener los resultados que quieres
                manifestar.
              </p>
            </Reveal>

            {/* Badges de detalles — ARRIBA del formulario */}
            <Reveal delay={0.35}>
              <ul
                className="mt-5 grid max-w-md grid-cols-2 gap-2.5 justify-items-center sm:justify-items-start"
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

        </div>
      </Container>
    </section>
  );
}
