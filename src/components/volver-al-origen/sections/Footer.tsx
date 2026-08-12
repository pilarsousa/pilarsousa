import { VoContainer } from "@/components/volver-al-origen/ui/VoContainer";
import { FOOTER } from "@/components/volver-al-origen/content";

/*
  Pie mínimo. No reutiliza el footer de Misión Origen porque aquel lleva su
  paleta neón y enlaces a secciones que esta landing no tiene.
*/
export function Footer() {
  return (
    <footer className="border-t border-accent/12 bg-background py-9">
      <VoContainer>
        <div className="flex flex-col items-center text-center">
          <p className="font-sans text-sm font-light text-foreground/60">
            {FOOTER.copyright}
          </p>
        </div>
      </VoContainer>
    </footer>
  );
}
