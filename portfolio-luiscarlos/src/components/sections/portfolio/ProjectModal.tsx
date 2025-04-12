import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FaGithub, FaLink } from "react-icons/fa";
import ImageWithFallback from "../../common/ImageWithFallback";
import { Project } from "../../../types/portfolioTypes";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

/**
 * Componente de modal para exibir detalhes de um projeto
 */
const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Impedir rolagem do body enquanto o modal estiver aberto
    document.body.style.overflow = "hidden";

    // Precisamos aguardar que o React renderize o modal antes de tentar animá-lo
    setTimeout(() => {
      const modalElement = modalRef.current;

      if (modalElement) {
        // Primeiro vamos definir o modal como visível, mas com opacidade 0
        modalElement.style.opacity = "0";
        modalElement.style.transform = "translateY(50px)";

        // Forçar uma rolagem imediata para o modal (sem animação suave)
        // para garantir que ele esteja visível antes de animar
        const modalRect = modalElement.getBoundingClientRect();
        const modalTop = modalRect.top + window.scrollY;
        const viewportHeight = window.innerHeight;

        // Calcular posição ideal para centralizar o modal na tela
        const idealScrollPosition =
          modalTop - (viewportHeight - modalRect.height) / 2;

        // Aplicar a rolagem
        window.scrollTo(0, idealScrollPosition);

        // Agora podemos animar o modal com GSAP
        gsap.to(modalElement, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });

        // Adicionar uma notificação visual para debug em dispositivos móveis
        if (window.innerWidth <= 768) {
          const notification = document.createElement("div");
          notification.style.position = "fixed";
          notification.style.bottom = "20px";
          notification.style.left = "50%";
          notification.style.transform = "translateX(-50%)";
          notification.style.backgroundColor = "#9b59b6";
          notification.style.color = "white";
          notification.style.padding = "8px 16px";
          notification.style.borderRadius = "20px";
          notification.style.zIndex = "9999";
          notification.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
          notification.style.opacity = "0";
          notification.textContent = "Projeto aberto!";

          document.body.appendChild(notification);

          // Animar a notificação
          gsap.to(notification, {
            opacity: 1,
            duration: 0.3,
            onComplete: () => {
              setTimeout(() => {
                gsap.to(notification, {
                  opacity: 0,
                  duration: 0.3,
                  onComplete: () => notification.remove(),
                });
              }, 2000);
            },
          });
        }
      }
    }, 50);

    // Cleanup função para restaurar a rolagem e limpar o GSAP
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleCloseModal = () => {
    // Se temos uma referência ao modal
    if (modalRef.current) {
      // Animar saída do modal
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          // Fechar modal após a animação completar
          onClose();
          // Restaurar rolagem do body
          document.body.style.overflow = "";

          // Verificar por notificações criadas e removê-las
          const notifications = document.querySelectorAll(
            'div[style*="position: fixed"][style*="bottom: 20px"]'
          );
          notifications.forEach((notification) => {
            notification.remove();
          });
        },
      });
    } else {
      // Caso a referência não exista, apenas fechamos o modal
      onClose();
      document.body.style.overflow = "";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 modal-overlay"
      onClick={() => handleCloseModal()}
    >
      <div
        className="animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <div className="bg-card-bg rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative">
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-primary transition-colors duration-300 z-10 modal-close-btn"
            onClick={() => handleCloseModal()}
            aria-label="Fechar modal"
          >
            ✕
          </button>

          <div className="relative h-72 md:h-96 overflow-hidden">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white text-3xl font-bold mb-2">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 overflow-y-auto styled-scrollbar flex-grow">
            <p className="text-text-light mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-bg-dark rounded-lg p-4">
                <h4 className="text-primary font-semibold mb-2">Tecnologias</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-sm px-3 py-1 rounded-md bg-card-bg text-text-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-bg-dark rounded-lg p-4">
                <h4 className="text-primary font-semibold mb-2">Links</h4>
                <div className="flex flex-col space-y-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-text-light hover:text-primary transition-colors"
                    >
                      <FaGithub className="mr-2" /> Repositório GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-text-light hover:text-primary transition-colors"
                    >
                      <FaLink className="mr-2" /> Demo ao vivo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
