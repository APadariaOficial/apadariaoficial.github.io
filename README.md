# A Padaria — Site / Catálogo (one-page)

Site institucional e catálogo de **A Padaria, por Patrícia Drumond**.
Sem banco de dados: todo o conteúdo fica em **um único arquivo JSON**, editável à mão.

## Estrutura dos arquivos

```
apadaria/
├─ index.html                 ← a página (não precisa editar)
├─ dados/
│  └─ dados.json              ← 👈 EDITE AQUI: produtos, preços, textos e contato
├─ assets/
│  ├─ css/styles.css          ← estilos / cores da marca
│  ├─ js/app.js               ← monta a página a partir do dados.json
│  └─ img/
│     ├─ padronagem.svg       ← grafismo de fundo (laranja)
│     └─ padronagem-branco.svg← grafismo de fundo (branco)
└─ README.md
```

## Como editar o catálogo (dados/dados.json)

Abra `dados/dados.json` em qualquer editor de texto (Bloco de Notas, VS Code…).

- **Alterar um preço:** troque o número em `"preco"`. Use ponto como separador
  decimal (ex.: `39.90` aparece como `R$ 39,90`).
- **Adicionar um produto:** copie um bloco `{ ... }` dentro de `"produtos"` e ajuste:
  ```json
  { "nome": "Pão de Mel", "tipo": "Unidade", "preco": 12.00, "descricao": "", "foto": "" }
  ```
  O campo `"descricao"` é opcional — deixe `""` se não quiser texto.
- **Adicionar a foto de um produto:** salve a imagem em `assets/img/produtos/`
  e informe o caminho no campo `"foto"`, por exemplo:
  `"foto": "assets/img/produtos/croissant.jpg"`.
  Enquanto o campo estiver vazio (`""`), o card mostra "Foto em breve".
- **Remover um produto:** apague o bloco `{ ... }` dele (cuidado com as vírgulas).
- **Nova categoria:** copie um bloco de categoria inteiro (com `nome`, `subtitulo`
  e `produtos`).
- **Trocar telefone, endereço, horário, Instagram:** edite a seção `"contato"`.
  O WhatsApp usa `"whatsapp_numero"` no formato internacional, sem símbolos
  (ex.: `5531972598959`).
- **Textos do topo / "Sobre" / "Encomendas":** edite a seção `"marca"`.

> Dica: depois de editar, valide o arquivo em https://jsonlint.com para garantir
> que não sobrou nenhuma vírgula fora do lugar.

## Como ver o site no seu computador

Por segurança, o navegador **não** lê o `dados.json` abrindo o `index.html`
com duplo clique. Use uma das opções abaixo:

**Opção 1 — servidor local (rápido, para testar):**
1. Abra o terminal dentro da pasta `apadaria`.
2. Rode: `python -m http.server`
3. Acesse `http://localhost:8000` no navegador.

**Opção 2 — publicar na internet (recomendado):**
Suba a pasta inteira em um serviço gratuito de sites estáticos:
- **Netlify** (netlify.com) → arraste a pasta para o painel “Deploy”.
- **Vercel** (vercel.com)
- **GitHub Pages**

Qualquer um deles serve o site e o `dados.json` corretamente.

## Cores oficiais da marca

| Cor | HEX |
|-----|-----|
| Laranja Carnaval Suvinil | `#F77315` |
| Verde Amizade | `#11908F` |
| Amarelo Quindim | `#FAD117` |
| Rosa-bronzeado | `#CC9CA5` |

Fontes: **Archivo Black** (títulos) e **Work Sans** (texto) — carregadas do
Google Fonts.
