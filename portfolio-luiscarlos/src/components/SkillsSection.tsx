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
  FaPython,
  FaRocket,
} from "react-icons/fa";
import {
  SiTypescript,
  SiPostgresql,
  SiTailwindcss,
  SiNextdotjs,
  SiVite,
  SiFigma,
  SiCplusplus,
  SiCsharp,
  SiGreensock,
  SiReactrouter,
} from "react-icons/si";
import { AiFillHtml5 } from "react-icons/ai";
import {
  DiCss3Full,
  DiSass,
  DiReact,
  DiJavascript1,
  DiNodejsSmall,
  DiNpm,
  DiDocker,
  DiMysql,
  DiGit,
} from "react-icons/di";
import { HiArrowSmDown } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { FaTimes } from "react-icons/fa";

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

// Componente para renderizar cada habilidade individual (memoizado)
const SkillCard = memo(
  ({
    skill,
    onClick,
    isActive,
  }: {
    skill: Skill;
    onClick: (skill: Skill) => void;
    isActive: boolean;
  }) => {
    // Usamos useRef para obter uma referência à barra de progresso
    const progressRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    // Efeito para definir a largura inicial como 0 e depois animar
    useEffect(() => {
      if (progressRef.current) {
        // Inicialmente definir como 0
        progressRef.current.style.width = "0%";

        // Depois de um pequeno delay, animar para o valor correto
        setTimeout(() => {
          gsap.to(progressRef.current, {
            width: `${skill.level}%`,
            duration: 1,
            ease: "power2.out",
          });
        }, 300);
      }
    }, [skill.level]);

    return (
      <div
        ref={cardRef}
        className={`relative bg-card-bg dark:bg-card-bg-dark p-4 rounded-lg shadow-md 
                    transition-all duration-300 transform hover:scale-105 
                    hover:shadow-lg cursor-pointer ${
                      isActive ? "scale-110 z-20" : ""
                    }`}
        onClick={() => onClick(skill)}
        data-level={skill.level}
        aria-label={`${skill.name} - ${skill.level}% ${t("proficiency")}`}
      >
        <div className="flex items-center mb-2">
          <div className="mr-3 text-3xl" style={{ color: skill.color }}>
            {skill.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary dark:text-text-primary-dark">
              {skill.name}
            </h3>
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
              {skill.category}
            </p>
          </div>
        </div>

        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-3">
          <div
            ref={progressRef}
            className="h-full rounded-full"
            style={{
              backgroundColor: skill.color,
              width: "0%", // Inicia com 0 e será animado via useEffect
            }}
          ></div>
        </div>

        <p className="text-right text-sm mt-1 text-text-secondary dark:text-text-secondary-dark">
          {skill.level}%
        </p>
      </div>
    );
  }
);
SkillCard.displayName = "SkillCard";

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { t } = useTranslation();

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
      icon: <AiFillHtml5 />,
      category: "frontend",
      color: "#E34F26",
      description:
        "Linguagem de marcação para estruturar e apresentar conteúdo na web, com suporte a recursos modernos.",
    },
    {
      name: "CSS3",
      level: 90,
      icon: <DiCss3Full />,
      category: "frontend",
      color: "#1572B6",
      description:
        "Linguagem de estilo usada para descrever a apresentação de documentos HTML, com layouts flexíveis e responsivos.",
    },
    {
      name: "Node.js",
      level: 80,
      icon: <DiNodejsSmall />,
      category: "backend",
      color: "#339933",
      description:
        "Ambiente de execução JavaScript server-side, permitindo construir aplicações escaláveis e em tempo real.",
    },
    {
      name: "Git",
      level: 85,
      icon: <DiGit />,
      category: "other",
      color: "#F05032",
      description:
        "Sistema de controle de versão distribuído para rastrear mudanças no código-fonte durante o desenvolvimento.",
    },
    {
      name: "NPM",
      level: 85,
      icon: <DiNpm />,
      category: "other",
      color: "#CB3837",
      description:
        "Gerenciador de pacotes para JavaScript, permitindo compartilhar e reutilizar código.",
    },
    {
      name: "Docker",
      level: 30,
      icon: <DiDocker />,
      category: "backend",
      color: "#2496ED",
      description:
        "Plataforma para desenvolvimento, envio e execução de aplicações em contêineres isolados.",
    },
    {
      name: "SQL",
      level: 40,
      icon: <DiMysql />,
      category: "backend",
      color: "#4479A1",
      description:
        "Linguagem de consulta estruturada para gerenciar e consultar bancos de dados relacionais.",
    },
    {
      name: "Tailwind CSS",
      level: 85,
      icon: <SiTailwindcss />,
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
      icon: <SiNextdotjs />,
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
      icon: <DiSass />,
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
      level: 25,
      icon: <SiFigma />,
      category: "frontend",
      color: "#F24E1E",
      description:
        "Ferramenta de design de interface colaborativa baseada na web para criar protótipos e designs de alta fidelidade.",
    },
    {
      name: "WordPress",
      level: 50,
      icon: <FaWordpress size={32} />,
      category: "frontend",
      color: "#21759B",
      description:
        "Sistema de gerenciamento de conteúdo que permite criar e manter sites dinâmicos com facilidade.",
    },
    {
      name: "Vite",
      level: 80,
      icon: <SiVite />,
      category: "frontend",
      color: "#646CFF",
      description:
        "Ferramenta de build moderna que oferece uma experiência de desenvolvimento mais rápida e eficiente para projetos web.",
    },
    {
      name: "Python",
      level: 30,
      icon: <FaPython size={32} />,
      category: "backend",
      color: "#3776AB",
      description:
        "Linguagem de programação de alto nível, interpretada e de propósito geral, com foco em legibilidade de código e produtividade.",
    },
    {
      name: "C++",
      level: 30,
      icon: <SiCplusplus />,
      category: "backend",
      color: "#00599C",
      description:
        "Linguagem de programação de propósito geral que oferece um alto nível de controle sobre a gestão de memória e recursos do sistema.",
    },
    {
      name: "C#",
      level: 30,
      icon: <SiCsharp />,
      category: "backend",
      color: "#239120",
      description:
        "Linguagem de programação moderna, orientada a objetos, desenvolvida pela Microsoft como parte da plataforma .NET.",
    },
    {
      name: "GSAP",
      level: 75,
      icon: <SiGreensock size={28} />,
      category: "frontend",
      color: "#88CE02",
      description: t("gsap_description"),
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
      name: "React Router",
      level: 85,
      icon: <SiReactrouter size={28} />,
      category: "frontend",
      color: "#CA4245",
      description: t("react_router_description"),
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
  ];

  // Filtrar habilidades com base na categoria ativa
  const filteredSkills = useCallback(() => {
    return activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  // Função para animar as barras de progresso
  const animateProgressBars = useCallback(() => {
    if (!skillsRef.current) return;
    console.log("Iniciando animação das barras de progresso");

    const progressBars = skillsRef.current.querySelectorAll(".progress-inner");
    const skillCards = skillsRef.current.querySelectorAll(".skill-card");

    console.log(
      `Encontradas ${progressBars.length} barras de progresso e ${skillCards.length} cards`
    );

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
            onStart: () => {
              console.log(`Animando barra ${index} para ${skillLevel}%`);
            },
            onComplete: () => {
              console.log(`Barra ${index} animada para ${skillLevel}%`);
              // Garantir que a barra tenha a largura correta após a animação
              (bar as HTMLElement).style.width = `${skillLevel}%`;
            },
          });
        }
      });
    } else {
      console.log("Nenhuma barra de progresso encontrada");
    }
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
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, [animateProgressBars]);

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

  // Função para mostrar detalhes da habilidade de forma mais suave
  const handleSkillClick = (skill: Skill) => {
    console.log(`Clicado na habilidade ${skill.name}`);

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

      // Aguarda um pouco para o modal ser renderizado antes de rolar até ele
      setTimeout(() => {
        // Garantir que o modal seja exibido no viewport
        const modalElement = document.getElementById("skill-detail-modal");
        if (modalElement) {
          // Impede scrolling da página principal
          document.body.style.overflow = "hidden";

          // Rola a página até o centro do modal para garantir visibilidade
          const modalRect = modalElement.getBoundingClientRect();
          const modalCenter =
            modalRect.top + window.scrollY + modalRect.height / 2;
          const windowCenter = window.innerHeight / 2;

          window.scrollTo({
            top: modalCenter - windowCenter,
            behavior: "smooth",
          });
        }

        // Remove os efeitos após um tempo
        setTimeout(() => {
          document.body.classList.remove("modal-transition");
          cards.forEach((card) => {
            gsap.to(card, {
              scale: 1,
              opacity: 1,
              boxShadow: "none",
              duration: 0.3,
            });
          });
        }, 800);
      }, 100);
    }, 300);
  };

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
          // Remover a classe de rolagem suave após o fechamento do modal
          document.documentElement.classList.remove("smooth-scroll");
        },
      });
    }
  }, []);

  // Função para navegar para um projeto específico
  const navigateToProject = (projectId: number) => {
    const projectSection = document.getElementById("portfolio-section");
    if (projectSection) {
      setSelectedSkill(null); // Fecha o modal de habilidade

      // Restaurar a rolagem normal da página
      document.body.style.overflow = "auto";

      // Pequeno atraso para garantir que o modal de habilidade esteja fechado
      setTimeout(() => {
        // Primeiro, rolamos até a seção de portfólio
        projectSection.scrollIntoView({ behavior: "smooth" });

        // Então, esperamos a rolagem completar antes de abrir o modal do projeto
        setTimeout(() => {
          // Dispara um evento customizado para abrir o modal do projeto
          const event = new CustomEvent("openProjectModal", {
            detail: { projectId },
          });
          document.dispatchEvent(event);

          // Adicionamos uma notificação visual para indicar que um projeto está sendo aberto
          const notification = document.createElement("div");
          notification.className =
            "fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-full shadow-lg z-50";
          notification.textContent = "Abrindo projeto...";
          notification.style.opacity = "0";
          document.body.appendChild(notification);

          // Animação da notificação
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
              }, 1500);
            },
          });
        }, 800); // Tempo suficiente para a rolagem ser concluída
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

  // Adicione esta função auxiliar antes do return final do componente
  const getApplicationAreas = (skill: Skill) => {
    // Definir áreas de aplicação comuns para cada habilidade
    const commonAreas = {
      frontend: [
        {
          title: "Interfaces de Usuário",
          description:
            "Desenvolvimento de componentes interativos e responsivos",
        },
        {
          title: "Animações",
          description: "Criação de efeitos visuais e transições suaves",
        },
        {
          title: "Otimização",
          description: "Melhoria de performance e experiência do usuário",
        },
      ],
      backend: [
        {
          title: "APIs",
          description: "Desenvolvimento de serviços web e endpoints",
        },
        {
          title: "Banco de Dados",
          description: "Manipulação e otimização de dados",
        },
        {
          title: "Segurança",
          description: "Implementação de autenticação e autorização",
        },
      ],
      other: [
        {
          title: "Produtividade",
          description: "Ferramentas para agilizar o desenvolvimento",
        },
        {
          title: "DevOps",
          description: "Integração e entrega contínua",
        },
        {
          title: "Colaboração",
          description: "Ferramentas para trabalho em equipe",
        },
      ],
    };

    // Áreas específicas para tecnologias mais populares
    const specificAreas: Record<
      string,
      Array<{ title: string; description: string }>
    > = {
      React: [
        {
          title: "Componentes",
          description: "Criação e gerenciamento de componentes reutilizáveis",
        },
        {
          title: "Hooks",
          description: "Utilização de estados e efeitos para lógica funcional",
        },
        {
          title: "Context API",
          description: "Gerenciamento de estado global na aplicação",
        },
      ],
      JavaScript: [
        { title: "DOM", description: "Manipulação de elementos da página" },
        {
          title: "Assíncrono",
          description: "Promises, async/await e callbacks",
        },
        {
          title: "APIs Browser",
          description: "WebSockets, LocalStorage, Service Workers",
        },
      ],
      TypeScript: [
        {
          title: "Type Safety",
          description: "Desenvolvimento com segurança de tipos",
        },
        {
          title: "Interfaces",
          description: "Definição clara de contratos de dados",
        },
        {
          title: "Generics",
          description: "Componentes e funções reutilizáveis com tipagem",
        },
      ],
      "Node.js": [
        {
          title: "Servidores",
          description: "Desenvolvimento de aplicações server-side",
        },
        {
          title: "Módulos",
          description: "Criação e utilização de pacotes npm",
        },
        { title: "Streams", description: "Processamento eficiente de dados" },
      ],
    };

    // Verificar se existem áreas específicas para esta habilidade
    if (specificAreas[skill.name]) {
      return specificAreas[skill.name];
    }

    // Caso contrário, retornar áreas comuns para a categoria
    return commonAreas[skill.category];
  };

  // Adicionar um useEffect para animar o modal após ele ser renderizado
  useEffect(() => {
    if (selectedSkill && document.getElementById("skill-detail-modal")) {
      console.log("Modal renderizado, iniciando animação");

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
            rotate: -30,
            scale: 0.5,
          },
          {
            opacity: 1,
            rotate: 0,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        )
        .fromTo(
          "#skill-info > *",
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out",
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
            width: `${selectedSkill.level}%`,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          "-=0.2"
        )
        .fromTo(
          "#related-projects .project-item",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.5"
        );

      // Foca no modal para melhorar acessibilidade
      const modalElement = document.getElementById("skill-detail-modal");
      if (modalElement) {
        modalElement.focus();

        // Impede scrolling da página principal
        document.body.style.overflow = "hidden";
      }
    }

    return () => {
      // Restaura scrolling quando o modal é fechado
      document.body.style.overflow = "auto";
    };
  }, [selectedSkill]);

  // Função para rolar o modal para baixo
  const handleScrollDown = () => {
    const modal = document.getElementById("skill-detail-modal");
    if (modal) {
      // Obter a posição atual de rolagem
      const currentScroll = modal.scrollTop;

      // Definir a quantidade de pixels para rolar (300px para baixo)
      const targetScroll = currentScroll + 300;

      // Animar a rolagem com GSAP para uma experiência suave
      gsap.to(modal, {
        scrollTop: targetScroll,
        duration: 0.8,
        ease: "power2.out",
      });

      console.log("Rolando o modal de", currentScroll, "para", targetScroll);
    } else {
      console.warn("Modal não encontrado para rolagem");
    }
  };

  // Renderização com React.memo e componentes otimizados
  return (
    <section
      id="skills-section"
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
              isActive={selectedSkill === skill}
            />
          ))}
        </div>
      </div>

      {/* Modal de detalhes da habilidade - Melhorias na navegação */}
      {selectedSkill && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm modal-overlay overflow-y-auto"
          onClick={(e) => {
            // Fechar o modal ao clicar fora dele
            if ((e.target as Element).classList.contains("modal-overlay")) {
              handleCloseModal();
            }
          }}
        >
          <div
            id="skill-detail-modal"
            className="bg-card-bg rounded-2xl p-8 max-w-4xl w-full opacity-0 transform styled-scrollbar shadow-xl border border-primary/10 my-10 relative"
            style={{
              maxHeight: "80vh",
              overflowY: "auto",
              background: `linear-gradient(135deg, var(--color-card-bg), var(--color-card-bg) 60%, ${selectedSkill.color}10, var(--color-card-bg))`,
              boxShadow: `0 20px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px ${selectedSkill.color}20, 0 0 20px ${selectedSkill.color}15`,
            }}
          >
            {/* Elementos decorativos - Restaurados */}
            <div
              className="absolute top-0 right-0 w-40 h-40 opacity-10 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${selectedSkill.color}, transparent 70%)`,
                filter: "blur(30px)",
              }}
            ></div>
            <div
              className="absolute bottom-0 left-10 w-60 h-60 opacity-5 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${selectedSkill.color}, transparent 70%)`,
                filter: "blur(40px)",
              }}
            ></div>

            {/* Indicador de rolagem para melhorar a usabilidade */}
            <div
              className="absolute bottom-4 right-4 text-text-light text-xs scroll-indicator opacity-70 z-10 cursor-pointer hover:opacity-100 transition-opacity"
              onClick={handleScrollDown}
            >
              <div className="flex flex-col items-center p-2 bg-gray-800 bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mb-1 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                <span>Rolar para ver mais</span>
              </div>
            </div>

            {/* Botão flutuante para fechar o modal - mais visível */}
            <button
              onClick={handleCloseModal}
              className="modal-close-btn fixed top-4 right-4 z-50"
              aria-label="Fechar modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Cabeçalho do modal */}
            <div className="flex flex-col md:flex-row items-start md:items-center mb-8 gap-6 relative z-10">
              {/* Ícone da habilidade */}
              <div
                id="skill-icon"
                className="p-6 rounded-2xl shadow-xl relative w-24 h-24 flex items-center justify-center"
                style={{
                  backgroundColor: `${selectedSkill.color}15`,
                  border: `1px solid ${selectedSkill.color}40`,
                  boxShadow: `0 5px 15px ${selectedSkill.color}20, inset 0 0 20px ${selectedSkill.color}10`,
                }}
              >
                {/* Efeito de brilho animado */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${selectedSkill.color}30, transparent 70%)`,
                      animation: "pulse 3s infinite ease-in-out",
                    }}
                  ></div>

                  {/* Reflexo na borda */}
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      background: `linear-gradient(135deg, ${selectedSkill.color}30, transparent 50%)`,
                      filter: "blur(5px)",
                    }}
                  ></div>
                </div>

                {/* Partículas decorativas dentro do ícone */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full animate-ping-slow"
                      style={{
                        backgroundColor: selectedSkill.color,
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                        animationDelay: `${i * 0.5}s`,
                        opacity: 0.7,
                        filter: `blur(${Math.random() > 0.7 ? 1 : 0}px)`,
                      }}
                    ></div>
                  ))}
                </div>

                <div
                  className="text-4xl relative z-10"
                  style={{ color: selectedSkill.color }}
                >
                  {selectedSkill.icon}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 flex items-center">
                  {selectedSkill.name}
                  <span
                    className="ml-3 text-xs px-3 py-1 rounded-full text-white inline-flex items-center"
                    style={{
                      background: `linear-gradient(135deg, ${selectedSkill.color}, ${selectedSkill.color}80)`,
                    }}
                  >
                    {selectedSkill.category === "frontend"
                      ? "Frontend"
                      : selectedSkill.category === "backend"
                      ? "Backend"
                      : "Outras Ferramentas"}
                  </span>
                </h3>

                {/* Barra de progresso extremamente aprimorada */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-text-light font-medium">
                      Nível de Proficiência
                    </span>
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: selectedSkill.color }}
                      ></div>
                      <span
                        className="font-bold text-lg"
                        style={{ color: selectedSkill.color }}
                      >
                        {selectedSkill.level}%
                      </span>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      id="skill-progress"
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: selectedSkill.color,
                        width: "0%", // Inicialmente com largura 0, será animado pelo GSAP
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Descrição da habilidade */}
            <div className="mb-10 skill-content-section">
              <h4 className="text-lg font-semibold mb-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Descrição
              </h4>
              <div className="p-5 rounded-xl bg-gray-800 bg-opacity-30 border border-gray-700">
                <p
                  className="text-text-light leading-relaxed"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                >
                  {selectedSkill.description}
                </p>
              </div>
            </div>

            {/* Áreas de aplicação */}
            <div className="mb-10 skill-content-section">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                Áreas de Aplicação
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getApplicationAreas(selectedSkill).map((area, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border border-gray-700 bg-gray-800 bg-opacity-30 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
                    style={{
                      borderLeft: `3px solid ${selectedSkill.color}`,
                    }}
                  >
                    <div className="text-lg font-medium mb-1 group-hover:text-primary transition-colors">
                      {area.title}
                    </div>
                    <p className="text-text-light text-sm">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projetos Relacionados */}
            {selectedSkill.relatedProjects &&
              selectedSkill.relatedProjects.length > 0 && (
                <div className="skill-content-section">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Projetos Relacionados
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedSkill.relatedProjects.map((project) => (
                      <div
                        key={project.id}
                        className="group relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800 bg-opacity-20 transition-all duration-300 hover:border-primary/30 hover:shadow-xl cursor-pointer transform hover:-translate-y-1"
                        onClick={() => navigateToProject(project.id)}
                      >
                        <div className="aspect-video overflow-hidden">
                          <ImageWithFallback
                            src={project.image}
                            alt={project.title}
                            fallbackSrc="/assets/placeholder.jpg"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-90"></div>
                        <div className="absolute bottom-0 left-0 p-4 w-full">
                          <h5 className="text-white font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                            {project.title}
                          </h5>
                          <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                            {project.description}
                          </p>
                          <div
                            className="flex items-center justify-center text-xs font-medium px-3 py-1.5 rounded-full w-max text-white transition-transform duration-300 group-hover:scale-105"
                            style={{ backgroundColor: selectedSkill.color }}
                          >
                            Ver Projeto{" "}
                            <FaChevronRight className="ml-1.5" size={8} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(SkillsSection);
