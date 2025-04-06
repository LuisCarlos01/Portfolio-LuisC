import { lazy, Suspense, useEffect, useState } from "react";
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

// Componente customizado para atrasar a exibição do spinner
const DelayedSpinner = ({ delay = 300 }) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!showSpinner) {
    return null;
  }

  return <LoadingSpinner size="small" color="primary" />;
};

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
            section.style.visibility = "visible";
          } else {
            // Garante que outras seções estejam visíveis, mas com menos destaque
            // Não oculta completamente as seções, apenas reduz sua visibilidade
            if (getComputedStyle(section).display === "none") {
              section.style.display = "block";
            }
            if (getComputedStyle(section).visibility === "hidden") {
              section.style.visibility = "visible";
              section.style.opacity = "0.1"; // Visível, mas com baixa opacidade
              section.style.zIndex = "0";
            }
          }
        } else {
          console.warn(`Seção com ID ${id} não encontrada no DOM`);
        }
      });

      // Força uma verificação final em todas as seções, mesmo que não estejam na lista
      document.querySelectorAll(".section-container").forEach((element) => {
        const section = element as HTMLElement;
        if (getComputedStyle(section).display === "none") {
          console.log(`Corrigindo visibilidade da seção ${section.id}`);
          section.style.display = "block";
          section.style.visibility = "visible";
          section.style.opacity = "0.1";
        }
      });
    };

    // Executar a verificação após um pequeno atraso para garantir que o DOM esteja pronto
    const timer = setTimeout(checkSectionsVisibility, 1000);

    // Executar novamente após 3 segundos para garantir que tudo esteja visível
    const secondTimer = setTimeout(checkSectionsVisibility, 3000);

    // Limpar o timer quando o componente for desmontado
    return () => {
      clearTimeout(timer);
      clearTimeout(secondTimer);
    };
  }, []);

  // Adiciona estilos na página para garantir que o scroll funcione corretamente
  useEffect(() => {
    // Garantir que o overflow esteja ativado para permitir scroll
    document.body.style.overflowY = "auto";
    document.body.style.overflowX = "hidden";

    // Pré-carregar todos os componentes para evitar spinners
    const preloadComponents = async () => {
      try {
        // Pré-carregar todos os componentes em paralelo
        await Promise.all([
          import("../components/AboutSection"),
          import("../components/SkillsSection"),
          import("../components/PortfolioSection"),
          import("../components/ResumeSection"),
          import("../components/TestimonialsSection"),
          import("../components/ContactSection"),
        ]);
      } catch (error) {
        console.error("Erro ao pré-carregar componentes:", error);
      }
    };

    preloadComponents();

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

        <Suspense fallback={<DelayedSpinner />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<DelayedSpinner />}>
          <SkillsSection />
        </Suspense>

        <Suspense fallback={<DelayedSpinner />}>
          <PortfolioSection />
        </Suspense>

        <Suspense fallback={<DelayedSpinner />}>
          <ResumeSection />
        </Suspense>

        <Suspense fallback={<DelayedSpinner />}>
          <TestimonialsSection />
        </Suspense>

        <Suspense fallback={<DelayedSpinner />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
