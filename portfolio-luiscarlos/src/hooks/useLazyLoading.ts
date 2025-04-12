import { useEffect, useMemo } from "react";
import { useSection } from "../contexts/section";

interface SectionConfig {
  id: string;
  path: string;
}

/**
 * Hook para gerenciar lazy loading e precarregamento de seções
 * @param preloadDistance Número de seções de distância para precarregar
 */
const useLazyLoading = (preloadDistance: number = 1) => {
  const { activeSection } = useSection();

  // Definição de todas as seções em ordem
  const sectionConfigs = useMemo<SectionConfig[]>(
    () => [
      { id: "home", path: "components/sections/hero" },
      { id: "about", path: "components/sections/about" },
      { id: "skills", path: "components/sections/skills" },
      { id: "portfolio", path: "components/sections/portfolio" },
      { id: "resume", path: "components/sections/resume" },
      { id: "testimonials", path: "components/sections/testimonials" },
      { id: "contact", path: "components/sections/contact" },
    ],
    []
  );

  // Precarregar seções próximas à seção ativa
  useEffect(() => {
    if (!activeSection) return;

    // Encontrar o índice da seção ativa
    const activeIndex = sectionConfigs.findIndex(
      (config) => config.id === activeSection
    );
    if (activeIndex === -1) return;

    // Pré-carregar seções próximas
    const sectionsToPreload = sectionConfigs.filter(
      (_, index) =>
        Math.abs(index - activeIndex) <= preloadDistance &&
        index !== activeIndex
    );

    // Iniciar o preload dessas seções
    Promise.all(
      sectionsToPreload.map((config) =>
        import(/* @vite-ignore */ `../${config.path}`).catch((err) =>
          console.error(`Erro ao precarregar ${config.id}:`, err)
        )
      )
    );
  }, [activeSection, sectionConfigs, preloadDistance]);

  // Verifica se uma seção está próxima da ativa (para preload)
  const isNearActive = (sectionId: string): boolean => {
    if (!activeSection) return false;

    const activeIndex = sectionConfigs.findIndex(
      (config) => config.id === activeSection
    );
    const sectionIndex = sectionConfigs.findIndex(
      (config) => config.id === sectionId
    );

    if (activeIndex === -1 || sectionIndex === -1) return false;

    return Math.abs(sectionIndex - activeIndex) <= preloadDistance;
  };

  return {
    getSectionConfig: (sectionId: string) =>
      sectionConfigs.find((config) => config.id === sectionId),
    isNearActive,
  };
};

export default useLazyLoading;
