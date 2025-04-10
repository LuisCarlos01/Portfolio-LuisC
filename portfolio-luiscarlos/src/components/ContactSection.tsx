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
  FaCheckCircle,
  FaExclamationCircle,
  FaUser,
  FaPaperPlane,
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
  // Estado para rastrear campos focados e preenchidos
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [fieldActivity, setFieldActivity] = useState<{
    [key: string]: "active" | "filled" | "error" | "";
  }>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Criar efeito de partículas decorativas
  useEffect(() => {
    if (!particlesRef.current || !sectionRef.current) return;

    const particlesContainer = particlesRef.current;
    const sectionHeight = sectionRef.current.offsetHeight;
    const sectionWidth = sectionRef.current.offsetWidth;

    // Limpar partículas existentes
    particlesContainer.innerHTML = "";

    // Número de partículas baseado no tamanho da seção
    const particleCount = Math.min(
      Math.floor((sectionWidth * sectionHeight) / 35000),
      25
    );

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");

      // Tamanho aleatório
      const size = Math.random() * 6 + 3;

      // Posição aleatória (evitando bordas)
      const posX = 10 + Math.random() * (sectionWidth - 20);
      const posY = 50 + Math.random() * (sectionHeight - 100);

      // Variável aleatória para animação
      const randomVar = Math.random();
      
      // Definir estilo da partícula
      particle.className = "particle absolute rounded-full";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.opacity = (0.1 + Math.random() * 0.3).toString();
      particle.style.background = i % 3 === 0 ? 'rgba(108, 92, 231, 0.2)' : 'rgba(255, 255, 255, 0.1)';
      particle.style.setProperty("--random", randomVar.toString());
      particle.style.boxShadow = i % 5 === 0 ? '0 0 10px 2px rgba(108, 92, 231, 0.1)' : '';

      // Adicionar delay aleatório para cada partícula
      particle.style.animationDelay = `${Math.random() * 8}s`;
      particle.style.animationDuration = `${15 + Math.random() * 15}s`;

      // Adicionar a partícula ao container
      particlesContainer.appendChild(particle);
    }
    
    // Adicionar efeito de movimento parallax suave nas partículas
    if (sectionRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) - 0.5;
        const y = (clientY / window.innerHeight) - 0.5;
        
        const particles = particlesContainer.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
          const speed = 0.05 + (index % 4) * 0.01;
          const elParticle = particle as HTMLElement;
          gsap.to(elParticle, {
            x: x * 30 * speed,
            y: y * 30 * speed,
            duration: 1,
            ease: "power1.out"
          });
        });
      };
      
      sectionRef.current.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        if (sectionRef.current) {
          sectionRef.current.removeEventListener('mousemove', handleMouseMove);
        }
      };
    }
  }, []);

  // Animações ao rolar - aprimoradas
  useEffect(() => {
    if (!sectionRef.current) return;

    // Animar título com efeito de destaque mais dramático
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Adicionar efeito de brilho ao título após aparecer
      gsap.to(titleRef.current.querySelector('span'), {
        width: '100%',
        delay: 1.2,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });
    }

    // Animar informações de contato com efeito de cascata
    if (contactInfoRef.current) {
      const contactItems =
        contactInfoRef.current.querySelectorAll(".contact-info-item");

      if (contactItems.length > 0) {
        gsap.fromTo(
          contactItems,
          { opacity: 0, x: -40, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: contactInfoRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }

    // Animar links sociais com efeito de rotação
    if (contactInfoRef.current) {
      const socialLinks =
        contactInfoRef.current.querySelectorAll(".social-icon");

      if (socialLinks.length > 0) {
        gsap.fromTo(
          socialLinks,
          { opacity: 0, scale: 0, rotation: -30 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "elastic.out(1.2, 0.5)",
            scrollTrigger: {
              trigger: socialLinks[0],
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onComplete: () => {
              // Adicionar pequena animação de pulso nos ícones
              gsap.to(socialLinks, {
                scale: 1.1,
                duration: 0.3,
                stagger: 0.1,
                repeat: 1,
                yoyo: true,
                ease: "power1.inOut"
              });
            }
          }
        );
      }
    }

    // Animar formulário com efeito de deslizamento e destaque
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          onComplete: () => {
            // Adicionar efeito de brilho ao redor do formulário
            gsap.fromTo(
              formRef.current,
              { boxShadow: "0 0 0 rgba(108, 92, 231, 0)" },
              { 
                boxShadow: "0 0 20px rgba(108, 92, 231, 0.15)",
                duration: 1.5,
                ease: "power2.inOut"
              }
            );
          }
        }
      );
    }

    // Animar campos do formulário sequencialmente
    if (formRef.current) {
      const formGroups = formRef.current.querySelectorAll(".form-group");

      if (formGroups.length > 0) {
        gsap.fromTo(
          formGroups,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.7,
            delay: 0.3,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }
  }, []);

  // Manipular foco nos campos do formulário
  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setFocusedField(name);
    setFieldActivity((prev) => ({
      ...prev,
      [name]: "active",
    }));
    
    // Adicionar efeito de destaque ao campo focado
    gsap.to(e.target, {
      borderColor: 'rgb(108, 92, 231)',
      borderWidth: '2px',
      duration: 0.3,
      ease: "power2.out"
    });
    
    // Efeito de entrada do ícone ao lado
    const iconContainer = e.target.parentElement?.querySelector('div');
    if (iconContainer) {
      gsap.fromTo(
        iconContainer,
        { opacity: 0.4, scale: 1, x: 0 },
        { opacity: 0, scale: 0.8, x: -5, duration: 0.3, ease: "back.in(1.5)" }
      );
    }
  };

  // Manipular perda de foco dos campos
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFocusedField(null);

    // Definir estado do campo com base no valor e erros
    let newState = "";
    if (value.trim()) {
      newState = formErrors[name as keyof FormErrors] ? "error" : "filled";
    }
    
    setFieldActivity((prev) => ({
      ...prev,
      [name]: newState,
    }));
    
    // Animação para o campo quando não está mais focado
    const hasError = formErrors[name as keyof FormErrors];
    gsap.to(e.target, {
      borderColor: hasError ? 'rgba(239, 68, 68, 0.5)' : 
                   value.trim() ? 'rgba(108, 92, 231, 0.5)' : 
                   'rgba(75, 85, 99, 0.2)',
      borderWidth: '2px',
      duration: 0.3,
      ease: "power2.out"
    });
    
    // Reaparecer o ícone se o campo estiver vazio
    if (!value.trim()) {
      const iconContainer = e.target.parentElement?.querySelector('div');
      if (iconContainer) {
        gsap.fromTo(
          iconContainer,
          { opacity: 0, scale: 0.8, x: -5 },
          { opacity: 0.4, scale: 1, x: 0, duration: 0.3, ease: "back.out(1.5)" }
        );
      }
    }
  };

  // Manipular mudanças no formulário com feedback visual aprimorado
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validação em tempo real para feedback imediato
    let fieldError = "";

    if (name === "email" && value.trim() && !/\S+@\S+\.\S+/.test(value)) {
      fieldError = "Email inválido";
    } else if (name === "message" && value.trim() && value.length < 10) {
      fieldError = "Mensagem muito curta";
    }

    // Atualizar erros do campo específico
    setFormErrors((prev) => ({
      ...prev,
      [name]: fieldError || undefined,
    }));

    // Atualizar estado do campo
    if (value.trim()) {
      const newState = fieldError ? "error" : "filled";
      setFieldActivity((prev) => ({
        ...prev,
        [name]: newState,
      }));
      
      // Atualizar cor da borda com base no estado
      gsap.to(e.target, {
        borderColor: fieldError ? 'rgba(239, 68, 68, 0.5)' : 'rgba(108, 92, 231, 0.7)',
        duration: 0.2
      });
    }

    // Limpar mensagens de status quando o usuário edita o formulário
    if (submitStatus.type) {
      setSubmitStatus({ type: "", message: "" });
    }
  };

  // Validar formulário com feedback visual melhorado
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;
    const newFieldActivity = { ...fieldActivity };

    if (!formData.name.trim()) {
      errors.name = "Nome é obrigatório";
      newFieldActivity.name = "error";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
      newFieldActivity.email = "error";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email é inválido";
      newFieldActivity.email = "error";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      errors.subject = "Assunto é obrigatório";
      newFieldActivity.subject = "error";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Mensagem é obrigatória";
      newFieldActivity.message = "error";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      errors.message = "Mensagem deve ter pelo menos 10 caracteres";
      newFieldActivity.message = "error";
      isValid = false;
    }

    setFormErrors(errors);
    setFieldActivity(newFieldActivity);

    // Efeito visual de "shake" para campos com erro
    if (!isValid && formRef.current) {
      const errorFields = formRef.current.querySelectorAll(".error-field");
      gsap.fromTo(
        errorFields,
        { x: -5 },
        { x: 5, duration: 0.1, repeat: 3, yoyo: true, ease: "power2.inOut" }
      );
    }

    return isValid;
  };

  // Enviar formulário com animações e feedback aprimorados
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Animar botão quando estiver enviando
    const submitButton = e.currentTarget.querySelector('button[type="submit"]');
    if (submitButton) {
      gsap.to(submitButton, {
        scale: 0.98,
        boxShadow: '0 0 15px rgba(108, 92, 231, 0.5)',
        duration: 0.2
      });
    }

    try {
      // Simular envio para uma API (substituir por chamada real para API)
      await new Promise((resolve) => setTimeout(resolve, 1800));

      // Limpar formulário após envio bem-sucedido
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Resetar estado dos campos
      setFieldActivity({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Definir status de sucesso
      setSubmitStatus({
        type: "success",
        message: "Mensagem enviada com sucesso! Entrarei em contato em breve.",
      });

      // Animar todos os campos para mostrar que foram limpos
      if (formRef.current) {
        const inputs = formRef.current.querySelectorAll('input, textarea');
        gsap.fromTo(
          inputs,
          { borderColor: 'rgba(108, 92, 231, 0.7)' },
          { 
            borderColor: 'rgba(75, 85, 99, 0.2)', 
            duration: 0.5,
            stagger: 0.1
          }
        );
        
        // Efeito de confete para sucesso
        const confettiColors = ['#6c5ce7', '#a29bfe', '#9b59b6', '#8e44ad', '#FFFFFF'];
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none';
        formRef.current.appendChild(confettiContainer);
        
        // Criar confetes
        for (let i = 0; i < 50; i++) {
          const confetti = document.createElement('div');
          confetti.className = 'absolute rounded-sm';
          confetti.style.width = `${Math.random() * 8 + 5}px`;
          confetti.style.height = `${Math.random() * 4 + 3}px`;
          confetti.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
          confetti.style.left = `${Math.random() * 100}%`;
          confetti.style.top = '0';
          confetti.style.opacity = '1';
          confettiContainer.appendChild(confetti);
          
          // Animar confete
          gsap.to(confetti, {
            y: `${100 + Math.random() * 150}%`,
            x: `${(Math.random() - 0.5) * 80}px`,
            rotation: Math.random() * 360,
            opacity: 0,
            duration: 1.5 + Math.random(),
            ease: "power1.out",
            onComplete: () => confetti.remove()
          });
        }
        
        // Remover o container após a animação
        setTimeout(() => confettiContainer.remove(), 3000);

        // Animação de sucesso mais elaborada no formulário
        gsap.fromTo(
          formRef.current,
          { boxShadow: "0 0 0 rgba(155, 89, 182, 0)" },
          {
            boxShadow:
              "0 0 30px rgba(155, 89, 182, 0.3), 0 0 10px rgba(155, 89, 182, 0.2)",
            duration: 0.7,
            repeat: 1,
            yoyo: true,
          }
        );

        // Animar mensagem de status
        gsap.fromTo(
          ".status-message",
          { opacity: 0, y: -20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          }
        );
      }
    } catch (error) {
      // Definir status de erro
      setSubmitStatus({
        type: "error",
        message: "Erro ao enviar mensagem. Por favor, tente novamente.",
      });

      // Animação para erro
      if (formRef.current) {
        // Efeito de "shake" no formulário para erro
        gsap.fromTo(
          formRef.current,
          { x: -10 },
          { x: 10, duration: 0.1, repeat: 3, yoyo: true, ease: "power2.inOut" }
        );
        
        // Animar mensagem de status
        gsap.fromTo(
          ".status-message",
          { opacity: 0, x: 20, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "power3.out" }
        );
      }
    } finally {
      setIsSubmitting(false);
      
      // Restaurar o botão
      if (submitButton) {
        gsap.to(submitButton, {
          scale: 1,
          boxShadow: '0 0 0 rgba(108, 92, 231, 0)',
          duration: 0.2
        });
      }
    }
  };

  return (
    <div
      className="contact-section py-20 px-6 bg-bg-dark section-container relative"
      ref={sectionRef}
      id="contact-section"
    >
      {/* Container de partículas */}
      <div
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className="text-4xl font-bold text-center text-white mb-5 relative pb-4 inline-block mx-auto w-full after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary"
          ref={titleRef}
        >
          Entre em Contato
        </h2>

        <p className="text-center text-text-light mb-16 max-w-2xl mx-auto section-description leading-relaxed">
          Tem um projeto em mente ou quer discutir uma oportunidade de trabalho?
          Preencha o formulário abaixo e entrarei em contato o mais breve
          possível.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Informações de contato */}
          <div className="lg:col-span-1" ref={contactInfoRef}>
            <div className="bg-card-bg rounded-xl p-6 md:p-8 mb-8 shadow-lg transform hover:translate-y-[-5px] transition-all duration-300 hover:shadow-xl relative overflow-hidden group">
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <h3 className="text-xl font-bold text-white mb-6 relative">
                Informações de Contato
                <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary"></span>
              </h3>

              <div className="space-y-6 relative">
                <div className="contact-info-item flex items-start space-x-4 group/item hover:bg-primary/5 p-3 rounded-lg transition-colors duration-300">
                  <div className="mt-1 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/20 transition-colors duration-300">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm text-text-light mb-1">Email</h4>
                    <a
                      href="mailto:luizcarlosvitoriano@gmail.com"
                      className="text-white hover:text-primary transition-colors"
                    >
                      luizcarlosvitoriano@gmail.com
                    </a>
                  </div>
                </div>

                <div className="contact-info-item flex items-start space-x-4 group/item hover:bg-primary/5 p-3 rounded-lg transition-colors duration-300">
                  <div className="mt-1 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/20 transition-colors duration-300">
                    <FaPhone className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm text-text-light mb-1">Telefone</h4>
                    <a
                      href="tel:+5535997080310"
                      className="text-white hover:text-primary transition-colors"
                    >
                      +55 35 99708-0310
                    </a>
                  </div>
                </div>

                <div className="contact-info-item flex items-start space-x-4 group/item hover:bg-primary/5 p-3 rounded-lg transition-colors duration-300">
                  <div className="mt-1 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/20 transition-colors duration-300">
                    <FaMapMarkerAlt className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm text-text-light mb-1">
                      Localização
                    </h4>
                    <p className="text-white">Varginha, MG - Brasil</p>
                </div>
              </div>
            </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="text-white font-medium mb-4">Me siga</h4>
                <div className="flex space-x-3">
                <a
                  href="https://github.com/LuisCarlos01"
                  target="_blank"
                  rel="noopener noreferrer"
                    className="social-icon w-10 h-10 rounded-full bg-card-bg flex items-center justify-center border border-border hover:bg-primary/10 hover:border-primary transition-all duration-300"
                  aria-label="GitHub"
                >
                    <FaGithub className="text-text-light hover:text-primary transition-colors" />
                </a>
                <a
                    href="https://www.linkedin.com/in/luis-carlos-vitoriano-neto-56a58321b/"
                  target="_blank"
                  rel="noopener noreferrer"
                    className="social-icon w-10 h-10 rounded-full bg-card-bg flex items-center justify-center border border-border hover:bg-primary/10 hover:border-primary transition-all duration-300"
                  aria-label="LinkedIn"
                >
                    <FaLinkedin className="text-text-light hover:text-primary transition-colors" />
                </a>
                <a
                    href="https://x.com/luiscarlosdev"
                  target="_blank"
                  rel="noopener noreferrer"
                    className="social-icon w-10 h-10 rounded-full bg-card-bg flex items-center justify-center border border-border hover:bg-primary/10 hover:border-primary transition-all duration-300"
                  aria-label="Twitter"
                >
                    <FaTwitter className="text-text-light hover:text-primary transition-colors" />
                </a>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de contato */}
          <div className="lg:col-span-2">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-card-bg rounded-xl p-6 md:p-8 shadow-lg relative overflow-hidden"
            >
              {/* Efeito decorativo */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

              <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
                Envie uma Mensagem
                <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-primary"></span>
              </h3>

              {submitStatus.type && (
                <div
                  className={`status-message mb-6 p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  } flex items-start space-x-3`}
                >
                  {submitStatus.type === "success" ? (
                    <FaCheckCircle className="flex-shrink-0 mt-1" />
                  ) : (
                    <FaExclamationCircle className="flex-shrink-0 mt-1" />
                  )}
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div
                  className={`form-group relative ${
                    fieldActivity.name === "error" ? "error-field" : ""
                  }`}
                >
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className={`w-full bg-bg-dark rounded-lg px-5 py-4 text-white outline-none border-2 transition-all duration-300 ${
                        fieldActivity.name === "error"
                          ? "border-red-500/50"
                          : fieldActivity.name === "active"
                          ? "border-primary"
                          : fieldActivity.name === "filled"
                          ? "border-primary/50"
                          : "border-border"
                      }`}
                      placeholder="Seu nome"
                      aria-required="true"
                    />
                    <div className="absolute top-1/2 left-4 -translate-y-1/2 pointer-events-none">
                      <FaUser
                        className={`transition-all duration-300 ${
                          focusedField === "name" || fieldActivity.name
                            ? "opacity-0"
                            : "opacity-40 text-text-light text-sm"
                        }`}
                      />
                    </div>
                  </div>
                    {formErrors.name && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <FaExclamationCircle className="mr-1 text-xs" />
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                <div
                  className={`form-group relative ${
                    fieldActivity.email === "error" ? "error-field" : ""
                  }`}
                >
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className={`w-full bg-bg-dark rounded-lg px-5 py-4 text-white outline-none border-2 transition-all duration-300 ${
                        fieldActivity.email === "error"
                          ? "border-red-500/50"
                          : fieldActivity.email === "active"
                          ? "border-primary"
                          : fieldActivity.email === "filled"
                          ? "border-primary/50"
                          : "border-border"
                      }`}
                      placeholder="Seu email"
                      aria-required="true"
                    />
                    <div className="absolute top-1/2 left-4 -translate-y-1/2 pointer-events-none">
                      <FaEnvelope
                        className={`transition-all duration-300 ${
                          focusedField === "email" || fieldActivity.email
                            ? "opacity-0"
                            : "opacity-40 text-text-light text-sm"
                        }`}
                      />
                    </div>
                  </div>
                    {formErrors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <FaExclamationCircle className="mr-1 text-xs" />
                        {formErrors.email}
                      </p>
                    )}
                </div>

                <div
                  className={`form-group col-span-1 md:col-span-2 relative ${
                    fieldActivity.subject === "error" ? "error-field" : ""
                  }`}
                >
                  <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className={`w-full bg-bg-dark rounded-lg px-5 py-4 text-white outline-none border-2 transition-all duration-300 ${
                        fieldActivity.subject === "error"
                          ? "border-red-500/50"
                          : fieldActivity.subject === "active"
                          ? "border-primary"
                          : fieldActivity.subject === "filled"
                          ? "border-primary/50"
                          : "border-border"
                      }`}
                      placeholder="Assunto"
                      aria-required="true"
                    />
                  </div>
                  {formErrors.subject && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <FaExclamationCircle className="mr-1 text-xs" />
                      {formErrors.subject}
                    </p>
                  )}
                </div>

                <div
                  className={`form-group col-span-1 md:col-span-2 relative ${
                    fieldActivity.message === "error" ? "error-field" : ""
                  }`}
                >
                  <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className={`w-full bg-bg-dark rounded-lg px-5 py-4 text-white outline-none border-2 transition-all duration-300 min-h-[150px] resize-y ${
                        fieldActivity.message === "error"
                          ? "border-red-500/50"
                          : fieldActivity.message === "active"
                          ? "border-primary"
                          : fieldActivity.message === "filled"
                          ? "border-primary/50"
                          : "border-border"
                      }`}
                    placeholder="Sua mensagem"
                      aria-required="true"
                  ></textarea>
                  </div>
                  {formErrors.message && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <FaExclamationCircle className="mr-1 text-xs" />
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <div className="form-group col-span-1 md:col-span-2 mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group flex items-center justify-center w-full md:w-auto md:inline-flex px-8 py-4 bg-primary text-white rounded-lg font-medium transition-all duration-300 hover:bg-primary-dark hover:shadow-lg disabled:opacity-70 relative overflow-hidden ${
                      isSubmitting ? "cursor-wait" : ""
                    }`}
                  >
                    {/* Efeito de onda ao hover */}
                    <span className="absolute inset-0 w-full h-full bg-white/10 wave-effect"></span>
                    
                    {isSubmitting ? (
                      <>
                        <span className="inline-block h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin mr-2"></span>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        <span>Enviar Mensagem</span>
                      </>
                    )}
                  </button>
                </div>
                </div>
              </form>
          </div>
        </div>
      </div>

      {/* Adicionar animações CSS para partículas */}
      <style>{`
        .particle {
          animation: float 20s infinite ease-in-out;
          transform: translate3d(0, 0, 0);
          will-change: transform, opacity;
          transition: all 0.5s ease;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
          }
          25% {
            transform: translateY(calc(-15px * var(--random, 0.5))) translateX(calc(20px * var(--random, 0.5))) scale(0.95);
          }
          50% {
            transform: translateY(calc(15px * var(--random, 0.5))) translateX(calc(-20px * var(--random, 0.5))) scale(1.05);
          }
          75% {
            transform: translateY(calc(-10px * var(--random, 0.5))) translateX(calc(15px * var(--random, 0.5))) scale(1);
          }
        }
        
        /* Efeito de pulsação para input em foco */
        input:focus, textarea:focus {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(108, 92, 231, 0.1);
          }
          70% {
            box-shadow: 0 0 0 5px rgba(108, 92, 231, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(108, 92, 231, 0);
          }
        }
        
        /* Efeito de onda para o botão de enviar */
        .wave-effect {
          position: absolute;
          transform: translateY(100%);
          transition: transform 0.5s ease;
        }
        
        button:hover .wave-effect {
          transform: translateY(0);
          animation: wave 1.5s linear infinite;
        }
        
        @keyframes wave {
          0% {
            top: 0%;
            transform: translateX(-50%) scaleY(0.1);
          }
          50% {
            top: -5%;
            transform: translateX(-25%) scaleY(0.3);
          }
          100% {
            top: 0%;
            transform: translateX(0%) scaleY(0.1);
          }
        }
        
        /* Efeito sutil de destaque nos campos do formulário */
        input, textarea {
          transition: all 0.3s ease;
        }
        
        input:hover, textarea:hover {
          box-shadow: 0 0 0 1px rgba(108, 92, 231, 0.1);
        }
        
        /* Melhorar a aparência do texto no hover */
        .hover\:text-primary:hover {
          text-shadow: 0 0 8px rgba(108, 92, 231, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ContactSection;
