import { useEffect, useRef } from "react";
import { FaDownload } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    if (contentRef.current) {
      const paragraphs = contentRef.current.querySelectorAll("p");
      if (paragraphs.length > 0) {
        tl.from(
          paragraphs,
          {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }
    }

    if (imageRef.current) {
      tl.from(
        imageRef.current,
        {
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-text-light"
          >
            Sobre <span className="text-primary">Mim</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div ref={contentRef} className="space-y-6 text-text-light">
              <p className="text-lg">
                Olá! Sou Luis Carlos, um desenvolvedor apaixonado por criar
                experiências web únicas e soluções escaláveis.
              </p>

              <p>
                Iniciei minha jornada no desenvolvimento web há 5 anos, quando
                descobri o poder de transformar ideias em experiências
                interativas. Desde então, tenho me dedicado a aprimorar minhas
                habilidades e expandir meu conhecimento em diversas tecnologias
                e frameworks.
              </p>

              <p>
                Minha paixão está em criar aplicações web que não apenas
                funcionem perfeitamente, mas que também proporcionem
                experiências agradáveis para os usuários. Acredito que um bom
                código deve ser limpo, eficiente e facilmente mantido.
              </p>

              <p>
                Quando não estou codando, gosto de explorar novas tecnologias,
                contribuir para projetos open source e compartilhar conhecimento
                com a comunidade de desenvolvedores.
              </p>

              <div className="pt-4">
                <a
                  href="/assets/cv-luiscarlos.pdf"
                  download
                  className="btn-primary inline-flex items-center"
                >
                  <FaDownload className="mr-2" /> Baixar CV
                </a>
              </div>
            </div>

            <div
              ref={imageRef}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <img
                src="/assets/profile-about.jpg"
                alt="Luis Carlos"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8 text-center text-text-light">
              Minha <span className="text-primary">Jornada</span>
            </h2>

            <div className="max-w-3xl mx-auto space-y-12">
              <div className="relative pl-10 pb-10 border-l-2 border-primary">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <div className="bg-card-bg rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    2021 - Presente
                  </h3>
                  <h4 className="text-lg font-semibold text-text-light mb-3">
                    Desenvolvedor Fullstack Sênior
                  </h4>
                  <p className="text-text-light">
                    Lidero o desenvolvimento de aplicações web complexas,
                    arquitetando soluções escaláveis e mantendo o foco na
                    experiência do usuário. Trabalho principalmente com React,
                    Node.js, e TypeScript.
                  </p>
                </div>
              </div>

              <div className="relative pl-10 pb-10 border-l-2 border-primary">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <div className="bg-card-bg rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    2019 - 2021
                  </h3>
                  <h4 className="text-lg font-semibold text-text-light mb-3">
                    Desenvolvedor Frontend
                  </h4>
                  <p className="text-text-light">
                    Desenvolvi interfaces modernas e responsivas para diversas
                    aplicações web, trabalhando principalmente com React, Redux
                    e SASS.
                  </p>
                </div>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <div className="bg-card-bg rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    2018 - 2019
                  </h3>
                  <h4 className="text-lg font-semibold text-text-light mb-3">
                    Desenvolvedor Web Junior
                  </h4>
                  <p className="text-text-light">
                    Iniciei minha carreira trabalhando com HTML, CSS e
                    JavaScript, desenvolvendo sites e pequenas aplicações web.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
