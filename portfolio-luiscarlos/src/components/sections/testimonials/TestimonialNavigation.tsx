import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface TestimonialNavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Componente para navegação entre depoimentos
 */
const TestimonialNavigation: React.FC<TestimonialNavigationProps> = ({
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex justify-between absolute top-1/2 left-0 right-0 -mt-6 px-2 md:px-4">
      <button
        className="testimonial-nav-btn w-12 h-12 md:w-14 md:h-14 bg-bg-dark/80 hover:bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center text-primary transition-all duration-300 backdrop-blur-md transform hover:scale-110 shadow-lg"
        onClick={onPrev}
        aria-label="Depoimento anterior"
        type="button"
      >
        <FaChevronLeft className="text-lg md:text-xl" />
      </button>

      <button
        className="testimonial-nav-btn w-12 h-12 md:w-14 md:h-14 bg-bg-dark/80 hover:bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center text-primary transition-all duration-300 backdrop-blur-md transform hover:scale-110 shadow-lg"
        onClick={onNext}
        aria-label="Próximo depoimento"
        type="button"
      >
        <FaChevronRight className="text-lg md:text-xl" />
      </button>
    </div>
  );
};

export default TestimonialNavigation;
