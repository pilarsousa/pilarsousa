"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { CardUnicaModal } from "@/components/game/CardUnicaModal";
import { CodeGateModal } from "@/components/game/CodeGateModal";
import { UnlockingModal } from "@/components/game/UnlockingModal";
import fondo from "@/../public/game/game-img/fondo-landing.jpg";
import fondoMobile from "@/../public/game/game-img/fondo-seccion-mobile.jpg";
import cardFrame from "@/../public/game/seccions/section-2/card-principal.png";
import imgNav from "@/../public/game/seccions/section-2/img-nav.png";
import imgPerfil from "@/../public/game/seccions/section-2/img-perfil.png";
import imgCard1 from "@/../public/game/seccions/section-2/img-card-1.png";
import imgCard2 from "@/../public/game/seccions/section-2/img-card-2.png";

/*
  /game/home — recreación de la maqueta: barra superior con el retrato y dos
  cards ornamentadas en fila sobre el bosque encantado, una sola pantalla sin
  scroll.

  Cada card se compone de tres capas dentro de una caja con el aspect-ratio exacto
  del marco (856×1836 → aspect-[214/459]):

    1. La ilustración (img-card-N). Se extiende HACIA ABAJO hasta el divisor
       (bottom 13%, más allá del 19% real): así la imagen "se completa" y rellena
       las zonas transparentes del divisor, sin que se vea el fondo de la página.
    2. El rectángulo negro va SÓLO en el compartimento inferior, bajo el divisor
       (top 86% → bottom 2%). El marco lo tapa por los bordes dejando el hueco
       negro; el divisor con la gema queda por encima de la ilustración.
    3. El marco card-principal.png por encima (object-fill, mismo aspect → sin
       deformar), sin capturar el puntero.

  Cada card muestra su título en el compartimento negro inferior.

  Barra superior: img-nav.png centrada; img-perfil.png (retrato) encima, centrado
  sobre la placa. Es decorativa → pointer-events-none. Se OCULTA mientras la modal
  de la 1ª card está abierta.

  Responsive: mobile usa fondo-seccion-mobile.jpg y dimensiona las cards por ANCHO
  (dos en fila en portrait); desde md: usa fondo-landing.jpg y las dimensiona por
  ALTO (la maqueta original). Ambos: h-[100dvh] + overflow-hidden = sin scroll.
*/

const CARDS: {
  art: StaticImageData;
  alt: string;
  title: string;
  /* Card bloqueada: se muestra oscurecida, con candado y sin poder abrirse. */
  locked?: boolean;
}[] = [
  { art: imgCard1, alt: "", title: "Las 33 Leyes Universales" },
  { art: imgCard2, alt: "", title: "Archivo Oculto" },
];

/* Contenido visual de la card (imagen + negro + marco). Es igual sea clickeable
   o no; sólo cambia el contenedor (Link vs div). */
