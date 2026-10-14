/*
  Copy y datos del evento de /cientifico-v3.

  Todo lo que se edita sin tocar diseño vive acá: fecha, cupos, enlaces y
  textos. Los destacados (las partes en salvia) se marcan con [corchetes] y los
  pinta <Destacado> (ui/Destacado.tsx), así el copy sigue siendo texto plano.
*/

/* ── Evento ──
   ⚠️ FECHA_EVENTO, FECHA_CORTA y HORA tienen que decir lo mismo. */
export const FECHA_EVENTO = { year: 2026, month: 10, day: 17, hour: 19, minute: 0 };
export const ZONA_HORARIA = "Europe/Madrid";
export const FECHA_CORTA = "17 de octubre";
export const HORA = "19:00 h";

/* Cupos que muestra la pastilla del cierre. */
export const ENTRADAS_RESTANTES = 37;

export const SOURCE = "cientifico-v3";

/* ── Hero ── */
export const HERO = {
  titulo:
    "Voy a revelarte el método que convirtió mi vida en un laboratorio y que te permitirá [manifestar resultados que puedes comprobar.]",
  bajada:
    "Descubre cómo funciona realmente la realidad, por qué tu identidad decide lo que manifiestas y el experimento con el que doy un salto cuántico cada 90 días.",
  llamado: "¡Regístrate y asegura tu entrada gratuita ahora!",
};

/* ── Para quién (fila de 4 cards bajo el hero) ── */
export const PARA_QUIEN_EYEBROW = "Tengas o no experiencia y totalmente gratis,";
export const PARA_QUIEN = [
  "Para quienes [llevan años estudiando metafísica] y sienten que saben mucho, pero su vida no termina de cambiar.",
  "Si [manifiestas en algunas áreas] pero siempre vuelves al mismo punto de partida.",
  "Si quieres [dejar de coleccionar técnicas] y aplicar un método que puedas comprobar.",
  "Si quieres [vivir alineada con tu propósito] y no desde el miedo que te frena.",
];

/* ── ¿Qué puedes esperar? (carrusel) ── */
export const QUE_ESPERAR = {
  titulo: "¿Qué puedes esperar de este evento?",
  bajada: "Desliza para ver todo lo que vas a comprobar en esta masterclass gratuita.",
  indicacionMobile: "Desliza las carpetas para ver más",
};

/* ── La verdadera magia ── */
export const MAGIA = {
  titulo: "La verdadera magia de este método",
  texto:
    "Es su capacidad para convertir lo que ya sabes de espiritualidad en una realidad que puedes ver, comprobar y sostener.",
};

/* ── Tu oportunidad / Para ti si… ── */
export const OPORTUNIDAD = {
  /* "Tu oportunidad" se separa del resto porque lleva el círculo a mano. */
  tituloMarcado: "Tu oportunidad",
  tituloResto: " para dar tu salto cuántico empieza aquí.",
  subtitulo: "Este evento es para ti, si:",
};

export const PARA_TI = [
  {
    frase:
      "[Llevas años en el camino espiritual] y quieres ver, por fin, ese conocimiento reflejado en tu vida.",
    detalle:
      "¿Has leído, estudiado y escuchado de todo, pero tu realidad sigue igual? Descubre por qué saber más no significa manifestar más, y qué cambia cuando empiezas a aplicarlo.",
  },
  {
    frase:
      "Has probado decretos, visualizaciones y afirmaciones, pero [algo sigue sin cambiar.]",
    detalle:
      "¿Sientes que haces todo “bien” y aun así no llega? Vas a entender qué parte de ti está interfiriendo y cómo dejar de ponerle freno a lo que pides.",
  },
  {
    frase: "[Manifiestas a ratos,] pero siempre vuelves al mismo punto de partida.",
    detalle:
      "¿Consigues avances que después se desvanecen? Te mostraré por qué tu identidad te devuelve a lo conocido y cómo sostener el cambio en el tiempo.",
  },
  {
    frase:
      "Has seguido a otros mentores y [terminaste con más información y menos claridad.]",
    detalle:
      "¿Tu cabeza está llena de técnicas que compiten entre sí? Aquí no vas a recibir más teoría, sino un experimento sencillo para comprobarlo en tu propia vida.",
  },
];

/* ── Debes estar dispuesta a… (tubo de ensayo) ──
   Ordenadas de abajo hacia arriba: es el orden en que el líquido las alcanza. */
export const DISPUESTA = {
  /* Espacio duro ( ) entre "dispuesta" y "a:": que nunca quede el "a:"
     solo en el último renglón. */
  titulo: "Pero, para aprovechar esta oportunidad, debes estar dispuesta a:",
};

export const DISPUESTA_ITEMS = [
  "[Ser tu propio experimento.] Si estás dispuesta a observar tu vida como un laboratorio, este evento es para ti.",
  "[Soltar la vieja identidad.] Si estás lista para dejar de ser quien te trajo hasta aquí, este evento es para ti.",
  "[Pasar a la acción.] El miedo se pasa con acción, hábitos y coherencia. Si vienes a aplicar y no sólo a saber, este evento es para ti.",
  "[Comprometerte con tu salto.] Si estás dispuesta a sostener tu nueva identidad incluso cuando nadie mira, este evento es para ti.",
];

/* ── Cierre ── */
export const CIERRE = {
  titulo:
    "No te pierdas la oportunidad de conocer el método que uso para manifestar desde mi nueva identidad, [dando un salto cuántico cada 90 días y viviendo la realidad que durante años soñé.]",
  aviso: `¡Solamente quedan ${ENTRADAS_RESTANTES} entradas disponibles!`,
};

/* ── Botón principal ── */
export const CTA = "Quiero mi entrada gratuita";

/* ── Gracias ── */
export const GRACIAS = {
  titulo: "¡Gracias por registrarte!",
  intro: "Estás a un solo paso de validar tu entrada al laboratorio donde:",
  promesa:
    "[Voy a compartir contigo] el método que convertirá lo que sabes de manifestación en resultados que puedes comprobar en tu propia vida.",
  whatsappTitulo: "Forma parte de nuestro círculo privado en WhatsApp y valida tu entrada.",
  whatsappTexto:
    "En este grupo te enviaré contenido clave y novedades para que llegues preparada al evento.",
  whatsappCta: "Quiero validar mi entrada",
  recomendacionesTitulo: "Recomendaciones adicionales:",
  recomendaciones: [
    `[Reserva la fecha en tu calendario y asegúrate de apartar el ${FECHA_CORTA} a las ${HORA}] para no perderte esta oportunidad de dar tu próximo salto.`,
    "[Comparte esta invitación con quien busca] ese cambio en su vida: puede que encuentre aquí justo lo que necesita.",
  ],
  despedida: "Nos vemos dentro",
};
