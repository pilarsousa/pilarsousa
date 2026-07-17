import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { ReservaForm } from "@/components/mision-origen/ui/ReservaForm";

/**
 * The "Reserva tu plaza" HUD panel — header + registration form. Shared by the
 * Hero (originally embedded there) and the ReservaModal, so the panel exists in
 * a single place and never drifts between the two.
 */
export function ReservaPanel({ submitLabel }: { submitLabel?: string }) {
  return (
    <div className="group/form relative overflow-hidden rounded-md border border-cyan/30 bg-black/75 p-6 backdrop-blur-md shadow-[0_0_0_1px_rgba(40,191,241,0.08),0_0_40px_rgba(135,36,120,0.25),inset_0_1px_0_rgba(174,240,254,0.08)]">
      {/* Glow ambiental interior — pulso suave tipo panel activo */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px -z-0 animate-scan-pulse"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(40,191,241,0.14) 0%, transparent 70%)",
        }}
      />

      {/* Scan-line horizontal que barre el panel (HUD) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan/70 to-transparent animate-scan-pulse"
      />

      {/* Neon corner accents */}
      <span aria-hidden className="absolute left-0 top-0 h-12 w-0.5 bg-linear-to-b from-cyan to-transparent" />
      <span aria-hidden className="absolute left-0 top-0 h-0.5 w-12 bg-linear-to-r from-cyan to-transparent" />
      <span aria-hidden className="absolute bottom-0 right-0 h-12 w-0.5 bg-linear-to-t from-neon-pink to-transparent" />
      <span aria-hidden className="absolute bottom-0 right-0 h-0.5 w-12 bg-linear-to-l from-neon-pink to-transparent" />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Cabecera del formulario */}
        <div className="flex flex-col gap-2">
          <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-cyan/80">
            Reserva tu plaza
          </p>
          <h2 className="font-display leading-tight text-white">
            <span className="block text-2xl sm:text-3xl">Plazas limitadas</span>
            <NeonText
              variant="violet"
              className="mt-1 block text-lg font-light sm:text-xl"
            >
              asegura la tuya
            </NeonText>
          </h2>
        </div>

        {/* Formulario con validación real (client component) */}
        <ReservaForm submitLabel={submitLabel} />
      </div>
    </div>
  );
}
