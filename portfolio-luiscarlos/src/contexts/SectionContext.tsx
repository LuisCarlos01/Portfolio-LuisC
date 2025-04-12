/**
 * Este arquivo é um redirecionamento para a implementação modular refatorada.
 * Mantido para compatibilidade com código existente que importa deste caminho.
 */

import { SectionProvider, useSection, SectionContext } from "./section";

// Reexportar as implementações modulares
export { useSection, SectionProvider };
export type { SectionContextType } from "./section";

// Exportação padrão para compatibilidade
export default SectionContext;
