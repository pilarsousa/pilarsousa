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
import logosPago from "@/../public/mision-origen-venta/logos.svg";

/*
  Sección "Resumen y precio" — adaptada de la landing de referencia (Jhonny
  Lubo, con permiso): un óvalo central con el precio. El óvalo es la imagen
  original (oval-pricing.webp, la cápsula violeta con muescas laterales, que
  coincide con nuestra paleta), con un aro luminoso animado (.borde-hueco) por
  encima. Toggle, badge y CTA
  reconstruidos con nuestros estilos.

  PLACEHOLDER: precios ("XX €") y logos de pago.
*/

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

          {/* Cápsula central */}
          <Reveal delay={0.15} className="w-full">
            <div className="flex justify-center">
              <div className="relative mx-auto">
                {/* La imagen del óvalo (forma + gradiente violeta) */}
                <Image
                  src={ovalShape}
                  alt=""
                  aria-hidden
                  priority
                  sizes="360px"
                  className="pointer-events-none w-[300px] select-none sm:w-[360px]"
                />

                {/* Contenido sobre el óvalo */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-10 py-8">
                  <p className="text-center font-display text-xl font-semibold tracking-tight sm:text-2xl">
                    <NeonText variant="multi">Volver al Origen</NeonText>
                  </p>

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white/80">
                    Acceso por 3 meses
                  </span>

                  {/* Toggle destacado: dos opciones grandes; la activa se
                      resalta con la píldora deslizante. Cambia precio + CTA. */}
                  <div className="relative isolate flex w-full max-w-[236px] overflow-hidden rounded-full border border-neon-pink/35 bg-[radial-gradient(120%_140%_at_50%_-30%,rgba(240,14,184,0.2),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.07),rgba(0,0,0,0.72))] p-1 shadow-[0_0_0_1px_rgba(240,14,184,0.1),0_0_28px_rgba(135,36,120,0.32),inset_0_1px_0_rgba(255,255,255,0.14)]">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-white/15 to-transparent animate-sheen"
                    />
                    {/* Píldora deslizante que marca la opción activa — en violetas
                        de la paleta, no cyan/blanco (chocaba con el óvalo). */}
                    <span
                      aria-hidden
                      className={`absolute inset-y-1 left-1 w-[calc(50%-0.5rem)] rounded-full border border-white/25 bg-[linear-gradient(110deg,rgba(135,36,120,0.98)_0%,rgba(240,14,184,0.92)_50%,rgba(135,36,120,0.98)_100%)] shadow-[0_0_18px_rgba(240,14,184,0.6),0_0_34px_rgba(135,36,120,0.42),inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform duration-300 ease-out ${
                        plan === "cuotas" ? "translate-x-[calc(100%+0.5rem)]" : "translate-x-0"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setPlan("unico")}
                      className={`relative z-10 flex-1 cursor-pointer rounded-full py-2 font-sans text-xs font-bold uppercase tracking-[0.06em] transition-colors duration-300 ${
                        plan === "unico" ? "text-white [text-shadow:0_1px_10px_rgba(240,14,184,0.6)]" : "text-white/60 hover:text-white"
                      }`}
                    >
                      Pago único
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlan("cuotas")}
                      className={`relative z-10 flex-1 cursor-pointer rounded-full py-2 font-sans text-xs font-bold uppercase tracking-[0.06em] transition-colors duration-300 ${
                        plan === "cuotas" ? "text-white [text-shadow:0_1px_10px_rgba(240,14,184,0.6)]" : "text-white/60 hover:text-white"
                      }`}
                    >
                      2 cuotas
                    </button>
                  </div>

                  {/* Precio (según el plan) */}
                  <div className="flex flex-col items-center">
                    <span className="font-sans text-xs font-light text-white/70">
                      {plan === "cuotas" ? "En 2 cuotas de" : "Pago único"}
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

                  {/* Logos de los métodos de pago */}
                  <Image
                    src={logosPago}
                    alt="Métodos de pago aceptados"
                    className="h-auto w-[150px] opacity-80"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
