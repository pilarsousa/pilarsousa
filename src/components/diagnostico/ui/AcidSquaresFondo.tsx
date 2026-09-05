"use client";

import { cn } from "@/lib/cn";
import { AcidSquares } from "@/components/diagnostico/ui/AcidSquares";

type AcidSquaresFondoProps = {
  className?: string;
};

export function AcidSquaresFondo({ className }: AcidSquaresFondoProps) {
  return (
    <div className={cn("dg-acid-fondo", className)} aria-hidden>
      {/* ⚠️ LOS COLORES VAN AQUÍ Y NO EN EL CSS: el fondo es un canvas y los
          recibe como props, así que .dg-acid-fondo no puede tocarlos.

          Son los tres de la marca —verde, verde 2 y crema— traducidos uno a uno
          desde la paleta anterior, que era casi negro, oliva y lima. Si cambia
          la paleta hay que tocar este archivo Y la regla del CSS. */}
      <AcidSquares
        color1="#002F01"
        color2="#084A2C"
        color3="#FFF8F0"
        detail="medium"
        speed={0.75}
        waveDepth={1}
        zoom={1.15}
        density={10}
        glow={1.1}
        exposure={2700}
        spread={0.3}
        stepSize={0.002}
        colorShift={0}
        contrast={1.15}
        brightness={0.9}
        opacity={1}
        mouseInteraction
        mouseStrength={0.1}
        mouseRadius={0.35}
        blur={0}
        grain
        grainIntensity={0.05}
      />
    </div>
  );
}
