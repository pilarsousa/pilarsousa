import { cn } from "@/lib/cn";

/** Firma "Pilar Sousa" en manuscrita (Mrs Saint Delafield), en Arena Dorada. */
export function Firma({ className }: { className?: string }) {
  return (
    <span className={cn("cv3-firma inline-block -rotate-6 whitespace-nowrap", className)}>
      Pilar Sousa
    </span>
  );
}
