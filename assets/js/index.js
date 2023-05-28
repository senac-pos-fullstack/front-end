window.onload = function () {
    buscar();
};

async function buscar() {
    //Mudar endpoint para webservice
    const url =
        "https://raw.githubusercontent.com/senac-pos-fullstack/front-end/main/assets/json/index.json";
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarCards(json.NUM_PRODUTOS, json.NUM_EMPRESAS, json.NUM_ARMAZENS);
        carregarAlertas(json.ALERTAS);
        carregarTransacoes(json.TRANSACOES);
    }
}

function carregarCards(produtos, armazens, empresas) {
    let produtoQtd = document.getElementById("produtosQtd");
    produtoQtd.innerText = produtos;

    let armazensQtd = document.getElementById("armazensQtd");
    armazensQtd.innerText = armazens;


    let empresasQtd = document.getElementById("empresasQtd");
    empresasQtd.innerText = empresas;
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
        tr.appendChild(criarTd(alerta.TXT_PRODUTO));
        //TD ARMAZEM
        tr.appendChild(criarTd(alerta.TXT_ARMAZEM));
        //TD QUANTIDADE ATUAL
        tr.appendChild(criarTd(alerta.NUM_QUANTIDADE_ATUAL, true));
        //TD QUANTIDADE MINIMA
        tr.appendChild(criarTd(alerta.NUM_QUANTIDADE_MINIMA, true));
        //TD TRANSACAO
        tr.appendChild(criarTdLink(`transacao.html?id=${alerta.ID_PRODUTO}`, "fa-arrows-rotate"));

        tbody.appendChild(tr);
    });
}

function carregarTransacoes(transacoes) {
    const tbody = document.getElementById("transacoes");

    transacoes.forEach(transacao => {
        const tr = document.createElement("tr");

        //TD TIPO
        tr.appendChild(criarTd(transacao.TXT_TIPO));
        //TD PRODUTO
        tr.appendChild(criarTd(transacao.TXT_PRODUTO));
        //TD QUANTIDADE
        tr.appendChild(criarTd(transacao.NUM_QUANTIDADE, true));
        //TD EMPRESA
        tr.appendChild(criarTd(transacao.TXT_EMPRESA));
        //TD ARMAZEM
        tr.appendChild(criarTd(transacao.TXT_ARMAZEM));
        //TD DESCRICAO 
        tr.appendChild(criarTdDescricao(transacao.ID_PRODUTO, transacao.TXT_PRODUTO, transacao.TXT_DESCRICAO));
        //TD DATA
        tr.appendChild(criarTd(transacao.DAT_TRANSACAO));
        //TD USUARIO
        tr.appendChild(criarTd(transacao.TXT_USUARIO));

        tbody.appendChild(tr);
    });
}

