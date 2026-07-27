import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import { VENTAS_CHECKOUT_URL } from "@/lib/links";
import heroDesktop from "@/../public/mision-origen-venta/herosection.jpg";
import heroMobile from "@/../public/mision-origen-venta/herosection-mobile.jpg";

/**
 * Sección 1 — Hero de la landing de ventas.
 *
 * Estructura del Bootcamp (foto a sangre de fondo, contenido en columna a la
 * izquierda sobre el hueco que deja la imagen, degradado de legibilidad sólo
 * tras el texto) con la identidad neón de Misión Origen y su foto de Pilar.
 * Alto impacto: la imagen manda a pantalla completa y el copy se apoya sobre
 * ella, no en un bloque centrado sobre negro plano.
 *
 * <picture> sirve dos encuadres: panorámico (Pilar a la derecha, hueco a la
 * izquierda) en desktop, vertical en mobile — sólo se descarga uno.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="ventas-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-background lg:max-h-[900px] lg:min-h-[820px] lg:items-center"
    >
      {/* ── Foto de fondo a sangre — capa propia, Pilar queda descubierta ── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <picture>
          <source media="(min-width: 1024px)" srcSet={heroDesktop.src} />
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

        {/* Degradado de legibilidad — sólo detrás del texto, se desvanece antes
            de llegar a Pilar. Desde abajo en mobile, desde la izquierda en
            desktop. En desktop llega algo más oscuro y más lejos (hasta ~62%)
            para que el título no compita con la cara de Pilar. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#000000_0%,#000000_26%,rgba(0,0,0,0.55)_42%,transparent_65%)] lg:bg-[linear-gradient(to_right,#000000_0%,rgba(0,0,0,0.9)_38%,rgba(0,0,0,0.5)_62%,transparent_85%)]" />

        {/* Grilla cyberpunk sobre la foto */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(174,240,254,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(174,240,254,1) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Fundido inferior hacia la siguiente sección */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_bottom,transparent,#000000)]" />
      </div>

      {/* Mobile: el contenido cae sobre la franja inferior donde la foto se
          funde a negro, pero sin empujar tanto que el CTA quede fuera de vista
          (44svh deja la foto arriba y el bloque completo entra en pantalla).
          Desktop: columna izquierda, alineado a la izquierda como el Bootcamp. */}
      <Container className="pb-16 pt-[44svh] sm:pt-[48svh] lg:py-[clamp(2.5rem,1rem+5vh,7rem)]">
        <div className="max-w-2xl [text-shadow:0_2px_20px_rgba(0,0,0,0.7)]">
          {/* ── Badge de urgencia ── */}
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-hot-pink/50 bg-hot-pink/15 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm sm:text-sm">
              <span aria-hidden>⚠️</span>
              Oferta disponible solo hasta agotarse las plazas
            </p>
          </Reveal>

          {/* ── Título principal ── */}
          <Reveal delay={0.1}>
            <h1
              id="ventas-title"
              className="mt-5 font-display font-semibold leading-[1.15] tracking-tight text-white text-[clamp(1.7rem,1rem+2.4vw,3rem)]"
            >
              Accede ahora al entrenamiento{" "}
              <NeonText variant="cyan">nº1 de Metafísica Práctica</NeonText> para
              manifestar una vida extraordinaria en tan solo 40 días.
            </h1>
          </Reveal>

          {/* ── Subtítulo ── */}
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-xl font-sans font-light leading-relaxed text-white/80 text-[clamp(1rem,0.95rem+0.3vw,1.125rem)]">
              Un entrenamiento práctico donde aprenderás a transformar tu
              identidad para manifestar y sostener una nueva realidad en todas
              las áreas de tu vida.
            </p>
          </Reveal>

          {/* ── CTA principal ── */}
          <Reveal delay={0.28}>
            <div className="mt-8 w-full sm:w-fit">
              <a
                href={VENTAS_CHECKOUT_URL}
                className="neon-btn flex h-14 w-full items-center justify-center whitespace-nowrap rounded-full px-10 font-sans text-base font-bold uppercase tracking-[0.08em] text-white transition-all duration-500 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-fit sm:px-14 sm:text-lg"
              >
                Acceder ahora
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
