import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";

/**
 * Sección 2 — Packaging del programa.
 *
 * Imagen grande con todo el paquete (libros, bonus, plataforma, sesiones) para
 * aumentar el valor percibido tras el CTA del Hero. Sobre fondo negro, para que
 * el contenido del paquete resalte.
 *
 * PLACEHOLDER: el arte del packaging todavía no existe. Cuando lo tengas,
 * colocalo en public/ventas/packaging.png (o .jpg), importalo con next/image y
 * reemplazá el recuadro punteado por el <Image />. Se deja marcado a propósito
 * en vez de usar una imagen falsa.
 */
export function Packaging() {
  return (
    <section id="packaging" className="relative bg-background py-16 sm:py-24">
      <Container className="flex flex-col items-center gap-8 text-center">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
            Todo lo que{" "}
            <NeonText variant="cyan">recibes</NeonText> al acceder
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="w-full max-w-4xl">
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
