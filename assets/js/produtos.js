window.onload = function () {
    buscar();
};

async function buscar(produto = "", armazem = "") {
    //Mudar endpoint para webservice
    const url =
        "https://raw.githubusercontent.com/senac-pos-fullstack/front-end/main/assets/json/produtos.json";
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarProdutos(json.PRODUTOS);
        carregarSelects(json.EMPRESAS, json.ARMAZENS)
        carregarTooltip();
    }
}

function carregarProdutos(produtos) {
    const tbody = document.getElementById("produtos");

    produtos.forEach(produto => {
        const tr = document.createElement("tr");

        //TD ID
        tr.appendChild(criarTd(produto.ID_PRODUTO));
        //TD NOME
        tr.appendChild(criarTd(produto.TXT_NOME));
        //TD PRECO MEDIO
        tr.appendChild(criarTd(produto.DEC_PRECO_MEDIO.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })));
        //TD QTD MIN
        tr.appendChild(criarTd(produto.NUM_QUANTIDADE_MINIMA, true));
        //TD QTD ATUAL
        tr.appendChild(criarTd(produto.NUM_QUANTIDADE_ATUAL, true));
        //TD TRANSACAO
        tr.appendChild(criarTdLink(`transacao.html?id=${produto.ID_PRODUTO}`, "fa-arrows-rotate"));
        //TD EMPRESAS
        tr.appendChild(criarTdTooltip(produto.EMPRESAS, "fa-crosshairs"));
        //TD ARMAZENS  
        tr.appendChild(criarTdTooltip(produto.ARMAZENS, "fa-warehouse"));
        //TD EDITAR
        tr.appendChild(criarTdLink(`produto.html?id=${produto.ID_PRODUTO}`, "fa-pencil"));
        //TD DELETAR
        tr.appendChild(criarTdExcluir(produto.ID_PRODUTO, produto.TXT_NOME, produto.BIT_DELETAR));

        tbody.appendChild(tr);
    });
}

function carregarSelects(empresas, armazens) {
    const empresaSelect = document.getElementById("empresaSelect");
    const armazemSelect = document.getElementById("armazemSelect");

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

    //SELECT WITH SEARCH
    dselect(empresaSelect, { search: true });
    dselect(armazemSelect, { search: true });
}

function carregarTooltip() {
    tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

