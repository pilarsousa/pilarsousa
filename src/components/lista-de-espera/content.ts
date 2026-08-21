/*
  Todo el texto de la landing de lista de espera, en un único sitio.

  El copy es el entregado por el cliente y se transcribe literal, con dos
  salvedades de forma:

  · Los títulos van en minúsculas y las versalitas las pone el CSS
    (text-transform), no se escriben en MAYÚSCULAS aquí. Escritos en mayúsculas
    los lectores de pantalla los deletrean letra a letra.
  · El voseo rioplatense del original se conserva tal cual ("necesitás",
    "entrá", "accedé"): es la voz de la marca y unificarlo al tuteo peninsular
    cambiaría el registro.

  Los testimonios no se copian aquí: son las reseñas reales que ya viven en
  mision-origen/ui/testimonials.ts. Este archivo sólo decide CUÁLES se muestran.
*/

import { TESTIMONIALS } from "@/components/mision-origen/ui/testimonials";

/* ─── 01. Hero ─────────────────────────────────────────────────────────── */

export const HERO = {
  eyebrow: "Lista de espera · 3.ª edición",
  titleTop: "",
  titleMain: ["Volver al", "Origen"],
  /* El golpe de entrada, aparte del párrafo explicativo: es la frase que tiene
     que leerse aunque no se lea nada más. */
  claim:
    "No necesitás más información. Necesitás entrenar a la identidad capaz de sostener la vida que querés crear.",
  /* Va partido en tramos para poder resaltar sin meter HTML dentro del string.
     Dos tramos en negrita: qué es el entrenamiento y sobre qué áreas actúa. Son
     los dos datos que alguien busca al leer por encima, y quedan separados por
     texto normal para que la frase no se lea como un bloque enfatizado entero
     — si todo destaca, no destaca nada. */
  intro: [
    { text: "Un entrenamiento intensivo de " },
    { text: "metafísica práctica con Pilar Sousa", strong: true },
    {
      text: " para dejar de acumular conocimiento espiritual y empezar a encarnarlo en tus ",
    },
    { text: "decisiones, relaciones, dinero y propósito.", strong: true },
  ],
  duracion:
    "40 días de entrenamiento intensivo + acompañamiento durante 90 días.",
  privacy: "Tu información está 100% protegida. No enviamos spam.",
  cta: "Quiero entrar a la lista de espera",
};

/* Copy del modal del formulario. El badge y el aviso de privacidad se reutilizan
   de HERO: son los mismos y duplicarlos los dejaría desincronizados. */
export const MODAL = {
  title: "Entrá a la lista de espera",
  intro:
    "Serás de los primeros en recibir la información de la próxima edición, con condiciones especiales y bonos reservados.",
  close: "Cerrar",
};

export const FORM = {
  fields: {
    nombre: "Nombre",
    telefono: "Teléfono / WhatsApp",
    email: "Correo electrónico",
  },
  submit: "Quiero entrar a la lista de espera",
  submitting: "Registrando…",
  success: "¡Estás en la lista!",
  error: "No pudimos registrarte. Revisá tu conexión y probá de nuevo.",
};

/* ─── 02. No venís a aprender más. Venís a entrenar. ───────────────────── */

/* Tramo de texto con posible resaltado. Se guarda troceado en vez de como una
   frase con marcas porque content.ts es data plana y no debe llevar HTML
   dentro; cada sección decide cómo pinta el resaltado. */
export type Tramo = { text: string; acento?: boolean };

