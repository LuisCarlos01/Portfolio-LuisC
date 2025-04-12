import React, { useEffect } from "react";
import Typed from "typed.js";
import { HeroSubtitleProps } from "../../../types/heroTypes";

/**
 * Componente para o subtítulo animado da seção Hero
 */
const HeroSubtitle: React.FC<HeroSubtitleProps> = ({
  subtitleRef,
  typedRef,
  typedStrings,
}) => {
  // Inicializar o efeito de digitação
  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: typedStrings,
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
  }, [typedStrings]);

  return (
    <div
      ref={subtitleRef}
      className="text-xl md:text-2xl text-gray-300 font-medium mb-4"
    >
      <span>Sou </span>
      <span ref={typedRef} className="text-primary"></span>
    </div>
  );
};

export default React.memo(HeroSubtitle);