function CardContent({
  art,
  alt,
  title,
  locked = false,
}: {
  art: StaticImageData;
  alt: string;
  title: string;
  locked?: boolean;
}) {
  return (
    <>
      {/* 1 — Ilustración: llena TODA su sección hasta el divisor (pasa por detrás
             del metal del divisor, que es un arco). Así nunca hay negro por
             encima de la línea del divisor ni se filtra el fondo por sus huecos.
             Si la card está bloqueada, la ilustración va en gris y oscurecida. */}
      <div className="absolute left-[7%] right-[7%] top-[3.2%] bottom-[13%] overflow-hidden bg-black">
        <Image
          src={art}
          alt={alt}
          fill
          quality={90}
          sizes="(min-width: 768px) 20vw, 45vw"
          className={`object-cover object-center${locked ? " grayscale brightness-[0.4]" : ""}`}
        />
      </div>

      {/* 2 — Rectángulo negro desde el BORDE INFERIOR del metal del divisor
             (~84.8%, medido sobre el alpha del marco) hacia abajo. Así la imagen
             termina justo en la línea del divisor: no asoma por debajo del metal
             ni queda negro por encima de esa línea. */}
      <div className="absolute left-[7%] right-[7%] top-[84.8%] bottom-[2%] bg-black" />

      {/* 3 — Marco ornamental por encima */}
      <Image
        src={cardFrame}
        alt=""
        aria-hidden
        fill
        priority
        sizes="(min-width: 768px) 22vw, 48vw"
        className="pointer-events-none object-fill"
      />

      {/* 4 — Título en el compartimento negro, con la tipografía del botón de /game */}
      <div className="pointer-events-none absolute inset-x-[11%] top-[86%] bottom-[3.2%] flex items-center justify-center">
        <span className="text-center font-[family-name:var(--font-pixelify)] text-[3vw] font-bold uppercase leading-tight tracking-[0.04em] text-white md:text-[2vh]">
          {title}
        </span>
      </div>

      {/* 5 — Overlay de bloqueo: candado centrado sobre la ilustración + etiqueta.
             Va por encima del marco para que se lea claro que está deshabilitada. */}
      {locked && (
        <div className="pointer-events-none absolute left-[7%] right-[7%] top-[3.2%] bottom-[13%] flex flex-col items-center justify-center gap-[1.4vh]">
          <Lock
            aria-hidden
            className="h-[7vh] w-[7vh] text-white [filter:drop-shadow(0_0_14px_rgba(40,191,241,0.75))]"
          />
          <span className="font-[family-name:var(--font-pixelify)] text-[2.8vw] font-bold uppercase tracking-[0.1em] text-white/85 md:text-[1.5vh]">
            Bloqueado
          </span>
        </div>
      )}
    </>
  );
}

/* Cajas de la card según viewport: mobile por ANCHO (apiladas), desktop por ALTO. */
const CARD_BOX_MOBILE = "relative w-[58vw] shrink-0 aspect-[214/459]";
const CARD_BOX_DESKTOP = "relative h-[74vh] shrink-0 aspect-[214/459]";
const CARD_HOVER =
  "transition-transform duration-300 ease-out hover:scale-[1.03] focus-visible:scale-[1.03] focus-visible:outline-none";

/* Marca de que la 1ª card ya se desbloqueó en este dispositivo — así al volver
   se abre directo la modal sin volver a pedir el código. Mismo criterio que la
   2ª card (localStorage por navegador, no IP): las IPs cambian y se comparten. */
const CARD1_KEY = "game_nivel1_unlocked";

