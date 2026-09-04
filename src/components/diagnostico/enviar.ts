import type { DatosContacto } from "@/components/diagnostico/almacen";
import type { Respuestas } from "@/components/diagnostico/puntaje";

/*
  El envío al servidor, en un solo sitio.

  Vive aparte de los componentes porque ahora hay DOS puntos desde los que se
  completa el formulario —la landing y, como red, la propia página del test— y
  los dos tienen que mandar exactamente el mismo payload. Duplicar el fetch en
  ambos es la forma segura de que dentro de un mes uno de los dos mande un
  campo de menos.

  ── NUNCA SE ESPERA Y NUNCA SE MUESTRA UN ERROR ──

  El visitante ya rellenó el formulario, o ya terminó el test: un fallo de red
  contra nuestro propio servidor es un problema nuestro, no suyo. Enseñarle un
  error sólo consigue que se vaya o que reintente en bucle. El servidor
  respalda el lead antes de intentar nada con el CRM y deja rastro en los logs.

  ── keepalive ──

  Hace que el navegador termine la petición aunque el documento se descargue.
  Importa en los dos casos: al terminar el formulario navegamos enseguida a las
  preguntas, y al terminar el test navegamos a los resultados. Sin él, una
  navegación rápida puede cancelar el envío a medio camino.
*/

function postear(cuerpo: Record<string, unknown>) {
  fetch("/api/diagnostico", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cuerpo),
    keepalive: true,
  }).catch(() => {
    /* Silencio deliberado. Ver arriba. */
  });
}

/**
 * Primer envío: el contacto, en cuanto está completo y ANTES del test.
 *
 * Es lo que salva al que abandona en la pregunta 3. Si sólo mandáramos al
 * final, esa gente —que ya dejó nombre, email y teléfono— se perdería entera.
 */
export function enviarFormulario(datos: DatosContacto) {
  postear({
    etapa: "formulario",
    nombre: datos.nombre.trim(),
    email: datos.email.trim(),
    telefono: datos.telefono.trim(),
    respuestas: {},
    source: "diagnostico",
  });
}

/**
 * Segundo envío: el mismo contacto, ya con el diagnóstico.
 *
 * Va con las respuestas CRUDAS y no con el veredicto. Dos motivos: el servidor
 * recalcula el resultado por su cuenta —no se fía de lo que diga el navegador,
 * porque de eso depende qué video se envía— y, si algún día cambia el modelo
 * de puntaje, los leads viejos se pueden recalcular. Con el veredicto solo, no.
 */
export function enviarResultado(datos: DatosContacto, respuestas: Respuestas) {
  postear({
    etapa: "resultado",
    nombre: datos.nombre.trim(),
    email: datos.email.trim(),
    telefono: datos.telefono.trim(),
    respuestas,
    source: "diagnostico",
  });
}
