import { CalendarDays, Radio, Zap, Tag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { FactBadge } from "@/components/ui/FactBadge";
import { NeonText } from "@/components/ui/NeonText";

const FACTS = [
  { label: "Fecha por confirmar", icon: <CalendarDays size={15} /> },
  { label: "Online en vivo", icon: <Radio size={15} /> },
  { label: "3 días intensivos", icon: <Zap size={15} /> },
  { label: "Inversión por revelar", icon: <Tag size={15} /> },
];

/**
 * Section 1 — Hero / Offer.
 *
 * Estructura igual al bootcamp: sección full-screen, contenido primero en DOM
 * (mobile: copy arriba → form abajo), desktop: form izquierda / copy derecha
 * usando CSS order para invertir sin romper el orden de lectura en móvil.
 * Fondo: atmósfera neon puro CSS, sin imágenes externas.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-background"
    >
      {/* ── Neon atmosphere ── */}
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

      {/* Horizontal scan line */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 h-px animate-scan-pulse bg-gradient-to-r from-transparent via-cyan/40 to-transparent -z-10"
        style={{ top: "28%" }}
      />

      {/* Bottom vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 -z-10 bg-gradient-to-t from-background to-transparent"
      />

      <Container className="py-20 lg:py-section">
        {/*
          Grid de 2 columnas en desktop.
          DOM: copy primero → form segundo  (mobile: copy arriba, form abajo)
          CSS: lg:order-last en copy / lg:order-first en form  (desktop: form izq, copy der)
        */}
        <div className="grid gap-12 lg:grid-cols-[400px_1fr] lg:items-center lg:gap-14">

          {/* ── Copy — DOM primero (mobile arriba), derecha en desktop ── */}
          <div className="[text-shadow:0_2px_20px_rgba(0,0,0,0.6)] lg:order-last">

            {/* Presentación */}
            <Reveal>
              <span className="font-sans text-xs font-medium uppercase tracking-[0.35em] text-cyan/75">
                Pilar Sousa presenta
              </span>
            </Reveal>

            {/* Nombre del programa — jerarquía máxima, tamaño logo */}
            <Reveal delay={0.05}>
              <p className="mt-2 font-display text-5xl tracking-tight text-white sm:text-6xl lg:text-7xl">
                Misión Origen
              </p>
            </Reveal>

            {/* Headline — claramente más pequeño que el nombre del programa */}
            <Reveal delay={0.15}>
              <h1
                id="hero-title"
                className="mt-5 font-display text-xl leading-snug tracking-tight text-white/90 sm:text-2xl lg:text-3xl"
              >
                La versión que eres ahora{" "}
                <NeonText variant="cyan">no es la versión</NeonText>{" "}
                que fuiste enviada a ser.
              </h1>
            </Reveal>

            {/* Descripción */}
            <Reveal delay={0.25}>
              <p className="mt-5 font-sans text-base font-light leading-relaxed text-white/65 sm:text-lg">
                Un programa de 3 días para reprogramar tu identidad, activar tu
                misión y alinearte con la versión de ti que ya existe — solo está
                esperando ser desbloqueada.
              </p>
            </Reveal>

            {/* Badges — 2 columnas × 2 filas */}
            <Reveal delay={0.35}>
              <ul
                className="mt-7 grid grid-cols-2 gap-3"
                aria-label="Detalles del programa"
              >
                {FACTS.map((fact) => (
                  <li key={fact.label}>
                    <FactBadge icon={fact.icon}>{fact.label}</FactBadge>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ── Formulario — DOM segundo (mobile abajo), izquierda en desktop ── */}
          <Reveal delay={0.1} className="w-full lg:order-first">
            <div
              id="inscripcion"
              className="relative rounded-sm border border-violet/25 bg-black/70 p-8 backdrop-blur-md shadow-[0_0_60px_rgba(135,36,120,0.12)]"
            >
              {/* Neon corner accents */}
              <span aria-hidden className="absolute left-0 top-0 h-10 w-px bg-gradient-to-b from-cyan/60 to-transparent" />
              <span aria-hidden className="absolute left-0 top-0 h-px w-10 bg-gradient-to-r from-cyan/60 to-transparent" />
              <span aria-hidden className="absolute bottom-0 right-0 h-10 w-px bg-gradient-to-t from-neon-pink/50 to-transparent" />
              <span aria-hidden className="absolute bottom-0 right-0 h-px w-10 bg-gradient-to-l from-neon-pink/50 to-transparent" />

              <div className="flex flex-col gap-6">
                {/* Cabecera del formulario */}
                <div className="flex flex-col gap-0.5">
                  <p className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-cyan">
                    Reserva tu plaza
                  </p>
                  <h2 className="font-display text-2xl text-white">
                    <span className="block">Plazas limitadas</span>
                    <NeonText variant="violet">asegura la tuya</NeonText>
                  </h2>
                </div>

                {/* Campos */}
                <form className="flex flex-col gap-4" aria-label="Formulario de inscripción">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="hero-nombre"
                      className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-foreground/45"
                    >
                      Nombre completo
                    </label>
                    <input
                      id="hero-nombre"
                      type="text"
                      name="nombre"
                      autoComplete="name"
                      required
                      placeholder="Tu nombre"
                      className="h-11 w-full rounded-sm border border-white/10 bg-white/[0.04] px-4 font-sans text-sm font-light text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-violet/55 focus:ring-1 focus:ring-violet/20"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="hero-email"
                      className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-foreground/45"
                    >
                      Correo electrónico
                    </label>
                    <input
                      id="hero-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder="tu@correo.com"
                      className="h-11 w-full rounded-sm border border-white/10 bg-white/[0.04] px-4 font-sans text-sm font-light text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-violet/55 focus:ring-1 focus:ring-violet/20"
                    />
                  </div>

                  <div className="pt-1">
                    <CtaButton href="#" variant="pill" block>
                      ✦ Reservar mi plaza ahora ✦
                    </CtaButton>
                  </div>

                  <p className="text-center font-sans text-xs font-light text-foreground/30">
                    [Nota de privacidad o garantía — texto provisional]
                  </p>
                </form>
              </div>
            </div>
          </Reveal>

        </div>
      </Container>
    </section>
  );
}
