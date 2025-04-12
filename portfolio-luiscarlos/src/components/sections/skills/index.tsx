import { useEffect, useRef, useState, useCallback, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CategoryFilter from "./CategoryFilter";
import SkillDetailModal from "./SkillDetailModal";
import SkillsHeader from "./SkillsHeader";
import SkillsList from "./SkillsList";
import { Skill, ActiveCategory } from "../../../types/skillsTypes";
import useAnimateSection from "../../../hooks/useAnimateSection";
import useSkillApplicationAreas from "../../../hooks/useSkillApplicationAreas";
import { useTranslation } from "react-i18next";
import skillsData from "../../../data/skillsData";

// Registrar plugin GSAP
gsap.registerPlugin(ScrollTrigger);

/**
 * Componente principal da seção de habilidades
 * Refatorado em componentes menores e mais gerenciáveis
 */
const SkillsSection = () => {
  // Refs para elementos da DOM
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Estados
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("all");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Hooks
  const { t } = useTranslation();
  const { getApplicationAreas } = useSkillApplicationAreas();

  // Usar o hook personalizado para animar a seção
  const { animateSection } = useAnimateSection(
    {
      sectionId: "skills-section",
      triggerOffset: "top 80%",
      once: true,
    },
    {
      title: "h2",
      description: ".section-subtitle",
      items: ".skill-card",
    }
  );

  // Filtrar habilidades com base na categoria ativa
  const filteredSkills = useCallback(() => {
    return activeCategory === "all"
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  // Função para animar as barras de progresso
  const animateProgressBars = useCallback(() => {
    const progressBars = document.querySelectorAll(".progress-inner");
    const skillCards = document.querySelectorAll(".skill-card");

    if (progressBars.length > 0) {
      progressBars.forEach((bar, index) => {
        if (index < skillCards.length) {
          const skillLevel =
            skillCards[index].getAttribute("data-level") || "0";

          // Reset para garantir animação limpa
          gsap.set(bar, { width: "0%" });

          // Animar para o valor correto
          gsap.to(bar, {
            width: `${skillLevel}%`,
            duration: 1,
            ease: "power2.out",
            delay: 0.1 * index,
          });
        }
      });
    }
  }, []);

  // Efeito para garantir visibilidade da seção
  useEffect(() => {
    if (!sectionRef.current) return;

    // Garantir que a seção esteja sempre visível
    const section = sectionRef.current;
    section.style.display = "block";
    section.style.opacity = "1";
    section.style.zIndex = "1";
    section.style.visibility = "visible";

    setIsVisible(true);

    // Configurar animação quando a seção estiver no viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Animação quando a seção entrar no viewport
          animateProgressBars();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, [animateProgressBars]);

  // Função para mudar a categoria ativa com animação
  const handleCategoryChange = useCallback(
    (category: ActiveCategory) => {
      // Animar a saída dos cards atuais
      gsap.to(".skill-card", {
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setActiveCategory(category);

          // Pequeno atraso antes de exibir os novos cards
          setTimeout(() => {
            // Animação para os novos cards
            gsap.fromTo(
              ".skill-card",
              {
                y: 40,
                opacity: 0,
                scale: 0.95,
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.08,
                duration: 0.5,
                ease: "back.out(1.4)",
                onComplete: animateProgressBars,
              }
            );
          }, 100);
        },
      });
    },
    [animateProgressBars]
  );

  // Função para mostrar detalhes da habilidade
  const handleSkillClick = useCallback((skill: Skill) => {
    // Efeito de zoom suave no card clicado
    const cards = document.querySelectorAll(".skill-card");
    cards.forEach((card) => {
      if (card.querySelector("h3")?.textContent === skill.name) {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(card, {
          opacity: 0.6,
          duration: 0.3,
        });
      }
    });

    // Pequeno atraso para melhorar a experiência
    setTimeout(() => {
      setSelectedSkill(skill);
      // Adiciona classe para efeito de transição suave na página toda
      document.body.classList.add("modal-transition");
    }, 300);
  }, []);

  // Função para fechar o modal
  const handleCloseModal = useCallback(() => {
    const modal = document.getElementById("skill-detail-modal");

    if (modal) {
      // Animar o fechamento do modal
      gsap.to("#skill-detail-modal", {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setSelectedSkill(null);
          // Restaurar a rolagem normal da página
          document.body.style.overflow = "auto";
        },
      });
    }
  }, []);

  // Função para navegar para um projeto específico
  const navigateToProject = useCallback((projectId: number) => {
    const projectSection = document.getElementById("portfolio-section");
    if (projectSection) {
      setSelectedSkill(null); // Fecha o modal de habilidade

      // Restaurar a rolagem normal da página
      document.body.style.overflow = "auto";

      // Pequeno atraso para garantir que o modal de habilidade esteja fechado
      setTimeout(() => {
        // Rolar para a seção de portfólio
        projectSection.scrollIntoView({ behavior: "smooth" });

        // Implementar lógica para destacar o projeto específico
        // Esta parte depende de como os projetos são implementados
      }, 300);
    }
  }, []);

  return (
    <section
      id="skills-section"
      ref={sectionRef}
      className="section-container bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Cabeçalho da seção */}
        <SkillsHeader ref={titleRef} />

        {/* Filtros de categoria */}
        <CategoryFilter
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
        />

        {/* Lista de habilidades */}
        <SkillsList
          skills={filteredSkills()}
          onSkillClick={handleSkillClick}
          selectedSkill={selectedSkill}
        />
      </div>

      {/* Modal de detalhes da habilidade */}
      {selectedSkill && (
        <SkillDetailModal
          skill={selectedSkill}
          onClose={handleCloseModal}
          navigateToProject={navigateToProject}
          getApplicationAreas={getApplicationAreas}
        />
      )}
    </section>
  );
};

export default memo(SkillsSection);