export const ENTRENAR = {
  /* Etiqueta de la píldora que abre la sección. */
  badge: "Reflexión clave",

  /* El titular grande. Era la primera línea de la premisa: al maquetarse como
     titular deja de ser una frase más del bloque y pasa a ser la declaración de
     entrada.

     El resaltado va en la última palabra y no en "muchísimo". Los dos montajes
     entregados no coinciden en esto —el de escritorio marca "muchísimo", el de
     móvil "manifestación"— y se elige el segundo porque cae al final de la
     frase: rematar en verde cierra el titular, mientras que marcar una palabra
     del medio lo parte en dos. */
  titular: [
    { text: "Podés saber muchísimo sobre " },
    { text: "manifestación.", acento: true },
  ] as Tramo[],

  /* Las otras dos frases de la premisa, como apoyo del titular. La segunda
     lleva DOS resaltados y no uno: son los dos polos que la frase contrapone
     —saber frente a poder vivir—, y marcarlos por separado es lo que hace
     visible la oposición. */
  apoyos: [
    [
      {
        text: "Podés entender de energía, consciencia, leyes universales y espiritualidad.",
      },
    ],
    [
      { text: "Pero existe una enorme diferencia entre " },
      { text: "saber algo", acento: true },
      { text: " y ser capaz de " },
      { text: "vivirlo", acento: true },
      { text: "." },
    ],
  ] as Tramo[][],

  /* Las tres condicionales, cada una con su icono y su remate resaltado. El
     remate es la palabra en la que el lector se reconoce, y aislarla del resto
     de la frase es lo que convierte la enumeración en reflexión.

     Los iconos se nombran, no se importan: content.ts es data y no debe
     arrastrar componentes de React. */
  sintomas: [
    {
      icono: "duda" as const,
      partes: [
        { text: "Porque si cuando llega el momento de elegir volvés a " },
        { text: "dudar…", acento: true },
      ],
    },
    {
      icono: "corazon" as const,
      partes: [
        { text: "Si sabés que deberías priorizarte, pero volvés a " },
        { text: "dejarte para después…", acento: true },
      ],
    },
    {
      icono: "ojo" as const,
      partes: [
        {
          text: "Si visualizás una realidad diferente, pero seguís reaccionando ",
        },
        { text: "desde los mismos patrones…", acento: true },
      ],
    },
  ] as { icono: "duda" | "corazon" | "ojo"; partes: Tramo[] }[],

  /* El diagnóstico. La constatación va troceada para poder marcar el "no", que
     es la palabra que niega todo lo anterior; el remate va aparte porque se
     pinta en cursiva verde y a otro tamaño. */
  diagnostico: {
    lead: [
      { text: "El problema ya " },
      { text: "no", acento: true },
      { text: " es" },
    ] as Tramo[],
    leadAcento: "falta de información.",
    afirma: "Es la identidad",
    afirmaResto: "desde la que estás viviendo.",
  },

  /* La metáfora que da nombre a la sección. "GYM" se deja en mayúsculas porque
     es una sigla en el original, no un grito. */
  metafora: {
    lead: "Volver al Origen funciona como un",
    resaltado: "GYM para tu identidad",
  },
  desarrollo: [
    "Durante 40 días no venís simplemente a escuchar conceptos.",
    "Venís a observarte, desafiar tus patrones, tomar decisiones diferentes y entrenar una nueva manera de relacionarte con vos mismo y con tu realidad.",
  ],
  cierre: ["No es filosófico.", "Es práctico."],
  cta: "Quiero ser parte de la próxima edición",

  /* El titular que la sección tenía antes del rediseño. Ya no se pinta —los
     montajes arrancan con la píldora y el titular grande— pero sigue siendo el
     nombre de la sección, así que se usa como aria-label: un lector de pantalla
     necesita saber a qué sección ha entrado, y "Podés saber muchísimo sobre
     manifestación" no lo dice. */
  nombre: "No venís a aprender más. Venís a entrenar.",
};

/* ─── 03. Volver al Origen es para vos si… ─────────────────────────────── */

