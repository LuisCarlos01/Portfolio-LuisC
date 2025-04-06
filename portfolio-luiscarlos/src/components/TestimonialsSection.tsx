import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  rating?: number; // Rating de 1 a 5
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Silva",
    role: "CEO",
    company: "Tech Solutions",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    text: "Trabalhar com Luis Carlos foi uma experiência excepcional. Sua atenção aos detalhes e capacidade de entregar projetos de alta qualidade dentro do prazo impressionou toda a nossa equipe.",
    rating: 5,
  },
  {
    id: 2,
    name: "João Oliveira",
    role: "CTO",
    company: "Inovação Digital",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
    text: "Luis possui um conhecimento técnico impressionante e uma habilidade única de transformar conceitos complexos em soluções elegantes. Recomendo fortemente seus serviços.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Costa",
    role: "Gerente de Produto",
    company: "Startup Connect",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    text: "A capacidade do Luis de entender nossos requisitos e transformá-los em uma interface intuitiva e responsiva foi fundamental para o sucesso do nosso produto.",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Efeito de auto-rotação dos depoimentos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  // Efeito de partículas decorativas
  useEffect(() => {
    if (!particlesRef.current || !sectionRef.current) return;

    const particlesContainer = particlesRef.current;
    const sectionHeight = sectionRef.current.offsetHeight;
    const sectionWidth = sectionRef.current.offsetWidth;

    // Limpar partículas existentes
    particlesContainer.innerHTML = "";

    // Criar partículas decorativas (menos do que em outras seções)
    const particleCount = Math.min(
      Math.floor((sectionWidth * sectionHeight) / 60000),
      10
    );

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");

      // Tamanho aleatório
      const size = Math.random() * 4 + 2;

      // Posição aleatória
      const posX = 10 + Math.random() * (sectionWidth - 20);
      const posY = 100 + Math.random() * (sectionHeight - 200);

      // Variável aleatória para animação
      const randomVar = Math.random();

      // Definir estilo da partícula
      particle.className = "particle absolute rounded-full";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.opacity = (0.1 + Math.random() * 0.2).toString();
      particle.style.setProperty("--random", randomVar.toString());

      // Adicionar delay aleatório para cada partícula
      particle.style.animationDelay = `${Math.random() * 5}s`;

      // Adicionar a partícula ao container
      particlesContainer.appendChild(particle);
    }
  }, []);

  // Função para ir ao próximo depoimento com animação
  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection("next");

    // Atualizar índice ativo
    setActiveIndex((prev) => (prev + 1) % testimonials.length);

    // Permitir nova animação após delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  // Função para ir ao depoimento anterior com animação
  const handlePrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection("prev");

    // Atualizar índice ativo
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

    // Permitir nova animação após delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  // Animações iniciais na renderização
  useEffect(() => {
    if (
      !sectionRef.current ||
      !titleRef.current ||
      !descRef.current ||
      !testimonialsRef.current
    )
      return;

    try {
      // Animação do título e descrição com efeito aprimorado
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Animação do card de depoimento com efeito 3D
      gsap.fromTo(
        testimonialsRef.current,
        { opacity: 0, y: 30, rotationX: 5, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      // Animar botões de navegação
      gsap.fromTo(
        ".testimonial-nav-btn",
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 1,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    } catch (error) {
      console.error("Erro na animação dos testemunhos:", error);
    }

    return () => {
      // Limpeza das animações
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Renderizar estrelas com base na avaliação
  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={`${
          index < rating ? "text-yellow-400" : "text-gray-400"
        } text-sm`}
      />
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-20 bg-card-bg section-container relative overflow-hidden"
    >
      {/* Container de partículas */}
      <div
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h2
            ref={titleRef}
            className="text-4xl font-bold mb-4 text-white relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary"
          >
            O que dizem sobre mim
          </h2>
          <p
            ref={descRef}
            className="text-lg mb-16 text-text-light max-w-3xl mx-auto"
          >
            Feedback de clientes e colegas com quem tive o prazer de trabalhar
            em diversos projetos de desenvolvimento e design.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Botões de navegação */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 z-20">
            <button
              onClick={handlePrev}
              className="testimonial-nav-btn w-10 h-10 md:w-12 md:h-12 rounded-full bg-bg-dark text-text-light hover:text-primary hover:bg-bg-dark/80 hover:shadow-lg transition-all duration-300 flex items-center justify-center focus:outline-none transform hover:-translate-x-1"
              aria-label="Depoimento anterior"
              disabled={isAnimating}
            >
              <FaChevronLeft />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 z-20">
            <button
              onClick={handleNext}
              className="testimonial-nav-btn w-10 h-10 md:w-12 md:h-12 rounded-full bg-bg-dark text-text-light hover:text-primary hover:bg-bg-dark/80 hover:shadow-lg transition-all duration-300 flex items-center justify-center focus:outline-none transform hover:translate-x-1"
              aria-label="Próximo depoimento"
              disabled={isAnimating}
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Container do slideshow */}
          <div ref={testimonialsRef} className="relative overflow-hidden">
            <div ref={cardsRef} className="relative h-auto overflow-visible">
              {/* Card principal do depoimento */}
              <div
                className={`bg-bg-dark p-6 md:p-8 rounded-2xl shadow-lg transform transition-all duration-700 relative ${
                  isAnimating
                    ? direction === "next"
                      ? "animate-slide-out-left"
                      : "animate-slide-out-right"
                    : "animate-slide-in"
                }`}
              >
                {/* Ícone de aspas decorativo */}
                <div className="absolute top-6 left-8 text-primary/10 text-6xl transform -translate-y-1/2 -translate-x-1/2">
                  <FaQuoteLeft />
                </div>

                <div className="bg-primary/5 rounded-xl p-5 backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-primary/20 relative shadow-lg">
                        <img
                          src={testimonials[activeIndex].image}
                          alt={testimonials[activeIndex].name}
                          className="w-full h-full object-cover"
                        />
                        {/* Brilho decorativo */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-center justify-center md:justify-start mb-2">
                        {renderStars(testimonials[activeIndex].rating)}
                      </div>
                      <p className="text-text-light text-lg italic mb-4 leading-relaxed relative">
                        "{testimonials[activeIndex].text}"
                      </p>
                      <div className="text-center md:text-left">
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {testimonials[activeIndex].name}
                        </h3>
                        <p className="text-primary">
                          {testimonials[activeIndex].role}
                          {testimonials[activeIndex].company && (
                            <span> • {testimonials[activeIndex].company}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Indicadores de slides */}
          <div className="flex justify-center mt-10 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating && index !== activeIndex) {
                    setIsAnimating(true);
                    setDirection(index > activeIndex ? "next" : "prev");
                    setActiveIndex(index);
                    setTimeout(() => setIsAnimating(false), 700);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-primary w-8"
                    : "bg-gray-600 hover:bg-primary/40"
                }`}
                aria-label={`Depoimento ${index + 1}`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Adicionar ao CSS para as animações de slide */}
      <style>{`
        @keyframes slideOutLeft {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-30px); opacity: 0; }
        }
        
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(30px); opacity: 0; }
        }
        
        @keyframes slideIn {
          from { transform: translateX(${
            direction === "next" ? "30px" : "-30px"
          }); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .animate-slide-out-left {
          animation: slideOutLeft 0.5s forwards;
        }
        
        .animate-slide-out-right {
          animation: slideOutRight 0.5s forwards;
        }
        
        .animate-slide-in {
          animation: slideIn 0.5s forwards;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
