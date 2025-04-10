import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaQuoteRight,
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
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Configurar referências para os cards
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, testimonials.length);
  }, []);

  // Função para alternar autoplay
  const toggleAutoplay = useCallback(() => {
    setAutoplayEnabled(prev => !prev);
  }, []);

  // Efeito de auto-rotação dos depoimentos com otimização para evitar renderizações desnecessárias
  useEffect(() => {
    if (!autoplayEnabled) {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 8000);

    // Limpar o intervalo ao desmontar
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [activeIndex, isAnimating, autoplayEnabled]);

  // Evento de toque para suporte móvel - início do toque
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);

    // Pausar autoplay durante a interação
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  // Evento de toque para suporte móvel - fim do toque
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Evento de toque para suporte móvel - processamento do gesto
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (!isAnimating) {
      if (isLeftSwipe) {
        handleNext();
      } else if (isRightSwipe) {
        handlePrev();
      }
    }
    
    // Limpar estados de toque
    setTouchStart(null);
    setTouchEnd(null);
    
    // Retomar autoplay após intervalo
    if (autoplayEnabled && !autoplayTimerRef.current) {
      autoplayTimerRef.current = setTimeout(() => {
        autoplayTimerRef.current = setInterval(() => {
          if (!isAnimating) handleNext();
        }, 8000);
      }, 4000);
    }
  };

  // Efeito de partículas decorativas otimizado para melhor performance
  useEffect(() => {
    if (!particlesRef.current || !sectionRef.current) return;

    const particlesContainer = particlesRef.current;
    const sectionHeight = sectionRef.current.offsetHeight;
    const sectionWidth = sectionRef.current.offsetWidth;

    // Limpar partículas existentes
    particlesContainer.innerHTML = "";

    // Criar partículas decorativas (menos do que em outras seções)
    const particleCount = Math.min(
      Math.floor((sectionWidth * sectionHeight) / 90000), // Aumentar divisor para menos partículas
      8 // Limitar número máximo de partículas
    );

    // Criar e adicionar partículas em um só fragmento para melhor performance
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");

      // Tamanho aleatório
      const size = Math.random() * 4 + 2;

      // Posição aleatória evitando áreas de conteúdo importante
      const posX = 10 + Math.random() * (sectionWidth - 20);
      const posY = 100 + Math.random() * (sectionHeight - 200);

      // Variável aleatória para animação
      const randomVar = Math.random();

      // Definir estilo da partícula
      particle.className = "absolute rounded-full particle";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.opacity = (0.1 + Math.random() * 0.2).toString();
      particle.style.setProperty("--random", randomVar.toString());
      particle.style.backgroundColor = `rgba(147, 51, 234, ${0.1 + Math.random() * 0.3})`;
      
      // Adicionar delay aleatório para cada partícula
      particle.style.animationDelay = `${Math.random() * 5}s`;

      // Adicionar a partícula ao fragmento
      fragment.appendChild(particle);
    }

    // Adicionar todas as partículas de uma só vez
    particlesContainer.appendChild(fragment);

    // Reduzir o número de cálculos no loop de animação
    const particleElements = particlesContainer.querySelectorAll('.particle');
    gsap.to(particleElements, {
      y: "random(-30, 30)", 
      x: "random(-20, 20)",
      rotation: "random(-15, 15)",
      repeat: -1,
      yoyo: true,
      duration: "random(4, 7)",
      ease: "sine.inOut",
      stagger: 0.2,
    });
  }, []);

  // Função para ir ao próximo depoimento com animação aprimorada
  const handleNext = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection("next");

    // Aplicar efeito 3D mais realista ao card atual antes de animar para o próximo
    if (cardRefs.current[activeIndex]) {
      gsap.to(cardRefs.current[activeIndex], {
        rotationY: 5,
        scale: 0.95,
        opacity: 0.7,
        duration: 0.3,
        ease: "power2.in"
      });
    }

    // Atualizar índice ativo
    setActiveIndex((prev) => (prev + 1) % testimonials.length);

    // Permitir nova animação após delay
    setTimeout(() => {
      setIsAnimating(false);
      
      // Animar entrada do novo card com efeito 3D inverso
      if (cardRefs.current[(activeIndex + 1) % testimonials.length]) {
        gsap.fromTo(
          cardRefs.current[(activeIndex + 1) % testimonials.length],
          { rotationY: -5, scale: 0.95, opacity: 0.7 },
          { rotationY: 0, scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
    }, 700);
  }, [activeIndex, isAnimating]);

  // Função para ir ao depoimento anterior com animação aprimorada
  const handlePrev = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection("prev");

    // Aplicar efeito 3D mais realista ao card atual antes de animar para o anterior
    if (cardRefs.current[activeIndex]) {
      gsap.to(cardRefs.current[activeIndex], {
        rotationY: -5,
        scale: 0.95,
        opacity: 0.7,
        duration: 0.3,
        ease: "power2.in"
      });
    }

    // Atualizar índice ativo
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

    // Permitir nova animação após delay
    setTimeout(() => {
      setIsAnimating(false);
      
      // Animar entrada do novo card com efeito 3D inverso
      if (cardRefs.current[(activeIndex - 1 + testimonials.length) % testimonials.length]) {
        gsap.fromTo(
          cardRefs.current[(activeIndex - 1 + testimonials.length) % testimonials.length],
          { rotationY: 5, scale: 0.95, opacity: 0.7 },
          { rotationY: 0, scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
    }, 700);
  }, [activeIndex, isAnimating]);

  // Função para saltar diretamente para um testemunho específico
  const jumpToTestimonial = useCallback((index: number) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    setDirection(index > activeIndex ? "next" : "prev");
    
    // Efeito de saída para o card atual
    if (cardRefs.current[activeIndex]) {
      gsap.to(cardRefs.current[activeIndex], {
        scale: 0.9,
        opacity: 0,
        duration: 0.3
      });
    }
    
    // Atualizar índice
    setActiveIndex(index);
    
    // Permitir novas animações após delay
    setTimeout(() => {
      setIsAnimating(false);
      
      // Animar entrada do novo card
      if (cardRefs.current[index]) {
        gsap.fromTo(
          cardRefs.current[index],
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.4)" }
        );
      }
    }, 400);
  }, [activeIndex, isAnimating]);

  // Animações iniciais na renderização otimizadas e aprimoradas
  useEffect(() => {
    if (!sectionRef.current) return;

    // Timeline para coordenar animações com melhor performance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      }
    });

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        }
      );
    }

    if (descRef.current) {
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      );
    }

    if (testimonialsRef.current) {
      tl.fromTo(
        testimonialsRef.current,
        { opacity: 0, y: 30, rotationX: 5, scale: 0.95, transformPerspective: 600 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Destaque especial para o card ativo
      if (cardRefs.current[activeIndex]) {
        tl.fromTo(
          cardRefs.current[activeIndex],
          { scale: 0.95, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
          { 
            scale: 1, 
            boxShadow: "0 20px 35px rgba(147, 51, 234, 0.15)", 
            duration: 0.8,
            ease: "back.out(1.2)" 
          },
          "-=0.5"
        );
      }
    }

    // Animar botões de navegação com efeito elástico
    tl.fromTo(
      ".testimonial-nav-btn",
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.15,
      },
      "-=0.7"
    );

    // Animar indicadores de slides com efeito de cascata
    tl.fromTo(
      ".slide-indicator",
      { opacity: 0, y: 20, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(2)",
      },
      "-=0.4"
    );

    return () => {
      // Limpeza otimizada das animações
      tl.kill();
    };
  }, [activeIndex]);

  // Renderizar estrelas com efeito de brilho
  const renderStars = useCallback((rating: number = 5) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={`${
          index < rating 
            ? "text-yellow-400 animate-star-glow" 
            : "text-gray-400"
        } text-sm transition-all duration-300`}
      />
    ));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-900 to-black"
      data-section="testimonials"
    >
      {/* Container de partículas */}
      <div
        ref={particlesRef}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      ></div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="text-center">
          <h2
            ref={titleRef}
            className="mb-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600"
          >
            O que dizem sobre mim
          </h2>
          <p
            ref={descRef}
            className="max-w-3xl mx-auto mb-16 text-lg text-gray-300"
          >
            Feedback de clientes e colegas com quem tive o prazer de trabalhar
            em diversos projetos de desenvolvimento e design.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Botões de navegação */}
          <div className="absolute left-0 z-20 -translate-y-1/2 top-1/2 md:-left-12">
            <button
              onClick={handlePrev}
              className="testimonial-nav-btn w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-800 text-gray-300 hover:text-purple-400 hover:bg-gray-700 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300 flex items-center justify-center focus:outline-none transform hover:-translate-x-1"
              aria-label="Depoimento anterior"
              disabled={isAnimating}
            >
              <FaChevronLeft />
            </button>
          </div>

          <div className="absolute right-0 z-20 -translate-y-1/2 top-1/2 md:-right-12">
            <button
              onClick={handleNext}
              className="testimonial-nav-btn w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-800 text-gray-300 hover:text-purple-400 hover:bg-gray-700 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300 flex items-center justify-center focus:outline-none transform hover:translate-x-1"
              aria-label="Próximo depoimento"
              disabled={isAnimating}
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Container do slideshow com suporte para gestos de toque */}
          <div 
            ref={testimonialsRef} 
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div ref={cardsRef} className="relative h-auto overflow-visible perspective-1000">
              {/* Card principal do depoimento */}
              <div
                ref={(el) => (cardRefs.current[activeIndex] = el)}
                className={`bg-gray-800/90 p-6 md:p-8 rounded-2xl shadow-xl backdrop-blur-sm transform transition-all duration-700 relative ${
                  isAnimating
                    ? direction === "next"
                      ? "animate-slide-out-left"
                      : "animate-slide-out-right"
                    : "animate-slide-in"
                } cursor-grab active:cursor-grabbing`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Ícones de aspas decorativos */}
                <div className="absolute text-6xl transform -translate-x-1/2 -translate-y-1/2 top-6 left-8 text-purple-500/20 rotate-12">
                  <FaQuoteLeft />
                </div>
                <div className="absolute text-4xl transform translate-x-1/2 translate-y-1/2 bottom-6 right-8 text-purple-500/10 -rotate-12">
                  <FaQuoteRight />
                </div>

                <div className="p-5 bg-purple-900/5 rounded-xl backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                    <div className="flex-shrink-0">
                      <div className="relative w-20 h-20 overflow-hidden border-4 rounded-full shadow-lg md:w-24 md:h-24 border-purple-500/20 group">
                        <img
                          src={testimonials[activeIndex].image}
                          alt={testimonials[activeIndex].name}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Brilho decorativo */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-center justify-center gap-1 mb-3 md:justify-start">
                        {renderStars(testimonials[activeIndex].rating)}
                      </div>
                      <p className="relative mb-5 text-lg italic leading-relaxed text-gray-300">
                        "{testimonials[activeIndex].text}"
                      </p>
                      <div className="text-center md:text-left">
                        <h3 className="mb-1 text-xl font-semibold text-white">
                          {testimonials[activeIndex].name}
                        </h3>
                        <p className="text-purple-400">
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

          {/* Controles e indicadores */}
          <div className="flex flex-col items-center justify-between mt-10 md:flex-row">
            {/* Indicadores de slides aprimorados */}
            <div className="flex justify-center mb-4 space-x-3 md:mb-0">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => jumpToTestimonial(index)}
                  className={`slide-indicator w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-purple-500 w-8 shadow-[0_0_10px_rgba(147,51,234,0.5)]"
                      : "bg-gray-600 hover:bg-purple-400/40"
                  }`}
                  aria-label={`Depoimento ${index + 1}`}
                  disabled={isAnimating}
                />
              ))}
            </div>

            {/* Botão de autoplay */}
            <button 
              onClick={toggleAutoplay}
              className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${
                autoplayEnabled 
                  ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <span className={`w-3 h-3 rounded-full ${autoplayEnabled ? 'bg-purple-400' : 'bg-gray-500'}`}></span>
              {autoplayEnabled ? 'Autoplay ativo' : 'Autoplay pausado'}
            </button>
          </div>
        </div>
      </div>

      {/* Estilos para as animações */}
      <style>{`
        @keyframes slideOutLeft {
          from { transform: translateX(0) rotateY(0deg); opacity: 1; }
          to { transform: translateX(-50px) rotateY(-5deg); opacity: 0; }
        }
        
        @keyframes slideOutRight {
          from { transform: translateX(0) rotateY(0deg); opacity: 1; }
          to { transform: translateX(50px) rotateY(5deg); opacity: 0; }
        }
        
        @keyframes slideIn {
          from { 
            transform: translateX(${direction === "next" ? "50px" : "-50px"}) 
                      rotateY(${direction === "next" ? "5deg" : "-5deg"}); 
            opacity: 0; 
          }
          to { transform: translateX(0) rotateY(0deg); opacity: 1; }
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

        .perspective-1000 {
          perspective: 1000px;
        }

        @keyframes starGlow {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(250, 202, 21, 0.5)); }
          50% { filter: drop-shadow(0 0 5px rgba(250, 202, 21, 0.8)); }
        }

        .animate-star-glow {
          animation: starGlow 2s ease-in-out infinite;
        }

        .particle {
          background-color: rgba(147, 51, 234, 0.2);
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
