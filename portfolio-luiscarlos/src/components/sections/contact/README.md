# Seção de Contato (Refatorada)

Este diretório contém os componentes da seção de contato que foram refatorados para seguir boas práticas de modularização, manutenibilidade e reutilização.

## Estrutura

```
contact/
├── index.tsx             # Componente principal que compõe toda a seção
├── ContactForm.tsx       # Formulário de contato interativo
├── ContactInfo.tsx       # Informações de contato (email, telefone, etc.)
├── ParticleEffect.tsx    # Efeito visual de partículas interativas
└── README.md             # Esta documentação
```

## Componentes

### ContactSection (index.tsx)

O componente principal que coordena a renderização de todos os subcomponentes e gerencia a animação da seção como um todo.

- Integra os hooks personalizados para animação
- Define a estrutura principal e layout responsivo

### ContactForm.tsx

Componente do formulário de contato com validação completa e animações interativas.

- Usa o hook `useContactForm` para gerenciar estado e validação
- Inclui efeitos visuais para feedback do usuário
- Possui animação de digitação para o placeholder da mensagem
- Inclui sugestões de assunto pré-definidas

### ContactInfo.tsx

Exibe as informações de contato e links para redes sociais.

- Permite copiar informações com um clique
- Inclui animações de feedback visual

### ParticleEffect.tsx

Cria um efeito visual de partículas no fundo da seção.

- As partículas reagem ao movimento do mouse
- Inclui efeito parallax para maior profundidade

## Hooks Relacionados

No diretório `src/hooks/`:

- `useContactForm.ts`: Gerencia todo o estado e validação do formulário
- `useAnimateSection.ts`: Hook genérico para animar seções com ScrollTrigger

## Como Usar

```jsx
import ContactSection from "../components/sections/contact";

function Page() {
  return (
    <div>
      <ContactSection />
    </div>
  );
}
```

## Detalhes de Implementação

Esta refatoração dividiu o componente original de 1451 linhas em vários componentes menores e mais focados, melhorando:

1. **Manutenibilidade**: Cada arquivo tem uma única responsabilidade
2. **Reutilização**: A lógica de formulário está em um hook separado que pode ser usado em outros lugares
3. **Testabilidade**: Componentes menores são mais fáceis de testar
4. **Performance**: A separação de preocupações permite que apenas as partes necessárias sejam renderizadas/atualizadas
