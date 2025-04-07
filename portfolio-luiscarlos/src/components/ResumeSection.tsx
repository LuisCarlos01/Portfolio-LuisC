import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGraduationCap,
  FaBriefcase,
  FaAward,
  FaDownload,
  FaArrowRight,
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Tipo para informações de educação e experiência
interface ResumeItem {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  location?: string;
  achievements?: string[];
}

// Dados de educação
const educationData: ResumeItem[] = [
  {
    id: 1,
    title: "Técnico em Informática",
    organization: "SENAI",
    period: "Concluído",
    location: "Brasil",
    description:
      "Formação técnica com foco em redes de computadores, lógica de programação, sistemas operacionais, desenvolvimento de sistemas web e manutenção de computadores.",
    achievements: [],
  },
  {
    id: 2,
    title: "Técnico em Eletrotécnica",
    organization: "SENAI",
    period: "Concluído",
    location: "Brasil",
    description:
      "Curso técnico voltado para projetos, instalação e manutenção de sistemas elétricos industriais, automação predial e comandos elétricos.",
    achievements: [],
  },
  {
    id: 3,
    title: "Graduação em Automação Industrial",
    organization: "Unicesumar",
    period: "Cursando",
    location: "Brasil",
    description:
      "Curso superior com foco em controle de processos industriais, sistemas automatizados, CLPs, instrumentação, redes industriais e robótica.",
    achievements: [],
  },
  {
    id: 4,
    title: "Formações Complementares em Programação",
    organization: "IFRS, Udemy, Estudonauta, Curso em Vídeo",
    period: "2022 - Atual",
    location: "Online",
    description:
      "Conjunto de formações práticas nas áreas de Front-End, JavaScript, HTML, CSS, lógica de programação e automação de sistemas. Destaques para os cursos:\n- HTML5 e CSS3 (Curso em Vídeo - Gustavo Guanabara)\n- Lógica de Programação (IFRS)\n- JavaScript Moderno (Udemy)\n- Desenvolvimento Web (Estudonauta)\n- Automação de Sistemas Industriais (IFRS)",
    achievements: [],
  },
];


// Dados de experiência
const experienceData: ResumeItem[] = [
  {
    id: 1,
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
  },
  {
    id: 2,
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
  },
  {
    id: 3,
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
  },
];


// Dados de certificações
const certificationData: ResumeItem[] = [
  {
    id: 1,
    title: "Automação de Sistemas",
    organization: "IFRS - Instituto Federal",
    period: "Jul - Nov 2024",
    description:
      "Carga horária: 30h | Aproveitamento: 81,33%\nConteúdo: Automação, Projeto de Sistemas, Robótica, Máquinas e Redes Industriais.",
  },
  {
    id: 2,
    title: "HTML5: Fundamentos para Construção de Páginas Web Modernas",
    organization: "IFRS - Instituto Federal",
    period: "Out - Nov 2024",
    description:
      "Carga horária: 40h | Aproveitamento: 94,00%\nConteúdo: Introdução ao HTML5, Estrutura de Documentos, Imagens, Links, Listas, Tabelas e Formulários.",
  },
  {
    id: 3,
    title: "JavaScript",
    organization: "IFRS - Instituto Federal",
    period: "Jul - Nov 2024",
    description:
      "Carga horária: 30h | Aproveitamento: 75,00%\nConteúdo: Fundamentos da linguagem, manipulação de DOM, eventos e validação de formulários.",
  },
  {
    id: 4,
    title: "Lógica de Programação",
    organization: "IFRS - Instituto Federal",
    period: "Jul - Nov 2024",
    description:
      "Carga horária: 20h | Aproveitamento: 88,50%\nConteúdo: Variáveis, operadores, estruturas condicionais e de repetição utilizando Portugol Studio.",
  },
  {
    id: 5,
    title: "Curso Completo de JavaScript (do básico ao avançado)",
    organization: "Udemy",
    period: "2023",
    description:
      "Curso com foco prático no desenvolvimento web com JavaScript moderno (ES6+), incluindo manipulação de DOM, APIs, orientação a objetos e lógica.",
  },
  {
    id: 6,
    title: "Curso Front-End HTML5, CSS3 e JavaScript",
    organization: "Estudonauta",
    period: "2023",
    description:
      "Formação prática para desenvolvimento de interfaces modernas com HTML, CSS e JavaScript. Inclui projetos práticos e fundamentos de UX/UI.",
  },
  {
    id: 7,
    title: "Curso de HTML5 e CSS3 (Módulo 1 ao 5)",
    organization: "Curso em Vídeo (Gustavo Guanabara)",
    period: "2022 - 2023",
    description:
      "Curso gratuito e completo abordando do básico ao intermediário em HTML e CSS com foco em boas práticas de estrutura, semântica e responsividade.",
  },
];


