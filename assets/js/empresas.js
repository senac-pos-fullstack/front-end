window.onload = function () {
  buscar();
};

async function buscar() {
  //Mudar endpoint para webservice
  const url =
    "https://raw.githubusercontent.com/senac-pos-fullstack/front-end/main/assets/json/empresas.json";
  const response = await fetch(url);
  if (response.status == 200) {
    const json = await response.json();

    carregarEmpresas(json.EMPRESAS);
    carregarTooltip();

  }
}

function carregarEmpresas(empresas) {
  const tbody = document.getElementById("item");

  empresas.forEach(empresa => {
    const tr = document.createElement("tr");

    //TD ID
    tr.appendChild(criarTd(empresa.ID_EMPRESA));
    //TD NOME
    tr.appendChild(criarTd(empresa.TXT_NOME));
    //TD EDITAR
    tr.appendChild(criarTdLink(`empresa.html?id=${empresa.ID_EMPRESA}`, "fa-pencil"));
    //TD DELETAR
    tr.appendChild(criarTdExcluir(empresa.ID_EMPRESA, empresa.TXT_NOME, empresa.BIT_DELETAR));

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

