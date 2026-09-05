/*
  ═══════════════════════════════════════════════════════════════════════════
  DIAGNÓSTICO DE FRECUENCIA — TODO EL CONTENIDO EN UN SOLO ARCHIVO
  ═══════════════════════════════════════════════════════════════════════════

  EDITÁ ESTE ARCHIVO, no los componentes. Aquí vive el copy, las 7 preguntas,
  las 4 frecuencias y los textos de la página de resultados. Nada de esto está
  escrito a mano dentro de un componente, precisamente porque todo va a cambiar
  cuando lleguen los textos definitivos de Laureano y las preguntas del Notion.

  ⚠️ QUÉ ES DEFINITIVO Y QUÉ NO:
     · LAS 7 PREGUNTAS SON LAS DEFINITIVAS, literales del cliente. Ya no queda
       ninguna inventada — las cuatro últimas eran de relleno y se han
       sustituido por las reales.
     · LAS IMÁGENES SON LAS DEFINITIVAS: las siete de las preguntas y las tres
       del formulario. Ya no queda ningún marcador generado.
     · El copy de la landing sigue siendo el primer borrador del documento.
     · Las descripciones de las frecuencias son de relleno: las escribe Pilar.

  ── LA REGLA QUE NO SE PUEDE ROMPER ──

  CADA PREGUNTA TIENE QUE OFRECER LAS CUATRO FRECUENCIAS, UNA POR OPCIÓN.
  Si una pregunta repitiera frecuencia u omitiera alguna, esa frecuencia
  tendría más o menos oportunidades de sumar que las demás y el resultado
  dejaría de medir a la persona para medir el cuestionario. Hay una prueba
  automática de esto en puntaje.ts (`verificarCuestionario`).
*/

/* ────────────────────────── Las cuatro frecuencias ─────────────────────────

   Los identificadores viajan a GoHighLevel y se usan para elegir el video del
   email, así que CAMBIARLOS ROMPE LA AUTOMATIZACIÓN del cliente. El nombre
   visible sí se puede cambiar libremente. */
export const FRECUENCIAS = ["culpa", "apatia", "verguenza", "miedo"] as const;

export type Frecuencia = (typeof FRECUENCIAS)[number];

/*
  ORDEN DE DESEMPATE — LO DECIDE PILAR, NO EL CÓDIGO.

  Con 7 preguntas y 4 frecuencias los empates son frecuentes: si alguien
  respondiera al azar, empataría en el 25,6% de los casos (4.200 de las 16.384
  combinaciones posibles, por los repartos 3-3-1-0 y 2-2-2-1). En la realidad
  será menos, porque las respuestas de una persona se agrupan, pero sigue
  siendo una porción grande de los leads.

  Cuando dos o más frecuencias empatan en puntos, gana la que aparezca antes en
  esta lista. El criterio tiene que ser de contenido —cuál es más urgente de
  atender según Pilar—, no técnico. Reordenar este array es todo lo que hace
  falta para cambiarlo.

  Es determinista a propósito: la misma persona con las mismas respuestas
  recibe siempre el mismo video. Un desempate al azar haría imposible explicar
  un resultado o reproducir una queja.

  ⚠️ ESTE ORDEN NO SÓLO DESEMPATA: DECIDE CUÁNTA GENTE RECIBE CADA VIDEO.

  Recorriendo las 16.384 combinaciones posibles de respuestas, con el orden
  actual el reparto de resultados queda así:

      miedo      35,3%        (gana todos los empates en los que aparece)
      culpa      25,9%
      vergüenza  20,3%
      apatía     18,6%        (no gana casi ninguno)

  Sin empates, cada frecuencia saldría en el 25% de los casos. La diferencia
  —que el primero de la lista se lleve casi el doble de leads que el último—
  la produce entera este array. No es un fallo: es la consecuencia inevitable
  de desempatar con un criterio fijo, y por eso la decisión es de Pilar y no
  del código. Conviene que la tome sabiendo esto.

  (Las respuestas reales no se reparten al azar, así que los porcentajes de la
  vida real serán otros; lo que no cambia es la dirección del sesgo.)
*/
export const ORDEN_DESEMPATE: readonly Frecuencia[] = [
  "miedo",
  "culpa",
  "verguenza",
  "apatia",
];

