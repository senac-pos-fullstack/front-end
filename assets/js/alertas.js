window.onload = function () {
    buscar();
};

async function buscar(produto = "", armazem = "") {
    //Mudar endpoint para webservice
    const url =
        "https://raw.githubusercontent.com/senac-pos-fullstack/front-end/main/assets/json/alertas.json";
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarAlertas(json.ALERTAS);
        carregarSelects(json.PRODUTOS, json.ARMAZENS)
    }
}

function carregarAlertas(alertas) {
    if (alertas.length == 0) {
        const ultimosAlertas = document.getElementById("ultimosAlertas");
        ultimosAlertas.style.display = "none";
        return;
    }

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
        tdAtual.classList.add("text-center");
        tdAtual.innerText = alerta.NUM_QUANTIDADE_ATUAL;
        tr.appendChild(tdAtual);

        //TD QUANTIDADE MINIMA
        const tdMinima = document.createElement("td");
        tdMinima.classList.add("text-center");
        tdMinima.innerText = alerta.NUM_QUANTIDADE_MINIMA;
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

function carregarSelects(produtos, armazens) {
    const produtoSelect = document.getElementById("produtoSelect");
    const armazemSelect = document.getElementById("armazemSelect");

    produtos.forEach(produto => {
        const option = document.createElement("option");
        option.value = produto.ID_PRODUTO;
        option.innerText = produto.TXT_NOME;

        produtoSelect.appendChild(option);
    });

    armazens.forEach(armazem => {
        const option = document.createElement("option");
        option.value = armazem.ID_ARMAZEM;
        option.innerText = armazem.TXT_NOME;

        armazemSelect.appendChild(option);
    });

    dselect(produtoSelect, { search: true });
    dselect(armazemSelect, { search: true });
}

