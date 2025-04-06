import React, { ReactNode, useEffect } from "react";
import { SectionProvider } from "./SectionContext";
import { DarkModeProvider } from "./DarkModeContext";
import ErrorBoundary from "../components/ErrorBoundary";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  // Efeito global para garantir visibilidade das seções
  useEffect(() => {
    // Adicionar classe global para garantir visibilidade de todos os componentes
    document.documentElement.classList.add("force-section-visibility");

    // Função para garantir visibilidade das seções
    const ensureSectionsVisibility = () => {
      // Forçar visibilidade da seção Sobre
      const aboutSection = document.getElementById("about-section");
      if (aboutSection) {
        aboutSection.style.display = "block";
        aboutSection.style.visibility = "visible";
        aboutSection.style.opacity = "1";
        aboutSection.style.zIndex = "1";
        aboutSection.style.position = "relative";
      }

      // Forçar visibilidade dos cards de serviço
      document
        .querySelectorAll("#about-section .service-card")
        .forEach((element) => {
          const card = element as HTMLElement;
          card.style.display = "flex";
          card.style.flexDirection = "column";
          card.style.visibility = "visible";
          card.style.opacity = "1";
          card.style.position = "relative";
          card.style.zIndex = "1";
        });

      // Verificar seção de serviços
      const servicesSection = document.querySelector(
        "#about-section .services"
      );
      if (servicesSection) {
        (servicesSection as HTMLElement).style.display = "block";
        (servicesSection as HTMLElement).style.visibility = "visible";
        (servicesSection as HTMLElement).style.width = "100%";
      }

      // Verificar grid de serviços
      const servicesGrid = document.querySelector(
        "#about-section .services .grid, #about-section .services > div"
      );
      if (servicesGrid) {
        (servicesGrid as HTMLElement).style.display = "grid";
        (servicesGrid as HTMLElement).style.gridTemplateColumns =
          "repeat(auto-fit, minmax(250px, 1fr))";
        (servicesGrid as HTMLElement).style.width = "100%";
      }

      // ADICIONAR: Verificar visibilidade da seção Resume
      const resumeSection = document.getElementById("resume");
      if (resumeSection) {
        resumeSection.style.display = "block";
        resumeSection.style.visibility = "visible";
        resumeSection.style.opacity = "1";
        resumeSection.style.zIndex = "1";
        resumeSection.style.position = "relative";

        // Garantir visibilidade de todos os elementos dentro da seção Resume
        const resumeElements = resumeSection.querySelectorAll(
          "h2, p, button, .tab-button, .resume-item, img"
        );
        resumeElements.forEach((element) => {
          const el = element as HTMLElement;

          // Definir display apropriado baseado no tipo de elemento
          if (
            element.tagName === "BUTTON" ||
            element.classList.contains("tab-button")
          ) {
            el.style.display = "flex";
          } else {
            el.style.display = "block";
          }

          el.style.visibility = "visible";
          el.style.opacity = "1";
          el.style.position = "relative";
        });

        // Verificar a seção de tabs
        const tabsSection = resumeSection.querySelector(".tabs");
        if (tabsSection) {
          (tabsSection as HTMLElement).style.display = "flex";
          (tabsSection as HTMLElement).style.visibility = "visible";
          (tabsSection as HTMLElement).style.opacity = "1";
        }

        // Verificar elementos específicos que foram reportados como problemáticos
        const specificElements = resumeSection.querySelectorAll(
          "h2.text-4xl, .text-text-light, a.btn-primary, img.w-full"
        );
        specificElements.forEach((element) => {
          const el = element as HTMLElement;
          el.style.display = element.tagName === "A" ? "flex" : "block";
          el.style.visibility = "visible";
          el.style.opacity = "1";
        });
      }
    };

    // Executar após diferentes intervalos para garantir visibilidade mesmo após animações e transições
    setTimeout(ensureSectionsVisibility, 1000);
    setTimeout(ensureSectionsVisibility, 2000);
    setTimeout(ensureSectionsVisibility, 3000);

    // Adicionar verificação regular (a cada 2 segundos)
    const interval = setInterval(ensureSectionsVisibility, 2000);

    return () => {
      clearInterval(interval);
      document.documentElement.classList.remove("force-section-visibility");
    };
  }, []);

  return (
    <ErrorBoundary>
      <DarkModeProvider>
        <SectionProvider>{children}</SectionProvider>
      </DarkModeProvider>
    </ErrorBoundary>
  );
};

export default AppProviders;
