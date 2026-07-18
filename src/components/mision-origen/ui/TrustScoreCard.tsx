import Image from "next/image";
import { StarBox } from "@/components/mision-origen/ui/StarRating";
import trustpilotLogo from "@/../public/Testimonios/logo-trustpilot.png";

/**
 * Trustpilot-style rating summary card, recolored to the Misión Origen neon
 * palette on a dark face: neon star tiles (StarBox) and neon distribution bars
 * matching the "Plazas vendidas" gradient. Data is real from the client's
 * Trustpilot profile; the logo keeps the brand link.
 */

/* Same gradient as the "plazas vendidas" bar. */
const NEON_BAR = "linear-gradient(90deg,#f90281,#28bff1)";

// Star-rating distribution (percent of reviews at each level).
const DISTRIBUTION: Array<{ label: string; pct: number }> = [
  { label: "5 estrellas", pct: 93.7 },
  { label: "4 estrellas", pct: 6.3 },
  { label: "3 estrellas", pct: 0 },
  { label: "2 estrellas", pct: 0 },
  { label: "1 estrella", pct: 0 },
];

const PROFILE_URL = "https://es.trustpilot.com/review/pilarsousa.es";

export function TrustScoreCard() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl border border-cyan/15 bg-background/60 p-6 text-foreground shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
      {/* Trustpilot logo header — the brand recognition that carries the proof. */}
      {/* Logo ya adaptado para fondo oscuro (estrella neon + texto claro). */}
      <Image
        src={trustpilotLogo}
        alt="Trustpilot"
        sizes="140px"
        className="mx-auto mb-5 h-auto w-35"
      />

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
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
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

      <hr className="my-6 border-white/10" />

      {/* Link to the real Trustpilot profile. */}
      <a
        href={PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-full border border-white/20 py-2.5 text-center text-sm font-semibold transition-colors hover:border-white/40 hover:bg-white/5"
      >
        Ver opiniones en Trustpilot
      </a>
    </div>
  );
}
