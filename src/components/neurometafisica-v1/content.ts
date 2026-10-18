/*
  Copy y datos del Seminario de Neurometafísica (/neurometafisica-v1).

  Sale del brief de Pilar ("Brief landing · Seminario de Neurometafísica"):
  doce bloques, en su orden, con su copy. Todo lo que se edita sin tocar diseño
  vive acá. Los destacados (las partes en oro) se marcan con [corchetes] y los
  pinta <Destacado> (ui/Destacado.tsx), así el copy sigue siendo texto plano.

  Tono del brief: autoridad de mentora, clara y directa. Nada de promesas
  mágicas: manifestar es un entrenamiento, no una sensación. No usar
  "doctorado" en el copy público: es la vibra, no un título académico.
*/

/* ── Evento ──
   Domingo 25 de octubre de 2026, 18:00 h de España. FECHA_EVENTO manda: la
   cuenta atrás y la tabla de horarios por país se calculan desde aquí, así
   que basta con cambiarla. FECHA_CORTA tiene que decir el mismo día.

   Ese domingo Europa vuelve al horario de invierno (a las 3:00): las 18:00 de
   Madrid son las 17:00 UTC, y quedan México 11:00, Argentina 14:00, Colombia
   12:00 y Chile 14:00. Ojo: con el horario de verano (hasta el 24) serían una
   hora menos en América; horario.ts lo resuelve solo con Intl.

   ⚠️ El email de registro (plantilla de GHL) tiene la fecha y las horas
   escritas a mano: si cambia esto, cambiarlo también allí. */
export const FECHA_EVENTO = { year: 2026, month: 10, day: 25, hour: 18, minute: 0 };
export const ZONA_HORARIA = "Europe/Madrid";
export const FECHA_CORTA = "25 de octubre";

/* Países del público (formulario del roadmap del Bootcamp: España 144,
   México 114, Argentina 57, Colombia 35, Chile 26). Los cinco van en la cinta
   de horarios del hero, en la plaza y en la pregunta de horarios. */
export const PAISES = [
  { pais: "España", zona: "Europe/Madrid" },
  { pais: "México", zona: "America/Mexico_City" },
  { pais: "Argentina", zona: "America/Argentina/Buenos_Aires" },
  { pais: "Colombia", zona: "America/Bogota" },
  { pais: "Chile", zona: "America/Santiago" },
] as const;

/* Plazas que muestra el aviso del cierre. */
export const PLAZAS_RESTANTES = 37;

export const SOURCE = "neurometafisica-v1";

/* ── Botón único de la página ──
   El brief pide una sola acción, repetida: después de los bloques 1, 4, 6 y 9,
   en la plaza y en el cierre. Nada de enlaces que saquen de la página. */
export const CTA = "Quiero mi plaza";

export const SELLO = "Seminario oficial · Neurometafísica";

/* ── Bloque 1 · Hero ──
   Objetivo: que en 5 segundos se entienda qué es, para quién y cuándo. */
export const HERO = {
  /* Las fichas de arriba del título. Las horas por país van aparte, en la
     cinta bajo el botón (ui/CintaHorarios.tsx). */
  fichas: {
    directo: "Seminario en directo",
    fecha: FECHA_CORTA,
    con: "Con Pilar Sousa",
    plazas: "Plazas limitadas",
  },
  titulo: "Neurometafísica",
  /* La inscripción bajo el título: lo que decía el sello redondo. */
  credencial: "Seminario oficial · MMXXVI",
  /* Las partes entre [corchetes] van en negrita en el hero. */
  subtitulo: "[Manifestar] una realidad distinta, [es una ciencia exacta] como las matemáticas",
  apoyo:
    "Reprograma tu mente y sistema nervioso para convertirte en la persona [capaz de manifestar y sostener] la realidad que deseas.",
  /* Rótulo de la cinta de horarios, bajo el botón. */
  horarios: "Hora del directo en tu país",
};

/* ── Bloque 2 · ¿Te suena? ──
   Frases sacadas de lo que escribieron los alumnos del Bootcamp. */
