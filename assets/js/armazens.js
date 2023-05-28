window.onload = function () {
  buscarArmazens();
};

async function buscarArmazens() {
  //Mudar endpoint para webservice
  const url =
    "https://raw.githubusercontent.com/senac-pos-fullstack/front-end/main/assets/json/armazens.json";
  const response = await fetch(url);
  if (response.status == 200) {
    const json = await response.json();

    carregarArmazens(json.ARMAZENS);
    carregarTooltip();
  }
}

function carregarArmazens(armazens) {
  const tbody = document.getElementById("item");

  armazens.forEach(armazem => {
    const tr = document.createElement("tr");
    //TD ID
    tr.appendChild(criarTd(armazem.ID_ARMAZEM));
    //TD NOME
    tr.appendChild(criarTd(armazem.TXT_NOME));
    //TD EDITAR
    tr.appendChild(criarTdLink(`armazem.html?id=${armazem.ID_ARMAZEM}`, "fa-pencil"));
    //TD DELETAR
    tr.appendChild(criarTdExcluir(armazem.ID_ARMAZEM, armazem.TXT_NOME, armazem.BIT_DELETAR));

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

