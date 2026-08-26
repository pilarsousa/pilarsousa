import Image from "next/image";
import { CtaLista } from "@/components/lista-de-espera/ui/CtaLista";
import { HERO } from "@/components/lista-de-espera/content";
import banner from "@/../public/volver-origen/public/Recursos/generales/banner-1-web.webp";
import bannerMovil from "@/../public/volver-origen/public/Recursos/mobile/heroseccion-mobile.jpg";
import selloLista from "@/../public/volver-origen/public/Recursos/generales/lista-de-espera.png";
import selloEdicion from "@/../public/volver-origen/public/Recursos/generales/3era-edicion.png";

/*
  Sección 1 — Hero.

  EL RECORTE DIAGONAL DEL PIE VIENE DENTRO DE LA IMAGEN. banner-1 es un WebP con
  alfa cuyas esquinas inferiores están vacías, y eso condiciona el montaje:

  · la imagen va como BLOQUE con alto automático, no con `fill`. Así es ella la
    que fija el alto de la sección y el vértice del recorte cae donde el diseño
    lo puso en cualquier ancho. Con `fill` habría que inventarse un alto y
    object-cover recortaría la foto: el pico se movería.
  · el contenido va encima en absoluto, para no empujar ese alto.
  · la sección va sobre BLANCO, que es lo que asoma por las esquinas vacías.

  TODO SE COLOCA EN PORCENTAJES DEL ANCHO DE LA VENTANA, no en una caja de ancho
  fijo. El montaje pone el bloque de texto al 20,3% del ancho y le da un 25,5%;
  con un contenedor de 1140 px eso sólo coincide en pantallas de 1900, y en
  cualquier otra el texto se despega de la zona despejada de la foto. Los mismos
  porcentajes valen para todas las secciones porque todas comparten esa retícula.

  EL DESPLAZAMIENTO VERTICAL VA EN `top`, NO EN `padding-top`. Es la trampa que
  tenía este componente: un padding en porcentaje se resuelve contra el ANCHO del
  contenedor, no contra su alto, así que un `pt-[17%]` pensado como "17% del alto
  del hero" mandaba el bloque casi al doble de profundidad y dejaba el botón
  debajo de la cuña. `top` sí se mide contra el alto.

  Los tamaños van en vw con clamp: el diseño está hecho para escalar con la
  imagen, y el clamp pone suelo y techo para que en una pantalla muy pequeña o
  muy grande siga siendo legible.

  Trajan no tiene caja baja —sus minúsculas SON versalitas—, así que el titular
  sale en mayúsculas sin necesidad de uppercase.
*/
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-x-clip bg-black md:bg-white"
    >
      {/* DOS ARCHIVOS, NO UNO REENCUADRADO. El de escritorio mide 1924x800 —una
          panorámica— y el de móvil 960x1500. Recortar el ancho con object-cover
          habría dejado a Pilar fuera de plano y la zona despejada de la foto,
          que es donde se apoya el texto, desplazada.

          priority sólo en el que se va a ver: los dos <picture> conviven en el
          DOM y marcar ambos como prioritarios haría descargar 700 KB de imagen
          que nadie mira. */}
      <Image
        src={bannerMovil}
        alt=""
        priority
        quality={85}
        sizes="100vw"
        placeholder="blur"
        className="h-[74vw] w-full object-cover object-top md:hidden"
      />
      <Image
        src={banner}
        alt=""
        quality={90}
        sizes="100vw"
        placeholder="blur"
        className="hidden h-auto w-full md:block"
      />

      {/* EN MÓVIL EL TEXTO NO VA SOBRE LA FOTO SINO DEBAJO, y no es pereza: el
          bloque necesita unos 300 px de alto y la parte despejada de la foto
          vertical no llega ni a la mitad. Encima de la imagen habría que
          encogerlo hasta lo ilegible o taparle la cara a Pilar.

          Y se recorta a 74vw de los 156 que mide el archivo: por debajo de su
          45% de alto es negro liso —luminancia 2 sobre 255— así que mostrarlo
          entero sólo añadía media pantalla de vacío entre la foto y el texto. */}
      <div className="relative -mt-[8vw] bg-[linear-gradient(180deg,transparent_0%,#000_8vw)] px-[6.5vw] pt-[8vw] pb-[12vw] md:absolute md:top-[17%] md:left-[20.3%] md:mt-0 md:w-[25.5%] md:bg-none md:p-0">
        {/* EL ALTO QUE SE PIDE AQUÍ NO ES EL QUE SE VE, y la diferencia es
            grande: los dos PNG miden 169 px de alto pero su píldora sólo 108
            —hay 30 px transparentes arriba y 31 abajo—, así que el 36% de esta
            caja es aire. A 3,42vw la caja mide 66 px a 1920 y la píldora que se
            ve, 42.

            Por eso el número parece siempre mayor de lo que aparenta en
            pantalla, y por eso el hueco entre los dos sellos es más ancho que el
            gap: la mayor parte de esa separación son sus márgenes vacíos.

            Si hiciera falta afinarlo de verdad, lo limpio sería recortar ese
            margen del archivo; mientras siga ahí, cualquier medida que se ponga
            aquí hay que multiplicarla por 0,64 para saber qué se verá. */}
        <div className="flex items-center gap-[2vw] md:gap-[0.5vw]">
          <Image
            src={selloLista}
            alt={HERO.eyebrow}
            quality={90}
            sizes="220px"
            className="h-[11vw] w-auto md:h-[clamp(1.62rem,3.42vw,4.32rem)]"
          />
          <Image
            src={selloEdicion}
            alt="3.ª edición"
            quality={90}
            sizes="190px"
            className="h-[11vw] w-auto md:h-[clamp(1.62rem,3.42vw,4.32rem)]"
          />
        </div>

        <h1
          id="hero-title"
          className="mt-[4.5vw] font-display text-[5.4vw] leading-[1.3] text-[#f4f1e4] md:mt-[0.8vw] md:text-[clamp(0.72rem,1.15vw,1.5rem)] md:leading-[1.36]"
        >
          {HERO.claim}
        </h1>

        <p className="mt-[4.5vw] font-sans text-[3.75vw] leading-[1.6] text-[#d5d2c6] md:mt-[1.1vw] md:text-[clamp(0.5rem,0.75vw,0.95rem)] md:leading-[1.65]">
          {HERO.intro.map((parte) =>
            parte.strong ? (
              <strong key={parte.text} className="font-bold text-white">
                {parte.text}
              </strong>
            ) : (
              <span key={parte.text}>{parte.text}</span>
            ),
          )}
        </p>

        <p className="mt-[3vw] font-sans text-[3.75vw] leading-[1.6] text-[#d5d2c6] md:mt-[0.7vw] md:text-[clamp(0.5rem,0.75vw,0.95rem)] md:leading-[1.65]">
          {HERO.duracionLead}
          <strong className="font-bold text-white">{HERO.duracion}</strong>
        </p>

        {/* El botón se dimensiona por su font-size: dentro usa em para relleno,
            radio y flecha, así que escalar el texto escala la pieza entera y sus
            proporciones internas no se descuadran nunca. */}
        <div className="mt-[7vw] text-[3.35vw] md:mt-[2.4vw] md:text-[clamp(0.55rem,0.95vw,1.2rem)]">
          <CtaLista>{HERO.cta}</CtaLista>
        </div>
      </div>
    </section>
  );
}
