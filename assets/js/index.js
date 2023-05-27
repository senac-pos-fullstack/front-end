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
        //carregarTransacoes(json.TRANSACOES);
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
        tdAtual.innerText = alerta.NUM_QUANTIDADE_ATUAL;
        tr.appendChild(tdAtual);

        //TD QUANTIDADE MINIMA
        const tdMinima = document.createElement("td");
        tdMinima.innerText = alerta.NUM_QUANTIDADE_MINNIMA;
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

function carregar(empresas) {
    const item = document.getElementById("item");

    empresas.forEach(empresa => {
        const tr = document.createElement("tr");

        //TD ID
        const tdId = document.createElement("td");
        tdId.innerText = empresa.ID_EMPRESA;
        tr.appendChild(tdId);

        //TD NOME
        const tdNome = document.createElement("td");
        tr.appendChild(tdNome);
        tdNome.innerText = empresa.TXT_NOME;

        //TD VITRINE
        const tdVitrine = document.createElement("td");
        tdVitrine.classList.add("text-center");
        const aVitrine = document.createElement("a");
        aVitrine.href = `vitrine.html?id=${empresa.ID_EMPRESA}`;
        aVitrine.classList.add("link");
        const iVitrine = document.createElement("i");
        iVitrine.classList.add("fa-solid", "fa-bars");
        aVitrine.appendChild(iVitrine);
        tdVitrine.appendChild(aVitrine);
        tr.appendChild(tdVitrine);

        //TD EDITAR
        const tdEditar = document.createElement("td");
        tdEditar.classList.add("text-center");
        const aEditar = document.createElement("a");
        aEditar.href = `empresa.html?role=editar&id=${empresa.ID_EMPRESA}`;
        aEditar.classList.add("link");
        const iEditar = document.createElement("i");
        iEditar.classList.add("fa-solid", "fa-pen-to-square");
        aEditar.appendChild(iEditar);
        tdEditar.appendChild(aEditar);
        tr.appendChild(tdEditar);

        //TD EXCLUIR
        const tdExcluir = document.createElement("td");
        tdExcluir.classList.add("text-center");
        const aExcluir = document.createElement("a");
        aExcluir.href = "#";
        aExcluir.classList.add("link");
        const iExcluir = document.createElement("i");
        iExcluir.classList.add("fa-solid", "fa-trash");
        aExcluir.appendChild(iExcluir);
        tdExcluir.appendChild(aExcluir);

        tr.appendChild(tdExcluir);

        //MODAL REMOVER
        if (empresa.BIT_DELETAR) {
            aExcluir.dataset.bsToggle = "modal";
            aExcluir.dataset.bsTarget = `#remover${empresa.ID_EMPRESA}`;

            const divModal = document.createElement("div");
            divModal.classList.add("modal", "fade");
            divModal.id = `remover${empresa.ID_EMPRESA}`;
            divModal.tabIndex = "-1";
            const divModalDialog = document.createElement("div");
            divModalDialog.classList.add("modal-dialog");
            const divModalContent = document.createElement("div");
            divModalContent.classList.add("modal-content");

            const divModalHeader = document.createElement("div");
            divModalHeader.classList.add("modal-header");
            const h5Title = document.createElement("h5");
            h5Title.classList.add("modal-title");
            h5Title.innerText = "Você tem certeza que deseja remover?";
            const buttonClose = document.createElement("button");
            buttonClose.classList.add("btn-close");
            buttonClose.dataset.bsDismiss = "modal";
            divModalHeader.appendChild(h5Title);
            divModalHeader.appendChild(buttonClose);

            const divModalBody = document.createElement("div");
            divModalBody.classList.add("modal-body");
            const pbody = document.createElement("p");
            pbody.innerHTML = `Nessa ação você irá remover <b>${empresa.TXT_NOME}</b>. Uma vez removido não poderá voltar atrás!`;
            divModalBody.appendChild(pbody);

            const divModalFooter = document.createElement("div");
            divModalFooter.classList.add("modal-footer");

            const buttonFooterClose = document.createElement("button");
            buttonFooterClose.classList.add("btn", "btn-secondary");
            buttonFooterClose.dataset.bsDismiss = "modal";
            buttonFooterClose.innerText = "Fechar";
            divModalFooter.appendChild(buttonFooterClose);

            const aFooterRemover = document.createElement("a");
            aFooterRemover.href = "#";
            aFooterRemover.addEventListener("click", function () { remover(empresa.ID_EMPRESA) });

            aFooterRemover.classList.add("btn", "btn-danger");
            aFooterRemover.innerText = "Remover";
            divModalFooter.appendChild(aFooterRemover);

            divModalContent.appendChild(divModalHeader);
            divModalContent.appendChild(divModalBody);
            divModalContent.appendChild(divModalFooter);

            divModalDialog.appendChild(divModalContent);
            divModal.appendChild(divModalDialog);
            item.appendChild(divModal);
        } else {
            aExcluir.dataset.bsToggle = "tooltip";
            aExcluir.dataset.bsPlacement = "left";
            aExcluir.title = "Empresa com produto relacionado, por favor exclua o produto primeiro.";
            aExcluir.classList.add("disabled");
        }

        item.appendChild(tr);
    });
}

