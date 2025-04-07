import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaCode,
  FaLaptopCode,
  FaMobileAlt,
  FaServer,
  FaUserGraduate,
  FaProjectDiagram,
  FaUsers,
  FaDownload,
  FaArrowRight,
  FaBrain,
  FaTools,
  FaRocket,
  FaLightbulb,
} from "react-icons/fa";

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Interface para serviços
interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
}

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Definição dos serviços com cores
  const services: Service[] = [
    {
      icon: <FaCode />,
      title: "Desenvolvimento Web",
      description:
        "Criação de sites responsivos, rápidos e otimizados para SEO, utilizando as tecnologias mais modernas como React, Next.js e TypeScript.",
      color: "#61DAFB", // Azul React
    },
    {
      icon: <FaLaptopCode />,
      title: "Aplicações SPA",
      description:
        "Desenvolvimento de aplicações web modernas com React e TypeScript, proporcionando experiências de usuário fluidas e altamente interativas.",
      color: "#3178C6", // Azul TypeScript
    },
    {
      icon: <FaMobileAlt />,
      title: "Design Responsivo",
      description:
        "Criação de interfaces que funcionam perfeitamente em todos os dispositivos, desde smartphones até desktops, garantindo a melhor experiência para todos os usuários.",
      color: "#06B6D4", // Azul Tailwind
    },
    {
      icon: <FaServer />,
      title: "Integração API",
      description:
        "Conectando seu front-end com APIs e serviços de back-end, garantindo comunicação eficiente e segura entre diferentes sistemas.",
      color: "#339933", // Verde Node.js
    },
    {
      icon: <FaBrain />,
      title: "Soluções Criativas",
      description:
        "Desenvolvimento de soluções inovadoras para problemas complexos, combinando pensamento técnico e criativo para superar desafios.",
      color: "#F24E1E", // Laranja Figma
    },
    {
      icon: <FaTools />,
      title: "Otimização de Performance",
      description:
        "Análise e melhoria da performance das aplicações web, garantindo carregamento rápido e experiência de usuário fluida.",
      color: "#CC6699", // Rosa Sass
    },
  ];

  // Efeito para iniciar animações quando a seção ficar visível
  useEffect(() => {
    if (sectionRef.current) {
      // Detectar quando a seção fica visível na tela
      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          setIsVisible(true);

          // Animar título
          gsap.fromTo(
            titleRef.current,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            }
          );

          // Animar imagem com efeito de revelação
          gsap.fromTo(
            imageRef.current,
            {
              opacity: 0,
              scale: 0.9,
              rotate: -5,
            },
            {
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
            }
          );

          // Animar conteúdo com efeito de deslizamento
          if (contentRef.current) {
            const elements = contentRef.current.querySelectorAll("p, h3, a");
            if (elements.length > 0) {
              gsap.fromTo(
                elements,
                {
                  opacity: 0,
                  x: -30,
                },
                {
                  opacity: 1,
                  x: 0,
                  stagger: 0.15,
                  duration: 0.6,
                  ease: "power2.out",
                }
              );
            }
          }

          // Animar estatísticas
          animateStats();

          // Animar cards de serviços
          animateServiceCards();
        },
      });

      return () => {
        scrollTrigger.kill();
      };
    }
  }, []);

  // Função para animar as estatísticas
  const animateStats = () => {
    if (!statsRef.current) return;

    // Animar os cards de estatísticas
    gsap.fromTo(
      statsRef.current.querySelectorAll(".stat-item"),
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.7)",
        onComplete: () => {
          // Animar os contadores após os cards aparecerem
          const statElements =
            statsRef.current?.querySelectorAll(".stat-value");

          if (statElements && statElements.length > 0) {
            console.log(
              `Animando ${statElements.length} contadores de estatísticas`
            );

            statElements.forEach((el) => {
              const target = parseInt(el.getAttribute("data-value") || "0");
              console.log(`Animando contador para valor alvo: ${target}`);

              // Definir diretamente o valor final para garantir que apareça
              if (target > 0) {
                el.textContent = target.toString();
              }

              // Animar o contador
              gsap.fromTo(
                el,
                { textContent: 0 },
                {
                  textContent: target,
                  duration: 2,
                  ease: "power2.inOut",
                  onUpdate: function () {
                    // Arredondar para inteiro durante a animação
                    el.textContent = Math.round(
                      parseFloat(el.textContent || "0")
                    ).toString();
                  },
                }
              );
            });
          } else {
            console.warn(
              "Não foram encontrados elementos de estatísticas para animar"
            );
          }
        },
      }
    );
  };

  // Função para animar os cards de serviços
  const animateServiceCards = () => {
    if (!servicesRef.current) return;

    gsap.fromTo(
      servicesRef.current.querySelectorAll(".service-card"),
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.2)",
      }
    );
  };

  // Função para lidar com hover nos serviços
  const handleServiceHover = (index: number | null) => {
    setHoveredService(index);
  };

  // Função para mostrar detalhes do serviço em um modal
  const handleServiceClick = (service: Service) => {
    // Primeiro, definimos o serviço selecionado para abrir o modal
    setSelectedService(service);

    // Impedir rolagem do body enquanto o modal estiver aberto
    document.body.style.overflow = "hidden";

    // Precisamos aguardar que o React renderize o modal antes de tentar animá-lo
    setTimeout(() => {
      const modalElement = document.getElementById("service-detail-modal");

      if (modalElement) {
        // Primeiro vamos definir o modal como visível, mas com opacidade 0
        modalElement.style.opacity = "0";
        modalElement.style.transform = "scale(0.95) translateY(20px)";

        // Forçar uma rolagem imediata para o modal (sem animação suave)
        // para garantir que ele esteja visível antes de animar
        const modalRect = modalElement.getBoundingClientRect();
        const modalTop = modalRect.top + window.scrollY;
        const viewportHeight = window.innerHeight;

        // Calcular posição ideal para centralizar o modal na tela
        const idealScrollPosition =
          modalTop - (viewportHeight - modalRect.height) / 2;

        // Aplicar a rolagem
        window.scrollTo(0, idealScrollPosition);

        // Agora podemos animar o modal com GSAP
        const tl = gsap.timeline();

        tl.to(modalElement, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        })
          .fromTo(
            "#service-icon",
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
            "#service-content > *",
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
          );

        // Adicionar uma notificação visual para debug em dispositivos móveis
        if (window.innerWidth <= 768) {
          const notification = document.createElement("div");
          notification.style.position = "fixed";
          notification.style.bottom = "20px";
          notification.style.left = "50%";
          notification.style.transform = "translateX(-50%)";
          notification.style.backgroundColor = "#9b59b6";
          notification.style.color = "white";
          notification.style.padding = "8px 16px";
          notification.style.borderRadius = "20px";
          notification.style.zIndex = "9999";
          notification.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
          notification.textContent = "Modal aberto!";

          document.body.appendChild(notification);

          setTimeout(() => {
            notification.style.opacity = "0";
            setTimeout(() => notification.remove(), 300);
          }, 2000);
        }
      }
    }, 50); // Tempo curto para garantir que o React renderizou o modal
  };

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="py-20 bg-background section-container overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-4xl font-bold text-center mb-16 text-text-light relative"
        >
          Sobre <span className="text-primary">Mim</span>
          <div className="absolute w-20 h-1 bg-primary left-1/2 -translate-x-1/2 bottom-0 mt-4"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div ref={imageRef} className="relative group">
            <div className="w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden border-4 border-primary shadow-xl transition-all duration-500 transform group-hover:scale-105">
              <img
                src="/portfolio-luiscarlos/assets/perfil02.JPEG"
                alt="Luis Carlos"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 border-2 border-primary rounded-lg transform rotate-3 -z-10 transition-all duration-500 group-hover:rotate-6"></div>
            <div className="absolute inset-0 border-2 border-primary/50 rounded-lg transform -rotate-3 -z-10 transition-all duration-500 group-hover:-rotate-6"></div>
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
              Minha abordagem combina habilidades técnicas com uma forte atenção
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
                    3
                  </span>
                  + Anos
                </p>
              </div>

              <div className="stat-item bg-card-bg p-4 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-primary/10">
                <div className="text-primary text-3xl mb-2">
                  <FaProjectDiagram />
                </div>
                <h4 className="text-lg font-semibold mb-1">Projetos</h4>
                <p>
                  <span
                    className="stat-value text-xl font-bold text-primary"
                    data-value="20"
                  >
                    20
                  </span>
                  + Completos
                </p>
              </div>

              <div className="stat-item bg-card-bg p-4 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-primary/10">
                <div className="text-primary text-3xl mb-2">
                  <FaUsers />
                </div>
                <h4 className="text-lg font-semibold mb-1">Clientes</h4>
                <p>
                  <span
                    className="stat-value text-xl font-bold text-primary"
                    data-value="10"
                  >
                    10
                  </span>
                  + Satisfeitos
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-primary">
            Meus <span className="text-text-light">Serviços</span>
          </h3>

          <div
            ref={servicesRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-card bg-card-bg rounded-lg p-6 shadow-lg transition-all duration-300 cursor-pointer hover:shadow-xl transform ${
                  hoveredService === index ? "scale-105" : ""
                }`}
                style={{
                  borderTop: `3px solid ${
                    hoveredService === index ? service.color : "transparent"
                  }`,
                }}
                onMouseEnter={() => handleServiceHover(index)}
                onMouseLeave={() => handleServiceHover(null)}
                onClick={() => handleServiceClick(service)}
              >
                <div
                  className="icon mb-4 text-4xl"
                  style={{ color: service.color }}
                >
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-text-light">
                  {service.title}
                </h4>
                <p className="text-text-light opacity-80">
                  {service.description.substring(0, 100)}
                  {service.description.length > 100 ? "..." : ""}
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    className="text-sm font-medium flex items-center transition-all duration-300"
                    style={{ color: service.color }}
                  >
                    Saber mais{" "}
                    <FaArrowRight className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de detalhes do serviço */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-bg-dark/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm modal-overlay"
          onClick={() => {
            setSelectedService(null);
            // Restaurar a rolagem normal da página
            document.body.style.overflow = "auto";
          }}
        >
          <div
            id="service-detail-modal"
            className="bg-card-bg p-8 rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de fechar */}
            <button
              onClick={() => {
                setSelectedService(null);
                document.body.style.overflow = "auto";
              }}
              className="modal-close-btn absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-primary transition-colors duration-300 z-10"
              aria-label="Fechar modal"
            >
              ✕
            </button>

            <div className="flex items-center mb-8">
              <div
                id="service-icon"
                className="text-5xl mr-6 transform transition-transform duration-300 hover:scale-110"
                style={{ color: selectedService.color }}
              >
                {selectedService.icon}
              </div>
              <div id="service-content">
                <h3 className="text-3xl font-bold text-text-light mb-2">
                  {selectedService.title}
                </h3>
                <div
                  className="w-20 h-1 rounded-full"
                  style={{ backgroundColor: selectedService.color }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-text-light/80 leading-relaxed">
                {selectedService.description}
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-text-light font-medium mb-4 text-lg">
                Como posso ajudar você?
              </h4>
              <ul className="space-y-3">
                {[1, 2, 3].map((_, index) => (
                  <li key={index} className="flex items-start">
                    <span
                      className="mr-3 text-lg mt-1"
                      style={{ color: selectedService.color }}
                    >
                      <FaLightbulb />
                    </span>
                    <p className="text-text-light/80">
                      {index === 0 &&
                        "Desenvolvimento personalizado de acordo com as necessidades do seu negócio."}
                      {index === 1 &&
                        "Implementação de soluções técnicas modernas e eficientes."}
                      {index === 2 &&
                        "Suporte contínuo e manutenção para garantir o bom funcionamento."}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center">
              <a
                href="#contact-section"
                className="px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-white"
                style={{
                  backgroundColor: selectedService.color,
                }}
                onClick={() => setSelectedService(null)}
              >
                <span className="flex items-center">
                  <FaRocket className="mr-2" /> Solicitar este serviço
                </span>
              </a>
              <button
                className="px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: `${selectedService.color}20`,
                  color: selectedService.color,
                  border: `2px solid ${selectedService.color}`,
                }}
                onClick={() => {
                  setSelectedService(null);
                  // Restaurar a rolagem normal da página
                  document.body.style.overflow = "auto";
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;
