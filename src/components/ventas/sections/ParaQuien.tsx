import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/mision-origen/ui/Reveal";

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
    <section id="para-quien" className="relative bg-surface pb-section pt-12 sm:pt-16">
      <div
        aria-hidden
        className="absolute inset-x-0 -top-8 h-px bg-[linear-gradient(90deg,transparent,rgba(40,191,241,0.22),rgba(249,2,129,0.2),transparent)] sm:-top-10"
      />
      <Container>
        <div className="flex flex-col gap-8 sm:gap-9">
          <div className="flex flex-col items-center text-center">
            <Reveal delay={0.1}>
              <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Esto es para ti si...
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {PERFILES.map((text, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <article className="group relative h-full rounded-2xl bg-[conic-gradient(from_var(--border-angle),transparent_0%,transparent_10%,rgba(40,191,241,0.95)_18%,rgba(249,2,129,0.85)_28%,transparent_42%,transparent_100%)] p-px shadow-[0_22px_55px_-30px_rgba(40,191,241,0.85),0_18px_60px_-36px_rgba(249,2,129,0.75)] transition-transform duration-500 hover:-translate-y-1 animate-border-spin">
                  <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-[calc(1rem-1px)] border border-white/8 bg-[radial-gradient(80%_70%_at_15%_0%,rgba(40,191,241,0.14),transparent_62%),radial-gradient(80%_70%_at_100%_100%,rgba(249,2,129,0.12),transparent_58%),linear-gradient(180deg,rgba(12,12,16,0.98),rgba(0,0,0,0.94))] p-6 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.09),inset_0_-18px_42px_rgba(40,191,241,0.05)] transition-shadow duration-500 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-18px_46px_rgba(249,2,129,0.08)]">
                    <span className="font-display text-4xl font-semibold leading-none tabular-nums text-white [text-shadow:0_0_16px_rgba(40,191,241,0.75)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-sans text-base font-light leading-relaxed text-foreground/84 sm:text-lg">
                      {text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
