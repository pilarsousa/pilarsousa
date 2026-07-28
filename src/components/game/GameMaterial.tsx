import { Download, FileText } from "lucide-react";
import { ARCHIVO_OCULTO_PDF } from "@/components/game/game-config";

/*
  Material de la 2ª card ("Archivo Oculto"), visible tras completar el registro
  (o al volver, si ya se registró antes — ver GameGate).

  El recurso desbloqueado es el PDF "El Archivo Oculto — Código 6 Desclasificado".
*/

export function GameMaterial() {
  return (
    <div className="relative w-full max-w-md rounded-2xl border border-cyan/25 bg-surface/90 p-7 text-center shadow-[0_0_40px_rgba(40,191,241,0.15)] backdrop-blur-md sm:p-9">
      <div className="mb-7 flex flex-col items-center">
        <span className="grid size-16 place-items-center rounded-full border border-cyan/40 bg-cyan/10 text-cyan shadow-[0_0_24px_rgba(40,191,241,0.32)]">
          <FileText size={30} aria-hidden />
        </span>
        <h1 className="mt-5 font-display text-xl tracking-tight text-white sm:text-2xl">
          Archivo Oculto desbloqueado
        </h1>
        <p className="mt-2 font-sans text-xs font-light leading-relaxed text-white/65 sm:text-sm">
          Descargá tu PDF y guardalo. Ya tenés acceso desde este dispositivo.
        </p>
      </div>

      <div className="rounded-2xl border border-cyan/20 bg-black/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <p className="font-[family-name:var(--font-pixelify)] text-sm font-bold uppercase leading-relaxed tracking-[0.05em] text-white sm:text-base">
          El Archivo Oculto:
          <br />
          Código 6 Desclasificado
        </p>
        <a
          href={ARCHIVO_OCULTO_PDF}
          download="El Archivo Oculto - Codigo 6 Desclasificado.pdf"
          className="neon-btn mt-6 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full px-6 text-base font-bold uppercase tracking-[0.06em] transition-all duration-300 ease-out active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Download size={20} aria-hidden />
          <span>Descargar PDF</span>
        </a>
      </div>
    </div>
  );
}
