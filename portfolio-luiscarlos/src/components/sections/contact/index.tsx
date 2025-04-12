import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useAnimateSection from "../../../hooks/useAnimateSection";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import ParticleEffect from "./ParticleEffect";
import SectionTitle from "../../common/SectionTitle";
import { contactTexts } from "../../../data/contactData";

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * Componente principal da seção de contato
 * Refatorado para usar subcomponentes: ContactForm, ContactInfo e ParticleEffect
 */
const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Usar o hook personalizado para animar a seção
  const { animateSection } = useAnimateSection(
    {
      sectionId: "contact-section",
      triggerOffset: "top 80%",
      once: true,
    },
    {
      title: "h2",
      description: ".section-subtitle",
      items: ".animate-item",
    }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-background to-background-lighter min-h-screen relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>

      {/* Efeito de partículas decorativas */}
      <ParticleEffect containerRef={sectionRef} />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionTitle
          ref={titleRef}
          title={contactTexts.title}
          subtitle={contactTexts.subtitle}
          className="mb-16 animate-item"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário de contato */}
          <div
            ref={formRef}
            className="animate-item lg:order-2 flex justify-center"
          >
            <ContactForm className="w-full" />
          </div>

          {/* Informações de contato */}
          <div ref={contactInfoRef} className="animate-item lg:order-1">
            <ContactInfo />

            {/* Mapa ou Ilustração */}
            <div className="relative mt-8 h-64 rounded-lg overflow-hidden border border-gray-800/40 bg-card-bg/30 backdrop-blur-sm shadow-lg">
              <div className="absolute inset-0 bg-map-pattern opacity-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-6 text-center">
                  <h3 className="text-xl font-medium text-white mb-4">
                    {contactTexts.ctaTitle}
                  </h3>
                  <p className="text-gray-300 mb-6">{contactTexts.ctaText}</p>
                  <a
                    href="#contact-form"
                    className="btn-secondary inline-block"
                  >
                    {contactTexts.ctaButtonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
