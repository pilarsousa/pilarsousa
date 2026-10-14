import { Wordmark } from "@/components/cientifico-v3/ui/Wordmark";
import { Separador } from "@/components/cientifico-v3/ui/Separador";

function Legal() {
  return (
    <div>
      <p className="mx-auto max-w-[420px] text-[0.8125rem] leading-snug text-foreground/75">
        Este sitio no forma parte ni está respaldado por Meta. Facebook es una marca comercial de Meta Platforms, Inc.
      </p>
      <p className="mt-5 text-[0.9375rem] text-foreground/75">
        Pilar Sousa® · Todos los derechos reservados {new Date().getFullYear()}
      </p>
    </div>
  );
}

/**
 * Footer de la referencia: brillo Cosmos desde abajo, wordmark, aviso de Meta
 * y derechos. Sin enlaces legales: el sitio no tiene esas páginas y un enlace
 * a un 404 es peor que ninguno.
 *
 * Con `despedida` (la gracias) pasa a tres columnas en PC: marca a la
 * izquierda, aviso y derechos al centro, despedida a la derecha. En mobile se
 * apilan (despedida, marca, aviso) con un separador entre cada bloque, para
 * que no se lean como un solo texto.
 */
export function Footer({ despedida }: { despedida?: React.ReactNode }) {
  if (!despedida) {
    return (
      <footer className="cv3-brillo-abajo border-b border-white/20 px-5 pb-14 pt-24 text-center sm:pb-16">
        <Wordmark className="text-[2rem] sm:text-[2.25rem]" />
        <div className="mt-5">
          <Legal />
        </div>
      </footer>
    );
  }

  return (
    <footer className="cv3-brillo-abajo border-b border-white/20 px-5 pb-12 pt-16 text-center sm:px-8">
      {/* El orden del DOM es el de mobile; en PC lo reordena el grid. */}
      <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:gap-10">
        <div className="lg:order-3 lg:justify-self-end">{despedida}</div>
        <Separador id="cv3-separador-pie-1" className="max-w-[260px] lg:hidden" />
        <Wordmark className="text-[2rem] sm:text-[2.25rem] lg:order-1 lg:justify-self-start lg:pb-1" />
        <Separador id="cv3-separador-pie-2" className="max-w-[260px] lg:hidden" />
        <div className="lg:order-2">
          <Legal />
        </div>
      </div>
    </footer>
  );
}
