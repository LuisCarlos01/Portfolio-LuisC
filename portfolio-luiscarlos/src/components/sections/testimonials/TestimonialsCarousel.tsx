import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TestimonialCard from "./TestimonialCard";
import { Testimonial } from "./types";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoRotate?: boolean;
  autoRotateInterval?: number;
}

/**
 * Componente de carousel para depoimentos
 */
const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  autoRotate = true,
  autoRotateInterval = 8000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  // Efeito de auto-rotação dos depoimentos
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [activeIndex, isAnimating, autoRotate, autoRotateInterval]);

  // Adicionar suporte a navegação pelo teclado
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isAnimating]);

  // Função para ir ao próximo depoimento com animação
  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection("next");

    // Atualizar índice ativo
    setActiveIndex((prev) => (prev + 1) % testimonials.length);

    // Permitir nova animação após delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  // Função para ir ao depoimento anterior com animação
  const handlePrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection("prev");

    // Atualizar índice ativo
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

    // Permitir nova animação após delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  // Função para ir a um índice específico
  const goToIndex = (index: number) => {
    if (isAnimating || index === activeIndex) return;

    setIsAnimating(true);
    setDirection(index > activeIndex ? "next" : "prev");
    setActiveIndex(index);

    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  return (
    <div
      className="max-w-5xl mx-auto relative"
      role="region"
      aria-label="Carrossel de depoimentos"
      tabIndex={0}
      aria-live="polite"
    >
      {/* Botões de navegação */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 z-20">
        <button
          onClick={handlePrev}
          className="testimonial-nav-btn w-10 h-10 md:w-12 md:h-12 rounded-full bg-bg-dark/80 backdrop-blur-sm text-text-light border border-primary/20 shadow-lg hover:text-primary hover:border-primary/50 hover:shadow-xl transition-all duration-300 ease-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-bg-dark transform hover:-translate-x-1 active:scale-95"
          aria-label="Depoimento anterior"
          disabled={isAnimating}
        >
          <FaChevronLeft />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 z-20">
        <button
          onClick={handleNext}
          className="testimonial-nav-btn w-10 h-10 md:w-12 md:h-12 rounded-full bg-bg-dark/80 backdrop-blur-sm text-text-light border border-primary/20 shadow-lg hover:text-primary hover:border-primary/50 hover:shadow-xl transition-all duration-300 ease-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-bg-dark transform hover:translate-x-1 active:scale-95"
          aria-label="Próximo depoimento"
          disabled={isAnimating}
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Container do slideshow */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div className="relative h-auto overflow-visible">
          {/* Card principal do depoimento */}
          <TestimonialCard
            testimonial={testimonials[activeIndex]}
            direction={direction}
            isAnimating={isAnimating}
          />
        </div>
      </div>

      {/* Indicadores de slides */}
      <div className="flex justify-center mt-8 space-x-3" role="tablist">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`${
              index === activeIndex
                ? "w-10 bg-primary shadow-md shadow-primary/30"
                : "w-3 bg-gray-600 hover:bg-primary/40"
            } h-3 rounded-full transition-all duration-500 ease-out scale-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50`}
            aria-label={`Depoimento ${index + 1}`}
            role="tab"
            aria-selected={index === activeIndex}
            disabled={isAnimating}
          />
        ))}
      </div>

      {/* Counter da quantidade de depoimentos */}
      <div className="text-center mt-10 text-text-light/60 text-sm font-medium">
        <span className="text-primary font-bold">{activeIndex + 1}</span>
        <span> / </span>
        <span>{testimonials.length}</span>
      </div>

      {/* Instrução para navegação pelo teclado */}
      <div className="text-center mt-2 text-text-light/40 text-xs hidden md:block">
        <span>Use as teclas ← e → para navegar entre os depoimentos</span>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
