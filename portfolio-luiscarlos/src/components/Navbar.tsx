import { useState, useEffect, useCallback } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSection } from "./SectionContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");

  // Usar o contexto de seção para a navegação
  const { activeSection, scrollToSection } = useSection();

  // Toggle do menu móvel
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fechar o menu ao clicar em um link
  const handleLinkClick = useCallback(
    (id: string) => {
      // Fechar o menu móvel se estiver aberto
      if (isOpen) {
        setIsOpen(false);
      }

      // Certificar-se de que qualquer modal aberto seja fechado
      const modals = document.querySelectorAll(".modal-overlay");
      modals.forEach((modal) => {
        const closeBtn = modal.querySelector(".modal-close-btn");
        if (closeBtn) {
          (closeBtn as HTMLElement).click();
        }
      });

      // Permitir a rolagem normal
      document.body.style.overflow = "auto";

      // Rolar para a seção
      scrollToSection(id);
    },
    [isOpen, scrollToSection]
  );

  // Detectar rolagem para mudar o estilo da barra de navegação
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Alternar entre temas claro e escuro
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  // Inicializar o tema com base nas preferências do usuário
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-background shadow-lg"
          : "py-4 bg-background bg-opacity-90"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className="text-2xl font-bold text-text-dark"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("home");
          }}
        >
          Luis<span className="text-primary">Carlos</span>
        </a>

        {/* Links de navegação para desktop */}
        <div className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => handleLinkClick("home")}
            className={`nav-link px-3 py-2 rounded-md ${
              activeSection === "home"
                ? "text-primary active"
                : "text-text-dark"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleLinkClick("about")}
            className={`nav-link px-3 py-2 rounded-md ${
              activeSection === "about"
                ? "text-primary active"
                : "text-text-dark"
            }`}
          >
            Sobre
          </button>
          <button
            onClick={() => handleLinkClick("skills")}
            className={`nav-link px-3 py-2 rounded-md ${
              activeSection === "skills"
                ? "text-primary active"
                : "text-text-dark"
            }`}
          >
            Habilidades
          </button>
          <button
            onClick={() => handleLinkClick("portfolio")}
            className={`nav-link px-3 py-2 rounded-md ${
              activeSection === "portfolio"
                ? "text-primary active"
                : "text-text-dark"
            }`}
          >
            Portfólio
          </button>
          <button
            onClick={() => handleLinkClick("resume")}
            className={`nav-link px-3 py-2 rounded-md ${
              activeSection === "resume"
                ? "text-primary active"
                : "text-text-dark"
            }`}
          >
            Currículo
          </button>
          <button
            onClick={() => handleLinkClick("testimonials")}
            className={`nav-link px-3 py-2 rounded-md ${
              activeSection === "testimonials"
                ? "text-primary active"
                : "text-text-dark"
            }`}
          >
            Depoimentos
          </button>
          <button
            onClick={() => handleLinkClick("contact")}
            className={`nav-link px-3 py-2 rounded-md ${
              activeSection === "contact"
                ? "text-primary active"
                : "text-text-dark"
            }`}
          >
            Contato
          </button>

          {/* Botão de alternar tema */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full bg-card-bg hover:bg-primary/10 transition-colors"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? (
              <FaSun className="text-primary" />
            ) : (
              <FaMoon className="text-primary" />
            )}
          </button>
        </div>

        {/* Botão de menu mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full bg-card-bg hover:bg-primary/10 transition-colors"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? (
              <FaSun className="text-primary" />
            ) : (
              <FaMoon className="text-primary" />
            )}
          </button>

          <button
            onClick={toggleMenu}
            className="p-2 rounded-md bg-card-bg focus:outline-none"
            aria-label="Abrir menu"
          >
            {isOpen ? (
              <FiX className="h-6 w-6 text-primary" />
            ) : (
              <FiMenu className="h-6 w-6 text-primary" />
            )}
          </button>
        </div>

        {/* Menu mobile */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background shadow-lg py-4 md:hidden z-50">
            <div className="container mx-auto px-4 flex flex-col space-y-3">
              <button
                onClick={() => handleLinkClick("home")}
                className={`px-3 py-2 rounded-md ${
                  activeSection === "home"
                    ? "text-primary bg-primary/10"
                    : "text-text-dark"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleLinkClick("about")}
                className={`px-3 py-2 rounded-md ${
                  activeSection === "about"
                    ? "text-primary bg-primary/10"
                    : "text-text-dark"
                }`}
              >
                Sobre
              </button>
              <button
                onClick={() => handleLinkClick("skills")}
                className={`px-3 py-2 rounded-md ${
                  activeSection === "skills"
                    ? "text-primary bg-primary/10"
                    : "text-text-dark"
                }`}
              >
                Habilidades
              </button>
              <button
                onClick={() => handleLinkClick("portfolio")}
                className={`px-3 py-2 rounded-md ${
                  activeSection === "portfolio"
                    ? "text-primary bg-primary/10"
                    : "text-text-dark"
                }`}
              >
                Portfólio
              </button>
              <button
                onClick={() => handleLinkClick("resume")}
                className={`px-3 py-2 rounded-md ${
                  activeSection === "resume"
                    ? "text-primary bg-primary/10"
                    : "text-text-dark"
                }`}
              >
                Currículo
              </button>
              <button
                onClick={() => handleLinkClick("testimonials")}
                className={`px-3 py-2 rounded-md ${
                  activeSection === "testimonials"
                    ? "text-primary bg-primary/10"
                    : "text-text-dark"
                }`}
              >
                Depoimentos
              </button>
              <button
                onClick={() => handleLinkClick("contact")}
                className={`px-3 py-2 rounded-md ${
                  activeSection === "contact"
                    ? "text-primary bg-primary/10"
                    : "text-text-dark"
                }`}
              >
                Contato
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
