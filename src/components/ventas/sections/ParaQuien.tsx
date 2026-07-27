import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import { Badge } from "@/components/ventas/ui/Badge";
import { Users } from "lucide-react";

/*
  Sección "¿Para quién es este producto?".

  Titular + 4 perfiles a los que el entrenamiento les sirve, en cards.
  Copy PLACEHOLDER editable.
*/
const PERFILES = [
  "Sientes que llevas años estudiando espiritualidad y desarrollo personal, pero tu vida no termina de cambiar.",
  "Manifiestas resultados en algunas áreas, pero siempre terminas volviendo al mismo punto de partida.",
  "Sabes que hay una versión más grande de ti esperando, y estás lista para dejar de posponerla.",
  "Quieres herramientas prácticas y aplicables, no más teoría que se queda en la cabeza.",
] as const;

export function ParaQuien() {
  return (
    <section id="para-quien" className="bg-surface py-section">
      <Container>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-5 text-center">
            <Reveal>
              <Badge icon={Users}>Para quién es</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Esto es para ti{" "}
                <NeonText variant="multi">si te identificas</NeonText>
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {PERFILES.map((text, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <article className="shine-hover flex h-full items-start gap-4 rounded-sm border border-cyan/20 bg-background/40 p-6 transition-all duration-500 hover:border-cyan/55 hover:shadow-[0_0_32px_rgba(40,191,241,0.14)]">
                  <span className="mt-0.5 font-display text-2xl font-semibold tabular-nums text-cyan/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-sans text-base font-light leading-relaxed text-foreground/80 sm:text-lg">
                    {text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
