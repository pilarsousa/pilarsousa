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
  ⚠️ MAQUETA — ESTE FORMULARIO NO ENVÍA NADA A NINGÚN SITIO. ⚠️

  Valida de verdad y recorre los cuatro estados visuales, pero al enviar no hay
  petición: los datos se quedan en el navegador y se pierden. Está así a pedido,
  para definir la página antes de decidir el flujo de esta edición.

  El recorrido de después SÍ es el definitivo: confirmación con el check,
  tres segundos en pantalla y redirección a la página de gracias.

  TODO — para conectarlo, el trabajo pesado ya existe en el repo:
    · POST a /api/register (guarda en Supabase y reenvía a Go High Level),
      mandando { nombre, email, telefono, source: "volver-al-origen-waitlist" }.
      Sólo pasar a "success" si la respuesta es correcta: hoy se pasa siempre.
    · Empujar el evento "lead_registered" a window.dataLayer ANTES de navegar,
      o el redirect corta el evento y Meta no cuenta la conversión.
  El patrón completo está en mision-origen/ui/ReservaForm.tsx.
*/

/* Mismas reglas que ReservaForm y que la validación de servidor en
   /api/register, para que la maqueta no acepte datos que el backend rechazaría.

   El teléfono NO lleva regex propia: PhoneInput entrega el número ya en formato
   E.164 (+34600000000) e isValidPhoneNumber comprueba que sea válido para el
   país elegido. Una expresión regular sólo podía mirar la forma —dígitos y
   longitud—, así que daba por bueno cualquier número inventado. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = { nombre?: string; telefono?: string; email?: string };
type Status = "idle" | "submitting" | "success";

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

export function WaitlistForm() {
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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    /* El aviso en consola es deliberado: si esta maqueta llegara a publicarse
       sin conectar, el silencio haría creer que los registros se guardan. */
    console.warn(
      "[volver-al-origen] Formulario de maqueta: el lead NO se envió a ningún sitio.",
    );

    setStatus("submitting");
    timers.current.push(
      window.setTimeout(() => {
        setStatus("success");
        /* El redirect se encadena aquí, no en paralelo: si se lanzaran los dos
           desde el envío, un "submitting" más lento comería parte de los
           segundos de confirmación y el check podría no llegar a verse. */
        timers.current.push(
          window.setTimeout(() => router.push(GRACIAS_PATH), CONFIRM_MS),
        );
      }, 700),
    );
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

      <div className="mt-2">
        <VoCta type="submit" disabled={status !== "idle"}>
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
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-accent/80">
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
