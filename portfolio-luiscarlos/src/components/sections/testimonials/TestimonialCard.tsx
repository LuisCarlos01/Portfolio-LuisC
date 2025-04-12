import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Testimonial } from "../../../types/testimonialTypes";
import TestimonialStars from "./TestimonialStars";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isAnimating: boolean;
  direction: "next" | "prev" | null;
}

/**
 * Componente para exibir um cartão de depoimento
 */
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  isAnimating,
  direction,
}) => {
  return (
    <div
      className={`bg-gradient-to-br from-bg-dark via-bg-dark to-bg-dark/95 p-6 md:p-8 rounded-2xl shadow-xl relative backdrop-blur-lg border border-gray-800/50 transition-all duration-700 ${
        isAnimating
          ? direction === "next"
            ? "animate-slide-out-left"
            : "animate-slide-out-right"
          : "animate-slide-in"
      }`}
      aria-roledescription="slide"
      aria-label={`Depoimento de ${testimonial.name}`}
    >
      <div className="absolute -top-1 -right-1 -left-1 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>
      <div className="absolute -bottom-1 -right-1 -left-1 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>

      {/* Ícone de aspas decorativo */}
      <div className="absolute top-10 left-10 text-primary/10 text-7xl transform -translate-y-1/2 -translate-x-1/2 opacity-80">
        <FaQuoteLeft />
      </div>

      <div className="bg-primary/5 rounded-xl p-5 md:p-7 backdrop-blur-sm shadow-inner border border-primary/10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-primary/30 relative shadow-lg group transition-transform duration-500 hover:scale-105">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Brilho decorativo */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-70"></div>

              {/* Efeito de destaque ao passar o mouse */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-40 bg-primary/40 transition-opacity duration-300 ease-in-out"></div>

              {/* Destaque de borda */}
              <div className="absolute inset-0 border-2 border-primary/30 rounded-full opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-500"></div>
            </div>
          </div>

          <div className="flex-grow">
            <TestimonialStars rating={testimonial.rating} />
            <p className="text-text-light text-base md:text-lg italic mb-5 leading-relaxed relative">
              "{testimonial.text}"
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary/40 rounded-full"></span>
            </p>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-white mb-1 group">
                {testimonial.name}
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-700 h-0.5 bg-primary mt-0.5"></span>
              </h3>
              <p className="text-primary text-sm md:text-base">
                {testimonial.role}
                {testimonial.company && <span> • {testimonial.company}</span>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