export const TE_SUENA = {
  antetitulo: "¿Te suena?",
  titulo: "Sabes lo que quieres. Y aun así, vuelves al mismo punto.",
  items: [
    "Empiezas con fuerza… [y abandonas.]",
    "Has leído libros, visto vídeos, hecho cursos y retiros. [Y aquí sigues.]",
    "Cuando vas a dar el salto, aparece la misma voz: [“¿Y si me equivoco? ¿Y si lo pierdo todo?”]",
    "Tus relaciones, tu trabajo o tu dinero [terminan siempre de la misma forma.]",
    "Cambias tú, pero [tu entorno te devuelve a tu versión anterior.]",
  ],
  /* El cierre en dos partes: la primera va encerrada en un círculo de tiza. */
  cierreMarcado: "No es falta de fuerza de voluntad.",
  cierreResto: "[Es tu identidad haciendo exactamente lo que fue programada para hacer.]",
};

/* ── Bloque 3 · La revelación ── */
export const REVELACION = {
  antetitulo: "La revelación",
  titulo: "Tu identidad está creando tu realidad.",
  /* Cada punto es una lámina de vidrio con su diagrama (ver
     ui/LaminasRevelacion.tsx); la etiqueta nombra el plano que muestra. */
  puntos: [
    {
      etiqueta: "Química",
      titulo: "Tu vieja identidad no es una idea. Es química.",
      texto:
        "Cuando vuelves a lo conocido, tu cuerpo te premia: baja el cortisol, llega la dopamina de siempre y la oxitocina te hace sentir que perteneces. Por eso tu vieja identidad es adictiva.",
    },
    {
      etiqueta: "Circuito",
      titulo: "Tu cerebro va por el circuito más fuerte.",
      texto:
        "Cada mañana arranca con el camino que lleva años repitiéndose. No es un defecto: es un programa, y se instaló a base de repetición.",
    },
    {
      etiqueta: "Sistema nervioso",
      titulo: "Solo recibes lo que tu sistema nervioso puede sostener.",
      texto:
        "Si intentas sentir abundancia con un cuerpo en alerta, durará unos segundos y volverás al miedo.",
    },
  ],
  /* Frase destacada en pizarra. */
  pizarra: "No puedes crear una realidad nueva siendo la misma persona de siempre.",
};

/* ── Bloque 4 · Qué es la Neurometafísica ── */
export const QUE_ES = {
  /* Entrada de diccionario en la pestaña del panel: guiño de cátedra. */
  entrada: "neu·ro·me·ta·fí·si·ca",
  titulo: "Lo que los místicos sabían, hoy lo explica la neurociencia.",
  texto:
    "Los principios de la manifestación no son nuevos. Están en las enseñanzas de Jesús, en los textos herméticos y en las tradiciones de Oriente. Lo nuevo es que hoy la neurociencia empieza a explicar cómo funcionan en tu cerebro y en tu cuerpo. [La Neurometafísica une las dos cosas: la verdad espiritual y el entrenamiento de tu sistema nervioso, ordenados en un método paso a paso.]",
};

/* ── Bloque 5 · Temario del seminario ──
   Sección 4 del brief. Anuncia cinco módulos pero detalla tres: van los tres
   que detalla. Ordenados como un programa académico: primero el porqué,
   después lo que te ata y por último cómo reprogramar y sostener. */
export const TEMARIO = {
  antetitulo: "Programa del seminario",
  titulo: "Temario",
  intro:
    "Todo lo que funcionó en el Bootcamp, ordenado como una asignatura: primero el [porqué], después [lo que te ata] y por último cómo [reprogramar y sostener].",
  /* La fase de cada módulo sale de la intro (el porqué, lo que te ata,
     reprogramar y sostener): es lo que se lee con el módulo cerrado. */
  modulos: [
    {
      numero: "I",
      fase: "El porqué",
      titulo: "Identidad y neurociencia: tu identidad está creando tu realidad",
      texto:
        "Por qué manifestar es una ciencia exacta y todo pasa por un cambio de identidad, primero en tu cuerpo y en tu cerebro.",
    },
    {
      numero: "II",
      fase: "Lo que te ata",
      titulo: "La neuroquímica de la manifestación",
      texto:
        "Tu vieja identidad es adictiva: cortisol, dopamina y oxitocina te premian por volver a lo conocido.",
    },
    {
      numero: "III",
      fase: "Reprogramar y sostener",
      titulo: "Reprogramar tu neuroquímica para encarnar tu nueva identidad",
      texto:
        "Cómo salir del modo supervivencia y reprogramarte para encarnar una nueva identidad y recibir lo que ahora tu cuerpo es capaz de sostener.",
    },
  ],
};

