# Seção de Habilidades (Refatorada)

Este diretório contém os componentes da seção de habilidades que foram refatorados para seguir boas práticas de modularização, manutenibilidade e reutilização.

## Estrutura

```
skills/
├── index.tsx                # Componente principal que compõe toda a seção
├── SkillCard.tsx            # Card para exibir uma habilidade individual
├── SkillDetailModal.tsx     # Modal de detalhes da habilidade
├── CategoryFilter.tsx       # Filtro de categorias de habilidades
├── skillsData.ts            # Dados das habilidades (separados da lógica)
├── types.ts                 # Definições de tipos TypeScript
└── README.md                # Esta documentação
```

## Componentes

### SkillsSection (index.tsx)

O componente principal que coordena a renderização de todos os subcomponentes e gerencia a animação da seção como um todo.

- Integra os hooks personalizados para animação
- Filtra habilidades por categoria
- Gerencia o estado de seleção de habilidades
- Controla a navegação entre projetos

### SkillCard.tsx

Componente para exibir cada habilidade em um card com:

- Ícone da tecnologia
- Nome e categoria
- Barra de progresso animada
- Interação ao clicar

### SkillDetailModal.tsx

Modal que exibe informações detalhadas sobre a habilidade selecionada:

- Descrição completa
- Áreas de aplicação
- Projetos relacionados
- Animações e efeitos visuais
- Navegação para projetos

### CategoryFilter.tsx

Componente para filtrar habilidades por categoria:

- Todas
- Frontend
- Backend
- Outras ferramentas

### skillsData.ts

Arquivo que contém os dados de todas as habilidades, separando os dados da lógica de renderização.

### types.ts

Definições de tipos TypeScript para todos os componentes da seção.

## Hooks Relacionados

No diretório `src/hooks/`:

- `useAnimateSection.ts`: Hook genérico para animar seções com ScrollTrigger
- `useSkillApplicationAreas.ts`: Gerencia a lógica das áreas de aplicação de habilidades

## Como Usar

```jsx
import SkillsSection from "../components/sections/skills";

function Page() {
  return (
    <div>
      <SkillsSection />
    </div>
  );
}
```

## Detalhes de Implementação

Esta refatoração dividiu o componente original de 1336 linhas em vários componentes menores e mais focados, melhorando:

1. **Manutenibilidade**: Cada arquivo tem uma única responsabilidade
2. **Reutilização**: Componentes como SkillCard podem ser usados em outros lugares
3. **Separação de dados e lógica**: Os dados das habilidades estão em um arquivo separado
4. **Tipagem forte**: Uso de TypeScript para garantir consistência
5. **Performance**: Uso extensivo de memoização para evitar renderizações desnecessárias
