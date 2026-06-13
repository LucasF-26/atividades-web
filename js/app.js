// ============================================================
// CONFIGURAÇÃO
// ============================================================
const API_URL = 'http://localhost:3000';

// ============================================================
// SESSÃO - usuário logado via sessionStorage
// ============================================================
function getUsuarioLogado() {
    const dados = sessionStorage.getItem('usuarioLogado');
    return dados ? JSON.parse(dados) : null;
}

function atualizarMenu() {
    const usuario = getUsuarioLogado();
    const linkLogin    = document.getElementById('link-login');
    const btnLogout    = document.getElementById('btn-logout');
    const linkFavoritos = document.getElementById('link-favoritos');
    const linkCadastro = document.getElementById('link-cadastro');

    if (usuario) {
        if (linkLogin)     linkLogin.classList.add('d-none');
        if (btnLogout)     btnLogout.classList.remove('d-none');
        if (linkFavoritos) linkFavoritos.classList.remove('d-none');
        if (linkCadastro && usuario.admin) linkCadastro.classList.remove('d-none');
    } else {
        if (linkLogin)     linkLogin.classList.remove('d-none');
        if (btnLogout)     btnLogout.classList.add('d-none');
        if (linkFavoritos) linkFavoritos.classList.add('d-none');
        if (linkCadastro)  linkCadastro.classList.add('d-none');
    }
}

function fazerLogout() {
    sessionStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

// ============================================================
// LOGIN E CADASTRO DE USUÁRIO
// ============================================================
function mostrarAba(aba) {
    const formLogin   = document.getElementById('form-login');
    const formCadastro = document.getElementById('form-cadastro');
    const btnLogin    = document.getElementById('aba-login-btn');
    const btnCadastro = document.getElementById('aba-cadastro-btn');
    limparAlerta('alerta-auth');

    if (aba === 'login') {
        formLogin.classList.remove('d-none');
        formCadastro.classList.add('d-none');
        btnLogin.classList.add('active');
        btnCadastro.classList.remove('active');
    } else {
        formLogin.classList.add('d-none');
        formCadastro.classList.remove('d-none');
        btnLogin.classList.remove('active');
        btnCadastro.classList.add('active');
    }
}

async function fazerLogin() {
    const login = document.getElementById('login-usuario').value.trim();
    const senha = document.getElementById('login-senha').value.trim();

    if (!login || !senha) {
        mostrarAlerta('alerta-auth', 'Preencha login e senha.', 'danger');
        return;
    }

    try {
        const res = await fetch(`${API_URL}/usuarios?login=${login}&senha=${senha}`);
        const usuarios = await res.json();

        if (usuarios.length > 0) {
            sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarios[0]));
            window.location.href = 'index.html';
        } else {
            mostrarAlerta('alerta-auth', 'Login ou senha incorretos.', 'danger');
        }
    } catch (e) {
        mostrarAlerta('alerta-auth', 'Erro ao conectar com o servidor. Verifique se o JSON Server está rodando.', 'danger');
    }
}

async function fazerCadastro() {
    const nome  = document.getElementById('cad-nome').value.trim();
    const email = document.getElementById('cad-email').value.trim();
    const login = document.getElementById('cad-login').value.trim();
    const senha = document.getElementById('cad-senha').value.trim();

    if (!nome || !email || !login || !senha) {
        mostrarAlerta('alerta-auth', 'Preencha todos os campos.', 'danger');
        return;
    }

    try {
        // Verificar se login já existe
        const checkRes = await fetch(`${API_URL}/usuarios?login=${login}`);
        const existentes = await checkRes.json();
        if (existentes.length > 0) {
            mostrarAlerta('alerta-auth', 'Esse login já está em uso. Escolha outro.', 'warning');
            return;
        }

        const novoUsuario = { nome, email, login, senha, admin: false };
        const res = await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoUsuario)
        });

        if (res.ok) {
            mostrarAlerta('alerta-auth', 'Conta criada com sucesso! Faça login.', 'success');
            setTimeout(() => mostrarAba('login'), 1500);
        }
    } catch (e) {
        mostrarAlerta('alerta-auth', 'Erro ao conectar com o servidor.', 'danger');
    }
}

// ============================================================
// FAVORITOS
// ============================================================
async function getFavoritosUsuario() {
    const usuario = getUsuarioLogado();
    if (!usuario) return [];
    const res = await fetch(`${API_URL}/favoritos?usuarioId=${usuario.id}`);
    return await res.json();
}

