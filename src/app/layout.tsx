import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Cinzel, Manrope, Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

/*
  Shared by both landings. This layout owns only what is genuinely common:
  the document shell, analytics/GTM, and the font variables. Anything that
  belongs to a single landing — palette, metadata, chrome — lives in that
  landing's own layout: (bootcamp)/layout.tsx and mision-origen/layout.tsx.

  All five font variables are declared here because next/font must run in a
  layout, and the two landings each need their own pair. Declaring a variable
  costs nothing on the routes that never reference it: the font only downloads
  once a rule actually uses the family.
*/

// ---- Bootcamp ----

// Display font for titles — ritual, ancient, authoritative.
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Body font — modern, refined, highly readable.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Editorial accent — used italic to highlight key words with real cursive
// (Cinzel has no true italic). Reserved for short emphasis, never body blocks.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// ---- Misión Origen ----

/* Títulos y subtítulos — futurista, tecnológica, cyberpunk */
const zenDots = localFont({
  variable: "--font-zen-dots",
  src: "../../public/fonts/Zen_Dots/ZenDots-Regular.ttf",
  weight: "400",
  display: "swap",
});

/* Textos, párrafos, labels, botones — Futura Light / Book / Medium.
   Variable font: a single file covers the 300–700 range used across the site. */
const jost = localFont({
  variable: "--font-jost",
  src: "../../public/fonts/Jost/Jost-VariableFont_wght.ttf",
  weight: "300 700",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${manrope.variable} ${cormorant.variable} ${zenDots.variable} ${jost.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla) inject
          attributes like cz-shortcut-listen on <body> before React hydrates,
          causing a harmless mismatch. This scopes the suppression to body only. */}
      <body
        suppressHydrationWarning
        className="min-h-full bg-background text-foreground"
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://sgtm.pilarsousa.es/ns.html?id=GTM-5CNQZ57X"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {children}

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://sgtm.pilarsousa.es/b9gbrcrbhb.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','11=CwxfNTc%2FT1IhJjMoVkU6QRRVUFxSVAYJXxgLHgIAEQgXGwNcBgE%3D');`}
        </Script>
        {/* End Google Tag Manager */}

        {/* Meta Pixel — cargado directo (no vía GTM). Si el mismo pixel se
            dispara también desde GTM, los PageView/Lead se contarían duplicados:
            mantener el tag desactivado en GTM. */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1237170057756272');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1237170057756272&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel */}

        <Analytics />
      </body>
    </html>
  );
}
