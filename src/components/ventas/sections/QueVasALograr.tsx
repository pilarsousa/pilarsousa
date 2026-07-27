import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";

/*
  Sección "¿Qué vas a lograr?".

  Los resultados/transformaciones concretas del entrenamiento. Copy
  PLACEHOLDER — editá cada logro con el mensaje real. Grid 2×2 con el estilo
  .fancy-card, igual que la sección "Recompensa" de la landing de registro.
*/

const LOGROS = [
  {
    title: "Reescribir tu identidad",
    body: "Aprenderás a reprogramar quién eres para que tus resultados dejen de repetir el mismo patrón.",
  },
  {
    title: "Manifestar con método",
    body: "Un sistema práctico paso a paso para manifestar y, sobre todo, sostener lo que quieres en el tiempo.",
  },
  {
    title: "Salir del estancamiento",
    body: "Desbloquear aquello que te mantiene en el mismo lugar aunque intentes avanzar.",
  },
  {
    title: "Vivir con coherencia",
    body: "Alinear tu día a día con la vida que deseas, con propósito y sin el miedo que te frena.",
  },
] as const;

export function QueVasALograr() {
  return (
    <section id="que-vas-a-lograr" className="relative bg-void py-section">
      <Container>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center text-center">
            <Reveal delay={0.1}>
              <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Esto es lo que vas a{" "}
                <NeonText variant="pink">conseguir</NeonText>
              </h2>
            </Reveal>
          </div>

          <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            {LOGROS.map((logro, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <div className="fancy-card shine-hover group flex h-full flex-col gap-3 p-7">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {logro.title}
                  </h3>
                  <p className="font-sans text-base font-light leading-relaxed text-zinc-300">
                    {logro.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