async function isFavorito(idoloId) {
    const usuario = getUsuarioLogado();
    if (!usuario) return false;
    const res = await fetch(`${API_URL}/favoritos?usuarioId=${usuario.id}&idoloId=${idoloId}`);
    const lista = await res.json();
    return lista.length > 0 ? lista[0] : null;
}

async function toggleFavorito(idoloId, botao) {
    const usuario = getUsuarioLogado();
    if (!usuario) {
        alert('Faça login para favoritar ídolos!');
        window.location.href = 'login.html';
        return;
    }

    const favExistente = await isFavorito(idoloId);

    if (favExistente) {
        await fetch(`${API_URL}/favoritos/${favExistente.id}`, { method: 'DELETE' });
        botao.innerHTML = '🤍';
        botao.title = 'Favoritar';
        botao.classList.remove('favoritado');
    } else {
        await fetch(`${API_URL}/favoritos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuarioId: usuario.id, idoloId: idoloId })
        });
        botao.innerHTML = '❤️';
        botao.title = 'Remover dos favoritos';
        botao.classList.add('favoritado');
    }
}

async function toggleFavoritoDetalhe() {
    const urlParams = new URLSearchParams(window.location.search);
    const idoloId = parseInt(urlParams.get('id'));
    const usuario = getUsuarioLogado();
    if (!usuario) {
        alert('Faça login para favoritar ídolos!');
        window.location.href = 'login.html';
        return;
    }

    const favExistente = await isFavorito(idoloId);
    const icone = document.getElementById('icone-favorito-detalhe');
    const texto = document.getElementById('texto-favorito-detalhe');

    if (favExistente) {
        await fetch(`${API_URL}/favoritos/${favExistente.id}`, { method: 'DELETE' });
        icone.textContent = '🤍';
        texto.textContent = 'Favoritar';
    } else {
        await fetch(`${API_URL}/favoritos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuarioId: usuario.id, idoloId: idoloId })
        });
        icone.textContent = '❤️';
        texto.textContent = 'Favoritado';
    }
}

// ============================================================
// HOME - CARROSSEL E CARDS
// ============================================================
let todosIdolos = [];

async function renderizarHome() {
    const containerGrid = document.getElementById('grid-idolos');
    if (!containerGrid) return;

    try {
        const res = await fetch(`${API_URL}/idolos`);
        todosIdolos = await res.json();
        await renderizarCards(todosIdolos);
        renderizarCarrossel(todosIdolos.filter(i => i.destaque));
        renderizarGrafico(todosIdolos);
    } catch (e) {
        containerGrid.innerHTML = `<div class="col-12"><div class="alert alert-danger">Erro ao carregar dados. Verifique se o JSON Server está rodando na porta 3000.</div></div>`;
    }
}

async function renderizarCards(idolos) {
    const containerGrid = document.getElementById('grid-idolos');
    const msgSem = document.getElementById('msg-sem-resultado');
    const usuario = getUsuarioLogado();

    containerGrid.innerHTML = '';

    if (idolos.length === 0) {
        msgSem.classList.remove('d-none');
        return;
    }
    msgSem.classList.add('d-none');

    // Buscar favoritos do usuário de uma vez
    let favoritosIds = [];
    if (usuario) {
        const favs = await getFavoritosUsuario();
        favoritosIds = favs.map(f => f.idoloId);
    }

    idolos.forEach(idolo => {
        const isFav = favoritosIds.includes(idolo.id);
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4';
        col.innerHTML = `
            <article class="card-idolo">
                <img src="${idolo.imagem}" alt="Foto de ${idolo.nome}">
                <div class="card-conteudo">
                    <span class="posicao-tag">${idolo.posicao}</span>
                    <h3>${idolo.nome}</h3>
                    <p>${idolo.descricao}</p>
                    <div class="card-actions d-flex justify-content-between align-items-center mt-3">
                        <a href="detalhes.html?id=${idolo.id}" class="btn-saber-mais">Ver História</a>
                        <button class="btn-coracao ${isFav ? 'favoritado' : ''}" 
                                title="${isFav ? 'Remover dos favoritos' : 'Favoritar'}"
                                onclick="toggleFavorito(${idolo.id}, this)">
                            ${isFav ? '❤️' : '🤍'}
                        </button>
                    </div>
                </div>
            </article>
        `;
        containerGrid.appendChild(col);
    });
}

