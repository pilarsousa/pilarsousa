import Image from "next/image";
import { Heart, Sparkle, Sprout } from "lucide-react";
import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { ScrollIn } from "@/components/volver-al-origen/ui/ScrollIn";
import { SectionTexture } from "@/components/volver-al-origen/ui/SectionTexture";
import { SparkDivider } from "@/components/volver-al-origen/ui/SparkDivider";
import { WaitlistCta } from "@/components/volver-al-origen/ui/WaitlistCta";
import {
  Emblema,
  FlorDeLaVida,
  IconoDuda,
  IconoOjo,
  Loto,
  NodoRombo,
  OrnamentoRombo,
} from "@/components/volver-al-origen/ui/Ornamentos";
import { MovingBorder } from "@/components/volver-al-origen/ui/MovingBorder";
import { ENTRENAR, type Tramo } from "@/components/volver-al-origen/content";
import { cn } from "@/lib/cn";
import fotoBosque from "@/../public/volver-origen/public/img/landing/fondo-agradecimiento-pc.jpg";
import aureola from "@/../public/volver-origen/public/img/libros/aureolas/aureola-2.png";

/*
  Sección 2 — La reflexión. (Antes: "No venís a aprender más. Venís a entrenar.")

  DOS MAQUETACIONES DISTINTAS, no una responsive, porque son dos montajes
  distintos entregados por el cliente y no coinciden en la estructura:

  · MÓVIL — todo centrado y en columna: píldora, titular, filete, los dos
    apoyos, y las tres condicionales como tres cards con icono. Cierra con la
    flecha, la constatación y el panel del veredicto coronado por el loto.

  · ESCRITORIO — dos columnas arriba (titular a la izquierda, foto a la
    derecha), los apoyos colgando de un filete lateral, y las tres condicionales
    en UN solo panel con el emblema al lado, encadenadas por nodos. Un camino de
    puntos cose la sección por detrás.

  Lo que comparten es el contenido y el orden; lo que cambia es cómo se agrupa.
  Por eso los bloques que difieren van duplicados con lg:hidden / hidden lg:block
  en vez de intentar una sola maqueta que sirva para las dos: forzarlo daría una
  tercera cosa que no es ninguno de los dos montajes.

  EL TITULAR YA NO ES EL NOMBRE DE LA SECCIÓN. Los dos montajes arrancan con la
  píldora y "Podés saber muchísimo sobre manifestación"; el antiguo "No venís a
  aprender más. Venís a entrenar." no se pinta. No se ha perdido: vive en
  ENTRENAR.nombre y se usa como aria-label, porque un lector de pantalla
  necesita saber a qué sección entra y el titular nuevo no lo dice.

  DOS FAMILIAS TIPOGRÁFICAS Y CADA UNA CON SU TRABAJO:
  · font-accent (Cormorant Garamond) para el titular y la cursiva del remate. Es
    una serif de caja baja con cursiva de verdad, y es lo que da el tono de
    reflexión — Cinzel es versalita y suena a rótulo.
  · font-display (Cinzel) sólo para el veredicto final, que sí es un rótulo.
  El token font-accent ya existía en @theme; un comentario de globals.css dice
  que es "sólo del bootcamp", y ha dejado de serlo.

  LA FOTO ES PROVISIONAL. El montaje de escritorio pide un bosque con haces de
  luz y en el repo no hay ninguna: se usa la del fondo de la página de gracias,
  teñida de verde y oscurecida para que encaje en la paleta. Sustituir el import
  de arriba es todo lo que hay que tocar cuando llegue la definitiva.
*/

/* Brillo de los paneles, en dos capas y una sola declaración de sombra.

   · inset 0 1px 0 — una línea de luz de un píxel sobre el canto superior. Es lo
     que hace que el panel parezca tener volumen: la luz de la sección viene de
     arriba, así que el borde alto es el único que debería devolverla.
   · la sombra exterior no es negra sino VERDE y muy difusa. No hace de sombra
     —sobre fondo oscuro una sombra negra no se ve— sino de resplandor: el panel
     tiñe levemente lo que lo rodea, como si estuviera encendido por dentro.

   Se comparte entre todos los paneles de la sección para que se lean como
   piezas de la misma familia. */
