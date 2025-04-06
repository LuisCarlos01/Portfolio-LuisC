import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
  fullPage?: boolean;
  fadeIn?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  color = "primary",
  fullPage = false,
  fadeIn = true,
}) => {
  // Determinar tamanho do spinner
  const sizeClasses = {
    small: "w-5 h-5",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  // Determinar cor do spinner
  const colorClasses = {
    primary: "text-primary",
    white: "text-white",
    gray: "text-gray-400",
  };

  // Estilo para container do spinner
  const containerClasses = fullPage
    ? "fixed inset-0 flex items-center justify-center bg-bg-dark/60 z-50"
    : "flex items-center justify-center py-6";

  // Classe para o fade-in suave
  const fadeInClass = fadeIn ? "animate-fade-in-subtle" : "";

  return (
    <div className={`${containerClasses} ${fadeInClass}`}>
      <div className="relative">
        <div
          className={`${sizeClasses[size]} ${
            colorClasses[color as keyof typeof colorClasses] || "text-primary"
          } opacity-60`}
        >
          <svg
            className="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-20"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            ></circle>
            <path
              className="opacity-60"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        {fullPage && (
          <p className="mt-3 text-center text-text-light text-sm opacity-70">
            Carregando...
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
