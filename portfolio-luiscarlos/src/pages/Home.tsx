import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
// Importar componentes refatorados
import HeroSection from "../components/sections/hero";
import ResumeSection from "../components/sections/resume";
import TestimonialsSection from "../components/sections/testimonials";
import PortfolioSection from "../components/sections/portfolio";
import AboutSection from "../components/sections/about";
import SkillsSection from "../components/sections/skills";
import ContactSection from "../components/sections/contact";

/**
 * Página principal com todas as seções
 */
const Home = () => {
  // Configurar estilos de scroll
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
        {/* Usando a nova implementação do HeroSection */}
        <HeroSection />

        {/* Usando a nova implementação do AboutSection */}
        <AboutSection />

        {/* Usando a nova implementação do SkillsSection */}
        <SkillsSection />

        {/* Usando a nova implementação do PortfolioSection */}
        <PortfolioSection />

        {/* Seções críticas de desempenho carregadas diretamente */}
        <ResumeSection />
        <TestimonialsSection />

        {/* Usando a nova implementação do ContactSection */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
