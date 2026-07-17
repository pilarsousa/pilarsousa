import { cn } from "@/lib/cn";

type ScrollArrowProps = {
  className?: string;
  /** Pixel size of the circle (width & height). Default 64. */
  size?: number;
};

/**
 * Down-arrow inside a neon circle — recreated as a vector so it has a truly
 * transparent background, scales without pixelation, and uses the Misión Origen
 * palette instead of a raster asset.
 *
 * The circle carries a multicolor neon gradient (cyan → magenta → electric blue)
 * with a top highlight and a soft outer glow for a "button" volume. The arrow is
 * a dark glyph so it reads on top of the bright fill.
 */
export function ScrollArrow({ className, size = 64 }: ScrollArrowProps) {
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
        {/* Multicolor neon fill — cyan → magenta → electric blue */}
        <linearGradient id="scrollArrowFill" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#28BFF1" />
          <stop offset="45%" stopColor="#F90281" />
          <stop offset="100%" stopColor="#495CC4" />
        </linearGradient>

        {/* Top-to-bottom light sheen that gives the disc its volume */}
        <linearGradient id="scrollArrowSheen" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#AEF0FE" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
        </linearGradient>

        {/* Soft outer neon glow */}
        <filter id="scrollArrowGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Drop shadow — gives the disc depth so it floats above the page */}
        <filter id="scrollArrowShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Glow halo behind the disc */}
      <circle cx="32" cy="32" r="27" fill="url(#scrollArrowFill)" opacity="0.35" filter="url(#scrollArrowGlow)" />

      {/* Main disc — carries the drop shadow */}
      <circle cx="32" cy="32" r="27" fill="url(#scrollArrowFill)" filter="url(#scrollArrowShadow)" />

      {/* Volume sheen on top of the disc */}
      <circle cx="32" cy="32" r="27" fill="url(#scrollArrowSheen)" />

      {/* Crisp edge — subtle dark ring, no white halo */}
      <circle cx="32" cy="32" r="26.5" stroke="#000000" strokeOpacity="0.25" strokeWidth="1" />

      {/* Down arrow — dark glyph, reads on the bright fill */}
      <path
        d="M32 20V42M32 42L23 33M32 42L41 33"
        stroke="#170f22"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
