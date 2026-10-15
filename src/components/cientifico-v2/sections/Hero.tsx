import { getImageProps } from "next/image";
import { Contenedor } from "@/components/cientifico-v2/ui/Contenedor";
import { BarraSuperior } from "@/components/cientifico-v2/ui/BarraSuperior";
import { Contador } from "@/components/cientifico-v2/ui/Contador";
import { Wordmark } from "@/components/cientifico-v2/ui/Wordmark";
import { Llamado } from "@/components/cientifico-v2/ui/Llamado";
import { Sello } from "@/components/cientifico-v2/ui/Sello";
import { Reveal } from "@/components/cientifico-v2/ui/Reveal";
import { HERO } from "@/components/cientifico-v2/content";
import { horarios } from "@/components/cientifico-v2/horario";
import heroEscritorio from "@/../public/cientifico-v2/hero/hero-section-2.jpg";
import heroMovil from "@/../public/cientifico-v2/hero/herosection2-mobile.jpg";

/*
  Foto del hero con dos encuadres: la panorámica (Pilar a la derecha, aire a
  la izquierda para el texto) y la vertical (Pilar arriba y, debajo de su
  cintura, un fundido verde ya horneado en la foto, donde cae el texto).
  <picture> decide cuál baja el navegador, así que se descarga una sola.
  quality 90: en desktop la panorámica se escala por encima de su tamaño.

  La panorámica mide 1920 × 750 y la caja 860 de alto: hasta los ~2200px de
  ancho la foto sobra a los lados y `object-position` decide qué se recorta.
  50% deja a Pilar en la mitad derecha en todos los anchos.

  Sin filtros de brillo: Pilar va sin sombra. Lo que oscurece el lado del
  texto es la máscara de .cv2-hero-foto sobre el verde de .cv2-hero-fondo.

  ⚠️ FOTO PROVISIONAL. El brief pide un aula con luz dorada y una pizarra
  verde con el título escrito; esta es la del aula que había.
*/
function FotoHero() {
  const comun = {
    alt: "Pilar Sousa en un aula con luz de tarde, delante de una pizarra verde",
    fill: true,
    sizes: "100vw",
    quality: 90,
    loading: "eager",
    fetchPriority: "high",
  } as const;
  const {
    props: { srcSet: escritorio },
  } = getImageProps({ ...comun, src: heroEscritorio });
  const {
    props: { srcSet: movil, ...resto },
  } = getImageProps({ ...comun, src: heroMovil });

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={escritorio} />
      <img {...resto} alt={resto.alt} srcSet={movil} className="object-cover object-top lg:object-[50%_40%]" />
    </picture>
  );
}

/**
 * Bloque 1 · Hero. Objetivo del brief: que en 5 segundos se entienda qué es,
 * para quién y cuándo. Antetítulo con la fecha, "NEUROMETAFÍSICA" como
 * inscripción en oro, subtítulo, apoyo, el botón y, debajo, el directo con
 * la hora en España, México y Argentina (los tres países con más público).
 *
 * El sello "Seminario oficial" va al lado del antetítulo, como el lacre de
 * un programa académico.
 */
export function Hero() {
  const [espana, mexico, argentina] = horarios();
  const bajoBoton = [
    HERO.bajoBotonInicio,
    `${espana.hora} ${espana.pais}`,
    `${mexico.hora} ${mexico.pais}`,
    `${argentina.hora} ${argentina.pais}`,
    HERO.bajoBotonFin,
  ].join(" · ");

  return (
    /* lg:min-h: la foto mide 860 y el fondo recorta a la sección; más baja,
       la foto se cortaba en seco antes de terminar su fundido. */
    <section aria-labelledby="hero-titulo" className="relative isolate overflow-x-clip lg:min-h-[900px]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* La sombra verde detrás de la foto: es lo que se ve donde la máscara
            la funde. Más alta que la foto porque el texto sigue debajo (en
            mobile, unos 600px pasada la foto); se funde al fondo de la página
            recién después del botón. */}
        <div className="cv2-hero-fondo absolute inset-x-0 top-0 h-[calc(74vw+1060px)] lg:h-[1000px]" />
        {/* h mobile: 1500 / 960 = 156.25vw, la foto entera a lo ancho.
            top-[60px] sólo en mobile: en esta foto la cabeza de Pilar está
            pegada al borde de arriba y la barra del contador (68px) la tapaba. */}
        <div className="absolute inset-x-0 top-[60px] h-[156.25vw] lg:top-0 lg:h-[860px]">
          <div className="cv2-hero-foto absolute inset-0">
            <FotoHero />
            {/* Velo de legibilidad, sólo mobile: nada sobre Pilar; arranca en
                su cintura, donde empieza el fundido de la foto, y lo lleva al
                verde pizarra para que el texto caiga sobre oscuro. En desktop
                lo hace la máscara (.cv2-hero-foto), sólo a la izquierda. */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_40%,rgb(18_41_31/0.6)_47%,rgb(18_41_31/0.9)_55%,rgb(18_41_31/0.96)_100%)] lg:bg-none" />
          </div>
        </div>
      </div>

      {/* Una fila: marca a la izquierda y contador a la derecha. En mobile los
          tamaños van en vw para que entre entero desde 320px. */}
      <BarraSuperior className="absolute inset-x-0 top-0 z-20">
        <div className="flex w-full items-center justify-between gap-[2vw] sm:justify-start sm:gap-8 sm:px-[30px] sm:py-2">
          <Wordmark className="text-[clamp(1.05rem,5.4vw,1.35rem)] sm:text-[2.4rem]" />
          <Contador />
        </div>
      </BarraSuperior>

      {/* pt mobile: arranca justo debajo del cinturón de Pilar (~71vw de la
          foto, más los 60px que baja), donde la foto ya se funde al verde. */}
      <Contenedor className="pt-[calc(74vw+60px)] pb-16 lg:pt-[150px] lg:pb-16">
        <div className="relative lg:max-w-[600px]">
          {/* El sello, como lacre, al lado del antetítulo con el punto de directo. */}
          <Reveal className="flex items-center gap-4">
            <Sello className="w-[68px] shrink-0 sm:w-[84px] lg:w-[96px]" />
            <p className="cv2-antetitulo text-[0.8rem] leading-relaxed before:hidden sm:text-[0.95rem]">
              <span className="relative flex size-2.5 shrink-0">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#e5484d] opacity-60 motion-reduce:hidden" />
                <span className="relative size-2.5 rounded-full bg-[#e5484d]" />
              </span>
              {HERO.antetitulo}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              id="hero-titulo"
              className="cv2-titulo mt-5 text-[clamp(1.9rem,8.4vw,2.6rem)] font-bold leading-none tracking-[0.03em] drop-shadow-[0_0_24px_rgba(233,196,106,0.22)] sm:text-[3.4rem] lg:text-[3.55rem]"
            >
              <span className="cv2-grad-texto">{HERO.titulo}</span>
            </h1>
            <p className="mt-5 text-balance text-[1.375rem] font-semibold leading-snug text-foreground sm:text-[1.625rem]">
              {HERO.subtitulo}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 border-l-2 border-(--cv2-oro) pl-4 text-lg font-bold leading-relaxed text-foreground/95 sm:text-xl">
              {HERO.apoyo}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <Llamado alineado="izquierda" className="mt-8" nota={bajoBoton} />
          </Reveal>
        </div>
      </Contenedor>
    </section>
  );
}
