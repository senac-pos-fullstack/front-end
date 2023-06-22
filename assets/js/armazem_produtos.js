window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        const id = urlParams.get('id');
        buscar(`armazem/${id}`);
        buscarProdutos(id);

        document.getElementById("addProduto").href = `armazem_produto.html?idArmazem=${id}`;
    } else {
        location.href = "armazens.html";
    }
};

function carregar(armazem) {
    document.getElementById("armazem").value = armazem.nome;
}

async function buscarProdutos(id) {
    const url = `http://localhost:8080/armazem/produto/all/${id}`;
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarProdutos(json);
        carregarTooltip();
    }
}

async function remover(idArmazem, idProduto) {
    const url = `http://localhost:8080/armazem/produto/${idArmazem}/${idProduto}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status == 200) {
        location.href = 'armazem_produtos.html';
    }
}

function carregarProdutos(produtos) {

    if (produtos.length > 0) {
        const tbody = document.getElementById("item");

        produtos.forEach(produto => {
            console.log(produto);
            const tr = document.createElement("tr");
            //TD NOME
            tr.appendChild(criarTd(produto.produto));
            //TD QUANTIDADE MINIMA TOTAL
            tr.appendChild(criarTd(produto.quantidadeMinimaProduto, true));
            //TD QUANTIDADE ATUAL TOTAL
            tr.appendChild(criarTd(produto.quantidadeAtualProduto, true));
            //TD QUANTIDADE MINIMA DO ARMAZEM
            tr.appendChild(criarTd(produto.quantidadeMinimaArmazem, true));
            //TD QUANTIDADE MINIMA DO ARMAZEM
            tr.appendChild(criarTd(produto.quantidadeAtualArmazem, true));
            //TD TRANSACAO
            tr.appendChild(criarTdLink(`transacao.html?idArmazem=${produto.idArmazem}&idProduto=${produto.idProduto}`, "fa-arrows-rotate"));
            if (produto.quantidadeMinimaArmazem > 0) {
                //TD EDITAR
                tr.appendChild(criarTdLink(`armazem_produto.html?idArmazem=${produto.idArmazem}&idProduto=${produto.idProduto}`, "fa-pencil"));
                //TD DELETAR
                tr.appendChild(criarTdExcluir([produto.idArmazem, produto.idProduto], produto.produto, true));
            } else {
                tr.appendChild(criarTd(""));
                tr.appendChild(criarTd(""));
            }

            tbody.appendChild(tr);
        });
    } else {
        //TODO Nenhum produto cadasstrado
    }
}

function carregarTooltip() {
    tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}