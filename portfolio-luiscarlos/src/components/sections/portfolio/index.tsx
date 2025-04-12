import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectFilters from "./ProjectFilters";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ParticleEffect from "../../common/ParticleEffect";
import { loadImageWithFallbacks } from "./ProjectImageLoader";
import { projects } from "../../../data/projectsData";

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * Seção de portfólio de projetos
 */
const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Função para garantir que as imagens de projeto sejam carregadas corretamente
  useEffect(() => {
    // Função para verificar e corrigir todas as imagens do portfólio
    const ensureAllImagesLoaded = () => {
      // Seleciona todas as imagens de projetos
      document.querySelectorAll(".project-card img").forEach((img) => {
        const imgElement = img as HTMLImageElement;

        // Encontra o ID do projeto associado a esta imagem
        const projectCard = imgElement.closest(".project-card");
        const projectId = projectCard?.getAttribute("data-project-id");

        if (projectId) {
          // Aplica o carregador de imagem com fallbacks
          loadImageWithFallbacks(imgElement, parseInt(projectId));

          // Garantir estilos corretos
          imgElement.style.display = "block";
          imgElement.style.visibility = "visible";
          imgElement.style.opacity = "1";
          imgElement.style.objectFit = "cover";

          // Configuração especial para a imagem do Foodie E-commerce
          if (projectId === "1") {
            imgElement.style.objectPosition = "top center";
            imgElement.classList.add("foodie-image");
          }
        }
      });
    };

    // Verificar imagens após um tempo para garantir que o DOM está pronto
    const timers = [
      setTimeout(ensureAllImagesLoaded, 500),
      setTimeout(ensureAllImagesLoaded, 1500),
      setTimeout(ensureAllImagesLoaded, 3000),
    ];

    // Limpar timers ao desmontar
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [filteredProjects]);

  // Filtrar projetos quando o filtro muda
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.category === activeFilter
      );
      setFilteredProjects(filtered);
    }

    // Animar os cards ao filtrar
    if (projectsRef.current) {
      gsap.fromTo(
        projectsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [activeFilter]);

  // Animar elementos ao rolar
  useEffect(() => {
    if (!sectionRef.current) return;

    // Garantir que a seção esteja sempre visível
    sectionRef.current.style.display = "block";
    sectionRef.current.style.opacity = "1";
    sectionRef.current.style.zIndex = "1";
    sectionRef.current.style.visibility = "visible";

    // Animar título
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animar projetos
    if (projectsRef.current && projectsRef.current.children.length > 0) {
      gsap.fromTo(
        projectsRef.current.children,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Remover ScrollTriggers quando o componente for desmontado
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Efeito adicional para verificar periodicamente a visibilidade
  useEffect(() => {
    // Verificar se a seção está realmente visível no DOM
    const checkVisibility = () => {
      if (sectionRef.current) {
        const style = window.getComputedStyle(sectionRef.current);
        if (
          style.display === "none" ||
          style.visibility === "hidden" ||
          style.opacity === "0"
        ) {
          console.log("Corrigindo visibilidade da seção Portfolio");
          sectionRef.current.style.display = "block";
          sectionRef.current.style.opacity = "1";
          sectionRef.current.style.zIndex = "1";
          sectionRef.current.style.visibility = "visible";
        }
      }

      // Verificar também se os projetos estão visíveis
      if (projectsRef.current) {
        Array.from(projectsRef.current.children).forEach((child) => {
          const element = child as HTMLElement;
          if (window.getComputedStyle(element).display === "none") {
            element.style.display = "block";
            element.style.visibility = "visible";
            element.style.opacity = "1";
          }
        });
      }
    };

    // Verificar após um segundo
    const timer = setTimeout(checkVisibility, 1000);
    // E também após alguns segundos para garantir
    const secondTimer = setTimeout(checkVisibility, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(secondTimer);
    };
  }, []);

  // Efeito para escutar o evento de abrir modal do projeto
  useEffect(() => {
    const handleOpenProjectModal = (event: CustomEvent) => {
      const projectId = event.detail.projectId;
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        openProjectModal(project);
      }
    };

    // Adiciona o listener para o evento customizado
    document.addEventListener(
      "openProjectModal",
      handleOpenProjectModal as EventListener
    );

    return () => {
      // Remove o listener quando o componente for desmontado
      document.removeEventListener(
        "openProjectModal",
        handleOpenProjectModal as EventListener
      );
    };
  }, []);

  // Abrir modal com detalhes do projeto
  const openProjectModal = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Fechar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-20 bg-bg-dark relative min-h-screen overflow-hidden section-container"
    >
      {/* Efeito de partículas para o fundo */}
      <ParticleEffect
        color="rgba(99, 102, 241, %o)"
        density={50000}
        maxParticles={20}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl font-bold text-white mb-4 inline-block relative"
          >
            Meus Projetos
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 transform origin-left"></span>
          </h2>
          <p className="text-lg text-text-light mx-auto max-w-3xl">
            Conheça alguns dos projetos que desenvolvi utilizando diferentes
            tecnologias e soluções criativas.
          </p>
        </div>

        {/* Filtros de projetos */}
        <ProjectFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Grid de projetos */}
        <div
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={() => openProjectModal(project)}
            />
          ))}
        </div>

        {/* Se não houver projetos para o filtro selecionado */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl text-white mb-4">
              Nenhum projeto encontrado para este filtro.
            </h3>
            <button
              onClick={() => setActiveFilter("all")}
              className="flex items-center gap-2 mx-auto bg-primary/20 hover:bg-primary/30 text-primary px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/20"
            >
              <span>Ver todos os projetos</span>
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>

      {/* Modal de detalhes do projeto */}
      {isModalOpen && selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </section>
  );
};

export default PortfolioSection;
