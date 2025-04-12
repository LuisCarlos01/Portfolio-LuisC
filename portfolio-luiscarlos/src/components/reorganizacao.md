# Plano de Reorganização da Estrutura de Pastas

Este documento descreve como reorganizar a estrutura de pastas do projeto para melhorar a consistência, facilitar a manutenção e eliminar duplicações.

## 1. Estrutura Base Padronizada

```
src/
  ├── components/
  │   ├── common/          # Componentes compartilhados entre seções
  │   │   ├── AnimatedCard.tsx
  │   │   ├── SectionTitle.tsx
  │   │   ├── ParticleEffect.tsx  # Componente genérico para efeitos de partículas
  │   │   └── ...
  │   │
  │   ├── layout/          # Componentes de layout reutilizáveis
  │   │   ├── Header.tsx
  │   │   ├── Footer.tsx
  │   │   └── ...
  │   │
  │   └── sections/        # Seções principais do site
  │       ├── home/        # Home section
  │       ├── about/       # About section
  │       ├── portfolio/   # Portfolio section
  │       ├── resume/      # Resume section
  │       ├── skills/      # Skills section
  │       ├── testimonials/ # Testimonials section
  │       ├── contact/     # Contact section
  │       └── ...
  │
  ├── hooks/               # Hooks personalizados
  ├── contexts/            # Contextos de React
  ├── utils/               # Funções utilitárias
  ├── data/                # Dados da aplicação
  ├── types/               # Definições de tipos
  ├── styles/              # Estilos da aplicação
  │   ├── animations.css   # Centralizando animações
  │   └── ...
  └── ...
```

## 2. Passos para a Migração

### 2.1. Componentes Comuns

1. Mover componentes comuns para `components/common/`:
   - ✅ `ParticleEffect.tsx` genérico (criado com base nas versões duplicadas)
   - `ImageWithFallback.tsx`
   - `LoadingSpinner.tsx`

### 2.2. Seção de Depoimentos (Testimonials)

1. ✅ Criar estrutura padronizada em `components/sections/testimonials/`:

   - ✅ `index.tsx` (componente principal)
   - ✅ `TestimonialHeader.tsx`
   - ✅ `TestimonialCard.tsx`
   - ✅ `TestimonialStars.tsx`
   - ✅ `TestimonialNavigation.tsx`
   - ✅ `TestimonialIndicators.tsx`

2. ✅ Remover arquivos duplicados:
   - ✅ `components/TestimonialsSection.tsx`
   - ✅ `components/testimonials/` (pasta inteira)
   - ✅ Substituir `components/sections/testimonials/ParticleEffect.tsx` por componente comum

### 2.3. Seção de Portfólio

1. ✅ Mover componentes para `components/sections/portfolio/`:

   - ✅ `index.tsx` (componente principal)
   - ✅ `ProjectCard.tsx`
   - ✅ `ProjectFilters.tsx`
   - ✅ `ProjectModal.tsx`
   - ✅ `ProjectImageLoader.ts`

2. Remover arquivos duplicados:
   - `components/PortfolioSection.tsx`
   - `components/portfolio/` (pasta inteira)

### 2.4. Seção de Resumo (Resume)

1. Mover componentes para `components/sections/resume/`:

   - `index.tsx` (componente principal)
   - `ResumeHeader.tsx`
   - `ResumeTabs.tsx`
   - `ResumeFilter.tsx`
   - `ResumeNoResults.tsx`
   - `ResumeTimeline.tsx`
   - `ResumeItem.tsx`

2. Remover arquivos duplicados:
   - `components/ResumeSection.tsx`
   - `components/resume-section/` (pasta inteira)
   - `components/resume/` (pasta inteira)

### 2.5. Animações

1. Centralizar todas as animações em `styles/animations.css`
2. Remover estilos duplicados em componentes

## 3. Benefícios da Nova Estrutura

- **Consistência:** Todas as seções seguem o mesmo padrão de organização
- **Manutenibilidade:** Componentes menores e mais coesos
- **Reutilização:** Componentes comuns são facilmente compartilhados
- **Escalabilidade:** Facilita adicionar novas seções ou recursos
- **Redução de duplicidade:** Implementações redundantes são consolidadas

## 4. Implementação

A migração deve ser feita gradualmente, seção por seção, seguindo estes passos:

1. Criar a nova estrutura para uma seção
2. Testar que a nova implementação funciona corretamente
3. Substituir a versão antiga pela nova
4. Remover os arquivos antigos e atualizar importações

✅ Começamos com a seção de Testimonials como prova de conceito.
✅ Continuamos com a seção de Portfolio.
