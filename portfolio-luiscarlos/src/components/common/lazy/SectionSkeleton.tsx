import { memo } from "react";

interface SectionSkeletonProps {
  /**
   * Altura do esqueleto de seção em pixels ou classe CSS
   * @default h-screen
   */
  height?: string;
  /**
   * Se deve mostrar um esqueleto para a barra de título
   * @default true
   */
  showTitle?: boolean;
  /**
   * Se deve mostrar um efeito de pulso
   * @default true
   */
  pulse?: boolean;
}

/**
 * Componente de esqueleto para seções durante o carregamento
 */
const SectionSkeleton = memo(
  ({
    height = "h-screen",
    showTitle = true,
    pulse = true,
  }: SectionSkeletonProps) => {
    const pulseClass = pulse ? "animate-pulse" : "";

    return (
      <section
        className={`w-full ${height} flex flex-col items-center justify-center px-4 py-16`}
      >
        <div className={`w-full max-w-7xl mx-auto ${pulseClass}`}>
          {showTitle && (
            <div className="flex flex-col items-center mb-12">
              <div className="h-3 w-16 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 w-64 bg-gray-300 rounded-md"></div>
            </div>
          )}

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blocos simulando conteúdo */}
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-lg p-4 h-64 flex flex-col"
                >
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-5/6 mb-2"></div>
                  <div className="mt-auto h-8 w-full bg-gray-300 rounded"></div>
                </div>
              ))}
          </div>
        </div>
      </section>
    );
  }
);

export default SectionSkeleton;
