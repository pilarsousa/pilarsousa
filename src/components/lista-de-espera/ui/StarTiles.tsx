type StarTileProps = {
  filled: boolean;
  size: number;
};

export function StarTile({ filled, size }: StarTileProps) {
  return (
    <span
      aria-hidden
      className={
        filled
          ? "relative inline-flex items-center justify-center rounded-[3px] bg-vo-matrix"
          : "relative inline-flex items-center justify-center rounded-[3px] bg-white/10"
      }
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.72}
        height={size * 0.72}
        fill={filled ? "#ffffff" : "rgba(255,255,255,0.3)"}
        aria-hidden
      >
        <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01L12 2z" />
      </svg>
    </span>
  );
}

type StarTilesProps = {
  value: number;
  total?: number;
  size?: number;
};

export function StarTiles({ value, total = 5, size = 18 }: StarTilesProps) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${value} de ${total} estrellas`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <StarTile key={i} filled={i < value} size={size} />
      ))}
    </div>
  );
}
