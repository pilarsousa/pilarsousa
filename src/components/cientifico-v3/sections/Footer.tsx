import { Wordmark } from "@/components/cientifico-v3/ui/Wordmark";

/**
 * Footer de la referencia: brillo Cosmos desde abajo, wordmark, aviso de Meta
 * y derechos. Sin enlaces legales: el sitio no tiene esas páginas y un enlace
 * a un 404 es peor que ninguno.
 */
export function Footer() {
  return (
    <footer className="cv3-brillo-abajo border-b border-white/20 px-5 pb-14 pt-24 text-center sm:pb-16">
      <Wordmark className="text-[2rem] sm:text-[2.25rem]" />
      <p className="mx-auto mt-5 max-w-[420px] text-[0.8125rem] leading-snug text-foreground/75">
        Este sitio no forma parte ni está respaldado por Meta. Facebook es una marca comercial de Meta Platforms, Inc.
      </p>
      <p className="mt-5 text-[0.9375rem] text-foreground/75">
        Pilar Sousa® · Todos los derechos reservados {new Date().getFullYear()}
      </p>
    </footer>
  );
}