/* Lo que se muestra en la página de resultados. `titulo` es el nombre visible
   de la frecuencia; el resto lo reescribe Pilar. */
export const FICHA_FRECUENCIA: Record<
  Frecuencia,
  { titulo: string; resumen: string; descripcion: string }
> = {
  culpa: {
    titulo: "Culpa",
    resumen: "Vivís pagando una deuda que nadie te reclamó.",
    descripcion:
      "Tu energía se va en compensar: en merecer lo que ya tenés, en no ocupar demasiado espacio, en asegurarte de que nadie salga perdiendo por tu culpa. El problema no es que te importe el otro, es que te importa antes que vos.",
  },
  apatia: {
    titulo: "Apatía",
    resumen: "No es que no puedas. Es que hace rato que no te mueve nada.",
    descripcion:
      "Desde afuera parece calma, y por dentro es otra cosa: da igual lo que pase, no termina de llegarte. Es la frecuencia más difícil de detectar porque no duele — y por eso es la que más tiempo se lleva.",
  },
  verguenza: {
    titulo: "Vergüenza",
    resumen: "El problema no es lo que hacés. Es que te vean haciéndolo.",
    descripcion:
      "Medís cada cosa por cómo va a quedar, y esa medición te llega antes que el deseo. No te frena la falta de capacidad: te frena la posibilidad de quedar expuesta haciendo el intento.",
  },
  miedo: {
    titulo: "Miedo",
    resumen: "Estás resolviendo por adelantado cosas que todavía no pasaron.",
    descripcion:
      "Tu cabeza se adelanta a lo que puede salir mal y te prepara para eso. Es agotador porque nunca termina: cada escenario resuelto abre otro. Y mientras tanto, la vida que sí está pasando ocurre en segundo plano.",
  },
};

/* ──────────────────────────── Las 7 preguntas ──────────────────────────────

   `imagen` apunta a las ilustraciones definitivas, en
   public/diagnostico/contenido/preguntas/situaciones/. Son 1672x941 (16:9), sin
   esquinas quemadas, con el motivo centrado y la franja de arriba casi vacía —
   que es justo donde se superpone el enunciado.

   El orden de las opciones NO sigue un patrón (no es siempre culpa-apatía-
   vergüenza-miedo) a propósito: si la frecuencia siempre cayera en la misma
   posición, quien conteste rápido acabaría eligiendo por posición y no por
   contenido. */
export type Opcion = {
  /* El identificador viaja a GoHighLevel junto al resultado, para poder
     recalcular el diagnóstico si algún día cambia el modelo de puntaje. */
  id: string;
  texto: string;
  frecuencia: Frecuencia;
  /*
    PESO DE LA RESPUESTA. Hoy todas valen 1 —es el modelo confirmado: cada
    respuesta suma un punto a su frecuencia y gana el porcentaje más alto—,
    pero el documento del cliente mencionaba "puntaje sugerido 1 a 10".

    El campo existe para que esa vuelta atrás sea un cambio de DATOS y no de
    lógica: si mañana aparecen pesos, se rellenan aquí y el cálculo ya los
    entiende. Omitirlo equivale a 1.
  */
  peso?: number;
};

export type Pregunta = {
  id: string;
  enunciado: string;
  imagen: string;
  /*
    Texto alternativo. VA VACÍO EN LAS SIETE, y es lo correcto, no un descuido.

    La ilustración dibuja exactamente la situación que describe el enunciado
    que tiene al lado. Ponerle un alt haría que un lector de pantalla leyera
    dos veces lo mismo —"mujer mirando el móvil con un mensaje sin responder"
    y después "Le escribes a alguien y te deja en visto todo el día"— antes de
    llegar a las respuestas, que es lo único que hay que contestar.

    Un alt vacío no es "sin describir": es la forma de marcar una imagen como
    decorativa para que se salte. El campo se mantiene por si alguna imagen
    futura sí aporta algo que el texto no dice.
  */
  imagenAlt: string;
  opciones: Opcion[];
};

