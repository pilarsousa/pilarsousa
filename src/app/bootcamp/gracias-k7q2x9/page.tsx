import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/bootcamp-v2/ui/Reveal";
import { GridScanBackdrop } from "@/components/bootcamp-v2/ui/GridScanBackdrop";
import { TactileCtaButton } from "@/components/bootcamp-v2/ui/TactileCtaButton";
import { BOOTCAMP_WHATSAPP_GROUP_URL, WHATSAPP_SUPPORT_URL } from "@/lib/links";
import logotipo from "@/../public/diagnostico/contenido/logo/logo2.png";
import isotipo from "@/../public/diagnostico/contenido/logo/new-logo.png";

/*
  Página de gracias del Bootcamp Metafísica Práctica — /bootcamp/gracias-k7q2x9.

  ── POR QUÉ ESTA RUTA Y NO /bootcamp/gracias ──

  /bootcamp/gracias es lo primero que prueba cualquiera que quiera entrar al
  grupo sin pagar. El código del final no se deduce de nada: sólo lo conoce el
  checkout, que redirige aquí tras el pago. Sigue colgando de /bootcamp para
  heredar la paleta y el favicon del layout.

  ⚠️ Es ocultación, no seguridad: quien reciba el enlace puede compartirlo. Lo
  que protege el grupo de verdad es que el link de WhatsApp se pueda renovar.

  ⚠️ /gracias y /bootcamp/gracias REDIRIGEN AQUÍ TEMPORALMENTE (next.config.ts),
  hasta que la URL de éxito del checkout apunte a esta ruta. Mientras esa
  redirección exista, la ruta vieja sigue llevando a la página.

  ── LA MISMA VOZ VISUAL QUE EL HERO DE LA LANDING ──

  La sección lleva .bc2-hero, que pasa TODAS las familias a DM Sans —titular,
  cuerpo y la etiqueta del CTA—. La única excepción es el rótulo del sello, en
  Trajan, igual que en el hero. Los dos badges de arriba, el brillo del
  titular (.bc2-aura) y el realce del texto (.bc2-realce) son las mismas piezas
  que abren /bootcamp: quien acaba de pagar reconoce la página de la que viene.
*/

export const metadata: Metadata = {
  title: "¡Bienvenido! — Bootcamp Metafísica Práctica",
  description: "Tu lugar en el Bootcamp Metafísica Práctica está confirmado.",
  // Post-purchase page: never indexed, and links on it are not followed.
  robots: { index: false, follow: false },
};

// Official WhatsApp glyph (lucide ships no brand logos). Inherits currentColor.
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.748-.983v.376zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export default function GraciasPage() {
  return (
    <main>
      <section className="bc2-hero relative isolate flex min-h-svh items-center overflow-hidden bg-background">
        <GridScanBackdrop className="-z-10" />
        {/* Green veil between the grid and the copy: the tunnel is brightest
            right behind the heading and, without it, ate its contrast. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,var(--bc2-velo-medio),transparent_75%)]"
        />

        <Container className="py-16 text-center sm:py-20">
          <Reveal>
            {/* Sized by height: the logotype is ~3:1. */}
            <Image
              src={logotipo}
              alt="Volver al Origen — Pilar Sousa"
              priority
              sizes="(min-width: 1024px) 150px, 125px"
              className="mx-auto h-10 w-auto lg:h-12"
            />
          </Reveal>

          {/* The two badges that open the landing's hero: the programme seal
              and the confirmation, where the hero has "Evento en vivo". */}
          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              <span className="bc2-carta-clara inline-flex h-11 items-center gap-2.5 rounded-full pl-1 pr-4">
                <Image
                  src={isotipo}
                  alt=""
                  width={1254}
                  height={1254}
                  quality={90}
                  sizes="36px"
                  className="size-9 shrink-0 rounded-full"
                />
                <span className="bc2-sello text-[0.78rem] font-bold uppercase leading-none tracking-[0.1em] text-forest-900">
                  Metafísica Práctica
                </span>
              </span>

              <span className="inline-flex h-11 items-center gap-2 rounded-full border border-foreground/30 bg-foreground/10 px-4 backdrop-blur-md">
                <BadgeCheck size={16} strokeWidth={2.2} className="shrink-0 text-foreground" />
                <span className="text-[0.72rem] font-semibold uppercase leading-none tracking-[0.13em] text-foreground">
                  Tu lugar está confirmado
                </span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <h1 className="mx-auto mt-7 max-w-3xl text-balance text-[clamp(1.9rem,1.3rem+2.4vw,3.1rem)] font-medium leading-[1.12] tracking-[-0.02em] text-foreground">
              Bienvenido al{" "}
              <span className="bc2-aura font-bold">
                Bootcamp Metafísica Práctica
              </span>
            </h1>
          </Reveal>

          {/* The one step left, on a glass panel so it reads as the page's
              focus over the grid instead of floating text. */}
          <Reveal delay={0.26}>
            <div className="mx-auto mt-9 max-w-xl rounded-3xl border border-foreground/15 bg-ink/55 px-4 py-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,248,240,0.1)] backdrop-blur-md sm:p-8">
              <span className="bc2-carta-clara inline-flex items-center rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-forest-900">
                Último paso
              </span>

              <p className="mt-4 text-base leading-[1.8] text-foreground sm:text-lg">
                Diste el primer paso. Ahora únete al{" "}
                <span className="bc2-realce whitespace-nowrap">
                  grupo privado de WhatsApp
                </span>
                :
                ahí recibirás los accesos, las fechas y todo lo que necesitas
                para comenzar el proceso.
              </p>

              <div className="mt-7 flex justify-center">
                <TactileCtaButton
                  href={BOOTCAMP_WHATSAPP_GROUP_URL}
                  external
                  block
                  tone="whatsapp"
                >
                  <WhatsAppIcon />
                  Unirme al grupo privado
                </TactileCtaButton>
              </div>
            </div>
          </Reveal>

          {/* Support — clearly secondary: a divider with a label, then an
              outline button. */}
          <Reveal delay={0.36}>
            <div className="mx-auto mt-10 flex max-w-xs items-center gap-4">
              <span className="h-px flex-1 bg-foreground/25" />
              <span className="text-sm font-semibold text-foreground/85">
                ¿Necesitas ayuda?
              </span>
              <span className="h-px flex-1 bg-foreground/25" />
            </div>

            <a
              href={WHATSAPP_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center justify-center gap-2.5 rounded-full border border-[#25D366]/60 bg-[#25D366]/5 px-7 py-3 text-sm font-semibold text-[#3ee07f] transition-colors duration-300 hover:border-[#25D366] hover:bg-[#25D366]/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
            >
              <WhatsAppIcon className="size-4 transition-transform duration-300 group-hover:scale-110" />
              Hablar con soporte
            </a>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
