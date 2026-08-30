import Image from "next/image";
import { Clock, Gift, Tag } from "lucide-react";
import { CtaLista } from "@/components/lista-de-espera/ui/CtaLista";
import { LluviaCodigo } from "@/components/lista-de-espera/ui/LluviaCodigo";
import {
  CardBonus,
  RejillaBonus,
} from "@/components/lista-de-espera/ui/RejillaBonus";
import { LISTA } from "@/components/lista-de-espera/content";
import bonusBg from "@/../public/volver-origen/public/Recursos/generales/banner-5.webp";

const BONUS_TITLE_LINES = [
  ["Acceso", "anticipado"],
  ["Condiciones", "especiales"],
  ["Bonos y regalos", "exclusivos"],
] as const;

/*
  Un icono por bono, elegidos por lo que promete cada uno y no por decorar:

  · reloj — llegar antes que nadie; el tiempo es lo que se gana.
  · etiqueta — condiciones, que es lenguaje de precio y de trato.
  · regalo — bonos y obsequios.

  Van con trazo fino (1,6) y no relleno: junto a las versalitas de Trajan, un
  icono macizo pesa más que el titular al que acompaña.
*/
const BONUS_ICONOS = [Clock, Tag, Gift] as const;

/*
  Seccion 8 - bonus de lista de espera.

  El fondo oscuro tambien es un asset del montaje; asi el corte con el fundido
  inferior de Pilar queda igual al original y el contenido puede apoyarse sobre
  medidas proporcionales al lienzo 1920x808.
*/
export function ListaEspera() {
  return (
    /* #252525 EN MÓVIL Y NO NEGRO PURO: ahí no se carga el banner, y sobre negro
       absoluto la lluvia de código y los filetes de las cards pierden el poco
       contraste que tienen. Un gris muy oscuro les devuelve un fondo contra el
       que recortarse. En escritorio manda el banner, así que se queda. */
    <section
      aria-labelledby="lista-espera-titulo"
      className="relative isolate -mt-px overflow-hidden bg-[#252525] text-center text-vo-bone md:bg-[#111111]"
    >
      <Image
        src={bonusBg}
        alt=""
        fill
        quality={90}
        sizes="100vw"
        placeholder="blur"
        className="-z-10 object-cover"
      />

      {/* LA LLUVIA VA ENTRE EL BANNER Y EL CONTENIDO: por encima de la foto para
          que se vea, y por debajo del texto —que lleva z-10— para no cruzarle
          glifos por delante. Es la razón de que el contenedor no pueda perder su
          `isolate`: sin él, esos z-index se medirían contra el resto de la
          página. */}
      <LluviaCodigo />

      <div className="relative mx-auto flex min-h-[43.5rem] w-full flex-col items-center px-6 pt-10 pb-16 md:aspect-[1920/808] md:min-h-0 md:px-0 md:pb-[4vw] md:pt-[4.55vw]">
        <div className="relative z-10 flex flex-col items-center">
          <h2
            id="lista-espera-titulo"
            className="max-w-[32rem] font-display text-[6.4vw] leading-[1.28] font-bold tracking-normal uppercase md:max-w-[20.7em] md:text-[clamp(0.95rem,1.4583vw,1.9rem)] md:leading-[1.32]"
          >
            <span className="text-vo-lumen">Volver al Origen 3.0</span>{" "}
            <span className="text-vo-bone">abrirá sus puertas próximamente.</span>
          </h2>

          <p className="mt-4 max-w-[26rem] font-sans text-[3.9vw] leading-[1.5] font-medium tracking-normal text-white md:mt-[15px] md:max-w-[34em] md:text-[clamp(0.9rem,1.0417vw,1.3rem)]">
            {LISTA.intro[1]}
          </p>
        </div>

        {/* ⚠️ LA POSICIÓN DE ESCRITORIO (md:top-[38%]) ESTÁ APROBADA — NO
            "ARREGLAR". La de móvil es otra historia y costó dos pasadas.

            EN MÓVIL LA PALABRA NO PUEDE IR ARRIBA. Se probó subiéndola al 24,6%
            y ahí no la tapaban las cards: la tapaba el PÁRRAFO, que es peor,
            porque el párrafo sí hay que leerlo. La palabra es marca de agua y su
            sitio es el hueco entre el texto y las cards — que a esa altura no
            existía porque el párrafo llegaba hasta donde empiezan ellas.

            Y EN MÓVIL NO PUEDE IR EN ABSOLUTO. Se intentó con porcentajes y falla
            siempre por lo mismo: el porcentaje se mide contra el alto REAL de la
            sección, que aquí lo fija el contenido —tres cards apiladas, no una
            fila de tres— así que ronda los 960 px y no los 696 del min-h. Cada
            vez que se movía algo, el mismo porcentaje señalaba otro sitio y la
            palabra volvía a esconderse detrás de una card.

            Así que en móvil entra en el FLUJO, entre el párrafo y la rejilla: su
            posición ya no la calcula nadie, la ocupa. Y el margen inferior
            negativo es lo que le devuelve el remate del diseño: -0,78em hace que
            las cards suban y le muerdan el tercio de abajo, igual que en
            escritorio. Va en em y no en píxeles porque se mide contra la propia
            palabra: si cambia su tamaño, el mordisco se mantiene proporcional.

            En escritorio sigue en absoluto al 30,45%, que es donde tiene que
            morderla la fila de tres cards.

            ⚠️ POSICIÓN APROBADA — NO "ARREGLAR". La palabra asoma medio tapada por
            las cards y así tiene que quedarse en escritorio; validado a 1920.

            LA PALABRA SE METE UN POCO DETRÁS DE LAS CARDS, y es a propósito: es
            una marca de agua, y que el borde superior de las cards le muerda el
            pie es lo que la asienta detrás en vez de dejarla flotando como una
            línea de texto más.

            El equilibrio es fino. A 1920 el hueco libre entre el intro y las
            cards es de 108 px y su caja mide 118, así que estaba puesta tan abajo
            que sólo asomaban las puntas de las letras y no se leía. El 30,45%
            deja los trazos legibles y sólo tapa el remate de abajo.

            Si se toca, se toca poco: unos pocos puntos porcentuales arriba la
            estampan contra el párrafo del intro, y unos pocos abajo vuelven a
            hacerla ilegible. */}
        {/* EL VELO ES OSCURO, NO VERDE.

            Llevaba un degradado verde con mix-blend-screen —"screen" sólo suma
            luz— y el tercio superior de la sección quedaba lavado: sobre ese
            verde aguado, el titular perdía contraste y las cards y su filete
            giratorio dejaban de recortarse contra el fondo. La sección tiene
            verde de sobra en el banner, en la lluvia de código y en los propios
            bordes de las cards; el fondo no tenía que aportar más.

            Ahora RESTA luz en vez de sumarla: oscurece de arriba abajo para
            asentar el bloque sobre el banner. El resultado es un fondo oscuro
            parejo del que la palabra BONUS y los filetes salen encendidos.

            Se va con el mix-blend-screen: un velo que oscurece con "screen" es
            una contradicción —ese modo no puede oscurecer— y no haría nada. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[62%] bg-[linear-gradient(180deg,rgba(6,10,4,0.55)_0%,rgba(6,10,4,0.35)_38%,rgba(6,10,4,0.14)_70%,transparent_100%)]"
        />

        {/* LA PALABRA SE APAGA HACIA ABAJO.

            Era de un verde plano al 70% y se cortaba en seco donde la muerden
            las cards, así que se leía como un texto tapado por delante. Con el
            degradado —verde encendido arriba, apagándose hasta desaparecer en el
            pie— la palabra parece disolverse en el fondo justo donde entran las
            cards, y el mordisco deja de ser un recorte para ser un
            desvanecimiento. Es lo que remata su papel de marca de agua.

            EL DEGRADADO SE APLICA A LA LETRA CON background-clip:text: se pinta
            un fondo en la caja y luego se recorta a la silueta del texto, con el
            color propio en transparente para que deje ver ese fondo. Es la única
            forma de que un texto lleve degradado — `color` sólo admite un color.

            LA PARADA FINAL ES EL MISMO VERDE EN ALFA 0 Y NO `transparent`. En
            varios navegadores la palabra clave `transparent` es negro
            transparente, así que el degradado pasaría por gris sucio antes de
            desaparecer. Declarando el color con alfa 0 se apaga en su propio
            tono.

            Va con las utilidades de Tailwind (bg-clip-text + text-transparent) y
            no en globals.css porque aquí el valor no lleva comas de nivel
            superior que rompan el parseo: el linear-gradient es una sola capa. */}
        <div
          aria-hidden
          className="relative z-0 mt-8 -mb-[0.78em] bg-[linear-gradient(180deg,#8fc218_0%,#6f990c_42%,rgba(111,153,12,0.35)_78%,rgba(111,153,12,0)_100%)] bg-clip-text font-display text-[clamp(4.9rem,17vw,7rem)] leading-none tracking-normal text-transparent md:absolute md:top-[38%] md:left-1/2 md:mt-0 md:-translate-x-1/2 md:text-[clamp(3.2rem,6.15vw,7.5rem)]"
        >
          BONUS
        </div>

        {/* EL FILETE VA PEGADO AL CUERPO, sin anillo separado. Llegó a llevarlo
            —con su hueco de cristal, como el botón— y se retiró: ese doble borde
            es cosa del botón y aquí no va.

            Se hace con un envoltorio de 1 px y no con `border` porque un borde no
            puede degradar, y este filete además gira (ver .le-borde-giro en
            globals.css). `border-image` sí degrada, pero ignora el redondeo de
            las esquinas y lo dejaría en ángulo recto sobre una card
            redondeada. */}
        {/* LAS CARDS RESPONDEN AL CURSOR. Cada una se inclina hacia él, se imanta
            un poco, suelta partículas mientras esté encima y devuelve una onda al
            pulsarla; además, un foco compartido recorre la fila y enciende el
            borde de la que esté más cerca. Todo eso vive en BentoMagico.tsx.

            SON DOS CAPAS Y CADA UNA LLEVA LO SUYO:
            · el envoltorio exterior conserva .le-borde-giro, que es el filete que
              gira en bucle — el estado de reposo de la card, mire quien mire.
            · el interior lleva .le-bento-card, que es el borde que responde al
              cursor.

            Separados porque cada uno necesita su propio ::after: puestos en el
            mismo elemento, uno pisaría al otro. En reposo se ve el giratorio; al
            acercar el cursor, el segundo se enciende encima.

            El overflow:hidden de .le-bento-card recorta las partículas y la onda
            dentro de la card, que es lo que las mantiene en su sitio. */}
        <RejillaBonus>
          {LISTA.bonos.map((bonus, index) => {
            const Icono = BONUS_ICONOS[index];
            return (
              <CardBonus
                key={bonus.title}
                className="le-borde-giro h-full rounded-[1.05rem] p-px md:rounded-[0.78vw]"
              >
                <article className="le-bento-card flex h-full min-h-[7.8rem] flex-col items-center justify-center rounded-[calc(1.05rem-1px)] bg-[radial-gradient(120%_85%_at_50%_112%,#16250a_0%,#080d04_48%,#030502_100%)] px-7 py-7 md:min-h-[12.75vw] md:rounded-[calc(0.78vw-1px)] md:px-[1.8vw] md:py-[1.25vw]">
                  {/* Disco oscuro con el icono en lima: los mismos papeles
                      invertidos que los tildes de "es para vos si…". */}
                  {Icono && (
                    <span
                      aria-hidden
                      className="mb-4 flex size-11 items-center justify-center rounded-full border border-[#3f5a17] bg-[#0d1505] text-vo-lumen md:mb-[0.9vw] md:size-[2.6vw]"
                    >
                      <Icono
                        strokeWidth={1.6}
                        className="size-5 md:size-[1.25vw]"
                      />
                    </span>
                  )}

                  <h3 className="font-display text-[clamp(0.86rem,3.6vw,1.1rem)] leading-[1.04] tracking-normal text-vo-lumen uppercase md:text-[clamp(0.9rem,1.25vw,1.6rem)]">
                    {BONUS_TITLE_LINES[index]?.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>

                  <p className="mt-4 max-w-[17rem] font-sans text-[3.6vw] leading-[1.5] font-medium tracking-normal text-white md:mt-[1.1vw] md:max-w-[86%] md:text-[clamp(0.75rem,0.9375vw,1.15rem)]">
                    {bonus.text}
                  </p>
                </article>
              </CardBonus>
            );
          })}
        </RejillaBonus>

        {/* El botón toma el ancho de la rejilla de cards: mismo max-w-[34rem] y mismo
            w-full. Así en móvil cierra la columna a ras con ellas en vez de
            quedar flotando más estrecho en el centro.

            AIRE ARRIBA Y ABAJO, Y NO SON LA MISMA COSA:

            · arriba lo separa de las cards. Sube de 1,45vw a 40px porque pegado
              a ellas se leía como una cuarta card de la rejilla en vez de como
              la acción que la cierra.
            · abajo abre los 75 px de separación con la sección siguiente. Va en
              este contenedor y no como padding de la sección porque en
              escritorio la sección tiene su alto atado a la proporción del
              banner (aspect-[1920/808]): un padding ahí no abriría hueco, lo
              robaría del contenido.

            EN PÍXELES Y NO EN vw a propósito: son separaciones, no medidas del
            diseño. En vw los 75 se quedarían en 50 a 1280 y el corte entre
            secciones se apretaría justo en las pantallas más comunes. */}
        <div className="relative z-10 mt-10 mb-[75px] w-full max-w-[34rem] md:mt-[40px] md:mb-[75px] md:w-auto md:max-w-none">
          <CtaLista>
            {LISTA.cta}
          </CtaLista>
        </div>
      </div>
    </section>
  );
}
