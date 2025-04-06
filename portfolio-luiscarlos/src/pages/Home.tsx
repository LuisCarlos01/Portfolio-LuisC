import { lazy, Suspense, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Primeiro componente carregado imediatamente para melhor First Contentful Paint
import HeroSection from "../components/HeroSection";

// Lazy loaded sections para melhorar o tempo de carregamento inicial
const AboutSection = lazy(() => import("../components/AboutSection"));
const SkillsSection = lazy(() => import("../components/SkillsSection"));
const PortfolioSection = lazy(() => import("../components/PortfolioSection"));
const ResumeSection = lazy(() => import("../components/ResumeSection"));
const ContactSection = lazy(() => import("../components/ContactSection"));
const TestimonialsSection = lazy(
  () => import("../components/TestimonialsSection")
);

const Home = () => {
  // Efeito para garantir que todas as seções estejam visíveis na carga inicial
  useEffect(() => {
    // Função para verificar se todas as seções estão carregadas e visíveis
    const checkSectionsVisibility = () => {
      // Lista de IDs de seção para verificar
      const sectionIds = [
        "home",
        "about-section",
        "skills-section",
        "portfolio",
        "resume",
        "testimonials",
        "contact-section",
      ];

      // Verificar cada seção
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          // Garante que a primeira seção (home) esteja visível e as outras sejam acessíveis
          if (id === "home") {
            section.style.display = "flex";
            section.style.opacity = "1";
            section.style.zIndex = "1";
          }
        } else {
          console.warn(`Seção com ID ${id} não encontrada no DOM`);
        }
      });
    };

    // Executar a verificação após um pequeno atraso para garantir que o DOM esteja pronto
    const timer = setTimeout(checkSectionsVisibility, 1000);

    // Limpar o timer quando o componente for desmontado
    return () => clearTimeout(timer);
  }, []);

  // Adiciona estilos na página para garantir que o scroll funcione corretamente
  useEffect(() => {
    // Garantir que o overflow esteja ativado para permitir scroll
    document.body.style.overflowY = "auto";
    document.body.style.overflowX = "hidden";

    return () => {
      // Limpar estilos quando o componente for desmontado
      document.body.style.overflowY = "";
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="space-y-24">
        <HeroSection />

        <Suspense fallback={<LoadingSpinner />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <SkillsSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <PortfolioSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ResumeSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <TestimonialsSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
