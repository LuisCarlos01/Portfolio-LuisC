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
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Efeito para animar a transição entre as saudações
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Efeito para animar o carregamento e finalizar o preloader automaticamente
  useEffect(() => {
    // Tempo reduzido para melhorar a experiência do usuário
    const duration = 2500; // 2.5 segundos

    // Timer para finalizar o preloader após a duração
    const timer = setTimeout(() => {
      animatePreloaderExit();
    }, duration);

    return () => clearTimeout(timer);
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
      // Primeiro, animar o logo crescendo (se existir)
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
        delay: 0.2, // Reduzido de 0.5 para 0.2
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
      <div className="text-center">
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
    </div>
  );
};

export default Preloader;
