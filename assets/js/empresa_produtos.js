window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        const id = urlParams.get('id');
        buscar(`empresa/${id}`);
        buscarProdutos(id);
        idEmpresa = id;

        document.getElementById("addProduto").href = `empresa_produto.html?idEmpresa=${id}`;
    } else {
        location.href = "empresas.html";
    }
};

function carregar(empresa) {
    document.getElementById("empresa").value = empresa.nome;
}

async function buscarProdutos(id) {
    const url = `http://localhost:8080/empresa/produto/${id}`;
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarProdutos(json);
        carregarTooltip();
    }
}

async function remover(idEmpresa, idProduto) {
    const url = `http://localhost:8080/empresa/produto/${idEmpresa}/${idProduto}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status == 200) {
        location.href = `empresa_produtos.html?id=${idEmpresa}`;
    }
}

let idEmpresa = 0;
function carregarProdutos(produtos) {

    if (produtos.length > 0) {
        const tbody = document.getElementById("item");

        produtos.forEach(produto => {
            console.log(produto);
            const tr = document.createElement("tr");
            //TD NOME
            tr.appendChild(criarTd(produto.nome));
            //TD DELETAR
            tr.appendChild(criarTdExcluir([idEmpresa, produto.idProduto], produto.nome, true));

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