"use client";

import { cn } from "@/lib/cn";
import { AcidSquares } from "@/components/diagnostico/ui/AcidSquares";

type AcidSquaresFondoProps = {
  className?: string;
};

export function AcidSquaresFondo({ className }: AcidSquaresFondoProps) {
  return (
    <div className={cn("dg-acid-fondo", className)} aria-hidden>
      <AcidSquares
        color1="#080D04"
        color2="#1A2A0A"
        color3="#D4EF7A"
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
