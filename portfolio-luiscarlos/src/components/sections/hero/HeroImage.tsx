import React from "react";
import { HeroImageProps } from "../../../types/heroTypes";
import ImageWithFallback from "../../common/ImageWithFallback";

/**
 * Componente para a imagem principal da seção Hero
 * Responsivo e com tamanho adaptável a diferentes telas
 */
const HeroImage: React.FC<HeroImageProps> = ({
  imageSrc,
  fallbackSrc,
  alt,
}) => {
  return (
    <div className="relative mx-auto max-w-[280px] md:max-w-[320px] lg:max-w-[360px]">
      <div className="hero-image-container relative aspect-square rounded-full overflow-hidden border-4 border-primary/30 shadow-xl shadow-primary/20">
        {/* Elemento decorativo de fundo */}
        <div className="absolute -right-6 -bottom-6 w-1/2 h-1/2 bg-primary/20 rounded-full blur-xl"></div>

        {/* Utilizando o componente ImageWithFallback para melhor gestão de carregamento */}
        <ImageWithFallback
          src={imageSrc}
          fallbackSrc={fallbackSrc}
          alt={alt}
          className="w-full h-full object-cover"
          loading="eager"
          quality="high"
        />
      </div>

      {/* Elemento decorativo em destaque */}
      <div className="absolute -z-10 inset-0 rounded-full opacity-20 blur-xl bg-primary/30 animate-pulse-slow"></div>
    </div>
  );
};

export default React.memo(HeroImage);
