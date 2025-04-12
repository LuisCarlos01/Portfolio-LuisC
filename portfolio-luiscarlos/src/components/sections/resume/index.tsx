import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

import ResumeHeader from "./ResumeHeader";
import ResumeTabs from "./ResumeTabs";
import ResumeFilter from "./ResumeFilter";
import ResumeNoResults from "./ResumeNoResults";
import ResumeTimeline from "./ResumeTimeline";
import { useGSAPAnimation } from "../../../hooks/useGSAPAnimation";
import {
  educationData,
  experienceData,
  certificationData,
} from "../../../data/resumeData";
import "../../../styles/resume.css";

// Registrar plugins GSAP
gsap.registerPlugin(ScrollTrigger, Observer);

/**
 * Seção de currículo e experiências profissionais
 */
const ResumeSection: React.FC = () => {
  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState<
    "education" | "experience" | "certifications"
  >("experience");

  // Estado para os itens que já foram animados
  const [animatedItems, setAnimatedItems] = useState<string[]>([]);

  // Estado para filtragem e ordenação
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Função para filtrar e ordenar os dados
  const getFilteredData = () => {
    let data =
      activeTab === "education"
        ? [...educationData]
        : activeTab === "experience"
        ? [...experienceData]
        : [...certificationData];

    // Aplicar busca se houver termo
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      data = data.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.organization.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          ("achievements" in item &&
            Array.isArray(item.achievements) &&
            item.achievements.some((a) => a.toLowerCase().includes(term)))
      );
    }

    // Aplicar ordenação
    data.sort((a, b) => {
      // Ordenar por ID de forma ascendente ou descendente
      return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
    });

    return data;
  };

  // Obter os dados filtrados
  const currentData = getFilteredData();

  // Refs para os elementos da seção
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const downloadButtonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Custom hook para animações GSAP
  const { ensureVisible, createFadeInAnimation, createStaggerAnimation } =
    useGSAPAnimation();

  // Aplicar visibilidade com base na aba ativa
  const applyVisibilityForActiveTab = () => {
    const items = timelineRef.current?.querySelectorAll(".timeline-item") || [];
    items.forEach((item) => {
      ensureVisible(item as HTMLElement);
    });
  };

  // Limpar o termo de busca
  const clearSearch = () => {
    setSearchTerm("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Alternar direção de ordenação
  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Configurar animações quando o componente for montado
  useEffect(() => {
    // Forçar a visibilidade dos itens
    if (timelineRef.current) {
      const timelineItems =
        timelineRef.current.querySelectorAll(".timeline-item");
      timelineItems.forEach((item) => {
        (item as HTMLElement).style.display = "block";
        (item as HTMLElement).style.visibility = "visible";
        (item as HTMLElement).style.opacity = "1";
      });
    }

    // Garantir que elementos sejam visíveis
    if (sectionRef.current) ensureVisible(sectionRef.current);
    if (titleRef.current) ensureVisible(titleRef.current);
    if (descriptionRef.current) ensureVisible(descriptionRef.current);
    if (tabsRef.current) ensureVisible(tabsRef.current);
    if (contentRef.current) ensureVisible(contentRef.current);
    if (downloadButtonRef.current) ensureVisible(downloadButtonRef.current);
    if (timelineRef.current) ensureVisible(timelineRef.current);

    const setupAnimations = () => {
      // Animação do título
      createFadeInAnimation(titleRef.current, { y: 50 });

      // Animação da descrição
      createFadeInAnimation(descriptionRef.current, { delay: 0.3 });

      // Animação do botão de download
      createFadeInAnimation(downloadButtonRef.current, {
        delay: 0.5,
        y: 0,
        scale: 0.8,
        duration: 0.5,
      });

      // Animação das abas
      const tabButtons = tabsRef.current?.querySelectorAll("button");
      if (tabButtons && tabButtons.length > 0) {
        createStaggerAnimation(tabButtons, {
          delay: 0.6,
          y: 20,
          duration: 0.5,
        });
      }

      // Animação dos itens de currículo
      const resumeItems =
        timelineRef.current?.querySelectorAll(".timeline-item");
      if (resumeItems && resumeItems.length > 0) {
        Array.from(resumeItems).forEach((item, index) => {
          const itemId = item.getAttribute("data-id") || "";

          createFadeInAnimation(item as HTMLElement, {
            delay: 0.1 * index,
            y: 30,
            duration: 0.6,
            start: "top 85%",
            onComplete: () => {
              if (!animatedItems.includes(itemId)) {
                setAnimatedItems((prev) => [...prev, itemId]);
              }
            },
          });
        });
      }
    };

    // Configurar animações após um pequeno delay para garantir que o DOM esteja pronto
    const animationTimer = setTimeout(() => {
      setupAnimations();
      applyVisibilityForActiveTab();
    }, 100);

    return () => {
      clearTimeout(animationTimer);
    };
  }, [
    activeTab,
    animatedItems,
    createFadeInAnimation,
    createStaggerAnimation,
    ensureVisible,
  ]);

  // Mudar de tab
  const changeTab = (tab: "education" | "experience" | "certifications") => {
    setActiveTab(tab);
    setSearchTerm(""); // Limpar busca ao mudar de aba

    // Adicionar animação de transição entre tabs
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }

    // Garantir que a visibilidade seja aplicada
    setTimeout(applyVisibilityForActiveTab, 100);
  };

  // Baixar currículo
  const handleDownload = () => {
    // URL do arquivo do currículo
    const resumeUrl = "/assets/documents/cv-luiscarlos-2023.pdf";

    // Criar um link temporário para download
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "CV-LuisCarlos-2023.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    // Adicionar ao DOM, clicar e remover
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="py-20 relative bg-bg-dark section-container"
    >
      <div className="container mx-auto px-4">
        {/* Cabeçalho da seção */}
        <ResumeHeader
          titleRef={titleRef}
          descriptionRef={descriptionRef}
          downloadButtonRef={downloadButtonRef}
          handleDownload={handleDownload}
        />

        {/* Abas de navegação */}
        <ResumeTabs
          activeTab={activeTab}
          changeTab={changeTab}
          tabsRef={tabsRef}
        />

        {/* Filtros e Busca */}
        <ResumeFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          sortDirection={sortDirection}
          toggleSortDirection={toggleSortDirection}
          clearSearch={clearSearch}
          searchInputRef={searchInputRef}
        />

        {/* Conteúdo da aba atual */}
        <div ref={contentRef} className="mt-12">
          {currentData.length > 0 ? (
            <ResumeTimeline
              data={currentData}
              timelineRef={timelineRef}
              activeTab={activeTab}
            />
          ) : (
            <ResumeNoResults clearSearch={clearSearch} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
