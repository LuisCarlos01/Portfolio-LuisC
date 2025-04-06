import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLink, FaSearch } from "react-icons/fa";

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
      "Um site de e-commerce completo com integração de pagamento, carrinho de compras e painel administrativo.",
    image: "/assets/project1.jpg",
    category: "web",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
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
    image: "/assets/project3.jpg",
    category: "web",
    tags: ["React", "D3.js", "Express", "MySQL"],
    github: "https://github.com/LuisCarlos01",
  },
  {
    id: 4,
    title: "App de Clima",
    description:
      "Aplicativo de previsão do tempo com informações detalhadas e visualizações por hora e diárias.",
    image: "/assets/project4.jpg",
    category: "app",
    tags: ["React Native", "API", "Geolocation"],
    demo: "https://example.com/weather-app",
  },
  {
    id: 5,
    title: "Website Responsivo",
    description:
      "Site institucional responsivo com animações suaves e otimizado para SEO.",
    image: "/assets/project5.jpg",
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

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="portfolio-section py-20 px-6 bg-bg-dark" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl font-bold text-center text-white mb-4 relative pb-5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary"
          ref={titleRef}
        >
          Meus Projetos
        </h2>

        <p className="text-center text-text-light mb-12 max-w-2xl mx-auto section-description">
          Aqui estão alguns dos meus projetos recentes. Explore meu trabalho e
          descubra como posso ajudar a transformar suas ideias em realidade.
        </p>

        {/* Filtros */}
        <div
          className="category-filters flex flex-wrap justify-center gap-4 mb-12"
          ref={filtersRef}
        >
          {["all", "web", "app", "backend"].map((filter) => (
            <button
              key={filter}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-primary text-white shadow-lg shadow-primary shadow-opacity-30"
                  : "bg-card-bg text-text-light hover:bg-primary hover:bg-opacity-10"
              }`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter === "all"
                ? "Todos"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Grade de projetos */}
        <div
          className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          ref={projectsRef}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group bg-card-bg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary hover:shadow-opacity-10"
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                  <div className="p-4 w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white font-bold text-xl">
                        {project.title}
                      </h3>
                      <button
                        className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white"
                        onClick={() => openProjectModal(project)}
                        aria-label="Ver detalhes"
                      >
                        <FaSearch />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary bg-opacity-10 text-primary-light text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-3 py-1 bg-primary bg-opacity-10 text-primary-light text-xs rounded-full">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-text-light text-sm line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-light hover:text-primary transition-colors duration-300"
                      aria-label="Ver código no GitHub"
                    >
                      <FaGithub className="text-xl" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-light hover:text-primary transition-colors duration-300"
                      aria-label="Ver demonstração"
                    >
                      <FaLink className="text-xl" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de projeto */}
        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black bg-opacity-70">
            <div
              className="bg-bg-dark rounded-xl w-full max-w-4xl overflow-hidden relative"
              ref={modalRef}
            >
              <button
                className="absolute top-4 right-4 text-white z-10 bg-primary w-8 h-8 rounded-full flex items-center justify-center"
                onClick={closeModal}
                aria-label="Fechar"
              >
                &times;
              </button>
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-1/2">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {selectedProject.title}
                  </h3>
                  <p className="text-text-light mb-6">
                    {selectedProject.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="text-white font-bold mb-2">Tecnologias</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary bg-opacity-10 text-primary-light text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn active flex items-center gap-2"
                      >
                        <FaGithub /> Ver Código
                      </a>
                    )}
                    {selectedProject.demo && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn flex items-center gap-2"
                      >
                        <FaLink /> Ver Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioSection;
