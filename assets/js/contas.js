window.onload = function () {
    buscar();
};

async function buscar() {
    //Mudar endpoint para webservice
    const url =
        "https://raw.githubusercontent.com/senac-pos-fullstack/front-end/main/assets/json/contas.json";
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarContas(json.CONTAS);
        carregarTooltip();
    }
}

function carregarContas(contas) {
    const tbody = document.getElementById("item");

    contas.forEach(conta => {
        const tr = document.createElement("tr");

        //TD ID
        tr.appendChild(criarTd(conta.ID_CONTA));
        //TD USUARIO
        tr.appendChild(criarTd(conta.TXT_USUARIO));
        //TD EDITAR
        tr.appendChild(criarTdLink(`empresa.html?id=${conta.ID_EMPRESA}`, "fa-pencil"));
        //TD DELETAR
        tr.appendChild(criarTdExcluir(conta.ID_EMPRESA, conta.TXT_NOME, conta.BIT_DELETAR));

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