export const PREGUNTAS: Pregunta[] = [
  /* ⚠️ TEXTO LITERAL DEL CLIENTE. No se retoca ni una palabra sin que lo diga
     él: el copy lo define Laureano y estas siete son las definitivas.

     OJO CON EL TRATAMIENTO: las preguntas están en TUTEO ("le escribes", "te
     deja") y el resto de la landing en VOSEO ("descubrí", "hacé", "elegí").
     Es una inconsistencia real que viene del documento original, no del
     montaje. Está pendiente de que la resuelva quien escribe el copy;
     cambiarla aquí por nuestra cuenta sería reescribir al cliente. */
  {
    id: "p1",
    enunciado: "Le escribes a alguien y te deja en visto todo el día.",
    imagen: "/diagnostico/contenido/preguntas/situaciones/q-1.png",
    imagenAlt: "",
    opciones: [
      {
        id: "p1a",
        texto: "«Seguro le escribí en mal momento, o fui muy intensa.»",
        frecuencia: "culpa",
      },
      {
        id: "p1b",
        texto: "Ni lo notas. Ya responderá, o no.",
        frecuencia: "apatia",
      },
      {
        id: "p1c",
        texto: "«Qué ridículo soy por escribir yo primero.»",
        frecuencia: "verguenza",
      },
      {
        id: "p1d",
        texto: "Vuelves al chat varias veces: «¿estará molesto conmigo?»",
        frecuencia: "miedo",
      },
    ],
  },
  {
    id: "p2",
    enunciado: "Te llega dinero que no esperabas.",
    imagen: "/diagnostico/contenido/preguntas/situaciones/q-2.png",
    imagenAlt: "",
    opciones: [
      {
        id: "p2a",
        texto: "Lo guardas rápido, no vaya a venir algo peor.",
        frecuencia: "miedo",
      },
      {
        id: "p2b",
        texto: "Piensas enseguida en quién lo necesita más que tú.",
        frecuencia: "culpa",
      },
      {
        id: "p2c",
        texto: "Se va sin que sepas muy bien en qué. Da igual.",
        frecuencia: "apatia",
      },
      {
        id: "p2d",
        texto: "Te incomoda recibirlo sin haber hecho nada por él.",
        frecuencia: "verguenza",
      },
    ],
  },
  {
    id: "p3",
    enunciado: "Alguien cercano te cuenta que le va muy bien.",
    imagen: "/diagnostico/contenido/preguntas/situaciones/q-3.png",
    imagenAlt: "",
    opciones: [
      {
        id: "p3a",
        texto: "«¿Y yo cuándo? Me estoy quedando atrás.»",
        frecuencia: "miedo",
      },
      {
        id: "p3b",
        texto: "Te comparas y te sientes pequeño.",
        frecuencia: "verguenza",
      },
      {
        id: "p3c",
        texto: "«Qué bien.» Y ya. No te mueve nada.",
        frecuencia: "apatia",
      },
      {
        id: "p3d",
        texto:
          "Te alegras de verdad… y luego te sientes mal por el pinchazo de envidia.",
        frecuencia: "culpa",
      },
    ],
  },
  {
    id: "p4",
    enunciado: "Alguien te hace un cumplido sincero delante de otras personas.",
    imagen: "/diagnostico/contenido/preguntas/situaciones/q-4.png",
    imagenAlt: "",
    opciones: [
      {
        id: "p4a",
        texto: "«Ahora van a esperar siempre esto de mí.»",
        frecuencia: "miedo",
      },
      {
        id: "p4b",
        texto: "Te pones rojo y lo desvías con una broma.",
        frecuencia: "verguenza",
      },
      {
        id: "p4c",
        texto: "«Gracias», y sigues. No te llega.",
        frecuencia: "apatia",
      },
      {
        id: "p4d",
        texto: "Le devuelves el cumplido enseguida, como si le debieras algo.",
        frecuencia: "culpa",
      },
    ],
  },
  {
    id: "p5",
    enunciado: "Necesitas pedir un favor.",
    imagen: "/diagnostico/contenido/preguntas/situaciones/q-5.png",
    imagenAlt: "",
    opciones: [
      {
        id: "p5a",
        texto: "Das mil rodeos antes de pedirlo; te da apuro.",
        frecuencia: "verguenza",
      },
      {
        id: "p5b",
        texto: "No lo pides. Lo resuelves solo, por si te dicen que no.",
        frecuencia: "miedo",
      },
      {
        id: "p5c",
        texto: "Lo pides, y te queda la sensación de haber molestado.",
        frecuencia: "culpa",
      },
      {
        id: "p5d",
        texto: "Ni lo pides. Que se quede sin hacer.",
        frecuencia: "apatia",
      },
    ],
  },
  {
    id: "p6",
    enunciado:
      "Te viene a la cabeza eso que quieres desde hace tiempo. Lo siguiente que piensas es:",
    imagen: "/diagnostico/contenido/preguntas/situaciones/q-6.png",
    imagenAlt: "",
    opciones: [
      {
        id: "p6a",
        texto: "«Bah, para qué ilusionarse otra vez.»",
        frecuencia: "apatia",
      },
      {
        id: "p6b",
        texto: "«Eso no pasa para gente como yo.»",
        frecuencia: "verguenza",
      },
      {
        id: "p6c",
        texto: "«¿Y si llega y después lo pierdo?»",
        frecuencia: "miedo",
      },
      {
        id: "p6d",
        texto: "«Con la gente que está peor, cómo voy a estar pidiendo esto.»",
        frecuencia: "culpa",
      },
    ],
  },
  {
    id: "p7",
    enunciado: "Te cancelan un plan a última hora.",
    imagen: "/diagnostico/contenido/preguntas/situaciones/q-7.png",
    imagenAlt: "",
    opciones: [
      {
        id: "p7a",
        texto: "«Algo habré hecho para que no quisiera venir.»",
        frecuencia: "culpa",
      },
      {
        id: "p7b",
        texto: "Ni bien ni mal. Vuelves al sofá.",
        frecuencia: "apatia",
      },
      {
        id: "p7c",
        texto: "Le das vueltas: «¿se estará alejando de mí?»",
        frecuencia: "miedo",
      },
      {
        id: "p7d",
        texto: "«Claro. ¿Por qué saldría conmigo?»",
        frecuencia: "verguenza",
      },
    ],
  },
];

