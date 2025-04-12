import React, { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";
import { gsap } from "gsap";
import { ContactInfoProps } from "../../../types/contactTypes";
import {
  contactInfo,
  socialMedia,
  contactIcons,
  contactTexts,
} from "../../../data/contactData";

/**
 * Componente que exibe as informações de contato
 */
const ContactInfo: React.FC<ContactInfoProps> = ({ className = "" }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Função para copiar texto para a área de transferência
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);

        // Animação ao copiar
        gsap.to(`#${field}-copy-icon`, {
          scale: 1.5,
          duration: 0.3,
          ease: "elastic.out(1, 0.3)",
          onComplete: () => {
            gsap.to(`#${field}-copy-icon`, {
              scale: 1,
              duration: 0.2,
            });
          },
        });
      })
      .catch((err) => console.error("Erro ao copiar: ", err));
  };

  return (
    <div className={`mb-8 ${className}`}>
      <h3 className="text-2xl font-bold mb-6 text-white">
        {contactTexts.contactInfoTitle}
      </h3>

      <div className="space-y-5">
        {/* Email */}
        <div className="flex items-center p-4 bg-card-bg/50 backdrop-blur-sm rounded-lg border border-gray-800/50 transition-all duration-300 hover:bg-card-bg group">
          <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
            {contactIcons.email}
          </div>
          <div className="flex-grow">
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-white font-medium">{contactInfo.email}</p>
          </div>
          <button
            onClick={() => copyToClipboard(contactInfo.email, "email")}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            aria-label="Copiar email"
          >
            {copiedField === "email" ? (
              <FaCheck id="email-copy-icon" className="text-green-400" />
            ) : (
              <FaCopy
                id="email-copy-icon"
                className="hover:text-primary transition-colors"
              />
            )}
          </button>
        </div>

        {/* Telefone */}
        <div className="flex items-center p-4 bg-card-bg/50 backdrop-blur-sm rounded-lg border border-gray-800/50 transition-all duration-300 hover:bg-card-bg group">
          <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
            {contactIcons.phone}
          </div>
          <div className="flex-grow">
            <p className="text-gray-400 text-sm">Telefone</p>
            <p className="text-white font-medium">{contactInfo.phone}</p>
          </div>
          <button
            onClick={() => copyToClipboard(contactInfo.phone, "phone")}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            aria-label="Copiar telefone"
          >
            {copiedField === "phone" ? (
              <FaCheck id="phone-copy-icon" className="text-green-400" />
            ) : (
              <FaCopy
                id="phone-copy-icon"
                className="hover:text-primary transition-colors"
              />
            )}
          </button>
        </div>

        {/* Localização */}
        <div className="flex items-center p-4 bg-card-bg/50 backdrop-blur-sm rounded-lg border border-gray-800/50 transition-all duration-300 hover:bg-card-bg group">
          <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
            {contactIcons.location}
          </div>
          <div className="flex-grow">
            <p className="text-gray-400 text-sm">Localização</p>
            <p className="text-white font-medium">{contactInfo.location}</p>
          </div>
        </div>

        {/* Redes Sociais */}
        <div className="flex items-center justify-between mt-8">
          {socialMedia.map((social, index) => (
            <a
              key={`social-${index}`}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-card-bg rounded-full text-gray-400 hover:text-primary hover:bg-gray-800 transition-all duration-300"
              aria-label={social.ariaLabel}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContactInfo);
