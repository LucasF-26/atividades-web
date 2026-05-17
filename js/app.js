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
        "imagem": "imagens/fabio.png",
        "destaque": true,
        "fotosVinculadas": [
            { "url": "imagens/fabio.png", "titulo": "Fábio comemorando o título da Copa do Brasil no Mineirão" },
            { "url": "imagens/fabio.png", "titulo": "O paredão celeste erguendo a taça do Brasileirão" }
        ]
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
        "imagem": "imagens/alex.png",
        "destaque": true,
        "fotosVinculadas": [
            { "url": "imagens/alex.png", "titulo": "Alex comemorando o antológico gol de placa de cobertura" },
            { "url": "imagens/alex.png", "titulo": "O maestro com a taça de campeão brasileiro de 2003" }
        ]
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
        "imagem": "imagens/tostao.png",
        "destaque": false,
        "fotosVinculadas": [
            { "url": "imagens/tostao.png", "titulo": "Tostão posando com o clássico uniforme nos anos 60" }
        ]
    },
    {
        "id": 4,
        "nome": "Dirceu Lopes",
        "posicao": "Meia / Atacante",
        "periodo": "1963 - 1977",
        "jogos": "610",
        "descricao": "O 'Príncipe', um dos maiores camisas 10 do futebol brasileiro e símbolo do Esquadrão de 1966.",
        "biografia": "Dirceu Lopes Mendes é uma das figuras mais emblemáticas e geniais da história do Cruzeiro. Conhecido pela sua velocidade impressionante, dribles desconcertantes e arrancadas fulminantes, formou com Tostão uma das duplas mais temidas do futebol mundial. Foi o grande maestro na histórica goleada de 6 a 2 sobre o Santos de Pelé e peça-chave na conquista da Taça Brasil de 1966.",
        "titulos": ["Taça Brasil / Campeonato Brasileiro (1966)", "Campeonato Mineiro (9 vezes)"],
        "imagem": "imagens/dirceu.png",
        "destaque": true,
        "fotosVinculadas": [
            { "url": "imagens/dirceu.png", "titulo": "Dirceu Lopes desfilando sua genialidade no Mineirão" },
            { "url": "imagens/dirceu.png", "titulo": "O Príncipe celebrando a conquista histórica de 1966" }
        ]
    }
];

function renderizarHome() {
    const containerGrid = document.getElementById('grid-idolos');
    const containerSlides = document.getElementById('carrossel-slides');
    const containerIndicadores = document.getElementById('carrossel-indicadores');

    if (containerGrid) {
        containerGrid.innerHTML = "";
        dados.forEach(idolo => {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4';
            col.innerHTML = `
                <article class="card-idolo">
                    <img src="${idolo.imagem}" alt="Foto de ${idolo.nome}">
                    <div class="card-conteudo">
                        <span class="posicao-tag">${idolo.posicao}</span>
                        <h3>${idolo.nome}</h3>
                        <p>${idolo.descricao}</p>
                        <a href="detalhes.html?id=${idolo.id}" class="btn-saber-mais">Ver História Completa</a>
                    </div>
                </article>
            `;
            containerGrid.appendChild(col);
        });
    }

    if (containerSlides && containerIndicadores) {
        containerSlides.innerHTML = "";
        containerIndicadores.innerHTML = "";
        
        const idolosDestaque = dados.filter(item => item.destaque);
        
        idolosDestaque.forEach((idolo, index) => {
            const ativoClass = index === 0 ? 'active' : '';
            const ativoAria = index === 0 ? 'aria-current="true"' : '';
            
            containerIndicadores.innerHTML += `
                <button type="button" data-bs-target="#carrosselIdolos" data-bs-slide-to="${index}" class="${ativoClass}" ${ativoAria} aria-label="Slide ${index + 1}"></button>
            `;

            containerSlides.innerHTML += `
                <div class="carousel-item ${ativoClass}">
                    <img src="${idolo.imagem}" class="d-block w-100" alt="${idolo.nome}">
                    <div class="carousel-caption d-none d-sm-block">
                        <h3>${idolo.nome}</h3>
                        <p>${idolo.descricao}</p>
                    </div>
                </div>
            `;
        });
    }
}

function renderizarDetalhes() {
    const containerDetalhe = document.getElementById('detalhe-conteudo');
    if (!containerDetalhe) return;

    const urlParams = new URLSearchParams(window.location.search);
    const idParam = parseInt(urlParams.get('id'));
    const idolo = dados.find(item => item.id === idParam);

    if (idolo) {
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

        const containerGaleria = document.getElementById('galeria-fotos');
        if (containerGaleria) {
            containerGaleria.innerHTML = "";
            idolo.fotosVinculadas.forEach(foto => {
                containerGaleria.innerHTML += `
                    <div class="card-foto-vinculada">
                        <img src="${foto.url}" alt="${foto.titulo}">
                        <div class="legenda-foto"><p class="mb-0">${foto.titulo}</p></div>
                    </div>
                `;
            });
        }
    } else {
        containerDetalhe.innerHTML = `
            <div style="text-align: center; padding: 50px; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h2 style="color: #0045a4; margin-bottom: 15px;">Craque não encontrado!</h2>
                <p style="margin-bottom: 25px;">O jogador solicitado não consta em nossa base de dados.</p>
                <a href="index.html" class="btn-saber-mais" style="display: inline-block; padding: 10px 25px;">← Voltar para a Home</a>
            </div>
        `;
    }
}

window.onload = function() {
    renderizarHome();
    renderizarDetalhes();
};