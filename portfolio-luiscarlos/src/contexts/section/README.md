# Contexto de Seção (Refatorado)

Este diretório contém os componentes que foram refatorados a partir do arquivo `SectionContext.tsx` original (323 linhas), divididos em múltiplos arquivos por responsabilidade, seguindo boas práticas de modularização e manutenibilidade.

## Estrutura

```
section/
├── index.ts                # Arquivo de barril para exportações
├── SectionContext.tsx      # Componente principal de contexto
├── useSectionTransition.ts # Hook para gerenciar transições
├── useSectionScroll.ts     # Hook para detectar seções durante rolagem
├── types.ts                # Tipos e constantes compartilhadas
└── README.md               # Esta documentação
```

## Componentes

### SectionContext.tsx

O componente principal que:

- Fornece o contexto de seção para toda a aplicação
- Gerencia o estado da seção ativa
- Coordena a interação entre os hooks especializados

### useSectionTransition.ts

Hook especializado para:

- Gerenciar transições entre seções
- Controlar o overlay de transição
- Animar a entrada e saída de seções

### useSectionScroll.ts

Hook especializado para:

- Detectar qual seção está visível durante a rolagem
- Atualizar o estado da seção ativa
- Atualizar a URL com a hash correspondente

### types.ts

Define tipos e constantes compartilhadas:

- Interface do contexto de seção
- Mapeamento de IDs de seção
- Configurações de animação

## Como Usar

```jsx
import { useSection } from "../contexts/section";

function Component() {
  const { activeSection, navigateToSection } = useSection();

  return (
    <button onClick={() => navigateToSection("home")}>Ir para Home</button>
  );
}
```

## Detalhes de Implementação

Esta refatoração dividiu o componente original de 323 linhas em múltiplos arquivos menores e mais focados, melhorando:

1. **Separação de Responsabilidades**: Cada arquivo tem uma função específica
2. **Reutilização**: Os hooks podem ser usados independentemente do contexto
3. **Testabilidade**: Componentes menores são mais fáceis de testar
4. **Manutenibilidade**: Código mais organizado e fácil de entender

## Benefícios

- **Melhor Legibilidade**: Arquivos menores são mais fáceis de entender
- **Diminuição de Acoplamento**: Módulos com responsabilidades bem definidas
- **Facilidade de Manutenção**: Mudanças localizadas não afetam todo o sistema
- **Reutilização de Código**: Hooks podem ser usados em outros contextos
