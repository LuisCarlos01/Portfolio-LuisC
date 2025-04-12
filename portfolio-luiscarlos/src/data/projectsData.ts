import { Project } from "../types/portfolioTypes";

export const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Moderno",
    description:
      "Um site de e-commerce completo com tema escuro, integração de pagamento, carrinho de compras e painel administrativo para gerenciar produtos.",
    image: "/assets/foodie-ecommerce.jpeg",
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
