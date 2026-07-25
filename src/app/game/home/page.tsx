import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import fondo from "@/../public/game/game-img/fondo-landing.jpg";
import cardFrame from "@/../public/game/seccions/section-2/card-principal.png";
import imgNav from "@/../public/game/seccions/section-2/img-nav.png";
import imgPerfil from "@/../public/game/seccions/section-2/img-perfil.png";
import imgCard1 from "@/../public/game/seccions/section-2/img-card-1.png";
import imgCard2 from "@/../public/game/seccions/section-2/img-card-2.png";
import imgCard3 from "@/../public/game/seccions/section-2/img-card-3.png";
import imgCard4 from "@/../public/game/seccions/section-2/img-card-4.png";

/*
  /game/home — recreación de la maqueta: barra superior con el retrato y cuatro
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

  Las cuatro ilustraciones van de la más luminosa (1) a la más oscura (4).

  Barra superior: img-nav.png centrada; img-perfil.png (retrato) encima, centrado
  sobre la placa. Es decorativa → pointer-events-none.

  h-[100dvh] + overflow-hidden = sin scroll.
*/

const CARDS: { art: StaticImageData; alt: string }[] = [
  { art: imgCard1, alt: "" },
  { art: imgCard2, alt: "" },
  { art: imgCard3, alt: "" },
  { art: imgCard4, alt: "" },
];

function GameCard({
  art,
  alt,
  href,
}: {
  art: StaticImageData;
  alt: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="relative h-[74vh] shrink-0 aspect-[214/459] transition-transform duration-300 ease-out hover:scale-[1.03] focus-visible:outline-none focus-visible:scale-[1.03]"
    >
      {/* 1 — Ilustración, recortada bajo el marco (agrandada hacia abajo) */}
      <div className="absolute left-[7%] right-[7%] top-[3.2%] bottom-[13%] overflow-hidden bg-black">
        <Image
          src={art}
          alt={alt}
          fill
          quality={85}
          sizes="(min-width: 768px) 20vw, 45vw"
          className="object-cover object-center"
        />
      </div>

      {/* 2 — Rectángulo negro SÓLO en el compartimento de abajo (bajo el divisor) */}
      <div className="absolute left-[7%] right-[7%] top-[86%] bottom-[2%] bg-black" />

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
    </Link>
  );
}

export default function GameHomePage() {
  return (
    <main className="relative isolate h-[100dvh] w-full overflow-hidden">
      {/* Fondo a sangre — el bosque encantado */}
      <Image
        src={fondo}
        alt=""
        aria-hidden
        fill
        priority
        quality={90}
        sizes="100vw"
        placeholder="blur"
        className="-z-20 object-cover object-center"
      />
      {/* Oscurecido sutil para que las cards resalten */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/20" />

      {/* Fila de cuatro cards */}
      <div className="absolute inset-x-0 top-[15.5%] z-10 flex justify-center gap-[1.5vw] px-[2vw]">
        {CARDS.map((c, i) => (
          <GameCard
            key={i}
            art={c.art}
            alt={c.alt}
            href={`/game/form?nivel=${i + 1}`}
          />
        ))}
      </div>

      {/* Barra superior con el retrato (decorativa) */}
      <div className="pointer-events-none absolute inset-x-0 top-[1%] z-20 flex justify-center">
        <div className="relative w-[clamp(360px,46vw,860px)]">
          <Image
            src={imgNav}
            alt=""
            aria-hidden
            priority
            sizes="46vw"
            className="h-auto w-full"
          />
          <Image
            src={imgPerfil}
            alt="Tu perfil"
            priority
            sizes="10vw"
            className="absolute left-1/2 top-[30%] w-[21%] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </main>
  );
}
