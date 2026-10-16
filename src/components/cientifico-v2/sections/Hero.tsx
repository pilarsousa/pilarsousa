import Image, { getImageProps } from "next/image";
import { CalendarDays, Mic, Users } from "lucide-react";
import { Contenedor } from "@/components/cientifico-v2/ui/Contenedor";
import { BarraSuperior } from "@/components/cientifico-v2/ui/BarraSuperior";
import { Contador } from "@/components/cientifico-v2/ui/Contador";
import { Wordmark } from "@/components/cientifico-v2/ui/Wordmark";
import { Llamado } from "@/components/cientifico-v2/ui/Llamado";
import { CintaHorarios } from "@/components/cientifico-v2/ui/CintaHorarios";
import { Reveal } from "@/components/cientifico-v2/ui/Reveal";
import { HERO } from "@/components/cientifico-v2/content";
import heroEscritorio from "@/../public/cientifico-v2/hero/hero-section-2.jpg";
import heroMovil from "@/../public/cientifico-v2/hero/herosection2-mobile.jpg";
import efectoLuz from "@/../public/cientifico-v2/hero/efecto-luz.png";
import efectoLuzMovil from "@/../public/cientifico-v2/hero/efecto-luz-mobile.png";

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

/*
  El impulso nervioso sobre Pilar (ver "EFECTO LUZ" en cientifico-v2.css).
  Dos capas (halo y pulso) con el mismo encuadre que su foto, así el cerebro
  y la columna calzan justo encima de los de Pilar:
  - escritorio: efecto-luz.png (1920 × 750) sobre la panorámica, 50% 40%;
  - mobile: efecto-luz-mobile.png (960 × 1500) sobre la vertical, arriba.
  Cada juego se oculta en el otro ancho; las imágenes ocultas con
  loading="lazy" no se descargan. En mobile la columna ocupa sólo la mitad
  de arriba, así que el pulso tiene su propio recorrido (.cv2-luz--movil).
*/
function EfectoLuz() {
  const juegos = [
    { src: efectoLuzMovil, clase: "object-cover object-top cv2-luz--movil", caja: "lg:hidden" },
    { src: efectoLuz, clase: "object-cover object-[50%_40%]", caja: "hidden lg:block" },
  ];
  return (
    <>
      {juegos.map(({ src, clase, caja }) => (
        <div key={src.src} aria-hidden className={`absolute inset-0 ${caja}`}>
          {(["halo", "pulso"] as const).map((tipo) => (
            <Image
              key={tipo}
              src={src}
              alt=""
              fill
              sizes="100vw"
              quality={90}
              className={`cv2-luz cv2-luz--${tipo} ${clase}`}
            />
          ))}
        </div>
      ))}
    </>
  );
}

/* Ficha de arriba del título: una cajita como las del contador, con su ícono.
   Mobile en vw, como la barra: dos por fila desde 320px. */
function Ficha({ icono, children }: { icono: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-[clamp(5px,1.5vw,8px)] rounded-md border border-[rgb(233_196_106/0.3)] bg-[rgb(23_50_38/0.8)] px-[clamp(6px,2.2vw,10px)] py-1.5 text-[clamp(0.55rem,2.8vw,0.7rem)] font-bold uppercase leading-none tracking-[0.1em] text-foreground/90 backdrop-blur-sm sm:px-2.5 sm:text-xs sm:tracking-[0.12em]">
      {icono}
      {children}
    </li>
  );
}

/* El punto rojo de "en directo", con su latido. */
function PuntoDirecto() {
  return (
    <span aria-hidden className="relative flex size-[0.75em] shrink-0">
      <span className="absolute inset-0 animate-ping rounded-full bg-[#e5484d] opacity-60 motion-reduce:hidden" />
      <span className="relative size-full rounded-full bg-[#e5484d]" />
    </span>
  );
}

