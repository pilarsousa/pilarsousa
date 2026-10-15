import Image, { getImageProps } from "next/image";
import { Radio, Video } from "lucide-react";
import { cn } from "@/lib/cn";
import { Contenedor } from "@/components/cientifico-v2/ui/Contenedor";
import { BarraSuperior } from "@/components/cientifico-v2/ui/BarraSuperior";
import { Contador } from "@/components/cientifico-v2/ui/Contador";
import { Wordmark } from "@/components/cientifico-v2/ui/Wordmark";
import { Destacado } from "@/components/cientifico-v2/ui/Destacado";
import { BotonEntrada } from "@/components/cientifico-v2/ui/BotonEntrada";
import { Anotacion } from "@/components/cientifico-v2/ui/Anotacion";
import { Separador } from "@/components/cientifico-v2/ui/Separador";
import { Reveal } from "@/components/cientifico-v2/ui/Reveal";
import { HORA, HERO, PARA_QUIEN, PARA_QUIEN_EYEBROW } from "@/components/cientifico-v2/content";
import heroEscritorio from "@/../public/cientifico-v2/hero/hero-section-2.jpg";
import heroMovil from "@/../public/cientifico-v2/hero/herosection2-mobile.jpg";

function Dato({
  icono,
  children,
  className,
}: {
  icono: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-2 rounded-[5px] bg-white/[0.09] px-3.5 py-2 text-[0.9375rem] font-semibold text-foreground backdrop-blur-sm sm:text-base",
        className,
      )}
    >
      <span className="shrink-0 text-(--cv2-violeta)">{icono}</span>
      {children}
    </li>
  );
}

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
*/
function FotoHero() {
  const comun = {
    alt: "Pilar Sousa de brazos cruzados en un aula, con una pizarra del sistema nervioso detrás",
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
      <img
        {...resto}
        alt={resto.alt}
        srcSet={movil}
        className="object-cover object-top lg:object-[50%_40%]"
      />
    </picture>
  );
}

/*
  Anotaciones a mano sobre la foto (el "Confianza · F1 → F2 · Objeciones" de
  la referencia). Medidas en cqw de la caja de la foto, así escalan con ella.
  3D → 5D: el salto de consciencia del que habla Pilar.
*/
function AnotacionesFoto() {
  return (
    <Anotacion className="absolute inset-0 [container-type:inline-size]" umbral={0.05}>
      {/* "Frecuencia" e "Identidad": ocultas por ahora (quitar `hidden`
          para volver a mostrarlas). Tamaños con tope (min) en desktop: en
          pantallas muy anchas los cqw las agrandaban de más. */}
      <span className="cv2-mano cv2-trazo-texto absolute left-[3%] top-[11.5%] hidden -rotate-[9deg] text-[10cqw] font-bold leading-none [--dur:1.3s] [--retraso:0.5s] lg:left-[49%] lg:top-[20%] lg:text-[min(4.6cqw,72px)]">
        Frecuencia
      </span>
      <span className="cv2-mano cv2-trazo-texto absolute left-[8%] top-[22%] hidden -rotate-[4deg] text-[8cqw] font-bold leading-none [--retraso:1.6s] lg:left-[55%] lg:top-[45%] lg:text-[min(3.2cqw,50px)]">
        Identidad
      </span>

      {/* Cajas 3D → 5D con la flecha. Trazos imperfectos a propósito. Sólo
          desktop: en mobile no hay hueco libre al lado de Pilar.
          Abajo, sobre la baranda, entre la columna de texto y las piernas
          de Pilar: es el único hueco libre en todos los anchos. Va atado al
          `object-position` de la foto: si cambia el encuadre, se revisa. */}
      <svg
        viewBox="0 0 320 110"
        className="absolute left-[54%] top-[74%] hidden w-[min(16cqw,250px)] overflow-visible lg:block"
        aria-hidden
      >
        <g stroke="#cfe6dc" strokeWidth={3}>
          <path
            pathLength={1}
            className="cv2-trazo cv2-trazo--brillo [--retraso:2.4s]"
            d="M8 18 C40 12 70 14 92 16 C95 40 94 70 96 92 C64 95 34 94 6 96 C4 70 6 42 8 18"
          />
          <path pathLength={1} className="cv2-trazo cv2-trazo--brillo [--dur:0.6s] [--retraso:3.2s]" d="M110 58 C150 52 180 56 214 54 M196 40 L216 54 L196 70" />
          <path
            pathLength={1}
            className="cv2-trazo cv2-trazo--brillo [--retraso:3.7s]"
            d="M228 10 C258 6 288 8 312 12 C316 40 314 72 316 100 C290 104 258 102 230 104 C226 74 230 40 228 10"
          />
        </g>
        <text x="22" y="72" className="cv2-mano cv2-trazo-texto fill-[#e2f0ea] text-[44px] font-bold [--dur:0.6s] [--retraso:2.9s]">
          3D
        </text>
        <text x="244" y="72" className="cv2-mano cv2-trazo-texto fill-[#e2f0ea] text-[44px] font-bold [--dur:0.6s] [--retraso:4.3s]">
          5D
        </text>
      </svg>
    </Anotacion>
  );
}