/* ─────────────────────────── Landing de promesa ────────────────────────── */

export const LANDING = {
  /* El logotipo. Lo usan dos sitios —superpuesto sobre la imagen del hero en la
     landing, y como cabecera suelta en /test y /resultado— así que la ruta vive
     aquí y no escrita a mano en cada componente. */
  logo: "/diagnostico/contenido/logo/new-logo.png",

  /* ⚠️ LA FRASE YA NO VA EN LA CABECERA, VA EN EL PIE, como eslogan.

     Arriba competía con el titular: los dos prometen lo mismo —encontrar la
     frecuencia y cambiarla— y leerlos seguidos era oír la promesa dos veces
     antes de que la página hubiera dicho nada. Al pie cierra en vez de
     adelantar, que es lo que hace un eslogan. */
  tagline: "Encontrá tu frecuencia. Cambiá tu realidad.",

  titulo: "Descubrí en menos de 60 segundos",
  tituloAcento: "qué frecuencia te está frenando",
  tituloCierre: "y el primer paso para cambiarla.",

  subtitulo:
    "Hacé el diagnóstico gratuito y recibí un video personalizado de Pilar con la solución exacta para elevar tu frecuencia y empezar a manifestar la vida que querés.",

  /* LA FILA DE AVATARES DEL HERO.

     ── SON CARAS REALES, Y POR ESO NO HAY CIFRA ──

     Las cuatro fotos son las de perfil de reseñas REALES de Volver al Origen:
     las mismas que ya se ven en los carruseles de /mision-origen y de las
     otras landings (public/Testimonios/cards-test/). No hay retrato inventado
     ni de banco de imágenes.

     La frase tampoco cuenta a nadie. El documento prohíbe expresamente
     inventar autoridad —"avalado por X mil personas"— si el dato no se puede
     respaldar, y esa cifra no existe: nadie ha contado cuánta gente hizo el
     diagnóstico. Así que la frase INVITA en vez de contar, que dice lo mismo
     sin afirmar un número que habría que sostener.

     ⚠️ MATIZ QUE CONVIENE NO PERDER: estas personas reseñaron el PROGRAMA, no
     este diagnóstico —que es nuevo y todavía no tiene reseñas propias—. "Como
     ellos" se sostiene porque el programa va justo de esto, pero si Ismael
     quiere hilar más fino, la línea exacta sería "Sumate a los que ya
     trabajaron su frecuencia con Pilar".

     Un hueco puede ir a `null`: el componente pinta una silueta en su sitio
     en vez de dejar el círculo vacío. Y con `texto` en blanco desaparece el
     bloque entero — media pieza dice menos que ninguna. */
  pruebaSocial: {
    texto: "Sumate y descubrí tu frecuencia como ellos",
    avatares: [
      "/Testimonios/cards-test/card-1.png",
      "/Testimonios/cards-test/card-2.png",
      "/Testimonios/cards-test/card-4.png",
      "/Testimonios/cards-test/card-7.png",
    ] as (string | null)[],
  },

  /* Cabecera de la caja del formulario, que va empotrada en la landing justo
     debajo de la promesa. Es corta a propósito: encima ya está el titular
     grande, y dos titulares seguidos compiten. */

  /* ⚠️ NO HAY CTA EN ESTA LANDING, y la ausencia es deliberada: el formulario
     está empotrado debajo de la promesa, así que no hay ningún sitio al que
     mandar a nadie. Si alguna vez vuelve a hacer falta un rótulo de botón, va
     aquí — pero antes conviene releer el comentario del final de page.tsx. */

  /* ⚠️ HOY NO SE PINTAN EN NINGÚN SITIO. Las tres píldoras se retiraron de la
     landing por el feedback de la primera entrega —"no van por ahora"— y el
     texto se conserva porque ese "por ahora" es de ellos, no una decisión
     cerrada. Para devolverlas: volver a montar la lista en page.tsx, donde
     queda la nota que dice dónde iban.

     Son hechos verificables del propio test, no autoridad inventada: el
     documento prohíbe expresamente cifras del tipo "avalado por X mil
     personas" si no son reales. */
  señales: ["7 preguntas", "Menos de 60 segundos", "Resultado al instante"],

  /* ⚠️ PRUEBA SOCIAL — BLOQUEADA, NO INVENTAR.
     Queda pendiente de que Ismael confirme si hay reseñas reales (Trustpilot u
     otra) o fotos y nombres de personas reales. Hasta entonces el bloque no se
     muestra: `testimonios` vacío lo oculta entero. Rellenarlo es lo único que
     hace falta para que aparezca. */
  testimonios: [] as { nombre: string; texto: string; avatar?: string }[],

  /* ⚠️ EL HERO YA NO LLEVA FOTOGRAFÍA: su fondo es la animación de anillos
     (ui/MagicRings.tsx). Los campos que apuntaban a img-hero.png se retiraron
     de aquí porque nadie los leía, y un campo de contenido que no se pinta en
     ninguna parte es una trampa para quien venga a editar el copy: parece que
     cambiarlo hace algo.

     El archivo sigue en public/diagnostico/contenido/main/ por si vuelve. */

  /* ── Lo que la persona va a recibir ──
     Ya no es un mockup dibujado sino un fotograma real del video, con botón de
     reproducir. Al pulsarlo aparece el mensaje de abajo en vez de reproducirse
     nada: el video se desbloquea completando el diagnóstico. */
  regaloTitulo: "Lo que vas a recibir",
  regaloTexto:
    "Un video de Pilar grabado para tu frecuencia dominante, con el primer movimiento concreto para salir de ahí. Te llega al email apenas termines el diagnóstico.",
  regaloPuntos: [
    "Lectura de tu frecuencia dominante",
    "Primer movimiento concreto para salir de ahí",
    "Enviado apenas terminás el diagnóstico",
  ],
  regaloImagen: "/diagnostico/contenido/main/prevew-video.png",
  regaloImagenAlt: "Pilar Sousa hablando a cámara en el video del diagnóstico",

  /* Rótulo que sólo oyen los lectores de pantalla: el botón es un triángulo
     decorativo y sin esto sería un botón sin nombre. */
  regaloPlayRotulo: "Ver la vista previa del video",

  /* Lo único que aparece al pulsar "reproducir", debajo del candado. Es el
     mismo rótulo que usan las cards bloqueadas de /game, de donde viene el
     recurso entero. Una sola palabra a propósito: el porqué ya lo explica el
     párrafo de al lado, y repetirlo encima de la imagen sería decirlo dos
     veces en la misma pantalla. */
  regaloBloqueadoRotulo: "Bloqueado",
};

