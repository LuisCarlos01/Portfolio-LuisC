import { forwardRef } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

/**
 * Componente para títulos de seção com estilo consistente
 */
const SectionTitle = forwardRef<HTMLDivElement, SectionTitleProps>(
  (
    {
      title,
      subtitle,
      align = "center",
      className = "",
      titleClassName = "",
      subtitleClassName = "",
    },
    ref
  ) => {
    const alignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    return (
      <div ref={ref} className={`mb-12 ${alignClasses[align]} ${className}`}>
        <h2
          className={`text-4xl font-bold mb-4 text-white relative inline-block pb-3 
            after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
            after:w-20 after:h-1 after:bg-primary after:rounded-full ${titleClassName}`}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className={`text-lg mb-2 text-text-light max-w-3xl mx-auto ${subtitleClassName}`}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionTitle.displayName = "SectionTitle";

export default SectionTitle;
