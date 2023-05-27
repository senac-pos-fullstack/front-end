window.onload = function () {
    buscar();
};

async function buscar(produto = "", armazem = "") {
    //Mudar endpoint para webservice
    const url =
        "https://raw.githubusercontent.com/senac-pos-fullstack/front-end/main/assets/json/transacoes.json";
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarTransacoes(json.TRANSACOES);
        carregarSelects(json.TIPOS, json.PRODUTOS, json.EMPRESAS, json.ARMAZENS, json.USUARIOS)
    }
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

function carregarSelects(tipos, produtos, empresas, armazens, usuarios) {
    const tipoSelect = document.getElementById("tipoSelect");
    const produtoSelect = document.getElementById("produtoSelect");
    const empresaSelect = document.getElementById("empresaSelect");
    const armazemSelect = document.getElementById("armazemSelect");
    const usuarioSelect = document.getElementById("usuarioSelect");

    tipos.forEach(tipo => {
        const option = document.createElement("option");
        option.value = tipo.ID_TIPO;
        option.innerText = tipo.TXT_NOME;

        tipoSelect.appendChild(option);
    });

    produtos.forEach(produto => {
        const option = document.createElement("option");
        option.value = produto.ID_PRODUTO;
        option.innerText = produto.TXT_NOME;

        produtoSelect.appendChild(option);
    });

    empresas.forEach(empresa => {
        const option = document.createElement("option");
        option.value = empresa.ID_EMPRESA;
        option.innerText = empresa.TXT_NOME;

        empresaSelect.appendChild(option);
    });

    armazens.forEach(armazem => {
        const option = document.createElement("option");
        option.value = armazem.ID_ARMAZEM;
        option.innerText = armazem.TXT_NOME;

        armazemSelect.appendChild(option);
    });

    usuarios.forEach(usuario => {
        const option = document.createElement("option");
        option.value = usuario.ID_USUARIO;
        option.innerText = usuario.TXT_USUARIO;

        usuarioSelect.appendChild(option);
    });

    //SELECT WITH SEARCH
    dselect(tipoSelect, { search: true });
    dselect(produtoSelect, { search: true });
    dselect(empresaSelect, { search: true });
    dselect(armazemSelect, { search: true });
    dselect(usuarioSelect, { search: true });
}

