import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/bootcamp-v2/ui/Reveal";
import { GoldText } from "@/components/bootcamp-v2/ui/GoldText";
import { GridScanBackdrop } from "@/components/bootcamp-v2/ui/GridScanBackdrop";
import { TactileCtaButton } from "@/components/bootcamp-v2/ui/TactileCtaButton";
import { WHATSAPP_GROUP_URL, WHATSAPP_SUPPORT_URL } from "@/lib/links";
import logotipo from "@/../public/diagnostico/contenido/logo/logo2.png";

/*
  Página de gracias del Bootcamp — /bootcamp/acceso-k7q2x9.

  ── POR QUÉ ESTA RUTA Y NO /bootcamp/gracias ──

  /bootcamp/gracias es lo primero que prueba cualquiera que quiera entrar al
  grupo sin pagar. Esta ruta no se deduce de nada: sólo la conoce el checkout,
  que redirige aquí tras el pago. Sigue colgando de /bootcamp para heredar la
  paleta y el favicon del layout.

  ⚠️ Es ocultación, no seguridad: quien reciba el enlace puede compartirlo. Lo
  que protege el grupo de verdad es que el link de WhatsApp se pueda renovar.

  ⚠️ /gracias y /bootcamp/gracias REDIRIGEN AQUÍ TEMPORALMENTE (next.config.ts),
  hasta que la URL de éxito del checkout apunte a esta ruta. Mientras esa
  redirección exista, la ruta vieja sigue llevando a la página.
*/

export const metadata: Metadata = {
  title: "¡Bienvenida! — Bootcamp RESET IDENTIDAD",
  description: "Tu lugar en el bootcamp está confirmado.",
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

/**
 * Thank-you / confirmation page. Congratulates the buyer, invites them to the
 * private WhatsApp group, and offers support as a clearly secondary action.
 *
 * The background is the same animated grid as behind the pricing card: the
 * page the buyer just left ends on it, so the confirmation continues the same
 * scene instead of cutting to a new photo.
 */
export default function GraciasPage() {
  return (
    <main>
      <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-background">
        <GridScanBackdrop className="-z-10" />

        <Container className="py-20 text-center">
          <Reveal>
            {/* Same logotype as the footer: sized by height, it's ~3:1. */}
            <Image
              src={logotipo}
              alt="Volver al Origen — Pilar Sousa"
              priority
              sizes="(min-width: 1024px) 200px, 160px"
              className="mx-auto h-12 w-auto lg:h-16"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 font-display text-xs uppercase tracking-[0.35em] text-accent sm:text-sm">
              Tu lugar está confirmado
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <h1 className="mx-auto mt-5 max-w-3xl text-balance font-sans text-3xl font-normal leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Bienvenida al{" "}
              <GoldText className="font-display font-semibold">
                Bootcamp RESET IDENTIDAD
              </GoldText>
            </h1>
          </Reveal>

          <Reveal delay={0.26}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-foreground/85">
              Diste el primer paso. Ahora únete al grupo privado de WhatsApp: ahí
              recibirás los accesos, las fechas y todo lo que necesitas para
              comenzar el proceso.
            </p>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="mt-10 flex justify-center">
              <TactileCtaButton href={WHATSAPP_GROUP_URL} external tone="whatsapp">
                <WhatsAppIcon />
                Unirme al grupo privado
              </TactileCtaButton>
            </div>
          </Reveal>

          {/* Support — clearly secondary. A thin divider with a label sets it
              apart from the primary group CTA above; outline style, not filled. */}
          <Reveal delay={0.42}>
            <div className="mx-auto mt-12 flex max-w-xs items-center gap-4">
              <span className="h-px flex-1 bg-foreground/25" />
              <span className="font-display text-sm uppercase tracking-[0.3em] text-foreground">
                ¿Necesitas ayuda?
              </span>
              <span className="h-px flex-1 bg-foreground/25" />
            </div>

            <a
              href={WHATSAPP_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center justify-center gap-2.5 rounded-full border border-[#25D366]/60 px-8 py-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-[#25D366] transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
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
