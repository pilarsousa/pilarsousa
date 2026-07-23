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
export const VALID_CODES: string[] = ["MisionOrigen"];

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