export const PARA_VOS = {
  title: "Volver al Origen",
  titleAccent: "es para vos si…",
  items: [
    "Llevás tiempo trabajando en vos, pero todavía repetís patrones que creías haber superado.",
    "Sabés que necesitás priorizarte, pero te cuesta sostenerte cuando llega el momento de hacerlo.",
    "Consumiste libros, cursos o contenido espiritual, pero sentís que necesitás integrar, no seguir acumulando.",
    "Querés tomar decisiones con mayor seguridad y dejar de cuestionarte constantemente.",
    "Sentís que tu próximo nivel requiere elevar tus estándares, tu entorno y aquello que estás dispuesto a aceptar.",
    "Querés ordenar tu espiritualidad y convertirla en una forma de vivir más simple, práctica y coherente.",
  ],
};

/* ─── 04. ¿Qué vas a entrenar durante el proceso? ──────────────────────── */

/* Los iconos se nombran, no se importan: content.ts es data y no debe arrastrar
   componentes de React. Cada componente traduce el nombre al icono de lucide. */
export const QUE_ENTRENAS = {
  title: "¿Qué vas a entrenar",
  titleAccent: "durante el proceso",
  subtitle: "Una nueva forma de elegir, actuar y sostenerte.",
  items: [
    {
      icon: "crown" as const,
      title: "Priorizarte",
      text: "Dejar de abandonarte en pequeñas decisiones y empezar a construir una vida donde vos también seas una prioridad.",
    },
    {
      icon: "compass" as const,
      title: "Tomar decisiones con claridad",
      text: "Reducir el ruido, confiar más en vos y elegir desde la persona que querés ser, no desde el miedo.",
    },
    {
      icon: "trending" as const,
      title: "Elevar tus estándares",
      text: "Modificar aquello que aceptás en tus relaciones, tu contexto, tus hábitos y tu realidad.",
    },
    {
      icon: "layers" as const,
      title: "Ordenar tu espiritualidad",
      text: "Pasar de conceptos dispersos a principios que realmente puedas aplicar en tu día a día.",
    },
    {
      icon: "anchor" as const,
      title: "Sostener tu nueva identidad",
      text: "Dejar de depender de momentos de motivación para empezar a convertir el cambio en una forma de vivir.",
    },
  ],
};

/* ─── 05. Una experiencia diseñada para tu vida real ───────────────────── */

export const EXPERIENCIA = {
  title: "Una experiencia diseñada para que",
  titleAccent: "lo lleves a tu vida real",
  subtitle: "Esto es parte de lo que vas a encontrar dentro de Volver al Origen.",
  /* Nueve puntos. Los que traen aclaración la llevan en `detalle`; el resto son
     una línea. La rejilla los coloca de dos en dos, así que el orden importa:
     los cortos van emparejados entre sí para que las filas no queden
     descuadradas. */
  items: [
    { text: "6 semanas de transformación en vivo junto a Pilar Sousa" },
    {
      text: "13 mentorías en vivo",
      detalle: "Dos encuentros semanales para avanzar, integrar y profundizar el proceso.",
    },
    {
      text: "13 Códigos Originales para la Manifestación",
      detalle: "Principios prácticos para transformar la manera desde la que creás tu realidad.",
    },
    {
      text: "Material de integración y checkpoints",
      detalle: "Para detectar automatismos y llevar cada aprendizaje a situaciones concretas de tu vida.",
    },
    { text: "Intervenciones personalizadas 1 a 1" },
    { text: "Roadmap personal con un plan de 90 días" },
    { text: "90 días de acompañamiento" },
    { text: "Una comunidad y un contexto diseñado para impulsarte y sostenerte" },
    {
      text: "Acceso a futuros encuentros y experiencias presenciales en diferentes partes del mundo",
    },
  ],
  areasTitle: "Y además, vas a trabajar tres áreas fundamentales de tu realidad",
  areas: [
    {
      icon: "users" as const,
      nombre: "Relaciones",
      lema: "Domina tus espejos",
      text: "Utilizá tus relaciones para observar tus patrones, elevar tu consciencia y transformar la manera en la que te vinculás.",
    },
    {
      icon: "compass" as const,
      nombre: "Propósito",
      lema: "Recuerda y encarna tu misión de vida",
      text: "Reconectá con aquello que querés expresar y comenzá a construir una vida más alineada con tu propósito.",
    },
    {
      icon: "coins" as const,
      nombre: "Dinero",
      lema: "Accede a la cuenta bancaria de Dios",
      text: "Transformá tu relación con recibir, expandirte y permitir mayor abundancia en tu vida.",
    },
  ],
  cta: "Quiero entrar a la lista de espera",
};

