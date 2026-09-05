/*
  ═══════════════════════════════════════════════════════════════════════════
  DÓNDE ESTÁ EL VISITANTE — deducido de los datos, nunca de un índice guardado
  ═══════════════════════════════════════════════════════════════════════════

  ── POR QUÉ ESTO ES UN ARCHIVO Y NO DOS FUNCIONES SUELTAS EN SUS COMPONENTES ──

  Estaban repartidas entre FormularioContacto y FlujoTest, con las expresiones
  de validación COPIADAS en los dos, y ahí produjeron dos fallos seguidos: el
  formulario abriéndose en el teléfono, y el test empezando en la pregunta 4.
  Los dos tenían la misma forma —una pantalla creyendo saber por dónde iba
  alguien— y ninguno se podía comprobar sin abrir un navegador.

  Aquí son funciones puras: reciben datos y devuelven un número. Se pueden
  ejecutar sueltas, y por tanto se pueden verificar.

  ── LA REGLA QUE LAS ORDENA ──

  NUNCA se confía en un número guardado que diga "ibas por el paso N". Un índice
  y los datos a los que se refiere se desincronizan a la primera —una versión
  nueva del cuestionario, una pestaña a medias, un borrador tocado a mano— y
  cuando se separan, el índice gana y deja a alguien en una pantalla que no le
  corresponde.

  El dato manda: si el email no vale, es que toca el email. Si la pregunta 3 no
  está respondida, es que toca la 3. Eso no se puede desincronizar de sí mismo.
*/

import { isValidPhoneNumber } from "react-phone-number-input";
import { FORMULARIO, PREGUNTAS } from "@/components/diagnostico/contenido";
import type { DatosContacto } from "@/components/diagnostico/almacen";
import type { Respuestas } from "@/components/diagnostico/puntaje";

/* Las mismas reglas que valida /api/diagnostico en el servidor. Están
   duplicadas allí a propósito —el cliente nunca es de fiar— pero dentro del
   navegador viven aquí y en ningún otro sitio. Si cambia una, tiene que
   cambiar la del endpoint. */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/* ⚠️ EL TELÉFONO YA NO SE VALIDA CON UNA EXPRESIÓN REGULAR EN EL NAVEGADOR.
   Se usa `isValidPhoneNumber` (ver más abajo). El servidor SÍ conserva la
   suya, porque allí no se puede dar por hecho que el valor venga del campo con
   selector de país. */

/**
 * Devuelve el mensaje de error de un campo, o null si es válido.
 *
 * El mensaje va aquí y no en contenido.ts porque está pegado a la regla: no se
 * puede cambiar "mínimo 2 caracteres" sin cambiar lo que se le dice a quien
 * escribió una letra.
 */
export function validarCampo(
  campo: keyof DatosContacto,
  valor: string,
): string | null {
  const v = valor.trim();
  if (campo === "nombre") {
    if (v.length < 2) return "Escribe tu nombre para poder seguir.";
    return null;
  }
  if (campo === "email") {
    if (v === "") return "Necesito tu email para enviarte el video.";
    if (!EMAIL_RE.test(v)) return "Revisa el email: parece que falta algo.";
    return null;
  }
  if (v === "") return "Necesito tu teléfono para avisarte por WhatsApp.";
  /*
    Se valida con la librería del selector de país, no con una regex.

    Una expresión regular sólo puede comprobar que haya dígitos suficientes;
    `isValidPhoneNumber` conoce la longitud y los prefijos reales de cada país,
    así que rechaza un número con un dígito de más o de menos — que es el error
    habitual, y el que deja al CRM con un teléfono al que nadie contesta.

    El valor llega en E.164 (+34600111222) porque lo produce el propio campo.
  */
  if (!isValidPhoneNumber(v)) return "Revisa el número: parece incompleto.";
  return null;
}

/** ¿Están los tres campos de contacto completos y bien formados? */
export function datosCompletos(datos: DatosContacto): boolean {
  return FORMULARIO.pasos.every(
    (paso) => validarCampo(paso.campo, datos[paso.campo]) === null,
  );
}

/**
 * En qué campo tiene que abrirse el formulario: el PRIMERO QUE NO VALIDA.
 *
 * Si todos valen devuelve 0 y no el último. Los datos ya están completos, así
 * que no hay nada pendiente; lo único que queda es poder repasarlos desde el
 * principio y seguir. Devolver el último daría la impresión de que los dos
 * primeros se dieron por buenos sin haberlos mirado.
 */
export function pasoDelFormulario(datos: DatosContacto): number {
  const pendiente = FORMULARIO.pasos.findIndex(
    (paso) => validarCampo(paso.campo, datos[paso.campo]) !== null,
  );
  return pendiente === -1 ? 0 : pendiente;
}

/**
 * Cuántas preguntas hay respondidas SEGUIDAS desde la primera.
 *
 * Se cuenta hasta el primer hueco y no el total de respuestas: quien volvió
 * atrás a corregir la 2 y recargó tiene 6 respuestas pero la 3 vacía, y
 * mandarlo a la 7 le saltaría una pregunta sin que se entere.
 *
 * Devolver 0 significa "no ha empezado": ahí va la pantalla puente.
 */
export function preguntasRespondidasSeguidas(respuestas: Respuestas): number {
  let n = 0;
  while (n < PREGUNTAS.length && respuestas[PREGUNTAS[n].id]) n++;
  return n;
}
