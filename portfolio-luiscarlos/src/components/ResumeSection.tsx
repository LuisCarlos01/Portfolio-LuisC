import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGraduationCap,
  FaBriefcase,
  FaAward,
  FaDownload,
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
    title: "Bacharelado em Ciência da Computação",
    organization: "Universidade XYZ",
    period: "2017 - 2021",
    location: "São Paulo, SP",
    description:
      "Formação em desenvolvimento de software, algoritmos, estruturas de dados e matemática computacional.",
    achievements: [
      "Projeto de conclusão em desenvolvimento web usando React",
      "Participação em maratona de programação",
      "Monitor de laboratório de programação",
    ],
  },
  {
    id: 2,
    title: "Especialização em Desenvolvimento Frontend",
    organization: "Instituto de Tecnologia ABC",
    period: "2022",
    location: "Online",
    description:
      "Curso intensivo focado em tecnologias modernas de frontend e boas práticas de UI/UX.",
    achievements: [
      "Projeto final avaliado com nota máxima",
      "Desenvolvimento de componentes reutilizáveis",
    ],
  },
];

// Dados de experiência
const experienceData: ResumeItem[] = [
  {
    id: 1,
    title: "Desenvolvedor Frontend Sênior",
    organization: "Empresa de Tecnologia XYZ",
    period: "2022 - Presente",
    location: "São Paulo, SP",
    description:
      "Desenvolvimento e manutenção de aplicações web usando React, TypeScript e ferramentas modernas de frontend.",
    achievements: [
      "Liderou a migração de uma aplicação legada para React",
      "Implementou estratégia de componentes reutilizáveis reduzindo tempo de desenvolvimento em 30%",
      "Melhorou o desempenho do site principal resultando em aumento de 25% na conversão",
    ],
  },
  {
    id: 2,
    title: "Desenvolvedor Web",
    organization: "Agência Digital ABC",
    period: "2020 - 2022",
    location: "São Paulo, SP",
    description:
      "Desenvolvimento de websites e landing pages para diversos clientes usando HTML, CSS, JavaScript e WordPress.",
    achievements: [
      "Desenvolveu mais de 15 sites para clientes de diferentes segmentos",
      "Implementou metodologia de desenvolvimento que reduziu bugs em produção",
      "Criou biblioteca interna de componentes para acelerar o desenvolvimento",
    ],
  },
  {
    id: 3,
    title: "Estagiário de Desenvolvimento",
    organization: "Startup XYZ",
    period: "2019 - 2020",
    location: "São Paulo, SP",
    description:
      "Estágio em desenvolvimento web com foco em frontend e experiência do usuário.",
    achievements: [
      "Participou do desenvolvimento de uma aplicação SPA",
      "Colaborou com a equipe de design na criação de protótipos",
    ],
  },
];

// Dados de certificações
const certificationData: ResumeItem[] = [
  {
    id: 1,
    title: "Certificação React Developer",
    organization: "Academia de Tecnologia XYZ",
    period: "2023",
    description:
      "Certificação avançada em desenvolvimento React, incluindo hooks, Context API e Redux.",
  },
  {
    id: 2,
    title: "Certificação em UI/UX Design",
    organization: "Design Institute",
    period: "2022",
    description:
      "Certificação focada em princípios de design, wireframing, prototipagem e testes de usabilidade.",
  },
  {
    id: 3,
    title: "Certificação JavaScript Avançado",
    organization: "JS Academy",
    period: "2021",
    description:
      "Certificação em JavaScript ES6+, padrões assíncronos, módulos e otimização de performance.",
  },
];

const ResumeSection = () => {
  const [activeTab, setActiveTab] = useState<
    "education" | "experience" | "certifications"
  >("experience");
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Determinar qual conjunto de dados mostrar com base na tab ativa
  const currentData =
    activeTab === "education"
      ? educationData
      : activeTab === "experience"
      ? experienceData
      : certificationData;

  // Animações ao rolar
  useEffect(() => {
    if (!sectionRef.current) return;

    // Animar título
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

    // Animar tabs
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
      }
    );
  }, []);

  // Animar itens do currículo quando a tab muda
  useEffect(() => {
    if (!contentRef.current) return;

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
    });
  }, [activeTab]);

  // Mudar de tab
  const changeTab = (tab: "education" | "experience" | "certifications") => {
    setActiveTab(tab);
  };

  // Download do CV
  const handleDownload = () => {
    // Implementação futura para download do CV
    alert("Funcionalidade de download será implementada em breve!");
  };

  return (
    <div className="resume-section py-20 px-6 bg-bg-dark" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl font-bold text-center text-white mb-4 relative pb-5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary"
          ref={titleRef}
        >
          Meu Currículo
        </h2>

        <p className="text-center text-text-light mb-16 max-w-2xl mx-auto section-description">
          Minha jornada educacional e profissional, mostrando minha evolução e
          experiência na área de desenvolvimento web.
        </p>

        {/* Botão de Download CV */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleDownload}
            className="btn active flex items-center gap-2"
          >
            <FaDownload />
            Download CV
          </button>
        </div>

        {/* Tabs para cada seção do currículo */}
        <div
          className="tabs flex flex-wrap justify-center gap-4 mb-12"
          ref={tabsRef}
        >
          <button
            className={`tab-button px-6 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
              activeTab === "experience"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-card-bg text-text-light hover:bg-primary/10"
            }`}
            onClick={() => changeTab("experience")}
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
          >
            <FaAward />
            Certificações
          </button>
        </div>

        {/* Conteúdo do currículo */}
        <div className="resume-content" ref={contentRef}>
          <div className="timeline space-y-8">
            {currentData.map((item) => (
              <div
                key={item.id}
                className="resume-item bg-card-bg rounded-xl p-6 md:p-8 relative ml-4 md:ml-6 before:content-[''] before:absolute before:left-[-12px] md:before:left-[-16px] before:top-8 before:w-6 before:h-6 before:rounded-full before:bg-primary before:border-4 before:border-bg-dark"
              >
                <div className="resume-time text-text-light text-sm mb-2">
                  {item.period}
                  {item.location && ` | ${item.location}`}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {item.title}
                </h3>
                <div className="text-primary mb-4">{item.organization}</div>
                <p className="text-text-light mb-4">{item.description}</p>

                {item.achievements && item.achievements.length > 0 && (
                  <div className="achievements mt-4">
                    <h4 className="text-white font-medium mb-2">
                      Realizações:
                    </h4>
                    <ul className="list-disc list-inside text-text-light space-y-1">
                      {item.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;
