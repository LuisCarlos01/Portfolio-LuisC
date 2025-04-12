import React from "react";
import { FaStar } from "react-icons/fa";

interface TestimonialStarsProps {
  rating: number;
}

/**
 * Componente para exibir estrelas de avaliação
 */
const TestimonialStars: React.FC<TestimonialStarsProps> = ({ rating = 5 }) => {
  return (
    <div className="flex items-center justify-center md:justify-start mb-3 gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <FaStar
          key={index}
          className={`${
            index < rating ? "text-yellow-400" : "text-gray-600"
          } text-sm md:text-base transition-colors duration-300`}
        />
      ))}
    </div>
  );
};

export default TestimonialStars;
