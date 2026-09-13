---
name: Firmamento Estúdio
description: Studio digital de criação de sites, sistemas e ferramentas
colors:
 space-navy: "#0b0b10"
 space-navy-alt: "#101018"
 surface-card: "#14141f"
 border: "#23232f"
 text-primary: "#f2f2f5"
 text-muted: "#9c9ca8"
 accent-cobalt: "#4e6bff"
 accent-cobalt-deep: "#0e1430"
 orbit-glow: "rgba(78, 107, 255, 0.55)"
typography:
 display:
  fontFamily: "Orbitron, sans-serif"
  fontSize: "clamp(30px, 5vw, 46px)"
  fontWeight: 700
  lineHeight: 1.15
  letterSpacing: "normal"
 headline:
  fontFamily: "Orbitron, sans-serif"
  fontSize: "clamp(22px, 3vw, 30px)"
  fontWeight: 700
  lineHeight: 1.15
  letterSpacing: "normal"
 body:
  fontFamily: "Inter, sans-serif"
  fontSize: "16px"
  fontWeight: 400
  lineHeight: 1.6
  letterSpacing: "normal"
 label:
  fontFamily: "Orbitron, sans-serif"
  fontSize: "13px"
  fontWeight: 500
  lineHeight: 1.25
  letterSpacing: "0.02em"
rounded:
 sm: "4px"
 md: "12px"
 pill: "999px"
spacing:
 xs: "8px"
 sm: "16px"
 md: "24px"
 lg: "36px"
 xl: "56px"
components:
 button-primary:
  backgroundColor: "{colors.accent-cobalt}"
  textColor: "{colors.text-primary}"
  rounded: "{rounded.sm}"
  padding: "14px 28px"
 button-ghost:
  backgroundColor: "transparent"
  textColor: "{colors.text-muted}"
  rounded: "{rounded.sm}"
  padding: "14px 20px"
 card:
  backgroundColor: "{colors.surface-card}"
  textColor: "{colors.text-primary}"
  rounded: "{rounded.md}"
  padding: "36px"
---

# Design System: Firmamento Estúdio

## Overview

**Creative North Star: "O estúdio em órbita"**

A identidade visual atual combina tecnologia, precisão e presença premium em um ambiente escuro de inspiração cósmica. O sistema comunica confiança, técnica e criatividade com uma linguagem espacial: anéis, orbitas e brilho sutil dão presença ao hero sem tornar a página pesada. A estética é sobria, moderna e funcional, com o tipo geométrico e a cor azul elétrico como elementos principais.

O visual prioriza leitura clara e foco em conversão, com espaçamento generoso, blocos bem definidos e pouca ornamentação além do contexto de marca. O efeito de “órbita” funciona como uma assinatura visual, mas não destrói a legibilidade do conteúdo principal.

**Key Characteristics:**

- ambiance tecnológico-cósmico com fundo escuro e brilho de acento
- tipografia geométrica com forte presença no hero e nos títulos
- foco em conversão com CTAs diretos e navegabilidade simples
- layout de página única orientado ao storytelling do estúdio e do processo
- contraste alto e estrutura clara para leitura em desktop e mobile

## Colors

A paleta é composta por fundo escuro, superfícies discretamente elevadas e um azul como único ponto de destaque principal, com neutralidade visual para manter a leitura confortável.

### Primary

