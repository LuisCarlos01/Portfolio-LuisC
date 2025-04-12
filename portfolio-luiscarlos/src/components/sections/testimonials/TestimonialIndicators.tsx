import React from "react";

interface TestimonialIndicatorsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

/**
 * Componente para exibir indicadores de navegação de depoimentos
 */
const TestimonialIndicators: React.FC<TestimonialIndicatorsProps> = ({
  total,
  current,
  onSelect,
}) => {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Ir para depoimento ${index + 1}`}
          aria-current={index === current ? "true" : "false"}
          className={`
            w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300
            ${
              index === current
                ? "bg-primary scale-100 shadow-md shadow-primary/30"
                : "bg-gray-700 hover:bg-primary/50 scale-90"
            }
          `}
        ></button>
      ))}
    </div>
  );
};

export default TestimonialIndicators;
