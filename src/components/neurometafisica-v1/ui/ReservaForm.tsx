"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import PhoneInput, { getCountryCallingCode, isValidPhoneNumber, type Country } from "react-phone-number-input";
/* Banderas empaquetadas: por defecto la librería las pide a un dominio de
   terceros y, si falla, el formulario se queda sin banderas. */
import flags from "react-phone-number-input/flags";
import es from "react-phone-number-input/locale/es.json";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/cn";
import { useVisitorCountry } from "@/lib/useVisitorCountry";
import { leerAtribucion, recordarPersona } from "@/components/sierra-tracking";
import { MODAL, SOURCE } from "@/components/neurometafisica-v1/content";

/*
  Copia del formulario de v1 con el estilo de v3. La lógica es la misma y no
  conviene que diverja: /api/register, el evento lead_registered para GTM y la
  redirección a la gracias de esta versión.
*/

/*
  Prefijos: sólo el público del seminario, para que elegir sea rápido. España
  y EEUU arriba, después los países de América de habla hispana (por nombre)
  y, al final, "Otro país": la opción internacional de la librería, donde se
  escribe cualquier prefijo a mano. Así nadie queda afuera por vivir en
  otro lado. Si la geolocalización da un país que no está en la lista, el
  campo arranca directamente en "Otro país".

  Por eso el prefijo es editable (sin countryCallingCodeEditable={false}):
  bloqueado, la librería no agrega la opción internacional. Si alguien borra
  o cambia el prefijo, isValidPhoneNumber lo frena igual al enviar.
*/
const PAISES: Country[] = [
  "ES", "US", "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "SV",
  "GT", "HN", "MX", "NI", "PA", "PY", "PE", "PR", "UY", "VE",
];
const ORDEN_PAISES = ["ES", "US", "|", "...", "|", "🌐"] as const;
const ETIQUETAS = { ...es, ZZ: "Otro país (escribe el prefijo)" };
const PREFIJOS_LISTA = PAISES.map((pais) => getCountryCallingCode(pais));

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
  "h-11 w-full rounded-lg border bg-[#f3eedc]/[0.04] px-4 text-sm text-foreground placeholder:text-foreground/45 outline-none transition-all duration-300";

const FIELD_OK =
  "border-[#f3eedc]/14 focus:border-[#e9c46a]/70 focus:shadow-[0_0_18px_rgba(233,196,106,0.25)]";

const FIELD_ERROR = "border-[#e8a598]/80 focus:border-[#e8a598]";

const LABEL_CLASS = "text-xs font-semibold uppercase tracking-[0.12em] text-foreground/85";

export function ReservaForm({
  source = SOURCE,
  submitLabel = MODAL.boton,
  onSuccess,
}: {
  /** Etiqueta del lead en el CRM según la landing de origen. */
  source?: string;
  submitLabel?: string;
  /**
   * Se llama tras registrar con el primer nombre de la persona: el modal lo
   * usa para mostrar "Plaza confirmada" y navegar a la gracias. Sin él, el
   * formulario muestra su aviso y navega solo.
   */
  onSuccess?: (nombre: string) => void;
}) {
  const defaultCountry = useVisitorCountry();
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  /* "Otro país": la librería deja escrito el prefijo anterior (+34) y, al
     seguir tecleando, vuelve a deducir ese país. Al elegirlo, el campo se
     reinicia vacío (prop reset de la librería) y sin país por defecto,
     listo para escribir "+39…".
     onCountryChange también salta cuando el país se deduce de lo escrito
     (al teclear "+39" queda sin país): sólo se limpia si el campo todavía
     tiene el prefijo de un país de la lista, o sea, si lo eligieron en el
     desplegable. */
  const [otroPais, setOtroPais] = useState(0);
  const elegirPais = (pais?: Country) => {
    if (pais) return;
    const escrito = (document.getElementById("cv2-telefono") as HTMLInputElement | null)?.value ?? "";
    const digitos = escrito.replace(/\D/g, "");
    if (!PREFIJOS_LISTA.some((prefijo) => digitos.startsWith(prefijo))) return;
    setTelefono("");
    setOtroPais((n) => n + 1);
    requestAnimationFrame(() => document.getElementById("cv2-telefono")?.focus());
  };
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
          // Ruta y UTM para el panel de Sierra: el servidor no los reenvía a GHL.
          ...leerAtribucion(),
        }),
      });
      // Sólo se confirma si el lead quedó guardado.
      if (!res.ok) throw new Error(`register failed: ${res.status}`);

      // Sierra: recuerda a la persona registrada para atribuir sus clics posteriores.
      recordarPersona(email.trim());

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

      setStatus("success");
      if (onSuccess) {
        /* "Plaza confirmada" con el nombre como lo escribió, sólo el primero. */
        onSuccess(cleanName.split(/\s+/)[0] ?? "");
      } else {
        // La confirmación se ve un momento y después se pasa a la gracias.
        setTimeout(() => router.push("/registro/gracias"), 1800);
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="flex flex-col gap-4" aria-label="Formulario de registro" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cv2-nombre" className={LABEL_CLASS}>
          Nombre completo
        </label>
        <input
          id="cv2-nombre"
          type="text"
          name="nombre"
          autoComplete="name"
          placeholder="Nombre y apellido"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? "cv2-nombre-error" : undefined}
          className={cn(FIELD_CLASS, errors.nombre ? FIELD_ERROR : FIELD_OK)}
        />
        {errors.nombre && (
          <p id="cv2-nombre-error" className="text-xs text-[#e8a598]">
            {errors.nombre}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cv2-email" className={LABEL_CLASS}>
          Correo electrónico
        </label>
        <input
          id="cv2-email"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="ejemplo@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cv2-email-error" : undefined}
          className={cn(FIELD_CLASS, errors.email ? FIELD_ERROR : FIELD_OK)}
        />
        {errors.email && (
          <p id="cv2-email-error" className="text-xs text-[#e8a598]">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cv2-telefono" className={LABEL_CLASS}>
          Teléfono
        </label>
        <PhoneInput
          id="cv2-telefono"
          name="telefono"
          international
          flags={flags}
          countries={PAISES}
          countryOptionsOrder={[...ORDEN_PAISES]}
          addInternationalOption
          labels={ETIQUETAS}
          reset={otroPais}
          defaultCountry={otroPais ? undefined : (defaultCountry as Country)}
          onCountryChange={elegirPais}
          autoComplete="tel"
          placeholder="600 000 000"
          value={telefono}
          onChange={(value) => setTelefono(value ?? "")}
          aria-invalid={!!errors.telefono}
          aria-describedby={errors.telefono ? "cv2-telefono-error" : undefined}
          className={cn("mo-phone", errors.telefono ? "mo-phone--error" : undefined)}
        />
        {errors.telefono && (
          <p id="cv2-telefono-error" className="text-xs text-[#e8a598]">
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
            className="flex min-h-[66px] items-center justify-center rounded-lg border border-[#e9c46a]/60 bg-[#e9c46a]/10 text-base font-bold text-[#f0cf7a]"
          >
            {MODAL.exito}
          </p>
        ) : (
          <button
            type="submit"
            disabled={status === "submitting"}
            className="cv2-boton cv2-boton--bloque disabled:cursor-wait disabled:opacity-70"
          >
            <span className="cv2-boton__texto">{status === "submitting" ? "Reservando…" : submitLabel}</span>
          </button>
        )}
      </div>
    </form>
  );
}
