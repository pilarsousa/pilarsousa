import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/mision-origen/ui/AnnouncementBar";
import { ReservaModalProvider } from "@/components/mision-origen/ui/ReservaModal";

/*
  Volver al Origen — registration/thank-you routes under /mision-origen.

  This is a route group: the (mision-origen) folder is stripped from the URL,
  so nested pages keep clean public paths like /mision-origen and
  /gracias-mision-origen while sharing this scoped visual shell.

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
  title: "Volver al Origen — Activa tu misión desde adentro",
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

export default function MisionOrigenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* pt-* offsets the fixed AnnouncementBar so it never covers page content.
       Taller on mobile (stacked layout), shorter once it lays out in a row. */
    <div className="mo-scope min-h-full overflow-x-clip bg-background pt-18 text-foreground sm:pt-12">
      <ReservaModalProvider>
        <AnnouncementBar />
        {children}
      </ReservaModalProvider>
    </div>
  );
}
