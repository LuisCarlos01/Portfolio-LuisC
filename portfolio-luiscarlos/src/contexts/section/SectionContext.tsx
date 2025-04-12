import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { SectionContextType } from "./types";
import useSectionTransition from "./useSectionTransition";
import useSectionScroll from "./useSectionScroll";

// Criando o contexto
const SectionContext = createContext<SectionContextType | undefined>(undefined);

/**
 * Hook personalizado para usar o contexto
 */
export const useSection = (): SectionContextType => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSection deve ser usado dentro de um SectionProvider");
  }
  return context;
};

/**
 * Provedor do contexto de seção
 */
export const SectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Estado para controlar qual seção está ativa
  const [activeSection, setActiveSection] = useState("home");
  // Estado para controlar animações de transição
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousSection, setPreviousSection] = useState<string | null>(null);
  // Tempo da última transição para evitar efeitos indesejados
  const [lastTransitionTime, setLastTransitionTime] = useState(0);

  // Usar hook de transição
  const { transitionToSection } = useSectionTransition();

  // Função para navegar entre seções
  const navigateToSection = useCallback(
    (sectionId: string) => {
      console.log(`SectionContext: Navegando para seção ${sectionId}`);

      // Se estiver em transição, não permitir nova navegação
      if (isTransitioning) {
        console.log("Navegação ignorada: Já em transição");
        return;
      }

      // Prevenir cliques múltiplos muito rápidos (300ms)
      const now = Date.now();
      if (now - lastTransitionTime < 300) {
        console.log("Navegação ignorada: Clique muito rápido");
        return;
      }

      // Se for a mesma seção, permitir a navegação mesmo assim
      // (o módulo de transição decidirá como lidar)
      setLastTransitionTime(now);

      // Usar a função de transição do hook
      transitionToSection(
        sectionId,
        activeSection,
        // onStart
        () => {
          setIsTransitioning(true);
          setPreviousSection(activeSection);
        },
        // onUpdate
        (newSectionId) => {
          setActiveSection(newSectionId);
        },
        // onComplete
        () => {
          setIsTransitioning(false);
        }
      );
    },
    [activeSection, isTransitioning, transitionToSection, lastTransitionTime]
  );

  // Para retrocompatibilidade com código que usa showSection
  const showSection = useCallback(
    (sectionId: string) => {
      console.log(
        `SectionContext: showSection chamado para ${sectionId}, redirecionando para navigateToSection`
      );
      navigateToSection(sectionId);
    },
    [navigateToSection]
  );

  // Usar hook de detecção de seção via rolagem
  const { checkInitialHash } = useSectionScroll(
    activeSection,
    isTransitioning,
    (sectionId) => {
      setActiveSection(sectionId);
    }
  );

  // Verificar a hash na URL ao carregar
  useEffect(() => {
    const hash = checkInitialHash();
    if (hash) {
      navigateToSection(hash);
    }
  }, [checkInitialHash, navigateToSection]);

  return (
    <SectionContext.Provider
      value={{
        activeSection,
        navigateToSection,
        showSection,
        isTransitioning,
        previousSection,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};

export default SectionContext;
