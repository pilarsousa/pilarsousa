import type { Metadata } from "next";

/*
  Bootcamp Reset Identidad — the landing at the domain root.

  This is a route group: the (bootcamp) folder is stripped from the URL, so
  page.tsx still serves "/" and gracias/page.tsx still serves "/gracias". The
  group exists so this landing can carry its own metadata and its own visual
  chrome without leaking either onto /mision-origen.

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
