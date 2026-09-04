/*
  ═══════════════════════════════════════════════════════════════════════════
  EL CÁLCULO DEL DIAGNÓSTICO
  ═══════════════════════════════════════════════════════════════════════════

  EL MODELO, tal como lo confirmó el cliente:

    · Cada respuesta suma 1 punto a la frecuencia de la opción elegida.
    · El porcentaje de una frecuencia es sus puntos sobre el total.
    · Gana el porcentaje más alto. Esa es la frecuencia dominante, y es la que
      decide qué video recibe la persona por email.

  Se implementa con pesos en vez de con un contador porque el documento del
  cliente mencionaba "puntaje sugerido 1 a 10 por respuesta". Hoy todos los
  pesos son 1 y el resultado es idéntico a contar votos; si mañana aparecen
  pesos reales en el Notion, se rellenan en contenido.ts y aquí no se toca nada.

  ── POR QUÉ EL DESEMPATE NO ES UN DETALLE ──

  Con 7 preguntas repartidas entre 4 frecuencias, hay dos repartos que empatan:
  3-3-1-0 (empate doble) y 2-2-2-1 (empate TRIPLE). Contando las combinaciones
  posibles, si alguien respondiera al azar empataría en 4.200 de 16.384 casos:
  un 25,6%.

  Las respuestas reales se agrupan y el porcentaje será menor, pero sigue
  siendo mucha gente llegando a la página de resultados. Sin regla, esa gente
  recibe un video arbitrario. La regla vive en ORDEN_DESEMPATE (contenido.ts),
  la decide Pilar, y es determinista: las mismas respuestas dan siempre el
  mismo resultado, de modo que una queja se puede reproducir y explicar.
*/

import {
  FRECUENCIAS,
  ORDEN_DESEMPATE,
  PREGUNTAS,
  type Frecuencia,
  type Pregunta,
} from "./contenido";

/** Respuestas del visitante: id de pregunta → id de opción elegida. */
export type Respuestas = Record<string, string>;

export type Diagnostico = {
  /* La frecuencia que gana. Es lo que se guarda en GoHighLevel y lo que decide
     el video. */
  dominante: Frecuencia;
  /* Puntos crudos por frecuencia. Suman el total de preguntas respondidas. */
  puntos: Record<Frecuencia, number>;
  /* Porcentaje sobre el total, redondeado a entero para mostrar. Puede no
     sumar exactamente 100 por el redondeo (3 de 7 → 43%, cuatro veces 43 no da
     100): no se muestra como una tarta, así que no importa. */
  porcentajes: Record<Frecuencia, number>;
  /* true si la dominante salió de un desempate, o sea si había otra frecuencia
     con los mismos puntos. Se guarda en el CRM para poder medir cuántos casos
     llegan por esta vía — si son demasiados, el cuestionario necesita más
     preguntas o pesos. */
  huboEmpate: boolean;
  /* Las frecuencias que empataron en lo más alto, dominante incluida. */
  empatadas: Frecuencia[];
};

/** Mapa id de opción → opción, para no recorrer el cuestionario en cada suma. */
function indexarOpciones(preguntas: Pregunta[]) {
  const mapa = new Map<string, { frecuencia: Frecuencia; peso: number }>();
  for (const pregunta of preguntas) {
    for (const opcion of pregunta.opciones) {
      mapa.set(opcion.id, {
        frecuencia: opcion.frecuencia,
        /* `?? 1` y no `|| 1`: un peso 0 es un valor legítimo —una opción que no
           puntúa— y `||` lo convertiría en 1 sin avisar. */
        peso: opcion.peso ?? 1,
      });
    }
  }
  return mapa;
}

function marcadorEnCero(): Record<Frecuencia, number> {
  return Object.fromEntries(FRECUENCIAS.map((f) => [f, 0])) as Record<
    Frecuencia,
    number
  >;
}

/**
 * Calcula el diagnóstico a partir de las respuestas.
 *
 * Devuelve null si no hay ninguna respuesta válida — es el único caso en que
 * no hay nada que medir. Con respuestas parciales SÍ calcula: es preferible un
 * diagnóstico sobre 5 preguntas que ninguno, y el porcentaje se saca sobre lo
 * respondido, no sobre las 7.
 *
 * Se ejecuta igual en el navegador y en el servidor: el navegador lo usa para
 * enseñar el resultado sin esperar, y el servidor lo recalcula desde las
 * respuestas crudas antes de mandarlo al CRM, para que lo que se guarda no
 * dependa de lo que diga el cliente.
 */
