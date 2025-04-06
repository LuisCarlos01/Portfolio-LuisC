import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSection } from "../contexts/SectionContext";

const PageTransition = () => {
  const { activeSection } = useSection();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Efeito de transição quando a seção ativa muda
  useEffect(() => {
    if (!overlayRef.current) return;

    // Adicionar classe específica para a transição
    overlayRef.current.className = `page-transition-overlay to-${activeSection}`;

    // Reset da animação
    gsap.set(overlayRef.current, { opacity: 0, display: "none" });
  }, [activeSection]);

  return (
    <div
      ref={overlayRef}
      className="page-transition-overlay fixed inset-0 z-[9999] bg-[rgba(155,89,182,0.2)] backdrop-blur-lg opacity-0 pointer-events-none"
      aria-hidden="true"
    ></div>
  );
};

export default PageTransition;
