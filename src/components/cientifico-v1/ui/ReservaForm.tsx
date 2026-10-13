"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import PhoneInput, { isValidPhoneNumber, type Country } from "react-phone-number-input";
/* Banderas empaquetadas como componentes React. Por defecto la librería las
   pide a un GitHub Pages de terceros: si ese dominio falla, el formulario se
   queda sin banderas. Estas viajan en el bundle, sin peticiones externas. */
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/cn";
import { useVisitorCountry } from "@/lib/useVisitorCountry";

/*
  Email validation: requires local part, "@", a domain with at least one dot,
  and a 2+ char TLD. Not RFC-perfect (no regex is) but rejects the common
  mistakes — missing "@", missing domain, trailing dot — which is what matters
  for a signup form.
*/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* El teléfono ya no se valida con regex propia: PhoneInput entrega el número
   en E.164 e isValidPhoneNumber comprueba que sea válido para el país elegido,
   que es bastante más fiable que contar dígitos. */

/* Meta Advanced Matching / CAPI quieren el teléfono en E.164: sólo dígitos con
   el "+" del prefijo internacional. PhoneInput ya lo entrega así, pero lo
   normalizamos por si el valor llega con espacios, guiones o paréntesis; si no
   trae prefijo de país asumimos España (+34). Sin hashear: eso lo hace GTM/Stape. */
function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return "";
  return trimmed.startsWith("+") ? `+${digits}` : `+34${digits}`;
}

type Errors = {
  nombre?: string;
  email?: string;
  telefono?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

/* Placeholder en blanco (a 70% para que siga leyéndose como texto de ayuda y
   no como valor cargado): los grises previos quedaban ilegibles sobre el panel
   oscuro del modal. */
const FIELD_CLASS =
  "h-11 w-full rounded-sm border bg-[#f4eee4]/[0.04] px-4 font-sans text-sm font-light text-foreground placeholder:text-foreground/70 outline-none transition-all duration-300";

/* Etiquetas en blanco pleno, por el mismo motivo. */
const LABEL_CLASS =
  "font-sans text-xs font-medium uppercase tracking-[0.15em] text-foreground";

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
  source = "cientifico-v1",
  submitLabel = "Quiero dar mi Salto Cuántico",
  onSuccess,
}: ReservaFormProps) {
  /* Preselecciona el prefijo del país del visitante para que no tenga que
     buscarlo entre los ~240 de la lista. */
  const defaultCountry = useVisitorCountry();
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  /* PhoneInput emite undefined cuando el campo queda vacío; lo normalizamos a
     "" para que el estado siga siendo siempre string. */
  function handleTelefonoChange(value?: string) {
    setTelefono(value ?? "");
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
    } else if (!isValidPhoneNumber(telefono)) {
      next.telefono = "Ingresá un teléfono válido para el país seleccionado.";
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
      // user_data en claro (sin hashear): GTM/Stape aplican el SHA-256 antes de
      // enviarlo a Meta (Advanced Matching / Conversions API).
      const cleanName = nombre.trim();
      const [firstName = "", ...restName] = cleanName.split(/\s+/);
      const lastName = restName.join(" ").toLowerCase();
      window.dataLayer?.push({
        event: "lead_registered",
        lead_source: source,
        user_data: {
          email_address: email.trim().toLowerCase(),
          phone_number: normalizePhone(telefono),
          address: {
            first_name: firstName.toLowerCase(),
            ...(lastName ? { last_name: lastName } : {}),
          },
        },
      });

      // Show the "¡Reservado!" confirmation for ~3s so it clearly registers,
      // then close the modal and navigate to the thank-you page. This redirect
      // fires on the timer regardless of whether the user closes the modal
      // manually in the meantime — closing early just gets them there sooner.
      setStatus("success");
      setTimeout(() => {
        onSuccess?.(); // e.g. the modal closes itself
        router.push("/cientifico-v1/gracias");
      }, 3000);
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
          className={LABEL_CLASS}
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
              ? "border-[#e8a598]/70 focus:border-[#e8a598] focus:shadow-[0_0_18px_rgba(232,165,152,0.3)]"
              : "border-cyan/20 focus:border-cyan/70 focus:bg-cyan/4 focus:shadow-[0_0_18px_rgba(125,168,154,0.25)]",
          )}
        />
        {errors.nombre && (
          <p
            id="hero-nombre-error"
            className="font-sans text-xs font-light text-[#e8a598]"
          >
            {errors.nombre}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="hero-email"
          className={LABEL_CLASS}
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
              ? "border-[#e8a598]/70 focus:border-[#e8a598] focus:shadow-[0_0_18px_rgba(232,165,152,0.3)]"
              : "border-cyan/20 focus:border-cyan/70 focus:bg-cyan/4 focus:shadow-[0_0_18px_rgba(125,168,154,0.25)]",
          )}
        />
        {errors.email && (
          <p
            id="hero-email-error"
            className="font-sans text-xs font-light text-[#e8a598]"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Teléfono — selector de país + número. El selector inyecta el prefijo
          internacional automáticamente y queda separado del número, así el
          valor que viaja al CRM siempre sale en formato E.164 (+34600000000). */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="hero-telefono"
          className={LABEL_CLASS}
        >
          Teléfono
        </label>
        <PhoneInput
          id="hero-telefono"
          name="telefono"
          international
          flags={flags}
          countryCallingCodeEditable={false}
          defaultCountry={defaultCountry as Country}
          autoComplete="tel"
          placeholder="600 000 000"
          value={telefono}
          onChange={handleTelefonoChange}
          aria-invalid={!!errors.telefono}
          aria-describedby={errors.telefono ? "hero-telefono-error" : undefined}
          className={cn(
            "mo-phone",
            errors.telefono ? "mo-phone--error" : undefined,
          )}
        />
        {errors.telefono && (
          <p
            id="hero-telefono-error"
            className="font-sans text-xs font-light text-[#e8a598]"
          >
            {errors.telefono}
          </p>
        )}
      </div>

      {/* Submit failed — let the visitor retry instead of leaving them stuck. */}
      {status === "error" && (
        <p
          role="alert"
          className="font-sans text-xs font-light text-[#e8a598]"
        >
          No pudimos registrar tu reserva. Revisá tu conexión y probá de nuevo.
        </p>
      )}

      {/* Submit — neon-glow button. Turns green on success ("¡Reservado!"). */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={status === "submitting" || status === "success"}
          className={cn(
            "relative flex h-14 w-full items-center justify-center whitespace-nowrap rounded-full px-6 text-base font-bold uppercase tracking-[0.04em] transition-all duration-300 ease-out active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed sm:px-8",
            status === "success"
              ? "border-2 border-[#7da89a] bg-[#2e4a43] text-foreground shadow-[0_0_28px_rgba(125,168,154,0.5)]"
              : "neon-btn disabled:opacity-70",
          )}
        >
          <span className="relative">
            {status === "submitting"
              ? "Reservando…"
              : status === "success"
                ? "¡Reservado!"
                : submitLabel}
          </span>
        </button>
      </div>
    </form>
  );
}
