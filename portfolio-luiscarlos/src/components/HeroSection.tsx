import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BsArrowDown } from "react-icons/bs";
import gsap from "gsap";
import Typed from "typed.js";
import { useSection } from "../contexts/SectionContext";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const scrollIconRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const { showSection } = useSection();

  // Efeito para garantir visibilidade da seção hero
  useEffect(() => {
    // Forçar a visibilidade da seção
    if (sectionRef.current) {
      sectionRef.current.style.display = "flex";
      sectionRef.current.style.opacity = "1";
      sectionRef.current.style.zIndex = "1";
      sectionRef.current.style.visibility = "visible";
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
      duration: 0.8,
      ease: "power3.out",
    });

    // Subtítulo
    tl.to(
      subtitleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      },
      "-=0.5"
    );

    // Conteúdo
    tl.to(
      contentRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
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
      "-=0.5"
    );

    // Animação do ícone de scroll
    gsap.to(scrollIconRef.current, {
      y: 15,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Função para rolar para a seção "sobre"
  const handleScrollToNext = () => {
    // Opção 1: Usando o ID da seção
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const sectionTop = aboutSection.offsetTop - headerHeight;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }

    // Opção 2: Usando o contexto para ativar a seção (garante que ela esteja visível)
    showSection("about");
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="section-container bg-gradient-to-b from-bg-dark to-background min-h-screen flex items-center justify-center py-24 px-4 relative"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-3/5 space-y-6">
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-light leading-tight"
            >
              Olá, sou <span className="text-primary">Luís Carlos</span>
            </h1>

            <div
              ref={subtitleRef}
              className="text-xl md:text-2xl text-gray-300 font-medium mb-4"
            >
              <span>Sou </span>
              <span ref={typedRef} className="text-primary"></span>
            </div>

            <p
              ref={contentRef}
              className="text-base md:text-lg text-gray-400 max-w-2xl"
            >
              Desenvolvedor web apaixonado por criar experiências digitais de
              alta qualidade. Especializado em React, TypeScript e Node.js.
              Focado em performance e acessibilidade.
            </p>

            <div ref={socialRef} className="flex space-x-6 pt-4">
              <a
                href="https://github.com/luiscarlos01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/luis-carlos-vitoriano-neto-56a58321b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>

          <div className="w-full md:w-2/5">
            <div className="hero-image-container relative w-full aspect-square rounded-full overflow-hidden border-4 border-primary/30 shadow-xl shadow-primary/20">
              <img
                src="/assets/perfil04.JPEG"
                alt="Luís Carlos"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback quando a imagem não carrega
                  (e.target as HTMLImageElement).src =
                    "./public/assets/perfil02.JPEG";
                }}
              />
            </div>
          </div>
        </div>

        <div
          ref={scrollIconRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onClick={handleScrollToNext}
        >
          <BsArrowDown className="text-primary text-3xl" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
