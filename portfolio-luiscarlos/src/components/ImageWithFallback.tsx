import { useState, useEffect, memo } from "react";

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  loading?: "lazy" | "eager";
  quality?: "low" | "medium" | "high";
  objectFit?: React.CSSProperties["objectFit"];
  onClick?: () => void;
}

const ImageWithFallback = ({
  src,
  fallbackSrc = "/assets/placeholder.jpg",
  alt,
  className = "",
  style = {},
  width,
  height,
  loading = "lazy",
  quality = "medium",
  objectFit = "cover",
  onClick,
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Determinando a qualidade da imagem baseada na prop quality
  // Para imagens progressivas, usamos uma versão de baixa qualidade primeiro
  const getLowQualitySrc = (originalSrc: string): string => {
    if (!originalSrc) return fallbackSrc;

    // Qualidade baseada na prop passada
    const qualityMap = {
      low: "?q=10&w=20",
      medium: "?q=30&w=50",
      high: "?q=50&w=100",
    };

    // Caso seja uma URL externa, não temos como adicionar parâmetros
    if (originalSrc.startsWith("http") || originalSrc.startsWith("//")) {
      return originalSrc;
    }

    // Se for um SVG, não precisa de versão de baixa qualidade
    if (originalSrc.endsWith(".svg")) {
      return originalSrc;
    }

    // Adicionando parâmetros de qualidade para a versão de preview
    return `${originalSrc}${qualityMap[quality]}`;
  };

  useEffect(() => {
    // Se a URL da imagem estiver vazia ou for inválida, usar o fallback imediatamente
    if (!src || src === "undefined" || src === "null") {
      setImgSrc(fallbackSrc);
      setError(true);
      return;
    }

    // Carregar uma versão de baixa qualidade primeiro
    const lowQualitySrc = getLowQualitySrc(src);
    setImgSrc(lowQualitySrc);

    // Pré-carregar a imagem de alta qualidade
    const highResImage = new Image();
    highResImage.src = src;

    highResImage.onload = () => {
      setImgSrc(src);
      setIsLoaded(true);
    };

    highResImage.onerror = () => {
      setImgSrc(fallbackSrc);
      setError(true);
    };

    // Cleanup da imagem ao desmontar o componente
    return () => {
      highResImage.onload = null;
      highResImage.onerror = null;
    };
  }, [src, fallbackSrc, quality]);

  // Estilo para blur durante o carregamento
  const blurStyle: React.CSSProperties = {
    filter: !isLoaded && !error ? "blur(8px)" : "none",
    transition: "filter 0.3s ease-out",
    objectFit,
    ...style,
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`transition-all ${
        isLoaded ? "opacity-100" : "opacity-90"
      } ${className}`}
      style={blurStyle}
      width={width}
      height={height}
      loading={loading}
      onLoad={() => {
        if (imgSrc === src) {
          setIsLoaded(true);
        }
      }}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
          setError(true);
        }
      }}
      onClick={onClick}
    />
  );
};

// Usando memo para evitar renderizações desnecessárias
export default memo(ImageWithFallback);
