# Projeto — Recriação Responsiva

## Autor

Talyslan Cauan Pimentel Canabarro

## Site Escolhido

Letterboxd

## Link do Site

https://letterboxd.com/

## Objetivo

Criar uma versão responsiva inspirada na homepage do Letterboxd, reinterpretando a identidade visual em uma marca fictícia chamada **Afundesse** — rede social para afundar nos filmes e séries.

## Estratégia Responsiva

Mobile-first utilizando Flexbox e CSS Grid. Todo o conteúdo principal fica dentro de um container único (`.layout-container`, `max-width: 75rem`) centralizado — o layout não se espalha em telas ultrawide nem ao reduzir o zoom. O menu mobile usa `<details>`/`<summary>` (HTML + CSS puro, sem JavaScript).

## Breakpoints

- **480px** — grid de filmes em 3 colunas; features em 2 colunas
- **768px** — navegação horizontal; hero em duas colunas; reviews em 2 colunas
- **1024px** — filmes em 6 colunas; overlay no hero; features em 3 colunas
- **1280px** — espaçamentos ampliados e hero mais alto

## Recursos Utilizados

- CSS Grid (hero, filmes, features, reviews)
- Flexbox (header, cards de review, faixa de posters, footer)
- `clamp()` nos títulos principais
- Tema escuro fixo via variáveis CSS (`color-scheme: dark`)
- `prefers-reduced-motion` para acessibilidade
- Media Queries com `min-width`
- Google Fonts (Barlow, Barlow Condensed)
- Imagens de capas de filmes (Wikipedia / IMDb públicas)

## Adaptações Realizadas

- Marca renomeada para **Afundesse** com logo de três círculos azuis mais visíveis
- Tema escuro fixo (sem modo claro) com paleta azul
- Novas seções: estatísticas, séries, listas populares, journal e apps
- Hero com background de capas + gradiente e posters flutuantes
- Seção de depoimentos estilo Letterboxd com críticas curtas e espirituosas
- Animações CSS: fade-in, float, marquee, pulse-glow
- Textos traduzidos para português
- Hero simplificado com mosaico de posters em grid (sem animações JS do original)
- Seções condensadas: trending, features, reviews, recém avaliados e CTA
- Paleta inspirada no Letterboxd (#14181C, #00E054) via variáveis CSS
- Menu mobile com `<details>` em vez do menu JS do site original

## Dificuldades

- Download de algumas capas bloqueado por hotlink protection (resolvido com fontes alternativas)
- Reproduzir a densidade visual do mosaico animado do hero sem JavaScript
- Equilibrar fidelidade visual com código autoral (sem copiar CSS original)

## Como testar

1. Abrir `cap10/at01.html` no navegador
2. Redimensionar a janela abaixo e acima de 480px, 768px e 1024px
3. Alternar tema claro/escuro nas preferências do sistema operacional
4. No mobile, tocar em **Menu** para abrir a navegação
5. Verificar rolagem horizontal na faixa "Recém avaliados"

## Estrutura de arquivos

```
cap10/
├── at01.html
├── at01.css
├── assets/
│   └── images/   (capas de filmes)
└── README.md
```
