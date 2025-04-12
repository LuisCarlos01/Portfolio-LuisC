import { ReactNode } from "react";

/**
 * Interface para as informações de contato
 */
export interface ContactInfo {
  /** Email de contato */
  email: string;
  /** Número de telefone */
  phone: string;
  /** Localização */
  location: string;
}

/**
 * Interface para as redes sociais
 */
export interface SocialMedia {
  /** Plataforma da rede social (GitHub, LinkedIn, etc.) */
  platform: string;
  /** URL do perfil na rede social */
  url: string;
  /** Ícone da rede social */
  icon: ReactNode;
  /** Texto alternativo para acessibilidade */
  ariaLabel: string;
}

/**
 * Interface para os textos da seção de contato
 */
export interface ContactTexts {
  /** Título da seção */
  title: string;
  /** Subtítulo da seção */
  subtitle: string;
  /** Título do cartão CTA */
  ctaTitle: string;
  /** Texto do cartão CTA */
  ctaText: string;
  /** Texto do botão do cartão CTA */
  ctaButtonText: string;
  /** Título das informações de contato */
  contactInfoTitle: string;
  /** Texto placeholder para a animação de digitação */
  placeholderTexts: string[];
  /** Sugestões de assunto para o formulário */
  subjectSuggestions: string[];
}

/**
 * Interface para props do FormField
 */
export interface ContactFormProps {
  /** Classe CSS adicional */
  className?: string;
}

/**
 * Interface para props do ContactInfo
 */
export interface ContactInfoProps {
  /** Classe CSS adicional */
  className?: string;
}

/**
 * Interface para os estados do formulário de contato
 */
export interface FormData {
  /** Nome do usuário */
  name: string;
  /** Email do usuário */
  email: string;
  /** Assunto da mensagem */
  subject: string;
  /** Conteúdo da mensagem */
  message: string;
}

/**
 * Interface para os erros do formulário de contato
 */
export interface FormErrors {
  /** Erro no campo de nome */
  name: string;
  /** Erro no campo de email */
  email: string;
  /** Erro no campo de assunto */
  subject: string;
  /** Erro no campo de mensagem */
  message: string;
}

/**
 * Tipo para o status de envio do formulário
 */
export type SubmitStatus = "idle" | "submitting" | "success" | "error";
