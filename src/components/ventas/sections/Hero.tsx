import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import { VENTAS_CHECKOUT_URL } from "@/lib/links";
import pilarFoto from "@/../public/mision-origen/foto-pilar.jpg";

/**
 * Sección 1 — Hero de la landing de ventas.
 *
 * Orden vertical, centrado: badge de urgencia → título → subtítulo → foto de
 * Pilar → CTA → packaging. Misma identidad neón que Misión Origen (fondo negro,
 * grilla cyberpunk, fuentes Zen Dots / Jost, CTA neón), heredada vía .mo-scope
 * en el layout.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="ventas-title"
      className="relative isolate overflow-hidden bg-background"
    >
      {/* Grilla cyberpunk de fondo — misma textura que el Hero de registro */}
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

      {/* Resplandor ambiental superior, para que el badge no flote sobre negro
          plano */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(249,2,129,0.12)_0%,transparent_70%)]"
      />

      <Container className="flex flex-col items-center gap-8 pb-16 pt-24 text-center sm:pb-20 sm:pt-28">
        {/* ── Badge de urgencia ── */}
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-hot-pink/40 bg-hot-pink/10 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-white sm:text-sm">
            <span aria-hidden>⚠️</span>
            Oferta disponible solo hasta agotarse las plazas
          </p>
        </Reveal>

        {/* ── Título principal ── */}
        <Reveal delay={0.1}>
          <h1
            id="ventas-title"
            className="mx-auto max-w-4xl font-display text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.15]"
          >
            Accede ahora al entrenamiento{" "}
            <NeonText variant="cyan">nº1 de Metafísica Práctica</NeonText> para
            manifestar una vida extraordinaria en tan solo 40 días.
          </h1>
        </Reveal>

        {/* ── Subtítulo ── */}
        <Reveal delay={0.18}>
          <p className="mx-auto max-w-2xl font-sans text-base font-light leading-relaxed text-white/70 sm:text-lg">
            Un entrenamiento práctico donde aprenderás a transformar tu identidad
            para manifestar y sostener una nueva realidad en todas las áreas de tu
            vida.
          </p>
        </Reveal>

        {/* ── Imagen principal — Pilar ── */}
        <Reveal delay={0.26}>
          <div className="relative mt-2 w-full max-w-2xl">
            {/* Aro neón sutil alrededor de la foto */}
            <div className="overflow-hidden rounded-2xl border border-cyan/25 shadow-[0_0_40px_rgba(40,191,241,0.18)]">
              <Image
                src={pilarFoto}
                alt="Pilar Sousa"
                priority
                quality={85}
                sizes="(min-width: 768px) 42rem, 100vw"
                placeholder="blur"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        {/* ── CTA principal ── */}
        <Reveal delay={0.34}>
          <a
            href={VENTAS_CHECKOUT_URL}
            className="neon-btn inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full px-10 font-sans text-base font-bold uppercase tracking-[0.08em] text-white transition-all duration-500 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-14 sm:text-lg"
          >
            Acceder ahora
          </a>
        </Reveal>

        {/* ── Packaging ──
            Imagen grande con todo el paquete del programa (libros, bonus,
            plataforma, sesiones). Aumenta el valor percibido justo tras el CTA.

            PLACEHOLDER: todavía no existe el arte del packaging. Cuando lo
            tengas, colócalo en public/ventas/packaging.png (o .jpg), impórtalo
            arriba con next/image y reemplazá este bloque por el <Image />. Se
            deja marcado a propósito en vez de usar una imagen falsa. */}
        <Reveal delay={0.42}>
          <div className="mt-4 w-full max-w-4xl">
            <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/3 px-6 text-center">
              <p className="font-sans text-sm font-light text-white/40 sm:text-base">
                [ Packaging del programa — pendiente del arte.
                <br className="hidden sm:block" /> Reemplazar por la imagen en{" "}
                <span className="font-mono text-white/55">
                  public/ventas/packaging
                </span>{" "}
                ]
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
