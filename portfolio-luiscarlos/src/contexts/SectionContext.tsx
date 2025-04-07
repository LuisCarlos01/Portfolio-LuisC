import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { gsap } from "gsap";

// Tipo para o contexto
interface SectionContextType {
  activeSection: string;
  showSection: (sectionId: string) => void;
  isTransitioning: boolean;
  previousSection: string | null;
}

// Criando o contexto
const SectionContext = createContext<SectionContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
export const useSection = (): SectionContextType => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSection deve ser usado dentro de um SectionProvider");
  }
  return context;
};

// Função auxiliar para obter o ID correto da seção
const getSectionElementId = (sectionId: string): string => {
  // Mapeia os nomes das seções para os IDs reais
  const sectionMapping: Record<string, string> = {
    home: "home",
    about: "about-section",
    skills: "skills-section",
    portfolio: "portfolio",
    resume: "resume",
    contact: "contact-section",
    testimonials: "testimonials",
  };

  return sectionMapping[sectionId] || sectionId;
};

// Provedor do contexto
export const SectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Estado para controlar qual seção está ativa
  const [activeSection, setActiveSection] = useState("home");
  // Estado para controlar animações de transição
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousSection, setPreviousSection] = useState<string | null>(null);

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

  // Função para mostrar uma seção específica
  const showSection = (sectionId: string) => {
    console.log(`SectionContext: Mostrando seção ${sectionId}`);

    // Se já estiver em transição, retornar
    if (isTransitioning) {
      console.log(
        "Já existe uma transição em andamento, ignorando solicitação"
      );
      return;
    }

    // Se tentar navegar para a mesma seção, retornar
    if (sectionId === activeSection) {
      console.log("Já estamos na seção solicitada, ignorando");
      return;
    }

    // Iniciar transição
    setIsTransitioning(true);
    setPreviousSection(activeSection);

    // Obter o ID do elemento real para o ID da seção solicitada
    const targetSectionId = getSectionElementId(sectionId);
    console.log(`SectionContext: ID mapeado para ${targetSectionId}`);

    // Exibir overlay de transição
    const overlay = overlayRef.current;
    if (overlay) {
      overlay.style.display = "block";

      // Adicionar classe específica de transição baseada na seção
      overlay.className = `page-transition-overlay to-${sectionId}`;

      // Aplicar classe transitioning aos containers de seção
      document.querySelectorAll(".section-container").forEach((section) => {
        section.classList.add("section-transition-container");
        section.classList.add("transitioning");
      });

      // Animação do overlay com timeline
      gsap.timeline().to(overlay, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          // Atualizar estado da seção ativa
          setActiveSection(sectionId);

          // Ajustar a visibilidade das seções, mas mantendo todas acessíveis
          document.querySelectorAll(".section-container").forEach((section) => {
            if (section.id !== targetSectionId) {
              console.log(
                `SectionContext: Ajustando visibilidade de ${section.id}`
              );
              // Agora apenas reduzimos a opacidade e z-index, mas mantemos a seção acessível
              gsap.set(section, {
                opacity: 0.1, // Opacidade baixa em vez de 0
                zIndex: "0",
                // Não definimos mais display: "none" ou visibility: "hidden"
              });
              // Remover classe de transição
              section.classList.remove("transitioning");
            }
          });

          console.log(
            `SectionContext: Procurando seção com ID ${targetSectionId}`
          );

          // Mostrar a seção alvo
          let targetSection = document.getElementById(targetSectionId);

          // Verificar se a seção existe, caso contrário, tentar encontrá-la novamente
          if (!targetSection) {
            console.warn(
              `Seção ${targetSectionId} não encontrada. Tentando novamente...`
            );

            // Tentar encontrar a seção após um breve delay para permitir que o lazy loading conclua
            let retryCount = 0;
            const maxRetries = 5;

            const findSection = () => {
              targetSection = document.getElementById(targetSectionId);
              if (targetSection) {
                console.log(
                  `Seção ${targetSectionId} encontrada após retry ${
                    retryCount + 1
                  }`
                );
                // Continuar com a animação
                showTargetSection(targetSection);
              } else {
                retryCount++;
                if (retryCount < maxRetries) {
                  console.log(
                    `Tentativa ${
                      retryCount + 1
                    } para encontrar seção ${targetSectionId}`
                  );
                  setTimeout(findSection, 300);
                } else {
                  console.error(
                    `Não foi possível encontrar a seção ${targetSectionId} após ${maxRetries} tentativas`
                  );
                  setIsTransitioning(false);

                  // Fallback: Tente mostrar a seção home se a seção alvo não for encontrada
                  const homeSection = document.getElementById("home");
                  if (homeSection && targetSectionId !== "home") {
                    console.log("Usando seção home como fallback");
                    showTargetSection(homeSection);
                    setActiveSection("home");
                  } else {
                    if (overlay) {
                      overlay.style.display = "none";
                    }
                  }
                }
              }
            };

            // Iniciar tentativas de retry
            setTimeout(findSection, 100);
          } else {
            // Se a seção for encontrada imediatamente, continuar com a animação
            showTargetSection(targetSection);
          }

          // Função para mostrar a seção alvo quando ela for encontrada
          function showTargetSection(section: HTMLElement) {
            console.log(
              `SectionContext: Encontrada seção alvo ${targetSectionId}`
            );

            // Garantir que a seção esteja visível antes de animar
            section.style.display = "block";
            section.style.zIndex = "1";
            section.style.visibility = "visible";

            // Preparar para animação de entrada
            gsap.set(section, {
              opacity: 0,
              // Adicionar força de hardware acceleration para melhorar performance
              transform: "translateZ(0)",
            });

            // Rolar para a seção
            const headerHeight =
              document.querySelector("header")?.offsetHeight || 0;
            const sectionTop = section.offsetTop - headerHeight;

            window.scrollTo({
              top: sectionTop,
              behavior: "smooth",
            });

            // Remover o overlay após um breve atraso
            gsap.to(overlay, {
              opacity: 0,
              duration: 0.4,
              delay: 0.2,
              ease: "power2.inOut",
              onComplete: () => {
                overlay.style.display = "none";
                overlay.className = "page-transition-overlay";

                // Animar a entrada da seção
                animateSectionEntrance(sectionId, section);

                // Finalizar a transição após um curto delay para dar tempo às animações
                setTimeout(() => {
                  section.classList.remove("transitioning");
                  setIsTransitioning(false);
                }, 500);
              },
            });
          }
        },
      });
    } else {
      // Fallback se o overlay não estiver disponível
      setActiveSection(sectionId);

      // Ajustar visibilidade das seções sem ocultar completamente
      document.querySelectorAll(".section-container").forEach((section) => {
        if (section.id !== targetSectionId) {
          console.log(
            `SectionContext: Ajustando seção ${section.id} (fallback)`
          );
          gsap.to(section, {
            opacity: 0.1, // Opacidade baixa em vez de 0
            y: 20,
            duration: 0.3,
            // Não mais ocultamos completamente as seções
          });
        }
      });

      console.log(`SectionContext: Procurando seção com ID ${targetSectionId}`);

      // Mostrar a seção alvo (fallback)
      let targetSection = document.getElementById(targetSectionId);

      if (!targetSection) {
        console.warn(
          `[Fallback] Seção ${targetSectionId} não encontrada. Tentando novamente...`
        );

        // Tentar encontrar a seção com retry
        let retryCount = 0;
        const maxRetries = 5;

        const findSection = () => {
          targetSection = document.getElementById(targetSectionId);
          if (targetSection) {
            console.log(
              `[Fallback] Seção ${targetSectionId} encontrada após retry ${
                retryCount + 1
              }`
            );
            showTargetSectionFallback(targetSection);
          } else {
            retryCount++;
            if (retryCount < maxRetries) {
              console.log(
                `[Fallback] Tentativa ${
                  retryCount + 1
                } para encontrar seção ${targetSectionId}`
              );
              setTimeout(findSection, 300);
            } else {
              console.error(
                `[Fallback] Não foi possível encontrar a seção ${targetSectionId} após ${maxRetries} tentativas`
              );
              setIsTransitioning(false);

              // Fallback para home se a seção alvo não for encontrada
              const homeSection = document.getElementById("home");
              if (homeSection && targetSectionId !== "home") {
                console.log("[Fallback] Usando seção home como alternativa");
                showTargetSectionFallback(homeSection);
                setActiveSection("home");
              }
            }
          }
        };

        // Iniciar tentativas
        setTimeout(findSection, 100);
      } else {
        showTargetSectionFallback(targetSection);
      }

      // Função para mostrar a seção no modo fallback
      function showTargetSectionFallback(section: HTMLElement) {
        console.log(`[Fallback] Seção alvo ${targetSectionId} encontrada`);
        section.style.display = "block";
        section.style.zIndex = "1";
        section.style.visibility = "visible";
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 0.5,
        });

        // Rolar para a seção
        const headerHeight =
          document.querySelector("header")?.offsetHeight || 0;
        const sectionTop = section.offsetTop - headerHeight;

        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
        });

        // Fallback para animação simples
        animateSectionEntrance(sectionId, section);

        // Finalizar a transição
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }
    }
  };

  // Função para animar a entrada de uma seção com efeitos personalizados por seção
  const animateSectionEntrance = (
    sectionId: string,
    targetSection: HTMLElement
  ) => {
    // Definir animação base de acordo com a transição
    let entranceAnimation;

    // Personalizar animação com base na seção anterior e atual
    const transitionType = getTransitionType(previousSection, sectionId);

    // Adicionar classe para revelar conteúdo com efeito de clipping
    const headingEl = targetSection.querySelector("h2");
    if (headingEl) {
      headingEl.classList.add("reveal-clip");
    }

    // Procurar elementos que podem receber efeito de brilho
    const glowElements = targetSection.querySelectorAll(".btn, .skill-card");
    if (glowElements.length > 0) {
      glowElements.forEach((el) => el.classList.add("glow-pulse"));

      // Remover efeito após um tempo
      setTimeout(() => {
        glowElements.forEach((el) => el.classList.remove("glow-pulse"));
      }, 3000);
    }

    // Escolher a animação de acordo com o tipo de transição
    switch (transitionType) {
      case "standard":
        // Animação padrão
        entranceAnimation = gsap.fromTo(
          targetSection,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            onComplete: () =>
              handleSectionAnimationComplete(sectionId, targetSection),
          }
        );
        break;

      case "slide-left":
        // Deslizar da esquerda com efeito de perspectiva
        entranceAnimation = gsap.fromTo(
          targetSection,
          {
            opacity: 0,
            x: -50,
            transformOrigin: "left center",
            rotationY: 5,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () =>
              handleSectionAnimationComplete(sectionId, targetSection),
          }
        );
        break;

      case "slide-right":
        // Deslizar da direita com efeito de perspectiva
        entranceAnimation = gsap.fromTo(
          targetSection,
          {
            opacity: 0,
            x: 50,
            transformOrigin: "right center",
            rotationY: -5,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () =>
              handleSectionAnimationComplete(sectionId, targetSection),
          }
        );
        break;

      case "fade-scale":
        // Fade com escala e leve rotação
        entranceAnimation = gsap.fromTo(
          targetSection,
          {
            opacity: 0,
            scale: 0.95,
            rotation: 0.5,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () =>
              handleSectionAnimationComplete(sectionId, targetSection),
          }
        );
        break;

      case "slide-up":
        // Deslizar de baixo com efeito de borrão
        entranceAnimation = gsap.fromTo(
          targetSection,
          {
            opacity: 0,
            y: 30,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            onComplete: () =>
              handleSectionAnimationComplete(sectionId, targetSection),
          }
        );
        break;

      default:
        // Animação padrão
        entranceAnimation = gsap.fromTo(
          targetSection,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            onComplete: () =>
              handleSectionAnimationComplete(sectionId, targetSection),
          }
        );
    }

    return entranceAnimation;
  };

  // Determina o tipo de transição com base nas seções anterior e atual
  const getTransitionType = (
    prevSection: string | null,
    currentSection: string
  ): string => {
    // Determinar a ordem das seções para saber a direção da transição
    const sectionOrder = [
      "home",
      "about-section",
      "skills-section",
      "portfolio",
      "resume",
      "contact-section",
      "testimonials",
    ];

    if (!prevSection || !currentSection) return "standard";

    // Se estiver indo para a home, usar fade-scale
    if (currentSection === "home") return "fade-scale";

    // Se estiver indo do portfolio para qualquer lugar, usar slide-left
    if (prevSection === "portfolio") return "slide-left";

    // Verificar a posição das seções na ordem
    const prevIndex = sectionOrder.indexOf(prevSection);
    const currentIndex = sectionOrder.indexOf(currentSection);

    if (prevIndex < currentIndex) {
      // Navegando para frente na ordem
      return "slide-left";
    } else if (prevIndex > currentIndex) {
      // Navegando para trás na ordem
      return "slide-right";
    } else {
      // Caso especial para a seção de contato
      if (currentSection === "contact") return "slide-up";

      // Fallback
      return "standard";
    }
  };

  // Manipular o callback de conclusão da animação da seção
  const handleSectionAnimationComplete = (
    sectionId: string,
    targetSection: HTMLElement
  ) => {
    console.log(`SectionContext: Animação da seção ${sectionId} concluída`);

    // Verificar qual seção ativar animações específicas
    switch (getSectionElementId(sectionId)) {
      case "home":
        animateHomeSection();
        break;
      case "skills-section":
        console.log("SectionContext: Animando seção de skills");
        animateSkillsSection();
        break;
      case "portfolio":
        console.log("SectionContext: Animando seção de portfolio");
        animatePortfolioSection();
        break;
      case "contact-section":
        animateContactSection();
        break;
      case "resume":
        animateResumeSection();
        break;
      case "about-section":
        animateAboutSection();
        break;
      case "testimonials":
        animateTestimonialsSection();
        break;
      default:
        console.log(`Nenhuma animação específica para a seção ${sectionId}`);
        break;
    }
  };

  // Função para animar a seção Home
  const animateHomeSection = () => {
    console.log("Animando seção home");
    const section = document.getElementById("home");
    if (section) {
      // Forçar a visibilidade da seção
      section.style.display = "flex";
      section.style.opacity = "1";
      section.style.zIndex = "1";
      section.style.visibility = "visible";

      // Animar elementos da seção
      const titleEl = section.querySelector("h1");
      const subtitleEl = section.querySelector(".text-xl, .text-2xl");
      const contentEl = section.querySelector(".max-w-2xl");
      const socialEl = section.querySelector(".flex.space-x-6");

      if (titleEl) {
        gsap.fromTo(
          titleEl,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }

      if (subtitleEl) {
        gsap.fromTo(
          subtitleEl,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power2.out" }
        );
      }

      if (contentEl) {
        gsap.fromTo(
          contentEl,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.4, ease: "power2.out" }
        );
      }

      if (socialEl) {
        const links = socialEl.querySelectorAll("a");
        gsap.fromTo(
          links,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            delay: 0.6,
            ease: "power2.out",
          }
        );
      }
    }
  };

  // Função para animar a seção de Testimonials
  const animateTestimonialsSection = () => {
    console.log("Animando seção testimonials");
    const section = document.getElementById("testimonials");
    if (section) {
      // Forçar visibilidade da seção
      section.style.display = "block";
      section.style.opacity = "1";
      section.style.zIndex = "1";
      section.style.visibility = "visible";

      // Animar título e descrição
      const titleEl = section.querySelector("h2");
      const descEl = section.querySelector("p.text-lg");
      const testimonialCard = section.querySelector(".bg-bg-dark");

      if (titleEl) {
        gsap.fromTo(
          titleEl,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
        );
      }

      if (descEl) {
        gsap.fromTo(
          descEl,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power2.out" }
        );
      }

      if (testimonialCard) {
        gsap.fromTo(
          testimonialCard,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.4,
            ease: "back.out(1.4)",
          }
        );
      }
    }
  };

  // Função para animar a seção "Sobre mim"
  const animateAboutSection = () => {
    console.log("Animando seção about");
    const section = document.getElementById("about-section");
    if (section) {
      // Forçar a visibilidade da seção
      section.style.display = "block";
      section.style.opacity = "1";
      section.style.zIndex = "1";
      section.style.visibility = "visible";

      // Animar título
      const title = section.querySelector("h2");
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
        );
      }

      // Animar os contadores de estatísticas
      const statValues = section.querySelectorAll(".stat-value");
      if (statValues.length > 0) {
        console.log(
          `Encontrados ${statValues.length} valores estatísticos para animar`
        );

        statValues.forEach((el) => {
          const target = parseInt(el.getAttribute("data-value") || "0");

          // Garantir que o valor seja visível
          el.textContent = target.toString();

          // Animar o contador
          gsap.fromTo(
            el,
            { textContent: 0 },
            {
              textContent: target,
              duration: 2,
              ease: "power2.inOut",
              onUpdate: function () {
                // Arredondar para inteiro durante a animação
                el.textContent = Math.round(
                  parseFloat(el.textContent || "0")
                ).toString();
              },
            }
          );
        });
      }
    }
  };

  // Função para animar a seção de skills
  const animateSkillsSection = () => {
    console.log("Tentando animar a seção de skills");
    const section = document.getElementById("skills-section");
    if (section) {
      console.log("Seção de skills encontrada, iniciando animação");

      // Forçar visibilidade da seção
      section.style.display = "block";
      section.style.opacity = "1";
      section.style.zIndex = "1";
      section.style.visibility = "visible";

      // Animar título
      const title = section.querySelector("h2");
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
        );
      }

      // Animar cards de habilidades com efeito stagger
      const skillCards = section.querySelectorAll(".skill-card");
      if (skillCards.length > 0) {
        console.log(`Encontrados ${skillCards.length} skill cards para animar`);
        gsap.fromTo(
          skillCards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.2)",
            onComplete: () => {
              console.log(
                "Animação dos cards concluída, animando barras de progresso"
              );
              // Animar as barras de progresso após os cards aparecerem
              animateProgressBars(section);
            },
          }
        );
      } else {
        console.warn("Não foram encontrados skill cards para animar");
      }
    } else {
      console.error("Seção de skills não encontrada no DOM!");
    }
  };

  // Função auxiliar para animar as barras de progresso
  const animateProgressBars = (section: HTMLElement) => {
    const progressBars = section.querySelectorAll(".progress-inner");
    const skillCards = section.querySelectorAll(".skill-card");

    console.log(`Animando ${progressBars.length} barras de progresso`);

    if (progressBars.length > 0) {
      progressBars.forEach((bar, index) => {
        if (index < skillCards.length) {
          const skillLevel =
            skillCards[index].getAttribute("data-level") || "0";
          console.log(`Animando barra ${index} para ${skillLevel}%`);

          gsap.to(bar, {
            width: `${skillLevel}%`,
            duration: 1,
            ease: "power1.out",
            delay: 0.1 * index,
          });
        }
      });
    } else {
      console.warn("Não foram encontradas barras de progresso para animar");
    }
  };

  // Função para animar a seção de portfolio
  const animatePortfolioSection = () => {
    console.log("Animando seção de portfólio");
    const section = document.getElementById("portfolio");

    if (section) {
      // Forçar display block e opacity 1 no contêiner da seção
      section.style.display = "block";
      section.style.opacity = "1";
      section.style.zIndex = "1";
      section.style.visibility = "visible";

      // Verificar se o componente PortfolioSection está presente
      const portfolioSection = section.querySelector(".portfolio-section");
      if (portfolioSection) {
        // Animar o título e descrição
        const titleElements = portfolioSection.querySelectorAll(
          "h2, .section-description"
        );
        if (titleElements.length > 0) {
          gsap.fromTo(
            titleElements,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.2,
            }
          );
        }

        // Animar filtros de categoria
        const categoryFilters =
          portfolioSection.querySelector(".category-filters");
        if (categoryFilters) {
          gsap.fromTo(
            categoryFilters,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.3 }
          );
        }

        // Animar os cards
        const projectCards = portfolioSection.querySelectorAll(".project-card");
        if (projectCards.length > 0) {
          gsap.fromTo(
            projectCards,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.15,
              ease: "power2.out",
              delay: 0.4,
            }
          );
        }
      }
    }
  };

  // Função para animar a seção de contato
  const animateContactSection = () => {
    const section = document.getElementById("contact-section");
    if (section) {
      // Forçar visibilidade da seção
      section.style.display = "block";
      section.style.opacity = "1";
      section.style.zIndex = "1";
      section.style.visibility = "visible";

      gsap.fromTo(
        section.querySelectorAll(".animate-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.7,
          ease: "power2.out",
        }
      );
    }
  };

  // Função para animar a seção de currículo
  const animateResumeSection = () => {
    console.log("Tentando animar a seção de currículo");

    const section = document.getElementById("resume");

    if (section) {
      console.log("Seção de currículo encontrada com ID:", section.id);

      // Forçar a visibilidade da seção
      section.style.display = "block";
      section.style.opacity = "1";
      section.style.zIndex = "1";
      section.style.visibility = "visible";
      section.style.position = "relative";

      // Garantir que todos os elementos da seção estejam visíveis
      const allElements = section.querySelectorAll(
        "h2, p, button, .tab-button, .resume-item, img, .btn-primary"
      );
      allElements.forEach((element) => {
        const el = element as HTMLElement;
        el.style.display =
          ["BUTTON", "A"].includes(element.tagName) ||
          element.classList.contains("tab-button")
            ? "flex"
            : "block";
        el.style.visibility = "visible";
        el.style.opacity = "1";
      });

      // Garantir especificamente que os elementos problemáticos estejam visíveis
      const problematicElements = section.querySelectorAll(
        "h2.text-4xl, .text-text-light, a.btn-primary, img.w-full, p.mb-4, p.mb-8"
      );
      problematicElements.forEach((element) => {
        const el = element as HTMLElement;
        el.style.display = element.tagName === "A" ? "flex" : "block";
        el.style.visibility = "visible";
        el.style.opacity = "1";
      });

      // Animar cabeçalho
      const headerElements = section.querySelectorAll(
        "h2, .section-description"
      );
      if (headerElements.length > 0) {
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.2,
            onComplete: () => {
              // Garantir visibilidade após a animação
              headerElements.forEach((el) => {
                (el as HTMLElement).style.visibility = "visible";
                (el as HTMLElement).style.opacity = "1";
              });
            },
          }
        );
      }

      // Animar tabs
      const tabButtons = section.querySelectorAll(".tab-button");
      if (tabButtons.length > 0) {
        gsap.fromTo(
          tabButtons,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: "back.out(1.7)",
            delay: 0.3,
            onComplete: () => {
              // Garantir visibilidade após a animação
              tabButtons.forEach((el) => {
                (el as HTMLElement).style.visibility = "visible";
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.display = "flex";
              });
            },
          }
        );
      }

      // Animar itens de currículo
      const resumeItems = section.querySelectorAll(".resume-item");
      if (resumeItems.length > 0) {
        gsap.fromTo(
          resumeItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.5,
            ease: "power1.out",
            delay: 0.4,
            onComplete: () => {
              // Garantir visibilidade após a animação
              resumeItems.forEach((el) => {
                (el as HTMLElement).style.visibility = "visible";
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.display = "block";
              });
            },
          }
        );
      }

      // Garantir visibilidade após um curto atraso para dar tempo às animações
      setTimeout(() => {
        // Verificar todos os elementos novamente
        const allElementsAgain = section.querySelectorAll(
          "h2, p, button, .tab-button, .resume-item, img, .btn-primary"
        );
        allElementsAgain.forEach((element) => {
          const el = element as HTMLElement;
          el.style.display =
            ["BUTTON", "A"].includes(element.tagName) ||
            element.classList.contains("tab-button")
              ? "flex"
              : "block";
          el.style.visibility = "visible";
          el.style.opacity = "1";
        });
      }, 1000);
    }
  };

  // Inicializar: mostrar home por padrão ou seção do hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      // Lista de seções válidas
      const validSections = [
        "home",
        "about-section",
        "skills-section",
        "portfolio",
        "resume",
        "contact-section",
        "testimonials",
      ];

      if (hash && validSections.includes(hash)) {
        showSection(hash);
      } else {
        showSection("home");
      }
    };

    // Configurar seções com a classe necessária para transições
    document.querySelectorAll(".section-container").forEach((section) => {
      section.classList.add("section-transition-container");
    });

    // Ouvir mudanças de URL
    window.addEventListener("hashchange", handleHashChange);

    // Verificar hash inicial após um pequeno atraso para garantir que os componentes estejam montados
    setTimeout(handleHashChange, 500);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Efeito para aplicar estilos iniciais às seções
  useEffect(() => {
    // Verificar se há algum hash na URL
    const hash = window.location.hash.replace("#", "");

    // Lista de seções válidas
    const validSections = [
      "home",
      "about-section",
      "skills-section",
      "portfolio",
      "contact-section",
      "resume",
      "testimonials",
    ];
    const initialSection = validSections.includes(hash) ? hash : "home";

    // Função para configurar a visibilidade inicial das seções
    const setupInitialSections = () => {
      document.querySelectorAll(".section-container").forEach((section) => {
        if (section.id === initialSection) {
          // Mostrar a seção inicial com alta prioridade visual
          (section as HTMLElement).style.display = "block";
          (section as HTMLElement).style.opacity = "1";
          (section as HTMLElement).style.zIndex = "1";
          (section as HTMLElement).style.visibility = "visible";

          // Se for a home, garantir que seja exibida como flex
          if (section.id === "home") {
            (section as HTMLElement).style.display = "flex";
          }

          // Ativar animações específicas para a seção inicial
          if (section.id === "home") {
            animateHomeSection();
          }
        } else {
          // Reduzir a visibilidade de outras seções sem ocultá-las completamente
          (section as HTMLElement).style.opacity = "0.1";
          (section as HTMLElement).style.zIndex = "0";
          // Não mais definimos display: "none" ou visibility: "hidden"
        }
      });
    };

    // Atraso pequeno para garantir que os componentes estejam montados
    setTimeout(setupInitialSections, 300);

    // Se nenhuma seção estiver visível após 1 segundo, forçar a exibição da home
    setTimeout(() => {
      const homeSection = document.getElementById("home");
      if (homeSection && getComputedStyle(homeSection).display === "none") {
        homeSection.style.display = "flex";
        homeSection.style.opacity = "1";
        homeSection.style.zIndex = "1";
        homeSection.style.visibility = "visible";
        animateHomeSection();
      }

      // Garantir que todas as seções sejam pelo menos parcialmente visíveis
      document.querySelectorAll(".section-container").forEach((section) => {
        const sectionElement = section as HTMLElement;
        if (getComputedStyle(sectionElement).display === "none") {
          sectionElement.style.display = "block";
          sectionElement.style.opacity = "0.1";
          sectionElement.style.zIndex = "0";
          sectionElement.style.visibility = "visible";
        }
      });
    }, 1000);
  }, []);

  // Valores para o contexto
  const contextValue: SectionContextType = {
    activeSection,
    showSection,
    isTransitioning,
    previousSection,
  };

  return (
    <SectionContext.Provider value={contextValue}>
      {children}
    </SectionContext.Provider>
  );
};
