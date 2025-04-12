import { Education, Experience, Certification } from "../types/resumeTypes";

// Dados das educações
export const educationData: Education[] = [
  {
    id: 1,
    title: "Técnico em Informática",
    organization: "SENAI",
    period: "Concluído",
    location: "Brasil",
    description:
      "Formação técnica com foco em redes de computadores, lógica de programação, sistemas operacionais, desenvolvimento de sistemas web e manutenção de computadores.",
    achievements: [],
    technologies: [
      { name: "HTML", projectLink: "#portfolio" },
      { name: "CSS", projectLink: "#portfolio" },
      { name: "JavaScript", projectLink: "#portfolio" },
    ],
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
    technologies: [
      { name: "Automação", projectLink: "#portfolio" },
      { name: "Elétrica", projectLink: "#portfolio" },
    ],
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
    technologies: [
      { name: "Automação", projectLink: "#portfolio" },
      { name: "CLPs", projectLink: "#portfolio" },
      { name: "Redes Industriais", projectLink: "#portfolio" },
    ],
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
    technologies: [
      { name: "HTML5", projectLink: "#portfolio" },
      { name: "CSS3", projectLink: "#portfolio" },
      { name: "JavaScript", projectLink: "#portfolio" },
      { name: "React", projectLink: "#portfolio" },
      { name: "Node.js", projectLink: "#portfolio" },
    ],
  },
  {
    id: 5,
    title: "Bootcamp React.js e Node.js",
    organization: "RocketSeat",
    period: "2023",
    location: "Online",
    description:
      "Programa intensivo de desenvolvimento web com foco em aplicações full-stack modernas utilizando JavaScript e seus frameworks. Projetos práticos com implementação de APIs, autenticação, integração com banco de dados e interfaces responsivas.",
    achievements: [],
    technologies: [
      { name: "React.js", projectLink: "#portfolio" },
      { name: "Node.js", projectLink: "#portfolio" },
      { name: "TypeScript", projectLink: "#portfolio" },
      { name: "Express", projectLink: "#portfolio" },
      { name: "MongoDB", projectLink: "#portfolio" },
    ],
  },
  {
    id: 6,
    title: "Curso de UI/UX Design para Desenvolvedores",
    organization: "Design Academy",
    period: "2023",
    location: "Online",
    description:
      "Formação complementar focada em princípios de design, usabilidade e experiência do usuário para desenvolvedores. Abrange teoria e práticas de design visual, hierarquia, tipografia, cores, espaçamento e design responsivo aplicado a projetos web.",
    achievements: [],
    technologies: [
      { name: "Figma", projectLink: "#portfolio" },
      { name: "Adobe XD", projectLink: "#portfolio" },
      { name: "Wireframing", projectLink: "#portfolio" },
      { name: "Prototyping", projectLink: "#portfolio" },
    ],
  },
];

