import { useRef, useEffect, useCallback, memo } from "react";
import { gsap } from "gsap";
import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { Skill, ApplicationArea } from "../../../types/skillsTypes";
import ImageWithFallback from "../../common/ImageWithFallback";

interface SkillDetailModalProps {
  skill: Skill;
  onClose: () => void;
  navigateToProject: (projectId: number) => void;
  getApplicationAreas: (skill: Skill) => ApplicationArea[];
}

/**
 * Modal que exibe informações detalhadas sobre uma habilidade
 */
const SkillDetailModal = ({
  skill,
  onClose,
  navigateToProject,
  getApplicationAreas,
}: SkillDetailModalProps) => {
  // Função para rolar o modal para baixo
  const handleScrollDown = useCallback(() => {
    const modal = document.getElementById("skill-detail-modal");
    if (modal) {
      // Obter a posição atual de rolagem
      const currentScroll = modal.scrollTop;

      // Definir a quantidade de pixels para rolar (300px para baixo)
      const targetScroll = currentScroll + 300;

      // Animar a rolagem com GSAP para uma experiência suave
      gsap.to(modal, {
        scrollTop: targetScroll,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, []);

  // Adicionar ouvinte de evento para tecla Esc
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  // Animar o modal após ele ser renderizado
  useEffect(() => {
    if (document.getElementById("skill-detail-modal")) {
      // Timeline para animar os elementos do modal em sequência
      const tl = gsap.timeline();

      tl.fromTo(
        "#skill-detail-modal",
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        }
      )
        .fromTo(
          "#skill-icon",
          {
            opacity: 0,
            rotate: -30,
            scale: 0.5,
          },
          {
            opacity: 1,
            rotate: 0,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        )
        .fromTo(
          "#skill-info > *",
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .fromTo(
          "#skill-progress",
          {
            width: "0%",
            opacity: 0,
          },
          {
            width: `${skill.level}%`,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          "-=0.2"
        )
        .fromTo(
          "#related-projects .project-item",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.5"
        );

      // Foca no modal para melhorar acessibilidade
      const modalElement = document.getElementById("skill-detail-modal");
      if (modalElement) {
        modalElement.focus();

        // Impede scrolling da página principal
        document.body.style.overflow = "hidden";
      }
    }

    return () => {
      // Restaura scrolling quando o modal é fechado
      document.body.style.overflow = "auto";
    };
  }, [skill.level]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm modal-overlay overflow-y-auto"
      onClick={(e) => {
        // Fechar o modal ao clicar fora dele
        if ((e.target as Element).classList.contains("modal-overlay")) {
          onClose();
        }
      }}
    >
      <div
        id="skill-detail-modal"
        className="bg-card-bg rounded-2xl p-8 max-w-4xl w-full opacity-0 transform styled-scrollbar shadow-xl border border-primary/10 my-10 relative"
        style={{
          maxHeight: "80vh",
          overflowY: "auto",
          background: `linear-gradient(135deg, var(--color-card-bg), var(--color-card-bg) 60%, ${skill.color}10, var(--color-card-bg))`,
          boxShadow: `0 20px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px ${skill.color}20, 0 0 20px ${skill.color}15`,
        }}
        tabIndex={0}
        role="dialog"
        aria-modal="true"
        aria-labelledby="skill-modal-title"
      >
        {/* Elementos decorativos */}
        <div
          className="absolute top-0 right-0 w-40 h-40 opacity-10 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${skill.color}, transparent 70%)`,
            filter: "blur(30px)",
          }}
        ></div>
        <div
          className="absolute bottom-0 left-10 w-60 h-60 opacity-5 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${skill.color}, transparent 70%)`,
            filter: "blur(40px)",
          }}
        ></div>

        {/* Indicador de rolagem para melhorar a usabilidade */}
        <div
          className="absolute bottom-4 right-4 text-text-light text-xs scroll-indicator opacity-70 z-10 cursor-pointer hover:opacity-100 transition-opacity"
          onClick={handleScrollDown}
        >
          <div className="flex flex-col items-center p-2 bg-gray-800 bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mb-1 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <span>Rolar para ver mais</span>
          </div>
        </div>

        {/* Botão flutuante para fechar o modal */}
        <button
          onClick={onClose}
          className="modal-close-btn fixed top-4 right-4 z-50"
          aria-label="Fechar modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Cabeçalho do modal */}
        <div className="flex flex-col md:flex-row items-start md:items-center mb-8 gap-6 relative z-10">
          {/* Ícone da habilidade */}
          <div
            id="skill-icon"
            className="p-6 rounded-2xl shadow-xl relative w-24 h-24 flex items-center justify-center"
            style={{
              backgroundColor: `${skill.color}15`,
              border: `1px solid ${skill.color}40`,
              boxShadow: `0 5px 15px ${skill.color}20, inset 0 0 20px ${skill.color}10`,
            }}
          >
            {/* Efeito de brilho animado */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${skill.color}30, transparent 70%)`,
                  animation: "pulse 3s infinite ease-in-out",
                }}
              ></div>

              {/* Reflexo na borda */}
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background: `linear-gradient(135deg, ${skill.color}30, transparent 50%)`,
                  filter: "blur(5px)",
                }}
              ></div>
            </div>

            {/* Partículas decorativas dentro do ícone */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full animate-ping-slow"
                  style={{
                    backgroundColor: skill.color,
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`,
                    animationDelay: `${i * 0.5}s`,
                    opacity: 0.7,
                    filter: `blur(${Math.random() > 0.7 ? 1 : 0}px)`,
                  }}
                ></div>
              ))}
            </div>

            <div
              id="skill-info"
              className="text-4xl relative z-10"
              style={{ color: skill.color }}
            >
              {skill.icon}
            </div>
          </div>

          <div className="flex-1">
            <h3
              id="skill-modal-title"
              className="text-2xl font-bold mb-3 flex items-center"
            >
              {skill.name}
              <span
                className="ml-3 text-xs px-3 py-1 rounded-full text-white inline-flex items-center"
                style={{
                  background: `linear-gradient(135deg, ${skill.color}, ${skill.color}80)`,
                }}
              >
                {skill.category === "frontend"
                  ? "Frontend"
                  : skill.category === "backend"
                  ? "Backend"
                  : "Outras Ferramentas"}
              </span>
            </h3>

            {/* Barra de progresso */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-text-light font-medium">
                  Nível de Proficiência
                </span>
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: skill.color }}
                  ></div>
                  <span
                    className="font-bold text-lg"
                    style={{ color: skill.color }}
                  >
                    {skill.level}%
                  </span>
                </div>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  id="skill-progress"
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: skill.color,
                    width: "0%", // Inicialmente com largura 0, será animado pelo GSAP
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição da habilidade */}
        <div className="mb-10 skill-content-section">
          <h4 className="text-lg font-semibold mb-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Descrição
          </h4>
          <div className="p-5 rounded-xl bg-gray-800 bg-opacity-30 border border-gray-700">
            <p
              className="text-text-light leading-relaxed"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
            >
              {skill.description}
            </p>
          </div>
        </div>

        {/* Áreas de aplicação */}
        <div className="mb-10 skill-content-section">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>
            Áreas de Aplicação
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getApplicationAreas(skill).map((area, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-gray-700 bg-gray-800 bg-opacity-30 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
                style={{
                  borderLeft: `3px solid ${skill.color}`,
                }}
              >
                <div className="text-lg font-medium mb-1 group-hover:text-primary transition-colors">
                  {area.title}
                </div>
                <p className="text-text-light text-sm">{area.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projetos Relacionados */}
        {skill.relatedProjects && skill.relatedProjects.length > 0 && (
          <div className="skill-content-section" id="related-projects">
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-primary"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>
              Projetos Relacionados
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skill.relatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800 bg-opacity-20 transition-all duration-300 hover:border-primary/30 hover:shadow-xl cursor-pointer transform hover:-translate-y-1 project-item"
                  onClick={() => navigateToProject(project.id)}
                >
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      fallbackSrc="/assets/placeholder.jpg"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h5 className="text-white font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h5>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                      {project.description}
                    </p>
                    <div
                      className="flex items-center justify-center text-xs font-medium px-3 py-1.5 rounded-full w-max text-white transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: skill.color }}
                    >
                      Ver Projeto{" "}
                      <FaExternalLinkAlt className="ml-1.5" size={8} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillDetailModal;
