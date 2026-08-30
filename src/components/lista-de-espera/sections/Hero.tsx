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
        quality={90}
        sizes="100vw"
        placeholder="blur"
        className="h-[74vw] w-full object-cover object-top md:hidden"
      />
      {/* SE ENSANCHA UN 0,3% PARA TIRAR EL CANTO DERECHO FUERA DEL CONTENEDOR.
          banner-1 trae 4 columnas de alfa 0 pegadas a su borde derecho —el
          izquierdo está limpio, y es el único de los cinco banners con este
          defecto—. Como la sección es blanca en escritorio, por esos 4 px se
          colaba una tira blanca de arriba abajo pegada al canto de la foto.

          El 0,3% deja las columnas malas empezando en el 100,05% del ancho, o
          sea fuera; las recorta el overflow-x-clip de la sección. Se ensancha en
          vez de desplazar para no correr la foto hacia la izquierda, y el 0,3%
          de escala no se percibe.

          max-w-none es imprescindible: el preflight de Tailwind pone un
          max-width del 100% a las imágenes y anularía el ensanche sin avisar. */}
      <Image
        src={banner}
        alt=""
        quality={90}
        sizes="100vw"
        placeholder="blur"
        className="hidden h-auto w-full max-w-none md:block md:w-[100.3%]"
      />

      {/* EN MÓVIL EL TEXTO NO VA SOBRE LA FOTO SINO DEBAJO, y no es pereza: el
          bloque necesita unos 300 px de alto y la parte despejada de la foto
          vertical no llega ni a la mitad. Encima de la imagen habría que
          encogerlo hasta lo ilegible o taparle la cara a Pilar.

          Y se recorta a 74vw de los 156 que mide el archivo: por debajo de su
          45% de alto es negro liso —luminancia 2 sobre 255— así que mostrarlo
          entero sólo añadía media pantalla de vacío entre la foto y el texto. */}
      {/* EL -25px DE ESCRITORIO VA EN margin-top Y NO EN `top`, aunque el
          desplazamiento de la columna sí vaya en `top`. No es una incoherencia:
          el `top-[15%]` es la POSICIÓN de diseño, medida contra el alto del
          banner y por tanto proporcional a él; estos 25 px son una CORRECCIÓN
          fija sobre esa posición. Sumarlos dentro del porcentaje obligaría a un
          calc que cambia de resultado en cada ancho de ventana; como margen son
          25 px a 1280 y a 1920, que es lo que se pidió.

          Va con el prefijo md: porque en móvil el bloque no está en absoluto
          sino en el flujo, con su propio -mt-[20vw] montándolo sobre la foto:
          ahí un margen negativo extra lo empujaría contra la imagen. */}
      <div className="relative -mt-[20vw] bg-[linear-gradient(180deg,transparent_0%,#000_14vw)] px-[6.5vw] pt-[14vw] pb-[12vw] md:absolute md:top-[15%] md:left-[20.3%] md:-mt-[25px] md:w-[25.5%] md:bg-none md:p-0">
        {/* EL ALTO QUE SE PIDE AQUÍ NO ES EL QUE SE VE. Los dos PNG miden 169 px
            de alto y su píldora sólida sólo 87: el resto es margen transparente
            y resplandor. O sea que la mitad de esta caja es aire, y hay que
            multiplicar por 0,515 para saber qué se verá.

            EL 4,45vw SALE DE AHÍ, no de probar. El montaje pide una píldora de
            44 px de alto a 1920; 44 x 169/87 da 85,5 px de caja, que es el
            4,45% de 1920. La comprobación es que el ancho sólido resultante da
            207 y 166 px contra los 205 y 164 del montaje: un 1% de error.

            OJO CON MEDIR LA PÍLDORA CON UN UMBRAL DE ALFA BAJO. A >24 salen
            428x108 y una relación de 3,96, que no cuadra con la del montaje
            (4,66) y lleva a números equivocados; el resplandor cuenta como
            píldora. A >200 salen 410x87 y relación 4,71, que sí cuadra.

            El hueco entre los dos sellos también es más ancho que el gap por lo
            mismo: la mayor parte son sus márgenes vacíos laterales. */}
        {/* LOS MÁRGENES NEGATIVOS CANCELAN EL AIRE TRANSPARENTE DEL PNG: 41 px por lado
              sobre un archivo de 491x169, que a la escala servida son 20,5 px a la
              izquierda y 20,7 abajo. Sin compensarlos, el sello se ve metido hacia
              dentro respecto del texto y separado del titular casi el doble de lo
              que dice el margen. En móvil se juntan además entre sí. */}
          <div className="flex items-center gap-0 -ml-[3.2vw] -mb-[3.2vw] md:-mb-[1.08vw] md:-ml-[1.066vw] md:gap-0">
          <Image
            src={selloLista}
            alt={HERO.eyebrow}
            quality={90}
            sizes="220px"
            className="h-[14vw] w-auto md:h-[clamp(2.11rem,4.45vw,5.62rem)]"
          />
          <Image
            src={selloEdicion}
            alt="3.ª edición"
            quality={90}
            sizes="190px"
            className="h-[14vw] w-auto md:h-[clamp(2.11rem,4.45vw,5.62rem)]"
          />
        </div>

        <h1
          id="hero-title"
          className="mt-[3.5vw] font-display text-[5.4vw] leading-[1.3] text-balance text-[#f4f1e4] md:mt-[15px] md:text-[clamp(1rem,1.5625vw,2rem)] md:leading-[1.3]"
        >
          {HERO.claim.map((parte) =>
            parte.strong ? (
              <strong key={parte.text} className="font-bold text-white">
                {parte.text}
              </strong>
            ) : (
              <span key={parte.text}>{parte.text}</span>
            ),
          )}
        </h1>

        <p className="mt-[4vw] font-sans text-[3.75vw] leading-[1.6] text-[#d5d2c6] md:mt-[15px] md:text-[clamp(0.8rem,0.9375vw,1.15rem)] md:leading-[1.6] md:font-medium">
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

        <p className="mt-[3vw] font-sans text-[3.75vw] leading-[1.6] text-[#d5d2c6] md:mt-[15px] md:text-[clamp(0.8rem,0.9375vw,1.15rem)] md:leading-[1.6] md:font-medium">
          {HERO.duracionLead}
          <strong className="font-bold text-white">{HERO.duracion}</strong>
        </p>

        {/* El botón se dimensiona por su font-size: dentro usa em para relleno,
            radio y flecha, así que escalar el texto escala la pieza entera y sus
            proporciones internas no se descuadran nunca. */}
        <div className="mt-[5vw] md:mt-[15px]">
          <CtaLista>{HERO.cta}</CtaLista>
        </div>
      </div>
    </section>
  );
}
