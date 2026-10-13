import { cn } from "@/lib/cn";

type ScrollArrowProps = {
  className?: string;
  /** Pixel size of the circle (width & height). Default 64. */
  size?: number;
};

/**
 * Down-arrow inside a neon circle — recreated as a vector so it has a truly
 * transparent background, scales without pixelation, and uses the Volver al Origen
 * palette instead of a raster asset.
 *
 * The circle carries the Verde Origen gradient of the main CTA
 * with a top highlight and a soft outer glow for a "button" volume. The arrow is
 * a dark glyph so it reads on top of the bright fill.
 */
export function ScrollArrow({ className, size = 64 }: ScrollArrowProps) {
  /* IDs únicos por tamaño: la página monta dos flechas (mobile y desktop) y
     una queda en display:none. Con IDs repetidos el navegador resolvía
     url(#...) contra la oculta y el disco salía sin relleno. */
  const uid = `scrollArrow-${size}`;

  return (
    <svg
      role="img"
      aria-label="Bajar"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block", className)}
    >
      <defs>
        {/* Relleno Verde Origen, mismo degradé que el botón principal */}
        <linearGradient id={`${uid}-Fill`} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4B6E64" />
          <stop offset="45%" stopColor="#2E4A43" />
          <stop offset="100%" stopColor="#263D37" />
        </linearGradient>

        {/* Top-to-bottom light sheen that gives the disc its volume */}
        <linearGradient id={`${uid}-Sheen`} x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
        </linearGradient>

        {/* Soft outer glow */}
        <filter id={`${uid}-Glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Drop shadow — gives the disc depth so it floats above the page */}
        <filter id={`${uid}-Shadow`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#22332E" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Glow halo behind the disc */}
      <circle cx="32" cy="32" r="27" fill={`url(#${uid}-Fill)`} opacity="0.35" filter={`url(#${uid}-Glow)`} />

      {/* Main disc — carries the drop shadow */}
      <circle cx="32" cy="32" r="27" fill={`url(#${uid}-Fill)`} filter={`url(#${uid}-Shadow)`} />

      {/* Volume sheen on top of the disc */}
      <circle cx="32" cy="32" r="27" fill={`url(#${uid}-Sheen)`} />

      {/* Crisp edge — subtle dark ring, no white halo */}
      <circle cx="32" cy="32" r="26.5" stroke="#000000" strokeOpacity="0.25" strokeWidth="1" />

      {/* Down arrow — dark glyph, reads on the bright fill */}
      <path
        d="M32 20V42M32 42L23 33M32 42L41 33"
        stroke="#F4EEE4"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