const BRILLO =
  "shadow-[inset_0_1px_0_0_rgba(180,226,54,0.22),0_24px_60px_-36px_var(--vo-glow-strong)]";

/* Pinta un texto troceado con sus resaltados. El resaltado es color y no
   negrita: sobre fondo oscuro el peso extra empasta y el verde ya separa de
   sobra. Quien lo use puede pedir otra clase si necesita también el peso. */
function Tramos({ partes, acento }: { partes: Tramo[]; acento?: string }) {
  return (
    <>
      {partes.map((parte) =>
        parte.acento ? (
          <span key={parte.text} className={acento ?? "text-accent"}>
            {parte.text}
          </span>
        ) : (
          <span key={parte.text}>{parte.text}</span>
        ),
      )}
    </>
  );
}

/* Los tres iconos de las condicionales, resueltos por nombre. Cerrado a
   propósito: si content.ts nombra uno que no existe, lo marca TypeScript. */
const ICONOS = {
  duda: IconoDuda,
  ojo: IconoOjo,
  /* El corazón es el de lucide y los otros dos están dibujados a mano, pero
     los tres tienen que pintarse igual. Los dibujados llevan text-accent dentro;
     éste no lo llevaba y heredaba el color del texto de la card, así que salía
     casi blanco mientras los otros iban en verde. */
  corazon: ({ className }: { className?: string }) => (
    <Heart
      strokeWidth={1.3}
      aria-hidden
      className={cn("text-accent", className)}
    />
  ),
} satisfies Record<string, (p: { className?: string }) => React.ReactElement>;

/* Camino de puntos que cose la sección en escritorio.

   preserveAspectRatio="none" a propósito: no es un dibujo que deba mantener su
   forma sino una guía que se estira con la caja que recorre. En móvil no
   aparece — allí no hay ancho para que el trazo serpentee y acabaría cruzando
   el texto, y el montaje de móvil tampoco lo lleva. */
function CaminoPunteado({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
      className={className}
    >
      {/* vector-effect="non-scaling-stroke" es imprescindible aquí, no un
          detalle. Con preserveAspectRatio="none" la caja estira el sistema de
          coordenadas del SVG de forma desigual, y con él el grosor del trazo y
          la longitud de los guiones: en una pantalla ancha el punteado fino se
          convertía en un zigzag de guiones enormes. Con esta propiedad el trazo
          se dibuja en píxeles de pantalla y sólo se estira el RECORRIDO, que es
          lo único que se quería estirar. */}
      <path
        d="M78 4 C 78 16, 55 14, 55 27 C 55 40, 92 38, 92 52 C 92 66, 16 58, 16 72 C 16 84, 50 80, 50 92"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeDasharray="4 10"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity="0.35"
      />
    </svg>
  );
}

/* Nodo luminoso del recorrido de escritorio: un punto con halo. Va como
   elemento y no como marker del SVG porque necesita su propio resplandor. */
function Nodo({ className }: { className?: string }) {
  return (
    <span aria-hidden className={className}>
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,var(--vo-glow-strong)_0%,transparent_65%)] blur-[3px]" />
      {/* El punto lleva su propia sombra además del halo de detrás: es lo que lo
          hermana con el palo del que cuelga, que va encendido igual. */}
      <span className="absolute inset-[30%] rounded-full bg-accent shadow-[0_0_6px_1px_var(--vo-glow-strong)]" />
    </span>
  );
}

