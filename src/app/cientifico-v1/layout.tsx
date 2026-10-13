import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/cientifico-v1/ui/AnnouncementBar";
import { ReservaModalProvider } from "@/components/cientifico-v1/ui/ReservaModal";
import { VersionBadge } from "@/components/cientifico-v1/ui/VersionBadge";
import "./cientifico-v1.css";

/*
  Científico V1 — duplicado de /mision-origen para trabajar una variante sin
  tocar la original. Usa su propia copia de los componentes en
  components/cientifico-v1/, así los cambios no se filtran a /mision-origen ni a
  las demás landings que reutilizan components/mision-origen/.

  .mo-scope is what keeps the two palettes apart. Both landings define the same
  semantic tokens (--color-background, --font-display, …) with different values,
  and Tailwind's @theme is global — one build, one :root. Since every Tailwind
  utility compiles to var(--token), redefining those variables on this wrapper
  makes bg-background/font-display resolve to Volver al Origen's values for this
  subtree only. See the .mo-scope block in globals.css.

  The wrapper also carries what used to live on <body> when Volver al Origen had
  its own repo: the full-height dark surface and the AnnouncementBar offset.
*/

export const metadata: Metadata = {
  title: "[V1 Científico] Volver al Origen — Activa tu misión desde adentro",
  // Variante en desarrollo: fuera del índice para no competir con /mision-origen.
  robots: { index: false },
  description:
    "Un programa de 3 días con Pilar Sousa para reprogramar tu identidad, activar tu misión y alinearte con la versión de ti que ya existe.",
  openGraph: {
    title: "Volver al Origen — Pilar Sousa",
    description:
      "Reprograma tu identidad. Activa tu misión. Un programa de 3 días que cambia el código desde adentro.",
    type: "website",
    locale: "es_ES",
  },
};

export default function CientificoV1Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* pt-* offsets the fixed AnnouncementBar so it never covers page content.
       Taller on mobile (stacked layout), shorter once it lays out in a row. */
    /* cv1-scope repinta la paleta de .mo-scope — ver cientifico-v1.css. */
    <div className="mo-scope cv1-scope min-h-full overflow-x-clip bg-background pt-18 text-foreground sm:pt-12">
      <ReservaModalProvider>
        <AnnouncementBar />
        <VersionBadge />
        {children}
      </ReservaModalProvider>
    </div>
  );
}
