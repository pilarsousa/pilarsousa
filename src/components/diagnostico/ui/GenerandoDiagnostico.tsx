import type { CSSProperties } from "react";
import { Activity } from "lucide-react";

const PASOS = [
  "Leyendo tus 7 respuestas",
  "Detectando el patrón dominante",
  "Preparando tu diagnóstico",
];

export function GenerandoDiagnostico({ nombre }: { nombre: string }) {
  const nombreLimpio = nombre.trim();

  return (
    <section
      className="dg-onboarding-fondo dg-entra mx-auto max-w-xl"
      role="status"
      aria-live="polite"
      aria-label="Generando diagnóstico"
    >
      <div className="dg-borde-giro rounded-[calc(1.5rem+1px)] p-px">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--dg-fondo-alto)] px-6 py-8 text-center shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9)] sm:px-8 sm:py-10">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,var(--dg-brillo-suave)_0%,transparent_32%,transparent_70%,var(--dg-brillo-suave)_100%)]"
          />

          <div className="relative">
            <div
              className="dg-diagnostico-medidor mx-auto flex size-24 items-center justify-center rounded-full border border-[var(--dg-borde-vivo)] bg-[var(--dg-superficie)] text-[var(--dg-acento-vivo)] shadow-[0_0_34px_-16px_var(--dg-brillo-fuerte)]"
              aria-hidden
            >
              <Activity
                className="dg-diagnostico-icono size-10"
                strokeWidth={1.8}
              />
            </div>

            <p className="mt-7 text-[0.72rem] font-semibold tracking-[0.16em] text-[var(--dg-acento)] uppercase">
              {nombreLimpio
                ? `Analizando tus respuestas, ${nombreLimpio}`
                : "Analizando tus respuestas"}
            </p>

            <h1 className="dg-titulo mt-3 text-[1.55rem] leading-tight text-[var(--dg-texto)] sm:text-[1.9rem]">
              Generando diagnóstico
            </h1>

            <p className="mx-auto mt-4 max-w-md text-[0.98rem] leading-relaxed text-[var(--dg-texto-suave)]">
              Estoy cruzando tus respuestas para encontrar la frecuencia que más
              se repite en tu patrón.
            </p>

            <div
              className="mt-6 h-2 overflow-hidden rounded-full border border-[var(--dg-borde)] bg-[var(--dg-superficie)]"
              aria-hidden
            >
              <span className="dg-diagnostico-progreso h-full rounded-full bg-[linear-gradient(90deg,var(--dg-acento),var(--dg-acento-vivo))]" />
            </div>

            <ul className="mt-5 grid gap-2 text-left">
              {PASOS.map((paso, indice) => (
                <li
                  key={paso}
                  style={
                    {
                      "--dg-delay": `${indice * 220}ms`,
                    } as CSSProperties & { "--dg-delay": string }
                  }
                  className="dg-diagnostico-item flex items-center gap-2 rounded-xl border border-[var(--dg-borde)] bg-[var(--dg-superficie)] px-3 py-2.5 text-sm text-[var(--dg-texto-suave)]"
                >
                  <span
                    aria-hidden
                    className="size-1.5 shrink-0 rounded-full bg-[var(--dg-acento)]"
                  />
                  <span>{paso}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
