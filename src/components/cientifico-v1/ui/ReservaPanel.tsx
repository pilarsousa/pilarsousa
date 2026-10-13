import { NeonText } from "@/components/cientifico-v1/ui/NeonText";
import { ReservaForm } from "@/components/cientifico-v1/ui/ReservaForm";

/**
 * The "Reserva tu plaza" HUD panel — header + registration form. Shared by the
 * Hero (originally embedded there) and the ReservaModal, so the panel exists in
 * a single place and never drifts between the two.
 */
export function ReservaPanel({
  submitLabel,
  onSuccess,
}: {
  submitLabel?: string;
  /** Forwarded to the form — the modal uses it to close itself on success. */
  onSuccess?: () => void;
}) {
  return (
    <div className="cv1-verde group/form relative overflow-hidden rounded-[22px] border border-cyan/30 bg-[#1e1730]/95 p-6 backdrop-blur-md shadow-[0_0_0_1px_rgba(125,168,154,0.08),0_0_40px_rgba(75,58,107,0.25),inset_0_1px_0_rgba(213,229,222,0.08)]">
      {/* Glow ambiental interior — pulso suave tipo panel activo */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px -z-0 animate-scan-pulse"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(125,168,154,0.14) 0%, transparent 70%)",
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
        {/* Cabecera del formulario — "Reserva tu plaza" es un badge (pill con
            borde), no un eyebrow suelto: marca el bloque sin robarle jerarquía
            al titular. El titular usa el rosa/violeta de marca en vez del cyan,
            que ya carga el resto del panel (bordes, scan-line, esquinas). */}
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center rounded-full border border-hot-pink/40 bg-hot-pink/10 px-3 py-1 font-sans text-sm font-semibold uppercase tracking-[0.12em] text-foreground">
            Reserva tu plaza
          </span>
          <h2 className="font-display leading-tight">
            <NeonText variant="multi" className="block text-2xl font-semibold sm:text-3xl">
              Plazas limitadas
            </NeonText>
            <NeonText variant="arena" className="mt-1 block text-lg font-light sm:text-xl">
              asegura la tuya
            </NeonText>
          </h2>
        </div>

        {/* Formulario con validación real (client component) */}
        <ReservaForm submitLabel={submitLabel} onSuccess={onSuccess} />
      </div>
    </div>
  );
}
