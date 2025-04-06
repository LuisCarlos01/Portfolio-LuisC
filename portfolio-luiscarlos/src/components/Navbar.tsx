import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("light-mode");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-card-bg shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-dancing font-bold text-primary">
          <span className="text-primary">Luis</span>
          <span className="text-white">Carlos</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "text-primary" : "text-text-light hover:text-primary"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "text-primary" : "text-text-light hover:text-primary"
              }`
            }
          >
            Sobre
          </NavLink>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-card-bg hover:bg-primary hover:bg-opacity-20 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-indigo-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-text-light" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute w-full bg-card-bg py-4 shadow-lg transition-all duration-300 ${
          isOpen ? "top-full opacity-100" : "top-[-490px] opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block py-2 ${
                isActive ? "text-primary" : "text-text-light hover:text-primary"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block py-2 ${
                isActive ? "text-primary" : "text-text-light hover:text-primary"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Sobre
          </NavLink>

          <button
            onClick={toggleTheme}
            className="flex items-center py-2 text-text-light hover:text-primary"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <>
                <FaSun className="mr-2 text-yellow-400" /> Modo Claro
              </>
            ) : (
              <>
                <FaMoon className="mr-2 text-indigo-300" /> Modo Escuro
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
