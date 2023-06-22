let idEmpresa = 0;

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('idEmpresa')) {
        idEmpresa = urlParams.get('idEmpresa');

        buscarEmpresa(idEmpresa);
        buscarProdutos(idEmpresa);
    } else {
        location.href = "empresas.html";
    }

    const confirmar = document.getElementById("confirmar");
    confirmar.addEventListener("click", async function () {
        const path = "empresa/produto";
        const result = await enviar(0, path);
        if (result) {
            location.href = `empresa_produtos.html?id=${idEmpresa}`;
        } else {
            //TODO ERRO
        }
    });
};

async function buscarEmpresa(idEmpresa) {
    const url = `http://localhost:8080/empresa/${idEmpresa}`;
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarEmpresa(json);
    }
}

async function buscarProdutos(idEmpresa) {
    const url = `http://localhost:8080/empresa/produto/produtos/${idEmpresa}`;
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarProdutos(json);
    }
}

function carregarEmpresa(empresa) {
    const empresaInput = document.getElementById("empresa");

    empresaInput.value = empresa.nome;
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
        if (confirmar.parentNode) {
            confirmar.parentNode.removeChild(confirmar);
        }
    }
}

function dados() {
    const idProduto = document.getElementById("produtoSelect").value;

    return {
        "idProduto": idProduto,
        "idEmpresa": idEmpresa
    };
}