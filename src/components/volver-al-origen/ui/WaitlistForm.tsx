"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Mail, User } from "lucide-react";
import PhoneInput, {
  isValidPhoneNumber,
  type Country,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/cn";
import { useVisitorCountry } from "@/lib/useVisitorCountry";
import { VoCta } from "@/components/volver-al-origen/ui/VoCta";
import { FORM, GRACIAS_PATH } from "@/components/volver-al-origen/content";

/*
  Formulario de la lista de espera de la tercera edición.

  El lead viaja a /api/register, que lo respalda en Supabase y lo reenvía al
  webhook de Go High Level. Mismo endpoint y mismo contrato que ReservaForm de
  Misión Origen; lo que separa los registros de cada landing en el CRM es
  `source`, que aquí vale "volver-al-origen-waitlist".

  Sólo se pasa a "success" si la petición sale bien: la confirmación con el
  check tiene que significar que el dato está guardado, nunca sólo que el
  visitante apretó el botón. Si falla, el estado va a "error" y se le ofrece
  reintentar en lugar de dejarlo creyendo que se registró.

  El evento de analítica se empuja ANTES del router.push: el redirect desmonta
  la página, y un dataLayer.push posterior no llegaría a dispararse — Meta
  perdería la conversión.
*/

/* Mismas reglas que ReservaForm y que la validación de servidor en
   /api/register, para que la maqueta no acepte datos que el backend rechazaría.

   El teléfono NO lleva regex propia: PhoneInput entrega el número ya en formato
   E.164 (+34600000000) e isValidPhoneNumber comprueba que sea válido para el
   país elegido. Una expresión regular sólo podía mirar la forma —dígitos y
   longitud—, así que daba por bueno cualquier número inventado. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = { nombre?: string; telefono?: string; email?: string };
type Status = "idle" | "submitting" | "success" | "error";

/* Meta (Advanced Matching / CAPI) quiere el teléfono en E.164: sólo dígitos con
   el "+" del prefijo. PhoneInput ya lo entrega así; esto lo blinda por si el
   valor trae espacios, guiones o paréntesis. Sin hashear a propósito: el
   SHA-256 lo aplican GTM/Stape. Mismo criterio que ReservaForm. */
function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return "";
  return trimmed.startsWith("+") ? `+${digits}` : `+34${digits}`;
}

/* Etiqueta con la que este formulario se distingue del resto en el CRM. */
const LEAD_SOURCE = "volver-al-origen-waitlist";

/* El formulario vive sobre el panel translúcido del hero, encima de la foto.
   Por eso los campos son oscuros y translúcidos con texto claro: un campo
   blanco sólido rompería la transparencia que se buscaba en el panel. */
/* lg:h-12 baja los campos de 52 a 48 px en escritorio: son 12 px menos entre
   los tres, parte del recorte que hace caber el panel en los 800 px de alto
   del hero. */
const FIELD_CLASS =
  "h-[52px] w-full rounded-sm border bg-vo-black/40 pl-12 pr-4 font-sans text-sm font-light text-foreground outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-foreground/55 lg:h-12";

/* Cuánto se mantiene la confirmación en pantalla antes de navegar. Da tiempo a
   leer el mensaje y a ver el check dibujarse, sin llegar a hacerse espera. */
const CONFIRM_MS = 3000;

