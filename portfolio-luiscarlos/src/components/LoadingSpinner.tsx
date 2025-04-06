import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
  fullPage?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  color = "primary",
  fullPage = false,
}) => {
  // Determinar tamanho do spinner
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  // Determinar cor do spinner
  const colorClasses = {
    primary: "text-primary",
    white: "text-white",
    gray: "text-gray-400",
  };

  // Estilo para container do spinner
  const containerClasses = fullPage
    ? "fixed inset-0 flex items-center justify-center bg-bg-dark/90 z-50"
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClasses}>
      <div className="relative">
        <div
          className={`${sizeClasses[size]} ${
            colorClasses[color as keyof typeof colorClasses] || "text-primary"
          }`}
        >
          <svg
            className="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        {fullPage && (
          <p className="mt-4 text-center text-text-light">Carregando...</p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