/* ──────────────────── Formulario previo (3 pasos) ──────────────────────────

   Va ANTES del test, como pide el documento: es la estructura de Hormozi, que
   captura primero y entrega después. */
export const FORMULARIO = {
  /*
    ── LA TARJETA ES UNA COLUMNA, Y EN MÓVIL LLEVA ILUSTRACIÓN ──

    Tuvo dos columnas —contenido a la izquierda, ilustración a la derecha— y en
    escritorio se quedó sin ella por el feedback de la primera entrega. En MÓVIL
    sigue: arriba, a lo ancho, disolviéndose hacia abajo contra el contenido.
    Los detalles, en .dg-imagen-formulario.

    ⚠️ POR ESO EL CAMPO `imagen` SIGUE AQUÍ aunque en un escritorio no se vea
    nada. No es un resto olvidado: por debajo de 768 px se pinta.

    Las tres ilustraciones miden lo mismo (1672x941), así que la tarjeta NO
    CAMBIA DE ALTURA entre pasos y nada de lo que hay debajo en la landing se
    mueve mientras se rellena.

    ── EL DISTINTIVO SUSTITUYE AL TÍTULO DE LA CAJA ──

    Antes la tarjeta llevaba encima un "Antes de empezar / Necesito saber a
    dónde mandarte tu resultado" fijo. Con un distintivo propio por paso sobra:
    dice lo mismo —qué es esto y para qué se pide— y además cambia con lo que
    se está pidiendo, en vez de repetir una cabecera genérica tres veces.

    `icono` es un NOMBRE y no un componente: este archivo es contenido y no
    debe importar React. PasoCampo traduce el nombre al glifo.
  */
  pasos: [
    {
      campo: "nombre" as const,
      imagen: "/diagnostico/contenido/preguntas/primeras/nombre.png",
      icono: "usuario" as const,
      distintivo: "Empezá tu diagnóstico",
      etiqueta: "¿Cómo te llamás?",
      ayuda: "Tu nombre, para que el video vaya dirigido a vos.",
      placeholder: "Escribí tu nombre",
      tipo: "text",
      autoComplete: "given-name",
      inputMode: "text" as const,
    },
    {
      campo: "email" as const,
      imagen: "/diagnostico/contenido/preguntas/primeras/email.png",
      icono: "correo" as const,
      distintivo: "Te llega por mail",
      etiqueta: "¿A qué email te lo envío?",
      ayuda: "Ahí te llega el video. Revisá que esté bien escrito.",
      placeholder: "Escribí tu email",
      tipo: "email",
      autoComplete: "email",
      inputMode: "email" as const,
    },
    {
      campo: "telefono" as const,
      imagen: "/diagnostico/contenido/preguntas/primeras/telefono.png",
      icono: "whatsapp" as const,
      distintivo: "Aviso por WhatsApp",
      etiqueta: "¿Y tu teléfono?",
      ayuda: "Te avisaremos por WhatsApp cuando abra la comunidad.",
      placeholder: "Escribí tu número",
      tipo: "tel",
      autoComplete: "tel",
      inputMode: "tel" as const,
    },
  ],
  siguiente: "Continuar",
  empezar: "Empezar el diagnóstico",

  /* El título del test, tal como viene del cliente. Se muestra en la pantalla
     puente, que es justo donde empieza el cuestionario.

     (El documento traía además un subtítulo — "Dime cuál es tu frecuencia y te
     diré qué realidad estás manifestando" — que NO está puesto en ninguna
     parte: sumado al título y a las dos líneas de abajo dejaba cuatro bloques
     de texto en una pantalla que sólo tiene que dar paso a la primera
     pregunta. Falta decidir dónde va; la landing es el sitio natural.) */
  testTitulo: "¿Cuál es tu frecuencia dominante?",

  /* Pantalla puente entre el formulario y la primera pregunta. */
  introTest:
    "Para poder decirte en qué frecuencia estás vibrando, necesito que respondas estas preguntas.",
  /* VA COMO ARRAY DE RENGLONES Y NO COMO UNA CADENA CON <br>. Un <br> escrito
     dentro del texto saldría impreso tal cual: JSX no interpreta HTML metido
     en una cadena, y hacerlo interpretar exigiría dangerouslySetInnerHTML —que
     abre la puerta a inyectar marcado desde un archivo de copy—.

     Con un renglón por elemento, el salto lo pone el montaje y este archivo
     sigue siendo sólo texto. Añadir o quitar líneas es añadir o quitar
     elementos. */
  introAyuda: [
    "Elegí la que más se parezca a vos.",
    "No hay respuestas correctas e incorrectas.",
  ],
};

