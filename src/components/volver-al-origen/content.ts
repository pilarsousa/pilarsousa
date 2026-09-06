/*
  Todo el texto de la landing de lista de espera, en un único sitio.

  El copy es el entregado por el cliente y se transcribe literal: los títulos
  van en minúsculas con las versalitas aplicadas por CSS (text-transform), no
  escritos en MAYÚSCULAS aquí, para que los lectores de pantalla no los deletreen
  letra a letra.

  Los testimonios no se copian aquí: son las reseñas reales que ya viven en
  mision-origen/ui/testimonials.ts. Este archivo sólo decide CUÁLES se muestran.
*/

import { TESTIMONIALS } from "@/components/mision-origen/ui/testimonials";

export const HERO = {
  eyebrow: "Lista de espera",
  titleTop: "3.ª edición de",
  titleMain: ["Volver al", "Origen"],
  /* Subtítulo del cliente. Va partido en tramos para poder resaltar los cuatro
     ámbitos del cierre sin meter HTML dentro del string. */
  /* Dos tramos en negrita: qué es el entrenamiento y sobre qué áreas actúa.
     Son los dos datos que alguien busca al leer esto por encima, y quedan
     separados por texto normal para que la frase no se lea como un bloque
     enfatizado entero — si todo destaca, no destaca nada. */
  intro: [
    { text: "Entrenamiento intensivo de " },
    { text: "40 días de metafísica práctica con Pilar Sousa", strong: true },
    {
      text: " para salir del estancamiento espiritual, encarnar una nueva identidad y manifestar una realidad extraordinaria en ",
    },
    { text: "salud, relaciones, dinero y propósito.", strong: true },
  ],
  privacy: "Tu información está 100% protegida. No enviamos spam.",
  /* Texto del CTA del hero, que ahora abre el modal en vez de tener el
     formulario debajo. */
  cta: "Quiero acceder a la lista",
};

/* Copy del modal del formulario. El badge y el aviso de privacidad se reutilizan
   de HERO: son los mismos y duplicarlos los dejaría desincronizados. */
export const MODAL = {
  title: "Reservá tu lugar",
  intro:
    "Serás de los primeros en acceder, con precio especial y bonos exclusivos.",
  close: "Cerrar",
};

export const FORM = {
  fields: {
    nombre: "Tu nombre",
    telefono: "Tu número de WhatsApp",
    email: "Tu correo electrónico",
  },
  submit: "Quiero acceder a la lista",
  submitting: "Registrando…",
  success: "¡Estás en la lista!",
  error: "No pudimos registrarte. Revisá tu conexión y probá de nuevo.",
};

/* Los iconos se nombran, no se importan: content.ts es data y no debe arrastrar
   componentes de React. BenefitCard traduce el nombre al icono de lucide. */
export const BENEFICIOS = {
  title: "¿Qué te llevarás por acceder a la",
  titleAccent: "lista de espera",
  items: [
    {
      icon: "clock" as const,
      title: "Acceso anticipado",
      text: "Entérate antes que nadie de la próxima apertura y ten prioridad para conseguir una de las plazas.",
    },
    {
      icon: "tag" as const,
      title: "Mejores condiciones",
      text: "Accede a condiciones y precio especiales antes de la apertura al público.",
    },
    {
      icon: "gift" as const,
      title: "Regalos y bonos especiales",
      text: "Recibe regalos y bonos exclusivos por formar parte de la lista de espera.",
    },
  ],
  cta: "Quiero acceder a la lista",
};

/* Sección 3 — Qué es el programa. Va después de las ventajas de la lista y
   antes de la prueba social: primero el motivo para dejar el dato, luego qué es
   exactamente aquello a lo que se está apuntando, y sólo entonces quién lo
   avala. */
export const QUE_ES = {
  title: "¿Qué es",
  titleAccent: "Volver al Origen",
  /* El orden no es sólo de contenido: la rejilla los coloca de dos en dos, y
     emparejar una frase larga con una corta deja la fila descuadrada. Por eso
     "Contexto elevado…" va el último, junto a "Material de integración…", que
     es el más largo de todos; y "Acompañamiento de 90 días", el más corto,
     sube a acompañar a "13 Códigos Originales…". Cada fila queda así con
     alturas parecidas. */
  items: [
    "6 semanas de transformación en vivo conmigo",
    "13 mentorías en VIVO / 2 a la semana",
    "13 Códigos Originales para la manifestación",
    "Acompañamiento de 90 días",
    "Material de integración por cada código (Checkpoint del antivirus mental)",
    "Contexto elevado que te impulsa y sostiene",
  ],
  cta: "Quiero acceder a la lista",
};