export default function GameHomePage() {
  /* Flujo de la 1ª card: cerrada → pide código → (código correcto) → secuencia
     de desbloqueo (barra + festejo) → modal de la card. */
  const [unlockStep, setUnlockStep] = useState<
    "closed" | "code" | "unlocking" | "card"
  >("closed");

  /* ¿La 1ª card ya se había desbloqueado antes? Se lee del navegador una vez al
     montar. Mientras es null todavía no lo sabemos (no cambia el render, sólo
     decide si el botón pide código o abre directo). */
  const [card1Unlocked, setCard1Unlocked] = useState(false);
  useEffect(() => {
    try {
      setCard1Unlocked(localStorage.getItem(CARD1_KEY) === "1");
    } catch {
      // localStorage puede fallar en modo privado — sin recordatorio, pide código.
    }
  }, []);

  /* Al abrir la 1ª card: si ya está desbloqueada, va directo a la modal; si no,
     pide el código. */
  function openCard1() {
    setUnlockStep(card1Unlocked ? "card" : "code");
  }

  /* Se llama cuando el código es correcto: recuerda el desbloqueo y lanza la
     secuencia. */
  function handleCard1Unlock() {
    try {
      localStorage.setItem(CARD1_KEY, "1");
    } catch {
      // best-effort
    }
    setCard1Unlocked(true);
    setUnlockStep("unlocking");
  }

  /* La 1ª card pide un código antes de abrir la modal; la 2ª navega a /game/form.
     Una card bloqueada se muestra como un div inerte (no navega ni tiene hover). */
  const renderCard = (
    c: (typeof CARDS)[number],
    i: number,
    boxClass: string,
  ) => {
    if (c.locked) {
      return (
        <div
          key={i}
          aria-disabled="true"
          aria-label={`${c.title} — bloqueado`}
          className={`${boxClass} cursor-not-allowed`}
        >
          <CardContent art={c.art} alt={c.alt} title={c.title} locked />
        </div>
      );
    }

    return i === 0 ? (
      <button
        key={i}
        type="button"
        aria-label="Abrir"
        onClick={openCard1}
        className={`${boxClass} ${CARD_HOVER}`}
      >
        <CardContent art={c.art} alt={c.alt} title={c.title} />
      </button>
    ) : (
      <Link
        key={i}
        href="/game/form?nivel=2"
        className={`${boxClass} ${CARD_HOVER}`}
      >
        <CardContent art={c.art} alt={c.alt} title={c.title} />
      </Link>
    );
  };

  /* Barra superior con el retrato (decorativa). El ancho lo fija el contenedor. */
  const renderNav = () => (
    <div className="pointer-events-none relative w-full">
      <Image
        src={imgNav}
        alt=""
        aria-hidden
        priority
        sizes="(min-width: 768px) 46vw, 94vw"
        className="h-auto w-full brightness-[1.18] saturate-[1.12] md:brightness-100 md:saturate-100"
      />
      <Image
        src={imgPerfil}
        alt="Tu perfil"
        priority
        sizes="(min-width: 768px) 10vw, 18vw"
        className="absolute left-1/2 top-[44%] w-[17%] -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );

  return (
    <main className="relative isolate min-h-[100dvh] w-full overflow-y-auto md:h-[100dvh] md:overflow-hidden">
      {/* Fondo a sangre — mobile (portrait) vs desktop. Como el <main> crece con
          el contenido en mobile, el fill cubre toda el área (incluida la de scroll). */}
      <Image
        src={fondoMobile}
        alt=""
        aria-hidden
        fill
        priority
        quality={90}
        sizes="100vw"
        placeholder="blur"
        className="game-bg-lightning -z-20 object-cover object-center md:hidden"
      />
      <Image
        src={fondo}
        alt=""
        aria-hidden
        fill
        priority
        quality={90}
        sizes="100vw"
        placeholder="blur"
        className="game-bg-lightning -z-20 hidden object-cover object-center md:block"
      />
      {/* Oscurecido sutil para que las cards resalten */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/20" />

      {/* ── MOBILE: barra grande + cards apiladas (una abajo de la otra, con scroll) ── */}
      <div className="relative z-10 flex flex-col items-center gap-[5vh] px-[6vw] pt-0 pb-[8vh] md:hidden">
        {/* -mt compensa el padding transparente superior del PNG (14.8%) para
            pegar la barra al tope sin espacio. */}
        {unlockStep === "closed" && (
          <div className="-mt-[4.6vw] w-[94vw]">{renderNav()}</div>
        )}
        {CARDS.map((c, i) => renderCard(c, i, CARD_BOX_MOBILE))}
      </div>

      {/* ── DESKTOP: maqueta original (absoluta, sin scroll) ── */}
      <div className="hidden md:contents">
        <div className="absolute inset-x-0 top-[15.5%] z-10 flex justify-center gap-[calc(1.5vw+60px)] px-[2vw]">
          {CARDS.map((c, i) => renderCard(c, i, CARD_BOX_DESKTOP))}
        </div>
        {unlockStep === "closed" && (
          <div className="pointer-events-none absolute inset-x-0 top-[-4.5%] z-20 flex justify-center">
            <div className="w-[clamp(360px,46vw,860px)]">{renderNav()}</div>
          </div>
        )}
      </div>

      {/* Viñeta/sombra en los bordes: sobre el fondo, detrás de la UI. */}
      <div
        aria-hidden
        className="game-edge-shadow pointer-events-none absolute inset-0 z-0"
      />

      {/* Flujo de la 1ª card: código → secuencia de desbloqueo → modal */}
      {unlockStep === "code" && (
        <CodeGateModal
          onClose={() => setUnlockStep("closed")}
          onUnlock={handleCard1Unlock}
        />
      )}
      {unlockStep === "unlocking" && (
        <UnlockingModal onDone={() => setUnlockStep("card")} />
      )}
      {unlockStep === "card" && (
        <CardUnicaModal onClose={() => setUnlockStep("closed")} />
      )}
    </main>
  );
}
