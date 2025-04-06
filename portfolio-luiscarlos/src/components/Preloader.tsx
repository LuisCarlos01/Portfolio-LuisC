import { useEffect, useState, useRef, memo } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

// Reduzir o número de saudações para melhorar o desempenho
const greetings = [
  { text: "Olá", language: "Português" },
  { text: "Hello", language: "English" },
  { text: "Hola", language: "Español" },
  { text: "Bonjour", language: "Français" },
  { text: "こんにちは", language: "Japanese" },
  { text: "안녕하세요", language: "Korean" },
];

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  // Carregar recursos essenciais em segundo plano durante o preloader
  useEffect(() => {
    // Lista de recursos para carregar imediatamente
    const preloadResources = () => {
      // Pré-carregar a fonte principal (já incluída no head, mas garantir)
      const fontLink = document.createElement("link");
      fontLink.rel = "preload";
      fontLink.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
      fontLink.as = "style";
      document.head.appendChild(fontLink);

      // Pré-carregar a imagem de perfil e principais imagens
      const criticalImages = ["/assets/profile.jpg"];
      criticalImages.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    };

    preloadResources();
  }, []);

  // Efeito para animar a transição entre as saudações - usar CSS sempre que possível em vez de GSAP
  useEffect(() => {
    // Reduzir o tempo entre mudanças para encurtar a duração do preloader
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 600); // Reduzido de 800ms para 600ms

    return () => clearInterval(interval);
  }, []);

  // Efeito para finalizar o preloader - reduzido para melhorar o tempo de carregamento
  useEffect(() => {
    // Tempo reduzido para melhorar a experiência do usuário
    const duration = 1800; // Reduzido de 2500ms para 1800ms (1.8 segundos)

    // Timer para finalizar o preloader após a duração
    const timer = setTimeout(() => {
      animatePreloaderExit();
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Animar saída do preloader - simplificado para melhor desempenho
  const animatePreloaderExit = () => {
    if (preloaderRef.current) {
      // Fazer o fade out do preloader diretamente, sem animações intermediárias
      gsap.to(preloaderRef.current, {
        opacity: 0,
        duration: 0.6, // Reduzido de 0.8 para 0.6
        ease: "power2.out",
        onComplete: () => {
          onComplete();
        },
      });
    }
  };

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-bg-dark z-[9999]"
    >
      <div className="text-center">
        <div
          ref={textRef}
          className="text-5xl md:text-6xl font-bold text-text-light mb-2 transition-opacity duration-300 ease-out opacity-100 transform transition-transform animate-fadeIn"
        >
          {greetings[currentIndex].text}
        </div>
        <div
          ref={languageRef}
          className="text-sm text-text-light opacity-60 transition-all duration-300 ease-out"
        >
          {greetings[currentIndex].language}
        </div>
      </div>
    </div>
  );
};

// Usar memo para prevenir renderizações desnecessárias
export default memo(Preloader);
