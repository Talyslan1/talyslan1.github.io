# Projeto CSS Zen Garden

## Autor

Talyslan Cauan Pimentel Canabarro

## Tema

Dark Bento — Orange Impact

## Design de Referência

Apothecary (referência acadêmica) + inspiração visual em layouts portfolio/AI modernos (hero gradiente, bento grid, dark mode)

## Link de Referência

<https://www.csszengarden.com/218/>

## Descrição

O layout combina a identidade **dark + laranja** com a organização editorial do **Apothecary**: coluna central estreita (~52rem), conteúdo centralizado, grandes espaços verticais entre seções, títulos com linhas horizontais, lista de designs com pontilhados conectando nome e autor, bloco laranja de destaque em "So What is This About?" e **Requirements** em múltiplas colunas no desktop.

## Recursos Utilizados

- CSS Grid (layout bento + estrutura principal)
- Flexbox (sidebar, rodapé e listas)
- Variáveis CSS (`:root`)
- Google Fonts (Syne, Plus Jakarta Sans)
- Media Queries, `prefers-reduced-motion` e `prefers-contrast`
- Scroll-driven animations (`animation-timeline: view()`)
- Glassmorphism (`backdrop-filter`)
- Pseudo-elementos para hero full-bleed
- Efeitos `:hover` e `:focus-visible`
