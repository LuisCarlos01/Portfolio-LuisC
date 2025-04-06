import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const greetings = [
  { text: "Olá", language: "Português" },
  { text: "Hello", language: "English" },
  { text: "Hola", language: "Español" },
  { text: "Bonjour", language: "Français" },
  { text: "Ciao", language: "Italiano" },
  { text: "こんにちは", language: "Japanese" },
  { text: "안녕하세요", language: "Korean" },
  { text: "Hallo", language: "Deutsch" },
  { text: "你好", language: "Chinese" },
  { text: "Привет", language: "Russian" },
  { text: "مرحبا", language: "Arabic" },
  { text: "नमस्ते", language: "Hindi" },
];

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Efeito para animar a transição entre as saudações
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Efeito para animar o carregamento
  useEffect(() => {
    // Simular progresso de carregamento
    let progress = 0;
    const duration = 4000; // 4 segundos
    const interval = 30; // atualizar a cada 30ms
    const increment = (100 * interval) / duration;

    const timer = setInterval(() => {
      progress += increment;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);

        // Animar saída do preloader após o carregamento
        animatePreloaderExit();
      }
      setLoadingProgress(progress);
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Animar texto a cada mudança
  useEffect(() => {
    if (textRef.current && languageRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );

      gsap.fromTo(
        languageRef.current,
        { opacity: 0, y: 10 },
        { opacity: 0.6, y: 0, duration: 0.5, delay: 0.1, ease: "power2.out" }
      );
    }
  }, [currentIndex]);

  // Animar saída do preloader
  const animatePreloaderExit = () => {
    if (preloaderRef.current) {
      // Primeiro, animar o logo crescendo
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          scale: 1.2,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Depois, fazer o fade out do preloader
      gsap.to(preloaderRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.inOut",
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
      <div ref={logoRef} className="mb-12">
        <div className="font-bold text-5xl text-primary">
          Luis<span className="text-text-light">Carlos</span>
        </div>
      </div>

      <div className="text-center mb-12">
        <div
          ref={textRef}
          className="text-5xl md:text-7xl font-bold text-text-light mb-2"
        >
          {greetings[currentIndex].text}
        </div>
        <div ref={languageRef} className="text-sm text-text-light opacity-60">
          {greetings[currentIndex].language}
        </div>
      </div>

      <div className="w-64 h-1 bg-bg-light rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${loadingProgress}%` }}
        ></div>
      </div>

      <div className="mt-4 text-text-light text-sm">
        {Math.round(loadingProgress)}%
      </div>
    </div>
  );
};

export default Preloader;
