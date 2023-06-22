window.onload = function () {
    buscarTransacoes();
    buscarProdutos();

    document.getElementById("produtoSelect").addEventListener("change", function () {
        const idProduto = document.getElementById("produtoSelect").value;
        buscarTransacoes(idProduto);
    });
};

async function buscarTransacoes(idProduto = 0) {
    let url = "http://localhost:8080/transacao/all";
    if (idProduto != 0) {
        url = `http://localhost:8080/transacao/all/${idProduto}`;
    }

    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarTransacoes(json);
    }
}

async function buscarProdutos() {
    const url = "http://localhost:8080/produto/all";
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarProdutos(json);
    }
}

function carregarTransacoes(transacoes) {
    const tbody = document.getElementById("transacoes");
    tbody.innerHTML = "";

    transacoes.forEach(transacao => {
        const tr = document.createElement("tr");

        tr.appendChild(criarTd(transacao.idTransacao));
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

function carregarProdutos(produtos) {
    const produtoSelect = document.getElementById("produtoSelect");

    produtos.forEach(tipo => {
        const option = document.createElement("option");
        option.value = tipo.idProduto;
        option.innerText = tipo.nome;

        produtoSelect.appendChild(option);
    });

    //SELECT WITH SEARCH
    dselect(produtoSelect, { search: true });
}

