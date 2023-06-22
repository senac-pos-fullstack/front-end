window.onload = function () {
    buscarCards();
    buscarAlertas();
    buscarTransacoes();
};

async function buscarCards() {
    const url = "http://localhost:8080/index";
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarCards(json);
    }
}

async function buscarAlertas() {
    const url = "http://localhost:8080/alerta/last";
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarAlertas(json);
    }
}

async function buscarTransacoes() {
    const url = "http://localhost:8080/transacao/last";
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarTransacoes(json);
    }
}

function carregarCards(cards) {
    document.getElementById("alertasQtd").innerText = cards.alerta;
    document.getElementById("transacoesQtd").innerText = cards.transacao;
    document.getElementById("produtosQtd").innerText = cards.produto;
    document.getElementById("armazensQtd").innerText = cards.armazem;
    document.getElementById("empresasQtd").innerText = cards.empresa;
    document.getElementById("contasQtd").innerText = cards.usuario;
}

function carregarAlertas(alertas) {
    if (alertas.length == 0) {
        const ultimosAlertas = document.getElementById("ultimosAlertas");
        ultimosAlertas.style.display = "none";
        return;
    }

    const tbody = document.getElementById("alertas");

    alertas.forEach(alerta => {
        const tr = document.createElement("tr");

        //TD PRODUTO
        tr.appendChild(criarTd(alerta.produto));
        //TD ARMAZEM
        tr.appendChild(criarTd(alerta.armazem));
        //TD QUANTIDADE ATUAL
        tr.appendChild(criarTd(alerta.quantidadeAtual, true));
        //TD QUANTIDADE MINIMA
        tr.appendChild(criarTd(alerta.quantidadeMinima, true));
        //TD TRANSACAO
        tr.appendChild(criarTdLink(`transacao.html?idProduto=${alerta.idProduto}`, "fa-arrows-rotate"));

        tbody.appendChild(tr);
    });
}

function carregarTransacoes(transacoes) {
    const tbody = document.getElementById("transacoes");

    transacoes.forEach(transacao => {
        const tr = document.createElement("tr");

        //TD TIPO
        tr.appendChild(criarTd(transacao.tipo));
        //TD PRODUTO
        tr.appendChild(criarTd(transacao.produto));
        //TD QUANTIDADE
        tr.appendChild(criarTd(transacao.quantidade, true));
        //TD EMPRESA
        tr.appendChild(criarTd(transacao.empresa));
        //TD ARMAZEM
        tr.appendChild(criarTd(transacao.armazem));
        //TD DATA
        tr.appendChild(criarTd(transacao.dataTransacao));
        //TD USUARIO
        tr.appendChild(criarTd(transacao.usuario));

        tbody.appendChild(tr);
    });
}

