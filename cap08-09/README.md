# Projeto CSS Zen Garden

## Autor

Talyslan Cauan Pimentel Canabarro

## Tema

Dark Bento - Orange Impact

## Design de Referência

Apothecary (referência acadêmica) + inspiração visual em layouts portfolio/AI modernos (hero gradiente, bento grid, dark mode)

## Link de Referência

[https://www.csszengarden.com/218/](https://www.csszengarden.com/218/)

## Descrição

O layout combina a identidade dark + laranja com organização editorial inspirada no **Apothecary**: coluna central estreita, conteúdo centralizado, grandes espaços verticais, títulos com linhas horizontais, bloco laranja de destaque em "So What is This About?" e **Requirements** em múltiplas colunas no desktop. A sidebar usa cards glass com hover e pills; a seção `.preamble` tem tratamento visual exclusivo full-bleed.

## Recursos Utilizados

- CSS Grid (layout principal + bento)
- Flexbox (sidebar, rodapé e listas)
- Variáveis CSS em três camadas: primitivas, semânticas e componentes (`--comp-*`)
- Google Fonts (Syne, Plus Jakarta Sans, Playfair Display)
- Media Queries, `prefers-reduced-motion` e `prefers-contrast`
- Scroll-driven animations (`animation-timeline: view()`) com fallback
- Glassmorphism (`backdrop-filter`)
- Pseudo-elementos para hero full-bleed e decoração
- Efeitos `:hover` e `:focus-visible`

## Desafios Bônus

### Modo claro/escuro

- Toggle fixo no canto superior direito (`#theme-toggle` + label)
- **Escuro** por padrão; marcar o checkbox ativa o **modo claro**
- Implementado com CSS puro via `:has(#theme-toggle:checked)` — sem JavaScript
- Transição suave de cores com `--transicao-tema`

### Animações

- **Scroll reveal** — seções entram com `revelar` ao rolar (`animation-timeline: view()`)
- **Flutuar** e **pulsar** — orbes decorativos (`.extra1`, `.extra2`)
- **Sublinhar** — links recebem sublinhado animado no `:focus-visible`
- **Hover** — rotação do símbolo `+` na preamble, elevação nos cards da sidebar
- Respeita `prefers-reduced-motion: reduce`

### Acessibilidade

- **Skip link** — “Ir para o conteúdo principal” (`#zen-supporting`)
- `scroll-margin-top` no conteúdo principal
- `:focus-visible` com contorno de alto contraste (`--cor-foco`)
- Checkbox do tema com `aria-label` descritivo
- Texto do toggle visível via `::after` (“Claro” / “Escuro”)
- Suporte a `prefers-contrast: more` (bordas mais espessas e texto reforçado)

### Componentes reutilizáveis (`--comp-*`)

| Token | Uso |
| --- | --- |
| `--comp-card-*` | Cards glass da sidebar |
| `--comp-btn-*` | Botões pill (rodapé, toggle) |
| `--comp-section-*` | Títulos de seção com bordas |

Tokens semânticos (`--cor-fundo`, `--cor-texto`, etc.) centralizam o tema; trocar o toggle redefine todos os valores de uma vez.

## Como testar

1. Abrir `at01.html` no navegador
2. Redimensionar abaixo e acima de **768px**
3. Clicar no toggle **Claro/Escuro**
4. Navegar pelo tab do teclado
5. Ativar “Reduzir movimento” no SO: animações devem parar
