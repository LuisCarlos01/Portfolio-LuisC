import { useCallback, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { DEFAULT_ANIMATION_CONFIG, SECTION_ID_MAP } from "./types";

/**
 * Hook para gerenciar transições entre seções
 */
const useSectionTransition = () => {
  // Referência para o overlay de transição
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Criar overlay de transição quando o componente montar
  useEffect(() => {
    // Criar overlay para transições
    const overlay = document.createElement("div");
    overlay.className = "page-transition-overlay";
    document.body.appendChild(overlay);
    overlayRef.current = overlay;

    // Limpar ao desmontar
    return () => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    };
  }, []);

  // Obter o ID do elemento DOM para um ID de seção
  const getSectionElementId = useCallback((sectionId: string): string => {
    // Logging de diagnóstico
    console.log(`Buscando seção ID: "${sectionId}"`);

    // Verificar se o ID está no mapeamento
    if (sectionId in SECTION_ID_MAP) {
      const mappedId = SECTION_ID_MAP[sectionId];
      console.log(`Mapeando seção "${sectionId}" para ID DOM "${mappedId}"`);
      return mappedId;
    }

    // Se não estiver no mapeamento, usar o ID diretamente
    console.log(`Usando ID original "${sectionId}" (não está no mapeamento)`);
    return sectionId;
  }, []);

  // Garantir que uma seção esteja visível
  const ensureSectionVisibility = useCallback((section: HTMLElement) => {
    if (!section) return;

    section.style.display = "block";
    section.style.visibility = "visible";
    section.style.opacity = "1";
    section.style.zIndex = "1";

    // Logging de diagnóstico
    console.log(`Garantindo visibilidade da seção "${section.id}"`);
  }, []);

  // Mostrar a seção alvo com animação
  const showTargetSection = useCallback(
    (section: HTMLElement, sectionId: string, onComplete: () => void) => {
      const overlay = overlayRef.current;
      if (!section || !overlay) {
        console.error("Seção ou overlay não encontrados");
        onComplete(); // Finalizar a transição mesmo assim
        return;
      }

      console.log(`Iniciando animação para mostrar seção "${section.id}"`);

      // Garantir que a seção esteja visível antes de animar
      ensureSectionVisibility(section);

      // Preparar para animação de entrada
      gsap.set(section, {
        opacity: 0,
        transform: "translateZ(0)", // Hardware acceleration
      });

      // Rolar para a seção
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      console.log(`Altura do header: ${headerHeight}px`);
      const sectionTop = section.offsetTop - headerHeight;
      console.log(`Rolando para posição: ${sectionTop}px`);

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });

      // Remover o overlay com animação
      gsap.to(overlay, {
        opacity: 0,
        duration: DEFAULT_ANIMATION_CONFIG.duration,
        delay: 0.2,
        ease: DEFAULT_ANIMATION_CONFIG.ease,
        onComplete: () => {
          overlay.style.display = "none";
          overlay.className = "page-transition-overlay";

          // Animar a entrada da seção
          gsap.to(section, {
            opacity: 1,
            duration: DEFAULT_ANIMATION_CONFIG.duration,
            ease: DEFAULT_ANIMATION_CONFIG.ease,
            onComplete: () => {
              // Finalizar a transição
              section.classList.remove("transitioning");
              console.log(`Transição para "${section.id}" concluída`);
              onComplete();
            },
          });
        },
      });
    },
    [ensureSectionVisibility]
  );

  // Transição para nova seção
  const transitionToSection = useCallback(
    (
      sectionId: string,
      currentSection: string,
      onStart: () => void,
      onUpdate: (sectionId: string) => void,
      onComplete: () => void
    ) => {
      console.log(
        `Iniciando transição de "${currentSection}" para "${sectionId}"`
      );

      // Verificar se é a mesma seção
      if (sectionId === currentSection) {
        console.log(
          `Verificando se seção "${sectionId}" deve ser recarregada mesmo sendo a atual`
        );

        // Obter o ID do elemento DOM
        const targetSectionId = getSectionElementId(sectionId);
        const targetSection = document.getElementById(targetSectionId);

        // Se for a mesma seção, apenas rolar até ela sem animação completa
        if (targetSection) {
          const headerHeight =
            document.querySelector("header")?.offsetHeight || 0;
          const sectionTop = targetSection.offsetTop - headerHeight;

          console.log(
            `Rolando para a mesma seção "${targetSectionId}" em ${sectionTop}px`
          );
          window.scrollTo({
            top: sectionTop,
            behavior: "smooth",
          });
          return;
        }
      }

      // Iniciar transição
      onStart();

      // Obter o ID do elemento real para o ID da seção solicitada
      const targetSectionId = getSectionElementId(sectionId);

      // Exibir overlay de transição
      const overlay = overlayRef.current;
      if (overlay) {
        overlay.style.display = "block";
        overlay.className = `page-transition-overlay to-${sectionId}`;

        // Marcar todas as seções como em transição
        document.querySelectorAll(".section-container").forEach((section) => {
          section.classList.add("transitioning");
        });

        // Animar o overlay
        gsap.to(overlay, {
          opacity: 1,
          duration: DEFAULT_ANIMATION_CONFIG.duration,
          ease: DEFAULT_ANIMATION_CONFIG.ease,
          onComplete: () => {
            // Atualizar estado da seção ativa
            onUpdate(sectionId);

            // Reduzir a opacidade das outras seções
            document
              .querySelectorAll(".section-container")
              .forEach((section) => {
                if (section.id !== targetSectionId) {
                  gsap.set(section, {
                    opacity: 0.1,
                    zIndex: "0",
                  });

                  section.classList.remove("transitioning");
                }
              });

            // Procurar e mostrar a seção alvo
            const targetSection = document.getElementById(targetSectionId);

            if (targetSection) {
              // Se a seção for encontrada, mostrar
              console.log(
                `Seção "${targetSectionId}" encontrada imediatamente`
              );
              showTargetSection(targetSection, sectionId, onComplete);
            } else {
              // Se não, tentar encontrar depois com retries
              let retryCount = 0;
              const maxRetries = 5;

              const findSection = () => {
                const section = document.getElementById(targetSectionId);
                if (section) {
                  console.log(
                    `Seção ${targetSectionId} encontrada com sucesso na tentativa ${
                      retryCount + 1
                    }`
                  );
                  showTargetSection(section, sectionId, onComplete);
                } else if (retryCount < maxRetries) {
                  retryCount++;
                  console.log(
                    `Tentativa ${retryCount} de encontrar seção ${targetSectionId}. Elementos disponíveis: ${Array.from(
                      document.querySelectorAll("section")
                    )
                      .map((s) => `${s.id} (${s.className})`)
                      .join(", ")}`
                  );
                  setTimeout(findSection, 300);
                } else {
                  // Falha após várias tentativas
                  console.error(
                    `Seção ${targetSectionId} não encontrada após ${maxRetries} tentativas`
                  );
                  onComplete();

                  // Fallback para home se necessário
                  if (targetSectionId !== "home") {
                    const homeSection = document.getElementById("home");
                    if (homeSection) {
                      showTargetSection(homeSection, "home", () => {
                        onUpdate("home");
                      });
                    } else if (overlay) {
                      overlay.style.display = "none";
                    }
                  }
                }
              };

              setTimeout(findSection, 100);
            }
          },
        });
      }
    },
    [getSectionElementId, showTargetSection]
  );

  return {
    transitionToSection,
    getSectionElementId,
  };
};

export default useSectionTransition;
