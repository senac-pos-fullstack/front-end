window.onload = function () {
  buscar();
};

async function buscar() {
  const url = "http://localhost:8080/armazem/all";
  const response = await fetch(url);
  if (response.status == 200) {
    const json = await response.json();

    carregarArmazens(json);
    carregarTooltip();
  }
}

async function remover(id) {
  const url = `http://localhost:8080/armazem/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status == 200) {
    location.href = 'armazens.html';
  }
}

function carregarArmazens(armazens) {
  const tbody = document.getElementById("item");

  armazens.forEach(armazem => {
    const tr = document.createElement("tr");
    //TD ID
    tr.appendChild(criarTd(armazem.idArmazem));
    //TD NOME
    tr.appendChild(criarTd(armazem.nome));
    //TD ADD QTD PRODUTO
    tr.appendChild(criarTdLink(`armazem_produtos.html?id=${armazem.idArmazem}`, "fa-box-open"));
    //TD EDITAR
    tr.appendChild(criarTdLink(`armazem.html?id=${armazem.idArmazem}`, "fa-pencil"));
    //TD DELETAR
    tr.appendChild(criarTdExcluir(armazem.idArmazem, armazem.nome, armazem.deletar));

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

