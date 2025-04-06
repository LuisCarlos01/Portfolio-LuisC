import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
} from "react-icons/fa";
import { 
  SiTypescript, 
  SiMongodb, 
  SiPostgresql,
  SiTailwindcss,
  SiNextdotjs,
  SiRedux,
  SiVite,
  SiExpress
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
}

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Lista de habilidades com cores oficiais, descrições e ícones mais precisos
  const skills: Skill[] = [
    {
      name: "React",
      level: 90,
      icon: <FaReact size={36} />,
      category: "frontend",
      color: "#61DAFB",
      description: "Biblioteca JavaScript para construção de interfaces de usuário com componentes reutilizáveis e estado gerenciável."
    },
    {
      name: "JavaScript",
      level: 85,
      icon: <FaJsSquare size={32} />,
      category: "frontend",
      color: "#F7DF1E",
      description: "Linguagem de programação que permite implementar recursos interativos em páginas web."
    },
    {
      name: "TypeScript",
      level: 80,
      icon: <SiTypescript size={28} />,
      category: "frontend",
      color: "#3178C6",
      description: "Superset do JavaScript que adiciona tipagem estática, melhorando a manutenção e escalabilidade do código."
    },
    {
      name: "HTML5",
      level: 95,
      icon: <FaHtml5 size={32} />,
      category: "frontend",
      color: "#E34F26",
      description: "Linguagem de marcação para estruturar e apresentar conteúdo na web, com suporte a recursos modernos."
    },
    {
      name: "CSS3",
      level: 90,
      icon: <FaCss3Alt size={32} />,
      category: "frontend",
      color: "#1572B6",
      description: "Linguagem de estilo usada para descrever a apresentação de documentos HTML, com layouts flexíveis e responsivos."
    },
    {
      name: "Node.js",
      level: 80,
      icon: <FaNodeJs size={32} />,
      category: "backend",
      color: "#339933",
      description: "Ambiente de execução JavaScript server-side, permitindo construir aplicações escaláveis e em tempo real."
    },
    {
      name: "Git",
      level: 85,
      icon: <FaGitAlt size={32} />,
      category: "other",
      color: "#F05032",
      description: "Sistema de controle de versão distribuído para rastrear mudanças no código-fonte durante o desenvolvimento."
    },
    {
      name: "NPM",
      level: 85,
      icon: <FaNpm size={36} />,
      category: "other",
      color: "#CB3837",
      description: "Gerenciador de pacotes para JavaScript, permitindo compartilhar e reutilizar código."
    },
    {
      name: "Docker",
      level: 70,
      icon: <FaDocker size={36} />,
      category: "backend",
      color: "#2496ED",
      description: "Plataforma para desenvolvimento, envio e execução de aplicações em contêineres isolados."
    },
    {
      name: "MongoDB",
      level: 75,
      icon: <SiMongodb size={28} />,
      category: "backend",
      color: "#47A248",
      description: "Banco de dados NoSQL orientado a documentos, ideal para aplicações com dados não estruturados."
    },
    {
      name: "SQL",
      level: 70,
      icon: <SiPostgresql size={28} />,
      category: "backend",
      color: "#336791",
      description: "Linguagem de consulta estruturada para gerenciar e consultar bancos de dados relacionais."
    },
    {
      name: "Tailwind CSS",
      level: 85,
      icon: <SiTailwindcss size={28} />,
      category: "frontend",
      color: "#06B6D4",
      description: "Framework CSS utilitário para criar designs personalizados sem sair do HTML."
    },
    {
      name: "Next.js",
      level: 75,
      icon: <SiNextdotjs size={28} />,
      category: "frontend",
      color: "#000000",
      description: "Framework React para produção com renderização híbrida, rotas e otimização."
    },
    {
      name: "Express",
      level: 80,
      icon: <SiExpress size={28} />,
      category: "backend",
      color: "#000000",
      description: "Framework web minimalista para Node.js que facilita a criação de APIs e servidores web."
    },
    {
      name: "Redux",
      level: 75,
      icon: <SiRedux size={28} />,
      category: "frontend",
      color: "#764ABC",
      description: "Biblioteca para gerenciamento de estado em aplicações JavaScript, comumente usada com React."
    },
    {
      name: "UI/UX Design",
      level: 75,
      icon: <FaFigma size={28} />,
      category: "frontend",
      color: "#F24E1E",
      description: "Design de interfaces e experiências que proporcionam usabilidade e satisfação aos usuários."
    }
  ];

  // Filtrar habilidades com base na categoria ativa
  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  // Efeito para garantir visibilidade da seção
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.display = "block";
      sectionRef.current.style.opacity = "1";
      sectionRef.current.style.zIndex = "1";
      sectionRef.current.style.visibility = "visible";
    }
  }, []);

  // Função para mudar a categoria ativa
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSelectedSkill(null);
    
    // Animar as barras de progresso após a mudança de categoria
    setTimeout(() => {
      animateProgressBars();
    }, 300);
  };

  // Função para mostrar detalhes da habilidade
  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
    
    // Animar a exibição do modal com detalhes
    if (document.getElementById('skill-detail-modal')) {
      gsap.fromTo(
        '#skill-detail-modal',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  };

  // Função para animar as barras de progresso
  const animateProgressBars = () => {
    if (!skillsRef.current) return;
    
    const progressBars = skillsRef.current.querySelectorAll('.progress-inner');
    const skillCards = skillsRef.current.querySelectorAll('.skill-card');
    
    if (progressBars.length > 0) {
      progressBars.forEach((bar, index) => {
        if (index < skillCards.length) {
          const skillLevel = skillCards[index].getAttribute("data-level") || "0";
          
          gsap.to(bar, {
            width: `${skillLevel}%`,
            duration: 1,
            ease: "power1.out",
            delay: 0.1 * index,
          });
        }
      });
    }
  };

  // Inicializar animações baseadas em scroll
  useEffect(() => {
    if (sectionRef.current) {
      // Detectar quando a seção fica visível na tela
      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%", 
        onEnter: () => {
          setIsVisible(true);
          
          // Animar título quando a seção ficar visível
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
          );

          // Animar cards de habilidades
          const skillCards = skillsRef.current?.querySelectorAll(".skill-card");
          if (skillCards?.length) {
            gsap.fromTo(
              skillCards,
              { opacity: 0, y: 50, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.2)",
                onComplete: animateProgressBars
              }
            );
          }
        }
      });

      return () => {
        // Limpar o ScrollTrigger quando o componente for desmontado
        scrollTrigger.kill();
      };
    }
  }, []);

  // Inicializar as barras de progresso quando a categoria mudar
  useEffect(() => {
    if (isVisible) {
      // Pequeno atraso para garantir que os elementos DOM estejam prontos
      setTimeout(animateProgressBars, 300);
    }
  }, [activeCategory, isVisible]);

  return (
    <section
      ref={sectionRef}
      id="skills-section"
      className="py-20 bg-background section-container"
    >
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-4xl font-bold text-center mb-16 text-text-light"
        >
          Minhas <span className="text-primary">Habilidades</span>
        </h2>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === 'all' ? 'bg-primary text-white' : 'bg-card-bg text-text-light hover:bg-primary/20'}`}
              onClick={() => handleCategoryChange('all')}
            >
              Todas
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === 'frontend' ? 'bg-primary text-white' : 'bg-card-bg text-text-light hover:bg-primary/20'}`}
              onClick={() => handleCategoryChange('frontend')}
            >
              Frontend
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === 'backend' ? 'bg-primary text-white' : 'bg-card-bg text-text-light hover:bg-primary/20'}`}
              onClick={() => handleCategoryChange('backend')}
            >
              Backend
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === 'other' ? 'bg-primary text-white' : 'bg-card-bg text-text-light hover:bg-primary/20'}`}
              onClick={() => handleCategoryChange('other')}
            >
              Outras
            </button>
          </div>
        </div>

        <div
          ref={skillsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="skill-card bg-card-bg rounded-lg p-6 shadow-lg transition-all duration-300 cursor-pointer hover:shadow-xl hover:translate-y-[-5px]"
              data-level={skill.level}
              data-category={skill.category}
              onClick={() => handleSkillClick(skill)}
            >
              <div className="flex items-center mb-4">
                <div className="mr-3" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <h3 className="text-lg font-semibold text-text-light">
                  {skill.name}
                </h3>
              </div>

              <div className="progress-bar bg-gray-700 h-3 rounded-full overflow-hidden">
                <div
                  className="progress-inner h-full rounded-full w-0"
                  style={{ backgroundColor: skill.color }}
                ></div>
              </div>

              <div className="mt-2 text-right">
                <span className="text-sm font-medium" style={{ color: skill.color }}>
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de detalhes da habilidade */}
        {selectedSkill && (
          <div className="fixed inset-0 bg-bg-dark/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedSkill(null)}>
            <div 
              id="skill-detail-modal"
              className="bg-card-bg p-6 rounded-lg shadow-2xl max-w-lg w-full" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4" style={{ color: selectedSkill.color }}>
                  {selectedSkill.icon}
                </div>
                <h3 className="text-2xl font-bold text-text-light">{selectedSkill.name}</h3>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-text-light">Nível de Proficiência</span>
                  <span className="font-medium" style={{ color: selectedSkill.color }}>{selectedSkill.level}%</span>
                </div>
                <div className="progress-bar bg-gray-700 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      backgroundColor: selectedSkill.color,
                      width: `${selectedSkill.level}%`
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-text-light font-medium mb-2">Descrição</h4>
                <p className="text-text-light opacity-80">{selectedSkill.description}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-text-light font-medium mb-2">Categoria</h4>
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: `${selectedSkill.color}20`,
                    color: selectedSkill.color
                  }}
                >
                  {selectedSkill.category === 'frontend' ? 'Frontend' : 
                   selectedSkill.category === 'backend' ? 'Backend' : 'Ferramentas'}
                </span>
              </div>
              
              <button 
                className="w-full py-2 rounded-lg font-medium transition-colors bg-card-bg hover:bg-primary hover:text-white border border-primary text-primary"
                onClick={() => setSelectedSkill(null)}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;