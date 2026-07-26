import { REWARD_VIDEO_URL } from "@/components/game/game-config";

/*
  Material de la 2ª card ("Archivo Oculto"), visible tras completar el registro
  (o al volver, si ya se registró antes — ver GameGate).

  El material es un mp4 directo alojado en el CDN de GHL (filesafe.space). Al ser
  un archivo de video y no una página, se reproduce con el elemento <video>
  nativo — mejores controles (play, volumen, pantalla completa, barra de
  progreso con seeking) que un iframe, y sin riesgo de X-Frame-Options.

  IMPORTANTE — el archivo pesa ~1.28 GB. Por eso:
    - preload="metadata": sólo baja lo mínimo para pintar el player; el video se
      descarga cuando el usuario pulsa play, no al cargar la página.
    - sin autoplay: descargar 1.28 GB a cada visitante sin que lo pida sería un
      derroche de datos (y de la factura del CDN).
  El origen soporta Accept-Ranges (verificado), así que adelantar/retroceder
  funciona sin bajar el archivo entero.
*/

export function GameMaterial() {
  const hasVideo = REWARD_VIDEO_URL.trim().length > 0;

  return (
    /* Más ancho que el resto de las cards de /game (max-w-4xl): un video 16:9
       necesita ancho para no verse diminuto, sobre todo en mobile. Padding
       reducido en mobile (p-3) para que el video gane los pocos píxeles que la
       card le robaba a los lados. */
    <div className="relative w-full max-w-4xl rounded-2xl border border-cyan/25 bg-surface/90 p-3 shadow-[0_0_40px_rgba(40,191,241,0.15)] backdrop-blur-md sm:p-6">
      <div className="mb-3 text-center sm:mb-5">
        <h1 className="font-display text-xl tracking-tight text-white sm:text-2xl">
          Archivo Oculto desbloqueado
        </h1>
        <p className="mt-2 font-sans text-xs font-light leading-relaxed text-white/65 sm:text-sm">
          Este es tu material. Ya tenés acceso desde este dispositivo.
        </p>
      </div>

      {hasVideo ? (
        <div className="overflow-hidden rounded-xl border border-cyan/20 bg-black">
          <video
            controls
            preload="metadata"
            playsInline
            className="aspect-video w-full"
          >
            <source src={REWARD_VIDEO_URL} type="video/mp4" />
            Tu navegador no puede reproducir este video.{" "}
            <a href={REWARD_VIDEO_URL} className="text-cyan underline">
              Abrilo en una pestaña nueva
            </a>
            .
          </video>
        </div>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/3 px-6 text-center">
          <p className="font-sans text-sm font-light text-white/45">
            [ Material pendiente — cargar el link del video en{" "}
            <span className="font-mono text-white/60">REWARD_VIDEO_URL</span>{" "}
            (game-config.ts). ]
          </p>
        </div>
      )}

      {/* Pantalla completa: en mobile un 16:9 embebido siempre es chico; este
          atajo lleva el video a fullscreen usando los controles nativos. */}
      {hasVideo && (
        <p className="mt-3 text-center font-sans text-xs font-light text-white/45">
          ¿Se ve pequeño? Usá el botón de pantalla completa del reproductor.
        </p>
      )}
    </div>
  );
}