/* ── Bloque 6 · Lo que te llevas ── */
export const TE_LLEVAS = {
  antetitulo: "Lo que te llevas",
  titulo: "Sales del seminario con tres cosas que hoy no tienes.",
  items: [
    "[Entender, por fin, por qué te autosaboteas:] con base neurológica, no con frases bonitas.",
    "[Un escáner de tu identidad:] los patrones, autoengaños y lealtades que te mantienen en el mismo lugar.",
    "[Prácticas para regular tu sistema nervioso] y empezar a sostener más.",
  ],
};

/* ── Bloque 7 · Para quién es / para quién no es ──
   El "es para ti si" va en el tubo de ensayo (la pócima): el único guiño de
   laboratorio que admite el brief. Ordenados de abajo hacia arriba: es el
   orden en que el líquido los alcanza. */
export const PARA_QUIEN = {
  antetitulo: "¿Es para ti?",
  titulo: "Es para ti si:",
  noEsTitulo: "No es para ti si:",
};

export const ES_PARA_TI = [
  "[Llevas años formándote] y sientes que entiendes, pero no encarnas.",
  "[Manifiestas a ratos,] pero no logras sostener los resultados.",
  "[Estás dispuesta a mirar tu vida como un experimento] y a pasar a la acción.",
];

export const NO_ES_PARA_TI = [
  "Buscas otra técnica rápida para sentirte bien un rato.",
  "Quieres resultados sin cambiar quién eres.",
];

/* ── Bloque 8 · Quién es Pilar Sousa ──
   Su historia en primera persona, la misma de /bootcamp-v2 (Pilar.tsx): es su
   voz, va textual; sólo ella decide cómo se presenta. */
export const PILAR = {
  antetitulo: "Tu profesora",
  titulo: "Quién es Pilar Sousa",
  historia: [
    "Hubo un tiempo en el que me sentía perdida, sin un rumbo ni un objetivo claro en la vida.",
    "No encontraba sentido a lo que hacía y sentía que algo importante me faltaba. Fue al adentrarme en el mundo de la espiritualidad cuando todo empezó a cambiar. Comprendí que la transformación que buscaba fuera tenía que empezar dentro de mí.",
    "Ese camino me trajo una plenitud que no conocía: en lo personal y también en lo económico. Aprendí a confiar, a cuidar mi energía y a alinear mi vida con lo que de verdad quería.",
    "Hoy vivo viajando por el mundo, dedicándome a lo que amo y acompañando a otras personas en su propio proceso. Ese es, para mí, el mayor regalo de todo este camino: poder devolver lo que aprendí.",
    "De esa experiencia nace [Volver al Origen], la formación en la que comparto, paso a paso, las herramientas que me ayudaron a reencontrarme y a manifestar la realidad de mis sueños.",
  ],
  /* Bajo la firma, al pie de la historia. */
  firma: "Creadora de Volver al Origen",
  /* Texto alternativo de la foto (carpetas/img-pizarron.jpeg). */
  foto: "Pilar Sousa en el aula, con una tiza en la mano junto a la pizarra",
};

/* ── Bloque 9 · Prueba social ──
   Datos y reseñas de Volver al Origen (las mismas de /bootcamp-v2). Siembra
   que existe un sistema para sostener el cambio, sin venderlo: la landing no
   vende VAO. */
