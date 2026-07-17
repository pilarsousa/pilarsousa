import Image from "next/image";
import { Star } from "lucide-react";
import trustpilotLogo from "@/../public/Trustpilot_logo.png";

/**
 * Trustpilot-style rating summary card, rebuilt with our own markup (the
 * original Trustpilot classes are theirs and unavailable here). Trustpilot's
 * green, the star shapes and the light card face are kept intact — that brand
 * recognition is what gives the social proof its weight, so it is not
 * recolored to the neon palette.
 *
 * Data is real from the client's Trustpilot profile.
 */

const TRUST_GREEN = "#00b67a";

/* Trustpilot's own card is light; keeping it that way preserves the
   screenshot-like credibility against the dark section behind it. */
const CARD_FACE = "#f7f7f5";
const CARD_INK = "#1a1a1a";

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
    <div
      className="mx-auto w-full max-w-sm rounded-2xl border border-cyan/15 p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
      style={{ backgroundColor: CARD_FACE, color: CARD_INK }}
    >
      {/* Trustpilot logo header — the brand recognition that carries the proof. */}
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

        {/* Five filled Trustpilot-green star tiles. */}
        <div
          className="mt-3 flex justify-center gap-1"
          aria-label="TrustScore: 4,8 sobre 5"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="flex size-7 items-center justify-center rounded-[3px]"
              style={{ backgroundColor: TRUST_GREEN }}
            >
              <Star size={18} className="fill-white text-white" />
            </span>
          ))}
        </div>

        <p className="mt-3 text-sm opacity-70">80 opiniones</p>
      </div>

      {/* Distribution bars. */}
      <div className="mt-6 space-y-2">
        {DISTRIBUTION.map(({ label, pct }) => (
          <div key={label} className="flex items-center gap-3 text-sm">
            <span className="w-20 shrink-0 opacity-80">{label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/10">
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  backgroundColor: pct > 0 ? TRUST_GREEN : "transparent",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <hr className="my-6 border-black/10" />

      {/* Link to the real Trustpilot profile. */}
      <a
        href={PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-full border border-black/20 py-2.5 text-center text-sm font-semibold transition-colors hover:border-black/40 hover:bg-black/5"
      >
        Ver opiniones en Trustpilot
      </a>
    </div>
  );
}
