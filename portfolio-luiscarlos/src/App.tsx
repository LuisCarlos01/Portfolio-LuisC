import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import Preloader from "./components/Preloader";
import AppProviders from "./contexts/AppProviders";

// Lazy loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  // Função para lidar com a conclusão do preloader
  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    // Adicionar classe ao body para ativar animações de entrada
    document.body.classList.add("app-loaded");
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

  if (showPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <div className="app min-h-screen animate-fadeIn">
      <AppProviders>
        <Suspense fallback={<LoadingSpinner fullPage />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppProviders>
    </div>
  );
}

export default App;
