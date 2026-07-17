"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";

/*
  Email validation: requires local part, "@", a domain with at least one dot,
  and a 2+ char TLD. Not RFC-perfect (no regex is) but rejects the common
  mistakes — missing "@", missing domain, trailing dot — which is what matters
  for a signup form.
*/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/*
  Phone: allow only digits, an optional leading "+", plus common separators
  (spaces, hyphens, parentheses) for readability. Requires at least 7 digits
  so it's a plausible number, not just a "+".
*/
const PHONE_ALLOWED_RE = /[^\d+\s()-]/g;
const PHONE_VALID_RE = /^\+?[\d\s()-]{7,}$/;

type Errors = {
  nombre?: string;
  email?: string;
  telefono?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_CLASS =
  "h-11 w-full rounded-sm border bg-white/3 px-4 font-sans text-sm font-light text-white placeholder:text-white/25 outline-none transition-all duration-300";

type ReservaFormProps = {
  /* `source` tags the lead in the CRM by which landing it came from. Defaults
     to this landing; set it explicitly if the form is reused elsewhere. */
  source?: string;
  /* Text for the submit button. Defaults to the Hero copy; the modal overrides
     it with "Dar mi salto". */
  submitLabel?: string;
  /* Called right after a successful registration, before navigating away — the
     modal uses it to close itself. */
  onSuccess?: () => void;
};

export function ReservaForm({
  source = "mision-origen",
  submitLabel = "✦ Quiero dar mi Salto Cuántico ✦",
  onSuccess,
}: ReservaFormProps) {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  // Strip anything that isn't a digit, "+", or a common separator as the user types.
  function handleTelefonoChange(value: string) {
    setTelefono(value.replace(PHONE_ALLOWED_RE, ""));
  }

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
    if (!telefono.trim()) {
      next.telefono = "El teléfono es obligatorio.";
    } else if (!PHONE_VALID_RE.test(telefono.trim())) {
      next.telefono = "Ingresá un teléfono válido, por ejemplo: +34 600 000 000";
    }
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          email: email.trim(),
          telefono: telefono.trim(),
          source,
        }),
      });
      // Only show success once the lead is actually stored — never on a failed
      // request, or the visitor thinks they reserved a spot that was never saved.
      if (!res.ok) throw new Error(`register failed: ${res.status}`);

      // Notify the analytics layer that a real lead was stored. GTM listens for
      // this event and fires the Meta "Lead" conversion; keeping it here (not on
      // page load) ensures only completed registrations count as conversions.
      // Fire this BEFORE navigating, or the redirect tears down the page before
      // the event is pushed.
      window.dataLayer?.push({ event: "lead_registered", lead_source: source });

      // Show a brief "¡Reservado!" confirmation on the button so the click feels
      // resolved, THEN close the modal and navigate. Without the pause the modal
      // vanishes mid-request and the success never registers visually.
      setStatus("success");
      setTimeout(() => {
        onSuccess?.(); // e.g. the modal closes itself
        router.push("/gracias-mision-origen");
      }, 900);
    } catch {
      setStatus("error");
    }
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

      {/* Teléfono — solo dígitos, "+" y separadores comunes */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="hero-telefono"
          className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-foreground/45"
        >
          Teléfono
        </label>
        <input
          id="hero-telefono"
          type="tel"
          name="telefono"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+34 600 000 000"
          value={telefono}
          onChange={(e) => handleTelefonoChange(e.target.value)}
          aria-invalid={!!errors.telefono}
          aria-describedby={errors.telefono ? "hero-telefono-error" : undefined}
          className={cn(
            FIELD_CLASS,
            errors.telefono
              ? "border-hot-pink/70 focus:border-hot-pink focus:shadow-[0_0_18px_rgba(249,2,129,0.3)]"
              : "border-cyan/20 focus:border-cyan/70 focus:bg-cyan/4 focus:shadow-[0_0_18px_rgba(40,191,241,0.25)]",
          )}
        />
        {errors.telefono && (
          <p
            id="hero-telefono-error"
            className="font-sans text-xs font-light text-hot-pink"
          >
            {errors.telefono}
          </p>
        )}
      </div>

      {/* Submit failed — let the visitor retry instead of leaving them stuck. */}
      {status === "error" && (
        <p
          role="alert"
          className="font-sans text-xs font-light text-hot-pink"
        >
          No pudimos registrar tu reserva. Revisá tu conexión y probá de nuevo.
        </p>
      )}

      {/* Submit — real button that fires the form, same pill styling */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={status === "submitting" || status === "success"}
          className={cn(
            "group relative flex h-14 w-full items-center justify-center overflow-hidden whitespace-nowrap rounded-full px-6 font-sans text-[0.65rem] font-medium uppercase tracking-[0.08em] text-white transition-all duration-500 ease-out active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed sm:text-xs sm:tracking-[0.12em] sm:px-8",
            status === "success"
              ? "bg-[linear-gradient(180deg,#22c55e_0%,#15803d_100%)] shadow-[0_0_28px_rgba(34,197,94,0.55)]"
              : "bg-[linear-gradient(180deg,#8b5cf6_0%,#6d28d9_45%,#4c1d95_100%)] shadow-[0_0_22px_rgba(109,40,217,0.6),0_4px_18px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] hover:shadow-[0_0_36px_rgba(139,92,246,0.55),0_0_64px_rgba(109,40,217,0.22),0_8px_22px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.24)] disabled:opacity-70",
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,#a78bfa_0%,#8b5cf6_45%,#6d28d9_100%)] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-60"
          />
          <span className="relative">
            {status === "submitting"
              ? "Reservando…"
              : status === "success"
                ? "✦ ¡Reservado! ✦"
                : submitLabel}
          </span>
        </button>
      </div>
    </form>
  );
}
