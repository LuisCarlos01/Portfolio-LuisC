import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

// Definindo o tipo para o contexto
interface SectionContextType {
  activeSection: string;
  setActiveSection: (id: string) => void;
  scrollToSection: (id: string) => void;
  animateResumeSection: () => void;
}

// Criando o contexto com um valor padrão
const SectionContext = createContext<SectionContextType>({
  activeSection: "home",
  setActiveSection: () => {},
  scrollToSection: () => {},
  animateResumeSection: () => {},
});

// Hook personalizado para usar o contexto
export const useSection = () => useContext(SectionContext);

// Provider do contexto
interface SectionProviderProps {
  children: ReactNode;
}

export const SectionProvider = ({ children }: SectionProviderProps) => {
  const [activeSection, setActiveSection] = useState("home");

  // Função para rolar para uma seção específica
  const scrollToSection = useCallback((id: string) => {
    // Remover qualquer bloqueio de rolagem que possa existir
    document.body.style.overflow = "auto";

    // Adicionar classe para permitir rolagem suave
    document.documentElement.classList.add("smooth-scroll");

    const section = document.getElementById(id);
    if (section) {
      // Rolar suavemente para a seção
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);

      // Atualizar a URL para refletir a seção atual (opcional)
      window.history.pushState(null, "", `#${id}`);

      // Remover a classe de rolagem suave após a animação
      setTimeout(() => {
        document.documentElement.classList.remove("smooth-scroll");
      }, 1000);
    }
  }, []);

  // Detector de seção visível
  useEffect(() => {
    const handleScroll = () => {
      // Obter todas as seções
      const sections = document.querySelectorAll("section[id]");

      // Encontrar a seção visível
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;

        // Ajustar o ponto de ativação para melhor detecção
        const activationPoint = 150;

        if (
          sectionTop <= activationPoint &&
          sectionTop + sectionHeight > activationPoint
        ) {
          current = section.getAttribute("id") || "";
        }
      });

      // Atualizar a seção ativa apenas se mudou
      if (current !== "" && current !== activeSection) {
        setActiveSection(current);
      }
    };

    // Ativar a detecção de rolagem
    window.addEventListener("scroll", handleScroll);

    // Checar a seção inicial
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection, setActiveSection]);

  // Função para animar a seção de currículo
  const animateResumeSection = useCallback(() => {
    // Implementar a animação da seção de currículo aqui (se necessário)
    // Esta é uma versão simplificada que o cliente poderia adaptar
    const resumeItems = document.querySelectorAll(".resume-item");

    if (resumeItems.length > 0) {
      resumeItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("animate-fadeIn");
        }, index * 100);
      });
    }
  }, []);

  return (
    <SectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        scrollToSection,
        animateResumeSection,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};

export default SectionContext;
