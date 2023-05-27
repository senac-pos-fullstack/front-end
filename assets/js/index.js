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
        const tdProduto = document.createElement("td");
        tdProduto.innerText = alerta.TXT_PRODUTO;
        tr.appendChild(tdProduto);

        //TD ARMAZEM
        const tdArmazem = document.createElement("td");
        tdArmazem.innerText = alerta.TXT_ARMAZEM;
        tr.appendChild(tdArmazem);

        //TD QUANTIDADE ATUAL
        const tdAtual = document.createElement("td");
        tdAtual.classList.add("text-center");
        tdAtual.innerText = alerta.NUM_QUANTIDADE_ATUAL;
        tr.appendChild(tdAtual);

        //TD QUANTIDADE MINIMA
        const tdMinima = document.createElement("td");
        tdMinima.classList.add("text-center");
        tdMinima.innerText = alerta.NUM_QUANTIDADE_MINIMA;
        tr.appendChild(tdMinima);

        //TD TRANSACAO
        const tdTransacao = document.createElement("td");
        tdTransacao.classList.add("text-center");
        const aTransacao = document.createElement("a");
        aTransacao.href = `transacao.html?id=${alerta.ID_PRODUTO}`;
        aTransacao.classList.add("link");
        const iTransacao = document.createElement("i");
        iTransacao.classList.add("fa-solid", "fa-arrows-rotate");
        aTransacao.appendChild(iTransacao);
        tdTransacao.appendChild(aTransacao);
        tr.appendChild(tdTransacao);

        tbody.appendChild(tr);
    });
}

function carregarTransacoes(transacoes) {
    const tbody = document.getElementById("transacoes");

    transacoes.forEach(transacao => {
        const tr = document.createElement("tr");

        //TD TIPO
        const tdTipo = document.createElement("td");
        tdTipo.innerText = transacao.TXT_TIPO;
        tr.appendChild(tdTipo);

        //TD PRODUTO
        const tdProduto = document.createElement("td");
        tdProduto.innerText = transacao.TXT_PRODUTO;
        tr.appendChild(tdProduto);

        //TD QUANTIDADE
        const tdQuantidade = document.createElement("td");
        tdQuantidade.classList.add("text-center");
        tdQuantidade.innerText = transacao.NUM_QUANTIDADE;
        tr.appendChild(tdQuantidade);

        //TD EMPRESA
        const tdEmpresa = document.createElement("td");
        tdEmpresa.innerText = transacao.TXT_EMPRESA;
        tr.appendChild(tdEmpresa);

        //TD ARMAZEM
        const tdArmazem = document.createElement("td");
        tdArmazem.innerText = transacao.TXT_ARMAZEM;
        tr.appendChild(tdArmazem);

        //TD DESCRICAO 
        const descricao = `${transacao.TXT_DESCRICAO.slice(0, 17)}...`;
        const tdDescricao = document.createElement("td");
        const aDescricao = document.createElement("a");
        aDescricao.href = "#";
        aDescricao.classList.add("link");
        aDescricao.innerText = descricao;
        tdDescricao.appendChild(aDescricao);
        tr.appendChild(tdDescricao);

        //MODAL DESCRICAO
        aDescricao.dataset.bsToggle = "modal";
        aDescricao.dataset.bsTarget = `#descricao${transacao.ID_PRODUTO}`;

        const divModal = document.createElement("div");
        divModal.classList.add("modal", "fade");
        divModal.id = `descricao${transacao.ID_PRODUTO}`;
        divModal.tabIndex = "-1";
        const divModalDialog = document.createElement("div");
        divModalDialog.classList.add("modal-dialog");
        const divModalContent = document.createElement("div");
        divModalContent.classList.add("modal-content");

        const h5Title = document.createElement("h5");
        h5Title.classList.add("modal-title");
        h5Title.innerText = `Descrição ${transacao.TXT_PRODUTO}`;
        const divModalHeader = document.createElement("div");
        divModalHeader.classList.add("modal-header");
        const buttonClose = document.createElement("button");
        buttonClose.classList.add("btn-close");
        buttonClose.dataset.bsDismiss = "modal";
        divModalHeader.appendChild(h5Title);
        divModalHeader.appendChild(buttonClose);

        const divModalBody = document.createElement("div");
        divModalBody.classList.add("modal-body");
        const pbody = document.createElement("p");
        pbody.innerHTML = transacao.TXT_DESCRICAO;
        divModalBody.appendChild(pbody);

        divModalContent.appendChild(divModalHeader);
        divModalContent.appendChild(divModalBody);

        divModalDialog.appendChild(divModalContent);
        divModal.appendChild(divModalDialog);
        tbody.appendChild(divModal);

        //TD DATA
        const tdData = document.createElement("td");
        tdData.innerText = transacao.DAT_TRANSACAO;
        tr.appendChild(tdData);

        //TD USUARIO
        const tdUsuario = document.createElement("td");
        tdUsuario.innerText = transacao.TXT_USUARIO;
        tr.appendChild(tdUsuario);

        tbody.appendChild(tr);
    });
}

