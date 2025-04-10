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

        // Define uma imagem de fallback final usando placehold.co
        const fallbackUrl =
          projectId === 1
            ? "https://placehold.co/300x200/gray/white?text=Foodie+E-commerce"
            : `https://placehold.co/300x200/gray/white?text=Projeto+${projectId}`;

        imageElement.src = fallbackUrl;
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

  // Abrir modal com detalhes do projeto (implementação melhorada)
  const openProjectModal = (project: Project) => {
    // Primeiro, definimos o projeto selecionado para abrir o modal
    setSelectedProject(project);
    setIsModalOpen(true);

    // Impedir rolagem do body enquanto o modal estiver aberto
    document.body.style.overflow = "hidden";

    // Precisamos aguardar que o React renderize o modal antes de tentar animá-lo
    setTimeout(() => {
      const modalElement = modalRef.current;

      if (modalElement) {
        // Primeiro vamos definir o modal como visível, mas com opacidade 0
        modalElement.style.opacity = "0";
        modalElement.style.transform = "translateY(50px)";

        // Forçar uma rolagem imediata para o modal (sem animação suave)
        // para garantir que ele esteja visível antes de animar
        const modalRect = modalElement.getBoundingClientRect();
        const modalTop = modalRect.top + window.scrollY;
        const viewportHeight = window.innerHeight;

        // Calcular posição ideal para centralizar o modal na tela
        const idealScrollPosition =
          modalTop - (viewportHeight - modalRect.height) / 2;

        // Aplicar a rolagem
        window.scrollTo(0, idealScrollPosition);

        // Agora podemos animar o modal com GSAP
        gsap.to(modalElement, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });

        // Adicionar uma notificação visual para debug em dispositivos móveis
        if (window.innerWidth <= 768) {
          const notification = document.createElement("div");
          notification.style.position = "fixed";
          notification.style.bottom = "20px";
          notification.style.left = "50%";
          notification.style.transform = "translateX(-50%)";
          notification.style.backgroundColor = "#9b59b6";
          notification.style.color = "white";
          notification.style.padding = "8px 16px";
          notification.style.borderRadius = "20px";
          notification.style.zIndex = "9999";
          notification.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
          notification.style.opacity = "0";
          notification.textContent = "Projeto aberto!";

          document.body.appendChild(notification);

          // Animar a notificação
          gsap.to(notification, {
            opacity: 1,
            duration: 0.3,
            onComplete: () => {
              setTimeout(() => {
                gsap.to(notification, {
                  opacity: 0,
                  duration: 0.3,
                  onComplete: () => notification.remove(),
                });
              }, 2000);
            },
          });
        }
      }
    }, 50); // Tempo curto para garantir que o React renderizou o modal
  };

  // Fechar modal (implementação melhorada)
  const closeModal = () => {
    // Se temos uma referência ao modal
    if (modalRef.current) {
      // Animar saída do modal
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          // Redefinir estado para fechar o modal
          setIsModalOpen(false);
          setSelectedProject(null);
          // Restaurar rolagem do body
          document.body.style.overflow = "";

          // Verificar por notificações criadas e removê-las
          const notifications = document.querySelectorAll(
            'div[style*="position: fixed"][style*="bottom: 20px"]'
          );
          notifications.forEach((notification) => {
            notification.remove();
          });
        },
      });
    } else {
      // Caso a referência não exista, apenas fechamos o modal
      setIsModalOpen(false);
      setSelectedProject(null);
      document.body.style.overflow = "";
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
      Math.floor((sectionWidth * sectionHeight) / 35000),
      30
    );

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");

      // Tamanho aleatório
      const size = Math.random() * 6 + 3;

      // Posição aleatória (evitando bordas)
      const posX = 10 + Math.random() * (sectionWidth - 20);
      const posY = 50 + Math.random() * (sectionHeight - 100);

      // Variável aleatória para animação
      const randomVar = Math.random();

      // Definir estilo da partícula
      particle.className = "particle absolute rounded-full";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.opacity = (0.1 + Math.random() * 0.3).toString();
      particle.style.background = i % 3 === 0 ? 'rgba(108, 92, 231, 0.2)' : 'rgba(255, 255, 255, 0.1)';
      particle.style.setProperty("--random", randomVar.toString());
      particle.style.boxShadow = i % 5 === 0 ? '0 0 10px 2px rgba(108, 92, 231, 0.1)' : '';

      // Adicionar delay aleatório para cada partícula
      particle.style.animationDelay = `${Math.random() * 8}s`;
      particle.style.animationDuration = `${15 + Math.random() * 15}s`;

      // Adicionar a partícula ao container
      particlesContainer.appendChild(particle);
    }
    
    // Adicionar efeito de movimento parallax suave nas partículas
    if (sectionRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) - 0.5;
        const y = (clientY / window.innerHeight) - 0.5;
        
        const particles = particlesContainer.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
          const speed = 0.05 + (index % 4) * 0.01;
          const elParticle = particle as HTMLElement;
          gsap.to(elParticle, {
            x: x * 30 * speed,
            y: y * 30 * speed,
            duration: 1,
            ease: "power1.out"
          });
        });
      };
      
      sectionRef.current.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        if (sectionRef.current) {
          sectionRef.current.removeEventListener('mousemove', handleMouseMove);
        }
      };
    }
  }, [filteredProjects]); // Atualizar quando os projetos filtrados mudarem
  
  // Adicionar efeito de paralaxe para os cards de projeto
  useEffect(() => {
    if (!projectsRef.current) return;
    
    const projectCards = projectsRef.current.querySelectorAll('.project-card');
    
    projectCards.forEach((card) => {
      const handleMouseMove = (e: MouseEvent) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        
        // Calcular posição relativa do mouse dentro do card (0 a 1)
        const relX = (e.clientX - cardRect.left) / cardRect.width;
        const relY = (e.clientY - cardRect.top) / cardRect.height;
        
        // Mover imagem e conteúdo levemente (efeito 3D)
        const imageEl = cardElement.querySelector('img');
        const contentEl = cardElement.querySelector('.p-5');
        
        if (imageEl) {
          gsap.to(imageEl, {
            x: (relX - 0.5) * 10,
            y: (relY - 0.5) * 10,
            duration: 0.5,
            ease: "power1.out"
          });
        }
        
        if (contentEl) {
          gsap.to(contentEl, {
            x: (relX - 0.5) * 5,
            y: (relY - 0.5) * 5,
            duration: 0.5,
            ease: "power1.out"
          });
        }
        
        // Adicionar rotação 3D sutil ao card
        gsap.to(cardElement, {
          rotationY: (relX - 0.5) * 5,
          rotationX: (relY - 0.5) * -5,
          transformPerspective: 1000,
          ease: "power1.out",
          duration: 0.5
        });
      };
      
      const handleMouseLeave = (e: MouseEvent) => {
        const cardElement = card as HTMLElement;
        const imageEl = cardElement.querySelector('img');
        const contentEl = cardElement.querySelector('.p-5');
        
        // Resetar posições
        if (imageEl) {
          gsap.to(imageEl, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power3.out"
          });
        }
        
        if (contentEl) {
          gsap.to(contentEl, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power3.out"
          });
        }
        
        // Resetar rotação
        gsap.to(cardElement, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: "power3.out"
        });
      };
      
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      projectCards.forEach(card => {
        card.removeEventListener('mousemove', (e: Event) => {});
        card.removeEventListener('mouseleave', (e: Event) => {});
      });
    };
  }, [filteredProjects]);

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
          className="text-4xl font-bold text-center mb-6 text-white relative pb-5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary"
          ref={titleRef}
        >
          <span className="relative inline-block">
            Meus Projetos
            <span className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-primary/10 blur-xl"></span>
            <span className="absolute -bottom-3 -left-3 w-8 h-8 rounded-full bg-primary/20 blur-md"></span>
          </span>
        </h2>

        <p className="text-center text-text-light mb-12 max-w-2xl mx-auto leading-relaxed">
          Explore alguns dos meus trabalhos recentes em desenvolvimento web,
          aplicativos e design. Cada projeto representa uma solução única para
          desafios específicos.
        </p>

        {/* Filtros de projetos com animação melhorada */}
        <div
          className="flex flex-wrap justify-center mb-12 gap-3 relative"
          ref={filtersRef}
        >
          {/* Efeito de brilho por trás dos filtros */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-10 bg-primary/5 blur-xl rounded-full"></div>
          
          <button
            className={`px-6 py-2.5 rounded-full transition-all duration-300 relative overflow-hidden ${
              activeFilter === "all"
                ? "bg-primary text-white shadow-lg shadow-primary/30 transform scale-105"
                : "bg-card-bg text-text-light hover:bg-primary/10 hover:text-white"
            } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-bg-dark`}
            onClick={() => handleFilterChange("all")}
          >
            <span className="relative z-10">Todos</span>
            {activeFilter === "all" && (
              <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark animate-pulse-slow"></span>
            )}
          </button>

          <button
            className={`px-6 py-2.5 rounded-full transition-all duration-300 relative overflow-hidden ${
              activeFilter === "web"
                ? "bg-primary text-white shadow-lg shadow-primary/30 transform scale-105"
                : "bg-card-bg text-text-light hover:bg-primary/10 hover:text-white"
            } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-bg-dark`}
            onClick={() => handleFilterChange("web")}
          >
            <span className="relative z-10">Web</span>
            {activeFilter === "web" && (
              <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark animate-pulse-slow"></span>
            )}
          </button>

          <button
            className={`px-6 py-2.5 rounded-full transition-all duration-300 relative overflow-hidden ${
              activeFilter === "app"
                ? "bg-primary text-white shadow-lg shadow-primary/30 transform scale-105"
                : "bg-card-bg text-text-light hover:bg-primary/10 hover:text-white"
            } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-bg-dark`}
            onClick={() => handleFilterChange("app")}
          >
            <span className="relative z-10">App</span>
            {activeFilter === "app" && (
              <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark animate-pulse-slow"></span>
            )}
          </button>

          <button
            className={`px-6 py-2.5 rounded-full transition-all duration-300 relative overflow-hidden ${
              activeFilter === "backend"
                ? "bg-primary text-white shadow-lg shadow-primary/30 transform scale-105"
                : "bg-card-bg text-text-light hover:bg-primary/10 hover:text-white"
            } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-bg-dark`}
            onClick={() => handleFilterChange("backend")}
          >
            <span className="relative z-10">Backend</span>
            {activeFilter === "backend" && (
              <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark animate-pulse-slow"></span>
            )}
          </button>
        </div>
        
        {/* Contador de projetos */}
        <div className="flex justify-center items-center mb-8">
          <div className="bg-card-bg px-4 py-1.5 rounded-full text-sm text-text-light flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
            <span>Mostrando <span className="text-primary font-medium">{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'projeto' : 'projetos'}</span>
          </div>
        </div>

        {/* Grid de projetos com efeitos avançados */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          ref={projectsRef}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group bg-card-bg rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-2"
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
                {/* Overlay de gradiente que aparece no hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white text-xl font-bold mb-2">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 rounded-full bg-primary/20 text-white backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-white/80 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
                {/* Ícone central que aparece no hover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-primary/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-90 transform scale-0 group-hover:scale-100 transition-all duration-500 shadow-lg shadow-primary/30">
                  <FaSearch className="text-white text-xl" />
                </div>
                {/* Adicionando uma borda brilhante que aparece no hover */}
                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-500 rounded-t-xl opacity-0 group-hover:opacity-100"></div>
              </div>

              <div className="p-5 relative">
                {/* Linha decorativa animada */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/80 to-primary/0 group-hover:w-4/5 transition-all duration-700"></div>
                
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
                        aria-label="GitHub"
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
                        aria-label="Demo do projeto"
                      >
                        <FaLink />
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Indicador de clique sutil */}
                <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-primary/30 opacity-0 group-hover:opacity-100 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal com detalhes do projeto e animações aprimoradas */}
      {isModalOpen && selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 modal-overlay"
          onClick={() => closeModal()}
        >
          <div
            className="animate-fadeIn max-w-4xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
          >
            <div className="bg-card-bg rounded-xl overflow-hidden flex flex-col shadow-2xl relative border border-primary/10">
              {/* Efeito de brilho nos cantos */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-colors duration-300 z-10 modal-close-btn"
                onClick={() => closeModal()}
                aria-label="Fechar modal"
              >
                <span className="transform hover:rotate-90 transition-transform duration-300 inline-block">✕</span>
              </button>

              <div className="relative h-72 md:h-96 overflow-hidden">
                <ImageWithFallback
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
                  <div className="animate-fadeInUp">
                    <h3 className="text-white text-3xl font-bold mb-3 relative inline-block">
                      {selectedProject.title}
                      <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-primary"></span>
                    </h3>
                    <div className="flex flex-wrap gap-2 animate-fadeInUp animation-delay-100">
                      {selectedProject.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary backdrop-blur-sm border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto styled-scrollbar flex-grow bg-card-bg relative">
                <div className="animate-fadeInUp animation-delay-200">
                  <p className="text-text-light mb-8 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-bg-dark rounded-lg p-5 shadow-inner transform transition-transform hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5">
                      <h4 className="text-primary font-semibold mb-3 flex items-center">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <span className="w-3 h-3 bg-primary rounded-full"></span>
                        </span>
                        Tecnologias
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-sm px-3 py-1 rounded-md bg-card-bg text-text-light hover:bg-primary/10 hover:text-primary transition-colors duration-300 cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-bg-dark rounded-lg p-5 shadow-inner transform transition-transform hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5">
                      <h4 className="text-primary font-semibold mb-3 flex items-center">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <span className="w-3 h-3 bg-primary rounded-full"></span>
                        </span>
                        Links
                      </h4>
                      <div className="flex flex-col space-y-3">
                        {selectedProject.github && (
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-text-light hover:text-primary transition-colors group"
                          >
                            <span className="w-8 h-8 rounded-full bg-card-bg flex items-center justify-center mr-2 group-hover:bg-primary/20 transition-colors">
                              <FaGithub className="group-hover:scale-110 transition-transform" />
                            </span>
                            <span>Repositório GitHub</span>
                            <FaArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
                          </a>
                        )}
                        {selectedProject.demo && (
                          <a
                            href={selectedProject.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-text-light hover:text-primary transition-colors group"
                          >
                            <span className="w-8 h-8 rounded-full bg-card-bg flex items-center justify-center mr-2 group-hover:bg-primary/20 transition-colors">
                              <FaLink className="group-hover:scale-110 transition-transform" />
                            </span>
                            <span>Demo ao vivo</span>
                            <FaArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Seção adicional com detalhes */}
                  <div className="bg-bg-dark rounded-lg p-5 mb-2 shadow-inner">
                    <h4 className="text-primary font-semibold mb-3 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        <span className="w-3 h-3 bg-primary rounded-full"></span>
                      </span>
                      Destaques do projeto
                    </h4>
                    <ul className="space-y-2 text-text-light">
                      <li className="flex items-start">
                        <span className="w-4 h-4 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-1 mr-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        </span>
                        <span>Interface responsiva adaptada para todos os dispositivos</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-4 h-4 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-1 mr-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        </span>
                        <span>Animações suaves para melhorar a experiência do usuário</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-4 h-4 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-1 mr-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        </span>
                        <span>Desempenho otimizado e tempos de carregamento rápidos</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Adicionar animações CSS para a seção de portfólio */}
      <style jsx>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease forwards;
        }
        
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .styled-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .styled-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(108, 92, 231, 0.3);
          border-radius: 3px;
        }
        
        .styled-scrollbar::-webkit-scrollbar-track {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }
        
        .particle {
          animation: float 20s infinite ease-in-out;
          transform: translate3d(0, 0, 0);
          will-change: transform, opacity;
          transition: all 0.5s ease;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
          }
          25% {
            transform: translateY(calc(-15px * var(--random, 0.5))) translateX(calc(20px * var(--random, 0.5))) scale(0.95);
          }
          50% {
            transform: translateY(calc(15px * var(--random, 0.5))) translateX(calc(-20px * var(--random, 0.5))) scale(1.05);
          }
          75% {
            transform: translateY(calc(-10px * var(--random, 0.5))) translateX(calc(15px * var(--random, 0.5))) scale(1);
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default PortfolioSection;
