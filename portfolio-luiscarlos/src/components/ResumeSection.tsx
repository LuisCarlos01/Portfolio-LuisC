import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaGraduationCap,
  FaBriefcase,
  FaAward,
  FaBuilding,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaDownload,
  FaArrowRight,
  FaLaptop,
  FaUniversity,
  FaCode,
  FaReact, 
  FaHtml5,
  FaJs,
  FaTimesCircle,
  FaLightbulb,
  FaCertificate,
  FaBolt,
  FaCalendarAlt
} from 'react-icons/fa';

// Registrando o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Interface para os itens do currículo
interface ResumeItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  location?: string;
  achievements?: string[];
  icon?: string;
  color?: string;
}

// Dados de educação
const educationData: ResumeItem[] = [
  {
    id: "1",
    title: "Técnico em Informática",
    organization: "SENAI",
    period: "Concluído",
    location: "Brasil",
    description:
      "Formação técnica com foco em redes de computadores, lógica de programação, sistemas operacionais, desenvolvimento de sistemas web e manutenção de computadores.",
    achievements: [],
    icon: "laptop",
    color: "#9c27b0",
  },
  {
    id: "2",
    title: "Técnico em Eletrotécnica",
    organization: "SENAI",
    period: "Concluído",
    location: "Brasil",
    description:
      "Curso técnico voltado para projetos, instalação e manutenção de sistemas elétricos industriais, automação predial e comandos elétricos.",
    achievements: [],
    icon: "bolt",
    color: "#ba68c8",
  },
  {
    id: "3",
    title: "Graduação em Automação Industrial",
    organization: "Unicesumar",
    period: "Cursando",
    location: "Brasil",
    description:
      "Curso superior com foco em controle de processos industriais, sistemas automatizados, CLPs, instrumentação, redes industriais e robótica.",
    achievements: [],
    icon: "university",
    color: "#8e24aa",
  },
  {
    id: "4",
    title: "Formações Complementares em Programação",
    organization: "IFRS, Udemy, Estudonauta, Curso em Vídeo",
    period: "2022 - Atual",
    location: "Online",
    description:
      "Conjunto de formações práticas nas áreas de Front-End, JavaScript, HTML, CSS, lógica de programação e automação de sistemas. Destaques para os cursos:\n- HTML5 e CSS3 (Curso em Vídeo - Gustavo Guanabara)\n- Lógica de Programação (IFRS)\n- JavaScript Moderno (Udemy)\n- Desenvolvimento Web (Estudonauta)\n- Automação de Sistemas Industriais (IFRS)",
    achievements: [],
    icon: "code",
    color: "#9c27b0",
  },
];


// Dados de experiência
const experienceData: ResumeItem[] = [
  {
    id: "1",
    title: "Programador Front-End Júnior",
    organization: "iPass/Climax",
    period: "2024 - Presente",
    location: "Varginha, MG ",
    description:
      "Responsável pelo desenvolvimento e manutenção de interfaces web utilizando HTML, CSS, JavaScript e React. Apoio à criação de sistemas automatizados para atendimento ao cliente via WhatsApp, com foco em performance e usabilidade.",
    achievements: [
      "Desenvolvimento de um chatbot inteligente para atendimento de eventos e ingressos",
      "Implementação de funcionalidades interativas com React e TypeScript",
      "Aprimoramento contínuo do design e da experiência do usuário com foco em boas práticas de UI/UX",
    ],
    icon: "react",
    color: "#7b1fa2",
  },
  {
    id: "2",
    title: "Projetos Pessoais em Desenvolvimento Web",
    organization: "Freelancer / Autônomo",
    period: "2023 - 2024",
    location: "São Paulo, SP",
    description:
      "Criação de páginas web e sistemas interativos para fins de portfólio, estudo e clientes pontuais. Aplicação de metodologias modernas e foco em desenvolvimento responsivo.",
    achievements: [
      "Desenvolvimento de um quadro Kanban funcional com HTML, CSS e JavaScript",
      "Criação de um portfólio online moderno com animações e transições suaves",
      "Aplicação de boas práticas de acessibilidade e performance em projetos pessoais",
    ],
    icon: "web",
    color: "#e74c3c",
  },
  {
    id: "3",
    title: "Iniciação em Desenvolvimento de Sistemas",
    organization: "Cursos Livres e Formação Autodidata",
    period: "2022 - 2023",
    location: "Online",
    description:
      "Início da jornada na programação com foco em lógica, desenvolvimento web básico e ferramentas de automação.",
    achievements: [
      "Conclusão de cursos em HTML5, JavaScript, Lógica de Programação e Automação de Sistemas",
      "Aplicação prática dos conhecimentos em pequenos sistemas e automações pessoais",
      "Participação em comunidades de desenvolvedores e fóruns de aprendizado",
    ],
    icon: "learning",
    color: "#3498db",
  },
];