- **Azul elétrico** (#4e6bff): usado em destaques, botões primários, glow de elementos orbitais e pontos de ação.

### Neutral

- **Grafite profundo** (#0b0b10): fundo principal da página e base visual geral.
- **Grafite médio** (#101018): fundo alternativo para variações de superfície.
- **Card** (#14141f): fundos de blocos e containers de conteúdo.
- **Borda** (#23232f): linhas divisórias, contornos e separadores.
- **Texto primário** (#f2f2f5): títulos, texto principal e contrastes de alto impacto.
- **Texto neutro** (#9c9ca8): descrições, microtextos e elementos secundários.

### Named Rules

**A regra do destaque raro.** O azul é o principal ponto de acento e é usado seletivamente para manter impacto visual sem diluir a sofisticação do sistema.

## Typography

**Display Font:** Orbitron, sans-serif
**Body Font:** Inter, sans-serif

A combinação usa uma fonte técnica e futurista para títulos e branding, com Inter para leitura geral. O contraste entre as duas famílias ajuda a separar a identidade do estúdio da linguagem funcional do conteúdo.

### Hierarchy

- **Display** (700, clamp(30px, 5vw, 46px), 1.15): usado no hero principal, com foco no slogan e no valor de marca.
- **Headline** (700, clamp(22px, 3vw, 30px), 1.15): usado em seções, títulos de conteúdo e blocos de contexto.
- **Title** (500, 18px, 1.25): usado em nomes de casos e detalhes de conteúdo interno.
- **Body** (400, 16px, 1.6): base de leitura para parágrafos, descrições e textos do processo.
- **Label** (500, 13px, 0.02em): usado em microetiquetas, categorias e navegação.

### Named Rules

**A regra da legibilidade.** A tipografia elegante nunca substitui clareza: os textos funcionais e descritivos permanecem em Inter para máxima leitura.

## Layout

A página usa um layout de landing page de uma coluna com navegação fixa no topo, hero em destaque e blocos de conteúdo em sequência. O sistema depende de espaçamento consistente e de seções bem separadas, com leitura em fluxo vertical e forte hierarquia de informação.

O contêiner principal usa padding horizontal largo para desktop, com diminuição na responsividade mobile. O layout é muito direto: conteúdo organizado em sessões com identificadores de âncora (Portfolio, Processo, Sobre, Contato), favorecendo navegação simples e conversão.

O hero combina texto à esquerda com elemento gráfico geométrico à direita, mantendo a composição equilibrada e evitando uma tela excessivamente carregada. A organização dos blocos segue uma lógica de apresentação de proposta, prova, processo e fechamento.

## Elevation & Depth

O sistema é majoritariamente plano, mas conta com camadas sutis para criar profundidade visual. Em vez de sombras fortes e abundantes, a sensação de dimensão vem de contraste tonal, bordas e efeito de glow discreto em elementos orbitais.

### Shadow Vocabulary

- **Glow de destaque** (`box-shadow: 0 0 24px 6px rgba(78, 107, 255, 0.55)`): usado no núcleo orbital para reforçar a ideia de energia, tecnologia e foco central.
- **Ambient light** (radial gradients): usado no background do hero para sugerir espaço e profundidade sem afetar a leitura.

### Named Rules

**A regra da sofisticação mínima.** A profundidade do sistema é sutil e intencional; ele não depende de sombras pesadas para transmitir premium.

## Shapes

Os cantos são predominantemente retos, com algumas bordas levemente arredondadas em cards e botões. A linguagem geométrica acompanha a marca e a sensação tecnológica, sem se tornar excessivamente arredondada ou orgânica.

- Botões primários e ghost usam cantos retos ou levemente articulados, mantendo uma sensação de precisão.
- Cards e containers têm radius moderado para definir superfícies sem perder a rigidez visual do sistema.
- O elemento orbital usa círculos concêntricos, reforçando a metáfora espacial e o tema principal.

## Components

### Buttons

- **Shape:** radius pequeno, aproximadamente 4px; estrutura limpa e direta.
- **Primary:** fundo azul elétrico com texto claro, padding de 14px 28px, foco em ação imediata.
- **Hover / Focus:** ao passar o mouse, o ghost button ganha contorno mais visível e o texto fica mais claro; o botões primários mantêm a mesma identidade forte de contraste.

### Cards / Containers

- **Corner Style:** radius de 12px em cards e blocos de conteúdo.
- **Background:** superfícies escuras com borda sutil.
- **Shadow Strategy:** quase ausente; o contraste de cores e a separação por bordas dão estrutura.
- **Internal Padding:** espaçamento generoso e consistente para facilitar a leitura.

### Navigation

- **Style:** barra superior fixa, compacta e discretamente transparente, com divisória inferior sutil.
- **Typography:** texto pequeno em uppercase com baixo peso visual e alta legibilidade.
- **State:** links acinzentados em repouso, com maior contraste ao hover.

### Hero / Signature Element

- **Visual Signature:** anéis orbitais em movimento e núcleo central azul, funcionando como metáfora de execução, criação e trajetória de projetos.
- **Composition:** texto à esquerda e elemento gráfico à direita, criando um equilíbrio técnico e visual sem perder foco no principal: a proposta de valor.

## Do's and Don'ts

### Do:

- **Do** manter o fundo escuro como base visual principal para reforçar a identidade premium e tecnológica.
- **Do** usar o azul como acento focal e raro; ele deve ser o elemento mais carregado de energia da página.
- **Do** manter a leitura do corpo em Inter com alto contraste e seções bem separadas.
- **Do** preservar o tema orbital como assinatura visual sem sobrecarregar os blocos de conteúdo.

### Don't:

- **Don't** inserir excesso de cores ou efeitos visuais que compete com a proposta principal do estúdio.
- **Don't** usar sombras pesadas ou bordas exageradas; a profundidade da identidade é sutil e tecnológica.
- **Don't** transformar o hero em um painel caótico; ele deve sempre priorizar o valor e o CTA.
- **Don't** misturar estilos de tipografia sem propósito; o sistema tem clara separação entre marca e leitura.
