"use client";

import { useEffect, useState } from "react";
import { VENTAS_CHECKOUT_URL, WHATSAPP_SUPPORT_URL } from "@/lib/links";

/*
  Fixed sales CTA + WhatsApp adapted from the Jhonny Lubo reference.
  The visual effect lives in globals.css as real CSS, mirroring the Elementor
  HTML/CSS structure instead of rebuilding it with Tailwind utilities.
*/

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 33 32" fill="none" aria-hidden className={className}>
      <path
        d="M16.5249 2.36328H16.5181C8.99886 2.36328 2.88428 8.47957 2.88428 16.0005C2.88428 18.9836 3.8457 21.7486 5.48046 23.9936L3.78092 29.0598L9.02272 27.3841C11.1791 28.8126 13.7514 29.6377 16.5249 29.6377C24.0441 29.6377 30.1587 23.5197 30.1587 16.0005C30.1587 8.48127 24.0441 2.36328 16.5249 2.36328ZM24.46 21.6207C24.131 22.5498 22.8253 23.3203 21.7837 23.5453C21.0712 23.697 20.1405 23.818 17.0073 22.5191C12.9997 20.8587 10.4188 16.7863 10.2177 16.5221C10.0251 16.2579 8.59827 14.3657 8.59827 12.4088C8.59827 10.4518 9.59208 9.49895 9.99267 9.08983C10.3217 8.75402 10.8655 8.6006 11.3871 8.6006C11.5558 8.6006 11.7075 8.60912 11.8439 8.61594C12.2445 8.63299 12.4457 8.65685 12.7099 9.28928C13.0389 10.0819 13.8401 12.0389 13.9355 12.24C14.0327 12.4412 14.1299 12.7139 13.9935 12.9781C13.8656 13.2509 13.7531 13.3719 13.552 13.6037C13.3508 13.8356 13.1599 14.0129 12.9588 14.2617C12.7747 14.4782 12.5667 14.7101 12.7985 15.1107C13.0304 15.5027 13.8315 16.8102 15.0112 17.8603C16.5334 19.2155 17.7676 19.6484 18.2091 19.8325C18.5381 19.9689 18.9302 19.9365 19.1705 19.6808C19.4756 19.3518 19.8524 18.8063 20.2359 18.2694C20.5087 17.8841 20.853 17.8364 21.2144 17.9728C21.5826 18.1006 23.531 19.0637 23.9316 19.2632C24.3322 19.4643 24.5964 19.5598 24.6936 19.7286C24.789 19.8973 24.789 20.69 24.46 21.6207Z"
        fill="white"
      />
    </svg>
  );
}

export function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`ventas-fixed-cta ${visible ? "is-visible" : ""}`}>
      <div className="ventas-fixed-action ventas-fixed-action--main">
        <a
          className="ventas-fixed-button ventas-fixed-button--main"
          href={VENTAS_CHECKOUT_URL || undefined}
        >
          <span className="ventas-fixed-button__label">Acceder ahora</span>
        </a>
        <div className="ventas-borde-hueco" aria-hidden />
      </div>

      <div className="ventas-fixed-action ventas-fixed-action--whatsapp">
        <a
          className="ventas-fixed-button ventas-fixed-button--whatsapp"
          href={WHATSAPP_SUPPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Consultar por WhatsApp"
          title="Chatear por WhatsApp"
        >
          <WhatsAppIcon className="ventas-fixed-whatsapp-icon" />
        </a>
        <div className="ventas-borde-hueco2" aria-hidden />
      </div>
    </div>
  );
}
