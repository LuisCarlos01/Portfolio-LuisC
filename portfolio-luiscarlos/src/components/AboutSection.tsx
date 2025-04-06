import { useEffect, useRef } from "react";
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
} from "react-icons/fa";

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          imageRef.current,
          {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          contentRef.current?.querySelectorAll("p, h3, a"),
          {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          statsRef.current?.querySelectorAll(".stat-item"),
          {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        );

      return () => {
        if (tl) tl.kill();
      };
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="py-20 bg-background section-container"
    >
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-4xl font-bold text-center mb-16 text-text-light"
        >
          Sobre <span className="text-primary">Mim</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative">
            <div className="w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden border-4 border-primary shadow-xl">
              <img
                src="/assets/profile.jpg"
                alt="Luis Carlos"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 border-2 border-primary rounded-lg transform rotate-3 -z-10"></div>
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
              Com mais de 5 anos de experiência no desenvolvimento web, tenho me
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
              className="btn-primary inline-flex items-center mb-8"
            >
              <FaDownload className="mr-2" /> Baixar CV
            </a>

            <div
              ref={statsRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="stat-item bg-card-bg p-4 rounded-lg shadow-md text-center">
                <div className="text-primary text-3xl mb-2">
                  <FaUserGraduate />
                </div>
                <h4 className="text-lg font-semibold mb-1">Experiência</h4>
                <p>5+ Anos</p>
              </div>

              <div className="stat-item bg-card-bg p-4 rounded-lg shadow-md text-center">
                <div className="text-primary text-3xl mb-2">
                  <FaLaptopCode />
                </div>
                <h4 className="text-lg font-semibold mb-1">Projetos</h4>
                <p>50+ Concluídos</p>
              </div>

              <div className="stat-item bg-card-bg p-4 rounded-lg shadow-md text-center">
                <div className="text-primary text-3xl mb-2">
                  <FaLightbulb />
                </div>
                <h4 className="text-lg font-semibold mb-1">Clientes</h4>
                <p>30+ Satisfeitos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="services mt-20">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
            Meus Serviços
          </h3>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            ref={servicesRef}
          >
            <div className="service-card p-8 bg-card-bg rounded-xl text-center hover:bg-primary/10 transition-all duration-300">
              <div className="icon bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center text-2xl text-primary mx-auto mb-6">
                <FaCode />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">
                Desenvolvimento Web
              </h4>
              <p className="text-text-light">
                Criação de sites responsivos, rápidos e otimizados para SEO.
              </p>
            </div>

            <div className="service-card p-8 bg-card-bg rounded-xl text-center hover:bg-primary/10 transition-all duration-300">
              <div className="icon bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center text-2xl text-primary mx-auto mb-6">
                <FaLaptopCode />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">
                Aplicações SPA
              </h4>
              <p className="text-text-light">
                Desenvolvimento de aplicações web modernas com React e
                TypeScript.
              </p>
            </div>

            <div className="service-card p-8 bg-card-bg rounded-xl text-center hover:bg-primary/10 transition-all duration-300">
              <div className="icon bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center text-2xl text-primary mx-auto mb-6">
                <FaMobileAlt />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">
                Design Responsivo
              </h4>
              <p className="text-text-light">
                Criação de interfaces que funcionam perfeitamente em todos os
                dispositivos.
              </p>
            </div>

            <div className="service-card p-8 bg-card-bg rounded-xl text-center hover:bg-primary/10 transition-all duration-300">
              <div className="icon bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center text-2xl text-primary mx-auto mb-6">
                <FaServer />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">
                Integração API
              </h4>
              <p className="text-text-light">
                Conectando seu front-end com APIs e serviços de back-end.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
