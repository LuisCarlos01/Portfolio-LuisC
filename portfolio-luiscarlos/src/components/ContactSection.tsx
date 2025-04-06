import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({ type: "", message: "" });

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Animações ao rolar
  useEffect(() => {
    if (!sectionRef.current) return;

    // Animar título
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animar informações de contato
    gsap.fromTo(
      contactInfoRef.current?.querySelectorAll(".contact-info-item") || [],
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        duration: 0.6,
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animar formulário
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animar inputs do formulário
    gsap.fromTo(
      formRef.current?.querySelectorAll(".form-group") || [],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  // Manipular mudanças no formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpar erro específico quando o usuário começa a digitar
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Limpar mensagens de status quando o usuário edita o formulário
    if (submitStatus.type) {
      setSubmitStatus({ type: "", message: "" });
    }
  };

  // Validar formulário
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Nome é obrigatório";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email é inválido";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      errors.subject = "Assunto é obrigatório";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Mensagem é obrigatória";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      errors.message = "Mensagem deve ter pelo menos 10 caracteres";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Enviar formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simular envio para uma API (substituir por chamada real para API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Limpar formulário após envio bem-sucedido
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setSubmitStatus({
        type: "success",
        message: "Mensagem enviada com sucesso! Entrarei em contato em breve.",
      });

      // Animação de sucesso
      gsap.fromTo(
        ".status-message",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Erro ao enviar mensagem. Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="contact-section py-20 px-6 bg-bg-dark section-container"
      ref={sectionRef}
      id="contact-section"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl font-bold text-center text-white mb-4 relative pb-5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary"
          ref={titleRef}
        >
          Entre em Contato
        </h2>

        <p className="text-center text-text-light mb-16 max-w-2xl mx-auto section-description">
          Tem um projeto em mente ou quer discutir uma oportunidade de trabalho?
          Preencha o formulário abaixo e entrarei em contato o mais breve
          possível.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações de contato */}
          <div className="lg:col-span-1" ref={contactInfoRef}>
            <div className="bg-card-bg rounded-xl p-6 md:p-8 mb-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Informações de Contato
              </h3>

              <div className="space-y-6">
                <div className="contact-info-item flex items-start space-x-4">
                  <div className="mt-1 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm text-text-light mb-1">Email</h4>
                    <a
                      href="mailto:contato@luiscarlos.dev"
                      className="text-white hover:text-primary transition-colors"
                    >
                      contato@luiscarlos.dev
                    </a>
                  </div>
                </div>

                <div className="contact-info-item flex items-start space-x-4">
                  <div className="mt-1 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm text-text-light mb-1">Telefone</h4>
                    <a
                      href="tel:+551199999999"
                      className="text-white hover:text-primary transition-colors"
                    >
                      +55 (11) 9 9999-9999
                    </a>
                  </div>
                </div>

                <div className="contact-info-item flex items-start space-x-4">
                  <div className="mt-1 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm text-text-light mb-1">
                      Localização
                    </h4>
                    <p className="text-white">São Paulo, SP - Brasil</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes sociais */}
            <div className="bg-card-bg rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Redes Sociais
              </h3>

              <div className="flex space-x-4">
                <a
                  href="https://github.com/LuisCarlos01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-xl" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-xl" />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Formulário de contato */}
          <div className="lg:col-span-2">
            <div className="bg-card-bg rounded-xl p-6 md:p-8">
              <form onSubmit={handleSubmit} ref={formRef}>
                {submitStatus.type && (
                  <div
                    className={`status-message mb-6 p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label htmlFor="name" className="block text-white mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-bg-dark border ${
                        formErrors.name ? "border-red-500" : "border-gray-700"
                      } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                      placeholder="Seu nome"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="block text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-bg-dark border ${
                        formErrors.email ? "border-red-500" : "border-gray-700"
                      } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                      placeholder="Seu email"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="form-group mt-6">
                  <label htmlFor="subject" className="block text-white mb-2">
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full bg-bg-dark border ${
                      formErrors.subject ? "border-red-500" : "border-gray-700"
                    } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                    placeholder="Assunto da mensagem"
                  />
                  {formErrors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.subject}
                    </p>
                  )}
                </div>

                <div className="form-group mt-6">
                  <label htmlFor="message" className="block text-white mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full bg-bg-dark border ${
                      formErrors.message ? "border-red-500" : "border-gray-700"
                    } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none`}
                    placeholder="Sua mensagem"
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className={`btn active w-full md:w-auto ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      "Enviar Mensagem"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
