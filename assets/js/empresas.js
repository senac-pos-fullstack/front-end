window.onload = function () {
  buscar();
};

async function buscar() {
  const url = "http://localhost:8080/empresa/all";
  const response = await fetch(url);
  if (response.status == 200) {
    const json = await response.json();

    carregarEmpresas(json);
    carregarTooltip();

  }
}

async function remover(id) {
  const url = `http://localhost:8080/empresa/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status == 200) {
    location.href = 'empresas.html';
  }
}

function carregarEmpresas(empresas) {
  const tbody = document.getElementById("item");

  empresas.forEach(empresa => {
    const tr = document.createElement("tr");

    //TD ID
    tr.appendChild(criarTd(empresa.idEmpresa));
    //TD NOME
    tr.appendChild(criarTd(empresa.nome));
    //TD PRODUTO
    tr.appendChild(criarTdLink(`empresa_produtos.html?id=${empresa.idEmpresa}`, "fa-box"));

    //TD EDITAR
    tr.appendChild(criarTdLink(`empresa.html?id=${empresa.idEmpresa}`, "fa-pencil"));
    //TD DELETAR
    tr.appendChild(criarTdExcluir(empresa.idEmpresa, empresa.nome, empresa.deletar));

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

