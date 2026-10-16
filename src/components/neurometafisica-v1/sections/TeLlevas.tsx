import { Contenedor } from "@/components/neurometafisica-v1/ui/Contenedor";
import { Encabezado } from "@/components/neurometafisica-v1/ui/Encabezado";
import { Destacado } from "@/components/neurometafisica-v1/ui/Destacado";
import { Anotacion } from "@/components/neurometafisica-v1/ui/Anotacion";
import { Llamado } from "@/components/neurometafisica-v1/ui/Llamado";
import { Reveal } from "@/components/neurometafisica-v1/ui/Reveal";
import { TE_LLEVAS } from "@/components/neurometafisica-v1/content";

/** Tilde de tiza, dibujada a mano: se traza cuando entra en pantalla. */
function TildeTiza({ retraso }: { retraso: number }) {
  return (
    <Anotacion className="size-12 shrink-0" umbral={0.9}>
      <svg viewBox="0 0 48 48" className="size-full overflow-visible" aria-hidden>
        <path
          pathLength={1}
          className="cv2-trazo cv2-trazo--brillo [--dur:0.6s]"
          style={{ "--retraso": `${retraso}s` } as React.CSSProperties}
          stroke="#e9c46a"
          strokeWidth={4}
          d="M7 26 C11 29 15 33 19 38 C25 26 33 15 43 8"
        />
      </svg>
    </Anotacion>
  );
}

/**
 * Bloque 6 · Lo que te llevas. Tres resultados concretos, cada uno con su
 * tilde de tiza, y después el botón (el brief lo repite tras este bloque).
 */
export function TeLlevas() {
  return (
    <section aria-labelledby="te-llevas-titulo" className="relative py-20 sm:py-28">
      <Contenedor>
        <Encabezado id="te-llevas-titulo" antetitulo={TE_LLEVAS.antetitulo} titulo={TE_LLEVAS.titulo} />

        <ul className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-10">
          {TE_LLEVAS.items.map((texto, i) => (
            <li key={texto}>
              {/* PC: también una línea abajo, como la de arriba. h-full: las
                  tres columnas miden lo mismo y las líneas quedan parejas. */}
              <Reveal
                delay={0.08 * i}
                className="flex gap-4 border-t border-(--cv2-oro)/25 pt-6 lg:h-full lg:border-b lg:pb-8"
              >
                <TildeTiza retraso={0.15 * i} />
                <p className="text-lg leading-relaxed text-foreground sm:text-xl">
                  <Destacado texto={texto} />
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <Llamado className="mt-14" />
        </Reveal>
      </Contenedor>
    </section>
  );
}