const ResumeSection = () => {
  const [activeTab, setActiveTab] = useState<
    "education" | "experience" | "certifications"
  >("experience");
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const downloadButtonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Determinar qual conjunto de dados mostrar com base na tab ativa
  const currentData =
    activeTab === "education"
      ? educationData
      : activeTab === "experience"
      ? experienceData
      : certificationData;

  // Função para garantir visibilidade dos elementos do Resume
  const ensureResumeVisibility = () => {
    console.log("Garantindo visibilidade da seção Resume");
    const section = document.getElementById("resume");
    if (!section) return;

    // Tornar a seção principal visível
    section.style.display = "block";
    section.style.visibility = "visible";
    section.style.opacity = "1";
    section.style.position = "relative";
    section.style.zIndex = "1";

    // Garantir visibilidade de todos os elementos dentro da seção
    const allElements = section.querySelectorAll("*");
    allElements.forEach((el) => {
      const element = el as HTMLElement;
      element.style.visibility = "visible";
      element.style.opacity = "1";

      // Para elementos específicos, definir display apropriado
      if (
        element.tagName === "A" ||
        element.tagName === "BUTTON" ||
        element.classList.contains("tab-button") ||
        element.classList.contains("tabs")
      ) {
        element.style.display = "flex";
      } else if (
        element.tagName === "DIV" ||
        element.tagName === "P" ||
        element.tagName === "H2" ||
        element.tagName === "H3" ||
        element.tagName === "H4" ||
        element.tagName === "IMG" ||
        element.classList.contains("resume-item") ||
        element.classList.contains("resume-content")
      ) {
        element.style.display = "block";
      }
    });

    // Verificar problemas específicos
    const selectors = [
      "h2.text-4xl.font-bold",
      "img.w-full",
      "div.text.text-light",
      "p.mb-4",
      "p.mb-8",
      "a.btn-primary",
      ".reveal-clip",
      ".resume-item",
      ".tab-button",
    ];

    selectors.forEach((selector) => {
      const elements = section.querySelectorAll(selector);
      elements.forEach((element) => {
        const el = element as HTMLElement;
        el.style.display = ["A", "BUTTON"].includes(element.tagName)
          ? "flex"
          : "block";
        el.style.visibility = "visible";
        el.style.opacity = "1";
        el.style.position = "relative";
        el.style.zIndex = "10";
      });
    });
  };

  // Aplicar visibilidade na mudança de aba
  const applyVisibilityForActiveTab = () => {
    console.log("Aplicando visibilidade para aba:", activeTab);
    const activeContent = document.querySelector(
      `.resume-content[data-tab="${activeTab}"]`
    );
    if (activeContent) {
      const el = activeContent as HTMLElement;
      el.style.display = "block";
      el.style.visibility = "visible";
      el.style.opacity = "1";

      // Forçar visibilidade para todos os elementos dentro do conteúdo ativo
      const elements = el.querySelectorAll("*");
      elements.forEach((element) => {
        const elem = element as HTMLElement;
        elem.style.visibility = "visible";
        elem.style.opacity = "1";
        if (["A", "BUTTON"].includes(elem.tagName)) {
          elem.style.display = "flex";
        } else {
          elem.style.display = "block";
        }
      });
    }
  };

  // UseLayoutEffect para garantir a visibilidade dos elementos antes da renderização
  useLayoutEffect(() => {
    // Garantir que a seção esteja visível
    if (sectionRef.current) {
      sectionRef.current.style.display = "block";
      sectionRef.current.style.visibility = "visible";
      sectionRef.current.style.opacity = "1";
      sectionRef.current.style.zIndex = "1";
    }

    // Garantir que o título esteja visível
    if (titleRef.current) {
      titleRef.current.style.visibility = "visible";
      titleRef.current.style.opacity = "1";
      titleRef.current.style.display = "block";
    }

    // Garantir que a descrição esteja visível
    if (descriptionRef.current) {
      descriptionRef.current.style.visibility = "visible";
      descriptionRef.current.style.opacity = "1";
      descriptionRef.current.style.display = "block";
    }

    // Garantir que o botão de download esteja visível
    if (downloadButtonRef.current) {
      downloadButtonRef.current.style.visibility = "visible";
      downloadButtonRef.current.style.opacity = "1";
      downloadButtonRef.current.style.display = "flex";
    }

    // Aplicar força bruta para garantir visibilidade
    ensureResumeVisibility();
  }, []);

  // Aplicar visibilidade periódica à seção Resume
  useLayoutEffect(() => {
    // Aplicar imediatamente
    ensureResumeVisibility();

    // E também periodicamente
    const interval = setInterval(ensureResumeVisibility, 1000);

    // Aplicar após mudança de aba
    setTimeout(ensureResumeVisibility, 500);

    return () => {
      clearInterval(interval);
    };
  }, [activeTab]);

  // Garantir visibilidade quando a aba mudar
  useEffect(() => {
    // Aplicar após um curto atraso para dar tempo às animações
    setTimeout(applyVisibilityForActiveTab, 100);
    setTimeout(applyVisibilityForActiveTab, 500);
    setTimeout(applyVisibilityForActiveTab, 1000);

    // Garantir que os itens da nova aba estejam visíveis
    ensureResumeVisibility();
  }, [activeTab]);

  // Animações ao rolar com garantia de visibilidade
  useEffect(() => {
    if (!sectionRef.current) return;

    // Garantir visibilidade inicial
    ensureResumeVisibility();

    // Garantir visibilidade novamente após animações
    const timeoutIds = [
      setTimeout(ensureResumeVisibility, 500),
      setTimeout(ensureResumeVisibility, 1000),
      setTimeout(ensureResumeVisibility, 2000),
    ];

    // Animar título com garantia de visibilidade após
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
        onComplete: ensureResumeVisibility,
      }
    );

    // Animar tabs com garantia de visibilidade após
    gsap.fromTo(
      tabsRef.current?.children || [],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: tabsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        onComplete: ensureResumeVisibility,
      }
    );

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, []);

  // Animar itens do currículo quando a tab muda
  useEffect(() => {
    if (!contentRef.current) return;

    // Garantir visibilidade antes da animação
    ensureResumeVisibility();

    // Primeiro, configura todos os itens para opacity: 0
    gsap.set(contentRef.current.querySelectorAll(".resume-item"), {
      opacity: 0,
      y: 20,
    });

    // Anima a entrada dos itens
    gsap.to(contentRef.current.querySelectorAll(".resume-item"), {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
      onComplete: ensureResumeVisibility,
    });

    // Garantir visibilidade novamente após animações
    setTimeout(ensureResumeVisibility, 1000);
  }, [activeTab]);

  // Adicionar efeito de animação gradual para itens do timeline
  useEffect(() => {
    if (!timelineRef.current) return;

    // Limpar animações existentes
    setAnimatedItems([]);

    // Função para animar um novo item
    const animateNextItem = (index: number) => {
      if (index >= currentData.length) return;

      // Adicionar este item à lista de animados
      setAnimatedItems((prev) => [...prev, currentData[index].id]);

      // Agendar o próximo item para animação
      setTimeout(() => {
        animateNextItem(index + 1);
      }, 300); // Delay entre cada item
    };

    // Iniciar animação com um pequeno delay
    setTimeout(() => {
      animateNextItem(0);
    }, 200);
  }, [activeTab, currentData]);

  // Melhorar a animação de scroll para os elementos da timeline
  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return;

    // Configurar animações para os itens da timeline
    const timelineItems = timelineRef.current.querySelectorAll(".resume-item");

    if (timelineItems.length) {
      gsap.fromTo(
        timelineItems,
        {
          opacity: 0,
          x: (index) => (index % 2 === 0 ? -50 : 50),
          y: 30,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [activeTab]);

  // Mudar de tab
  const changeTab = (tab: "education" | "experience" | "certifications") => {
    setActiveTab(tab);

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

  // Download do CV
  const handleDownload = () => {
    // Implementação futura para download do CV
    alert("Funcionalidade de download será implementada em breve!");
  };

  return (
    <section
      id="resume"
      className="py-20 bg-background section-container overflow-hidden resume-section"
      ref={sectionRef}
      style={{ display: "block", visibility: "visible", opacity: 1 }}
    >
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl font-bold text-center mb-16 text-text-light relative reveal-clip"
          ref={titleRef}
          style={{ display: "block", visibility: "visible", opacity: 1 }}
        >
          Meu <span className="text-primary">Currículo</span>
          <div className="absolute w-20 h-1 bg-primary left-1/2 -translate-x-1/2 bottom-0 mt-4"></div>
        </h2>

        <p
          ref={descriptionRef}
          className="text-center text-text-light mb-16 max-w-2xl mx-auto section-description"
          style={{ display: "block", visibility: "visible", opacity: 1 }}
        >
          Minha jornada educacional e profissional, mostrando minha evolução e
          experiência na área de desenvolvimento web.
        </p>

        {/* Botão de Download CV */}
        <div className="flex justify-center mb-12">
          <button
            ref={downloadButtonRef}
            onClick={handleDownload}
            className="btn-primary inline-flex items-center mb-8 group relative overflow-hidden"
            style={{ display: "flex", visibility: "visible", opacity: 1 }}
          >
            <span className="relative z-10 flex items-center">
              <FaDownload className="mr-2 group-hover:animate-bounce" />{" "}
            Download CV
              <FaArrowRight className="ml-2 opacity-0 -translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
            </span>
            <span className="absolute inset-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
          </button>
        </div>

        {/* Tabs para cada seção do currículo */}
        <div
          className="tabs flex flex-wrap justify-center gap-4 mb-12"
          ref={tabsRef}
          style={{ display: "flex", visibility: "visible", opacity: 1 }}
        >
          <button
            className={`tab-button px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
              activeTab === "experience"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-card-bg text-text-light hover:bg-primary/10"
            }`}
            onClick={() => changeTab("experience")}
            style={{ display: "flex", visibility: "visible", opacity: 1 }}
          >
            <FaBriefcase />
            Experiência
          </button>

          <button
            className={`tab-button px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
              activeTab === "education"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-card-bg text-text-light hover:bg-primary/10"
            }`}
            onClick={() => changeTab("education")}
            style={{ display: "flex", visibility: "visible", opacity: 1 }}
          >
            <FaGraduationCap />
            Educação
          </button>

          <button
            className={`tab-button px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
              activeTab === "certifications"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-card-bg text-text-light hover:bg-primary/10"
            }`}
            onClick={() => changeTab("certifications")}
            style={{ display: "flex", visibility: "visible", opacity: 1 }}
          >
            <FaAward />
            Certificações
          </button>
        </div>

        {/* Conteúdo do currículo */}
        <div
          className="resume-content"
          ref={contentRef}
          data-tab={activeTab}
          style={{ display: "block", visibility: "visible", opacity: 1 }}
        >
          <div className="timeline-container" ref={timelineRef}>
            {currentData.map((item, index) => (
              <div
                key={item.id}
                className={`resume-item mb-12 lg:mb-0 ${
                  animatedItems.includes(item.id)
                    ? "animate-fadeIn"
                    : "opacity-0"
                } ${
                  index % 2 === 0 ? "lg:pr-16" : "lg:pl-16 lg:translate-y-16"
                }`}
              >
                <div className="bg-card-bg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                        <div className="flex flex-wrap items-center text-text-light mt-2">
                          <div className="flex items-center mr-4 mb-2">
                            <FaBuilding className="text-primary text-sm mr-2" />
                            <span>{item.organization}</span>
                          </div>

                          {item.location && (
                            <div className="flex items-center mr-4 mb-2">
                              <FaMapMarkerAlt className="text-primary text-sm mr-2" />
                              <span>{item.location}</span>
                            </div>
                          )}

                          <div className="flex items-center mb-2">
                            <FaCalendarAlt className="text-primary text-sm mr-2" />
                            <span>{item.period}</span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`rounded-full p-3 ${
                          activeTab === "experience"
                            ? "bg-primary/10 text-primary"
                            : activeTab === "education"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {activeTab === "experience" ? (
                          <FaBriefcase size={20} />
                        ) : activeTab === "education" ? (
                          <FaGraduationCap size={20} />
                        ) : (
                          <FaAward size={20} />
                        )}
                      </div>
                    </div>

                <p className="text-text-light mb-4">{item.description}</p>

                {item.achievements && item.achievements.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-primary font-medium mb-2">
                          Conquistas:
                    </h4>
                        <ul className="space-y-2">
                          {item.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                              <span className="text-text-light">
                                {achievement}
                              </span>
                            </li>
                      ))}
                    </ul>
                  </div>
                )}
                  </div>

                  {/* Linha do tempo visual */}
                  <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 w-16 h-[2px] bg-gradient-to-r from-primary/50 to-primary z-10">
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/30 animate-pulse-slow"></div>
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
