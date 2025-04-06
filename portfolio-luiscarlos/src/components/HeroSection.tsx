import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaChevronDown } from "react-icons/fa";
import { BsArrowDown } from "react-icons/bs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Typed from "typed.js";
import { useSection } from "../contexts/SectionContext";

// Registrar plugins GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const scrollIconRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const { showSection } = useSection();
  const [isLoaded, setIsLoaded] = useState(false);

  // Efeito para garantir visibilidade da seção hero
  useEffect(() => {
    // Forçar a visibilidade da seção
    if (sectionRef.current) {
      sectionRef.current.style.display = "flex";
      sectionRef.current.style.opacity = "1";
      sectionRef.current.style.zIndex = "1";
      sectionRef.current.style.visibility = "visible";

      // Marcar como carregada após um pequeno atraso para ativar animações de entrada
      setTimeout(() => setIsLoaded(true), 100);
    }
  }, []);

  // Inicializar o efeito de digitação
  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: ["Desenvolvedor Frontend", "Freelancer", "UI/UX Designer"],
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 1500,
        startDelay: 800,
        loop: true,
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  // Animações GSAP
  useEffect(() => {
    const tl = gsap.timeline();

    // Definir estado inicial
    gsap.set(
      [
        titleRef.current,
        subtitleRef.current,
        contentRef.current,
        socialRef.current,
      ],
      {
        opacity: 0,
        y: 30,
      }
    );

    // Título
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    // Subtítulo
    tl.to(
      subtitleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      },
      "-=0.8"
    );

    // Conteúdo
    tl.to(
      contentRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.7"
    );

    // Links sociais
    tl.to(
      socialRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6"
    );

    // Animação do ícone de scroll
    gsap.to(scrollIconRef.current, {
      y: 15,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Parallax effect on scroll
    if (sectionRef.current) {
      window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        if (titleRef.current) {
          titleRef.current.style.transform = `translateY(${
            scrollPosition * 0.2
          }px)`;
        }
        if (particlesRef.current) {
          particlesRef.current.style.transform = `translateY(${
            scrollPosition * 0.1
          }px)`;
        }
      });
    }

    return () => {
      tl.kill();
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  // Efeito para animar partículas de fundo
  useEffect(() => {
    if (!particlesRef.current) return;

    const particles = particlesRef.current.children;
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i] as HTMLElement;
      gsap.to(particle, {
        x: `random(-20, 20)`,
        y: `random(-20, 20)`,
        duration: `random(3, 5)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1,
      });
    }
  }, [isLoaded]);

  // Função para rolar para a seção "sobre"
  const handleScrollToNext = () => {
    // Ativar a seção via contexto
    showSection("about");

    // Obter a referência da seção
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const sectionTop = aboutSection.offsetTop - headerHeight;

      try {
        // Tentar usar a animação GSAP
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: sectionTop, autoKill: true },
          ease: "power2.inOut",
        });
      } catch (error) {
        // Fallback para o método padrão se o GSAP falhar
        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
        });
      }
    }
  };

  // Gerar partículas aleatórias
  const generateParticles = (count: number) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 6 + 2; // Tamanhos entre 2 e 8px
      particles.push(
        <div
          key={i}
          className="absolute rounded-full opacity-25 bg-primary"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: `blur(${Math.random() > 0.5 ? 1 : 0}px)`,
          }}
        />
      );
    }
    return particles;
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className={`section-container min-h-screen flex items-center justify-center py-24 px-4 relative overflow-hidden
        ${isLoaded ? "hero-loaded" : ""}`}
    >
      {/* Fundo com gradiente melhorado */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-dark via-bg-dark/95 to-primary/10 z-0"></div>

      {/* Elementos decorativos de fundo */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-2xl"></div>

      {/* Partículas */}
      <div ref={particlesRef} className="absolute inset-0 z-0 overflow-hidden">
        {generateParticles(30)}
      </div>

      {/* Linha decorativa */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-40 bg-gradient-to-b from-transparent via-primary/40 to-transparent"></div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-40 bg-gradient-to-b from-transparent via-primary/40 to-transparent"></div>

      <div className="container mx-auto max-w-6xl z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-3/5 space-y-8">
            <h1
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-light leading-tight hero-title"
            >
              Olá, sou{" "}
              <span className="text-primary hero-highlight relative inline-block">
                Luís Carlos
              </span>
            </h1>

            <div
              ref={subtitleRef}
              className="text-2xl md:text-3xl text-gray-300 font-medium mb-4"
            >
              <span>Sou </span>
              <span ref={typedRef} className="text-primary typed-text"></span>
            </div>

            <p
              ref={contentRef}
              className="text-base md:text-lg text-gray-400 max-w-2xl hero-description leading-relaxed"
            >
              Desenvolvedor web apaixonado por criar experiências digitais de
              alta qualidade. Especializado em React, TypeScript e Node.js.
              Focado em performance e acessibilidade.
            </p>

            <div ref={socialRef} className="flex space-x-6 pt-6">
              <a
                href="https://github.com/luiscarlos01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-all transform hover:scale-110 social-link"
                aria-label="GitHub"
              >
                <FaGithub size={28} />
              </a>
              <a
                href="https://linkedin.com/in/luiscarlos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-all transform hover:scale-110 social-link"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-all transform hover:scale-110 social-link"
                aria-label="Twitter"
              >
                <FaTwitter size={28} />
              </a>
            </div>

            {/* Botão de contato */}
            <div className="pt-4">
              <a
                href="#about-section"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToNext();
                }}
                className="inline-block bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-105"
              >
                Conheça meu trabalho
              </a>
            </div>
          </div>

          <div className="w-full md:w-2/5">
            <div className="hero-image-container relative w-full aspect-square rounded-full overflow-hidden border-4 border-primary/30 shadow-xl shadow-primary/20 transform transition-all duration-500 hover:scale-105">
              {/* Brilho de destaque na borda */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/5 animate-pulse-slow"></div>

              <img
                src="public/images/perfil05.JPEG"
                alt="Luís Carlos"
                className="w-full h-full object-cover transform transition-all duration-700 hover:scale-110 filter contrast-110"
                onError={(e) => {
                  // Fallback quando a imagem não carrega
                  (e.target as HTMLImageElement).src =
                    "./public/images/perfil02.JPEG";
                }}
              />

              {/* Overlay de gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-60"></div>
            </div>
          </div>
        </div>

        <div
          ref={scrollIconRef}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20 scroll-indicator"
          onClick={handleScrollToNext}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-gray-400 text-sm font-light">
              Rolar para baixo
            </span>
            <div className="bg-primary/20 hover:bg-primary/30 rounded-full p-3 transition-all duration-300 transform hover:scale-110">
              <FaChevronDown className="text-primary text-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
