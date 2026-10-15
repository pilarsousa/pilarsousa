import Image from "next/image";
import { Star } from "lucide-react";
import trustpilotLogo from "@/../public/bootcamp-landing/Trustpilot_logo.png";

/**
 * Resumen de valoraciones de Trustpilot, copia del de /bootcamp-v2 en papel
 * crema. El verde y las estrellas de Trustpilot se mantienen: ese
 * reconocimiento es lo que le da peso a la prueba, así que no se pasan a oro.
 *
 * Sin el botón "Ver opiniones en Trustpilot": el brief pide que nada saque de
 * la página. Datos reales del perfil de la cliente.
 */

const TRUST_GREEN = "#00b67a";

// Distribución por estrellas (porcentaje de reseñas). Cada nivel conserva el
// color de barra de Trustpilot.
const DISTRIBUCION: Array<{ label: string; pct: number; color: string }> = [
  { label: "5 estrellas", pct: 95, color: TRUST_GREEN },
  { label: "4 estrellas", pct: 5, color: "#73cf11" },
  { label: "3 estrellas", pct: 0, color: "#ffce00" },
  { label: "2 estrellas", pct: 0, color: "#ff8622" },
  { label: "1 estrella", pct: 0, color: "#ff3722" },
];

export function TrustScoreCard() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl bg-[#f3eedc] p-6 text-[#12291f] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.75)]">
      <Image src={trustpilotLogo} alt="Trustpilot" sizes="140px" className="mx-auto mb-5 h-auto w-35" />

      <div className="text-center">
        <p className="font-display text-5xl font-bold leading-none">
          4,9 <span className="align-baseline text-3xl font-semibold opacity-70">/ 5</span>
        </p>
        <h3 className="mt-2 text-lg font-bold">Excelente</h3>

        <div className="mt-3 flex justify-center gap-1" role="img" aria-label="TrustScore: 4,9 sobre 5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              aria-hidden
              className="flex size-7 items-center justify-center rounded-[3px]"
              style={{ backgroundColor: TRUST_GREEN }}
            >
              <Star size={18} className="fill-white text-white" />
            </span>
          ))}
        </div>

        <p className="mt-3 text-base opacity-75">115 opiniones</p>
      </div>

      <div className="mt-6 space-y-2">
        {DISTRIBUCION.map(({ label, pct, color }) => (
          <div key={label} className="flex items-center gap-3 text-sm">
            <span className="w-20 shrink-0 opacity-80">{label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#12291f]/10">
              <span
                className="block h-full rounded-full"
                style={{ width: `${pct}%`, backgroundColor: pct > 0 ? color : "transparent" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
