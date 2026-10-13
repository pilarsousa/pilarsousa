import { Star } from "lucide-react";
import { StarBox } from "@/components/cientifico-v1/ui/StarRating";
import { cn } from "@/lib/cn";

/**
 * Trustpilot-style rating summary card on a glass face, in the Científico V1
 * palette: gradient star tiles (StarBox) and gradient distribution bars
 * matching the "Plazas vendidas" gradient. Data is real from the client's
 * Trustpilot profile; the logo keeps the brand link.
 */

/* Same gradient as the "plazas vendidas" bar. */
const NEON_BAR = "linear-gradient(90deg,#a391b8,#7da89a)";

// Star-rating distribution (percent of reviews at each level).
const DISTRIBUTION: Array<{ label: string; pct: number }> = [
  { label: "5 estrellas", pct: 93.7 },
  { label: "4 estrellas", pct: 6.3 },
  { label: "3 estrellas", pct: 0 },
  { label: "2 estrellas", pct: 0 },
  { label: "1 estrella", pct: 0 },
];

const PROFILE_URL = "https://es.trustpilot.com/review/pilarsousa.es";

export function TrustScoreCard({ className }: { className?: string } = {}) {
  return (
    <div
      className={cn(
        "cv1-vidrio mx-auto w-full rounded-[24px] p-6 text-foreground",
        className ?? "max-w-sm",
      )}
    >
      {/* Marca Trustpilot. El PNG de mision-origen tiene el texto gris claro
          (pensado para fondo oscuro) y sobre el vidrio claro no se leía: acá
          va la estrella en el verde de Trustpilot y el nombre en texto. */}
      <p className="mb-5 flex items-center justify-center gap-1.5 font-sans text-lg font-semibold tracking-tight text-foreground">
        <Star aria-hidden size={22} fill="#00b67a" stroke="none" />
        Trustpilot
      </p>

      {/* Score + label + stars + count. */}
      <div className="text-center">
        <p className="font-display text-5xl font-semibold leading-none">
          4,8{" "}
          <span className="align-baseline text-3xl font-medium opacity-70">
            / 5
          </span>
        </p>
        <h3 className="mt-2 text-lg font-semibold">Excelente</h3>

        {/* Five neon star tiles (StarBox) — mismo estilo que los testimonios. */}
        <div
          className="mt-3 flex justify-center gap-1"
          aria-label="TrustScore: 4,8 sobre 5"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <StarBox key={i} filled size={28} />
          ))}
        </div>

        <p className="mt-3 text-sm opacity-70">80 opiniones</p>
      </div>

      {/* Distribution bars — degradado neon como el de "plazas vendidas". */}
      <div className="mt-6 space-y-2">
        {DISTRIBUTION.map(({ label, pct }) => (
          <div key={label} className="flex items-center gap-3 text-sm">
            <span className="w-20 shrink-0 text-foreground/70">{label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-foreground/10">
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  background: pct > 0 ? NEON_BAR : "transparent",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <hr className="my-6 border-foreground/10" />

      {/* Link to the real Trustpilot profile. */}
      <a
        href={PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-full border border-foreground/20 py-2.5 text-center text-sm font-semibold transition-colors hover:border-foreground/40 hover:bg-white/60"
      >
        Ver opiniones en Trustpilot
      </a>
    </div>
  );
}
