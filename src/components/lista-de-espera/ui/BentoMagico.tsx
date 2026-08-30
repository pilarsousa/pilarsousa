"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "gsap";

/*
  Los efectos de cursor de las cards de BONUS (sección 8).

  Es una adaptación de MagicBento (reactbits.dev) a esta landing. La diferencia
  de fondo con el original: aquél TRAE SUS PROPIAS CARDS y su rejilla, y aquí las
  cards ya existen —con su filete giratorio, su fondo radial y sus medidas atadas
  al banner de 1920x808—. Así que esto no dibuja nada: envuelve lo que ya hay y
  le añade comportamiento. Por eso son dos piezas y no una.

  · CardMagica — envuelve UNA card. Partículas, inclinación, imantado y onda al
    pulsar.
  · FocoBento — envuelve el GRUPO. Un solo foco que sigue al cursor por toda la
    sección y enciende el borde de la card más cercana.

  ── POR QUÉ EL FOCO ES UNO SOLO Y VIVE EN EL GRUPO ──

  Podría ir uno por card, y sería peor: cada una calcularía su distancia al
  cursor por separado y no habría forma de saber cuál está más cerca, que es
  justo lo que gradúa la intensidad. Con uno solo, un único listener recorre las
  tres, reparte intensidad según distancia y mueve un foco compartido.

  ── EL BORDE ENCENDIDO ──

  Es un ::after con máscara —definido en globals.css— que sólo pinta el reborde.
  Desde aquí se le pasan cuatro variables: dónde está el cursor (--brillo-x,
  --brillo-y), cuánta luz le toca (--brillo-fuerza) y el radio (--brillo-radio).
  El CSS no puede leer la posición del ratón; el JS no debería pintar. Cada uno
  hace lo suyo.

  ── EN MÓVIL NO SE MONTA NADA ──

  Y no es por rendimiento: es que ninguno de estos efectos existe sin cursor. Un
  foco que sigue al ratón, una card que se inclina hacia él o que se imanta no
  tienen equivalente táctil. Montarlos sería añadir listeners que no se disparan
  nunca. El corte está en 768, el mismo `md:` que usa toda la landing.

  ── GSAP Y NO TRANSICIONES CSS ──

  Ya está en el proyecto, y aquí gana: las partículas necesitan repetición con
  yoyo, retardos escalonados y limpieza al vuelo cuando el cursor se va a mitad
  de animación. Con CSS eso serían varios keyframes y un estado que llevar a
  mano.
*/

const PARTICULAS = 12;
const RADIO_FOCO = 300;
const MOVIL = 768;

/* Verde de marca (#a3ca23) en componentes sueltos: entra en rgba() dentro de
   plantillas, y ahí un hexadecimal no sirve. */
const VERDE = "163, 202, 35";

function crearParticula(x: number, y: number) {
  const el = document.createElement("div");
  el.className = "le-particula";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${VERDE}, 1);
    box-shadow: 0 0 6px rgba(${VERDE}, 0.6);
    pointer-events: none;
    z-index: 40;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
}

/* El foco reparte luz en dos tramos: dentro de `cerca` la card se enciende del
   todo, y de ahí hasta `lejos` se va apagando. Sin ese primer tramo la card
   nunca llegaría al máximo salvo con el cursor exactamente encima. */
const tramosFoco = (radio: number) => ({
  cerca: radio * 0.5,
  lejos: radio * 0.75,
});

function useEsMovil() {
  const [esMovil, setEsMovil] = useState(false);

  useEffect(() => {
    const mirar = () => setEsMovil(window.innerWidth <= MOVIL);
    mirar();
    window.addEventListener("resize", mirar);
    return () => window.removeEventListener("resize", mirar);
  }, []);

  return esMovil;
}

/* ─────────────────────────── Una card ─────────────────────────── */

