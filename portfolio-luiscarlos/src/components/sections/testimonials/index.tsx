import React, { useState, useRef, useEffect } from "react";
import { useAnimateSection } from "../../../hooks/useAnimateSection";
import SectionTitle from "../../common/SectionTitle";
import TestimonialHeader from "./TestimonialHeader";
import TestimonialCard from "./TestimonialCard";
import TestimonialIndicators from "./TestimonialIndicators";
import TestimonialNavigation from "./TestimonialNavigation";
import ParticleEffect from "../../common/ParticleEffect";
import { Testimonial } from "../../../types/testimonialTypes";

// Importando dados dos depoimentos
import { testimonials } from "../../../data/testimonialsData";

/**
 * Seção de depoimentos de clientes e parceiros
 */
const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Referência para o intervalo de autoplay
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  // Usar hook personalizado para animação da seção
  const { sectionRef, forceVisibility } = useAnimateSection(
    { sectionId: "testimonials", triggerOffset: "top 70%" },
    { title: "h2", description: "p.text-lg", items: ".testimonial-nav-btn" }
  );

  // Navegar para o próximo depoimento
  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("next");

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 700);

    // Resetar o timer de autoplay
    resetAutoplayTimer();
  };

  // Navegar para o depoimento anterior
  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("prev");

    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
      setIsAnimating(false);
    }, 700);

    // Resetar o timer de autoplay
    resetAutoplayTimer();
  };

  // Ir para um depoimento específico
  const goToIndex = (index: number) => {
    if (isAnimating || index === currentIndex) return;

    setIsAnimating(true);
    setDirection(index > currentIndex ? "next" : "prev");

    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 700);

    // Resetar o timer de autoplay
    resetAutoplayTimer();
  };

  // Resetar o timer de autoplay
  const resetAutoplayTimer = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }

    autoplayIntervalRef.current = setInterval(() => {
      goToNext();
    }, 10000); // Autoplay a cada 10 segundos
  };

  // Configurar autoplay e forçar visibilidade quando o componente montar
  useEffect(() => {
    forceVisibility();
    resetAutoplayTimer();

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [forceVisibility]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-20 bg-bg-dark section-container relative overflow-hidden"
      style={{
        minHeight: "100vh",
      }}
    >
      {/* Efeito de partículas decorativas */}
      <ParticleEffect
        color="rgba(155, 89, 182, %o)"
        density={60000}
        maxParticles={15}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho da seção */}
        <TestimonialHeader />

        {/* Conteúdo principal */}
        <div className="max-w-4xl mx-auto mt-16 relative">
          {/* Card do depoimento atual */}
          <TestimonialCard
            testimonial={testimonials[currentIndex]}
            isAnimating={isAnimating}
            direction={direction}
          />

          {/* Navegação entre depoimentos */}
          <TestimonialNavigation onPrev={goToPrev} onNext={goToNext} />

          {/* Indicadores de depoimentos */}
          <TestimonialIndicators
            total={testimonials.length}
            current={currentIndex}
            onSelect={goToIndex}
          />
        </div>
      </div>

      {/* Estilos CSS específicos para animações */}
      <style>{`
        @keyframes slideOutLeft {
          from { transform: translateX(0) scale(1); opacity: 1; }
          to { transform: translateX(-40px) scale(0.98); opacity: 0; }
        }
        
        @keyframes slideOutRight {
          from { transform: translateX(0) scale(1); opacity: 1; }
          to { transform: translateX(40px) scale(0.98); opacity: 0; }
        }
        
        @keyframes slideIn {
          from { 
            transform: translateX(var(--slide-direction, 40px)) scale(0.98); 
            opacity: 0; 
          }
          to { 
            transform: translateX(0) scale(1); 
            opacity: 1; 
          }
        }
        
        .animate-slide-out-left {
          animation: slideOutLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-slide-out-right {
          animation: slideOutRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-slide-in {
          animation: slideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
