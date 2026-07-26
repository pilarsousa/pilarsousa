import { REWARD_VIDEO_URL } from "@/components/game/game-config";

/*
  Material de la 2ª card ("Archivo Oculto"), visible tras completar el registro
  (o al volver, si ya se registró antes — ver GameGate).

  El material es un video alojado en Go High Level. Se decidió INSERTARLO en la
  web (mejor UX: el usuario no sale del sitio). Para que el <iframe> funcione, la
  URL de REWARD_VIDEO_URL debe ser EMBEBIBLE:
    - Un mp4 directo, o un embed de YouTube/Vimeo → se ve aquí sin problema.
    - Una página de GHL que bloquee el iframe (X-Frame-Options) → NO se podrá
      embeber; en ese caso hay que usar el fallback de enlace de abajo.

  PENDIENTE: cargar el link real en REWARD_VIDEO_URL (game-config.ts). Mientras
  esté vacío se muestra el placeholder, no un iframe roto.
*/

export function GameMaterial() {
  const hasVideo = REWARD_VIDEO_URL.trim().length > 0;

  return (
    <div className="relative w-full max-w-2xl rounded-2xl border border-cyan/25 bg-surface/90 p-5 shadow-[0_0_40px_rgba(40,191,241,0.15)] backdrop-blur-md sm:p-7">
      <div className="mb-5 text-center">
        <h1 className="font-display text-2xl tracking-tight text-white">
          Archivo Oculto desbloqueado
        </h1>
        <p className="mt-2 font-sans text-sm font-light leading-relaxed text-white/65">
          Este es tu material. Ya tenés acceso desde este dispositivo.
        </p>
      </div>

      {hasVideo ? (
        /* Reproductor embebido con controles nativos (play, volumen, pantalla
           completa los da el propio player del origen). */
        <div className="overflow-hidden rounded-xl border border-cyan/20 bg-black">
          <div className="relative aspect-video w-full">
            <iframe
              src={REWARD_VIDEO_URL}
              title="Archivo Oculto — material"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      ) : (
        /* Placeholder mientras no haya link cargado. */
        <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/3 px-6 text-center">
          <p className="font-sans text-sm font-light text-white/45">
            [ Material pendiente — cargar el link del video en{" "}
            <span className="font-mono text-white/60">
              REWARD_VIDEO_URL
            </span>{" "}
            (game-config.ts).
            <br className="hidden sm:block" />
            Si GHL no permite embeberlo, usar el botón de enlace. ]
          </p>
        </div>
      )}
    </div>
  );
}
