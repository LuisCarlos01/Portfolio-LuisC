/**
 * Função para carregar imagens com fallbacks
 * Tenta múltiplos caminhos para garantir que as imagens sejam carregadas
 */
export const loadImageWithFallbacks = (
  imageElement: HTMLImageElement,
  projectId: number
) => {
  // Lista completa de possíveis caminhos para tentar
  const possiblePaths = [
    // Paths para o Foodie E-commerce (projeto ID 1)
    ...(projectId === 1
      ? [
          "/assets/foodie-ecommerce.jpeg",
          "/foodie-ecommerce.jpeg",
          "/images/foodie-ecommerce.jpeg",
          "/public/images/foodie-ecommerce.jpeg",
          "./assets/foodie-ecommerce.jpeg",
          "../assets/foodie-ecommerce.jpeg",
          "/assets/foodie-ecommerce.jpg",
          "/images/foodie-ecommerce.jpg",
          window.location.origin + "/assets/foodie-ecommerce.jpeg",
          window.location.origin + "/foodie-ecommerce.jpeg",
        ]
      : []),

    // Paths para outros projetos
    imageElement.src, // Caminho original
    imageElement.src.replace(".jpeg", ".jpg"), // Tenta mudar a extensão
    imageElement.src.replace(".jpg", ".jpeg"), // Tenta mudar a extensão
    imageElement.src.replace("/assets/", "/images/"), // Tenta outro diretório
    imageElement.src.replace("/assets/", "/"), // Tenta na raiz
    imageElement.src.replace("/assets/", "/public/images/"), // Tenta em public/images
    window.location.origin + imageElement.src, // Tenta com origem completa
  ];

  // Remove duplicatas e caminhos vazios
  const uniquePaths = [...new Set(possiblePaths)].filter(Boolean);

  // Função para tentar próximo caminho
  let pathIndex = 0;
  const tryNextPath = () => {
    if (pathIndex < uniquePaths.length) {
      const nextPath = uniquePaths[pathIndex] + "?t=" + new Date().getTime();
      console.log(
        `Tentando carregar imagem do projeto ${projectId} com caminho: ${nextPath}`
      );

      imageElement.src = nextPath;
      pathIndex++;

      // Se for o último caminho, removemos o handler para evitar loop infinito
      if (pathIndex >= uniquePaths.length) {
        imageElement.onerror = null;
        console.log(
          `Não foi possível carregar a imagem do projeto ${projectId} após tentar todos os caminhos possíveis.`
        );

        // Define uma imagem de fallback final usando placehold.co
        const fallbackUrl =
          projectId === 1
            ? "https://placehold.co/300x200/gray/white?text=Foodie+E-commerce"
            : `https://placehold.co/300x200/gray/white?text=Projeto+${projectId}`;

        imageElement.src = fallbackUrl;
      }
    }
  };

  // Definir manipulador de erro para tentar próximo caminho
  imageElement.onerror = tryNextPath;

  // Iniciar tentativa com o caminho atual (força um reload)
  const currentSrc = imageElement.src;
  imageElement.src = currentSrc + "?t=" + new Date().getTime();
};
