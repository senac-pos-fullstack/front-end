window.onload = function () {
    buscarAlertas();
    buscarArmazens();

    document.getElementById("armazemSelect").addEventListener("change", function () {
        const idArmazem = document.getElementById("armazemSelect").value;
        buscarAlertas(idArmazem);
    });
};

async function buscarAlertas(idArmazem = 0) {
    let url = "http://localhost:8080/alerta/all";
    if (idArmazem != 0) {
        url = `http://localhost:8080/alerta/all/${idArmazem}`;
    }

    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarAlertas(json);
    }
}

async function buscarArmazens() {
    const url = "http://localhost:8080/armazem/all";
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarSelects(json)
    }
}

function carregarAlertas(alertas) {
    const tbody = document.getElementById("alertas");
    tbody.innerHTML = "";

    alertas.forEach(alerta => {
        const tr = document.createElement("tr");

        //TD PRODUTO
        tr.appendChild(criarTd(alerta.produto));
        //TD ARMAZEM
        tr.appendChild(criarTd(alerta.armazem));
        //TD QUANTIDADE ATUAL
        tr.appendChild(criarTd(alerta.quantidadeAtual, true));
        //TD QUANTIDADE MINIMA
        tr.appendChild(criarTd(alerta.quantidadeMinima, true));
        //TD TRANSACAO
        if (alerta.idArmazem) {
            tr.appendChild(criarTdLink(`transacao.html?idProduto=${alerta.idProduto}&idArmazem=${alerta.idArmazem}`, "fa-arrows-rotate"));
        } else {
            tr.appendChild(criarTdLink(`transacao.html?idProduto=${alerta.idProduto}`, "fa-arrows-rotate"));
        }

        tbody.appendChild(tr);
    });
}

function carregarSelects(armazens) {
    const armazemSelect = document.getElementById("armazemSelect");

    armazens.forEach(armazem => {
        const option = document.createElement("option");
        option.value = armazem.idArmazem;
        option.innerText = armazem.nome;

        armazemSelect.appendChild(option);
    });

    dselect(armazemSelect, { search: true });
}