export function Entrenar() {
  return (
    <section
      aria-label={ENTRENAR.nombre}
      /* Sin relleno inferior: el hueco que separa esta sección de la
         siguiente lo pone entero el filete de cierre con su margen, y así los
         dos lados de ese filete miden lo mismo. Con relleno aquí, el hueco de
         abajo sería la suma de este valor más el de apertura de la sección
         siguiente, y el de arriba sólo el margen — que es justo la asimetría
         que se veía. */
      className="relative isolate overflow-hidden pt-[clamp(4rem,2rem+7vh,7rem)] pb-0 text-foreground"
    >
      <SectionTexture variant="claro" />

      {/* Velo oscuro por encima de la textura y por debajo del contenido.

          La textura clara es la que diferencia esta sección de sus vecinas,
          pero a plena intensidad le quita contraste al texto y las cards
          pierden su borde contra el fondo. El velo la baja de tono justo en la
          zona donde vive el contenido y la deja subir en los bordes, así que la
          sección se sigue leyendo como la clara de la alternancia.

          Es radial y no un color plano: plano taparía la textura entera y
          daríamos la vuelta al motivo de tenerla. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_65%_at_50%_45%,rgba(6,12,2,0.78)_0%,rgba(6,12,2,0.55)_55%,transparent_100%)]"
      />

      {/* El camino recorre la sección entera por detrás del contenido. -z-10 lo
          deja sobre la textura y bajo los paneles: se asoma entre bloques y
          desaparece detrás de ellos. */}
      <CaminoPunteado className="pointer-events-none absolute inset-x-[8%] inset-y-0 -z-10 hidden h-full lg:block" />

      <VoContainer>
        {/* ══ Fila superior ══ */}
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.68fr)] lg:gap-14">
          <div className="text-center lg:text-left">
            <ScrollIn>
              {/* La píldora. El destello de cuatro puntas es el del montaje de
                  móvil; el de escritorio lleva una hoja, pero mantener dos
                  iconos para la misma etiqueta sería una diferencia sin motivo
                  — y el destello es además el símbolo que ya usa el filete de
                  la página. */}
              {/* vo-latido: dos golpes y descanso, con el resplandor creciendo
                  a la vez que la escala. El porqué de cada número, en el
                  keyframe de globals.css. */}
              <p className="vo-latido inline-flex items-center gap-2.5 rounded-full border border-accent/35 bg-vo-forest/50 px-5 py-2 font-sans text-[0.72rem] font-medium uppercase tracking-[0.28em] text-accent">
                <Sparkle size={14} strokeWidth={1.6} aria-hidden />
                {/* El tracking añade espacio DESPUÉS de la última letra: sin
                    compensarlo, la píldora tiene 0.28em de más a la derecha. */}
                <span className="-mr-[0.28em]">{ENTRENAR.badge}</span>
              </p>
            </ScrollIn>

            <ScrollIn delay={0.05}>
              {/* Caja baja, al revés que el resto de títulos de la página: no es
                  un rótulo de sección sino una frase dicha al lector, y en
                  versalitas sonaría a proclama.

                  El id se mantiene aunque la sección use aria-label, por si algo
                  enlaza a él. */}
              <h2
                id="entrenar-title"
                className="mt-6 font-accent text-[clamp(2.3rem,10vw,3.2rem)] leading-[1.08] font-medium text-foreground lg:text-[3.5rem]"
              >
                <Tramos partes={ENTRENAR.titular} />
              </h2>
            </ScrollIn>

            {/* En móvil los apoyos van centrados bajo un filete horizontal; en
                escritorio cuelgan de un filete lateral, que es lo que los ata a
                la columna del titular. Son los dos montajes. */}
            <SparkDivider fade className="mx-auto mt-6 max-w-xs lg:hidden" />

            <ScrollIn delay={0.1}>
              <div className="relative mt-6 space-y-4 lg:mt-7 lg:pl-5">
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 hidden w-px bg-[linear-gradient(to_bottom,var(--color-accent),transparent)] lg:block"
                />
                {ENTRENAR.apoyos.map((partes) => (
                  <p
                    key={partes[0].text}
                    className="mx-auto max-w-[34rem] font-sans text-[0.98rem] leading-relaxed text-foreground/80 lg:mx-0 lg:text-[0.95rem]"
                  >
                    <Tramos partes={partes} acento="font-semibold text-accent" />
                  </p>
                ))}
              </div>
            </ScrollIn>
          </div>

          {/* ── La foto, sólo escritorio ──
              aspect-4/3 y esquinas muy redondeadas, como en el montaje. El velo
              verde por encima es lo que la integra en la paleta: la imagen
              provisional es cálida y sin él canta contra todo lo demás. */}
          {/* SIN BORDE Y FUNDIDA CON EL FONDO. La foto deja de ser una card:
              se disuelve por los cuatro lados con una máscara radial, así que no
              tiene canto que la recorte y parece parte de la sección en vez de
              una pieza pegada encima.

              Es una MÁSCARA y no un degradado por encima. Un degradado tendría
              que fundir hacia un color, y el fondo real aquí es una textura que
              cambia con la posición: cualquier color que se eligiera dibujaría
              un halo alrededor. La máscara vuelve transparente la propia imagen
              y deja pasar lo que haya detrás, sea lo que sea — el mismo recurso
              que usan el hero y el retrato de Pilar.

              Las paradas dejan la foto intacta hasta el 45% del radio y la
              apagan del todo en el 100%: más de la mitad del recorrido es
              desvanecido, que es lo que impide localizar dónde acaba. */}
          <ScrollIn delay={0.1} from="right" className="hidden lg:block">
            {/* SE SALE DE SU COLUMNA POR LA DERECHA. El ancho es el de la
                columna más 14vw, que la lleva hasta el borde de la pantalla: en
                su caja la foto quedaba pequeña y encajonada, y lo que se busca
                es que llegue al canto y se pierda ahí. El overflow-hidden de la
                sección es lo que impide que ese exceso genere scroll lateral.

                aspect-16/10 en vez de 4/3: más apaisada, que es como se lee un
                paisaje y además lo que pide el ancho nuevo.

                DOS MÁSCARAS CRUZADAS, y el reparto entre ellas no es simétrico
                a propósito:
                · la horizontal es la que hace el trabajo. La foto llega intacta
                  al 42% y ha desaparecido en el 90%, así que casi la mitad
                  derecha es desvanecido y el borde se pierde contra el fondo.
                · la vertical sólo redondea: apaga el canto de arriba y el de
                  abajo lo justo para que tampoco ahí haya línea recta.

                mask-composite las cruza — sólo se ve la foto donde AMBAS la
                dejan pasar. Sin componer, la segunda sustituiría a la primera.
                Safari necesita su prefijo y llama "source-in" a lo que el
                estándar llama "intersect". */}
            <figure
              className="relative aspect-16/10 w-[calc(100%+14vw)]"
              style={{
                maskImage:
                  "linear-gradient(to right, #000 0%, #000 42%, transparent 90%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, #000 0%, #000 42%, transparent 90%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            >
              <Image
                src={fotoBosque}
                alt=""
                fill
                quality={90}
                sizes="(min-width: 1024px) 55vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(26,43,7,0.35),rgba(11,21,2,0.7))]"
              />
              {/* Haz de luz entrando por la esquina superior derecha, que es lo
                  que hace la foto del montaje. */}
              <span
                aria-hidden
                className="absolute -top-1/4 -right-1/4 size-2/3 rounded-full bg-[radial-gradient(circle,var(--vo-glow)_0%,transparent_70%)] blur-2xl"
              />
            </figure>
          </ScrollIn>
        </div>

        {/* ══ Condicionales — MÓVIL: tres cards con icono ══ */}
        <ul className="mt-10 space-y-4 lg:hidden">
          {ENTRENAR.sintomas.map((sintoma, i) => {
            const Icono = ICONOS[sintoma.icono];

            return (
              <ScrollIn key={sintoma.partes[0].text} delay={i * 0.08}>
                <li
                  className={`flex items-center gap-4 rounded-[1.5rem] border border-accent/20 bg-vo-forest/35 py-5 pr-5 pl-4 backdrop-blur-sm ${BRILLO}`}
                >
                  {/* El icono en su anillo, y un filete vertical separándolo del
                      texto: los dos son del montaje, y el filete es lo que evita
                      que el conjunto se lea como un bullet gigante. */}
                  {/* El anillo lleva la MISMA luz recorriendo el borde que el
                      panel del hero, sólo que en circular.

                      Cómo funciona, porque no es evidente: MovingBorder pasea un
                      disco luminoso por el contorno, y por sí solo se vería como
                      un pompón cruzando el interior del círculo. Lo que lo
                      convierte en un tramo encendido del borde es la clase
                      vo-edge-only del contenedor, que recorta esa capa a su
                      marco de 2 px componiendo dos máscaras con exclude — del
                      disco sólo sobrevive el trozo que pisa el marco.

                      Por eso la capa sobresale 2 px (-inset-[2px]): esa rendija
                      es justamente el marco por el que asoma la luz.

                      rx y ry al 50% para que el recorrido sea el círculo y no un
                      rectángulo redondeado; en el hero son 10px porque allí el
                      panel es rectangular. */}
                  <span className="relative flex size-16 shrink-0 items-center justify-center rounded-full border border-accent/30">
                    <span
                      aria-hidden
                      className="vo-edge-only pointer-events-none absolute -inset-[2px] overflow-hidden rounded-full"
                    >
                      <MovingBorder duration={6000} rx="50%" ry="50%">
                        {/* Disco más pequeño que en el hero —40 px frente a una
                            elipse de 288— porque el contorno que recorre también
                            lo es: con la huella del hero, el tramo encendido
                            daría la vuelta al anillo entero y dejaría de leerse
                            como un recorrido. */}
                        <span className="block size-10 rounded-full bg-[radial-gradient(circle,#ffffff_0%,var(--color-vo-lumen)_35%,transparent_70%)] opacity-70 blur-[2px]" />
                      </MovingBorder>
                    </span>

                    <Icono className="size-8" />
                  </span>
                  <span
                    aria-hidden
                    className="h-12 w-px shrink-0 bg-accent/25"
                  />

                  <p className="font-sans text-[0.98rem] leading-[1.65] text-foreground/85">
                    <Tramos
                      partes={sintoma.partes}
                      acento="font-semibold text-accent"
                    />
                  </p>
                </li>
              </ScrollIn>
            );
          })}
        </ul>

        {/* ══ Condicionales — ESCRITORIO: un panel con emblema ══ */}
        <ScrollIn delay={0.05} className="hidden lg:block">
          {/* SIN overflow-hidden, al contrario que el resto de paneles. El
              camino punteado tiene que nacer dentro —del extremo del palo que
              encadena las tres condicionales— y salir por abajo hasta el nodo;
              recortando, se cortaría justo en el borde.

              La marca de agua sí necesita recorte, así que se lo lleva puesto en
              su propio contenedor en vez de imponérselo al panel entero. */}
          <div
            className={`relative mt-14 rounded-[2rem] border border-accent/20 bg-vo-forest/35 p-10 backdrop-blur-sm ${BRILLO}`}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]"
            >
              <FlorDeLaVida className="absolute -top-16 -right-16 size-56 opacity-[0.07]" />
            </div>

            <div className="grid items-center gap-14 lg:grid-cols-[auto_minmax(0,1fr)]">
              {/* Mismo tratamiento que los anillos de móvil, para que las dos
                  maquetaciones compartan lenguaje: el emblema es la pieza
                  equivalente en escritorio. */}
              <div className="relative size-40 shrink-0">
                <span
                  aria-hidden
                  className="vo-edge-only pointer-events-none absolute -inset-[2px] z-10 overflow-hidden rounded-full"
                >
                  <MovingBorder duration={9000} rx="50%" ry="50%">
                    <span className="block size-16 rounded-full bg-[radial-gradient(circle,#ffffff_0%,var(--color-vo-lumen)_35%,transparent_70%)] opacity-70 blur-[3px]" />
                  </MovingBorder>
                </span>

                <Emblema className="size-40">
                  <Sprout size={34} strokeWidth={1.2} aria-hidden />
                </Emblema>
              </div>

              {/* Encadenadas por una línea con nodos: marcan que son tres
                  momentos del mismo pensamiento, y el filete entre uno y otro
                  los separa sin dejar de unirlos. */}
              <ol className="relative space-y-6 pl-8">
                {/* EL PALO, EN NEÓN. Tres cosas lo componen y ninguna sobra:

                    · el degradado vertical, que lo apaga por los dos extremos
                      para que parezca un haz y no el borde de una tabla;
                    · 2 px de grosor en vez de 1 — a un píxel el resplandor lo
                      devora y se ve el halo sin la línea;
                    · dos sombras del mismo color a distinto radio. Una sola da
                      un borde difuso; dos, una cerca y otra lejos, es lo que el
                      ojo lee como tubo de neón encendido.

                    Va a color pleno y sin opacidad reducida: el resplandor ya lo
                    integra, y bajándolo se apagaba justo lo que se buscaba. */}
                <span
                  aria-hidden
                  className="absolute inset-y-2 left-[3px] w-[2px] rounded-full bg-[linear-gradient(to_bottom,transparent,var(--color-accent)_15%,var(--color-accent)_85%,transparent)] shadow-[0_0_8px_1px_var(--vo-glow),0_0_20px_4px_var(--vo-glow)]"
                />

                {/* EL CAMINO SALE DEL EXTREMO DEL PALO, no pasa por detrás.

                    Arranca en left-[3px] —la misma vertical exacta que el palo—
                    y en top-full, o sea justo donde el palo termina, así que la
                    continuidad entre uno y otro es literal y no aproximada.

                    De ahí baja y se abre hacia el centro, que es donde espera el
                    nodo del rombo: el recorrido cuenta el paso de la reflexión
                    al veredicto.

                    Las medidas son fijas y en píxeles porque el trayecto es
                    concreto —del palo al nodo— y no una decoración que deba
                    escalar. El ancho de 340 px es la distancia entre la columna
                    de texto y el centro del contenedor en la rejilla de 1140.

                    vector-effect por lo de siempre: con preserveAspectRatio
                    "none" el trazo se deformaría con la caja. */}
                <svg
                  viewBox="0 0 340 200"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                  className="pointer-events-none absolute top-full left-[3px] h-[200px] w-[340px] max-w-none text-accent"
                >
                  <path
                    d="M2 0 C 2 70, 40 120, 150 150 C 240 174, 290 182, 330 190"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeDasharray="4 9"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    opacity="0.45"
                  />
                </svg>

                {ENTRENAR.sintomas.map((sintoma, i) => (
                  <li
                    key={sintoma.partes[0].text}
                    className={
                      i > 0 ? "border-t border-accent/10 pt-6" : undefined
                    }
                  >
                    <span className="relative">
                      {/* top-[0.6em] alinea el nodo con la primera línea del
                          texto y no con el borde de la caja, que es donde el ojo
                          espera encontrarlo. */}
                      <Nodo className="absolute top-[0.6em] -left-8 block size-[9px]" />
                      <p className="font-accent text-[1.35rem] leading-[1.6] italic text-foreground/85">
                        <Tramos
                          partes={sintoma.partes}
                          acento="font-semibold text-accent not-italic"
                        />
                      </p>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </ScrollIn>

        {/* ══ Paso al veredicto ══ */}
        {/* En móvil una flecha fina; en escritorio el nodo-rombo. Los dos
            montajes marcan aquí el mismo giro con distinta pieza. */}
        <ScrollIn delay={0.05}>
          <div className="mt-8 flex flex-col items-center gap-2">
            <NodoRombo className="hidden size-14 lg:block" />
            <svg
              viewBox="0 0 12 20"
              fill="none"
              aria-hidden
              className="h-8 w-3 text-accent/60 lg:h-4"
            >
              <path
                d="M6 1V18M6 18L1.5 13.5M6 18L10.5 13.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </ScrollIn>

        {/* ══ La constatación ══ */}
        {/* Fuera de todo panel: es la bisagra entre la reflexión y el veredicto,
            y encerrarla la convertiría en un bloque más. */}
        <ScrollIn delay={0.05}>
          <div className="mt-6 text-center">
            <p className="font-sans text-[1.05rem] leading-relaxed text-foreground/85 sm:text-lg">
              <Tramos
                partes={ENTRENAR.diagnostico.lead}
                acento="font-bold text-foreground"
              />
            </p>
            <p className="mt-1 font-accent text-[clamp(1.5rem,7vw,2.1rem)] leading-[1.25] italic text-accent">
              {ENTRENAR.diagnostico.leadAcento}
            </p>
          </div>
        </ScrollIn>

        {/* ══ Panel del veredicto ══ */}
        <ScrollIn delay={0.05}>
          <div
            className={`relative mt-8 overflow-hidden rounded-[1.75rem] border border-accent/25 bg-vo-forest/35 px-6 py-10 text-center backdrop-blur-sm sm:px-12 sm:py-12 ${BRILLO}`}
          >
            {/* Haz de luz asomando por el canto inferior, como en el montaje:
                cierra el panel igual que el del hero cierra el suyo. */}
            <span
              aria-hidden
              className="absolute -bottom-9 left-1/2 h-16 w-[65%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,var(--vo-glow-strong)_0%,transparent_70%)] blur-lg"
            />

            <Loto className="mx-auto h-7 w-10" />

            {/* El veredicto, y lo único de la sección en versalitas: aquí sí es
                un rótulo. La primera línea en crema nombra y la segunda en verde
                señala, que es lo que hay que recordar. */}
            <p className="mt-5 font-display text-[clamp(1.7rem,8vw,3.1rem)] uppercase leading-[1.06] tracking-[0.02em] text-foreground">
              {ENTRENAR.diagnostico.afirma}
            </p>
            <p className="mt-1 font-display text-[clamp(1.35rem,6.6vw,2.4rem)] uppercase leading-[1.12] tracking-[0.02em] text-accent">
              {ENTRENAR.diagnostico.afirmaResto}
            </p>
          </div>
        </ScrollIn>

        {/* ══ La caja del GYM ══ */}
        {/* A partir de aquí ya no hay montaje: los dos entregados terminan en el
            veredicto. Lo que sigue es la maquetación anterior, que continúa el
            argumento y lleva al CTA. */}
        <ScrollIn delay={0.1}>
          <div className="relative mx-auto mt-14 max-w-[42rem]">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_40%,var(--vo-glow)_0%,transparent_70%)] blur-xl"
            />

            <div
              className={`relative overflow-hidden rounded-[1.75rem] border border-accent/30 bg-vo-forest/45 px-6 py-10 text-center backdrop-blur-sm sm:px-12 sm:py-12 ${BRILLO}`}
            >
              <span
                aria-hidden
                className="absolute -top-10 left-1/2 h-20 w-[70%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,var(--vo-glow-strong)_0%,transparent_70%)] blur-lg"
              />

              <FlorDeLaVida className="pointer-events-none absolute top-1/2 -left-10 -z-10 size-40 -translate-y-1/2 opacity-[0.12]" />
              <FlorDeLaVida className="pointer-events-none absolute top-1/2 -right-10 -z-10 size-40 -translate-y-1/2 opacity-[0.12]" />

              <p className="font-sans text-base leading-relaxed text-foreground/85 sm:text-lg">
                {ENTRENAR.metafora.lead}
              </p>
              <p className="mt-3 font-display text-[clamp(1.9rem,9vw,3rem)] uppercase leading-[1.05] tracking-[0.02em] text-accent">
                {ENTRENAR.metafora.resaltado}
              </p>

              <OrnamentoRombo className="mt-8" />
            </div>
          </div>
        </ScrollIn>

        {/* ══ Desarrollo y cierre ══ */}
        <div className="mx-auto mt-12 max-w-[42rem]">
          {/* En escritorio el bloque se apoya en un panel muy tenue en vez de
              quedar suelto sobre la textura.

              Es el único de la sección con el borde al 10% y el fondo al 20%:
              deliberadamente por debajo del resto de paneles. No tiene que
              leerse como una card más —no es una pieza, es el cuerpo del
              argumento— sino sólo dar suelo al texto para que no parezca
              flotando entre la caja del GYM y el cierre.

              En móvil no se pone: allí el ancho ya encuadra el texto por sí
              solo, y un panel más estrecharía todavía más la caja de lectura. */}
          <ScrollIn delay={0.05}>
            <div className="space-y-5 text-center font-sans text-base leading-[1.9] text-foreground/85 sm:text-lg lg:rounded-[2rem] lg:border lg:border-accent/10 lg:bg-vo-forest/20 lg:px-12 lg:py-10 lg:text-[1.1rem] lg:text-foreground/95 lg:backdrop-blur-[2px]">
              {ENTRENAR.desarrollo.map((linea) => (
                <p key={linea}>{linea}</p>
              ))}
            </div>
          </ScrollIn>

          {/* Dos frases de tres palabras, una debajo de otra. En la misma línea
              se leerían como una aclaración; separadas, como un veredicto. */}
          <ScrollIn delay={0.1}>
            <div className="relative mt-10 text-center">
              <p className="font-display text-xl uppercase leading-snug tracking-[0.06em] text-foreground/55 sm:text-2xl">
                {ENTRENAR.cierre[0]}
              </p>
              <p className="font-display text-xl uppercase leading-snug tracking-[0.06em] text-accent sm:text-2xl">
                {ENTRENAR.cierre[1]}
              </p>

              {/* La aureola hace de SUELO del cierre: un anillo en perspectiva
                  bajo el texto, como si las dos frases estuvieran apoyadas en
                  él. Cierra la sección con una figura en vez de con un margen.

                  mix-blend-screen NO es decorativo, es obligatorio. El archivo
                  tiene canal alfa pero su fondo está pintado de negro opaco, así
                  que colocado tal cual taparía la textura con un rectángulo.
                  Mezclando por luz, el negro es neutro —no suma nada— y sólo se
                  ve lo que el anillo ilumina. Es el mismo recurso que usa el haz
                  del hero, y por el mismo motivo.

                  El archivo trae además unas manchas rojas de recorte en el
                  borde del anillo. A esta opacidad y sobre fondo oscuro pasan
                  por destellos cálidos, pero si algún día se limpia el PNG,
                  mejor.

                  MEDIDA Y SITIO. Estuvo al 130% del ancho y anclada por
                  abajo, y era demasiado en las dos cosas: el anillo cruzaba por
                  encima de las dos frases y competía con ellas en vez de
                  sostenerlas. Ahora mide 17rem —una fracción de aquello— y va
                  anclada a top-full, o sea que empieza donde el texto acaba.

                  El -translate-y-12 la sube lo justo para que la
                  última línea quede DENTRO del anillo y no por encima de él. La
                  diferencia entre las dos cosas es toda: metida dentro, el texto
                  se apoya en la elipse; por encima, el anillo se lee como un
                  adorno que pasaba por ahí debajo.

                  APLASTADA AL 32% DE SU ALTO. El archivo es un anillo en
                  perspectiva, y a su proporción real se le ve el hueco del
                  medio, que es lo que lo delataba como "una elipse puesta detrás
                  del texto". Comprimido en vertical, el arco de delante y el de
                  detrás se juntan hasta casi tocarse y el conjunto pasa a leerse
                  como un trazo de luz horizontal con las puntas afiladas.

                  Se compensa con más ancho —de 17 a 21rem—: al aplastarlo
                  también pierde presencia, y sin ese ajuste el suelo se queda
                  corto para las dos líneas que sostiene.

                  -z-10 la deja por detrás de todo lo que la rodea, incluido el
                  botón que viene después, al que sólo le llega un halo tenue. */}
              <Image
                src={aureola}
                alt=""
                aria-hidden
                quality={90}
                sizes="21rem"
                className="pointer-events-none absolute top-full left-1/2 -z-10 w-[21rem] max-w-none -translate-x-1/2 -translate-y-12 scale-y-[0.32] opacity-55 mix-blend-screen"
              />
            </div>
          </ScrollIn>
        </div>

        <ScrollIn delay={0.15}>
          <div className="mt-12 flex justify-center">
            <WaitlistCta className="max-w-md">{ENTRENAR.cta}</WaitlistCta>
          </div>
        </ScrollIn>

        {/* my-16: 64 px por arriba y 64 por abajo, exactamente iguales. Es
            el único que aporta separación entre las dos secciones, así que los
            dos vecinos van sin relleno en ese lado. */}
        <SparkDivider fade className="my-16" />
      </VoContainer>
    </section>
  );
}