export const TESTIMONIOS = {
  title: "Lo que dicen quienes ya",
  titleAccent: "volvieron al origen",
  subtitle: "Validado por quienes ya lo vivieron.",
  cta: "Quiero acceder a la lista",
};

/*
  Qué reseñas entran en el carrusel, por índice sobre TESTIMONIALS.

  El cliente pidió "los 5 mejores": estas cinco son las de 5 estrellas que
  además tienen foto de perfil, así que ninguna card cae en el avatar de
  respaldo con la inicial. Para mostrar las trece, cambiar FEATURED por
  TESTIMONIALS.map((_, i) => i).
*/
const FEATURED = [1, 11, 0, 12, 4];

export const FEATURED_TESTIMONIALS = FEATURED.map((i) => TESTIMONIALS[i]).filter(
  Boolean,
);

/*
  ──────────────────── La historia de Volver al Origen ───────────────────────

  ⚠️ NO CONFUNDIR CON `QUE_ES`, QUE ESTÁ UNAS LÍNEAS MÁS ARRIBA.

  Las dos responden a "¿qué es Volver al Origen?" y son cosas distintas:

    · QUE_ES  — QUÉ INCLUYE el programa: seis puntos sueltos (las 6 semanas,
                las 13 mentorías, el acompañamiento). Es la ficha. Su sección
                (sections/QueEs.tsx) existe pero hoy NO está montada en la
                página.
    · ORIGEN  — este bloque: POR QUÉ EXISTE. El relato en primera persona de
                Pilar, de dónde sale el método y qué lo diferencia.

  Van seguidas en la página y por eso el título de ésta no repite la pregunta
  entera: si algún día se monta también QueEs, dos secciones consecutivas
  preguntando lo mismo se leen como un error.

  Texto del cliente, íntegro y sin recortar. Lo que sí hace este archivo es
  ORDENARLO EN BLOQUES, porque son unas 450 palabras y once párrafos: volcados
  como un muro seguido, en una landing de captación no los lee nadie.

  La estructura sigue el arco del propio texto:

    1. `problema`   — de qué se dio cuenta (el "entretenimiento espiritual")
    2. `giro`       — la frase que hace bisagra, destacada aparte
    3. `origen`     — su parte en ese mundo y el propósito que encontró
    4. `sistema`    — los 13 Códigos y qué NO es esto
    5. `prueba`     — las dos ediciones y los 350 alumnos
    6. `cierre`     — la misión y la frase final

  ⚠️ `giro` y `cierre` SE PINTAN DISTINTO, más grandes y en verde. No es
  decoración: son las dos frases que cargan el argumento —"saber más no
  significa tener mejores resultados" y "recordar quién eras"— y en un bloque
  de este largo hacen de asidero para quien escanea en vez de leer.

  Las cifras (10 años, 13 códigos, 2 ediciones, 350 alumnos) salen aparte en
  `datos` y se pintan como marcadores. Son lo único verificable del bloque y
  perdidas dentro de un párrafo no las ve nadie.
*/
export const ORIGEN = {
  title: "¿Qué es",
  titleAccent: "Volver al Origen",

  problema: [
    "Volver al Origen nace al darme cuenta de que el mundo de la espiritualidad en redes sociales se estaba convirtiendo en una especie de «entretenimiento espiritual».",
    "Cada vez había más técnicas, teorías, conceptos y contenido compitiendo por nuestra atención. Muchísimas personas sabían cada vez más sobre espiritualidad, metafísica o leyes universales, pero seguían sin ver ese conocimiento reflejado en resultados tangibles en su vida.",
  ],

  /* La bisagra del texto. Va sola y destacada. */
  giro: "Porque saber más no significa tener mejores resultados. Si no lo aplicas, nada cambia.",

  origen: [
    "Y yo también formaba parte de ese mundo. Creaba muchísimo contenido que ayudaba a muchas personas, pero entendí que quería ir mucho más allá. No quería simplemente compartir información o llegar a millones de personas. Quería impactar de forma real y crear algo capaz de generar transformaciones extraordinarias.",
    "Ahí encontré una parte mucho más profunda de mi propósito.",
    "Después de más de 10 años estudiando, experimentando y aplicando estos principios en mi propia vida, decidí ordenarlos y sistematizarlos de una forma sencilla y práctica.",
  ],

  sistema: [
    "Así nacieron los 13 Códigos Originales de la manifestación y, con ellos, Volver al Origen.",
    "Principios que yo no he inventado, sino que llevo años estudiando y aplicando, y que he ordenado para que cualquier persona comprometida con su transformación pueda llevarlos a la práctica y transformar su realidad.",
    "Aquí no buscamos darte más información. Buscamos que puedas aplicar estos principios de una manera sencilla y práctica hasta ver resultados en tu propia vida.",
  ],

  prueba: [
    "Ya han sido dos ediciones de Volver al Origen. Más de 350 alumnos han pasado por este entrenamiento y cientos de personas están utilizando sus principios para transformar sus vidas.",
    "Mi misión es llevar este movimiento educativo a miles y millones de personas, para que puedan comprender cómo funciona la realidad y utilizar estos principios para vivir una vida más próspera, abundante y feliz.",
  ],

  /* La frase con la que cierra el cliente, emoji incluido. */
  cierre:
    "Porque Volver al Origen no trata de convertirte en alguien nuevo o en alguien que no eres, sino de recordar quién eras antes de olvidar quién eres y empezar a vivir desde ahí cada día de tu vida.",

  /*
    ⚠️ CIFRAS REALES, TODAS SACADAS DEL TEXTO DEL CLIENTE. No se inventa
    ninguna ni se redondea al alza: "más de 350 alumnos" es lo que él escribe,
    y por eso el "+". Si mañana cambia el copy hay que cambiarlas aquí también,
    porque quedarían contradiciendo al párrafo que tienen al lado.
  */
  datos: [
    { cifra: "+10", etiqueta: "años de estudio" },
    { cifra: "13", etiqueta: "Códigos Originales" },
    { cifra: "2", etiqueta: "ediciones" },
    { cifra: "+350", etiqueta: "alumnos" },
  ],
};