// Dados das experiências
export const experienceData: Experience[] = [
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
    technologies: [
      { name: "React", projectLink: "#portfolio" },
      { name: "TypeScript", projectLink: "#portfolio" },
      { name: "CSS3", projectLink: "#portfolio" },
      { name: "HTML5", projectLink: "#portfolio" },
      { name: "Node.js", projectLink: "#portfolio" },
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
    technologies: [
      { name: "JavaScript", projectLink: "#portfolio" },
      { name: "HTML5", projectLink: "#portfolio" },
      { name: "CSS3", projectLink: "#portfolio" },
      { name: "GSAP", projectLink: "#portfolio" },
      { name: "Framer Motion", projectLink: "#portfolio" },
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
    technologies: [
      { name: "HTML5", projectLink: "#portfolio" },
      { name: "CSS3", projectLink: "#portfolio" },
      { name: "JavaScript", projectLink: "#portfolio" },
      { name: "Git", projectLink: "#portfolio" },
    ],
  },
];

// Dados das certificações
export const certificationData: Certification[] = [
  {
    id: 1,
    title: "Automação de Sistemas",
    organization: "IFRS - Instituto Federal",
    period: "Jul - Nov 2024",
    description:
      "Carga horária: 30h | Aproveitamento: 81,33%\nConteúdo: Automação, Projeto de Sistemas, Robótica, Máquinas e Redes Industriais.",
    technologies: [
      { name: "Automação", projectLink: "#portfolio" },
      { name: "Robótica", projectLink: "#portfolio" },
      { name: "Arduino", projectLink: "#portfolio" },
    ],
  },
  {
    id: 2,
    title: "HTML5: Fundamentos para Construção de Páginas Web Modernas",
    organization: "IFRS - Instituto Federal",
    period: "Out - Nov 2024",
    description:
      "Carga horária: 40h | Aproveitamento: 94,00%\nConteúdo: Introdução ao HTML5, Estrutura de Documentos, Imagens, Links, Listas, Tabelas e Formulários.",
    technologies: [
      { name: "HTML5", projectLink: "#portfolio" },
      { name: "CSS3", projectLink: "#portfolio" },
      { name: "Web Semântica", projectLink: "#portfolio" },
    ],
  },
  {
    id: 3,
    title: "JavaScript",
    organization: "IFRS - Instituto Federal",
    period: "Jul - Nov 2024",
    description:
      "Carga horária: 30h | Aproveitamento: 75,00%\nConteúdo: Fundamentos da linguagem, manipulação de DOM, eventos e validação de formulários.",
    technologies: [
      { name: "JavaScript", projectLink: "#portfolio" },
      { name: "DOM", projectLink: "#portfolio" },
      { name: "ES6+", projectLink: "#portfolio" },
    ],
  },
  {
    id: 4,
    title: "Lógica de Programação",
    organization: "IFRS - Instituto Federal",
    period: "Jul - Nov 2024",
    description:
      "Carga horária: 20h | Aproveitamento: 88,50%\nConteúdo: Variáveis, operadores, estruturas condicionais e de repetição utilizando Portugol Studio.",
    technologies: [
      { name: "Lógica", projectLink: "#portfolio" },
      { name: "Algoritmos", projectLink: "#portfolio" },
      { name: "Estruturas de Dados", projectLink: "#portfolio" },
    ],
  },
  {
    id: 5,
    title: "Curso Completo de JavaScript (do básico ao avançado)",
    organization: "Udemy",
    period: "2023",
    description:
      "Curso com foco prático no desenvolvimento web com JavaScript moderno (ES6+), incluindo manipulação de DOM, APIs, orientação a objetos e lógica.",
    technologies: [
      { name: "JavaScript", projectLink: "#portfolio" },
      { name: "ES6+", projectLink: "#portfolio" },
      { name: "APIs", projectLink: "#portfolio" },
      { name: "POO", projectLink: "#portfolio" },
    ],
  },
  {
    id: 6,
    title: "Curso Front-End HTML5, CSS3 e JavaScript",
    organization: "Estudonauta",
    period: "2023",
    description:
      "Formação prática para desenvolvimento de interfaces modernas com HTML, CSS e JavaScript. Inclui projetos práticos e fundamentos de UX/UI.",
    technologies: [
      { name: "HTML5", projectLink: "#portfolio" },
      { name: "CSS3", projectLink: "#portfolio" },
      { name: "JavaScript", projectLink: "#portfolio" },
      { name: "UI/UX", projectLink: "#portfolio" },
    ],
  },
  {
    id: 7,
    title: "Curso de HTML5 e CSS3 (Módulo 1 ao 5)",
    organization: "Curso em Vídeo (Gustavo Guanabara)",
    period: "2022 - 2023",
    description:
      "Curso gratuito e completo abordando do básico ao intermediário em HTML e CSS com foco em boas práticas de estrutura, semântica e responsividade.",
    technologies: [
      { name: "HTML5", projectLink: "#portfolio" },
      { name: "CSS3", projectLink: "#portfolio" },
      { name: "Responsividade", projectLink: "#portfolio" },
    ],
  },
  {
    id: 8,
    title: "TypeScript: Do Básico ao Avançado",
    organization: "Alura",
    period: "2023",
    description:
      "Curso abrangente de TypeScript cobrindo desde os fundamentos até recursos avançados como decorators, generics, e integração com frameworks populares.",
    technologies: [
      { name: "TypeScript", projectLink: "#portfolio" },
      { name: "JavaScript", projectLink: "#portfolio" },
      { name: "React", projectLink: "#portfolio" },
    ],
  },
  {
    id: 9,
    title: "React: Desenvolvimento de SPAs",
    organization: "Udemy",
    period: "2023",
    description:
      "Formação completa em React.js com foco na construção de Single Page Applications modernas. Inclui hooks, context API, Redux, testes e otimização de performance.",
    technologies: [
      { name: "React.js", projectLink: "#portfolio" },
      { name: "Redux", projectLink: "#portfolio" },
      { name: "Context API", projectLink: "#portfolio" },
      { name: "Hooks", projectLink: "#portfolio" },
    ],
  },
  {
    id: 10,
    title: "TailwindCSS: CSS Moderno e Utilitário",
    organization: "Origamid",
    period: "2023",
    description:
      "Curso prático focado no framework TailwindCSS com exemplos de projetos reais e adaptação para diferentes tamanhos de tela e necessidades.",
    technologies: [
      { name: "TailwindCSS", projectLink: "#portfolio" },
      { name: "CSS", projectLink: "#portfolio" },
      { name: "HTML", projectLink: "#portfolio" },
      { name: "Responsividade", projectLink: "#portfolio" },
    ],
  },
];
