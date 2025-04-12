import React, { memo } from "react";
import { ActiveCategory } from "../../../types/skillsTypes";
import { useTranslation } from "react-i18next";

interface CategoryFilterProps {
  activeCategory: ActiveCategory;
  onChange: (category: ActiveCategory) => void;
}

/**
 * Componente para filtrar habilidades por categoria
 */
const CategoryFilter = memo(
  ({ activeCategory, onChange }: CategoryFilterProps) => {
    const categories: { id: ActiveCategory; label: string }[] = [
      { id: "all", label: "Todas" },
      { id: "frontend", label: "Frontend" },
      { id: "backend", label: "Backend" },
      { id: "other", label: "Outras" },
    ];

    return (
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === category.id
                ? "bg-primary text-white"
                : "bg-card-bg text-text-light hover:bg-primary hover:bg-opacity-10"
            }`}
            onClick={() => onChange(category.id)}
            aria-pressed={activeCategory === category.id}
          >
            {category.label}
          </button>
        ))}
      </div>
    );
  }
);

// Para evitar warn no React DevTools
CategoryFilter.displayName = "CategoryFilter";

export default CategoryFilter;
