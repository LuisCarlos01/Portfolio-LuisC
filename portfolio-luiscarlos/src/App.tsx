import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Preloader from "./components/Preloader";
import AppProviders from "./contexts/AppProviders";

// Lazy loaded pages com importação padrão
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  // Função para lidar com a conclusão do preloader
  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    // Adicionar classe ao body para ativar animações de entrada
    document.body.classList.add("app-loaded");

    // Definir um timeout para considerar a aplicação totalmente carregada
    setTimeout(() => {
      setIsAppLoaded(true);
    }, 2000);
  };

  // Efeito para prevenir o scroll durante o preloader
  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showPreloader]);

  // Efeito otimizado para garantir visibilidade de todas as seções - executado apenas uma vez após o preloader
  useEffect(() => {
    if (showPreloader) return; // Não verificar durante o preloader

    // Lista de IDs de seção críticas (reduzida para apenas as essenciais)
    const criticalSectionIds = ["home", "about", "skills-section", "portfolio"];

    // Função otimizada para garantir visibilidade apenas das seções críticas
    const ensureCriticalSectionsVisibility = () => {
      // Verificar apenas as seções críticas pelo ID
      criticalSectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const style = window.getComputedStyle(section);
          if (style.display === "none" || style.visibility === "hidden") {
            section.style.display = "block";
            section.style.visibility = "visible";
            section.style.opacity = "1";
          }
        }
      });
    };

    // Executar a verificação apenas uma vez após o preloader
    const initialCheck = setTimeout(ensureCriticalSectionsVisibility, 500);

    // Uma verificação adicional após um período mais longo
    const finalCheck = setTimeout(ensureCriticalSectionsVisibility, 2000);

    return () => {
      clearTimeout(initialCheck);
      clearTimeout(finalCheck);
    };
  }, [showPreloader]);

  // Efeito para pré-carregar imagens essenciais após o carregamento principal da aplicação
  useEffect(() => {
    if (!isAppLoaded) return;

    // Lista de imagens essenciais para pré-carregar
    const essentialImages = [
      "/assets/profile.jpg",
      "/foodie-ecommerce.jpeg",
      "/assets/Responsive web design.jpeg",
    ];

    // Pré-carregar imagens em segundo plano
    essentialImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [isAppLoaded]);

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <div
        className={`app min-h-screen ${!showPreloader ? "animate-fadeIn" : ""}`}
      >
        <AppProviders>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppProviders>
      </div>
    </>
  );
}

export default App;
