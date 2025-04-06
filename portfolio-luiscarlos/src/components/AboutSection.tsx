import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaCode,
  FaLaptopCode,
  FaMobileAlt,
  FaServer,
  FaDownload,
  FaUserGraduate,
  FaLightbulb,
  FaArrowRight,
} from "react-icons/fa";

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Interface para servicos
interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

// Interface para partículas decorativas
interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const parallaxLayerRef = useRef<HTMLDivElement>(null);
  const decorativeElementsRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isInView, setIsInView] = useState(false);

  // Definição dos serviços com cores
  const services: Service[] = [
    {
      icon: <FaCode />,
      title: "Desenvolvimento Web",
      description:
        "Criação de sites responsivos, rápidos e otimizados para SEO.",
      color: "#61DAFB", // Azul React
    },
    {
      icon: <FaLaptopCode />,
      title: "Aplicações SPA",
      description:
        "Desenvolvimento de aplicações web modernas com React e TypeScript.",
      color: "#3178C6", // Azul TypeScript
    },
    {
      icon: <FaMobileAlt />,
      title: "Design Responsivo",
      description:
        "Criação de interfaces que funcionam perfeitamente em todos os dispositivos.",
      color: "#06B6D4", // Azul Tailwind
    },
    {
      icon: <FaServer />,
      title: "Integração API",
      description: "Conectando seu front-end com APIs e serviços de back-end.",
      color: "#339933", // Verde Node.js
    },
  ];

  // Gera partículas decorativas
  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const colors = ["#9b59b6", "#8e44ad", "#c39bd3", "#a66bbe"];

      for (let i = 0; i < 15; i++) {
        newParticles.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 2 + 0.5,
        });
      }

      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      // Animação principal da seção
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
        onComplete: ensureAboutSectionVisibility, // Garantir visibilidade quando a animação terminar
      });

      // Animação do título com efeito de revelação
      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => {
          if (titleRef.current) {
            titleRef.current.style.opacity = "1";
            titleRef.current.style.transform = "none";
          }
        },
      })
        // Animação da imagem com efeito de entrada lateral
        .from(
          imageRef.current,
          {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            onComplete: () => {
              if (imageRef.current) {
                imageRef.current.style.opacity = "1";
                imageRef.current.style.transform = "none";
              }
            },
          },
          "-=0.5"
        )
        // Animação dos textos com efeito cascata
        .from(
          contentRef.current?.querySelectorAll("p, h3, a") || [],
          {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.6,
            ease: "power3.out",
            onComplete: () => {
              // Garantir que todos os textos sejam visíveis após a animação
              const elements = contentRef.current?.querySelectorAll("p, h3, a");
              if (elements) {
                elements.forEach((el) => {
                  const element = el as HTMLElement;
                  element.style.opacity = "1";
                  element.style.visibility = "visible";
                  element.style.transform = "none";
                  element.style.translate = "none";
                  element.style.rotate = "none";
                  element.style.scale = "none";
                });
              }
            },
          },
          "-=0.5"
        )
        // Animação das estatísticas com efeito de contagem
        .from(
          statsRef.current?.querySelectorAll(".stat-item") || [],
          {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
            onComplete: () => {
              const elements = statsRef.current?.querySelectorAll(".stat-item");
              if (elements) {
                elements.forEach((el) => {
                  const element = el as HTMLElement;
                  element.style.opacity = "1";
                  element.style.visibility = "visible";
                  element.style.transform = "none";
                });
              }
            },
          },
          "-=0.3"
        );

      // Animação específica para os cards de serviços
      const servicesTl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
        onComplete: ensureAboutSectionVisibility, // Garantir visibilidade após finalizar
      });

      // Animação dos cards de serviços com efeito de escala e revelação - ajustada para melhor desempenho
      servicesTl
        .from(".services h3", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            document.querySelectorAll(".services h3").forEach((el) => {
              const element = el as HTMLElement;
              element.style.opacity = "1";
              element.style.visibility = "visible";
              element.style.transform = "none";
            });
          },
        })
        .from(
          ".service-card",
          {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "back.out(1.4)",
            clearProps: "opacity,y", // Mantém outras propriedades importantes para o layout
            onComplete: () => {
              document.querySelectorAll(".service-card").forEach((el) => {
                const element = el as HTMLElement;
                element.style.opacity = "1";
                element.style.visibility = "visible";
                element.style.transform = "none";
              });
            },
          },
          "-=0.2"
        );

      // Animação dos ícones dentro dos cards - versão mais otimizada
      gsap.from(".service-card .icon", {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 70%",
        },
        scale: 0.5,
        opacity: 0,
        rotation: -30,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.5,
        clearProps: "opacity,scale,rotation", // Mantém outras propriedades importantes
        onComplete: () => {
          document.querySelectorAll(".service-card .icon").forEach((el) => {
            const element = el as HTMLElement;
            element.style.opacity = "1";
            element.style.visibility = "visible";
            element.style.transform = "none";
          });
        },
      });

      // Contador animado para as estatísticas
      const statElements = document.querySelectorAll(".stat-value");
      statElements.forEach((el) => {
        const target = parseInt(el.getAttribute("data-value") || "0");
        const duration = 2.5;

        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: duration,
            ease: "power2.inOut",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
            },
            onComplete: () => {
              // Garantir que o elemento seja visível após a animação
              (el as HTMLElement).style.opacity = "1";
              (el as HTMLElement).style.visibility = "visible";
            },
          }
        );
      });

      // Força visibilidade após todas as animações
      setTimeout(ensureAboutSectionVisibility, 2000);

      return () => {
        if (tl) tl.kill();
        if (servicesTl) servicesTl.kill();
      };
    }
  }, []);

  // UseLayoutEffect executado antes da renderização para garantir posicionamento correto
  useLayoutEffect(() => {
    // Definir estilos diretos para garantir visibilidade e posicionamento
    if (sectionRef.current) {
      sectionRef.current.style.display = "block";
      sectionRef.current.style.visibility = "visible";
      sectionRef.current.style.opacity = "1";
      sectionRef.current.style.position = "relative";
      sectionRef.current.style.zIndex = "1";
    }
  }, []);

  // Adiciona efeito parallax ao scroll
  useEffect(() => {
    if (parallaxLayerRef.current && sectionRef.current) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const sectionTop = sectionRef.current?.offsetTop || 0;
        const scrollRelativeToSection = scrollPosition - sectionTop;

        if (scrollRelativeToSection > -500 && scrollRelativeToSection < 500) {
          gsap.to(parallaxLayerRef.current, {
            y: scrollRelativeToSection * 0.15,
            duration: 0.5,
            ease: "power1.out",
          });

          // Anima partículas com velocidades diferentes
          document.querySelectorAll(".particle").forEach((particle, index) => {
            const speed = particles[index % particles.length].speed;
            gsap.to(particle, {
              y: scrollRelativeToSection * speed * 0.05,
              duration: 0.5,
              ease: "power1.out",
            });
          });
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [particles]);

  // Função de utilidade para garantir que a seção "Sobre" e seus elementos estejam visíveis
  const ensureAboutSectionVisibility = () => {
    // Forçar visibilidade da seção completa
    if (sectionRef.current) {
      sectionRef.current.style.display = "block";
      sectionRef.current.style.visibility = "visible";
      sectionRef.current.style.opacity = "1";
      sectionRef.current.style.position = "relative";
      sectionRef.current.style.zIndex = "1";
    }

    // Forçar visibilidade dos elementos filhos importantes
    document
      .querySelectorAll("#about-section .service-card")
      .forEach((card) => {
        const element = card as HTMLElement;
        element.style.display = "flex";
        element.style.flexDirection = "column";
        element.style.visibility = "visible";
        element.style.opacity = "1";
        element.style.zIndex = "1";
        element.style.transform = "none"; // Remover qualquer transformação
      });

    // Corrigir o grid de serviços
    const servicesGrid = document.querySelector(
      "#about-section .services .grid"
    );
    if (servicesGrid) {
      const element = servicesGrid as HTMLElement;
      element.style.display = "grid";
      element.style.gridTemplateColumns =
        "repeat(auto-fit, minmax(250px, 1fr))";
      element.style.gap = "1.5rem";
      element.style.width = "100%";
    }

    // Corrigir o problema dos elementos h3 e p com opacidade 0 e transformação
    const textElements = document.querySelectorAll(
      "#about-section h3, #about-section p, #about-section a"
    );
    textElements.forEach((el) => {
      const element = el as HTMLElement;
      element.style.opacity = "1";
      element.style.visibility = "visible";
      element.style.display = el.tagName === "A" ? "flex" : "block";
      element.style.transform = "none"; // Remover qualquer transformação
      element.style.translate = "none"; // Remover translate
      element.style.rotate = "none"; // Remover rotate
      element.style.scale = "none"; // Remover scale
    });

    // Garantir especificamente que elementos da seção sobre com classe text mostrados na captura de tela sejam visíveis
    document
      .querySelectorAll(
        "#about-section .text-text-light, #about-section .text-2xl, #about-section .font-bold, #about-section .mb-4"
      )
      .forEach((element) => {
        const el = element as HTMLElement;
        el.style.opacity = "1";
        el.style.visibility = "visible";
        el.style.transform = "none";
        el.style.translate = "none";
        el.style.rotate = "none";
        el.style.scale = "none";
      });

    // Forçar visibilidade do texto "Desenvolvedor Frontend & Fullstack"
    const devTitle = document.querySelector(
      "#about-section h3.text-2xl.font-bold"
    );
    if (devTitle) {
      const el = devTitle as HTMLElement;
      el.style.opacity = "1";
      el.style.visibility = "visible";
      el.style.display = "block";
      el.style.transform = "none";
      el.style.translate = "none";
      el.style.rotate = "none";
      el.style.scale = "none";
    }
  };

  // Executar verificações de visibilidade periodicamente
  useEffect(() => {
    ensureAboutSectionVisibility();

    const intervals = [
      setTimeout(ensureAboutSectionVisibility, 500),
      setTimeout(ensureAboutSectionVisibility, 1000),
      setTimeout(ensureAboutSectionVisibility, 2000),
      setTimeout(ensureAboutSectionVisibility, 3000),
    ];

    // Adicionar um MutationObserver para capturar mudanças dinâmicas
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          (mutation.attributeName === "style" ||
            mutation.attributeName === "class")
        ) {
          ensureAboutSectionVisibility();
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ["style", "class"],
    });

    return () => {
      intervals.forEach((interval) => clearTimeout(interval));
      observer.disconnect();
    };
  }, []);

  // Função para lidar com hover nos serviços
  const handleServiceHover = (index: number | null) => {
    setHoveredService(index);
  };

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="py-20 bg-background section-container overflow-hidden relative"
    >
      {/* Elementos decorativos e partículas */}
      <div
        ref={decorativeElementsRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Gradiente de fundo melhorado */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg-dark via-bg-dark/95 to-primary/5 opacity-80"></div>

        {/* Formas geométricas decorativas */}
        <div className="absolute left-0 top-1/3 w-64 h-64 rounded-full bg-primary/5 filter blur-3xl"></div>
        <div className="absolute right-0 bottom-1/4 w-80 h-80 rounded-full bg-primary/10 filter blur-3xl"></div>

        {/* Linhas decorativas */}
        <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute right-10 top-1/4 bottom-1/4 w-0.5 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>

        {/* Partículas flutuantes */}
        {particles.map((particle, index) => (
          <div
            key={index}
            className="particle absolute rounded-full animate-pulse-slow opacity-25"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              filter: `blur(${particle.size > 6 ? 2 : 0}px)`,
            }}
          ></div>
        ))}
      </div>

      {/* Camada com efeito parallax */}
      <div
        ref={parallaxLayerRef}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-primary/20 rounded-lg transform rotate-12"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 border-2 border-primary/20 rounded-lg transform -rotate-12"></div>
        <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-primary/40 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-primary/40 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl font-bold text-center mb-16 text-text-light relative"
        >
          Sobre <span className="text-primary">Mim</span>
          <div className="absolute w-20 h-1 bg-primary left-1/2 -translate-x-1/2 bottom-0 mt-4"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative group">
            <div className="w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden border-4 border-primary/60 shadow-xl transition-all duration-500 transform group-hover:scale-105 relative">
              {/* Overlay de gradiente interativo */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40"></div>

              {/* Efeito de brilho animado */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 blur-sm"
                style={{
                  transform: "translateX(-100%)",
                  animation: "shine 3s ease-in-out infinite",
                }}
              ></div>

              <img
                src="public/images/perfil02.JPEG"
                alt="Luis Carlos"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter contrast-110 brightness-105"
                onError={(e) => {
                  // Fallback quando a imagem não carrega
                  (e.target as HTMLImageElement).src =
                    "public/images/perfil05.JPEG";
                  console.log("Tentando carregar imagem alternativa");
                }}
              />
            </div>

            {/* Bordas decorativas animadas */}
            <div className="absolute inset-0 border-2 border-primary rounded-lg transform rotate-3 -z-10 transition-all duration-500 group-hover:rotate-6 group-hover:border-primary/80"></div>
            <div className="absolute inset-0 border-2 border-primary/50 rounded-lg transform -rotate-3 -z-10 transition-all duration-500 group-hover:-rotate-6 group-hover:border-primary/30"></div>

            {/* Elementos decorativos adicionais */}
            <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-primary/60 rounded-tr-lg"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-primary/60 rounded-bl-lg"></div>

            {/* Brilho pulsante nos cantos */}
            <div className="absolute top-0 right-0 w-4 h-4 bg-primary/80 rounded-full filter blur-sm animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 bg-primary/80 rounded-full filter blur-sm animate-pulse-slow"></div>
          </div>

          <div ref={contentRef} className="text-text-light">
            <h3 className="text-2xl font-bold mb-4 text-primary">
              Desenvolvedor Frontend & Fullstack
            </h3>

            <p className="mb-4">
              Olá! Sou Luis Carlos, um desenvolvedor apaixonado por criar
              experiências web únicas e soluções tecnológicas que resolvem
              problemas reais.
            </p>

            <p className="mb-4">
              Com mais de 3 anos de experiência no desenvolvimento web, tenho me
              especializado em React, TypeScript e construção de interfaces
              modernas e acessíveis, sempre buscando as melhores práticas e
              padrões para entregar código de qualidade.
            </p>

            <p className="mb-8">
              Minha abordagem combina habilidades técnicas com um olhar crítico
              para UX/UI, garantindo que as aplicações não sejam apenas
              funcionais, mas também intuitivas e agradáveis para o usuário.
            </p>

            <a
              href="/assets/cv-luiscarlos.pdf"
              download
              className="btn-primary inline-flex items-center mb-8 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <FaDownload className="mr-2 group-hover:animate-bounce" />{" "}
                Baixar CV
                <FaArrowRight className="ml-2 opacity-0 -translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
              </span>
              <span className="absolute inset-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            </a>

            <div
              ref={statsRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="stat-item bg-card-bg p-4 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-primary/10">
                <div className="text-primary text-3xl mb-2">
                  <FaUserGraduate />
                </div>
                <h4 className="text-lg font-semibold mb-1">Experiência</h4>
                <p>
                  <span
                    className="stat-value text-xl font-bold text-primary"
                    data-value="3"
                  >
                    0
                  </span>
                  + Anos
                </p>
              </div>

              <div className="stat-item bg-card-bg p-4 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-primary/10">
                <div className="text-primary text-3xl mb-2">
                  <FaLaptopCode />
                </div>
                <h4 className="text-lg font-semibold mb-1">Projetos</h4>
                <p>
                  <span
                    className="stat-value text-xl font-bold text-primary"
                    data-value="20"
                  >
                    0
                  </span>
                  + Concluídos
                </p>
              </div>

              <div className="stat-item bg-card-bg p-4 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-primary/10">
                <div className="text-primary text-3xl mb-2">
                  <FaLightbulb />
                </div>
                <h4 className="text-lg font-semibold mb-1">Clientes</h4>
                <p>
                  <span
                    className="stat-value text-xl font-bold text-primary"
                    data-value="20"
                  >
                    0
                  </span>
                  + Satisfeitos
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="services mt-20 w-full relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-10 relative w-full">
            Meus Serviços
            <div className="absolute w-16 h-1 bg-primary left-1/2 -translate-x-1/2 bottom-0 mt-4"></div>
          </h3>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
            ref={servicesRef}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card p-6 bg-card-bg rounded-xl text-center transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 w-full h-full flex flex-col items-center justify-start relative overflow-hidden group"
                style={{
                  boxShadow:
                    hoveredService === index
                      ? `0 10px 25px -5px ${service.color}30`
                      : "0 5px 15px rgba(0, 0, 0, 0.1)",
                  background:
                    hoveredService === index
                      ? `linear-gradient(145deg, #1a1e26, #20242e)`
                      : "",
                  visibility: "visible",
                  opacity: 1,
                  position: "relative",
                  zIndex: 1,
                }}
                onMouseEnter={() => handleServiceHover(index)}
                onMouseLeave={() => handleServiceHover(null)}
              >
                {/* Efeito sutil de brilho em hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                  style={{
                    transformOrigin: "left",
                    transform: "scaleX(0)",
                    transition: "transform 0.5s ease-out",
                  }}
                ></div>

                {/* Borda superior sutil */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                {/* Elemento decorativo de canto */}
                <div className="absolute top-0 right-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[10px] border-r-[10px] border-primary/20 border-l-transparent border-b-transparent"></div>
                </div>

                <div
                  className="icon w-16 h-16 rounded-xl flex items-center justify-center text-2xl mx-auto mb-5 transition-all duration-300 relative"
                  style={{
                    backgroundColor:
                      hoveredService === index
                        ? `${service.color}15`
                        : `rgba(${
                            service.color
                              .replace("#", "")
                              .match(/../g)
                              ?.map((n) => parseInt(n, 16))
                              .join(", ") || "155, 89, 182"
                          }, 0.1)`,
                    color:
                      hoveredService === index
                        ? service.color
                        : "var(--color-primary)",
                    transform:
                      hoveredService === index
                        ? "scale(1.05) rotate(0deg)"
                        : "scale(1) rotate(0)",
                    visibility: "visible",
                    opacity: 1,
                    boxShadow:
                      hoveredService === index
                        ? `0 0 15px ${service.color}20`
                        : "none",
                  }}
                >
                  {/* Sutil efeito de gradiente no ícone */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent"></div>

                  {/* Ícone com animação mais sutil */}
                  <div
                    className={
                      hoveredService === index
                        ? "animate-pulse duration-1000"
                        : ""
                    }
                  >
                    {service.icon}
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mb-4 w-full relative transition-colors duration-300 group-hover:text-primary">
                  {service.title}
                  {/* Sublinhado animado mais sutil */}
                  <span
                    className="absolute left-1/2 -bottom-1 h-0.5 bg-primary/50 transform -translate-x-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100"
                    style={{ width: hoveredService === index ? "40%" : "0%" }}
                  ></span>
                </h4>

                <p
                  className="text-text-light/90 w-full transition-all duration-300"
                  style={{
                    transform:
                      hoveredService === index
                        ? "translateY(0)"
                        : "translateY(0)",
                    opacity: hoveredService === index ? 1 : 0.7,
                  }}
                >
                  {service.description}
                </p>

                {/* Indicador de interação mais sutil */}
                <div className="mt-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-105">
                    <FaArrowRight className="text-primary text-xs" />
                  </div>
                </div>

                {/* Linha de destaque mais sutil e alinhada com design */}
                <div
                  className="mt-4 h-px mx-auto transition-all duration-300"
                  style={{
                    width: hoveredService === index ? "40%" : "0%",
                    background:
                      hoveredService === index
                        ? `linear-gradient(90deg, transparent, ${service.color}80, transparent)`
                        : "",
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
