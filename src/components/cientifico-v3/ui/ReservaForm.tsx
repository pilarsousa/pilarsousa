"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import PhoneInput, { isValidPhoneNumber, type Country } from "react-phone-number-input";
/* Banderas empaquetadas: por defecto la librería las pide a un dominio de
   terceros y, si falla, el formulario se queda sin banderas. */
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/cn";
import { useVisitorCountry } from "@/lib/useVisitorCountry";
import { SOURCE } from "@/components/cientifico-v3/content";

/*
  Copia del formulario de v1 con el estilo de v3. La lógica es la misma y no
  conviene que diverja: /api/register, el evento lead_registered para GTM y la
  redirección a la gracias de esta versión.
*/

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Meta Advanced Matching / CAPI piden E.164. Sin prefijo, se asume España. */
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

const FIELD_CLASS =
  "h-11 w-full rounded-lg border bg-[#f4eee4]/[0.04] px-4 text-sm text-foreground placeholder:text-foreground/45 outline-none transition-all duration-300";

const FIELD_OK =
  "border-[#f4eee4]/14 focus:border-[#7da89a]/70 focus:shadow-[0_0_18px_rgba(125,168,154,0.25)]";

const FIELD_ERROR = "border-[#e8a598]/80 focus:border-[#e8a598]";

const LABEL_CLASS = "text-xs font-semibold uppercase tracking-[0.12em] text-foreground/85";

export function ReservaForm({
  source = SOURCE,
  submitLabel = "Quiero mi entrada gratuita",
  onSuccess,
}: {
  /** Etiqueta del lead en el CRM según la landing de origen. */
  source?: string;
  submitLabel?: string;
  /** Se llama tras registrar, antes de navegar (el modal se cierra). */
  onSuccess?: () => void;
}) {
  const defaultCountry = useVisitorCountry();
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): Errors {
    const next: Errors = {};
    if (nombre.trim().length < 2) {
      next.nombre = "Escribe tu nombre completo.";
    }
    if (!email.trim()) {
      next.email = "El correo es obligatorio.";
    } else if (!EMAIL_RE.test(email.trim())) {
      next.email = "Escribe un correo válido, por ejemplo: nombre@mail.com";
    }
    if (!telefono.trim()) {
      next.telefono = "El teléfono es obligatorio.";
    } else if (!isValidPhoneNumber(telefono)) {
      next.telefono = "Escribe un teléfono válido para el país seleccionado.";
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
      // Sólo se confirma si el lead quedó guardado.
      if (!res.ok) throw new Error(`register failed: ${res.status}`);

      // GTM escucha este evento para la conversión "Lead" de Meta. Va ANTES de
      // navegar, o la redirección desmonta la página antes del push. Datos en
      // claro: GTM/Stape aplican el SHA-256.
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

      // La confirmación se ve un momento y después se pasa a la gracias.
      setStatus("success");
      setTimeout(() => {
        onSuccess?.();
        router.push("/registro/gracias");
      }, 1800);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="flex flex-col gap-4" aria-label="Formulario de registro" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cv3-nombre" className={LABEL_CLASS}>
          Nombre completo
        </label>
        <input
          id="cv3-nombre"
          type="text"
          name="nombre"
          autoComplete="name"
          placeholder="Nombre y apellido"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? "cv3-nombre-error" : undefined}
          className={cn(FIELD_CLASS, errors.nombre ? FIELD_ERROR : FIELD_OK)}
        />
        {errors.nombre && (
          <p id="cv3-nombre-error" className="text-xs text-[#e8a598]">
            {errors.nombre}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cv3-email" className={LABEL_CLASS}>
          Correo electrónico
        </label>
        <input
          id="cv3-email"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="ejemplo@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cv3-email-error" : undefined}
          className={cn(FIELD_CLASS, errors.email ? FIELD_ERROR : FIELD_OK)}
        />
        {errors.email && (
          <p id="cv3-email-error" className="text-xs text-[#e8a598]">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cv3-telefono" className={LABEL_CLASS}>
          Teléfono
        </label>
        <PhoneInput
          id="cv3-telefono"
          name="telefono"
          international
          flags={flags}
          countryCallingCodeEditable={false}
          defaultCountry={defaultCountry as Country}
          autoComplete="tel"
          placeholder="600 000 000"
          value={telefono}
          onChange={(value) => setTelefono(value ?? "")}
          aria-invalid={!!errors.telefono}
          aria-describedby={errors.telefono ? "cv3-telefono-error" : undefined}
          className={cn("mo-phone", errors.telefono ? "mo-phone--error" : undefined)}
        />
        {errors.telefono && (
          <p id="cv3-telefono-error" className="text-xs text-[#e8a598]">
            {errors.telefono}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-xs text-[#e8a598]">
          No pudimos registrarte. Revisa tu conexión y vuelve a intentarlo.
        </p>
      )}

      <div className="pt-2">
        {status === "success" ? (
          <p
            role="status"
            className="flex min-h-[66px] items-center justify-center rounded-lg border border-[#7da89a]/60 bg-[#7da89a]/10 text-base font-bold text-[#94c7b6]"
          >
            ¡Entrada reservada! Te llevamos al siguiente paso…
          </p>
        ) : (
          <button
            type="submit"
            disabled={status === "submitting"}
            className="cv3-boton cv3-boton--bloque disabled:cursor-wait disabled:opacity-70"
          >
            <span className="cv3-boton__billete">
              {status === "submitting" ? "Reservando…" : submitLabel}
            </span>
          </button>
        )}
      </div>
    </form>
  );
}
