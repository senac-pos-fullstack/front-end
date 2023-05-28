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
        carregarSelects(json.ARMAZENS)
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
        tr.appendChild(criarTd(alerta.TXT_PRODUTO));
        //TD ARMAZEM
        tr.appendChild(criarTd(alerta.TXT_ARMAZEM));
        //TD QUANTIDADE ATUAL
        tr.appendChild(criarTd(alerta.NUM_QUANTIDADE_ATUAL, true));
        //TD QUANTIDADE MINIMA
        tr.appendChild(criarTd(alerta.NUM_QUANTIDADE_MINIMA, true));
        //TD TRANSACAO
        tr.appendChild(criarTdLink(`transacao.html?id=${alerta.ID_PRODUTO}`, "fa-arrows-rotate"));

        tbody.appendChild(tr);
    });
}

function carregarSelects(armazens) {
    const armazemSelect = document.getElementById("armazemSelect");

    armazens.forEach(armazem => {
        const option = document.createElement("option");
        option.value = armazem.ID_ARMAZEM;
        option.innerText = armazem.TXT_NOME;

        armazemSelect.appendChild(option);
    });

    dselect(armazemSelect, { search: true });
}