/* La ✦ de la casa (la del Separador y el marquee). */
function Estrella() {
  return (
    <svg viewBox="59 2 14 14" aria-hidden className="size-2.5 shrink-0">
      <path
        d="M66 2 C66.9 6.6 68.4 8.1 73 9 C68.4 9.9 66.9 11.4 66 16 C65.1 11.4 63.6 9.9 59 9 C63.6 8.1 65.1 6.6 66 2 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Bloque 1 · Hero. Objetivo del brief: que en 5 segundos se entienda qué es,
 * para quién y cuándo. Fichas con el directo, la fecha, Pilar y el cupo;
 * "NEUROMETAFÍSICA" como inscripción en oro con un brillo que la recorre;
 * subtítulo, apoyo, el botón y, debajo, la cinta con la hora en cada país.
 *
 * Bajo el título, "Seminario oficial · MMXXVI" entre dos filetes, como la
 * línea que acompaña el nombre en un diploma: lo que antes era el sello.
 */
export function Hero() {
  const { fichas } = HERO;
  const icono = "size-[1.25em] shrink-0 text-(--cv2-oro)";

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
            <EfectoLuz />
            {/* Velo de legibilidad, sólo mobile: nada sobre Pilar; arranca en
                su cintura, donde empieza el fundido de la foto, y lo lleva al
                verde pizarra para que el texto caiga sobre oscuro. En desktop
                lo hace la máscara (.cv2-hero-foto), sólo a la izquierda. */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_40%,rgb(18_41_31/0.6)_47%,rgb(18_41_31/0.9)_55%,rgb(18_41_31/0.96)_100%)] lg:bg-none" />
          </div>
        </div>
        {/* Mobile: los 60px que la foto baja quedaban verdes y se veían en las
            esquinas de la barra, por debajo de su línea. Los llena la misma
            foto reflejada desde su borde de arriba: sólo asoma ahí; arriba de
            la línea va la franja verde de la barra y el centro lo tapa ella. */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-[60px] overflow-hidden lg:hidden">
          <div className="absolute inset-x-0 top-[60px] h-[156.25vw] origin-top -scale-y-100">
            <FotoHero />
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
          <Reveal>
            {/* sm:max-w: en ancho también van dos por fila, como en mobile. */}
            <ul className="flex flex-wrap gap-[clamp(5px,1.8vw,8px)] sm:max-w-[420px] sm:gap-2">
              <Ficha icono={<PuntoDirecto />}>{fichas.directo}</Ficha>
              <Ficha icono={<CalendarDays aria-hidden className={icono} />}>{fichas.fecha}</Ficha>
              <Ficha icono={<Mic aria-hidden className={icono} />}>{fichas.con}</Ficha>
              <Ficha icono={<Users aria-hidden className={icono} />}>{fichas.plazas}</Ficha>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            {/* w-fit: los filetes de la credencial miden lo mismo que el título. */}
            <div className="mt-7 w-fit max-w-full">
              <h1
                id="hero-titulo"
                className="cv2-titulo text-[clamp(1.9rem,8.4vw,2.6rem)] font-bold leading-none tracking-[0.03em] drop-shadow-[0_0_18px_rgba(233,196,106,0.4)] sm:text-[3.4rem] lg:text-[3.55rem]"
              >
                <span className="cv2-grad-texto cv2-brillo">{HERO.titulo}</span>
              </h1>
              <p className="mt-3 flex items-center gap-2.5 font-display text-[clamp(0.55rem,2.6vw,0.62rem)] font-bold uppercase tracking-[0.2em] text-(--cv2-oro-claro) sm:text-[0.72rem] sm:tracking-[0.28em]">
                <span aria-hidden className="h-px flex-1 bg-linear-to-r from-transparent to-(--cv2-oro)" />
                <Estrella />
                <span className="shrink-0">{HERO.credencial}</span>
                <Estrella />
                <span aria-hidden className="h-px flex-1 bg-linear-to-l from-transparent to-(--cv2-oro)" />
              </p>
            </div>
            <p className="cv2-grad-texto mt-6 text-balance text-[1.375rem] font-semibold leading-snug sm:text-[1.625rem]">
              {HERO.subtitulo}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 border-l-2 border-(--cv2-oro) pl-4 text-lg font-bold leading-relaxed text-foreground/95 sm:text-xl">
              {HERO.apoyo}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <Llamado alineado="izquierda" className="mt-8" nota={null} />
            <CintaHorarios rotulo={HERO.horarios} className="mt-6 lg:max-w-[520px]" />
          </Reveal>
        </div>
      </Contenedor>
    </section>
  );
}
