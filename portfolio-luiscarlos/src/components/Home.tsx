import { Suspense, lazy } from "react";
import Header from "./Header";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import PortfolioSection from "./PortfolioSection";
import ContactSection from "./ContactSection";
import LoadingSpinner from "./LoadingSpinner";

// Lazy loading para componentes opcionais futuros
const TestimonialsSection = lazy(() => import("./TestimonialsSection"));

const MainContent = () => {
  return (
    <div className="bg-bg-dark min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <PortfolioSection />
        <Suspense fallback={<LoadingSpinner />}>
          <TestimonialsSection />
        </Suspense>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default MainContent;