function renderizarCarrossel(idolosDestaque) {
    const containerSlides = document.getElementById('carrossel-slides');
    const containerIndicadores = document.getElementById('carrossel-indicadores');
    if (!containerSlides || !containerIndicadores) return;

    containerSlides.innerHTML = '';
    containerIndicadores.innerHTML = '';

    idolosDestaque.forEach((idolo, index) => {
        const ativoClass = index === 0 ? 'active' : '';
        const ativoAria  = index === 0 ? 'aria-current="true"' : '';

        containerIndicadores.innerHTML += `
            <button type="button" data-bs-target="#carrosselIdolos" data-bs-slide-to="${index}" 
                    class="${ativoClass}" ${ativoAria} aria-label="Slide ${index + 1}"></button>
        `;
        containerSlides.innerHTML += `
            <div class="carousel-item ${ativoClass}">
                <a href="detalhes.html?id=${idolo.id}">
                    <img src="${idolo.imagem}" class="d-block w-100" alt="${idolo.nome}">
                    <div class="carousel-caption d-none d-sm-block">
                        <h3>${idolo.nome}</h3>
                        <p>${idolo.descricao}</p>
                    </div>
                </a>
            </div>
        `;
    });
}

function renderizarGrafico(idolos) {
    const canvas = document.getElementById('graficoJogos');
    if (!canvas) return;

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: idolos.map(i => i.nome),
            datasets: [{
                label: 'Partidas pelo Cruzeiro',
                data: idolos.map(i => parseInt(i.jogos)),
                backgroundColor: ['#0045a4cc', '#1565c0cc', '#1976d2cc', '#42a5f5cc'],
                borderColor: ['#0045a4', '#1565c0', '#1976d2', '#42a5f5'],
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => ` ${ctx.parsed.y} partidas`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#555' },
                    grid: { color: '#e0e0e0' }
                },
                x: {
                    ticks: { color: '#333', font: { weight: 'bold' } },
                    grid: { display: false }
                }
            }
        }
    });
}

// ============================================================
// PESQUISA
// ============================================================
function pesquisar() {
    const termo = document.getElementById('campo-pesquisa').value.trim().toLowerCase();
    if (!termo) {
        renderizarCards(todosIdolos);
        return;
    }
    const filtrados = todosIdolos.filter(i =>
        i.nome.toLowerCase().includes(termo) ||
        i.descricao.toLowerCase().includes(termo)
    );
    renderizarCards(filtrados);
}

function limparPesquisa() {
    document.getElementById('campo-pesquisa').value = '';
    renderizarCards(todosIdolos);
}

// Pesquisa ao pressionar Enter
document.addEventListener('keydown', function(e) {
    const campo = document.getElementById('campo-pesquisa');
    if (campo && e.key === 'Enter') pesquisar();
});

// ============================================================
// DETALHES
// ============================================================
async function renderizarDetalhes() {
    const containerDetalhe = document.getElementById('detalhe-conteudo');
    if (!containerDetalhe) return;

    const urlParams = new URLSearchParams(window.location.search);
    const idParam = parseInt(urlParams.get('id'));

    try {
        const res = await fetch(`${API_URL}/idolos/${idParam}`);
        if (!res.ok) throw new Error('Não encontrado');
        const idolo = await res.json();

        document.getElementById('idolo-foto').src = idolo.imagem;
        document.getElementById('idolo-foto').alt = `Foto de ${idolo.nome}`;
        document.getElementById('idolo-nome').innerText = idolo.nome;
        document.getElementById('idolo-posicao').innerText = idolo.posicao;
        document.getElementById('idolo-periodo').innerText = idolo.periodo;
        document.getElementById('idolo-jogos').innerText = idolo.jogos;
        document.getElementById('idolo-biografia').innerText = idolo.biografia;

        const listaTitulos = document.getElementById('idolo-titulos');
        listaTitulos.innerHTML = '';
        idolo.titulos.forEach(titulo => {
            const li = document.createElement('li');
            li.innerText = titulo;
            listaTitulos.appendChild(li);
        });

        const containerGaleria = document.getElementById('galeria-fotos');
        if (containerGaleria) {
            containerGaleria.innerHTML = '';
            idolo.fotosVinculadas.forEach(foto => {
                containerGaleria.innerHTML += `
                    <div class="card-foto-vinculada">
                        <img src="${foto.url}" alt="${foto.titulo}">
                        <div class="legenda-foto"><p class="mb-0">${foto.titulo}</p></div>
                    </div>
                `;
            });
        }

        // Botão de favorito
        const usuario = getUsuarioLogado();
        const btnFav = document.getElementById('btn-favorito-detalhe');
        if (usuario && btnFav) {
            btnFav.classList.remove('d-none');
            const favExistente = await isFavorito(idolo.id);
            document.getElementById('icone-favorito-detalhe').textContent = favExistente ? '❤️' : '🤍';
            document.getElementById('texto-favorito-detalhe').textContent  = favExistente ? 'Favoritado' : 'Favoritar';
        }

    } catch (e) {
        containerDetalhe.innerHTML = `
            <div style="text-align:center;padding:50px;background:#fff;border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,.05)">
                <h2 style="color:#0045a4;margin-bottom:15px">Craque não encontrado!</h2>
                <p style="margin-bottom:25px">O jogador solicitado não consta em nossa base de dados.</p>
                <a href="index.html" class="btn-saber-mais" style="display:inline-block;padding:10px 25px">← Voltar para a Home</a>
            </div>`;
    }
}