type WaitlistFormProps = {
  /* Se llama justo antes de navegar a la página de gracias. El modal lo usa
     para cerrarse solo: si no, se queda montado sobre la página nueva y el
     visitante aterriza en el destino con el formulario todavía por delante,
     sin saber que ya terminó. */
  onSuccess?: () => void;
};

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const router = useRouter();
  /* País preseleccionado según la IP del visitante, resuelto por /api/geo. Sin
     esto todo el mundo empieza en el país por defecto y quien no se dé cuenta
     manda su número con el prefijo equivocado. */
  const defaultCountry = useVisitorCountry();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  /* El temporizador se guarda para poder cancelarlo si el componente se
     desmonta antes de que salte: navegar desde un componente ya desmontado
     dispara un aviso de React y, peor, podría sacar al visitante de una página
     a la que ya se hubiera movido por su cuenta. */
  const timers = useRef<number[]>([]);
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  function validate(): Errors {
    const next: Errors = {};
    if (nombre.trim().length < 2) next.nombre = "Ingresá tu nombre.";
    if (!telefono || !isValidPhoneNumber(telefono))
      next.telefono = "Ingresá un número de WhatsApp válido.";
    if (!EMAIL_RE.test(email.trim()))
      next.email = "Ingresá un correo válido, por ejemplo: nombre@mail.com";
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const cleanNombre = nombre.trim();
    const cleanEmail = email.trim();
    const cleanTelefono = telefono.trim();

    setStatus("submitting");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: cleanNombre,
          email: cleanEmail,
          telefono: cleanTelefono,
          source: LEAD_SOURCE,
        }),
      });
      /* Sin esto la confirmación mentiría: el check saldría igual con el lead
         perdido, y el visitante se iría creyendo que quedó en la lista. */
      if (!res.ok) throw new Error(`register failed: ${res.status}`);

      /* GTM escucha este evento para disparar la conversión "Lead" de Meta.
         Va antes del router.push porque el redirect desmonta la página.
         user_data en claro: GTM/Stape hashean antes de mandarlo a Meta. */
      const [firstName = "", ...restName] = cleanNombre.split(/\s+/);
      const lastName = restName.join(" ").toLowerCase();
      window.dataLayer?.push({
        event: "lead_registered",
        lead_source: LEAD_SOURCE,
        user_data: {
          email_address: cleanEmail.toLowerCase(),
          phone_number: normalizePhone(cleanTelefono),
          address: {
            first_name: firstName.toLowerCase(),
            ...(lastName ? { last_name: lastName } : {}),
          },
        },
      });

      setStatus("success");
      /* El redirect se encadena tras la confirmación para que dé tiempo a leer
         el mensaje y a ver el check dibujarse.

         onSuccess va ANTES del push y no después: cierra el modal con su
         animación de salida mientras la navegación arranca, así que el
         visitante ve el panel irse y la página de gracias aparecer, en vez de
         encontrarse el formulario encima del destino. */
      timers.current.push(
        window.setTimeout(() => {
          onSuccess?.();
          router.push(GRACIAS_PATH);
        }, CONFIRM_MS),
      );
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      className="flex w-full flex-col gap-3"
      aria-label="Formulario de lista de espera"
      onSubmit={handleSubmit}
      noValidate
    >
      <Field
        id="vo-nombre"
        icon={<User size={18} strokeWidth={1.4} aria-hidden />}
        error={errors.nombre}
      >
        <input
          id="vo-nombre"
          type="text"
          name="nombre"
          autoComplete="name"
          placeholder={FORM.fields.nombre}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? "vo-nombre-error" : undefined}
          className={cn(FIELD_CLASS, borderFor(errors.nombre))}
        />
      </Field>

      {/* Teléfono — selector de país + número.

          No lleva el icono a la izquierda que sí tienen los otros campos: ese
          sitio lo ocupa la bandera, que cumple la misma función de señalar de
          qué va el campo y además dice algo que el icono no podía decir.

          El selector inyecta el prefijo internacional y lo mantiene separado
          del número, así que el valor sale siempre en E.164 y llega al CRM en
          el formato que espera. */}
      <div className="flex flex-col gap-1">
        <PhoneInput
          id="vo-telefono"
          name="telefono"
          international
          flags={flags}
          countryCallingCodeEditable={false}
          defaultCountry={defaultCountry as Country}
          autoComplete="tel"
          placeholder={FORM.fields.telefono}
          value={telefono}
          /* PhoneInput emite undefined cuando el campo queda vacío; se
             normaliza a "" para que el estado sea siempre string. */
          onChange={(value) => setTelefono(value ?? "")}
          aria-invalid={!!errors.telefono}
          aria-describedby={errors.telefono ? "vo-telefono-error" : undefined}
          className={cn("vo-phone", errors.telefono && "vo-phone--error")}
        />
        {errors.telefono && (
          <p
            id="vo-telefono-error"
            className="font-sans text-xs font-light text-red-300"
          >
            {errors.telefono}
          </p>
        )}
      </div>

      <Field
        id="vo-email"
        icon={<Mail size={18} strokeWidth={1.4} aria-hidden />}
        error={errors.email}
      >
        <input
          id="vo-email"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder={FORM.fields.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "vo-email-error" : undefined}
          className={cn(FIELD_CLASS, borderFor(errors.email))}
        />
      </Field>

      {/* El envío falló: se avisa y se deja reintentar, en vez de dejar al
          visitante mirando un botón muerto sin saber qué pasó. */}
      {status === "error" && (
        <p
          role="alert"
          className="font-sans text-xs font-light text-red-300"
        >
          {FORM.error}
        </p>
      )}

      <div className="mt-2">
        {/* Sólo se bloquea mientras la petición está en vuelo o ya salió bien.
            En "error" vuelve a estar activo para poder reintentar. */}
        <VoCta
          type="submit"
          disabled={status === "submitting" || status === "success"}
        >
          {status === "success" ? (
            <span className="inline-flex items-center justify-center gap-2.5">
              <CheckMark />
              {FORM.success}
            </span>
          ) : status === "submitting" ? (
            FORM.submitting
          ) : (
            FORM.submit
          )}
        </VoCta>
      </div>
    </form>
  );
}

/* Check de confirmación. El círculo entra con un rebote y el trazo se dibuja
   solo; las dos animaciones viven en globals.css (.vo-check / .vo-check-path).

   El path mide unos 30 de longitud, que es el valor del stroke-dasharray que
   hace posible el dibujado. Si se cambia el icono hay que recalcularlo o el
   trazo aparecerá de golpe. */
function CheckMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="vo-check size-6 shrink-0"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" fill="var(--color-vo-lumen)" />
      <path
        className="vo-check-path"
        d="M7.5 12.4l3.1 3.1 6-6.4"
        stroke="var(--color-vo-black)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Sobre fondo oscuro el foco usa el verde luminoso, que es el que se lee
   encendido; el rojo del error también se aclara por el mismo motivo. */
function borderFor(error?: string) {
  return error
    ? "border-red-400/70 focus:border-red-400"
    : "border-vo-bone/20 focus:border-accent focus:shadow-[0_0_0_3px_rgba(180,226,54,0.2)]";
}

/** Campo con icono a la izquierda y su mensaje de error debajo. */
function Field({
  id,
  icon,
  error,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        {/* El verde a plena intensidad, el mismo del resto de acentos de la
            landing. Estaba al 80% y sobre el fondo oscuro del campo se leía
            apagado, sin llegar al encendido que tienen el CTA o el badge. */}
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-accent">
          {icon}
        </span>
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="font-sans text-xs font-light text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
