import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLink, FaSearch, FaArrowRight } from "react-icons/fa";
import ImageWithFallback from "./ImageWithFallback";

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Interface para um projeto
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  github?: string;
  demo?: string;
}

// Dados dos projetos
const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Moderno",
    description:
      "Um site de e-commerce completo com tema escuro, integração de pagamento, carrinho de compras e painel administrativo para gerenciar produtos.",
    image: "/foodie-ecommerce.jpeg",
    category: "web",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "TailwindCSS"],
    github: "https://github.com/LuisCarlos01",
    demo: "https://example.com/ecommerce",
  },
  {
    id: 2,
    title: "App de Tarefas",
    description:
      "Aplicativo de gerenciamento de tarefas com funcionalidades de arrastar e soltar, categorias e lembretes.",
    image: "/assets/project2.jpg",
    category: "app",
    tags: ["React", "Firebase", "TailwindCSS"],
    github: "https://github.com/LuisCarlos01",
    demo: "https://example.com/todo-app",
  },
  {
    id: 3,
    title: "Dashboard Analytics",
    description:
      "Painel administrativo para visualização de dados e métricas de desempenho de negócios.",
    image: "/assets/DashboardAnalytics.jpeg",
    category: "web",
    tags: ["React", "D3.js", "Express", "MySQL"],
    github: "https://github.com/LuisCarlos01",
  },
  {
    id: 4,
    title: "App de Clima",
    description:
      "Aplicativo de previsão do tempo com informações detalhadas e visualizações por hora e diárias.",
    image: "/assets/App clima.jpeg",
    category: "app",
    tags: ["React Native", "API", "Geolocation"],
    demo: "https://example.com/weather-app",
  },
  {
    id: 5,
    title: "Website Responsivo",
    description:
      "Site institucional responsivo com animações suaves e otimizado para SEO.",
    image: "/assets/Responsive web design.jpeg",
    category: "web",
    tags: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    github: "https://github.com/LuisCarlos01",
    demo: "https://example.com/responsive-site",
  },
  {
    id: 6,
    title: "API RESTful",
    description:
      "API robusta com autenticação, autorização e endpoints para gerenciamento de usuários e produtos.",
    image: "/assets/project6.jpg",
    category: "backend",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/LuisCarlos01",
  },
];