// ============================================================
// FAVORITOS - PÁGINA
// ============================================================
async function renderizarFavoritos() {
    const grid = document.getElementById('grid-favoritos');
    const msgSem = document.getElementById('msg-sem-favoritos');
    if (!grid) return;

    const usuario = getUsuarioLogado();
    if (!usuario) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const favs = await getFavoritosUsuario();
        if (favs.length === 0) {
            msgSem.classList.remove('d-none');
            return;
        }

        // Buscar detalhes de cada ídolo favorito
        const promises = favs.map(f => fetch(`${API_URL}/idolos/${f.idoloId}`).then(r => r.json()));
        const idolos = await Promise.all(promises);

        idolos.forEach(idolo => {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4';
            col.innerHTML = `
                <article class="card-idolo">
                    <img src="${idolo.imagem}" alt="Foto de ${idolo.nome}">
                    <div class="card-conteudo">
                        <span class="posicao-tag">${idolo.posicao}</span>
                        <h3>${idolo.nome}</h3>
                        <p>${idolo.descricao}</p>
                        <div class="card-actions d-flex justify-content-between align-items-center mt-3">
                            <a href="detalhes.html?id=${idolo.id}" class="btn-saber-mais">Ver História</a>
                            <span class="btn-coracao favoritado">❤️</span>
                        </div>
                    </div>
                </article>
            `;
            grid.appendChild(col);
        });
    } catch (e) {
        grid.innerHTML = `<div class="col-12"><div class="alert alert-danger">Erro ao carregar favoritos.</div></div>`;
    }
}

// ============================================================
// CRUD - CADASTRO DE ÍDOLOS (ADMIN)
// ============================================================
async function renderizarCrud() {
    const areaCrud = document.getElementById('area-crud');
    const acessoNegado = document.getElementById('acesso-negado');
    if (!areaCrud) return;

    const usuario = getUsuarioLogado();
    if (!usuario) { window.location.href = 'login.html'; return; }
    if (!usuario.admin) {
        areaCrud.classList.add('d-none');
        acessoNegado.classList.remove('d-none');
        return;
    }

    await carregarTabelaCrud();
}

async function carregarTabelaCrud() {
    const tbody = document.getElementById('tbody-idolos');
    if (!tbody) return;

    const res = await fetch(`${API_URL}/idolos`);
    const idolos = await res.json();

    tbody.innerHTML = '';
    idolos.forEach(idolo => {
        tbody.innerHTML += `
            <tr>
                <td><strong>${idolo.nome}</strong></td>
                <td>${idolo.posicao}</td>
                <td>${idolo.periodo}</td>
                <td>${idolo.jogos}</td>
                <td>${idolo.destaque ? '⭐ Sim' : 'Não'}</td>
                <td class="td-acoes">
                    <button class="btn-acao btn-editar" onclick="editarIdolo(${idolo.id})">✏️ Editar</button>
                    <button class="btn-acao btn-excluir" onclick="excluirIdolo(${idolo.id}, '${idolo.nome}')">🗑️ Excluir</button>
                </td>
            </tr>
        `;
    });
}

function abrirFormNovo() {
    document.getElementById('titulo-form-crud').textContent = 'Novo Ídolo';
    document.getElementById('crud-id').value = '';
    document.getElementById('crud-nome').value = '';
    document.getElementById('crud-posicao').value = '';
    document.getElementById('crud-periodo').value = '';
    document.getElementById('crud-jogos').value = '';
    document.getElementById('crud-descricao').value = '';
    document.getElementById('crud-biografia').value = '';
    document.getElementById('crud-titulos').value = '';
    document.getElementById('crud-imagem').value = '';
    document.getElementById('crud-destaque').checked = false;
    document.getElementById('form-crud').classList.remove('d-none');
    document.getElementById('form-crud').scrollIntoView({ behavior: 'smooth' });
}

