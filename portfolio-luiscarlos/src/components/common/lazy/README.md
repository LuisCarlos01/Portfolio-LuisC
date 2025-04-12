# Sistema de Lazy Loading Inteligente

Este diretório contém componentes e utilitários para implementar lazy loading de seções com precarregamento inteligente, melhorando a performance da aplicação.

## Componentes

### LazySection

O componente principal para lazy loading, que carrega seções sob demanda com base na proximidade da seção ativa.

**Características:**

- Precarregamento inteligente de seções próximas à seção atual
- Fallback personalizado durante o carregamento
- Configurable para diferentes tipos de seções e necessidades de UX
- Esqueletos (skeletons) para melhor experiência de carregamento

### SectionSkeleton

Fornece um esqueleto visual para mostrar durante o carregamento das seções.

**Características:**

- Layout responsivo que simula o conteúdo real
- Animação de pulso para indicar carregamento
- Configurável para diferentes alturas e estilos

## Hook - useLazyLoading

O hook `useLazyLoading` gerencia o precarregamento inteligente de seções com base na seção ativa.

**Recursos:**

- Precarrega seções próximas à atual automaticamente
- Controle granular da distância de precarregamento
- Detecção inteligente de visibilidade

## Como Usar

### LazySection Básico

```jsx
import { LazySection } from "../components/common/lazy";

<LazySection
  componentPath="AboutSection"
  sectionId="about"
  preloadDistance={1}
/>;
```

### Com Configurações Avançadas

```jsx
<LazySection
  componentPath="SkillsSection"
  sectionId="skills"
  preloadDistance={2}
  skeletonHeight="min-h-[700px]"
  delay={500}
  useSkeleton={true}
/>
```

### Com Fallback Personalizado

```jsx
<LazySection
  componentPath="PortfolioSection"
  sectionId="portfolio"
  fallback={<MeuComponentePersonalizado />}
/>
```

## Benefícios

1. **Performance Melhorada**

   - Carrega apenas as seções que estão sendo exibidas ou próximas
   - Reduz o bundle inicial de JavaScript
   - Melhora métricas de Core Web Vitals

2. **UX Aprimorada**

   - Esqueletos oferecem uma experiência de carregamento mais suave
   - Precarregamento antecipado reduz a percepção de tempo de espera
   - Transições fluidas entre seções

3. **Desenvolvimento**
   - API simples e consistente para todas as seções
   - Fácil manutenção com componentes modulares
   - Configuração flexível para diferentes necessidades

## Modo de Debug

Para testar os estados de carregamento em desenvolvimento, adicione `?delay-loading` na URL. Isso simulará um atraso de carregamento para visualizar os skeletons e spinners.
