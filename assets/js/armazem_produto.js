let idArmazem, idProduto = 0;

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('idArmazem')) {
        idArmazem = urlParams.get('idArmazem');

        buscarArmazem(idArmazem);
        if (urlParams.has('idProduto')) {
            idProduto = urlParams.get('idProduto');
            buscarProduto(idArmazem, idProduto);
        } else {
            buscarProdutos(idArmazem);
        }
    } else {
        location.href = "armazens.html";
    }

    const confirmar = document.getElementById("confirmar");
    confirmar.addEventListener("click", async function () {
        const path = "armazem/produto";
        const result = await enviar(idProduto, path);
        if (result) {
            location.href = `armazem_produtos.html?id=${idArmazem}`;
        } else {
            //TODO ERRO
        }
    });
};

async function buscarArmazem(idArmazem) {
    const url = `http://localhost:8080/armazem/${idArmazem}`;
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarArmazem(json);
    }
}

async function buscarProduto(idArmazem, idProduto) {
    const url = `http://localhost:8080/armazem/produto/${idArmazem}/${idProduto}`;
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarProduto(json);
    }
}

async function buscarProdutos(idArmazem) {
    const url = `http://localhost:8080/armazem/produto/produtos/${idArmazem}`;
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarProdutos(json);
    }
}

function carregarArmazem(armazem) {
    const armazemInput = document.getElementById("armazem");

    armazemInput.value = armazem.nome;
}

function carregarProduto(produto) {
    const produtoSelect = document.getElementById("produtoSelect");

    const option = document.createElement("option");
    option.value = produto.idProduto;
    option.innerText = produto.produto;
    produtoSelect.appendChild(option);
    produtoSelect.disabled = true;

    const quantidadeMinima = document.getElementById("quantidadeMinima");
    quantidadeMinima.value = produto.quantidadeMinimaArmazem;
}

function carregarProdutos(produtos) {
    const produtoSelect = document.getElementById("produtoSelect");

    if (produtos.length > 0) {
        produtos.forEach(produto => {
            const option = document.createElement("option");
            option.value = produto.idProduto;
            option.innerText = produto.nome;

            produtoSelect.appendChild(option);
        });
        //SELECT WITH SEARCH
        dselect(produtoSelect, { search: true });
    } else {
        const option = document.createElement("option");
        option.innerText = "Não existe mais produtos para adicionar a lista";
        produtoSelect.appendChild(option);
        produtoSelect.disabled = true;
        const quantidadeMinima = document.getElementById("quantidadeMinima");
        quantidadeMinima.disabled = true;
        quantidadeMinima.value = "";
        const confirmar = document.getElementById("confirmar");
        confirmar.href = "#"
        confirmar.classList.remove("btn-primary");
        confirmar.classList.add("btn-secondary");
    }
}

function dados() {
    const idProduto = document.getElementById("produtoSelect").value;
    const quantidadeMinima = document.getElementById("quantidadeMinima").value;

    return {
        "idProduto": idProduto,
        "idArmazem": idArmazem,
        "quantidadeMinimaArmazem": quantidadeMinima
    };
}