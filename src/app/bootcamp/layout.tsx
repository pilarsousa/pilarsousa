import type { Metadata } from "next";

/*
  Bootcamp Reset Identidad — served at /bootcamp. page.tsx here is /bootcamp
  and gracias/page.tsx is /bootcamp/gracias. This landing used to sit at the
  domain root; Misión Origen took the root in the swap and the Bootcamp moved
  under /bootcamp. This layout gives it its own metadata and visual chrome
  without leaking either onto the root landing.

  The design tokens this landing uses are the ones declared at :root in
  globals.css, so there is nothing to override here — .bc-scope only carries
  the dot-grain texture, which used to sit on body::before back when the
  Bootcamp was the only site in the repo.
*/

export const metadata: Metadata = {
  title: "Bootcamp Reset Identidad | Pilar Sousa",
  description:
    "No manifiestas lo que deseas. Manifiestas quien eres. Un campamento de metafísica práctica para resetear tu identidad y volver al origen.",
  openGraph: {
    title: "Bootcamp Reset Identidad | Pilar Sousa",
    description:
      "No manifiestas lo que deseas. Manifiestas quien eres. Un campamento de metafísica práctica para resetear tu identidad.",
    type: "website",
    locale: "es_ES",
  },
};

export default function BootcampLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bc-scope">{children}</div>;
}