/* Símbolos de la nube que gira.

   ⚠️ TEMPORALES. Son diez SVG dibujados a mano para tener el efecto en pie
   mientras llegan las imágenes definitivas del programa. Cuando lleguen, basta
   con sustituir los archivos de public/volver-origen/public/img/nube y ajustar
   los nombres de aquí: el componente no necesita ningún cambio.

   El `name` no es decorativo: es el tooltip nativo que muestra la nube al pasar
   el puntero sobre cada símbolo. */
export const NUBE = [
  { name: "Origen", image: "/volver-origen/public/img/nube/loto.svg" },
  { name: "Ciclos", image: "/volver-origen/public/img/nube/luna.svg" },
  { name: "Consciencia", image: "/volver-origen/public/img/nube/sol.svg" },
  { name: "Visión", image: "/volver-origen/public/img/nube/ojo.svg" },
  { name: "Transformación", image: "/volver-origen/public/img/nube/espiral.svg" },
  { name: "Propósito", image: "/volver-origen/public/img/nube/montania.svg" },
  { name: "Flujo", image: "/volver-origen/public/img/nube/onda.svg" },
  { name: "Crecimiento", image: "/volver-origen/public/img/nube/brote.svg" },
  { name: "Energía", image: "/volver-origen/public/img/nube/chakra.svg" },
  { name: "Manifestación", image: "/volver-origen/public/img/nube/destello.svg" },
];

/* ─── 06. Testimonios ──────────────────────────────────────────────────── */

