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
  fallbackSrc = "/placeholder.svg",
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
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;
  const [lowQualitySrc, setLowQualitySrc] = useState<string>("");

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

  // Função para tentar corrigir URLs de imagem
  const generateAlternativeSrc = (originalSrc: string): string => {
    // Se já é uma URL absoluta ou um fallback, não tentar modificar
    if (originalSrc.startsWith("http") || originalSrc === fallbackSrc) {
      return originalSrc;
    }

    // Verificar se já contém /assets/ para evitar duplicação
    const hasAssets = originalSrc.includes("/assets/");
    
    // Tentativas de corrigir caminhos comuns - evitando adicionar assets/ se já existir
    const alternativePaths = [
      originalSrc,
      hasAssets ? originalSrc.replace("/assets/", "/") : originalSrc.replace("/", "/assets/"),
      originalSrc.replace(".jpg", ".jpeg"),
      originalSrc.replace(".jpeg", ".jpg"),
      originalSrc.replace(".png", ".jpg"),
      `/images${originalSrc.startsWith("/") ? "" : "/"}${originalSrc.replace("/assets/", "/")}`,
      `${window.location.origin}${
        originalSrc.startsWith("/") ? "" : "/"
      }${originalSrc}`,
    ];

    // Remover duplicações de /assets/ em todos os caminhos
    const cleanPaths = alternativePaths.map(path => 
      path.replace(/\/assets\/assets\//g, "/assets/")
    );

    // Retorna uma alternativa baseada no retryCount atual
    return cleanPaths[retryCount % cleanPaths.length];
  };

  useEffect(() => {
    // Se a URL da imagem estiver vazia ou for inválida, usar o fallback imediatamente
    if (!src || src === "undefined" || src === "null") {
      setImgSrc(fallbackSrc);
      setError(true);
      return;
    }

    // Reset do estado quando a src muda
    setIsLoaded(false);
    setError(false);

    // Tenta a URL original ou uma alternativa com base no contador de tentativas
    const currentSrc = retryCount === 0 ? src : generateAlternativeSrc(src);

    // Carregar uma versão de baixa qualidade primeiro
    const lowQualityImage = getLowQualitySrc(currentSrc);
    setLowQualitySrc(lowQualityImage);
    setImgSrc(lowQualityImage);

    // Log para depuração
    console.log(`Tentando carregar imagem: ${currentSrc}`);
    console.log(`Versão de baixa qualidade: ${lowQualityImage}`);

    // Pré-carregar a imagem de alta qualidade
    const highResImage = new Image();
    highResImage.src = currentSrc;

    highResImage.onload = () => {
      console.log(`Imagem carregada com sucesso: ${currentSrc}`);
      setImgSrc(currentSrc);
      setIsLoaded(true);
    };

    highResImage.onerror = () => {
      console.error(`Erro ao carregar imagem: ${currentSrc}`);
      // Se ainda temos tentativas, incrementar o contador para tentar um caminho alternativo
      if (retryCount < maxRetries) {
        console.log(`Tentando alternativa ${retryCount + 1}/${maxRetries}`);
        setRetryCount((prev) => prev + 1);
      } else {
        // Esgotadas as tentativas, usar o fallback
        console.log(`Usando fallback: ${fallbackSrc}`);
        setImgSrc(fallbackSrc);
        setError(true);
      }
    };

    // Cleanup da imagem ao desmontar o componente
    return () => {
      highResImage.onload = null;
      highResImage.onerror = null;
    };
  }, [src, fallbackSrc, quality, retryCount]);

  // Estilo para blur durante o carregamento
  const blurStyle: React.CSSProperties = {
    filter: !isLoaded && !error ? "blur(8px)" : "none",
    transition: "filter 0.3s ease-out, opacity 0.5s ease-out",
    objectFit,
    opacity: isLoaded ? 1 : 0.7,
    ...style,
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {!isLoaded && !error && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0.03) 100%)",
            backgroundSize: "200% 100%",
            animation: "pulse-gradient 1.5s ease-in-out infinite",
          }}
        />
      )}

      <img
        src={imgSrc}
        alt={alt}
        className={`w-full h-full transition-all ${
          isLoaded ? "opacity-100" : "opacity-90"
        }`}
        style={blurStyle}
        width={width}
        height={height}
        loading={loading}
        onLoad={() => {
          if (imgSrc !== lowQualitySrc && imgSrc !== fallbackSrc) {
            setIsLoaded(true);
          }
        }}
        onError={() => {
          if (imgSrc !== fallbackSrc && retryCount >= maxRetries) {
            setImgSrc(fallbackSrc);
            setError(true);
          }
        }}
        onClick={onClick}
      />

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30 text-white text-xs">
          <span>Imagem não disponível</span>
        </div>
      )}

      <style>{`
        @keyframes pulse-gradient {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: -200% 0%;
          }
        }
      `}</style>
    </div>
  );
};

// Usando memo para evitar renderizações desnecessárias
export default memo(ImageWithFallback);
