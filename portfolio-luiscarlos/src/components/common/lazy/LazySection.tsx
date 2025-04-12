import { lazy, Suspense, ReactNode, useEffect, useState, useMemo } from "react";
import { useSection } from "../../../contexts/section";
import LoadingSpinner from "../../LoadingSpinner";
import SectionSkeleton from "./SectionSkeleton";

interface LazySectionProps {
  /**
   * Caminho para o componente a ser carregado com lazy loading
   * @example 'sections/skills'
   */
  componentPath: string;
  /**
   * ID da seção para controle de preload e visibilidade
   * @example 'skills'
   */
  sectionId: string;
  /**
   * Distância em seções para precarregar
   * @default 1
   */
  preloadDistance?: number;
  /**
   * Componente de fallback personalizado, caso não queira usar o padrão
   */
  fallback?: ReactNode;
  /**
   * Altura do skeleton loader em pixels ou classe CSS
   * @default 'min-h-screen'
   */
  skeletonHeight?: string;
  /**
   * Tempo de atraso antes de mostrar o spinner ou esqueleto
   * @default 300
   */
  delay?: number;
  /**
   * Se deve usar esqueleto em vez de spinner
   * @default true
   */
  useSkeleton?: boolean;
}

/**
 * Componente para gerenciar lazy loading de seções com visibilidade inteligente
 */
const LazySection = ({
  componentPath,
  sectionId,
  preloadDistance = 1,
  fallback,
  skeletonHeight = "min-h-screen",
  delay = 300,
  useSkeleton = true,
}: LazySectionProps) => {
  const { activeSection } = useSection();
  const [showLoader, setShowLoader] = useState(false);
  const [isNearby, setIsNearby] = useState(false);

  // Lista de todas as seções em ordem
  const allSections = [
    "home",
    "about",
    "skills",
    "portfolio",
    "resume",
    "testimonials",
    "contact",
  ];

  // Carregar o componente com Lazy Loading
  const Component = useMemo(
    () =>
      lazy(() => {
        // Simular tempo de carregamento para desenvolvimento, se necessário
        if (
          process.env.NODE_ENV === "development" &&
          window.location.search.includes("delay-loading")
        ) {
          return new Promise((resolve) =>
            setTimeout(
              () =>
                resolve(
                  import(
                    /* @vite-ignore */ `../../../components/${componentPath}`
                  )
                ),
              1500
            )
          );
        }
        return import(
          /* @vite-ignore */ `../../../components/${componentPath}`
        );
      }),
    [componentPath]
  );

  // Verificar se a seção está próxima da seção ativa para preload
  useEffect(() => {
    const activeSectionIndex = allSections.indexOf(activeSection);
    const currentSectionIndex = allSections.indexOf(sectionId);

    if (activeSectionIndex === -1 || currentSectionIndex === -1) return;

    // Considerar próximas se estiver a uma distância definida (preloadDistance)
    const isNearbySection =
      Math.abs(activeSectionIndex - currentSectionIndex) <= preloadDistance;
    setIsNearby(isNearbySection);

    // Se for nearby, verificar se já está carregado
    if (isNearbySection) {
      // Iniciar precarregamento
      import(/* @vite-ignore */ `../../../components/${componentPath}`).catch(
        (err) => {
          console.error(`Erro ao precarregar seção ${sectionId}:`, err);
        }
      );
    }
  }, [activeSection, sectionId, componentPath, preloadDistance, allSections]);

  // Gerenciar o timer de atraso para mostrar o loader
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isNearby) {
      // Mostrar loader após o delay
      timer = setTimeout(() => {
        setShowLoader(true);
      }, delay);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isNearby, delay]);

  // Escolher o fallback apropriado
  const loadingFallback = useMemo(() => {
    if (!showLoader) return null;

    if (fallback) {
      return fallback;
    }

    if (useSkeleton) {
      return <SectionSkeleton height={skeletonHeight} />;
    }

    return <LoadingSpinner size="medium" fullPage />;
  }, [showLoader, fallback, useSkeleton, skeletonHeight]);

  // Se a seção não estiver próxima da seção ativa, mostrar um placeholder vazio
  if (!isNearby) {
    return <div id={`${sectionId}-section`} className="section-container" />;
  }

  return (
    <Suspense fallback={loadingFallback}>
      <Component />
    </Suspense>
  );
};

export default LazySection;