export const TESTIMONIOS = {
  title: "Lo que dicen quienes",
  titleAccent: "ya volvieron al origen",
  subtitle: "Validado por quienes ya lo vivieron.",
  intro: [
    "No queremos que simplemente nos creas.",
    "Mirá lo que ocurrió con personas que ya atravesaron la experiencia.",
  ],
  cta: "Quiero ser parte de la próxima edición",
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

/* ─── 07. Quién es Pilar Sousa ─────────────────────────────────────────── */

export const PILAR = {
  title: "¿Quién es",
  titleAccent: "Pilar Sousa",
  signature: "Pilar Sousa",
  subtitle:
    "Más de una década convirtiendo una búsqueda espiritual en una forma práctica de vivir.",
  /* Bio entregada por el cliente para esta landing. Es distinta de la de Misión
     Origen —más larga y con otro orden— así que son textos separados a
     propósito y no deben unificarse.

     Las dos frases sueltas del original ("Saber no es suficiente…" y "Por eso
     creé Volver al Origen.") van en `destacados` y no aquí: en el original
     están aisladas entre párrafos y esa separación es la que les da el peso. */
  paragraphs: [
    "Hace más de diez años comenzó mi propio despertar espiritual. Desde entonces inicié una búsqueda profunda por comprender cómo funcionan realmente la consciencia, la identidad y las leyes universales que influyen sobre nuestra experiencia.",
    "Ese camino me llevó a estudiar, experimentar, escribir mi primer libro y acompañar a cientos de personas en sus propios procesos de transformación.",
    "Pero durante esos años entendí algo fundamental:",
  ],
  destacado: "Saber no es suficiente. Hay que encarnarlo.",
  paragraphsPost: [
    "Podemos conocer todas las leyes, consumir todas las formaciones y entender intelectualmente qué deberíamos hacer… y seguir viviendo desde la misma versión de nosotros mismos.",
    "Por eso creé Volver al Origen: un proceso que reúne aquello que he estudiado, vivido e integrado durante estos años para ayudar a otras personas a convertir su espiritualidad en decisiones, estándares y una nueva forma de vivir.",
    "Hoy comparto estas enseñanzas con una comunidad de más de 600.000 personas alrededor del mundo.",
  ],
  /* Etiquetas del botón que despliega la segunda mitad de la historia. */
  verMas: "Ver más",
  verMenos: "Ver menos",
  cta: "Quiero entrar a la lista de espera",
};

/* ─── 08. Entrá ahora a la lista de espera ─────────────────────────────── */

export const LISTA = {
  title: "Entrá ahora a",
  titleAccent: "la lista de espera",
  intro: [
    "Volver al Origen 3.0 abrirá sus puertas próximamente.",
    "Y las personas que estén dentro de la lista serán las primeras en recibir toda la información.",
  ],
  bonosTitle: "Por registrarte tendrás",
  bonos: [
    {
      icon: "clock" as const,
      title: "Acceso anticipado",
      text: "Enterate antes que nadie cuando abramos las plazas.",
    },
    {
      icon: "tag" as const,
      title: "Condiciones especiales",
      text: "Accedé primero a las condiciones disponibles para esta nueva edición.",
    },
    {
      icon: "gift" as const,
      title: "Bonos y regalos exclusivos",
      text: "Recibí beneficios reservados para quienes hayan entrado antes de la apertura oficial.",
    },
  ],
  cierre:
    "Si sentís que tu próxima etapa no necesita más conocimiento, sino una versión de vos capaz de sostenerla, este puede ser tu momento.",
  cta: "Quiero entrar a la lista de espera",
};

/* ─── Preguntas frecuentes ─────────────────────────────────────────────── */

export const FAQ = {
  title: "Preguntas",
  titleAccent: "frecuentes",
  items: [
    {
      q: "¿Registrarme tiene algún coste?",
      a: "No. Entrar a la lista de espera es completamente gratuito.",
    },
    {
      q: "¿Registrarme significa que ya estoy comprando Volver al Origen?",
      a: "No. La lista de espera simplemente te da acceso anticipado a la información sobre la próxima edición.",
    },
    {
      q: "¿Cuándo comienza Volver al Origen 3.0?",
      a: "La fecha de apertura y todos los detalles serán comunicados primero a las personas registradas.",
    },
    {
      q: "¿Necesito conocimientos previos sobre metafísica?",
      a: "No. El programa está diseñado para llevar los conceptos a la práctica independientemente de cuánto hayas estudiado anteriormente.",
    },
    {
      q: "¿Cuánto dura el proceso?",
      a: "El núcleo intensivo se desarrolla durante aproximadamente 40 días y la experiencia incluye acompañamiento durante 90 días.",
    },
  ],
};

/* ─── Pie y página de gracias ──────────────────────────────────────────── */

export const FOOTER = {
  copyright: `© ${new Date().getFullYear()} Pilar Sousa. Todos los derechos reservados.`,
};

export const GRACIAS = {
  badge: "Registro completado",
  title: "Ya estás en la lista de espera de",
  titleAccent: "Volver al Origen 3.0",
  intro: [
    { text: "Pero todavía falta ", strong: false },
    { text: "un último paso importante", strong: true },
    { text: "." },
  ],
  detail: [
    { text: "Para asegurarte de recibir las fechas de apertura, novedades, beneficios especiales y toda la información de la próxima edición, " },
    { text: "entrá ahora al grupo privado de WhatsApp", strong: true },
    { text: ". La información más importante se compartirá por allí." },
  ],
  nudge: "No cierres esta página sin unirte al grupo.",
  cta: "Entrar al grupo privado de WhatsApp",
  disclaimer:
    "El grupo será utilizado únicamente para compartir información relacionada con la próxima edición de Volver al Origen.",
  whatsappUrl: "https://chat.whatsapp.com/HMR8VTK4wFVHczUuCKc24u",
};

/* Destino tras completar el formulario. Vive aquí y no suelto en el formulario
   porque es el final del recorrido que describe este archivo. */
export const GRACIAS_PATH = "/lista-de-espera/gracias";
