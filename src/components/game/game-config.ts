/*
  Configuración de la landing /game — EDITÁ ESTE ARCHIVO, no los componentes.

  Aquí vive todo lo que cambia con el negocio: los códigos válidos, el contenido
  que se muestra como vista previa al canjear un código, y las rutas a los PDFs
  descargables. Cambiar cualquiera de estos valores no requiere tocar la lógica
  de la página.

  ⚠️ Sobre la validación del código: se hace en el navegador (fue la opción
  elegida). Eso significa que cualquiera que inspeccione el sitio puede ver los
  códigos de abajo y el contenido de la vista previa. No pongas acá nada que
  deba permanecer secreto de verdad — para eso habría que validar en el servidor.
*/

/* ─────────────────────────── Códigos válidos ───────────────────────────
   Los códigos que le vas a dar a los clientes. La comparación ignora
   mayúsculas/minúsculas y espacios sobrantes. Agregá o quitá los que quieras. */
export const VALID_CODES: string[] = ["MISIONORIGEN"];

/* Normaliza un código tipeado por el usuario para compararlo sin importar
   mayúsculas ni espacios al principio/final. */
export function isValidCode(input: string): boolean {
  const normalized = input.trim().toUpperCase();
  return VALID_CODES.some((code) => code.trim().toUpperCase() === normalized);
}

/* ──────────────────────── Vista previa del contenido ────────────────────
   Lo que se muestra dentro de la modal cuando el código es correcto, como
   "vista previa" de lo que trae el PDF. Editá el título, la intro y las
   secciones libremente. Podés agregar o quitar secciones del array. */
export type ContentSection = {
  heading: string;
  body: string;
  /* Opcional: viñetas debajo del párrafo. */
  bullets?: string[];
};

export const UNLOCK_CONTENT: {
  title: string;
  intro: string;
  sections: ContentSection[];
} = {
  title: "Contenido desbloqueado",
  intro:
    "Este es un adelanto del material. El PDF completo incluye todo el desglose paso a paso.",
  sections: [
    {
      heading: "Sección 1 — Título de ejemplo",
      body: "Reemplazá este texto por el contenido real. Podés escribir uno o varios párrafos por sección.",
      bullets: [
        "Punto de ejemplo uno",
        "Punto de ejemplo dos",
        "Punto de ejemplo tres",
      ],
    },
    {
      heading: "Sección 2 — Otro bloque",
      body: "Otro bloque de contenido de ejemplo para que veas cómo se apila la vista previa dentro de la modal.",
    },
  ],
};

/* ───────────────────────────── PDFs descargables ─────────────────────────
   Rutas (desde /public) a los PDFs que se descargan. Subí los archivos a
   public/game/pdf/ con estos nombres — o cambiá los nombres de acá para que
   coincidan con los tuyos. Mientras el archivo no exista, el botón dará 404. */
export const CONTENT_PDF = "/game/pdf/contenido.pdf"; // botón de la modal de código
export const REWARD_PDF = "/game/pdf/recompensa.pdf"; // botón tras completar el form

/* PDF que descarga el botón de la modal de la 1ª card (/game/home).
   El archivo se renombró a un nombre sin acentos/espacios para que la URL
   resuelva siempre; el nombre "lindo" se define en el atributo download. */
export const PRINCIPIOS_PDF = "/game/pdf/33-principios-cuanticos-mision-origen.pdf";

/* ───────────────────────── Material de la 2ª card ────────────────────────
   Video del "Archivo Oculto", que se muestra tras completar el registro de la
   2ª card (ver GameMaterial / GameGate). mp4 directo del CDN de GHL: se
   reproduce con <video> nativo (controles completos, seeking).

   OJO: el archivo pesa ~1.28 GB. GameMaterial usa preload="metadata" y no
   autoplay para no descargarlo entero a cada visitante. Si algún día se sube
   una versión más liviana o comprimida, reemplazá esta URL. */
export const REWARD_VIDEO_URL =
  "https://assets.cdn.filesafe.space/cJQdXHXCPXZIpQkUiwgI/media/6a07782e2e98e28fa112fbf9.mp4";

/* ─────────────────────────── Cuestionario de /game/form ──────────────────
   Las 6 preguntas del flujo de /game/form (paso posterior al Gmail). Se responden
   con texto libre (el usuario escribe lo que quiera). Podés editar el texto, y
   agregar o quitar preguntas: el flujo se adapta al largo del array.

   El orden define en qué columna se guarda cada respuesta (1ª → respuesta_1, …).
   El `id` es la clave con la que viaja la respuesta en el payload. */
export type QuizQuestion = {
  id: string;
  question: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question:
      "¿Qué es aquello que más te gustaría transformar en tu vida en este momento y por qué?",
  },
  {
    id: "q2",
    question:
      "¿Qué es lo que más te está frenando hoy para vivir la vida que realmente deseas?",
  },
  {
    id: "q3",
    question:
      "¿Qué has intentado hasta ahora para cambiar tu realidad y por qué crees que todavía no has conseguido los resultados que buscas?",
  },
  {
    id: "q4",
    question:
      "Si dentro de un año tu vida fuera exactamente como sueñas, ¿cómo sería? Cuéntanoslo con el mayor detalle posible.",
  },
  {
    id: "q5",
    question:
      "¿Cuál es tu mayor miedo si dentro de 5 años sigues exactamente en el mismo lugar en el que estás hoy?",
  },
  {
    id: "q6",
    question:
      "¿Qué decisión o cambio sabes que llevas demasiado tiempo posponiendo en tu vida?",
  },
];
