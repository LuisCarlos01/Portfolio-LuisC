import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../../common/SectionTitle";
import TestimonialsCarousel from "./TestimonialsCarousel";
import ParticleEffect from "./ParticleEffect";
import { testimonials } from "./data";
import { useAnimateSection } from "../../../hooks/useAnimateSection";

// Registrar plugins GSAP
gsap.registerPlugin(ScrollTrigger);

/**
 * Seção de depoimentos de clientes e parceiros
 */
const TestimonialsSection: React.FC = () => {
  // Usar hook personalizado para animação da seção
  const { sectionRef, forceVisibility } = useAnimateSection(
    { sectionId: "testimonials", triggerOffset: "top 70%" },
    { title: "h2", description: "p.text-lg", items: ".testimonial-nav-btn" }
  );

  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Forçar a exibição da seção quando o componente for montado
  useEffect(() => {
    // Garantir que a seção esteja realmente visível
    forceVisibility();

    // Adicionar CSS especial para garantir visibilidade
    const style = document.createElement("style");
    style.innerHTML = `
      #testimonials {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 1 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [forceVisibility]);

  // Estilos CSS para animações específicas do carousel
  const carouselAnimationStyles = `
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
  `;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-20 bg-bg-dark section-container relative overflow-hidden"
      style={{
        minHeight: "100vh",
        display: "block",
        visibility: "visible",
        opacity: 1,
        zIndex: 1,
      }}
    >
      {/* Efeito de partículas decorativas */}
      <ParticleEffect
        density={60000}
        maxParticles={15}
        color="rgba(155, 89, 182, %o)"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Título da seção */}
        <div ref={titleRef}>
          <SectionTitle
            title="O que dizem sobre mim"
            subtitle="Feedback de clientes e parceiros com quem colaborei em projetos de desenvolvimento e design."
          />
        </div>

        {/* Carousel de depoimentos */}
        <div ref={carouselRef}>
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </div>

      {/* Estilos CSS específicos para o carousel */}
      <style>{carouselAnimationStyles}</style>
    </section>
  );
};

export default TestimonialsSection;
