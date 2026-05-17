# Memorial de Ídolos do Cruzeiro Esporte Clube

Este projeto consiste em uma plataforma web dinâmica desenvolvida como parte das atividades interdisciplinares do curso de Sistemas de Informação. A aplicação lista grandes ídolos da história do clube e exibe informações detalhadas de cada atleta através do conceito de páginas interligadas dinamicamente, utilizando uma arquitetura baseada em dados estruturados no formato JSON e renderização assíncrona.

## 👤 Dados do Aluno
* **Nome:** Lucas de Freitas Ferreira
* **Matrícula:** 1574447
* **Curso:** Sistemas de Informação
* **Período:** 1º Semestre

---

## 🛠️ Habilidades Técnicas Aplicadas
* **Manipulação Avançada do DOM com JavaScript:** Renderização e injeção totalmente dinâmica de elementos HTML na inicialização da página a partir de dados estruturados.
* **Componentização com Bootstrap 5:** Implementação de estruturas oficiais do framework Bootstrap, como o componente de Carrossel (Slider) para os itens em destaque e o sistema de Grid com Rows e Columns para o grupo de cards de forma limpa.
* **Passagem de Parâmetros via URL:** Uso de *Query String* (`?id=X`) associado à API `URLSearchParams` para criar uma página única e personalizada de detalhes baseada no identificador do item.
* **Modelagem de Entidades Relacionadas (JSON):** Estruturação de dados simulando um banco de dados relacional, conectando a entidade principal (informações gerais do jogador) com a entidade secundária (galeria de fotos históricas vinculadas).
* **Layout Totalmente Responsivo:** Combinação do sistema de grids estruturais do Bootstrap com CSS Flexbox customizado para garantir perfeita adaptabilidade tanto em desktops quanto em celulares.

 💾 Estrutura de Dados JSON Utilizada (`app.js`)

O arquivo de lógica centralizada utiliza a seguinte estrutura unificada de chaves e coleções para alimentar toda a aplicação de forma dinâmica:

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
            { "url": "imagens/fabio.png", "titulo": "Fábio comemorando o título..." },
            { "url": "imagens/fabio.png", "titulo": "O paredão celeste erguendo..." }
        ]
    },
    {
        "id": 2,
        "nome": "Alex",
        "posicao": "Meia",
        "periodo": "2001 - 2004",
        "jogos": "121",
        "descricao": "O 'Talento Azul', maestro da histórica Tríplice Coroa...",
        "biografia": "Alexandro de Souza, o Alex, teve uma das passagens...",
        "titulos": ["Tríplice Coroa (2003)", "Campeonato Brasileiro..."],
        "imagem": "imagens/alex.png",
        "destaque": true,
        "fotosVinculadas": [
            { "url": "imagens/alex.png", "titulo": "Alex comemorando o antológico gol..." },
            { "url": "imagens/alex.png", "titulo": "O maestro com a taça de campeão..." }
        ]
    },
    {
        "id": 3,
        "nome": "Tostão",
        "posicao": "Atacante / Meia",
        "periodo": "1963 - 1972",
        "jogos": "378",
        "descricao": "O 'Rei Branco', maior artilheiro da história...",
        "biografia": "Eduardo Gonçalves de Andrade, o Tostão, é considerado...",
        "titulos": ["Taça Brasil / Campeonato Brasileiro (1966)..."],
        "imagem": "imagens/tostao.png",
        "destaque": false,
        "fotosVinculadas": [
            { "url": "imagens/tostao.png", "titulo": "Tostão posando com o clássico uniforme..." }
        ]
    },
    {
        "id": 4,
        "nome": "Dirceu Lopes",
        "posicao": "Meia / Atacante",
        "periodo": "1963 - 1977",
        "jogos": "610",
        "descricao": "O 'Príncipe', um dos maiores camisas 10...",
        "biografia": "Dirceu Lopes Mendes é uma das figuras mais emblemáticas...",
        "titulos": ["Taça Brasil / Campeonato Brasileiro (1966)", "Campeonato Mineiro..."],
        "imagem": "imagens/dirceu.png",
        "destaque": true,
        "fotosVinculadas": [
            { "url": "imagens/dirceu.png", "titulo": "Dirceu Lopes desfilando sua genialidade..." },
            { "url": "imagens/dirceu.png", "titulo": "O Príncipe celebrando a conquista..." }
        ]
    }
];