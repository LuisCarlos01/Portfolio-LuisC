# Portfólio - Luis Carlos

Este é meu portfólio pessoal desenvolvido com React, TypeScript e Tailwind CSS, apresentando meus projetos e habilidades como desenvolvedor.

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset tipado de JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **GSAP** - Biblioteca de animações avançadas
- **React Router DOM** - Roteamento para aplicações React
- **React Icons** - Ícones para React
- **Typed.js** - Animações de digitação

## ✨ Características

- Design responsivo para todos os dispositivos
- Animações de paralaxe e efeito 3D nos cards de projetos
- Animações de scroll e transições fluidas com GSAP
- Tema escuro com design minimalista e elegante
- Carregamento progressivo e otimizado de imagens
- Barra de navegação interativa
- Exibição de projetos em grid com filtros dinâmicos
- Formulário de contato com validação e feedback visual
- Seção de habilidades com barras de progresso
- Seção de currículo com timeline interativa
- Seção de portfólio com filtros, efeitos 3D e modal detalhado
- Efeitos de partículas e elementos visuais decorativos

## 🛠️ Instalação e Uso

1. Clone o repositório

```bash
git clone https://github.com/luiscarlos/portfolio-luiscarlos.git
```

2. Instale as dependências

```bash
cd portfolio-luiscarlos
npm install
```

3. Execute o projeto em modo de desenvolvimento

```bash
npm run dev
```

4. Para criar a versão de produção

```bash
npm run build
```

## 📁 Estrutura do Projeto

A estrutura do projeto foi completamente refatorada para uma arquitetura modular e mais organizada:

```
portfolio-luiscarlos/
├── public/                 # Arquivos públicos
├── src/                    # Código fonte
│   ├── components/         # Componentes React
│   │   ├── common/         # Componentes compartilhados
│   │   ├── sections/       # Seções do portfólio
│   │   │   ├── about/      # Componentes da seção Sobre
│   │   │   ├── contact/    # Componentes da seção Contato
│   │   │   ├── hero/       # Componentes da seção Hero
│   │   │   ├── portfolio/  # Componentes da seção Portfólio
│   │   │   ├── resume/     # Componentes da seção Currículo
│   │   │   ├── skills/     # Componentes da seção Habilidades
│   │   │   └── testimonials/ # Componentes da seção Depoimentos
│   │   ├── Footer.tsx      # Componente de rodapé
│   │   └── Header.tsx      # Componente de cabeçalho
│   ├── contexts/           # Contextos React
│   │   ├── section/        # Contexto para gerenciamento de seções
│   │   └── DarkModeContext.tsx # Contexto para tema escuro/claro
│   ├── data/               # Arquivos de dados separados da lógica
│   │   ├── aboutData.ts    # Dados da seção Sobre
│   │   ├── contactData.ts  # Dados da seção Contato
│   │   ├── heroData.ts     # Dados da seção Hero
│   │   ├── portfolioData.ts # Dados da seção Portfólio
│   │   ├── resumeData.ts   # Dados da seção Currículo
│   │   ├── skillsData.ts   # Dados da seção Habilidades
│   │   └── testimonialsData.ts # Dados da seção Depoimentos
│   ├── hooks/              # Hooks personalizados
│   ├── pages/              # Páginas da aplicação
│   ├── types/              # Definições de tipos TypeScript
│   ├── utils/              # Funções utilitárias
│   ├── styles/             # Estilos globais e compartilhados
│   ├── App.tsx             # Componente principal
│   ├── index.css           # Estilos globais
│   └── main.tsx            # Ponto de entrada
├── index.html              # Arquivo HTML principal
├── package.json            # Dependências e scripts
├── tailwind.config.js      # Configuração do Tailwind
└── tsconfig.json           # Configuração do TypeScript
```

## 🔄 Atualizações Recentes

### Refatoração Completa da Arquitetura

- **Estrutura Modular**: Todo o projeto foi reorganizado para seguir uma arquitetura modular e de fácil manutenção
- **Separação de Responsabilidades**: Componentes divididos em arquivos menores e mais focados
- **Padrão de Dados**: Separação completa dos dados da lógica da interface, facilitando atualizações
- **Sistema de Tipos**: Criação de interfaces TypeScript para todos os componentes, melhorando a tipagem
- **Componentes Reutilizáveis**: Implementação de componentes menores e mais específicos para maior reuso

### Melhorias na Performance

- **Carregamento Otimizado**: Implementação de lazy loading e precarregamento inteligente das seções
- **Renderização Condicional**: Componentes só são renderizados quando necessário, melhorando a performance
- **Memoização**: Uso extensivo de React.memo e useCallback para evitar renderizações desnecessárias
- **Animações Otimizadas**: Melhor gerenciamento das animações GSAP para evitar vazamento de memória

### Correções Técnicas

- **Navegação entre Seções**: Corrigido problema na função `showSection`, implementando retrocompatibilidade
- **IDs das Seções**: Padronizados os IDs das seções para evitar erros na navegação
- **Transições de Seção**: Melhorado sistema de transição com logs para depuração e melhor recuperação de erros
- **Precarregamento**: Corrigido caminho de importação dinâmica dos componentes para a nova estrutura

### Melhorias na Experiência do Usuário

- **Seção de Portfólio**: Adicionado efeito de paralaxe 3D nos cards, animações suaves, contador de projetos e modal detalhado com destaques dos projetos
- **Seção de Contato**: Aprimorado com animações interativas, feedback visual em tempo real e efeito de partículas
- **Sistema de Imagens**: Implementado carregamento progressivo de imagens e fallbacks automáticos
- **Performance**: Otimizadas as animações para melhor desempenho em dispositivos de baixo poder de processamento

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 📬 Contato

- **Email**: luizcarlosvitoriano@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/luis-carlos-vitoriano-neto-56a58321b/
- **GitHub**: https://github.com/LuisCarlos01
- **Twitter**: https://x.com/luiscarlosdev
- **Telefone**: +55 35 99708-0310
- **Localização**: Varginha, MG - Brasil