export function CardMagica({
  children,
  className = "",
  desactivar = false,
  particulas = PARTICULAS,
  inclinar = true,
  imantar = true,
  onda = true,
  /* La etiqueta se puede cambiar porque las cards de las tres áreas viven
     dentro de un <ul> y tienen que ser <li>: un <div> intercalado entre la
     lista y sus elementos rompe la semántica y el lector de pantalla deja de
     anunciar cuántos hay. */
  etiqueta = "div",
}: {
  children: ReactNode;
  className?: string;
  desactivar?: boolean;
  particulas?: number;
  inclinar?: boolean;
  imantar?: boolean;
  onda?: boolean;
  etiqueta?: "div" | "li";
}) {
  const caja = useRef<HTMLElement>(null);
  const vivas = useRef<HTMLDivElement[]>([]);
  const relojes = useRef<ReturnType<typeof setTimeout>[]>([]);
  const encima = useRef(false);
  const plantillas = useRef<HTMLDivElement[]>([]);
  const listas = useRef(false);
  const iman = useRef<gsap.core.Tween | null>(null);

  /* Las partículas se crean UNA VEZ y luego se clonan. Crearlas en cada entrada
     del cursor significaría construir doce nodos por hover. */
  const prepararParticulas = useCallback(() => {
    if (listas.current || !caja.current) return;
    const { width, height } = caja.current.getBoundingClientRect();
    plantillas.current = Array.from({ length: particulas }, () =>
      crearParticula(Math.random() * width, Math.random() * height),
    );
    listas.current = true;
  }, [particulas]);

  const limpiarParticulas = useCallback(() => {
    relojes.current.forEach(clearTimeout);
    relojes.current = [];
    iman.current?.kill();

    vivas.current.forEach((p) => {
      gsap.to(p, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => p.parentNode?.removeChild(p),
      });
    });
    vivas.current = [];
  }, []);

  const animarParticulas = useCallback(() => {
    if (!caja.current || !encima.current) return;
    if (!listas.current) prepararParticulas();

    plantillas.current.forEach((particula, i) => {
      const reloj = setTimeout(() => {
        /* Se vuelve a comprobar DENTRO del temporizador: entre que se programó y
           se dispara, el cursor puede haberse ido. Sin esto quedan partículas
           huérfanas animándose sobre una card que ya nadie mira. */
        if (!encima.current || !caja.current) return;

        const clon = particula.cloneNode(true) as HTMLDivElement;
        caja.current.appendChild(clon);
        vivas.current.push(clon);

        gsap.fromTo(
          clon,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
        );

        gsap.to(clon, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clon, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, i * 100);

      relojes.current.push(reloj);
    });
  }, [prepararParticulas]);

  useEffect(() => {
    if (desactivar || !caja.current) return;
    const el = caja.current;

    const entra = () => {
      encima.current = true;
      animarParticulas();
    };

    const sale = () => {
      encima.current = false;
      limpiarParticulas();
      /* Vuelve SIEMPRE a su sitio, se hayan activado o no la inclinación y el
         imantado: si uno se apagó a mitad de hover, su transform se quedaría
         puesto y la card no volvería a su posición. */
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const mueve = (e: MouseEvent) => {
      if (!inclinar && !imantar) return;

      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const cx = r.width / 2;
      const cy = r.height / 2;

      if (inclinar) {
        gsap.to(el, {
          rotateX: ((y - cy) / cy) * -10,
          rotateY: ((x - cx) / cx) * 10,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (imantar) {
        iman.current = gsap.to(el, {
          x: (x - cx) * 0.05,
          y: (y - cy) * 0.05,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const pulsa = (e: MouseEvent) => {
      if (!onda) return;

      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      /* El radio es la distancia a la esquina MÁS LEJANA: así la onda cubre la
         card entera se pulse donde se pulse. */
      const radio = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - r.width, y),
        Math.hypot(x, y - r.height),
        Math.hypot(x - r.width, y - r.height),
      );

      const eco = document.createElement("div");
      eco.style.cssText = `
        position: absolute;
        width: ${radio * 2}px;
        height: ${radio * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${VERDE}, 0.4) 0%, rgba(${VERDE}, 0.2) 30%, transparent 70%);
        left: ${x - radio}px;
        top: ${y - radio}px;
        pointer-events: none;
        z-index: 45;
      `;
      el.appendChild(eco);

      gsap.fromTo(
        eco,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => eco.remove(),
        },
      );
    };

    el.addEventListener("mouseenter", entra);
    el.addEventListener("mouseleave", sale);
    el.addEventListener("mousemove", mueve);
    el.addEventListener("click", pulsa);

    return () => {
      encima.current = false;
      el.removeEventListener("mouseenter", entra);
      el.removeEventListener("mouseleave", sale);
      el.removeEventListener("mousemove", mueve);
      el.removeEventListener("click", pulsa);
      limpiarParticulas();
      gsap.killTweensOf(el);
    };
  }, [animarParticulas, limpiarParticulas, desactivar, inclinar, imantar, onda]);

  const Etiqueta = etiqueta;

  return (
    <Etiqueta
      /* El ref es de HTMLElement porque la etiqueta cambia; React exige que el
         tipo del ref admita lo que se le monte. */
      ref={caja as React.Ref<HTMLDivElement & HTMLLIElement>}
      className={className}
    >
      {children}
    </Etiqueta>
  );
}

/* ─────────────────────── El foco del grupo ─────────────────────── */

export function FocoBento({
  children,
  desactivar = false,
  radio = RADIO_FOCO,
  className,
}: {
  children: ReactNode;
  desactivar?: boolean;
  radio?: number;
  className?: string;
}) {
  const zona = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (desactivar || !zona.current) return;
    const seccion = zona.current;

    /* El foco cuelga del <body> y no de la sección: en position:fixed sus
       coordenadas son las de la ventana, así que un ancestro con transform
       —y las cards se mueven— lo arrastraría consigo. */
    const foco = document.createElement("div");
    foco.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${VERDE}, 0.15) 0%,
        rgba(${VERDE}, 0.08) 15%,
        rgba(${VERDE}, 0.04) 25%,
        rgba(${VERDE}, 0.02) 40%,
        rgba(${VERDE}, 0.01) 65%,
        transparent 70%
      );
      z-index: 50;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(foco);

    const apagarTodas = () => {
      seccion
        .querySelectorAll<HTMLElement>(".le-bento-card")
        .forEach((c) => c.style.setProperty("--brillo-fuerza", "0"));
    };

    const mueve = (e: MouseEvent) => {
      const r = seccion.getBoundingClientRect();
      const dentro =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;

      if (!dentro) {
        gsap.to(foco, { opacity: 0, duration: 0.3, ease: "power2.out" });
        apagarTodas();
        return;
      }

      const { cerca, lejos } = tramosFoco(radio);
      let masCerca = Infinity;

      seccion
        .querySelectorAll<HTMLElement>(".le-bento-card")
        .forEach((card) => {
          const cr = card.getBoundingClientRect();
          const cx = cr.left + cr.width / 2;
          const cy = cr.top + cr.height / 2;
          /* Se descuenta el radio de la card para medir contra su BORDE y no
             contra su centro: si no, una card ancha parecería más lejos que una
             estrecha con el cursor en el mismo sitio. */
          const d = Math.max(
            0,
            Math.hypot(e.clientX - cx, e.clientY - cy) -
              Math.max(cr.width, cr.height) / 2,
          );

          masCerca = Math.min(masCerca, d);

          const fuerza =
            d <= cerca ? 1 : d <= lejos ? (lejos - d) / (lejos - cerca) : 0;

          card.style.setProperty(
            "--brillo-x",
            `${((e.clientX - cr.left) / cr.width) * 100}%`,
          );
          card.style.setProperty(
            "--brillo-y",
            `${((e.clientY - cr.top) / cr.height) * 100}%`,
          );
          card.style.setProperty("--brillo-fuerza", fuerza.toString());
          card.style.setProperty("--brillo-radio", `${radio}px`);
        });

      gsap.to(foco, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      const opacidad =
        masCerca <= cerca
          ? 0.8
          : masCerca <= lejos
            ? ((lejos - masCerca) / (lejos - cerca)) * 0.8
            : 0;

      gsap.to(foco, {
        opacity: opacidad,
        /* Se enciende rápido y se apaga despacio: al revés se nota el corte. */
        duration: opacidad > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    };

    const salir = () => {
      apagarTodas();
      gsap.to(foco, { opacity: 0, duration: 0.3, ease: "power2.out" });
    };

    document.addEventListener("mousemove", mueve);
    document.addEventListener("mouseleave", salir);

    return () => {
      document.removeEventListener("mousemove", mueve);
      document.removeEventListener("mouseleave", salir);
      gsap.killTweensOf(foco);
      foco.parentNode?.removeChild(foco);
    };
  }, [desactivar, radio]);

  /*
    ⚠️ ESTE DIV NO PUEDE ROMPER LA MAQUETACIÓN DE QUIEN LO USA, y la rompió: al
    envolver la rejilla de BONUS, el `items-center` del padre pasó a aplicarse a
    ÉL en vez de a la rejilla. Un div sin ancho se encoge a su contenido, así que
    quedaba centrado él mientras la rejilla se alineaba dentro sin centrar — y
    las tres cards se veían corridas hacia un lado.

    Por eso acepta className, y quien lo monta le pasa las clases que hagan que
    el div se comporte como el hueco que ocupaba la rejilla: normalmente
    `w-full` más un centrado propio.

    NO SE USA `display: contents` PARA ESTO, que sería la solución elegante: el
    foco necesita medir la zona con getBoundingClientRect(), y sobre un elemento
    con `contents` varios navegadores devuelven un rectángulo vacío —no genera
    caja— así que el foco no se encendería nunca. El div tiene que ocupar
    espacio real para poder medirse.
  */
  return (
    <div ref={zona} className={className}>
      {children}
    </div>
  );
}

export { useEsMovil };
