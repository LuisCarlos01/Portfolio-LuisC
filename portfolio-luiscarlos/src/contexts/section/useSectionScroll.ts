import { useEffect, useCallback } from "react";
import { SECTION_ID_MAP } from "./types";

/**
 * Hook para detectar a seção visível durante a rolagem
 *
 * @param activeSection - A seção ativa atual
 * @param isTransitioning - Indica se uma transição está em andamento
 * @param onSectionChange - Callback chamado quando a seção visível muda
 */
const useSectionScroll = (
  activeSection: string,
  isTransitioning: boolean,
  onSectionChange: (sectionId: string) => void
) => {
  // Função para detectar qual seção está visível
  const detectVisibleSection = useCallback(() => {
    // Ignorar detecção durante transições
    if (isTransitioning) {
      console.log("Ignorando detecção de seção durante transição");
      return;
    }

    const sections = document.querySelectorAll("section[id]");
    let currentSection = "";

    console.log(
      `Detectando seção visível entre ${sections.length} seções disponíveis`
    );

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute("id") || "";

      // Ajustar o ponto de ativação para melhor detecção
      const triggerPoint = 100; // Reduzido para melhor detecção

      if (
        sectionTop <= triggerPoint &&
        sectionTop + sectionHeight > triggerPoint
      ) {
        // Mapear o ID do DOM para o ID da seção usando o mapa reverso
        let mappedSectionId = sectionId;

        // Buscar o ID da seção correspondente ao ID do DOM
        for (const [key, value] of Object.entries(SECTION_ID_MAP)) {
          if (value === sectionId) {
            mappedSectionId = key;
            break;
          }
        }

        currentSection = mappedSectionId;
        console.log(
          `Seção ${sectionId} detectada como visível, mapeada para ${mappedSectionId}`
        );
      }
    });

    if (currentSection && currentSection !== activeSection) {
      console.log(
        `Mudando seção ativa de ${activeSection} para ${currentSection}`
      );
      // Atualizar seção ativa sem transição
      onSectionChange(currentSection);

      // Adicionar à history API para bookmarking
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${currentSection}`);
      }
    }
  }, [activeSection, isTransitioning, onSectionChange]);

  // Adicionar listener de rolagem com throttling para melhor performance
  useEffect(() => {
    // Throttle para evitar chamadas excessivas
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          detectVisibleSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [detectVisibleSection]);

  // Verificar a hash na URL ao carregar
  const checkInitialHash = useCallback(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      console.log(`Hash inicial detectada: ${hash}`);
      if (Object.keys(SECTION_ID_MAP).includes(hash)) {
        return hash;
      } else {
        console.log(`Hash ${hash} não está no mapeamento de seções`);
      }
    }
    return null;
  }, []);

  return {
    checkInitialHash,
  };
};

export default useSectionScroll;