async function editarIdolo(id) {
    const res = await fetch(`${API_URL}/idolos/${id}`);
    const idolo = await res.json();

    document.getElementById('titulo-form-crud').textContent = `Editar: ${idolo.nome}`;
    document.getElementById('crud-id').value = idolo.id;
    document.getElementById('crud-nome').value = idolo.nome;
    document.getElementById('crud-posicao').value = idolo.posicao;
    document.getElementById('crud-periodo').value = idolo.periodo;
    document.getElementById('crud-jogos').value = idolo.jogos;
    document.getElementById('crud-descricao').value = idolo.descricao;
    document.getElementById('crud-biografia').value = idolo.biografia;
    document.getElementById('crud-titulos').value = idolo.titulos.join('\n');
    document.getElementById('crud-imagem').value = idolo.imagem;
    document.getElementById('crud-destaque').checked = idolo.destaque;
    document.getElementById('form-crud').classList.remove('d-none');
    document.getElementById('form-crud').scrollIntoView({ behavior: 'smooth' });
}

async function salvarIdolo() {
    const id        = document.getElementById('crud-id').value;
    const nome      = document.getElementById('crud-nome').value.trim();
    const posicao   = document.getElementById('crud-posicao').value.trim();
    const periodo   = document.getElementById('crud-periodo').value.trim();
    const jogos     = document.getElementById('crud-jogos').value.trim();
    const descricao = document.getElementById('crud-descricao').value.trim();
    const biografia = document.getElementById('crud-biografia').value.trim();
    const titulosRaw = document.getElementById('crud-titulos').value.trim();
    const imagem    = document.getElementById('crud-imagem').value.trim();
    const destaque  = document.getElementById('crud-destaque').checked;

    if (!nome || !posicao || !periodo || !jogos) {
        mostrarAlerta('alerta-crud', 'Preencha ao menos: nome, posição, período e jogos.', 'warning');
        return;
    }

    const titulos = titulosRaw.split('\n').map(t => t.trim()).filter(t => t);
    const dadosIdolo = { nome, posicao, periodo, jogos, descricao, biografia, titulos, imagem, destaque, fotosVinculadas: [] };

    try {
        let res;
        if (id) {
            res = await fetch(`${API_URL}/idolos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...dadosIdolo, id: parseInt(id) })
            });
        } else {
            res = await fetch(`${API_URL}/idolos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosIdolo)
            });
        }

        if (res.ok) {
            mostrarAlerta('alerta-crud', id ? 'Ídolo atualizado com sucesso!' : 'Ídolo cadastrado com sucesso!', 'success');
            fecharForm();
            await carregarTabelaCrud();
        }
    } catch (e) {
        mostrarAlerta('alerta-crud', 'Erro ao salvar. Verifique o servidor.', 'danger');
    }
}

async function excluirIdolo(id, nome) {
    if (!confirm(`Tem certeza que deseja excluir "${nome}"?`)) return;

    try {
        const res = await fetch(`${API_URL}/idolos/${id}`, { method: 'DELETE' });
        if (res.ok) {
            mostrarAlerta('alerta-crud', `"${nome}" excluído com sucesso.`, 'success');
            await carregarTabelaCrud();
        }
    } catch (e) {
        mostrarAlerta('alerta-crud', 'Erro ao excluir.', 'danger');
    }
}

function fecharForm() {
    document.getElementById('form-crud').classList.add('d-none');
}

// ============================================================
// UTILITÁRIOS
// ============================================================
function mostrarAlerta(elementoId, mensagem, tipo) {
    const el = document.getElementById(elementoId);
    if (!el) return;
    el.className = `alert alert-${tipo}`;
    el.textContent = mensagem;
    el.classList.remove('d-none');
    setTimeout(() => el.classList.add('d-none'), 4000);
}

function limparAlerta(elementoId) {
    const el = document.getElementById(elementoId);
    if (el) el.classList.add('d-none');
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================
window.onload = function () {
    atualizarMenu();
    renderizarHome();
    renderizarDetalhes();
    renderizarFavoritos();
    renderizarCrud();

    // Redirecionar logado que tenta acessar login
    if (window.location.pathname.includes('login.html') && getUsuarioLogado()) {
        window.location.href = 'index.html';
    }
};
