import Image from "next/image";
import { cn } from "@/lib/cn";
import { FECHA_CORTA } from "@/components/cientifico-v3/content";
import foto from "@/../public/mision-origen-venta/herosection.jpg";

/**
 * Entrada 3D al evento: cuerpo con la foto de Pilar en duotono (círculo de
 * geometría sagrada detrás) y talón de papel con la fecha y el código de
 * barras. Todo escala con el ancho (cqw), así que el tamaño lo da `className`
 * (w-*), y la inclinación también (rotate-*).
 *
 * `talon="sin"` la dibuja sin talón, para poner al lado un <TalonSuelto>
 * (cierre de la landing), como en la referencia.
 */
export function Entrada({
  className,
  talon = "pegado",
  sizes = "320px",
}: {
  className?: string;
  talon?: "pegado" | "sin";
  sizes?: string;
}) {
  return (
    <div aria-hidden className={cn("cv3-entrada pointer-events-none select-none", className)}>
      <div className="cv3-entrada__cuerpo">
        <Image
          src={foto}
          alt=""
          fill
          sizes={sizes}
          /* La cara está en el tercio derecho de la foto (1920 × 750). */
          className="cv3-entrada__foto object-[74%_30%]"
        />
        <div className="cv3-entrada__velo" />
        <div className="cv3-entrada__texto">
          <p className="cv3-entrada__vivo">En vivo online</p>
          <p className="cv3-entrada__marca">
            <span className="font-light">Volver al </span>
            <span className="cv3-grad-texto font-extrabold">Origen</span>
          </p>
          <p className="cv3-entrada__lema">
            El método para manifestar
            <br />
            resultados que puedes comprobar.
          </p>
        </div>
      </div>

      {talon === "pegado" && <Talon />}
    </div>
  );
}

/** Talón de papel. Se exporta para el cierre, donde va suelto. */
export function Talon({ className }: { className?: string }) {
  return (
    <div className={cn("cv3-entrada__talon", className)}>
      <span className="cv3-entrada__fecha">{FECHA_CORTA}</span>
      <span className="cv3-entrada__barras" />
      <span className="cv3-entrada__letra" />
    </div>
  );
}

/**
 * Talón suelto, para componerlo aparte de la entrada (cierre). Es su propio
 * contenedor de medida; .cv3-entrada--talon reescala sus cqw.
 */
export function TalonSuelto({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("cv3-entrada cv3-entrada--talon pointer-events-none select-none", className)}>
      <Talon />
    </div>
  );
}
