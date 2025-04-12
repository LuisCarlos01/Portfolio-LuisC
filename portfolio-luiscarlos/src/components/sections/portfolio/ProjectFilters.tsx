import { gsap } from "gsap";
import { useRef, useEffect } from "react";

interface ProjectFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

/**
 * Componente para filtrar projetos por categoria
 */
const ProjectFilters = ({
  activeFilter,
  setActiveFilter,
}: ProjectFiltersProps) => {
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (filtersRef.current && filtersRef.current.children.length > 0) {
      gsap.fromTo(
        filtersRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: filtersRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-wrap justify-center mb-10 gap-3" ref={filtersRef}>
      <button
        className={`px-5 py-2 rounded-full transition-all duration-300 relative overflow-hidden ${
          activeFilter === "all"
            ? "bg-primary text-white shadow-lg shadow-primary/30"
            : "bg-card-bg text-text-light hover:bg-primary/10"
        }`}
        onClick={() => setActiveFilter("all")}
      >
        <span className="relative z-10">Todos</span>
        {activeFilter === "all" && (
          <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark animate-pulse-slow"></span>
        )}
      </button>

      <button
        className={`px-5 py-2 rounded-full transition-all duration-300 relative overflow-hidden ${
          activeFilter === "web"
            ? "bg-primary text-white shadow-lg shadow-primary/30"
            : "bg-card-bg text-text-light hover:bg-primary/10"
        }`}
        onClick={() => setActiveFilter("web")}
      >
        <span className="relative z-10">Web</span>
        {activeFilter === "web" && (
          <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark animate-pulse-slow"></span>
        )}
      </button>

      <button
        className={`px-5 py-2 rounded-full transition-all duration-300 relative overflow-hidden ${
          activeFilter === "app"
            ? "bg-primary text-white shadow-lg shadow-primary/30"
            : "bg-card-bg text-text-light hover:bg-primary/10"
        }`}
        onClick={() => setActiveFilter("app")}
      >
        <span className="relative z-10">App</span>
        {activeFilter === "app" && (
          <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark animate-pulse-slow"></span>
        )}
      </button>

      <button
        className={`px-5 py-2 rounded-full transition-all duration-300 relative overflow-hidden ${
          activeFilter === "backend"
            ? "bg-primary text-white shadow-lg shadow-primary/30"
            : "bg-card-bg text-text-light hover:bg-primary/10"
        }`}
        onClick={() => setActiveFilter("backend")}
      >
        <span className="relative z-10">Backend</span>
        {activeFilter === "backend" && (
          <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark animate-pulse-slow"></span>
        )}
      </button>
    </div>
  );
};

export default ProjectFilters;