export const PRUEBA = {
  antetitulo: "Prueba social",
  titulo: "Historias de quienes ya lo entrenaron",
  intro:
    "Volver al Origen es el sistema que creé para [sostener el cambio en el tiempo]. Después de 2 ediciones y más de 350 alumnos, esto es lo que cuentan.",
};

/* ── Bloque 10 · Plaza y precio ──
   Tarjeta única. Es gratis por ahora (sin precio que mostrar). */
export const PLAZA = {
  antetitulo: "Tu plaza",
  titulo: "Ficha de inscripción",
  formato: "Seminario en directo con Pilar Sousa, online",
  incluye: [
    "Los tres módulos del temario, en directo",
    "El escáner de tu identidad",
    "Prácticas para regular tu sistema nervioso",
  ],
  precio: "Gratis",
  precioNota: "Plazas limitadas",
};

/* ── Bloque 11 · Preguntas frecuentes ──
   Del brief quedan fuera, por ahora, "¿Hice el Bootcamp; me sirve?" y
   "¿Cómo accedo?". La de los horarios se responde con la tabla de PAISES. */
export const FAQ = [
  {
    pregunta: "¿Necesito saber de metafísica o neurociencia?",
    respuesta: "No. Se explica desde cero, con lenguaje claro.",
  },
  {
    /* ⚠️ El brief dice "Sí (en principio)": confirmar antes de publicar. */
    pregunta: "¿Queda grabado?",
    respuesta: "Sí, en principio queda grabado. Aun así, te recomiendo vivirlo en directo.",
  },
  {
    pregunta: "¿A qué hora es en mi país?",
    respuesta: "horarios",
  },
] as const;

/* ── Bloque 12 · Cierre ── */
export const CIERRE = {
  titulo: "La información sola no te cambia la vida. [El entrenamiento, sí.]",
  aviso: `Quedan ${PLAZAS_RESTANTES} plazas disponibles`,
};

/* ── Modal de registro ── */
export const MODAL = {
  titulo: "Reserva tu",
  tituloDestacado: "plaza",
  formato: "En directo online",
  boton: "Reservar mi plaza",
  exito: "¡Plaza reservada! Te llevamos al siguiente paso…",
};

/* ── Plaza confirmada ──
   La pantalla entre el registro y la gracias (ui/ConfirmacionPlaza.tsx). El
   saludo lleva delante el nombre de quien se registró. */
export const CONFIRMACION = {
  titulo: "Plaza confirmada",
  saludo: "nos vemos en el aula.",
  saludoSinNombre: "Nos vemos en el aula.",
  carga: "Te llevamos al siguiente paso",
};

/* ── Gracias ── */
export const GRACIAS = {
  /* El titular se escribe con tiza en la pizarra; el antetítulo va arriba. */
  antetitulo: "Te falta un paso",
  /* "Casi": la plaza se confirma en el grupo de WhatsApp (paso 01). */
  titulo: "¡Tu plaza está casi reservada!",
  /* Los pasos, como la tarea de una clase: 01 es el grupo de WhatsApp (la
     acción que confirma la plaza); 02 y 03, las recomendaciones. */
  tareaAntetitulo: "Siguiente paso",
  tareaTitulo: "Tu tarea antes de la clase",
  intro: "Estás a un solo paso de confirmar tu plaza en el Seminario de Neurometafísica, donde:",
  promesa:
    "[Vas a entender] por qué tu cerebro y tu sistema nervioso te devuelven siempre al mismo lugar, y cómo entrenarlos para sostener la vida que quieres.",
  whatsappTitulo: "Únete a nuestro círculo privado en WhatsApp y confirma tu plaza.",
  whatsappTexto:
    "En este grupo te enviaré contenido clave y novedades para que llegues preparada al seminario.",
  whatsappCta: "Quiero confirmar mi plaza",
  recomendacionesTitulo: "Recomendaciones adicionales:",
  recomendaciones: [
    `[Reserva la fecha en tu calendario y aparta el ${FECHA_CORTA}] para vivir el seminario en directo.`,
    "[Comparte esta invitación con quien busca] ese cambio en su vida: puede que encuentre aquí justo lo que necesita.",
  ],
  despedida: "Nos vemos en el aula",
};