export function calcularDiagnostico(
  respuestas: Respuestas,
  preguntas: Pregunta[] = PREGUNTAS,
): Diagnostico | null {
  const opciones = indexarOpciones(preguntas);
  const puntos = marcadorEnCero();
  let total = 0;

  for (const idOpcion of Object.values(respuestas)) {
    const opcion = opciones.get(idOpcion);
    /* Una opción que no existe se ignora en silencio en vez de romper: el
       payload puede venir de una versión anterior del cuestionario, o de
       alguien manipulando la petición. */
    if (!opcion) continue;
    puntos[opcion.frecuencia] += opcion.peso;
    total += opcion.peso;
  }

  if (total === 0) return null;

  const maximo = Math.max(...FRECUENCIAS.map((f) => puntos[f]));
  const empatadas = FRECUENCIAS.filter((f) => puntos[f] === maximo);

  /*
    EL DESEMPATE. `find` recorre ORDEN_DESEMPATE —la lista de prioridad que
    decide Pilar— y se queda con la primera empatada que aparezca.

    El `?? empatadas[0]` es una red por si alguien añade una frecuencia nueva a
    FRECUENCIAS y se olvida de ponerla en ORDEN_DESEMPATE: sin él, la función
    devolvería undefined y la página de resultados se caería. Con él, sale un
    ganador razonable y el fallo queda contenido.
  */
  const dominante =
    ORDEN_DESEMPATE.find((f) => empatadas.includes(f)) ?? empatadas[0];

  const porcentajes = marcadorEnCero();
  for (const f of FRECUENCIAS) {
    porcentajes[f] = Math.round((puntos[f] / total) * 100);
  }

  return {
    dominante,
    puntos,
    porcentajes,
    huboEmpate: empatadas.length > 1,
    empatadas,
  };
}

/*
  PRUEBA DE INTEGRIDAD DEL CUESTIONARIO.

  Comprueba la regla que hace que el test mida a la persona y no al
  cuestionario: cada pregunta tiene que ofrecer las cuatro frecuencias, una por
  opción. Si una pregunta repitiera "miedo" y omitiera "apatía", el miedo
  tendría el doble de oportunidades de sumar en esa pregunta y la apatía
  ninguna — y el sesgo sería invisible mirando los resultados.

  Se llama sola en desarrollo (ver más abajo). En producción no corre: es una
  comprobación de datos, y los datos no cambian entre un despliegue y otro.
*/
export function verificarCuestionario(
  preguntas: Pregunta[] = PREGUNTAS,
): string[] {
  const problemas: string[] = [];
  const idsVistos = new Set<string>();

  for (const pregunta of preguntas) {
    if (idsVistos.has(pregunta.id)) {
      problemas.push(`Pregunta con id repetido: "${pregunta.id}".`);
    }
    idsVistos.add(pregunta.id);

    const suyas = pregunta.opciones.map((o) => o.frecuencia);
    for (const f of FRECUENCIAS) {
      const veces = suyas.filter((s) => s === f).length;
      if (veces !== 1) {
        problemas.push(
          `"${pregunta.id}" ofrece la frecuencia "${f}" ${veces} veces; tiene que ser exactamente 1.`,
        );
      }
    }

    for (const opcion of pregunta.opciones) {
      if (idsVistos.has(opcion.id)) {
        problemas.push(`Opción con id repetido: "${opcion.id}".`);
      }
      idsVistos.add(opcion.id);
    }
  }

  for (const f of FRECUENCIAS) {
    if (!ORDEN_DESEMPATE.includes(f)) {
      problemas.push(
        `La frecuencia "${f}" no está en ORDEN_DESEMPATE: no se sabría desempatarla.`,
      );
    }
  }

  return problemas;
}

/* Aviso en la consola durante el desarrollo. Va aquí y no en un test aparte
   porque el proyecto no tiene corredor de tests, y un error en los datos del
   cuestionario es justo el tipo de fallo que no se ve mirando la página. */
if (process.env.NODE_ENV !== "production") {
  const problemas = verificarCuestionario();
  if (problemas.length > 0) {
    console.warn(
      "⚠️ Diagnóstico — el cuestionario tiene problemas:\n" +
        problemas.map((p) => `  · ${p}`).join("\n"),
    );
  }
}
