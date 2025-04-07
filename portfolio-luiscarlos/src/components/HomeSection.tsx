import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useSection } from "../contexts/SectionContext";

// Registra o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HomeSection = () => {
  const typedEl = useRef<HTMLSpanElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const btnGroupRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const { showSection } = useSection();

  // Efeito de digitação
  useEffect(() => {
    if (!typedEl.current) return;

    const typed = new Typed(typedEl.current, {
      strings: ["Freelancer", "Front-end Developer", "Web Developer"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
      cursorChar: "|",
      backDelay: 2000,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  // Animações iniciais
  useEffect(() => {
    if (
      !profileRef.current ||
      !textRef.current ||
      !btnGroupRef.current ||
      !socialRef.current
    )
      return;

    // Animação inicial - fade in
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      profileRef.current,
      { scale: 0.8, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 1.2, delay: 0.3 }
    )
      .fromTo(
        textRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
        "-=0.8"
      )
      .fromTo(
        btnGroupRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        "-=0.6"
      )
      .fromTo(
        socialRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          onComplete: () => {
            // Adiciona um efeito sutil de flutuação ao perfil
            gsap.to(profileRef.current!, {
              y: -10,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            });
          },
        },
        "-=0.4"
      );

    // Efeito parallax sutil ao rolar
    gsap.to(textRef.current, {
      y: 100,
      scrollTrigger: {
        trigger: ".hero-header",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  // Função para download do CV
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Alerta para CV não disponível ou abrir em nova aba quando disponível
    alert("O CV estará disponível em breve!");
  };

  // Função para ir para contato
  const navigateToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    showSection("contact");
  };

  // Lidar com erro de carregamento da imagem
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
    const placeholder = e.currentTarget.parentNode?.querySelector(
      ".avatar-placeholder"
    ) as HTMLElement;
    if (placeholder) {
      placeholder.style.display = "flex";
    }
  };

  return (
    <div className="hero-header min-h-screen flex items-center pt-20 pb-10 px-6 bg-bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-dark via-bg-dark to-primary/5 z-0"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-2xl z-0"></div>

      <div className="container max-w-7xl mx-auto z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="hero-pic md:w-2/5 mb-10 md:mb-0" ref={profileRef}>
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto md:mx-0 rounded-full border-4 border-primary/30 overflow-hidden shadow-xl">
              <img
                src="/public/assets/perfil02.JPEG"
                alt="Luís Carlos"
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
              <div className="avatar-placeholder hidden absolute inset-0 bg-primary/20 text-white flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            className="hero-text md:w-3/5 text-center md:text-left"
            ref={textRef}
          >
            <h5 className="text-lg md:text-xl text-text-light mb-2">
              Olá, eu sou{" "}
              <span className="text-primary font-dancing" ref={typedEl}></span>
            </h5>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Luís Carlos
            </h1>
            <p className="text-text-light text-lg max-w-xl mb-8">
              Desenvolvedor front-end apaixonado por criar interfaces
              interativas e responsivas que proporcionam experiências
              excepcionais aos usuários.
            </p>

            <div
              className="btn-group flex flex-wrap justify-center md:justify-start gap-4 mb-8"
              ref={btnGroupRef}
            >
              <a
                href="#"
                onClick={handleDownload}
                className="btn active px-8 py-3"
                aria-label="Download CV"
              >
                Download CV
              </a>
              <a
                href="#contact"
                onClick={navigateToContact}
                className="btn px-8 py-3"
                aria-label="Ir para seção de contato"
              >
                Contato
              </a>
            </div>

            <div
              className="social flex justify-center md:justify-start gap-6"
              ref={socialRef}
            >
              <a
                href="https://github.com/LuisCarlos01"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-white hover:text-primary transition-colors duration-300 text-2xl"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/luiz-carlos-vitoriano-neto-56a58321b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white hover:text-primary transition-colors duration-300 text-2xl"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:luizcarosvitorianoneto@gmail.com"
                aria-label="Email"
                className="text-white hover:text-primary transition-colors duration-300 text-2xl"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
