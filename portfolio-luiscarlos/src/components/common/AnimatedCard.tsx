import React, { forwardRef, useState } from "react";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: "lift" | "scale" | "glow" | "none";
  delay?: number;
  onClick?: () => void;
}

/**
 * Componente de cartão animado reutilizável
 * Pode ser usado em várias seções como skills, portfolio, serviços, etc.
 */
const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  (
    { children, className = "", hoverEffect = "lift", delay = 0, onClick },
    ref
  ) => {
    const [, setIsHovered] = useState(false);

    // Classes para efeitos de hover
    const hoverClasses = {
      lift: "transition-all duration-300 hover:-translate-y-2 hover:shadow-lg",
      scale: "transition-all duration-300 hover:scale-105 hover:shadow-lg",
      glow: "transition-all duration-300 hover:shadow-[0_0_15px_rgba(155,89,182,0.5)]",
      none: "",
    };

    // Estilo para o delay de animação
    const delayStyle = delay ? { animationDelay: `${delay}ms` } : {};

    return (
      <div
        ref={ref}
        className={`
          bg-card-bg rounded-xl overflow-hidden border border-gray-800/30
          animate-item ${hoverClasses[hoverEffect]} ${className}
          ${onClick ? "cursor-pointer" : ""}
        `}
        style={delayStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);

AnimatedCard.displayName = "AnimatedCard";

export default AnimatedCard;
