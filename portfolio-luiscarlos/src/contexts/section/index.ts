/**
 * Arquivo de barril para exportar componentes e hooks relacionados ao contexto de seção
 */

// Exportar o contexto e hooks relacionados
export { useSection, SectionProvider } from "./SectionContext";
export { default as SectionContext } from "./SectionContext";
export { default as useSectionTransition } from "./useSectionTransition";
export { default as useSectionScroll } from "./useSectionScroll";

// Exportar tipos
export * from "./types";
