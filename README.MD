Memorial Celeste - Ídolos do Cruzeiro

Aluno: Lucas de Freitas Ferreira

Matrícula: 1574447

Curso: Sistemas de Informação

Turma: 1º Período


Sobre o Projeto

O Memorial Celeste é uma aplicação web dedicada a eternizar a história e as conquistas dos maiores ídolos do Cruzeiro Esporte Clube. O projeto foi desenvolvido como Trabalho Prático da disciplina de Desenvolvimento Web.

Funcionalidades


Home-page com carrossel de destaques, galeria de cards e gráfico de partidas
Login e Cadastro de usuários com controle de sessão via sessionStorage
Menu dinâmico — opções de Favoritos e Logout visíveis apenas para usuário logado; Cadastro visível apenas para administradores
Pesquisa de ídolos por nome ou descrição
Favoritos — usuário logado pode favoritar/desfavoritar ídolos com ícone de coração
Página Meus Favoritos listando os ídolos favoritados pelo usuário logado
CRUD de Ídolos exclusivo para administradores (inserir, editar, excluir)
Página de Detalhes com biografia, ficha técnica, títulos e galeria de fotos
Visualizações avançadas com gráfico de partidas por ídolo (Chart.js)


Tecnologias Utilizadas


HTML5, CSS3, JavaScript
Bootstrap 5.3
Chart.js
JSON Server (back-end / API REST)

## 🖼️ Prints da Funcionalidade

### Print 1 — Hero, estatísticas gerais e primeiros gráficos
![Visualizações - parte superior](imagens/prints/print1.png)

> Exibe os 4 cards de estatísticas (ídolos, partidas, títulos e anos), o gráfico de barras com as partidas por ídolo e o gráfico de rosca com a distribuição por posição.

---

### Print 2 — Gráfico de anos, ranking e tabela de títulos
![Visualizações - parte inferior](imagens/prints/print2.png)

> Exibe o gráfico de barras horizontais com os anos de clube, o ranking de partidas com barras de progresso e a tabela completa de títulos conquistados por cada ídolo.

---

## 🛠️ Habilidades Técnicas Aplicadas

- **Manipulação avançada do DOM com JavaScript** — renderização e injeção dinâmica de elementos HTML a partir de dados estruturados
- **Componentização com Bootstrap 5** — carrossel de destaques e sistema de grid responsivo
- **Passagem de parâmetros via URL** — uso de query string (`?id=X`) com a API `URLSearchParams` para páginas de detalhe dinâmicas
- **Modelagem de entidades relacionadas em JSON** — estrutura simulando banco relacional com entidade principal e galeria de fotos vinculada
- **Visualização de dados com Chart.js** — gráficos de barras, rosca e barras horizontais gerados a partir dos dados cadastrados
- **Layout totalmente responsivo** — grid Bootstrap combinado com CSS Flexbox customizado

---

## 💾 Estrutura de Dados JSON (`app.js`)

```javascript
const dados = [
    {
        "id": 1,
        "nome": "Fábio",
        "posicao": "Goleiro",
        "periodo": "2005 - 2021",
        "jogos": "976",
        "descricao": "O atleta com mais jogos na história do Cruzeiro...",
        "biografia": "Fábio Deivson Lopes Maciel é sinônimo de Cruzeiro...",
        "titulos": ["Campeonato Brasileiro (2013, 2014)", "Copa do Brasil..."],
        "imagem": "imagens/fabio.png",
        "destaque": true,
        "fotosVinculadas": [
            { "url": "imagens/fabio.png", "titulo": "Fábio comemorando o título..." }
        ]
    },
    // ... demais ídolos
];
```

---

## 🚀 Como executar

1. Clone o repositório
2. Abra o `index.html` em um navegador (ou use o Live Server do VS Code)
3. Navegue pela galeria, clique em um ídolo para ver os detalhes, ou acesse **Visualizações** para ver o dashboard

---

*&copy; 2026 — Memorial Celeste. Trabalho de Sistemas de Informação — PUC Minas.*
