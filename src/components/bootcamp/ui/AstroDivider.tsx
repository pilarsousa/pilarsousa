import styles from "./AstroDivider.module.css";

/**
 * AstroDivider — luxury gold separator between sections.
 *
 * A glowing gold hairline broken by a centered medallion with a star glyph.
 * Purely decorative: hidden from assistive tech. Micro-animations (glow pulse
 * + slow star rotation) respect prefers-reduced-motion.
 */
export function AstroDivider() {
  return (
    <div aria-hidden className={styles.divider}>
      <div className={styles.mask} />
      <span className={styles.badge}>
        <i>&#10038;</i>
      </span>
    </div>
  );
}
