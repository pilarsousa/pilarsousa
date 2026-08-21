import type { Metadata } from "next";
import Image from "next/image";
import { VoContainer } from "@/components/lista-de-espera/ui/VoContainer";
import { LogoVao } from "@/components/lista-de-espera/ui/LogoVao";
import { VoCta } from "@/components/lista-de-espera/ui/VoCta";
import { WhatsAppIcon } from "@/components/lista-de-espera/ui/WhatsAppIcon";
import { Footer } from "@/components/lista-de-espera/sections/Footer";
import { GRACIAS } from "@/components/lista-de-espera/content";
import fondoMovil from "@/../public/volver-origen/public/img/landing/fondo-agradecimiento-mobile.jpg";
import fondoDesktop from "@/../public/volver-origen/public/img/landing/fondo-agradecimiento-pc.jpg";

/*
  Página de gracias — /lista-de-espera/gracias.

  El registro no termina en el formulario: el paso que de verdad importa es
  entrar al grupo de WhatsApp, así que la página tiene un solo objetivo y un
  solo botón, sin navegación que distraiga.

  El fondo lleva DOS capas de oscurecido, y no una viñeta a secas: la foto es un
  atardecer con el sol en el centro-izquierda, la zona más luminosa de toda la
  imagen y justo donde cae el texto. Una viñeta clásica sólo apaga los bordes y
  habría dejado el titular blanco sobre el sol. Por eso el degradado radial
  arranca ya en un 55% de opacidad en el centro y llega a opaco en los bordes:
  lo primero asegura el contraste del texto, lo segundo enmarca el contenido.

  Cada tamaño usa su propio encuadre y ninguno lleva `priority`, así que son
  lazy y el navegador no descarga el que está en display:none.

  noindex: es una página de post-conversión. Si Google la indexa, la gente puede
  llegar al grupo sin haberse registrado, y además compite en resultados con la
  landing real.
*/

export const metadata: Metadata = {
  title: "Registro completado | Volver al Origen 3.0",
  description:
    "Tu registro en la lista de espera está completado. Accede al grupo privado de WhatsApp para recibir todas las novedades.",
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  const hasUrl = GRACIAS.whatsappUrl.length > 0;

  return (
    <>
      <main className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden py-20">
        {/* Fondo — móvil */}
        <div aria-hidden className="absolute inset-0 -z-20 lg:hidden">
          <Image
            src={fondoMovil}
            alt=""
            fill
            quality={90}
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-center"
          />
        </div>

        {/* Fondo — escritorio */}
        <div aria-hidden className="absolute inset-0 -z-20 hidden lg:block">
          <Image
            src={fondoDesktop}
            alt=""
            fill
            quality={90}
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-center"
          />
        </div>

        {/* Oscurecido: sostenido en el centro para que el texto se lea, opaco en
            los bordes para enmarcar el contenido. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 78% 68% at 50% 50%, rgba(11,21,2,0.55) 0%, rgba(11,21,2,0.82) 52%, #0b1502 100%)",
          }}
        />

        <VoContainer className="max-w-3xl">
          <div className="flex flex-col items-center text-center">
            {/* El mismo logo que encabeza el hero: quien llega aquí viene de
                rellenar aquel formulario, y repetir la marca confirma que sigue
                en el sitio correcto. */}
            <LogoVao className="w-32 sm:w-36" />

            <h1 className="mt-6 font-display text-2xl uppercase leading-tight tracking-[0.06em] text-accent sm:text-3xl md:text-4xl">
              {GRACIAS.title}
            </h1>

            <p className="mt-6 font-sans text-base leading-relaxed text-foreground/85 sm:text-lg">
              <Rich parts={GRACIAS.intro} />
            </p>

            <p className="mt-4 font-sans text-base leading-relaxed text-foreground/85 sm:text-lg">
              <Rich parts={GRACIAS.detail} />
            </p>

            <p className="mt-7 font-sans text-base font-medium text-foreground sm:text-lg">
              <span aria-hidden>👇 </span>
              {GRACIAS.nudge}
            </p>

            <div className="mt-6 w-full max-w-md">
              {/* Sin enlace configurado el botón va deshabilitado: es preferible
                  a mandar al visitante a un enlace roto justo tras registrarse. */}
              {hasUrl ? (
                <VoCta href={GRACIAS.whatsappUrl}>
                  <span className="inline-flex items-center justify-center gap-3">
                    <WhatsAppIcon className="size-5 shrink-0" />
                    {GRACIAS.cta}
                  </span>
                </VoCta>
              ) : (
                <VoCta disabled>{GRACIAS.cta}</VoCta>
              )}
            </div>

            {/* La aclaración de para qué se usa el grupo. Va DESPUÉS del botón:
                antes, sembraría la duda sobre el spam justo cuando lo que hay
                que hacer es pulsar. */}
            <p className="mt-5 max-w-md font-sans text-xs leading-relaxed text-foreground/50">
              {GRACIAS.disclaimer}
            </p>

            {!hasUrl && (
              <p className="mt-3 font-sans text-xs font-light text-foreground/40">
                Enlace del grupo pendiente de configurar.
              </p>
            )}
          </div>
        </VoContainer>
      </main>
      <Footer />
    </>
  );
}

/** Párrafo con tramos en negrita, definidos como data en content.ts. */
function Rich({ parts }: { parts: { text: string; strong?: boolean }[] }) {
  return (
    <>
      {parts.map((part) =>
        part.strong ? (
          <strong key={part.text} className="font-semibold text-foreground">
            {part.text}
          </strong>
        ) : (
          <span key={part.text}>{part.text}</span>
        ),
      )}
    </>
  );
}
