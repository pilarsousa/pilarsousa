"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import PhoneInput, { isValidPhoneNumber, type Country } from "react-phone-number-input";
/* Banderas empaquetadas como componentes React, sin peticiones externas —
   mismo motivo que en el formulario de Misión Origen. */
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import { Download } from "lucide-react";
import { cn } from "@/lib/cn";
import { useVisitorCountry } from "@/lib/useVisitorCountry";
import { REWARD_PDF } from "@/components/game/game-config";

/*
  Formulario de /game/form. Reutiliza el endpoint compartido /api/register
  (que reenvía el lead a Go High Level), marcando el origen con source "game"
  para distinguirlo en el CRM.

  Al enviarse con éxito, en vez de redirigir, cambia a un estado de éxito que
  muestra una animación de verificación (un check neón que se dibuja) y el botón
  para descargar el PDF de recompensa (REWARD_PDF).

  La validación de campos es idéntica a la de Misión Origen: email por regex,
  teléfono con isValidPhoneNumber en formato E.164.
*/

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = {
  nombre?: string;
  email?: string;
  telefono?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_CLASS =
  "h-11 w-full rounded-sm border bg-white/3 px-4 font-sans text-sm font-light text-white placeholder:text-white/70 outline-none transition-all duration-300";
const LABEL_CLASS =
  "font-sans text-xs font-medium uppercase tracking-[0.15em] text-white";

export function GameForm() {
  /* Preselecciona el prefijo del país del visitante para que no tenga que
     buscarlo entre los ~240 de la lista. */
  const defaultCountry = useVisitorCountry();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

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
          source: "game",
        }),
      });
      // Sólo mostramos éxito si el lead se guardó de verdad.
      if (!res.ok) throw new Error(`register failed: ${res.status}`);

      // Avisar a la capa de analítica que se registró un lead real (GTM escucha
      // este evento y dispara la conversión de Meta), igual que en Misión Origen.
      const cleanName = nombre.trim();
      const [firstName = "", ...restName] = cleanName.split(/\s+/);
      const lastName = restName.join(" ").toLowerCase();
      window.dataLayer?.push({
        event: "lead_registered",
        lead_source: "game",
        user_data: {
          email_address: email.trim().toLowerCase(),
          address: {
            first_name: firstName.toLowerCase(),
            ...(lastName ? { last_name: lastName } : {}),
          },
        },
      });

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  /* ─────────────── Estado de éxito: verificación + recompensa ─────────────── */
  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center">
        {/* Check neón que se dibuja */}
        <motion.svg
          viewBox="0 0 96 96"
          className="size-24"
          initial="hidden"
          animate="visible"
          aria-hidden
        >
          <motion.circle
            cx="48"
            cy="48"
            r="44"
            fill="none"
            stroke="#22c55e"
            strokeWidth="4"
            style={{ filter: "drop-shadow(0 0 10px rgba(34,197,94,0.7))" }}
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.6, ease: "easeInOut" },
              },
            }}
          />
          <motion.path
            d="M30 50 L43 63 L67 35"
            fill="none"
            stroke="#4ade80"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 8px rgba(74,222,128,0.8))" }}
            variants={{
              hidden: { pathLength: 0 },
              visible: {
                pathLength: 1,
                transition: { duration: 0.4, ease: "easeOut", delay: 0.5 },
              },
            }}
          />
        </motion.svg>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-6 flex flex-col items-center"
        >
          <h2 className="font-display text-2xl tracking-tight text-white">
            ¡Registro completado!
          </h2>
          <p className="mt-3 max-w-sm font-sans text-sm font-light leading-relaxed text-white/70">
            Ya quedaste dentro. Descargá tu recompensa como agradecimiento por
            completar el formulario.
          </p>

          <a
            href={REWARD_PDF}
            download
            className="neon-btn mt-7 inline-flex h-14 items-center justify-center gap-2.5 rounded-full px-8 text-base font-bold uppercase tracking-[0.06em] transition-all duration-300 ease-out active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <Download size={20} aria-hidden />
            <span>Descargar recompensa</span>
          </a>
        </motion.div>
      </div>
    );
  }

  /* ─────────────────────────────── Formulario ─────────────────────────────── */
  return (
    <form
      className="flex w-full flex-col gap-4"
      aria-label="Formulario de registro"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Nombre */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="game-nombre" className={LABEL_CLASS}>
          Nombre completo
        </label>
        <input
          id="game-nombre"
          type="text"
          name="nombre"
          autoComplete="name"
          placeholder="Nombre y apellido"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? "game-nombre-error" : undefined}
          className={cn(
            FIELD_CLASS,
            errors.nombre
              ? "border-hot-pink/70 focus:border-hot-pink focus:shadow-[0_0_18px_rgba(249,2,129,0.3)]"
              : "border-cyan/20 focus:border-cyan/70 focus:bg-cyan/4 focus:shadow-[0_0_18px_rgba(40,191,241,0.25)]",
          )}
        />
        {errors.nombre && (
          <p
            id="game-nombre-error"
            className="font-sans text-xs font-light text-hot-pink"
          >
            {errors.nombre}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="game-email" className={LABEL_CLASS}>
          Correo electrónico
        </label>
        <input
          id="game-email"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="ejemplo@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "game-email-error" : undefined}
          className={cn(
            FIELD_CLASS,
            errors.email
              ? "border-hot-pink/70 focus:border-hot-pink focus:shadow-[0_0_18px_rgba(249,2,129,0.3)]"
              : "border-cyan/20 focus:border-cyan/70 focus:bg-cyan/4 focus:shadow-[0_0_18px_rgba(40,191,241,0.25)]",
          )}
        />
        {errors.email && (
          <p
            id="game-email-error"
            className="font-sans text-xs font-light text-hot-pink"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Teléfono */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="game-telefono" className={LABEL_CLASS}>
          Teléfono
        </label>
        <PhoneInput
          id="game-telefono"
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
          aria-describedby={errors.telefono ? "game-telefono-error" : undefined}
          className={cn(
            "mo-phone",
            errors.telefono ? "mo-phone--error" : undefined,
          )}
        />
        {errors.telefono && (
          <p
            id="game-telefono-error"
            className="font-sans text-xs font-light text-hot-pink"
          >
            {errors.telefono}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="font-sans text-xs font-light text-hot-pink">
          No pudimos completar tu registro. Revisá tu conexión y probá de nuevo.
        </p>
      )}

      <div className="pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="neon-btn neon-btn--soft inline-flex h-14 w-full items-center justify-center whitespace-nowrap rounded-full px-6 text-base font-bold uppercase tracking-[0.06em] transition-all duration-300 ease-out active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70 sm:px-8"
        >
          <span className="relative">
            {status === "submitting" ? "Enviando…" : "Completar registro"}
          </span>
        </button>
      </div>
    </form>
  );
}
