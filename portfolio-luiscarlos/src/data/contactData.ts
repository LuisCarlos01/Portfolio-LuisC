import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { ContactInfo, SocialMedia, ContactTexts } from "../types/contactTypes";

// Função para criar ícones sem usar JSX diretamente
const createIcon = (Icon: any, size = 24) =>
  React.createElement(Icon, { size });

/**
 * Informações de contato do desenvolvedor
 */
export const contactInfo: ContactInfo = {
  email: "contato@luiscarlos.dev",
  phone: "+55 (11) 98765-4321",
  location: "São Paulo, Brasil",
};

/**
 * Redes sociais do desenvolvedor
 */
export const socialMedia: SocialMedia[] = [
  {
    platform: "github",
    url: "https://github.com/luiscarlos01",
    icon: createIcon(FaGithub),
    ariaLabel: "GitHub",
  },
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/in/luis-carlos-vitoriano-neto-56a58321b/",
    icon: createIcon(FaLinkedin),
    ariaLabel: "LinkedIn",
  },
  {
    platform: "twitter",
    url: "#",
    icon: createIcon(FaTwitter),
    ariaLabel: "Twitter",
  },
];

/**
 * Ícones para os campos de contato
 */
export const contactIcons = {
  email: createIcon(FaEnvelope, 21),
  phone: createIcon(FaPhone, 21),
  location: createIcon(FaMapMarkerAlt, 21),
};

/**
 * Textos da seção de contato
 */
export const contactTexts: ContactTexts = {
  title: "Entre em Contato",
  subtitle:
    "Tem um projeto em mente ou quer discutir uma oportunidade? Entre em contato comigo pelos canais abaixo ou preencha o formulário.",
  ctaTitle: "Vamos trabalhar juntos?",
  ctaText:
    "Estou aberto a projetos freelance, oportunidades de trabalho e colaborações interessantes.",
  ctaButtonText: "Iniciar uma conversa",
  contactInfoTitle: "Informações de Contato",
  placeholderTexts: [
    "Conte-me sobre seu projeto...",
    "Precisa de um desenvolvedor para sua equipe?",
    "Vamos transformar sua ideia em realidade!",
    "Como posso ajudar em seu próximo projeto?",
    "Interessado em uma consultoria técnica?",
  ],
  subjectSuggestions: [
    "Proposta de Projeto",
    "Consultoria",
    "Freelance",
    "Oportunidade de Trabalho",
    "Colaboração",
    "Dúvida",
  ],
};
