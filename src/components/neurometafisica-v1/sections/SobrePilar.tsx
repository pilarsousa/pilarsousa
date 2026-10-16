import Image from "next/image";
import { GraduationCap, KeyRound, Users } from "lucide-react";
import { Contenedor } from "@/components/neurometafisica-v1/ui/Contenedor";
import { Encabezado } from "@/components/neurometafisica-v1/ui/Encabezado";
import { Destacado } from "@/components/neurometafisica-v1/ui/Destacado";
import { Firma } from "@/components/neurometafisica-v1/ui/Firma";
import { Cifra } from "@/components/neurometafisica-v1/ui/Cifra";
import { Anotacion } from "@/components/neurometafisica-v1/ui/Anotacion";
import { Reveal } from "@/components/neurometafisica-v1/ui/Reveal";
import { PILAR } from "@/components/neurometafisica-v1/content";
import fotoPizarron from "@/../public/neurometafisica-v1/carpetas/img-pizarron.jpeg";

/* Un ícono por dato, en el orden de PILAR.datos: años, suscriptores, códigos. */
const ICONOS = [GraduationCap, Users, KeyRound];

/**
 * Bloque 8 · Quién es Pilar Sousa. La foto que pide el brief (enseñando en
 * la pizarra, no posando), en un marco con esquinas de oro. Al lado, la
 * presentación y sus tres datos
 * como credenciales de vidrio (los números cuentan al aparecer) y, en la
 * cuarta, su firma, que se escribe sola.
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
        {/* Mobile, 38px más abajo: más arriba quedaba tapada por las
            credenciales. PC: corrida a la izquierda para que entre entera. */}
        <span className="cv2-firma absolute right-[-6%] bottom-[calc(6%-38px)] -rotate-12 text-[7rem] whitespace-nowrap opacity-[0.07] blur-[2px] sm:bottom-[6%] sm:text-[11rem] lg:right-[2%] lg:bottom-[3%] lg:text-[15rem]">
          Pilar Sousa
        </span>
      </div>

      <Contenedor className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          {/* La foto es apaisada (Pilar a la derecha, la pizarra a la
              izquierda): el recorte vertical se queda con ella y con la mano
              de la tiza. */}
          {/* El marco dibuja sus esquinas por fuera: el recorte va adentro. */}
          <div className="cv2-marco">
            {/* sizes es el ancho que la foto DIBUJA, no el del marco: al ser
                apaisada (16:9) en un marco 4:5, object-cover la escala por la
                altura y queda 2,2 veces más ancha que el marco (~1.050px en
                escritorio, ~200vw en mobile). Con el ancho del marco el
                navegador bajaba una versión chica y la estiraba: se veía
                pixelada. quality 90: es un retrato grande, la cara se nota. */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[12px]">
              <Image
                src={fotoPizarron}
                alt={PILAR.foto}
                fill
                sizes="(min-width: 1024px) 1050px, 200vw"
                quality={90}
                className="object-cover object-[72%_50%]"
              />
            </div>
          </div>
        </Reveal>

        <div>
          <Encabezado id="pilar-titulo" antetitulo={PILAR.antetitulo} titulo={PILAR.titulo} />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-foreground/90 sm:text-xl">
              <Destacado texto={PILAR.texto} />
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
            {PILAR.datos.map(({ valor, etiqueta, prefijo }, i) => {
              const Icono = ICONOS[i];
              return (
                <Reveal key={etiqueta} delay={0.15 + i * 0.08} className="h-full">
                  <dl className="cv2-credencial flex h-full flex-col p-4 sm:p-6">
                    {/* dt antes que dd (lo pide el HTML); el número va arriba
                        con order. */}
                    <dt className="order-2 mt-2 text-sm font-semibold leading-snug text-foreground/80 sm:text-base">
                      {etiqueta}
                    </dt>
                    <dd className="order-1">
                      <span
                        aria-hidden
                        className="mb-4 grid size-9 place-items-center rounded-full border border-[rgb(233_196_106/0.3)] bg-[rgb(233_196_106/0.08)] sm:size-10"
                      >
                        <Icono className="size-4 text-(--cv2-oro) sm:size-[1.1rem]" />
                      </span>
                      {prefijo && (
                        <span className="block text-xs font-bold uppercase tracking-[0.18em] text-(--cv2-oro)/80 sm:text-sm">
                          {prefijo}
                        </span>
                      )}
                      <Cifra
                        valor={valor}
                        className="cv2-titulo cv2-grad-texto block whitespace-nowrap text-[clamp(1.6rem,7.5vw,2rem)] font-bold leading-none sm:text-[2.4rem]"
                      />
                    </dd>
                  </dl>
                </Reveal>
              );
            })}

            {/* La cuarta credencial: su firma, sobre la línea. */}
            <Reveal delay={0.4} className="h-full">
              <Anotacion umbral={0.6} className="cv2-credencial flex h-full flex-col items-center justify-center p-4 sm:p-6">
                <Firma className="cv2-firma-trazo text-[clamp(2rem,9vw,2.6rem)] sm:text-[3rem]" />
                <span aria-hidden className="mt-1 h-px w-4/5 bg-linear-to-r from-transparent via-(--cv2-oro)/60 to-transparent" />
                <span className="mt-2 text-center text-[0.7rem] font-bold uppercase tracking-[0.16em] text-foreground/60 sm:text-xs">
                  {PILAR.firma}
                </span>
              </Anotacion>
            </Reveal>
          </div>
        </div>
      </Contenedor>
    </section>
  );
}
