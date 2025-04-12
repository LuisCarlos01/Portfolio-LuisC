import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import {
  FaUser,
  FaEnvelope,
  FaPaperPlane,
  FaCommentAlt,
  FaCheck,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import useContactForm from "../../../hooks/useContactForm";
import { ContactFormProps } from "../../../types/contactTypes";
import { contactTexts } from "../../../data/contactData";

// Constantes para animação de digitação
const TYPING_SPEED = 150;
const DELETE_SPEED = 50;
const PAUSE_DURATION = 2000;

/**
 * Componente de formulário de contato com feedback visual e validação
 */
const ContactForm: React.FC<ContactFormProps> = ({ className = "" }) => {
  const {
    formData,
    formErrors,
    isSubmitting,
    submitStatus,
    fieldActivity,
    updateFormData,
    handleFocus: onFocus,
    handleBlur: onBlur,
    submitForm,
  } = useContactForm();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingPaused, setTypingPaused] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);

  // Efeito para animação de placeholder de digitação
  useEffect(() => {
    let timeout: number;
    const currentText = contactTexts.placeholderTexts[typingIndex];

    if (typingPaused) {
      timeout = setTimeout(() => {
        setTypingPaused(false);
        setIsDeleting(true);
      }, PAUSE_DURATION);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (placeholderText.length === 0) {
        setIsDeleting(false);
        setTypingIndex(
          (prevIndex) => (prevIndex + 1) % contactTexts.placeholderTexts.length
        );
      } else {
        timeout = setTimeout(() => {
          setPlaceholderText(
            currentText.substring(0, placeholderText.length - 1)
          );
        }, DELETE_SPEED);
      }
    } else {
      if (placeholderText.length === currentText.length) {
        setTypingPaused(true);
      } else {
        timeout = setTimeout(() => {
          setPlaceholderText(
            currentText.substring(0, placeholderText.length + 1)
          );
        }, TYPING_SPEED);
      }
    }

    return () => clearTimeout(timeout);
  }, [placeholderText, typingIndex, isDeleting, typingPaused]);

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    onFocus(name);

    // Mostrar sugestões se for o campo de assunto
    if (name === "subject") {
      setShowSuggestions(true);
    }

    // Efeito visual
    gsap.to(`#${name}-icon`, {
      color: "var(--color-primary)",
      scale: 1.2,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onBlur(name, value);

    // Esconder sugestões se for o campo de assunto
    if (name === "subject") {
      // Delay para permitir clique nas sugestões
      setTimeout(() => setShowSuggestions(false), 200);
    }

    // Efeito visual
    gsap.to(`#${name}-icon`, {
      color: value ? "var(--color-secondary)" : "var(--color-text-lighter)",
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const selectSubjectSuggestion = (suggestion: string) => {
    updateFormData("subject", suggestion);

    // Animar ícone
    gsap.to("#subject-icon", {
      color: "var(--color-secondary)",
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    setShowSuggestions(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateFormData(name, value);

    // Ajustar altura da textarea
    if (name === "message" && messageRef.current) {
      messageRef.current.style.height = "auto";
      messageRef.current.style.height = `${messageRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await submitForm();

    if (success && formRef.current) {
      // Criar efeito de confete
      const createConfetti = () => {
        const container = document.createElement("div");
        container.className = "confetti-container";
        document.body.appendChild(container);

        const colors = ["#9B59B6", "#8E44AD", "#C39BD3", "#DB1DWF", "#A569BD"];

        // Criar 50 partículas de confete
        for (let i = 0; i < 50; i++) {
          setTimeout(() => {
            const confetti = document.createElement("div");
            confetti.className = "confetti-item";
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;
            const translateX = Math.random() * 400 - 200;
            const translateY = Math.random() * -300 - 100;
            const rotate = Math.random() * 360;

            confetti.style.backgroundColor = color;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.borderRadius = "50%";
            confetti.style.position = "absolute";
            confetti.style.left = "50%";
            confetti.style.top = "50%";
            confetti.style.transform = `translate3d(0, 0, 0) rotate(0deg)`;
            confetti.style.opacity = "1";
            container.appendChild(confetti);

            gsap.to(confetti, {
              x: translateX,
              y: translateY,
              rotation: rotate,
              opacity: 0,
              duration: 2 + Math.random() * 2,
              ease: "power4.out",
              onComplete: () => {
                confetti.remove();
                // Remover o container quando todos os confetes terminarem
                if (container.childElementCount === 0) {
                  container.remove();
                }
              },
            });
          }, i * 20);
        }
      };

      createConfetti();

      // Animação do formulário ao ser enviado com sucesso
      gsap.to(formRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(formRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });
    } else if (!success && formRef.current) {
      // Animação de erro - corrigindo o tipo do parâmetro x
      gsap
        .timeline()
        .to(formRef.current, { x: -10, duration: 0.1 })
        .to(formRef.current, { x: 10, duration: 0.1 })
        .to(formRef.current, { x: -5, duration: 0.1 })
        .to(formRef.current, { x: 5, duration: 0.1 })
        .to(formRef.current, { x: 0, duration: 0.1 });
    }
  };

  const renderSuggestions = () => {
    if (!showSuggestions) return null;

    return (
      <div className="suggestions-dropdown absolute top-full left-0 w-full bg-card-bg-dark border border-gray-700 rounded-md shadow-lg z-20 mt-1">
        <ul>
          {contactTexts.subjectSuggestions.map((suggestion, index) => (
            <li
              key={`suggestion-${index}`}
              className="px-3 py-2 hover:bg-primary/10 cursor-pointer text-sm text-gray-300 hover:text-white transition-colors"
              onClick={() => selectSubjectSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`w-full max-w-xl bg-card-bg rounded-xl p-8 shadow-xl border border-gray-800/40 backdrop-blur-sm relative z-10 ${className}`}
    >
      <h3 className="text-2xl font-bold mb-6 text-center text-white">
        Envie uma mensagem
      </h3>

      {/* Status de envio */}
      {submitStatus.type && (
        <div
          className={`p-4 mb-6 rounded-lg text-sm flex items-center
            ${
              submitStatus.type === "success"
                ? "bg-green-900/20 text-green-300 border border-green-800/40"
                : "bg-red-900/20 text-red-300 border border-red-800/40"
            }
          `}
        >
          {submitStatus.type === "success" ? (
            <FaCheckCircle className="text-xl mr-2 flex-shrink-0" />
          ) : (
            <FaExclamationCircle className="text-xl mr-2 flex-shrink-0" />
          )}
          <span>{submitStatus.message}</span>
        </div>
      )}

      {/* Nome */}
      <div className="mb-6 relative">
        <div
          className={`flex items-center border-2 rounded-lg overflow-hidden
            ${
              fieldActivity.name === "active"
                ? "border-primary"
                : fieldActivity.name === "filled"
                ? "border-secondary"
                : fieldActivity.name === "error"
                ? "border-red-500"
                : "border-gray-700"
            }
          `}
        >
          <div className="px-4 py-3 bg-gray-800/50">
            <FaUser
              id="name-icon"
              className={`text-lg transition 
                ${
                  fieldActivity.name === "active"
                    ? "text-primary"
                    : fieldActivity.name === "filled"
                    ? "text-secondary"
                    : fieldActivity.name === "error"
                    ? "text-red-500"
                    : "text-gray-400"
                }
              `}
            />
          </div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Seu nome"
            className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none text-white placeholder-gray-400"
          />
          {fieldActivity.name === "filled" && !formErrors.name && (
            <div className="px-3">
              <FaCheck className="text-green-400" />
            </div>
          )}
        </div>
        {formErrors.name && (
          <p className="text-red-400 text-sm mt-1 ml-1 flex items-center">
            <FaExclamationCircle className="mr-1" /> {formErrors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="mb-6 relative">
        <div
          className={`flex items-center border-2 rounded-lg overflow-hidden
            ${
              fieldActivity.email === "active"
                ? "border-primary"
                : fieldActivity.email === "filled"
                ? "border-secondary"
                : fieldActivity.email === "error"
                ? "border-red-500"
                : "border-gray-700"
            }
          `}
        >
          <div className="px-4 py-3 bg-gray-800/50">
            <FaEnvelope
              id="email-icon"
              className={`text-lg transition 
                ${
                  fieldActivity.email === "active"
                    ? "text-primary"
                    : fieldActivity.email === "filled"
                    ? "text-secondary"
                    : fieldActivity.email === "error"
                    ? "text-red-500"
                    : "text-gray-400"
                }
              `}
            />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Seu email"
            className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none text-white placeholder-gray-400"
          />
          {fieldActivity.email === "filled" && !formErrors.email && (
            <div className="px-3">
              <FaCheck className="text-green-400" />
            </div>
          )}
        </div>
        {formErrors.email && (
          <p className="text-red-400 text-sm mt-1 ml-1 flex items-center">
            <FaExclamationCircle className="mr-1" /> {formErrors.email}
          </p>
        )}
      </div>

      {/* Assunto */}
      <div className="mb-6 relative">
        <div
          className={`flex items-center border-2 rounded-lg overflow-hidden
            ${
              fieldActivity.subject === "active"
                ? "border-primary"
                : fieldActivity.subject === "filled"
                ? "border-secondary"
                : fieldActivity.subject === "error"
                ? "border-red-500"
                : "border-gray-700"
            }
          `}
        >
          <div className="px-4 py-3 bg-gray-800/50">
            <FaPaperPlane
              id="subject-icon"
              className={`text-lg transition 
                ${
                  fieldActivity.subject === "active"
                    ? "text-primary"
                    : fieldActivity.subject === "filled"
                    ? "text-secondary"
                    : fieldActivity.subject === "error"
                    ? "text-red-500"
                    : "text-gray-400"
                }
              `}
            />
          </div>
          <input
            type="text"
            id="subject"
            name="subject"
            ref={subjectRef}
            value={formData.subject}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Assunto"
            className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none text-white placeholder-gray-400"
          />
          {fieldActivity.subject === "filled" && !formErrors.subject && (
            <div className="px-3">
              <FaCheck className="text-green-400" />
            </div>
          )}
        </div>
        {formErrors.subject && (
          <p className="text-red-400 text-sm mt-1 ml-1 flex items-center">
            <FaExclamationCircle className="mr-1" /> {formErrors.subject}
          </p>
        )}

        {renderSuggestions()}
      </div>

      {/* Mensagem */}
      <div className="mb-6 relative">
        <div
          className={`flex items-start border-2 rounded-lg overflow-hidden
            ${
              fieldActivity.message === "active"
                ? "border-primary"
                : fieldActivity.message === "filled"
                ? "border-secondary"
                : fieldActivity.message === "error"
                ? "border-red-500"
                : "border-gray-700"
            }
          `}
        >
          <div className="px-4 py-3 bg-gray-800/50">
            <FaCommentAlt
              id="message-icon"
              className={`text-lg transition 
                ${
                  fieldActivity.message === "active"
                    ? "text-primary"
                    : fieldActivity.message === "filled"
                    ? "text-secondary"
                    : fieldActivity.message === "error"
                    ? "text-red-500"
                    : "text-gray-400"
                }
              `}
            />
          </div>
          <textarea
            id="message"
            name="message"
            ref={messageRef}
            value={formData.message}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholderText}
            className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none text-white placeholder-gray-400 min-h-[120px] overflow-hidden resize-none"
          ></textarea>
        </div>
        {formErrors.message && (
          <p className="text-red-400 text-sm mt-1 ml-1 flex items-center">
            <FaExclamationCircle className="mr-1" /> {formErrors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold tracking-wide transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
      >
        <span
          className={`transition-all duration-300 ${
            isSubmitting ? "invisible" : "visible"
          }`}
        >
          Enviar mensagem
        </span>
        {isSubmitting && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
          </div>
        )}
        <span className="absolute right-0 -mt-6 -mr-6 w-24 h-24 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-primary-light opacity-5"></span>
      </button>
    </form>
  );
};

export default ContactForm;
