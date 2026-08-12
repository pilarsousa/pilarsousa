import { cn } from "@/lib/cn";
import { StarTile } from "@/components/volver-al-origen/ui/StarTiles";

/*
  Resumen de la puntuación de Trustpilot. Misma información y mismos datos
  reales que la card de Misión Origen (4,8 sobre 80 opiniones, con su reparto
  por estrellas), repintada al verde de la guía.

  El lockup de Trustpilot va dibujado —estrella en SVG más el nombre en texto—
  porque los dos PNG que hay en el repo no sirven sobre fondo oscuro: el de
  Misión Origen tiene la estrella en degradado cian/rosa y el del Bootcamp
  lleva el texto en negro.

  TODO: sustituir por el asset oficial para fondo oscuro del brand center de
  Trustpilot. Su tipografía no es exactamente esta y conviene usar el original.
*/

/* Reparto de reseñas por número de estrellas, en porcentaje. */
const DISTRIBUTION = [
  { label: "5 estrellas", pct: 93.7 },
  { label: "4 estrellas", pct: 6.3 },
  { label: "3 estrellas", pct: 0 },
  { label: "2 estrellas", pct: 0 },
  { label: "1 estrella", pct: 0 },
];

const PROFILE_URL = "https://es.trustpilot.com/review/pilarsousa.es";

function TrustpilotLockup() {
  return (
    <div className="flex items-center justify-center gap-2">
      <svg viewBox="0 0 24 24" className="size-7 text-vo-lumen" aria-hidden>
        <path
          d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01L12 2z"
          fill="currentColor"
        />
      </svg>
      <span className="font-sans text-2xl font-semibold tracking-tight text-foreground">
        Trustpilot
      </span>
    </div>
  );
}

export function TrustScore({ className }: { className?: string } = {}) {
  return (
    <div
      className={cn(
        /* El relleno queda a un paso del tinte de la sección, así que lo que
           define la card no es el fondo sino el borde luminoso y el halo verde.
           Relleno opaco (no translúcido) para que ese medio tono de diferencia
           con la sección no se pierda. */
        "mx-auto w-full rounded-2xl border border-accent/30 bg-vo-forest p-6 text-foreground shadow-[0_24px_60px_-28px_rgba(180,226,54,0.45)]",
        className ?? "max-w-sm",
      )}
    >
      <TrustpilotLockup />

      <div className="mt-5 text-center">
        <p className="font-display text-6xl font-semibold leading-none">
          4,8{" "}
          <span className="align-baseline text-4xl font-medium opacity-70">
            / 5
          </span>
        </p>
        <h3 className="mt-2 font-sans text-xl font-semibold">Excelente</h3>

        <div
          className="mt-4 flex justify-center gap-1.5"
          aria-label="TrustScore: 4,8 sobre 5"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <StarTile key={i} filled size={32} />
          ))}
        </div>

        <p className="mt-3 font-sans text-base opacity-75">80 opiniones</p>
      </div>

      {/* Barras de reparto */}
      <div className="mt-6 space-y-2">
        {DISTRIBUTION.map(({ label, pct }) => (
          <div key={label} className="flex items-center gap-3 font-sans text-base">
            <span className="w-24 shrink-0 text-foreground/75">{label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  background:
                    pct > 0
                      ? "linear-gradient(90deg,#5c8a1f,#b4e236)"
                      : "transparent",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <hr className="my-6 border-white/10" />

      <a
        href={PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-full border border-accent/25 py-3 text-center font-sans text-base font-semibold transition-colors hover:border-accent/60 hover:bg-accent/10"
      >
        Ver opiniones en Trustpilot
      </a>
    </div>
  );
}
