import { ListaParaVos } from "@/components/lista-de-espera/ui/ListaParaVos";
import { LluviaCodigo } from "@/components/lista-de-espera/ui/LluviaCodigo";
import { PARA_VOS } from "@/components/lista-de-espera/content";

/*
  Sección 3 — Volver al Origen es para vos si…

  COMPARTE FONDO CON LA SECCIÓN 2: es la mitad inferior de banner-2, la banda de
  lluvia de código que va a todo el ancho. Por eso no pinta nada propio y se
  coloca en absoluto dentro de PanelCodigo, arrancando al 69,5% del alto.

  SON SEIS AFIRMACIONES, NO UNA LISTA DE VENTAJAS, y se leen POR FILAS: la
  columna izquierda y la derecha de cada fila son dos formas distintas de decir
  lo mismo, así que romper el orden desparejaría los pares. Van en una rejilla de
  dos columnas —`grid-flow-row`, el que trae `grid` por defecto— y no en dos
  listas apiladas, que es lo que las leería por columnas.

  Se mantiene como <ul>: es un conjunto sin orden en el que el número de
  elementos importa, y un lector de pantalla anuncia "lista de 6 elementos".

  EL VERDE VA AQUÍ EN LOS TARJETONES Y NO EN EL TEXTO. Sobre la lluvia de código,
  un texto verde se pierde contra el fondo —que ya es verde— así que el montaje
  invierte la jugada: bloque verde macizo y letra oscura encima. Es el mismo
  recurso que el botón, y por eso comparten degradado y contorno.
*/
export function ParaVos() {
  return (
    <section
      aria-labelledby="para-vos-titulo"
      className="relative isolate overflow-hidden bg-black px-[6.5vw] py-[13vw] md:pointer-events-none md:absolute md:top-[69.5%] md:left-[20.35%] md:w-[59.3%] md:overflow-visible md:bg-transparent md:p-0"
    >
      {/* LA LLUVIA SÓLO EN MÓVIL: aquí abajo esta sección ya no se apoya en
          banner-2 —que no se carga— así que el fondo negro se quedaría liso. En
          escritorio sobra, porque la lluvia ya viene dibujada en el banner. */}
      <div aria-hidden className="absolute inset-0 md:hidden">
        <LluviaCodigo opacidad={0.42} />
      </div>

      <h2
        id="para-vos-titulo"
        className="relative text-center font-display text-[6vw] leading-[1.25] text-[#f4f1e4] md:text-[clamp(0.8rem,1.32vw,1.7rem)] md:leading-[1.3]"
      >
        {PARA_VOS.title}
        {/* En móvil la frase entra justa en el ancho y parte por donde cae; el
            salto forzado la corta por su junta natural, entre el nombre del
            programa y lo que se afirma de él. */}
        <br className="md:hidden" />
        <span className="text-[#b8ea3c]">{PARA_VOS.titleAccent}</span>
      </h2>

      <ListaParaVos items={PARA_VOS.items} />
    </section>
  );
}
