/**
 * Interface para o contexto de seção
 */
export interface SectionContextType {
  /** Seção ativa atual */
  activeSection: string;
  /** Função para navegar para uma seção */
  navigateToSection: (sectionId: string) => void;
  /** Função para mostrar uma seção (para retrocompatibilidade) */
  showSection: (sectionId: string) => void;
  /** Indica se uma transição está em andamento */
  isTransitioning: boolean;
  /** Seção ativa anterior */
  previousSection: string | null;
}

/**
 * Mapeamento de IDs de seção para elementos DOM
 */
export const SECTION_ID_MAP: Record<string, string> = {
  home: "home",
  about: "about",
  skills: "skills-section",
  portfolio: "portfolio",
  resume: "resume",
  contact: "contact",
  testimonials: "testimonials",
};

/**
 * Configurações padrão para animação de seções
 */
export const DEFAULT_ANIMATION_CONFIG = {
  duration: 0.4,
  ease: "power2.inOut",
};
