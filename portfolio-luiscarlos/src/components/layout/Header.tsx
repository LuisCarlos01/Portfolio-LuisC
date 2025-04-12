import React, { useState, useEffect, useRef } from "react";
import { useSection } from "../../contexts/SectionContext";
import {
  FaGithub,
  FaLinkedin,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useDarkMode } from "../../contexts/DarkModeContext";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigateToSection, activeSection } = useSection();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const headerRef = useRef<HTMLDivElement>(null);

  // Mapeamento de seções para seus IDs
  const sectionIdMap: Record<string, string> = {
    home: "home",
    about: "about",
    skills: "skills-section",
    portfolio: "portfolio",
    resume: "resume",
    contact: "contact",
    testimonials: "testimonials",
  };

  // Obter o ID correto da seção
  const getSectionId = (section: string): string => {
    return sectionIdMap[section] || section;
  };

  // Manipular a navegação
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: string
  ) => {
    e.preventDefault();
    const sectionId = getSectionId(section);

    // Atualizar a URL com o hash
    window.history.pushState({}, "", `#${sectionId}`);

    // Mostrar a seção
    navigateToSection(section);

    // Rolar até a seção
    scrollToSection(sectionId);

    // Fechar o menu em dispositivos móveis
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Função para rolar até a seção
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const sectionTop = section.offsetTop - headerHeight;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
  };

  // Efeito para adicionar a classe "scrolled" ao header quando a página é rolada
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Efeito para fechar o menu quando a tecla Esc é pressionada
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isMenuOpen]);

  // Verificar o hash na URL ao carregar a página e navegar para a seção correspondente
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // Pequeno atraso para garantir que os componentes estejam montados
      setTimeout(() => {
        const section = Object.entries(sectionIdMap).find(
          ([_, id]) => id === hash
        );
        if (section) {
          navigateToSection(section[0]);
          scrollToSection(hash);
        }
      }, 500);
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-opacity-80 backdrop-blur-md ${
        isScrolled ? "bg-bg-dark py-3 shadow-md" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleNavigation(e, "home")}>
          <div className="font-bold text-2xl text-primary">
            <div
              className="copyright-wrapper"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.reload();
              }}
              title="Clique para atualizar a página"
            >
              <span
                className="copyright-symbol text-primary"
                aria-label="Atualizar página"
              >
                ©
              </span>
              <span className="hidden-text">Code by Luís</span>
            </div>
          </div>
        </a>

        {/* Links de navegação para desktop */}
        <nav className="hidden md:flex space-x-8 ml-auto">
          {Object.entries(sectionIdMap).map(([section, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavigation(e, section)}
              className={`nav-link font-medium transition-colors hover:text-primary ${
                activeSection === section ? "text-primary" : "text-text-light"
              }`}
            >
              {section === "home"
                ? "Início"
                : section === "about"
                ? "Sobre"
                : section === "skills"
                ? "Habilidades"
                : section === "portfolio"
                ? "Portfólio"
                : section === "resume"
                ? "Currículo"
                : section === "contact"
                ? "Contato"
                : section === "testimonials"
                ? "Depoimentos"
                : section}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Botão de alternar tema */}
          <button
            onClick={toggleDarkMode}
            className="text-text-light hover:text-primary transition-colors p-2"
            aria-label="Alternar tema"
          >
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          {/* Links sociais para desktop */}
          <div className="hidden md:flex space-x-4">
            <a
              href="https://github.com/LuisCarlos01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-light hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/luis-carlos-vitoriano-neto-56a58321b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-light hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>

          {/* Botão do menu móvel */}
          <button
            className="md:hidden text-text-light hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Menu móvel */}
      <div
        className={`md:hidden fixed top-[56px] left-0 w-full h-screen bg-bg-dark bg-opacity-95 backdrop-blur-md transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-start pt-10 space-y-6">
          {Object.entries(sectionIdMap).map(([section, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavigation(e, section)}
              className={`nav-link font-medium text-xl py-2 px-4 transition-colors hover:text-primary ${
                activeSection === section ? "text-primary" : "text-text-light"
              }`}
            >
              {section === "home"
                ? "Início"
                : section === "about"
                ? "Sobre"
                : section === "skills"
                ? "Habilidades"
                : section === "portfolio"
                ? "Portfólio"
                : section === "resume"
                ? "Currículo"
                : section === "contact"
                ? "Contato"
                : section === "testimonials"
                ? "Depoimentos"
                : section}
            </a>
          ))}

          {/* Links sociais para o menu móvel */}
          <div className="flex space-x-6 mt-8">
            <a
              href="https://github.com/LuisCarlos01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-light hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://github.com/LuisCarlos01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-light hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
