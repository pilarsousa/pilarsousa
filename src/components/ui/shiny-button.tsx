"use client";

import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/cn";

interface ShinyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  contentClassName?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export function ShinyButton({
  children,
  onClick,
  className,
  contentClassName,
  href,
  type = "button",
  disabled = false,
  target,
  rel,
  "aria-label": ariaLabel,
}: ShinyButtonProps) {
  const clases = cn("shiny-cta dg-boton-shiny", className);
  const contenido = (
    <span
      className={cn(
        "shiny-cta-content dg-boton-shiny-contenido",
        contentClassName,
      )}
    >
      {children}
    </span>
  );

  if (href && !disabled) {
    const esExterno = /^https?:\/\//.test(href);

    if (esExterno) {
      return (
        <a
          href={href}
          target={target ?? "_blank"}
          rel={rel ?? "noopener noreferrer"}
          aria-label={ariaLabel}
          onClick={onClick}
          className={clases}
        >
          {contenido}
        </a>
      );
    }

    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        onClick={onClick}
        className={clases}
      >
        {contenido}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={clases}
    >
      {contenido}
    </button>
  );
}
