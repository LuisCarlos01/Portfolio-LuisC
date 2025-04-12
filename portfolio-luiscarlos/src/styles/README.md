# Sistema de Estilos Centralizado

Este diretório contém o sistema de design e estilos centralizado para o portfólio, seguindo uma abordagem modular e escalável.

## Estrutura de Arquivos

```
styles/
│
├── animations/            # Animações CSS
│   ├── keyframes.css      # Definições de keyframes
│   ├── utilities.css      # Classes utilitárias de animação
│   └── index.css          # Arquivo de barril para animações
│
├── base/                  # Estilos base
│   ├── variables.css      # Variáveis CSS (cores, espaçamentos, etc.)
│   ├── themes.css         # Temas claro e escuro
│   ├── reset.css          # Reset de estilos entre navegadores
│   └── layout.css         # Classes base de layout
│
├── components/            # Estilos específicos de componentes
│   ├── buttons.css        # Estilos para botões
│   └── modal.css          # Estilos para modais
│
├── utils/                 # Utilitários CSS
│   └── theme-utils.css    # Classes utilitárias para o tema
│
├── index.css              # Arquivo principal que importa todos os outros
└── README.md              # Esta documentação
```

## Princípios do Sistema de Design

1. **Modularidade**: Cada arquivo tem uma responsabilidade específica e clara
2. **Escalabilidade**: Fácil de expandir e manter, com arquivos pequenos e focados
3. **Consistência**: Usa variáveis CSS para garantir consistência em todo o projeto
4. **Tema**: Suporte nativo para temas claro e escuro
5. **Reuso**: Maximiza a reutilização através de classes utilitárias

## Como Usar

### Variáveis de Tema

Para garantir consistência, sempre use as variáveis CSS definidas em `base/variables.css`:

```css
/* Exemplo: Usando variáveis de cor */
.my-element {
  color: var(--color-primary);
  background-color: var(--color-card-bg);
}

/* Exemplo: Usando variáveis de espaçamento */
.my-container {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}
```

### Classes Utilitárias

O sistema fornece classes utilitárias prontas para uso:

```html
<!-- Cores -->
<div class="text-primary bg-card-bg">Texto primário em fundo de cartão</div>

<!-- Tipografia -->
<h2 class="font-secondary text-2xl font-bold">Título em destaque</h2>

<!-- Animações -->
<div class="animate-fadeIn duration-500 delay-200">Aparece com atraso</div>
```

### Animações

As animações são implementadas através de keyframes centralizados e classes utilitárias:

```html
<!-- Animação simples -->
<div class="animate-bounce">Elemento com bounce</div>

<!-- Animação com parâmetros customizados -->
<div class="animate-fadeInUp duration-1000 delay-500 ease-bounce">
  Fade in personalizado
</div>
```

### Responsividade

O sistema inclui utilitários para designs responsivos:

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  <!-- Conteúdo que se adapta a diferentes tamanhos de tela -->
</div>
```

## Adicionando Novos Componentes

Para adicionar estilos para um novo componente:

1. Crie um arquivo na pasta `components/` com o nome do componente (ex: `card.css`)
2. Defina os estilos usando as variáveis CSS existentes para garantir consistência
3. Importe o arquivo no `index.css` principal

## Acessibilidade

O sistema segue práticas recomendadas de acessibilidade:

- Contraste adequado entre texto e fundo
- Suporte para navegação por teclado
- Classes de acessibilidade como `.sr-only` para leitores de tela
- Respeito à preferência do usuário por movimento reduzido com `prefers-reduced-motion`