// Dados de certificações
const certificationData: ResumeItem[] = [
  {
    id: "1",
    title: "Automação de Sistemas",
    organization: "IFRS - Instituto Federal",
    period: "Jul - Nov 2024",
    description:
      "Carga horária: 30h | Aproveitamento: 81,33%\nConteúdo: Automação, Projeto de Sistemas, Robótica, Máquinas e Redes Industriais.",
    icon: "automation",
    color: "#ab47bc",
  },
  {
    id: "2",
    title: "HTML5: Fundamentos para Construção de Páginas Web Modernas",
    organization: "IFRS - Instituto Federal",
    period: "Out - Nov 2024",
    description:
      "Carga horária: 40h | Aproveitamento: 94,00%\nConteúdo: Introdução ao HTML5, Estrutura de Documentos, Imagens, Links, Listas, Tabelas e Formulários.",
    icon: "html",
    color: "#e74c3c",
  },
  {
    id: "3",
    title: "JavaScript",
    organization: "IFRS - Instituto Federal",
    period: "Jul - Nov 2024",
    description:
      "Carga horária: 30h | Aproveitamento: 75,00%\nConteúdo: Fundamentos da linguagem, manipulação de DOM, eventos e validação de formulários.",
    icon: "js",
    color: "#f1c40f",
  },
  {
    id: "4",
    title: "Lógica de Programação",
    organization: "IFRS - Instituto Federal",
    period: "Jul - Nov 2024",
    description:
      "Carga horária: 20h | Aproveitamento: 88,50%\nConteúdo: Variáveis, operadores, estruturas condicionais e de repetição utilizando Portugol Studio.",
    icon: "logic",
    color: "#9b59b6",
  },
  {
    id: "5",
    title: "Curso Completo de JavaScript (do básico ao avançado)",
    organization: "Udemy",
    period: "2023",
    description:
      "Curso com foco prático no desenvolvimento web com JavaScript moderno (ES6+), incluindo manipulação de DOM, APIs, orientação a objetos e lógica.",
    icon: "js-advanced",
    color: "#f39c12",
  },
  {
    id: "6",
    title: "Curso Front-End HTML5, CSS3 e JavaScript",
    organization: "Estudonauta",
    period: "2023",
    description:
      "Formação prática para desenvolvimento de interfaces modernas com HTML, CSS e JavaScript. Inclui projetos práticos e fundamentos de UX/UI.",
    icon: "frontend",
    color: "#3498db",
  },
  {
    id: "7",
    title: "Curso de HTML5 e CSS3 (Módulo 1 ao 5)",
    organization: "Curso em Vídeo (Gustavo Guanabara)",
    period: "2022 - 2023",
    description:
      "Curso gratuito e completo abordando do básico ao intermediário em HTML e CSS com foco em boas práticas de estrutura, semântica e responsividade.",
    icon: "web",
    color: "#2ecc71",
  },
];

