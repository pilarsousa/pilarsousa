"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { NeonText } from "@/components/mision-origen/ui/NeonText";
import { Reveal } from "@/components/mision-origen/ui/Reveal";
import {
  VENTAS_CHECKOUT_UNICO,
  VENTAS_CHECKOUT_CUOTAS,
  VENTAS_PRECIO_UNICO,
  VENTAS_PRECIO_CUOTAS,
} from "@/lib/links";
import ovalShape from "@/../public/ventas/oval-pricing.webp";
import {
  GraduationCap,
  Route,
  Video,
  Users,
  BookOpen,
  BadgeCheck,
  Infinity as InfinityIcon,
  MessageCircle,
  Sparkles,
  Headphones,
} from "lucide-react";

/*
  Sección "Resumen y precio" — adaptada de la landing de referencia (Jhonny
  Lubo, con permiso): un óvalo central con el precio, flanqueado por items con
  icono a ambos lados. El óvalo es la imagen original (oval-pricing.webp, la
  cápsula violeta con muescas laterales, que coincide con nuestra paleta), con
  un aro luminoso animado (.borde-hueco) por encima. Items, toggle, badge y CTA
  reconstruidos con nuestros estilos.

  PLACEHOLDER: precios ("XX €"), textos de los items y logos de pago.
*/

const ITEMS_IZQ = [
  { icon: GraduationCap, text: "Acceso completo al entrenamiento de 40 días" },
  { icon: Route, text: "Sistema práctico paso a paso" },
  { icon: Video, text: "Sesiones en vivo con Pilar Sousa" },
  { icon: Users, text: "Comunidad privada de acompañamiento" },
  { icon: BookOpen, text: "Material descargable y recursos" },
] as const;

const ITEMS_DER = [
  { icon: BadgeCheck, text: "Certificado de participación" },
  { icon: InfinityIcon, text: "Acceso vitalicio y actualizaciones" },
  { icon: MessageCircle, text: "Grupo de anuncios por WhatsApp" },
  { icon: Sparkles, text: "Herramientas de manifestación" },
  { icon: Headphones, text: "Soporte y acompañamiento cercano" },
] as const;

function ItemPill({
  icon: Icon,
  text,
}: {
  icon: typeof GraduationCap;
  text: string;
}) {
  return (
    <div className="pricing-item shine-hover flex min-h-[60px] items-center gap-3 px-4 py-2 text-left">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black text-cyan">
        <Icon size={18} />
      </span>
      <span className="font-sans text-sm font-light leading-tight text-foreground/90">
        {text}
      </span>
    </div>
  );
}

export function Precio() {
  /* Plan seleccionado. Cambia el precio mostrado y el destino del CTA. Los
     links y precios reales viven en lib/links.ts (hoy vacíos/placeholder). */
  const [plan, setPlan] = useState<"unico" | "cuotas">("unico");

  const precio =
    plan === "unico" ? VENTAS_PRECIO_UNICO : VENTAS_PRECIO_CUOTAS;
  const checkoutUrl =
    plan === "unico" ? VENTAS_CHECKOUT_UNICO : VENTAS_CHECKOUT_CUOTAS;

  return (
    <section id="precio" className="relative overflow-hidden bg-surface py-section">
      {/* Glow ambiental cálido bajo el óvalo, como el original */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at 50% 60%, rgba(135,36,120,0.5) 0%, rgba(249,2,129,0.22) 45%, transparent 72%)",
        }}
      />

      <Container className="relative">
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <Reveal>
              <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Comienza hoy tu{" "}
                <NeonText variant="cyan">transformación</NeonText>
              </h2>
            </Reveal>
          </div>

          {/* Items | óvalo | items */}
          <Reveal delay={0.15} className="w-full">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-2">
              {/* Items izquierda */}
              <div className="flex flex-col gap-4 lg:order-1">
                {ITEMS_IZQ.map((it, i) => (
                  <ItemPill key={i} icon={it.icon} text={it.text} />
                ))}
              </div>

              {/* Óvalo central */}
              <div className="relative mx-auto lg:order-2">
                {/* La imagen del óvalo (forma + gradiente violeta) */}
                <Image
                  src={ovalShape}
                  alt=""
                  aria-hidden
                  priority
                  sizes="360px"
                  className="pointer-events-none w-[300px] select-none sm:w-[360px]"
                />

                {/* Aro luminoso animado alrededor del óvalo */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[86%] -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="borde-hueco h-full" />
                </div>

                {/* Contenido sobre el óvalo */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-10 py-8">
                  <p className="text-center font-display text-base font-semibold tracking-tight">
                    <NeonText variant="multi">Misión Origen</NeonText>
                  </p>

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white/80">
                    Actualizable y vitalicio
                  </span>

                  {/* Toggle destacado: dos opciones grandes; la activa se
                      resalta con la píldora deslizante. Cambia precio + CTA. */}
                  <div className="relative flex w-full max-w-[220px] rounded-full border border-white/20 bg-black/60 p-1">
                    {/* Píldora deslizante que marca la opción activa */}
                    <span
                      aria-hidden
                      className={`absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-full bg-cyan/25 shadow-[0_0_16px_rgba(40,191,241,0.4)] transition-transform duration-300 ${
                        plan === "cuotas" ? "translate-x-[calc(100%+0.5rem)]" : "translate-x-0"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setPlan("unico")}
                      className={`relative z-10 flex-1 cursor-pointer rounded-full py-2 font-sans text-xs font-bold uppercase tracking-[0.06em] transition-colors duration-300 ${
                        plan === "unico" ? "text-cyan" : "text-white/55"
                      }`}
                    >
                      Pago único
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlan("cuotas")}
                      className={`relative z-10 flex-1 cursor-pointer rounded-full py-2 font-sans text-xs font-bold uppercase tracking-[0.06em] transition-colors duration-300 ${
                        plan === "cuotas" ? "text-cyan" : "text-white/55"
                      }`}
                    >
                      2 cuotas
                    </button>
                  </div>

                  {/* Precio (según el plan) */}
                  <div className="flex flex-col items-center">
                    <span className="font-sans text-xs font-light text-white/70">
                      {plan === "cuotas" ? "En 2 cuotas de" : "Pago único de"}
                    </span>
                    <span className="font-display text-4xl font-bold sm:text-5xl">
                      <NeonText variant="cyan">{precio}</NeonText>
                    </span>
                  </div>

                  {/* CTA — navega al checkout del plan activo (si hay link) */}
                  <a
                    href={checkoutUrl || undefined}
                    aria-disabled={checkoutUrl ? undefined : true}
                    className={`neon-btn flex h-12 w-full items-center justify-center whitespace-nowrap rounded-full px-6 font-sans text-sm font-bold uppercase tracking-[0.06em] text-white transition-all duration-500 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                      checkoutUrl ? "cursor-pointer" : "cursor-not-allowed opacity-80"
                    }`}
                  >
                    Acceder ahora
                  </a>

                  {/* Logos de pago — PLACEHOLDER (Visa/Mastercard/Stripe) */}
                  <p className="text-center font-sans text-[0.55rem] uppercase tracking-[0.1em] text-white/40">
                    Visa · Mastercard · Stripe
                  </p>
                </div>
              </div>

              {/* Items derecha */}
              <div className="flex flex-col gap-4 lg:order-3">
                {ITEMS_DER.map((it, i) => (
                  <ItemPill key={i} icon={it.icon} text={it.text} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
