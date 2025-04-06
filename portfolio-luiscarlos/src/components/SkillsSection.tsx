import { useEffect, useRef, useState, useCallback, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageWithFallback from "./ImageWithFallback";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaGitAlt,
  FaNpm,
  FaDocker,
  FaDatabase,
  FaFigma,
  FaServer,
  FaMobile,
  FaWordpress,
  FaSass,
  FaChevronRight,
} from "react-icons/fa";
import {
  SiTypescript,
  SiPostgresql,
  SiTailwindcss,
  SiNextdotjs,
  SiVite,
  SiFigma,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

// Define uma interface para as habilidades
interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  category: "frontend" | "backend" | "other";
  color: string;
  description: string;
  relatedProjects?: {
    id: number;
    title: string;
    description: string;
    image: string;
  }[];
}

// Interface para partículas decorativas
interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

// Componente para renderizar cada habilidade individual (memoizado)
const SkillCard = memo(
  ({ skill, onClick }: { skill: Skill; onClick: (skill: Skill) => void }) => {
    return (
      <div
        className="skill-card bg-card-bg rounded-lg p-4 shadow-md transform transition-all duration-300 cursor-pointer"
        onClick={() => onClick(skill)}
        style={{ "--random": Math.random() } as React.CSSProperties}
      >
        <div className="flex items-center mb-4">
          <div
            className="icon-wrapper p-3 rounded-full mr-3"
            style={{ backgroundColor: `${skill.color}20` }}
          >
            <div style={{ color: skill.color }}>{skill.icon}</div>
          </div>
          <h3 className="text-lg font-semibold">{skill.name}</h3>
        </div>
        <div className="progress-container bg-gray-700 bg-opacity-20 h-2 rounded-full overflow-hidden">
          <div
            className="progress-inner h-full rounded-full"
            style={{
              width: `${skill.level}%`,
              backgroundColor: skill.color,
            }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-text-light">
          {skill.level}% proficiency
        </div>
      </div>
    );
  }
);
SkillCard.displayName = "SkillCard";

// Componente memoizado para decoração com partículas
const ParticlesDecoration = memo(({ particles }: { particles: Particle[] }) => {
  return (
    <div className="particles-container absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, index) => (
        <div
          key={`particle-${index}`}
          className="particle absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: 0.3,
            animationDelay: `${particle.delay}s`,
          }}
        ></div>
      ))}
    </div>
  );
});
ParticlesDecoration.displayName = "ParticlesDecoration";

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Lista de habilidades com cores oficiais, descrições e ícones mais precisos
  const skills: Skill[] = [
    {
      name: "React",
      level: 90,
      icon: <FaReact size={36} />,
      category: "frontend",
      color: "#61DAFB",
      description:
        "Biblioteca JavaScript para construção de interfaces de usuário com componentes reutilizáveis e estado gerenciável.",
      relatedProjects: [
        {
          id: 1,
          title: "E-commerce Moderno",
          description:
            "Um site de e-commerce completo com integração de pagamento, carrinho de compras e painel administrativo.",
          image: "/foodie-ecommerce.jpeg",
        },
        {
          id: 2,
          title: "App de Tarefas",
          description:
            "Aplicativo de gerenciamento de tarefas com funcionalidades de arrastar e soltar, categorias e lembretes.",
          image: "/assets/project2.jpg",
        },
      ],
    },
    {
      name: "JavaScript",
      level: 85,
      icon: <FaJsSquare size={32} />,
      category: "frontend",
      color: "#F7DF1E",
      description:
        "Linguagem de programação que permite implementar recursos interativos em páginas web.",
      relatedProjects: [
        {
          id: 5,
          title: "Website Responsivo",
          description:
            "Site institucional responsivo com animações suaves e otimizado para SEO.",
          image: "/assets/Responsive web design.jpeg",
        },
      ],
    },
    {
      name: "TypeScript",
      level: 80,
      icon: <SiTypescript size={28} />,
      category: "frontend",
      color: "#3178C6",
      description:
        "Superset do JavaScript que adiciona tipagem estática, melhorando a manutenção e escalabilidade do código.",
      relatedProjects: [
        {
          id: 3,
          title: "Dashboard Analytics",
          description:
            "Painel administrativo para visualização de dados e métricas de desempenho de negócios.",
          image: "/assets/project3.jpg",
        },
      ],
    },
    {
      name: "HTML5",
      level: 95,
      icon: <FaHtml5 size={32} />,
      category: "frontend",
      color: "#E34F26",
      description:
        "Linguagem de marcação para estruturar e apresentar conteúdo na web, com suporte a recursos modernos.",
    },
    {
      name: "CSS3",
      level: 90,
      icon: <FaCss3Alt size={32} />,
      category: "frontend",
      color: "#1572B6",
      description:
        "Linguagem de estilo usada para descrever a apresentação de documentos HTML, com layouts flexíveis e responsivos.",
    },
    {
      name: "Node.js",
      level: 80,
      icon: <FaNodeJs size={32} />,
      category: "backend",
      color: "#339933",
      description:
        "Ambiente de execução JavaScript server-side, permitindo construir aplicações escaláveis e em tempo real.",
    },
    {
      name: "Git",
      level: 85,
      icon: <FaGitAlt size={32} />,
      category: "other",
      color: "#F05032",
      description:
        "Sistema de controle de versão distribuído para rastrear mudanças no código-fonte durante o desenvolvimento.",
    },
    {
      name: "NPM",
      level: 85,
      icon: <FaNpm size={36} />,
      category: "other",
      color: "#CB3837",
      description:
        "Gerenciador de pacotes para JavaScript, permitindo compartilhar e reutilizar código.",
    },
    {
      name: "Docker",
      level: 70,
      icon: <FaDocker size={36} />,
      category: "backend",
      color: "#2496ED",
      description:
        "Plataforma para desenvolvimento, envio e execução de aplicações em contêineres isolados.",
    },
    {
      name: "SQL",
      level: 70,
      icon: <SiPostgresql size={28} />,
      category: "backend",
      color: "#336791",
      description:
        "Linguagem de consulta estruturada para gerenciar e consultar bancos de dados relacionais.",
    },
    {
      name: "Tailwind CSS",
      level: 85,
      icon: <SiTailwindcss size={28} />,
      category: "frontend",
      color: "#06B6D4",
      description:
        "Framework CSS utilitário para criar designs personalizados sem sair do HTML.",
      relatedProjects: [
        {
          id: 2,
          title: "App de Tarefas",
          description:
            "Aplicativo de gerenciamento de tarefas com funcionalidades de arrastar e soltar, categorias e lembretes.",
          image: "/assets/project2.jpg",
        },
      ],
    },
    {
      name: "Next.js",
      level: 75,
      icon: <SiNextdotjs size={28} />,
      category: "frontend",
      color: "#000000",
      description:
        "Framework React para produção com renderização híbrida, rotas e otimização.",
      relatedProjects: [
        {
          id: 1,
          title: "E-commerce Moderno",
          description:
            "Um site de e-commerce completo com integração de pagamento, carrinho de compras e painel administrativo.",
          image: "/foodie-ecommerce.jpeg",
        },
      ],
    },
    {
      name: "Sass",
      level: 85,
      icon: <FaSass size={32} />,
      category: "frontend",
      color: "#CC6699",
      description:
        "Pré-processador CSS que adiciona recursos avançados como variáveis, mixins e aninhamento, tornando o CSS mais poderoso e manutenível.",
      relatedProjects: [
        {
          id: 5,
          title: "Website Responsivo",
          description:
            "Site institucional responsivo com animações suaves e otimizado para SEO.",
          image: "/assets/Responsive web design.jpeg",
        },
      ],
    },
    {
      name: "Figma",
      level: 80,
      icon: <SiFigma size={28} />,
      category: "frontend",
      color: "#F24E1E",
      description:
        "Ferramenta de design de interface colaborativa baseada na web para criar protótipos e designs de alta fidelidade.",
    },
    {
      name: "WordPress",
      level: 75,
      icon: <FaWordpress size={32} />,
      category: "frontend",
      color: "#21759B",
      description:
        "Sistema de gerenciamento de conteúdo que permite criar e manter sites dinâmicos com facilidade.",
    },
    {
      name: "Vite",
      level: 80,
      icon: <SiVite size={28} />,
      category: "frontend",
      color: "#646CFF",
      description:
        "Ferramenta de build moderna que oferece uma experiência de desenvolvimento mais rápida e eficiente para projetos web.",
    },
  ];

  // Gerar partículas decorativas
  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const colors = ["#9b59b6", "#8e44ad", "#c39bd3", "#a66bbe"];

      for (let i = 0; i < 12; i++) {
        newParticles.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 5,
        });
      }

      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  // Filtrar habilidades com base na categoria ativa
  const filteredSkills = useCallback(() => {
    return activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  // Animação para barras de progresso
  const animateProgressBars = useCallback(() => {
    gsap.fromTo(
      ".progress-inner",
      { width: 0 },
      {
        width: "var(--progress-width)",
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.1,
      }
    );
  }, []);

  // Efeito para garantir visibilidade da seção (otimizado)
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

          // Animar partículas
          if (particlesRef.current) {
            const particleElements =
              particlesRef.current.querySelectorAll(".particle");
            particleElements.forEach((particle, index) => {
              // Limitar a quantidade de animações GSAP para melhorar o desempenho
              if (index < 8) {
                gsap.to(particle, {
                  y: `random(-30, 30)`,
                  x: `random(-30, 30)`,
                  duration: `random(3, 8)`,
                  delay: index * 0.1,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                });
              }
            });
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, [animateProgressBars]);

  // Efeito para rastrear posição do mouse para iluminação interativa (otimizado)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;

      // Usar requestAnimationFrame para limitar as atualizações
      requestAnimationFrame(() => {
        const sectionRect = sectionRef.current!.getBoundingClientRect();
        const x = ((e.clientX - sectionRect.left) / sectionRect.width) * 100;
        const y = ((e.clientY - sectionRect.top) / sectionRect.height) * 100;
        setMousePosition({ x, y });

        // Limitar a quantidade de cards que podem ser afetados pelo efeito de iluminação
        const cards = document.querySelectorAll(".skill-card");
        const visibleCards = Array.from(cards).slice(0, 8); // Limitar a 8 cards

        visibleCards.forEach((card) => {
          const cardRect = card.getBoundingClientRect();
          const cardX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
          const cardY = ((e.clientY - cardRect.top) / cardRect.height) * 100;

          if (cardX >= 0 && cardX <= 100 && cardY >= 0 && cardY <= 100) {
            (card as HTMLElement).style.setProperty("--x", `${cardX}%`);
            (card as HTMLElement).style.setProperty("--y", `${cardY}%`);
          }
        });
      });
    };

    // Usar um throttle para o evento mousemove
    let ticking = false;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", throttledMouseMove);
    return () => window.removeEventListener("mousemove", throttledMouseMove);
  }, []);

  // Função para mudar a categoria ativa com animação aprimorada
  const handleCategoryChange = useCallback(
    (category: string) => {
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
    setSelectedSkill(skill);

    // Animar a exibição do modal com detalhes - usando uma timeline mais simples
    if (document.getElementById("skill-detail-modal")) {
      // Timeline para animar os elementos do modal em sequência
      const tl = gsap.timeline();

      tl.fromTo(
        "#skill-detail-modal",
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        }
      )
        .fromTo(
          "#skill-icon",
          {
            opacity: 0,
            scale: 0.5,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
          },
          "-=0.2"
        )
        .fromTo(
          "#skill-progress",
          {
            width: "0%",
            opacity: 0,
          },
          {
            width: `${skill.level}%`,
            opacity: 1,
            duration: 1,
          },
          "-=0.2"
        );
    }
  }, []);

  // Função para fechar o modal
  const handleCloseModal = useCallback(() => {
    // Animar o fechamento do modal
    gsap.to("#skill-detail-modal", {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setSelectedSkill(null);
      },
    });
  }, []);

  // Função para navegar para um projeto específico
  const navigateToProject = (projectId: number) => {
    const projectSection = document.getElementById("portfolio-section");
    if (projectSection) {
      setSelectedSkill(null); // Fecha o modal de habilidade

      // Pequeno atraso para garantir que o modal de habilidade esteja fechado
      setTimeout(() => {
        projectSection.scrollIntoView({ behavior: "smooth" });

        // Dispara um evento customizado para abrir o modal do projeto
        const event = new CustomEvent("openProjectModal", {
          detail: { projectId },
        });
        document.dispatchEvent(event);
      }, 300);
    }
  };

  // Efeito para adicionar e remover o listener do evento
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedSkill) {
        setSelectedSkill(null);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [selectedSkill]);

  // Renderização com React.memo e componentes otimizados
  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-container bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Título da seção */}
        <h2
          ref={titleRef}
          className="text-4xl font-bold text-center mb-8 text-primary relative z-10"
        >
          Minhas Habilidades
        </h2>
        <p className="text-text-light text-center max-w-2xl mx-auto mb-12">
          Sou especializado no desenvolvimento de aplicações web modernas,
          utilizando as tecnologias mais recentes e boas práticas de
          programação.
        </p>

        {/* Filtros de categoria */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            className={`category-button px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-primary text-white"
                : "bg-card-bg text-text-light hover:bg-primary hover:bg-opacity-10"
            }`}
            onClick={() => handleCategoryChange("all")}
          >
            Todas
          </button>
          <button
            className={`category-button px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === "frontend"
                ? "bg-primary text-white"
                : "bg-card-bg text-text-light hover:bg-primary hover:bg-opacity-10"
            }`}
            onClick={() => handleCategoryChange("frontend")}
          >
            Frontend
          </button>
          <button
            className={`category-button px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === "backend"
                ? "bg-primary text-white"
                : "bg-card-bg text-text-light hover:bg-primary hover:bg-opacity-10"
            }`}
            onClick={() => handleCategoryChange("backend")}
          >
            Backend
          </button>
          <button
            className={`category-button px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === "other"
                ? "bg-primary text-white"
                : "bg-card-bg text-text-light hover:bg-primary hover:bg-opacity-10"
            }`}
            onClick={() => handleCategoryChange("other")}
          >
            Outras
          </button>
        </div>

        {/* Grade de habilidades */}
        <div
          ref={skillsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills().map((skill, index) => (
            <SkillCard
              key={`skill-${index}`}
              skill={skill}
              onClick={handleSkillClick}
            />
          ))}
        </div>

        {/* Contêiner de partículas */}
        <div ref={particlesRef}>
          <ParticlesDecoration particles={particles} />
        </div>
      </div>

      {/* Modal de detalhes da habilidade */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
          <div
            id="skill-detail-modal"
            className="bg-card-bg rounded-xl p-6 max-w-4xl w-full opacity-0 transform styled-scrollbar"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            {/* Conteúdo do modal */}
            {/* ... o resto é mantido igual ... */}
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(SkillsSection);
