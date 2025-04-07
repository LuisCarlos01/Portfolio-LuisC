import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Recursos de tradução
const resources = {
  pt: {
    translation: {
      // Textos gerais
      skills: "Habilidades",
      proficiency: "Proficiência",
      description: "Descrição",
      related_projects: "Projetos Relacionados",
      scroll_down: "Rolar para baixo",
      scroll_to_see_more: "Rolar para ver mais",
      experience_with: "Experiência com",
      back_to_skills: "Voltar para Habilidades",
      close: "Fechar",

      // Descrições das habilidades
      react_description:
        "Biblioteca JavaScript para construir interfaces de usuário com componentes reutilizáveis e um fluxo de dados eficiente.",
      javascript_description:
        "Linguagem de programação versátil utilizada para criar interatividade em páginas web e aplicações.",
      typescript_description:
        "Superset do JavaScript que adiciona tipagem estática, interfaces e outros recursos para codificação mais segura.",
      html_description:
        "Linguagem de marcação padrão para criação de páginas web e aplicações.",
      css_description:
        "Linguagem de estilo usada para definir a apresentação visual de páginas web.",
      nodejs_description:
        "Ambiente de execução JavaScript server-side que permite construir aplicações web escaláveis e em tempo real.",
      git_description:
        "Sistema de controle de versão distribuído para rastrear mudanças no código-fonte durante o desenvolvimento.",
      npm_description:
        "Gerenciador de pacotes para o ecossistema JavaScript, facilitando o compartilhamento e reutilização de código.",
      docker_description:
        "Plataforma que permite empacotar, distribuir e executar aplicações em ambientes isolados chamados contêineres.",
      sql_description:
        "Linguagem de consulta estruturada para gerenciar e consultar bancos de dados relacionais.",
      tailwind_description:
        "Framework CSS utilitário para criar designs personalizados sem sair do HTML.",
      nextjs_description:
        "Framework React com renderização no servidor, geração estática e outras otimizações para aplicações web.",
      sass_description:
        "Pré-processador CSS que adiciona recursos como variáveis, mixins e aninhamento para estilos mais organizados.",
      figma_description:
        "Ferramenta de design de interface baseada na web para criação de protótipos e colaboração em tempo real.",
      wordpress_description:
        "Sistema de gerenciamento de conteúdo para criação de blogs, sites e aplicações web.",
      vite_description:
        "Ferramenta de build moderna que oferece uma experiência de desenvolvimento mais rápida e leve.",
      python_description:
        "Linguagem de programação de alto nível, interpretada, com foco em legibilidade e produtividade.",
      cpp_description:
        "Linguagem de programação de uso geral com recursos de abstração de alto nível e manipulação de memória de baixo nível.",
      csharp_description:
        "Linguagem de programação multiparadigma desenvolvida pela Microsoft como parte da plataforma .NET.",
      gsap_description:
        "Biblioteca de animação JavaScript profissional que permite criar animações de alta performance para web com controle preciso e flexibilidade.",
      react_router_description:
        "Biblioteca de roteamento para React que permite navegação declarativa, dinâmica e em camadas em aplicações web de página única (SPA).",

      // Texto genérico para experiência com habilidade
      skill_experience_text:
        "Tenho trabalhado com {{skill}} em diversos projetos, aplicando boas práticas e padrões modernos de desenvolvimento. Estou constantemente aprendendo novas técnicas e explorando recursos avançados para melhorar minha proficiência nesta tecnologia.",
    },
  },
  en: {
    translation: {
      // General texts
      skills: "Skills",
      proficiency: "Proficiency",
      description: "Description",
      related_projects: "Related Projects",
      scroll_down: "Scroll down",
      scroll_to_see_more: "Scroll to see more",
      experience_with: "Experience with",
      back_to_skills: "Back to Skills",
      close: "Close",

      // Skill descriptions
      react_description:
        "JavaScript library for building user interfaces with reusable components and efficient data flow.",
      javascript_description:
        "Versatile programming language used to create interactivity in web pages and applications.",
      typescript_description:
        "JavaScript superset that adds static typing, interfaces, and other features for safer coding.",
      html_description:
        "Standard markup language for creating web pages and applications.",
      css_description:
        "Style sheet language used to define the visual presentation of web pages.",
      nodejs_description:
        "Server-side JavaScript runtime environment that allows building scalable, real-time web applications.",
      git_description:
        "Distributed version control system for tracking changes in source code during development.",
      npm_description:
        "Package manager for the JavaScript ecosystem, facilitating code sharing and reuse.",
      docker_description:
        "Platform that enables packaging, distributing, and running applications in isolated environments called containers.",
      sql_description:
        "Structured query language for managing and querying relational databases.",
      tailwind_description:
        "Utility-first CSS framework for creating custom designs without leaving your HTML.",
      nextjs_description:
        "React framework with server-side rendering, static generation, and other optimizations for web applications.",
      sass_description:
        "CSS preprocessor that adds features like variables, mixins, and nesting for more organized styles.",
      figma_description:
        "Web-based interface design tool for creating prototypes and collaborating in real-time.",
      wordpress_description:
        "Content management system for creating blogs, websites, and web applications.",
      vite_description:
        "Modern build tool that offers a faster and leaner development experience.",
      python_description:
        "High-level, interpreted programming language focused on readability and productivity.",
      cpp_description:
        "General-purpose programming language with high-level abstraction features and low-level memory manipulation.",
      csharp_description:
        "Multi-paradigm programming language developed by Microsoft as part of the .NET platform.",
      gsap_description:
        "Professional JavaScript animation library that enables high-performance animations for the web with precise control and flexibility.",
      react_router_description:
        "Routing library for React that enables declarative, dynamic, and nested navigation in single-page web applications (SPA).",

      // Generic text for skill experience
      skill_experience_text:
        "I have been working with {{skill}} on various projects, applying best practices and modern development patterns. I am constantly learning new techniques and exploring advanced features to improve my proficiency in this technology.",
    },
  },
};

// Inicializa i18next
i18n.use(initReactI18next).init({
  resources,
  lng: "pt", // Idioma inicial
  fallbackLng: "en", // Idioma de fallback
  interpolation: {
    escapeValue: false, // Não é necessário para React
  },
});

export default i18n;
