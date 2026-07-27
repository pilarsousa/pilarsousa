import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import { VENTAS_CHECKOUT_URL } from "@/lib/links";

/*
  Sección "Resumen y precio".

  Cierra la propuesta con el precio y el CTA al checkout. Precio PLACEHOLDER —
  reemplazá "XX €" y el precio tachado por los valores reales. El CTA es un
  enlace directo (VENTAS_CHECKOUT_URL), no abre modal.
*/
export function Precio() {
  return (
    <section id="precio" className="bg-surface py-section">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-2xl border border-cyan/25 bg-background/70 p-8 text-center shadow-[0_0_50px_rgba(40,191,241,0.12)] backdrop-blur-sm sm:p-12">
            <p className="font-sans section-eyebrow text-cyan">El acceso</p>

            <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
              Volver al Origen
            </h2>

            {/* Precio — PLACEHOLDER: cambiá los valores por los reales. */}
            <div className="mt-6 flex flex-col items-center gap-1">
              <span className="font-sans text-sm font-light text-foreground/50 line-through">
                Antes XXX €
              </span>
              <span className="font-display text-5xl font-bold sm:text-6xl">
                <NeonText variant="cyan">XX €</NeonText>
              </span>
              <span className="mt-1 font-sans text-xs uppercase tracking-[0.15em] text-foreground/50">
                Pago único · Acceso completo
              </span>
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href={VENTAS_CHECKOUT_URL}
                className="neon-btn flex h-14 w-full items-center justify-center whitespace-nowrap rounded-full px-10 font-sans text-base font-bold uppercase tracking-[0.08em] text-white transition-all duration-500 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-fit sm:px-14 sm:text-lg"
              >
                Acceder ahora
              </a>
            </div>

            <p className="mt-4 font-sans text-xs font-light text-foreground/50">
              Oferta disponible solo hasta agotarse las plazas.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
