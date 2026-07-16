"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { NeonText } from "@/components/ui/NeonText";

/*
  Email validation: requires local part, "@", a domain with at least one dot,
  and a 2+ char TLD. Not RFC-perfect (no regex is) but rejects the common
  mistakes — missing "@", missing domain, trailing dot — which is what matters
  for a signup form.
*/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = {
  nombre?: string;
  email?: string;
};

type Status = "idle" | "submitting" | "success";

const FIELD_CLASS =
  "h-11 w-full rounded-sm border bg-white/3 px-4 font-sans text-sm font-light text-white placeholder:text-white/25 outline-none transition-all duration-300";

export function ReservaForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): Errors {
    const next: Errors = {};
    if (nombre.trim().length < 2) {
      next.nombre = "Ingresá tu nombre completo.";
    }
    if (!email.trim()) {
      next.email = "El correo es obligatorio.";
    } else if (!EMAIL_RE.test(email.trim())) {
      next.email = "Ingresá un correo válido, por ejemplo: nombre@mail.com";
    }
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    /*
      No backend yet: this simulates the round-trip so the UX (loading →
      success) is complete. When the destination is defined (email, sheet,
      Mailchimp, etc.), replace this with the real request.
    */
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 py-6 text-center"
      >
        <span className="font-display text-xl text-white">
          <NeonText variant="cyan">¡Plaza reservada!</NeonText>
        </span>
        <p className="max-w-xs font-sans text-sm font-light text-white/60">
          Te enviamos los próximos pasos a{" "}
          <span className="text-cyan">{email.trim()}</span>. Revisá tu bandeja de
          entrada.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-4"
      aria-label="Formulario de inscripción"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Nombre */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="hero-nombre"
          className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-foreground/45"
        >
          Nombre completo
        </label>
        <input
          id="hero-nombre"
          type="text"
          name="nombre"
          autoComplete="name"
          placeholder="Nombre y apellido"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? "hero-nombre-error" : undefined}
          className={cn(
            FIELD_CLASS,
            errors.nombre
              ? "border-hot-pink/70 focus:border-hot-pink focus:shadow-[0_0_18px_rgba(249,2,129,0.3)]"
              : "border-cyan/20 focus:border-cyan/70 focus:bg-cyan/4 focus:shadow-[0_0_18px_rgba(40,191,241,0.25)]",
          )}
        />
        {errors.nombre && (
          <p
            id="hero-nombre-error"
            className="font-sans text-xs font-light text-hot-pink"
          >
            {errors.nombre}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="hero-email"
          className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-foreground/45"
        >
          Correo electrónico
        </label>
        <input
          id="hero-email"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="ejemplo@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "hero-email-error" : undefined}
          className={cn(
            FIELD_CLASS,
            errors.email
              ? "border-hot-pink/70 focus:border-hot-pink focus:shadow-[0_0_18px_rgba(249,2,129,0.3)]"
              : "border-cyan/20 focus:border-cyan/70 focus:bg-cyan/4 focus:shadow-[0_0_18px_rgba(40,191,241,0.25)]",
          )}
        />
        {errors.email && (
          <p
            id="hero-email-error"
            className="font-sans text-xs font-light text-hot-pink"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Submit — real button that fires the form, same pill styling */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-full px-8 font-sans text-xs font-medium uppercase tracking-[0.12em] text-white transition-all duration-500 ease-out active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70 bg-[linear-gradient(180deg,#8b5cf6_0%,#6d28d9_45%,#4c1d95_100%)] shadow-[0_0_22px_rgba(109,40,217,0.6),0_4px_18px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] hover:shadow-[0_0_36px_rgba(139,92,246,0.55),0_0_64px_rgba(109,40,217,0.22),0_8px_22px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.24)]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,#a78bfa_0%,#8b5cf6_45%,#6d28d9_100%)] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-60"
          />
          <span className="relative">
            {status === "submitting"
              ? "Reservando…"
              : "✦ Reservar mi plaza ahora ✦"}
          </span>
        </button>
      </div>

      <p className="text-center font-sans text-xs font-light text-foreground/30">
        [Nota de privacidad o garantía — texto provisional]
      </p>
    </form>
  );
}