/* ─────────────────────── Página de resultados ──────────────────────────────

   Dos pasos, como pide el documento: primero el diagnóstico y el aviso del
   email, después la invitación a WhatsApp. */
export const RESULTADO = {
  etiqueta: "Tu diagnóstico",
  titulo: "Tu frecuencia dominante es",

  emailAviso:
    "Ya te envié por mail el video con la solución para empezar a elevarla — andá a revisar tu casilla.",
  emailNota:
    "Si no lo ves en unos minutos, mirá en spam o en la pestaña de promociones.",

  /* PASO 2 — WhatsApp. El botón está confirmado en el documento. */
  comunidadTitulo: "Un último paso",
  comunidadTexto:
    "Si querés seguir contenido como este y estar cerca de la comunidad, unite al grupo de WhatsApp de Origen.",
  comunidadCta: "Entrar a la comunidad",

  /* EL MISMO GRUPO que usan las páginas de gracias de /volver-al-origen y
     /lista-de-espera. Es una sola comunidad: un enlace distinto por embudo
     repartiría a la misma gente en salas separadas.

     Si algún día se vacía, el botón se dibuja desactivado en vez de mandar a
     un enlace roto justo después de convertir. */
  whatsappUrl: "https://chat.whatsapp.com/HMR8VTK4wFVHczUuCKc24u",

  /* ⚠️ SIN DECIDIR (documento, sección 8): si va o no un botón directo al mail.
     En false no se muestra. Al ponerlo en true aparece, sin tocar el montaje. */
  mostrarBotonMail: false,
  mailCta: "Abrir mi correo",

  /* Estado para quien llega a /analisis/resultado sin haber hecho el test
     (un enlace compartido, una recarga después de limpiar la sesión). */
  sinResultadoTitulo: "Todavía no tenemos tu diagnóstico",
  sinResultadoTexto:
    "Hacé el test —son 7 preguntas y menos de un minuto— y te digo cuál es tu frecuencia dominante.",
  sinResultadoCta: "Hacer el diagnóstico",
};
