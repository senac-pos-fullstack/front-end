window.onload = function () {
    buscar();
};

async function buscar() {
    const url = "http://localhost:8080/produto/all";
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarProdutos(json);
        carregarTooltip();
    }
}

async function remover(id) {
    const url = `http://localhost:8080/produto/${id}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status == 200) {
        location.href = 'produtos.html';
    }
}

function carregarProdutos(produtos) {
    const tbody = document.getElementById("produtos");

    produtos.forEach(produto => {
        const tr = document.createElement("tr");

        //TD NOME
        tr.appendChild(criarTd(produto.nome));
        //TD PRECO MEDIO
        tr.appendChild(criarTd(produto.precoMedio.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })));
        //TD QTD MIN
        tr.appendChild(criarTd(produto.quantidadeMinima, true));
        //TD QTD ATUAL
        tr.appendChild(criarTd(produto.quantidadeAtual, true));
        //TD TRANSACAO
        tr.appendChild(criarTdLink(`transacao.html?idProduto=${produto.idProduto}`, "fa-arrows-rotate"));
        //TD EDITAR
        tr.appendChild(criarTdLink(`produto.html?id=${produto.idProduto}`, "fa-pencil"));
        //TD DELETAR
        tr.appendChild(criarTdExcluir(produto.idProduto, produto.nome, produto.deletar));

        tbody.appendChild(tr);
    });
}

function carregarTooltip() {
    tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

