import Image from "next/image";
import { CalendarClock, Video } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/bootcamp-v2/ui/Reveal";
import { TactileCtaButton } from "@/components/bootcamp-v2/ui/TactileCtaButton";
import { ScheduleReferenceCard } from "@/components/bootcamp-v2/ui/ScheduleReferenceCard";
import { BOOTCAMP_START, CHECKOUT_URL } from "@/lib/links";
import { LocalStartTime } from "@/components/bootcamp-v2/ui/LocalStartTime";
import bgDesktop from "@/../public/bootcamp-v2/banner-pilar.png";
import bgMobile from "@/../public/bootcamp-v2/banner-pilarsousa-mobile.png";
import isotipo from "@/../public/diagnostico/contenido/logo/new-logo.png";

/**
 * Section 1 — Hero / Offer.
 *
 * ── LA FOTO NUEVA CAMBIÓ EL PROBLEMA DE LEGIBILIDAD ──
 *
 * La anterior era un bosque oscuro y el texto se leía casi sin ayuda. Ésta es
 * un interior claro, con Pilar a la derecha y pared blanca a la izquierda:
 * justo donde va la columna de texto. Sin velo, el crema sobre blanco
 * desaparece.
 *
 * Por eso el degradado de escritorio arranca en el verde OPACO —no en un
 * velo— y no se abre hasta pasada la mitad. No es un oscurecido decorativo:
 * es lo único que sostiene el contraste de todo el bloque.
 *
 * En móvil no hace falta tanto, porque la imagen YA VIENE con el degradado al
 * verde integrado en su mitad inferior. Lo de aquí sólo remata el encuentro
 * con la sección siguiente.
 *
 * ── UNA SOLA TIPOGRAFÍA ──
 *
 * Todo el hero va en DM Sans. No se pide en ningún className: lo hace
 * .bc2-hero redefiniendo los tokens de fuente, así que hasta el TactileCtaButton
 * —que más abajo en la página sale en Trajan— cae aquí en DM Sans.
 *
 * La única excepción es el rótulo del sello, en Trajan. Ver .bc2-sello.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="bc2-hero relative isolate flex min-h-[100svh] items-end overflow-hidden lg:max-h-200 lg:min-h-200 lg:items-center"
    >
      {/* Background photo as its own layer. Pilar stays uncovered. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <picture>
          <source media="(min-width: 1024px)" srcSet={bgDesktop.src} />
          <Image
            src={bgMobile}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top lg:object-center"
            placeholder="blur"
          />
        </picture>

        {/* Velo de legibilidad. Móvil: remate inferior sobre el degradado que
            la propia imagen ya trae. Escritorio: barrido desde la izquierda,
            opaco en el borde, que libera a Pilar a partir del 70%. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--bc2-fondo)_0%,var(--bc2-velo)_26%,transparent_64%)] lg:bg-[linear-gradient(to_right,var(--bc2-fondo)_0%,var(--bc2-velo)_32%,var(--bc2-velo-medio)_50%,transparent_72%)]" />

        {/* Bottom fade into the next section so the cut isn't abrupt. Both this
            and the Manifiesto behind it resolve to --color-ink, so the seam
            stays invisible without repeating the value. */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_bottom,transparent,var(--color-ink))]" />
      </div>

      <Container className="pb-16 pt-[200px] lg:py-[clamp(2.5rem,1rem+5vh,7rem)]">
        {/* 500px: el ancho que pidio el cliente para todo el bloque. La
            tarjeta de detalles y el CTA lo ocupan entero. */}
        <div className="max-w-[500px]">
          {/* 1 y 2 — el sello del programa y la modalidad. */}
          <Reveal>
            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              {/*
                El sello. Es la pieza de identidad del evento, así que lleva la
                cara clara de las tarjetas —no un contorno suelto— y el isotipo
                va a sangre por la izquierda, como el troquel de un sello real.

                El disco de marca es verde muy oscuro y aquí cae sobre crema,
                que es donde mejor se separa: en la landing del diagnóstico va
                sobre el fondo verde y se distingue sólo por el nombre blanco
                de dentro.
              */}
              <span className="bc2-carta-clara inline-flex h-11 items-center gap-2.5 rounded-full pl-1 pr-4">
                <Image
                  src={isotipo}
                  alt="Volver al Origen"
                  width={1254}
                  height={1254}
                  priority
                  quality={90}
                  sizes="36px"
                  className="size-9 shrink-0 rounded-full"
                />
                <span className="bc2-sello text-[0.78rem] font-bold uppercase leading-none tracking-[0.1em] text-forest-900">
                  Metafísica Práctica
                </span>
              </span>

              {/* En móvil va primero, delante del sello: lo que abre la
                  pantalla es que el evento es en directo. En escritorio vuelve
                  a su sitio detrás del sello.

                  ── EL "EN VIVO" TIENE QUE LLAMAR LA ATENCIÓN ──

                  A un día del evento es la pieza de urgencia del hero. Lleva
                  un haz rojo y crema que gira por el borde (el mismo anillo
                  cónico de las tarjetas, con --border-angle), un halo rojo
                  que respira y el punto "al aire" en rojo: el rojo es la
                  señal universal de directo y es lo único rojo de la página,
                  así que el ojo va ahí primero. */}
              <span className="order-first relative inline-flex animate-border-spin rounded-full bg-[conic-gradient(from_var(--border-angle),transparent_0%,#ff4d4d_14%,var(--bc2-crema)_24%,transparent_38%,transparent_100%)] p-[1.5px] shadow-[0_0_22px_-4px_rgba(255,77,77,0.65)] motion-reduce:animate-none lg:order-0">
                <span className="inline-flex h-10.5 items-center gap-2 rounded-full bg-ink/85 px-4 backdrop-blur-md">
                  <span aria-hidden className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#ff4d4d] opacity-80 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#ff4d4d]" />
                  </span>
                  <Video size={14} strokeWidth={2.2} className="shrink-0 text-foreground" />
                  <span className="text-[0.72rem] font-bold uppercase leading-none tracking-[0.13em] text-foreground">
                    Evento en vivo
                  </span>
                </span>
              </span>

              {/* La fecha y la hora, al lado del "en vivo". La hora es la de
                  España; si el visitante está en otra zona, se le añade la
                  suya (LocalStartTime, sólo en el cliente). */}
              <span className="inline-flex min-h-11 flex-wrap items-center gap-x-2 gap-y-0.5 rounded-full border border-foreground/30 bg-foreground/10 px-4 py-1.5 backdrop-blur-md">
                <CalendarClock size={14} strokeWidth={2.2} className="shrink-0 text-foreground" />
                <span className="text-[0.72rem] font-semibold uppercase leading-none tracking-[0.1em] text-foreground">
                  09 de octubre · 18:00 España
                </span>
                <LocalStartTime
                  target={BOOTCAMP_START}
                  prefix="("
                  suffix=")"
                  className="text-[0.72rem] font-medium leading-none text-foreground/75"
                />
              </span>
            </div>
          </Reveal>

          {/* 3 — la promesa. Una sola familia y un solo color: el contraste lo
              hace el peso, no un cambio de letra a mitad de frase.

              En escritorio "¿por qué" se fuerza a la línea siguiente: sin el
              corte, la última línea quedaba en "patrones?" sola. Con él las
              cuatro líneas quedan parejas. text-wrap: pretty cubre lo mismo
              en los anchos intermedios, donde el corte fijo no aplica. */}
          <Reveal delay={0.1}>
            <h1
              id="hero-title"
              className="text-[clamp(1.6rem,1.25rem+1.4vw,2rem)] font-medium leading-[1.18] tracking-[-0.02em] text-pretty text-foreground"
            >
              Llevas años consumiendo espiritualidad.{" "}
              <span className="bc2-aura font-bold">
                Entonces, <br className="hidden lg:inline" />
                ¿por qué sigues repitiendo los mismos patrones?
              </span>
            </h1>
          </Reveal>

          {/* 4 — la descripción, con lo que importa remarcado sobre crema para
              que se pueda escanear sin leerla entera. */}
          <Reveal delay={0.2}>
            <p className="mt-5 text-[clamp(1rem,0.95rem+0.3vw,1.05rem)] font-semibold leading-[1.8] text-foreground/90">
              <span className="bc2-realce">
                Un entrenamiento práctico de 3 días
              </span>{" "}
              para romper el viejo patrón que está creando tu realidad, salir
              del estancamiento y manifestar resultados tangibles.
            </p>
          </Reveal>

          {/* 5 y 6 — los detalles, a todo el ancho de la columna. Los 500px
              son lo que hace que las tres pastillas entren en una sola fila. */}
          <Reveal delay={0.3}>
            <ScheduleReferenceCard className="mt-7 w-full" />
          </Reveal>

          {/* 7 y 8 — el CTA, a todo el ancho de la columna (`block`), y la
              inversión centrada debajo. Como el botón ocupa los 500px enteros,
              centrar respecto a la columna y respecto al botón es lo mismo. */}
          <Reveal delay={0.4}>
            <div className="mt-7 flex w-full flex-col items-center">
              <TactileCtaButton href={CHECKOUT_URL} external block>
                Quiero ser parte
              </TactileCtaButton>
              <p className="mt-3.5 text-center text-[0.9rem] text-foreground/70">
                Inversión de la experiencia:{" "}
                <span className="font-semibold text-foreground underline decoration-foreground/35 decoration-1 underline-offset-[5px]">
                  44 €
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