// Função para carregar imagens com fallbacks
const loadImageWithFallbacks = (
  imageElement: HTMLImageElement,
  projectId: number
) => {
  // Lista completa de possíveis caminhos para tentar
  const possiblePaths = [
    // Paths para o Foodie E-commerce (projeto ID 1)
    ...(projectId === 1
      ? [
          "/assets/foodie-ecommerce.jpeg",
          "/foodie-ecommerce.jpeg",
          "/images/foodie-ecommerce.jpeg",
          "/public/images/foodie-ecommerce.jpeg",
          "./assets/foodie-ecommerce.jpeg",
          "../assets/foodie-ecommerce.jpeg",
          "/assets/foodie-ecommerce.jpg",
          "/images/foodie-ecommerce.jpg",
          window.location.origin + "/assets/foodie-ecommerce.jpeg",
          window.location.origin + "/foodie-ecommerce.jpeg",
        ]
      : []),

    // Paths para outros projetos
    imageElement.src, // Caminho original
    imageElement.src.replace(".jpeg", ".jpg"), // Tenta mudar a extensão
    imageElement.src.replace(".jpg", ".jpeg"), // Tenta mudar a extensão
    imageElement.src.replace("/assets/", "/images/"), // Tenta outro diretório
    imageElement.src.replace("/assets/", "/"), // Tenta na raiz
    imageElement.src.replace("/assets/", "/public/images/"), // Tenta em public/images
    window.location.origin + imageElement.src, // Tenta com origem completa
  ];

  // Remove duplicatas e caminhos vazios
  const uniquePaths = [...new Set(possiblePaths)].filter(Boolean);

  // Função para tentar próximo caminho
  let pathIndex = 0;
  const tryNextPath = () => {
    if (pathIndex < uniquePaths.length) {
      const nextPath = uniquePaths[pathIndex] + "?t=" + new Date().getTime();
      console.log(
        `Tentando carregar imagem do projeto ${projectId} com caminho: ${nextPath}`
      );

      imageElement.src = nextPath;
      pathIndex++;

      // Se for o último caminho, removemos o handler para evitar loop infinito
      if (pathIndex >= uniquePaths.length) {
        imageElement.onerror = null;
        console.log(
          `Não foi possível carregar a imagem do projeto ${projectId} após tentar todos os caminhos possíveis.`
        );

        // Define uma imagem de fallback final
        imageElement.src =
          projectId === 1
            ? "https://via.placeholder.com/300x200?text=Foodie+E-commerce"
            : `https://via.placeholder.com/300x200?text=Projeto+${projectId}`;
      }
    }
  };

  // Definir manipulador de erro para tentar próximo caminho
  imageElement.onerror = tryNextPath;

  // Iniciar tentativa com o caminho atual (força um reload)
  const currentSrc = imageElement.src;
  imageElement.src = currentSrc + "?t=" + new Date().getTime();
};

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Adicionar referência para partículas
  const particlesRef = useRef<HTMLDivElement>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Função para garantir que as imagens de projeto sejam carregadas corretamente
  useEffect(() => {
    // Função para verificar e corrigir todas as imagens do portfólio
    const ensureAllImagesLoaded = () => {
      console.log("Verificando todas as imagens do portfólio");

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

    // Animar filtros
    if (filtersRef.current && filtersRef.current.children.length > 0) {
      gsap.fromTo(
        filtersRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: filtersRef.current,
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

  // Lidar com a mudança de filtro
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  // Abrir modal com detalhes do projeto
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);

    // Impedir rolagem do body enquanto o modal estiver aberto
    document.body.style.overflow = "hidden";

    // Animar entrada do modal
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  };

  // Fechar modal
  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          setIsModalOpen(false);
          setSelectedProject(null);
          document.body.style.overflow = ""; // Restaurar rolagem
        },
      });
    } else {
      setIsModalOpen(false);
      setSelectedProject(null);
      document.body.style.overflow = ""; // Restaurar rolagem
    }
  };

  // Adicionar função para criar efeito de partículas
  useEffect(() => {
    if (!particlesRef.current || !sectionRef.current) return;

    // Criar partículas decorativas
    const particlesContainer = particlesRef.current;
    const sectionHeight = sectionRef.current.offsetHeight;
    const sectionWidth = sectionRef.current.offsetWidth;

    // Limpar partículas existentes
    particlesContainer.innerHTML = "";

    // Número de partículas baseado no tamanho da seção
    const particleCount = Math.min(
      Math.floor((sectionWidth * sectionHeight) / 40000),
      20
    );

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");

      // Tamanho aleatório
      const size = Math.random() * 5 + 3;

      // Posição aleatória (evitando bordas)
      const posX = 10 + Math.random() * (sectionWidth - 20);
      const posY = 100 + Math.random() * (sectionHeight - 200);

      // Variável aleatória para animação
      const randomVar = Math.random();

      // Definir estilo da partícula
      particle.className = "particle absolute rounded-full";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.opacity = (0.2 + Math.random() * 0.4).toString();
      particle.style.setProperty("--random", randomVar.toString());

      // Adicionar delay aleatório para cada partícula
      particle.style.animationDelay = `${Math.random() * 5}s`;

      // Adicionar a partícula ao container
      particlesContainer.appendChild(particle);
    }
  }, [filteredProjects]); // Atualizar quando os projetos filtrados mudarem

  return (
    <div
      className="portfolio-section py-16 px-4 relative bg-bg-dark section-container"
      ref={sectionRef}
      id="portfolio-section"
    >
      {/* Container de partículas */}
      <div
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className="text-4xl font-bold text-center mb-6 text-white relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary"
          ref={titleRef}
        >
          Meus Projetos
        </h2>

        <p className="text-center text-text-light mb-10 max-w-2xl mx-auto leading-relaxed">
          Explore alguns dos meus trabalhos recentes em desenvolvimento web,
          aplicativos e design. Cada projeto representa uma solução única para
          desafios específicos.
        </p>

        {/* Filtros de projetos com animação melhorada */}
        <div
          className="flex flex-wrap justify-center mb-10 gap-3"
          ref={filtersRef}
        >
          <button
            className={`px-5 py-2 rounded-full transition-all duration-300 relative overflow-hidden ${
              activeFilter === "all"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-card-bg text-text-light hover:bg-primary/10"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            <span className="relative z-10">Todos</span>
            {activeFilter === "all" && (
              <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark animate-pulse-slow"></span>
            )}
          </button>

          <button
            className={`px-5 py-2 rounded-full transition-all duration-300 relative overflow-hidden ${
              activeFilter === "web"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-card-bg text-text-light hover:bg-primary/10"
            }`}
            onClick={() => setActiveFilter("web")}
          >
            <span className="relative z-10">Web</span>
            {activeFilter === "web" && (
              <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark animate-pulse-slow"></span>
            )}
          </button>

          <button
            className={`px-5 py-2 rounded-full transition-all duration-300 relative overflow-hidden ${
              activeFilter === "app"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-card-bg text-text-light hover:bg-primary/10"
            }`}
            onClick={() => setActiveFilter("app")}
          >
            <span className="relative z-10">App</span>
            {activeFilter === "app" && (
              <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark animate-pulse-slow"></span>
            )}
          </button>

          <button
            className={`px-5 py-2 rounded-full transition-all duration-300 relative overflow-hidden ${
              activeFilter === "backend"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-card-bg text-text-light hover:bg-primary/10"
            }`}
            onClick={() => setActiveFilter("backend")}
          >
            <span className="relative z-10">Backend</span>
            {activeFilter === "backend" && (
              <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark animate-pulse-slow"></span>
            )}
          </button>
        </div>

        {/* Grid de projetos com efeitos avançados */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          ref={projectsRef}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group bg-card-bg rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
              data-project-id={project.id}
              onClick={() => {
                setSelectedProject(project);
                setIsModalOpen(true);
              }}
            >
              <div className="relative overflow-hidden h-56">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-xl font-bold mb-1">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {project.category.charAt(0).toUpperCase() +
                        project.category.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-90 transform scale-0 group-hover:scale-100 transition-all duration-500">
                  <FaSearch className="text-white text-xl" />
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-text-light mb-3 line-clamp-2 text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/5 text-primary/80">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <button className="text-primary text-sm font-medium flex items-center group/btn">
                    <span>Ver detalhes</span>
                    <FaArrowRight className="ml-1 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>

                  <div className="flex space-x-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-text-light hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-text-light hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <FaLink />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal com detalhes do projeto e animações aprimoradas */}
      {isModalOpen && selectedProject && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
          >
            <div className="bg-card-bg rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative">
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-primary transition-colors duration-300 z-10"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>

              <div className="relative h-72 md:h-96 overflow-hidden">
                <ImageWithFallback
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-3xl font-bold mb-2">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 overflow-y-auto styled-scrollbar flex-grow">
                <p className="text-text-light mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-bg-dark rounded-lg p-4">
                    <h4 className="text-primary font-semibold mb-2">
                      Tecnologias
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-sm px-3 py-1 rounded-md bg-card-bg text-text-light"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-bg-dark rounded-lg p-4">
                    <h4 className="text-primary font-semibold mb-2">Links</h4>
                    <div className="flex flex-col space-y-2">
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-text-light hover:text-primary transition-colors"
                        >
                          <FaGithub className="mr-2" /> Repositório GitHub
                        </a>
                      )}
                      {selectedProject.demo && (
                        <a
                          href={selectedProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-text-light hover:text-primary transition-colors"
                        >
                          <FaLink className="mr-2" /> Demo ao vivo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-border flex justify-end">
                <button
                  className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-300 flex items-center"
                  onClick={() => setIsModalOpen(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioSection;
