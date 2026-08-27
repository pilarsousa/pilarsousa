import { CtaLista } from "@/components/lista-de-espera/ui/CtaLista";
import { Tramos } from "@/components/lista-de-espera/ui/Tramos";
import { LluviaCodigo } from "@/components/lista-de-espera/ui/LluviaCodigo";
import { ENTRENAR } from "@/components/lista-de-espera/content";

/*
  Sección 2 — No venís a aprender más. Venís a entrenar.

  NO TRAE FONDO PROPIO. Vive dentro de PanelCodigo, que es quien pone banner-2 y
  quien fija el alto; aquí sólo va el contenido, colocado en absoluto sobre esa
  imagen. La sección 3 hace lo mismo sobre la MITAD INFERIOR del mismo archivo:
  las dos comparten un único fondo, y por eso ninguna de las dos puede ser dueña
  de él.

  LOS DOS PANELES SON UNA SOLA FRASE PARTIDA EN DOS COLUMNAS. El de la izquierda
  desgrana el diagnóstico y termina en "El problema ya no es falta de
  información."; el de la derecha lo remata: "ES LA IDENTIDAD DESDE LA QUE ESTÁS
  VIVIENDO". Por eso el segundo titular arranca a media frase y no se presenta —
  repetir el sujeto rompería el efecto.

  De ahí sale también el contraste de fondos: el diagnóstico va sobre BLANCO —lo
  que el lector ya sabe, a plena luz— y la respuesta sobre la lluvia de código.
  No es decoración: es la misma idea contada con el fondo. Ese blanco no se
  pinta aquí, son los píxeles transparentes del banner.

  LAS DOS COLUMNAS VAN EN PORCENTAJES DEL ANCHO DE LA VENTANA, no en una rejilla
  dentro de un contenedor fijo: la izquierda al 20,4% con un ancho del 22,8%, la
  derecha al 55,6% con un 23,9%. Son los del montaje, y tienen que ir así porque
  el hueco entre ambas no es un `gap` cualquiera — por él pasa la diagonal del
  fondo, que también está en porcentaje de la imagen. Con una caja de ancho fijo,
  columnas y diagonal se descuadran en cuanto la ventana no mide 1900.

  Y el desplazamiento vertical va en `top`, no en `padding-top`: un padding en
  porcentaje se mide contra el ANCHO del contenedor, no contra su alto.

  ── EN MÓVIL SON DOS BLOQUES CON FONDOS OPUESTOS ──

  El diagnóstico va sobre blanco y la respuesta sobre negro con lluvia de código,
  apilados. No es sólo por seguir el reparto del escritorio: juntos son ocho
  párrafos seguidos, y en una columna de 390 px eso es un muro. El corte de
  blanco a negro cae justo donde el texto gira —del problema a la causa— así que
  el respiro visual coincide con el respiro del argumento.

  pointer-events: la sección se extiende sobre todo el banner para poder colocar
  en porcentajes, pero eso la deja tapando también la mitad de abajo, que es de
  la sección 3. Se desactiva el ratón en la caja y se reactiva en las columnas,
  así el rectángulo vacío no intercepta nada.
*/
export function Diagnostico() {
  return (
    <section
      aria-label={ENTRENAR.nombre}
      className="relative md:pointer-events-none md:absolute md:inset-0"
    >
      {/* ── Izquierda: el diagnóstico, sobre blanco ── */}
      <div className="bg-white px-[6.5vw] py-[13vw] md:pointer-events-auto md:absolute md:top-[13.5%] md:left-[20.4%] md:w-[22.8%] md:bg-transparent md:p-0">
        {/* El titular de esta sección es MÁS GRANDE que el del hero —1,25vw
            frente a 1,15— y no es un descuido del montaje: el hero se apoya en
            la foto para captar, y aquí el titular carga solo con el peso de la
            sección. Con 0,95vw se leía como un antetítulo. */}
        <h2 className="font-display text-[5.4vw] leading-[1.28] text-[#141b0a] md:text-[clamp(0.95rem,1.4583vw,1.9rem)] md:leading-[1.3] md:font-bold">
          {ENTRENAR.izquierda.titulo}
        </h2>

        <div className="mt-[4.5vw] space-y-[3.2vw] md:mt-[1.3vw] md:space-y-[0.8vw]">
          {ENTRENAR.izquierda.parrafos.map((partes) => (
            <p
              key={partes[0].text}
              className="font-sans text-[3.75vw] leading-[1.6] text-[#3d4436] md:text-[clamp(0.68rem,0.9375vw,1.2rem)] md:font-medium"
            >
              {/* El resaltado de este panel no puede ser el verde de la marca:
                  sobre blanco pierde contraste y se lee como un error. Aquí
                  destaca por peso y tinta plena. */}
              <Tramos
                partes={partes}
                acento="font-bold italic text-[#141b0a]"
                fuerte="font-bold text-[#141b0a]"
              />
            </p>
          ))}
        </div>
      </div>

      {/* ── Derecha: la respuesta, sobre la lluvia de código ── */}
      <div className="relative isolate overflow-hidden bg-black px-[6.5vw] py-[13vw] md:pointer-events-auto md:absolute md:top-[13.5%] md:left-[55.6%] md:mt-0 md:w-[23.9%] md:overflow-visible md:bg-transparent md:p-0">
        <div aria-hidden className="absolute inset-0 md:hidden">
          <LluviaCodigo opacidad={0.38} />
        </div>

        <h2 className="relative font-display text-[5.4vw] leading-[1.28] text-[#f4f1e4] md:text-[clamp(0.95rem,1.4583vw,1.9rem)] md:leading-[1.3] md:font-bold">
          {ENTRENAR.derecha.titulo}
        </h2>

        <div className="relative mt-[4.5vw] space-y-[3.2vw] md:mt-[1.3vw] md:space-y-[0.8vw]">
          {ENTRENAR.derecha.parrafos.map((partes) => (
            <p
              key={partes[0].text}
              className="relative font-sans text-[3.75vw] leading-[1.6] text-[#cfd3c6] md:text-[clamp(0.68rem,0.9375vw,1.2rem)] md:font-medium"
            >
              <Tramos
                partes={partes}
                acento="font-bold italic text-white"
                fuerte="font-bold text-white"
              />
            </p>
          ))}
        </div>

        <div className="relative mt-[7vw] md:mt-[15px]">
          <CtaLista>{ENTRENAR.derecha.cta}</CtaLista>
        </div>
      </div>
    </section>
  );
}
