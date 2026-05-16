
const dados = [
    {
        "id": 1,
        "nome": "Fábio",
        "posicao": "Goleiro",
        "periodo": "2005 - 2021",
        "jogos": "976",
        "descricao": "O atleta com mais jogos na história do Cruzeiro e um dos maiores goleiros do Brasil.",
        "biografia": "Fábio Deivson Lopes Maciel é sinônimo de Cruzeiro. Com quase mil partidas disputadas, o goleiro se destacou por defesas milagrosas, regularidade impressionante e uma liderança incontestável. Foi peça fundamental nas conquistas de dois Campeonatos Brasileiros consecutivos e do bicampeonato da Copa do Brasil.",
        "titulos": ["Campeonato Brasileiro (2013, 2014)", "Copa do Brasil (2000, 2017, 2018)", "Campeonato Mineiro (7 vezes)"],
        "imagem": "imagens/fabio.png"
    },
    {
        "id": 2,
        "nome": "Alex",
        "posicao": "Meia",
        "periodo": "2001 - 2004",
        "jogos": "121",
        "descricao": "O 'Talento Azul', maestro da histórica Tríplice Coroa de 2003.",
        "biografia": "Alexandro de Souza, o Alex, teve uma das passagens mais brilhantes que um jogador já registrou no futebol brasileiro. Em 2003, ele comandou o time que encantou o país, conquistando o Campeonato Mineiro, a Copa do Brasil e o Brasileirão no mesmo ano, exibindo um futebol genial, técnico e cirúrgico.",
        "titulos": ["Tríplice Coroa (2003)", "Campeonato Brasileiro (2003)", "Copa do Brasil (2003)", "Campeonato Mineiro (2003, 2004)"],
        "imagem": "imagens/alex.png"
    },
    {
        "id": 3,
       "nome": "Tostão",
       "posicao": "Atacante / Meia",
      "periodo": "1963 - 1972",
       "jogos": "378",
        "descricao": "O 'Rei Branco', maior artilheiro da história do clube e gênio da Taça Brasil de 1966.",
        "biografia": "Eduardo Gonçalves de Andrade, o Tostão, é considerado por muitos o maior jogador da história do Cruzeiro. Dotado de uma inteligência genial e visão de jogo incomparável, ele liderou o histórico time da década de 1960 que encantou o país e desbancou o Santos de Pelé na final da Taça Brasil de 1966. É o maior artilheiro do clube com 249 gols marcados.",
        "titulos": ["Taça Brasil / Campeonato Brasileiro (1966)", "Campeonato Mineiro (1965, 1966, 1967, 1968, 1969)"],
        "imagem": "imagens/tostao.png"
    }
];


function renderizarHome() {
    const container = document.getElementById('grid-idolos');
    if (!container) return; 

    container.innerHTML = ""; 

    dados.forEach(idolo => {
       
        const card = document.createElement('div');
        card.className = 'card-idolo';
        
        card.innerHTML = `
            <img src="${idolo.imagem}" alt="Foto de ${idolo.nome}">
            <div class="card-conteudo">
                <span class="posicao-tag">${idolo.posicao}</span>
                <h3>${idolo.nome}</h3>
                <p>${idolo.descricao}</p>
                <!-- Passagem de parâmetro via Query String (?id=...) -->
                <a href="detalhes.html?id=${idolo.id}" class="btn-saber-mais">Ver História Completa</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}



function renderizarDetalhes() {
    const containerDetalhe = document.getElementById('detalhe-conteudo');
    if (!containerDetalhe) return; 

    const urlParams = new URLSearchParams(window.location.search);
    const idParam = parseInt(urlParams.get('id'));

   
    const idolo = dados.find(item => item.id === idParam);

    if (idolo) {
        // 3. Injeta dinamicamente as informações completas no HTML
        document.getElementById('idolo-foto').src = idolo.imagem;
        document.getElementById('idolo-foto').alt = `Foto de ${idolo.nome}`;
        document.getElementById('idolo-nome').innerText = idolo.nome;
        document.getElementById('idolo-posicao').innerText = idolo.posicao;
        document.getElementById('idolo-periodo').innerText = idolo.periodo;
        document.getElementById('idolo-jogos').innerText = idolo.jogos;
        document.getElementById('idolo-biografia').innerText = idolo.biografia;

       
        const listaTitulos = document.getElementById('idolo-titulos');
        listaTitulos.innerHTML = ""; 
        idolo.titulos.forEach(titulo => {
            const li = document.createElement('li');
            li.innerText = titulo;
            listaTitulos.appendChild(li);
        });
    } else {
      
        containerDetalhe.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h2>Craque não encontrado!</h2>
                <p>O jogador solicitado não consta em nossa base de dados.</p>
                <a href="index.html" class="btn-voltar">← Voltar para a Home</a>
            </div>
        `;
    }
}


window.onload = function() {
    renderizarHome();
    renderizarDetalhes();
};