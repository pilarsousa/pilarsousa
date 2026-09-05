"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";
import { cn } from "@/lib/cn";

/*
  ═══════════════════════════════════════════════════════════════════════════
  EL DESENFOQUE DEL BORDE INFERIOR
  ═══════════════════════════════════════════════════════════════════════════

  Una banda pegada al canto de abajo de la ventana donde la página se va
  desenfocando. No tapa: difumina. Lo que hay debajo sigue viéndose, borroso,
  y eso da la sensación de que el contenido continúa más allá del borde en vez
  de estar cortado por él.

  Adaptado de GradualBlur (React Bits).

  ── CÓMO FUNCIONA, QUE NO ES OBVIO ──

  No es UN desenfoque con degradado —eso no existe: `backdrop-filter` no admite
  una intensidad variable a lo largo del elemento—. Son VARIAS capas apiladas,
  cada una con su desenfoque fijo y una máscara que la deja visible sólo en su
  tramo. Al solaparse, el salto entre una y la siguiente desaparece y se lee
  como un desenfoque que crece.

  Con pocas capas se ven los escalones; con muchas, cada una es una pasada de
  composición más. Cinco es el equilibrio que trae el original y aguanta bien.

  ── QUÉ SE QUITÓ DEL ORIGINAL ──

  · LA DEPENDENCIA `mathjs`. La ficha del componente la lista y el código NO la
    importa: usa `Math.pow` y `Math.round`, que son del lenguaje. Habría sido
    sumar una librería entera al bundle por nada.

  · LOS 13 PRESETS, el modo `responsive` (marcado como experimental por los
    propios autores), el observador de intersección, el desenfoque al pasar el
    ratón, las cuatro posiciones y las cinco curvas. Aquí hay UNA banda fija
    abajo que no cambia nunca: todo eso era configuración para casos que esta
    página no tiene, y cada rama que se queda es una que hay que mantener.

  · LA INYECCIÓN DE <style> EN EL <head> AL IMPORTAR EL MÓDULO. Era su forma de
    no depender de un archivo CSS, y tiene dos problemas: corre como efecto
    secundario de importar —antes de que nadie decida montar nada— y en SSR hay
    que protegerlo con un `typeof document`. Las tres reglas que inyectaba caben
    en las clases del propio elemento.

  ── EL PROGRESO ES EXPONENCIAL Y NO LINEAL ──

  La percepción del desenfoque no es lineal: la diferencia entre 0 y 2 px se ve
  muchísimo, y entre 20 y 22 px casi nada. Repartiendo linealmente, la banda
  parece desenfocarse de golpe al principio y luego quedarse quieta. Con la
  progresión exponencial el aumento se percibe constante.
*/

/* Cuántas capas se apilan. Menos deja ver los escalones entre una y otra; más
   es una pasada de composición extra por capa, y `backdrop-filter` no es
   barato en móviles. */
const CAPAS = 5;

export type DesenfoqueInferiorProps = {
  /* Alto de la banda. En `rem` para que acompañe al cuerpo de texto. */
  alto?: string;
  /* Multiplicador del desenfoque. Sube el radio de TODAS las capas a la vez. */
  fuerza?: number;
  className?: string;
};

export function DesenfoqueInferior({
  alto = "6rem",
  fuerza = 2,
  className,
}: DesenfoqueInferiorProps) {
  /*
    Las capas no dependen de nada que cambie en ejecución, así que se calculan
    una vez. El memo evita rehacer cinco objetos de estilo en cada render del
    padre — que en esta página es la landing entera.
  */
  const capas = useMemo(() => {
    const paso = 100 / CAPAS;

    return Array.from({ length: CAPAS }, (_, i) => {
      const n = i + 1;
      /* Curva suave (smoothstep): arranca y termina despacio, así que ni la
         primera capa entra de golpe ni la última se dispara. */
      const bruto = n / CAPAS;
      const progreso = bruto * bruto * (3 - 2 * bruto);

      /* Exponencial: ver la nota de arriba sobre por qué no es lineal.
         El 0,0625 es 1/16 de rem, el escalón más pequeño que tiene sentido
         pedirle a un desenfoque. */
      const radio = Math.pow(2, progreso * 4) * 0.0625 * fuerza;

      /*
        LA MÁSCARA DE CADA CAPA es una ventana que se desplaza.

        Cuatro paradas: transparente, opaca, opaca, transparente. Cada capa
        cubre su tramo y se solapa con la siguiente, que es lo que borra el
        escalón entre dos radios distintos.

        Las dos últimas paradas se omiten cuando se pasarían del 100%: un
        degradado con paradas fuera de rango no falla, pero comprime las que sí
        están dentro y la última capa acaba con una ventana más estrecha que el
        resto.
      */
      const p1 = Math.round((paso * n - paso) * 10) / 10;
      const p2 = Math.round(paso * n * 10) / 10;
      const p3 = Math.round((paso * n + paso) * 10) / 10;
      const p4 = Math.round((paso * n + paso * 2) * 10) / 10;

      let paradas = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) paradas += `, black ${p3}%`;
      if (p4 <= 100) paradas += `, transparent ${p4}%`;

      const mascara = `linear-gradient(to bottom, ${paradas})`;

      return {
        key: n,
        style: {
          position: "absolute",
          inset: 0,
          maskImage: mascara,
          WebkitMaskImage: mascara,
          backdropFilter: `blur(${radio.toFixed(3)}rem)`,
          WebkitBackdropFilter: `blur(${radio.toFixed(3)}rem)`,
        } as CSSProperties,
      };
    });
  }, [fuerza]);

  return (
    /*
      ── `fixed` Y PEGADO AL CANTO DE LA VENTANA ──

      Se queda mientras se hace scroll: es un remate del viewport, no de una
      sección. Por eso tampoco lleva color — lo que se ve a través de él es la
      página, y funciona igual sobre el verde del hero que sobre el panel crema.

      ── NO INTERCEPTA NADA ──

      `pointer-events-none` es obligatorio: la banda cubre los últimos 96 px de
      la pantalla, que en un móvil es justo donde cae el pulgar. Sin esto, el
      botón que quede ahí debajo deja de poder pulsarse y no hay forma de
      entender por qué.

      `aria-hidden` porque no hay nada que anunciar: no añade contenido, sólo
      desenfoca el que ya está.

      ── EL z-index SE QUEDA POR DEBAJO DE LOS AVISOS ──

      El aviso del video (AvisoFlotante) va en z-50 y sube desde este mismo
      canto: si el desenfoque quedara por encima, el aviso aparecería borroso
      justo mientras se lee. En z-40 pasa por debajo.

      ── `isolate` CREA SU PROPIO CONTEXTO DE APILADO ──

      Sin él, las cinco capas de `backdrop-filter` se componen contra el fondo
      raíz y en Safari acaban desenfocándose entre ellas.
    */
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 isolate",
        className,
      )}
      style={{ height: alto }}
    >
      <div className="relative size-full">
        {capas.map((c) => (
          <div key={c.key} style={c.style} />
        ))}
      </div>
    </div>
  );
}