/**
 * Hero + "Tengas o no experiencia…". La barra con la cuenta atrás va encima
 * de la foto, como en la referencia.
 *
 * Mobile: la foto vertical (684 × 1933, Pilar arriba) ocupa la parte de
 * arriba a lo ancho, entera, y el contenido arranca a la altura de sus
 * piernas, sobre el deck. Desktop: la panorámica cubre todo el ancho y el
 * texto va a la izquierda.
 *
 * overflow-x-clip y no overflow-hidden: el "Volver" desenfocado del pie tiene
 * que poder salirse por abajo sobre la sección siguiente. La foto, que sí hay
 * que recortar, lleva su propia capa con overflow-hidden.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="relative isolate overflow-x-clip">
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
                verde de --cv2-sombra para que el texto caiga sobre oscuro. En
                desktop lo hace la máscara (.cv2-hero-foto), sólo a la izquierda. */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_40%,rgb(27_36_24/0.6)_47%,rgb(27_36_24/0.9)_55%,rgb(27_36_24/0.95)_100%)] lg:bg-none" />
          </div>
          {/* Fuera de la máscara: si no, el fundido de abajo apaga el 3D → 5D. */}
          <AnotacionesFoto />
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
      <Contenedor className="pt-[calc(74vw+20px)] lg:pt-[172px]">
        <div className="lg:max-w-[480px]">
          <Reveal>
            <ul className="grid w-fit max-w-full grid-cols-[auto_auto] gap-x-4 gap-y-3" aria-label="Datos del evento">
              <Dato icono={<Video size={18} strokeWidth={1.8} />} className="col-span-2 justify-self-start">
                Masterclass online gratuita
              </Dato>
              {/* La masterclass ocupa la primera fila en todos los anchos.
                  PC: la hora pasa al final, al lado de "En vivo online". */}
              <Dato
                icono={<Image src="/espana.svg" alt="" width={21} height={14} className="rounded-[2px]" />}
                className="lg:order-last"
              >
                {HORA}
              </Dato>
              <Dato icono={<Radio size={18} strokeWidth={1.8} />}>En vivo online</Dato>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              id="hero-titulo"
              className="mt-5 text-balance text-[1.75rem] font-extrabold leading-[1.22] tracking-[-0.01em] text-foreground sm:text-[2.125rem]"
            >
              <Destacado texto={HERO.titulo} />
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            {/* La línea a la izquierda la separa del titular y la destaca. */}
            <p className="mt-6 border-l-2 border-foreground/45 pl-4 text-[1.0625rem] font-medium leading-relaxed text-foreground/90 sm:text-lg">
              {HERO.bajada}
            </p>
            {/* text-balance: reparte los renglones, que no quede "ahora!" solo. */}
            <p className="cv2-destacado mt-5 text-balance text-[0.98rem] font-semibold sm:text-center sm:text-[1.0625rem]">{HERO.llamado}</p>
          </Reveal>

          <Reveal delay={0.3} className="mt-5 sm:flex sm:justify-center">
            <BotonEntrada bloque className="sm:w-auto" />
          </Reveal>
        </div>

        <Separador className="mt-16 sm:mt-20" />

        {/* ── Tengas o no experiencia… ── */}
        <div className="relative mt-12 pb-24 sm:mt-14 lg:pb-32">
          <p className="cv2-destacado max-w-[260px] text-base sm:max-w-none">{PARA_QUIEN_EYEBROW}</p>

          <Reveal>
            <ul className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-[1.65fr_1.2fr_1fr_0.93fr] lg:gap-3.5">
              {PARA_QUIEN.map((texto, i) => (
                <li
                  key={texto}
                  className="cv2-card relative rounded-[6px] px-6 pb-6 pt-7 text-[1.0625rem] leading-[1.45] text-(--cv2-gris)"
                >
                  {/* La barrita se redibuja cada pocos segundos, en cascada
                      de una card a la siguiente (ver .cv2-barrita--viva). */}
                  <span
                    aria-hidden
                    className="cv2-barrita cv2-barrita--viva"
                    style={{ "--retraso": `${i * 0.45}s` } as React.CSSProperties}
                  />
                  <Destacado texto={texto} />
                </li>
              ))}
            </ul>
          </Reveal>

          {/* "Volver" manuscrito y desenfocado (el "Leads" de la referencia).
              PC: sale de la columna y se ancla al borde izquierdo de la
              PANTALLA (2vw), inclinado. El borde del contenido está a
              max(32px, (100vw − 1140px) / 2) del de la pantalla; restándolo,
              la posición queda relativa al viewport. En pantallas anchas cae
              entero en el margen; en las más angostas entra en la franja
              vacía entre las cards y el carrusel, sin cortarse.
              Más abajo que en mobile: al girar sobre el borde izquierdo, el
              final de la palabra sube y llegaba a la altura de las cards. */}
          <span
            aria-hidden
            className="cv2-mano cv2-desenfocado pointer-events-none absolute -bottom-2 left-[2%] -z-10 -rotate-3 text-[7rem] font-bold leading-none sm:text-[10rem] lg:-bottom-20 lg:left-[calc(2vw-max(32px,(100vw-1140px)/2))] lg:origin-left lg:-rotate-[19deg] lg:text-[clamp(7rem,8.5vw,10rem)]"
          >
            Volver
          </span>
        </div>
      </Contenedor>
    </section>
  );
}
