# Capítulo 15 — Validação de Formulários com HTML e JavaScript

## Autor

Talyslan Cauan Pimentel Canabarro

## Objetivo

Formulário de inscrição para novos alunos com validação HTML nativa, validação JavaScript no envio e validação em tempo real nos campos principais.

## Como testar

1. Abrir `cap-15/index.html` no navegador
2. Preencher os campos e observar validações em tempo real (nome, e-mail, senha, confirmar senha, mensagem)
3. Testar a máscara de telefone no formato `(82) 99999-9999`
4. Tentar enviar com dados inválidos e verificar mensagens de erro
5. Enviar com dados válidos e confirmar no modal de confirmação
6. Recarregar a página para verificar restauração automática via `localStorage`
7. Após enviar, acessar `cap-15/inscricoes.html` para ver as inscrições salvas

## Inscrições enviadas

As inscrições confirmadas são salvas no `localStorage` (chave `cap15-inscricoes-enviadas`) e podem ser visualizadas em `inscricoes.html`. É possível ver detalhes completos, excluir uma inscrição ou limpar todas.

> As senhas **não** são armazenadas nas inscrições enviadas.

## Validações implementadas

| Campo | Regras |
| ----- | ------ |
| Nome | Obrigatório, mínimo 3 caracteres |
| E-mail | Obrigatório, formato válido |
| Telefone | Formato `(82) 99999-9999` |
| Data de nascimento | Idade mínima de 16 anos |
| Curso | Seleção obrigatória |
| Turno | Um turno obrigatório |
| Áreas de interesse | Mínimo 2 opções |
| Senha | Mínimo 8 caracteres, 1 maiúscula, 1 número |
| Confirmar senha | Deve coincidir com a senha |
| Mensagem | Entre 50 e 500 caracteres |
| Foto | Opcional; JPG/PNG, máximo 2 MB |
| Termos | Aceite obrigatório |

## Melhorias de UX

- Indicador de força da senha
- Contador de caracteres da mensagem
- Pré-visualização da foto enviada
- Máscara para telefone
- Destaque visual de campos válidos e inválidos

## Funcionalidades bônus

Todas as funcionalidades do desafio foram implementadas:

| Funcionalidade | Como testar |
| -------------- | ----------- |
| **localStorage** | Preencha parte do formulário e veja "Rascunho salvo automaticamente" |
| **Restaurar dados** | Recarregue a página — o banner azul aparece com os dados restaurados |
| **Modal de confirmação** | Envie o formulário válido — um resumo dos dados é exibido antes de confirmar |
| **Animação de sucesso** | Após confirmar, confetes caem e o ícone ✓ anima na tela |
| **Mostrar/ocultar senha** | Clique em "Mostrar" / "Ocultar" nos campos de senha |

> As senhas **não** são salvas no `localStorage` por segurança. Fotos menores que 500 KB também são restauradas no rascunho.

## Estrutura de arquivos

```
cap-15/
├── index.html
├── inscricoes.html
├── css/
│   └── style.css
├── js/
│   ├── validacoes.js
│   ├── util.js
│   ├── app.js
│   └── inscricoes.js
└── README.md
```
