import React from "react";
import { HeroContentProps } from "../../../types/heroTypes";

/**
 * Componente para o conteúdo textual da seção Hero
 */
const HeroContent: React.FC<HeroContentProps> = ({ contentRef, content }) => {
  return (
    <p
      ref={contentRef}
      className="text-base md:text-lg text-gray-400 max-w-2xl"
    >
      {content}
    </p>
  );
};

export default React.memo(HeroContent);