export const PILAR = {
  title: "¿Quién es",
  titleAccent: "Pilar Sousa",
  signature: "Pilar Sousa",
  /* Bio entregada por el cliente para esta landing. Es más corta que la de
     Misión Origen y cambia detalles (aquí el libro va antes que la comunidad),
     así que son textos distintos a propósito y no deben unificarse. */
  paragraphs: [
    "Hace más de 10 años tuve mi despertar espiritual. Desde entonces comenzó una búsqueda incansable por comprender cómo funcionan realmente la realidad, la consciencia y las leyes universales que gobiernan nuestra vida.",
    "Ese camino me llevó a escribir mi primer libro y a acompañar a cientos de personas en sus propios procesos de transformación.",
    "Hoy, después de haber compartido mis enseñanzas con una comunidad de más de 600.000 personas, Volver al Origen reúne todo aquello que he aprendido, vivido y aplicado durante estos años.",
  ],
  cta: "Quiero acceder a la lista",
};

export const FOOTER = {
  copyright: `© ${new Date().getFullYear()} Pilar Sousa. Todos los derechos reservados.`,
};

export const GRACIAS = {
  title: "¡Te falta el último paso!",
  intro: [
    { text: "Gracias, " },
    { text: "tu registro ha sido completado", strong: true },
    { text: " y solo te falta " },
    { text: "acceder al grupo privado de WhatsApp", strong: true },
    { text: " para no perderte ninguna novedad." },
  ],
  detail: [
    { text: "Toda la información importante sobre la próxima edición y los próximos pasos " },
    { text: "los iremos compartiendo a través de este grupo privado de WhatsApp", strong: true },
  ],
  nudge: "Haz clic ahora aquí abajo para acceder.",
  cta: "Acceder al grupo privado de WhatsApp",
  whatsappUrl: "https://chat.whatsapp.com/HMR8VTK4wFVHczUuCKc24u",
};

/* Destino tras completar el formulario. Vive aquí y no suelto en el formulario
   porque es el final del recorrido que describe este archivo. */
export const GRACIAS_PATH = "/volver-al-origen/gracias";

/* Aquí vivía FORM_ANCHOR ("#registro"), el ancla del formulario del hero. Se
   retiró al pasar el formulario al modal: los CTA ya no navegan a ninguna
   parte, lo abren. El id "registro" sigue en el <h1> del hero porque es a lo
   que apunta el aria-labelledby de la sección. */
