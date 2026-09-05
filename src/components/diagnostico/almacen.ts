/*
  Guardado del avance en sessionStorage.

  ── PARA QUÉ ──

  El embudo son once pantallas seguidas. Sin esto, una recarga en la pregunta 5
  —o volver desde el correo para comprobar cómo se escribía el email— borra
  todo y obliga a empezar de cero. Ahí se pierde el lead.

  ── POR QUÉ sessionStorage Y NO localStorage ──

  El resultado caduca con la visita. Con localStorage, alguien que vuelve dos
  semanas después se encontraría a medias de un test que ya no recuerda haber
  empezado, y —peor— el resultado viejo seguiría en la página de resultados
  aunque hubiera vuelto a hacer el diagnóstico. sessionStorage se vacía al
  cerrar la pestaña, que es exactamente la vida útil que tiene este dato.

  ── TODO VA ENVUELTO EN try/catch ──

  Y no por precaución genérica: el acceso a sessionStorage LANZA, no devuelve
  null, en navegación privada de Safari y con las cookies de terceros
  bloqueadas en un iframe. Una excepción sin capturar aquí tumbaría el
  formulario entero por no poder guardar un borrador — que es un extra, nunca
  un motivo para perder al visitante.

  Por eso ninguna función de este archivo lanza jamás: como mucho, no guarda.
*/

import type { Respuestas } from "./puntaje";

/* La versión va en la clave. Si mañana cambian las preguntas, los borradores
   guardados con el cuestionario viejo dejan de leerse solos en vez de mezclar
   respuestas de dos cuestionarios distintos. Subir el número es todo. */
const CLAVE = "vo-diagnostico-v1";

export type DatosContacto = {
  nombre: string;
  email: string;
  telefono: string;
};

/*
  ⚠️ AQUÍ NO SE GUARDA EN QUÉ PASO IBA EL VISITANTE, y quitarlo fue un arreglo,
  no un descuido.

  Se guardaba, y producía un fallo feo: la página de las preguntas escribía el
  borrador con el paso fijado al ÚLTIMO campo del formulario, así que al volver
  a la landing el formulario se abría directamente en el teléfono, como si el
  nombre y el email ya estuvieran dados por buenos. El número decía una cosa y
  los datos otra.

  Ahora ninguno de los dos lectores se fía de un índice guardado: cada uno
  deduce dónde estaba a partir de los DATOS, que es lo único que no puede
  mentir.

    · el formulario abre en el primer campo que todavía no valida
    · el test abre en la primera pregunta sin responder

  Es más código en cada lector, pero se corrige solo: un borrador a medias, de
  una versión anterior o manipulado a mano no puede dejar a nadie en una
  pantalla que no le corresponde.
*/
export type EstadoGuardado = {
  datos: DatosContacto;
  respuestas: Respuestas;
  /* Marca de tiempo del guardado. Hoy no se usa para caducar nada —de eso ya
     se ocupa sessionStorage— pero sirve para depurar un borrador raro. */
  en: number;
};

export function guardarEstado(estado: Omit<EstadoGuardado, "en">): void {
  try {
    sessionStorage.setItem(
      CLAVE,
      JSON.stringify({ ...estado, en: Date.now() }),
    );
  } catch {
    /* Sin almacenamiento el test sigue funcionando; sólo no sobrevive a una
       recarga. No hay nada que informar al visitante. */
  }
}

export function leerEstado(): EstadoGuardado | null {
  try {
    const crudo = sessionStorage.getItem(CLAVE);
    if (!crudo) return null;

    const dato = JSON.parse(crudo) as unknown;
    if (typeof dato !== "object" || dato === null) return null;

    const d = dato as Partial<EstadoGuardado>;
    /* Se valida la forma en vez de confiar en el JSON: lo guardado puede venir
       de una versión anterior del componente o de otra pestaña, y un objeto
       con la forma equivocada rompería a quien lo lea.

       Un borrador viejo que todavía traiga el campo `paso` se lee sin
       problema: los campos que sobran se ignoran. */
    if (typeof d.datos !== "object" || d.datos === null) return null;
    if (typeof d.respuestas !== "object" || d.respuestas === null) return null;

    return {
      datos: {
        nombre: String(d.datos.nombre ?? ""),
        email: String(d.datos.email ?? ""),
        telefono: String(d.datos.telefono ?? ""),
      },
      respuestas: d.respuestas as Respuestas,
      en: typeof d.en === "number" ? d.en : 0,
    };
  } catch {
    return null;
  }
}

/**
 * ¿Funciona el almacenamiento de sesión en este navegador?
 *
 * Escribe una marca, la lee y la borra. Es la única forma de saberlo: el
 * acceso LANZA —no devuelve null— en navegación privada de Safari y con las
 * cookies de terceros bloqueadas dentro de un iframe, y ahí no basta con
 * comprobar que el objeto exista.
 *
 * ── PARA QUÉ SE USA ──
 *
 * Para distinguir dos situaciones que se ven idénticas desde el cuestionario:
 * "no hay datos porque no los has dado" y "no hay datos porque tu navegador no
 * los guarda". En la primera hay que mandar a la landing; en la segunda, jamás
 * —sería un bucle: rellenaría, no se guardaría, y volvería aquí sin datos una
 * y otra vez— y hay que montarle el formulario en el sitio.
 */
export function almacenDisponible(): boolean {
  try {
    const prueba = "vo-prueba-almacen";
    sessionStorage.setItem(prueba, "1");
    const leido = sessionStorage.getItem(prueba);
    sessionStorage.removeItem(prueba);
    return leido === "1";
  } catch {
    return false;
  }
}

export function limpiarEstado(): void {
  try {
    sessionStorage.removeItem(CLAVE);
  } catch {
    /* Ver arriba. */
  }
}

/* ───────────────────────── El resultado, aparte ──────────────────────────

   Se guarda con su propia clave y no dentro del estado del test, porque tiene
   otra vida: el borrador del test se borra al terminar, y el resultado tiene
   que sobrevivir a la navegación hacia /diagnostico/resultado y a una recarga
   de esa página. */
const CLAVE_RESULTADO = "vo-diagnostico-resultado-v1";

export type ResultadoGuardado = {
  frecuencia: string;
  nombre: string;
  email: string;
  porcentajes: Record<string, number>;
};

export function guardarResultado(resultado: ResultadoGuardado): void {
  try {
    sessionStorage.setItem(CLAVE_RESULTADO, JSON.stringify(resultado));
  } catch {
    /* Si no se puede guardar, la página de resultados tira del parámetro `f`
       de la URL, que es justo la red para este caso. */
  }
}

export function leerResultado(): ResultadoGuardado | null {
  try {
    const crudo = sessionStorage.getItem(CLAVE_RESULTADO);
    if (!crudo) return null;
    const d = JSON.parse(crudo) as Partial<ResultadoGuardado>;
    if (typeof d.frecuencia !== "string" || d.frecuencia === "") return null;
    return {
      frecuencia: d.frecuencia,
      nombre: String(d.nombre ?? ""),
      email: String(d.email ?? ""),
      porcentajes:
        typeof d.porcentajes === "object" && d.porcentajes !== null
          ? (d.porcentajes as Record<string, number>)
          : {},
    };
  } catch {
    return null;
  }
}