// Componente para renderizar o ícone baseado no tipo
const ResumeIcon = ({ type, color }: { type: string; color: string }) => {
  const iconStyle = { color: color || 'var(--color-primary)' };
  
  switch (type) {
    case 'laptop':
      return <FaLaptop style={iconStyle} />;
    case 'bolt':
      return <FaBolt style={iconStyle} />;
    case 'university':
      return <FaUniversity style={iconStyle} />;
    case 'code':
      return <FaCode style={iconStyle} />;
    case 'react':
      return <FaReact style={iconStyle} />;
    case 'web':
      return <FaHtml5 style={iconStyle} />;
    case 'learning':
      return <FaLightbulb style={iconStyle} />;
    case 'automation':
      return <FaBolt style={iconStyle} />;
    case 'html':
      return <FaHtml5 style={iconStyle} />;
    case 'js':
      return <FaJs style={iconStyle} />;
    case 'js-advanced':
      return <FaJs style={iconStyle} />;
    case 'logic':
      return <FaTimesCircle style={iconStyle} />;
    case 'frontend':
      return <FaLaptop style={iconStyle} />;
    default:
      return <FaCheckCircle style={iconStyle} />;
  }
};

const ResumeSection = () => {
  const [activeTab, setActiveTab] = useState<
    "education" | "experience" | "certifications"
  >("experience");
  const [animatedItems, setAnimatedItems] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineItemsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const downloadButtonRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Determinar qual conjunto de dados mostrar com base na tab ativa
  const currentData =
    activeTab === "education"
      ? educationData
      : activeTab === "experience"
      ? experienceData
      : certificationData;

  // Animar items quando visíveis
  const animateItems = useCallback(() => {
    if (!timelineRef.current) return;
    
    const itemElements = timelineRef.current.querySelectorAll('.resume-timeline-item');
    
    // Resetar a animação
    gsap.set(itemElements, { 
      opacity: 0, 
      x: -30,
      scale: 0.95,
      transformOrigin: "left center" 
    });
    
    // Criar a timeline para animar os itens
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });
    
    // Animação em cascata dos itens
    tl.to(itemElements, {
      opacity: 1,
      x: 0,
      scale: 1,
      stagger: 0.15,
      duration: 0.7,
      ease: "back.out(1.4)",
      onComplete: () => {
        // Atualizar o estado para mostrar os itens
        setAnimatedItems(prevItems => {
          const newItems = [...prevItems];
          itemElements.forEach((_, index) => {
            const indexStr = String(index);
            if (!newItems.includes(indexStr)) {
              newItems.push(indexStr);
            }
          });
          return newItems;
        });
      }
    });
    
    // Animar a linha do tempo com um efeito de desenho
    if (lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { 
          height: "0%",
          opacity: 0.5 
        },
        { 
          height: "100%", 
          opacity: 1,
          duration: 1.2,
          ease: "power2.inOut" 
        },
        0 // Começar ao mesmo tempo que os itens
      );
    }
    
    // Animar os círculos na linha do tempo
    const circles = timelineRef.current.querySelectorAll('.timeline-circle');
    tl.fromTo(
      circles,
      { 
        scale: 0,
        opacity: 0 
      },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.15,
        duration: 0.5,
        ease: "back.out(2)"
      },
      0.2 // Começar um pouco depois dos itens
    );
  }, []);

  // Função para mudar de tab com transição aprimorada
  const changeTab = useCallback((tab: "education" | "experience" | "certifications") => {
    if (tab === activeTab) return;
    
    // Animar saída dos itens atuais
    const timeline = timelineRef.current;
    if (timeline) {
      const items = timeline.querySelectorAll('.resume-item');
      const dots = timeline.querySelectorAll('.timeline-dot');

      // Timeline para saída coordenada
      const exitTl = gsap.timeline({
        onComplete: () => {
          setActiveTab(tab);
          setAnimatedItems([]);
          
          // Resetar estados
          setHoveredItem(null);
          setExpandedItem(null);
          
          // Pequeno timeout para garantir que a DOM foi atualizada
          setTimeout(() => {
            animateItems();
          }, 80);
        }
      });
      
      // Animação dos itens saindo
      exitTl.to(items, {
        opacity: 0,
        x: tab === "education" 
          ? -30 
          : tab === "experience" && activeTab === "education"
            ? 30
            : tab === "certifications" && activeTab === "experience"
              ? 30
              : -30,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.in"
      });
      
      // Animação dos dots saindo
      exitTl.to(dots, {
        scale: 0,
        opacity: 0,
        stagger: 0.03,
        duration: 0.3
      }, "-=0.2");
      
      // Efeito na linha da timeline
      if (lineRef.current) {
        exitTl.to(lineRef.current, {
          opacity: 0.3,
          duration: 0.3
        }, "-=0.4");
      }
    } else {
      setActiveTab(tab);
      setTimeout(animateItems, 50);
    }

    // Animar o botão da tab ativa
    const tabButtons = tabsRef.current?.querySelectorAll('button');
    if (tabButtons) {
      const tabIndex = ["experience", "education", "certifications"].indexOf(tab);
      const tabButtonArray = Array.from(tabButtons);
      if (tabIndex >= 0 && tabIndex < tabButtonArray.length) {
        gsap.fromTo(
          tabButtonArray[tabIndex],
          { scale: 0.95 },
          { 
            scale: 1, 
            duration: 0.4,
            ease: "back.out(1.7)"
          }
        );
      }
    }

  }, [activeTab, animateItems]);

  // Função para baixar o currículo com animação melhorada
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/curriculum.pdf"; // Caminho para o PDF do currículo
    link.download = "Curriculo-Luis-Carlos.pdf";
    document.body.appendChild(link);
    
    // Efeito visual de feedback
    if (downloadButtonRef.current) {
      // Animação mais elaborada
      gsap.timeline()
        .to(downloadButtonRef.current, {
          scale: 0.92,
          duration: 0.1,
          ease: "power2.in"
        })
        .to(downloadButtonRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "back.out(1.7)"
        })
        .to(downloadButtonRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      
      // Animação do ícone
      const icon = downloadButtonRef.current.querySelector('svg');
      if (icon) {
        gsap.fromTo(
          icon,
          { y: 0 },
          { 
            y: -5, 
            yoyo: true, 
            repeat: 1, 
            duration: 0.3,
            ease: "power2.inOut"
          }
        );
      }
    }
    
    link.click();
    document.body.removeChild(link);
  };

  // Expandir/contrair item de currículo
  const toggleExpand = (itemId: string) => {
    setExpandedItem(prev => prev === itemId ? null : itemId);
    
    // Encontrar elementos DOM
    const itemElement = document.getElementById(`resume-item-${itemId}`);
    if (!itemElement) return;
    
    const contentElement = itemElement.querySelector('.resume-content');
    const iconElement = itemElement.querySelector('.expand-icon');
    
    // Se está expandindo
    if (expandedItem !== itemId) {
      // Pequeno delay para permitir a mudança de estado
      setTimeout(() => {
        // Animar o conteúdo
        gsap.timeline()
          .to(contentElement, {
            maxHeight: "500px",
            opacity: 1,
            duration: 0.6,
            ease: "power3.out"
          })
          .to(iconElement, {
            rotation: 90,
            duration: 0.5,
            ease: "back.out(1.7)"
          }, "-=0.5");

        // Animação de destaque do card com pulsação sutil
        const highlightTl = gsap.timeline({repeat: 1, yoyo: true});
        highlightTl
          .fromTo(
            itemElement,
            { boxShadow: "0 0 0 rgba(147, 51, 234, 0)" },
            {
              boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)", 
              duration: 0.8,
              ease: "power2.out"
            }
          )
          .to(
            itemElement,
            {
              boxShadow: "0 0 10px rgba(147, 51, 234, 0.2)",
              duration: 0.8,
              ease: "power2.in"
            }
          );
        
        // Scroll suave para o item expandido
        itemElement?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center'
        });
        
        // Adicionar destaque aos títulos dentro do conteúdo
        const headings = itemElement.querySelectorAll('.resume-content h4, .resume-content h5');
        gsap.fromTo(
          headings,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.4,
            delay: 0.2
          }
        );
        
        // Animar itens de lista
        const listItems = itemElement.querySelectorAll('.resume-content li');
        gsap.fromTo(
          listItems,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.05,
            duration: 0.3,
            delay: 0.3
          }
        );
      }, 10);
    } else {
      // Animar fechando o item
      gsap.timeline()
        .to(contentElement, {
          maxHeight: "0px",
          opacity: 0,
          duration: 0.4,
          ease: "power3.in"
        })
        .to(iconElement, {
          rotation: 0,
          duration: 0.3,
          ease: "back.in(1.7)"
        }, "-=0.4");
        
      // Remover o destaque
      gsap.to(itemElement, {
        boxShadow: "0 0 0 rgba(147, 51, 234, 0)",
        duration: 0.3
      });
    }
  };

  // Configurar animações iniciais com efeitos de entrada aprimorados
  useEffect(() => {
    // Garantir visibilidade da seção
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { 
        opacity: 0, 
        y: 50,
        visibility: "visible" 
      });
    }
    
    // Configurar ScrollTrigger para animar a entrada da seção
    const sectionTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        const mainTl = gsap.timeline({
          defaults: { ease: "power2.out" }
    });

        // Animar a entrada da seção
        mainTl.to(sectionRef.current, {
      opacity: 1,
      y: 0,
          duration: 1
    });

        // Animar cabeçalho da seção com efeito sequencial
        if (titleRef.current) {
          const title = titleRef.current.querySelector('h2');
          const subtitle = titleRef.current.querySelector('p');
          const button = titleRef.current.querySelector('a');
          
          mainTl.fromTo(
            title,
            { opacity: 0, y: -30 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.3"
          );
          
          mainTl.fromTo(
            subtitle,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.5"
          );
          
          mainTl.fromTo(
            button,
            { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
              scale: 1, 
              duration: 0.7,
              ease: "back.out(1.7)"
            },
            "-=0.4"
      );
    }
        
        // Animar tabs de navegação
        if (tabsRef.current) {
          const tabs = tabsRef.current.querySelectorAll('button');
          
          mainTl.fromTo(
            tabs,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
              stagger: 0.1,
              duration: 0.5
            },
            "-=0.2"
          );
          
          // Destacar a tab ativa
          const tabIndex = ["experience", "education", "certifications"].indexOf(activeTab);
          const tabsArray = Array.from(tabs);
          if (tabIndex >= 0 && tabIndex < tabsArray.length) {
            const activeTabEl = tabsArray[tabIndex];
            mainTl.fromTo(
              activeTabEl,
              { scale: 0.95 },
              { 
                scale: 1.05, 
                duration: 0.3, 
                ease: "back.out(1.7)"
              },
              "-=0.1"
            ).to(
              activeTabEl,
              { scale: 1, duration: 0.2 },
              "+=0.2"
            );
          }
    }

        // Animar itens do currículo
        mainTl.add(() => {
          setIsInitialLoad(false);
          animateItems();
        }, "-=0.1");
      }
    });
    
    // Criar efeito de parallax no fundo da seção
    if (sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          // Efeito de parallax na linha do tempo
          if (lineRef.current) {
            gsap.to(lineRef.current, {
              y: self.progress * 50,
              duration: 0.1,
              ease: "none"
            });
          }
        }
      });
    }
    
    // Limpar ScrollTriggers ao desmontar o componente
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animateItems, activeTab]);

  // Re-animar quando a tab muda
  useEffect(() => {
    if (!isInitialLoad) {
      animateItems();
    }
  }, [activeTab, animateItems, isInitialLoad]);

  // Efeito para animação hover nos itens
  const handleItemHover = (itemId: string, isEntering: boolean) => {
    setHoveredItem(isEntering ? itemId : null);
    
    const item = document.getElementById(`resume-item-${itemId}`);
    if (!item) return;
    
    const icon = item.querySelector('.icon-container');
    
    if (isEntering) {
      // Animar entrada do hover
      gsap.to(item, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(icon, {
        rotation: 10,
        scale: 1.1,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
    } else {
      // Animar saída do hover
      gsap.to(item, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(icon, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <section
      ref={sectionRef} 
      id="resume"
      className="min-h-screen py-20 overflow-hidden text-white bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="container px-4 mx-auto">
        <div 
          className="mb-16 text-center"
          ref={titleRef}
        >
          <h2 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            Meu Currículo
        </h2>
          <p className="max-w-3xl mx-auto mb-6 text-xl text-gray-300">
            Confira minha trajetória profissional, formação acadêmica e certificações.
        </p>
          <a 
            ref={downloadButtonRef}
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white transition-transform rounded-full cursor-pointer download-button bg-gradient-to-r from-purple-500 to-purple-600 hover:scale-105 hover:shadow-lg"
          >
            <FaDownload className="text-lg" />
            <span>Baixar Currículo Completo</span>
          </a>
        </div>

        <div className="flex flex-col max-w-5xl mx-auto">
          {/* Tabs de navegação */}
        <div
          ref={tabsRef}
            className="flex justify-center mb-10 space-x-1 border-b border-gray-700"
          >
            {["experience", "education", "certifications"].map((tab) => (
          <button
                key={tab}
                onClick={() => changeTab(tab as "experience" | "education" | "certifications")}
                className={`py-3 px-6 text-lg font-medium transition-all duration-300 relative ${
                  activeTab === tab
                    ? "text-purple-400" 
                    : "text-gray-400 hover:text-gray-200"
            }`}
              >
                <span className="relative z-10">
                  {tab === "experience" && "Experiência"}
                  {tab === "education" && "Formação"}
                  {tab === "certifications" && "Certificações"}
                </span>
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 transition-all duration-300"></span>
                )}
          </button>
            ))}
          </div>

          {/* Timeline */}
          <div 
            ref={timelineRef} 
            className="relative space-y-8"
          >
            {/* Linha vertical da timeline */}
            <div 
              ref={lineRef}
              className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-2 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-purple-600 opacity-70"
            ></div>

            {/* Itens da timeline */}
            {(activeTab === "experience" 
              ? experienceData 
              : activeTab === "education" 
                ? educationData 
                : certificationData
            ).map((item, index) => (
              <div
                id={`resume-item-${item.id}`}
                key={item.id}
                ref={(el) => el && (timelineItemsRef.current[index] = el as HTMLDivElement)}
                className={`resume-item relative md:flex items-start ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
                onMouseEnter={() => handleItemHover(item.id, true)}
                onMouseLeave={() => handleItemHover(item.id, false)}
              >
                {/* Dot no centro */}
                <div className="absolute z-10 hidden w-4 h-4 transform -translate-x-1/2 bg-purple-500 border-2 border-purple-300 rounded-full timeline-dot md:block left-1/2 shadow-glow-purple"></div>

                {/* Card do conteúdo */}
                <div 
                  className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-8" : "md:pr-8"} pb-8 md:pb-0`}
              >
                  <div 
                    className={`
                      bg-gray-800/80 rounded-xl p-6 border border-gray-700 shadow-lg transition-all duration-300
                      ${hoveredItem === item.id ? "border-purple-400/50 shadow-glow-sm" : ""}
                      ${expandedItem === item.id ? "!border-purple-400" : ""}
                    `}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full icon-container bg-gradient-to-br from-purple-500 to-purple-600">
                          {ResumeIcon({ type: item.icon || 'default', color: item.color || 'var(--color-primary)' })}
                        </div>
                      <div>
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          <div className="flex items-center mt-1 text-gray-300">
                            <FaBuilding className="mr-2 text-purple-400" size={14} />
                            <span>{item.organization}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => toggleExpand(item.id)}
                        className="text-gray-400 transition-colors hover:text-purple-400"
                      >
                        <div className="toggle-icon">
                          {expandedItem === item.id ? 
                            <FaTimesCircle size={16} /> : 
                            <FaArrowRight size={16} />
                          }
                        </div>
                      </button>
                    </div>

                    <div className="flex items-center mb-3 space-x-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-1 text-purple-400" />
                        <span>{item.location || "Remoto"}</span>
                      </div>
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-1 text-purple-400" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    <div className={`
                      content-container overflow-hidden transition-all duration-300 text-gray-300
                      ${expandedItem === item.id ? "max-h-[500px] opacity-100" : "max-h-[80px] opacity-80"}
                    `}>
                      <p className="mb-4">{item.description}</p>

                {item.achievements && item.achievements.length > 0 && (
                      <div className="mt-4">
                          <h4 className="mb-2 font-semibold text-purple-400">Principais realizações:</h4>
                        <ul className="space-y-2">
                          {item.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                                <FaCheckCircle className="flex-shrink-0 mt-1 mr-2 text-purple-400" />
                                <span>{achievement}</span>
                            </li>
                      ))}
                    </ul>
                  </div>
                )}
                      
                      {expandedItem !== item.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-800 to-transparent"></div>
                )}
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
