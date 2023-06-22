window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        const id = urlParams.get('id');
        buscar(`produto/${id}`);
    }

    const confirmar = document.getElementById("confirmar");
    confirmar.addEventListener("click", async function () {
        if (validarCampos()) {
            const id = document.getElementById("idProduto").value;
            const path = "produto";
            const result = await enviar(id, path);
            if (result) {
                location.href = 'produtos.html';
            } else {
                //TODO ERRO
            }
        }
    });
};

function validarCampos() {
    const produto = document.getElementById("produto").value;
    const validacaoProduto = document.getElementById("validacaoProduto");
    const quantidadeMinima = document.getElementById("quantidadeMinima").value;
    const validacaoQuantidade = document.getElementById("validacaoQuantidade");

    if (!validarTexto(produto, validacaoProduto) || !validarNumero(quantidadeMinima, validacaoQuantidade)) {
        return false;
    }

    return true;
}

function dados() {
    const idProduto = document.getElementById("idProduto").value;
    const nome = document.getElementById("produto").value;
    const quantidadeMinima = document.getElementById("quantidadeMinima").value;

    return {
        "idProduto": idProduto,
        "nome": nome,
        "quantidadeMinima": quantidadeMinima
    };
}

function carregar(produto) {
    document.getElementById("produto").value = produto.nome;
    document.getElementById("idProduto").value = produto.idProduto;
    document.getElementById("quantidadeMinima").value = produto.quantidadeMinima;
    document.getElementById("idProdutoDiv").style.display = "block";
}