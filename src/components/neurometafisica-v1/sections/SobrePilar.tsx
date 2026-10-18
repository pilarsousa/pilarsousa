import Image from "next/image";
import { Contenedor } from "@/components/neurometafisica-v1/ui/Contenedor";
import { Encabezado } from "@/components/neurometafisica-v1/ui/Encabezado";
import { Destacado } from "@/components/neurometafisica-v1/ui/Destacado";
import { Firma } from "@/components/neurometafisica-v1/ui/Firma";
import { Anotacion } from "@/components/neurometafisica-v1/ui/Anotacion";
import { Reveal } from "@/components/neurometafisica-v1/ui/Reveal";
import { Pliegue } from "@/components/neurometafisica-v1/ui/Pliegue";
import { PILAR } from "@/components/neurometafisica-v1/content";
import fotoPilar from "@/../public/neurometafisica-v1/pilarsousa.jpg";
import luzPilar from "@/../public/neurometafisica-v1/efecto-luz-pilarsousa.png";

/**
 * Bloque 8 · Quién es Pilar Sousa. Pilar leyendo en el aula, con su sistema
 * nervioso encendido, en un marco con esquinas de oro: encima va el mismo
 * impulso de luz del hero (ver "EFECTO LUZ" en el CSS). Al lado, su
 * historia contada por ella, para que se conecte con la persona y no con
 * un currículum, y al pie su firma, que se escribe sola.
 *
 * Detrás, la luz de la ventana del aula y la firma en grande, desenfocada.
 */
export function SobrePilar() {
  return (
    <section aria-labelledby="pilar-titulo" className="relative isolate py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[2%] left-[-15%] aspect-square w-[70%] rounded-full bg-[radial-gradient(circle,rgb(233_196_106/0.16),transparent_62%)]" />
        {/* bottom-0: el halo termina de fundirse dentro de la sección; más
            abajo, el overflow lo cortaba en seco contra la siguiente. */}
        <div className="absolute right-[-15%] bottom-0 aspect-square w-[60%] rounded-full bg-[radial-gradient(circle,rgb(76_150_115/0.22),transparent_62%)]" />
        <span className="cv2-firma absolute right-[-6%] bottom-[calc(6%-38px)] -rotate-12 text-[7rem] whitespace-nowrap opacity-[0.07] blur-[2px] sm:bottom-[6%] sm:text-[11rem] lg:right-[2%] lg:bottom-[3%] lg:text-[15rem]">
          Pilar Sousa
        </span>
      </div>

      {/* lg:items-start y la foto sticky: la historia es más alta que la
          foto, y así la acompaña mientras se lee en vez de quedar sola en
          el medio de la columna. */}
      <Contenedor className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <Reveal className="lg:sticky lg:top-24">
          {/* El marco dibuja sus esquinas por fuera: el recorte va adentro. */}
          <div className="cv2-marco">
            {/* La foto (1122 × 1402) ya es 4:5, como el marco: entra entera,
                y sizes es el ancho del marco (~460px en escritorio, el
                ancho de la pantalla en mobile). quality 90: es un retrato
                grande, la cara se nota. */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[12px]">
              <Image
                src={fotoPilar}
                alt={PILAR.foto}
                fill
                sizes="(min-width: 1024px) 460px, 100vw"
                quality={90}
                className="object-cover"
              />
              {/* El impulso nervioso: el cerebro y la columna recortados de
                  la misma foto (mismo tamaño, fondo transparente), en halo y
                  pulso como en el hero. El pulso tiene su propio recorrido
                  (.cv2-luz--pilar): la columna termina a media foto. */}
              <div aria-hidden className="absolute inset-0">
                {(["halo", "pulso"] as const).map((tipo) => (
                  <Image
                    key={tipo}
                    src={luzPilar}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 460px, 100vw"
                    quality={90}
                    className={`cv2-luz cv2-luz--${tipo} cv2-luz--pilar object-cover`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Encabezado id="pilar-titulo" antetitulo={PILAR.antetitulo} titulo={PILAR.titulo} />
          {/* Los dos primeros párrafos a la vista; el resto se abre con
              "Leer más", para que la landing no se haga larga. */}
          <Pliegue
            className="mt-6 text-lg leading-relaxed text-foreground/90"
            inicio={
              <div className="space-y-5">
                {PILAR.historia.slice(0, 2).map((parrafo, i) => (
                  <Reveal key={i} delay={0.05 * i}>
                    <p>
                      <Destacado texto={parrafo} />
                    </p>
                  </Reveal>
                ))}
              </div>
            }
            resto={
              <div className="space-y-5 pt-5">
                {PILAR.historia.slice(2).map((parrafo, i) => (
                  <p key={i}>
                    <Destacado texto={parrafo} />
                  </p>
                ))}
              </div>
            }
          />

          {/* La firma al pie, sobre su línea, como quien firma una carta. */}
          <Reveal delay={0.1} className="mt-10">
            <Anotacion umbral={0.6} className="flex w-fit flex-col items-start">
              <Firma className="cv2-firma-trazo text-[clamp(2.4rem,11vw,3rem)] sm:text-[3.4rem]" />
              <span aria-hidden className="mt-1 h-px w-full bg-linear-to-r from-(--cv2-oro)/70 to-transparent" />
              <span className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-foreground/60 sm:text-xs">
                {PILAR.firma}
              </span>
            </Anotacion>
          </Reveal>
        </div>
      </Contenedor>
    </section>
  );
}
